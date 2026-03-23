'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// ── 牌面数据 ─────────────────────────────────────────────────────────────────
const CARDS = [
  { rank: '10', suit: '♠', label: 'Projects', sub: 'AI 系统 / 工程实践', href: '/projects' },
  { rank: 'J',  suit: '♠', label: 'Games',    sub: '游戏开发 / 可玩内容', href: '/games'    },
  { rank: 'Q',  suit: '♠', label: 'Lab',      sub: '实验 / 交互 Demo',   href: '/lab'      },
  { rank: 'K',  suit: '♠', label: 'About',    sub: '背景 / 方向',         href: '/about'    },
  { rank: 'A',  suit: '♠', label: 'Contact',  sub: '联系方式',             href: '/contact'  },
]

// 最终扇形角度
const FAN_ANGLES  = [-28, -14, 0, 14, 28]
// 扇形弧形 Y 偏移（越两侧越低，营造弧感）
const FAN_Y = [52, 18, 0, 18, 52]

// ── 单张扑克牌 ────────────────────────────────────────────────────────────────
interface CardProps {
  rank: string
  suit: string
  label: string
  sub: string
  href: string
  index: number
  /** 该牌当前已展开到第几步（0=叠着，1=展开） */
  opened: boolean
  hovered: boolean
  clickedIndex: number | null
  anyHovered: boolean
  onHover: (i: number | null) => void
  onCardClick: (href: string, i: number) => void
}

const Card = ({
  rank, suit, label, sub, href, index,
  opened, hovered, clickedIndex, anyHovered,
  onHover, onCardClick,
}: CardProps) => {
  const isMine = clickedIndex === index

  // 计算最终旋转 + 位移
  const baseAngle  = opened ? FAN_ANGLES[index] : 0
  const baseY      = opened ? FAN_Y[index]      : 0

  // hover 时：角度收拢 35%，向外抽出 38px
  const finalAngle = hovered ? baseAngle * 0.35 : baseAngle
  const finalY     = hovered ? baseY - 38        : baseY
  // click 时向前弹出
  const clickScale = isMine ? 1.06 : (clickedIndex !== null ? 0.94 : 1)
  // 非 hover 时退后
  const baseScale  = anyHovered && !hovered ? 0.95 : 1
  const finalScale = clickScale * baseScale

  // z 轴：中间牌最高，hover 最高
  const zBase = 5 - Math.abs(index - 2)
  const zIndex = hovered ? 20 : isMine ? 15 : zBase

  const opacity = opened
    ? anyHovered && !hovered ? 0.60 : 1
    : 0

  const shadow = hovered
    ? '0 24px 56px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.12)'
    : '0 4px 16px rgba(0,0,0,0.09), 0 10px 32px rgba(0,0,0,0.07)'

  // 展开动画：每张牌有递增 delay（顺序展开感）
  const openDelay = index * 100  // 0 / 100 / 200 / 300 / 400ms

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        width: '160px',
        height: '228px',
        marginLeft: '-80px',
        zIndex,
        transformOrigin: '50% 100%',
        transform: `rotate(${finalAngle}deg) translateY(${finalY}px) scale(${finalScale})`,
        opacity,
        transition: opened
          ? `transform 0.30s cubic-bezier(0.23,1,0.32,1),
             opacity   0.22s ease,
             box-shadow 0.25s ease`
          : `transform 0.60s cubic-bezier(0.23,1,0.32,1) ${openDelay}ms,
             opacity   0.50s ease ${openDelay}ms`,
        cursor: 'pointer',
        borderRadius: '14px',
        boxShadow: shadow,
        userSelect: 'none',
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onCardClick(href, index)}
    >
      {/* ── 牌体 ── */}
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '14px',
        background: 'white',
        // 双层边框效果：外层细边 + 内层更细
        border: '1.5px solid rgba(0,0,0,0.10)',
        outline: '0.5px solid rgba(0,0,0,0.04)',
        // 轻微纸张感渐变
        backgroundImage: `
          linear-gradient(160deg,
            rgba(255,255,255,1.00) 0%,
            rgba(252,252,254,1.00) 60%,
            rgba(246,246,250,1.00) 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '13px',
        boxSizing: 'border-box',
      }}>

        {/* ── 极淡背景压纹（菱形格） ── */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(0,0,0,0.013) 0px,
              rgba(0,0,0,0.013) 1px,
              transparent 1px,
              transparent 12px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(0,0,0,0.013) 0px,
              rgba(0,0,0,0.013) 1px,
              transparent 1px,
              transparent 12px
            )
          `,
          borderRadius: '14px',
          pointerEvents: 'none',
        }} />

        {/* ── 背景大黑桃图腾（极淡） ── */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '110px',
          color: 'rgba(0,0,0,0.030)',
          lineHeight: 1,
          pointerEvents: 'none',
          fontFamily: 'serif',
        }}>♠</div>

        {/* ── 左上角 ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2px',
          color: 'rgba(20,20,30,0.78)',
          position: 'relative',
          zIndex: 1,
        }}>
          <span style={{
            fontSize: rank === '10' ? '22px' : '24px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '14px', lineHeight: 1 }}>{suit}</span>
        </div>

        {/* ── 中央主花色 + 小装饰线 ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* 上方细线 */}
          <div style={{
            width: '28px',
            height: '1px',
            background: 'rgba(0,0,0,0.10)',
          }} />
          <span style={{
            fontSize: '52px',
            color: 'rgba(15,15,25,0.62)',
            lineHeight: 1,
            fontFamily: 'serif',
          }}>♠</span>
          {/* 牌名（对应入口，极小克制） */}
          <span style={{
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.28)',
            fontFamily: 'system-ui, sans-serif',
          }}>{label}</span>
          {/* 下方细线 */}
          <div style={{
            width: '28px',
            height: '1px',
            background: 'rgba(0,0,0,0.10)',
          }} />
        </div>

        {/* ── 右下角（倒置） ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '2px',
          color: 'rgba(20,20,30,0.78)',
          transform: 'rotate(180deg)',
          position: 'relative',
          zIndex: 1,
        }}>
          <span style={{
            fontSize: rank === '10' ? '22px' : '24px',
            fontWeight: 700,
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>{rank}</span>
          <span style={{ fontSize: '14px', lineHeight: 1 }}>{suit}</span>
        </div>

        {/* ── hover 时：顶部高亮边缘 ── */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          borderRadius: '14px 14px 0 0',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15))',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }} />
      </div>

      {/* ── hover 时浮出的入口标签 ── */}
      <div style={{
        position: 'absolute',
        bottom: '-44px',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.22s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.70)',
        }}>{label}</div>
        <div style={{
          fontSize: '10px',
          color: 'rgba(0,0,0,0.38)',
          marginTop: '2px',
        }}>{sub}</div>
      </div>
    </div>
  )
}

// ── 主组件 ────────────────────────────────────────────────────────────────────
const HeroCards = () => {
  const router = useRouter()
  // openCount：已展开的牌数（0 → 5）
  const [openCount, setOpenCount]       = useState(0)
  const [infoVisible, setInfoVisible]   = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  useEffect(() => {
    // 信息区先淡入
    const t0 = setTimeout(() => setInfoVisible(true), 80)
    // 500ms 后开始逐张展开（每 110ms 一张）
    const timers: ReturnType<typeof setTimeout>[] = [t0]
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => setOpenCount(i), 500 + i * 110))
    }
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleCardClick = (href: string, i: number) => {
    setClickedIndex(i)
    setTimeout(() => router.push(href), 350)
  }

  const anyHovered = hoveredIndex !== null

  return (
    <section
      className="page-bg"
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 32px',
        gap: '0',
      }}
    >
      {/*
        两列布局：
        左：大扇形牌花（约 55% 宽度）
        右：个人信息 + CTA（约 45% 宽度）
        手机端：竖排，牌在上，信息在下
      */}
      <div style={{
        width: '100%',
        maxWidth: '1080px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0',
      }}>

        {/* ── 左侧：扇形牌花 ── */}
        <div style={{
          flex: '0 0 58%',
          minWidth: '320px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          // 容器高度 = 牌高 + 最大 Y 偏移 + hover 抬升空间 + 标签空间
          height: '360px',
          position: 'relative',
        }}>
          {CARDS.map((card, i) => (
            <Card
              key={card.rank}
              rank={card.rank}
              suit={card.suit}
              label={card.label}
              sub={card.sub}
              href={card.href}
              index={i}
              opened={openCount > i}
              hovered={hoveredIndex === i}
              clickedIndex={clickedIndex}
              anyHovered={anyHovered}
              onHover={setHoveredIndex}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        {/* ── 右侧：信息区 ── */}
        <div style={{
          flex: '1 1 300px',
          padding: '0 0 0 48px',
          opacity: infoVisible ? 1 : 0,
          transform: infoVisible ? 'translateX(0)' : 'translateX(20px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.32)',
            marginBottom: '16px',
          }}>
            Royal Flush  ·  ♠
          </p>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            color: 'rgba(0,0,0,0.88)',
            lineHeight: 1.08,
            marginBottom: '16px',
            fontFamily: '"Palatino Linotype", Palatino, Georgia, serif',
          }}>
            TCwenzhou
          </h1>

          <p style={{
            fontSize: '15px',
            color: 'rgba(0,0,0,0.45)',
            lineHeight: 1.75,
            marginBottom: '10px',
          }}>
            计算机工程学生
          </p>
          <p style={{
            fontSize: '15px',
            color: 'rgba(0,0,0,0.45)',
            lineHeight: 1.75,
            marginBottom: '10px',
          }}>
            AI 项目学习者
          </p>
          <p style={{
            fontSize: '15px',
            color: 'rgba(0,0,0,0.45)',
            lineHeight: 1.75,
            marginBottom: '36px',
          }}>
            游戏开发探索者
          </p>

          {/* 分割线 */}
          <div style={{
            width: '32px',
            height: '1.5px',
            background: 'rgba(0,0,0,0.15)',
            marginBottom: '32px',
          }} />

          {/* CTA */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="/projects"
              style={{
                display: 'inline-block',
                padding: '11px 24px',
                borderRadius: '8px',
                background: 'rgba(10,10,15,0.88)',
                color: 'white',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              查看项目
            </a>
            <a
              href="/about"
              style={{
                display: 'inline-block',
                padding: '11px 24px',
                borderRadius: '8px',
                background: 'transparent',
                color: 'rgba(0,0,0,0.58)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                border: '1.5px solid rgba(0,0,0,0.12)',
              }}
            >
              了解更多
            </a>
          </div>

          {/* 提示 */}
          <p style={{
            fontSize: '11px',
            color: 'rgba(0,0,0,0.25)',
            marginTop: '28px',
            letterSpacing: '0.05em',
            opacity: openCount >= 5 ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}>
            ← 点击任意一张牌进入对应板块
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroCards
