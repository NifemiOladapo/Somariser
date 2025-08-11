import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UploadFormInput = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          accept="application/pdf"
          required
          id="file"
          name="file"
          className=""
        />
        <Button>Upload your PDF </Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
