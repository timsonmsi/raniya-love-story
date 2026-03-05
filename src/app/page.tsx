"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IntroSequence } from "@/components/shared/IntroSequence";
import { Timeline } from "@/components/timeline/Timeline";
import { ChapterIntro } from "@/components/shared/ChapterIntro";
import { PreloadAssets } from "@/components/shared/PreloadAssets";
import { CelebratePage } from "@/components/shared/CelebratePage";
import {
  ChapterYBS,
  ChapterRamadan,
  ChapterBBQ,
  ChapterNaruto,
  ChapterWCS,
  ChapterOffice,
  ChapterSummer,
  ChapterF1,
  ChapterOcean,
  ChapterChanwon,
  ChapterThailand,
  ChapterIGEM,
  ChapterCraig,
  ChapterHiggsfield,
  ChapterDriving,
  ChapterOctober,
  ChapterNovember,
} from "@/components/chapters";

const CHAPTERS = [
  { id: "ybs", name: "YBS", color: "#FF6B9D", year: "2019-2025" },
  { id: "ramadan", name: "First Meeting", color: "#FF8E53", year: "Ramadan 2025" },
  { id: "bbq", name: "BBQ Party", color: "#FFA726", year: "Spring 2025" },
  { id: "naruto", name: "Naruto Quiz", color: "#FF7043", year: "Spring 2025" },
  { id: "wcs", name: "WCS Journey", color: "#EF5350", year: "Summer 2025" },
  { id: "office", name: "Office Days", color: "#EC407A", year: "Summer 2025" },
  { id: "summer", name: "Summer Memories", color: "#AB47BC", year: "Summer 2025" },
  { id: "f1", name: "F1 Movie", color: "#7E57C2", year: "Summer 2025" },
  { id: "ocean", name: "Ocean Basket", color: "#5C6BC0", year: "Summer 2025" },
  { id: "chanwon", name: "Chanwon", color: "#42A5F5", year: "June 2025" },
  { id: "thailand", name: "Thailand", color: "#26C6DA", year: "Summer 2025" },
  { id: "igem", name: "iGEM", color: "#26A69A", year: "Fall 2025" },
  { id: "craig", name: "Craig David", color: "#66BB6A", year: "September 2025" },
  { id: "higgsfield", name: "The Choice", color: "#8BC34A", year: "October 2025" },
  { id: "driving", name: "Driving Lessons", color: "#9CCC65", year: "October 2025" },
  { id: "october", name: "October 11", color: "#D4E157", year: "October 2025" },
  { id: "november", name: "November 10", color: "#FFEE58", year: "November 2025" },
];

type AppPhase = "loading" | "intro" | "timeline" | "chapterIntro" | "chapter" | "celebrate";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>("loading");
  const [activeChapter, setActiveChapter] = useState<typeof CHAPTERS[0] | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleAssetsLoaded = () => {
    console.log('✅ All assets loaded, starting intro...');
    setPhase("intro");
  };

  const handleSelectChapter = (chapter: typeof CHAPTERS[0]) => {
    setActiveChapter(chapter);
    setPhase("chapterIntro");
  };

  const handleIntroComplete = () => {
    setPhase("chapter");
  };

  const handleBack = () => {
    if (activeChapter) {
      setVisited((prev) => {
        const newSet = new Set(prev);
        newSet.add(activeChapter.id);
        return newSet;
      });
    }
    setActiveChapter(null);
    setPhase("timeline");
  };

  const handleCelebrate = () => {
    setPhase("celebrate");
  };

  const handleCelebrateBack = () => {
    setPhase("timeline");
  };

  return (
    <div className="w-screen h-screen bg-[#05050a] text-white overflow-hidden">
      {/* Loading screen - caches ALL assets before starting */}
      {phase === "loading" && (
        <PreloadAssets onComplete={handleAssetsLoaded} />
      )}

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" className="w-full h-full">
            <IntroSequence onComplete={() => setPhase("timeline")} />
          </motion.div>
        )}

        {phase === "timeline" && (
          <motion.div key="timeline" className="w-full h-full">
            <Timeline
              visited={visited}
              onSelect={handleSelectChapter}
              onCelebrate={handleCelebrate}
              scrollPosition={scrollPosition}
              onScrollChange={setScrollPosition}
            />
          </motion.div>
        )}

        {phase === "chapterIntro" && activeChapter && (
          <motion.div key="chapterIntro" className="w-full h-full">
            <ChapterIntro chapter={activeChapter} onComplete={handleIntroComplete} />
          </motion.div>
        )}

        {phase === "chapter" && activeChapter && (
          <motion.div key={`chapter-${activeChapter.id}`} className="w-full h-full">
            {activeChapter.id === "ybs" && <ChapterYBS onBack={handleBack} />}
            {activeChapter.id === "ramadan" && <ChapterRamadan onBack={handleBack} />}
            {activeChapter.id === "bbq" && <ChapterBBQ onBack={handleBack} />}
            {activeChapter.id === "naruto" && <ChapterNaruto onBack={handleBack} />}
            {activeChapter.id === "wcs" && <ChapterWCS onBack={handleBack} />}
            {activeChapter.id === "office" && <ChapterOffice onBack={handleBack} />}
            {activeChapter.id === "summer" && <ChapterSummer onBack={handleBack} />}
            {activeChapter.id === "f1" && <ChapterF1 onBack={handleBack} />}
            {activeChapter.id === "ocean" && <ChapterOcean onBack={handleBack} />}
            {activeChapter.id === "chanwon" && <ChapterChanwon onBack={handleBack} />}
            {activeChapter.id === "thailand" && <ChapterThailand onBack={handleBack} />}
            {activeChapter.id === "igem" && <ChapterIGEM onBack={handleBack} />}
            {activeChapter.id === "craig" && <ChapterCraig onBack={handleBack} />}
            {activeChapter.id === "higgsfield" && <ChapterHiggsfield onBack={handleBack} />}
            {activeChapter.id === "driving" && <ChapterDriving onBack={handleBack} />}
            {activeChapter.id === "october" && <ChapterOctober onBack={handleBack} />}
            {activeChapter.id === "november" && <ChapterNovember onBack={handleBack} />}
          </motion.div>
        )}

        {phase === "celebrate" && (
          <motion.div key="celebrate" className="w-full h-full">
            <CelebratePage onBack={handleCelebrateBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
