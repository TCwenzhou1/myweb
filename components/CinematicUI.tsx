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

// ─── 电影级缓动曲线 ─────────────────────────────────────────────────────────────────
// 这些曲线让动画更像电影运镜：柔和启动、流畅推进、自然落稳
const EASE = {
  // 标准推进 - 用于大多数元素进入
  standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
  // 柔和进入 - 用于标题和重要元素
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  // 快速对焦 - 用于hover响应
  focus: 'cubic-bezier(0.33, 1, 0.68, 1)',
  // 丝滑退出 - 用于元素离开
  exit: 'cubic-bezier(0.55, 0, 1, 0.45)',
}

// ─── 场景编号 Props ─────────────────────────────────────────────────────────────────
interface SceneLabel {
  chapter: string
  title: string
  subtitle?: string
}

// ─── CinematicSection 主组件 ─────────────────────────────────────────────────────────────────
interface CinematicSectionProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  scene?: SceneLabel
  delay?: number
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
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 延迟触发，让上一个元素先进入
          setTimeout(() => {
            setVisible(true)
            setHasAnimated(true)
          }, delay)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce && hasAnimated) {
          setVisible(false)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -3% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, triggerOnce, hasAnimated])

  return (
    <section
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        filter: visible ? 'blur(0px)' : 'blur(4px)',
        transition: `
          opacity 1.0s ${EASE.gentle},
          transform 1.1s ${EASE.standard},
          filter 0.8s ${EASE.gentle}
        `,
      }}
    >
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
        gap: '14px',
        marginBottom: '20px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-12px)',
        transition: `opacity 0.8s ${EASE.standard} ${delay + 150}ms, transform 0.8s ${EASE.standard} ${delay + 150}ms`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: '13px', // 放大：8px → 13px
          fontWeight: 600,
          letterSpacing: '0.2em',
          color: C.gold,
          textTransform: 'uppercase',
        }}
      >
        {scene.chapter}
      </span>
      <div style={{ width: '28px', height: '0.5px', background: `linear-gradient(to right, ${C.gold}, transparent)`, opacity: 0.7 }} />
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: '13px', // 放大：8px → 13px
          fontWeight: 400,
          letterSpacing: '0.18em',
          color: C.inkDim,
          textTransform: 'uppercase',
        }}
      >
        {scene.title}
      </span>
      {scene.subtitle && (
        <>
          <div style={{ width: '1px', height: '12px', background: C.inkFaint, opacity: 0.3 }} />
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: '12px', // 放大：8px → 12px
              fontWeight: 300,
              letterSpacing: '0.12em',
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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        marginBottom: 'clamp(40px, 6vh, 56px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 1.0s ${EASE.gentle} ${delay}ms, transform 1.0s ${EASE.gentle} ${delay}ms`,
      }}
    >
      {/* 场景编号 */}
      <SceneLabelUI scene={scene} visible={visible} delay={delay} />

      {/* 主标题 */}
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 'clamp(44px, 7vw, 80px)', // 稍微调大
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: '-0.025em',
          color: C.ink,
          marginBottom: subtitle || description ? '20px' : '0',
        }}
      >
        {title}
      </h1>

      {/* 副标题 - 放大可读性 */}
      {subtitle && (
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 'clamp(15px, 1.6vw, 18px)', // 放大：13-16px → 15-18px
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: C.inkMid,
            marginBottom: description ? '16px' : '0',
          }}
        >
          {subtitle}
        </p>
      )}

      {/* 描述 - 放大可读性 */}
      {description && (
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 'clamp(14px, 1.4vw, 16px)', // 放大：13-15px → 14-16px
            fontWeight: 300,
            lineHeight: 1.75,
            color: C.inkDim,
            maxWidth: '560px',
          }}
        >
          {description}
        </p>
      )}

      {/* 标题下方装饰线 */}
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          style={{
            height: '0.5px',
            background: `linear-gradient(to right, ${C.goldChamp}, ${C.goldPale})`,
            opacity: 0.6,
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
        border: `0.5px solid ${hovered ? C.goldChamp : 'rgba(200,190,168,0.5)'}`,
        borderRadius: '12px',
        padding: 'clamp(24px, 3vw, 36px)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(${hovered ? '-3px' : '0'})`
          : 'translateY(24px)',
        boxShadow: hovered
          ? `0 12px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), 0 0 0 0.5px ${C.goldPale}40`
          : `0 2px 8px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)`,
        transition: `
          opacity 0.9s ${EASE.standard} ${delay}ms,
          transform 0.9s ${EASE.standard} ${delay}ms,
          box-shadow 0.4s ${EASE.focus},
          border-color 0.4s ${EASE.focus}
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
          transition: `opacity 0.4s ${EASE.focus}`,
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
export { C, FONTS, EASE }
