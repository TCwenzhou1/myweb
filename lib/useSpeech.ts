'use client';

import { useCallback } from 'react';

export function useSpeech() {
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('ja'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
}
