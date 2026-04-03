import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '实验室',
  description: '日语学习实验室，包含词汇浏览、语法学习、复习系统和词汇测试。',
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
