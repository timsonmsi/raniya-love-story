"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, Moon } from "lucide-react";

const COLOR = "#FF8E53";
const BG = "#1a0f0a";

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

export function ChapterRamadan({ onBack }: Props) {
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

// Stage 1: First Meeting - Moon phase game with Aizere mention
function Stage1({ onDone }: { onDone: () => void }) {
  const [clickedMoons, setClickedMoons] = useState<Set<number>>(new Set());
  const totalMoons = 5;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Ramadan 2025</p>
        <h2 className="text-2xl font-bold text-white">The First Meeting</h2>
        <p className="text-white/50 text-sm mt-2">Turcha Catering @ Dormitory</p>
      </motion.div>

      <div className="flex gap-4 z-10">
        {Array.from({ length: totalMoons }).map((_, i) => (
          <motion.button key={i}
            onClick={() => {
              if (!clickedMoons.has(i)) {
                const newClicked = new Set(clickedMoons);
                newClicked.add(i);
                setClickedMoons(newClicked);
                if (newClicked.size === totalMoons) setTimeout(() => onDone(), 500);
              }
            }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: clickedMoons.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
              opacity: clickedMoons.has(i) ? 1 : 0.5,
            }}
            animate={clickedMoons.has(i) ? { scale: [1, 1.2, 1] } : {}}
            whileHover={{ scale: 1.05 }}>
            {clickedMoons.has(i) ? "🌙" : "✨"}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10 max-w-md text-center">
        Aizere said: <span className="italic text-white/70">"Can I bring one more person?"</span>
      </p>
    </motion.div>
  );
}

// Stage 2: Memory matching game with RANDOMIZED positions
function Stage2({ onDone }: { onDone: () => void }) {
  const baseCards = ["🍽️", "🌙", "🏠", "🎮"];
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [canProceed, setCanProceed] = useState(false);

  // Shuffle cards on mount
  useEffect(() => {
    const shuffled = [...baseCards, ...baseCards]
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.has(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        const newMatched = new Set(matched);
        newMatched.add(first);
        newMatched.add(second);
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.size === cards.length) setCanProceed(true);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Second Meeting</p>
        <h2 className="text-2xl font-bold text-white">Remember the Moments</h2>
        <p className="text-white/50 text-sm mt-2">Find matching pairs</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-3 z-10">
        {cards.map((card, i) => (
          <motion.button key={i}
            onClick={() => handleCardClick(i)}
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: flipped.includes(i) || matched.has(i) ? `${COLOR}40` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
            }}
            animate={flipped.includes(i) ? { rotateY: 180 } : {}}
            whileHover={{ scale: 1.05 }}>
            {flipped.includes(i) || matched.has(i) ? card : "🌟"}
          </motion.button>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{matched.size / 2} / 4 pairs found</p>

      {canProceed && (
        <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          onClick={onDone}
          className="px-8 py-3 rounded-full text-sm font-semibold z-10"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }}>
          Memories Match! →
        </motion.button>
      )}
    </motion.div>
  );
}

// Stage 3: Racing Car Game - Mouse controlled, avoid 5 barriers
function Stage3({ onDone }: { onDone: () => void }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [carY, setCarY] = useState(200);
  const [barriers, setBarriers] = useState<{x: number, gapY: number, gapHeight: number}[]>([]);
  const [passed, setPassed] = useState<Set<number>>(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Initialize barriers with random gaps
  const initGame = useCallback(() => {
    const initialBarriers = Array.from({ length: 5 }, (_, i) => ({
      x: 600 + i * 400,
      gapY: 100 + Math.random() * 200,
      gapHeight: 80 + Math.random() * 40,
    }));
    setBarriers(initialBarriers);
    setCarY(200);
    setPassed(new Set());
    setGameOver(false);
    setWon(false);
    setGameStarted(true);
  }, []);

  // Mouse/touch control
  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!gameAreaRef.current || !gameStarted || gameOver || won) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newY = ((clientY - rect.top) / rect.height) * 400;
    setCarY(Math.max(0, Math.min(360, newY)));
  }, [gameStarted, gameOver, won]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || won) return;

    const gameLoop = () => {
      setBarriers(prev => {
        const newBarriers = prev.map(b => ({ ...b, x: b.x - 5 }));
        
        // Check collisions and passed barriers
        const carLeft = 80;
        const carRight = 140;
        const carTop = carY;
        const carBottom = carY + 40;

        newBarriers.forEach((barrier, i) => {
          // Check if car passed barrier
          if (barrier.x + 60 < carLeft && !passed.has(i)) {
            const newPassed = new Set(passed);
            newPassed.add(i);
            setPassed(newPassed);
            if (newPassed.size === 5) {
              setWon(true);
              setTimeout(() => onDone(), 1500);
            }
          }

          // Check collision
          if (barrier.x < carRight && barrier.x + 60 > carLeft) {
            const gapTop = barrier.gapY - barrier.gapHeight / 2;
            const gapBottom = barrier.gapY + barrier.gapHeight / 2;
            if (carTop < gapTop || carBottom > gapBottom) {
              setGameOver(true);
            }
          }
        });

        // Reset barriers that went off screen
        return newBarriers.map(b => b.x < -100 ? { ...b, x: 2000 } : b);
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameStarted, gameOver, won, carY, passed, onDone]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">Late Night Gaming</p>
        <h2 className="text-2xl font-bold text-white">Night Race</h2>
        <p className="text-white/50 text-sm mt-2">Move mouse to steer! Pass 5 barriers</p>
      </motion.div>

      {/* Game area - BIGGER */}
      <div 
        ref={gameAreaRef}
        className="relative w-full max-w-4xl h-[400px] rounded-xl overflow-hidden z-10 cursor-crosshair"
        style={{ background: "linear-gradient(to bottom, #0a0a1a 0%, #1a0a2a 100%)", border: `3px solid ${COLOR}` }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        {/* Road markings */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1" style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 80px)" }} />

        {/* Car (player) */}
        <motion.div
          className="absolute w-16 h-10 rounded flex items-center justify-center text-3xl"
          style={{
            left: '80px',
            top: carY,
            background: `linear-gradient(135deg, ${COLOR}, ${COLOR}aa)`,
            borderRadius: '8px',
            boxShadow: `0 0 20px ${COLOR}, 0 0 40px ${COLOR}60`,
          }}
        >
          🏎️
        </motion.div>

        {/* Barriers */}
        {barriers.map((barrier, i) => (
          <div key={i}>
            {/* Top barrier */}
            <div
              className="absolute w-16"
              style={{
                left: barrier.x,
                top: 0,
                height: barrier.gapY - barrier.gapHeight / 2,
                background: `linear-gradient(to bottom, ${COLOR}60, ${COLOR}30)`,
                border: `2px solid ${COLOR}`,
                borderRadius: '0 0 8px 8px',
              }}
            />
            {/* Bottom barrier */}
            <div
              className="absolute w-16"
              style={{
                left: barrier.x,
                top: barrier.gapY + barrier.gapHeight / 2,
                height: 400 - barrier.gapY - barrier.gapHeight / 2,
                background: `linear-gradient(to bottom, ${COLOR}30, ${COLOR}60)`,
                border: `2px solid ${COLOR}`,
                borderRadius: '8px 8px 0 0',
              }}
            />
            {/* Gap indicator */}
            <div
              className="absolute w-2"
              style={{
                left: barrier.x - 8,
                top: barrier.gapY - barrier.gapHeight / 2,
                height: barrier.gapHeight,
                background: `rgba(255,255,255,0.3)`,
                borderRadius: '4px',
              }}
            />
          </div>
        ))}

        {/* Start screen */}
        {!gameStarted && !gameOver && !won && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <motion.div 
              className="text-center p-8 rounded-2xl"
              style={{ background: `${COLOR}20`, border: `2px solid ${COLOR}` }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <p className="text-2xl font-bold mb-4" style={{ color: COLOR }}>🏎️ Night Race</p>
              <p className="text-white/70 text-sm mb-4">Move your mouse up/down to steer</p>
              <p className="text-white/50 text-xs mb-6">Pass through all 5 gaps to win!</p>
              <motion.button
                onClick={initGame}
                className="px-8 py-3 rounded-full text-sm font-semibold"
                style={{ background: `${COLOR}60`, border: `2px solid ${COLOR}`, color: "white" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Race →
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Game over */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <motion.div 
              className="text-center p-8 rounded-2xl"
              style={{ background: `${COLOR}20`, border: `2px solid #ff4444` }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <p className="text-2xl font-bold mb-2" style={{ color: "#ff4444" }}>💥 Crash!</p>
              <p className="text-white/70 text-sm mb-4">You hit a barrier</p>
              <p className="text-white/50 text-xs mb-6">Barriers passed: {passed.size} / 5</p>
              <motion.button
                onClick={initGame}
                className="px-8 py-3 rounded-full text-sm font-semibold"
                style={{ background: `${COLOR}60`, border: `2px solid ${COLOR}`, color: "white" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Win screen */}
        {won && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <motion.div 
              className="text-center p-8 rounded-2xl"
              style={{ background: `${COLOR}20`, border: `2px solid #44ff44` }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <p className="text-2xl font-bold mb-2" style={{ color: "#44ff44" }}>🏆 Victory!</p>
              <p className="text-white/70 text-sm mb-4">All 5 barriers passed!</p>
              <motion.div className="flex justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl"
                  >
                    ⭐
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Progress indicators */}
      <div className="flex gap-3 z-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: passed.has(i) ? `${COLOR}60` : "#1a1a1a",
              border: `2px solid ${COLOR}`,
              color: passed.has(i) ? "white" : COLOR,
            }}
            animate={passed.has(i) ? { scale: [1, 1.2, 1] } : {}}
          >
            {passed.has(i) ? "✓" : i + 1}
          </motion.div>
        ))}
      </div>

      <p className="text-white/50 text-sm z-10">{passed.size} / 5 barriers passed</p>
    </motion.div>
  );
}

// Stage 4: Message conversation builder
function Stage4({ onDone }: { onDone: () => void }) {
  const messages = [
    { text: "Hey! Want to come over?", from: "him", emoji: "🏠" },
    { text: "I planned to go to friends...", from: "her", emoji: "🤔" },
    { text: "But okay, I'll come!", from: "her", emoji: "😊" },
    { text: "Yay! See you soon!", from: "him", emoji: "💕" },
  ];
  const [revealed, setRevealed] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center gap-5 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">The Decision</p>
        <h2 className="text-2xl font-bold text-white">That Evening</h2>
        <p className="text-white/50 text-sm mt-2">Click to reveal the conversation</p>
      </motion.div>

      <div className="flex flex-col gap-3 z-10 w-80">
        {messages.map((msg, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: msg.from === "him" ? -50 : 50 }}
            animate={{ opacity: i <= revealed ? 1 : 0, x: i <= revealed ? 0 : (msg.from === "him" ? -50 : 50) }}
            className={`p-4 rounded-2xl ${msg.from === "him" ? "rounded-bl-none" : "rounded-br-none ml-auto"}`}
            style={{
              background: msg.from === "him" ? `${COLOR}30` : `${COLOR}50`,
              border: `1px solid ${COLOR}`,
              maxWidth: "80%",
            }}>
            <p className="text-white text-sm">{msg.text}</p>
          </motion.div>
        ))}
      </div>

      {revealed < messages.length && (
        <motion.button onClick={() => {
          setRevealed(revealed + 1);
          if (revealed + 1 === messages.length) setTimeout(() => onDone(), 800);
        }}
          className="px-8 py-3 rounded-full text-sm font-semibold z-10"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }}>
          {revealed === 0 ? "Start Conversation" : "Continue"} →
        </motion.button>
      )}

      {revealed === messages.length && (
        <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          onClick={onDone}
          className="px-8 py-3 rounded-full text-sm font-semibold z-10"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }}>
          Night Together →
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
        <motion.div key={i} className="absolute text-xl"
          style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
          {i % 3 === 0 ? "🌙" : i % 3 === 1 ? "✨" : "💫"}
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="text-center z-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: `radial-gradient(circle, ${COLOR}60, ${COLOR}20)`, boxShadow: `0 0 60px ${COLOR}60` }}>
          🌙
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">Ramadan Memories</h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          Two gatherings during the holy month changed everything.
          From Aizere's question to late night gaming sessions.
          <br /><br />
          The universe was already working its magic...
        </p>

        <motion.button onClick={onBack} className="mt-8 px-10 py-3 rounded-full text-sm font-semibold"
          style={{ background: `${COLOR}25`, border: `1px solid ${COLOR}`, color: COLOR }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          ← Back to Timeline
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
