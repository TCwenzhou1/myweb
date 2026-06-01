import type { Metadata } from 'next'
import ReverseSanguoshaPlayClient from './ReverseSanguoshaPlayClient'

export const metadata: Metadata = {
  title: 'Play Reverse Sanguosha',
  description: 'Playable Reverse Sanguosha runtime embedded inside the TCwenzhou project site.',
}

export default function ReverseSanguoshaPlayPage() {
  return <ReverseSanguoshaPlayClient />
}
