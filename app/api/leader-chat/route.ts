const DEFAULT_BASE_URL = 'https://api.openai.com/v1'
const DEFAULT_MODEL = 'gpt-4o-mini'
const REQUEST_TIMEOUT_MS = 30000
const MAX_BODY_BYTES = 64 * 1024
const MAX_CONTEXT_CHARS = 12000
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 12

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

  let body: { context?: unknown; model?: unknown } = {}
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const context = typeof body.context === 'string' ? body.context.slice(0, MAX_CONTEXT_CHARS) : ''
  if (!context.trim()) {
    return json({ error: 'Missing dialogue context' }, { status: 400 })
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
        temperature: 0.4,
        messages: [
          {
            role: 'system',
            content:
              '你是公司可视化模拟器里的部门领导 agent。用中文回复老板，必须基于给定任务、事件和组织职责，不要编造 API 调用结果。回复要简短、可执行、包含风险和下一步建议。',
          },
          { role: 'user', content: context },
        ],
      }),
    })

    if (!upstream.ok) {
      return json({ error: 'AI provider failed' }, { status: upstream.status })
    }

    const data = await upstream.json()
    const content = data?.choices?.[0]?.message?.content?.trim()

    if (!content) {
      return json({ error: 'AI provider returned empty content' }, { status: 502 })
    }

    return json({ choices: [{ message: { content } }] })
  } catch (error) {
    const status = error instanceof Error && error.name === 'AbortError' ? 504 : 502
    return json({ error: 'AI provider request failed' }, { status })
  }
}
