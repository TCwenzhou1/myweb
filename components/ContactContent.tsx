'use client'

import { useState } from 'react'
import { Github, Mail } from 'lucide-react'
import { CinematicSection, C, FONTS, EASE } from '@/components/CinematicUI'

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
      {/* 背景氛围 - 片尾字幕的光感 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,188,138,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 80% 90%, rgba(248,245,238,0.7) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 大型 ♠ 水印 - 底部 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          left: '-12vw',
          bottom: '10vh',
          fontSize: 'clamp(280px, 40vw, 500px)',
          color: 'transparent',
          fontFamily: '"Bodoni Moda", "Times New Roman", Georgia, serif',
          WebkitTextStroke: '0.5px rgba(168,139,85,0.04)',
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
          maxWidth: '560px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(32px, 6vw, 80px) clamp(60px, 8vh, 100px)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* 顶部装饰 */}
        <CinematicSection delay={0}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              marginBottom: 'clamp(48px, 8vh, 72px)',
            }}
          >
            {/* 场景标签 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
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
                06
              </span>
              <div
                style={{
                  width: '28px',
                  height: '0.5px',
                  background: `linear-gradient(to right, ${C.gold}, transparent)`,
                  opacity: 0.7,
                }}
              />
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
                End Credits
              </span>
            </div>

            {/* 主标题 */}
            <h1
              style={{
                fontFamily: FONTS.display,
                fontSize: 'clamp(40px, 6vw, 60px)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: C.ink,
                textAlign: 'center',
              }}
            >
              联系
            </h1>

            {/* 装饰 */}
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

            {/* 描述 */}
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 'clamp(14px, 1.4vw, 16px)', // 放大：13-15px → 14-16px
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.inkDim,
                textAlign: 'center',
                maxWidth: '380px',
              }}
            >
              有想法聊聊，或者有合适的项目想一起做，都可以找我。
            </p>
          </div>
        </CinematicSection>

        {/* 联系卡片 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: 'auto',
          }}
        >
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

        {/* 片尾字幕区 */}
        <CinematicSection delay={300}>
          <div
            style={{
              marginTop: 'auto',
              paddingTop: 'clamp(60px, 8vh, 80px)',
            }}
          >
            {/* 装饰线 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '0.5px',
                  background: `linear-gradient(to right, transparent, ${C.goldChamp})`,
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: C.gold,
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  width: '60px',
                  height: '0.5px',
                  background: `linear-gradient(to left, transparent, ${C.goldChamp})`,
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Archive 标注 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '11px', // 放大：8px → 11px
                  fontWeight: 400,
                  letterSpacing: '0.35em',
                  color: C.gold,
                  opacity: 0.6,
                  textTransform: 'uppercase',
                }}
              >
                Director&apos;s Cut · Archive
              </span>

              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '12px', // 放大：8px → 12px
                  fontWeight: 300,
                  letterSpacing: '0.15em',
                  color: C.inkFaint,
                  opacity: 0.5,
                }}
              >
                © {new Date().getFullYear()} TCwenzhou
              </span>

              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '11px', // 放大：7px → 11px
                  fontWeight: 300,
                  letterSpacing: '0.12em',
                  color: C.inkFaint,
                  opacity: 0.4,
                }}
              >
                tcwenzhou.site
              </span>
            </div>

            {/* 导航回首页 */}
            <div
              style={{
                marginTop: '40px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <a
                href="/"
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '12px', // 放大：9px → 12px
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  color: C.inkDim,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  transition: `all 0.3s ${EASE.focus}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 20px',
                  border: `0.5px solid ${C.goldPale}50`,
                  borderRadius: '6px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = C.inkMid
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.borderColor = C.goldChamp
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = C.inkDim
                  e.currentTarget.style.opacity = '0.7'
                  e.currentTarget.style.borderColor = `${C.goldPale}50`
                }}
              >
                <span style={{ fontSize: '14px' }}>←</span>
                回到开场
              </a>
            </div>
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
        border: `0.5px solid ${hovered ? C.goldChamp : 'rgba(200,190,168,0.5)'}`,
        borderRadius: '12px',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 12px 32px rgba(0,0,0,0.08), 0 0 0 0.5px ${C.goldChamp}30`
          : `0 2px 8px rgba(0,0,0,0.04)`,
        transition: `all 0.4s ${EASE.standard}`,
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
          transition: `all 0.35s ${EASE.focus}`,
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
            fontSize: '11px', // 放大：9px → 11px
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
            fontSize: 'clamp(15px, 1.5vw, 17px)', // 放大：14-16px → 15-17px
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
          opacity: hovered ? 0.8 : 0.35,
          transition: `opacity 0.25s ${EASE.focus}`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: '16px',
            color: C.inkFaint,
          }}
        >
          →
        </span>
      </div>
    </a>
  )
}
