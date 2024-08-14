import { NextRequest, NextResponse } from 'next/server'
import pdf from 'pdf-parse'
import { Buffer } from 'buffer'
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function POST(request: NextRequest) {
  try {
    // console.log(request)
    const file = await request.arrayBuffer();
    // const buffer = Buffer.from(file);

    const blob = new Blob([file], { type: 'application/pdf' });
    const loader = new WebPDFLoader(blob);

    const docs = await loader.load();

    console.log(docs[0].pageContent)
    console.log(docs[0].metadata)

    // const data = await pdf(buffer);

    return NextResponse.json({ text: docs[0].pageContent }, { status: 200 });
  } catch (error: any) {
    console.error('Error parsing PDF:', error);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'API Route is working!' }, { status: 200 });
}