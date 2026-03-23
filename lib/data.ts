// 社交链接
export const socialLinks = [
  { icon: 'Github', href: 'https://github.com/TCwenzhou1', label: 'GitHub' },
  { icon: 'Linkedin', href: 'https://linkedin.com/in/tcwenzhou', label: 'LinkedIn' },
  { icon: 'Mail', href: 'mailto:hello@tcwenzhou.site', label: 'Email' },
]

// 联系信息
export const contactInfo = [
  {
    icon: 'Mail',
    title: '邮箱',
    value: 'hello@tcwenzhou.site',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'Phone',
    title: '微信',
    value: 'tcwenzhou',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'MapPin',
    title: '位置',
    value: '中国',
    color: 'from-purple-500 to-pink-500',
  },
]

// 项目数据
export const projects = [
  {
    title: 'AI 智能卡牌游戏系统',
    description: '使用强化学习和自注意力机制实现卡牌游戏AI。包含MCTS搜索树、特征工程和多智能体对战系统，在自玩训练中达到竞技水平。',
    icon: 'Cpu',
    tags: ['Python', 'PyTorch', 'RL/MCTS', 'OpenAI Gym'],
    links: {
      github: 'https://github.com/TCwenzhou1/sgs-ai',
      demo: 'https://github.com/TCwenzhou1/sgs-ai',
    },
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'AI 邮件智能处理系统',
    description: '集成 LLM 的企业级邮件处理平台。支持邮件自动分类、智能回复生成、情感分析和模板学习，减少60%的手动处理时间。',
    icon: 'Mail',
    tags: ['Next.js', 'TypeScript', 'LangChain', 'PostgreSQL'],
    links: {
      github: 'https://github.com/TCwenzhou1/ai-mail-system',
      demo: 'https://github.com/TCwenzhou1/ai-mail-system',
    },
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: '现代个人作品集网站',
    description: '使用 Next.js 14、Tailwind CSS 和现代前端实践构建的响应式作品集。包含深色设计系统、流畅动画和性能优化，Vercel 部署。',
    icon: 'Globe',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind', 'Vercel'],
    links: {
      github: 'https://github.com/TCwenzhou1/myweb',
      demo: 'https://www.tcwenzhou.site',
    },
    color: 'from-green-500 to-emerald-500',
  },
]

// 个人标签
export const personalTags = [
  {
    icon: 'User',
    title: '计算机工程学生',
    description: '系统学习计算机科学基础与工程实践',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'Code2',
    title: 'AI 项目学习者',
    description: '专注于机器学习与AI应用开发',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: 'Gamepad2',
    title: '游戏开发兴趣',
    description: '探索游戏引擎与交互设计',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'Target',
    title: '长期主义成长路线',
    description: '持续积累，系统化提升能力',
    color: 'from-orange-500 to-red-500',
  },
]

// 快速导航
export const quickLinks = [
  { label: '首页', href: '#home' },
  { label: '关于我', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '技能', href: '#skills' },
  { label: '成长', href: '#growth' },
  { label: '联系', href: '#contact' },
]

// 核心价值观
export const coreValues = [
  '化繁为简 - 用工程思维解决复杂问题',
  '知行合一 - 学习与实践紧密结合',
  '系统思维 - 构建完整的技术知识体系',
  '长期主义 - 相信持续积累的力量',
]

// 合作方向
export const cooperationAreas = [
  'AI/ML 项目开发',
  'Web 全栈应用',
  '技术方案咨询',
  '开源项目贡献',
]

// 学习方向
export const learningPaths = [
  '大规模系统设计与架构',
  '分布式系统与云原生',
  '深度学习模型优化',
  'Web 3 & 区块链应用',
]
