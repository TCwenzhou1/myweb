'use client'

import { useState, useEffect, useRef } from 'react'
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
  featured?: boolean
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
    featured: true,
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
      {/* 背景氛围 - 更强的聚光感 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,252,244,0.9) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 85% 15%, rgba(212,188,138,0.08) 0%, transparent 45%),
            radial-gradient(ellipse 40% 30% at 15% 85%, rgba(248,245,238,0.6) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 大型 ♠ 水印 - 背景装饰 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          right: '-10vw',
          top: '30vh',
          fontSize: 'clamp(250px, 40vw, 500px)',
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
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(32px, 6vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        {/* 页头 */}
        <PageHeader
          title="项目"
          subtitle="主线展开"
          description="正在做和做过的东西。偏工程实践方向，不追求完美，追求能跑、能验证想法、能持续迭代。"
          scene={{ chapter: '02', title: 'Projects', subtitle: 'Collected Works' }}
        />

        {/* 档案馆布局 - 3个项目，1大2小 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 第一个项目 - 特色档案卡（更大） */}
          <CinematicSection delay={100}>
            <ProjectCard
              project={projects[0]}
              status={statusMap[projects[0].status]}
              variant="featured"
            />
          </CinematicSection>

          {/* 第二、三个项目 - 横向排列 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}
          >
            {projects.slice(1).map((project, index) => (
              <CinematicSection key={project.title} delay={(index + 2) * 120}>
                <ProjectCard
                  project={project}
                  status={statusMap[project.status]}
                  variant="standard"
                />
              </CinematicSection>
            ))}
          </div>
        </div>

        {/* 底部场景编号与导航 */}
        <CinematicSection delay={500}>
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

            {/* 场景导航 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <NavLink href="/lab" label="Lab" />
              <NavLink href="/games" label="Games" />
              <NavLink href="/about" label="About" />
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
              Scene 02 · Archive
            </span>
          </div>
        </CinematicSection>
      </div>
    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
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
      {label}
      <span style={{ fontSize: '10px' }}>→</span>
    </a>
  )
}

function ProjectCard({
  project,
  status,
  variant = 'standard',
}: {
  project: Project
  status: { label: string; color: string }
  variant?: 'featured' | 'standard'
}) {
  const [hovered, setHovered] = useState(false)
  const [mouseX, setMouseX] = useState(50)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMouseX(((e.clientX - rect.left) / rect.width) * 100)
  }

  const isFeatured = variant === 'featured'

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        background: C.cardIvory,
        border: `0.5px solid ${hovered ? C.goldChamp : 'rgba(200,190,168,0.5)'}`,
        borderRadius: isFeatured ? '16px' : '12px',
        padding: isFeatured ? 'clamp(32px, 4vw, 48px)' : 'clamp(20px, 2.5vw, 28px)',
        opacity: hovered ? 1 : 0.95,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.1), 0 0 0 0.5px ${C.goldChamp}40`
          : `0 2px 8px rgba(0,0,0,0.04)`,
        transition: 'all 0.5s cubic-bezier(0.12,1,0.24,1)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* 聚光效果 - 随鼠标移动 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${mouseX}% 30%, rgba(212,188,138,0.08) 0%, transparent 50%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* 内层双线 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: isFeatured ? '14px' : '10px',
          border: `0.5px solid ${C.goldPale}`,
          borderRadius: isFeatured ? '8px' : '6px',
          opacity: hovered ? 0.5 : 0.15,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* 纸纹 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: isFeatured ? '16px' : '12px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`,
          opacity: 0.6,
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
            marginBottom: isFeatured ? '20px' : '14px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: isFeatured ? 'clamp(22px, 2.5vw, 28px)' : 'clamp(16px, 1.8vw, 20px)',
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
                fontSize: '7px',
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
                  width: isFeatured ? '36px' : '30px',
                  height: isFeatured ? '36px' : '30px',
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
                <Github size={isFeatured ? 15 : 13} />
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
                  width: isFeatured ? '36px' : '30px',
                  height: isFeatured ? '36px' : '30px',
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
                <ExternalLink size={isFeatured ? 15 : 13} />
              </a>
            )}
          </div>
        </div>

        {/* 描述 */}
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: isFeatured ? 'clamp(14px, 1.4vw, 16px)' : 'clamp(12px, 1.2vw, 14px)',
            fontWeight: 300,
            lineHeight: 1.85,
            color: C.inkDim,
            marginBottom: isFeatured ? '24px' : '16px',
            maxWidth: isFeatured ? '720px' : '100%',
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
                fontSize: isFeatured ? '9px' : '8px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: C.inkDim,
                padding: isFeatured ? '5px 12px' : '4px 10px',
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
