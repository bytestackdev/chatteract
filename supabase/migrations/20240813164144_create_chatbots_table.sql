-- Create the chatbots table
CREATE TABLE public.chatbots (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  active boolean DEFAULT false,
  name text NOT NULL ,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row-Level Security (RLS) on the chatbots table
ALTER TABLE public.chatbots ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to create chatbots
CREATE POLICY "Allow authenticated users to create chatbots"
ON public.chatbots
FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Policy: Allow users to select their own chatbots
CREATE POLICY "Allow users to select own chatbots"
ON public.chatbots
FOR SELECT
USING (auth.uid() = created_by);

-- Policy: Allow users to update their own chatbots
CREATE POLICY "Allow users to update own chatbots"
ON public.chatbots
FOR UPDATE
USING (auth.uid() = created_by);

-- Policy: Allow users to delete their own chatbots
CREATE POLICY "Allow users to delete own chatbots"
ON public.chatbots
FOR DELETE
USING (auth.uid() = created_by);
