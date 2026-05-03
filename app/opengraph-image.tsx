import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #F8F5EE 0%, #EEE5D6 55%, #E2D2B5 100%)',
          color: '#0F0E10',
          padding: '56px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '2px solid rgba(168,139,85,0.35)',
            borderRadius: 28,
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, letterSpacing: 6, color: '#A88B55' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#A88B55' }} />
            TCWENZHOU
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 78, lineHeight: 1.02 }}>Projects, Experiments, Growth</div>
            <div style={{ fontSize: 32, lineHeight: 1.45, color: '#3A353B', maxWidth: 820 }}>
              Computer engineering student documenting AI projects, systems practice, game exploration, and public work in progress.
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, color: '#5C585E' }}>
            <span>tcwenzhou.site</span>
            <span>Projects · Lab · Games</span>
          </div>
        </div>
      </div>
    ),
    size
  )
}
