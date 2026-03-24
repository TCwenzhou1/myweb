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

// ─── 扇形角度 ─────────────────────────────────────────────────────────────────
// K 为主中心牌（-20°，接近竖直但微右倾）
// 10♠ 最左出血，A♠ 最右
// 整体向右打开，像一手牌
const FAN_ANGLES = [-50, -40, -30, -20, -10]  // 10 J Q K A

// 单牌尺寸
const CARD_W = 360
const CARD_H = 530

// 花色色值：偏墨灰，不用纯黑
const INK = 'rgba(18,14,22,0.76)'
const INK_DIM = 'rgba(18,14,22,0.58)'

const EASE_REVEAL = 'cubic-bezier(0.12, 0.98, 0.28, 1)'
const EASE_HOVER  = 'cubic-bezier(0.34, 1.52, 0.64, 1)'

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

  // hover：沿牌面朝向抽出 64px
  const rad   = (angle * Math.PI) / 180
  const pullX = hovered ? Math.sin(rad) * 64 : 0
  const pullY = hovered ? -Math.cos(rad) * 64 : 0

  // z-index：K(index=3) 最前，依次递减；A 比 10 更靠前（向右展开，右侧在上）
  const zBase = [4, 8, 12, 18, 14][index]
  const myClicked    = clickedIdx === index
  const otherClicked = clickedIdx !== null && !myClicked
  const zIndex = hovered ? 50 : (myClicked ? 45 : zBase)

  const scale   = (myClicked ? 1.04 : otherClicked ? 0.87 : 1) *
                  (anyHovered && !hovered ? 0.93 : 1)
  const opacity = anyHovered && !hovered ? 0.42 : 1

  // 收藏级阴影：三层，更柔和
  const shadow = hovered
    ? '0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.10), 0 40px 80px rgba(0,0,0,0.14), 0 70px 120px rgba(0,0,0,0.08)'
    : '0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.08), 0 24px 60px rgba(0,0,0,0.10), 0 50px 100px rgba(0,0,0,0.06)'

  const tr = revealed ? angle : 0
  const tx = revealed ? pullX : 0
  const ty = revealed ? pullY : 0

  const delay = index * 150  // 0/150/300/450/600ms

  const transition = revealed
    ? `transform 0.30s ${EASE_HOVER}, opacity 0.22s ease, box-shadow 0.28s ease`
    : `transform 0.92s ${EASE_REVEAL} ${delay}ms, opacity 0.65s ease ${delay}ms`

  return (
    <div
      style={{
        position: 'absolute',
        left:   `calc(50% - ${CARD_W / 2}px)`,
        bottom: '0',
        width:  `${CARD_W}px`,
        height: `${CARD_H}px`,
        zIndex,
        transformOrigin: '50% 100%',
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
      {/* ── 牌面容器 ── */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '18px',
        // 外层边框：极淡暖灰
        border: '1px solid rgba(20,16,10,0.09)',
        position: 'relative',
        boxShadow: shadow,
        transition: 'box-shadow 0.30s ease',
      }}>
        {/* 内层边框（用内部 div 模拟，因为 outline 在旋转时有渲染 bug） */}
        <div style={{
          position: 'absolute', inset: '4px',
          borderRadius: '14px',
          border: '0.75px solid rgba(255,255,255,0.72)',
          pointerEvents: 'none', zIndex: 3,
        }} />

        {/* 牌底：偏暖白渐变 */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '18px',
          overflow: 'hidden',
          background: `linear-gradient(
            148deg,
            hsl(46, 50%, 99.2%)   0%,
            hsl(42, 28%, 97.6%)  38%,
            hsl(38, 18%, 95.8%)  72%,
            hsl(34, 12%, 94.0%) 100%
          )`,
        }}>

          {/* 纸纹：极淡菱格暗纹 */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              repeating-linear-gradient( 45deg, rgba(0,0,0,0.0045) 0, rgba(0,0,0,0.0045) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(-45deg, rgba(0,0,0,0.0045) 0, rgba(0,0,0,0.0045) 1px, transparent 1px, transparent 20px)
            `,
          }} />

          {/* 极淡纸面光晕：左上角亮斑 */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,252,240,0.55) 0%, transparent 65%)',
          }} />

          {/* 中央黑桃图腾（比上版再淡 25%） */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '260px', lineHeight: 1,
            color: 'rgba(14,10,18,0.013)',
            fontFamily: 'serif', userSelect: 'none',
          }}>♠</div>

          {/* 皇家牌四角菱形 */}
          {isRoyal && [
            { top: '30px',    left: '26px'   },
            { top: '30px',    right: '26px'  },
            { bottom: '30px', left: '26px'   },
            { bottom: '30px', right: '26px'  },
          ].map((pos, ki) => (
            <div key={ki} aria-hidden style={{
              position: 'absolute', ...pos,
              width: '8px', height: '8px',
              border: '0.75px solid rgba(0,0,0,0.065)',
              transform: 'rotate(45deg)', pointerEvents: 'none',
            }} />
          ))}

          {/* 皇家牌中央十字细线 */}
          {isRoyal && (
            <div aria-hidden style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '64px', height: '64px', pointerEvents: 'none',
            }}>
              <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'0.5px', background:'rgba(0,0,0,0.048)', transform:'translateY(-50%)' }} />
              <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'0.5px', background:'rgba(0,0,0,0.048)', transform:'translateX(-50%)' }} />
            </div>
          )}

          {/* ── 左上角 ── */}
          <div style={{
            position: 'absolute',
            top: `${is10 ? 22 : 26}px`,
            left: '26px',
            display: 'flex', flexDirection: 'column', gap: '4px',
            zIndex: 2,
          }}>
            <span style={{
              fontSize: is10 ? '36px' : '42px',
              fontWeight: 700,
              fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
              letterSpacing: '-0.035em', lineHeight: 1,
              color: INK,
            }}>{rank}</span>
            <span style={{
              fontSize: '22px', lineHeight: 1,
              color: INK_DIM,
              fontFamily: 'serif',
            }}>{suit}</span>
          </div>

          {/* ── 中央区域 ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
            zIndex: 2,
          }}>
            <div style={{ width: '40px', height: '0.5px', background: 'rgba(0,0,0,0.065)' }} />
            <span style={{
              fontSize: '120px', lineHeight: 1,
              color: 'rgba(12,8,18,0.32)',
              fontFamily: 'serif',
            }}>♠</span>
            <span style={{
              fontSize: '10.5px', fontWeight: 700,
              letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.14)',
              fontFamily: 'system-ui, sans-serif',
            }}>{label}</span>
            <div style={{ width: '40px', height: '0.5px', background: 'rgba(0,0,0,0.065)' }} />
          </div>

          {/* ── 右下角（倒置） ── */}
          <div style={{
            position: 'absolute',
            bottom: `${is10 ? 22 : 26}px`,
            right: '26px',
            display: 'flex', flexDirection: 'column', gap: '4px',
            transform: 'rotate(180deg)',
            zIndex: 2,
          }}>
            <span style={{
              fontSize: is10 ? '36px' : '42px',
              fontWeight: 700,
              fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
              letterSpacing: '-0.035em', lineHeight: 1,
              color: INK,
            }}>{rank}</span>
            <span style={{
              fontSize: '22px', lineHeight: 1,
              color: INK_DIM,
              fontFamily: 'serif',
            }}>{suit}</span>
          </div>

          {/* hover 顶部光泽线 */}
          <div style={{
            position: 'absolute', top: 0, left: '16%', right: '16%',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, rgba(255,252,244,0.90), transparent)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.22s ease',
            pointerEvents: 'none', zIndex: 4,
          }} />

          {/* hover 整体增亮 */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '18px',
            background: 'rgba(255,253,246,0.06)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.22s ease', pointerEvents: 'none', zIndex: 4,
          }} />
        </div>
      </div>

      {/* hover 底部展签标注 */}
      <div style={{
        position: 'absolute', bottom: '-62px', left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap', textAlign: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.22s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '11.5px', fontWeight: 700,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.46)',
          fontFamily: 'system-ui, sans-serif',
        }}>{label}</div>
        <div style={{
          fontSize: '10.5px', color: 'rgba(0,0,0,0.22)',
          marginTop: '3px',
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
    // 500ms 静默后，牌花开始逐张 reveal
    t.push(setTimeout(() => setPhase('reveal'), 500))
    for (let i = 0; i < 5; i++) {
      t.push(setTimeout(() => setR(i + 1), 600 + i * 150))
    }
    // 600 + 4×150 = 1200ms，+520ms settle → 1720ms 文字入场
    t.push(setTimeout(() => { setPhase('settle'); setTextIn(true) }, 1720))
    return () => t.forEach(clearTimeout)
  }, [])

  const handleClick = (href: string, i: number) => {
    setClicked(i)
    setTimeout(() => router.push(href), 380)
  }

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 64px)',
        minHeight: '640px',
        overflow: 'hidden',
        // 暖白基底：约等于 #F6F3EE
        backgroundColor: 'hsl(40, 22%, 96.5%)',
        backgroundImage: [
          // 极淡纸纹（加密度）
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.022'/%3E%3C/svg%3E")`,
          // 牌花区域聚光：左下暖灰雾
          'radial-gradient(ellipse 72% 88% at 24% 80%, rgba(185,172,150,0.22) 0%, rgba(185,172,150,0.08) 48%, transparent 72%)',
          // 画面右侧极淡暖光
          'radial-gradient(ellipse 42% 52% at 78% 48%, rgba(215,210,198,0.10) 0%, transparent 58%)',
          // 底部地面层（增加纵深）
          'linear-gradient(to top, rgba(148,138,122,0.14) 0%, transparent 14%)',
          // 顶部极淡渐变（防止割裂）
          'linear-gradient(to bottom, rgba(230,225,215,0.06) 0%, transparent 12%)',
        ].join(','),
      }}
    >
      {/* ── 背景大 ♠ 雾影（极淡，仅为氛围层） ── */}
      <div aria-hidden style={{
        position: 'absolute',
        left: '-4vw', bottom: '-10vh',
        fontSize: '68vw', lineHeight: 1,
        color: 'rgba(0,0,0,0.008)',
        fontFamily: 'serif',
        pointerEvents: 'none', userSelect: 'none',
        zIndex: 0,
      }}>♠</div>

      {/* ── Prelude 展签（牌出场前预示） ── */}
      <div style={{
        position: 'absolute',
        top: '6.5%',
        left: 'clamp(24px, 4vw, 64px)',
        opacity: phase === 'stack' ? 0.32 : 0,
        transition: 'opacity 1.2s ease',
        pointerEvents: 'none', zIndex: 1,
      }}>
        <span style={{
          fontSize: '10.5px', fontWeight: 600,
          letterSpacing: '0.40em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.26)',
          fontFamily: 'system-ui, sans-serif',
        }}>Royal Flush &nbsp;·&nbsp; ♠ Spades</span>
      </div>

      {/*
        ── 扇形牌花容器 ──

        构图目标：
        - 牌花视觉中心压在左侧 35%，页面高度 65% 附近
        - 10♠ 和 J♠ 向左出血到屏幕边缘
        - K♠ 作为中心牌，稍右倾（-20°）
        - A♠ 最右倾（-10°）

        几何：
        - 圆心（容器底部中点）= 视口 35% 横坐标，底部上 4%
        - CARD_H=530, 最大角度 50°
        - 横向最大偏移 ≈ 530 × sin(50°) ≈ 406px
        - 容器宽约 1000px（两侧各 500px），高 620px
        - 容器 left = 35vw - 500px
      */}
      <div
        className="hero-fan"
        style={{
          position: 'absolute',
          left: 'calc(35vw - 500px)',
          bottom: '4%',
          width:  '1000px',
          height: '620px',
          zIndex: 2,
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
        右侧 right: 5vw，垂直 top: 50%，与 K 牌顶端同高
        maxWidth 420px，文字右对齐
      */}
      <div
        className="hero-text"
        style={{
          position: 'absolute',
          right:  'clamp(18px, 5vw, 80px)',
          top:    '50%',
          transform: textIn ? 'translateY(-54%)' : 'translateY(-46%)',
          maxWidth: '420px',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16,1,0.30,1), transform 1.2s cubic-bezier(0.16,1,0.30,1)',
          textAlign: 'right',
          zIndex: 3,
        }}
      >
        {/* 顶部竖线 */}
        <div style={{
          width: '1px', height: '44px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.12), rgba(0,0,0,0.06))',
          marginLeft: 'auto',
          marginBottom: '24px',
        }} />

        {/* 小标题 */}
        <p style={{
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.36em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.20)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          marginBottom: '14px',
        }}>Royal Flush &nbsp;·&nbsp; Spades</p>

        {/* 主标题 */}
        <h1 style={{
          fontSize: 'clamp(72px, 7.2vw, 100px)',
          fontWeight: 700,
          fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
          letterSpacing: '-0.048em', lineHeight: 0.91,
          color: 'rgba(6,5,10,0.88)',
          marginBottom: '20px',
        }}>TCwenzhou</h1>

        {/* 一句副标题（单行） */}
        <p style={{
          fontSize: '13.5px',
          color: 'rgba(0,0,0,0.30)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1.5,
          letterSpacing: '0.01em',
          marginBottom: '36px',
          whiteSpace: 'nowrap',
        }}>
          计算机工程、系统实践与 AI / 游戏探索
        </p>

        {/* 按钮组 */}
        <div style={{
          display: 'flex', gap: '10px',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
          {/* 主 CTA：深墨黑，圆角 14px */}
          <a
            href="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '54px', padding: '0 34px',
              borderRadius: '14px',
              background: 'rgba(6,5,10,0.87)',
              color: 'rgba(255,253,248,0.94)',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'background 0.20s ease, transform 0.16s ease',
              boxShadow: '0 2px 12px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.10)',
            }}
          >进入展厅</a>

          {/* 次按钮：极轻描边，克制 */}
          <a
            href="/about"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '54px', padding: '0 26px',
              borderRadius: '14px',
              background: 'transparent',
              color: 'rgba(0,0,0,0.28)',
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              border: '1px solid rgba(0,0,0,0.09)',
              transition: 'border-color 0.18s ease, color 0.18s ease',
            }}
          >关于我</a>
        </div>

        {/* 极淡引导语 */}
        <p style={{
          fontSize: '10.5px',
          color: 'rgba(0,0,0,0.13)',
          marginTop: '22px',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.04em',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 1.0s ease 1.8s',
        }}>
          ← hover 任意一张牌探索
        </p>
      </div>

      {/* 响应式 */}
      <style>{`
        @media (max-width: 1200px) {
          .hero-fan {
            transform: scale(0.80) !important;
            transform-origin: bottom center !important;
          }
        }
        @media (max-width: 960px) {
          .hero-fan {
            transform: scale(0.62) !important;
            transform-origin: bottom center !important;
            left: calc(50% - 500px) !important;
          }
          .hero-text {
            right: 50% !important;
            transform: translateX(50%) translateY(0) !important;
            top: auto !important;
            bottom: 18px !important;
            text-align: center !important;
            max-width: 380px !important;
          }
          .hero-text p:last-child { display: none !important; }
        }
        @media (max-width: 580px) {
          .hero-fan {
            transform: scale(0.46) !important;
            transform-origin: bottom center !important;
            left: calc(50% - 500px) !important;
          }
          .hero-text h1 { font-size: 56px !important; }
          .hero-text p { white-space: normal !important; }
        }
      `}</style>
    </section>
  )
}
