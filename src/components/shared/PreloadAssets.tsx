"use client";

import { useEffect } from 'react';

interface PreloadAssetsProps {
  onAvatarLoaded?: () => void;
}

export function PreloadAssets({ onAvatarLoaded }: PreloadAssetsProps) {
  useEffect(() => {
    console.log('🎯 Starting asset preloading...');

    // STEP 1: Preload avatar photo FIRST - then start website immediately
    const img = new Image();
    img.src = '/avatar/DSCF5853.png';
    img.onload = () => {
      console.log('✅ Avatar loaded - Starting website!');
      // Start website immediately after avatar loads
      if (onAvatarLoaded) onAvatarLoaded();
      
      // Continue preloading in background
      preloadMusic();
    };
    img.onerror = () => {
      console.warn('⚠️ Avatar photo failed to load');
      // Start website anyway
      if (onAvatarLoaded) onAvatarLoaded();
    };

    // Preload music in background
    const preloadMusic = () => {
      console.log('🎵 Preloading music in background...');
      const musicFiles = [
        '/music/Bill Withers  - Just The Two Of Us.mp3',
        '/music/Craig David - 7 Days.mp3',
        '/music/BTS - I Need U (Piano).mp3'
      ];

      let musicLoaded = 0;
      musicFiles.forEach((src) => {
        const audio = new Audio();
        audio.src = src;
        audio.preload = 'auto';
        audio.oncanplaythrough = () => {
          musicLoaded++;
          console.log(`   ✅ Music: ${src.split('/').pop()}`);
        };
        audio.onerror = () => {
          musicLoaded++;
          console.warn(`   ⚠️ Music failed: ${src.split('/').pop()}`);
        };
        audio.load();
      });
    };

    // Preload memory photos in background (for Celebrate page)
    const preloadMemories = () => {
      console.log('📸 Preloading memory photos in background...');
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
        const memoryImg = new Image();
        memoryImg.src = src;
        memoryImg.onload = () => {
          memoriesLoaded++;
          if (memoriesLoaded === memoryFiles.length) {
            console.log(`✅ All ${memoriesLoaded} memory photos cached!`);
          }
        };
        memoryImg.onerror = () => {
          memoriesLoaded++;
        };
      });
    };

    // Start memory preloading after a short delay (let music start first)
    setTimeout(preloadMemories, 2000);
  }, [onAvatarLoaded]);

  return null;
}

export default PreloadAssets;
