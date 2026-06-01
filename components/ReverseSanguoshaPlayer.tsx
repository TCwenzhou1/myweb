'use client'

import Link from 'next/link'
import { ArchiveCard, C, FONTS, alpha } from '@/components/CinematicUI'

interface ReverseSanguoshaPlayerProps {
  compact?: boolean
}

export default function ReverseSanguoshaPlayer({ compact = false }: ReverseSanguoshaPlayerProps) {
  const gameUrl = process.env.NEXT_PUBLIC_REVERSE_SANGUOSHA_GAME_URL || 'https://game.tcwenzhou.site/index.html'

  return (
    <ArchiveCard hoverable={false} style={{ marginTop: compact ? '0' : '24px', padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '14px 16px',
          borderBottom: `0.5px solid ${alpha(C.goldPale, 0.65)}`,
          background: alpha(C.cardIvory, 0.88),
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
            Playable Runtime
          </p>
          <h2
            style={{
              margin: '4px 0 0',
              fontFamily: FONTS.display,
              fontSize: compact ? '22px' : '28px',
              fontWeight: 400,
              color: C.ink,
            }}
          >
            Reverse Sanguosha
          </h2>
        </div>

        <Link
          href="/reverse-sanguosha/play"
          style={{
            flex: '0 0 auto',
            fontFamily: FONTS.body,
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: C.gold,
            textDecoration: 'none',
          }}
        >
          Focus mode
        </Link>
      </div>

      <div
        style={{
          height: compact ? 'min(68vh, 620px)' : 'min(76vh, 760px)',
          minHeight: compact ? '460px' : '560px',
          background: '#171819',
        }}
      >
        <iframe
          title="Reverse Sanguosha playable runtime"
          src={gameUrl}
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-modals"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            border: 0,
            background: '#111',
          }}
        />
      </div>
    </ArchiveCard>
  )
}
