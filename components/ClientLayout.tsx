'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// 统一配色
const C = {
  bg:           '#F8F5EE',
  goldChamp:    '#D4BC8A',
  goldPale:     '#E8DCC4',
  gold:         '#A88B55',
  inkDim:       '#5C585E',
}

// 电影级缓动
const EASE = {
  dissolve: 'cubic-bezier(0.4, 0, 0.2, 1)',
  rackFocus: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  cameraMove: 'cubic-bezier(0.16, 1, 0.3, 1)',
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [mounted, setMounted] = useState(false)
  const [transitionState, setTransitionState] = useState<'idle' | 'exiting' | 'entering'>('idle')
  const [displayChildren, setDisplayChildren] = useState(children)
  const prevPathnameRef = useRef(pathname)
  const isFirstRender = useRef(true)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 处理页面切换转场 - 电影级 dissolve 效果
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

    // 开始转场：dissolve fade
    setTransitionState('exiting')

    // 400ms 后淡入新内容（电影级慢淡）
    const exitTimeout = setTimeout(() => {
      setDisplayChildren(children)
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      setTransitionState('entering')

      // 淡入完成
      const enterTimeout = setTimeout(() => {
        setTransitionState('idle')
      }, 450)

      return () => clearTimeout(enterTimeout)
    }, 400)

    return () => clearTimeout(exitTimeout)
  }, [pathname, children, mounted])

  if (!mounted) return null

  // 计算内容透明度 - 用于rack focus效果
  const contentOpacity = transitionState === 'idle' ? 1 : 0
  const contentTransform = transitionState === 'exiting'
    ? 'scale(1.01) translateY(8px)' // 轻微后退感
    : transitionState === 'entering'
    ? 'scale(0.99) translateY(-4px)' // 轻微前进感
    : 'scale(1) translateY(0)'

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
          height: '1px',
          background: `linear-gradient(to right, transparent 5%, ${C.goldChamp}30 30%, ${C.goldChamp}50 50%, ${C.goldChamp}30 70%, transparent 95%)`,
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />

      {/* 转场遮罩层 - 电影级淡入淡出 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `linear-gradient(160deg, rgba(248,245,238,0.98) 0%, rgba(240,235,225,0.97) 50%, rgba(248,245,238,0.98) 100%)`,
          zIndex: 99,
          pointerEvents: 'none',
          opacity: transitionState === 'idle' ? 0 : 1,
          transition: `opacity 450ms ${EASE.dissolve}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 转场中央装饰 - 类似电影场记板 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            opacity: transitionState === 'idle' ? 0 : 1,
            transform: transitionState === 'idle' ? 'scale(1)' : 'scale(0.96)',
            transition: `opacity 350ms ${EASE.dissolve} 50ms, transform 350ms ${EASE.cameraMove} 50ms`,
          }}
        >
          {/* 装饰圆点 */}
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.goldChamp}, ${C.gold})`,
              boxShadow: `0 0 20px 4px rgba(196,162,101,0.35), 0 0 40px 8px rgba(196,162,101,0.15)`,
            }}
          />
          {/* 装饰线 */}
          <div
            style={{
              width: '40px',
              height: '0.5px',
              background: `linear-gradient(to right, transparent, ${C.goldChamp}60, transparent)`,
            }}
          />
        </div>
      </div>

      {/* 页面内容容器 - rack focus 效果 */}
      <div
        ref={contentRef}
        style={{
          opacity: contentOpacity,
          transform: contentTransform,
          transition: `
            opacity 500ms ${EASE.rackFocus},
            transform 600ms ${EASE.cameraMove}
          `,
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
