'use client'

import { useEffect, useRef, useState } from 'react'

// ─── 统一配色 ─────────────────────────────────────────────────────────────────
const C = {
  bg:           '#F8F5EE',
  bgWarm:       '#F2EDE3',
  bgDeep:       '#E8E2D6',
  ink:          '#0F0E10',
  inkMid:       '#2A282C',
  inkDim:       '#5C585E',
  inkFaint:     '#9A9599',

  gold:         '#A88B55',
  goldRich:     '#C4A265',
  goldChamp:    '#D4BC8A',
  goldPale:     '#E8DCC4',

  cardIvory:    '#FAF8F3',
  cardShadow:   '#D8D0C0',
}

// ─── 统一字体 ─────────────────────────────────────────────────────────────────
const FONTS = {
  display: '"Cormorant Garamond", "Bodoni Moda", "Times New Roman", Georgia, serif',
  body:    '"Jost", "Inter", system-ui, sans-serif',
}

// ─── 场景编号 Props ─────────────────────────────────────────────────────────────────
interface SceneLabel {
  chapter: string   // e.g. "01"
  title: string    // e.g. "Projects"
  subtitle?: string
}

// ─── CinematicSection 主组件 ─────────────────────────────────────────────────────────────────
interface CinematicSectionProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** 场景编号（可选） */
  scene?: SceneLabel
  /** 延迟进入（毫秒），默认 0 */
  delay?: number
  /** 滚动触发视角，默认 '10%' */
  triggerOnce?: boolean
}

export function CinematicSection({
  children,
  className = '',
  style,
  scene,
  delay = 0,
  triggerOnce = true,
}: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [triggerOnce])

  return (
    <section
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.9s cubic-bezier(0.12,1,0.24,1) ${delay}ms, transform 0.9s cubic-bezier(0.12,1,0.24,1) ${delay}ms`,
      }}
    >
      {/* 场景编号装饰 */}
      {scene && (
        <SceneLabelUI scene={scene} visible={visible} delay={delay} />
      )}
      {children}
    </section>
  )
}

// ─── 场景编号 UI ─────────────────────────────────────────────────────────────────
function SceneLabelUI({ scene, visible, delay }: { scene: SceneLabel; visible: boolean; delay: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity 0.7s ease ${delay + 200}ms, transform 0.7s ease ${delay + 200}ms`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: '8px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          color: C.gold,
          textTransform: 'uppercase',
        }}
      >
        {scene.chapter}
      </span>
      <div style={{ width: '24px', height: '0.5px', background: `linear-gradient(to right, ${C.gold}, transparent)`, opacity: 0.6 }} />
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: '8px',
          fontWeight: 400,
          letterSpacing: '0.25em',
          color: C.inkFaint,
          textTransform: 'uppercase',
        }}
      >
        {scene.title}
      </span>
      {scene.subtitle && (
        <>
          <div style={{ width: '1px', height: '10px', background: C.inkFaint, opacity: 0.3 }} />
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: '8px',
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: C.inkFaint,
            }}
          >
            {scene.subtitle}
          </span>
        </>
      )}
    </div>
  )
}

// ─── 页面标题组件 ─────────────────────────────────────────────────────────────────
interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  scene: SceneLabel
  delay?: number
}

export function PageHeader({ title, subtitle, description, scene, delay = 0 }: PageHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        marginBottom: 'clamp(40px, 6vh, 64px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 1.0s cubic-bezier(0.12,1,0.24,1) ${delay}ms, transform 1.0s cubic-bezier(0.12,1,0.24,1) ${delay}ms`,
      }}
    >
      {/* 场景编号 */}
      <SceneLabelUI scene={scene} visible={visible} delay={delay} />

      {/* 主标题 */}
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: C.ink,
          marginBottom: subtitle || description ? '20px' : '0',
        }}
      >
        {title}
      </h1>

      {/* 副标题 */}
      {subtitle && (
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: C.inkDim,
            marginBottom: description ? '16px' : '0',
          }}
        >
          {subtitle}
        </p>
      )}

      {/* 描述 */}
      {description && (
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 'clamp(13px, 1.4vw, 15px)',
            fontWeight: 300,
            lineHeight: 1.8,
            color: C.inkDim,
            maxWidth: '520px',
          }}
        >
          {description}
        </p>
      )}

      {/* 标题下方装饰线 */}
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          style={{
            height: '0.5px',
            background: `linear-gradient(to right, ${C.goldChamp}, ${C.goldPale})`,
            opacity: 0.5,
            width: '48px',
          }}
        />
        <div
          style={{
            height: '0.5px',
            background: `linear-gradient(to right, ${C.ink}, transparent)`,
            opacity: 0.06,
            width: '100%',
          }}
        />
      </div>
    </div>
  )
}

// ─── 档案卡组件 ─────────────────────────────────────────────────────────────────
interface ArchiveCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  hoverable?: boolean
  delay?: number
}

export function ArchiveCard({ children, className = '', style, hoverable = true, delay = 0 }: ArchiveCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        ...style,
        position: 'relative',
        background: C.cardIvory,
        border: `0.5px solid ${hovered ? C.goldPale : 'rgba(200,190,168,0.5)'}`,
        borderRadius: '12px',
        padding: 'clamp(24px, 3vw, 36px)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(${hovered ? '-4px' : '0'})`
          : 'translateY(24px)',
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), 0 0 0 0.5px ${C.goldPale}40`
          : `0 2px 8px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)`,
        transition: `
          opacity 0.9s cubic-bezier(0.12,1,0.24,1) ${delay}ms,
          transform 0.9s cubic-bezier(0.12,1,0.24,1) ${delay}ms,
          box-shadow 0.35s ease,
          border-color 0.35s ease
        `,
        cursor: hoverable ? 'pointer' : 'default',
      }}
    >
      {/* 内层双线装饰 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '12px',
          border: `0.5px solid ${C.goldPale}`,
          borderRadius: '6px',
          opacity: hovered ? 0.5 : 0.2,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
        }}
      />

      {/* 纸纹背景 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '12px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`,
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}

// ─── 导出统一配色和字体 ─────────────────────────────────────────────────────────────────
export { C, FONTS }
