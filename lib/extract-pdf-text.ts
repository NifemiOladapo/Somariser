import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const extractPdfText = async (pdfUrl: string) => {
  const res = await fetch(pdfUrl);
  const blob = await res.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const loader = new PDFLoader(new Blob([arrayBuffer]));

  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent).join("\n");
};
