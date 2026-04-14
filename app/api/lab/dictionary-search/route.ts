import { NextResponse } from 'next/server'

import { searchLatestJapaneseDictionary } from '@/lib/server/fullDictionary'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim() ?? ''
  const limit = Number.parseInt(searchParams.get('limit') ?? '40', 10)

  try {
    const payload = await searchLatestJapaneseDictionary(query, Number.isFinite(limit) ? limit : 40)

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : '全量词典检索暂时不可用。'
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
