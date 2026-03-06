"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Sparkles, ArrowLeft, X } from "lucide-react";
import { switchTrack } from "@/components/shared/MusicPlayer";

// Memory photos from the memories folder
const POLAROID_MEMORIES = [
  { src: "/memories/20250330_000355.jpg", caption: "Our Journey Begins" },
  { src: "/memories/DSC_0820.png", caption: "First Moments" },
  { src: "/memories/DSC_0828.png", caption: "Together" },
  { src: "/memories/DSCF5734-2.png", caption: "Special Day" },
  { src: "/memories/DSCF5740.png", caption: "Beautiful Memories" },
  { src: "/memories/DSCF5841.png", caption: "Happy Times" },
  { src: "/memories/DSCF5847.png", caption: "Laughter" },
  { src: "/memories/DSCF5849.png", caption: "Our Love" },
  { src: "/memories/DSCF5861.png", caption: "Forever Us" },
  { src: "/memories/DSCF5862.png", caption: "Sweet Memories" },
  { src: "/memories/DSCF5865.png", caption: "Together Always" },
  { src: "/memories/DSCF5867.png", caption: "Our Story" },
  { src: "/memories/DSCF5868.png", caption: "Love & Joy" },
  { src: "/memories/DSCF5875.png", caption: "Happiness" },
  { src: "/memories/DSCF5876.png", caption: "Best Moments" },
  { src: "/memories/IMG_20250622_230702_857.jpg", caption: "Summer Nights" },
  { src: "/memories/IMG_20251221_101159_608.jpg", caption: "Winter Warmth" },
  { src: "/memories/Instax Wide Print.png", caption: "Instax Memory" },
  { src: "/memories/20250713_120150.jpg", caption: "Midnight Sun" },
  { src: "/memories/20251105_233113.jpg", caption: "Late Night" },
  { src: "/memories/20251214_003031.jpg", caption: "Early Morning" },
  { src: "/memories/20251215_213219.jpg", caption: "Night Lights" },
  { src: "/memories/img1764342181155.jpg", caption: "Precious Moment" },
  { src: "/memories/Screenshot_20251231_234339_Telegram.png", caption: "Telegram Memory" },
];

interface Props {
  onBack: () => void;
}

export function CelebratePage({ onBack }: Props) {
  const [showMessage, setShowMessage] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Switch to BTS song when Celebrate page loads
  useEffect(() => {
    switchTrack('bts');
    
    // Switch back to main theme when leaving Celebrate page
    return () => {
      switchTrack('bill');
    };
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full overflow-auto bg-gradient-to-b from-[#1a0a1a] via-[#0a020a] to-[#030208]"
    >
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Heart
              size={10 + Math.random() * 20}
              style={{ color: ['#FF6B9D', '#FF8E53', '#AB47BC', '#42A5F5'][Math.floor(Math.random() * 4)] }}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} />
        <span className="text-xs tracking-widest uppercase">Back</span>
      </motion.button>

      <div className="relative z-10 min-h-full py-32 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-black mb-4"
            style={{
              background: "linear-gradient(135deg, #FF6B9D, #FF8E53, #AB47BC, #42A5F5)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            💕 Happy Together 💕
          </motion.h1>
          <p className="text-white/60 text-sm tracking-[0.3em] uppercase">
            Our Beautiful Journey
          </p>
        </motion.div>

        {/* Polaroid Gallery - Hanging on strings */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {POLAROID_MEMORIES.map((memory, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPhoto(i)}
            >
              {/* String/rope hanging from top */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8"
                style={{
                  background: "linear-gradient(to bottom, rgba(200,180,160,0.6), rgba(200,180,160,0.2))",
                }}
              />

              {/* String attachment point on wall */}
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(200,180,160,0.8), rgba(200,180,160,0.3))",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              />

              {/* Polaroid */}
              <motion.div
                className="bg-white p-1.5 pb-2 rounded-sm shadow-2xl transform transition-transform group-hover:scale-105"
                style={{
                  rotate: (i % 2 === 0 ? -5 : 5) + (Math.random() * 3 - 1.5),
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 0,
                  zIndex: 10,
                }}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-sm overflow-hidden relative">
                  {/* Loading state */}
                  {!loadedImages.has(i) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full"
                      />
                    </div>
                  )}
                  
                  {/* Actual image */}
                  <img 
                    src={memory.src} 
                    alt={memory.caption} 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      loadedImages.has(i) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(i)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Fallback for broken images */}
                  {!loadedImages.has(i) && (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gray-200">
                      💕
                    </div>
                  )}

                  {/* Click hint overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
                    >
                      <Sparkles size={16} className="text-[#FF6B9D]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Photo Modal/Lightbox */}
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedPhoto(null)}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>

              {/* Previous button */}
              <motion.button
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : POLAROID_MEMORIES.length - 1);
                }}
                className="absolute left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={24} />
              </motion.button>

              {/* Next button */}
              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(selectedPhoto < POLAROID_MEMORIES.length - 1 ? selectedPhoto + 1 : 0);
                }}
                className="absolute right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={24} className="rotate-180" />
              </motion.button>

              {/* Photo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative max-w-4xl max-h-[80vh] p-4 bg-white rounded-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* String attachment */}
                <div 
                  className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-12"
                  style={{
                    background: "linear-gradient(to bottom, rgba(200,180,160,0.6), rgba(200,180,160,0.2))",
                  }}
                />
                
                <img
                  src={POLAROID_MEMORIES[selectedPhoto].src}
                  alt={POLAROID_MEMORIES[selectedPhoto].caption}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Love Letter */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B9D] via-[#AB47BC] to-[#42A5F5]" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF6B9D]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#42A5F5]/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#AB47BC] flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
              </motion.div>

              <div className="text-center space-y-4 text-white/80 leading-relaxed">
                <p className="text-lg">
                  To my dearest love,
                </p>
                <p>
                  From the moment we met at Turcha during Ramadan, my life has never been the same.
                  Every moment with you - from our late night PlayStation sessions to rooftop talks,
                  from teaching you videography to our night drives - has been a precious gift.
                </p>
                <p>
                  You are my best student, my best friend, and now my everything.
                  Thank you for being patient with me, for accepting me, and for loving me.
                </p>
                <p>
                  This is just the beginning of our story. I promise to make every chapter
                  as beautiful as the love we share.
                </p>
                <p className="text-xl font-semibold text-[#FF6B9D] mt-8">
                  Forever yours, 💕
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5 }}
                className="flex justify-center mt-8 gap-2"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Sparkles size={20} style={{ color: ['#FF6B9D', '#FF8E53', '#AB47BC', '#42A5F5', '#66BB6A'][i] }} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="text-center mt-12 mb-8"
        >
          <p className="text-white/40 text-xs tracking-[0.5em] uppercase">
            Made with all my love 💖
          </p>
          <p className="text-white/30 text-xs mt-2">
            November 10, 2025 - Our Start Date
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CelebratePage;
