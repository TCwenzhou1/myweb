'use client'

import Link from 'next/link'
import { ArchiveCard, CinematicSection, PageHeader, C, FONTS, alpha } from '@/components/CinematicUI'
import { gameProofs } from '@/lib/siteContent'

export default function GamesContentV2() {
  const [mainProof] = gameProofs

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
            radial-gradient(ellipse 55% 44% at 50% 14%, rgba(212,188,138,0.09) 0%, transparent 56%),
            radial-gradient(ellipse 60% 50% at 80% 84%, rgba(248,245,238,0.7) 0%, transparent 52%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1120px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(24px, 5vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        <PageHeader
          title="Games"
          subtitle="Prototype Record"
          description="This page should feel like a real prototype archive. Even without a full game build, it should still show what is already being tested, what evidence exists, and what comes next."
          scene={{ chapter: '04', title: 'Games', subtitle: 'Prototype Record' }}
        />

        <CinematicSection delay={80}>
          <ArchiveCard hoverable={false} style={{ borderRadius: '16px', padding: 'clamp(28px, 4vw, 42px)' }}>
            <div className="games-hero-grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(280px, 0.85fr)' }}>
              <div>
                <p style={eyebrowStyle}>Current Prototype</p>
                <h2 style={heroTitleStyle}>{mainProof.title}</h2>
                <p style={bodyStyle}>{mainProof.description}</p>

                <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {[mainProof.stage, mainProof.engine, 'Devlog Incoming'].map((tag) => (
                    <span key={tag} style={tagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>

                <InfoPanel label="Current note" text={mainProof.snapshot} />
              </div>

              <div style={{ display: 'grid', gap: '14px' }}>
                <ListPanel label="Already validated" items={mainProof.evidence} />
                <ListPanel label="Next milestone" items={[mainProof.nextMilestone]} />
                <ListPanel label="Next proof to publish" items={['First combat recording', 'UI pacing screenshots', 'Public devlog notes']} />
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
              <Link href="/contact" style={primaryLinkStyle}>
                Talk about this direction
              </Link>
              <a href="https://github.com/TCwenzhou1" target="_blank" rel="noopener noreferrer" style={secondaryLinkStyle}>
                Check GitHub
              </a>
            </div>
          </ArchiveCard>
        </CinematicSection>

        <div className="games-proof-grid" style={{ marginTop: '24px', display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          {gameProofs.map((proof, index) => (
            <CinematicSection key={proof.title} delay={180 + index * 80}>
              <ArchiveCard hoverable={false}>
                <p style={eyebrowStyle}>{proof.stage}</p>
                <h3 style={cardTitleStyle}>{proof.title}</h3>
                <p style={bodyStyle}>{proof.snapshot}</p>
                <div style={{ marginTop: '18px', borderTop: `0.5px solid ${alpha(C.goldPale, 0.5)}`, paddingTop: '16px', display: 'grid', gap: '10px' }}>
                  {proof.evidence.map((item) => (
                    <p key={item} style={smallBodyStyle}>
                      {item}
                    </p>
                  ))}
                </div>
                <p style={{ ...eyebrowStyle, marginTop: '18px' }}>Next: {proof.nextMilestone}</p>
              </ArchiveCard>
            </CinematicSection>
          ))}
        </div>

        <CinematicSection delay={380}>
          <div className="games-log-grid" style={{ marginTop: '24px', display: 'grid', gap: '20px', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
            <ArchiveCard hoverable={false}>
              <p style={eyebrowStyle}>Development Log</p>
              <h3 style={cardTitleStyle}>What is moving right now</h3>
              <div style={{ marginTop: '18px', display: 'grid', gap: '14px' }}>
                {[
                  'Verify the smallest playable loop before adding production-heavy content.',
                  'Connect AI decision experiments to an actual prototype instead of isolating them.',
                  'Publish more visible proof so this page reads like a real project log.',
                ].map((item) => (
                  <p key={item} style={bodyStyle}>
                    {item}
                  </p>
                ))}
              </div>
            </ArchiveCard>

            <ArchiveCard hoverable={false}>
              <p style={eyebrowStyle}>Why this page matters</p>
              <h3 style={cardTitleStyle}>From direction note to proof of work</h3>
              <p style={bodyStyle}>
                This page does not need to pretend there is a finished game already. It needs to show what has been built, what has been tested, and what proof is coming next.
              </p>
              <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
                <Link href="/projects" style={primaryLinkStyle}>
                  See related cases
                </Link>
                <Link href="/contact" style={secondaryLinkStyle}>
                  Talk prototypes
                </Link>
              </div>
            </ArchiveCard>
          </div>
        </CinematicSection>

        <CinematicSection delay={480}>
          <div className="games-footer" style={footerStyle}>
            <span style={footerMetaStyle}>04 - 05</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
              <Link href="/projects" style={footerLinkStyle}>
                Projects
              </Link>
              <Link href="/lab" style={footerLinkStyle}>
                Lab
              </Link>
              <Link href="/about" style={footerLinkStyle}>
                About
              </Link>
            </div>
            <span style={footerSceneStyle}>Games · Prototype Record</span>
          </div>
        </CinematicSection>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .games-hero-grid,
          .games-log-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 767px) {
          .games-proof-grid {
            grid-template-columns: 1fr !important;
          }
          .games-footer {
            flex-direction: column !important;
            justify-content: center !important;
            text-align: center;
          }
        }

        @media (max-width: 1199px) and (min-width: 768px) {
          .games-proof-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  )
}

function InfoPanel({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ marginTop: '22px', borderRadius: '14px', border: `0.5px solid ${alpha(C.goldPale, 0.7)}`, background: alpha(C.bgDeep, 0.24), padding: '18px' }}>
      <p style={eyebrowStyle}>{label}</p>
      <p style={{ ...smallBodyStyle, marginTop: '10px' }}>{text}</p>
    </div>
  )
}

function ListPanel({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ borderRadius: '14px', border: `0.5px solid ${alpha(C.goldPale, 0.7)}`, background: alpha(C.bgDeep, 0.24), padding: '16px' }}>
      <p style={eyebrowStyle}>{label}</p>
      <div style={{ marginTop: '10px', display: 'grid', gap: '10px' }}>
        {items.map((item) => (
          <p key={item} style={smallBodyStyle}>
            {item}
          </p>
        ))}
      </div>
    </div>
  )
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
  fontSize: 'clamp(28px, 4vw, 42px)',
  fontWeight: 400,
  color: C.ink,
  lineHeight: 1.04,
}

const cardTitleStyle = {
  marginTop: '14px',
  fontFamily: FONTS.display,
  fontSize: '30px',
  fontWeight: 400,
  color: C.ink,
}

const bodyStyle = {
  marginTop: '16px',
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

const tagStyle = {
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
