import BgGradient from "@/components/common/BgGradient";
import UploadForm from "@/components/upload/UploadForm";
import UploadHeader from "@/components/upload/UploadHeader";

const page = () => {
  return (
    <section className="min-h-dvh">
      <BgGradient />
      <div className="w-full max-w-7xl mx-auto px-6 py-24  sm:py-32 lg:px-8">
        <div className="flex flex-col gap-6 items-center justify-center text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default page;
