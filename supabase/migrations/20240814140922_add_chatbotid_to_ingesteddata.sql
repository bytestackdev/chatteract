-- Step 1: Add the chatbot_id column to the ingestedData table
ALTER TABLE public.ingestedData
ADD COLUMN chatbot_id uuid;

-- Step 2: Add a foreign key constraint with ON DELETE CASCADE
ALTER TABLE public.ingestedData
ADD CONSTRAINT fk_chatbot
FOREIGN KEY (chatbot_id) 
REFERENCES public.chatbots(id)
ON DELETE CASCADE;
