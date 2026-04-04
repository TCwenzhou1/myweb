import type { Metadata } from 'next'
import GamesContentV2 from '@/components/GamesContentV2'

export const metadata: Metadata = {
  title: 'Game Prototypes and Dev Logs',
  description: 'TCwenzhou game direction page with prototype notes, AI opponent experiments, and development evidence.',
}

export default function GamesPage() {
  return <GamesContentV2 />
}
