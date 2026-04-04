import type { Metadata } from 'next'
import ProjectsContentV2 from '@/components/ProjectsContentV2'

export const metadata: Metadata = {
  title: 'AI Projects and Case Studies',
  description: 'TCwenzhou project cases focused on AI systems, automation workflows, and product experiments.',
}

export default function ProjectsPage() {
  return <ProjectsContentV2 />
}
