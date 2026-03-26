'use client'

import { CinematicSection, C, FONTS, EASE } from '@/components/CinematicUI'

export default function LabContent() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景氛围 - 工作台氛围 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 40% at 25% 20%, rgba(212,188,138,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 70% 85%, rgba(232,196,160,0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 装饰性网格线 - 工作台感 (Desktop/Tablet only) */}
      <div
        className="lab-grid-bg"
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(${C.goldPale}08 1px, transparent 1px),
            linear-gradient(90deg, ${C.goldPale}08 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.5,
        }}
      />

      {/* 主内容 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(24px, 5vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        {/* 页头 */}
        <CinematicSection delay={0}>
          <div className="lab-header" style={{ marginBottom: 'clamp(40px, 6vh, 64px)' }}>
            {/* 场景标签 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: C.gold,
                  textTransform: 'uppercase',
                }}
              >
                03
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
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  color: C.inkDim,
                  textTransform: 'uppercase',
                }}
              >
                Workshop
              </span>
            </div>

            {/* 主标题 */}
            <h1
              style={{
                fontFamily: FONTS.display,
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: C.ink,
                marginBottom: '16px',
              }}
            >
              实验室
            </h1>

            {/* 副标题 */}
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                fontWeight: 300,
                letterSpacing: '0.04em',
                color: C.inkMid,
                marginBottom: '20px',
              }}
            >
              幕后制作
            </p>

            {/* 装饰线 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div
                style={{
                  height: '0.5px',
                  background: `linear-gradient(to right, ${C.goldChamp}, ${C.goldPale})`,
                  opacity: 0.6,
                  width: '48px',
                }}
              />
              <div
                style={{
                  height: '0.5px',
                  background: `linear-gradient(to right, ${C.ink}, transparent)`,
                  opacity: 0.06,
                  width: '100%',
                }}
              />
            </div>

            {/* 描述 */}
            <p
              className="lab-desc"
              style={{
                fontFamily: FONTS.body,
                fontSize: 'clamp(14px, 1.4vw, 16px)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.inkDim,
                maxWidth: '480px',
                marginTop: '20px',
              }}
            >
              还没做完的东西、还没想清楚的想法、纯粹用来试验的 Demo。不追求完整，只追求有趣。
            </p>
          </div>
        </CinematicSection>

        {/* 空位预留 - 工作台风格 */}
        <CinematicSection delay={150}>
          <PlaceholderDemo
            title="空位预留中"
            description="会在这里放一些正在实验的东西。"
            status="待填充"
          />
        </CinematicSection>

        {/* 底部场景编号与导航 */}
        <CinematicSection delay={300}>
          <div
            className="lab-footer"
            style={{
              marginTop: 'clamp(60px, 8vh, 80px)',
              paddingTop: '24px',
              borderTop: '0.5px solid rgba(200,190,168,0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '13px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: C.inkFaint,
                opacity: 0.6,
              }}
            >
              03 — 04
            </span>

            {/* 导航 */}
            <div className="lab-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              <a
                href="/projects"
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  color: C.inkDim,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  transition: `all 0.3s ${EASE.focus}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = C.inkMid
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = C.inkDim
                  e.currentTarget.style.opacity = '0.7'
                }}
              >
                ← Projects
              </a>
              <a
                href="/games"
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  color: C.inkDim,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  transition: `all 0.3s ${EASE.focus}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = C.inkMid
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = C.inkDim
                  e.currentTarget.style.opacity = '0.7'
                }}
              >
                Games →
              </a>
            </div>

            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '12px',
                fontWeight: 300,
                letterSpacing: '0.12em',
                color: C.gold,
                opacity: 0.5,
              }}
            >
              Lab · Workshop
            </span>
          </div>
        </CinematicSection>
      </div>

      {/* 响应式样式 */}
      <style>{`
        /* ── Mobile (< 768px) ── */
        @media (max-width: 767px) {
          .lab-desc {
            font-size: 15px !important;
            line-height: 1.7 !important;
          }
          .lab-footer {
            flex-direction: column !important;
            justify-content: center !important;
            text-align: center;
            gap: 20px !important;
          }
          .lab-nav {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 16px !important;
          }
          .lab-nav a {
            font-size: 14px !important;
          }
          .lab-grid-bg {
            display: none !important;
          }
        }

        /* ── Tablet (768px - 1199px) ── */
        @media (max-width: 1199px) and (min-width: 768px) {
          .lab-footer {
            justify-content: center !important;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}

function PlaceholderDemo({ title, description, status }: { title: string; description: string; status: string }) {
  return (
    <div
      className="lab-placeholder"
      style={{
        position: 'relative',
        background: C.cardIvory,
        border: `0.5px solid rgba(200,190,168,0.5)`,
        borderRadius: '12px',
        padding: 'clamp(40px, 6vw, 72px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '280px',
        overflow: 'hidden',
      }}
    >
      {/* 内层双线 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '16px',
          border: `0.5px solid ${C.goldPale}`,
          borderRadius: '8px',
          opacity: 0.2,
          pointerEvents: 'none',
        }}
      />

      {/* 纸纹 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '12px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3Cfilter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* 实验器皿图标 */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          border: `1px dashed ${C.goldChamp}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          opacity: 0.5,
        }}
      >
        <span
          style={{
            fontFamily: '"Bodoni Moda", serif',
            fontSize: '24px',
            color: C.gold,
            opacity: 0.4,
          }}
        >
          +
        </span>
      </div>

      {/* 标题 */}
      <h3
        className="lab-placeholder-title"
        style={{
          fontFamily: FONTS.display,
          fontSize: 'clamp(20px, 2.5vw, 26px)',
          fontWeight: 400,
          color: C.ink,
          marginBottom: '8px',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>

      {/* 描述 */}
      <p
        className="lab-placeholder-desc"
        style={{
          fontFamily: FONTS.body,
          fontSize: 'clamp(14px, 1.3vw, 15px)',
          fontWeight: 300,
          color: C.inkDim,
          marginBottom: '16px',
        }}
      >
        {description}
      </p>

      {/* 状态标签 */}
      <span
        className="lab-placeholder-status"
        style={{
          fontFamily: FONTS.body,
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: C.gold,
          padding: '5px 14px',
          borderRadius: '4px',
          border: `0.5px solid ${C.goldChamp}50`,
          background: `${C.goldChamp}10`,
        }}
      >
        {status}
      </span>

      {/* Mobile 响应式 */}
      <style>{`
        @media (max-width: 767px) {
          .lab-placeholder {
            padding: 40px 24px !important;
            min-height: 240px !important;
          }
          .lab-placeholder-title {
            font-size: 22px !important;
          }
          .lab-placeholder-desc {
            font-size: 15px !important;
          }
        }
      `}</style>
    </div>
  )
}