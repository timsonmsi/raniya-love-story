"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";

const COLOR = "#AB47BC";
const BG = "#120a1a";

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

export function ChapterSummer({ onBack }: Props) {
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

// Stage 1: Climb stairs from BOTTOM to TOP
function Stage1({ onDone }: { onDone: () => void }) {
  const [steps, setSteps] = useState(0);
  const totalSteps = 10;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Summer 2025</p>
        <h2 className="text-2xl font-bold text-white">Rooftop Climb</h2>
        <p className="text-white/50 text-sm mt-2">Click to climb the stairs</p>
      </motion.div>

      {/* Stairs visual - built from bottom to top */}
      <div className="relative z-10 flex flex-col-reverse gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === steps) {
                setSteps(i + 1);
                if (i + 1 === totalSteps) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-48 h-6 rounded flex items-center justify-center text-xs"
            style={{
              background: i < steps ? `${COLOR}60` : i === steps ? `${COLOR}30` : "#1a1a1a",
              border: `1px solid ${COLOR}`,
              opacity: i <= steps ? 1 : 0.5,
            }}
            animate={i === steps ? { x: [0, 5, -5, 0] } : {}}
            whileHover={i === steps ? { scale: 1.02 } : {}}>
            {i < steps ? "━━━" : "━━━"}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">Steps: {steps} / {totalSteps}</p>

      {/* Rooftop indicator at top */}
      {steps === totalSteps && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl z-10"
        >
          🏠 ☀️
        </motion.div>
      )}
    </motion.div>
  );
}

// Stage 2: Deep talk topics - reveal cards
function Stage2({ onDone }: { onDone: () => void }) {
  const topics = ["Dreams", "Fears", "Future", "Love", "Family", "Goals"];
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Deep Talks</p>
        <h2 className="text-2xl font-bold text-white">Heart to Heart</h2>
        <p className="text-white/50 text-sm mt-2">Reveal all topics</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 z-10">
        {topics.map((topic, i) => (
          <motion.button key={i}
            onClick={() => {
              const newRevealed = new Set(revealed);
              newRevealed.add(i);
              setRevealed(newRevealed);
              if (newRevealed.size === topics.length) setTimeout(() => onDone(), 500);
            }}
            className="w-24 h-24 rounded-xl flex items-center justify-center text-center p-2"
            style={{
              background: revealed.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            animate={revealed.has(i) ? { scale: [1, 1.05, 1], rotateY: 180 } : {}}
            whileHover={{ scale: 1.05 }}>
            <span className="text-white text-xs font-semibold">{topic}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{revealed.size} / {topics.length} topics shared</p>
    </motion.div>
  );
}

// Stage 3: Time passer - stay until morning
function Stage3({ onDone }: { onDone: () => void }) {
  const [hour, setHour] = useState(20); // 8 PM
  const [canProceed, setCanProceed] = useState(false);

  const passTime = () => {
    const newHour = hour + 1;
    setHour(newHour);
    if (newHour >= 6) { // 6 AM
      setCanProceed(true);
      setTimeout(() => onDone(), 500);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">All Night</p>
        <h2 className="text-2xl font-bold text-white">Until Sunrise</h2>
        <p className="text-white/50 text-sm mt-2">Pass the hours together</p>
      </motion.div>

      <div className="relative z-10">
        <motion.div className="w-48 h-48 rounded-full flex items-center justify-center text-6xl"
          style={{
            background: `radial-gradient(circle, ${COLOR}40, ${COLOR}10)`,
            border: `3px solid ${COLOR}`,
          }}
          animate={{ rotate: hour >= 6 ? 360 : 0 }}
          transition={{ duration: 1 }}>
          {hour >= 6 && hour < 12 ? "🌅" : hour >= 18 ? "🌆" : "🌙"}
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-white mt-16">
            {hour === 0 ? "12 AM" : hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} AM` : `${hour}:00`}
          </span>
        </div>
      </div>

      <motion.button onClick={passTime} disabled={canProceed}
        className="px-8 py-3 rounded-full text-sm font-semibold z-10"
        style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR, opacity: canProceed ? 0.5 : 1 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {canProceed ? "Sunrise Came" : "Pass an hour →"}
      </motion.button>

      <p className="text-white/50 text-xs z-10">I had work at 8:30 AM, but it didn't matter...</p>
    </motion.div>
  );
}

// Stage 4: Tribute
function Stage4({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div key={i} className="absolute text-xl"
          style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
          animate={{ y: [0, -25, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "☀️" : i % 4 === 1 ? "🌅" : i % 4 === 2 ? "✨" : "💕"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🏠
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Rooftop Talks</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          We climbed the roof of our university and had deep talks there.
          Some days we spent time together until the morning.
          <br /><br />
          I had work starting at 8:30 AM, but it didn't matter.
          <span className="block text-white/40 text-xs mt-2 italic">Because I was having my best times with you.</span>
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
