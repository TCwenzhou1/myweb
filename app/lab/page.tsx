import type { Metadata } from 'next'
import LabContent from '@/components/LabContent'

export const metadata: Metadata = {
  title: 'Lab | TCwenzhou',
  description: '幕后制作 · 工作台',
}

export default function LabPage() {
  return <LabContent />
}
