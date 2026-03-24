'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── 数据 ────────────────────────────────────────────────────────────────────

const CARDS = [
  { rank: '10', suit: '♠', label: 'Projects', sub: 'AI Systems',     href: '/projects' },
  { rank: 'J',  suit: '♠', label: 'Games',    sub: 'Game Dev',       href: '/games'    },
  { rank: 'Q',  suit: '♠', label: 'Lab',      sub: 'Experiments',    href: '/lab'      },
  { rank: 'K',  suit: '♠', label: 'About',    sub: 'Background',     href: '/about'    },
  { rank: 'A',  suit: '♠', label: 'Contact',  sub: 'Get in Touch',   href: '/contact'  },
]

// 最终扇形角度
const FAN = [-42, -22, 0, 22, 42]
// 弧形 Y 偏移（两侧向下，营造手持扇感）
const ARC_Y = [130, 46, 0, 46, 130]

const CARD_W = 220
const CARD_H = 316

const EASE = 'cubic-bezier(0.16, 1, 0.30, 1)'

// ─── 单张牌 ──────────────────────────────────────────────────────────────────

interface CardProps {
  card: typeof CARDS[number]
  index: number
  revealed: boolean   // 该张牌是否已展开
  hovered: boolean
  anyHovered: boolean
  clickedIdx: number | null
  onHover: (i: number | null) => void
  onClick: (href: string, i: number) => void
}

const PokerCard = ({
  card, index,
  revealed, hovered, anyHovered, clickedIdx,
  onHover, onClick,
}: CardProps) => {
  const { rank, suit, label } = card

  const angle = revealed ? FAN[index]   : 0
  const arcY  = revealed ? ARC_Y[index] : 0

  // hover：角度收拢 25%，向外抽出 50px
  const finalAngle = hovered ? angle * 0.25 : angle
  const finalArcY  = hovered ? arcY - 50    : arcY

  // 点击弹出 / 其余退后
  const myClicked    = clickedIdx === index
  const otherClicked = clickedIdx !== null && !myClicked
  const clickScale   = myClicked ? 1.06 : otherClicked ? 0.92 : 1
  const baseScale    = anyHovered && !hovered ? 0.93 : 1
  const scale        = clickScale * baseScale

  // 透明度
  const opacity = anyHovered && !hovered ? 0.52 : 1

  // z-index：中间牌最高，hover / click 优先
  const zBase  = 10 - Math.abs(index - 2) * 2
  const zIndex = hovered ? 30 : myClicked ? 25 : zBase

  // 阴影
  const shadow = hovered
    ? '0 32px 72px rgba(0,0,0,0.18), 0 10px 28px rgba(0,0,0,0.12)'
    : '0 8px 24px rgba(0,0,0,0.10), 0 20px 56px rgba(0,0,0,0.08)'

  // 展开动画：未展开时叠在中心底部、全透明
  const revealDelay = index * 145  // 0 / 145 / 290 / 435 / 580ms

  const transition = revealed
    ? `transform 0.30s ${EASE},
       opacity   0.22s ease,
       box-shadow 0.26s ease`
    : `transform 0.75s ${EASE} ${revealDelay}ms,
       opacity   0.55s ease ${revealDelay}ms`

  const isRoyal = ['J', 'Q', 'K', 'A'].includes(rank)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        marginLeft: `${-CARD_W / 2}px`,
        zIndex,
        transformOrigin: '50% 100%',
        transform: `rotate(${finalAngle}deg) translateY(${finalArcY}px) scale(${scale})`,
        opacity: revealed ? opacity : 0,
        transition,
        cursor: 'pointer',
        userSelect: 'none',
        borderRadius: '16px',
        boxShadow: shadow,
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
        borderRadius: '16px',
        // 双层边框
        border: '1.5px solid rgba(0,0,0,0.09)',
        outline: '1px solid rgba(255,255,255,0.80)',
        outlineOffset: '-3px',
        // 偏暖白、轻微黄调纸张质感
        background: `linear-gradient(
          155deg,
          hsl(40, 30%, 99.2%) 0%,
          hsl(38, 18%, 97.0%) 50%,
          hsl(36, 12%, 95.0%) 100%
        )`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '18px',
        boxSizing: 'border-box',
      }}>

        {/* 极淡菱形压纹 */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg,
              rgba(0,0,0,0.010) 0, rgba(0,0,0,0.010) 1px,
              transparent 1px, transparent 18px),
            repeating-linear-gradient(-45deg,
              rgba(0,0,0,0.010) 0, rgba(0,0,0,0.010) 1px,
              transparent 1px, transparent 18px)
          `,
          pointerEvents: 'none',
        }} />

        {/* 背景大图腾♠（极淡） */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '180px',
          color: 'rgba(0,0,0,0.024)',
          lineHeight: 1,
          fontFamily: 'serif',
          pointerEvents: 'none',
        }}>♠</div>

        {/* 皇家牌：四角装饰小菱形 */}
        {isRoyal && [
          { top: '24px', left: '22px' },
          { top: '24px', right: '22px' },
          { bottom: '24px', left: '22px' },
          { bottom: '24px', right: '22px' },
        ].map((pos, i) => (
          <div key={i} aria-hidden style={{
            position: 'absolute', ...pos,
            width: '7px', height: '7px',
            border: '0.75px solid rgba(0,0,0,0.08)',
            transform: 'rotate(45deg)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* 左上角：点数 + 花色 */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '3px',
          color: 'rgba(16,16,22,0.82)',
          position: 'relative', zIndex: 1,
        }}>
          <span style={{
            fontSize: rank === '10' ? '26px' : '28px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '16px', lineHeight: 1 }}>{suit}</span>
        </div>

        {/* 中央：大花色 + 入口标签 */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          position: 'relative', zIndex: 1,
        }}>
          {/* 装饰线 */}
          <div style={{ width: '32px', height: '0.75px', background: 'rgba(0,0,0,0.10)' }} />
          <span style={{
            fontSize: '72px',
            color: 'rgba(10,10,18,0.55)',
            lineHeight: 1,
            fontFamily: 'serif',
          }}>♠</span>
          {/* 入口标签（极克制） */}
          <span style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.22)',
            fontFamily: 'system-ui, sans-serif',
          }}>{label}</span>
          <div style={{ width: '32px', height: '0.75px', background: 'rgba(0,0,0,0.10)' }} />
        </div>

        {/* 右下角：倒置 */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '3px',
          color: 'rgba(16,16,22,0.82)',
          alignSelf: 'flex-end',
          transform: 'rotate(180deg)',
          position: 'relative', zIndex: 1,
        }}>
          <span style={{
            fontSize: rank === '10' ? '26px' : '28px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '16px', lineHeight: 1 }}>{suit}</span>
        </div>

        {/* hover 顶部高亮边 */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px',
          borderRadius: '16px 16px 0 0',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.28), rgba(0,0,0,0.06))',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.20s ease',
        }} />
      </div>

      {/* hover 底部标签浮出 */}
      <div style={{
        position: 'absolute',
        bottom: '-52px',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.20s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '12px', fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.65)',
          fontFamily: 'system-ui, sans-serif',
        }}>{label}</div>
        <div style={{
          fontSize: '10px', color: 'rgba(0,0,0,0.35)',
          marginTop: '3px', fontFamily: 'system-ui, sans-serif',
        }}>{card.sub}</div>
      </div>
    </div>
  )
}

// ─── 主组件 ──────────────────────────────────────────────────────────────────

type Phase = 'prelude' | 'reveal' | 'settle'

export default function HeroCards() {
  const router = useRouter()
  const [phase, setPhase]             = useState<Phase>('prelude')
  const [revealedCount, setRevealed]  = useState(0)
  const [textIn, setTextIn]           = useState(false)
  const [hoveredIdx, setHoveredIdx]   = useState<number | null>(null)
  const [clickedIdx, setClickedIdx]   = useState<number | null>(null)

  useEffect(() => {
    // Prelude: 静止 800ms
    // Reveal:  800ms 后逐张展开
    // Settle:  最后一张展开 500ms 后文字入场
    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(setTimeout(() => setPhase('reveal'), 800))

    for (let i = 0; i < 5; i++) {
      timers.push(setTimeout(() => setRevealed(i + 1), 900 + i * 145))
    }

    // 900 + 4*145 + 500 = 1980ms 文字入场
    timers.push(setTimeout(() => {
      setPhase('settle')
      setTextIn(true)
    }, 1980))

    return () => timers.forEach(clearTimeout)
  }, [])

  const handleClick = (href: string, i: number) => {
    setClickedIdx(i)
    setTimeout(() => router.push(href), 380)
  }

  const anyHovered = hoveredIdx !== null

  return (
    /*
      整个 section 是 100vh，overflow hidden
      牌花锚点在左下区域，牌会溢出边界
      文字展签在右下区域
    */
    <section style={{
      position: 'relative',
      width: '100%',
      height: 'calc(100vh - 60px)',
      minHeight: '600px',
      overflow: 'hidden',
      // 偏暖白背景
      background: 'hsl(38, 20%, 98%)',
      backgroundImage: `
        radial-gradient(ellipse 90% 80% at 28% 70%,
          rgba(210, 200, 180, 0.18) 0%,
          transparent 65%)
      `,
    }}>

      {/* ── Prelude 阶段：顶部中央极淡标题 ── */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: phase === 'prelude' ? 0.50 : 0,
        transition: 'opacity 0.8s ease',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.35)',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 600,
        }}>Royal Flush &nbsp;·&nbsp; ♠</span>
      </div>

      {/* ── 扇形牌花 ──
          锚点：距左边 38vw，距底部 -60px（让牌稍微穿出底部）
          容器高度足够大，让牌溢出时不被裁掉（依靠 section overflow:hidden）
      ── */}
      <div style={{
        position: 'absolute',
        left: '38vw',
        bottom: '-60px',
        width: `${CARD_W}px`,
        height: `${CARD_H + ARC_Y[0] + 80}px`,   // 牌高 + 最大弧形偏移 + 余量
        transform: 'translateX(-50%)',
      }}>
        {CARDS.map((card, i) => (
          <PokerCard
            key={card.rank}
            card={card}
            index={i}
            revealed={revealedCount > i}
            hovered={hoveredIdx === i}
            anyHovered={anyHovered}
            clickedIdx={clickedIdx}
            onHover={setHoveredIdx}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* ── 展签式文字区（右下角） ── */}
      <div style={{
        position: 'absolute',
        right: 'clamp(32px, 8vw, 120px)',
        bottom: 'clamp(60px, 10vh, 140px)',
        maxWidth: '280px',
        opacity: textIn ? 1 : 0,
        transform: textIn ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
        textAlign: 'right',
      }}>

        {/* 展签小标题 */}
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.28)',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 600,
          marginBottom: '14px',
        }}>Royal Flush · Spades</p>

        {/* 名字 */}
        <h1 style={{
          fontSize: 'clamp(2.6rem, 4vw, 4rem)',
          fontWeight: 700,
          fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
          letterSpacing: '-0.04em',
          color: 'rgba(10,10,16,0.90)',
          lineHeight: 1.0,
          marginBottom: '14px',
        }}>TCwenzhou</h1>

        {/* 一句定位 */}
        <p style={{
          fontSize: '14px',
          color: 'rgba(0,0,0,0.40)',
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}>
          计算机工程 · AI 与游戏开发探索者
        </p>

        {/* 细线 */}
        <div style={{
          width: '24px',
          height: '1px',
          background: 'rgba(0,0,0,0.14)',
          marginLeft: 'auto',
          marginBottom: '24px',
        }} />

        {/* 按钮 */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <a href="/projects" style={{
            display: 'inline-block',
            padding: '10px 22px',
            borderRadius: '6px',
            background: 'rgba(10,10,16,0.88)',
            color: 'rgba(255,255,255,0.92)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontFamily: 'system-ui, sans-serif',
          }}>进入展厅</a>
          <a href="/about" style={{
            display: 'inline-block',
            padding: '10px 18px',
            borderRadius: '6px',
            background: 'transparent',
            color: 'rgba(0,0,0,0.42)',
            fontSize: '12px',
            fontWeight: 500,
            textDecoration: 'none',
            fontFamily: 'system-ui, sans-serif',
            border: '1px solid rgba(0,0,0,0.12)',
          }}>关于我</a>
        </div>

        {/* 极淡引导语 */}
        <p style={{
          fontSize: '11px',
          color: 'rgba(0,0,0,0.20)',
          marginTop: '22px',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.04em',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 0.8s ease 1s',
        }}>
          ← hover 任意一张牌
        </p>
      </div>
    </section>
  )
}
