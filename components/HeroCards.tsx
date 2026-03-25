'use client'

import { useEffect, useState, useRef } from 'react'

// ─── 配色 ───────────────────────────────────────────────────────────────────
const C = {
  bg:        '#F5F2EC',   // 更厚实的暖象牙
  bgWarm:    '#F0EDE4',   // 暖灰底层
  ink:       '#0C0B0E',   // 深邃近黑
  inkMid:    '#2E2C30',   // 中灰
  inkDim:    '#6A6760',   // 次级灰
  inkFaint:  '#A8A49C',   // 极淡灰
  gold:      '#B8954A',   // 暖金色（更饱满）
  goldDim:   '#C9AF72',   // 淡金
  goldPale:  '#E2D5B8',   // 极淡金
  goldGlow:  '#D4AF37',   // 华丽金色
  roseGold:  '#E8C4A0',   // 玫瑰金
}

// ─── 粒子组件 ─────────────────────────────────────────────────────────────────
function Sparkles() {
  const [sparks, setSparks] = useState<Array<{
    x: number; y: number; size: number; duration: number; delay: number; opacity: number
  }>>([])

  useEffect(() => {
    const generated = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.6 + 0.2,
    }))
    setSparks(generated)
  }, [])

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      {sparks.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${C.goldGlow} 0%, ${C.goldDim} 40%, transparent 70%)`,
            opacity: s.opacity,
            animation: `sparkPulse ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes sparkPulse {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.4); }
        }
      `}</style>
    </div>
  )
}

// ─── 光晕组件 ─────────────────────────────────────────────────────────────────
function GoldenOrbs() {
  return (
    <>
      {/* 华丽金色主光晕 - 左上 */}
      <div aria-hidden style={{
        position: 'absolute',
        left: '-5%',
        top: '-10%',
        width: '45vw',
        height: '45vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(184,149,74,0.06) 35%, transparent 65%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'orbBreath 6s ease-in-out infinite',
      }} />
      {/* 华丽金色次光晕 - 右下 */}
      <div aria-hidden style={{
        position: 'absolute',
        right: '-8%',
        bottom: '-5%',
        width: '50vw',
        height: '50vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(232,196,160,0.10) 0%, rgba(201,175,114,0.05) 40%, transparent 65%)`,
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'orbBreath 8s ease-in-out 2s infinite',
      }} />
      {/* 高光点 */}
      <div aria-hidden style={{
        position: 'absolute',
        left: '12%',
        top: '8%',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: C.goldGlow,
        boxShadow: `0 0 12px 4px rgba(212,175,55,0.4), 0 0 24px 8px rgba(212,175,55,0.2)`,
        pointerEvents: 'none',
        zIndex: 6,
        animation: 'starTwinkle 3s ease-in-out infinite',
      }} />
      <div aria-hidden style={{
        position: 'absolute',
        right: '18%',
        top: '15%',
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        background: C.goldPale,
        boxShadow: `0 0 8px 3px rgba(226,213,184,0.5)`,
        pointerEvents: 'none',
        zIndex: 6,
        animation: 'starTwinkle 2.5s ease-in-out 1s infinite',
      }} />
      <style>{`
        @keyframes orbBreath {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  )
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [phase, setPhase] = useState(0)  // 0=静默 1=mark出现 2=内容 3=完成
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setPhase(1), 100))
    t.push(setTimeout(() => setPhase(2), 800))
    t.push(setTimeout(() => setPhase(3), 1500))
    t.push(setTimeout(() => setPhase(4), 2000))
    return () => t.forEach(clearTimeout)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMouseX((e.clientX - rect.left) / rect.width)
    setMouseY((e.clientY - rect.top) / rect.height)
  }

  // ♠ 随鼠标轻微视差
  const markX = 48 + (mouseX - 0.5) * 1.8
  const markY = 40 + (mouseY - 0.5) * 1.5

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
      {/* ═══════════════════════════════════════════════════
          背景层：多层次空间感
      ═══════════════════════════════════════════════════ */}

      {/* 华丽金色光晕层 */}
      <GoldenOrbs />

      {/* 粒子层 */}
      <Sparkles />

      {/* 层1：顶部光源渐变（华丽感核心） */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 90% 70% at 10% 0%, rgba(255,248,235,0.80) 0%, transparent 55%),
          radial-gradient(ellipse 70% 60% at 90% 100%, rgba(215,200,170,0.25) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,252,244,0.15) 0%, transparent 70%),
          linear-gradient(175deg, rgba(255,252,244,0.5) 0%, transparent 35%, rgba(10,8,5,0.04) 100%)
        `,
        zIndex: 0,
      }} />

      {/* 层2：纸纹 */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E")`,
        zIndex: 1,
      }} />

      {/* 层3：地面阴影（展台感） */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '35%',
        background: 'linear-gradient(to top, rgba(30,25,15,0.05) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* 层4：左垂直金色光线（华丽感装饰） */}
      <div aria-hidden style={{
        position: 'absolute',
        left: 'clamp(40px, 8vw, 120px)',
        top: '8%',
        bottom: '12%',
        width: '1px',
        background: `linear-gradient(to bottom, transparent, ${C.gold} 15%, ${C.goldGlow} 50%, ${C.gold} 85%, transparent)`,
        opacity: phase >= 2 ? 0.8 : 0,
        transition: 'opacity 1.4s ease',
        zIndex: 2,
        boxShadow: `0 0 8px 1px rgba(212,175,55,0.3), 0 0 20px 3px rgba(212,175,55,0.15)`,
      }} />
      {/* 右垂直金色光线 */}
      <div aria-hidden style={{
        position: 'absolute',
        right: 'clamp(60px, 10vw, 140px)',
        top: '15%',
        bottom: '20%',
        width: '1px',
        background: `linear-gradient(to bottom, transparent, ${C.goldDim} 30%, ${C.goldPale} 70%, transparent)`,
        opacity: phase >= 2 ? 0.5 : 0,
        transition: 'opacity 1.6s ease 0.3s',
        zIndex: 2,
        boxShadow: `0 0 6px 1px rgba(201,175,114,0.2)`,
      }} />
      {/* 顶部金色短光线装饰 */}
      <div aria-hidden style={{
        position: 'absolute',
        left: 'clamp(40px, 8vw, 120px)',
        top: '8%',
        width: '20px',
        height: '1px',
        background: `linear-gradient(to right, ${C.gold}, transparent)`,
        opacity: phase >= 2 ? 0.7 : 0,
        transition: 'opacity 1.4s ease',
        zIndex: 2,
      }} />
      {/* 底部金色短光线装饰 */}
      <div aria-hidden style={{
        position: 'absolute',
        left: 'clamp(40px, 8vw, 120px)',
        bottom: '12%',
        width: '30px',
        height: '1px',
        background: `linear-gradient(to left, ${C.gold}, transparent)`,
        opacity: phase >= 2 ? 0.5 : 0,
        transition: 'opacity 1.4s ease 0.2s',
        zIndex: 2,
      }} />

      {/* ═══════════════════════════════════════════════════
          ♠ 标记：水印 + 质感
      ═══════════════════════════════════════════════════ */}
      <div aria-hidden style={{
        position: 'absolute',
        right: `${markX}vw`,
        top:  `${markY}vh`,
        transform: 'translate(50%, -50%)',
        fontSize: 'clamp(360px, 65vw, 900px)',
        lineHeight: 1,
        color: '#0A090E',
        opacity: phase >= 1 ? 0.055 : 0,
        fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
        pointerEvents: 'none',
        userSelect: 'none',
        transition: `opacity 2.0s cubic-bezier(0.12,1,0.24,1)`,
        zIndex: 1,
        letterSpacing: '-0.02em',
        // 极淡纹理叠加
        WebkitTextStroke: '0.3px rgba(180,160,110,0.08)',
      }}>♠</div>

      {/* ♠ 内发光叠加层 - 增强华丽感 */}
      <div aria-hidden style={{
        position: 'absolute',
        right: `${markX}vw`,
        top:  `${markY}vh`,
        transform: 'translate(50%, -50%)',
        fontSize: 'clamp(360px, 65vw, 900px)',
        lineHeight: 1,
        color: 'transparent',
        opacity: phase >= 1 ? 0.06 : 0,
        fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
        pointerEvents: 'none',
        userSelect: 'none',
        transition: `opacity 2.0s cubic-bezier(0.12,1,0.24,1)`,
        zIndex: 2,
        letterSpacing: '-0.02em',
        textShadow: `
          0 0 80px rgba(212,175,55,0.25),
          0 0 160px rgba(184,149,74,0.15),
          0 0 280px rgba(184,149,74,0.08)
        `,
      }}>♠</div>
      {/* ♠ 外发光光晕 */}
      <div aria-hidden style={{
        position: 'absolute',
        right: `${markX - 5}vw`,
        top:  `${markY - 3}vh`,
        transform: 'translate(50%, -50%)',
        width: 'clamp(300px, 50vw, 700px)',
        height: 'clamp(300px, 50vw, 700px)',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(184,149,74,0.04) 40%, transparent 70%)`,
        pointerEvents: 'none',
        userSelect: 'none',
        opacity: phase >= 1 ? 0.8 : 0,
        transition: `opacity 2.5s cubic-bezier(0.12,1,0.24,1)`,
        zIndex: 1,
        filter: 'blur(30px)',
      }} />

      {/* ═══════════════════════════════════════════════════
          顶部华丽金色边框线
      ═══════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(to right, transparent 3%, ${C.goldGlow} 25%, ${C.gold} 50%, ${C.goldGlow} 75%, transparent 97%)`,
        opacity: phase >= 2 ? 0.5 : 0,
        transition: 'opacity 1.2s ease 0.3s',
        zIndex: 10,
        boxShadow: `0 0 10px 2px rgba(212,175,55,0.25), 0 0 20px 4px rgba(212,175,55,0.1)`,
      }} />
      {/* 底部呼应边框线 */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '1px',
        background: `linear-gradient(to right, transparent 5%, ${C.goldDim} 30%, ${C.goldDim} 70%, transparent 95%)`,
        opacity: phase >= 3 ? 0.3 : 0,
        transition: 'opacity 1.2s ease 0.5s',
        zIndex: 10,
      }} />

      {/* ═══════════════════════════════════════════════════
          版心容器
      ═══════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1360px',
        margin: '0 auto',
        padding: 'clamp(80px, 11vh, 130px) clamp(48px, 9vw, 140px)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 3,
      }}>

        {/* ── 顶部：极简导航 ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 1.0s ease, transform 1.0s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: C.gold,
              opacity: 0.8,
            }} />
            <span style={{
              fontFamily: '"Jost", "Inter", system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: C.inkMid,
              textTransform: 'uppercase',
            }}>TCwenzhou</span>
          </div>

          <nav style={{ display: 'flex', gap: '40px' }}>
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
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  color: C.inkDim,
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '2px',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
                onMouseLeave={e => (e.currentTarget.style.color = C.inkDim)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ══════════════════════════════════════════════════
            中部：主内容区
        ══════════════════════════════════════════════════ */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(48px, 10vh, 120px)',
          paddingBottom: 'clamp(48px, 10vh, 120px)',
        }}>

          {/* 主标题区块 */}
          <div style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1.4s cubic-bezier(0.12,1,0.24,1), transform 1.4s cubic-bezier(0.12,1,0.24,1)',
          }}>
            {/* 标签行 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '36px',
            }}>
              <div style={{
                width: '32px', height: '1px',
                background: C.gold,
                opacity: 0.7,
              }} />
              <p style={{
                fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.48em',
                textTransform: 'uppercase',
                color: C.gold,
              }}>Portfolio · 2024</p>
            </div>

            {/* 人名主标题 */}
            <h1 style={{
              fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
              fontSize: 'clamp(80px, 12vw, 168px)',
              fontWeight: 400,
              lineHeight: 0.86,
              letterSpacing: '-0.025em',
              color: C.ink,
              marginBottom: '0',
              position: 'relative',
            }}>
              TCwenzhou
            </h1>

            {/* 标题下方装饰线组 */}
            <div style={{
              marginTop: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <div style={{
                height: '1px',
                background: `linear-gradient(to right, ${C.gold}, ${C.goldDim})`,
                opacity: 0.5,
                width: '60px',
              }} />
              <div style={{
                height: '1px',
                background: `linear-gradient(to right, ${C.ink}, transparent)`,
                opacity: 0.08,
                width: '100%',
              }} />
            </div>
          </div>

          {/* 副标题 + 链接组 */}
          <div style={{
            marginTop: '52px',
            display: 'flex',
            gap: '80px',
            alignItems: 'flex-start',
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.2s ease 0.1s, transform 1.2s ease 0.1s',
          }}>
            {/* 短描述 */}
            <p style={{
              fontFamily: '"Jost", "Inter", system-ui, sans-serif',
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              fontWeight: 300,
              lineHeight: 1.75,
              letterSpacing: '0.01em',
              color: C.inkDim,
              maxWidth: '400px',
            }}>
              计算机工程 · 系统实践<br />
              与 AI / 游戏探索
            </p>

            {/* 链接组 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              paddingTop: '4px',
            }}>
              {[
                { label: '查看项目', href: '/projects', primary: true },
                { label: '进入实验室', href: '/lab', primary: false },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    color: item.primary ? C.ink : C.inkDim,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'all 0.25s ease',
                    paddingBottom: '4px',
                    borderBottom: item.primary
                      ? `1px solid ${C.gold}`
                      : `1px solid rgba(106,103,96,0.3)`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = item.primary ? C.gold : C.inkMid
                    const line = e.currentTarget.querySelector('.line') as HTMLElement
                    if (line) line.style.width = item.primary ? '28px' : '22px'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = item.primary ? C.ink : C.inkDim
                    const line = e.currentTarget.querySelector('.line') as HTMLElement
                    if (line) line.style.width = '20px'
                  }}
                >
                  <span
                    className="line"
                    style={{
                      width: '20px',
                      height: '1px',
                      background: item.primary ? C.gold : C.inkFaint,
                      opacity: item.primary ? 0.9 : 0.5,
                      flexShrink: 0,
                      transition: 'width 0.25s ease, background 0.25s ease',
                    }}
                  />
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
          paddingTop: '20px',
          borderTop: `1px solid rgba(12,11,14,0.06)`,
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 1.0s ease 0.2s, transform 1.0s ease 0.2s',
        }}>
          <p style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: C.inkFaint,
          }}>
            github.com/TCwenzhou1
          </p>
          <p style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.06em',
            color: C.inkFaint,
          }}>
            hello@tcwenzhou.site
          </p>
        </div>
      </div>

      {/* ── 右下角页码感装饰 ── */}
      <div aria-hidden style={{
        position: 'absolute',
        right: 'clamp(40px, 6vw, 80px)',
        bottom: '40px',
        fontFamily: '"Jost", "Inter", system-ui, sans-serif',
        fontSize: '9px',
        fontWeight: 300,
        letterSpacing: '0.18em',
        color: C.inkFaint,
        opacity: phase >= 4 ? 0.5 : 0,
        transition: 'opacity 1.0s ease 0.4s',
        zIndex: 4,
      }}>01 — 04</div>

      {/* ── 左下角华丽装饰 ── */}
      <div aria-hidden style={{
        position: 'absolute',
        left: 'clamp(40px, 6vw, 80px)',
        bottom: '40px',
        fontFamily: '"Jost", "Inter", system-ui, sans-serif',
        fontSize: '9px',
        fontWeight: 300,
        letterSpacing: '0.14em',
        color: C.gold,
        opacity: phase >= 4 ? 0.7 : 0,
        transition: 'opacity 1.0s ease 0.5s',
        zIndex: 4,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{ width: '20px', height: '1px', background: `linear-gradient(to right, ${C.gold}, ${C.goldDim})`, opacity: 0.8 }} />
        Royal Edition
      </div>

      {/* ── 华丽角落装饰：左上角 ── */}
      <div aria-hidden style={{
        position: 'absolute',
        left: 'clamp(48px, 8vw, 100px)',
        top: 'clamp(48px, 8vh, 100px)',
        width: '40px',
        height: '40px',
        opacity: phase >= 2 ? 0.4 : 0,
        transition: 'opacity 1.2s ease 0.4s',
        zIndex: 4,
        pointerEvents: 'none',
      }}>
        {/* 左上角 L 形金色装饰 */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '1px',
          height: '100%',
          background: `linear-gradient(to bottom, ${C.gold}, transparent)`,
        }} />
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '1px',
          background: `linear-gradient(to right, ${C.gold}, transparent)`,
        }} />
      </div>

      {/* ── 华丽角落装饰：右上角 ── */}
      <div aria-hidden style={{
        position: 'absolute',
        right: 'clamp(48px, 8vw, 100px)',
        top: 'clamp(48px, 8vh, 100px)',
        width: '40px',
        height: '40px',
        opacity: phase >= 2 ? 0.35 : 0,
        transition: 'opacity 1.2s ease 0.5s',
        zIndex: 4,
        pointerEvents: 'none',
      }}>
        {/* 右上角 L 形金色装饰（镜像） */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '1px',
          height: '100%',
          background: `linear-gradient(to bottom, ${C.goldDim}, transparent)`,
        }} />
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '100%',
          height: '1px',
          background: `linear-gradient(to left, ${C.goldDim}, transparent)`,
        }} />
      </div>

      {/* ── 华丽金色对角线装饰 ── */}
      <div aria-hidden style={{
        position: 'absolute',
        left: 0, top: 0,
        width: '30vw',
        height: '30vh',
        background: `linear-gradient(135deg, rgba(212,175,55,0.06) 0%, transparent 50%)`,
        opacity: phase >= 2 ? 0.8 : 0,
        transition: 'opacity 1.5s ease 0.3s',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute',
        right: 0, bottom: 0,
        width: '25vw',
        height: '25vh',
        background: `linear-gradient(315deg, rgba(232,196,160,0.05) 0%, transparent 50%)`,
        opacity: phase >= 2 ? 0.6 : 0,
        transition: 'opacity 1.5s ease 0.4s',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* ── 响应式 ── */}
      <style>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
        }
      `}</style>
    </section>
  )
}
