'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";

const CHAPTERS = [
  { id: "ybs", name: "YBS", color: "#FF6B9D", year: "2019-2025", icon: "🎭" },
  { id: "ramadan", name: "First Meeting", color: "#FF8E53", year: "Ramadan 2025", icon: "🌙" },
  { id: "bbq", name: "BBQ Party", color: "#FFA726", year: "Spring 2025", icon: "🍖" },
  { id: "naruto", name: "Naruto Quiz", color: "#FF7043", year: "Spring 2025", icon: "🍜" },
  { id: "wcs", name: "WCS Journey", color: "#EF5350", year: "Summer 2025", icon: "💻" },
  { id: "office", name: "Office Days", color: "#EC407A", year: "Summer 2025", icon: "🏢" },
  { id: "summer", name: "Summer Memories", color: "#AB47BC", year: "Summer 2025", icon: "☀️" },
  { id: "f1", name: "F1 Movie", color: "#7E57C2", year: "Summer 2025", icon: "🏎️" },
  { id: "ocean", name: "Ocean Basket", color: "#5C6BC0", year: "Summer 2025", icon: "🌊" },
  { id: "chanwon", name: "Chanwon", color: "#42A5F5", year: "June 2025", icon: "🏆" },
  { id: "thailand", name: "Thailand", color: "#26C6DA", year: "Summer 2025", icon: "✈️" },
  { id: "igem", name: "iGEM", color: "#26A69A", year: "Fall 2025", icon: "🧬" },
  { id: "craig", name: "Craig David", color: "#66BB6A", year: "September 2025", icon: "🎵" },
  { id: "higgsfield", name: "The Choice", color: "#8BC34A", year: "October 2025", icon: "⚖️" },
  { id: "driving", name: "Driving Lessons", color: "#9CCC65", year: "October 2025", icon: "🚗" },
  { id: "october", name: "October 11", color: "#D4E157", year: "October 2025", icon: "💕" },
  { id: "november", name: "November 10", color: "#FFEE58", year: "November 2025", icon: "💝" },
];

interface Props {
  visited: Set<string>;
  onSelect: (chapter: typeof CHAPTERS[0]) => void;
  onCelebrate: () => void;
  scrollPosition: number;
  onScrollChange: (pos: number) => void;
}

export function Timeline({ visited, onSelect, onCelebrate, scrollPosition, onScrollChange }: Props) {
  useEffect(() => {
    const container = document.getElementById('timeline-container');
    if (container) {
      container.scrollTop = scrollPosition;
    }
  }, []);

  const handleScroll = () => {
    const container = document.getElementById('timeline-container');
    if (container) {
      onScrollChange(container.scrollTop);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 1.2 }}
      className="relative w-full h-full overflow-hidden pointer-events-none"
      style={{
        background: "radial-gradient(ellipse 100% 80% at 50% 40%, #1a0a1a 0%, #0a020a 50%, #030208 100%)"
      }}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart size={8 + Math.random() * 12} style={{ color: '#FF6B9D' }} />
          </motion.div>
        ))}
      </div>

      {/* TITLE */}
      <div className="absolute top-6 left-0 right-0 flex justify-center z-50 pointer-events-none select-none">
        <div className="text-center">
          <span className="block text-[10px] sm:text-xs tracking-[0.5em] uppercase text-white/30 mb-1">
            Our Love Story
          </span>
          <span className="block text-lg sm:text-xl tracking-[0.25em] uppercase font-light text-white/60">
            Every Chapter Matters
          </span>
        </div>
      </div>

      {/* TIMELINE SCROLL CONTAINER */}
      <div
        id="timeline-container"
        className="absolute inset-0 overflow-y-auto pointer-events-auto"
        onScroll={handleScroll}
      >
        {/* Added more top padding (py-32 instead of py-16) and bottom padding (pb-48) */}
        <div className="relative px-4 py-32 pb-48">
          {/* Center Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, #FF6B9D, #FF8E53, #FFA726, #EF5350, #EC407A, #AB47BC, #7E57C2, #5C6BC0, #42A5F5, #26C6DA, #26A69A, #66BB6A, #8BC34A, #9CCC65, #D4E157, #FFEE58)",
              opacity: 0.4
            }}
          />

          {/* Timeline Items */}
          {CHAPTERS.map((chapter, index) => {
            const isVisited = visited.has(chapter.id);
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="relative flex items-center mb-12 last:mb-0 max-w-3xl mx-auto"
              >
                {/* Left side of center */}
                <div className="w-1/2 flex justify-end items-center">
                  {isLeft && (
                    <motion.button
                      onClick={() => onSelect(chapter)}
                      className="relative w-56 p-4 rounded-2xl cursor-pointer transition-all duration-300 text-center overflow-hidden group"
                      style={{
                        marginRight: '24px',
                        background: isVisited
                          ? `linear-gradient(135deg, rgba(80,80,80,0.3), rgba(40,40,40,0.2))`
                          : `linear-gradient(135deg, ${chapter.color}15, ${chapter.color}05)`,
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${chapter.color}50`,
                        boxShadow: isVisited 
                          ? 'none'
                          : `0 4px 20px ${chapter.color}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
                        filter: isVisited ? 'grayscale(70%)' : 'none',
                        opacity: isVisited ? 0.5 : 1,
                      }}
                      whileHover={{
                        scale: 1.05,
                        background: `linear-gradient(135deg, ${chapter.color}25, ${chapter.color}10)`,
                        boxShadow: `0 8px 30px ${chapter.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                        filter: 'grayscale(0%)',
                        opacity: 1,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Shimmer effect on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `linear-gradient(45deg, transparent 30%, ${chapter.color}20 50%, transparent 70%)`,
                          backgroundSize: '200% 200%',
                        }}
                      />
                      
                      {/* Glow border effect */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${chapter.color}30, transparent 50%, ${chapter.color}20)`,
                        }}
                      />

                      <div className="relative z-10">
                        {/* Decorative sparkle */}
                        <Sparkles 
                          size={14} 
                          className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: chapter.color }}
                        />

                        <span
                          className="text-xs tracking-[0.2em] uppercase font-semibold"
                          style={{ color: isVisited ? '#666' : chapter.color, textShadow: isVisited ? 'none' : `0 0 10px ${chapter.color}40` }}
                        >
                          {chapter.year}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2 leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{chapter.name}</h3>
                        {isVisited && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 0.5, x: 0 }}
                            className="text-xs mt-2 block flex items-center gap-1 justify-center"
                          >
                            <span style={{ color: chapter.color }}>✓</span> Visited
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  )}
                </div>

                {/* Center Emoji Node on Line */}
                <motion.div
                  className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer z-10 flex-shrink-0 relative"
                  style={{
                    background: isVisited 
                      ? `linear-gradient(135deg, #666, #444)` 
                      : `linear-gradient(135deg, ${chapter.color}, ${chapter.color}dd)`,
                    boxShadow: isVisited 
                      ? '0 0 15px #666' 
                      : `0 0 25px ${chapter.color}, 0 0 50px ${chapter.color}40, inset 0 2px 0 rgba(255,255,255,0.3)`,
                    border: '2px solid rgba(255,255,255,0.2)',
                  }}
                  onClick={() => onSelect(chapter)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 40px ${chapter.color}, 0 0 80px ${chapter.color}60, inset 0 2px 0 rgba(255,255,255,0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = isVisited ? '0 0 15px #666' : `0 0 25px ${chapter.color}, 0 0 50px ${chapter.color}40, inset 0 2px 0 rgba(255,255,255,0.3)`;
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg select-none drop-shadow-lg">{chapter.icon}</span>
                </motion.div>

                {/* Right side of center */}
                <div className="w-1/2 flex justify-start items-center">
                  {!isLeft && (
                    <motion.button
                      onClick={() => onSelect(chapter)}
                      className="relative w-56 p-4 rounded-2xl cursor-pointer transition-all duration-300 text-center overflow-hidden group"
                      style={{
                        marginLeft: '24px',
                        background: isVisited
                          ? `linear-gradient(135deg, rgba(80,80,80,0.3), rgba(40,40,40,0.2))`
                          : `linear-gradient(135deg, ${chapter.color}15, ${chapter.color}05)`,
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${chapter.color}50`,
                        boxShadow: isVisited 
                          ? 'none'
                          : `0 4px 20px ${chapter.color}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
                        filter: isVisited ? 'grayscale(70%)' : 'none',
                        opacity: isVisited ? 0.5 : 1,
                      }}
                      whileHover={{
                        scale: 1.05,
                        background: `linear-gradient(135deg, ${chapter.color}25, ${chapter.color}10)`,
                        boxShadow: `0 8px 30px ${chapter.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                        filter: 'grayscale(0%)',
                        opacity: 1,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Shimmer effect on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `linear-gradient(-45deg, transparent 30%, ${chapter.color}20 50%, transparent 70%)`,
                          backgroundSize: '200% 200%',
                        }}
                      />
                      
                      {/* Glow border effect */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, transparent 50%, ${chapter.color}30)`,
                        }}
                      />

                      <div className="relative z-10">
                        {/* Decorative sparkle */}
                        <Sparkles 
                          size={14} 
                          className="absolute -top-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: chapter.color }}
                        />

                        <span
                          className="text-xs tracking-[0.2em] uppercase font-semibold"
                          style={{ color: isVisited ? '#666' : chapter.color, textShadow: isVisited ? 'none' : `0 0 10px ${chapter.color}40` }}
                        >
                          {chapter.year}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2 leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{chapter.name}</h3>
                        {isVisited && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.5, x: 0 }}
                            className="text-xs mt-2 block flex items-center gap-1 justify-center"
                          >
                            Visited <span style={{ color: chapter.color }}>✓</span>
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Celebrate button - appears when all memories visited */}
          {visited.size >= CHAPTERS.length && (
            <div className="flex justify-center w-full">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  boxShadow: [
                    "0 0 20px rgba(255,107,157,0.5), 0 0 40px rgba(0,240,255,0.4), 0 0 60px rgba(181,0,255,0.3)",
                    "0 0 40px rgba(255,107,157,0.7), 0 0 80px rgba(0,240,255,0.6), 0 0 120px rgba(181,0,255,0.5)",
                    "0 0 20px rgba(255,107,157,0.5), 0 0 40px rgba(0,240,255,0.4), 0 0 60px rgba(181,0,255,0.3)",
                  ]
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onClick={onCelebrate}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="px-6 py-2 rounded-full text-xs tracking-[0.2em] uppercase font-bold cursor-pointer pointer-events-auto relative overflow-hidden group whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, rgba(255,107,157,0.5), rgba(0,240,255,0.5), rgba(181,0,255,0.5))",
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "rgba(255,255,255,1)",
                  boxShadow: "0 0 30px rgba(255,107,157,0.5), 0 0 60px rgba(0,240,255,0.4), 0 0 90px rgba(181,0,255,0.3)",
                  backdropFilter: 'blur(10px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {/* Animated shimmer */}
                <div
                  className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                />
                <Sparkles size={12} />
                <span>Celebrate</span>
                <Sparkles size={12} />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator - fixed at bottom */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 select-none">
            {visited.size === 0 ? "Begin your journey" : `${visited.size} / ${CHAPTERS.length} memories explored`}
          </p>
          <div className="flex gap-2 flex-wrap justify-center max-w-xs">
            {CHAPTERS.map((chapter) => (
              <motion.div
                key={chapter.id}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                animate={visited.has(chapter.id) ? {
                  scale: [1, 1.3, 1],
                  boxShadow: [`0 0 6px ${chapter.color}`, `0 0 15px ${chapter.color}`, `0 0 6px ${chapter.color}`]
                } : {}}
                transition={visited.has(chapter.id) ? { duration: 1.5, repeat: Infinity } : {}}
                style={{
                  backgroundColor: visited.has(chapter.id) ? chapter.color : "rgba(255,255,255,0.15)",
                  boxShadow: visited.has(chapter.id) ? `0 0 8px ${chapter.color}` : "none"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Timeline;
