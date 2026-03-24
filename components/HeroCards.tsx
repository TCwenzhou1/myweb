'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── 牌组数据 ───────────────────────────────────────────────────────────────

const CARDS = [
  { rank: '10', suit: '♠', label: 'Projects', sub: 'AI Systems',   href: '/projects' },
  { rank: 'J',  suit: '♠', label: 'Games',    sub: 'Game Dev',     href: '/games'    },
  { rank: 'Q',  suit: '♠', label: 'Lab',      sub: 'Experiments',  href: '/lab'      },
  { rank: 'K',  suit: '♠', label: 'About',    sub: 'Background',   href: '/about'    },
  { rank: 'A',  suit: '♠', label: 'Contact',  sub: 'Get in Touch', href: '/contact'  },
]

// ─── 扇形几何参数 ─────────────────────────────────────────────────────────────
//
// 策略：以"牌底中心"为旋转锚点，统一转动 rotate(θ)
// transformOrigin: '50% 100%'  ← 以牌底中心为扇形圆心
//
// 角度 0° = 牌面朝上（竖直），正值 = 顺时针
// 10♠(-30°) … A♠(+10°)，整体偏左，向右展开
//
const FAN_ANGLES = [-30, -20, -10, 0, 10]  // 10 J Q K A

// 单牌尺寸（桌面端）
const CARD_W = 360
const CARD_H = 520

const EASE_DEAL  = 'cubic-bezier(0.16, 1, 0.30, 1)'
const EASE_HOVER = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

// ─── 单张牌 ──────────────────────────────────────────────────────────────────

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

  const angle = FAN_ANGLES[index]

  // hover 时沿牌面朝向抽出 60px（沿旋转方向上方）
  const rad   = (angle * Math.PI) / 180
  const pullX = hovered ? Math.sin(rad) * 60 : 0
  const pullY = hovered ? -Math.cos(rad) * 60 : 0

  // z-index：K 在最前，两侧递减；hover 时最高
  const zBase  = 20 - Math.abs(index - 3) * 3
  const myClicked    = clickedIdx === index
  const otherClicked = clickedIdx !== null && !myClicked
  const zIndex = hovered ? 50 : (myClicked ? 40 : zBase)

  const scale = (myClicked ? 1.05 : otherClicked ? 0.88 : 1) *
                (anyHovered && !hovered ? 0.94 : 1)
  const opacity = anyHovered && !hovered ? 0.45 : 1

  const shadow = hovered
    ? '0 60px 120px rgba(0,0,0,0.22), 0 20px 50px rgba(0,0,0,0.14)'
    : '0 18px 48px rgba(0,0,0,0.11), 0 36px 90px rgba(0,0,0,0.08)'

  // 展开时：以牌底为圆心旋转到目标角度，再施加 hover 偏移
  const tr = revealed ? angle : 0
  const tx = revealed ? pullX : 0
  const ty = revealed ? pullY : 0

  const delay = index * 145  // 0/145/290/435/580ms

  const transition = revealed
    ? `transform 0.28s ${EASE_HOVER}, opacity 0.20s ease, box-shadow 0.24s ease`
    : `transform 0.85s ${EASE_DEAL} ${delay}ms, opacity 0.6s ease ${delay}ms`

  return (
    <div
      style={{
        position: 'absolute',
        // 所有牌底部中心对齐容器底部中心（扇形圆心）
        left:   `calc(50% - ${CARD_W / 2}px)`,
        bottom: '0',
        width:  `${CARD_W}px`,
        height: `${CARD_H}px`,
        zIndex,
        transformOrigin: '50% 100%',  // 以牌底中心为旋转轴
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
        borderRadius: '20px',
        // 双层边框：外框极淡黑、内框极淡白
        border:        '1.5px solid rgba(0,0,0,0.08)',
        outline:       '1.5px solid rgba(255,255,255,0.75)',
        outlineOffset: '-5px',
        // 偏暖白渐变：左上最亮，右下微暗
        background: `
          linear-gradient(
            155deg,
            hsl(45, 45%, 99.5%)  0%,
            hsl(40, 25%, 97.5%) 45%,
            hsl(35, 15%, 95.2%) 100%
          )
        `,
        boxShadow: shadow,
        transition: 'box-shadow 0.28s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `${is10 ? 24 : 28}px 26px`,
        boxSizing: 'border-box',
      }}>

        {/* 纸纹：极淡菱形网格 */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient( 45deg, rgba(0,0,0,0.006) 0, rgba(0,0,0,0.006) 1px, transparent 1px, transparent 22px),
            repeating-linear-gradient(-45deg, rgba(0,0,0,0.006) 0, rgba(0,0,0,0.006) 1px, transparent 1px, transparent 22px)
          `,
        }} />

        {/* 中央黑桃图腾（超淡，不抢主位） */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '280px', lineHeight: 1,
          color: 'rgba(0,0,0,0.018)',
          fontFamily: 'serif', userSelect: 'none',
        }}>♠</div>

        {/* 皇家牌四角菱形装饰 */}
        {isRoyal && [
          { top: '32px',    left: '28px'   },
          { top: '32px',    right: '28px'  },
          { bottom: '32px', left: '28px'   },
          { bottom: '32px', right: '28px'  },
        ].map((pos, ki) => (
          <div key={ki} aria-hidden style={{
            position: 'absolute', ...pos,
            width: '9px', height: '9px',
            border: '0.75px solid rgba(0,0,0,0.07)',
            transform: 'rotate(45deg)', pointerEvents: 'none',
          }} />
        ))}

        {/* 皇家牌中央十字细线 */}
        {isRoyal && (
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '68px', height: '68px', pointerEvents: 'none',
          }}>
            <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'0.5px', background:'rgba(0,0,0,0.055)', transform:'translateY(-50%)' }} />
            <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'0.5px', background:'rgba(0,0,0,0.055)', transform:'translateX(-50%)' }} />
          </div>
        )}

        {/* ── 左上角：牌面数字 + 花色 ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '5px',
          color: 'rgba(10,10,16,0.80)', position: 'relative', zIndex: 2,
        }}>
          <span style={{
            fontSize: is10 ? '38px' : '44px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.03em', lineHeight: 1,
          }}>{rank}</span>
          <span style={{
            fontSize: '24px', lineHeight: 1,
            color: 'rgba(10,10,16,0.75)',
            fontFamily: 'serif',
          }}>{suit}</span>
        </div>

        {/* ── 中央区域：大黑桃 + label ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{ width: '44px', height: '0.75px', background: 'rgba(0,0,0,0.07)' }} />
          <span style={{
            fontSize: '130px', lineHeight: 1,
            color: 'rgba(6,6,14,0.36)',
            fontFamily: 'serif',
          }}>♠</span>
          <span style={{
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.16)',
            fontFamily: 'system-ui, sans-serif',
          }}>{label}</span>
          <div style={{ width: '44px', height: '0.75px', background: 'rgba(0,0,0,0.07)' }} />
        </div>

        {/* ── 右下角（倒置） ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '5px',
          color: 'rgba(10,10,16,0.80)',
          alignSelf: 'flex-end', transform: 'rotate(180deg)',
          position: 'relative', zIndex: 2,
        }}>
          <span style={{
            fontSize: is10 ? '38px' : '44px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.03em', lineHeight: 1,
          }}>{rank}</span>
          <span style={{
            fontSize: '24px', lineHeight: 1,
            color: 'rgba(10,10,16,0.75)',
            fontFamily: 'serif',
          }}>{suit}</span>
        </div>

        {/* hover 顶部光线 */}
        <div style={{
          position: 'absolute', top: 0, left: '18%', right: '18%',
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.15), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.20s ease',
          pointerEvents: 'none',
        }} />

        {/* hover 增亮层 */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '20px',
          background: 'rgba(255,255,255,0.07)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.20s ease', pointerEvents: 'none',
        }} />
      </div>

      {/* hover 底部 label（牌下方显示） */}
      <div style={{
        position: 'absolute', bottom: '-66px', left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap', textAlign: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.20s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '12px', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.52)',
          fontFamily: 'system-ui, sans-serif',
        }}>{label}</div>
        <div style={{
          fontSize: '11px', color: 'rgba(0,0,0,0.26)',
          marginTop: '4px',
          fontFamily: 'system-ui, sans-serif',
        }}>{sub}</div>
      </div>
    </div>
  )
}

// ─── 主组件 ──────────────────────────────────────────────────────────────────

type Phase = 'stack' | 'reveal' | 'settle'

export default function HeroCards() {
  const router                = useRouter()
  const [phase, setPhase]     = useState<Phase>('stack')
  const [revealedCount, setR] = useState(0)
  const [textIn, setTextIn]   = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [clicked, setClicked] = useState<number | null>(null)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    // 600ms 后开始逐张展开
    t.push(setTimeout(() => setPhase('reveal'), 600))
    for (let i = 0; i < 5; i++) {
      t.push(setTimeout(() => setR(i + 1), 700 + i * 145))
    }
    // 最后一张展开 700+4×145=1280ms，再等 480ms 落定 → 1760ms
    t.push(setTimeout(() => { setPhase('settle'); setTextIn(true) }, 1760))
    return () => t.forEach(clearTimeout)
  }, [])

  const handleClick = (href: string, i: number) => {
    setClicked(i)
    setTimeout(() => router.push(href), 360)
  }

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 64px)',
        minHeight: '620px',
        overflow: 'hidden',
        background: 'hsl(40, 20%, 97%)',
        backgroundImage: [
          // 牌花区域：左侧暖灰聚光（增强舞台感）
          'radial-gradient(ellipse 70% 85% at 28% 75%, rgba(190,178,158,0.20) 0%, rgba(190,178,158,0.08) 50%, transparent 75%)',
          // 文字区域：极淡暖光
          'radial-gradient(ellipse 45% 55% at 75% 50%, rgba(210,206,196,0.09) 0%, transparent 60%)',
          // 底部地面感
          'linear-gradient(to top, rgba(155,145,130,0.12) 0%, transparent 16%)',
        ].join(','),
      }}
    >
      {/* ── 背景 ♠ 水印（极淡，仅营造氛围，不能代替扑克牌） ── */}
      <div aria-hidden style={{
        position: 'absolute',
        left: '-5vw', bottom: '-8vh',
        fontSize: '70vw', lineHeight: 1,
        color: 'rgba(0,0,0,0.009)',
        fontFamily: 'serif',
        pointerEvents: 'none', userSelect: 'none',
      }}>♠</div>

      {/* ── Prelude 预告文字（进场前短暂出现） ── */}
      <div style={{
        position: 'absolute',
        top: '7%',
        left: 'clamp(28px, 4.5vw, 72px)',
        opacity: phase === 'stack' ? 0.38 : 0,
        transition: 'opacity 1.0s ease',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.36em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.30)',
          fontFamily: 'system-ui, sans-serif',
        }}>Royal Flush &nbsp;·&nbsp; ♠ Spades</span>
      </div>

      {/*
        ── 扇形牌花容器 ──
        构图：圆心（扇形旋转轴）放在容器底部中央
        容器定位：left = 视口左侧约 20%，bottom = 视口高 8%
        这样牌展开后：
          - K（0°）竖直朝上，牌顶在容器顶部
          - 10（-30°）偏左
          - A（+10°）偏右
          - 整组牌花占据左侧约 55% 首屏区域

        容器宽度：覆盖所有牌展开后的横向范围
        CARD_W=360, CARD_H=520, 最大角度 ±30°
        横向最大偏移 ≈ 520 × sin(30°) = 260px，两侧各 360/2+260 ≈ 440px
        → 容器宽 ≈ 880px，高 ≈ CARD_H + 额外空间 ≈ 600px
      */}
      <div
        className="hero-fan"
        style={{
          position: 'absolute',
          // 容器圆心（底部中点）横向位置 = 视口 32% 处
          left: 'calc(32vw - 440px)',
          // 容器底部距视口底部
          bottom: '6%',
          width:  '880px',
          height: '580px',
          // 不要在这里设 pointerEvents:none，牌本身需要交互
        }}
      >
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

      {/*
        ── 展签式文字区 ──
        右侧，垂直居中，贴近牌花顶端区域
        right: 4~6vw，top: 48%（稍偏上，与 K 牌顶端同高区域）
      */}
      <div
        className="hero-text"
        style={{
          position: 'absolute',
          right:  'clamp(20px, 5vw, 80px)',
          top:    '50%',
          transform: textIn ? 'translateY(-52%)' : 'translateY(-44%)',
          maxWidth: '400px',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 1.1s ease, transform 1.1s ease',
          textAlign: 'right',
        }}
      >
        {/* 顶部竖线装饰 */}
        <div style={{
          width: '1px', height: '40px',
          background: 'rgba(0,0,0,0.10)',
          marginLeft: 'auto',
          marginBottom: '22px',
        }} />

        {/* 小标题 */}
        <p style={{
          fontSize: '12px', fontWeight: 600,
          letterSpacing: '0.30em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.22)',
          fontFamily: 'system-ui, sans-serif',
          marginBottom: '16px',
        }}>Royal Flush · Spades</p>

        {/* 主标题 */}
        <h1 style={{
          fontSize: 'clamp(62px, 6.2vw, 86px)',
          fontWeight: 700,
          fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
          letterSpacing: '-0.046em', lineHeight: 0.93,
          color: 'rgba(7,7,13,0.88)',
          marginBottom: '18px',
        }}>TCwenzhou</h1>

        {/* 一句副标题 */}
        <p style={{
          fontSize: '14px',
          color: 'rgba(0,0,0,0.32)',
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.65,
          letterSpacing: '0.015em',
          marginBottom: '34px',
        }}>
          计算机工程 · 以系统思维探索 AI 与游戏
        </p>

        {/* 按钮组 */}
        <div style={{
          display: 'flex', gap: '10px',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <a
            href="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center',
              height: '52px', padding: '0 32px',
              borderRadius: '5px',
              background: 'rgba(7,7,13,0.84)',
              color: 'rgba(255,255,255,0.92)',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.10em', textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: 'system-ui, sans-serif',
              transition: 'background 0.18s ease',
            }}
          >进入展厅</a>
          <a
            href="/about"
            style={{
              display: 'inline-flex', alignItems: 'center',
              height: '52px', padding: '0 24px',
              borderRadius: '5px',
              background: 'transparent',
              color: 'rgba(0,0,0,0.34)',
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              fontFamily: 'system-ui, sans-serif',
              border: '1px solid rgba(0,0,0,0.10)',
            }}
          >关于我</a>
        </div>

        {/* 极淡引导语 */}
        <p style={{
          fontSize: '11px',
          color: 'rgba(0,0,0,0.15)',
          marginTop: '20px',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.04em',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 0.9s ease 1.6s',
        }}>
          ← hover 任意一张牌探索
        </p>
      </div>

      {/* 响应式适配 */}
      <style>{`
        /* 中等屏幕（平板/小桌面）缩小牌花 */
        @media (max-width: 1100px) {
          .hero-fan {
            transform: scale(0.78) !important;
            transform-origin: bottom center !important;
          }
        }
        @media (max-width: 820px) {
          .hero-fan {
            transform: scale(0.58) !important;
            transform-origin: bottom center !important;
            left: calc(50% - 440px) !important;
          }
          .hero-text {
            right: 50% !important;
            transform: translateX(50%) translateY(0) !important;
            top: auto !important;
            bottom: 16px !important;
            text-align: center !important;
            max-width: 360px !important;
          }
        }
        @media (max-width: 540px) {
          .hero-fan {
            transform: scale(0.46) !important;
            transform-origin: bottom center !important;
            left: calc(50% - 440px) !important;
          }
        }
      `}</style>
    </section>
  )
}
