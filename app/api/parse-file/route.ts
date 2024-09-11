import { NextResponse } from 'next/server';
import mammoth from 'mammoth';

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  let content = '';

  try {
    const buffer = await file.arrayBuffer();

    if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
      content = result.value;
    } else if (file.type === 'text/plain') {
      content = await file.text();
    } else {
      throw new Error('Unsupported file type');
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error parsing file:', error);
    return NextResponse.json({ error: 'Failed to parse file' }, { status: 500 });
  }
}