import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '实验室',
  description: '日语学习实验室，包含全词汇词典、收藏本、今日复习、自测、语法与句型学习。',
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
