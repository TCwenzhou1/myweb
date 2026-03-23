'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── 常量 ────────────────────────────────────────────────────────────────────

const CARDS = [
  { rank: '10', suit: '♠', label: 'Projects', sub: 'AI Systems & Engineering',  href: '/projects' },
  { rank: 'J',  suit: '♠', label: 'Games',    sub: 'Game Dev & Playable Works', href: '/games'    },
  { rank: 'Q',  suit: '♠', label: 'Lab',      sub: 'Experiments & Demos',       href: '/lab'      },
  { rank: 'K',  suit: '♠', label: 'About',    sub: 'Background & Direction',    href: '/about'    },
  { rank: 'A',  suit: '♠', label: 'Contact',  sub: 'Get in Touch',              href: '/contact'  },
]

// 最终扇形：以牌组底部锚点为原点旋转
const FAN_ANGLE = [-32, -16, 0, 16, 32]   // 度
const FAN_ARC   = [72, 26, 0, 26, 72]     // px，弧形 Y 偏移（越两侧越低）

// 过渡曲线
const EASE_CARD = 'cubic-bezier(0.16, 1, 0.3, 1)'

// ─── 牌面纹样：皇家牌极淡装饰线 ─────────────────────────────────────────────

const RoyalAccent = ({ rank }: { rank: string }) => {
  const isRoyal = ['J', 'Q', 'K', 'A'].includes(rank)
  if (!isRoyal) return null
  return (
    <>
      {/* 上下装饰横线组 */}
      {[true, false].map((isTop) => (
        <div
          key={String(isTop)}
          aria-hidden
          style={{
            position: 'absolute',
            [isTop ? 'top' : 'bottom']: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            pointerEvents: 'none',
          }}
        >
          <div style={{ width: '36px', height: '0.5px', background: 'rgba(0,0,0,0.09)' }} />
          <div style={{ width: '20px', height: '0.5px', background: 'rgba(0,0,0,0.06)' }} />
        </div>
      ))}
      {/* 四角极小菱形装饰 */}
      {[
        { top: '22px', left: '18px' },
        { top: '22px', right: '18px' },
        { bottom: '22px', left: '18px' },
        { bottom: '22px', right: '18px' },
      ].map((pos, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            ...pos,
            width: '5px',
            height: '5px',
            border: '0.5px solid rgba(0,0,0,0.08)',
            transform: 'rotate(45deg)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  )
}

// ─── 单张扑克牌 ──────────────────────────────────────────────────────────────

type Phase = 'prelude' | 'reveal' | 'settle'

interface CardProps {
  card: typeof CARDS[number]
  index: number
  phase: Phase
  /** 当前已展开到第几张（用于顺序展开判断） */
  revealedCount: number
  hovered: boolean
  anyHovered: boolean
  clickedIdx: number | null
  onHover: (i: number | null) => void
  onCardClick: (href: string, i: number) => void
}

const PokerCard = ({
  card, index, phase, revealedCount,
  hovered, anyHovered, clickedIdx,
  onHover, onCardClick,
}: CardProps) => {
  const { rank, suit, label, sub } = card
  const opened = revealedCount > index

  // ── 变换计算 ──
  const angle = opened ? FAN_ANGLE[index] : 0
  const arcY  = opened ? FAN_ARC[index]   : 0

  // hover 效果：角度收拢 30%，向上抽出 42px
  const finalAngle = hovered ? angle * 0.30 : angle
  const finalArcY  = hovered ? arcY - 42    : arcY

  // click：弹出
  const clickedScale = clickedIdx === index ? 1.07 : clickedIdx !== null ? 0.93 : 1
  // 非 hover 时其余牌退后
  const baseScale = anyHovered && !hovered ? 0.94 : 1
  const scale = clickedScale * baseScale

  const opacity = phase === 'prelude'
    ? 0.18   // 仅显示轮廓
    : opened
      ? anyHovered && !hovered ? 0.55 : 1
      : 0.18  // 未展开的牌保持淡轮廓

  const zBase  = 5 - Math.abs(index - 2)
  const zIndex = hovered ? 20 : clickedIdx === index ? 15 : zBase

  const shadow = hovered
    ? '0 28px 60px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.10)'
    : opened
      ? '0 6px 20px rgba(0,0,0,0.08), 0 14px 40px rgba(0,0,0,0.06)'
      : '0 2px 8px rgba(0,0,0,0.06)'

  // Reveal 阶段：逐张展开 delay
  const revealDelay = index * 150

  const transition = phase !== 'prelude' && opened
    ? `transform 0.32s ${EASE_CARD},
       opacity   0.26s ease,
       box-shadow 0.28s ease`
    : `transform 0.72s ${EASE_CARD} ${revealDelay}ms,
       opacity   0.56s ease ${revealDelay}ms`

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        width: '168px',
        height: '240px',
        marginLeft: '-84px',
        zIndex,
        transformOrigin: '50% 100%',
        transform: `rotate(${finalAngle}deg) translateY(${finalArcY}px) scale(${scale})`,
        opacity,
        transition,
        cursor: opened ? 'pointer' : 'default',
        borderRadius: '14px',
        boxShadow: shadow,
        userSelect: 'none',
      }}
      onMouseEnter={() => opened && onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => opened && onCardClick(card.href, index)}
    >
      {/* ── 牌面主体 ── */}
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '14px',
        // 双层边框
        border: '1.5px solid rgba(0,0,0,0.095)',
        outline: '1px solid rgba(0,0,0,0.035)',
        outlineOffset: '-1px',
        // 偏暖白 + 轻微纹理感渐变
        background: `linear-gradient(
          160deg,
          hsl(36,20%,99.5%) 0%,
          hsl(36,14%,97%) 55%,
          hsl(36,10%,95%) 100%
        )`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '14px',
        boxSizing: 'border-box',
      }}>

        {/* 菱形压纹背景 */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg,
              rgba(0,0,0,0.011) 0, rgba(0,0,0,0.011) 1px,
              transparent 1px, transparent 14px),
            repeating-linear-gradient(-45deg,
              rgba(0,0,0,0.011) 0, rgba(0,0,0,0.011) 1px,
              transparent 1px, transparent 14px)
          `,
          borderRadius: '14px',
          pointerEvents: 'none',
        }} />

        {/* 极淡中央图腾黑桃 */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '120px',
          lineHeight: 1,
          color: 'rgba(0,0,0,0.028)',
          pointerEvents: 'none',
          fontFamily: 'serif',
        }}>♠</div>

        {/* 皇家牌装饰纹样 */}
        <RoyalAccent rank={rank} />

        {/* 左上角 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          color: 'rgba(18,18,22,0.80)',
          position: 'relative',
          zIndex: 1,
        }}>
          <span style={{
            fontSize: rank === '10' ? '21px' : '23px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '13px', lineHeight: 1 }}>{suit}</span>
        </div>

        {/* 中央花色区 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ width: '24px', height: '0.75px', background: 'rgba(0,0,0,0.10)' }} />
          <span style={{
            fontSize: '56px',
            lineHeight: 1,
            color: 'rgba(12,12,18,0.58)',
            fontFamily: 'serif',
          }}>♠</span>
          <span style={{
            fontSize: '8px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.24)',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
          }}>{label}</span>
          <div style={{ width: '24px', height: '0.75px', background: 'rgba(0,0,0,0.10)' }} />
        </div>

        {/* 右下角（倒置） */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          color: 'rgba(18,18,22,0.80)',
          alignSelf: 'flex-end',
          transform: 'rotate(180deg)',
          position: 'relative',
          zIndex: 1,
        }}>
          <span style={{
            fontSize: rank === '10' ? '21px' : '23px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '13px', lineHeight: 1 }}>{suit}</span>
        </div>

        {/* hover 顶部高光线 */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1.5px',
          borderRadius: '14px 14px 0 0',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.08) 100%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }} />
      </div>

      {/* hover 时底部浮出标签 */}
      <div style={{
        position: 'absolute',
        bottom: '-48px',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.22s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.68)',
          fontFamily: 'system-ui, sans-serif',
        }}>{label}</div>
        <div style={{
          fontSize: '9px',
          color: 'rgba(0,0,0,0.35)',
          marginTop: '3px',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.04em',
        }}>{sub}</div>
      </div>
    </div>
  )
}

// ─── 主组件 ──────────────────────────────────────────────────────────────────

export default function HeroCards() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('prelude')
  const [revealedCount, setRevealedCount] = useState(0)
  const [settleVisible, setSettleVisible] = useState(false)
  const [hoveredIdx, setHoveredIdx]       = useState<number | null>(null)
  const [clickedIdx, setClickedIdx]       = useState<number | null>(null)

  useEffect(() => {
    // ── Phase 1: Prelude（0~900ms）──
    // 什么都不做，只显示淡轮廓

    // ── Phase 2: Reveal（900ms~1950ms）──
    // 牌按顺序一张张展开
    const t1 = setTimeout(() => setPhase('reveal'), 900)

    const cardTimers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < 5; i++) {
      cardTimers.push(
        setTimeout(() => setRevealedCount(i + 1), 1000 + i * 155)
      )
    }

    // ── Phase 3: Settle（最后一张展开后 400ms）──
    const t2 = setTimeout(() => {
      setPhase('settle')
      setSettleVisible(true)
    }, 1000 + 4 * 155 + 400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      cardTimers.forEach(clearTimeout)
    }
  }, [])

  const handleCardClick = (href: string, i: number) => {
    setClickedIdx(i)
    setTimeout(() => router.push(href), 380)
  }

  const anyHovered = hoveredIdx !== null

  return (
    <section style={{
      minHeight: 'calc(100vh - 60px)',
      background: 'hsl(36, 18%, 98.5%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 48px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── 背景：极淡的放射渐变，增加展厅感 ── */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 35% 55%,
            rgba(220,215,200,0.22) 0%,
            transparent 70%)
        `,
        pointerEvents: 'none',
      }} />

      {/* ── 主内容区 ── */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        flexWrap: 'wrap',
        position: 'relative',
      }}>

        {/* ── 左侧：扇形牌花（主角） ── */}
        <div style={{
          flex: '0 0 60%',
          minWidth: '340px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          // 容器高度 = 牌高240 + 最大弧Y偏移72 + hover抬升空间50 + 标签48
          height: '420px',
          position: 'relative',
        }}>
          {/* Prelude 阶段：ROYAL FLUSH 小标题 */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: phase === 'prelude' ? 0.55 : 0,
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}>
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.38)',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 600,
            }}>
              Royal Flush &nbsp;·&nbsp; ♠
            </span>
          </div>

          {/* 5 张牌 */}
          {CARDS.map((card, i) => (
            <PokerCard
              key={card.rank}
              card={card}
              index={i}
              phase={phase}
              revealedCount={revealedCount}
              hovered={hoveredIdx === i}
              anyHovered={anyHovered}
              clickedIdx={clickedIdx}
              onHover={setHoveredIdx}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        {/* ── 右侧：展签式信息区 ── */}
        <div style={{
          flex: '1 1 280px',
          padding: '0 0 0 56px',
          opacity: settleVisible ? 1 : 0,
          transform: settleVisible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>

          {/* 展签标题 */}
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.30)',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
            marginBottom: '20px',
          }}>
            Royal Flush &nbsp;·&nbsp; ♠
          </p>

          {/* 姓名 */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 3.5vw, 3.6rem)',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
            letterSpacing: '-0.04em',
            color: 'rgba(12,12,18,0.88)',
            lineHeight: 1.05,
            marginBottom: '20px',
          }}>
            TCwenzhou
          </h1>

          {/* 竖排定位文字，像展览说明 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            marginBottom: '36px',
          }}>
            {[
              '计算机工程学生',
              'AI 项目学习者',
              '游戏开发探索者',
            ].map((line) => (
              <p key={line} style={{
                fontSize: '14px',
                color: 'rgba(0,0,0,0.42)',
                fontFamily: 'system-ui, sans-serif',
                lineHeight: 1.6,
                margin: 0,
              }}>{line}</p>
            ))}
          </div>

          {/* 细分割线 */}
          <div style={{
            width: '28px',
            height: '1px',
            background: 'rgba(0,0,0,0.14)',
            marginBottom: '30px',
          }} />

          {/* 按钮组 */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="/projects"
              style={{
                display: 'inline-block',
                padding: '10px 22px',
                borderRadius: '6px',
                background: 'rgba(12,12,18,0.86)',
                color: 'rgba(255,255,255,0.92)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              进入展厅
            </a>
            <a
              href="/about"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: '6px',
                background: 'transparent',
                color: 'rgba(0,0,0,0.45)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                fontFamily: 'system-ui, sans-serif',
                border: '1px solid rgba(0,0,0,0.12)',
              }}
            >
              关于我
            </a>
          </div>

          {/* 极淡引导语 */}
          <p style={{
            fontSize: '11px',
            color: 'rgba(0,0,0,0.22)',
            marginTop: '28px',
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '0.04em',
            opacity: settleVisible && revealedCount >= 5 ? 1 : 0,
            transition: 'opacity 0.7s ease 0.6s',
          }}>
            ← hover 牌面，点击进入各板块
          </p>
        </div>
      </div>
    </section>
  )
}
