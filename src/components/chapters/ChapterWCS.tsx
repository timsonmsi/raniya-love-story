"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Camera, Video } from "lucide-react";

const COLOR = "#EF5350";
const BG = "#1a0a0a";

interface Props { onBack: () => void; }

function StageDots({ stage, total }: { stage: number; total: number }) {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full transition-all duration-500"
          style={{ backgroundColor: i < stage ? COLOR : "rgba(255,255,255,0.15)", boxShadow: i < stage ? `0 0 6px ${COLOR}` : "none" }} />
      ))}
    </div>
  );
}

export function ChapterWCS({ onBack }: Props) {
  const [stage, setStage] = useState(1);
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: BG }}>
      <StageDots stage={stage} total={4} />
      <button onClick={onBack} className="absolute top-8 left-8 z-50 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors">← Timeline</button>
      <AnimatePresence mode="wait">
        {stage === 1 && <Stage1 key="s1" onDone={() => setStage(2)} />}
        {stage === 2 && <Stage2 key="s2" onDone={() => setStage(3)} />}
        {stage === 3 && <Stage3 key="s3" onDone={() => setStage(4)} />}
        {stage === 4 && <Stage4 key="s4" onBack={onBack} />}
      </AnimatePresence>
    </div>
  );
}

// Stage 1: Camera setup
function Stage1({ onDone }: { onDone: () => void }) {
  const [setup, setSetup] = useState<Set<number>>(new Set());
  const tasks = ["📷 Camera", "🎬 Stabilizer", "💾 Memory Card", "🔋 Battery"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Summer 2025</p>
        <h2 className="text-2xl font-bold text-white">WCS Project</h2>
        <p className="text-white/50 text-sm mt-2">Setup the equipment</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10">
        {tasks.map((task, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!setup.has(i)) {
                const newSetup = new Set(setup);
                newSetup.add(i);
                setSetup(newSetup);
                if (newSetup.size === tasks.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-56 px-6 py-4 rounded-xl flex items-center gap-4"
            style={{
              background: setup.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${setup.has(i) ? COLOR : "#333"}`,
            }}
            animate={setup.has(i) ? { x: [0, 10, 0] } : {}}
            whileHover={{ scale: 1.02 }}>
            <span className="text-3xl">{task.split(" ")[0]}</span>
            <span className="text-white">{task.split(" ")[1]}</span>
            {setup.has(i) && <span className="ml-auto text-green-400">✓</span>}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{setup.size} / {tasks.length} items ready</p>
    </motion.div>
  );
}

// Stage 2: Video Editing Timeline (replaced Stabilizer Lesson)
function Stage2({ onDone }: { onDone: () => void }) {
  const [clips, setClips] = useState<number[]>([]);
  const totalClips = 6;

  const toggleClip = (i: number) => {
    if (!clips.includes(i)) {
      const newClips = [...clips, i];
      setClips(newClips);
      if (newClips.length === totalClips) setTimeout(() => onDone(), 500);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Editing</p>
        <h2 className="text-2xl font-bold text-white">Build The Timeline</h2>
        <p className="text-white/50 text-sm mt-2">Add all clips to timeline</p>
      </motion.div>

      <div className="flex gap-2 z-10">
        {Array.from({ length: totalClips }).map((_, i) => (
          <motion.button key={i}
            onClick={() => toggleClip(i)}
            className="w-14 h-24 rounded-lg flex flex-col items-center justify-center gap-1"
            style={{
              background: clips.includes(i) ? `${COLOR}60` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            animate={clips.includes(i) ? { scale: [1, 1.1, 1], y: [0, -5, 0] } : {}}
            whileHover={{ scale: 1.05 }}>
            <span className="text-xl">🎬</span>
            <span className="text-xs text-white/70">Clip {i + 1}</span>
          </motion.button>
        ))}
      </div>

      <div className="w-64 h-16 rounded-lg z-10 relative overflow-hidden" style={{ background: "#1a1a1a", border: `2px solid ${COLOR}` }}>
        {/* Timeline track */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-10 flex gap-1 items-center">
          {clips.map((clipIndex, i) => (
            <motion.div key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex-1 h-full rounded"
              style={{ background: `${COLOR}60` }}
            />
          ))}
        </div>
      </div>

      <p className="text-white/50 text-sm z-10">{clips.length} / {totalClips} clips added</p>
    </motion.div>
  );
}

// Stage 3: Color grading
function Stage3({ onDone }: { onDone: () => void }) {
  const [graded, setGraded] = useState<Set<number>>(new Set());
  const adjustments = [
    { emoji: "☀️", name: "Exposure" },
    { emoji: "🎨", name: "Saturation" },
    { emoji: "🌡️", name: "Temperature" },
    { emoji: "✨", name: "Contrast" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Color Grading</p>
        <h2 className="text-2xl font-bold text-white">Perfect The Look</h2>
        <p className="text-white/50 text-sm mt-2">Adjust all settings</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 z-10">
        {adjustments.map((adj, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!graded.has(i)) {
                const newGraded = new Set(graded);
                newGraded.add(i);
                setGraded(newGraded);
                if (newGraded.size === adjustments.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-32 h-24 rounded-xl flex flex-col items-center justify-center gap-2"
            style={{
              background: graded.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            animate={graded.has(i) ? { scale: [1, 1.05, 1] } : {}}
            whileHover={{ scale: 1.05 }}>
            <span className="text-3xl">{adj.emoji}</span>
            <span className="text-white text-sm">{adj.name}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{graded.size} / {adjustments.length} adjustments made</p>
    </motion.div>
  );
}

// Stage 4: Tribute
function Stage4({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div key={i} className="absolute text-xl"
          style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 3 === 0 ? "📸" : i % 3 === 1 ? "🎥" : "🏆"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10 max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🏆
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Best Project</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          We shot and edited your WCS project together. When you showed it to your professor,
          he said it was the best work in the entire course history.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          He started showing your work as an example to all his students.
          <span className="block text-white/40 text-xs mt-2 italic">I was so proud of you.</span>
        </p>

        <motion.button onClick={onBack} className="px-10 py-3 rounded-full text-sm font-semibold"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          ← Back to Timeline
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
