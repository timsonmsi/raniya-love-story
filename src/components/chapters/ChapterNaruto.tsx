"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";

const COLOR = "#FF7043";
const BG = "#1a0d0a";

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

export function ChapterNaruto({ onBack }: Props) {
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

// Stage 1: Phone lock - no phones allowed
function Stage1({ onDone }: { onDone: () => void }) {
  const [locked, setLocked] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Spring 2026</p>
        <h2 className="text-2xl font-bold text-white">Naruto Quiz Night</h2>
        <p className="text-white/50 text-sm mt-2">No phones allowed!</p>
      </motion.div>

      <motion.button
        onClick={() => {
          setLocked(true);
          setTimeout(() => onDone(), 800);
        }}
        className="relative z-10"
        animate={locked ? { scale: [1, 1.1, 1] } : {}}
        whileHover={{ scale: 1.05 }}>
        <motion.div
          className="w-40 h-40 rounded-full flex items-center justify-center text-6xl"
          style={{
            background: `radial-gradient(circle, ${COLOR}40, ${COLOR}10)`,
            border: `3px solid ${COLOR}`,
          }}
          animate={{ rotateY: locked ? 180 : 0 }}
          transition={{ duration: 0.6 }}>
          {locked ? "🔒" : "📱"}
        </motion.div>
      </motion.button>

      <p className="text-white/50 text-sm z-10 max-w-md text-center">
        You couldn't even brain rot on Instagram or TikTok...
      </p>
    </motion.div>
  );
}

// Stage 2: Quiz questions - guess the answer
function Stage2({ onDone }: { onDone: () => void }) {
  const questions = [
    { q: "What is Naruto's dream?", a: "To become Hokage", emoji: "🍥" },
    { q: "What's his favorite food?", a: "Ramen", emoji: "🍜" },
    { q: "What's in his village?", a: "Hidden Leaf", emoji: "🍃" },
  ];
  const [current, setCurrent] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Quiz Time</p>
        <h2 className="text-2xl font-bold text-white">Naruto Knowledge</h2>
        <p className="text-white/50 text-sm mt-2">You knew nothing about it...</p>
      </motion.div>

      <div className="text-center z-10 space-y-6">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-white/70 text-lg">{questions[current].q}</p>
          <div className="text-6xl">{questions[current].emoji}</div>
          <p className="text-white/50 text-sm italic">{questions[current].a}</p>
        </motion.div>

        {current < questions.length - 1 ? (
          <motion.button
            onClick={() => setCurrent(current + 1)}
            className="px-8 py-3 rounded-full text-sm font-semibold"
            style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
            whileHover={{ scale: 1.05 }}>
            Next Question →
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onDone}
            className="px-8 py-3 rounded-full text-sm font-semibold"
            style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
            whileHover={{ scale: 1.05 }}>
            Quiz Complete! →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// Stage 3: Walk together - collect hearts
function Stage3({ onDone }: { onDone: () => void }) {
  const [collected, setCollected] = useState(0);
  const total = 5;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">After Quiz</p>
        <h2 className="text-2xl font-bold text-white">Night Walk</h2>
        <p className="text-white/50 text-sm mt-2">Collect moments together</p>
      </motion.div>

      <div className="relative w-80 h-60 z-10">
        {Array.from({ length: total }).map((_, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === collected) {
                setCollected(i + 1);
                if (i + 1 === total) setTimeout(() => onDone(), 500);
              }
            }}
            className="absolute w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 2) * 50}%`,
              background: i < collected ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            animate={{
              scale: i < collected ? [1, 1.1, 1] : i === collected ? [1, 1.3, 1] : 1,
              opacity: i <= collected ? 1 : 0.5,
            }}
            whileHover={{ scale: 1.1 }}>
            {i < collected ? "💕" : "✨"}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{collected} / {total} moments collected</p>
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
          animate={{ rotate: [0, 10, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 3 === 0 ? "🍜" : i % 3 === 1 ? "⭐" : "💕"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10 max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🍥
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Naruto Quiz</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          I invited you along with other friends. You knew nothing about the anime,
          but you came anyway.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          After the quiz, we had a little walk and had fun talking to each other.
          <span className="block text-white/40 text-xs mt-2 italic">Those small moments meant everything to me.</span>
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
