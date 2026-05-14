"use client";

import { toast } from "sonner";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/lib/useUploadThing";
import { useRouter } from "next/navigation";
import { generatePdfSummary } from "@/actions/uploadActions";
import { useRef, useState } from "react";

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  })
  .refine((file) => file.size <= 20 * 1024 * 1024, {
    message: "File must be smaller than 20MB",
  });


const UploadForm = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null);
  const { push } = useRouter();
  const { startUpload, routeConfig } = useUploadThing(
    (routeRegistry) => routeRegistry.pdfUploader,
    {
      onClientUploadComplete: async (response) => {
      },
      onUploadError: (err) => {
        console.log("error occured while uploading", err);
        toast.error(err.message);
        if (err.message === "Unauthorized") {
          push("/");
        }
      },
      onUploadBegin: (file) => {
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      const typeCheck = fileSchema.safeParse(file);
      if (!typeCheck.success) {
        toast.error(typeCheck.error.flatten().formErrors[0]);
        setLoading(false)
        return;
      }
      toast.info("We are uploading your PDF...");

      const res = await startUpload([file]);
      if (!res) {
        setLoading(false)
        return
      };

      toast.info("Hold tight! Our AI is reading through your PDF!");
      const summary = await generatePdfSummary(res);
      const { data = null, message, success } = summary || {}
      if (!success) {
        toast.error(message || "An error occurred while processing your PDF");
        setLoading(false)
        return;
      }
      if (data) {
        toast.success("Hang tight! We are saving your summary!");
        formRef.current?.reset();
        console.log(data.summary);
        // if(data.summary){
        //   //save the summary to the DB
        // }
      }
    } catch (error) {
      formRef.current?.reset();
      console.log((error as any).message || "An error occurred while processing your PDF");
      setLoading(false)
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} ref={formRef} loading={loading} />
    </div>
  );
};

export default UploadForm;
