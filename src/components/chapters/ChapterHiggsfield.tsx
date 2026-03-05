"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Scale, Heart } from "lucide-react";

const COLOR = "#8BC34A";
const BG = "#0a1a05";

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

export function ChapterHiggsfield({ onBack }: Props) {
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

// Stage 1: The scale - Career vs Love (Love/You/Astana is correct)
function Stage1({ onDone }: { onDone: () => void }) {
  const [side, setSide] = useState<"left" | "right" | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">October 2026</p>
        <h2 className="text-2xl font-bold text-white">The Choice</h2>
        <p className="text-white/50 text-sm mt-2">What matters more?</p>
      </motion.div>

      <div className="relative z-10">
        {/* Scale */}
        <div className="w-64 h-40 flex items-end justify-center">
          {/* Left side - Career (wrong) */}
          <motion.div
            className="w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer"
            style={{
              background: side === "left" ? "#ff444440" : "#1a1a1a",
              border: `2px solid ${side === "left" ? "#ff4444" : "#333"}`,
            }}
            animate={{ y: side === "right" ? -30 : 0 }}
            onClick={() => {
              setSide("left");
              // Wrong choice - shake and reset
            }}
            whileHover={{ scale: 1.05 }}>
            <span className="text-3xl">💼</span>
            <span className="text-xs text-white">Higgsfield</span>
            <span className="text-xs text-white/50">Almaty</span>
          </motion.div>

          {/* Center fulcrum */}
          <div className="w-8 h-32 mx-4 flex items-end justify-center">
            <div className="w-1 h-24" style={{ background: COLOR }} />
            <div className="w-32 h-1 absolute" style={{ background: COLOR, transform: `rotate(${side === "left" ? -10 : side === "right" ? 10 : 0}deg)` }} />
          </div>

          {/* Right side - Love/You/Astana (CORRECT) */}
          <motion.div
            className="w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer"
            style={{
              background: side === "right" ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${side === "right" ? COLOR : "#333"}`,
            }}
            animate={{ y: side === "left" ? -30 : 0 }}
            onClick={() => {
              setSide("right");
              setTimeout(() => onDone(), 800);
            }}
            whileHover={{ scale: 1.05 }}>
            <span className="text-3xl">💚</span>
            <span className="text-xs text-white">You</span>
            <span className="text-xs text-white/50">Astana</span>
          </motion.div>
        </div>
      </div>

      {side === "left" && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-red-400 text-sm z-10">
          ❌ Deep down, you know the answer...
        </motion.p>
      )}

      {!side && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/50 text-sm z-10">
          Choose which side to tip the scale...
        </motion.p>
      )}
    </motion.div>
  );
}

// Stage 2: Calendar - 31 days of thinking (all days required)
function Stage2({ onDone }: { onDone: () => void }) {
  const [days, setDays] = useState<Set<number>>(new Set());

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">One Month</p>
        <h2 className="text-2xl font-bold text-white">31 Days of Thinking</h2>
        <p className="text-white/50 text-sm mt-2">Click through all days</p>
      </motion.div>

      <div className="grid grid-cols-7 gap-2 z-10">
        {Array.from({ length: 31 }).map((_, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!days.has(i)) {
                const newDays = new Set(days);
                newDays.add(i);
                setDays(newDays);
                if (newDays.size === 31) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold"
            style={{
              background: days.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `1px solid ${COLOR}`,
            }}
            whileHover={{ scale: 1.1 }}>
            {i + 1}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{days.size} / 31 days passed</p>
    </motion.div>
  );
}

// Stage 3: Message exchange
function Stage3({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const messages = [
    { text: "I got an offer from Higgsfield...", from: "him", emoji: "💼" },
    { text: "That's amazing! But... when?", from: "her", emoji: "😮" },
    { text: "Next month. I need to decide.", from: "him", emoji: "🤔" },
    { text: "Whatever you choose, I support you.", from: "her", emoji: "💚" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">The Conversation</p>
        <h2 className="text-2xl font-bold text-white">What To Do?</h2>
        <p className="text-white/50 text-sm mt-2">Click to continue</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10 w-80">
        {messages.map((msg, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: msg.from === "him" ? -50 : 50 }}
            animate={{ opacity: i <= step ? 1 : 0, x: i <= step ? 0 : (msg.from === "him" ? -50 : 50) }}
            className={`p-4 rounded-2xl ${msg.from === "him" ? "rounded-bl-none" : "rounded-br-none ml-auto"}`}
            style={{
              background: msg.from === "him" ? `${COLOR}30` : `${COLOR}50`,
              border: `1px solid ${COLOR}`,
              maxWidth: "80%",
            }}>
            <p className="text-white text-sm">{msg.text}</p>
          </motion.div>
        ))}
      </div>

      {step < messages.length ? (
        <motion.button onClick={() => {
          setStep(step + 1);
          if (step + 1 === messages.length) setTimeout(() => onDone(), 800);
        }}
          className="px-8 py-3 rounded-full text-sm font-semibold z-10"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }}>
          {step === 0 ? "Start Conversation" : "Continue"} →
        </motion.button>
      ) : null}
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
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "⚖️" : i % 4 === 1 ? "💼" : i % 4 === 2 ? "💚" : "✨"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          💚
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">The Decision</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          In October, I was proposed to work at Higgsfield in Almaty.
          It was hard to decide: grow in career there, or stay at Nazarbayev University?
          <br /><br />
          It was stable, and I could meet with you anytime.
          I was thinking for almost a month.
          <span className="block text-white/40 text-xs mt-2 italic">You were already becoming my reason to stay.</span>
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
