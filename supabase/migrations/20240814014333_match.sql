CREATE OR REPLACE FUNCTION match_document_sections(
  chatbot_id uuid,             -- Added chatbot_id parameter
  embedding vector(384),       -- Existing embedding parameter
  match_threshold float        -- Existing match_threshold parameter
)
RETURNS SETOF embeddings        -- Updated table name from document_sections to embeddings
LANGUAGE plpgsql
AS $$
#variable_conflict use_variable
BEGIN
  RETURN QUERY
  SELECT *
  FROM embeddings
  WHERE embeddings.chatbotid = chatbot_id           -- Filter by chatbot_id first
  AND embeddings.embedding <#> embedding < -match_threshold  -- Then apply the similarity filter
  ORDER BY embeddings.embedding <#> embedding;      -- Order by similarity
END;
$$;
