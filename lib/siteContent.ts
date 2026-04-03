export type ProjectStatus = 'active' | 'done' | 'wip'

export interface PortfolioProject {
  title: string
  description: string
  tags: string[]
  status: ProjectStatus
  github?: string
  demo?: string
  year?: string
  featured?: boolean
  href: string
}

export interface FocusArea {
  title: string
  description: string
  href: string
}

export interface QuickDestination {
  title: string
  description: string
  href: string
}

export interface GameRoadmapItem {
  title: string
  status: string
  description: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: '三国杀 AI 系统',
    description:
      '用强化学习 + MCTS 搜索树做的卡牌游戏 AI。主要在解决不完全信息下的决策问题，包括特征工程、自玩训练和多智能体对战框架。',
    tags: ['Python', 'PyTorch', 'RL', 'MCTS'],
    status: 'wip',
    github: 'https://github.com/TCwenzhou1/sgs-ai',
    year: '2024',
    featured: true,
    href: '/projects',
  },
  {
    title: 'AI 自动化邮件回复系统',
    description:
      '把 LLM 接入邮件流程里，做自动分类和回复草稿生成。目标是把重复性的邮件处理从手工操作变成半自动流程。',
    tags: ['Next.js', 'TypeScript', 'LangChain', 'PostgreSQL'],
    status: 'wip',
    github: 'https://github.com/TCwenzhou1/ai-mail-system',
    year: '2024',
    href: '/projects',
  },
  {
    title: '个人网站 / 实验主页',
    description:
      '这个站本身也是一个持续迭代中的前端实验场，用来展示项目、整理路线，并把正在做的东西公开出来。',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    status: 'active',
    github: 'https://github.com/TCwenzhou1/myweb',
    demo: 'https://www.tcwenzhou.site',
    year: '2024',
    href: '/projects',
  },
]

export const currentFocusAreas: FocusArea[] = [
  {
    title: '系统化做 AI 项目',
    description: '把模型实验、数据流程和产品体验连起来，而不是停在单点 demo。',
    href: '/projects',
  },
  {
    title: '做能长期积累的实验站',
    description: '把网站当成公开工作台，持续记录项目、实验和阶段性思考。',
    href: '/about',
  },
  {
    title: '把学习内容产品化',
    description: '把日语实验室从个人工具继续打磨成更完整的可用页面。',
    href: '/lab',
  },
]

export const quickDestinations: QuickDestination[] = [
  {
    title: '项目档案',
    description: '先看我正在做和已经做过的核心项目。',
    href: '/projects',
  },
  {
    title: '日语实验室',
    description: '词库、复习、自测和语法整理都在这里。',
    href: '/lab',
  },
  {
    title: '关于我',
    description: '如果想快速理解我的方向、做事方式和长期兴趣，可以从这里看。',
    href: '/about',
  },
  {
    title: '联系',
    description: '适合合作、交流或者直接约一个想法讨论。',
    href: '/contact',
  },
]

export const gameRoadmap: GameRoadmapItem[] = [
  {
    title: '卡牌对战原型',
    status: '设计中',
    description: '先把回合结构、卡牌反馈和最小规则闭环搭起来，再决定是否继续扩展成完整项目。',
  },
  {
    title: 'AI 对手实验',
    status: '研究中',
    description: '把对战 AI 的探索和可玩的原型接起来，而不是把研究和游戏实现完全分开。',
  },
  {
    title: '演出与界面系统',
    status: '准备中',
    description: '验证战斗信息层级、反馈节奏和观感，给后续真正的可玩内容预留 UI 方向。',
  },
]
