import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailContent from '@/components/ProjectDetailContent'
import { getProjectBySlug, projectCases } from '@/lib/siteContent'

export function generateStaticParams() {
  return projectCases.map((project) => ({ slug: project.slug }))
}

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} Case Study`,
    description: `${project.headline} Role: ${project.role}.`,
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailContent project={project} />
}
