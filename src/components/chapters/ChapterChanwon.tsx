"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Trophy } from "lucide-react";

const COLOR = "#42A5F5";
const BG = "#0a101a";

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

export function ChapterChanwon({ onBack }: Props) {
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

// Stage 1: Competition preparation
function Stage1({ onDone }: { onDone: () => void }) {
  const [prep, setPrep] = useState(0);
  const tasks = ["🎤 Mic Check", "💃 Warm-up", "🎵 Sound Check", "✨ Final Prep"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">June 26, 2024</p>
        <h2 className="text-2xl font-bold text-white">Competition Day</h2>
        <p className="text-white/50 text-sm mt-2">Prepare for the stage</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10">
        {tasks.map((task, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === prep) {
                setPrep(i + 1);
                if (i + 1 === tasks.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-48 px-6 py-3 rounded-xl flex items-center gap-3"
            style={{
              background: i < prep ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${i < prep ? COLOR : "#333"}`,
              opacity: i <= prep ? 1 : 0.5,
            }}
            animate={i === prep ? { x: [0, 5, -5, 0] } : {}}
            whileHover={i === prep ? { scale: 1.02 } : {}}>
            <span className="text-xl">{task.split(" ")[0]}</span>
            <span className="text-white text-sm">{task.split(" ").slice(1).join(" ")}</span>
            {i < prep && <Trophy size={16} style={{ color: COLOR, marginLeft: "auto" }} />}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{prep} / {tasks.length} tasks completed</p>
    </motion.div>
  );
}

// Stage 2: Birthday wishes at midnight - candles that transform to birthday emojis
function Stage2({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState<Set<number>>(new Set());
  const totalCandles = 6;
  
  const birthdayEmojis = ["🎉", "🎁", "🎈", "🎂", "💙", "🎊"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10 mb-4">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">00:00</p>
        <h2 className="text-2xl font-bold text-white">Birthday Wish</h2>
        <p className="text-white/50 text-sm mt-2">You were the first to congratulate me</p>
      </motion.div>

      <div className="relative z-10 flex items-center justify-center">
        <motion.div className="w-32 h-32 rounded-full flex items-center justify-center text-6xl"
          style={{ background: `radial-gradient(circle, ${COLOR}40, ${COLOR}10)`, border: `3px solid ${COLOR}` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}>
          🎂
        </motion.div>

        {/* Candles arranged in circle - transform to birthday emojis when clicked */}
        {Array.from({ length: totalCandles }).map((_, i) => {
          const angle = (i / totalCandles) * 360;
          const radius = 90;
          const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
          const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

          return (
            <div
              key={i}
              className="absolute w-10 h-10"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.button
                onClick={() => {
                  if (!lit.has(i)) {
                    const newLit = new Set(lit);
                    newLit.add(i);
                    setLit(newLit);
                    if (newLit.size === totalCandles) setTimeout(() => onDone(), 500);
                  }
                }}
                className="w-full h-full rounded-full flex items-center justify-center text-lg"
                style={{
                  background: lit.has(i) ? `${COLOR}60` : "#1a1a1a",
                  border: `2px solid ${COLOR}`,
                }}
                animate={lit.has(i) ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {lit.has(i) ? birthdayEmojis[i] : "🕯️"}
              </motion.button>
            </div>
          );
        })}
      </div>

      <p className="text-white/50 text-sm z-10 mt-4">{lit.size} / {totalCandles} candles lit</p>
    </motion.div>
  );
}

// Stage 3: Gift reveal - Portrait drawing
function Stage3({ onDone }: { onDone: () => void }) {
  const [revealed, setRevealed] = useState(0);
  const parts = ["🎨", "✏️", "🖼️", "💝"];
  const messages = [
    "You prepared something...",
    "A Naruto Light!",
    "And the most beautiful gift...",
    "My portrait with 'Best Mentor' 💕",
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Welcome Back</p>
        <h2 className="text-2xl font-bold text-white">Your Gift</h2>
        <p className="text-white/50 text-sm mt-2">Click to reveal</p>
      </motion.div>

      <div className="flex gap-4 z-10">
        {parts.map((part, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === revealed) {
                setRevealed(i + 1);
                if (i + 1 === parts.length) setTimeout(() => onDone(), 800);
              }
            }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
            style={{
              background: i < revealed ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
              opacity: i <= revealed ? 1 : 0.5,
            }}
            animate={i === revealed ? { scale: [1, 1.2, 1], rotateY: 180 } : {}}
            whileHover={i === revealed ? { scale: 1.05 } : {}}>
            {i < revealed ? part : "🎁"}
          </motion.button>
        ))}
      </div>

      <p className="text-white/60 text-sm z-10 h-12">{revealed > 0 ? messages[revealed - 1] : "..."}</p>
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
          animate={{ y: [0, -25, 0], opacity: [0.3, 0.7, 0.3], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "🏆" : i % 4 === 1 ? "🎤" : i % 4 === 2 ? "💙" : "✨"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🎁
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Chanwon & Birthday</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          On June 26, I was in Almaty for the K-pop competition. It was my birthday.
          You were the first one to congratulate me at 00:00.
          <br /><br />
          When I returned, you gave me a Naruto Light and drew my portrait with "Best Mentor".
          <span className="block text-white/40 text-xs mt-2 italic">That portrait still means everything to me.</span>
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
