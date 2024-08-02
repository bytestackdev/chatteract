import _, { chunk } from 'lodash';
import axios from 'axios';
// import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { GROQ_API_URL, GROQ_API_KEY } from '../config/groq';
// import { SUPABASE_URL, SUPABASE_KEY } from '../config/constant';
import { Groq } from 'groq-sdk';

const CHUNK_SIZE = 1000;

// const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }
  return chunks;
}

async function getEmbedding(text: string): Promise<any> {
  try{
		const response = await groq.embeddings.create({
			model: "llama3-embed",
			input: text,
		});
	
		console.log('embedding-response ->', response)
		return response.embeddings[0].embedding;
	} catch(error){
		console.error('Error getting embedding:', error);
	}
}

// async function storeInSupabase(processedChunks: ProcessedChunk[]): Promise<any> {
//   const { data, error } = await supabase
//     .from('text_chunks')
//     .insert(processedChunks);

//   if (error) throw error;
//   return data;
// }

export const chunkAndEmbedText = async (text: string, metadata: Metadata, chunkSize: number = CHUNK_SIZE): Promise<{ message: string; chunkCount: number }> => {
  try {
    const chunks = chunkText(text, chunkSize);
		console.log('chunks--->', chunks)
    const processedChunks: ProcessedChunk[] = await Promise.all(
      chunks.map(async (chunk, index) => {
        const embedding = await getEmbedding(chunk);
        return {
          chunk,
          embedding,
          metadata: { ...metadata, chunkIndex: index },
        };
      })
    );

    console.log('processedChunks->', processedChunks);
    // await storeInSupabase(processedChunks);

    return { message: 'Text processed and stored successfully', chunkCount: chunks.length };
  } catch (error) {
    throw new Error('Failed to chunk and embed text');
  }
};

// export const chunkAndEmbedText2 = async (text: string, metadata: Metadata): Promise<void> => {
//   try {
//     const chunks = _.chunk(text.split(' '), CHUNK_SIZE).map(chunk => chunk.join(' '));

//     for (const chunk of chunks) {
//       const embeddingResponse = await axios.post(GROQ_API_URL, { text: chunk });
//       const embedding = embeddingResponse.data.embedding;
//       console.log('embedding->', embedding)
//       // const { data, error } = await supabase
//       //   .from('embeddings')
//       //   .insert([{ chunk, embedding, metadata }]);

//       // if (error) {
//       //   throw error;
//       // }
//     }
//   } catch (error) {
//     throw new Error('Failed to chunk and embed text');
//   }
// };
