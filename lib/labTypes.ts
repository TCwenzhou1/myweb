import type { VocabEntry as BaseVocabEntry, VocabLevel } from './vocabularyBank'

export type LabVocabLevel = VocabLevel | '未分级'

export type VocabEntry = Omit<BaseVocabEntry, 'level'> & {
  level: LabVocabLevel
}

export type { VocabLevel }
