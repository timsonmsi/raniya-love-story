"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Fish } from "lucide-react";

const COLOR = "#5C6BC0";
const BG = "#0a0a1a";

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

export function ChapterOcean({ onBack }: Props) {
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

// Stage 1: Catch the fish
function Stage1({ onDone }: { onDone: () => void }) {
  const [caught, setCaught] = useState<Set<number>>(new Set());
  const fishes = ["🐟", "🦐", "🦑", "🦀", "🐠"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Ocean Basket</p>
        <h2 className="text-2xl font-bold text-white">Catch The Seafood</h2>
        <p className="text-white/50 text-sm mt-2">Click to catch all seafood</p>
      </motion.div>

      <div className="relative w-80 h-60 z-10">
        {fishes.map((fish, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!caught.has(i)) {
                const newCaught = new Set(caught);
                newCaught.add(i);
                setCaught(newCaught);
                if (newCaught.size === fishes.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="absolute w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 2) * 50}%`,
              background: caught.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            animate={{ 
              x: caught.has(i) ? [0, 0] : [0, 10, -10, 0],
              scale: caught.has(i) ? [1, 1.2, 1] : 1,
            }}
            transition={{ 
              x: { duration: 2, repeat: Infinity, delay: i * 0.3 },
              scale: { duration: 0.3 }
            }}
            whileHover={{ scale: 1.1 }}>
            {fish}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{caught.size} / {fishes.length} seafood caught</p>
    </motion.div>
  );
}

// Stage 2: Order menu
function Stage2({ onDone }: { onDone: () => void }) {
  const [ordered, setOrdered] = useState<Set<number>>(new Set());
  const menu = [
    { name: "Grilled Fish", emoji: "🐟", price: "4500₸" },
    { name: "Calamari", emoji: "🦑", price: "3800₸" },
    { name: "Prawns", emoji: "🦐", price: "5200₸" },
    { name: "Crab", emoji: "🦀", price: "6000₸" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">At The Restaurant</p>
        <h2 className="text-2xl font-bold text-white">Order Your Meal</h2>
        <p className="text-white/50 text-sm mt-2">Try all the specialties</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10">
        {menu.map((item, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!ordered.has(i)) {
                const newOrdered = new Set(ordered);
                newOrdered.add(i);
                setOrdered(newOrdered);
                if (newOrdered.size === menu.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-64 px-6 py-4 rounded-xl flex items-center gap-4"
            style={{
              background: ordered.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${ordered.has(i) ? COLOR : "#333"}`,
            }}
            whileHover={{ scale: 1.02 }}>
            <span className="text-3xl">{item.emoji}</span>
            <div className="text-left flex-1">
              <p className="font-bold text-white">{item.name}</p>
              <p className="text-xs text-white/50">{item.price}</p>
            </div>
            {ordered.has(i) && <span className="text-green-400">✓</span>}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{ordered.size} / {menu.length} dishes ordered</p>
    </motion.div>
  );
}

// Stage 3: Gift box - "It's for your achievements"
function Stage3({ onDone }: { onDone: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">For Your Achievements</p>
        <h2 className="text-2xl font-bold text-white">A Special Treat</h2>
        <p className="text-white/50 text-sm mt-2">Click to open</p>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.button
          onClick={() => {
            setOpened(true);
            setTimeout(() => onDone(), 2000);
          }}
          className="w-40 h-40 rounded-2xl flex items-center justify-center text-7xl"
          style={{
            background: `radial-gradient(circle, ${COLOR}40, ${COLOR}10)`,
            border: `3px solid ${COLOR}`,
          }}
          animate={opened ? { scale: [1, 1.1, 1] } : {}}
          whileHover={{ scale: 1.05 }}>
          {opened ? "💝" : "🎁"}
        </motion.button>

        {opened && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-white/70 text-sm whitespace-nowrap text-center font-semibold">
            "It's for your achievements!"
          </motion.p>
        )}
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
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "🌊" : i % 4 === 1 ? "🐟" : i % 4 === 2 ? "🍽️" : "✨"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🍽️
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Ocean Basket</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          To celebrate your achievements, I invited you to Ocean Basket - a seafood restaurant.
          <br /><br />
          You were very shy and said "No, you should not pay for me."
          But I refused, saying it was for your achievements.
          <span className="block text-white/40 text-xs mt-2 italic">I was acting as a mentor, but I cared so much more.</span>
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
