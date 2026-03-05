"use client";

import { useEffect } from 'react';

interface PreloadAssetsProps {
  onComplete?: () => void;
}

export function PreloadAssets({ onComplete }: PreloadAssetsProps) {
  useEffect(() => {
    console.log('🎯 Starting asset preloading...');

    // STEP 1: Preload avatar photo FIRST
    const img = new Image();
    img.src = '/avatar/DSCF5853.png';
    img.onload = () => {
      console.log('✅ STEP 1: Avatar photo loaded');
      
      // STEP 2: Preload music
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
          if (musicLoaded === musicFiles.length) {
            console.log(`✅ STEP 2: ${musicLoaded}/${musicFiles.length} music tracks cached`);
            
            // STEP 3: Preload memory photos
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
                  console.log(`✅ STEP 3: ${memoriesLoaded}/${memoryFiles.length} memory photos cached`);
                  console.log('🎉 All assets preloaded!');
                  if (onComplete) onComplete();
                }
              };
              memoryImg.onerror = () => {
                memoriesLoaded++;
                if (memoriesLoaded === memoryFiles.length) {
                  console.log(`⚠️ Some images failed, continuing...`);
                  console.log('🎉 All assets preloaded!');
                  if (onComplete) onComplete();
                }
              };
            });
          }
        };
        audio.onerror = () => {
          musicLoaded++;
          console.warn(`   ⚠️ Music failed: ${src.split('/').pop()}`);
          if (musicLoaded === musicFiles.length) {
            console.log('⚠️ Some music files failed, continuing...');
            // Continue to next step even if some music fails
          }
        };
        audio.load();
      });
    };
    img.onerror = () => {
      console.warn('⚠️ STEP 1: Avatar photo failed to load');
      // Continue anyway after a delay
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
    };
  }, [onComplete]);

  return null;
}

export default PreloadAssets;
