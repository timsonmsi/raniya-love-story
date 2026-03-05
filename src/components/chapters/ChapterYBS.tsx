"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Sparkles, Music, Star, Heart } from "lucide-react";

const COLOR = "#FF6B9D";
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

export function ChapterYBS({ onBack }: Props) {
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

// Stage 1: Light up the stage
function Stage1({ onDone }: { onDone: () => void }) {
  const COLS = 8, ROWS = 6, TOTAL = COLS * ROWS;
  const [litTiles, setLitTiles] = useState<Set<number>>(new Set());
  const [canProceed, setCanProceed] = useState(false);

  const handleHover = useCallback((i: number) => {
    setLitTiles((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      if (next.size >= TOTAL) setCanProceed(true);
      return next;
    });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B9D]/5 to-transparent pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Chapter 1 · YBS Dance Club</p>
        <h2 className="text-2xl font-bold text-white">Light Up The Stage</h2>
        <p className="text-white/50 text-sm mt-2 max-w-md">Where it all began - K-pop covers at Nazarbayev University</p>
      </motion.div>

      <div className="grid gap-1 z-10" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <motion.div key={i}
            className="w-10 h-10 rounded-sm cursor-pointer"
            onHoverStart={() => handleHover(i)}
            animate={{
              backgroundColor: litTiles.has(i) ? COLOR : "#1a1a1a",
              boxShadow: litTiles.has(i) ? `0 0 10px ${COLOR}, 0 0 25px ${COLOR}40` : "none",
            }}
            transition={{ duration: 0.12 }} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 z-10">
        <p className="text-white/30 text-xs font-mono">{litTiles.size} / {TOTAL}</p>
        <AnimatePresence>
          {canProceed && (
            <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onDone}
              className="px-8 py-3 rounded-full text-sm font-semibold"
              style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}>
              The Stage is Lit! →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Stage 2: Match the dance moves
function Stage2({ onDone }: { onDone: () => void }) {
  const moves = ["🎤", "💃", "🎵", "✨", "🌟"];
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [feedback, setFeedback] = useState("");

  const generateSequence = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * moves.length));
  };

  const startSequence = async () => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    setShowingSequence(true);
    setFeedback("Watch the sequence...");

    for (let i = 0; i < newSequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setFeedback(`Step ${i + 1}: ${moves[newSequence[i]]}`);
      await new Promise(resolve => setTimeout(resolve, 400));
      setFeedback("");
    }
    setShowingSequence(false);
    setFeedback("Your turn! Click the moves in order");
  };

  const handleMoveClick = (index: number) => {
    if (showingSequence || canProceed) return;
    
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    if (index !== sequence[newUserSequence.length - 1]) {
      setFeedback("❌ Wrong! Try again");
      setTimeout(() => startSequence(), 1000);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      setFeedback("✅ Perfect! You nailed it!");
      setCanProceed(true);
    } else {
      setFeedback(`Step ${newUserSequence.length}/${sequence.length}`);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Dance Practice</p>
        <h2 className="text-2xl font-bold text-white">Learn the Choreography</h2>
        <p className="text-white/50 text-sm mt-2">Remember and repeat the dance moves</p>
      </motion.div>

      <div className="flex gap-3 z-10">
        {moves.map((move, i) => (
          <motion.button key={i}
            onClick={() => handleMoveClick(i)}
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
            style={{
              background: userSequence.includes(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
              boxShadow: userSequence.includes(i) ? `0 0 30px ${COLOR}60` : "none",
            }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            animate={showingSequence && sequence[userSequence.length] === i ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}>
            {move}
          </motion.button>
        ))}
      </div>

      <p className="text-white/70 text-sm z-10 h-6">{feedback}</p>

      {!showingSequence && userSequence.length === 0 && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={startSequence}
          className="px-8 py-3 rounded-full text-sm font-semibold z-10"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }}>
          Start Dance →
        </motion.button>
      )}

      {canProceed && (
        <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          onClick={onDone}
          className="px-8 py-3 rounded-full text-sm font-semibold z-10"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }}>
          Performance Complete! →
        </motion.button>
      )}
    </motion.div>
  );
}

// Stage 3: Annual Concert preparation
function Stage3({ onDone }: { onDone: () => void }) {
  const [rehearsals, setRehearsals] = useState(0);
  const totalRehearsals = 10;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Annual Concert</p>
        <h2 className="text-2xl font-bold text-white">Rehearsal Time</h2>
        <p className="text-white/50 text-sm mt-2">Click to rehearse for the Main Hall performance</p>
      </motion.div>

      <div className="flex gap-2 z-10 flex-wrap justify-center max-w-md">
        {Array.from({ length: totalRehearsals }).map((_, i) => (
          <motion.button key={i}
            onClick={() => {
              if (i === rehearsals) {
                setRehearsals(i + 1);
                if (i + 1 === totalRehearsals) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: i < rehearsals ? `${COLOR}60` : i === rehearsals ? `${COLOR}30` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
              opacity: i <= rehearsals ? 1 : 0.5,
            }}
            animate={i === rehearsals ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
            whileHover={i === rehearsals ? { scale: 1.05 } : {}}>
            {i < rehearsals ? "✓" : "🎭"}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{rehearsals} / {totalRehearsals} rehearsals completed</p>
    </motion.div>
  );
}

// Stage 4: K-pop song selector
function Stage4({ onDone }: { onDone: () => void }) {
  const songs = [
    { name: "Dynamite", artist: "BTS", emoji: "🎤" },
    { name: "How You Like That", artist: "BLACKPINK", emoji: "💃" },
    { name: "God's Menu", artist: "Stray Kids", emoji: "🔥" },
    { name: "Next Level", artist: "aespa", emoji: "✨" },
    { name: "Permission to Dance", artist: "BTS", emoji: "💜" },
  ];
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [canProceed, setCanProceed] = useState(false);

  const toggleSong = (i: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(i)) {
      newSelected.delete(i);
    } else {
      newSelected.add(i);
    }
    setSelected(newSelected);
    if (newSelected.size >= 3) setCanProceed(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Setlist</p>
        <h2 className="text-2xl font-bold text-white">Choose Your Songs</h2>
        <p className="text-white/50 text-sm mt-2">Select at least 3 songs for the concert</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10">
        {songs.map((song, i) => (
          <motion.button key={i}
            onClick={() => toggleSong(i)}
            className="w-64 px-6 py-4 rounded-xl flex items-center gap-4"
            style={{
              background: selected.has(i) ? `${COLOR}30` : "#1a1a1a",
              border: `2px solid ${selected.has(i) ? COLOR : "#333"}`,
            }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <span className="text-3xl">{song.emoji}</span>
            <div className="text-left">
              <p className="font-bold text-white">{song.name}</p>
              <p className="text-xs text-white/50">{song.artist}</p>
            </div>
            {selected.has(i) && <Star className="ml-auto" size={20} style={{ color: COLOR, fill: COLOR }} />}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{selected.size} / {songs.length} songs selected</p>

      {canProceed && (
        <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          onClick={onDone}
          className="px-8 py-3 rounded-full text-sm font-semibold z-10"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }}>
          Setlist Ready! →
        </motion.button>
      )}
    </motion.div>
  );
}

// Stage 5: Tribute
function Stage5({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div key={i} className="absolute text-2xl"
          style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "🎭" : i % 4 === 1 ? "🎵" : i % 4 === 2 ? "💃" : "✨"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          💖
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">YBS Legacy</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          From 2019 to 2025, YBS was more than just a club — it was a family.
          Years of performances, rehearsals, and memories.
          <br /><br />
          And this is where our story would eventually begin...
        </p>

        <div className="flex items-center justify-center gap-2 text-white/40 text-xs tracking-widest">
          <Music size={14} />
          <span>K-POP COVER DANCE CLUB · NAZARBAYEV UNIVERSITY</span>
          <Music size={14} />
        </div>

        <motion.button onClick={onBack} className="mt-8 px-10 py-3 rounded-full text-sm font-semibold"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          ← Back to Timeline
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
