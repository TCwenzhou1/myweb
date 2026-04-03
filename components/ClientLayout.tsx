'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { alpha } from '@/components/CinematicUI'

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
          background: `linear-gradient(to right, transparent 5%, ${alpha(C.goldChamp, 0.19)} 30%, ${alpha(C.goldChamp, 0.31)} 50%, ${alpha(C.goldChamp, 0.19)} 70%, transparent 95%)`,
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />

      <div
        key={pathname}
        style={{
          animation: `pageEnter 560ms ${EASE.cameraMove}`,
        }}
      >
        <Navbar />
        <main className={pathname === '/' ? '' : 'pt-16'}>{children}</main>
        <Footer />
      </div>

      <style>{`
        @keyframes pageEnter {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.995);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  )
}
