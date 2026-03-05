"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Film, Clapperboard } from "lucide-react";

const COLOR = "#7E57C2";
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

export function ChapterF1({ onBack }: Props) {
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

// Stage 1: F1 Car assembly
function Stage1({ onDone }: { onDone: () => void }) {
  const [parts, setParts] = useState<Set<number>>(new Set());
  const partList = [
    { emoji: "🏎️", name: "Chassis" },
    { emoji: "🛞", name: "Wheels" },
    { emoji: "⚙️", name: "Engine" },
    { emoji: "🪑", name: "Seat" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Summer 2024</p>
        <h2 className="text-2xl font-bold text-white">F1 Movie Prep</h2>
        <p className="text-white/50 text-sm mt-2">Assemble the F1 car</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10">
        {partList.map((part, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!parts.has(i)) {
                const newParts = new Set(parts);
                newParts.add(i);
                setParts(newParts);
                if (newParts.size === partList.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-56 px-6 py-4 rounded-xl flex items-center gap-4"
            style={{
              background: parts.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${parts.has(i) ? COLOR : "#333"}`,
            }}
            animate={parts.has(i) ? { x: [0, 10, 0] } : {}}
            whileHover={{ scale: 1.02 }}>
            <span className="text-3xl">{part.emoji}</span>
            <span className="text-white">{part.name}</span>
            {parts.has(i) && <span className="ml-auto text-green-400">✓</span>}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{parts.size} / {partList.length} parts assembled</p>
    </motion.div>
  );
}

// Stage 2: Cinema seat selection
function Stage2({ onDone }: { onDone: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const rows = 4;
  const cols = 6;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Cinema Date</p>
        <h2 className="text-2xl font-bold text-white">Pick Your Seats</h2>
        <p className="text-white/50 text-sm mt-2">Select two adjacent seats</p>
      </motion.div>

      <div className="z-10">
        {/* Screen */}
        <div className="w-48 h-8 mx-auto mb-6 rounded-t-full" 
          style={{ background: `linear-gradient(to bottom, ${COLOR}40, transparent)` }} />
        
        {/* Seats */}
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {Array.from({ length: rows * cols }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const isSelected = selected === i;
            const isNextToSelected = selected !== null && (
              (selected === i - 1 && row === Math.floor(selected / cols)) ||
              (selected === i + 1 && row === Math.floor(selected / cols))
            );
            
            return (
              <motion.button key={i}
                onClick={() => {
                  if (selected === null) {
                    setSelected(i);
                  } else if (isNextToSelected) {
                    onDone();
                  } else {
                    setSelected(i);
                  }
                }}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm"
                style={{
                  background: isSelected ? `${COLOR}60` : isNextToSelected ? `${COLOR}30` : "#1a1a1a",
                  border: `2px solid ${COLOR}`,
                }}
                whileHover={{ scale: 1.1 }}>
                💺
              </motion.button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <p className="text-white/50 text-sm z-10">Now select an adjacent seat!</p>
      )}
    </motion.div>
  );
}

// Stage 3: Movie rating
function Stage3({ onDone }: { onDone: () => void }) {
  const [rating, setRating] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">After The Movie</p>
        <h2 className="text-2xl font-bold text-white">Rate The Movie</h2>
        <p className="text-white/50 text-sm mt-2">How was it?</p>
      </motion.div>

      <div className="flex gap-3 z-10">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button key={star}
            onClick={() => {
              setRating(star);
              if (star === 5) setTimeout(() => onDone(), 500);
            }}
            className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: star <= rating ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            animate={star <= rating ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
            whileHover={{ scale: 1.1 }}>
            ⭐
          </motion.button>
        ))}
      </div>

      {rating > 0 && rating < 5 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/50 text-sm z-10">
          Give it 5 stars! It was amazing! 🏎️
        </motion.p>
      )}

      {rating === 5 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/70 text-sm z-10">
          Perfect! Just like our date! 💕
        </motion.p>
      )}
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
          animate={{ x: [0, 50, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "🏎️" : i % 4 === 1 ? "🎬" : i % 4 === 2 ? "🍿" : "✨"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🎥
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">F1 Movie Date</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          I was obsessed with the F1 movie when it released.
          I invited you to the cinema with other friends.
          <br /><br />
          We watched it together and enjoyed it.
          <span className="block text-white/40 text-xs mt-2 italic">Another memory added to our collection.</span>
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
