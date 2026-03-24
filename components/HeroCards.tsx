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

// ─── 扇形角度（第一处核心改动）────────────────────────────────────────────────
// 10♠ -54°（大幅左倾，仅露 32%）
// J♠  -32°（中等左倾，露 44%）
// Q♠  -14°（微左倾，露 55%）
// K♠   +6°（主中心牌，微右倾）
// A♠  +24°（右倾，露 42%）
const FAN_ANGLES = [-54, -32, -14, 6, 24]

// z-index：K 最前，向两侧递减，体现"一手牌"层次
// 10:3  J:8  Q:13  K:20  A:15
const Z_BASE = [3, 8, 13, 20, 15]

// 单牌尺寸（基准）
const CARD_W = 358
const CARD_H = 528

// K 牌比其他牌大 8%
const K_SCALE = 1.08

// 花色色值：偏墨灰
const INK     = 'rgba(18,14,22,0.76)'
const INK_DIM = 'rgba(18,14,22,0.56)'

const EASE_REVEAL = 'cubic-bezier(0.10, 0.96, 0.24, 1)'
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
  const { rank, suit, label } = card
  const isRoyal = ['J', 'Q', 'K', 'A'].includes(rank)
  const is10    = rank === '10'
  const isK     = rank === 'K'

  const angle = FAN_ANGLES[index]
  const baseScale = isK ? K_SCALE : 1.0

  // hover：沿牌面朝向抽出 60px
  const rad   = (angle * Math.PI) / 180
  const pullX = hovered ? Math.sin(rad) * 60 : 0
  const pullY = hovered ? -Math.cos(rad) * 60 : 0

  const myClicked    = clickedIdx === index
  const otherClicked = clickedIdx !== null && !myClicked
  const zIndex = hovered ? 50 : (myClicked ? 45 : Z_BASE[index])

  const hoverScale   = hovered ? 1.03 : 1
  const clickScale   = myClicked ? 1.04 : (otherClicked ? 0.88 : 1)
  const dimScale     = anyHovered && !hovered ? 0.94 : 1
  const finalScale   = baseScale * hoverScale * clickScale * dimScale

  const opacity = anyHovered && !hovered ? 0.40 : 1

  const shadow = hovered
    ? '0 2px 6px rgba(0,0,0,0.05), 0 14px 36px rgba(0,0,0,0.12), 0 44px 88px rgba(0,0,0,0.15), 0 72px 128px rgba(0,0,0,0.08)'
    : '0 1px 3px rgba(0,0,0,0.03), 0 8px 26px rgba(0,0,0,0.08), 0 26px 64px rgba(0,0,0,0.10), 0 52px 108px rgba(0,0,0,0.06)'

  const tr = revealed ? angle : 0
  const tx = revealed ? pullX : 0
  const ty = revealed ? pullY : 0

  // 依次错时展开：10→J→Q→K→A，每张 160ms 间隔
  const delay = index * 160

  const transition = revealed
    ? `transform 0.28s ${EASE_HOVER}, opacity 0.20s ease, box-shadow 0.26s ease`
    : `transform 1.0s ${EASE_REVEAL} ${delay}ms, opacity 0.70s ease ${delay}ms`

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
        borderRadius: '18px',
        border: '1px solid rgba(20,16,10,0.09)',
        position: 'relative',
        boxShadow: shadow,
        transition: 'box-shadow 0.28s ease',
      }}>
        {/* 内层边框 */}
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
              repeating-linear-gradient( 45deg, rgba(0,0,0,0.0042) 0, rgba(0,0,0,0.0042) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(-45deg, rgba(0,0,0,0.0042) 0, rgba(0,0,0,0.0042) 1px, transparent 1px, transparent 20px)
            `,
          }} />

          {/* 极淡纸面光晕：左上角亮斑 */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 78% 58% at 28% 20%, rgba(255,252,240,0.50) 0%, transparent 64%)',
          }} />

          {/* 中央黑桃图腾（极淡，仅为暗纹） */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '250px', lineHeight: 1,
            color: 'rgba(14,10,18,0.013)',
            fontFamily: 'serif', userSelect: 'none',
          }}>♠</div>

          {/* 皇家牌四角菱形 */}
          {isRoyal && [
            { top: '28px',    left: '24px'   },
            { top: '28px',    right: '24px'  },
            { bottom: '28px', left: '24px'   },
            { bottom: '28px', right: '24px'  },
          ].map((pos, ki) => (
            <div key={ki} aria-hidden style={{
              position: 'absolute', ...pos,
              width: '7px', height: '7px',
              border: '0.75px solid rgba(0,0,0,0.06)',
              transform: 'rotate(45deg)', pointerEvents: 'none',
            }} />
          ))}

          {/* 皇家牌中央十字细线 */}
          {isRoyal && (
            <div aria-hidden style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '60px', height: '60px', pointerEvents: 'none',
            }}>
              <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'0.5px', background:'rgba(0,0,0,0.045)', transform:'translateY(-50%)' }} />
              <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'0.5px', background:'rgba(0,0,0,0.045)', transform:'translateX(-50%)' }} />
            </div>
          )}

          {/* ── 左上角 ── */}
          <div style={{
            position: 'absolute',
            top:  `${is10 ? 22 : 26}px`,
            left: '24px',
            display: 'flex', flexDirection: 'column', gap: '4px',
            zIndex: 2,
          }}>
            <span style={{
              fontSize: is10 ? '34px' : '40px',
              fontWeight: 700,
              fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
              letterSpacing: '-0.035em', lineHeight: 1,
              color: INK,
            }}>{rank}</span>
            <span style={{
              fontSize: '20px', lineHeight: 1,
              color: INK_DIM,
              fontFamily: 'serif',
            }}>{suit}</span>
          </div>

          {/* ── 中央区域 ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            zIndex: 2,
          }}>
            <div style={{ width: '36px', height: '0.5px', background: 'rgba(0,0,0,0.06)' }} />
            <span style={{
              fontSize: '112px', lineHeight: 1,
              color: 'rgba(12,8,18,0.30)',
              fontFamily: 'serif',
            }}>♠</span>
            <span style={{
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.13)',
              fontFamily: 'system-ui, sans-serif',
            }}>{label}</span>
            <div style={{ width: '36px', height: '0.5px', background: 'rgba(0,0,0,0.06)' }} />
          </div>

          {/* ── 右下角（倒置） ── */}
          <div style={{
            position: 'absolute',
            bottom: `${is10 ? 22 : 26}px`,
            right:  '24px',
            display: 'flex', flexDirection: 'column', gap: '4px',
            transform: 'rotate(180deg)',
            zIndex: 2,
          }}>
            <span style={{
              fontSize: is10 ? '34px' : '40px',
              fontWeight: 700,
              fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
              letterSpacing: '-0.035em', lineHeight: 1,
              color: INK,
            }}>{rank}</span>
            <span style={{
              fontSize: '20px', lineHeight: 1,
              color: INK_DIM,
              fontFamily: 'serif',
            }}>{suit}</span>
          </div>

          {/* hover 顶部光泽线 */}
          <div style={{
            position: 'absolute', top: 0, left: '16%', right: '16%',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, rgba(255,252,244,0.92), transparent)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.20s ease',
            pointerEvents: 'none', zIndex: 4,
          }} />

          {/* hover 整体增亮 */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '18px',
            background: 'rgba(255,253,246,0.05)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.20s ease', pointerEvents: 'none', zIndex: 4,
          }} />
        </div>
      </div>
      {/* 注：删除 hover 底部展签标注，不再显示提示语 */}
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
    t.push(setTimeout(() => setPhase('reveal'), 480))
    for (let i = 0; i < 5; i++) {
      t.push(setTimeout(() => setR(i + 1), 560 + i * 160))
    }
    // 560 + 4×160 = 1200ms，+600ms settle → 1800ms 文字入场
    t.push(setTimeout(() => { setPhase('settle'); setTextIn(true) }, 1800))
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
        width:  '100%',
        height: 'calc(100vh - 64px)',
        minHeight: '640px',
        overflow: 'hidden',
        backgroundColor: 'hsl(40, 22%, 96.5%)',
        backgroundImage: [
          // 极淡纸纹
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.022'/%3E%3C/svg%3E")`,
          // ★第三处：牌花背后暖灰雾层（比之前更集中在牌花区域）
          'radial-gradient(ellipse 60% 80% at 30% 62%, rgba(178,164,142,0.28) 0%, rgba(178,164,142,0.10) 50%, transparent 72%)',
          // 右侧极淡暖光
          'radial-gradient(ellipse 40% 50% at 76% 48%, rgba(215,210,198,0.09) 0%, transparent 56%)',
          // 底部地面层（纵深）
          'linear-gradient(to top, rgba(148,138,122,0.12) 0%, transparent 12%)',
          // 顶部渐变（防割裂）
          'linear-gradient(to bottom, rgba(228,222,212,0.05) 0%, transparent 10%)',
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

      {/*
        ── 扇形牌花容器（第一处）──
        几何：圆心 = 视口 32% 横坐标（偏左），底部上 8%（★上移了）
        容器宽 1060px，高 650px
        left = 32vw - 530px
        ★ bottom 从 4% 改为 8%，整体上移约 60~90px
      */}
      <div
        className="hero-fan"
        style={{
          position: 'absolute',
          left:   'calc(32vw - 530px)',
          bottom: '8%',
          width:  '1060px',
          height: '650px',
          zIndex: 2,
        }}
      >
        {/*
          ── ★第三处：椭圆地面阴影（牌花下方）──
          模拟牌组投在桌面上的整体阴影，增加纵深感和"落定"感
        */}
        <div aria-hidden style={{
          position: 'absolute',
          bottom: '-18px',
          left:   '50%',
          transform: 'translateX(-50%)',
          width:  '680px',
          height: '48px',
          background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(80,60,40,0.18) 0%, rgba(80,60,40,0.07) 50%, transparent 72%)',
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
        ── 展签式文字区（第二处）──
        ★ 右侧位置收紧：right 从 5vw → 3.5vw
        ★ top 从 50% → 52%（向下压一点，更靠近牌花重心）
        ★ translateY 微调，让整体更贴近牌组
        maxWidth 400px（从 420px 略收）
        删除 hover 引导语
      */}
      <div
        className="hero-text"
        style={{
          position: 'absolute',
          right:  'clamp(16px, 3.5vw, 60px)',
          top:    '52%',
          transform: textIn ? 'translateY(-52%)' : 'translateY(-44%)',
          maxWidth: '400px',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 1.3s cubic-bezier(0.16,1,0.30,1), transform 1.3s cubic-bezier(0.16,1,0.30,1)',
          textAlign: 'right',
          zIndex: 3,
        }}
      >
        {/* 顶部竖线（展签式细节） */}
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.11), rgba(0,0,0,0.05))',
          marginLeft: 'auto',
          marginBottom: '20px',
        }} />

        {/* 小标题：全大写，字距明显 */}
        <p style={{
          fontSize: '10.5px', fontWeight: 600,
          letterSpacing: '0.36em', textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.18)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          marginBottom: '12px',
        }}>Royal Flush &nbsp;·&nbsp; Spades</p>

        {/* 主标题 */}
        <h1 style={{
          fontSize: 'clamp(68px, 7.0vw, 96px)',
          fontWeight: 700,
          fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
          letterSpacing: '-0.048em', lineHeight: 0.90,
          color: 'rgba(6,5,10,0.88)',
          marginBottom: '18px',
        }}>TCwenzhou</h1>

        {/* 副标题（单行，展签式） */}
        <p style={{
          fontSize: '12.5px',
          color: 'rgba(0,0,0,0.28)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1.5,
          letterSpacing: '0.01em',
          marginBottom: '32px',
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
          {/* 主 CTA */}
          <a
            href="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '54px', padding: '0 32px',
              borderRadius: '14px',
              background: 'rgba(6,5,10,0.87)',
              color: 'rgba(255,253,248,0.94)',
              fontSize: '10.5px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'background 0.18s ease, transform 0.14s ease',
              boxShadow: '0 2px 12px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.10)',
            }}
          >进入展厅</a>

          {/* 次按钮（极克制） */}
          <a
            href="/about"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '54px', padding: '0 24px',
              borderRadius: '14px',
              background: 'transparent',
              color: 'rgba(0,0,0,0.26)',
              fontSize: '10.5px', fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              border: '1px solid rgba(0,0,0,0.08)',
              transition: 'border-color 0.16s ease, color 0.16s ease',
            }}
          >关于我</a>
        </div>
        {/* ★删除 hover 引导提示语 */}
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
            transform: scale(0.60) !important;
            transform-origin: bottom center !important;
            left: calc(50% - 530px) !important;
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
        @media (max-width: 580px) {
          .hero-fan {
            transform: scale(0.44) !important;
            transform-origin: bottom center !important;
            left: calc(50% - 530px) !important;
          }
          .hero-text h1 { font-size: 54px !important; }
          .hero-text p  { white-space: normal !important; }
        }
      `}</style>
    </section>
  )
}
