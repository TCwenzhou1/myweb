'use client'

import Link from 'next/link'
import { ArchiveCard, CinematicSection, PageHeader, C, FONTS, alpha } from '@/components/CinematicUI'
import { aboutCapabilities, currentFocusAreas } from '@/lib/siteContent'

export default function AboutContentV2() {
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
            radial-gradient(ellipse 52% 60% at 50% 35%, rgba(212,188,138,0.08) 0%, transparent 56%),
            radial-gradient(ellipse 60% 50% at 20% 82%, rgba(248,245,238,0.6) 0%, transparent 52%)
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
          title="About"
          subtitle="Working Profile"
          description="This page keeps the public-workbench tone, but it should also answer clear questions: what I build, what problems I handle well, what I am focused on now, and why collaboration makes sense."
          scene={{ chapter: '05', title: 'About', subtitle: 'Working Notes' }}
        />

        <div style={{ display: 'grid', gap: '20px' }}>
          <CinematicSection delay={90}>
            <ArchiveCard hoverable={false}>
              <p style={eyebrowStyle}>Summary</p>
              <h2 style={heroTitleStyle}>
                I mainly work on AI systems, learning-product experiments, and game prototypes. I also enjoy turning messy flows into stable, reusable structures.
              </h2>
              <p style={bodyStyle}>
                I am still a computer engineering student, but I approach projects through real goals, real constraints, and long-term iteration. I care more about whether something can keep growing than whether it looks impressive on the first pass.
              </p>
            </ArchiveCard>
          </CinematicSection>

          <div className="about-cap-grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            {aboutCapabilities.map((item, index) => (
              <CinematicSection key={item.title} delay={170 + index * 80}>
                <ArchiveCard hoverable={false}>
                  <p style={eyebrowStyle}>Capability</p>
                  <h3 style={cardTitleStyle}>{item.title}</h3>
                  <p style={bodyStyle}>{item.description}</p>
                </ArchiveCard>
              </CinematicSection>
            ))}
          </div>

          <div className="about-detail-grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(300px, 0.9fr)' }}>
            <CinematicSection delay={320}>
              <ArchiveCard hoverable={false}>
                <p style={eyebrowStyle}>Current Focus</p>
                <h3 style={cardTitleStyle}>What I am pushing right now</h3>
                <div style={{ marginTop: '18px', display: 'grid', gap: '16px' }}>
                  {currentFocusAreas.map((item) => (
                    <div key={item.title} style={panelStyle}>
                      <p style={eyebrowStyle}>{item.eyebrow}</p>
                      <p style={{ ...cardTitleStyle, marginTop: '10px', fontSize: '24px' }}>{item.title}</p>
                      <p style={{ ...smallBodyStyle, marginTop: '10px' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </ArchiveCard>
            </CinematicSection>

            <div style={{ display: 'grid', gap: '20px' }}>
              <CinematicSection delay={380}>
                <ArchiveCard hoverable={false}>
                  <p style={eyebrowStyle}>Working Style</p>
                  <h3 style={cardTitleStyle}>How I move work forward</h3>
                  <div style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
                    {[
                      'Define the real problem before deciding on the tool.',
                      'Build a structure that can iterate before adding complexity.',
                      'Keep style when it helps, but never at the cost of clarity.',
                    ].map((item) => (
                      <p key={item} style={bodyStyle}>
                        {item}
                      </p>
                    ))}
                  </div>
                </ArchiveCard>
              </CinematicSection>

              <CinematicSection delay={440}>
                <ArchiveCard hoverable={false}>
                  <p style={eyebrowStyle}>Collaboration</p>
                  <h3 style={cardTitleStyle}>What is worth contacting me about</h3>
                  <p style={bodyStyle}>
                    AI applications, learning products, prototype validation, workflow design, and projects that need a clearer structure are all a good fit.
                  </p>
                  <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
                    <Link href="/contact" style={primaryLinkStyle}>
                      Contact
                    </Link>
                    <Link href="/projects" style={secondaryLinkStyle}>
                      See cases
                    </Link>
                  </div>
                </ArchiveCard>
              </CinematicSection>
            </div>
          </div>
        </div>

        <CinematicSection delay={520}>
          <div className="about-footer" style={footerStyle}>
            <span style={footerMetaStyle}>05 - 06</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
              <Link href="/projects" style={footerLinkStyle}>
                Projects
              </Link>
              <Link href="/lab" style={footerLinkStyle}>
                Lab
              </Link>
              <Link href="/contact" style={footerLinkStyle}>
                Contact
              </Link>
            </div>
            <span style={footerSceneStyle}>About · Working Profile</span>
          </div>
        </CinematicSection>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 767px) {
          .about-cap-grid {
            grid-template-columns: 1fr !important;
          }
          .about-footer {
            flex-direction: column !important;
            justify-content: center !important;
            text-align: center;
          }
        }

        @media (max-width: 1199px) and (min-width: 768px) {
          .about-cap-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </div>
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
  fontSize: '28px',
  fontWeight: 400,
  color: C.ink,
}

const bodyStyle = {
  marginTop: '12px',
  fontFamily: FONTS.body,
  fontSize: '15px',
  lineHeight: 1.85,
  color: C.inkDim,
}

const smallBodyStyle = {
  fontFamily: FONTS.body,
  fontSize: '14px',
  lineHeight: 1.8,
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
