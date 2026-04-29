const DEFAULT_BASE_URL = 'https://open.bigmodel.cn/api/paas/v4'
const DEFAULT_MODEL = 'glm-4-flash'
const REQUEST_TIMEOUT_MS = 60000

type ChatBody = {
  prompt?: unknown
  context?: unknown
  messages?: unknown
  temperature?: unknown
  response_format?: unknown
}

function json(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers)
  headers.set('Cache-Control', 'no-store')
  headers.set('Content-Type', 'application/json')

  return Response.json(body, {
    ...init,
    headers,
  })
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

function isJsonObjectResponseFormat(value: unknown) {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as { type?: unknown }).type === 'json_object'
  )
}

function buildMessages(body: ChatBody) {
  if (Array.isArray(body.messages) && body.messages.length > 0) {
    return body.messages
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : ''
  const context = typeof body.context === 'string' ? body.context.trim().slice(0, 12000) : ''

  if (!prompt && !context) {
    return null
  }

  return [
    {
      role: 'system',
      content:
        '你是 AI 公司指挥工作台里的部门领导 agent。请用中文回复老板，必须基于给定任务、事件和组织职责，不要编造 API 调用结果。回复要简短、可执行，并包含风险和下一步建议。',
    },
    {
      role: 'user',
      content: [prompt && `老板问题：${prompt}`, context && `组织上下文：\n${context}`]
        .filter(Boolean)
        .join('\n\n'),
    },
  ]
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return json({ error: 'OPENAI_API_KEY is not configured' }, { status: 500 })
  }

  let body: ChatBody

  try {
    body = (await request.json()) as ChatBody
  } catch {
    return json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const messages = buildMessages(body)

  if (!messages) {
    return json({ error: 'messages array or prompt/context is required' }, { status: 400 })
  }

  const baseUrl = (process.env.OPENAI_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, '')
  const payload: Record<string, unknown> = {
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    temperature: typeof body.temperature === 'number' ? body.temperature : 0.4,
    messages,
  }

  if (isJsonObjectResponseFormat(body.response_format)) {
    payload.response_format = body.response_format
  }

  try {
    const upstream = await fetchWithTimeout(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const text = await upstream.text()

    if (!upstream.ok) {
      return json(
        {
          error: 'Upstream model request failed',
          status: upstream.status,
          detail: text.slice(0, 1000),
        },
        { status: upstream.status },
      )
    }

    try {
      return json(JSON.parse(text))
    } catch {
      return json({ raw: text })
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown model proxy error'
    return json({ error: message }, { status: 502 })
  }
}
