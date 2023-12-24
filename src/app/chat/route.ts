import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log("key", process.env.OPENAI_API_KEY);
type RequestData = {
  currentModel: string;
  message: string;
};

export const runtime = "edge";

export async function POST(request: Request) {
  const { message } = (await request.json()) as RequestData;

  console.log(message);

  if (!message) {
    return new Response("No message in the request", { status: 400 });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `{
  "messageType": "CreateGoalRoadmap",
  "description": "This system message instructs the AI to create a roadmap for achieving user-defined goals. The AI will take a goal and its context as input from the user.",
  "instructions": {
    "acceptUserInput": {
      "goal": "User-defined objective",
      "context": "Background and details surrounding the goal"
    },
    "generateRoadmap": {
      "description": "Construct a data structure representing a roadmap of domains and skills required to achieve the goal",
      "structure": {
        "mainNodes": "High-level domains essential for the goal",
        "childNodes": {
          "description": "Contain detailed information and prerequisites related to each domain"
        }
      }
    }
  },
  "purpose": "This roadmap helps users understand and break down their goals into achievable steps, highlighting the necessary domains and skills in a structured manner."
}`,
      },
      { role: "user", content: message },
    ],
    max_tokens: 4096,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      for await (const part of completion) {
        const text = part.choices[0]?.delta.content ?? "";
        const chunk = encoder.encode(text);
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });

  return new Response(stream);
}
