'use client'

import Link from 'next/link'
import ReverseSanguoshaPlayer from '@/components/ReverseSanguoshaPlayer'
import { C, FONTS, alpha } from '@/components/CinematicUI'

export default function ReverseSanguoshaPlayClient() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: C.bg,
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gap: '18px',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            border: `0.5px solid ${alpha(C.goldPale, 0.72)}`,
            background: alpha(C.cardIvory, 0.78),
            padding: '14px 16px',
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: FONTS.body,
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: C.gold,
              }}
            >
              Browser Runtime
            </p>
            <h1
              style={{
                margin: '4px 0 0',
                fontFamily: FONTS.display,
                fontSize: 'clamp(28px, 4vw, 46px)',
                fontWeight: 400,
                color: C.ink,
              }}
            >
              Reverse Sanguosha
            </h1>
          </div>

          <Link
            href="/projects/reverse-sanguosha-runtime-audit"
            style={{
              fontFamily: FONTS.body,
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: C.inkDim,
              textDecoration: 'none',
            }}
          >
            Case study
          </Link>
        </header>

        <ReverseSanguoshaPlayer compact />
      </div>
    </main>
  )
}
