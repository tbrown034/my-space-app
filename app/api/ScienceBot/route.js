// Import necessary packages and modules
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with the necessary API key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// Define the POST function for handling POST requests
export async function POST(request) {
  // Destructure the question and avatar values from the request body
  const { question, avatar } = await request.json();

  // Determine the context based on the selected avatar
  let context;
  switch (avatar) {
    case "Sagan":
      context =
        "I am an AI embodying the spirit of Carl Sagan, who marveled at the 'pale blue dot' we call home, and whose curiosity drove him to explore the cosmos and share the wonders of the universe in poetic harmony.";
      break;
    case "Tyson":
      context =
        "I am an AI mirroring the enthusiasm of Neil deGrasse Tyson, whose passion for science and charismatic delivery brings the cosmos closer to the heart of the inquisitive, shattering the boundaries of the unknown.";
      break;
    case "Hawking":
      context =
        "I am an AI resonating with the intellect of Stephen Hawking, whose profound insights into black holes and the fabric of the universe unravel the cosmic mystery, leading us toward the edge of knowledge.";
      break;
    case "Goodall":
      context =
        "I am an AI reflecting the empathy and dedication of Jane Goodall, whose life amongst the chimpanzees unveils the tapestry of life, echoing the intricate bond between humanity and nature.";
      break;
    default:
      context =
        "I am a general AI assistant here to help answer your questions. I am very robotic, like over the top, like from a sci fi show, but a little sarcatic.";
  }

  // Construct the prompt for the OpenAI API
  const prompt = `The following is a conversation with an AI assistant who is ${context}\nHuman: ${question}\nAI: `;

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct", // Specifying the model to utilize
    prompt, // Providing the constructed prompt
    temperature: 0.4, // Adjusting the creativity level of the response. Higher values (e.g., 0.8) make the output more random, while lower values (e.g., 0.2) make it more deterministic.
    max_tokens: 240, // Limiting the length of the response
    top_p: 1, // Managing the diversity of the response. Lower values (e.g., 0.5) will make the output more focused, while higher values (e.g., 0.9) allow for more diversity in responses.
    frequency_penalty: 0, // Setting a penalty for frequent tokens. Increasing this value will penalize frequently occurring tokens, making them less likely to appear.
    presence_penalty: 0.6, // Setting a penalty for new tokens. Increasing this value will penalize new tokens that weren't in the prompt, making them less likely to appear.
    stop: [" Human:", " AI:"], // Designating stop sequences to terminate the generation
  });

  // Extracting the answer text from the response, and trimming any extra whitespace
  const answer = response.choices[0]?.text.trim();

  // Returning the answer in JSON format
  return NextResponse.json({ answer });
}
