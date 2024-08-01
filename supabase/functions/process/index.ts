import { createClient } from '@supabase/supabase-js';
import { processMarkdown } from '../_lib/markdown-parser.ts';
import { processPDF, processCSV, processDOCX, processPPTX } from '../_lib/text-processing.ts';

// These are automatically injected
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

Deno.serve(async (req) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return new Response(
      JSON.stringify({
        error: 'Missing environment variables.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const authorization = req.headers.get('Authorization');
  if (!authorization) {
    return new Response(
      JSON.stringify({
        error: 'Missing Authorization header.',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        authorization
      }
    },
    auth: {
      persistSession: false
    }
  })

  const { document_id } = await req.json();

  const { data: document } = await supabase
    .from('documents_with_storage_path')
    .select()
    .eq('id', document_id)
    .single();

  if (!document?.storage_object_path) {
    return new Response(
      JSON.stringify({
        error: 'Failed to find uploaded document.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const { data: file } = await supabase.storage
    .from('files')
    .download(document.storage_object_path);

  if (!file) {
    return new Response(
      JSON.stringify({
        error: 'Failed to download uploaded document.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Determine file type based on the file's name or extension
  const fileName = document.storage_object_path.split('/').pop(); // Extract file name from path
  const fileExtension = fileName ? fileName.split('.').pop()?.toLowerCase() : '';

  console.log(fileName, fileExtension)

  let fileContents = '';

  if (fileExtension === 'pdf') {
    const buffer = Buffer.from(await file.arrayBuffer());
    fileContents = await processPDF(buffer);
  } else if (fileExtension === 'csv') {
    const buffer = Buffer.from(await file.arrayBuffer());
    fileContents = await processCSV(buffer);
  } else if (fileExtension === 'docx') {
    const buffer = Buffer.from(await file.arrayBuffer());
    fileContents = await processDOCX(buffer);
  } else if (fileExtension === 'pptx') {
    const buffer = Buffer.from(await file.arrayBuffer());
    fileContents = await processPPTX(buffer);
  } else if (fileExtension === 'md') {
    fileContents = await file.text();
  } else {
    return new Response(
      JSON.stringify({
        error: 'Unsupported file type.',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (!fileContents) {
    return new Response(
      JSON.stringify({
        error: 'Failed to parse the document.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const processedMd = processMarkdown(fileContents);

  const { error } = await supabase.from('document_sections').insert(
    processedMd.sections.map(({ content }) => ({
      document_id,
      content,
    }))
  );

  if (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to save document sections' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  console.log(
    `Saved ${processedMd.sections.length} sections for file '${document.name}'`
  )

  return new Response(null, {
    status: 204,
    headers: { 'Content-Type': 'application/json' },
  });
});