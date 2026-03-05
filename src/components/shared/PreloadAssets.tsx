"use client";

import { useEffect, useState } from 'react';

interface PreloadAssetsProps {
  onComplete?: () => void;
}

export function PreloadAssets({ onComplete }: PreloadAssetsProps) {
  const [step, setStep] = useState(0);
  const [totalSteps] = useState(4);

  useEffect(() => {
    // STEP 1: Preload avatar photo FIRST (before intro animations)
    const step1_PreloadAvatar = () => {
      console.log('🎯 STEP 1: Preloading avatar photo...');
      const img = new Image();
      img.src = '/avatar/DSCF5853.jpg';
      img.onload = () => {
        console.log('✅ STEP 1: Avatar photo loaded');
        setStep(1);
      };
      img.onerror = () => {
        console.warn('⚠️ STEP 1: Avatar photo failed to load');
        setStep(1); // Continue anyway
      };
    };

    // STEP 2: Preload music
    const step2_PreloadMusic = () => {
      console.log('🎵 STEP 2: Preloading music...');
      const musicFiles = [
        '/music/Bill Withers  - Just The Two Of Us.mp3',
        '/music/Craig David - 7 Days.mp3',
        '/music/BTS - I Need U (Piano).mp3'
      ];

      let loaded = 0;
      musicFiles.forEach((src, index) => {
        const audio = new Audio();
        audio.src = src;
        audio.preload = 'auto';
        audio.oncanplaythrough = () => {
          loaded++;
          console.log(`   ✅ Music: ${src.split('/').pop()}`);
          if (loaded === musicFiles.length) {
            console.log(`✅ STEP 2: ${loaded}/${musicFiles.length} music tracks cached`);
            setStep(2);
          }
        };
        audio.onerror = () => {
          loaded++;
          console.warn(`   ⚠️ Music failed: ${src.split('/').pop()}`);
          if (loaded === musicFiles.length) {
            setStep(2);
          }
        };
        audio.load();
      });
    };

    // STEP 3: Preload memory photos (for Celebrate page)
    const step3_PreloadMemories = () => {
      console.log('📸 STEP 3: Preloading memory photos...');
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

      let loaded = 0;
      memoryFiles.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loaded++;
          if (loaded === memoryFiles.length) {
            console.log(`✅ STEP 3: ${loaded}/${memoryFiles.length} memory photos cached`);
            setStep(3);
          }
        };
        img.onerror = () => {
          loaded++;
          if (loaded === memoryFiles.length) {
            setStep(3);
          }
        };
      });
    };

    // STEP 4: Complete
    const step4_Complete = () => {
      console.log('🎉 All assets preloaded!');
      if (onComplete) onComplete();
    };

    // Start the sequence
    step1_PreloadAvatar();
  }, [onComplete]);

  // Trigger next steps based on current step
  useEffect(() => {
    if (step === 1) {
      // Avatar loaded, now load music
      const timer = setTimeout(() => {}, 0);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      // Music loaded, now load memories
      const timer = setTimeout(() => {}, 0);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 3) {
      // Memories loaded, complete
      const timer = setTimeout(() => {
        // Complete after a brief delay
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return null;
}

export default PreloadAssets;
