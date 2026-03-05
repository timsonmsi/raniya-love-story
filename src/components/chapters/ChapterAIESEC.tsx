"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Palette } from "lucide-react";

const COLOR = "#26A69A";
const BG = "#0a1a15";

interface Props { onBack: () => void; }

export function ChapterAIESEC({ onBack }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: BG }}>
      <button onClick={onBack} className="absolute top-8 left-8 z-50 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors">← Timeline</button>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
        className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
        
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div key={i} className="absolute text-xl"
            style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
            animate={{ rotate: [0, 10, -10, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
            🎨
          </motion.div>
        ))}

        {!revealed ? (
          <motion.button onClick={() => setRevealed(true)}
            className="w-48 h-48 rounded-full flex items-center justify-center text-6xl z-10"
            style={{ background: `radial-gradient(circle, ${COLOR}40, ${COLOR}10)`, border: `2px solid ${COLOR}`, boxShadow: `0 0 40px ${COLOR}40` }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            💻
          </motion.button>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center z-10 max-w-md">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
              style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
              🖌️
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">AIESEC & Figma</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              You were responsible for the AIESEC website design. 
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
        )}
      </motion.div>
    </div>
  );
}
