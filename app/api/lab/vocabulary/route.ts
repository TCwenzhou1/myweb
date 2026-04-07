import { NextRequest } from 'next/server'
import type { LabLevelFilter, LabSourceMode } from '@/lib/labTypes'
import { getLabEntriesByIds, searchLabVocabulary } from '@/lib/server/loadLabVocabulary'

export const revalidate = 3600

const SOURCE_OPTIONS = new Set<LabSourceMode>(['all', 'core2000', 'jlpt10k', 'jmdict', 'kaoyan3500'])
const LEVEL_OPTIONS = new Set<LabLevelFilter>(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1', '考研'])

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? '', 10)
  if (Number.isNaN(parsed) || parsed <= 0) return fallback
  return parsed
}

function parseSourceMode(value: string | null): LabSourceMode {
  if (value && SOURCE_OPTIONS.has(value as LabSourceMode)) {
    return value as LabSourceMode
  }

  return 'all'
}

function parseLevelFilter(value: string | null): LabLevelFilter {
  if (value && LEVEL_OPTIONS.has(value as LabLevelFilter)) {
    return value as LabLevelFilter
  }

  return 'ALL'
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ids = (searchParams.get('ids') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  if (ids.length > 0) {
    const items = await getLabEntriesByIds(ids)
    return Response.json(
      { items },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      },
    )
  }

  const payload = await searchLabVocabulary({
    keyword: searchParams.get('q') ?? '',
    source: parseSourceMode(searchParams.get('source')),
    level: parseLevelFilter(searchParams.get('level')),
    page: parsePositiveInteger(searchParams.get('page'), 1),
    pageSize: parsePositiveInteger(searchParams.get('pageSize'), 14),
  })

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
