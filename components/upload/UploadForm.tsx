"use client";

import { toast } from "sonner";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/lib/useUploadThing";
import { useRouter } from "next/navigation";
import { generatePdfSummary } from "@/actions/uploadActions";

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  })
  .refine((file) => file.size <= 20 * 1024 * 1024, {
    message: "File must be smaller than 20MB",
  });

const UploadForm = () => {
  const { push } = useRouter();
  const { startUpload, routeConfig } = useUploadThing(
    (routeRegistry) => routeRegistry.pdfUploader,
    {
      onClientUploadComplete: () => {
        console.log("upload successful");
      },
      onUploadError: (err) => {
        console.log("error occured while uploading", err);
        toast.error(err.message);
        if (err.message === "UploadThingError: Unauthorized") {
          push("/");
        }
      },
      onUploadBegin: (file) => {
        console.log("Upload began for:", file);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const result = fileSchema.safeParse(file);
    if (!result.success) {
      console.log(result.error.flatten().formErrors[0]);
      toast.error(result.error.flatten().formErrors[0]);
      return;
    }
    toast.info("We are uploading your PDF...");

    const res = await startUpload([file]);
    if (!res) {
      toast.error("Please use different file type");
      return;
    }
    toast.info("Hold tight! Our AI is reading through your PDF!");
    const summary = await generatePdfSummary(res);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
