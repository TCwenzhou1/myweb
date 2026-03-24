'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── 牌组数据 ─────────────────────────────────────────────────────────────────

const CARDS = [
  { rank: '10', suit: '♠', label: 'Projects', sub: 'AI Systems',   href: '/projects' },
  { rank: 'J',  suit: '♠', label: 'Games',    sub: 'Game Dev',     href: '/games'    },
  { rank: 'Q',  suit: '♠', label: 'Lab',      sub: 'Experiments',  href: '/lab'      },
  { rank: 'K',  suit: '♠', label: 'About',    sub: 'Background',   href: '/about'    },
  { rank: 'A',  suit: '♠', label: 'Contact',  sub: 'Get in Touch', href: '/contact'  },
]

// ─── 扇形几何 ─────────────────────────────────────────────────────────────────
//
// 构图目标：向右上打开的扇形牌花
// K♠ 作为参考竖直牌（接近 0°），整体向右展开
//
// 角度定义：0° = 朝正上方，正值顺时针
// 扇形从 10♠(-30°) 到 A♠(+10°)，整体偏左，向右上展开
//
const FAN_DEG  = [-30, -20, -10, 0, 10]    // 10 J Q K A
const RADIUS   = 680                        // 牌底中心到圆心的距离（px）
const CARD_W   = 340
const CARD_H   = 500

// 极坐标转直角，以"圆心"为原点，0° = 向上
function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180
  return { x: r * Math.sin(rad), y: -r * Math.cos(rad) }
}

const EASE_DEAL  = 'cubic-bezier(0.16, 1, 0.30, 1)'
const EASE_HOVER = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

// ─── 单张牌组件 ───────────────────────────────────────────────────────────────

interface CardProps {
  card: typeof CARDS[number]
  index: number
  revealed: boolean
  hovered: boolean
  anyHovered: boolean
  clickedIdx: number | null
  onHover: (i: number | null) => void
  onClick: (href: string, i: number) => void
}

function PokerCard({
  card, index, revealed, hovered, anyHovered, clickedIdx,
  onHover, onClick,
}: CardProps) {
  const { rank, suit, label, sub } = card
  const isRoyal = ['J', 'Q', 'K', 'A'].includes(rank)
  const is10    = rank === '10'

  const deg         = FAN_DEG[index]
  const { x, y }   = polar(deg, RADIUS)

  // hover: 沿牌面朝向再抽出 72px
  const sinD = Math.sin((deg * Math.PI) / 180)
  const cosD = Math.cos((deg * Math.PI) / 180)
  const pullX = hovered ? sinD * 72 : 0
  const pullY = hovered ? -cosD * 72 : 0

  // z-index
  const zBase  = 10 - Math.abs(index - 3) * 2  // K(index=3) 最高
  const zIndex = hovered ? 30 : (clickedIdx === index ? 25 : zBase)

  // scale / opacity
  const myClicked    = clickedIdx === index
  const otherClicked = clickedIdx !== null && !myClicked
  const scale = (myClicked ? 1.06 : otherClicked ? 0.88 : 1) *
                (anyHovered && !hovered ? 0.95 : 1)
  const opacity = anyHovered && !hovered ? 0.48 : 1

  // 阴影
  const shadow = hovered
    ? '0 48px 100px rgba(0,0,0,0.20), 0 16px 40px rgba(0,0,0,0.12)'
    : '0 14px 40px rgba(0,0,0,0.10), 0 32px 80px rgba(0,0,0,0.07)'

  // 展开位置
  const tx = revealed ? x + pullX : 0
  const ty = revealed ? y + pullY : 0
  const tr = revealed ? deg : 0

  const delay = index * 140  // 0/140/280/420/560ms

  const transition = revealed
    ? `transform 0.26s ${EASE_HOVER}, opacity 0.18s ease, box-shadow 0.22s ease`
    : `transform 0.82s ${EASE_DEAL} ${delay}ms, opacity 0.55s ease ${delay}ms`

  return (
    <div
      style={{
        position: 'absolute',
        // 牌底中心对齐圆心（容器 50%/50% 处）
        left:  `calc(50% - ${CARD_W / 2}px)`,
        top:   `calc(50% - ${CARD_H}px)`,
        width:  `${CARD_W}px`,
        height: `${CARD_H}px`,
        zIndex,
        transformOrigin: '50% 100%',   // 以牌底中心旋转
        transform: `translateX(${tx}px) translateY(${ty}px) rotate(${tr}deg) scale(${scale})`,
        opacity: revealed ? opacity : 0,
        transition,
        cursor: 'pointer',
        userSelect: 'none',
        willChange: 'transform, opacity',
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(card.href, index)}
    >
      {/* ══ 牌面 ══ */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '22px',
        // 双层边框
        border:        '1.5px solid rgba(0,0,0,0.075)',
        outline:       '1px solid rgba(255,255,255,0.70)',
        outlineOffset: '-4.5px',
        // 偏暖白渐变
        background: `linear-gradient(
          150deg,
          hsl(44, 40%, 99.5%)  0%,
          hsl(40, 24%, 97.4%) 40%,
          hsl(36, 16%, 95.0%) 100%
        )`,
        boxShadow: shadow,
        transition: 'box-shadow 0.26s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `${is10 ? 26 : 28}px 26px`,
        boxSizing: 'border-box',
      }}>

        {/* 纸张压纹：极淡菱形纹理 */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient( 45deg, rgba(0,0,0,0.007) 0, rgba(0,0,0,0.007) 1px, transparent 1px, transparent 24px),
            repeating-linear-gradient(-45deg, rgba(0,0,0,0.007) 0, rgba(0,0,0,0.007) 1px, transparent 1px, transparent 24px)
          `,
        }} />

        {/* 背景大图腾（超淡） */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '300px', lineHeight: 1,
          color: 'rgba(0,0,0,0.016)',
          fontFamily: 'serif', userSelect: 'none',
        }}>♠</div>

        {/* 皇家牌：四角菱形装饰 */}
        {isRoyal && [
          { top: '34px',  left: '30px'  },
          { top: '34px',  right: '30px' },
          { bottom: '34px', left: '30px'  },
          { bottom: '34px', right: '30px' },
        ].map((pos, ki) => (
          <div key={ki} aria-hidden style={{
            position: 'absolute', ...pos,
            width: '10px', height: '10px',
            border: '0.75px solid rgba(0,0,0,0.065)',
            transform: 'rotate(45deg)', pointerEvents: 'none',
          }} />
        ))}

        {/* 皇家牌：中央十字细线 */}
        {isRoyal && (
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '72px', height: '72px', pointerEvents: 'none',
          }}>
            <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'0.5px', background:'rgba(0,0,0,0.06)', transform:'translateY(-50%)' }} />
            <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'0.5px', background:'rgba(0,0,0,0.06)', transform:'translateX(-50%)' }} />
          </div>
        )}

        {/* 左上角 */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '5px',
          color: 'rgba(12,12,18,0.78)', position: 'relative', zIndex: 1,
        }}>
          <span style={{
            fontSize: is10 ? '36px' : '42px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.03em', lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '22px', lineHeight: 1, color: 'rgba(12,12,18,0.72)' }}>{suit}</span>
        </div>

        {/* 中央区域 */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{ width: '40px', height: '0.75px', background: 'rgba(0,0,0,0.08)' }} />
          <span style={{
            fontSize: '120px', lineHeight: 1,
            color: 'rgba(8,8,16,0.38)', fontFamily: 'serif',
          }}>♠</span>
          <span style={{
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.18)', fontFamily: 'system-ui, sans-serif',
          }}>{label}</span>
          <div style={{ width: '40px', height: '0.75px', background: 'rgba(0,0,0,0.08)' }} />
        </div>

        {/* 右下角（倒置） */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '5px',
          color: 'rgba(12,12,18,0.78)',
          alignSelf: 'flex-end', transform: 'rotate(180deg)',
          position: 'relative', zIndex: 1,
        }}>
          <span style={{
            fontSize: is10 ? '36px' : '42px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.03em', lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '22px', lineHeight: 1, color: 'rgba(12,12,18,0.72)' }}>{suit}</span>
        </div>

        {/* hover 顶部高亮细线 */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%',
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.18), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.18s ease',
        }} />

        {/* hover 增亮层 */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '22px',
          background: 'rgba(255,255,255,0.08)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.18s ease', pointerEvents: 'none',
        }} />
      </div>

      {/* hover 底部标签 */}
      <div style={{
        position: 'absolute', bottom: '-70px', left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap', textAlign: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.18s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '13px', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.58)', fontFamily: 'system-ui, sans-serif',
        }}>{label}</div>
        <div style={{
          fontSize: '11px', color: 'rgba(0,0,0,0.30)',
          marginTop: '4px', fontFamily: 'system-ui, sans-serif',
        }}>{sub}</div>
      </div>
    </div>
  )
}

// ─── 主组件 ──────────────────────────────────────────────────────────────────

type Phase = 'prelude' | 'reveal' | 'settle'

export default function HeroCards() {
  const router               = useRouter()
  const sectionRef           = useRef<HTMLElement>(null)
  const [phase, setPhase]    = useState<Phase>('prelude')
  const [revealedCount, setR] = useState(0)
  const [textIn, setTextIn]  = useState(false)
  const [hovered, setHovered]   = useState<number | null>(null)
  const [clicked, setClicked]   = useState<number | null>(null)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setPhase('reveal'), 600))
    for (let i = 0; i < 5; i++) {
      t.push(setTimeout(() => setR(i + 1), 700 + i * 140))
    }
    // 700 + 4×140 = 1260ms, +500ms = 1760ms → settle + 文字入场
    t.push(setTimeout(() => { setPhase('settle'); setTextIn(true) }, 1760))
    return () => t.forEach(clearTimeout)
  }, [])

  const handleClick = (href: string, i: number) => {
    setClicked(i)
    setTimeout(() => router.push(href), 360)
  }

  // 背景渐变用 CSS，不在 JS 里计算

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        // 首屏铺满，减去 navbar 高度（64px）
        height: 'calc(100vh - 64px)',
        minHeight: '600px',
        overflow: 'hidden',
        // 偏暖白舞台背景
        background: 'hsl(40, 20%, 97%)',
        backgroundImage: [
          // 左侧牌花区域：暖灰聚光
          'radial-gradient(ellipse 65% 80% at 32% 55%, rgba(195,183,162,0.17) 0%, rgba(195,183,162,0.06) 50%, transparent 75%)',
          // 右侧文字区域：极淡
          'radial-gradient(ellipse 45% 55% at 72% 48%, rgba(210,205,195,0.08) 0%, transparent 60%)',
          // 底部地面阴影
          'linear-gradient(to top, rgba(160,150,135,0.10) 0%, transparent 18%)',
        ].join(','),
      }}
    >
      {/* ── 超大背景 ♠ 水印，服务于整体氛围 ── */}
      <div aria-hidden style={{
        position: 'absolute',
        // 水印居于牌花区左侧，不要正中
        left: '-8vw', top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '75vw', lineHeight: 1,
        color: 'rgba(0,0,0,0.010)',
        fontFamily: 'serif',
        pointerEvents: 'none', userSelect: 'none',
        whiteSpace: 'nowrap',
      }}>♠</div>

      {/* ── Prelude 标签：进场前出现 ── */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: 'clamp(32px, 5vw, 80px)',
        opacity: phase === 'prelude' ? 0.40 : 0,
        transition: 'opacity 0.9s ease',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.34em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.36)',
          fontFamily: 'system-ui, sans-serif',
        }}>Royal Flush &nbsp;·&nbsp; ♠</span>
      </div>

      {/*
        ── 扇形牌花容器 ──
        策略：圆心放在视口下方（section 底部以下），
        这样 R=680px 的牌向上伸展后，牌顶出现在视口中上部。

        圆心位置：左 38% × 视口宽，高 = section高度 + 120px（圆心在底部以下）
        容器尺寸需要覆盖所有牌的展开范围：宽1200px / 高1100px
        容器中心 = 圆心位置
      */}
      <div style={{
        position: 'absolute',
        left:   'calc(38vw - 600px)',
        bottom: '-120px',
        width:  '1200px',
        height: '1100px',
        pointerEvents: 'none',
      }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
          {CARDS.map((card, i) => (
            <PokerCard
              key={card.rank}
              card={card}
              index={i}
              revealed={revealedCount > i}
              hovered={hovered === i}
              anyHovered={hovered !== null}
              clickedIdx={clicked}
              onHover={setHovered}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>

      {/*
        ── 展签式文字区 ──
        右侧，垂直 45%~55% 之间（与牌花顶端同高区域）
        maxWidth 400px，文字右对齐
      */}
      <div style={{
        position: 'absolute',
        right:  'clamp(24px, 5vw, 80px)',
        top:    '50%',
        transform: textIn
          ? 'translateY(-50%)'
          : 'translateY(-42%)',
        maxWidth: '400px',
        opacity: textIn ? 1 : 0,
        transition: 'opacity 1.0s ease, transform 1.0s ease',
        textAlign: 'right',
      }}>

        {/* 顶部细竖线 */}
        <div style={{
          width: '1px', height: '36px',
          background: 'rgba(0,0,0,0.10)',
          marginLeft: 'auto',
          marginBottom: '20px',
        }} />

        {/* 小标题 */}
        <p style={{
          fontSize: '12px', fontWeight: 600,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.24)',
          fontFamily: 'system-ui, sans-serif',
          marginBottom: '18px',
        }}>Royal Flush · Spades</p>

        {/* 主标题 */}
        <h1 style={{
          fontSize: 'clamp(64px, 6.5vw, 88px)',
          fontWeight: 700,
          fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
          letterSpacing: '-0.045em', lineHeight: 0.95,
          color: 'rgba(8,8,14,0.88)',
          marginBottom: '20px',
        }}>TCwenzhou</h1>

        {/* 一句副标题 */}
        <p style={{
          fontSize: '14px',
          color: 'rgba(0,0,0,0.34)',
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.6,
          letterSpacing: '0.01em',
          marginBottom: '36px',
        }}>
          计算机工程 · 以系统思维探索 AI 与游戏
        </p>

        {/* 按钮组 */}
        <div style={{
          display: 'flex', gap: '12px',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          {/* 主按钮 */}
          <a
            href="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center',
              height: '52px', padding: '0 32px',
              borderRadius: '6px',
              background: 'rgba(8,8,14,0.84)',
              color: 'rgba(255,255,255,0.93)',
              fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: 'system-ui, sans-serif',
            }}
          >进入展厅</a>

          {/* 次按钮 */}
          <a
            href="/about"
            style={{
              display: 'inline-flex', alignItems: 'center',
              height: '52px', padding: '0 26px',
              borderRadius: '6px',
              background: 'transparent',
              color: 'rgba(0,0,0,0.36)',
              fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              fontFamily: 'system-ui, sans-serif',
              border: '1px solid rgba(0,0,0,0.10)',
            }}
          >关于我</a>
        </div>

        {/* 极淡引导语，settle 后延迟出现 */}
        <p style={{
          fontSize: '11px',
          color: 'rgba(0,0,0,0.16)',
          marginTop: '22px',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.04em',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 0.8s ease 1.4s',
        }}>
          ← hover 任意一张牌
        </p>
      </div>

      {/* 手机端适配：牌花缩放 */}
      <style>{`
        @media (max-width: 900px) {
          /* 在窄屏上整体缩小并竖排 */
          section .hero-fan {
            transform: scale(0.6) !important;
            transform-origin: bottom center !important;
          }
        }
        @media (max-width: 640px) {
          section .hero-text {
            right: 16px !important;
            max-width: 100% !important;
            bottom: 24px !important;
            top: auto !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
