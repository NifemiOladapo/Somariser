"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import NavigationControls from "./NavigationControls";
import ProgressBar from "./ProgressBar";
import { parseSection } from "@/lib/summary-helpers";
import ContentSection from "./ContentSection";


const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
        {title}
      </h2>
    </div>
  );
};
const SummaryViewer = ({ summary }: { summary: string }) => {
    console.log(summary)
  const [currentSection, setCurrentSection] = useState(0);
  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);
    console.log(sections)
  const handleNext = () => {
    setCurrentSection((prev) =>
      prev === sections.length - 1 ? prev : prev + 1,
    );
  };
  const handlePrevious = () => {
    setCurrentSection((prev) => (prev === 0 ? prev : prev - 1));
  };
  const handleSelectionSection = (index: number) => {
    setCurrentSection((prev) => (index > sections.length - 1 ? prev : index));
  };

  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <ProgressBar currentSection={currentSection} sections={sections.length} />
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6">
          <SectionTitle title={sections[currentSection]?.title || ""} />
         <ContentSection title={sections[currentSection]?.title || ""} points={sections[currentSection]?.points || []}/>
        </div>
      </div>
      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSelectionSection={handleSelectionSection}
      />
    </Card>
  );
};

export default SummaryViewer;
