-- Create the embeddings table with a checksum column
CREATE TABLE public.embeddings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  chatbotId uuid REFERENCES public.chatbots(id) ON DELETE CASCADE,
  chunks text NOT NULL,
  embedding vector(384), -- Assuming you're using pgvector with dimension 768
  metadata jsonb,
  type text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  checksum text NOT NULL
);

-- Create a unique index on the checksum column to prevent duplicates
CREATE UNIQUE INDEX unique_checksum_index ON public.embeddings (checksum);

-- Enable the pgvector extension if not already enabled
CREATE EXTENSION IF NOT EXISTS vector;
