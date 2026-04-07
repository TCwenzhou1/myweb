import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailContent from '@/components/ProjectDetailContent'
import { getProjectBySlug, projectCases } from '@/lib/siteContent'

export function generateStaticParams() {
  return projectCases.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug)

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

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailContent project={project} />
}
