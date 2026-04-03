import type { Metadata } from 'next'
import ProjectsContent from '@/components/ProjectsContent'

export const metadata: Metadata = {
  title: '项目',
  description: 'TCwenzhou 正在做和已经做过的核心项目档案。',
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
