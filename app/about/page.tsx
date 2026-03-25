import type { Metadata } from 'next'
import AboutContent from '@/components/AboutContent'

export const metadata: Metadata = {
  title: 'About | TCwenzhou',
  description: '作者特写 · 角色揭示',
}

export default function AboutPage() {
  return <AboutContent />
}
