"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Car, MapPin } from "lucide-react";

const COLOR = "#9CCC65";
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

export function ChapterDriving({ onBack }: Props) {
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

// Stage 1: Driving lesson - parallel parking
function Stage1({ onDone }: { onDone: () => void }) {
  const [position, setPosition] = useState(20);
  const [parked, setParked] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Driving Test Prep</p>
        <h2 className="text-2xl font-bold text-white">Parallel Parking</h2>
        <p className="text-white/50 text-sm mt-2">Use ← → to park in the spot</p>
      </motion.div>

      <div className="w-80 h-32 rounded-xl relative z-10" style={{ background: "#1a1a1a", border: `3px solid ${COLOR}` }}>
        {/* Parking spot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-16 border-2 border-dashed border-white/30 rounded-b-lg" />
        
        <motion.div
          className="absolute bottom-2 w-16 h-10 rounded flex items-center justify-center text-xl"
          style={{ left: `${position}%`, background: COLOR }}
          animate={{ x: "-50%" }}>
          🚗
        </motion.div>
      </div>

      <div className="flex gap-3 z-10">
        <motion.button onClick={() => setPosition(Math.max(10, position - 5))} disabled={parked}
          className="w-16 h-16 rounded-xl text-2xl font-bold"
          style={{ background: "#1a1a1a", border: `2px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>←</motion.button>
        <motion.button onClick={() => {
          if (position >= 45 && position <= 55) {
            setParked(true);
            setTimeout(() => onDone(), 500);
          }
        }} disabled={parked}
          className="w-24 h-16 rounded-xl text-sm font-bold"
          style={{ background: `${COLOR}40`, border: `2px solid ${COLOR}`, color: "white" }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>PARK</motion.button>
        <motion.button onClick={() => setPosition(Math.min(90, position + 5))} disabled={parked}
          className="w-16 h-16 rounded-xl text-2xl font-bold"
          style={{ background: "#1a1a1a", border: `2px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>→</motion.button>
      </div>

      {parked && <p className="text-white/70 text-sm z-10">Perfect Park! ✓</p>}
    </motion.div>
  );
}

// Stage 2: Song playlist builder - ONLY "7 Days" and "Just A Two Of Us" are correct
function Stage2({ onDone }: { onDone: () => void }) {
  const songs = [
    { name: "7 Days", artist: "Craig David", emoji: "💚", correct: true },
    { name: "Just A Two Of Us", artist: "Bill Withers", emoji: "💕", correct: true },
    { name: "Fill Me In", artist: "Craig David", emoji: "🎵", correct: false },
    { name: "Lovely Day", artist: "Bill Withers", emoji: "☀️", correct: false },
  ];
  const [selected, setSelected] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);

  const toggleSong = (i: number) => {
    if (!songs[i].correct) {
      setWrong(i);
      setTimeout(() => setWrong(null), 500);
      return;
    }

    if (selected.includes(i)) {
      setSelected(selected.filter(x => x !== i));
    } else if (selected.length < 2) {
      const newSelected = [...selected, i];
      setSelected(newSelected);
      if (newSelected.length === 2) setTimeout(() => onDone(), 800);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Night Drive</p>
        <h2 className="text-2xl font-bold text-white">Our Playlist</h2>
        <p className="text-white/50 text-sm mt-2">Select our favorite songs</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10">
        {songs.map((song, i) => (
          <motion.button key={i}
            onClick={() => toggleSong(i)}
            className={`w-64 px-6 py-4 rounded-xl flex items-center gap-4 ${wrong === i ? 'animate-shake' : ''}`}
            style={{
              background: selected.includes(i) ? `${COLOR}30` : wrong === i ? "#ff444430" : "#1a1a1a",
              border: `2px solid ${selected.includes(i) ? COLOR : wrong === i ? "#ff4444" : "#333"}`,
              opacity: wrong === i ? 0.5 : 1,
            }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <span className="text-2xl">{song.emoji}</span>
            <div className="text-left flex-1">
              <p className="font-bold text-white">{song.name}</p>
              <p className="text-xs text-white/50">{song.artist}</p>
            </div>
            {selected.includes(i) && <span className="text-white/50 text-xs">#{selected.indexOf(i) + 1}</span>}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{selected.length} / 2 songs selected</p>

      {wrong !== null && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-red-400 text-sm z-10">
          ❌ Not this one! Think about our night drives...
        </motion.p>
      )}
    </motion.div>
  );
}

// Stage 3: Traffic Light Reaction Game (replaced Our Places)
function Stage3({ onDone }: { onDone: () => void }) {
  const [light, setLight] = useState<'red' | 'yellow' | 'green'>('red');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const totalRounds = 5;

  const nextRound = () => {
    if (round >= totalRounds) {
      setTimeout(() => onDone(), 500);
      return;
    }
    
    const lights: ('red' | 'yellow' | 'green')[] = ['red', 'yellow', 'green'];
    const newLight = lights[Math.floor(Math.random() * lights.length)];
    setLight(newLight);
    setRound(round + 1);
  };

  const handleLight = (clicked: 'red' | 'yellow' | 'green') => {
    if (clicked === light) {
      setScore(score + 1);
    }
    nextRound();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Driving Test</p>
        <h2 className="text-2xl font-bold text-white">Traffic Light Test</h2>
        <p className="text-white/50 text-sm mt-2">Click the matching light!</p>
      </motion.div>

      {/* Traffic Light Display */}
      <div className="relative z-10">
        <motion.div 
          className="w-24 h-64 rounded-2xl p-3 flex flex-col gap-3"
          style={{ background: "#1a1a1a", border: `3px solid #333` }}
        >
          {/* Red light */}
          <motion.button
            onClick={() => handleLight('red')}
            className="flex-1 rounded-full transition-all duration-200"
            style={{
              background: light === 'red' ? '#ff4444' : '#333',
              boxShadow: light === 'red' ? '0 0 30px #ff4444, 0 0 60px #ff444460' : 'none',
            }}
            whileTap={{ scale: 0.95 }}
          />
          {/* Yellow light */}
          <motion.button
            onClick={() => handleLight('yellow')}
            className="flex-1 rounded-full transition-all duration-200"
            style={{
              background: light === 'yellow' ? '#ffcc00' : '#333',
              boxShadow: light === 'yellow' ? '0 0 30px #ffcc00, 0 0 60px #ffcc0060' : 'none',
            }}
            whileTap={{ scale: 0.95 }}
          />
          {/* Green light */}
          <motion.button
            onClick={() => handleLight('green')}
            className="flex-1 rounded-full transition-all duration-200"
            style={{
              background: light === 'green' ? '#44ff44' : '#333',
              boxShadow: light === 'green' ? '0 0 30px #44ff44, 0 0 60px #44ff4460' : 'none',
            }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>

        {/* Current round indicator */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-center">
          <p className="text-white/50 text-xs mb-2">Round</p>
          <div className="flex flex-col gap-1">
            {Array.from({ length: totalRounds }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: i < round ? (i < score ? COLOR : '#ff4444') : '#333',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      {round === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-white/70 text-sm z-10">
          Click the lit light as fast as you can!
        </motion.p>
      )}

      {round > 0 && round < totalRounds && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-white/50 text-sm z-10">
          Score: {score} / {round}
        </motion.p>
      )}

      {round === totalRounds && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} 
          className="text-center z-10">
          <p className="text-white/70 text-lg mb-2">
            {score === totalRounds ? '🎉 Perfect!' : score >= 3 ? '✅ Good job!' : '🚗 Keep practicing!'}
          </p>
          <p className="text-white/50 text-sm">Final Score: {score} / {totalRounds}</p>
        </motion.div>
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
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 4 === 0 ? "🚗" : i % 4 === 1 ? "🌃" : i % 4 === 2 ? "🚦" : "💕"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10 max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🌃
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Night Drives</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          You were preparing for your driver license test. I helped you learn.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          We rented a car and rode through the night city, listening to our songs:
          "7 Days" and "Just A Two Of Us".
          <span className="block text-white/40 text-xs mt-2 italic">Those night drives with you were perfect.</span>
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
