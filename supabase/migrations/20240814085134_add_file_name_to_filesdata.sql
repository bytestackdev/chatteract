-- Alter the filesdata table to add a new column 'file_name' of type text
ALTER TABLE public.filesdata
ADD COLUMN file_name text NOT NULL;

-- Add a unique index on the 'file_path' column
CREATE UNIQUE INDEX unique_file_path_index ON public.filesdata (file_path);
