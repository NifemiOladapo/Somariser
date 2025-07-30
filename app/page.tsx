import BgGradient from "@/components/common/BgGradient";
import DemoSection from "@/components/home/DemoSection";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="relative">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
      </div>
    </div>
  );
}
