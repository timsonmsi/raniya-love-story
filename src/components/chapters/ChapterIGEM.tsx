"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Dna, Palette } from "lucide-react";

const COLOR = "#26A69A";
const BG = "#0a1a15";

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

export function ChapterIGEM({ onBack }: Props) {
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

// Stage 1: DNA sequence builder
function Stage1({ onDone }: { onDone: () => void }) {
  const [sequence, setSequence] = useState<string[]>([]);
  const nucleotides = ["A", "T", "G", "C"];
  const targetLength = 6;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Fall 2026</p>
        <h2 className="text-2xl font-bold text-white">iGEM Project</h2>
        <p className="text-white/50 text-sm mt-2">Build the DNA sequence</p>
      </motion.div>

      <div className="flex gap-2 z-10">
        {nucleotides.map((nuc) => (
          <motion.button key={nuc}
            onClick={() => {
              if (sequence.length < targetLength) {
                const newSeq = [...sequence, nuc];
                setSequence(newSeq);
                if (newSeq.length === targetLength) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
            style={{
              background: `${COLOR}40`,
              border: `2px solid ${COLOR}`,
              color: "white",
            }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {nuc}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-1 z-10">
        {Array.from({ length: targetLength }).map((_, i) => (
          <motion.div key={i}
            className="w-10 h-10 rounded flex items-center justify-center text-sm font-bold"
            style={{
              background: i < sequence.length ? `${COLOR}60` : "#1a1a1a",
              border: `1px solid ${COLOR}`,
              color: "white",
            }}
            animate={i === sequence.length ? { scale: [1, 1.1, 1] } : {}}>
            {sequence[i] || "?"}
          </motion.div>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{sequence.length} / {targetLength} nucleotides</p>
    </motion.div>
  );
}

// Stage 2: Figma design - color picker
function Stage2({ onDone }: { onDone: () => void }) {
  const [colors, setColors] = useState<Set<number>>(new Set());
  const palette = ["#FF6B9D", "#42A5F5", "#66BB6A", "#FFA726", "#AB47BC"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Website Design</p>
        <h2 className="text-2xl font-bold text-white">Figma Colors</h2>
        <p className="text-white/50 text-sm mt-2">Select all colors for the design</p>
      </motion.div>

      <div className="flex gap-3 z-10">
        {palette.map((color, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!colors.has(i)) {
                const newColors = new Set(colors);
                newColors.add(i);
                setColors(newColors);
                if (newColors.size === palette.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-14 h-14 rounded-xl"
            style={{
              background: colors.has(i) ? color : "#1a1a1a",
              border: `2px solid ${color}`,
            }}
            animate={colors.has(i) ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
            whileHover={{ scale: 1.05 }}>
            {colors.has(i) ? "✓" : ""}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{colors.size} / {palette.length} colors selected</p>
    </motion.div>
  );
}

// Stage 3: Component assembly
function Stage3({ onDone }: { onDone: () => void }) {
  const [assembled, setAssembled] = useState<Set<number>>(new Set());
  const components = ["📱 Logo", "🦋 Butterfly", "📝 Content", "🔗 Footer"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Building Together</p>
        <h2 className="text-2xl font-bold text-white">Design Components</h2>
        <p className="text-white/50 text-sm mt-2">Assemble the website</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10">
        {components.map((comp, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!assembled.has(i)) {
                const newAssembled = new Set(assembled);
                newAssembled.add(i);
                setAssembled(newAssembled);
                if (newAssembled.size === components.length) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-56 px-6 py-4 rounded-xl flex items-center gap-4"
            style={{
              background: assembled.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${assembled.has(i) ? COLOR : "#333"}`,
            }}
            animate={assembled.has(i) ? { x: [0, 10, 0] } : {}}
            whileHover={{ scale: 1.02 }}>
            <span className="text-2xl">{comp.split(" ")[0]}</span>
            <span className="text-white">{comp.split(" ")[1]}</span>
            {assembled.has(i) && <span className="ml-auto text-green-400">✓</span>}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{assembled.size} / {components.length} components</p>
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
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "🧬" : i % 4 === 1 ? "🎨" : i % 4 === 2 ? "💻" : "✨"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10 max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🧬
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">iGEM Project</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          You were responsible for the iGEM website design.
          I started teaching you Figma, and we designed the website together.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          You always came to my office in the evenings,
          and I was always waiting for you, not going home.
          <span className="block text-white/40 text-xs mt-2 italic">This is how we started meeting almost every day.</span>
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
