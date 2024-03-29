import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  // Check if the OPENAI_API_KEY is set, if not return 400
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY – make sure to add it to your .env file.",
      {
        status: 400,
      },
    );
  }

  let { prompt }= await req.json();
  const response = await fetch('https://run.dingjunjie.com/v1/chat/completions', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'authorization': "Bearer " + req.headers.get('openaikey'),
    },
    body: JSON.stringify(
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an AI writing assistant that continues existing text based on context from prior text. " +
              "Give more weight/priority to the later characters than the beginning ones. " +
              "Limit your response to no more than 200 characters, but make sure to construct complete sentences.",
            // we're disabling markdown for now until we can figure out a way to stream markdown text with proper formatting: https://github.com/steven-tey/novel/discussions/7
            // "Use Markdown formatting when appropriate.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        n: 1,
      }
    ),
  });

  // If the response is unauthorized, return a 401 error
  if (response.status === 401) {
    return new Response("Error: You are unauthorized to perform this action", {
      status: 401,
    });
  }
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}