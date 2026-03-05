"use client";

import { useEffect } from 'react';

export function PreloadAssets() {
  useEffect(() => {
    console.log('🎵 Preloading music...');

    const musicFiles = [
      '/music/love.mp3',
      '/music/piano.mp3'
    ];

    const musicPromises = musicFiles.map(src => {
      return new Promise((resolve) => {
        const audio = new Audio();
        audio.src = src;
        audio.preload = 'auto';
        audio.oncanplaythrough = () => {
          console.log(`   ✅ Music: ${src.split('/').pop()}`);
          resolve(true);
        };
        audio.onerror = () => {
          console.warn(`   ⚠️ Music failed: ${src.split('/').pop()}`);
          resolve(false);
        };
        audio.load();
      });
    });

    Promise.all(musicPromises).then((results) => {
      const success = results.filter(r => r).length;
      console.log(`✅ ${success}/${musicFiles.length} music tracks cached`);
      console.log('🎉 All assets preloaded!\n');
    });
  }, []);

  return null;
}

export default PreloadAssets;
