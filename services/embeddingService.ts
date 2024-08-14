import _, { chunk } from 'lodash';
import axios from 'axios';
// import { GROQ_API_URL, GROQ_API_KEY } from '../config/groq';
// import { SUPABASE_URL, SUPABASE_KEY } from '../config/constant';
import { Groq } from 'groq-sdk';
import { createClient } from '@/utils/supabase/server';
// import { createClient } from '@/utils/supabase/client';
import crypto from 'crypto';

const CHUNK_SIZE = 1000;

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const groq = new Groq({
  apiKey: process.env.GROQ,
});

// Define types
type Metadata = {
  [key: string]: any;
};

type ProcessedChunk = {
  chunk: string;
  embedding: any;
  metadata: Metadata;
};

type CreateEmbeddingResponse = {
  embeddings: {
    embedding: any;
  }[];
};

function chunkText(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  return chunks;
}

function generateChecksum(chunk: string) {
  return crypto.createHash('sha256').update(chunk).digest('hex');
}


// async function getEmbedding(text: string): Promise<any> {
//   try{
// 		const response = await groq.embeddings.create({
// 			model: "gemma-7b-it",
// 			input: text,
// 		});

// 		console.log('embedding-response ->', response)
// 		return response.embeddings[0].embedding;
// 	} catch(error){
// 		console.error('Error getting embedding:', error);
// 	}
// }

async function storeInSupabase(processedChunks: ProcessedChunk[], chatbotId: string, dataType: string, ingestedDocId: string): Promise<any> {
  try {
    const supabase = createClient();
    const records = processedChunks.map((item) => ({
      chatbotid: chatbotId,
      chunks: item.chunk,
      embedding: JSON.parse(item.embedding).embedding,
      metadata: item.metadata,
      type: dataType,
      checksum: generateChecksum(item.chunk),
      ingested_data_id: ingestedDocId
    }));

    const { data, error } = await supabase
      .from('embeddings')
      .insert(records)
      .select('id');

    if (error) {
      if (error.code === '23505') {
        // Duplicate key error, treat it as a safe case
        console.warn('Duplicate checksum detected, skipping insertion:', error.details);
        return { success: true, message: 'Duplicate checksum, skipping insertion.' };
      } else {
        // Log other errors for debugging purposes
        console.error('Error inserting text embeddings:', error);
        return { success: false, message: 'Error inserting embeddings.', error: error.message };
      }
    }

    return { success: true, data };

  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'Unexpected error occurred.', error: error };
  }
}


export const chunkAndEmbedText = async (text: string, metadata: Metadata, chatbotId: string, dataType: string, ingestedDocId: string, chunkSize: number = CHUNK_SIZE): Promise<{ message: string; chunkCount: number }> => {
  try {
    // const supabase = createClient()
    // const { data, error } = await supabase.from('ingesteddata').insert({ content: text, type: dataType }).select('id')

    // if (error) {
    //   throw new Error('Failed to insert data to DB')
    // }

    // const ingestedDocId = data[0].id

    const chunks = chunkText(text, chunkSize);
    const processedChunks: ProcessedChunk[] = await Promise.all(
      chunks.map(async (chunk, index) => {
        const embedding = await generateEmbeddingsFromSupbaseGteSmall(chunk);
        return {
          chunk,
          embedding,
          metadata: { ...metadata, chunkIndex: index },
        };
      })
    );

    const response = await storeInSupabase(processedChunks, chatbotId, dataType, ingestedDocId);

    if (response.success) {
      return { message: 'Text processed and stored successfully', chunkCount: chunks.length };
    } else {
      throw new Error('Failed to store embeddings in DB');
    }
  } catch (error) {
    console.error('Error processing text:', error);
    throw new Error('Failed to chunk and embed text');
  }
};

const generateEmbeddingsFromSupbaseGteSmall = async (text: string): Promise<string> => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      "Content-Type": 'application/json'
    }

    const response = await axios.post('https://qqfanrpbjwoxpontowbj.supabase.co/functions/v1/textembed', { text: text }, {
      headers
    })

    return JSON.stringify(response.data);
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw new Error('Failed to generate embeddings');
  }
};