'use client'

import { Github, Mail } from 'lucide-react'
import { CinematicSection, PageHeader, C, FONTS } from '@/components/CinematicUI'

export default function ContactContent() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景氛围 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,188,138,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 80% 90%, rgba(248,245,238,0.7) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 大型 ♠ 水印 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          left: '-8vw',
          bottom: '15vh',
          fontSize: 'clamp(280px, 40vw, 550px)',
          color: 'transparent',
          fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
          WebkitTextStroke: '0.5px rgba(168,139,85,0.05)',
          pointerEvents: 'none',
          zIndex: 0,
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        ♠
      </div>

      {/* 主内容 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '640px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(32px, 6vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        {/* 页头 */}
        <PageHeader
          title="联系"
          subtitle="片尾字幕"
          description="有想法聊聊，或者有合适的项目想一起做，都可以找我。"
          scene={{ chapter: '06', title: 'Contact', subtitle: 'Credits' }}
        />

        {/* 联系卡片 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <CinematicSection delay={100}>
            <ContactCard
              icon={<Mail size={18} />}
              label="邮箱"
              value="hello@tcwenzhou.site"
              href="mailto:hello@tcwenzhou.site"
            />
          </CinematicSection>

          <CinematicSection delay={180}>
            <ContactCard
              icon={<Github size={18} />}
              label="GitHub"
              value="github.com/TCwenzhou1"
              href="https://github.com/TCwenzhou1"
            />
          </CinematicSection>
        </div>

        {/* 片尾字幕风格 */}
        <CinematicSection delay={300}>
          <div
            style={{
              marginTop: 'clamp(80px, 10vh, 120px)',
              paddingTop: '32px',
              borderTop: '0.5px solid rgba(200,190,168,0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              textAlign: 'center',
            }}
          >
            {/* 金色细线装饰 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '0.5px',
                  background: `linear-gradient(to right, transparent, ${C.goldChamp})`,
                }}
              />
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${C.goldChamp}, ${C.gold})`,
                  boxShadow: `0 0 8px 2px rgba(196,162,101,0.3)`,
                }}
              />
              <div
                style={{
                  width: '40px',
                  height: '0.5px',
                  background: `linear-gradient(to left, transparent, ${C.goldChamp})`,
                }}
              />
            </div>

            {/* 档案编号 */}
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '8px',
                fontWeight: 300,
                letterSpacing: '0.3em',
                color: C.gold,
                opacity: 0.5,
                textTransform: 'uppercase',
              }}
            >
              Archive · End Credits
            </span>

            {/* 年份 */}
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '9px',
                fontWeight: 300,
                letterSpacing: '0.2em',
                color: C.inkFaint,
                opacity: 0.4,
              }}
            >
              © {new Date().getFullYear()} TCwenzhou
            </span>
          </div>
        </CinematicSection>
      </div>
    </div>
  )
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: 'clamp(20px, 2.5vw, 28px)',
        background: C.cardIvory,
        border: `0.5px solid ${hovered ? C.goldPale : 'rgba(200,190,168,0.5)'}`,
        borderRadius: '12px',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 8px 24px rgba(0,0,0,0.06), 0 0 0 0.5px ${C.goldPale}30`
          : `0 2px 8px rgba(0,0,0,0.04)`,
        transition: 'all 0.35s cubic-bezier(0.12,1,0.24,1)',
      }}
    >
      {/* 图标 */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: `${C.bgDeep}80`,
          border: `0.5px solid ${hovered ? C.goldChamp : 'rgba(200,190,168,0.4)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: hovered ? C.goldChamp : C.inkDim,
          transition: 'all 0.35s ease',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* 文字 */}
      <div>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.gold,
            marginBottom: '4px',
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            fontWeight: 300,
            color: C.ink,
            letterSpacing: '0.02em',
          }}
        >
          {value}
        </p>
      </div>

      {/* 箭头指示 */}
      <div
        style={{
          marginLeft: 'auto',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 0.6 : 0.3,
          transition: 'opacity 0.25s ease',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: '14px',
            color: C.inkFaint,
          }}
        >
          →
        </span>
      </div>
    </a>
  )
}

// 导入 useState
import { useState } from 'react'
