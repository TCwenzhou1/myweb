'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── 数据 ────────────────────────────────────────────────────────────────────

const CARDS = [
  { rank: '10', suit: '♠', label: 'Projects', sub: 'AI Systems',   href: '/projects' },
  { rank: 'J',  suit: '♠', label: 'Games',    sub: 'Game Dev',     href: '/games'    },
  { rank: 'Q',  suit: '♠', label: 'Lab',      sub: 'Experiments',  href: '/lab'      },
  { rank: 'K',  suit: '♠', label: 'About',    sub: 'Background',   href: '/about'    },
  { rank: 'A',  suit: '♠', label: 'Contact',  sub: 'Get in Touch', href: '/contact'  },
]

// ─── 扇形几何 ─────────────────────────────────────────────────────────────────
// 真正的极坐标扇形：所有牌共享同一个圆心，以 R 为半径、各自角度展开
//
// 圆心在视口某个点，每张牌的位置 = 圆心 + R * (sin θ, -cos θ)
// 牌自身也旋转 θ 角度
//
// 角度（deg，-90°为朝上，正值顺时针）：
const FAN_DEG = [-58, -30, -4, 22, 48]

// 扇形半径（px）——牌从圆心到牌底中心的距离
const RADIUS = 540

// 圆心在容器中的 x、y（容器是 position:absolute 铺满 section 的）
// 圆心偏左，放在视口下方，让牌花的中心区域出现在画面左中偏下
// 用 vw/vh 会在运行时通过 JS 计算
const CARD_W = 320
const CARD_H = 460

// 每张牌相对于圆心的位置（极坐标→直角）
// x = R * sin(θ),  y = -R * cos(θ)（y 向上为负）
function polarToXY(deg: number, r: number): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180
  return {
    x: r * Math.sin(rad),
    y: -r * Math.cos(rad),
  }
}

const EASE_DEAL = 'cubic-bezier(0.16, 1, 0.30, 1)'

// ─── 单张牌 ──────────────────────────────────────────────────────────────────

interface CardProps {
  card: typeof CARDS[number]
  index: number
  revealed: boolean
  hovered: boolean
  anyHovered: boolean
  clickedIdx: number | null
  phase: string
  onHover: (i: number | null) => void
  onClick: (href: string, i: number) => void
}

const PokerCard = ({
  card, index, revealed, hovered, anyHovered, clickedIdx, phase,
  onHover, onClick,
}: CardProps) => {
  const { rank, suit, label } = card
  const isRoyal = ['J', 'Q', 'K', 'A'].includes(rank)

  const deg = FAN_DEG[index]
  const { x, y } = polarToXY(deg, RADIUS)

  // hover：牌沿自身轴向外"抽出"60px
  const hoverPullX = hovered ? Math.sin((deg * Math.PI) / 180) * 60 : 0
  const hoverPullY = hovered ? -Math.cos((deg * Math.PI) / 180) * 60 : 0

  // 点击
  const myClicked    = clickedIdx === index
  const otherClicked = clickedIdx !== null && !myClicked
  const clickScale   = myClicked ? 1.07 : otherClicked ? 0.90 : 1
  const baseScale    = anyHovered && !hovered ? 0.94 : 1
  const scale        = clickScale * baseScale

  const opacity = anyHovered && !hovered ? 0.50 : 1

  // z-index：中间牌(Q,index=2)最高，越两侧越低；hover 最高
  const zBase  = 10 - Math.abs(index - 2) * 2
  const zIndex = hovered ? 30 : myClicked ? 25 : zBase

  const shadow = hovered
    ? '0 40px 90px rgba(0,0,0,0.22), 0 14px 36px rgba(0,0,0,0.14)'
    : '0 12px 36px rgba(0,0,0,0.11), 0 28px 70px rgba(0,0,0,0.08)'

  // revealed: 展开到最终位置；否则叠在圆心（x=0,y=0）
  const finalX  = revealed ? (x + hoverPullX) : 0
  const finalY  = revealed ? (y + hoverPullY) : 0
  const finalDeg = revealed ? deg : 0

  const dealDelay = index * 155  // 0/155/310/465/620ms

  const transition = revealed
    ? `transform 0.28s ${EASE_DEAL}, opacity 0.20s ease, box-shadow 0.24s ease`
    : `transform 0.78s ${EASE_DEAL} ${dealDelay}ms, opacity 0.55s ease ${dealDelay}ms`

  return (
    <div
      style={{
        position: 'absolute',
        // 以圆心为原点，牌的底部中心对齐圆心
        // left: 圆心 - 半牌宽；top: 圆心 - 牌高（牌底在圆心）
        left: `calc(50% - ${CARD_W / 2}px)`,
        top: `calc(50% - ${CARD_H}px)`,
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        zIndex,
        // 以底部中心为旋转轴
        transformOrigin: '50% 100%',
        transform: `
          translateX(${finalX}px)
          translateY(${finalY}px)
          rotate(${finalDeg}deg)
          scale(${scale})
        `,
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
      {/* ── 牌面 ── */}
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        border: '1.5px solid rgba(0,0,0,0.08)',
        outline: '1px solid rgba(255,255,255,0.75)',
        outlineOffset: '-4px',
        background: `linear-gradient(
          148deg,
          hsl(42, 38%, 99.4%) 0%,
          hsl(38, 22%, 97.2%) 45%,
          hsl(35, 14%, 94.8%) 100%
        )`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 22px',
        boxSizing: 'border-box',
        boxShadow: shadow,
        transition: 'box-shadow 0.28s ease',
      }}>

        {/* 极淡纸张纹理（菱形压纹）*/}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg,
              rgba(0,0,0,0.008) 0, rgba(0,0,0,0.008) 1px,
              transparent 1px, transparent 22px),
            repeating-linear-gradient(-45deg,
              rgba(0,0,0,0.008) 0, rgba(0,0,0,0.008) 1px,
              transparent 1px, transparent 22px)
          `,
          pointerEvents: 'none',
        }} />

        {/* 背景超淡黑桃图腾 */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '260px',
          color: 'rgba(0,0,0,0.018)',
          lineHeight: 1,
          fontFamily: 'serif',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>♠</div>

        {/* 皇家牌：四角极淡菱形 */}
        {isRoyal && [
          { top: '30px', left: '28px' },
          { top: '30px', right: '28px' },
          { bottom: '30px', left: '28px' },
          { bottom: '30px', right: '28px' },
        ].map((pos, i) => (
          <div key={i} aria-hidden style={{
            position: 'absolute', ...pos,
            width: '9px', height: '9px',
            border: '0.75px solid rgba(0,0,0,0.07)',
            transform: 'rotate(45deg)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* 皇家牌：中央细十字装饰线 */}
        {isRoyal && (
          <div aria-hidden style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px', height: '60px',
            pointerEvents: 'none',
          }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '0.5px', background: 'rgba(0,0,0,0.07)', transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '0.5px', background: 'rgba(0,0,0,0.07)', transform: 'translateX(-50%)' }} />
          </div>
        )}

        {/* 左上角：点数 + 花色 */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '4px',
          color: 'rgba(14,14,20,0.80)',
          position: 'relative', zIndex: 1,
        }}>
          <span style={{
            fontSize: rank === '10' ? '34px' : '38px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '20px', lineHeight: 1 }}>{suit}</span>
        </div>

        {/* 中央：大花色 + 入口标签 */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{ width: '36px', height: '0.75px', background: 'rgba(0,0,0,0.09)' }} />
          <span style={{
            fontSize: '100px',
            color: 'rgba(8,8,16,0.42)',
            lineHeight: 1,
            fontFamily: 'serif',
          }}>♠</span>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.20)',
            fontFamily: 'system-ui, sans-serif',
          }}>{label}</span>
          <div style={{ width: '36px', height: '0.75px', background: 'rgba(0,0,0,0.09)' }} />
        </div>

        {/* 右下角：倒置 */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '4px',
          color: 'rgba(14,14,20,0.80)',
          alignSelf: 'flex-end',
          transform: 'rotate(180deg)',
          position: 'relative', zIndex: 1,
        }}>
          <span style={{
            fontSize: rank === '10' ? '34px' : '38px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '20px', lineHeight: 1 }}>{suit}</span>
        </div>

        {/* hover 顶部细高亮线 */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%',
          height: '1.5px',
          borderRadius: '0 0 4px 4px',
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.22), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.20s ease',
        }} />

        {/* hover 牌面整体轻微增亮 */}
        {hovered && (
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.10)',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* hover 底部标签 */}
      <div style={{
        position: 'absolute',
        bottom: '-64px',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.20s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '13px', fontWeight: 700,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.60)',
          fontFamily: 'system-ui, sans-serif',
        }}>{label}</div>
        <div style={{
          fontSize: '11px', color: 'rgba(0,0,0,0.32)',
          marginTop: '4px', fontFamily: 'system-ui, sans-serif',
        }}>{card.sub}</div>
      </div>
    </div>
  )
}

// ─── 主组件 ──────────────────────────────────────────────────────────────────

type Phase = 'prelude' | 'reveal' | 'settle'

export default function HeroCards() {
  const router = useRouter()
  const [phase, setPhase]            = useState<Phase>('prelude')
  const [revealedCount, setRevealed] = useState(0)
  const [textIn, setTextIn]          = useState(false)
  const [hoveredIdx, setHoveredIdx]  = useState<number | null>(null)
  const [clickedIdx, setClickedIdx]  = useState<number | null>(null)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []

    // Prelude 静止 700ms
    t.push(setTimeout(() => setPhase('reveal'), 700))

    // 逐张展开，每张 155ms 错位
    for (let i = 0; i < 5; i++) {
      t.push(setTimeout(() => setRevealed(i + 1), 800 + i * 155))
    }

    // 最后一张展开(800+4*155=1420ms) + 500ms → Settle + 文字入场
    t.push(setTimeout(() => {
      setPhase('settle')
      setTextIn(true)
    }, 1920))

    return () => t.forEach(clearTimeout)
  }, [])

  const handleClick = (href: string, i: number) => {
    setClickedIdx(i)
    setTimeout(() => router.push(href), 380)
  }

  const anyHovered = hoveredIdx !== null

  return (
    /*
      整体方案：
      ─ section 铺满视口（100vh - nav高度），overflow:hidden
      ─ 舞台背景：偏暖白 + 左侧微弱聚光渐变（radial），增加舞台感
      ─ 牌花容器：绝对定位，圆心在视口 40% 宽、60% 高处
        → 牌组整体出现在左中偏下，最外两张自然溢出
      ─ 文字展签：绝对定位，放在右侧 47%~50% 垂直高度，紧贴牌组右侧
      ─ Prelude 极淡标题：左上偏中
    */
    <section style={{
      position: 'relative',
      width: '100%',
      height: 'calc(100vh - 60px)',
      minHeight: '640px',
      overflow: 'hidden',
      // 舞台背景：偏暖白底色
      background: 'hsl(38, 22%, 97.5%)',
      backgroundImage: `
        radial-gradient(ellipse 72% 90% at 36% 62%,
          rgba(200,188,168,0.16) 0%,
          rgba(200,188,168,0.06) 45%,
          transparent 72%),
        radial-gradient(ellipse 40% 50% at 10% 90%,
          rgba(180,170,150,0.10) 0%,
          transparent 60%)
      `,
    }}>

      {/* ── Prelude 标题（左上区域，入场前显示）── */}
      <div style={{
        position: 'absolute',
        top: '7%',
        left: 'clamp(40px, 6vw, 100px)',
        opacity: phase === 'prelude' ? 0.45 : 0,
        transition: 'opacity 1.0s ease',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.38)',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 600,
        }}>Royal Flush &nbsp;·&nbsp; ♠</span>
      </div>

      {/* ── 极淡背景 ♠ 水印（超大，整体氛围）── */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '80vw',
        color: 'rgba(0,0,0,0.011)',
        lineHeight: 1,
        fontFamily: 'serif',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}>♠</div>

      {/* ── 扇形牌花容器 ──
          圆心定义：left = 40vw, top = 62vh
          容器是以圆心为中心点的大方块（足够牌组完整展开）
          section overflow:hidden 负责裁切溢出部分
      ── */}
      <div style={{
        position: 'absolute',
        // 容器本身以圆心为中心定位：宽度 1100px, 高度 800px
        left: 'calc(40vw - 550px)',
        top:  'calc(62vh - 400px)',
        width:  '1100px',
        height: '800px',
        // 容器内以 50%/50% 为圆心
        pointerEvents: 'none',
      }}>
        {/* 真实 pointerEvents 在每张牌上 */}
        <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
          {CARDS.map((card, i) => (
            <PokerCard
              key={card.rank}
              card={card}
              index={i}
              revealed={revealedCount > i}
              hovered={hoveredIdx === i}
              anyHovered={anyHovered}
              clickedIdx={clickedIdx}
              phase={phase}
              onHover={setHoveredIdx}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>

      {/* ── 展签式文字区 ──
          右侧，垂直居中偏下
          与牌花在视觉上靠近（not 完全独立的右栏）
      ── */}
      <div style={{
        position: 'absolute',
        right: 'clamp(28px, 6vw, 100px)',
        top: '50%',
        transform: textIn ? 'translateY(-46%)' : 'translateY(-38%)',
        maxWidth: '260px',
        opacity: textIn ? 1 : 0,
        transition: 'opacity 1.0s ease, transform 1.0s ease',
        textAlign: 'right',
      }}>

        {/* 细竖线（装饰，连接感）*/}
        <div style={{
          width: '1px',
          height: '32px',
          background: 'rgba(0,0,0,0.12)',
          marginLeft: 'auto',
          marginBottom: '18px',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 0.6s ease 0.4s',
        }} />

        {/* 小标题 */}
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.30em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.26)',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 600,
          marginBottom: '16px',
        }}>Royal Flush · Spades</p>

        {/* 主标题 */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 3.8vw, 4.2rem)',
          fontWeight: 700,
          fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
          letterSpacing: '-0.04em',
          color: 'rgba(8,8,14,0.90)',
          lineHeight: 1.0,
          marginBottom: '18px',
        }}>TCwenzhou</h1>

        {/* 一句定位 */}
        <p style={{
          fontSize: '13px',
          color: 'rgba(0,0,0,0.36)',
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.65,
          marginBottom: '28px',
          letterSpacing: '0.01em',
        }}>
          计算机工程 · AI 与游戏开发探索者
        </p>

        {/* 按钮 */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <a href="/projects" style={{
            display: 'inline-block',
            padding: '10px 24px',
            borderRadius: '5px',
            background: 'rgba(8,8,14,0.86)',
            color: 'rgba(255,255,255,0.92)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontFamily: 'system-ui, sans-serif',
            transition: 'background 0.18s ease',
          }}>进入展厅</a>
          <a href="/about" style={{
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '5px',
            background: 'transparent',
            color: 'rgba(0,0,0,0.38)',
            fontSize: '11px',
            fontWeight: 500,
            textDecoration: 'none',
            fontFamily: 'system-ui, sans-serif',
            border: '1px solid rgba(0,0,0,0.11)',
            letterSpacing: '0.03em',
          }}>关于我</a>
        </div>

        {/* 极淡引导语 */}
        <p style={{
          fontSize: '10.5px',
          color: 'rgba(0,0,0,0.18)',
          marginTop: '20px',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.04em',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 0.8s ease 1.2s',
        }}>
          ← hover 任意一张牌
        </p>
      </div>

      {/* ── 手机端降级提示（md 以下显示） ── */}
      <style>{`
        @media (max-width: 768px) {
          .hero-fan-section {
            min-height: 100svh !important;
          }
        }
      `}</style>
    </section>
  )
}
