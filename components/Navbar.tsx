'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Home', href: '/', chapter: '00' },
  { label: 'Projects', href: '/projects', chapter: '02' },
  { label: 'Games', href: '/games', chapter: '04' },
  { label: 'Lab', href: '/lab', chapter: '03' },
  { label: 'About', href: '/about', chapter: '05' },
  { label: 'Contact', href: '/contact', chapter: '06' },
]

// 统一配色
const C = {
  bg:           '#F8F5EE',
  ink:          '#0F0E10',
  inkMid:       '#2A282C',
  inkDim:       '#5C585E',
  inkFaint:     '#9A9599',
  gold:         '#A88B55',
  goldChamp:    '#D4BC8A',
  goldPale:     '#E8DCC4',
}

// 电影级缓动
const EASE = {
  focus: 'cubic-bezier(0.33, 1, 0.68, 1)',
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    const t = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        background: scrolled
          ? 'rgba(248,245,238,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? '0.5px solid rgba(200,190,168,0.4)'
          : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 clamp(32px, 6vw, 80px)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* 金色圆点标记 */}
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
        </Link>

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
          }}
          className="hidden md:flex"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  paddingBottom: '2px',
                  borderBottom: isActive
                    ? `0.5px solid ${C.gold}`
                    : '0.5px solid transparent',
                  transition: `all 0.3s ${EASE.focus}`,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderBottomColor = 'rgba(168,139,85,0.35)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderBottomColor = 'transparent'
                  }
                }}
              >
                <span
                  style={{
                    fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                    fontSize: '11px', // 放大：10px → 11px
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    color: isActive ? C.inkMid : C.inkFaint,
                    textTransform: 'uppercase',
                    transition: `color 0.3s ${EASE.focus}`,
                  }}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <div style={{
            width: '18px',
            height: '12px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <span style={{
              display: 'block',
              width: '100%',
              height: '0.5px',
              background: C.inkDim,
              transition: 'all 0.3s ease',
              transform: isOpen ? 'translateY(5.5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: '60%',
              height: '0.5px',
              background: C.inkDim,
              opacity: isOpen ? 0 : 1,
              transition: 'all 0.3s ease',
            }} />
            <span style={{
              display: 'block',
              width: '100%',
              height: '0.5px',
              background: C.inkDim,
              transition: 'all 0.3s ease',
              transform: isOpen ? 'translateY(-5.5px) rotate(-45deg)' : 'none',
            }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(248,245,238,0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '0.5px solid rgba(200,190,168,0.5)',
            padding: '24px clamp(32px, 6vw, 80px)',
          }}
          className="md:hidden"
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 0',
                    borderBottom: '0.5px solid rgba(200,190,168,0.3)',
                  }}
                >
                  <span style={{
                    fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                    fontSize: '11px', // 放大：9px → 11px
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    color: C.gold,
                    width: '24px',
                  }}>
                    {item.chapter}
                  </span>
                  <span style={{
                    fontFamily: '"Jost", "Inter", system-ui, sans-serif',
                    fontSize: '14px', // 放大：13px → 14px
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: '0.08em',
                    color: isActive ? C.ink : C.inkDim,
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
