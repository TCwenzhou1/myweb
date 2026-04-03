import type { Metadata } from 'next'
import GamesContent from '@/components/GamesContent'

export const metadata: Metadata = {
  title: '游戏',
  description: 'TCwenzhou 的游戏方向、原型计划和开发路线。',
}

export default function GamesPage() {
  return <GamesContent />
}
