import 'server-only'

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { LabLibraryStats, LabVocabularyPayload, VocabEntry, VocabLevel } from '@/lib/labTypes'

const CLEAN_KAOYAN = '\u8003\u7814'
const GARBLED_KAOYAN = '\u9470\u51AA\u723A'
const GARBLED_KAOYAN_SUFFIX = '\u51AA\u723A'

let cachedPayloadPromise: Promise<LabVocabularyPayload> | null = null

export function loadLabVocabulary() {
  if (!cachedPayloadPromise) {
    cachedPayloadPromise = buildLabVocabulary().catch((error) => {
      cachedPayloadPromise = null
      throw error
    })
  }

  return cachedPayloadPromise
}

async function buildLabVocabulary(): Promise<LabVocabularyPayload> {
  const [baseEntries, kaoyan3500Entries, jlpt10kEntries, jmdictEntries] = await Promise.all([
    readEntries('lib/vocabularyBank.ts', 'vocabEntries'),
    readEntries('lib/kaoyan3500Bank.ts', 'kaoyan3500Entries'),
    readEntries('lib/jlpt10kBank.ts', 'jlpt10kEntries'),
    readEntries('lib/jmdictBank.ts', 'jmdictEntries'),
  ])

  const entries = mergeByWordAndKana(baseEntries, kaoyan3500Entries, jlpt10kEntries, jmdictEntries)
  const levelCounts = entries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.level] = (acc[entry.level] ?? 0) + 1
    return acc
  }, {})

  const stats: LabLibraryStats = {
    total: entries.length,
    core2000: baseEntries.length,
    n5: levelCounts.N5 ?? 0,
    n4: levelCounts.N4 ?? 0,
    n3: levelCounts.N3 ?? 0,
    n2: levelCounts.N2 ?? 0,
    n1: levelCounts.N1 ?? 0,
    kaoyan: (levelCounts[CLEAN_KAOYAN] ?? 0) + (levelCounts[GARBLED_KAOYAN] ?? 0),
    kaoyan3500: kaoyan3500Entries.length,
    jlpt10k: jlpt10kEntries.length,
    jmdict: jmdictEntries.length,
  }

  return { entries, stats }
}

async function readEntries(relativePath: string, exportName: string): Promise<VocabEntry[]> {
  const absolutePath = path.join(process.cwd(), relativePath)
  const source = await readFile(absolutePath, 'utf8')
  const arrayLiteral = extractArrayLiteral(source, exportName)
  return evaluateArrayLiteral<VocabEntry[]>(arrayLiteral).map(normalizeEntry)
}

function extractArrayLiteral(source: string, exportName: string) {
  const exportMatch = new RegExp(`export const ${escapeRegExp(exportName)}(?:\\s*:[^=]+)?\\s*=\\s*\\[`).exec(source)
  if (!exportMatch) {
    throw new Error(`Could not find export "${exportName}" in vocabulary source.`)
  }

  const arrayStart = exportMatch.index + exportMatch[0].length - 1
  if (arrayStart === -1) {
    throw new Error(`Could not find array start for export "${exportName}".`)
  }

  let depth = 0
  let inString = false
  let quote = ''
  let escaped = false

  for (let index = arrayStart; index < source.length; index += 1) {
    const char = source[index]

    if (inString) {
      if (escaped) {
        escaped = false
        continue
      }

      if (char === '\\') {
        escaped = true
        continue
      }

      if (char === quote) {
        inString = false
        quote = ''
      }

      continue
    }

    if (char === '"' || char === '\'' || char === '`') {
      inString = true
      quote = char
      continue
    }

    if (char === '[') {
      depth += 1
      continue
    }

    if (char === ']') {
      depth -= 1
      if (depth === 0) {
        return source.slice(arrayStart, index + 1)
      }
    }
  }

  throw new Error(`Could not find array end for export "${exportName}".`)
}

function evaluateArrayLiteral<T>(literal: string) {
  return Function(`"use strict"; return (${literal});`)() as T
}

function normalizeEntry(entry: VocabEntry): VocabEntry {
  return {
    ...entry,
    level: normalizeLevel(entry.level),
  }
}

function normalizeLevel(level: string): VocabLevel {
  const trimmedLevel = level.trim()

  if (trimmedLevel === CLEAN_KAOYAN || trimmedLevel === GARBLED_KAOYAN || trimmedLevel.includes(GARBLED_KAOYAN_SUFFIX)) {
    return CLEAN_KAOYAN
  }

  if (trimmedLevel === 'N1' || trimmedLevel === 'N2' || trimmedLevel === 'N3' || trimmedLevel === 'N4' || trimmedLevel === 'N5') {
    return trimmedLevel
  }

  return 'N5'
}

function mergeByWordAndKana(...lists: VocabEntry[][]) {
  const map = new Map<string, VocabEntry>()

  for (const list of lists) {
    for (const entry of list) {
      const key = `${entry.word}__${entry.kana}`
      if (!map.has(key)) {
        map.set(key, entry)
      }
    }
  }

  return Array.from(map.values())
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}