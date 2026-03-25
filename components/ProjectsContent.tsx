'use client'

import { useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { CinematicSection, PageHeader, C, FONTS } from '@/components/CinematicUI'

interface Project {
  title: string
  description: string
  tags: string[]
  status: 'active' | 'done' | 'wip'
  github?: string
  demo?: string
  year?: string
}

const projects: Project[] = [
  {
    title: '三国杀 AI 系统',
    description:
      '用强化学习 + MCTS 搜索树做的卡牌游戏 AI。主要在解决不完全信息下的决策问题，包括特征工程、自玩训练和多智能体对战框架。还在持续迭代中。',
    tags: ['Python', 'PyTorch', 'RL', 'MCTS'],
    status: 'wip',
    github: 'https://github.com/TCwenzhou1/sgs-ai',
    year: '2024',
  },
  {
    title: 'AI 自动化邮件回复系统',
    description:
      '把 LLM 接入邮件流程里，做自动分类和回复草稿生成。目的是把重复性的邮件处理从手工操作变成半自动化。目前在做原型验证阶段。',
    tags: ['Next.js', 'TypeScript', 'LangChain', 'PostgreSQL'],
    status: 'wip',
    github: 'https://github.com/TCwenzhou1/ai-mail-system',
    year: '2024',
  },
  {
    title: '个人网站 / 实验主页',
    description:
      '就是这个站。用 Next.js + Tailwind 做的，主要用来展示项目和实验，同时也是前端实践的场所。会持续迭代。',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    status: 'active',
    github: 'https://github.com/TCwenzhou1/myweb',
    demo: 'https://www.tcwenzhou.site',
    year: '2024',
  },
]

const statusMap = {
  active: { label: '运行中', color: '#7D9970' },
  done:   { label: '已完成', color: '#8A8A8A' },
  wip:    { label: '进行中', color: '#8A7D5D' },
}

export default function ProjectsContent() {
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
            radial-gradient(ellipse 60% 40% at 85% 10%, rgba(212,188,138,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 15% 90%, rgba(248,245,238,0.8) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 主内容 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(32px, 6vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        {/* 页头 */}
        <PageHeader
          title="项目"
          subtitle="主线展开"
          description="正在做和做过的东西。偏工程实践方向，不追求完美，追求能跑、能验证想法、能持续迭代。"
          scene={{ chapter: '02', title: 'Projects', subtitle: 'Archive' }}
        />

        {/* 项目列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {projects.map((project, index) => {
            const status = statusMap[project.status]
            return (
              <CinematicSection key={project.title} delay={index * 100}>
                <ProjectCard project={project} status={status} />
              </CinematicSection>
            )
          })}
        </div>

        {/* 底部场景编号 */}
        <CinematicSection delay={400}>
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
              02 — 03
            </span>
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
              Projects · Archive
            </span>
          </div>
        </CinematicSection>
      </div>
    </div>
  )
}

function ProjectCard({ project, status }: { project: Project; status: { label: string; color: string } }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: C.cardIvory,
        border: `0.5px solid ${hovered ? C.goldPale : 'rgba(200,190,168,0.5)'}`,
        borderRadius: '12px',
        padding: 'clamp(24px, 3vw, 36px)',
        opacity: hovered ? 1 : 0.95,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 12px 40px rgba(0,0,0,0.08), 0 0 0 0.5px ${C.goldPale}30`
          : `0 2px 8px rgba(0,0,0,0.04)`,
        transition: 'all 0.4s cubic-bezier(0.12,1,0.24,1)',
      }}
    >
      {/* 内层双线 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '10px',
          border: `0.5px solid ${C.goldPale}`,
          borderRadius: '6px',
          opacity: hovered ? 0.45 : 0.15,
          transition: 'opacity 0.4s ease',
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* 内容 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* 顶部行 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                color: C.ink,
              }}
            >
              {project.title}
            </h2>
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '8px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: status.color,
                padding: '3px 8px',
                borderRadius: '4px',
                background: `${status.color}12`,
                border: `0.5px solid ${status.color}30`,
              }}
            >
              {status.label}
            </span>
          </div>

          {/* 操作按钮 */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: `0.5px solid ${C.goldPale}`,
                  color: C.inkFaint,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.goldChamp
                  e.currentTarget.style.color = C.inkMid
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.goldPale
                  e.currentTarget.style.color = C.inkFaint
                }}
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: `0.5px solid ${C.goldPale}`,
                  color: C.inkFaint,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.goldChamp
                  e.currentTarget.style.color = C.inkMid
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.goldPale
                  e.currentTarget.style.color = C.inkFaint
                }}
                aria-label="Demo"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* 描述 */}
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 'clamp(13px, 1.3vw, 14px)',
            fontWeight: 300,
            lineHeight: 1.85,
            color: C.inkDim,
            marginBottom: '20px',
            maxWidth: '680px',
          }}
        >
          {project.description}
        </p>

        {/* 标签 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: FONTS.body,
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: C.inkDim,
                padding: '4px 10px',
                borderRadius: '4px',
                background: `${C.bgDeep}80`,
                border: `0.5px solid rgba(200,190,168,0.4)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
