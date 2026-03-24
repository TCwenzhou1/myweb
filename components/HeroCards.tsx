'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── 配色系统 ───────────────────────────────────────────────────────────────
const COLORS = {
  bg:         '#F6F3EE',  // 暖白背景
  ink:        '#1F2024',  // 主文字
  inkDim:     '#6D685F',  // 次文字
  accent:     '#B79A63',  // 暖金点缀
  cardInk:    'rgba(28,26,34,0.75)',   // 牌面墨灰
  cardInkDim: 'rgba(28,26,34,0.55)',  // 牌面次墨灰
  cardBorder: 'rgba(20,18,12,0.08)',   // 牌边框
  cardInner:  'rgba(255,252,248,0.82)', // 内层暖白
}

const EASE_REVEAL = 'cubic-bezier(0.10, 0.96, 0.20, 1)'
const EASE_SETTLE = 'cubic-bezier(0.34, 1.28, 0.64, 1)'

// ─── 单张收藏级主牌 ─────────────────────────────────────────────────────────

interface CardProps {
  revealed: boolean
  hovered: boolean
}

function HeroCard({ revealed, hovered }: CardProps) {
  // 主牌尺寸：超大，几乎占满左侧
  const CARD_W = 480
  const CARD_H = 704
  const ROTATION = -7  // 微旋转

  const rad = (ROTATION * Math.PI) / 180

  // hover 极轻微位移
  const pullX = hovered ? Math.sin(rad) * 12 : 0
  const pullY = hovered ? -Math.cos(rad) * 8 : 0

  const shadow = hovered
    ? '0 8px 32px rgba(0,0,0,0.08), 0 32px 80px rgba(0,0,0,0.06), 0 60px 120px rgba(0,0,0,0.04)'
    : '0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.05), 0 40px 80px rgba(0,0,0,0.04)'

  return (
    <div
      style={{
        position:  'absolute',
        left:      '4vw',
        bottom:    '6vh',
        width:     `${CARD_W}px`,
        height:    `${CARD_H}px`,
        zIndex:    2,
        transformOrigin: '50% 100%',
        transform: `translateX(${pullX}px) translateY(${pullY}px) rotate(${ROTATION}deg)`,
        opacity:   revealed ? 1 : 0,
        transition: revealed
          ? `transform 0.28s ${EASE_SETTLE}, opacity 0.22s ease, box-shadow 0.32s ease`
          : `transform 1.4s ${EASE_REVEAL}, opacity 0.9s ease`,
        cursor: 'default',
        userSelect: 'none',
        willChange: 'transform, opacity',
      }}
    >
      {/* ── 牌面容器 ── */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '22px',
        border: `1px solid ${COLORS.cardBorder}`,
        position: 'relative',
        boxShadow: shadow,
        transition: 'box-shadow 0.32s ease',
      }}>
        {/* 内层细边框（双层效果） */}
        <div style={{
          position: 'absolute', inset: '6px',
          borderRadius: '17px',
          border: `0.75px solid ${COLORS.cardInner}`,
          pointerEvents: 'none', zIndex: 3,
        }} />

        {/* 牌底：暖白渐变 */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '22px',
          overflow: 'hidden',
          background: `linear-gradient(
            154deg,
            hsl(38, 32%, 99.2%)  0%,
            hsl(36, 24%, 97.0%)  32%,
            hsl(34, 18%, 95.0%)  62%,
            hsl(32, 14%, 93.2%) 100%
          )`,
        }}>

          {/* 纸纹：极淡菱格暗纹 */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              repeating-linear-gradient( 45deg, rgba(0,0,0,0.0032) 0, rgba(0,0,0,0.0032) 1px, transparent 1px, transparent 24px),
              repeating-linear-gradient(-45deg, rgba(0,0,0,0.0032) 0, rgba(0,0,0,0.0032) 1px, transparent 1px, transparent 24px)
            `,
          }} />

          {/* 纸面光晕：左上角亮斑 */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 65% 48% at 24% 16%, rgba(255,252,242,0.58) 0%, transparent 60%)',
          }} />

          {/* 中央黑桃压纹（极淡，收藏牌暗纹） */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '340px', lineHeight: 1,
            color: 'rgba(14,10,18,0.008)',
            fontFamily: 'serif', userSelect: 'none',
          }}>♠</div>

          {/* ── 左上角 A♠ ── */}
          <div style={{
            position: 'absolute',
            top:  '32px',
            left: '32px',
            display: 'flex', flexDirection: 'column', gap: '4px',
            zIndex: 2,
          }}>
            <span style={{
              fontSize: '52px',
              fontWeight: 700,
              fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
              letterSpacing: '-0.04em', lineHeight: 1,
              color: COLORS.cardInk,
            }}>A</span>
            <span style={{
              fontSize: '28px', lineHeight: 1,
              color: COLORS.cardInkDim,
              fontFamily: 'serif',
            }}>♠</span>
          </div>

          {/* ── 中央区域：大黑桃 + 标识 ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
            zIndex: 2,
          }}>
            <div style={{ width: '48px', height: '0.5px', background: 'rgba(0,0,0,0.04)' }} />
            <span style={{
              fontSize: '160px', lineHeight: 1,
              color: 'rgba(12,8,18,0.24)',
              fontFamily: 'serif',
            }}>♠</span>
            {/* 暖金点缀线 */}
            <div style={{
              width: '32px', height: '1px',
              background: COLORS.accent,
              opacity: 0.6,
            }} />
            <span style={{
              fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.30em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.10)',
              fontFamily: 'system-ui, sans-serif',
            }}>Royal Edition</span>
            <div style={{ width: '48px', height: '0.5px', background: 'rgba(0,0,0,0.04)' }} />
          </div>

          {/* ── 右下角 A♠（倒置） ── */}
          <div style={{
            position: 'absolute',
            bottom: '32px',
            right:  '32px',
            display: 'flex', flexDirection: 'column', gap: '4px',
            transform: 'rotate(180deg)',
            zIndex: 2,
          }}>
            <span style={{
              fontSize: '52px',
              fontWeight: 700,
              fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
              letterSpacing: '-0.04em', lineHeight: 1,
              color: COLORS.cardInk,
            }}>A</span>
            <span style={{
              fontSize: '28px', lineHeight: 1,
              color: COLORS.cardInkDim,
              fontFamily: 'serif',
            }}>♠</span>
          </div>

          {/* hover 顶部光泽（极轻微） */}
          <div style={{
            position: 'absolute', top: 0, left: '14%', right: '14%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255,252,244,0.92), transparent)',
            opacity: hovered ? 0.8 : 0,
            transition: 'opacity 0.24s ease',
            pointerEvents: 'none', zIndex: 4,
          }} />
        </div>
      </div>
    </div>
  )
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

export default function HeroCards() {
  const router = useRouter()
  const [cardIn,  setCardIn]  = useState(false)  // 主牌入场
  const [textIn,  setTextIn]  = useState(false)  // 文案入场
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    // 1. 先显示背景和主牌轮廓（延迟 300ms）
    t.push(setTimeout(() => setCardIn(true), 300))
    // 2. 文案区后显现（+900ms）
    t.push(setTimeout(() => setTextIn(true), 1200))
    return () => t.forEach(clearTimeout)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        width:  '100%',
        height: 'calc(100vh - 64px)',
        minHeight: '700px',
        overflow: 'hidden',
        backgroundColor: COLORS.bg,
        backgroundImage: [
          // 极轻纸纹
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.016'/%3E%3C/svg%3E")`,
          // 右侧极淡暖光
          'radial-gradient(ellipse 42% 55% at 78% 42%, rgba(210,205,193,0.07) 0%, transparent 55%)',
          // 底部地面氛围
          'linear-gradient(to top, rgba(140,132,120,0.08) 0%, transparent 12%)',
        ].join(','),
      }}
    >
      {/* ── 背景大 ♠ 雾影（极淡氛围） ── */}
      <div aria-hidden style={{
        position: 'absolute',
        right: '-8vw', bottom: '-18vh',
        fontSize: '75vw', lineHeight: 1,
        color: 'rgba(0,0,0,0.005)',
        fontFamily: 'serif',
        pointerEvents: 'none', userSelect: 'none',
        zIndex: 0,
      }}>♠</div>

      {/* ── 左侧 58%：主牌区域 ── */}
      <div
        style={{
          position: 'absolute',
          left: 0, top: 0,
          width: '58%',
          height: '100%',
          zIndex: 2,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <HeroCard revealed={cardIn} hovered={hovered} />
      </div>

      {/* ── 右侧 42%：展签式文案区 ── */}
      <div
        style={{
          position: 'absolute',
          right:  0,
          top:    '50%',
          transform: textIn ? 'translateY(-50%)' : 'translateY(-44%)',
          width:  '38%',
          maxWidth: '480px',
          paddingRight: 'clamp(32px, 5vw, 72px)',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.12,1,0.24,1), transform 1.2s cubic-bezier(0.12,1,0.24,1)',
          textAlign: 'left',
          zIndex: 3,
        }}
      >
        {/* 小标题：TCWENZHOU · ROYAL EDITION */}
        <p style={{
          fontSize: '9.5px', fontWeight: 600,
          letterSpacing: '0.40em', textTransform: 'uppercase',
          color: COLORS.accent,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          marginBottom: '20px',
          opacity: 0.85,
        }}>TCwenzhou · Royal Edition</p>

        {/* 主标题 */}
        <h1 style={{
          fontSize: 'clamp(64px, 7.5vw, 96px)',
          fontWeight: 700,
          fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
          letterSpacing: '-0.04em', lineHeight: 0.88,
          color: COLORS.ink,
          marginBottom: '24px',
        }}>TCwenzhou</h1>

        {/* 副标题 */}
        <p style={{
          fontSize: '14px',
          color: COLORS.inkDim,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1.65,
          letterSpacing: '0.01em',
          marginBottom: '40px',
        }}>
          计算机工程、系统实践与 AI / 游戏探索
        </p>

        {/* 暖金分隔线 */}
        <div style={{
          width: '48px', height: '1px',
          background: COLORS.accent,
          marginBottom: '40px',
          opacity: 0.5,
        }} />

        {/* 按钮组 */}
        <div style={{
          display: 'flex', gap: '14px',
          alignItems: 'center',
          marginBottom: '48px',
        }}>
          {/* 主 CTA */}
          <a
            href="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '54px', padding: '0 38px',
              borderRadius: '14px',
              background: COLORS.ink,
              color: 'rgba(255,253,248,0.96)',
              fontSize: '10.5px', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'background 0.18s ease, transform 0.14s ease, box-shadow 0.18s ease',
              boxShadow: '0 2px 10px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2a2b30'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.10)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = COLORS.ink
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08)'
            }}
          >进入展厅</a>

          {/* 次按钮 */}
          <a
            href="/about"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '54px', padding: '0 30px',
              borderRadius: '14px',
              background: 'transparent',
              color: COLORS.inkDim,
              fontSize: '10.5px', fontWeight: 500,
              letterSpacing: '0.06em',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              border: `1px solid rgba(0,0,0,0.08)`,
              transition: 'border-color 0.16s ease, color 0.16s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.16)'
              e.currentTarget.style.color = COLORS.ink
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
              e.currentTarget.style.color = COLORS.inkDim
            }}
          >关于我</a>
        </div>

        {/* 淡说明 */}
        <p style={{
          fontSize: '11px',
          color: 'rgba(109,104,95,0.55)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1.6,
          letterSpacing: '0.01em',
        }}>
          github.com/TCwenzhou1 · hello@tcwenzhou.site
        </p>
      </div>

      {/* ── 响应式 ── */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-card {
            transform: scale(0.78) !important;
            transform-origin: bottom left !important;
          }
        }
        @media (max-width: 768px) {
          .hero-card-wrap {
            width: 100% !important;
            left: 0 !important;
          }
          .hero-text-wrap {
            width: 100% !important;
            right: 0 !important;
            padding: 0 24px !important;
            text-align: center !important;
            top: auto !important;
            bottom: 24px !important;
            transform: none !important;
          }
          .hero-text-wrap div { justify-content: center !important; }
        }
      `}</style>
    </section>
  )
}