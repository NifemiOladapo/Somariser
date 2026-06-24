"use server";
import { getDbConnection } from "@/lib/db";
import { extractPdfText } from "@/lib/extract-pdf-text";
import { formatFileNameAsTitle } from "@/lib/format-utils";
import { generatePDFSummaryFromOpenRouter } from "@/lib/openrouter";
import { auth } from "@clerk/nextjs/server";

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
      const formattedFileName = formatFileNameAsTitle(fileName);
      return {
        success: true,
        message: "Summary generated successfully",
        data: {
          summary,
          title: formattedFileName,
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

const safePdfSummary = async ({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) => {
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
)
VALUES (
    ${userId},
    ${fileUrl},
    ${summary},
    ${title},
    ${fileName}
);`;
  } catch (error) {
    console.log(
      "Error saving PDF summary:",
      error instanceof Error && error.message,
    );

    throw error;
  }
};
export const storePDFSummary = async ({
  fileUrl,
  summary,
  title,
  fileName,
}: {
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }
    const savePdfSummary: any = await safePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    // console.log(savePdfSummary);

    // if (!savePdfSummary) {
    //   return {
    //     success: false,
    //     message: "failed to save PDF summary",
    //   };
    // }
    return {
      success: true,
      message: "PDF summary saved successfully",
    };
  } catch (error) {
    console.log(error instanceof Error && error.message);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while saving the summary",
    };
  }
};
