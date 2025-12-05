import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message, image } = await req.json();  

    let messages = [
      {
        role: "system",
        content: "You are a helpful assistant that can analyze images.",
      },
    ];

    if (image) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message || "Analyze this image" },
          {
            type: "image_url",
            image_url: { url: image }, // base64
          },
        ],
      });
    } else {
      messages.push({ role: "user", content: message });
    }

    const model = image ? "gpt-5-nano" : "gpt-4o-mini";

    const stream = await client.chat.completions.create({
      model,
      messages,
      stream: true, // IMPORTANT
    });

    // Streaming response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices?.[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
