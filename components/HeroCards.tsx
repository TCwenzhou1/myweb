'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface EntryCard {
  id: string
  label: string
  sublabel: string
  href: string
  accent: string
  delay: number
}

const entryCards: EntryCard[] = [
  {
    id: 'projects',
    label: 'Projects',
    sublabel: 'AI 系统 / 工程实践',
    href: '/projects',
    accent: '#2563eb',
    delay: 120,
  },
  {
    id: 'games',
    label: 'Games',
    sublabel: '游戏开发 / 可玩内容',
    href: '/games',
    accent: '#7c3aed',
    delay: 200,
  },
  {
    id: 'lab',
    label: 'Lab',
    sublabel: '实验 / 交互 Demo',
    href: '/lab',
    accent: '#0891b2',
    delay: 280,
  },
  {
    id: 'about',
    label: 'About',
    sublabel: '背景 / 方向',
    href: '/about',
    accent: '#059669',
    delay: 360,
  },
]

const HeroCards = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // slight delay so browser paint settles first
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center section-padding py-20">
      {/* identity block */}
      <div
        className="text-center mb-16 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
          tcwenzhou.site
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          TCwenzhou
        </h1>
        <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
          计算机工程学生 · AI 项目学习者 · 游戏开发探索者
        </p>
      </div>

      {/* card grid */}
      <div className="w-full max-w-3xl">
        {/* 4 entry cards in a grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {entryCards.map((card) => (
            <CardEntry key={card.id} card={card} visible={visible} />
          ))}
        </div>

        {/* subtle hint */}
        <p
          className="text-center text-xs text-muted-foreground/60 mt-8 transition-all duration-700 delay-500"
          style={{
            opacity: visible ? 1 : 0,
          }}
        >
          点击卡牌进入对应模块
        </p>
      </div>
    </section>
  )
}

interface CardEntryProps {
  card: EntryCard
  visible: boolean
}

const CardEntry = ({ card, visible }: CardEntryProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={card.href} className="block outline-none">
      <div
        className="relative rounded-2xl border border-border bg-card cursor-pointer select-none"
        style={{
          // entry animation
          opacity: visible ? 1 : 0,
          transform: visible
            ? hovered
              ? 'translateY(-6px) scale(1.02)'
              : 'translateY(0) scale(1)'
            : 'translateY(32px)',
          transition: visible
            ? `opacity 0.55s ease ${card.delay}ms, transform 0.25s cubic-bezier(0.23,1,0.32,1)`
            : `opacity 0.55s ease ${card.delay}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${card.delay}ms`,
          boxShadow: hovered
            ? `0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06), inset 0 0 0 1.5px ${card.accent}30`
            : '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* top accent bar */}
        <div
          className="h-0.5 rounded-t-2xl transition-all duration-250"
          style={{
            background: card.accent,
            opacity: hovered ? 1 : 0.35,
          }}
        />

        <div className="px-4 py-5 md:px-5 md:py-6">
          {/* label */}
          <p
            className="text-[15px] font-semibold mb-1.5 transition-colors duration-200"
            style={{ color: hovered ? card.accent : 'hsl(var(--foreground))' }}
          >
            {card.label}
          </p>
          {/* sublabel */}
          <p className="text-xs text-muted-foreground leading-snug">
            {card.sublabel}
          </p>

          {/* arrow hint on hover */}
          <div
            className="mt-4 text-xs font-medium transition-all duration-200"
            style={{
              color: card.accent,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
            }}
          >
            进入 →
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HeroCards
