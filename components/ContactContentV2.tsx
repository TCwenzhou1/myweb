'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { Github, Mail } from 'lucide-react'
import { ArchiveCard, CinematicSection, PageHeader, C, FONTS, alpha } from '@/components/CinematicUI'
import { contactTopics } from '@/lib/siteContent'

export default function ContactContentV2() {
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
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,188,138,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 80% 90%, rgba(248,245,238,0.7) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '980px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(24px, 5vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        <PageHeader
          title="Contact"
          subtitle="Let's Build"
          description="This page should tell people what is worth reaching out about, not just where to send a message."
          scene={{ chapter: '06', title: 'Contact', subtitle: 'End Credits' }}
        />

        <div style={{ display: 'grid', gap: '20px' }}>
          <CinematicSection delay={90}>
            <ArchiveCard hoverable={false}>
              <p style={eyebrowStyle}>Collaboration Note</p>
              <h2 style={heroTitleStyle}>
                If you are looking for someone who can turn a loose idea into a clearer system, page, or product direction, this is the most direct place to start.
              </h2>
              <p style={bodyStyle}>
                The fastest message is usually simple: what you are building, what stage it is in, and what one problem you most want help with.
              </p>
            </ArchiveCard>
          </CinematicSection>

          <div className="contact-topic-grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            {contactTopics.map((item, index) => (
              <CinematicSection key={item.title} delay={170 + index * 80}>
                <ArchiveCard hoverable={false}>
                  <p style={eyebrowStyle}>Topic</p>
                  <h3 style={cardTitleStyle}>{item.title}</h3>
                  <p style={bodyStyle}>{item.description}</p>
                  <p style={noteStyle}>{item.note}</p>
                </ArchiveCard>
              </CinematicSection>
            ))}
          </div>

          <div className="contact-detail-grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
            <CinematicSection delay={360}>
              <ArchiveCard hoverable={false}>
                <p style={eyebrowStyle}>Direct Contact</p>
                <h3 style={cardTitleStyle}>Reach me directly</h3>
                <div style={{ marginTop: '18px', display: 'grid', gap: '14px' }}>
                  <ContactMethod icon={<Mail size={18} />} label="Email" value="3240468691@qq.com" href="mailto:3240468691@qq.com" />
                  <ContactMethod icon={<Github size={18} />} label="GitHub" value="github.com/TCwenzhou1" href="https://github.com/TCwenzhou1" />
                </div>
              </ArchiveCard>
            </CinematicSection>

            <CinematicSection delay={430}>
              <ArchiveCard hoverable={false}>
                <p style={eyebrowStyle}>Best Message Format</p>
                <h3 style={cardTitleStyle}>What helps me reply faster</h3>
                <div style={{ marginTop: '18px', display: 'grid', gap: '12px' }}>
                  {[
                    'What you are building, or what you want to build.',
                    'The one core problem you most want to solve.',
                    'What stage the work is in and what part you want help with.',
                  ].map((item) => (
                    <div key={item} style={panelStyle}>
                      <p style={smallBodyStyle}>{item}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
                  <Link href="/projects" style={primaryLinkStyle}>
                    See cases first
                  </Link>
                  <Link href="/lab" style={secondaryLinkStyle}>
                    View Lab
                  </Link>
                </div>
              </ArchiveCard>
            </CinematicSection>
          </div>
        </div>

        <CinematicSection delay={520}>
          <div className="contact-footer" style={footerStyle}>
            <span style={footerMetaStyle}>06 · End Credits</span>
            <Link href="/" style={footerLinkStyle}>
              Back home
            </Link>
            <span style={footerSceneStyle}>tcwenzhou.site</span>
          </div>
        </CinematicSection>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .contact-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 767px) {
          .contact-topic-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-footer {
            flex-direction: column !important;
            justify-content: center !important;
            text-align: center;
          }
        }

        @media (max-width: 1199px) and (min-width: 768px) {
          .contact-topic-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  )
}

function ContactMethod({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode
  label: string
  value: string
  href: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        padding: '18px',
        borderRadius: '14px',
        border: `0.5px solid ${alpha(C.goldPale, 0.7)}`,
        background: alpha(C.bgDeep, 0.24),
        textDecoration: 'none',
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: C.gold,
          background: alpha(C.cardIvory, 0.72),
          border: `0.5px solid ${alpha(C.goldPale, 0.8)}`,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={eyebrowStyle}>{label}</p>
        <p style={{ ...smallBodyStyle, marginTop: '6px', color: C.ink }}>{value}</p>
      </div>
    </a>
  )
}

const panelStyle = {
  borderRadius: '14px',
  border: `0.5px solid ${alpha(C.goldPale, 0.7)}`,
  background: alpha(C.bgDeep, 0.24),
  padding: '16px',
}

const eyebrowStyle = {
  fontFamily: FONTS.body,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: C.gold,
}

const heroTitleStyle = {
  marginTop: '14px',
  fontFamily: FONTS.display,
  fontSize: 'clamp(30px, 4vw, 42px)',
  fontWeight: 400,
  color: C.ink,
  lineHeight: 1.06,
}

const cardTitleStyle = {
  marginTop: '14px',
  fontFamily: FONTS.display,
  fontSize: '30px',
  fontWeight: 400,
  color: C.ink,
}

const bodyStyle = {
  marginTop: '14px',
  fontFamily: FONTS.body,
  fontSize: '15px',
  lineHeight: 1.85,
  color: C.inkDim,
}

const noteStyle = {
  marginTop: '14px',
  fontFamily: FONTS.body,
  fontSize: '14px',
  lineHeight: 1.8,
  color: C.inkFaint,
}

const smallBodyStyle = {
  fontFamily: FONTS.body,
  fontSize: '15px',
  lineHeight: 1.85,
  color: C.inkDim,
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

const footerStyle = {
  marginTop: 'clamp(60px, 8vh, 80px)',
  paddingTop: '24px',
  borderTop: '0.5px solid rgba(200,190,168,0.4)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap' as const,
  gap: '16px',
}

const footerMetaStyle = {
  fontFamily: FONTS.body,
  fontSize: '13px',
  fontWeight: 300,
  letterSpacing: '0.15em',
  color: C.inkFaint,
  opacity: 0.6,
}

const footerSceneStyle = {
  fontFamily: FONTS.body,
  fontSize: '12px',
  fontWeight: 300,
  letterSpacing: '0.12em',
  color: C.gold,
  opacity: 0.5,
}

const footerLinkStyle = {
  fontFamily: FONTS.body,
  fontSize: '13px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: C.inkDim,
  textDecoration: 'none',
  opacity: 0.75,
}
