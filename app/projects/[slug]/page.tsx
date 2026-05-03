import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArchiveCard, CinematicSection, PageHeader } from '@/components/CinematicUI'
import { C, FONTS, alpha } from '@/components/cinematicTokens'
import { getProjectBySlug, projectCases, projectStatusLabelMap } from '@/lib/siteContent'

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

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 68% 50% at 50% 0%, rgba(255,252,244,0.88) 0%, transparent 50%),
            radial-gradient(ellipse 42% 30% at 88% 16%, rgba(212,188,138,0.10) 0%, transparent 45%),
            radial-gradient(ellipse 40% 28% at 10% 88%, rgba(248,245,238,0.72) 0%, transparent 55%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(24px, 5vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        <PageHeader
          title={project.title}
          subtitle={`${projectStatusLabelMap[project.status]} · ${project.period} · ${project.role}`}
          description={project.description}
          scene={{ chapter: '02', title: 'Case File', subtitle: project.year }}
        />

        <CinematicSection delay={90}>
          <ArchiveCard hoverable={false}>
            <div
              className="project-detail-summary"
              style={{
                display: 'grid',
                gap: '20px',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              }}
            >
              <SummaryPanel label="Background" text={project.background} />
              <SummaryPanel label="Problem" text={project.problem} />
              <SummaryPanel label="Approach" text={project.solution} />
            </div>

            <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    color: C.inkDim,
                    padding: '5px 12px',
                    borderRadius: '999px',
                    background: alpha(C.bgDeep, 0.56),
                    border: '0.5px solid rgba(200,190,168,0.4)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" style={primaryLinkStyle}>
                  GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" style={secondaryLinkStyle}>
                  Live site
                </a>
              )}
              <Link href="/projects" style={secondaryLinkStyle}>
                Back to Projects
              </Link>
            </div>
          </ArchiveCard>
        </CinematicSection>

        <div
          className="project-detail-grid"
          style={{
            marginTop: '24px',
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          }}
        >
          <CinematicSection delay={180}>
            <ArchiveCard hoverable={false}>
              <SectionTitle title="Architecture and approach" />
              <SectionList items={project.architecture} />

              <div
                style={{
                  marginTop: '20px',
                  borderTop: `0.5px solid ${alpha(C.goldPale, 0.5)}`,
                  paddingTop: '20px',
                }}
              >
                <SectionTitle title="Key challenges" />
                <SectionList items={project.challenges} />
              </div>
            </ArchiveCard>
          </CinematicSection>

          <CinematicSection delay={260}>
            <ArchiveCard hoverable={false}>
              <SectionTitle title="Results and evidence" />
              <SectionList items={project.outcomes} />

              <div
                style={{
                  marginTop: '20px',
                  borderTop: `0.5px solid ${alpha(C.goldPale, 0.5)}`,
                  paddingTop: '20px',
                }}
              >
                <SectionTitle title="Personal contribution" />
                <SectionList items={project.contributions} />
              </div>
            </ArchiveCard>
          </CinematicSection>
        </div>

        <CinematicSection delay={340}>
          <ArchiveCard hoverable={false} style={{ marginTop: '24px' }}>
            <SectionTitle title="Next step" />
            <p
              style={{
                marginTop: '14px',
                fontFamily: FONTS.body,
                fontSize: '16px',
                lineHeight: 1.9,
                color: C.inkDim,
              }}
            >
              {project.nextStep}
            </p>
          </ArchiveCard>
        </CinematicSection>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .project-detail-grid,
          .project-detail-summary {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

function SummaryPanel({ label, text }: { label: string; text: string }) {
  return (
    <div
      style={{
        borderRadius: '14px',
        border: `0.5px solid ${alpha(C.goldPale, 0.7)}`,
        background: alpha(C.bgDeep, 0.24),
        padding: '18px',
      }}
    >
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: C.gold,
        }}
      >
        {label}
      </p>
      <p
        style={{
          marginTop: '10px',
          fontFamily: FONTS.body,
          fontSize: '14px',
          lineHeight: 1.8,
          color: C.inkDim,
        }}
      >
        {text}
      </p>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2
      style={{
        fontFamily: FONTS.display,
        fontSize: '30px',
        fontWeight: 400,
        color: C.ink,
      }}
    >
      {title}
    </h2>
  )
}

function SectionList({ items }: { items: string[] }) {
  return (
    <div style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
      {items.map((item) => (
        <p
          key={item}
          style={{
            fontFamily: FONTS.body,
            fontSize: '15px',
            lineHeight: 1.85,
            color: C.inkDim,
          }}
        >
          {item}
        </p>
      ))}
    </div>
  )
}

const primaryLinkStyle = {
  fontFamily: FONTS.body,
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: C.gold,
  textDecoration: 'none',
}

const secondaryLinkStyle = {
  ...primaryLinkStyle,
  color: C.inkDim,
}
