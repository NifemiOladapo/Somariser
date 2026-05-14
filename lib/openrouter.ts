import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "./promps";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const generatePDFSummaryFromOpenRouter = async (
  extractedText: string,
) => {
  try {
    const response = await client.chat.completions.create({
      model: "google/gemma-3-4b-it:free",
      messages: [
        {
          role: "user",
          content: `
          ${SUMMARY_SYSTEM_PROMPT}
          Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${extractedText}
`,
        },
      ],
      max_tokens: 2048,
    });

    const text = response.choices[0].message.content;

    if (!text) {
      throw new Error("Model returned an empty response");
    }
    return text;
  } catch (error: any) {
    const status = error?.status;
    if (status === 429) {
      throw new Error(
        "Rate limit reached. Please wait a moment and try again.",
      );
    }
    throw error;
    // if (status === 429) {
    //   return {
    //     data: null,
    //     error: "Rate limit reached. Please wait a moment and try again.",
    //   };
    // } else if (status === 400) {
    //   return {
    //     data: null,
    //     error: "The document may be too long or contain unsupported content.",
    //   };
    // } else if (status === 401) {
    //   return {
    //     data: null,
    //     error: "Invalid API key. Check your OPENROUTER_API_KEY.",
    //   };
    // } else if (status === 503) {
    //   return {
    //     data: null,
    //     error: "The AI model is temporarily unavailable. Try again shortly.",
    //   };
    // } else {
    //   return {
    //     data: null,
    //     error: error?.message ?? "Something went wrong generating the summary.",
    //   };
    // }
  }
};

const mockSummaries = {
  data: [
    "Kolawole Oladayo is a Junior Python Developer with experience at SSAFLogistics and EdSofta, currently pursuing a Bachelor of Marine Science and Technology.",
    "At SSAFLogistics, he developed and launched a new application in two months, implementing authentication, testing, and RESTful APIs using FastAPI.",
    "During his internship at EdSofta, he designed a C#-based test application, documented the codebase, and improved error handling.",
    "He resolved a critical bug in EdSoftaUTME, a UTME preparation application, leading to a 7% increase in the customer base.",
    "Kolawole developed a Bluecare Web Application using ReactJS and Django Rest Framework, optimizing APIs for improved performance.",
    "He actively contributed to open-source projects, showcasing his commitment to collaborative development.",
    "His technical skills include Python, Django, FastAPI, C# WPF, database management, and various development tools like Docker and Gitlab.",
    "He has experience with microservices architecture and collaborative coding practices, demonstrated through merge requests and pull requests.",
  ],
  error: null,
};
