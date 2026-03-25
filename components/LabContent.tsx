'use client'

import { CinematicSection, PageHeader, C, FONTS } from '@/components/CinematicUI'

export default function LabContent() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景氛围 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 40% at 20% 15%, rgba(212,188,138,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 40% 35% at 75% 85%, rgba(232,196,160,0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 主内容 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(32px, 6vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        {/* 页头 */}
        <PageHeader
          title="实验室"
          subtitle="幕后制作"
          description="还没做完的东西、还没想清楚的想法、纯粹用来试验的 Demo。不追求完整，只追求有趣。"
          scene={{ chapter: '03', title: 'Lab', subtitle: 'Workshop' }}
        />

        {/* 实验项目区 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <CinematicSection delay={100}>
            <PlaceholderDemo
              title="空位预留中"
              description="会在这里放一些正在实验的东西。"
              status="待填充"
            />
          </CinematicSection>
        </div>

        {/* 底部场景编号 */}
        <CinematicSection delay={300}>
          <div
            style={{
              marginTop: 'clamp(60px, 8vh, 80px)',
              paddingTop: '24px',
              borderTop: '0.5px solid rgba(200,190,168,0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '8px',
                fontWeight: 300,
                letterSpacing: '0.2em',
                color: C.inkFaint,
                opacity: 0.5,
              }}
            >
              03 — 04
            </span>
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '8px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: C.gold,
                opacity: 0.4,
              }}
            >
              Lab · Workshop
            </span>
          </div>
        </CinematicSection>
      </div>
    </div>
  )
}

function PlaceholderDemo({ title, description, status }: { title: string; description: string; status: string }) {
  return (
    <div
      style={{
        position: 'relative',
        background: C.cardIvory,
        border: `0.5px solid rgba(200,190,168,0.5)`,
        borderRadius: '12px',
        padding: 'clamp(48px, 6vw, 72px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '280px',
        overflow: 'hidden',
      }}
    >
      {/* 内层双线 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '16px',
          border: `0.5px solid ${C.goldPale}`,
          borderRadius: '8px',
          opacity: 0.2,
          pointerEvents: 'none',
        }}
      />

      {/* 纸纹 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '12px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* 实验器皿图标 */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          border: `1px dashed ${C.goldChamp}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          opacity: 0.5,
        }}
      >
        <span
          style={{
            fontFamily: '"Bodoni Moda", serif',
            fontSize: '24px',
            color: C.gold,
            opacity: 0.4,
          }}
        >
          +
        </span>
      </div>

      {/* 标题 */}
      <h3
        style={{
          fontFamily: FONTS.display,
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 400,
          color: C.ink,
          marginBottom: '8px',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>

      {/* 描述 */}
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: '13px',
          fontWeight: 300,
          color: C.inkDim,
          marginBottom: '16px',
        }}
      >
        {description}
      </p>

      {/* 状态标签 */}
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: '8px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: C.gold,
          padding: '4px 12px',
          borderRadius: '4px',
          border: `0.5px solid ${C.goldChamp}50`,
          background: `${C.goldChamp}10`,
        }}
      >
        {status}
      </span>
    </div>
  )
}
