'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// 统一配色
const C = {
  bg:           '#F8F5EE',
  goldChamp:    '#D4BC8A',
  goldPale:     '#E8DCC4',
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [mounted, setMounted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // 页面切换时先淡出
    setTransitioning(true)
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      // 淡入
      setTimeout(() => setTransitioning(false), 50)
    }, 200)
    return () => clearTimeout(timer)
  }, [pathname, children])

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

      {/* 页面内容容器 */}
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
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
