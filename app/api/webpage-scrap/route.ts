import { NextRequest, NextResponse } from 'next/server';
import { scrapeWebpage } from '@/services/scrapingService';

export async function POST(req: NextRequest) {
	const { url } = await req.json();
	try {
		const { text, metadata } = await scrapeWebpage(url);
		return NextResponse.json({ text, metadata }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
