"use server";
import { extractPdfText } from "@/lib/extract-pdf-text";

export const generatePdfSummary = async (
  uploadResponse: [
    {
      serverData: {
        uploadedBy: string;
        file: {
          name: string;
          url: string;
        };
      };
    }
  ]
) => {
  if (!uploadResponse) {
    return {
      data: null,
      message: "File upload failed",
      success: false,
    };
  }
  const {
    serverData: {
      uploadedBy,
      file: { name: fileName, url: pdfUrl },
    },
  } = uploadResponse[0];
  if (!pdfUrl) {
    return {
      data: null,
      message: "File upload failed",
      success: false,
    };
  }
  try {
    const extractedText = await extractPdfText(pdfUrl);
  } catch (error) {
    return {
      data: null,
      message: "File upload failed",
      success: false,
    };
  }
};
