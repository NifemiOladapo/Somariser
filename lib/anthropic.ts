import Anthropic from "@anthropic-ai/sdk";

export const generatePDFSummaryFromAnthropic = async () => {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001", // fast & cheap, good for testing
      max_tokens: 1500,
      system: "Talk like a pirate.", // system prompt is a top-level param
      messages: [
        {
          role: "user",
          content: "Are semicolons optional in JavaScript?",
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    console.log(text);
    return text;
  } catch (error: any) {
    console.error("Error calling Anthropic API:", error);
    throw error;
  }
};
