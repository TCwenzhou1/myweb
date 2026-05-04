import fs from 'node:fs'
import path from 'node:path'

import type { VocabEntry } from '@/lib/labTypes'
import AdmZip from 'adm-zip'

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

type DictionarySource =
  | { kind: 'jitendex'; filePath: string }
  | { kind: 'jmdict-simplified'; filePath: string }
  | { kind: 'tracked-bank' }

let dictionaryCache: Promise<LoadedDictionary> | null = null

function resolveDictionarySource(): DictionarySource {
  const root = process.cwd()
  const candidates: Array<Extract<DictionarySource, { filePath: string }>> = [
    { kind: 'jitendex', filePath: path.join(root, 'jitendex-yomitan.zip') },
    { kind: 'jmdict-simplified', filePath: path.join(root, 'scripts', '_jmdict_cache', 'data', 'jmdict_eng.json') },
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate.filePath)) {
      return candidate
    }
  }

  return { kind: 'tracked-bank' }
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function uniqueSegments(values: string[], maxItems = 3) {
  const picked: string[] = []
  const seen = new Set<string>()

  for (const value of values) {
    const normalized = normalizeWhitespace(value)
    if (!normalized) continue
    if (seen.has(normalized)) continue
    seen.add(normalized)
    picked.push(normalized)
    if (picked.length >= maxItems) break
  }

  return picked
}

function collectAllText(node: unknown, target: string[]) {
  if (typeof node === 'string') {
    target.push(node)
    return
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      collectAllText(item, target)
    }
    return
  }

  if (!node || typeof node !== 'object') {
    return
  }

  const maybeContent = (node as { content?: unknown }).content
  if (maybeContent !== undefined) {
    collectAllText(maybeContent, target)
  }
}

function collectStructuredText(node: unknown, target: string[], marker: string) {
  if (Array.isArray(node)) {
    for (const item of node) {
      collectStructuredText(item, target, marker)
    }
    return
  }

  if (!node || typeof node !== 'object') {
    return
  }

  const record = node as { data?: { content?: unknown }; content?: unknown }
  if (record.data?.content === marker) {
    collectAllText(record.content, target)
    return
  }

  if (record.content !== undefined) {
    collectStructuredText(record.content, target, marker)
  }
}

function parseJitendexGlossary(rawGlossary: unknown) {
  const glossarySegments: string[] = []
  collectStructuredText(rawGlossary, glossarySegments, 'glossary')

  const primaryMeaning = uniqueSegments(glossarySegments).join('; ')
  const posSegments: string[] = []
  collectStructuredText(rawGlossary, posSegments, 'part-of-speech-info')
  const partOfSpeech = uniqueSegments(posSegments, 2).join(' / ')

  return {
    meaningEn: primaryMeaning || 'No concise English gloss available.',
    partOfSpeech: partOfSpeech || undefined,
  }
}

function parseJitendexZip(filePath: string): LoadedDictionary {
  const zip = new AdmZip(filePath)
  const indexEntry = zip.getEntry('index.json')
  if (!indexEntry) {
    throw new Error('jitendex-yomitan.zip 缺少 index.json，无法识别词典元数据。')
  }

  const metaJson = JSON.parse(indexEntry.getData().toString('utf8')) as {
    title?: string
    revision?: string
    targetLanguage?: string
  }

  const termEntries = zip
    .getEntries()
    .filter((entry) => /^term_bank_\d+\.json$/.test(entry.entryName))
    .sort((left, right) => left.entryName.localeCompare(right.entryName, undefined, { numeric: true }))

  const dedupe = new Set<string>()
  const entries: SearchableDictionaryEntry[] = []

  for (const termEntry of termEntries) {
    const rows = JSON.parse(termEntry.getData().toString('utf8')) as unknown[]

    for (const row of rows) {
      if (!Array.isArray(row)) continue

      const word = normalizeWhitespace(String(row[0] ?? ''))
      const kana = normalizeWhitespace(String(row[1] ?? word))
      if (!word) continue

      const { meaningEn, partOfSpeech } = parseJitendexGlossary(row[5])
      const sequenceId = String(row[6] ?? `${termEntry.entryName}-${entries.length}`)
      const dedupeKey = `${word}__${kana}__${meaningEn}`
      if (dedupe.has(dedupeKey)) continue
      dedupe.add(dedupeKey)

      entries.push({
        id: `jit-${sequenceId}`,
        word,
        kana,
        level: '未分级',
        meaningZh: '',
        meaningEn,
        detailZh: meaningEn,
        source: `Jitendex ${metaJson.revision ?? ''}`.trim(),
        track: 'jmdict',
        partOfSpeech,
        meaningSearch: meaningEn.toLowerCase(),
      })
    }
  }

  return {
    meta: {
      id: 'jitendex',
      title: metaJson.title ?? 'Jitendex',
      sourceLabel: 'Jitendex Yomitan Archive',
      revision: metaJson.revision,
      entryCount: entries.length,
      targetLanguage: metaJson.targetLanguage ?? 'en',
    },
    entries,
  }
}

function parseJmdictSimplified(filePath: string): LoadedDictionary {
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8')) as Array<{
    id?: string | number
    kanji?: Array<{ text?: string }>
    kana?: Array<{ text?: string }>
    senses?: Array<{ glosses?: Array<string | { lang?: string; text?: string }>; pos?: string[] }>
  }>

  const entries: SearchableDictionaryEntry[] = []
  const dedupe = new Set<string>()

  for (const item of raw) {
    const word = normalizeWhitespace(item.kanji?.[0]?.text ?? item.kana?.[0]?.text ?? '')
    const kana = normalizeWhitespace(item.kana?.[0]?.text ?? word)
    if (!word) continue

    const glosses: string[] = []
    const partsOfSpeech: string[] = []
    for (const sense of item.senses ?? []) {
      for (const gloss of sense.glosses ?? []) {
        if (typeof gloss === 'string') {
          glosses.push(gloss)
          continue
        }

        if (!gloss.lang || gloss.lang === 'eng') {
          glosses.push(gloss.text ?? '')
        }
      }

      for (const pos of sense.pos ?? []) {
        partsOfSpeech.push(pos)
      }
    }

    const meaningEn = uniqueSegments(glosses).join('; ')
    const partOfSpeech = uniqueSegments(partsOfSpeech, 2).join(' / ')
    const dedupeKey = `${word}__${kana}__${meaningEn}`
    if (dedupe.has(dedupeKey)) continue
    dedupe.add(dedupeKey)

    entries.push({
      id: `jmd-${String(item.id ?? entries.length)}`,
      word,
      kana,
      level: '未分级',
      meaningZh: '',
      meaningEn,
      detailZh: meaningEn || `${word} (${kana})`,
      source: 'jmdict-simplified',
      track: 'jmdict',
      partOfSpeech: partOfSpeech || undefined,
      meaningSearch: meaningEn.toLowerCase(),
    })
  }

  return {
    meta: {
      id: 'jmdict-simplified',
      title: 'jmdict-simplified',
      sourceLabel: 'JMdict Simplified JSON',
      entryCount: entries.length,
      targetLanguage: 'en',
    },
    entries,
  }
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
      const source = resolveDictionarySource()
      if (source.kind === 'jitendex') {
        return parseJitendexZip(source.filePath)
      }
      if (source.kind === 'tracked-bank') {
        return parseTrackedBank()
      }
      return parseJmdictSimplified(source.filePath)
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

function compareRankedEntries(
  left: { entry: SearchableDictionaryEntry; score: number },
  right: { entry: SearchableDictionaryEntry; score: number },
) {
  if (right.score !== left.score) return right.score - left.score
  if (left.entry.word.length !== right.entry.word.length) return left.entry.word.length - right.entry.word.length
  return left.entry.id.localeCompare(right.entry.id)
}

export async function searchLatestJapaneseDictionary(query: string, limit = 40) {
  const trimmedQuery = normalizeWhitespace(query)
  const safeLimit = Math.min(Math.max(limit, 1), 80)

  if (!trimmedQuery) {
    return {
      meta: null,
      results: [] as VocabEntry[],
    }
  }

  const dictionary = await loadDictionary()
  const queryLower = trimmedQuery.toLowerCase()

  const ranked: Array<{ entry: SearchableDictionaryEntry; score: number }> = []

  for (const entry of dictionary.entries) {
    const score = scoreEntry(entry, trimmedQuery, queryLower)
    if (score <= 0) continue

    ranked.push({ entry, score })
    ranked.sort(compareRankedEntries)

    if (ranked.length > safeLimit) {
      ranked.pop()
    }
  }

  const results = ranked
    .map(({ entry }) => {
      const { meaningSearch: _meaningSearch, ...result } = entry
      return result
    })

  return {
    meta: dictionary.meta,
    results,
  }
}
