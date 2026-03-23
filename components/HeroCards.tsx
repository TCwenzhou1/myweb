'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ── 牌面数据 ─────────────────────────────────────────────────────────────────
const CARDS = [
  { rank: '10', suit: '♠', label: 'Projects', href: '/projects', delay: 0 },
  { rank: 'J',  suit: '♠', label: 'Games',    href: '/games',    delay: 80 },
  { rank: 'Q',  suit: '♠', label: 'Lab',      href: '/lab',      delay: 160 },
  { rank: 'K',  suit: '♠', label: 'About',    href: '/about',    delay: 240 },
  { rank: 'A',  suit: '♠', label: 'Contact',  href: '/contact',  delay: 320 },
]

// 5 张牌的扇形旋转角度（中心牌 0°，向两侧递增）
const FAN_ANGLES = [-18, -9, 0, 9, 18]
// 扇形时每张牌的垂直偏移（弧形感，越两侧越低）
const FAN_Y_OFFSET = [28, 10, 0, 10, 28]

// ── 单张扑克牌 ────────────────────────────────────────────────────────────────
interface PokerCardProps {
  rank: string
  suit: string
  label: string
  href: string
  index: number
  fanned: boolean       // 是否已展开
  hovered: boolean      // 是否被 hover
  clicked: boolean      // 是否被点击
  anyHovered: boolean   // 是否有其他牌被 hover（让未 hover 牌稍微暗淡）
  delay: number
  onHover: (i: number | null) => void
  onClick: (href: string) => void
}

const PokerCard = ({
  rank, suit, label, href, index, fanned,
  hovered, clicked, anyHovered, delay, onHover, onClick,
}: PokerCardProps) => {
  const angle  = fanned ? FAN_ANGLES[index]  : 0
  const yShift = fanned ? FAN_Y_OFFSET[index] : 0

  // hover 时：抬升 + 微微拉直
  const hoverAngle  = hovered ? angle * 0.4 : angle
  const hoverYShift = hovered ? yShift - 28 : yShift

  // click 时：向前弹出
  const clickScale = clicked ? 1.08 : 1

  // 非 hover 状态下，如果有其他牌被 hover，本牌稍微退后
  const scaleBase = anyHovered && !hovered ? 0.95 : 1

  const transform = fanned
    ? `rotate(${hoverAngle}deg) translateY(${hoverYShift}px) scale(${clickScale * scaleBase})`
    : `rotate(0deg) translateY(60px) scale(0.92)`

  const opacity = fanned ? (anyHovered && !hovered ? 0.65 : 1) : 0

  // z-index：hover 的牌浮在最上面，中间牌默认最高
  const zBase = 5 - Math.abs(index - 2)  // 中间牌 z=5
  const zIndex = hovered ? 20 : zBase

  return (
    <div
      className="absolute"
      style={{
        // 让所有牌共享同一个底部锚点，从中心向两侧展开
        bottom: 0,
        left: '50%',
        width: '140px',
        height: '200px',
        marginLeft: '-70px',   // 水平居中对齐
        zIndex,
        transformOrigin: '50% 100%',  // 以牌底中心为旋转轴
        transform,
        opacity,
        transition: fanned
          ? `transform 0.32s cubic-bezier(0.23,1,0.32,1), opacity 0.28s ease, box-shadow 0.25s ease`
          : `transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms, opacity 0.45s ease ${delay}ms`,
        cursor: 'pointer',
        // 阴影
        borderRadius: '12px',
        boxShadow: hovered
          ? '0 16px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.10)'
          : '0 2px 8px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(href)}
    >
      {/* 牌面主体 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          background: 'white',
          border: '1px solid rgba(0,0,0,0.10)',
          // 纸张纹理感：极轻微的内渐变
          backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,248,250,1) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '10px',
          userSelect: 'none',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* 极淡的背景黑桃纹理 */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px',
            color: 'rgba(0,0,0,0.032)',
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          ♠
        </div>

        {/* 左上角：点数 + 花色 */}
        <div style={{ lineHeight: 1, color: 'rgba(0,0,0,0.72)' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Georgia, serif' }}>
            {rank}
          </div>
          <div style={{ fontSize: '13px', marginTop: '1px' }}>{suit}</div>
        </div>

        {/* 中央：大花色 */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '44px',
            color: 'rgba(0,0,0,0.60)',
            lineHeight: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {suit}
        </div>

        {/* 右下角：倒置点数 + 花色 */}
        <div
          style={{
            lineHeight: 1,
            color: 'rgba(0,0,0,0.72)',
            alignSelf: 'flex-end',
            transform: 'rotate(180deg)',
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Georgia, serif' }}>
            {rank}
          </div>
          <div style={{ fontSize: '13px', marginTop: '1px' }}>{suit}</div>
        </div>
      </div>

      {/* hover 时：牌下方浮出入口标签 */}
      <div
        style={{
          position: 'absolute',
          bottom: '-32px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.55)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        {label}
      </div>
    </div>
  )
}

// ── 主组件 ────────────────────────────────────────────────────────────────────
const HeroCards = () => {
  const router = useRouter()
  const [fanned, setFanned]             = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const [infoVisible, setInfoVisible]   = useState(false)

  useEffect(() => {
    // 先让信息区淡入（50ms），再展开牌（300ms 后）
    const t1 = setTimeout(() => setInfoVisible(true), 50)
    const t2 = setTimeout(() => setFanned(true), 300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleCardClick = (href: string, index: number) => {
    setClickedIndex(index)
    setTimeout(() => router.push(href), 320)
  }

  const anyHovered = hoveredIndex !== null

  return (
    <section
      className="page-bg"
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px 80px',
      }}
    >
      {/* ── 信息区 ── */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '48px',
          opacity: infoVisible ? 1 : 0,
          transform: infoVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)',
            marginBottom: '14px',
          }}
        >
          tcwenzhou.site
        </p>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'rgba(0,0,0,0.88)',
            marginBottom: '12px',
            lineHeight: 1.1,
          }}
        >
          TCwenzhou
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'rgba(0,0,0,0.45)',
            lineHeight: 1.7,
            maxWidth: '340px',
            margin: '0 auto 28px',
          }}
        >
          计算机工程学生 · AI 项目学习者 · 游戏开发探索者
        </p>

        {/* CTA 按钮区 */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 20px',
              borderRadius: '8px',
              background: 'rgba(0,0,0,0.88)',
              color: 'white',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'background 0.2s ease',
            }}
          >
            查看项目
          </a>
          <a
            href="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 20px',
              borderRadius: '8px',
              background: 'transparent',
              color: 'rgba(0,0,0,0.65)',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(0,0,0,0.12)',
              letterSpacing: '0.01em',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
          >
            了解更多
          </a>
        </div>
      </div>

      {/* ── 扑克牌扇形区 ── */}
      <div
        style={{
          position: 'relative',
          width: '320px',
          height: '260px',   // 容器高度 = 牌高 + 扇形 y 偏移空间
          margin: '0 auto',
        }}
      >
        {CARDS.map((card, i) => (
          <PokerCard
            key={card.rank}
            rank={card.rank}
            suit={card.suit}
            label={card.label}
            href={card.href}
            index={i}
            fanned={fanned}
            hovered={hoveredIndex === i}
            clicked={clickedIndex === i}
            anyHovered={anyHovered}
            delay={card.delay}
            onHover={(idx) => setHoveredIndex(idx)}
            onClick={(href) => handleCardClick(href, i)}
          />
        ))}
      </div>

      {/* 提示文字 */}
      <p
        style={{
          marginTop: '56px',
          fontSize: '12px',
          color: 'rgba(0,0,0,0.28)',
          letterSpacing: '0.06em',
          opacity: fanned ? 1 : 0,
          transition: 'opacity 0.6s ease 0.8s',
          textAlign: 'center',
        }}
      >
        hover 任意一张牌 · 点击进入对应板块
      </p>
    </section>
  )
}

export default HeroCards
