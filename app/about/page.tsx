import type { Metadata } from 'next'
import AboutContent from '@/components/AboutContent'

export const metadata: Metadata = {
  title: '关于',
  description: 'TCwenzhou 的方向、做事方式和当前关注点。',
}

export default function AboutPage() {
  return <AboutContent />
}
