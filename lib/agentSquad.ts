export interface AgentSquadRole {
  id: string
  name: string
  title: string
  mission: string
  inputs: string[]
  outputs: string[]
  manages: string[]
  reviewedBy: string[]
  risk: string
}

export interface AgentSquadAssignment {
  roleId: string
  roleName: string
  action: string
  deliverable: string
  acceptance: string
}

export interface AgentSquadPlan {
  summary: string
  workflow: string[]
  assignments: AgentSquadAssignment[]
  handoffRisks: string[]
  acceptanceTests: string[]
}

export const agentSquadRoles: AgentSquadRole[] = [
  {
    id: 'chief-engineer',
    name: '总工',
    title: 'Director / System Owner',
    mission: '把用户目标翻译成可执行任务包，控制范围、顺序、风险和最终验收标准。',
    inputs: ['用户目标', '项目上下文', '风险边界'],
    outputs: ['任务拆解', '验收标准', '执行顺序'],
    manages: ['前端', 'UI 实现', '后端', '算法', '运维'],
    reviewedBy: ['联调', '巡检'],
    risk: '目标漂移、拆分过细或验收标准不清会让后续角色各自正确但整体失败。',
  },
  {
    id: 'frontend',
    name: '前端',
    title: 'Frontend Engineer',
    mission: '把产品流程落到页面、组件、状态和交互上，保证用户能完成关键路径。',
    inputs: ['任务包', '页面结构', '接口契约'],
    outputs: ['组件实现', '状态流', '交互路径'],
    manages: ['UI 实现'],
    reviewedBy: ['联调', '巡检', 'BUG 专员'],
    risk: '只完成静态界面但没有把接口、错误态和移动端流程接通。',
  },
  {
    id: 'ui',
    name: 'UI 实现',
    title: 'UI Implementation',
    mission: '负责视觉落地、响应式层级、可读性和细节 polish，让产品看起来像可用工具。',
    inputs: ['视觉语言', '组件结构', '目标用户'],
    outputs: ['响应式布局', '视觉状态', '可读性修正'],
    manages: [],
    reviewedBy: ['前端', '巡检'],
    risk: '过度装饰会盖过工作流本身，或让移动端信息密度失控。',
  },
  {
    id: 'backend',
    name: '后端',
    title: 'Backend Engineer',
    mission: '定义服务边界、输入校验、模型代理和错误返回，保证浏览器不接触密钥。',
    inputs: ['接口契约', '环境变量', '安全边界'],
    outputs: ['API Route', '输入校验', '错误处理'],
    manages: [],
    reviewedBy: ['联调', '运维', '巡检'],
    risk: '把模型密钥、模型选择或内部上下文暴露到客户端。',
  },
  {
    id: 'algorithm',
    name: '算法',
    title: 'Model Strategy',
    mission: '设计提示词、输出结构和评估口径，让大模型给出可执行的协作方案。',
    inputs: ['角色矩阵', '任务 brief', '验收目标'],
    outputs: ['系统提示词', '结构化结果', '质量约束'],
    manages: [],
    reviewedBy: ['总工', '巡检'],
    risk: '模型输出泛泛而谈，不能映射到每个角色的动作、交付物和验收条件。',
  },
  {
    id: 'ops',
    name: '运维',
    title: 'Ops / Release',
    mission: '负责环境变量、部署约束、日志和回滚思路，让 demo 能公开运行。',
    inputs: ['运行环境', 'API 依赖', '发布目标'],
    outputs: ['环境说明', '发布检查', '回滚提示'],
    manages: [],
    reviewedBy: ['巡检'],
    risk: '本地能跑但生产环境缺 key、跨域限制或超时策略。',
  },
  {
    id: 'integration',
    name: '联调',
    title: 'Integration',
    mission: '把前端、后端和模型输出串成端到端路径，确认用户输入后真的得到结果。',
    inputs: ['页面流程', 'API 返回', '模型结果'],
    outputs: ['端到端验证', '接口问题清单', '阻塞项'],
    manages: ['前端', '后端'],
    reviewedBy: ['总工', '巡检'],
    risk: '每个模块单独正确，但真实点击路径断在请求、解析或展示层。',
  },
  {
    id: 'inspection',
    name: '巡检',
    title: 'Quality Gate',
    mission: '扫描质量、回归、边界条件和发布风险，决定是否能交付。',
    inputs: ['实现结果', '构建结果', '用户路径'],
    outputs: ['质量结论', '风险清单', '放行或阻断意见'],
    manages: ['BUG 专员'],
    reviewedBy: ['总工'],
    risk: '只看构建是否通过，忽略流程是否真的完成和模型结果是否可用。',
  },
  {
    id: 'bug-specialist',
    name: 'BUG 专员',
    title: 'Failure Hunter',
    mission: '专门复现失败、定位根因、提出最小修复，并用反例阻止假完成。',
    inputs: ['错误提示', '失败路径', '用户反馈'],
    outputs: ['复现步骤', '根因判断', '最小修复建议'],
    manages: [],
    reviewedBy: ['巡检', '联调'],
    risk: '只修表象，不把失败重新纳入验收清单。',
  },
]

export const defaultAgentSquadBrief =
  '我要在个人网站里做一个 AI 工程小队操作台，让访客输入一个产品需求后，看到总工、前端、UI、后端、算法、运维、联调、巡检和 BUG 专员如何分工、互相验收并给出可执行交付方案。'
