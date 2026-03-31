'use client';

import { useEffect, useMemo, useState } from 'react';

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;

    const loadVoices = () => {
      setVoices(synth.getVoices());
    };

    loadVoices();
    synth.addEventListener?.('voiceschanged', loadVoices);

    return () => {
      synth.removeEventListener?.('voiceschanged', loadVoices);
    };
  }, []);

  const japaneseVoice = useMemo(() => {
    return voices.find((voice) => voice.lang.toLowerCase().startsWith('ja')) ?? null;
  }, [voices]);

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return false;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    if (japaneseVoice) utterance.voice = japaneseVoice;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  };

  return {
    supported: typeof window !== 'undefined' ? 'speechSynthesis' in window : true,
    hasJapaneseVoice: !!japaneseVoice,
    speak
  };
}
