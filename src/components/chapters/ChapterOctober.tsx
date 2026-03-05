"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Heart, Palette } from "lucide-react";

const COLOR = "#D4E157";
const BG = "#1a1a0a";

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

export function ChapterOctober({ onBack }: Props) {
  const [stage, setStage] = useState(1);
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: BG }}>
      <StageDots stage={stage} total={5} />
      <button onClick={onBack} className="absolute top-8 left-8 z-50 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors">← Timeline</button>
      <AnimatePresence mode="wait">
        {stage === 1 && <Stage1 key="s1" onDone={() => setStage(2)} />}
        {stage === 2 && <Stage2 key="s2" onDone={() => setStage(3)} />}
        {stage === 3 && <Stage3 key="s3" onDone={() => setStage(4)} />}
        {stage === 4 && <Stage4 key="s4" onDone={() => setStage(5)} />}
        {stage === 5 && <Stage5 key="s5" onBack={onBack} />}
      </AnimatePresence>
    </div>
  );
}

// Stage 1: Stress relief activities (Journaling → Drinking)
function Stage1({ onDone }: { onDone: () => void }) {
  const activities = ["🎨 Painting", "✏️ Drawing", "🧩 Crafting", "🍷 Drinking"];
  const [done, setDone] = useState<Set<number>>(new Set());

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">October 11, 2026</p>
        <h2 className="text-2xl font-bold text-white">Stress Relief</h2>
        <p className="text-white/50 text-sm mt-2">Try all activities</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 z-10">
        {activities.map((activity, i) => (
          <motion.button key={i}
            onClick={() => {
              const newDone = new Set(done);
              newDone.add(i);
              setDone(newDone);
              if (newDone.size === activities.length) setTimeout(() => onDone(), 500);
            }}
            className="w-36 h-36 rounded-2xl flex flex-col items-center justify-center gap-2"
            style={{
              background: done.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            animate={done.has(i) ? { scale: [1, 1.05, 1], rotateY: 180 } : {}}
            whileHover={{ scale: 1.05 }}>
            <span className="text-4xl">{activity.split(" ")[0]}</span>
            <span className="text-white text-sm">{activity.split(" ")[1]}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{done.size} / {activities.length} activities done</p>
    </motion.div>
  );
}

// Stage 2: Paint a perfect symmetrical heart shape
function Stage2({ onDone }: { onDone: () => void }) {
  // Perfect symmetrical heart pattern (6 rows x 8 cols, 1 = filled, 0 = empty)
  // Each row is perfectly symmetrical left-to-right
  const heartPattern = [
    [0, 1, 1, 0, 0, 1, 1, 0],  // Row 0: ♥♥  ♥♥   (two bumps - symmetrical)
    [1, 1, 1, 1, 1, 1, 1, 1],  // Row 1: ♥♥♥♥♥♥♥♥ (full width - symmetrical)
    [1, 1, 1, 1, 1, 1, 1, 1],  // Row 2: ♥♥♥♥♥♥♥♥ (full width - symmetrical)
    [0, 1, 1, 1, 1, 1, 1, 0],  // Row 3: ♥♥♥♥♥♥   (tapering - symmetrical)
    [0, 0, 1, 1, 1, 1, 0, 0],  // Row 4: ♥♥♥♥     (point - symmetrical)
    [0, 0, 0, 1, 1, 0, 0, 0],  // Row 5: ♥♥       (bottom point - symmetrical)
  ];

  const RED_COLOR = "#EF5350";
  const [painted, setPainted] = useState<Set<string>>(new Set());
  const totalFilled = heartPattern.flat().filter(x => x === 1).length;

  const handleClick = (row: number, col: number) => {
    if (heartPattern[row][col] === 1) {
      const key = `${row}-${col}`;
      if (!painted.has(key)) {
        const newPainted = new Set(painted);
        newPainted.add(key);
        setPainted(newPainted);
        // Complete when ALL squares are painted
        if (newPainted.size === totalFilled) setTimeout(() => onDone(), 500);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Creative Night</p>
        <h2 className="text-2xl font-bold text-white">Paint Together</h2>
        <p className="text-white/50 text-sm mt-2">Fill in the heart shape</p>
      </motion.div>

      <div className="grid gap-1 z-10" style={{ gridTemplateColumns: `repeat(8, minmax(0, 1fr))` }}>
        {heartPattern.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const isPainted = painted.has(key);
            const isPartOfShape = cell === 1;

            return (
              <motion.button
                key={key}
                onClick={() => handleClick(rowIndex, colIndex)}
                className="w-8 h-8 rounded-sm"
                style={{
                  background: isPainted ? RED_COLOR : isPartOfShape ? "#333" : "transparent",
                  border: `1px solid ${isPartOfShape ? RED_COLOR + '40' : 'transparent'}`,
                  cursor: isPartOfShape ? "pointer" : "default",
                }}
                whileHover={isPartOfShape ? { scale: 1.1 } : {}}
              />
            );
          })
        )}
      </div>

      <p className="text-white/50 text-sm z-10">{painted.size} / {totalFilled} squares painted</p>
    </motion.div>
  );
}

// Stage 3: Memory lane - collect moments
function Stage3({ onDone }: { onDone: () => void }) {
  const [collected, setCollected] = useState(0);
  const total = 6;
  const memories = ["🎨", "🍷", "💕", "✨", "🌙", "💫"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">That Night</p>
        <h2 className="text-2xl font-bold text-white">Collect Moments</h2>
        <p className="text-white/50 text-sm mt-2">Click to collect memories</p>
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
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: i < collected ? [1, 1.1, 1] : i === collected ? [1, 1.3, 1] : 0,
              opacity: i <= collected ? 1 : 0,
            }}
            transition={{ scale: { duration: 0.3 } }}
            whileHover={{ scale: 1.1 }}>
            {memories[i]}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{collected} / {total} memories collected</p>
    </motion.div>
  );
}

// Stage 4: Heart connection game (BLUE heart instead of green)
function Stage4({ onDone }: { onDone: () => void }) {
  const [connected, setConnected] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">The Moment</p>
        <h2 className="text-2xl font-bold text-white">First Kiss</h2>
        <p className="text-white/50 text-sm mt-2">Bring hearts together</p>
      </motion.div>

      <div className="relative w-80 h-40 z-10">
        <motion.div
          className="absolute w-16 h-16 rounded-full flex items-center justify-center text-4xl cursor-pointer"
          style={{ left: "10%", top: "50%", background: `#42A5F5`, transform: "translateY(-50%)" }}
          animate={{ x: connected ? 240 : 0 }}
          transition={{ duration: 1, type: "spring" }}
          onClick={() => {
            if (!connected) {
              setConnected(true);
              setTimeout(() => onDone(), 800);
            }
          }}>
          💙
        </motion.div>
        <motion.div
          className="absolute w-16 h-16 rounded-full flex items-center justify-center text-4xl"
          style={{ right: "10%", top: "50%", background: `${COLOR}40`, transform: "translateY(-50%)" }}>
          💛
        </motion.div>
        
        {connected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl">
            💕
          </motion.div>
        )}
      </div>

      {!connected && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/50 text-sm z-10">
          Click the blue heart to bring them together...
        </motion.p>
      )}
    </motion.div>
  );
}

// Stage 5: Tribute
function Stage5({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div key={i} className="absolute text-xl"
          style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "💕" : i % 4 === 1 ? "💛" : i % 4 === 2 ? "💙" : "✨"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          💋
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">October 11</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          We did stress relief stuff - drawing, painting, having fun. We drank a little.
          <br /><br />
          In the night your stomach was hurting, so you stayed at my home.
          That night, we first kissed.
          <br /><br />
          After that, we started meeting at my office, kissing but shy, hugging and laying on the sofa.
          <span className="block text-white/40 text-xs mt-2 italic">Everything changed after that night.</span>
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
