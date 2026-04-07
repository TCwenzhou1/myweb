export type VocabLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | '考研'

export type VocabTrack =
  | 'core2000'
  | 'full'
  | 'kaoyan'
  | 'kaoyan3500'
  | 'jlpt10k'
  | 'jmdict'
  | 'featured'

export type LabSourceMode = 'all' | 'core2000' | 'jlpt10k' | 'jmdict' | 'kaoyan3500'
export type LabLevelFilter = 'ALL' | VocabLevel

export interface LabMeaningGroup {
  zh: string[]
  en: string[]
}

export interface LabExampleSentence {
  ja: string
  zh: string
}

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
  meanings?: LabMeaningGroup
  aliases?: string[]
  variants?: string[]
  exampleSentences?: LabExampleSentence[]
  levels?: VocabLevel[]
  tracks?: VocabTrack[]
  sources?: string[]
  tags?: string[]
  searchText?: string
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

export interface LabSourceSummary {
  key: Exclude<LabSourceMode, 'all'>
  label: string
  description: string
  count: number
}

export interface LabSearchParams {
  keyword?: string
  source?: LabSourceMode
  level?: LabLevelFilter
  page?: number
  pageSize?: number
}

export interface LabSearchResponse {
  items: VocabEntry[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  keyword: string
  source: LabSourceMode
  level: LabLevelFilter
  stats: LabLibraryStats
  sources: LabSourceSummary[]
}

export interface LabLookupResponse {
  items: VocabEntry[]
}

export interface LabVocabularyPayload {
  entries: VocabEntry[]
  stats: LabLibraryStats
}
