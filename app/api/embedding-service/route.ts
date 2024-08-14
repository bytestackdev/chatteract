import { NextRequest, NextResponse } from 'next/server';
import { chunkAndEmbedText } from '@/services/embeddingService';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
	const { data, chatbotId, dataType, ingestedDocId } = await req.json();
	const supabase = createClient()
	try {
		let results;
		if (Array.isArray(data)) {
			results = await Promise.all(
				data.map(async (item) => {

					const { data, error } = await supabase.from('ingesteddata').insert({ content: item.text, type: 'website', chatbot_id: chatbotId }).select('id')

					if (error) {
						console.error('Error inserting data to DB:', error);
						throw new Error('Failed to insert data to DB')
					}
			
					const ingestedDocId = data[0].id

					return await chunkAndEmbedText(item.text, item.metadata, chatbotId, dataType, ingestedDocId);
				})
			);
		} else {
			results = await chunkAndEmbedText(data.text, data.metadata, chatbotId, dataType, ingestedDocId);
		}

		return NextResponse.json(results, { status: 200 });
	} catch (error: any) {
		console.error('Error in POST request:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
