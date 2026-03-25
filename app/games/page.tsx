import type { Metadata } from 'next'
import GamesContent from '@/components/GamesContent'

export const metadata: Metadata = {
  title: 'Games | TCwenzhou',
  description: '节奏变化 · 可玩性章节',
}

export default function GamesPage() {
  return <GamesContent />
}
