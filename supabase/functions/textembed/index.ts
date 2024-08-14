import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { corsHeader } from "../_shared/cors.ts";

const model = new Supabase.ai.Session('gte-small');

Deno.serve(async (req) => {
  try {

    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: corsHeader
      })
    }

    const contentType = req.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Invalid content type, expected application/json" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const jsonBody = await req.json();

    if (!jsonBody || typeof jsonBody.text !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body, expected a 'text' field" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { text } = jsonBody;

    const output = (await model.run(text, {
      mean_pool: true,
      normalize: true,
    })) as number[];

    return new Response(
      JSON.stringify({ embedding: output }),
      { headers: { ...corsHeader, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error('Error:', err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
})
