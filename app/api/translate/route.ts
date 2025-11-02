import { NextResponse } from 'next/server';

// IndicTrans2 Python service URL
const TRANSLATION_SERVICE_URL = process.env.TRANSLATION_SERVICE_URL || 'http://127.0.0.1:5000';

export async function POST(req: Request) {
  try {
    const { text, sourceLang, targetLang } = await req.json();
    
    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: 'Missing required fields: text, sourceLang, targetLang' },
        { status: 400 }
      );
    }

    // Call the IndicTrans2 Python service
    const response = await fetch(`${TRANSLATION_SERVICE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        sourceLang,
        targetLang,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Translation service error:', errorData);
      return NextResponse.json(
        { error: errorData.error || 'Translation service unavailable' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      translatedText: data.translatedText,
      timeMs: data.timeMs 
    });
  } catch (error) {
    console.error('Translation error:', error);
    
    // If connection fails, provide helpful error message
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { 
          error: 'Translation service is not running. Please start it with: python services/translation_service.py --http' 
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process translation' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const response = await fetch(`${TRANSLATION_SERVICE_URL}/health`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: 'Translation service unavailable' },
      { status: 503 }
    );
  }
}
