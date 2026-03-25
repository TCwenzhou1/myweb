'use client'

import Link from 'next/link'
import { Github, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Games', href: '/games' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// 统一配色
const C = {
  bg:           '#F8F5EE',
  bgDeep:       '#E8E2D6',
  ink:          '#0F0E10',
  inkMid:       '#2A282C',
  inkDim:       '#5C585E',
  inkFaint:     '#9A9599',
  gold:         '#A88B55',
  goldChamp:    '#D4BC8A',
  goldPale:     '#E8DCC4',
}

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '0.5px solid rgba(200,190,168,0.5)',
        background: C.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 顶部金色细线 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 'clamp(32px, 6vw, 80px)',
          right: 'clamp(32px, 6vw, 80px)',
          height: '0.5px',
          background: `linear-gradient(to right, transparent, ${C.goldChamp}40, ${C.goldChamp}60, ${C.goldChamp}40, transparent)`,
        }}
      />

      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: 'clamp(48px, 6vh, 72px) clamp(32px, 6vw, 80px) clamp(32px, 4vh, 48px)',
        }}
      >
        {/* 主内容区 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(32px, 4vw, 48px)',
            marginBottom: 'clamp(40px, 5vh, 56px)',
          }}
        >
          {/* 品牌区 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${C.goldChamp}, ${C.gold})`,
                  boxShadow: `0 0 6px 1px rgba(196,162,101,0.35)`,
                }}
              />
              <span
                style={{
                  fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.26em',
                  color: C.inkMid,
                  textTransform: 'uppercase',
                }}
              >
                TCwenzhou
              </span>
            </div>
            <p
              style={{
                fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: C.inkDim,
                letterSpacing: '0.02em',
                maxWidth: '260px',
              }}
            >
              计算机工程 · 系统实践<br />
              与 AI / 游戏探索
            </p>
          </div>

          {/* 导航链接 */}
          <div>
            <p
              style={{
                fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                fontSize: '8px',
                fontWeight: 500,
                letterSpacing: '0.35em',
                color: C.gold,
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Archive
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                    color: C.inkFaint,
                    textDecoration: 'none',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.inkMid)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.inkFaint)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 联系 */}
          <div>
            <p
              style={{
                fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                fontSize: '8px',
                fontWeight: 500,
                letterSpacing: '0.35em',
                color: C.gold,
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://github.com/TCwenzhou1"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  transition: 'opacity 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <Github size={14} color={C.inkDim} />
                <span
                  style={{
                    fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 300,
                    letterSpacing: '0.04em',
                    color: C.inkDim,
                  }}
                >
                  github.com/TCwenzhou1
                </span>
              </a>
              <a
                href="mailto:hello@tcwenzhou.site"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  transition: 'opacity 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <Mail size={14} color={C.inkDim} />
                <span
                  style={{
                    fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 300,
                    letterSpacing: '0.04em',
                    color: C.inkDim,
                  }}
                >
                  hello@tcwenzhou.site
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* 底部字幕区 */}
        <div
          style={{
            borderTop: '0.5px solid rgba(200,190,168,0.4)',
            paddingTop: 'clamp(24px, 3vh, 32px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* 左：档案编号 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span
              style={{
                fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                fontSize: '8px',
                fontWeight: 300,
                letterSpacing: '0.2em',
                color: C.inkFaint,
                opacity: 0.6,
              }}
            >
              © {new Date().getFullYear()} TCwenzhou
            </span>
            <span
              style={{
                fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                fontSize: '8px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: C.gold,
                opacity: 0.5,
              }}
            >
              Director&apos;s Cut · Archive
            </span>
          </div>

          {/* 右：技术标注 */}
          <span
            style={{
              fontFamily: '"Jost", "Inter", system-ui, sans-serif',
              fontSize: '8px',
              fontWeight: 300,
              letterSpacing: '0.12em',
              color: C.inkFaint,
              opacity: 0.4,
            }}
          >
            Built with Next.js · Tailwind CSS · Deployed on Vercel
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
