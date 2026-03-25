'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// 统一配色
const C = {
  bg:           '#F8F5EE',
  goldChamp:    '#D4BC8A',
  goldPale:     '#E8DCC4',
  gold:         '#A88B55',
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [mounted, setMounted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const prevPathnameRef = useRef(pathname)
  const isFirstRender = useRef(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 处理页面切换转场
  useEffect(() => {
    if (!mounted) return

    // 首次渲染不触发转场
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevPathnameRef.current = pathname
      setDisplayChildren(children)
      return
    }

    // 路径没变化，不处理
    if (pathname === prevPathnameRef.current) return

    const prevPath = prevPathnameRef.current
    prevPathnameRef.current = pathname

    // 开始转场：先淡出
    setTransitioning(true)

    // 300ms 后更新内容并淡入
    const timeout = setTimeout(() => {
      setDisplayChildren(children)
      window.scrollTo({ top: 0, behavior: 'instant' })

      // 短暂停顿后淡入
      const fadeInTimeout = setTimeout(() => {
        setTransitioning(false)
      }, 50)

      return () => clearTimeout(fadeInTimeout)
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [pathname, children, mounted])

  // 确保组件卸载时重置状态
  useEffect(() => {
    return () => {
      setTransitioning(false)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* 顶部金色细线 - 全局边框效果 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '0.5px',
          background: `linear-gradient(to right, transparent 5%, ${C.goldChamp}30 30%, ${C.goldChamp}50 50%, ${C.goldChamp}30 70%, transparent 95%)`,
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />

      {/* 转场遮罩层 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `linear-gradient(135deg, rgba(248,245,238,0.97) 0%, rgba(232,220,196,0.95) 50%, rgba(248,245,238,0.97) 100%)`,
          zIndex: 99,
          pointerEvents: transitioning ? 'none' : 'none', // 始终不拦截点击
          opacity: transitioning ? 1 : 0,
          transition: 'opacity 0.35s cubic-bezier(0.12,1,0.24,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          visibility: transitioning ? 'visible' : 'hidden', // 控制可见性
        }}
      >
        {/* 转场中央装饰 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            opacity: transitioning ? 1 : 0,
            transform: transitioning ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.goldChamp}, ${C.gold})`,
              boxShadow: `0 0 12px 3px rgba(196,162,101,0.4)`,
            }}
          />
          <span
            style={{
              fontFamily: '"Jost", "Inter", system-ui, sans-serif',
              fontSize: '8px',
              fontWeight: 400,
              letterSpacing: '0.4em',
              color: C.gold,
              textTransform: 'uppercase',
              opacity: 0.7,
            }}
          >
            Loading
          </span>
        </div>
      </div>

      {/* 页面内容容器 */}
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(6px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {!isHome && <Navbar />}
        <main className={isHome ? '' : 'pt-16'}>
          {displayChildren}
        </main>
        {!isHome && <Footer />}
      </div>
    </>
  )
}
