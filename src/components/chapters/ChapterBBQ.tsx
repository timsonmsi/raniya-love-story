"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";

const COLOR = "#FFA726";
const BG = "#1a1208";

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

export function ChapterBBQ({ onBack }: Props) {
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

// Stage 1: Light the grill
function Stage1({ onDone }: { onDone: () => void }) {
  const [flames, setFlames] = useState<number[]>([]);
  const [canProceed, setCanProceed] = useState(false);

  const handleClick = (i: number) => {
    if (!flames.includes(i)) {
      const newFlames = [...flames, i];
      setFlames(newFlames);
      if (newFlames.length >= 5) setCanProceed(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Spring 2026</p>
        <h2 className="text-2xl font-bold text-white">BBQ Party</h2>
        <p className="text-white/50 text-sm mt-2">Light up the grill</p>
      </motion.div>

      <div className="flex gap-4 z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl"
            style={{
              background: flames.includes(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${flames.includes(i) ? COLOR : "#333"}`,
              boxShadow: flames.includes(i) ? `0 0 30px ${COLOR}60` : "none",
            }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {flames.includes(i) ? "🔥" : "🪵"}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 z-10">
        <p className="text-white/30 text-xs font-mono">{flames.length} / 5</p>
        <AnimatePresence>
          {canProceed && (
            <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              onClick={onDone}
              className="px-8 py-3 rounded-full text-sm font-semibold"
              style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
              whileHover={{ scale: 1.05 }}>
              The Grill is Ready! →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Stage 2: Invitation game - click to invite
function Stage2({ onDone }: { onDone: () => void }) {
  const [invited, setInvited] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">The Invitation</p>
        <h2 className="text-2xl font-bold text-white">Invite Her</h2>
        <p className="text-white/50 text-sm mt-2">You were refusing at first...</p>
      </motion.div>

      <motion.button
        onClick={() => {
          setInvited(true);
          setTimeout(() => onDone(), 2000);
        }}
        className="relative z-10"
        animate={invited ? { scale: [1, 1.1, 1] } : {}}
        whileHover={{ scale: 1.05 }}>
        <motion.div
          className="w-40 h-40 rounded-full flex items-center justify-center text-6xl"
          style={{
            background: `radial-gradient(circle, ${COLOR}40, ${COLOR}10)`,
            border: `3px solid ${COLOR}`,
          }}
          animate={{ rotateY: invited ? 180 : 0 }}
          transition={{ duration: 0.6 }}>
          {invited ? "💰" : "📩"}
        </motion.div>
        {!invited && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm whitespace-nowrap">
            Click to invite
          </motion.p>
        )}
      </motion.button>

      {invited && (
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-white/70 text-sm z-10">
          She paid 3500 tenge for the fee! 💰
        </motion.p>
      )}
    </motion.div>
  );
}

// Stage 3: Waiting game
function Stage3({ onDone }: { onDone: () => void }) {
  const [waiting, setWaiting] = useState(0);
  const maxWait = 5;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">At The Party</p>
        <h2 className="text-2xl font-bold text-white">Waiting...</h2>
        <p className="text-white/50 text-sm mt-2">Click while waiting</p>
      </motion.div>

      <div className="flex gap-3 z-10">
        {Array.from({ length: maxWait }).map((_, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === waiting) {
                setWaiting(i + 1);
                if (i + 1 === maxWait) setTimeout(() => onDone(), 2000);
              }
            }}
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{
              background: i < waiting ? "#1a1a1a" : `${COLOR}30`,
              border: `2px solid ${COLOR}`,
              opacity: i <= waiting ? 1 : 0.5,
            }}
            animate={i === waiting ? { scale: [1, 1.2, 1] } : {}}
            whileHover={i === waiting ? { scale: 1.05 } : {}}>
            {i < waiting ? "⏰" : "👀"}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">
        {waiting < maxWait ? "Waiting for her..." : "She didn't come... 😢"}
      </p>
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
          {i % 3 === 0 ? "🍖" : i % 3 === 1 ? "🔥" : "✨"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10 max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🍖
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">The BBQ That Never Was</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          I invited you strongly to come. You were refusing at first,
          but then you agreed and even paid 3500 tenge for the fee.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          I was waiting for you to come... but you didn't show up.
          <span className="block text-white/40 text-xs mt-2 italic">Little did I know, this wasn't the end of our story.</span>
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
