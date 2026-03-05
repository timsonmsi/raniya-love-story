"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Coffee, Gamepad2 } from "lucide-react";

const COLOR = "#EC407A";
const BG = "#1a0a12";

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

export function ChapterOffice({ onBack }: Props) {
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

// Stage 1: Food collection
function Stage1({ onDone }: { onDone: () => void }) {
  const [fed, setFed] = useState(0);
  const foods = ["🍪 Cookie", "🍫 Chocolate", "🥐 Croissant", "🍎 Apple"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Summer 2025</p>
        <h2 className="text-2xl font-bold text-white">Office Days</h2>
        <p className="text-white/50 text-sm mt-2">"Wanna some food?"</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 z-10">
        {foods.map((food, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === fed) {
                setFed(i + 1);
                if (i + 1 === foods.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-32 h-20 rounded-xl flex items-center justify-center gap-2"
            style={{
              background: i < fed ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
              opacity: i <= fed ? 1 : 0.5,
            }}
            animate={i === fed ? { scale: [1, 1.1, 1] } : {}}
            whileHover={i === fed ? { scale: 1.05 } : {}}>
            <span className="text-2xl">{food.split(" ")[0]}</span>
            <span className="text-white text-sm">{food.split(" ")[1]}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{fed} / {foods.length} snacks collected</p>
    </motion.div>
  );
}

// Stage 2: VR Game
function Stage2({ onDone }: { onDone: () => void }) {
  const [played, setPlayed] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">VR Experience</p>
        <h2 className="text-2xl font-bold text-white">First Time in VR</h2>
        <p className="text-white/50 text-sm mt-2">Click to play!</p>
      </motion.div>

      {!played ? (
        <motion.button onClick={() => setPlayed(true)}
          className="w-48 h-48 rounded-full flex items-center justify-center text-6xl"
          style={{ background: `radial-gradient(circle, ${COLOR}40, ${COLOR}10)`, border: `2px solid ${COLOR}`, boxShadow: `0 0 40px ${COLOR}40` }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          🥽
        </motion.button>
      ) : (
        <motion.div className="text-center space-y-4">
          <motion.div 
            className="text-5xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}>
            🎮
          </motion.div>
          <p className="text-white/70 text-sm">Score: {score}</p>
          <motion.button onClick={() => {
            const newScore = score + 1;
            setScore(newScore);
            if (newScore >= 3) setTimeout(() => onDone(), 500);
          }} className="px-8 py-3 rounded-full text-sm font-semibold"
            style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
            whileHover={{ scale: 1.05 }}>
            Play! ({score}/3)
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Stage 3: Study Sessions (replaced Coffee Breaks)
function Stage3({ onDone }: { onDone: () => void }) {
  const [sessions, setSessions] = useState<Set<number>>(new Set());
  const activities = [
    { emoji: "💻", name: "Editing" },
    { emoji: "📚", name: "Learning" },
    { emoji: "🎨", name: "Design" },
    { emoji: "💬", name: "Talking" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Office Time</p>
        <h2 className="text-2xl font-bold text-white">Study Sessions</h2>
        <p className="text-white/50 text-sm mt-2">Collect all activities</p>
      </motion.div>

      <div className="flex gap-3 z-10">
        {activities.map((activity, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!sessions.has(i)) {
                const newSessions = new Set(sessions);
                newSessions.add(i);
                setSessions(newSessions);
                if (newSessions.size === activities.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-20 h-24 rounded-xl flex flex-col items-center justify-center gap-2"
            style={{
              background: sessions.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            animate={sessions.has(i) ? { scale: [1, 1.1, 1], y: [0, -10, 0] } : {}}
            whileHover={{ scale: 1.05 }}>
            <span className="text-3xl">{activity.emoji}</span>
            <span className="text-white text-xs">{activity.name}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{sessions.size} / {activities.length} activities</p>
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
          {i % 4 === 0 ? "🍪" : i % 4 === 1 ? "🎮" : i % 4 === 2 ? "🏢" : "💕"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10 max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🏢
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Office Memories</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          You often came to my office - for learning editing and shooting, or just to talk.
          I was always collecting food at events and texting you: "Wanna some food?"
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          I was always waiting for you at the office, not wanting to go home.
          <span className="block text-white/40 text-xs mt-2 italic">Because I knew you might come.</span>
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
