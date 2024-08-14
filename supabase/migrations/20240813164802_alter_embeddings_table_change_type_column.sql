-- Create the enum type if it doesn't already exist
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'chatbot_type') THEN
        CREATE TYPE chatbot_type AS ENUM ('text', 'website', 'file', 'qna', 'notion');
    END IF;
END $$;

-- Alter the embeddings table to change the type of the 'type' column from text to the enum 'chatbot_type'
ALTER TABLE public.embeddings
    ALTER COLUMN type TYPE chatbot_type USING type::chatbot_type;
