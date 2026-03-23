'use client'

import { ExternalLink, Github, ArrowRight, Cpu, Mail, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('projects')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const projects = [
    {
      title: '三国杀 AI 系统',
      description: '基于强化学习的智能卡牌游戏AI，能够模拟人类玩家策略，实现多智能体对战与决策优化。',
      icon: Cpu,
      tags: ['Python', 'PyTorch', '强化学习', '游戏AI'],
      links: {
        github: 'https://github.com/tcwenzhou/sgs-ai',
        demo: 'https://sgs-ai.tcwenzhou.com',
      },
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI 自动化邮件回复系统',
      description: '使用自然语言处理技术自动分类和回复邮件，支持智能模板生成和情感分析。',
      icon: Mail,
      tags: ['TypeScript', 'Next.js', 'OpenAI API', 'NLP'],
      links: {
        github: 'https://github.com/tcwenzhou/ai-mail-responder',
        demo: 'https://mail-ai.tcwenzhou.com',
      },
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: '个人网站 / 实验主页',
      description: '使用Next.js构建的现代化个人作品集网站，包含博客系统、项目展示和实验功能。',
      icon: Globe,
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      links: {
        github: 'https://github.com/tcwenzhou/portfolio',
        demo: 'https://tcwenzhou.com',
      },
      color: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            精选项目
            <span className="text-primary ml-2">/ Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            以下是我在学习过程中完成的主要项目，涵盖AI、Web开发和个人工具等多个领域。
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <div
                key={project.title}
                className={`glass-effect p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  isVisible ? 'animate-slide-up' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* 项目图标 */}
                <div className="mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} inline-block`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* 项目标题 */}
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>

                {/* 项目描述 */}
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* 技术标签 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-secondary text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 项目链接 */}
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <div className="flex space-x-3">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-secondary hover:bg-primary/10 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
                      aria-label="GitHub 仓库"
                    >
                      <Github className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-secondary hover:bg-primary/10 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
                      aria-label="在线演示"
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  </div>
                  <button className="flex items-center space-x-1 text-sm text-primary hover:text-accent transition-colors duration-300">
                    <span>查看详情</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* 其他项目展示 */}
        <div className="mt-12 glass-effect p-6 rounded-2xl border border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary">更多项目</h3>
              <p className="text-muted-foreground">
                还有多个小型实验、工具和开源贡献，可以在我的GitHub仓库中找到。
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                查看全部项目
              </button>
              <a
                href="https://github.com/tcwenzhou"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-secondary hover:bg-primary/10 text-foreground rounded-full border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects