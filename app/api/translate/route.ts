import { NextResponse } from 'next/server';
import { IndicTranslator } from '@/lib/indic-translator';

export async function POST(req: Request) {
  try {
    const { text, sourceLang, targetLang } = await req.json();
    
    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: 'Missing required fields: text, sourceLang, targetLang' },
        { status: 400 }
      );
    }

    const translator = new IndicTranslator();
    await translator.initialize();
    
    const translatedText = await translator.translate(text, sourceLang, targetLang);
    
    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to process translation' },
      { status: 500 }
    );
  }
}
