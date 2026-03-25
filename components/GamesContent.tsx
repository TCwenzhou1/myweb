'use client'

import { CinematicSection, PageHeader, C, FONTS } from '@/components/CinematicUI'

// 统一配色
const GameC = {
  cardBg:     '#FAF8F3',
  goldChamp:  '#D4BC8A',
  goldPale:   '#E8DCC4',
  gold:       '#A88B55',
  ink:        '#0F0E10',
  inkDim:     '#5C585E',
  inkFaint:   '#9A9599',
  bg:         '#F8F5EE',
  bgDeep:     '#E8E2D6',
}

export default function GamesContent() {
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
            radial-gradient(ellipse 50% 40% at 50% 20%, rgba(212,188,138,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(248,245,238,0.6) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 大型 ♠ 水印 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          right: '-5vw',
          top: '20vh',
          fontSize: 'clamp(300px, 45vw, 600px)',
          color: 'transparent',
          fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
          WebkitTextStroke: '0.5px rgba(168,139,85,0.06)',
          pointerEvents: 'none',
          zIndex: 0,
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        ♠
      </div>

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
          title="游戏"
          subtitle="节奏变化"
          description="对游戏开发有长期兴趣，这里是可以直接试玩或查看的内容。目前还在早期阶段，会陆续补充。"
          scene={{ chapter: '04', title: 'Games', subtitle: 'Playable' }}
        />

        {/* 游戏卡片区 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <CinematicSection delay={100}>
            <PlaceholderGame
              title="即将到来"
              description="正在开发中，暂无可展示内容。"
              status="空位预留中"
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
              04 — 05
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
              Games · Playable Chapter
            </span>
          </div>
        </CinematicSection>
      </div>
    </div>
  )
}

function PlaceholderGame({ title, description, status }: { title: string; description: string; status: string }) {
  return (
    <div
      style={{
        position: 'relative',
        background: GameC.cardBg,
        border: `0.5px solid rgba(200,190,168,0.5)`,
        borderRadius: '12px',
        padding: 'clamp(48px, 6vw, 72px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '320px',
        overflow: 'hidden',
      }}
    >
      {/* 内层双线 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '16px',
          border: `0.5px solid ${GameC.goldPale}`,
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

      {/* 空位图标 */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          border: `1px dashed ${GameC.goldChamp}`,
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
            color: GameC.gold,
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
          color: GameC.ink,
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
          color: GameC.inkDim,
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
          color: GameC.gold,
          padding: '4px 12px',
          borderRadius: '4px',
          border: `0.5px solid ${GameC.goldChamp}50`,
          background: `${GameC.goldChamp}10`,
        }}
      >
        {status}
      </span>
    </div>
  )
}
