/* eslint-disable */
/* @ts-nocheck */

import { createClient } from '@supabase/supabase-js';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
// @ts-ignore
import { corsHeader } from '../_shared/cors.ts';

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')!,
});

// Supabase environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

// Function to handle different request methods
const handleOptionsRequest = () =>
  new Response('ok', {
    headers: {
      ...corsHeader,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    },
  });

// Function to create the Supabase client
const createSupabaseClient = (authorization: string) =>
  createClient(supabaseUrl!, supabaseAnonKey!, {
    global: {
      headers: {
        authorization,
      },
    },
    auth: {
      persistSession: false,
    },
  });

Deno.serve(async (req) => {
  try {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return handleOptionsRequest();
    }

    // Check for missing environment variables
    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({ error: 'Missing environment variables.' }),
        {
          status: 500,
          headers: {
            ...corsHeader,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Get the Authorization header
    const authorization = req.headers.get('Authorization');
    if (!authorization) {
      return new Response(
        JSON.stringify({ error: 'No authorization header provided.' }),
        {
          status: 401,
          headers: {
            ...corsHeader,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Initialize Supabase client
    const supabase = createSupabaseClient(authorization);

    // Parse the request body
    const { chatId, message, messages, embedding, chatbotId } = await req.json();

    // Log the chatbot ID for debugging
    console.log('chatbotId ->', chatbotId);

    // Call the Supabase RPC to match document sections
    const { data: documents, error: matchError } = await supabase
      .rpc('match_document_sections', {
        chatbot_id: chatbotId,
        embedding,
        match_threshold: 0.8,
      })
      .select('chunks')
      .limit(5);

    // Handle RPC errors
    if (matchError) {
      console.error('Error matching documents:', matchError);
      return new Response(
        JSON.stringify({
          error: 'Error reading documents. Please try again.',
          details: matchError,
        }),
        {
          status: 500,
          headers: {
            ...corsHeader,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Prepare the document content for the AI response
    const injectedDocs =
      documents && documents.length > 0
        ? documents.map(({ chunks }) => chunks).join('\n\n')
        : 'No documents found';

    const completionMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'user',
        content: `
          You're an AI assistant who answers questions about documents.
          You're a chat bot, so keep your replies succinct.
          You're only allowed to use the documents below to answer the question.
          If the question isn't related to these documents, say:
          "Sorry, I couldn't find any information on that."
          If the information isn't available in the below documents, say:
          "Sorry, I couldn't find any information on that."
          Do not go off topic.
          Documents:
          ${injectedDocs}
        `,
      },
      ...messages,
    ];

    // Create the AI completion stream
    const completionStream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: completionMessages,
      max_tokens: 1024,
      temperature: 0,
      stream: true,
    });

    // Stream the response back to the client
    const stream = OpenAIStream(completionStream);
    return new StreamingTextResponse(stream, { headers: corsHeader });
  } catch (error) {
    // Catch-all error handler
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Unexpected error occurred.' }),
      {
        status: 500,
        headers: {
          ...corsHeader,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
