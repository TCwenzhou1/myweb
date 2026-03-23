import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | TCwenzhou',
  description: '正在做和已经做过的项目：三国杀 AI 系统、AI 自动化邮件回复、个人实验站。',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
