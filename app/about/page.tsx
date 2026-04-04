import type { Metadata } from 'next'
import AboutContentV2 from '@/components/AboutContentV2'

export const metadata: Metadata = {
  title: 'About TCwenzhou',
  description: 'What TCwenzhou builds, what problems he likes to solve, and what he is focused on right now.',
}

export default function AboutPage() {
  return <AboutContentV2 />
}
