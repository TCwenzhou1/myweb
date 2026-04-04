import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Projects and Case Studies',
  description: 'A case archive for AI systems, automation workflows, and personal product experiments.',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
