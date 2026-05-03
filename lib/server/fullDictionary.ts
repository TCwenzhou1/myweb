import type { VocabEntry } from '@/lib/labTypes'

export interface LatestDictionaryMeta {
  id: 'jitendex' | 'jmdict-simplified' | 'tracked-bank'
  title: string
  sourceLabel: string
  revision?: string
  entryCount: number
  targetLanguage: string
}

interface SearchableDictionaryEntry extends VocabEntry {
  meaningSearch: string
}

interface LoadedDictionary {
  meta: LatestDictionaryMeta
  entries: SearchableDictionaryEntry[]
}

let dictionaryCache: Promise<LoadedDictionary> | null = null

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

async function parseTrackedBank(): Promise<LoadedDictionary> {
  const mod = await import('@/lib/jmdictBank')
  const entries = (mod.jmdictEntries as VocabEntry[]).map((entry) => ({
    ...entry,
    meaningSearch: `${entry.meaningEn} ${entry.detailZh}`.toLowerCase(),
  }))

  return {
    meta: {
      id: 'tracked-bank',
      title: 'Tracked JMDict Supplement',
      sourceLabel: 'Repository JMDict Bank',
      entryCount: entries.length,
      targetLanguage: 'mixed',
    },
    entries,
  }
}

async function loadDictionary(): Promise<LoadedDictionary> {
  if (!dictionaryCache) {
    dictionaryCache = (async () => {
      return parseTrackedBank()
    })().catch((error) => {
      dictionaryCache = null
      throw error
    })
  }

  return dictionaryCache
}

function scoreEntry(entry: SearchableDictionaryEntry, query: string, queryLower: string) {
  let score = 0

  if (entry.word === query) score += 400
  if (entry.kana === query) score += 380
  if (entry.word.startsWith(query)) score += 240
  if (entry.kana.startsWith(query)) score += 220
  if (entry.word.includes(query)) score += 140
  if (entry.kana.includes(query)) score += 120
  if (queryLower && entry.meaningSearch.includes(queryLower)) score += 80

  return score
}

export async function searchLatestJapaneseDictionary(query: string, limit = 40) {
  const trimmedQuery = normalizeWhitespace(query)
  const safeLimit = Math.min(Math.max(limit, 1), 80)
  const dictionary = await loadDictionary()

  if (!trimmedQuery) {
    return {
      meta: dictionary.meta,
      results: [] as VocabEntry[],
    }
  }

  const queryLower = trimmedQuery.toLowerCase()
  const ranked = dictionary.entries
    .map((entry) => ({ entry, score: scoreEntry(entry, trimmedQuery, queryLower) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score
      if (left.entry.word.length !== right.entry.word.length) return left.entry.word.length - right.entry.word.length
      return left.entry.id.localeCompare(right.entry.id)
    })
    .slice(0, safeLimit)
    .map(({ entry }) => {
      const { meaningSearch: _meaningSearch, ...result } = entry
      return result
    })

  return {
    meta: dictionary.meta,
    results: ranked,
  }
}
