import { ArrowRight, Sparkle, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="relative mx-auto flex-col flex items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex">
        <div className="p-[1.1px] animate-gradient-x  relative overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 group">
          <div className="relative flex items-center px-6 py-2 text-base  bg-white rounded-full group-hover:bg-gray-50 transition-colors  duration-200">
            <Sparkles className="h-6 w-6 text-rose-600 animate-pulse mr-2" />
            <p className="text-base ">Powered by AI</p>
          </div>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center">
        Transform PDFs into{" "}
        <span className="relative inline-block p-3">
          concise
          <span
            className="-rotate-2 absolute bg-rose-50 inset-0 -z-10 rounded-md"
            aria-hidden
          ></span>
        </span>{" "}
        summaries
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds.
      </h2>
      <div>
        <Button className="text-white mt-6 hover:scale-110 bg-gradient-to-r  from-slate-900 to-rose-500 hover:bg-gradient-to-l transition-all duration-300 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16">
          <Link href={"/#pricing"} className="flex gap-2 items-center">
            <span>Try Somariser</span>
            <ArrowRight className="animate-pulse " />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
