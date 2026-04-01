import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lab · 实验室 — TCwenzhou',
  description: '日语学习实验室。词汇浏览、语法学习、复习系统、词汇测试。',
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
