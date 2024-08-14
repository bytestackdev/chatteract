-- Step 1: Create the enum type for 'type'
CREATE TYPE content_type AS ENUM ('text', 'website', 'file', 'qna', 'notion');

-- Step 2: Create the ingestedData table
CREATE TABLE public.ingestedData (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  content text NOT NULL,
  type content_type NOT NULL
);

-- Step 3: Add a foreign key column to the embeddings table
ALTER TABLE public.embeddings
ADD COLUMN ingested_data_id uuid REFERENCES public.ingestedData(id) ON DELETE CASCADE;

-- Step 3: Add a foreign key column to the filesdata table
ALTER TABLE public.filesdata
ADD COLUMN ingested_data_id uuid REFERENCES public.ingestedData(id) ON DELETE CASCADE;
