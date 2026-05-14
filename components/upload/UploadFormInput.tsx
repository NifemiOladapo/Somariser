import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}

export const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(({ onSubmit, loading }, ref) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={ref}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          accept="application/pdf"
          required
          id="file"
          name="file"
          className={cn(loading && "cursor-not-allowed opacity-50")}
          disabled={loading}
        />
        <Button
        disabled={loading}
        >{
            loading ? <><Loader2 className="animate-spin mr-2 h-4 w-4" />  Processing...</> : "Upload your PDF"
          }</Button>
      </div>
    </form>
  );
})

export default UploadFormInput;
