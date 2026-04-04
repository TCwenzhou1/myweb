'use client'

import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { ArchiveCard, CinematicSection, PageHeader, C, FONTS, alpha } from '@/components/CinematicUI'
import { projectCases, projectStatusLabelMap, type ProjectCase } from '@/lib/siteContent'

export default function ProjectsContentV2() {
  const [featured, ...rest] = projectCases

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
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,252,244,0.88) 0%, transparent 50%),
            radial-gradient(ellipse 45% 35% at 88% 14%, rgba(212,188,138,0.10) 0%, transparent 45%),
            radial-gradient(ellipse 40% 30% at 12% 85%, rgba(248,245,238,0.7) 0%, transparent 55%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(24px, 5vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        <PageHeader
          title="Projects"
          subtitle="Case Archive"
          description="This page is not a simple project list. It is a case archive focused on problem definition, system design, engineering tradeoffs, and outcome evidence."
          scene={{ chapter: '02', title: 'Projects', subtitle: 'Collected Works' }}
        />

        <CinematicSection delay={80}>
          <ArchiveCard hoverable={false} style={{ marginBottom: '24px' }}>
            <div className="projects-note-grid" style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
              {[
                { label: 'Read this page', text: 'Start with the core problem and the outcome summary before opening a full case.' },
                { label: 'What matters', text: 'I care more about structure, iteration, and proof than keyword-heavy presentation.' },
                { label: 'Why it exists', text: 'Projects is the proof layer of the site. It shows how ideas become systems.' },
              ].map((item) => (
                <InfoPanel key={item.label} label={item.label} text={item.text} />
              ))}
            </div>
          </ArchiveCard>
        </CinematicSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <CinematicSection delay={120}>
            <CaseCard project={featured} featured />
          </CinematicSection>

          <div className="projects-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px' }}>
            {rest.map((project, index) => (
              <CinematicSection key={project.slug} delay={220 + index * 90}>
                <CaseCard project={project} />
              </CinematicSection>
            ))}
          </div>
        </div>

        <CinematicSection delay={420}>
          <div className="projects-method-grid" style={{ marginTop: '24px', display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            {[
              { title: 'Define the problem first', text: 'I want the real constraint and the real target to be clear before choosing tools.' },
              { title: 'Build an iterable structure', text: 'A project should be able to grow, be tested again, and accept new complexity.' },
              { title: 'End with evidence', text: 'If it has no result, prototype, workflow, or operating structure, I will not dress it up as a finished case.' },
            ].map((item) => (
              <ArchiveCard key={item.title} hoverable={false}>
                <p style={eyebrowStyle}>Method</p>
                <h3 style={cardTitleStyle}>{item.title}</h3>
                <p style={cardBodyStyle}>{item.text}</p>
              </ArchiveCard>
            ))}
          </div>
        </CinematicSection>

        <CinematicSection delay={520}>
          <div className="projects-footer" style={footerStyle}>
            <span style={footerMetaStyle}>02 - 03</span>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
              <Link href="/lab" style={footerLinkStyle}>
                Lab
              </Link>
              <Link href="/games" style={footerLinkStyle}>
                Games
              </Link>
              <Link href="/contact" style={footerLinkStyle}>
                Contact
              </Link>
            </div>

            <span style={footerSceneStyle}>Scene 02 · Archive</span>
          </div>
        </CinematicSection>
      </div>

      <style>{`
        @media (max-width: 1199px) {
          .projects-note-grid,
          .projects-method-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 767px) {
          .projects-card-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-footer {
            flex-direction: column !important;
            justify-content: center !important;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}

function CaseCard({ project, featured = false }: { project: ProjectCase; featured?: boolean }) {
  return (
    <ArchiveCard hoverable={false} style={{ borderRadius: featured ? '16px' : '12px', padding: featured ? 'clamp(28px, 4vw, 44px)' : 'clamp(22px, 3vw, 30px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: featured ? '760px' : '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <span style={eyebrowStyle}>{projectStatusLabelMap[project.status]}</span>
            <span style={metaStyle}>{project.period}</span>
          </div>

          <h2 style={{ ...cardTitleStyle, marginTop: '16px', fontSize: featured ? 'clamp(28px, 4vw, 40px)' : 'clamp(24px, 3vw, 30px)' }}>
            {project.title}
          </h2>
          <p style={{ ...cardBodyStyle, marginTop: '16px', fontSize: featured ? '17px' : '15px' }}>{project.headline}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {project.github && <ActionIcon href={project.github} label={`${project.title} GitHub`} icon={<Github size={16} />} />}
          {project.demo && <ActionIcon href={project.demo} label={`${project.title} Demo`} icon={<ExternalLink size={16} />} />}
        </div>
      </div>

      <div style={{ marginTop: '22px', display: 'grid', gap: '14px', gridTemplateColumns: featured ? 'repeat(3, minmax(0, 1fr))' : '1fr' }}>
        <InfoPanel label="Role" text={project.role} />
        <InfoPanel label="Problem" text={project.problem} />
        <InfoPanel label="Outcome" text={project.outcomes[0]} />
      </div>

      <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {project.tags.map((tag) => (
          <span key={tag} style={tagStyle}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
        <Link href={`/projects/${project.slug}`} style={primaryLinkStyle}>
          Read case study
        </Link>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={secondaryLinkStyle}>
            Open GitHub
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" style={secondaryLinkStyle}>
            Live site
          </a>
        )}
      </div>
    </ArchiveCard>
  )
}

function InfoPanel({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ borderRadius: '14px', border: `0.5px solid ${alpha(C.goldPale, 0.75)}`, background: alpha(C.bgDeep, 0.24), padding: '16px' }}>
      <p style={eyebrowStyle}>{label}</p>
      <p style={{ ...cardBodyStyle, marginTop: '10px', fontSize: '14px' }}>{text}</p>
    </div>
  )
}

function ActionIcon({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '8px',
        border: `0.5px solid ${C.goldPale}`,
        color: C.inkDim,
        textDecoration: 'none',
      }}
    >
      {icon}
    </a>
  )
}

const eyebrowStyle: CSSProperties = {
  fontFamily: FONTS.body,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: C.gold,
}

const metaStyle: CSSProperties = {
  fontFamily: FONTS.body,
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: C.inkFaint,
}

const cardTitleStyle: CSSProperties = {
  fontFamily: FONTS.display,
  fontSize: '28px',
  fontWeight: 400,
  lineHeight: 1.06,
  color: C.ink,
}

const cardBodyStyle: CSSProperties = {
  fontFamily: FONTS.body,
  fontSize: '15px',
  lineHeight: 1.85,
  color: C.inkDim,
}

const tagStyle: CSSProperties = {
  fontFamily: FONTS.body,
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.08em',
  color: C.inkDim,
  padding: '5px 12px',
  borderRadius: '999px',
  background: alpha(C.bgDeep, 0.56),
  border: '0.5px solid rgba(200,190,168,0.4)',
}

const primaryLinkStyle: CSSProperties = {
  fontFamily: FONTS.body,
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: C.gold,
  textDecoration: 'none',
}

const secondaryLinkStyle: CSSProperties = {
  ...primaryLinkStyle,
  color: C.inkDim,
}

const footerStyle: CSSProperties = {
  marginTop: 'clamp(60px, 8vh, 80px)',
  paddingTop: '24px',
  borderTop: '0.5px solid rgba(200,190,168,0.4)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
}

const footerMetaStyle: CSSProperties = {
  fontFamily: FONTS.body,
  fontSize: '13px',
  fontWeight: 300,
  letterSpacing: '0.15em',
  color: C.inkFaint,
  opacity: 0.6,
}

const footerSceneStyle: CSSProperties = {
  fontFamily: FONTS.body,
  fontSize: '12px',
  fontWeight: 300,
  letterSpacing: '0.12em',
  color: C.gold,
  opacity: 0.5,
}

const footerLinkStyle: CSSProperties = {
  fontFamily: FONTS.body,
  fontSize: '13px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: C.inkDim,
  textDecoration: 'none',
  opacity: 0.75,
}
