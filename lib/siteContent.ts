export type ProjectStatus = 'active' | 'done' | 'wip'

export interface ProjectCase {
  slug: string
  title: string
  headline: string
  description: string
  tags: string[]
  status: ProjectStatus
  year: string
  period: string
  role: string
  featured?: boolean
  github?: string
  demo?: string
  background: string
  problem: string
  solution: string
  architecture: string[]
  challenges: string[]
  outcomes: string[]
  contributions: string[]
  nextStep: string
}

export interface PortfolioProject {
  title: string
  headline: string
  description: string
  role: string
  result: string
  tags: string[]
  status: ProjectStatus
  github?: string
  demo?: string
  year: string
  featured?: boolean
  href: string
}

export interface FocusArea {
  eyebrow: string
  title: string
  description: string
  href: string
}

export interface QuickDestination {
  title: string
  description: string
  href: string
  cta: string
}

export interface LabHighlight {
  title: string
  description: string
}

export interface GameProof {
  title: string
  stage: string
  engine: string
  snapshot: string
  description: string
  evidence: string[]
  nextMilestone: string
}

export interface GameRoadmapItem {
  title: string
  description: string
  status: string
}

export interface AboutCapability {
  title: string
  description: string
}

export interface ContactTopic {
  title: string
  description: string
  note: string
}

export const projectStatusLabelMap: Record<ProjectStatus, string> = {
  active: '运行中',
  done: '已完成',
  wip: '进行中',
}

export const projectCases: ProjectCase[] = [
  {
    slug: 'sgs-ai-system',
    title: '三国杀 AI 系统',
    headline: '围绕不完全信息卡牌对战，构建可训练、可对战、可继续扩展的策略系统。',
    description:
      '这是一个把强化学习、MCTS 搜索和自博弈流程放进同一条工程链路里的项目，目标不是只做一个算法 demo，而是搭一个能继续迭代的对战实验环境。',
    tags: ['Python', 'PyTorch', 'RL', 'MCTS', 'Self-play'],
    status: 'wip',
    year: '2024',
    period: '2024 - 至今',
    role: '算法设计 / 环境建模 / 训练框架',
    featured: true,
    github: 'https://github.com/TCwenzhou1/sgs-ai',
    background:
      '三国杀这类卡牌对战存在隐藏信息、阶段节奏复杂、动作空间不稳定的问题，很适合拿来验证策略搜索和强化学习在复杂博弈环境中的落地方式。',
    problem:
      '核心难点不是单次出牌，而是如何在信息不完整的前提下，让智能体稳定完成状态建模、行动选择和对局推进，同时保留后续实验可比性。',
    solution:
      '项目把规则环境、特征工程、搜索策略和训练循环拆成可独立替换的层。先保证环境和回合系统跑通，再逐步接入策略网络、自博弈和多智能体对战验证。',
    architecture: [
      '用规则环境统一描述阶段、技能触发、出牌与结算流程',
      '把状态编码和动作空间映射拆开，降低训练逻辑和规则逻辑的耦合',
      '用自博弈和搜索组合验证策略改动，而不是只看离线指标',
    ],
    challenges: [
      '隐藏信息和随机性会直接影响状态表示与训练稳定性',
      '规则环境一旦写死，后面加入技能和卡牌扩展会非常痛苦',
      '策略效果需要通过对战表现和收敛趋势双重验证',
    ],
    outcomes: [
      '完成了可持续迭代的对战环境骨架和核心训练实验链路',
      '把项目从单次实验脚本推进到了可比较、可复现的工程结构',
      '为后续接入更多牌堆规则、对手策略和评估指标留出了接口',
    ],
    contributions: [
      '独立拆分了环境规则层、训练层和评估层',
      '整理了状态特征、搜索流程和自博弈训练思路',
      '持续用真实对局反馈反推规则建模和策略设计',
    ],
    nextStep:
      '继续补充更完整的规则覆盖、稳定评估脚本和更清晰的对战可视化，让项目从研究实验进一步靠近可展示的系统作品。',
  },
  {
    slug: 'ai-mail-automation',
    title: 'AI 自动化邮件处理系统',
    headline: '把重复性的邮件分流、分类和回复草拟，整理成一条能被接入业务流的半自动流程。',
    description:
      '这个项目更偏产品和流程工程。重点不是单点调用 LLM，而是把分类、上下文提取、草稿生成和人工确认组合成能真正节省时间的操作链路。',
    tags: ['Next.js', 'TypeScript', 'LangChain', 'PostgreSQL', 'Workflow'],
    status: 'wip',
    year: '2024',
    period: '2024 - 至今',
    role: '产品设计 / 全栈实现 / 自动化流程',
    github: 'https://github.com/TCwenzhou1/ai-mail-system',
    background:
      '很多邮件场景的问题不在于“能不能生成回复”，而在于如何把来信意图识别、分类优先级和人工校对放进同一条可控流程里。',
    problem:
      '如果只做一个回复按钮，系统价值会很弱；真正的问题是如何降低操作成本，又不让错误回复直接进入正式沟通链路。',
    solution:
      '方案把邮件接入、意图分类、上下文摘要、回复草稿和人工确认拆成连续节点。让模型负责高重复度工作，人来做最后判断。',
    architecture: [
      '邮件数据进入后先做主题归类和优先级判断',
      'LLM 负责抽取核心诉求并生成结构化回复草稿',
      '人工确认层保证输出可控，避免完全自动发送带来的风险',
    ],
    challenges: [
      '邮件内容松散且噪声多，分类准确率直接影响后续体验',
      '草稿生成既要节省时间，也不能看起来像模板机器人',
      '流程必须允许人工插入，不能为自动化而牺牲可控性',
    ],
    outcomes: [
      '把“看邮件、分类、拟回复”的重复动作整理成更清晰的工作流',
      '验证了 LLM 在半自动流程里的真实价值，而不是停留在演示层',
      '形成了可继续扩展到 CRM、客服或内部协同的基础结构',
    ],
    contributions: [
      '独立完成了流程拆解、界面结构和核心实现方向',
      '把模型能力放到了人工确认前，提升实际可用性',
      '持续围绕高频使用场景调整字段设计和交互顺序',
    ],
    nextStep:
      '继续把模板管理、回复语气控制和历史上下文记忆补齐，让它更接近真正可投入使用的办公产品。',
  },
  {
    slug: 'tcwenzhou-site',
    title: 'TCwenzhou 个人站 / 实验主页',
    headline: '把个人网站当成长期迭代的产品，而不是一次性完成的展示页。',
    description:
      '这个网站本身也是一个持续演进的项目。它既承担作品集，也承担实验室和公开工作台的角色，目标是把风格、内容和产品感拉到同一条线上。',
    tags: ['Next.js', 'TypeScript', 'Vercel', 'Motion Design', 'Content Design'],
    status: 'active',
    year: '2024',
    period: '2024 - 至今',
    role: '信息架构 / 前端实现 / 内容策略',
    github: 'https://github.com/TCwenzhou1/myweb',
    demo: 'https://www.tcwenzhou.site',
    background:
      '个人站很容易变成“有风格但难以理解”，或者“信息很全但没有记忆点”。这个项目的目标是保留气质，同时提升可读性、转化力和产品延展性。',
    problem:
      '如果首页只讲氛围，访客很难判断值得看什么；如果所有页面都像列表，网站又会失去辨识度。问题核心是如何在叙事感和信息效率之间取得平衡。',
    solution:
      '采用电影分镜与档案馆结合的视觉语言，但在信息架构上用 Projects、Lab、Games 三条主线承接内容，让每个页面都承担清晰职责。',
    architecture: [
      '首页负责快速建立定位，并引导到最值得看的主线页面',
      'Projects 负责案例证明，Lab 负责产品证明，Games 负责方向与原型证明',
      '内容数据抽象到统一配置层，降低后续扩展和维护成本',
    ],
    challenges: [
      '需要保留已有气质，而不是改成通用作品集模板',
      '页面既要表达个人方向，也要具备真实项目与产品价值',
      '视觉表达与 SEO、可读性、移动端体验之间需要反复取舍',
    ],
    outcomes: [
      '站点从单纯展示页升级成了可持续扩展的个人产品骨架',
      '首页、Projects、Lab、Games、About、Contact 形成了更明确的内容分工',
      '后续新增项目详情、学习功能和游戏原型时不需要推翻重来',
    ],
    contributions: [
      '独立完成信息架构梳理、视觉统一和前端落地',
      '把作品集、实验室和合作入口整理成一致的内容系统',
      '持续根据真实访问体验迭代首页表达、案例结构和页面关系',
    ],
    nextStep:
      '继续补强项目详情内容、Lab 的学习闭环和 Games 的原型证据，让网站既有风格，也越来越像一个成熟的个人产品。',
  },
  {
    slug: 'company-agent-office',
    title: 'AI 工程小队操作台',
    headline: '把总工、前端、UI、后端、算法、运维、联调、巡检和 BUG 专员组织成可运行的多智能体协作流程。',
    description:
      '这是一个面向 AI 工作流和组织协作的产品原型。它用老板指挥台展示组织运行，用项目详情页里的 AI 小队控制台把一个小型工程团队的拆解、执行、联调、巡检和追责机制做成可以真实请求大模型的网页流程。',
    tags: ['Next.js', 'OpenAI API', 'Multi-agent', 'Workflow', 'Vite'],
    status: 'active',
    year: '2026',
    period: '2026',
    role: '产品定义 / 多智能体流程设计 / 前后端实现 / AI 接入安全改造',
    demo: '/company-agent-office/index.html',
    background:
      'AI 编程工具已经不缺单个助手，真正缺的是能稳定跑工程流程的协作机制。个人开发者和小团队会同时使用 OpenCode、Cursor、Copilot、Claude Code、MCP 和本地脚本，但谁拆任务、谁实现、谁验收、谁查 BUG、谁决定能不能上线，经常没有被产品化。',
    problem:
      '如果只做一个 agent 聊天框，模型输出很容易泛泛而谈；如果只画团队角色，又不能证明大模型真的有效。核心问题是如何让访客输入一个真实需求后，系统能产出角色分工、交接风险和验收清单，并且让流程从需求进入到交付判断完整闭环。',
    solution:
      '第一版把 9 个工程角色固化成职责矩阵，在项目详情页提供 AI 小队控制台。访客输入产品 brief 后，由服务端 API 调用大模型生成结构化协作方案；前端只展示结果和角色关系，API Key、模型选择和提示词都留在服务端。',
    architecture: [
      'Next.js 项目详情页承载产品叙事、角色矩阵和 AI 小队控制台',
      '服务端 API Route 读取 9 个角色职责，调用 OpenAI-compatible Chat Completions 生成结构化 JSON',
      '前端只发送用户 brief，不接触 API Key，并校验错误态、加载态和模型结果展示',
      'Command OS demo 继续承载老板指挥台、链路监控和员工电脑，新的控制台负责证明流程和模型有效性',
    ],
    challenges: [
      '模型输出必须覆盖全部角色，不能只生成一段好看的项目建议',
      '协作流程必须包含联调、巡检和 BUG 反证，否则无法证明它像工程团队一样工作',
      '公开站点必须把 API Key 留在服务端，并处理未配置、超时、限流和模型返回异常',
    ],
    outcomes: [
      'Projects 详情页新增可运行的 AI 小队控制台，访客可以输入需求并触发真实大模型编排',
      '9 个角色都具备职责、输入、输出、验收方和失败模式，产品价值不再停留在概念层',
      '服务端代理统一处理模型调用、结构化 JSON 校验、限流和错误返回',
    ],
    contributions: [
      '把市场上的多智能体协作需求抽象成 9 人工程小队产品模型',
      '设计角色矩阵、交接关系、失败模式和验收口径，让流程具备可检查性',
      '实现服务端大模型编排接口和前端交互控制台，让 demo 能真实跑通',
    ],
    nextStep:
      '继续把单次 brief 编排扩展成可保存的任务包，生成 OpenCode、Cursor 或 Claude Code 可直接执行的角色提示词和验收清单。',
  },
]

export const featuredProject = projectCases.find((project) => project.featured) ?? projectCases[0]

export const portfolioProjects: PortfolioProject[] = projectCases.map((project) => ({
  title: project.title,
  headline: project.headline,
  description: project.description,
  role: project.role,
  result: project.outcomes[0],
  tags: project.tags,
  status: project.status,
  github: project.github,
  demo: project.demo,
  year: project.year,
  featured: project.featured,
  href: `/projects/${project.slug}`,
}))

export const currentFocusAreas: FocusArea[] = [
  {
    eyebrow: 'Projects',
    title: 'AI 系统与工程案例',
    description: '用完整案例说明我如何定义问题、搭系统、做取舍，而不是只放结果截图。',
    href: '/projects',
  },
  {
    eyebrow: 'Lab',
    title: '日语学习实验室',
    description: '把词汇、复习、文法和自测整理成可持续迭代的学习产品，而不是工具堆叠。',
    href: '/lab',
  },
  {
    eyebrow: 'Games',
    title: '游戏原型与开发记录',
    description: '记录玩法原型、对战节奏和 AI 对手实验，让方向不只停留在想法层。',
    href: '/games',
  },
]

export const quickDestinations: QuickDestination[] = [
  {
    title: '查看案例',
    description: '先看我最值得展开讲的系统项目和完整案例。',
    href: '/projects',
    cta: '进入 Projects',
  },
  {
    title: '打开实验室',
    description: '直接体验日语词卡、收藏、复习与学习入口。',
    href: '/lab',
    cta: '进入 Lab',
  },
  {
    title: '查看原型',
    description: '看我在推进的游戏方向、原型结构和开发日志。',
    href: '/games',
    cta: '进入 Games',
  },
  {
    title: '发起联系',
    description: '如果你想聊合作、产品实验或项目方向，这里是最快入口。',
    href: '/contact',
    cta: '联系我',
  },
]

export const labHighlights: LabHighlight[] = [
  {
    title: '词汇搜索',
    description: '从全词汇库里直接查词，并在首屏看到完整词卡而不是空状态。',
  },
  {
    title: '收藏词单',
    description: '把高频词和重点词先收进个人词单，形成稳定的积累入口。',
  },
  {
    title: '今日复习',
    description: '围绕“搜索 -> 收藏 -> 复习”的闭环做最小可用学习流。',
  },
  {
    title: '文法与自测',
    description: '让词汇学习和句型、文法、自测保持同一个实验室体系。',
  },
]

export const gameProofs: GameProof[] = [
  {
    title: '卡牌对战原型',
    stage: 'Prototype',
    engine: 'Rule Simulation',
    snapshot: '当前重点是先验证回合、卡牌反馈和最小战斗闭环。',
    description:
      '这个方向不是从美术或大体量内容开始，而是先把可玩的核心循环搭出来，再决定哪些部分值得继续扩展。',
    evidence: ['已拆出最小回合结构', '在验证动作反馈和信息层级', '与 AI 对手实验共享一部分规则思路'],
    nextMilestone: '补第一版可录屏的战斗流程和 UI 节奏稿。',
  },
  {
    title: 'AI 对手实验',
    stage: 'Research',
    engine: 'Decision Logic',
    snapshot: '把研究里的决策逻辑和真正可玩的战斗原型接起来。',
    description:
      '目标不是单独做一个研究分支，而是让 AI 对手真正参与到原型验证里，帮助判断玩法节奏和策略空间是否成立。',
    evidence: ['继续整理决策状态表示', '在比较搜索与规则驱动策略', '计划服务于真实原型而不是停留在论文语境'],
    nextMilestone: '做一个能看出策略差异的对战观察面板。',
  },
  {
    title: '界面与演出节奏',
    stage: 'In Prep',
    engine: 'UX / UI',
    snapshot: '用低成本稿先验证信息层级、节奏和操作反馈。',
    description:
      '这部分的目标不是先把画面做满，而是先确认战斗信息是否清楚、交互是否顺手、演出是否支持玩法理解。',
    evidence: ['已明确先做低保真界面稿', '准备把录屏和开发日志放进公开页', '优先保证信息可读性再叠加视觉层'],
    nextMilestone: '补出第一版截图、录屏和开发日志入口。',
  },
]

export const gameRoadmap: GameRoadmapItem[] = gameProofs.map((proof) => ({
  title: proof.title,
  description: proof.snapshot,
  status: proof.stage,
}))

export const aboutCapabilities: AboutCapability[] = [
  {
    title: '把复杂问题拆成可推进的系统',
    description: '我更擅长从目标、流程和约束出发，把问题拆成能验证、能迭代、能复用的工程结构。',
  },
  {
    title: '把实验做成产品雏形',
    description: '我喜欢把研究方向和实际使用场景接起来，让东西不只“能跑”，还要“能用、能继续长”。',
  },
  {
    title: '把零散流程整理成稳定体验',
    description: '无论是学习工具、自动化流程还是个人网站，我都会优先考虑信息顺序、反馈节奏和可维护性。',
  },
]

export const contactTopics: ContactTopic[] = [
  {
    title: 'AI 应用与自动化',
    description: '适合聊 LLM 应用、工作流自动化、模型接入和实际落地方式。',
    note: '如果你在想一个 AI 想法怎么变成可用系统，这类沟通会很合适。',
  },
  {
    title: '学习产品与实验室方向',
    description: '适合聊日语学习工具、词卡系统、复习流和教育产品实验。',
    note: '如果你在做学习产品，或者想把内容工具做成真实体验，我很愿意交流。',
  },
  {
    title: '原型开发与项目合作',
    description: '适合聊前端落地、原型验证、个人项目合作、实习或长期交流。',
    note: '如果你已经有项目背景、目标和当前进度，直接发过来会更高效。',
  },
]

export function getProjectBySlug(slug: string) {
  return projectCases.find((project) => project.slug === slug)
}
