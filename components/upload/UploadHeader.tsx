import { Sparkles } from "lucide-react";

const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center">
      <div className="relative flex items-center px-6 py-2 text-base bg-white rounded-full group-hover:bg-gray-50 transition-colors  duration-200">
        <Sparkles className="h-6 w-6 text-rose-600 animate-pulse mr-2" />
        <p className="text-base ">Generate AI-Powered Content</p>
      </div>
      <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        <h1 className="font-bold py-6 text-center">
          Start uploading{" "}
          <span className="relative inline-block p-3">
            <span className="absolute -skew-y-1  bg-rose-50 inset-0 -z-10 rounded-md"></span>{" "}
            your PDF&apos;s
          </span>
        </h1>
      </div>
      <div className="text-lg leading-8 text-gray-600 max-w-2xl text-center">
        <p>Upload your pdf and let our AI do the magic</p>
      </div>
    </div>
  );
};

export default UploadHeader;
