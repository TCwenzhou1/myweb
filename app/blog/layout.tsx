import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '技术博客 | TCwenzhou',
  description: '分享技术学习、项目经验和工程实践的心得',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
