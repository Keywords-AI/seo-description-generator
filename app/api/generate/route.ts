import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { content, model, customer_credentials } = await request.json();

  if (!process.env.KEYWORDS_AI_API_KEY) {
    return NextResponse.json({ error: "API key is not set" }, { status: 500 });
  }

  const client = new OpenAI({
    baseURL: "https://api.keywordsai.co/api",
    apiKey: process.env.KEYWORDS_AI_API_KEY,
  });

  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert SEO copywriter. Your task is to create a concise, compelling, and SEO-friendly description for a blog post based on its content. Follow these guidelines:\n\nRead the provided blog content carefully.\nIdentify the main topic and key points of the blog post.\nWrite a description that:\n\n- Is between 150-160 characters long (including spaces)\n- Accurately summarizes the main idea of the blog post\n- Includes the primary keyword or keyphrase naturally\n- Uses active voice and engaging language\n- Creates curiosity to encourage click-throughs\n- Avoids clickbait or misleading information\n\n",
        },
        { role: "user", content: `${content}` },
      ],
      model: model,
      // @ts-expect-error - customer_credentials is not part of the standard OpenAI API types
      customer_credentials: customer_credentials,
    });

    // const result = await response.json();
    return NextResponse.json({
      description: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate SEO description, please check your credentials" },
      { status: 500 }
    );
  }
}
