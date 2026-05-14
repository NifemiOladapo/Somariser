import { GoogleGenAI } from "@google/genai";

export const generatePDFSummaryFromGemini = async () => {
  const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Are semicolons optional in JavaScript?",
      config: {
        systemInstruction: "Talk like a pirate.",
        maxOutputTokens: 1500,
        temperature: 0.7,
      },
    });

    const text = response.text;
    console.log(text);
    return text;
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
