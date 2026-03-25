'use client'

import { useEffect, useState, useRef } from 'react'

// ─── 配色 ───────────────────────────────────────────────────────────────────
const C = {
  bg:       '#F8F6F1',   // 更暖的米白
  ink:      '#0F0E11',   // 近黑，非纯黑
  inkDim:   '#4A4845',   // 次级灰
  inkFaint: '#9A9590',   // 极淡灰
  accent:   '#C4A35A',   // 暖金，一次只用一处
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [phase, setPhase] = useState(0)  // 0=静默 1=mark出现 2=内容 3=完成
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setPhase(1), 200))
    t.push(setTimeout(() => setPhase(2), 900))
    t.push(setTimeout(() => setPhase(3), 1600))
    return () => t.forEach(clearTimeout)
  }, [])

  // 追踪鼠标用于微妙的视差
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMouseX((e.clientX - rect.left) / rect.width)
    setMouseY((e.clientY - rect.top) / rect.height)
  }

  const markX = 52 + (mouseX - 0.5) * 1.2   // -0.6 ~ +0.6vw
  const markY = 44 + (mouseY - 0.5) * 1.0   // -0.5 ~ +0.5vh

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: C.bg,
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* ── 背景纸纹 ── */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.012'/%3E%3C/svg%3E")`,
        zIndex: 0,
      }} />

      {/* ── 巨大 ♠ 标记（商标感） ── */}
      <div aria-hidden style={{
        position: 'absolute',
        right: `${markX}vw`,
        top:  `${markY}vh`,
        transform: 'translate(50%, -50%)',
        fontSize: 'clamp(320px, 58vw, 820px)',
        lineHeight: 1,
        color: '#0A090E',
        opacity: phase >= 1 ? 0.038 : 0,
        fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
        pointerEvents: 'none',
        userSelect: 'none',
        transition: `opacity 1.4s cubic-bezier(0.12,1,0.24,1)`,
        zIndex: 1,
        letterSpacing: '-0.02em',
      }}>♠</div>

      {/* ── 页面顶部细线 ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.06) 80%, transparent)',
        zIndex: 10,
      }} />

      {/* ── 版心容器 ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1320px',
        margin: '0 auto',
        padding: 'clamp(80px, 12vh, 140px) clamp(40px, 8vw, 120px)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 2,
      }}>

        {/* ── 顶部：极简导航 ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 1.0s ease, transform 1.0s ease',
        }}>
          <span style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: C.inkFaint,
          }}>TCwenzhou</span>

          <nav style={{ display: 'flex', gap: '36px' }}>
            {[
              { label: 'Projects', href: '/projects' },
              { label: 'Games',    href: '/games'    },
              { label: 'Lab',      href: '/lab'      },
              { label: 'About',    href: '/about'    },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.10em',
                  color: C.inkDim,
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '2px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
                onMouseLeave={e => (e.currentTarget.style.color = C.inkDim)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ── 中部：主内容区 ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(40px, 8vh, 100px)',
          paddingBottom: 'clamp(40px, 8vh, 100px)',
        }}>
          {/* 主标题区块 */}
          <div style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.2s cubic-bezier(0.12,1,0.24,1), transform 1.2s cubic-bezier(0.12,1,0.24,1)',
          }}>
            {/* 小标签 */}
            <p style={{
              fontFamily: '"Jost", "Inter", system-ui, sans-serif',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.40em',
              textTransform: 'uppercase',
              color: C.accent,
              marginBottom: '28px',
            }}>Portfolio · 2024</p>

            {/* 人名主标题 */}
            <h1 style={{
              fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
              fontSize: 'clamp(72px, 10.5vw, 148px)',
              fontWeight: 400,
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              color: C.ink,
              marginBottom: '0',
              // 极细装饰线
              borderBottom: `1px solid rgba(0,0,0,0.06)`,
              paddingBottom: '32px',
            }}>TCwenzhou</h1>
          </div>

          {/* 副标题 + 简介 */}
          <div style={{
            marginTop: '40px',
            display: 'flex',
            gap: '64px',
            alignItems: 'flex-start',
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 1.2s cubic-bezier(0.12,1,0.24,1) 0.15s, transform 1.2s cubic-bezier(0.12,1,0.24,1) 0.15s',
          }}>
            {/* 短描述 */}
            <p style={{
              fontFamily: '"Jost", "Inter", system-ui, sans-serif',
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: '0.01em',
              color: C.inkDim,
              maxWidth: '380px',
            }}>
              计算机工程 · 系统实践<br />
              与 AI / 游戏探索
            </p>

            {/* 链接组 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              paddingTop: '2px',
            }}>
              {[
                { label: '查看项目', href: '/projects' },
                { label: '进入实验室', href: '/lab'     },
              ].map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    color: C.ink,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.ink)}
                >
                  <span style={{
                    width: '20px',
                    height: '1px',
                    background: C.accent,
                    opacity: 0.7,
                    flexShrink: 0,
                    transition: 'width 0.2s ease',
                  }} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── 底部：信息行 ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: phase >= 3 ? 0.7 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 1.0s ease 0.2s, transform 1.0s ease 0.2s',
        }}>
          <p style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.06em',
            color: C.inkFaint,
          }}>
            github.com/TCwenzhou1
          </p>
          <p style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: C.inkFaint,
          }}>
            hello@tcwenzhou.site
          </p>
        </div>

      </div>

      {/* ── 右下角极淡页码感装饰 ── */}
      <div aria-hidden style={{
        position: 'absolute',
        right: '40px',
        bottom: '36px',
        fontFamily: '"Jost", "Inter", system-ui, sans-serif',
        fontSize: '9px',
        fontWeight: 300,
        letterSpacing: '0.12em',
        color: C.inkFaint,
        opacity: phase >= 3 ? 0.4 : 0,
        transition: 'opacity 1.0s ease 0.4s',
        zIndex: 2,
      }}>01 / 04</div>

      {/* ── 响应式 ── */}
      <style>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
          h1 { letter-spacing: -0.02em !important; }
        }
      `}</style>
    </section>
  )
}