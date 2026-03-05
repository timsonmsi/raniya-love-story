"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Heart, Cake, Calendar } from "lucide-react";

const COLOR = "#FFEE58";
const BG = "#1a1505";

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

export function ChapterNovember({ onBack }: Props) {
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

// Stage 1: Calendar - Mark the date (2025)
function Stage1({ onDone }: { onDone: () => void }) {
  const [marked, setMarked] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">November 2025</p>
        <h2 className="text-2xl font-bold text-white">Mark The Date</h2>
        <p className="text-white/50 text-sm mt-2">Your birthday - Our start</p>
      </motion.div>

      <motion.div className="relative z-10">
        <motion.div
          className="w-64 h-80 rounded-2xl flex flex-col p-6"
          style={{ background: "#1a1a1a", border: `3px solid ${COLOR}` }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar size={20} style={{ color: COLOR }} />
            <span className="text-white font-bold">November 2025</span>
          </div>
          <div className="grid grid-cols-7 gap-1 flex-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const isSpecial = day === 10;
              return (
                <motion.button key={i}
                  onClick={() => {
                    if (isSpecial && !marked) {
                      setMarked(true);
                      setTimeout(() => onDone(), 800);
                    }
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: isSpecial && marked ? `${COLOR}60` : isSpecial ? `${COLOR}30` : "transparent",
                    border: isSpecial ? `1px solid ${COLOR}` : "none",
                    color: isSpecial ? "#000" : "#666",
                  }}
                  animate={isSpecial && marked ? { scale: [1, 1.2, 1] } : {}}
                  whileHover={isSpecial ? { scale: 1.1 } : {}}>
                  {day}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {!marked && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs whitespace-nowrap">
            Find the special day
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

// Stage 2: Birthday cake decoration
function Stage2({ onDone }: { onDone: () => void }) {
  const [decorations, setDecorations] = useState<Set<number>>(new Set());
  const items = ["🕯️", "🎂", "🎁", "💝", "✨", "💕"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Your Birthday</p>
        <h2 className="text-2xl font-bold text-white">Decorate The Cake</h2>
        <p className="text-white/50 text-sm mt-2">Add all decorations</p>
      </motion.div>

      <div className="relative z-10">
        <motion.div className="w-48 h-48 rounded-full flex items-center justify-center text-7xl"
          style={{ background: `radial-gradient(circle, ${COLOR}40, ${COLOR}10)`, border: `3px solid ${COLOR}` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}>
          🎂
        </motion.div>

        <div className="absolute inset-0">
          {items.map((item, i) => {
            const angle = (i / items.length) * 360;
            const radius = 100;
            const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
            const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

            return (
              <div
                key={i}
                className="absolute w-12 h-12"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.button
                  onClick={() => {
                    if (!decorations.has(i)) {
                      const newDec = new Set(decorations);
                      newDec.add(i);
                      setDecorations(newDec);
                      if (newDec.size === items.length) setTimeout(() => onDone(), 500);
                    }
                  }}
                  className="w-full h-full rounded-full flex items-center justify-center text-xl"
                  style={{
                    background: decorations.has(i) ? `${COLOR}60` : "#1a1a1a",
                    border: `2px solid ${COLOR}`,
                  }}
                  animate={decorations.has(i) ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {decorations.has(i) ? item : "🎀"}
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-white/50 text-sm z-10">{decorations.size} / {items.length} decorations added</p>
    </motion.div>
  );
}

// Stage 3: Age transition - 19 to 20 with confetti
function Stage3({ onDone }: { onDone: () => void }) {
  const [age, setAge] = useState(19);
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Growing Up</p>
        <h2 className="text-2xl font-bold text-white">Turning 20</h2>
        <p className="text-white/50 text-sm mt-2">Click to celebrate</p>
      </motion.div>

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
                background: ['#FF6B9D', '#FF8E53', '#42A5F5', '#66BB6A', '#FFEE58'][Math.floor(Math.random() * 5)],
              }}
              initial={{ y: 0, rotate: 0, opacity: 1 }}
              animate={{
                y: '100vh',
                rotate: Math.random() * 720,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 1.5,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        <motion.button
          onClick={() => {
            if (age === 19) {
              setAge(20);
              setShowConfetti(true);
              setTimeout(() => {
                setShowConfetti(false);
                onDone();
              }, 3000);
            }
          }}
          className="w-48 h-48 rounded-full flex items-center justify-center text-6xl font-bold"
          style={{
            background: `radial-gradient(circle, ${COLOR}40, ${COLOR}10)`,
            border: `4px solid ${COLOR}`,
            color: "white",
          }}
          animate={age === 20 ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
          whileHover={{ scale: 1.05 }}>
          {age}
        </motion.button>

        {age === 20 && (
          <motion.div initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }}
            className="text-5xl mt-4">
            👑
          </motion.div>
        )}
      </div>

      <p className="text-white/50 text-sm z-10">
        {age === 19 ? "Click to turn 20!" : "Happy Birthday! 🎉"}
      </p>
    </motion.div>
  );
}

// Stage 4: Tribute
function Stage4({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div key={i} className="absolute text-xl"
          style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3], y: [0, -20, 0] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 5 === 0 ? "💝" : i % 5 === 1 ? "🎂" : i % 5 === 2 ? "✨" : i % 5 === 3 ? "💕" : "🎉"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          💕
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">November 10</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-4">
          You said you wanted the official start date to be November 10 - your birthday.
          Because you saw on TikTok that all relationships started before 20 end up badly.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          On November 10, you became 20 years old.
          And it became our official start date.
        </p>
        <p className="text-white/80 text-sm font-semibold leading-relaxed mb-6">
          This is the story of how we started dating.
          <span className="block text-white/50 text-xs mt-3 italic">And this is only the beginning of our story together. 💕</span>
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
