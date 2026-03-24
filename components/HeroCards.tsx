'use client'

import { useEffect, useState } from 'react'

// ─── 配色系统 ───────────────────────────────────────────────────────────────
const C = {
  bg:         '#F6F3EE',
  ink:        '#1F2024',
  inkDim:     '#6D685F',
  inkFaint:   '#A09890',
  accent:     '#B79A63',
  cardBg0:    'hsl(38,30%,99.0%)',
  cardBg1:    'hsl(36,22%,97.0%)',
  cardBg2:    'hsl(34,16%,94.8%)',
  cardBg3:    'hsl(32,12%,92.8%)',
  cardInk:    'rgba(24,20,30,0.74)',
  cardInkDim: 'rgba(24,20,30,0.52)',
  cardBorder: 'rgba(18,14,8,0.07)',
  cardInner:  'rgba(255,252,248,0.80)',
}

// ─── 单张牌（可复用） ────────────────────────────────────────────────────────

interface CardFaceProps {
  rank: string
  size: 'main' | 'sub'
  style?: React.CSSProperties
}

function CardFace({ rank, size, style }: CardFaceProps) {
  const isMain = size === 'main'
  const W = isMain ? 450 : 380
  const H = isMain ? 660 : 558
  const radius = isMain ? 20 : 16

  return (
    <div style={{
      width:  `${W}px`,
      height: `${H}px`,
      borderRadius: `${radius}px`,
      border: `1px solid ${C.cardBorder}`,
      position: 'relative',
      flexShrink: 0,
      ...style,
    }}>
      {/* 内层细边框 */}
      <div style={{
        position: 'absolute', inset: isMain ? '6px' : '5px',
        borderRadius: `${radius - 4}px`,
        border: `0.75px solid ${C.cardInner}`,
        pointerEvents: 'none', zIndex: 3,
      }} />

      {/* 牌底渐变 */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: `${radius}px`,
        overflow: 'hidden',
        background: `linear-gradient(152deg, ${C.cardBg0} 0%, ${C.cardBg1} 34%, ${C.cardBg2} 65%, ${C.cardBg3} 100%)`,
      }}>
        {/* 极淡菱格纸纹 */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient( 45deg,rgba(0,0,0,0.0028) 0,rgba(0,0,0,0.0028) 1px,transparent 1px,transparent 22px),
            repeating-linear-gradient(-45deg,rgba(0,0,0,0.0028) 0,rgba(0,0,0,0.0028) 1px,transparent 1px,transparent 22px)
          `,
        }} />

        {/* 纸面光晕 */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 65% 48% at 26% 18%,rgba(255,252,244,0.55) 0%,transparent 60%)',
        }} />

        {/* 中央极淡黑桃压纹 */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: isMain ? `${H * 0.48}px` : `${H * 0.42}px`, lineHeight: 1,
          color: 'rgba(12,8,16,0.007)',
          fontFamily: 'serif', userSelect: 'none',
        }}>♠</div>

        {/* 左上角 */}
        <div style={{
          position: 'absolute',
          top: isMain ? '28px' : '20px',
          left: isMain ? '28px' : '20px',
          display: 'flex', flexDirection: 'column', gap: '3px', zIndex: 2,
        }}>
          <span style={{
            fontSize: isMain ? '46px' : '34px', fontWeight: 700,
            fontFamily: '"Cormorant Garamond","Palatino Linotype",Palatino,Georgia,serif',
            letterSpacing: '-0.04em', lineHeight: 1,
            color: C.cardInk,
          }}>{rank}</span>
          <span style={{
            fontSize: isMain ? '24px' : '18px', lineHeight: 1,
            color: C.cardInkDim, fontFamily: 'serif',
          }}>♠</span>
        </div>

        {/* 中央区域 */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: isMain ? '12px' : '8px', zIndex: 2,
        }}>
          <div style={{ width: isMain ? '40px' : '28px', height: '0.5px', background: 'rgba(0,0,0,0.04)' }} />
          <span style={{
            fontSize: isMain ? '148px' : '110px', lineHeight: 1,
            color: 'rgba(12,8,16,0.22)', fontFamily: 'serif',
          }}>♠</span>
          {isMain && (
            <>
              <div style={{ width:'28px', height:'1px', background: C.accent, opacity: 0.55 }} />
              <span style={{
                fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.30em', textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.09)', fontFamily: 'system-ui,sans-serif',
              }}>Royal Edition</span>
            </>
          )}
          <div style={{ width: isMain ? '40px' : '28px', height: '0.5px', background: 'rgba(0,0,0,0.04)' }} />
        </div>

        {/* 右下角（倒置） */}
        <div style={{
          position: 'absolute',
          bottom: isMain ? '28px' : '20px',
          right:  isMain ? '28px' : '20px',
          display: 'flex', flexDirection: 'column', gap: '3px',
          transform: 'rotate(180deg)', zIndex: 2,
        }}>
          <span style={{
            fontSize: isMain ? '46px' : '34px', fontWeight: 700,
            fontFamily: '"Cormorant Garamond","Palatino Linotype",Palatino,Georgia,serif',
            letterSpacing: '-0.04em', lineHeight: 1,
            color: C.cardInk,
          }}>{rank}</span>
          <span style={{
            fontSize: isMain ? '24px' : '18px', lineHeight: 1,
            color: C.cardInkDim, fontFamily: 'serif',
          }}>♠</span>
        </div>
      </div>
    </div>
  )
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

export default function HeroCards() {
  const [plateIn,  setPlateIn]  = useState(false)  // 展柜底板
  const [sub1In,   setSub1In]   = useState(false)  // 副牌1
  const [sub2In,   setSub2In]   = useState(false)  // 副牌2
  const [mainIn,   setMainIn]   = useState(false)  // 主牌
  const [textIn,   setTextIn]   = useState(false)  // 文案
  const [hovered,  setHovered]  = useState(false)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setPlateIn(true),  200))   // 底板先淡入
    t.push(setTimeout(() => setSub1In(true),   460))   // 副牌1
    t.push(setTimeout(() => setSub2In(true),   560))   // 副牌2
    t.push(setTimeout(() => setMainIn(true),   700))   // 主牌
    t.push(setTimeout(() => setTextIn(true),  1380))   // 文案后显现
    return () => t.forEach(clearTimeout)
  }, [])

  const EASE_IN   = 'cubic-bezier(0.12,1,0.24,1)'
  const EASE_CARD = 'cubic-bezier(0.20,1,0.30,1)'

  return (
    <section style={{
      position: 'relative',
      width:  '100%',
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: C.bg,
      backgroundImage: [
        // 极轻纸纹
        `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.014'/%3E%3C/svg%3E")`,
        'linear-gradient(to top,rgba(140,132,120,0.06) 0%,transparent 10%)',
      ].join(','),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* ── 版心 ── */}
      <div style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 clamp(40px,6vw,96px)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(32px,4vw,72px)',
        minHeight: 'calc(100vh - 64px)',
      }}>

        {/* ── 左侧：展柜区（44%） ── */}
        <div style={{
          flex: '0 0 44%',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          height: 'clamp(580px,75vh,760px)',
        }}>
          {/* 展柜底板 */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '28px',
            background: `radial-gradient(ellipse 90% 80% at 50% 105%,
              rgba(185,175,158,0.22) 0%,
              rgba(185,175,158,0.08) 48%,
              transparent 70%)`,
            opacity: plateIn ? 1 : 0,
            transition: `opacity 1.0s ${EASE_IN}`,
          }} />

          {/* 展柜底部地面阴影 */}
          <div style={{
            position: 'absolute', bottom: '-10px', left: '15%', right: '15%',
            height: '40px',
            background: 'radial-gradient(ellipse 100% 100% at 50% 100%,rgba(80,60,40,0.12) 0%,transparent 70%)',
            opacity: plateIn ? 1 : 0,
            transition: `opacity 1.2s ${EASE_IN}`,
            pointerEvents: 'none',
          }} />

          {/* 副牌1：左后方，极淡，微露 */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left:   '6%',
            opacity: sub1In ? 0.25 : 0,
            transform: sub1In ? 'translateY(0) rotate(-12deg)' : 'translateY(18px) rotate(-12deg)',
            transition: `opacity 0.90s ${EASE_CARD}, transform 0.90s ${EASE_CARD}`,
            transformOrigin: '50% 100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}>
            <CardFace rank="K" size="sub" />
          </div>

          {/* 副牌2：右后方，极淡，微露 */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            right:  '4%',
            opacity: sub2In ? 0.22 : 0,
            transform: sub2In ? 'translateY(0) rotate(8deg)' : 'translateY(18px) rotate(8deg)',
            transition: `opacity 0.90s ${EASE_CARD}, transform 0.90s ${EASE_CARD}`,
            transformOrigin: '50% 100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}>
            <CardFace rank="Q" size="sub" />
          </div>

          {/* 主牌：A♠，完整可见 */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              opacity: mainIn ? 1 : 0,
              transform: mainIn
                ? `translateY(${hovered ? -6 : 0}px) rotate(-5deg)`
                : 'translateY(24px) rotate(-5deg)',
              transition: mainIn
                ? `transform 0.32s ${EASE_CARD}, box-shadow 0.32s ease, opacity 0.20s ease`
                : `opacity 0.85s ${EASE_CARD}, transform 1.1s ${EASE_CARD}`,
              boxShadow: hovered
                ? '0 12px 40px rgba(0,0,0,0.08), 0 40px 80px rgba(0,0,0,0.06)'
                : '0 4px 16px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.06)',
              borderRadius: '20px',
              cursor: 'default',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <CardFace rank="A" size="main" />
          </div>
        </div>

        {/* ── 右侧：题签式文案区（~40%） ── */}
        <div style={{
          flex: 1,
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity 1.2s ${EASE_IN}, transform 1.2s ${EASE_IN}`,
          paddingLeft: 'clamp(16px,2vw,40px)',
        }}>
          {/* 竖线题签细节 */}
          <div style={{
            width: '1px', height: '32px',
            background: `linear-gradient(to bottom, transparent, ${C.accent}, transparent)`,
            opacity: 0.5,
            marginBottom: '22px',
          }} />

          {/* 小标题：暖金，全大写 */}
          <p style={{
            fontSize: '9.5px', fontWeight: 600,
            letterSpacing: '0.42em', textTransform: 'uppercase',
            color: C.accent,
            fontFamily: '"Inter","Manrope",system-ui,sans-serif',
            marginBottom: '20px',
          }}>TCwenzhou · Royal Edition</p>

          {/* 主标题 */}
          <h1 style={{
            fontSize: 'clamp(60px,6.5vw,92px)',
            fontWeight: 700,
            fontFamily: '"Cormorant Garamond","Palatino Linotype",Palatino,Georgia,serif',
            letterSpacing: '-0.04em', lineHeight: 0.90,
            color: C.ink,
            marginBottom: '22px',
          }}>TCwenzhou</h1>

          {/* 副标题：单行 */}
          <p style={{
            fontSize: '14.5px',
            color: C.inkDim,
            fontFamily: '"Inter","Manrope",system-ui,sans-serif',
            lineHeight: 1.65, letterSpacing: '0.01em',
            marginBottom: '36px',
            whiteSpace: 'nowrap',
          }}>计算机工程、系统实践与 AI / 游戏探索</p>

          {/* 暖金分隔线 */}
          <div style={{
            width: '40px', height: '1px',
            background: C.accent, opacity: 0.45,
            marginBottom: '36px',
          }} />

          {/* 按钮组 */}
          <div style={{
            display: 'flex', gap: '12px', alignItems: 'center',
            marginBottom: '44px',
          }}>
            {/* 主按钮 */}
            <a href="/projects" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '52px', padding: '0 36px',
              borderRadius: '13px',
              background: C.ink,
              color: 'rgba(255,253,248,0.95)',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.13em', textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: '"Inter","Manrope",system-ui,sans-serif',
              boxShadow: '0 2px 10px rgba(0,0,0,0.10)',
              transition: 'background 0.17s ease,transform 0.14s ease,box-shadow 0.17s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2a2c32'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.13)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = C.ink
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.10)'
            }}>查看项目</a>

            {/* 次按钮 */}
            <a href="/lab" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '52px', padding: '0 28px',
              borderRadius: '13px',
              background: 'transparent',
              color: C.inkDim,
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.06em',
              textDecoration: 'none',
              fontFamily: '"Inter","Manrope",system-ui,sans-serif',
              border: '1px solid rgba(0,0,0,0.08)',
              transition: 'border-color 0.15s ease,color 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.16)'
              e.currentTarget.style.color = C.ink
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
              e.currentTarget.style.color = C.inkDim
            }}>进入实验室</a>
          </div>

          {/* 淡说明 */}
          <p style={{
            fontSize: '11px',
            color: C.inkFaint,
            fontFamily: '"Inter","Manrope",system-ui,sans-serif',
            letterSpacing: '0.01em', opacity: 0.7,
          }}>github.com/TCwenzhou1 · hello@tcwenzhou.site</p>
        </div>

      </div>

      {/* ── 响应式 ── */}
      <style>{`
        @media (max-width: 960px) {
          .hero-inner { flex-direction: column !important; padding-top: 32px !important; }
          .hero-gallery { flex: 0 0 auto !important; height: 480px !important; width: 100% !important; }
          .hero-copy { padding-left: 0 !important; text-align: center !important; }
          .hero-copy p:last-child { white-space: normal !important; }
        }
      `}</style>
    </section>
  )
}
