import OpenAI from "openai";

export const generatePDFSummaryFromOpenAI = async () => {
  console.log("This is where the OpenAI API call will happen");

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_completion_tokens: 1500,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "Are semicolons optional in JavaScript?",
        },
      ],
    });
    const text = response.choices[0].message;
    console.log(text);
    return text;
  } catch (error: any) {
    console.log("Error calling OpenAI API:", error);
    if (error.status === 429) {
    }
  }
  console.log("This is where the OpenAI API call will happen");
};
