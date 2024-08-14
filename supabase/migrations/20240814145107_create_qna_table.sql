-- Create the QnA table
CREATE TABLE public.QnA (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique ID for each record
  questions text NOT NULL,                        -- Column for storing questions
  answers text NOT NULL,                          -- Column for storing answers
  chatbotid uuid REFERENCES public.chatbots(id) ON DELETE CASCADE,  -- Foreign key to the chatbots table
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,     -- Foreign key to the users table (auth.users)
  created_at timestamp with time zone DEFAULT now()  -- Timestamp of when the record was created
);
