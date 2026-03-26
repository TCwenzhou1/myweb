'use client'

import { useEffect, useState, useRef } from 'react'

// ─── 配色 ───────────────────────────────────────────────────────────────────
const C = {
  bg:           '#F8F5EE',   // 暖象牙白
  bgWarm:       '#F2EDE3',   // 暖灰底
  bgDeep:       '#E8E2D6',   // 深暖层
  ink:          '#0F0E10',   // 深墨色
  inkMid:       '#2A282C',   // 中灰墨
  inkDim:       '#5C585E',   // 次级灰
  inkFaint:     '#9A9599',   // 极淡灰

  // 高端金色系统 - muted, refined
  gold:         '#A88B55',   // 古典金
  goldRich:     '#C4A265',   // 醇厚金
  goldChamp:    '#D4BC8A',   // 香槟金
  goldPale:     '#E8DCC4',   // 极淡金
  goldGlow:     '#D4AF37',   // 亮金色

  // 收藏级材质
  cardIvory:    '#FAF8F3',   // 牌面象牙白
  cardShadow:   '#D8D0C0',   // 牌面阴影
  cardBorder:   '#C8BEA8',   // 牌边框

  // 高光
  spotlight:    '#FFF9F0',   // 聚光灯色
}

// ─── 粒子组件 ─────────────────────────────────────────────────────────────────
function Sparkles() {
  const [sparks, setSparks] = useState<Array<{
    x: number; y: number; size: number; duration: number; delay: number; opacity: number
  }>>([])

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.15,
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
            background: `radial-gradient(circle, ${C.goldRich} 0%, ${C.goldChamp} 40%, transparent 70%)`,
            opacity: s.opacity,
            animation: `sparkPulse ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes sparkPulse {
          0%, 100% { opacity: 0.05; transform: scale(0.6); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

// ─── 聚光灯效果 ─────────────────────────────────────────────────────────────────
function Spotlight() {
  return (
    <>
      <div aria-hidden style={{
        position: 'absolute',
        left: '15%',
        top: '-20%',
        width: '60vw',
        height: '80vh',
        borderRadius: '50%',
        background: `radial-gradient(ellipse at center, rgba(255,249,240,0.7) 0%, rgba(255,249,240,0.3) 25%, transparent 60%)`,
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'spotlightBreath 7s ease-in-out infinite',
      }} />
      <div aria-hidden style={{
        position: 'absolute',
        right: '10%',
        bottom: '10%',
        width: '40vw',
        height: '50vh',
        borderRadius: '50%',
        background: `radial-gradient(ellipse at center, rgba(212,188,138,0.12) 0%, transparent 65%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'spotlightBreath 9s ease-in-out 2s infinite',
      }} />
      <style>{`
        @keyframes spotlightBreath {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  )
}

// ─── 皇家展柜卡牌 ─────────────────────────────────────────────────────────────────
// 五层结构：角标层 / 中央徽记 / 铭文层 / 边框压纹 / 底部编号
function RoyalCard({ phase }: { phase: number }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '340px',
      aspectRatio: '2.5 / 3.5',
      opacity: phase >= 3 ? 1 : 0,
      transform: phase >= 3 ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.90)',
      transition: 'opacity 1.4s cubic-bezier(0.12,1,0.24,1) 0.2s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s',
    }}>
      {/* 外层华丽金色边框 - 第二层（旧金/香槟金） */}
      <div style={{
        position: 'absolute',
        inset: '-4px',
        borderRadius: '16px',
        background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldChamp} 25%, ${C.goldPale} 50%, ${C.goldChamp} 75%, ${C.gold} 100%)`,
        opacity: 0.6,
        filter: 'blur(0.3px)',
      }} />

      {/* 外层金色边框 - 第一层（更香槟金） */}
      <div style={{
        position: 'absolute',
        inset: '-2px',
        borderRadius: '14px',
        background: `linear-gradient(135deg, ${C.goldChamp} 0%, ${C.goldPale} 35%, ${C.goldChamp} 65%, ${C.goldRich} 100%)`,
        opacity: 0.8,
      }} />

      {/* 主牌面 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '12px',
        background: `linear-gradient(168deg, ${C.cardIvory} 0%, #F5F1E8 40%, ${C.bgWarm} 100%)`,
        boxShadow: `
          0 2px 4px rgba(0,0,0,0.02),
          0 8px 24px rgba(0,0,0,0.06),
          0 24px 60px rgba(0,0,0,0.08),
          inset 0 1px 0 rgba(255,255,255,0.9)
        `,
        overflow: 'hidden',
      }}>
        {/* 牌面纸纹质感 */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3Cfilter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          opacity: 0.8,
        }} />

        {/* ═══════════════════════════════════════════════════
            第一层：外层双线边框 + 四角切角装饰
        ═══════════════════════════════════════════════════ */}
        {/* 外层装饰线（更淡更细） */}
        <div style={{
          position: 'absolute',
          inset: '12px',
          border: `0.4px solid ${C.goldPale}`,
          borderRadius: '6px',
          opacity: 0.4,
        }} />
        {/* 内层装饰线（更淡更细） */}
        <div style={{
          position: 'absolute',
          inset: '17px',
          border: `0.25px solid ${C.goldChamp}`,
          borderRadius: '4px',
          opacity: 0.28,
        }} />

        {/* 四角切角装饰 - 左上（更明确） */}
        <div style={{
          position: 'absolute',
          top: '22px',
          left: '22px',
          width: '10px',
          height: '10px',
          borderTop: `0.6px solid ${C.goldChamp}`,
          borderLeft: `0.6px solid ${C.goldChamp}`,
          opacity: 0.5,
        }} />
        {/* 四角切角装饰 - 右上 */}
        <div style={{
          position: 'absolute',
          top: '22px',
          right: '22px',
          width: '10px',
          height: '10px',
          borderTop: `0.6px solid ${C.goldChamp}`,
          borderRight: `0.6px solid ${C.goldChamp}`,
          opacity: 0.5,
        }} />
        {/* 四角切角装饰 - 左下 */}
        <div style={{
          position: 'absolute',
          bottom: '22px',
          left: '22px',
          width: '10px',
          height: '10px',
          borderBottom: `0.6px solid ${C.goldChamp}`,
          borderLeft: `0.6px solid ${C.goldChamp}`,
          opacity: 0.5,
        }} />
        {/* 四角切角装饰 - 右下 */}
        <div style={{
          position: 'absolute',
          bottom: '22px',
          right: '22px',
          width: '10px',
          height: '10px',
          borderBottom: `0.6px solid ${C.goldChamp}`,
          borderRight: `0.6px solid ${C.goldChamp}`,
          opacity: 0.5,
        }} />

        {/* ═══════════════════════════════════════════════════
            第二层：中央大花色压纹 ♠（像王室纹章中心）
        ═══════════════════════════════════════════════════ */}
        {/* 纹章底晕 — 让黑桃更像中心焦点 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(212,188,138,0.06) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(90px, 16vw, 130px)',
          color: 'transparent',
          fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          WebkitTextStroke: `0.5px ${C.inkMid}`,
          textShadow: `
            0 0 0 ${C.cardIvory},
            0 2px 4px rgba(0,0,0,0.04),
            0 6px 12px rgba(0,0,0,0.03)
          `,
          opacity: 0.55,
        }}>♠</div>

        {/* ═══════════════════════════════════════════════════
            第三层：顶部角标 A♠（优雅衬线体）
        ═══════════════════════════════════════════════════ */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1px',
        }}>
          <span style={{
            fontFamily: '"Cormorant Garamond", "Times New Roman", Georgia, serif',
            fontSize: '16px',
            fontWeight: 500,
            color: C.inkMid,
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}>A</span>
          <span style={{
            fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
            fontSize: '10px',
            color: C.inkDim,
            lineHeight: 1,
          }}>♠</span>
        </div>

        {/* ═══════════════════════════════════════════════════
            第四层：底部角标 A♠（倒置）
        ═══════════════════════════════════════════════════ */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1px',
          transform: 'rotate(180deg)',
        }}>
          <span style={{
            fontFamily: '"Cormorant Garamond", "Times New Roman", Georgia, serif',
            fontSize: '16px',
            fontWeight: 500,
            color: C.inkMid,
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}>A</span>
          <span style={{
            fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
            fontSize: '10px',
            color: C.inkDim,
            lineHeight: 1,
          }}>♠</span>
        </div>

        {/* ═══════════════════════════════════════════════════
            第五层：中央铭文信息层 — 三层节奏
            上：TCWENZHOU（主身份）
            中：ROYAL EDITION（系列）
            下：SYSTEMS · AI · GAMES（分类）
        ═══════════════════════════════════════════════════ */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '9px',
          paddingTop: '4px',
        }}>
          {/* TCWENZHOU — 主铭文，远看身份感更强 */}
          <span style={{
            fontFamily: '"Cormorant Garamond", "Times New Roman", Georgia, serif',
            fontSize: '14px',     // 13px → 14px
            fontWeight: 600,       // 500 → 600（更明确）
            letterSpacing: '0.32em',
            color: C.ink,         // inkMid → ink（最清晰）
            textTransform: 'uppercase',
          }}>TCwenzhou</span>

          {/* 分隔线 */}
          <div style={{
            width: '36px',
            height: '0.4px',
            background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`,
            opacity: 0.7,
          }} />

          {/* ROYAL EDITION — 系列，金色清晰 */}
          <span style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '7px',
            fontWeight: 500,
            letterSpacing: '0.38em',  // 0.34 → 0.38（更舒展）
            color: C.gold,
            textTransform: 'uppercase',
          }}>Royal Edition</span>

          {/* 分隔线 */}
          <div style={{
            width: '28px',
            height: '0.3px',
            background: `linear-gradient(to right, transparent, ${C.goldPale}, transparent)`,
            opacity: 0.5,
          }} />

          {/* SYSTEMS · AI · GAMES — 分类，稳定可读 */}
          <span style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '6px',        // 5.5px → 6px
            fontWeight: 400,
            letterSpacing: '0.22em',
            color: C.inkDim,
            textTransform: 'uppercase',
          }}>Systems · AI · Games</span>
        </div>

        {/* ═══════════════════════════════════════════════════
            第六层：底部档案编号 — 馆藏样张感
        ═══════════════════════════════════════════════════ */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
        }}>
          <div style={{
            width: '44px',
            height: '0.4px',
            background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`,
            opacity: 0.6,
          }} />
          <span style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '6.5px',     // 6px → 6.5px
            fontWeight: 500,        // 400 → 500
            letterSpacing: '0.24em',
            color: C.inkDim,
            textTransform: 'uppercase',
          }}>Scene 01 / Archive No. A-01</span>
          <span style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '5px',       // 4.5px → 5px
            fontWeight: 300,
            letterSpacing: '0.18em',
            color: C.inkDim,
            opacity: 0.75,
          }}>TCwenzhou Private Collection</span>
        </div>

        {/* 金属烫边效果 - 顶部 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '0.5px',
          background: `linear-gradient(to right, transparent, ${C.goldChamp} 20%, ${C.goldRich} 50%, ${C.goldChamp} 80%, transparent)`,
          opacity: 0.45,
        }} />
        {/* 金属烫边效果 - 底部 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: '0.5px',
          background: `linear-gradient(to right, transparent, ${C.goldChamp} 20%, ${C.goldRich} 50%, ${C.goldChamp} 80%, transparent)`,
          opacity: 0.35,
        }} />
      </div>

      {/* 展示台阴影 — 更像接地 */}
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '8%',
        right: '8%',
        height: '45px',
        background: `radial-gradient(ellipse at center top, rgba(30,25,15,0.15) 0%, transparent 70%)`,
        filter: 'blur(14px)',
      }} />

      {/* ═══════════════════════════════════════════════════
          展厅光效果 — 左上到右下极轻柔光过渡
      ═══════════════════════════════════════════════════ */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '12px',
        background: `linear-gradient(
          135deg,
          rgba(255,249,240,0.15) 0%,
          transparent 40%,
          transparent 60%,
          rgba(30,25,15,0.04) 100%
        )`,
        pointerEvents: 'none',
        zIndex: 10,
      }} />
    </div>
  )
}

// ─── 副牌（极淡背景装饰）────────────────────────────────────────────────────────────────
function FaintCards({ phase }: { phase: number }) {
  return (
    <>
      {/* 左侧极淡副牌 */}
      <div aria-hidden style={{
        position: 'absolute',
        left: '-15%',
        top: '15%',
        width: '45%',
        aspectRatio: '2.5 / 3.5',
        borderRadius: '8px',
        background: `linear-gradient(165deg, ${C.cardIvory} 0%, ${C.bgWarm} 100%)`,
        opacity: phase >= 4 ? 0.15 : 0,
        transform: `rotate(-12deg) translateY(${phase >= 4 ? 0 : 20}px)`,
        transition: 'opacity 1.0s ease 0.5s, transform 1.0s ease 0.5s',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        zIndex: 1,
      }} />
      {/* 右侧极淡副牌 */}
      <div aria-hidden style={{
        position: 'absolute',
        right: '-12%',
        bottom: '10%',
        width: '40%',
        aspectRatio: '2.5 / 3.5',
        borderRadius: '8px',
        background: `linear-gradient(165deg, ${C.cardIvory} 0%, ${C.bgDeep} 100%)`,
        opacity: phase >= 4 ? 0.12 : 0,
        transform: `rotate(8deg) translateY(${phase >= 4 ? 0 : 20}px)`,
        transition: 'opacity 1.0s ease 0.7s, transform 1.0s ease 0.7s',
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        zIndex: 1,
      }} />
    </>
  )
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [phase, setPhase] = useState(0)
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    // 电影化入场顺序（4阶段）：
    // 1. 背景暖雾醒（200ms）
    // 2. 黑桃水印隐约 + 金框线条（800ms）
    // 3. 主牌滑入落位（1500ms），副牌跟随
    // 4. 标题 + 副标题 + 按钮 + 底部信息最后出现（2100ms）
    t.push(setTimeout(() => setPhase(1), 200))
    t.push(setTimeout(() => setPhase(2), 800))
    t.push(setTimeout(() => setPhase(3), 1500))
    t.push(setTimeout(() => setPhase(4), 2100))
    return () => t.forEach(clearTimeout)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMouseX((e.clientX - rect.left) / rect.width)
    setMouseY((e.clientY - rect.top) / rect.height)
  }

  const markX = 55 + (mouseX - 0.5) * 1.2
  const markY = 45 + (mouseY - 0.5) * 1.0

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
          背景层
      ═══════════════════════════════════════════════════ */}

      {/* 聚光灯效果 */}
      <Spotlight />

      {/* 粒子层 */}
      <Sparkles />

      {/* 背景渐变层 */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 15% 5%, rgba(255,252,244,0.9) 0%, transparent 50%),
          radial-gradient(ellipse 60% 50% at 85% 95%, rgba(212,188,138,0.08) 0%, transparent 45%),
          linear-gradient(175deg, rgba(255,252,244,0.3) 0%, transparent 30%, rgba(15,14,16,0.02) 100%)
        `,
        zIndex: 0,
      }} />

      {/* 纸纹层 */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3Cfilter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E")`,
        zIndex: 1,
      }} />

      {/* 地面阴影 */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(to top, rgba(30,25,15,0.04) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ♠ 背景大水印 — phase 2 才显现，更慢更电影 */}
      <div aria-hidden style={{
        position: 'absolute',
        right: `${markX}vw`,
        top: `${markY}vh`,
        transform: 'translate(50%, -50%)',
        fontSize: 'clamp(320px, 55vw, 800px)',
        lineHeight: 1,
        color: '#0A090E',
        opacity: phase >= 2 ? 0.032 : 0,
        fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
        pointerEvents: 'none',
        userSelect: 'none',
        transition: 'opacity 2.5s cubic-bezier(0.12,1,0.24,1)',
        zIndex: 1,
        letterSpacing: '-0.02em',
        WebkitTextStroke: '0.3px rgba(180,160,110,0.06)',
        filter: 'blur(0.5px)',
      }}>♠</div>

      {/* ♠ 内发光 — phase 2 更慢显现 */}
      <div aria-hidden style={{
        position: 'absolute',
        right: `${markX}vw`,
        top: `${markY}vh`,
        transform: 'translate(50%, -50%)',
        fontSize: 'clamp(320px, 55vw, 800px)',
        lineHeight: 1,
        color: 'transparent',
        opacity: phase >= 2 ? 0.035 : 0,
        fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
        pointerEvents: 'none',
        userSelect: 'none',
        transition: 'opacity 2.5s cubic-bezier(0.12,1,0.24,1)',
        zIndex: 2,
        letterSpacing: '-0.02em',
        textShadow: `
          0 0 60px rgba(212,175,55,0.12),
          0 0 120px rgba(184,149,74,0.08)
        `,
        filter: 'blur(1px)',
      }}>♠</div>

      {/* ═══════════════════════════════════════════════════
          顶部金色边框线
      ═══════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(to right, transparent 5%, ${C.goldChamp} 30%, ${C.goldRich} 50%, ${C.goldChamp} 70%, transparent 95%)`,
        opacity: phase >= 2 ? 0.4 : 0,
        transition: 'opacity 1.0s ease 0.2s',
        zIndex: 10,
        boxShadow: `0 0 8px 1px rgba(196,162,101,0.2)`,
      }} />

      {/* ═══════════════════════════════════════════════════
          版心容器 - Desktop: 两栏 / Tablet: 上下 / Mobile: 单列
      ═══════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1360px',
        margin: '0 auto',
        padding: 'clamp(70px, 10vh, 120px) clamp(24px, 5vw, 80px)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 3,
      }}>

        {/* ── 顶部：导航（Desktop 显示，Mobile 隐藏）─ */}
        <div className="hero-nav" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'opacity 1.0s ease, transform 1.0s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.goldChamp}, ${C.gold})`,
              boxShadow: `0 0 6px 1px rgba(196,162,101,0.4)`,
            }} />
            <span style={{
              fontFamily: '"Jost", "Inter", system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.28em',
              color: C.inkMid,
              textTransform: 'uppercase',
            }}>TCwenzhou</span>
          </div>

          <nav className="desktop-nav" style={{ display: 'flex', gap: '36px' }}>
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
                  letterSpacing: '0.12em',
                  color: C.inkFaint,
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '2px',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.inkMid)}
                onMouseLeave={e => (e.currentTarget.style.color = C.inkFaint)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ══════════════════════════════════════════════════
            中部：主内容区 - 三端响应式布局
            Desktop (>= 1200px): 两栏网格
            Tablet (768px-1199px): 上下双段
            Mobile (< 768px): 单列竖排
        ══════════════════════════════════════════════════ */}
        <div className="hero-main-grid" style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
          paddingTop: 'clamp(48px, 8vh, 100px)',
          paddingBottom: 'clamp(48px, 8vh, 100px)',
        }}>

          {/* ── 左栏：标题与信息 ── */}
          <div className="hero-content" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            order: 2, // Mobile: 卡片在上，内容在下
          }}>
            {/* 标签行 — Edition Mark 风格 */}
            <div className="hero-tag" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              marginBottom: '32px',
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 1.0s ease 0.2s, transform 1.0s ease 0.2s',
            }}>
              <div style={{
                width: '32px',
                height: '0.4px',
                background: `linear-gradient(to right, ${C.gold}, ${C.goldChamp})`,
                opacity: 0.8,
              }} />
              <p style={{
                fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.58em',    // 0.52em → 0.58em（更像 edition mark）
                textTransform: 'uppercase',
                color: C.gold,
              }}>TCwenzhou · Royal Edition</p>
            </div>

            {/* 主标题 */}
            <div className="hero-title" style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 1.4s cubic-bezier(0.12,1,0.24,1) 0.1s, transform 1.4s cubic-bezier(0.12,1,0.24,1) 0.1s',
            }}>
              <h1 style={{
                fontFamily: '"Cormorant Garamond", "Bodoni Moda", "Times New Roman", Georgia, serif',
                fontSize: 'clamp(48px, 8vw, 152px)',
                fontWeight: 400,
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
                color: C.ink,
                marginBottom: '0',
                position: 'relative',
              }}>
                TCwenzhou
              </h1>

              {/* 标题下方装饰组 */}
              <div style={{
                marginTop: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}>
                <div style={{
                  height: '0.5px',
                  background: `linear-gradient(to right, ${C.goldChamp}, ${C.goldPale})`,
                  opacity: 0.6,
                  width: '50px',
                }} />
                <div style={{
                  height: '0.5px',
                  background: `linear-gradient(to right, ${C.ink}, transparent)`,
                  opacity: 0.06,
                  width: '100%',
                }} />
              </div>
            </div>

            {/* 副标题 + 链接组 */}
            <div className="hero-links" style={{
              marginTop: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.0s ease 0.2s, transform 1.0s ease 0.2s',
            }}>
              {/* 短描述 — 一眼可读 */}
              <p style={{
                fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                fontWeight: 400,
                lineHeight: 1.9,           // 1.85 → 1.9
                letterSpacing: '0.03em',
                color: C.ink,              // inkMid → ink（清晰可读）
                maxWidth: '360px',
              }}>
                计算机工程 · 系统实践<br />
                与 AI / 游戏探索
              </p>

              {/* 链接组 — 导览入口风格 */}
              <div className="hero-buttons" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
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
                      fontSize: '12px',           // 13px → 12px（更精致）
                      fontWeight: 400,
                      letterSpacing: '0.18em',     // 0.16 → 0.18
                      color: item.primary ? C.ink : C.inkFaint,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '18px',                // 16px → 18px
                      transition: 'all 0.35s ease',
                      paddingTop: '8px',           // 新增，让按钮更修长
                      paddingBottom: '10px',       // 6px → 10px
                      borderBottom: item.primary
                        ? `0.4px solid ${C.gold}`   // 0.5px → 0.4px（更精细）
                        : `0.4px solid rgba(90,85,90,0.22)`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = item.primary ? C.goldRich : C.inkMid
                      e.currentTarget.style.borderBottomColor = item.primary ? C.goldRich : C.inkDim
                      e.currentTarget.style.transform = 'translateY(-1px)'  // 微抬升
                      const line = e.currentTarget.querySelector('.line') as HTMLElement
                      if (line) {
                        line.style.width = item.primary ? '34px' : '26px'
                        line.style.background = item.primary ? C.goldRich : C.inkDim
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = item.primary ? C.ink : C.inkFaint
                      e.currentTarget.style.borderBottomColor = item.primary ? C.gold : 'rgba(90,85,90,0.22)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      const line = e.currentTarget.querySelector('.line') as HTMLElement
                      if (line) {
                        line.style.width = '24px'
                        line.style.background = item.primary ? C.gold : C.inkFaint
                      }
                    }}
                  >
                    <span
                      className="line"
                      style={{
                        width: '24px',
                        height: '0.4px',          // 0.5px → 0.4px
                        background: item.primary ? C.gold : C.inkFaint,
                        flexShrink: 0,
                        transition: 'width 0.35s ease, background 0.35s ease',
                      }}
                    />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── 右栏：皇家展柜卡牌 ── */}
          <div className="hero-card" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            order: 1, // Mobile: 卡片在上
          }}>
            {/* 展柜装饰框架 */}
            <div style={{
              position: 'absolute',
              inset: '-20px',
              border: `0.5px solid ${C.goldPale}`,
              borderRadius: '20px',
              opacity: phase >= 3 ? 0.3 : 0,
              transition: 'opacity 1.0s ease 0.2s',
            }} />

            {/* 副牌装饰 */}
            <FaintCards phase={phase} />

            {/* 主牌 */}
            <RoyalCard phase={phase} />
          </div>
        </div>

        {/* ── 底部：信息行 — 片尾档案信息风格 ── */}
        <div className="hero-footer" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: `0.5px solid rgba(15,14,16,0.06)`,
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 1.0s ease 0.2s, transform 1.0s ease 0.2s',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '13px',             // 12px → 13px
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: C.inkMid,              // inkDim → inkMid
            opacity: 0.9,                 // 0.85 → 0.9
          }}>
            github.com/TCwenzhou1
          </p>
          <p style={{
            fontFamily: '"Jost", "Inter", system-ui, sans-serif',
            fontSize: '13px',             // 12px → 13px
            fontWeight: 400,
            letterSpacing: '0.06em',
            color: C.inkMid,               // inkDim → inkMid
            opacity: 0.9,                  // 0.85 → 0.9
          }}>
            hello@tcwenzhou.site
          </p>
        </div>
      </div>

      {/* ── 右下角页码感装饰 ── */}
      <div aria-hidden className="hero-page-num" style={{
        position: 'absolute',
        right: 'clamp(24px, 5vw, 70px)',
        bottom: '36px',
        fontFamily: '"Jost", "Inter", system-ui, sans-serif',
        fontSize: '11px',
        fontWeight: 300,
        letterSpacing: '0.2em',
        color: C.inkFaint,
        opacity: phase >= 4 ? 0.4 : 0,
        transition: 'opacity 1.0s ease 0.4s',
        zIndex: 4,
      }}>01 — 04</div>

      {/* ── 左下角 Royal Edition ── */}
      <div aria-hidden className="hero-royal" style={{
        position: 'absolute',
        left: 'clamp(24px, 5vw, 70px)',
        bottom: '36px',
        fontFamily: '"Jost", "Inter", system-ui, sans-serif',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.18em',
        color: C.gold,
        opacity: phase >= 4 ? 0.6 : 0,
        transition: 'opacity 1.0s ease 0.5s',
        zIndex: 4,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          width: '18px',
          height: '0.5px',
          background: `linear-gradient(to right, ${C.goldChamp}, ${C.gold})`,
          opacity: 0.7
        }} />
        Royal Edition
      </div>

      {/* ── 角落装饰：左上 ── */}
      <div aria-hidden className="hero-corner-tl" style={{
        position: 'absolute',
        left: 'clamp(24px, 7vw, 90px)',
        top: 'clamp(24px, 7vh, 90px)',
        width: '36px',
        height: '36px',
        opacity: phase >= 2 ? 0.35 : 0,
        transition: 'opacity 1.2s ease 0.4s',
        zIndex: 4,
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '0.5px',
          height: '100%',
          background: `linear-gradient(to bottom, ${C.goldChamp}, transparent)`,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '0.5px',
          background: `linear-gradient(to right, ${C.goldChamp}, transparent)`,
        }} />
      </div>

      {/* ── 角落装饰：右上 ── */}
      <div aria-hidden className="hero-corner-tr" style={{
        position: 'absolute',
        right: 'clamp(24px, 7vw, 90px)',
        top: 'clamp(24px, 7vh, 90px)',
        width: '36px',
        height: '36px',
        opacity: phase >= 2 ? 0.3 : 0,
        transition: 'opacity 1.2s ease 0.5s',
        zIndex: 4,
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '0.5px',
          height: '100%',
          background: `linear-gradient(to bottom, ${C.goldPale}, transparent)`,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '0.5px',
          background: `linear-gradient(to left, ${C.goldPale}, transparent)`,
        }} />
      </div>

      {/* ── 对角装饰光效 ── */}
      <div aria-hidden style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '25vw',
        height: '25vh',
        background: `linear-gradient(135deg, rgba(212,188,138,0.05) 0%, transparent 50%)`,
        opacity: phase >= 2 ? 0.7 : 0,
        transition: 'opacity 1.5s ease 0.3s',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '20vw',
        height: '20vh',
        background: `linear-gradient(315deg, rgba(232,196,160,0.04) 0%, transparent 50%)`,
        opacity: phase >= 2 ? 0.5 : 0,
        transition: 'opacity 1.5s ease 0.4s',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* ═══════════════════════════════════════════════════════════════
          三端响应式样式
          Mobile: < 768px - 单列竖排，卡片优先
          Tablet: 768px-1199px - 上下双段
          Desktop: >= 1200px - 两栏网格
      ═══════════════════════════════════════════════════════════════ */}
      <style>{`
        /* ── Tablet (768px - 1199px) ── */
        @media (max-width: 1199px) and (min-width: 768px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-card {
            order: 1 !important;
          }
          .hero-content {
            order: 2 !important;
            align-items: center;
            text-align: center;
          }
          .hero-tag {
            justify-content: center;
          }
          .hero-title h1 {
            text-align: center;
          }
          .hero-title > div {
            align-items: center;
          }
          .hero-title > div > div:first-child {
            margin: 24px auto 0;
          }
          .hero-links {
            align-items: center;
          }
          .hero-links p {
            text-align: center;
          }
          .hero-buttons {
            align-items: center;
          }
          .hero-footer {
            justify-content: center;
            text-align: center;
          }
          .hero-page-num, .hero-royal {
            display: none;
          }
          .desktop-nav {
            gap: 24px !important;
          }
        }

        /* ── Mobile (< 768px) ── */
        @media (max-width: 767px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .hero-nav {
            justify-content: center !important;
          }
          .hero-card {
            order: 1 !important;
            max-width: 240px;
            margin: 0 auto;
          }
          .hero-card > div:first-child {
            inset: -12px !important;
          }
          .hero-content {
            order: 2 !important;
            align-items: center;
            text-align: center;
          }
          .hero-tag {
            justify-content: center;
          }
          .hero-title h1 {
            text-align: center;
            font-size: clamp(42px, 12vw, 72px) !important;
          }
          .hero-title > div {
            align-items: center;
          }
          .hero-title > div > div:first-child {
            margin: 24px auto 0;
          }
          .hero-links {
            align-items: center;
            margin-top: 32px !important;
            gap: 24px !important;
          }
          .hero-links p {
            text-align: center;
            font-size: 15px !important;
          }
          .hero-buttons {
            align-items: center;
            width: 100%;
            max-width: 240px;
          }
          .hero-buttons a {
            font-size: 14px !important;
            justify-content: center;
            padding: 12px 0 !important;
            border-bottom-width: 1px !important;
          }
          .hero-footer {
            justify-content: center;
            text-align: center;
            flex-direction: column;
            gap: 8px;
          }
          .hero-footer p {
            font-size: 11px !important;
          }
          .hero-page-num, .hero-royal, .hero-corner-tl, .hero-corner-tr {
            display: none !important;
          }
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}