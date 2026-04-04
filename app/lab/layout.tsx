import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '日语学习实验室 | TCwenzhou',
  description: '支持全词库检索、收藏、复习、自测与浏览器发音的日语学习实验室。',
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
