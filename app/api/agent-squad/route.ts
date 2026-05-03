import { agentSquadRoles, type AgentSquadPlan } from '@/lib/agentSquad'

const DEFAULT_BASE_URL = 'https://api.openai.com/v1'
const DEFAULT_MODEL = 'gpt-4o-mini'
const REQUEST_TIMEOUT_MS = 45000
const MAX_BODY_BYTES = 48 * 1024
const MAX_BRIEF_CHARS = 2400
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 8

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface RateBucket {
  count: number
  resetAt: number
}

const rateBuckets = new Map<string, RateBucket>()

function json(body: unknown, init?: ResponseInit) {
  return Response.json(body, {
    ...init,
    headers: {
      'Cache-Control': 'no-store',
      ...(init?.headers ?? {}),
    },
  })
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwardedFor || request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(key: string) {
  const now = Date.now()
  const current = rateBuckets.get(key)

  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > RATE_LIMIT_MAX_REQUESTS
}

function getAllowedOrigins(request: Request) {
  const requestOrigin = new URL(request.url).origin
  const envOrigins = (process.env.LEADER_CHAT_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return new Set([requestOrigin, ...envOrigins])
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false

  try {
    return getAllowedOrigins(request).has(new URL(origin).origin)
  } catch {
    return false
  }
}

function getModel(requestedModel: unknown) {
  const configuredModel = process.env.OPENAI_MODEL || DEFAULT_MODEL
  const allowedModels = new Set(
    (process.env.OPENAI_ALLOWED_MODELS || configuredModel)
      .split(',')
      .map((model) => model.trim())
      .filter(Boolean),
  )
  allowedModels.add(configuredModel)

  if (typeof requestedModel !== 'string') {
    return configuredModel
  }

  const model = requestedModel.trim()
  return allowedModels.has(model) ? model : configuredModel
}

function extractJsonObject(text: string) {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Model response did not contain a JSON object')
  }

  return JSON.parse(text.slice(start, end + 1)) as AgentSquadPlan
}

function validatePlan(plan: AgentSquadPlan) {
  if (!plan || typeof plan !== 'object') {
    throw new Error('Plan is not an object')
  }

  if (typeof plan.summary !== 'string' || !plan.summary.trim()) {
    throw new Error('Plan summary is missing')
  }

  if (!Array.isArray(plan.workflow) || plan.workflow.length < 4) {
    throw new Error('Plan workflow is too short')
  }

  if (!Array.isArray(plan.assignments) || plan.assignments.length < agentSquadRoles.length) {
    throw new Error('Plan assignments are incomplete')
  }

  if (!Array.isArray(plan.handoffRisks) || !Array.isArray(plan.acceptanceTests)) {
    throw new Error('Plan risk or acceptance lists are missing')
  }

  return plan
}

function buildSystemPrompt() {
  const roleText = agentSquadRoles
    .map(
      (role) =>
        `${role.name}(${role.id}): mission=${role.mission}; outputs=${role.outputs.join(' / ')}; reviewedBy=${role.reviewedBy.join(' / ')}`,
    )
    .join('\n')

  return `你是一个 AI 工程小队总工，必须把用户需求拆成真实可执行的多智能体协作方案。

角色矩阵：
${roleText}

输出要求：
1. 只输出 JSON，不要 Markdown。
2. summary 用中文，说明这次任务的核心目标和成败标准。
3. workflow 至少 5 步，必须体现需求进入、总工拆解、各角色执行、联调、巡检、BUG 反证、交付。
4. assignments 必须覆盖全部 9 个角色，每个角色都要有 roleId、roleName、action、deliverable、acceptance。
5. handoffRisks 至少 3 条，必须是跨角色交接风险。
6. acceptanceTests 至少 4 条，必须能验证流程是否真的通、大模型输出是否有效。
7. 不要编造已经执行过的测试或部署结果，只给下一步执行计划。

JSON schema:
{
  "summary": "string",
  "workflow": ["string"],
  "assignments": [
    {
      "roleId": "chief-engineer",
      "roleName": "总工",
      "action": "string",
      "deliverable": "string",
      "acceptance": "string"
    }
  ],
  "handoffRisks": ["string"],
  "acceptanceTests": ["string"]
}`
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return json({ error: 'OPENAI_API_KEY is not configured' }, { status: 500 })
  }

  if (!isAllowedOrigin(request)) {
    return json({ error: 'Origin is not allowed' }, { status: 403 })
  }

  if (isRateLimited(getClientKey(request))) {
    return json({ error: 'Too many requests' }, { status: 429 })
  }

  const contentLength = Number.parseInt(request.headers.get('content-length') ?? '0', 10)
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ error: 'Request body is too large' }, { status: 413 })
  }

  let body: { brief?: unknown; model?: unknown } = {}
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const brief = typeof body.brief === 'string' ? body.brief.slice(0, MAX_BRIEF_CHARS).trim() : ''
  if (brief.length < 12) {
    return json({ error: 'Please describe a concrete product or engineering task' }, { status: 400 })
  }

  const model = getModel(body.model)
  const baseUrl = (process.env.OPENAI_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, '')

  try {
    const upstream = await fetchWithTimeout(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.35,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt(),
          },
          {
            role: 'user',
            content: `用户需求：${brief}`,
          },
        ],
      }),
    })

    if (!upstream.ok) {
      return json({ error: 'AI provider failed' }, { status: upstream.status })
    }

    const data = await upstream.json()
    const content = data?.choices?.[0]?.message?.content
    if (typeof content !== 'string' || !content.trim()) {
      return json({ error: 'AI provider returned empty content' }, { status: 502 })
    }

    const plan = validatePlan(extractJsonObject(content))
    return json({ plan, model })
  } catch (error) {
    const status = error instanceof Error && error.name === 'AbortError' ? 504 : 502
    return json({ error: 'AI squad orchestration failed' }, { status })
  }
}
