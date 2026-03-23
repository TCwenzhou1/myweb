import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  tags: string[]
  status: 'active' | 'done' | 'wip'
  github?: string
  demo?: string
}

const projects: Project[] = [
  {
    title: '三国杀 AI 系统',
    description:
      '用强化学习 + MCTS 搜索树做的卡牌游戏 AI。主要在解决不完全信息下的决策问题，包括特征工程、自玩训练和多智能体对战框架。还在持续迭代中。',
    tags: ['Python', 'PyTorch', 'RL', 'MCTS'],
    status: 'wip',
    github: 'https://github.com/TCwenzhou1/sgs-ai',
  },
  {
    title: 'AI 自动化邮件回复系统',
    description:
      '把 LLM 接入邮件流程里，做自动分类和回复草稿生成。目的是把重复性的邮件处理从手工操作变成半自动化。目前在做原型验证阶段。',
    tags: ['Next.js', 'TypeScript', 'LangChain', 'PostgreSQL'],
    status: 'wip',
    github: 'https://github.com/TCwenzhou1/ai-mail-system',
  },
  {
    title: '个人网站 / 实验主页',
    description:
      '就是这个站。用 Next.js + Tailwind 做的，主要用来展示项目和实验，同时也是前端实践的场所。会持续迭代。',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    status: 'active',
    github: 'https://github.com/TCwenzhou1/myweb',
    demo: 'https://www.tcwenzhou.site',
  },
]

const statusMap = {
  active: { label: '运行中', color: '#059669' },
  done: { label: '已完成', color: '#6b7280' },
  wip: { label: '进行中', color: '#2563eb' },
}

export default function ProjectsPage() {
  return (
    <div className="section-padding py-16 max-w-4xl mx-auto">
      {/* header */}
      <div className="mb-12">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">
          Projects
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-4">项目</h1>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          正在做和做过的东西。偏工程实践方向，不追求完美，追求能跑、能验证想法、能持续迭代。
        </p>
      </div>

      {/* project list */}
      <div className="space-y-4">
        {projects.map((project) => {
          const status = statusMap[project.status]
          return (
            <div
              key={project.title}
              className="card-base p-6 md:p-7"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base font-semibold text-foreground">
                    {project.title}
                  </h2>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full border"
                    style={{
                      color: status.color,
                      borderColor: status.color + '40',
                      background: status.color + '10',
                    }}
                  >
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      aria-label="Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
