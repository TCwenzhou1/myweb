export type VocabLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | '考研' | '鑰冪爺' | '未分级'

export type VocabTrack =
  | 'core2000'
  | 'full'
  | 'kaoyan'
  | 'kaoyan3500'
  | 'jlpt10k'
  | 'jmdict'
  | 'featured'

export interface VocabEntry {
  id: string
  word: string
  kana: string
  level: VocabLevel
  meaningZh: string
  meaningEn: string
  detailZh: string
  source: string
  track: VocabTrack
  partOfSpeech?: string
  exampleJa?: string
  exampleZh?: string
  notes?: string[]
}

export interface LabLibraryStats {
  total: number
  core2000: number
  n5: number
  n4: number
  n3: number
  n2: number
  n1: number
  kaoyan: number
  kaoyan3500: number
  jlpt10k: number
  jmdict: number
}

export interface LabVocabularyPayload {
  entries: VocabEntry[]
  stats: LabLibraryStats
}
