'use client';

import { useCallback, useEffect, useState } from 'react';

export function useSpeech() {
  const [voicesReady, setVoicesReady] = useState(false);

  // 监听 voiceschanged 事件，解决 Chrome 异步加载 voice list 的竞态问题
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesReady(true);
      }
    };

    // 立即尝试加载（Safari 同步返回）
    loadVoices();

    // Chrome 异步加载事件
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;

    // voicesReady 确保 voice list 已加载
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('ja'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak, voicesReady };
}
