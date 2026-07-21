import { NextResponse } from 'next/server';
import { getRelevantContext } from '../../../lib/knowledgeBase';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { message, history } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message payload is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        {
          error: 'GEMINI_API_KEY environment variable is missing or unconfigured. Please add your key to .env.local or Cloudflare Workers environment variables.',
        },
        { status: 500 }
      );
    }

    const retrievedContext = getRelevantContext(message);

    const systemInstructionText = `You are the official AI Assistant for Tesseract InfoSystems (https://tesseractinfosystems.com).
Your role is to assist visitors with accurate information regarding Tesseract InfoSystems, its software engineering services, cloud platform architectures, AI solutions, executive leadership, pricing estimates, careers, and contact channels.

CRITICAL BOUNDARY RULES:
1. Answer ONLY using the Tesseract InfoSystems Knowledge Base Context provided below.
2. If the user's question is NOT related to Tesseract InfoSystems or the information provided on this website (e.g. general trivia, general coding assistance unrelated to Tesseract, weather, recipes, general chat, movies, or world news), you MUST reply with EXACTLY:
"I'm sorry, I can only answer questions related to Tesseract InfoSystems and the information available on this website."
3. Do NOT make up facts or use general outside knowledge for non-Tesseract subjects.
4. Keep answers concise, polite, elegant, and formatted with markdown bullet points or bolding where helpful.

TESSERACT INFOSYSTEMS KNOWLEDGE BASE CONTEXT:
${retrievedContext}`;

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      history.slice(-6).forEach((h) => {
        if (h && h.content && (h.role === 'user' || h.role === 'model')) {
          contents.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: String(h.content) }],
          });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const geminiPayload = {
      systemInstruction: {
        parts: [{ text: systemInstructionText }],
      },
      contents,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 800,
      },
    };

    const modelsToTry = [
      'gemini-3.5-flash',
      'gemini-3.1-flash-lite',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
    ];

    let replyText = '';
    let primaryError: Error | null = null;
    let lastError: Error | null = null;

    for (let i = 0; i < modelsToTry.length; i++) {
      const modelName = modelsToTry[i];
      try {
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const res = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(geminiPayload),
        });

        if (res.ok) {
          const data = await res.json();
          const candidateText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (candidateText) {
            replyText = candidateText.trim();
            break;
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          console.warn(`Gemini API [${modelName}] failed:`, errData);
          const errMessage =
            errData?.error?.message || `Gemini API HTTP ${res.status} (${res.statusText})`;
          const currentErr = new Error(errMessage);

          if (i === 0) {
            primaryError = currentErr;
          }
          lastError = currentErr;
        }
      } catch (err: any) {
        if (i === 0) {
          primaryError = err;
        }
        lastError = err;
      }
    }

    if (!replyText) {
      const finalError = primaryError || lastError;
      const errorMessage =
        finalError?.message ||
        'Failed to receive a response from Gemini AI. Please check your GEMINI_API_KEY.';
      return NextResponse.json(
        { error: `Gemini API Error: ${errorMessage}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
