'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

interface SpeakOptions {
  text: string
  rate?: number
  pitch?: number
}

function pickJapaneseVoice(voices: SpeechSynthesisVoice[]) {
  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith('ja') && voice.localService) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith('ja')) ??
    null
  )
}

export function useSpeech() {
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [voicesReady, setVoicesReady] = useState(false)
  const [voiceLabel, setVoiceLabel] = useState('')

  useEffect(() => {
    if (!isSupported) return

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        setVoicesReady(true)
        const preferredVoice = pickJapaneseVoice(voices)
        setVoiceLabel(preferredVoice?.name ?? '浏览器默认日语语音')
      }
    }

    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
    }
  }, [isSupported])

  const speak = useCallback(({ text, rate = 0.92, pitch = 1 }: SpeakOptions) => {
    if (!isSupported || !text.trim()) return false

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = rate
    utterance.pitch = pitch

    const voices = window.speechSynthesis.getVoices()
    const jaVoice = pickJapaneseVoice(voices)
    if (jaVoice) {
      utterance.voice = jaVoice
    }

    window.speechSynthesis.speak(utterance)
    return true
  }, [isSupported])

  const voiceStatusLabel = useMemo(() => {
    if (!isSupported) return '当前浏览器不支持发音'
    if (!voicesReady) return '浏览器语音正在准备中'
    return voiceLabel || '浏览器默认日语语音'
  }, [isSupported, voiceLabel, voicesReady])

  return { speak, voicesReady, isSupported, voiceStatusLabel }
}
