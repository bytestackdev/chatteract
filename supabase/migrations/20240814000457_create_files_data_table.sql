CREATE TABLE public.filesData (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  chatbot_id uuid REFERENCES public.chatbots(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  file_url text NOT NULL,
  uploaded_at timestamp with time zone DEFAULT now()
);