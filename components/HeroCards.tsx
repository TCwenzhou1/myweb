'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── 牌组数据 ───────────────────────────────────────────────────────────────

const CARDS = [
  { rank: '10', suit: '♠', label: 'Projects', href: '/projects' },
  { rank: 'J',  suit: '♠', label: 'Games',    href: '/games'    },
  { rank: 'Q',  suit: '♠', label: 'Lab',      href: '/lab'      },
  { rank: 'K',  suit: '♠', label: 'About',    href: '/about'    },
  { rank: 'A',  suit: '♠', label: 'Contact',  href: '/contact'  },
]

// ─── 扇形角度（收藏级海报风格）────────────────────────────────────────────────
// 10♠ -52deg（左倾，露35%）
// J♠  -30deg（中左倾，露48%）
// Q♠  -12deg（微左倾，露58%）
// K♠   +8deg（主中心牌，露82%）
// A♠  +26deg（右倾，露44%）
const FAN_ANGLES = [-52, -30, -12, 8, 26]

// z-index：K 最前，向两侧递减
const Z_BASE = [3, 8, 13, 20, 15]

// 单牌尺寸（基准）：缩小至收藏级比例
const CARD_W = 272
const CARD_H = 400

// K 牌微放大作为主视觉
const K_SCALE = 1.03

// 花色色值：偏墨灰，非纯黑
const INK     = 'rgba(22,18,28,0.72)'
const INK_DIM = 'rgba(22,18,28,0.52)'

const EASE_REVEAL = 'cubic-bezier(0.08, 0.98, 0.16, 1)'
const EASE_HOVER  = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

// ─── 单张收藏牌 ─────────────────────────────────────────────────────────────

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
  const { rank, suit, label } = card
  const isRoyal = ['J', 'Q', 'K', 'A'].includes(rank)
  const is10    = rank === '10'
  const isK     = rank === 'K'

  const angle = FAN_ANGLES[index]
  const baseScale = isK ? K_SCALE : 1.0

  // hover 沿牌面朝向抽出
  const rad   = (angle * Math.PI) / 180
  const pullX = hovered ? Math.sin(rad) * 42 : 0
  const pullY = hovered ? -Math.cos(rad) * 42 : 0

  const myClicked    = clickedIdx === index
  const otherClicked = clickedIdx !== null && !myClicked
  const zIndex = hovered ? 50 : (myClicked ? 45 : Z_BASE[index])

  const hoverScale   = hovered ? 1.025 : 1
  const clickScale   = myClicked ? 1.04 : (otherClicked ? 0.90 : 1)
  const dimScale     = anyHovered && !hovered ? 0.92 : 1
  const finalScale   = baseScale * hoverScale * clickScale * dimScale

  const opacity = anyHovered && !hovered ? 0.35 : 1

  const shadow = hovered
    ? '0 2px 8px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.10), 0 40px 80px rgba(0,0,0,0.08)'
    : '0 1px 3px rgba(0,0,0,0.03), 0 6px 20px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.05)'

  const tr = revealed ? angle : 0
  const tx = revealed ? pullX : 0
  const ty = revealed ? pullY : 0

  // 依次错时展开：每张 140ms 间隔，reveal 质感
  const delay = index * 140

  const transition = revealed
    ? `transform 0.26s ${EASE_HOVER}, opacity 0.18s ease, box-shadow 0.24s ease`
    : `transform 1.1s ${EASE_REVEAL} ${delay}ms, opacity 0.80s ease ${delay}ms`

  return (
    <div
      style={{
        position:  'absolute',
        left:      `calc(50% - ${CARD_W / 2}px)`,
        bottom:    '0',
        width:     `${CARD_W}px`,
        height:    `${CARD_H}px`,
        zIndex,
        transformOrigin: '50% 100%',
        transform: `translateX(${tx}px) translateY(${ty}px) rotate(${tr}deg) scale(${finalScale})`,
        opacity:   revealed ? opacity : 0,
        transition,
        cursor:    'pointer',
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
        borderRadius: '16px',
        border: '1px solid rgba(24,20,14,0.08)',
        position: 'relative',
        boxShadow: shadow,
        transition: 'box-shadow 0.26s ease',
      }}>
        {/* 内层细边框（双层效果） */}
        <div style={{
          position: 'absolute', inset: '5px',
          borderRadius: '12px',
          border: '0.75px solid rgba(255,252,248,0.78)',
          pointerEvents: 'none', zIndex: 3,
        }} />

        {/* 牌底：暖白渐变 */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '16px',
          overflow: 'hidden',
          background: `linear-gradient(
            152deg,
            hsl(40, 38%, 99.0%)   0%,
            hsl(38, 26%, 97.2%)  36%,
            hsl(36, 18%, 95.4%)  68%,
            hsl(34, 12%, 93.8%) 100%
          )`,
        }}>

          {/* 纸纹：极淡菱格暗纹 */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              repeating-linear-gradient( 45deg, rgba(0,0,0,0.0038) 0, rgba(0,0,0,0.0038) 1px, transparent 1px, transparent 22px),
              repeating-linear-gradient(-45deg, rgba(0,0,0,0.0038) 0, rgba(0,0,0,0.0038) 1px, transparent 1px, transparent 22px)
            `,
          }} />

          {/* 纸面光晕：左上角亮斑 */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 72% 52% at 26% 18%, rgba(255,252,240,0.55) 0%, transparent 62%)',
          }} />

          {/* 中央黑桃图腾（更淡，仅为暗纹）—— 再淡20-30% */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '220px', lineHeight: 1,
            color: 'rgba(14,10,18,0.009)',
            fontFamily: 'serif', userSelect: 'none',
          }}>♠</div>

          {/* 皇家牌四角菱形装饰 */}
          {isRoyal && [
            { top: '26px',    left: '22px'   },
            { top: '26px',    right: '22px'  },
            { bottom: '26px', left: '22px'   },
            { bottom: '26px', right: '22px'  },
          ].map((pos, ki) => (
            <div key={ki} aria-hidden style={{
              position: 'absolute', ...pos,
              width: '6px', height: '6px',
              border: '0.75px solid rgba(0,0,0,0.05)',
              transform: 'rotate(45deg)', pointerEvents: 'none',
            }} />
          ))}

          {/* 皇家牌中央十字细线 */}
          {isRoyal && (
            <div aria-hidden style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '52px', height: '52px', pointerEvents: 'none',
            }}>
              <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'0.5px', background:'rgba(0,0,0,0.038)', transform:'translateY(-50%)' }} />
              <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'0.5px', background:'rgba(0,0,0,0.038)', transform:'translateX(-50%)' }} />
            </div>
          )}

          {/* ── 左上角 ── */}
          <div style={{
            position: 'absolute',
            top:  `${is10 ? 20 : 24}px`,
            left: '22px',
            display: 'flex', flexDirection: 'column', gap: '3px',
            zIndex: 2,
          }}>
            <span style={{
              fontSize: is10 ? '32px' : '38px',
              fontWeight: 700,
              fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
              letterSpacing: '-0.04em', lineHeight: 1,
              color: INK,
            }}>{rank}</span>
            <span style={{
              fontSize: '18px', lineHeight: 1,
              color: INK_DIM,
              fontFamily: 'serif',
            }}>{suit}</span>
          </div>

          {/* ── 中央区域 ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            zIndex: 2,
          }}>
            <div style={{ width: '32px', height: '0.5px', background: 'rgba(0,0,0,0.05)' }} />
            <span style={{
              fontSize: '100px', lineHeight: 1,
              color: 'rgba(12,8,18,0.26)',
              fontFamily: 'serif',
            }}>♠</span>
            <span style={{
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.11)',
              fontFamily: 'system-ui, sans-serif',
            }}>{label}</span>
            <div style={{ width: '32px', height: '0.5px', background: 'rgba(0,0,0,0.05)' }} />
          </div>

          {/* ── 右下角（倒置） ── */}
          <div style={{
            position: 'absolute',
            bottom: `${is10 ? 20 : 24}px`,
            right:  '22px',
            display: 'flex', flexDirection: 'column', gap: '3px',
            transform: 'rotate(180deg)',
            zIndex: 2,
          }}>
            <span style={{
              fontSize: is10 ? '32px' : '38px',
              fontWeight: 700,
              fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
              letterSpacing: '-0.04em', lineHeight: 1,
              color: INK,
            }}>{rank}</span>
            <span style={{
              fontSize: '18px', lineHeight: 1,
              color: INK_DIM,
              fontFamily: 'serif',
            }}>{suit}</span>
          </div>

          {/* hover 顶部光泽线 */}
          <div style={{
            position: 'absolute', top: 0, left: '18%', right: '18%',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, rgba(255,252,244,0.95), transparent)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.18s ease',
            pointerEvents: 'none', zIndex: 4,
          }} />

          {/* hover 整体增亮 */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '16px',
            background: 'rgba(255,253,246,0.04)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.18s ease', pointerEvents: 'none', zIndex: 4,
          }} />
        </div>
      </div>
    </div>
  )
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

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
    // 牌先出现
    t.push(setTimeout(() => setPhase('reveal'), 400))
    // 牌花依次展开
    for (let i = 0; i < 5; i++) {
      t.push(setTimeout(() => setR(i + 1), 500 + i * 140))
    }
    // 最后标题与按钮显现（reveal 质感）
    t.push(setTimeout(() => { setPhase('settle'); setTextIn(true) }, 500 + 4 * 140 + 500))
    return () => t.forEach(clearTimeout)
  }, [])

  const handleClick = (href: string, i: number) => {
    setClicked(i)
    setTimeout(() => router.push(href), 340)
  }

  return (
    <section
      style={{
        position: 'relative',
        width:  '100%',
        height: 'calc(100vh - 64px)',
        minHeight: '680px',
        overflow: 'hidden',
        // 暖白基底 #F6F4F0
        backgroundColor: '#F6F4F0',
        backgroundImage: [
          // 极轻纸纹
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E")`,
          // 牌花背后淡暖灰雾（集中在左侧）
          'radial-gradient(ellipse 55% 75% at 28% 64%, rgba(168,154,132,0.22) 0%, rgba(168,154,132,0.08) 48%, transparent 70%)',
          // 右侧极淡暖光
          'radial-gradient(ellipse 38% 48% at 72% 44%, rgba(210,205,193,0.08) 0%, transparent 54%)',
          // 底部地面层
          'linear-gradient(to top, rgba(140,130,118,0.10) 0%, transparent 14%)',
          // 顶部渐变
          'linear-gradient(to bottom, rgba(224,218,208,0.04) 0%, transparent 10%)',
        ].join(','),
      }}
    >
      {/* ── 背景大 ♠ 雾影（极淡氛围层，不能抢主体） ── */}
      <div aria-hidden style={{
        position: 'absolute',
        left: '-6vw', bottom: '-14vh',
        fontSize: '72vw', lineHeight: 1,
        color: 'rgba(0,0,0,0.006)',
        fontFamily: 'serif',
        pointerEvents: 'none', userSelect: 'none',
        zIndex: 0,
      }}>♠</div>

      {/*
        ── 扇形牌花容器 ──
        ★ 视觉中心：左侧 35%，页面高度 65%
        ★ 整体尺寸收藏级比例
      */}
      <div
        className="hero-fan"
        style={{
          position: 'absolute',
          // 牌花视觉中心压左侧35%，高度65%
          left:   'calc(35vw - 380px)',
          bottom: '6%',
          width:  '760px',
          height: '480px',
          zIndex: 2,
        }}
      >
        {/* 椭圆地面阴影 */}
        <div aria-hidden style={{
          position: 'absolute',
          bottom: '-12px',
          left:   '50%',
          transform: 'translateX(-50%)',
          width:  '480px',
          height: '34px',
          background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(72,54,36,0.14) 0%, rgba(72,54,36,0.05) 48%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

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
        ★ 靠近牌花右侧，像题签/展签
        ★ 主标题 88-104px，全大写拉开字距
      */}
      <div
        className="hero-text"
        style={{
          position: 'absolute',
          // 靠近牌花右侧
          right:  'clamp(40px, 7vw, 100px)',
          top:    '50%',
          transform: textIn ? 'translateY(-50%)' : 'translateY(-42%)',
          maxWidth: '380px',
          opacity: textIn ? 1 : 0,
          // reveal 质感动画
          transition: 'opacity 1.4s cubic-bezier(0.12,1,0.24,1), transform 1.4s cubic-bezier(0.12,1,0.24,1)',
          textAlign: 'right',
          zIndex: 3,
        }}
      >
        {/* 顶部竖线（展签细节） */}
        <div style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.10), rgba(0,0,0,0.04))',
          marginLeft: 'auto',
          marginBottom: '18px',
        }} />

        {/* 小标题：全大写，字距明显拉开 */}
        <p style={{
          fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.42em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.16)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          marginBottom: '14px',
        }}>Royal Flush · Spades</p>

        {/* 主标题：88-104px，展陈感 */}
        <h1 style={{
          fontSize: 'clamp(72px, 8.5vw, 104px)',
          fontWeight: 700,
          fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
          letterSpacing: '-0.04em', lineHeight: 0.88,
          color: 'rgba(8,6,12,0.86)',
          marginBottom: '20px',
        }}>TCwenzhou</h1>

        {/* 副标题（单行） */}
        <p style={{
          fontSize: '13px',
          color: 'rgba(0,0,0,0.26)',
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
          display: 'flex', gap: '12px',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
          {/* 主 CTA：品牌首页风格，深墨黑底 */}
          <a
            href="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '54px', padding: '0 36px',
              borderRadius: '14px',
              background: 'rgba(8,6,12,0.88)',
              color: 'rgba(255,253,248,0.94)',
              fontSize: '10.5px', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'background 0.18s ease, transform 0.14s ease, box-shadow 0.18s ease',
              boxShadow: '0 2px 10px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(8,6,12,0.94)'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.10)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(8,6,12,0.88)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)'
            }}
          >进入展厅</a>

          {/* 次按钮：更轻、更薄、更克制 */}
          <a
            href="/about"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '54px', padding: '0 28px',
              borderRadius: '14px',
              background: 'transparent',
              color: 'rgba(0,0,0,0.24)',
              fontSize: '10.5px', fontWeight: 500,
              letterSpacing: '0.06em',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              border: '1px solid rgba(0,0,0,0.07)',
              transition: 'border-color 0.16s ease, color 0.16s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.14)'
              e.currentTarget.style.color = 'rgba(0,0,0,0.38)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'
              e.currentTarget.style.color = 'rgba(0,0,0,0.24)'
            }}
          >关于我</a>
        </div>
      </div>

      {/* 响应式 */}
      <style>{`
        @media (max-width: 1280px) {
          .hero-fan {
            transform: scale(0.88) !important;
            transform-origin: bottom center !important;
          }
        }
        @media (max-width: 1024px) {
          .hero-fan {
            transform: scale(0.72) !important;
            transform-origin: bottom center !important;
          }
          .hero-text {
            right: 50% !important;
            transform: translateX(50%) translateY(0) !important;
            top: auto !important;
            bottom: 18px !important;
            text-align: center !important;
            max-width: 360px !important;
          }
          .hero-text div { justify-content: center !important; }
        }
        @media (max-width: 640px) {
          .hero-fan {
            transform: scale(0.52) !important;
            transform-origin: bottom center !important;
            left: calc(50% - 380px) !important;
          }
          .hero-text h1 { font-size: 56px !important; }
        }
      `}</style>
    </section>
  )
}