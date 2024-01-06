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
  "description": "This system message instructs the AI to create a roadmap for achieving user-defined goals. The AI will take a goal and its context as input from the user. Return only JSON that matches the structure below.",
  "instructions": {
    "acceptUserInput": {
      "goal": "User-defined objective",
      "context": "Background and details surrounding the goal"
    },
    "generateRoadmap": {
      "description": "Construct JSON representing a roadmap of domains and skills required to achieve the goal",
      "structure": {
        "roadmap": "Top-level object. Has mainNodes. {roadmap: {alternate_goals: 'array of similar, but distinct goals related to the original goal', goal: 'Rephrase goal', context: 'Rephrase context', mainNodes: [mainNodes]}",
        "mainNodes": "High-level domains essential for the goal. Has childNodes. {estimated_duration: 'range of how long it could take to learn this group in work hours.' name: string, description: string, childNodes: [childNodes]}",
        "childNodes": "Skills for each mainNode. {name: string, description: string, resources: [resources]}",
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
