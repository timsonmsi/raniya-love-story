"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Music, Disc, Mic } from "lucide-react";
import { switchTrack } from "@/components/shared/MusicPlayer";

const COLOR = "#66BB6A";
const BG = "#0a1a0a";

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

export function ChapterCraig({ onBack }: Props) {
  const [stage, setStage] = useState(1);

  // Switch to Craig David song when chapter loads
  useEffect(() => {
    switchTrack('craig');
  }, []);

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

// Stage 1: Song selector - Find "7 Days"
function Stage1({ onDone }: { onDone: () => void }) {
  const songs = [
    { name: "Fill Me In", artist: "Craig David", isCorrect: false },
    { name: "7 Days", artist: "Craig David", isCorrect: true },
    { name: "Walking Away", artist: "Craig David", isCorrect: false },
    { name: "Insomnia", artist: "Craig David", isCorrect: false },
  ];
  const [selected, setSelected] = useState<number | null>(null);
  const [found, setFound] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">September 2026</p>
        <h2 className="text-2xl font-bold text-white">Your Song</h2>
        <p className="text-white/50 text-sm mt-2">Find the song you loved</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10">
        {songs.map((song, i) => (
          <motion.button key={i}
            onClick={() => {
              setSelected(i);
              if (song.isCorrect) {
                setFound(true);
                setTimeout(() => onDone(), 800);
              }
            }}
            className="w-64 px-6 py-4 rounded-xl flex items-center gap-4"
            style={{
              background: selected === i ? (song.isCorrect ? `${COLOR}40` : "#ff444440") : "#1a1a1a",
              border: `2px solid ${selected === i ? (song.isCorrect ? COLOR : "#ff4444") : "#333"}`,
            }}
            animate={selected === i ? { scale: [1, 1.02, 1] } : {}}
            whileHover={{ scale: 1.02 }}>
            <Disc size={24} style={{ color: selected === i ? (song.isCorrect ? COLOR : "#ff4444") : "#666" }} />
            <div className="text-left">
              <p className="font-bold text-white">{song.name}</p>
              <p className="text-xs text-white/50">{song.artist}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {selected !== null && !found && (
        <p className="text-white/50 text-sm z-10">Try again! Hint: It's about a week 💚</p>
      )}
    </motion.div>
  );
}

// Stage 2: Hide the vape game - ONLY "Hide Outside in Ground" is correct
function Stage2({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);
  const [wrong, setWrong] = useState(false);

  const locations = [
    { emoji: "🎒", name: "Bag", correct: false },
    { emoji: "🧥", name: "Pocket", correct: false },
    { emoji: "📦", name: "Box", correct: false },
    { emoji: "🌍", name: "Outside (Ground)", correct: true },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Security Check</p>
        <h2 className="text-2xl font-bold text-white">Hide It!</h2>
        <p className="text-white/50 text-sm mt-2">Security said no vaping inside</p>
      </motion.div>

      {!hidden ? (
        <div className="grid grid-cols-2 gap-4 z-10">
          {locations.map((loc, i) => (
            <motion.button key={i}
              onClick={() => {
                if (loc.correct) {
                  setHidden(true);
                  setTimeout(() => onDone(), 800);
                } else {
                  setWrong(true);
                  setTimeout(() => setWrong(false), 500);
                }
              }}
              className={`w-32 h-32 rounded-2xl flex flex-col items-center justify-center gap-2 ${wrong ? 'animate-shake' : ''}`}
              style={{ 
                background: "#1a1a1a", 
                border: `2px solid ${COLOR}`,
                opacity: wrong && !loc.correct ? 0.5 : 1
              }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span className="text-4xl">{loc.emoji}</span>
              <span className="text-white text-sm">{loc.name}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10">
          <p className="text-6xl mb-4">🌍</p>
          <p className="text-white/70 text-sm">Hidden outside in the ground!</p>
        </motion.div>
      )}

      {wrong && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-red-400 text-sm z-10">
          ❌ Security might find it there! Try outside!
        </motion.p>
      )}
    </motion.div>
  );
}

// Stage 3: Karaoke - 7 Days lyrics
function Stage3({ onDone }: { onDone: () => void }) {
  const lyrics = [
    "I met this girl on Monday",
    "Took her for a drink on Tuesday",
    "We were making love by Wednesday",
    "And on Thursday and Friday and Saturday",
    "We chilled on Sunday"
  ];
  const [revealed, setRevealed] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Karaoke Night</p>
        <h2 className="text-2xl font-bold text-white">7 Days Lyrics</h2>
        <p className="text-white/50 text-sm mt-2">Click to reveal the lyrics</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10 w-80">
        {lyrics.map((line, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === revealed) {
                setRevealed(i + 1);
                if (i + 1 === lyrics.length) setTimeout(() => onDone(), 800);
              }
            }}
            className={`p-4 rounded-xl text-left transition-all ${
              i < revealed 
                ? 'bg-green-500/30 border-green-500' 
                : i === revealed 
                  ? 'bg-green-500/20 border-green-500 animate-pulse'
                  : 'bg-gray-800 border-gray-700'
            }`}
            style={{ border: '2px solid' }}
            disabled={i !== revealed}
            whileHover={i === revealed ? { scale: 1.02 } : {}}>
            <div className="flex items-center gap-3">
              <Mic size={16} style={{ color: i < revealed ? COLOR : '#666' }} />
              <span className={`text-sm ${i < revealed ? 'text-white' : 'text-gray-500'}`}>
                {i < revealed ? line : "Click to reveal..."}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{revealed} / {lyrics.length} lines</p>
    </motion.div>
  );
}

// Stage 4: Concert moments - catch the memories
function Stage4({ onDone }: { onDone: () => void }) {
  const [caught, setCaught] = useState(0);
  const total = 5;
  const memories = ["🎤", "💃", "🎵", "✨", "💚"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Concert Night</p>
        <h2 className="text-2xl font-bold text-white">Catch the Moments</h2>
        <p className="text-white/50 text-sm mt-2">Click the memories as they appear</p>
      </motion.div>

      <div className="relative w-80 h-60 z-10">
        {Array.from({ length: total }).map((_, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === caught) {
                setCaught(i + 1);
                if (i + 1 === total) setTimeout(() => onDone(), 500);
              }
            }}
            className="absolute w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              background: i < caught ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: i < caught ? [1, 1.1, 1] : i === caught ? [1, 1.3, 1] : 0,
              opacity: i <= caught ? 1 : 0,
              y: i < caught ? [0, -10, 0] : 0,
            }}
            transition={{ 
              scale: { duration: 0.5 },
              y: { duration: 1, repeat: Infinity, delay: i * 0.2 }
            }}
            whileHover={{ scale: 1.1 }}>
            {memories[i]}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{caught} / {total} memories caught</p>
    </motion.div>
  );
}

// Stage 5: Tribute
function Stage5({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div key={i} className="absolute text-xl"
          style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
          animate={{ y: [0, -25, 0], opacity: [0.3, 0.7, 0.3], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "🎵" : i % 4 === 1 ? "🎤" : i % 4 === 2 ? "💚" : "✨"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🎶
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Craig David Concert</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          I invited you because at the office we always listened to music.
          I suggested Craig David and you really liked "7 Days".
          <br /><br />
          We hid our vape outside in the ground, enjoyed the concert, found it after, and laughed.
          <span className="block text-white/40 text-xs mt-2 italic">Those little secrets made it special.</span>
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
