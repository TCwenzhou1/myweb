import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '项目详情 | TCwenzhou',
  description: '查看完整的项目信息、技术栈和实现细节',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
