"use server";
import { generatePDFSummaryFromAnthropic } from "@/lib/anthropic";
import { extractPdfText } from "@/lib/extract-pdf-text";
import { generatePDFSummaryFromGemini } from "@/lib/gemini";
import { generatePDFSummaryFromOpenAI } from "@/lib/openai";
import { generatePDFSummaryFromOpenRouter } from "@/lib/openrouter";
import { success } from "zod";

export const generatePdfSummary = async (
  uploadResponse: [
    {
      serverData: {
        uploadedBy: string;
        file: {
          name: string;
          ufsUrl: string;
        };
      };
    },
  ],
) => {
  if (!uploadResponse) {
    return {
      data: null,
      message: "PDF processing failed",
      success: false,
    };
  }
  const {
    serverData: {
      uploadedBy,
      file: { name: fileName, ufsUrl: pdfUrl },
    },
  } = uploadResponse[0];
  if (!pdfUrl) {
    return {
      data: null,
      message: "PDF processing failed",
      success: false,
    };
  }
  try {
    const extractedText = await extractPdfText(pdfUrl);
    try {
      const summary = await generatePDFSummaryFromOpenRouter(extractedText);
      console.log(summary);

      if (!summary) {
        return {
          data: null,
          message: "Failed to generate summary",
          success: false,
        };
      }
      return {
        success: true,
        message: "Summary generated successfully",
        data: {
          summary,
        },
      };
    } catch (error) {
      console.log((error as any).message);
      return {
        data: null,
        message: (error as any).message || "Failed to generate summary",
        success: false,
      };
    }
  } catch (error) {
    return {
      data: null,
      message: "PDF processing failed",
      success: false,
    };
  }
};
