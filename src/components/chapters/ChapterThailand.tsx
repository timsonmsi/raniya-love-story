"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Plane, Gift } from "lucide-react";

const COLOR = "#26C6DA";
const BG = "#0a1a1a";

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

export function ChapterThailand({ onBack }: Props) {
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

// Stage 1: Pack the suitcase
function Stage1({ onDone }: { onDone: () => void }) {
  const [packed, setPacked] = useState<Set<number>>(new Set());
  const items = ["👕 Clothes", "📷 Camera", "🧴 Sunscreen", "🕶️ Sunglasses", "📱 Phone"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Summer Break</p>
        <h2 className="text-2xl font-bold text-white">Pack for Thailand</h2>
        <p className="text-white/50 text-sm mt-2">Pack all essentials</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10">
        {items.map((item, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!packed.has(i)) {
                const newPacked = new Set(packed);
                newPacked.add(i);
                setPacked(newPacked);
                if (newPacked.size === items.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-56 px-6 py-4 rounded-xl flex items-center gap-4"
            style={{
              background: packed.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${packed.has(i) ? COLOR : "#333"}`,
            }}
            animate={packed.has(i) ? { x: [0, 20, 0] } : {}}
            whileHover={{ scale: 1.02 }}>
            <span className="text-2xl">{item.split(" ")[0]}</span>
            <span className="text-white">{item.split(" ")[1]}</span>
            {packed.has(i) && <span className="ml-auto text-green-400">✓</span>}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{packed.size} / {items.length} items packed</p>
    </motion.div>
  );
}

// Stage 2: Send memes/messages
function Stage2({ onDone }: { onDone: () => void }) {
  const [sent, setSent] = useState(0);
  const messages = ["😂 Meme", "🎬 Video", "📸 Photo", "💭 Thought", "❤️ Love"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Long Distance</p>
        <h2 className="text-2xl font-bold text-white">Stay Connected</h2>
        <p className="text-white/50 text-sm mt-2">Send messages daily</p>
      </motion.div>

      <div className="flex gap-3 z-10 flex-wrap justify-center max-w-md">
        {messages.map((msg, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === sent) {
                setSent(i + 1);
                if (i + 1 === messages.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-20 h-20 rounded-xl flex items-center justify-center text-xs"
            style={{
              background: i < sent ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
              opacity: i <= sent ? 1 : 0.5,
            }}
            animate={i === sent ? { scale: [1, 1.1, 1], y: [0, -10, 0] } : {}}
            whileHover={i === sent ? { scale: 1.05 } : {}}>
            {msg.split(" ")[0]}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{sent} / {messages.length} messages sent</p>
    </motion.div>
  );
}

// Stage 3: Gift reveal
function Stage3({ onDone }: { onDone: () => void }) {
  const [revealed, setRevealed] = useState(0);
  const gifts = [
    { emoji: "👕", text: "T-shirt from Thailand" },
    { emoji: "🍬", text: "Candy for better sleep" },
    { emoji: "💝", text: "Only for you, no one else" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Welcome Back</p>
        <h2 className="text-2xl font-bold text-white">Special Gifts</h2>
        <p className="text-white/50 text-sm mt-2">Click to reveal</p>
      </motion.div>

      <div className="flex gap-4 z-10">
        {gifts.map((gift, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === revealed) {
                setRevealed(i + 1);
                if (i + 1 === gifts.length) setTimeout(() => onDone(), 800);
              }
            }}
            className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-2"
            style={{
              background: i < revealed ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
              opacity: i <= revealed ? 1 : 0.5,
            }}
            animate={i === revealed ? { scale: [1, 1.2, 1], rotateY: 180 } : {}}
            whileHover={i === revealed ? { scale: 1.05 } : {}}>
            <span className="text-4xl">{i < revealed ? gift.emoji : "🎁"}</span>
            {i < revealed && <span className="text-xs text-white/70 text-center px-2">{gift.text}</span>}
          </motion.button>
        ))}
      </div>
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
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "✈️" : i % 4 === 1 ? "🇹🇭" : i % 4 === 2 ? "🎁" : "💕"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🎁
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Thailand Gifts</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          Summer break - you went to Aktobe, I went to Almaty. We talked every day,
          sending memes and Instagram videos.
          <br /><br />
          When you returned, you gave me a t-shirt from Thailand that I still wear,
          and candy to help me sleep better.
          <span className="block text-white/40 text-xs mt-2 italic">You said you bought this kind of gift only for me and no one else.</span>
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
