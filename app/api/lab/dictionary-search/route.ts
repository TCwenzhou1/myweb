import { NextResponse } from 'next/server'

import { searchLatestJapaneseDictionary } from '@/lib/server/fullDictionary'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DEFAULT_LIMIT = 40
const MAX_QUERY_LENGTH = 80

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim() ?? ''
  const limit = Number.parseInt(searchParams.get('limit') ?? String(DEFAULT_LIMIT), 10)

  if (!query) {
    return NextResponse.json(
      {
        meta: null,
        results: [],
        error: '请输入关键词后再检索。',
      },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  }

  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      {
        meta: null,
        results: [],
        error: `关键词不能超过 ${MAX_QUERY_LENGTH} 个字符。`,
      },
      { status: 400 },
    )
  }

  try {
    const payload = await searchLatestJapaneseDictionary(query, Number.isFinite(limit) ? limit : DEFAULT_LIMIT)

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : '词典检索暂时不可用。'
    return NextResponse.json(
      {
        meta: null,
        results: [],
        error: message,
      },
      { status: 500 },
    )
  }
}
