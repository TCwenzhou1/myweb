const DEFAULT_BASE_URL = 'https://api.openai.com/v1'
const DEFAULT_MODEL = 'gpt-4o-mini'
const REQUEST_TIMEOUT_MS = 30000

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

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return json({ error: 'OPENAI_API_KEY is not configured' }, { status: 500 })
  }

  let body: { context?: unknown; model?: unknown } = {}
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const context = typeof body.context === 'string' ? body.context.slice(0, 12000) : ''
  if (!context.trim()) {
    return json({ error: 'Missing dialogue context' }, { status: 400 })
  }

  const model =
    typeof body.model === 'string' && body.model.trim()
      ? body.model.trim()
      : process.env.OPENAI_MODEL || DEFAULT_MODEL
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
