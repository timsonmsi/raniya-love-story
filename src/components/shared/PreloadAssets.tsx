"use client";

import { useEffect, useState } from 'react';

interface PreloadAssetsProps {
  onComplete: () => void;
}

export function PreloadAssets({ onComplete }: PreloadAssetsProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('🎯 Preloading all assets for instant experience...');

    // Create image cache in memory
    const imageCache: HTMLImageElement[] = [];
    
    // STEP 1: Preload avatar (CRITICAL - needed for intro)
    const avatarImg = new Image();
    avatarImg.src = '/avatar/DSCF5853.png';
    avatarImg.onload = () => {
      imageCache.push(avatarImg);
      console.log('✅ Avatar cached in memory');
      
      // STEP 2: Preload all memory photos
      const memoryFiles = [
        '/memories/20250330_000355.jpg',
        '/memories/DSC_0820.png',
        '/memories/DSC_0828.png',
        '/memories/DSCF5734-2.png',
        '/memories/DSCF5740.png',
        '/memories/DSCF5841.png',
        '/memories/DSCF5847.png',
        '/memories/DSCF5849.png',
        '/memories/DSCF5861.png',
        '/memories/DSCF5862.png',
        '/memories/DSCF5865.png',
        '/memories/DSCF5867.png',
        '/memories/DSCF5868.png',
        '/memories/DSCF5875.png',
        '/memories/DSCF5876.png',
        '/memories/IMG_20250622_230702_857.jpg',
        '/memories/IMG_20251221_101159_608.jpg',
        '/memories/Instax Wide Print.png',
        '/memories/20250713_120150.jpg',
        '/memories/20251105_233113.jpg',
        '/memories/20251214_003031.jpg',
        '/memories/20251215_213219.jpg',
        '/memories/img1764342181155.jpg',
        '/memories/Screenshot_20251231_234339_Telegram.png',
      ];

      let memoriesLoaded = 0;
      memoryFiles.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          imageCache.push(img);
          memoriesLoaded++;
          if (memoriesLoaded === memoryFiles.length) {
            console.log(`✅ All ${memoriesLoaded} memory photos cached in memory`);
            console.log('🎉 All assets ready! Starting website...');
            setLoaded(true);
            onComplete();
          }
        };
        img.onerror = () => {
          memoriesLoaded++;
          console.warn(`⚠️ Memory photo failed: ${src.split('/').pop()}`);
          if (memoriesLoaded === memoryFiles.length) {
            console.log('⚠️ Some photos failed, starting anyway...');
            setLoaded(true);
            onComplete();
          }
        };
      });
    };
    
    avatarImg.onerror = () => {
      console.warn('⚠️ Avatar failed to load');
      setLoaded(true);
      onComplete();
    };

    // STEP 3: Preload ALL music in background (doesn't block start)
    const musicFiles = [
      '/music/Bill Withers  - Just The Two Of Us.mp3',
      '/music/Craig David - 7 Days.mp3',
      '/music/BTS - I Need U (Piano).mp3',
      '/music/Don Toliver (feat. Doja Cat) - Lose My Mind.m4a',
    ];

    musicFiles.forEach((src) => {
      const audio = new Audio();
      audio.src = src;
      audio.preload = 'auto';
      audio.oncanplaythrough = () => {
        console.log(`   ✅ Music cached: ${src.split('/').pop()}`);
      };
      audio.onerror = () => {
        console.warn(`   ⚠️ Music failed: ${src.split('/').pop()}`);
      };
      audio.load();
    });
    console.log('🎵 Preloading all 4 music tracks in background...');
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#02020a]">
      <div className="text-center">
        {/* Animated heart loading indicator */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255,107,157,0.3) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="text-4xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💕
          </motion.div>
        </div>
        
        {/* Loading text */}
        <motion.p
          className="text-white/50 text-sm tracking-widest uppercase"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {loaded ? 'Ready!' : 'Loading our story...'}
        </motion.p>
        
        {/* Progress dots */}
        <div className="flex gap-2 justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#FF6B9D]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';

export default PreloadAssets;
