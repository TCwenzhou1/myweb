import 'server-only'

import { jmdictEntries } from '@/lib/jmdictBank'
import { jlpt10kEntries } from '@/lib/jlpt10kBank'
import { kaoyan3500Entries } from '@/lib/kaoyan3500Bank'
import type {
  LabLibraryStats,
  LabLevelFilter,
  LabSearchParams,
  LabSearchResponse,
  LabSourceMode,
  LabSourceSummary,
  LabVocabularyPayload,
  VocabEntry,
  VocabLevel,
  VocabTrack,
} from '@/lib/labTypes'
import { vocabEntries } from '@/lib/vocabularyBank'

const BASE_TRACKS: VocabTrack[] = ['core2000', 'full', 'kaoyan']
const LEVEL_PRIORITY: VocabLevel[] = ['N1', 'N2', 'N3', 'N4', 'N5', '考研']
const TRACK_PRIORITY: VocabTrack[] = ['core2000', 'full', 'kaoyan3500', 'kaoyan', 'jlpt10k', 'jmdict', 'featured']
const SOURCE_SUMMARY_META: Record<Exclude<LabSourceMode, 'all'>, Omit<LabSourceSummary, 'count'>> = {
  core2000: {
    key: 'core2000',
    label: '基础整合库',
    description: '当前项目已有的核心整合词库，适合做基础主索引。',
  },
  jlpt10k: {
    key: 'jlpt10k',
    label: 'JLPT 10K',
    description: '来自 JLPT 扩展库的更大规模词条补充。',
  },
  jmdict: {
    key: 'jmdict',
    label: 'JMDict 补充',
    description: '补足现有整合词库未覆盖的日语词条。',
  },
  kaoyan3500: {
    key: 'kaoyan3500',
    label: '考研 3500',
    description: '独立的考研日语词汇覆盖，用于考试维度筛选。',
  },
}

type RawVocabEntry = {
  id?: string
  word?: string
  kana?: string
  level?: string
  meaningZh?: string
  meaningEn?: string
  detailZh?: string
  source?: string
  track?: string
  partOfSpeech?: string
  exampleJa?: string
  exampleZh?: string
  notes?: string[]
}

interface LabVocabularyDataset {
  entries: VocabEntry[]
  byId: Map<string, VocabEntry>
  stats: LabLibraryStats
  sources: LabSourceSummary[]
}

let cachedDatasetPromise: Promise<LabVocabularyDataset> | null = null

function normalizeText(value?: string) {
  return (value ?? '').trim()
}

function splitMeaningList(value: string) {
  return Array.from(
    new Set(
      value
        .split(/(?:；|;|\/|、|，|,)\s*/g)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  )
}

function uniqueStrings(values: Array<string | undefined>) {
  return Array.from(new Set(values.map((value) => normalizeText(value)).filter(Boolean)))
}

function normalizeLevel(value?: string): VocabLevel {
  const normalized = normalizeText(value)

  if (normalized === '考研' || normalized === '鑰冪爺' || normalized.includes('考研')) {
    return '考研'
  }

  if (normalized === 'N1' || normalized === 'N2' || normalized === 'N3' || normalized === 'N4' || normalized === 'N5') {
    return normalized
  }

  return 'N5'
}

function normalizeTrack(value?: string): VocabTrack {
  const normalized = normalizeText(value)

  if (
    normalized === 'core2000' ||
    normalized === 'full' ||
    normalized === 'kaoyan' ||
    normalized === 'kaoyan3500' ||
    normalized === 'jlpt10k' ||
    normalized === 'jmdict' ||
    normalized === 'featured'
  ) {
    return normalized
  }

  return 'full'
}

function getPrimaryLevel(levels: VocabLevel[]) {
  return LEVEL_PRIORITY.find((level) => levels.includes(level)) ?? 'N5'
}

function getPrimaryTrack(tracks: VocabTrack[]) {
  return TRACK_PRIORITY.find((track) => tracks.includes(track)) ?? 'full'
}

function inferPartOfSpeech(detailZh: string) {
  const bracketMatch = detailZh.match(/\[(.+?)\]/)
  if (bracketMatch) return bracketMatch[1].trim()

  const fullWidthMatch = detailZh.match(/【(.+?)】/)
  if (fullWidthMatch) return fullWidthMatch[1].trim()

  return ''
}

function extractAliases(raw: RawVocabEntry) {
  const aliases = uniqueStrings([
    raw.word,
    raw.kana,
    ...normalizeText(raw.kana).split(/[／/\s]+/g),
    ...normalizeText(raw.word).split(/[／/・]/g),
  ])

  return aliases
}

function extractExamples(raw: RawVocabEntry) {
  const ja = normalizeText(raw.exampleJa)
  const zh = normalizeText(raw.exampleZh)

  if (!ja || !zh) return []

  return [{ ja, zh }]
}

function buildSearchText(entry: VocabEntry) {
  return [
    entry.word,
    entry.kana,
    entry.meaningZh,
    entry.meaningEn,
    entry.detailZh,
    entry.partOfSpeech ?? '',
    ...(entry.aliases ?? []),
    ...(entry.variants ?? []),
    ...(entry.tags ?? []),
    ...(entry.notes ?? []),
    ...(entry.sources ?? []),
  ]
    .join(' ')
    .toLowerCase()
}

function chooseLongerText(current: string, next: string) {
  if (!current) return next
  if (!next) return current
  return next.length > current.length ? next : current
}

function mergeExamples(current: VocabEntry['exampleSentences'], next: VocabEntry['exampleSentences']) {
  const map = new Map<string, { ja: string; zh: string }>()

  for (const example of [...(current ?? []), ...(next ?? [])]) {
    const key = `${example.ja}__${example.zh}`
    if (!map.has(key)) {
      map.set(key, example)
    }
  }

  return Array.from(map.values())
}

function toNormalizedEntry(raw: RawVocabEntry): VocabEntry {
  const word = normalizeText(raw.word)
  const kana = normalizeText(raw.kana)
  const meaningZh = normalizeText(raw.meaningZh)
  const meaningEn = normalizeText(raw.meaningEn)
  const detailZh = normalizeText(raw.detailZh)
  const level = normalizeLevel(raw.level)
  const track = normalizeTrack(raw.track)
  const source = normalizeText(raw.source)
  const aliases = extractAliases(raw)
  const exampleSentences = extractExamples(raw)

  const entry: VocabEntry = {
    id: normalizeText(raw.id) || `${word}__${kana}`,
    word,
    kana,
    level,
    meaningZh,
    meaningEn,
    detailZh,
    source,
    track,
    partOfSpeech: normalizeText(raw.partOfSpeech) || inferPartOfSpeech(detailZh),
    exampleJa: exampleSentences[0]?.ja,
    exampleZh: exampleSentences[0]?.zh,
    notes: Array.isArray(raw.notes) ? uniqueStrings(raw.notes) : [],
    meanings: {
      zh: splitMeaningList(meaningZh),
      en: splitMeaningList(meaningEn),
    },
    aliases,
    variants: uniqueStrings([word, ...normalizeText(raw.word).split(/[／/・]/g)]),
    exampleSentences,
    levels: [level],
    tracks: [track],
    sources: source ? [source] : [],
    tags: uniqueStrings([level, track, normalizeText(raw.partOfSpeech)]),
  }

  entry.searchText = buildSearchText(entry)
  return entry
}

function mergeEntries(current: VocabEntry, incoming: VocabEntry): VocabEntry {
  const levels = uniqueStrings([...(current.levels ?? [current.level]), ...(incoming.levels ?? [incoming.level])]) as VocabLevel[]
  const tracks = uniqueStrings([...(current.tracks ?? [current.track]), ...(incoming.tracks ?? [incoming.track])]) as VocabTrack[]
  const sources = uniqueStrings([...(current.sources ?? [current.source]), ...(incoming.sources ?? [incoming.source])])
  const meaningsZh = uniqueStrings([...(current.meanings?.zh ?? []), ...(incoming.meanings?.zh ?? [])])
  const meaningsEn = uniqueStrings([...(current.meanings?.en ?? []), ...(incoming.meanings?.en ?? [])])
  const notes = uniqueStrings([...(current.notes ?? []), ...(incoming.notes ?? [])])
  const aliases = uniqueStrings([...(current.aliases ?? []), ...(incoming.aliases ?? [])])
  const variants = uniqueStrings([...(current.variants ?? []), ...(incoming.variants ?? [])])
  const exampleSentences = mergeExamples(current.exampleSentences, incoming.exampleSentences)
  const merged: VocabEntry = {
    ...current,
    level: getPrimaryLevel(levels),
    track: getPrimaryTrack(tracks),
    source: sources[0] ?? current.source,
    meaningZh: chooseLongerText(current.meaningZh, incoming.meaningZh),
    meaningEn: chooseLongerText(current.meaningEn, incoming.meaningEn),
    detailZh: chooseLongerText(current.detailZh, incoming.detailZh),
    partOfSpeech: chooseLongerText(current.partOfSpeech ?? '', incoming.partOfSpeech ?? ''),
    exampleJa: chooseLongerText(current.exampleJa ?? '', incoming.exampleJa ?? ''),
    exampleZh: chooseLongerText(current.exampleZh ?? '', incoming.exampleZh ?? ''),
    levels,
    tracks,
    sources,
    meanings: {
      zh: meaningsZh,
      en: meaningsEn,
    },
    aliases,
    variants,
    notes,
    exampleSentences,
    tags: uniqueStrings([...levels, ...tracks, current.partOfSpeech, incoming.partOfSpeech]),
  }

  merged.searchText = buildSearchText(merged)
  return merged
}

function mergeVocabularyLists(...lists: RawVocabEntry[][]) {
  const map = new Map<string, VocabEntry>()

  for (const list of lists) {
    for (const rawEntry of list) {
      const normalizedEntry = toNormalizedEntry(rawEntry)
      const key = `${normalizedEntry.word}__${normalizedEntry.kana}`
      const existing = map.get(key)
      map.set(key, existing ? mergeEntries(existing, normalizedEntry) : normalizedEntry)
    }
  }

  return Array.from(map.values())
}

function matchesSource(entry: VocabEntry, source: LabSourceMode) {
  if (source === 'all') return true

  const tracks = entry.tracks ?? [entry.track]

  if (source === 'core2000') {
    return tracks.some((track) => BASE_TRACKS.includes(track))
  }

  if (source === 'jlpt10k') return tracks.includes('jlpt10k')
  if (source === 'jmdict') return tracks.includes('jmdict')
  return tracks.includes('kaoyan3500')
}

function matchesLevel(entry: VocabEntry, level: LabLevelFilter) {
  if (level === 'ALL') return true
  const levels = entry.levels ?? [entry.level]
  return levels.includes(level)
}

function getLevelCount(entries: VocabEntry[], level: VocabLevel) {
  return entries.filter((entry) => (entry.levels ?? [entry.level]).includes(level)).length
}

function buildStats(entries: VocabEntry[]): LabLibraryStats {
  return {
    total: entries.length,
    core2000: entries.filter((entry) => matchesSource(entry, 'core2000')).length,
    n5: getLevelCount(entries, 'N5'),
    n4: getLevelCount(entries, 'N4'),
    n3: getLevelCount(entries, 'N3'),
    n2: getLevelCount(entries, 'N2'),
    n1: getLevelCount(entries, 'N1'),
    kaoyan: getLevelCount(entries, '考研'),
    kaoyan3500: entries.filter((entry) => matchesSource(entry, 'kaoyan3500')).length,
    jlpt10k: entries.filter((entry) => matchesSource(entry, 'jlpt10k')).length,
    jmdict: entries.filter((entry) => matchesSource(entry, 'jmdict')).length,
  }
}

function buildSourceSummaries(entries: VocabEntry[]): LabSourceSummary[] {
  return (Object.keys(SOURCE_SUMMARY_META) as Array<Exclude<LabSourceMode, 'all'>>).map((key) => ({
    ...SOURCE_SUMMARY_META[key],
    count: entries.filter((entry) => matchesSource(entry, key)).length,
  }))
}

function normalizeKeyword(value?: string) {
  return normalizeText(value).toLowerCase()
}

function getMatchScore(entry: VocabEntry, keyword: string) {
  if (!keyword) return 0

  const word = entry.word.toLowerCase()
  const kana = entry.kana.toLowerCase()
  const meaningZh = entry.meaningZh.toLowerCase()
  const meaningEn = entry.meaningEn.toLowerCase()
  const aliases = (entry.aliases ?? []).map((alias) => alias.toLowerCase())
  const searchText = entry.searchText ?? buildSearchText(entry)

  let score = 0

  if (word === keyword || kana === keyword || aliases.includes(keyword)) score += 120
  if (word.startsWith(keyword) || kana.startsWith(keyword)) score += 80
  if (word.includes(keyword) || kana.includes(keyword)) score += 40
  if (aliases.some((alias) => alias.startsWith(keyword))) score += 25
  if (meaningZh.includes(keyword)) score += 20
  if (meaningEn.includes(keyword)) score += 20
  if (searchText.includes(keyword)) score += 8

  return score
}

function sortEntries(entries: VocabEntry[], keyword: string) {
  return [...entries].sort((left, right) => {
    const leftScore = getMatchScore(left, keyword)
    const rightScore = getMatchScore(right, keyword)

    if (leftScore !== rightScore) return rightScore - leftScore

    const leftTrackWeight = TRACK_PRIORITY.indexOf(left.track)
    const rightTrackWeight = TRACK_PRIORITY.indexOf(right.track)
    if (leftTrackWeight !== rightTrackWeight) return leftTrackWeight - rightTrackWeight

    return left.word.localeCompare(right.word, 'ja')
  })
}

async function buildDataset(): Promise<LabVocabularyDataset> {
  const entries = mergeVocabularyLists(
    vocabEntries as RawVocabEntry[],
    kaoyan3500Entries as RawVocabEntry[],
    jlpt10kEntries as RawVocabEntry[],
    jmdictEntries as RawVocabEntry[],
  )

  const byId = new Map(entries.map((entry) => [entry.id, entry]))
  const stats = buildStats(entries)
  const sources = buildSourceSummaries(entries)

  return { entries, byId, stats, sources }
}

async function getDataset() {
  if (!cachedDatasetPromise) {
    cachedDatasetPromise = buildDataset().catch((error) => {
      cachedDatasetPromise = null
      throw error
    })
  }

  return cachedDatasetPromise
}

function paginate<T>(items: T[], page: number, pageSize: number) {
  const currentPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1
  const size = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 14
  const start = (currentPage - 1) * size

  return {
    page: currentPage,
    pageSize: size,
    items: items.slice(start, start + size),
  }
}

export async function loadLabVocabulary(): Promise<LabVocabularyPayload> {
  const dataset = await getDataset()
  return {
    entries: dataset.entries,
    stats: dataset.stats,
  }
}

export async function getLabEntriesByIds(ids: string[]) {
  const dataset = await getDataset()
  return ids
    .map((id) => dataset.byId.get(id))
    .filter((entry): entry is VocabEntry => Boolean(entry))
}

export async function searchLabVocabulary(params: LabSearchParams = {}): Promise<LabSearchResponse> {
  const dataset = await getDataset()
  const keyword = normalizeKeyword(params.keyword)
  const source = params.source ?? 'all'
  const level = params.level ?? 'ALL'
  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 14

  const filtered = dataset.entries.filter((entry) => {
    const searchText = entry.searchText ?? buildSearchText(entry)
    if (keyword && !searchText.includes(keyword)) return false
    if (!matchesSource(entry, source)) return false
    if (!matchesLevel(entry, level)) return false
    return true
  })

  const sorted = sortEntries(filtered, keyword)
  const normalizedPageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 14
  const totalPages = Math.max(1, Math.ceil(sorted.length / normalizedPageSize))
  const safePage = Number.isFinite(page) && page > 0 ? Math.min(Math.floor(page), totalPages) : 1
  const { items, page: currentPage, pageSize: currentPageSize } = paginate(sorted, safePage, normalizedPageSize)

  return {
    items,
    total: sorted.length,
    page: Math.min(currentPage, totalPages),
    pageSize: currentPageSize,
    totalPages,
    keyword,
    source,
    level,
    stats: dataset.stats,
    sources: dataset.sources,
  }
}
