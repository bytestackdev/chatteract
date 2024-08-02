import { NextRequest, NextResponse } from 'next/server';
import { chunkAndEmbedText } from '@/services/embeddingService';

export async function POST(req: NextRequest) {
	const { data } = await req.json();

	console.log('data->', data)

	const testData = data[2]
	try {
		const results = await chunkAndEmbedText(testData.text, testData.metadata);
		console.log('results->>>', results)
		return NextResponse.json({ status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
