import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request) {
  const { question, avatar } = await request.json();

  const context =
    avatar === "Sagan"
      ? "I am an AI programmed to talk like Carl Sagan, focusing on the wonder and beauty of the cosmos."
      : "I am an AI programmed to talk like Neil deGrasse Tyson, focusing on the facts and excitement of science.";

  const prompt = `The following is a conversation with an AI assistant who is ${context}\nHuman: ${question}\nAI: `;

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });

  const answer = response.choices[0]?.text.trim();

  return NextResponse.json({ answer });
}
