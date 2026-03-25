'use client'

import { useState } from 'react'
import { CinematicSection, PageHeader, C, FONTS } from '@/components/CinematicUI'

export default function AboutContent() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景氛围 - 更聚焦的中心光 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 50% 60% at 50% 35%, rgba(212,188,138,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(248,245,238,0.5) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 主内容 - 居中更近的构图 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '680px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(32px, 6vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        {/* 页头 - 更克制的设计 */}
        <div style={{ marginBottom: 'clamp(48px, 7vh, 72px)' }}>
          <CinematicSection delay={0}>
            {/* 场景标签 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '8px',
                  fontWeight: 500,
                  letterSpacing: '0.3em',
                  color: C.gold,
                  textTransform: 'uppercase',
                }}
              >
                05
              </span>
              <div
                style={{
                  width: '24px',
                  height: '0.5px',
                  background: `linear-gradient(to right, ${C.gold}, transparent)`,
                  opacity: 0.6,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '8px',
                  fontWeight: 400,
                  letterSpacing: '0.25em',
                  color: C.inkFaint,
                  textTransform: 'uppercase',
                }}
              >
                Character
              </span>
            </div>

            {/* 主标题 */}
            <h1
              style={{
                fontFamily: FONTS.display,
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: C.ink,
                marginBottom: '16px',
              }}
            >
              关于
            </h1>

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
                  opacity: 0.5,
                  width: '40px',
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
          </CinematicSection>
        </div>

        {/* 内容区块 - 更近的镜头感 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(40px, 6vh, 56px)',
          }}
        >
          <CinematicSection delay={100}>
            <AboutSection title="现在在做什么">
              <p>
                计算机工程方向的学生。主要精力放在 AI 项目实践和系统工程上，同时对游戏开发保持长期兴趣。
                不追求「全栈样样通」，更注重在具体问题上把事情做深、做清楚。
              </p>
            </AboutSection>
          </CinematicSection>

          <CinematicSection delay={180}>
            <AboutSection title="几个方向">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'AI 项目', desc: '做了一些强化学习和 LLM 应用的实验，偏工程实践，不止停在论文阶段' },
                  { label: '游戏开发', desc: '长期关注游戏引擎和交互设计，慢慢在积累' },
                  { label: '系统工程', desc: '喜欢把散乱的流程做成可以复用的系统，哪怕只是给自己用' },
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      position: 'relative',
                      paddingLeft: '20px',
                      marginBottom: '16px',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '10px',
                        width: '16px',
                        height: '0.5px',
                        background: C.goldChamp,
                        opacity: 0.5,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        color: C.gold,
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: 'clamp(13px, 1.4vw, 15px)',
                        fontWeight: 300,
                        lineHeight: 1.8,
                        color: C.inkDim,
                      }}
                    >
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </AboutSection>
          </CinematicSection>

          <CinematicSection delay={260}>
            <AboutSection title="成长方式">
              <p>
                倾向于长期主义的路线。不追热点，但也不拒绝新东西。
                更相信一件事做扎实了的价值，比快速切换十件事更大。
              </p>
            </AboutSection>
          </CinematicSection>

          <CinematicSection delay={340}>
            <AboutSection title="这个站的用途">
              <p>
                记录在做的项目、尝试中的实验、可以玩的游戏。
                不是简历，不是个人品牌展示，更像是一个公开的工作台。
              </p>
            </AboutSection>
          </CinematicSection>
        </div>

        {/* 底部场景编号与导航 */}
        <CinematicSection delay={420}>
          <div
            style={{
              marginTop: 'clamp(60px, 8vh, 80px)',
              paddingTop: '24px',
              borderTop: '0.5px solid rgba(200,190,168,0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '8px',
                fontWeight: 300,
                letterSpacing: '0.2em',
                color: C.inkFaint,
                opacity: 0.5,
              }}
            >
              05 — 06
            </span>

            {/* 导航 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a
                href="/contact"
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '8px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  color: C.inkFaint,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  opacity: 0.6,
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = C.inkMid
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = C.inkFaint
                  e.currentTarget.style.opacity = '0.6'
                }}
              >
                Contact
                <span style={{ fontSize: '10px' }}>→</span>
              </a>
            </div>

            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '8px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: C.gold,
                opacity: 0.4,
              }}
            >
              Scene 05 · End
            </span>
          </div>
        </CinematicSection>
      </div>
    </div>
  )
}

function AboutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      {/* 标题 */}
      <h2
        style={{
          fontFamily: FONTS.display,
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          fontWeight: 400,
          letterSpacing: '0.01em',
          color: C.ink,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: '8px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: C.gold,
            textTransform: 'uppercase',
          }}
        >
          —
        </span>
        {title}
      </h2>

      {/* 内容 */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          fontWeight: 300,
          lineHeight: 1.9,
          color: C.inkDim,
          paddingLeft: '20px',
          borderLeft: `0.5px solid ${C.goldPale}40`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
