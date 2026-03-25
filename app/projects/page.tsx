import type { Metadata } from 'next'
import ProjectsContent from '@/components/ProjectsContent'

export const metadata: Metadata = {
  title: 'Projects | TCwenzhou',
  description: '主线展开 · 核心作品档案',
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
