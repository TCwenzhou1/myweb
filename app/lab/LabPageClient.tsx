'use client'

import dynamic from 'next/dynamic'
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { LabReviewCardClean as ReviewCard } from '@/components/LabReviewCardClean'
import { LabWordCardClean as WordCard } from '@/components/LabWordCardClean'
import { featuredLabEntries, labFallbackCatalog, labQuickPresets } from '@/lib/labFeaturedDeckStable'
import type { LabLibraryStats, LabVocabularyPayload, VocabEntry } from '@/lib/labTypes'
import { useSpeech } from '@/lib/useSpeech'
import { useStudyStore } from '@/lib/useStudyStore'

type TabKey = 'library' | 'favorites' | 'review' | 'grammar' | 'pattern' | 'quiz'
type SourceMode = 'all' | 'featured' | 'core2000' | 'jlpt10k' | 'jmdict' | 'kaoyan3500' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1'
type LevelFilter = 'ALL' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | '考研' | '未分级'

type LabStats = LabLibraryStats & {
  featured: number
}

interface RemoteDictionaryMeta {
  title: string
  sourceLabel: string
  revision?: string
  entryCount: number
  targetLanguage: string
}

const PAGE_SIZE = 14
let cachedLabPayload: LabVocabularyPayload | null = null

const EMPTY_STATS: LabStats = {
  total: 0,
  featured: featuredLabEntries.length,
  core2000: 0,
  n5: 0,
  n4: 0,
  n3: 0,
  n2: 0,
  n1: 0,
  kaoyan: 0,
  kaoyan3500: 0,
  jlpt10k: 0,
  jmdict: 0,
}

const TAB_ITEMS: Array<{ key: TabKey; label: string; badge?: string }> = [
  { key: 'library', label: '全词汇词典' },
  { key: 'favorites', label: '收藏本' },
  { key: 'review', label: '今日复习' },
  { key: 'quiz', label: '自测' },
  { key: 'grammar', label: '文法', badge: '14 类' },
  { key: 'pattern', label: '句型', badge: '332' },
]

const SOURCE_OPTIONS: Array<{ value: SourceMode; label: string }> = [
  { value: 'all', label: '全词汇' },
  { value: 'featured', label: '高质量词卡' },
  { value: 'core2000', label: '基础整合库' },
  { value: 'jlpt10k', label: 'JLPT 10K' },
  { value: 'jmdict', label: 'JMDict 全量检索' },
  { value: 'kaoyan3500', label: '考研 3500' },
  { value: 'n5', label: 'N5' },
  { value: 'n4', label: 'N4' },
  { value: 'n3', label: 'N3' },
  { value: 'n2', label: 'N2' },
  { value: 'n1', label: 'N1' },
]

const LEVEL_OPTIONS: Array<{ value: LevelFilter; label: string }> = [
  { value: 'ALL', label: '全部等级' },
  { value: 'N5', label: 'N5' },
  { value: 'N4', label: 'N4' },
  { value: 'N3', label: 'N3' },
  { value: 'N2', label: 'N2' },
  { value: 'N1', label: 'N1' },
  { value: '考研', label: '考研' },
  { value: '未分级', label: '未分级' },
]

const GrammarTab = dynamic(() => import('@/lib/grammarBank').then((mod) => mod.GrammarTab), {
  loading: () => <PanelMessage title="文法内容加载中" description="正在按需加载语法模块。" />,
})

const PatternTab = dynamic(() => import('@/lib/sentencePatterns').then((mod) => mod.PatternTab), {
  loading: () => <PanelMessage title="句型内容加载中" description="正在按需加载句型模块。" />,
})

const QuizMode = dynamic(() => import('@/components/LabQuizModeClean').then((mod) => mod.QuizMode), {
  loading: () => <PanelMessage title="自测模块加载中" description="正在准备测试题。" />,
})

function paginate<T>(items: T[], page: number) {
  const start = (page - 1) * PAGE_SIZE
  return items.slice(start, start + PAGE_SIZE)
}

function getPrimaryMeaning(item: VocabEntry) {
  return item.meaningZh.trim() || item.meaningEn.trim() || item.detailZh.trim() || '暂未整理释义'
}

function getTrackLabel(track: VocabEntry['track']) {
  if (track === 'featured') return '精选词卡'
  if (track === 'core2000') return 'Core 2000'
  if (track === 'full') return '整合词库'
  if (track === 'jlpt10k') return 'JLPT 10K'
  if (track === 'jmdict') return 'JMDict'
  if (track === 'kaoyan3500' || track === 'kaoyan') return '考研'
  return '全词库'
}

function getDisplayLevel(level: VocabEntry['level']) {
  return level === '鑰冪爺' ? '考研' : level
}

function mergePreviewWithLive(items: VocabEntry[]) {
  const map = new Map<string, VocabEntry>()

  for (const entry of featuredLabEntries) {
    map.set(`${entry.word}__${entry.kana}`, entry)
  }

  for (const entry of items) {
    const key = `${entry.word}__${entry.kana}`
    if (!map.has(key)) {
      map.set(key, entry)
    }
  }

  return Array.from(map.values())
}

function matchesKeyword(item: VocabEntry, keyword: string) {
  if (!keyword) return true
  return [item.word, item.kana, item.meaningZh, item.meaningEn, item.detailZh, item.partOfSpeech ?? '', ...(item.notes ?? [])].join(' ').toLowerCase().includes(keyword)
}

function matchesSourceMode(item: VocabEntry, mode: SourceMode) {
  if (mode === 'all') return true
  if (mode === 'featured') return item.track === 'featured'
  if (mode === 'core2000') return item.track === 'core2000' || item.track === 'full' || item.track === 'kaoyan'
  if (mode === 'jlpt10k') return item.track === 'jlpt10k'
  if (mode === 'jmdict') return item.track === 'jmdict'
  if (mode === 'kaoyan3500') return item.track === 'kaoyan3500'
  if (mode === 'n5') return item.level === 'N5'
  if (mode === 'n4') return item.level === 'N4'
  if (mode === 'n3') return item.level === 'N3'
  if (mode === 'n2') return item.level === 'N2'
  return item.level === 'N1'
}

function matchesLevel(item: VocabEntry, level: LevelFilter) {
  if (level === 'ALL') return true
  if (level === '考研') return item.level === '考研' || item.level === '鑰冪爺'
  return item.level === level
}

function getSourceCount(stats: LabStats, mode: SourceMode, remoteDictionaryCount?: number) {
  if (mode === 'all') return stats.total
  if (mode === 'featured') return stats.featured
  if (mode === 'core2000') return stats.core2000
  if (mode === 'jlpt10k') return stats.jlpt10k
  if (mode === 'jmdict') return remoteDictionaryCount ?? stats.jmdict
  if (mode === 'kaoyan3500') return stats.kaoyan3500
  if (mode === 'n5') return stats.n5
  if (mode === 'n4') return stats.n4
  if (mode === 'n3') return stats.n3
  if (mode === 'n2') return stats.n2
  return stats.n1
}

export default function LabPageClient() {
  const [tab, setTab] = useState<TabKey>('library')
  const [keyword, setKeyword] = useState('')
  const [sourceMode, setSourceMode] = useState<SourceMode>('all')
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('ALL')
  const [page, setPage] = useState(1)
  const [selectedWordId, setSelectedWordId] = useState<string | null>(featuredLabEntries[0]?.id ?? null)
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)
  const [vocabAllEntries, setVocabAllEntries] = useState<VocabEntry[]>([])
  const [vocabStats, setVocabStats] = useState<LabStats | null>(null)
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [remoteDictionaryEntries, setRemoteDictionaryEntries] = useState<VocabEntry[]>([])
  const [remoteDictionaryCatalog, setRemoteDictionaryCatalog] = useState<Record<string, VocabEntry>>({})
  const [remoteDictionaryMeta, setRemoteDictionaryMeta] = useState<RemoteDictionaryMeta | null>(null)
  const [isRemoteDictionaryLoading, setIsRemoteDictionaryLoading] = useState(false)
  const [remoteDictionaryError, setRemoteDictionaryError] = useState<string | null>(null)

  const deferredKeyword = useDeferredValue(keyword)
  const remoteDictionaryQuery = deferredKeyword.trim()
  const normalizedKeyword = remoteDictionaryQuery.toLowerCase()
  const isRemoteDictionaryMode = tab === 'library' && sourceMode === 'jmdict'
  const { speak, voiceStatusLabel } = useSpeech()
  const { favorites, reviewMap, recentViewedIds, dueTodayIds, completedTodayCount, scheduledCount, toggleFavorite, markViewed, toggleReviewQueue, reviewCard, resetAll } = useStudyStore()

  const speakText = useCallback((text: string) => {
    void speak({ text })
  }, [speak])

  const loadVocabulary = useCallback(async (forceRefresh = false) => {
    setIsLoadingLibrary(true)
    setLoadError(null)

    try {
      let payload = cachedLabPayload

      if (!payload || forceRefresh) {
        const response = await fetch('/api/lab/vocabulary')
        if (!response.ok) {
          throw new Error(`Failed to load vocabulary bank (${response.status})`)
        }

        payload = (await response.json()) as LabVocabularyPayload
        cachedLabPayload = payload
      }

      setVocabAllEntries(mergePreviewWithLive(payload.entries))
      setVocabStats({
        ...payload.stats,
        featured: featuredLabEntries.length,
      })
    } catch (error) {
      console.error('Failed to load vocabulary bank:', error)
      setLoadError('全词库加载失败，当前先展示高质量示例词卡。你仍然可以收藏、复习和发音。')
    } finally {
      setIsLoadingLibrary(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const timeoutId = setTimeout(() => {
      if (cancelled) return
      void loadVocabulary()
    }, 120)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [loadVocabulary])

  useEffect(() => {
    if (!isRemoteDictionaryMode) {
      setIsRemoteDictionaryLoading(false)
      setRemoteDictionaryError(null)
      return
    }

    if (!remoteDictionaryQuery) {
      setRemoteDictionaryEntries([])
      setRemoteDictionaryError(null)
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      setIsRemoteDictionaryLoading(true)
      setRemoteDictionaryError(null)

      void fetch(`/api/lab/dictionary-search?q=${encodeURIComponent(remoteDictionaryQuery)}&limit=48`, {
        signal: controller.signal,
        cache: 'no-store',
      })
        .then(async (response) => {
          const payload = await response.json() as {
            meta?: RemoteDictionaryMeta | null
            results?: VocabEntry[]
            error?: string
          }

          if (!response.ok) {
            throw new Error(payload.error || '全量词典检索失败。')
          }

          const nextResults = payload.results ?? []
          setRemoteDictionaryEntries(nextResults)

          if (payload.meta) {
            setRemoteDictionaryMeta(payload.meta)
          }

          if (nextResults.length > 0) {
            setRemoteDictionaryCatalog((current) => {
              const next = { ...current }
              for (const entry of nextResults) {
                next[entry.id] = entry
              }
              return next
            })
          }
        })
        .catch((error: unknown) => {
          if ((error as { name?: string }).name === 'AbortError') return
          console.error('Failed to search latest dictionary:', error)
          setRemoteDictionaryEntries([])
          setRemoteDictionaryError(error instanceof Error ? error.message : '全量词典检索暂时不可用。')
        })
        .finally(() => {
          setIsRemoteDictionaryLoading(false)
        })
    }, 180)

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [isRemoteDictionaryMode, remoteDictionaryQuery])

  const favoriteSet = useMemo(() => new Set(favorites), [favorites])
  const dueSet = useMemo(() => new Set(dueTodayIds), [dueTodayIds])
  const reviewSet = useMemo(() => new Set(Object.keys(reviewMap)), [reviewMap])
  const stats = vocabStats ?? EMPTY_STATS
  const libraryEntries = vocabAllEntries.length > 0 ? vocabAllEntries : featuredLabEntries
  const catalogEntries = useMemo(() => {
    const map = new Map<string, VocabEntry>()

    for (const entry of libraryEntries) {
      map.set(entry.id, entry)
    }

    for (const entry of Object.values(remoteDictionaryCatalog)) {
      if (!map.has(entry.id)) {
        map.set(entry.id, entry)
      }
    }

    return Array.from(map.values())
  }, [libraryEntries, remoteDictionaryCatalog])
  const sourceLabel = SOURCE_OPTIONS.find((option) => option.value === sourceMode)?.label ?? '全词汇'
  const levelLabel = LEVEL_OPTIONS.find((option) => option.value === levelFilter)?.label ?? '全部等级'
  const remoteDictionaryCount = remoteDictionaryMeta?.entryCount

  const filteredLibrary = useMemo(() => {
    if (isRemoteDictionaryMode) {
      if (!remoteDictionaryQuery) return []
      return remoteDictionaryEntries.filter((item) => matchesLevel(item, levelFilter))
    }

    return libraryEntries.filter((item) => {
      return matchesKeyword(item, normalizedKeyword) && matchesSourceMode(item, sourceMode) && matchesLevel(item, levelFilter)
    })
  }, [isRemoteDictionaryMode, levelFilter, libraryEntries, normalizedKeyword, remoteDictionaryEntries, remoteDictionaryQuery, sourceMode])

  const favoriteItemsAll = useMemo(() => {
    return catalogEntries.filter((item) => favoriteSet.has(item.id))
  }, [catalogEntries, favoriteSet])

  const filteredFavorites = useMemo(() => {
    return favoriteItemsAll.filter((item) => {
      return matchesKeyword(item, normalizedKeyword) && matchesSourceMode(item, sourceMode) && matchesLevel(item, levelFilter)
    })
  }, [favoriteItemsAll, normalizedKeyword, sourceMode, levelFilter])

  const reviewQueueItemsAll = useMemo(() => {
    return catalogEntries
      .filter((item) => reviewSet.has(item.id))
      .sort((left, right) => {
        const leftDue = new Date(reviewMap[left.id]?.dueAt ?? 0).getTime()
        const rightDue = new Date(reviewMap[right.id]?.dueAt ?? 0).getTime()
        return leftDue - rightDue
      })
  }, [catalogEntries, reviewSet, reviewMap])

  const dueItemsAll = useMemo(() => {
    return reviewQueueItemsAll.filter((item) => dueSet.has(item.id))
  }, [reviewQueueItemsAll, dueSet])

  const filteredReviewItems = useMemo(() => {
    return dueItemsAll.filter((item) => {
      return matchesKeyword(item, normalizedKeyword) && matchesSourceMode(item, sourceMode) && matchesLevel(item, levelFilter)
    })
  }, [dueItemsAll, normalizedKeyword, sourceMode, levelFilter])

  const activeWordCollection = tab === 'library' ? filteredLibrary : filteredFavorites
  const activeWordCount = activeWordCollection.length
  const totalPages = Math.max(1, Math.ceil(activeWordCount / PAGE_SIZE))
  const pagedWordItems = useMemo(() => paginate(activeWordCollection, page), [activeWordCollection, page])
  const selectedWord = pagedWordItems.find((item) => item.id === selectedWordId) ?? pagedWordItems[0] ?? null
  const selectedReview = filteredReviewItems.find((item) => item.id === selectedReviewId) ?? filteredReviewItems[0] ?? null
  const activeCollectionCount = tab === 'library' ? filteredLibrary.length : tab === 'favorites' ? filteredFavorites.length : filteredReviewItems.length
  const recentViewedItems = useMemo(() => {
    return recentViewedIds
      .map((id) => catalogEntries.find((item) => item.id === id))
      .filter((item): item is VocabEntry => Boolean(item))
  }, [catalogEntries, recentViewedIds])

  const openLibraryWord = useCallback((id: string) => {
    const index = catalogEntries.findIndex((item) => item.id === id)
    setTab('library')
    setKeyword('')
    setSourceMode('all')
    setLevelFilter('ALL')
    setPage(index >= 0 ? Math.floor(index / PAGE_SIZE) + 1 : 1)
    setSelectedWordId(id)
  }, [catalogEntries])

  const dictionaryNotice = isRemoteDictionaryMode
    ? remoteDictionaryError
      ? `全量词典检索失败：${remoteDictionaryError}`
      : !remoteDictionaryQuery
        ? 'JMDict 全量词典已经改成服务端按需检索。输入日语、假名或 English gloss 后再返回最相关结果，避免把 20 万级词库整包塞进前端。'
        : isRemoteDictionaryLoading
          ? `正在从 ${remoteDictionaryMeta?.title ?? '最新词典'} 检索相关词条...`
          : remoteDictionaryMeta
            ? `当前连接 ${remoteDictionaryMeta.title}，共 ${remoteDictionaryMeta.entryCount.toLocaleString()} 条词条，结果来自服务端实时筛选。`
            : undefined
    : isLoadingLibrary && !vocabStats
      ? `完整词库正在接入中，当前先展示 ${featuredLabEntries.length} 张高质量词卡。词库完成后，这里的结果会自动扩展到 ${labFallbackCatalog.totalLabel}。`
      : undefined

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  useEffect(() => {
    if (tab !== 'library' && tab !== 'favorites') return
    if (pagedWordItems.length === 0) {
      setSelectedWordId(null)
      return
    }
    if (!pagedWordItems.some((item) => item.id === selectedWordId)) {
      setSelectedWordId(pagedWordItems[0].id)
    }
  }, [tab, pagedWordItems, selectedWordId])

  useEffect(() => {
    if (filteredReviewItems.length === 0) {
      setSelectedReviewId(null)
      return
    }
    if (!filteredReviewItems.some((item) => item.id === selectedReviewId)) {
      setSelectedReviewId(filteredReviewItems[0].id)
    }
  }, [filteredReviewItems, selectedReviewId])

  useEffect(() => {
    if ((tab === 'library' || tab === 'favorites') && selectedWord) {
      markViewed(selectedWord.id)
    }
  }, [markViewed, selectedWord, tab])

  return (
    <main className="min-h-screen bg-[#f7f2e9] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6" style={{ fontFamily: 'var(--font-jost)' }}>
        <section className="relative overflow-hidden rounded-[36px] border border-[#eadfcb] bg-[linear-gradient(135deg,#fffaf2_0%,#fff0db_45%,#f8ddb1_100%)] p-6 shadow-[0_28px_80px_rgba(128,92,40,0.14)] md:p-8">
          <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-white/70 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-[#ffd89e]/40 blur-3xl" />

          <div className="relative grid gap-6 xl:grid-cols-[1.35fr,0.95fr] xl:items-end">
            <div>
              <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a77a37]">
                Japanese Lab · Search to Review
              </span>
              <h1 className="mt-5 text-4xl font-semibold text-[#1f1710] md:text-5xl" style={{ fontFamily: 'var(--font-cormorant)' }}>
                日语学习实验室
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5f4b36] md:text-base">
                现在会先展示能直接拿来学的完整词卡，然后尽快把更大的多源词库接进来。你可以从搜索开始，也可以直接继续收藏、复习和发音。
              </p>

              <div className="mt-6 rounded-[28px] border border-white/70 bg-white/75 p-4 shadow-[0_12px_32px_rgba(134,100,50,0.08)] backdrop-blur">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b08244]">Search</span>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      value={keyword}
                      onChange={(event) => {
                        setKeyword(event.target.value)
                        setPage(1)
                      }}
                      placeholder="输入日语、假名、中文释义、词性或 English gloss"
                      className="w-full rounded-[22px] border border-[#e4d2b8] bg-[#fffdf9] px-4 py-3 text-sm text-[#2f2419] outline-none transition placeholder:text-[#a38e73] focus:border-[#caa46e]"
                    />
                    <button
                      type="button"
                      onClick={() => void loadVocabulary(true)}
                      className="shrink-0 rounded-[22px] bg-[#201911] px-5 py-3 text-sm font-medium text-[#fff1da] transition hover:bg-[#342519]"
                    >
                      {isLoadingLibrary ? '接入全词库中...' : '刷新词库'}
                    </button>
                  </div>
                </label>
                <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge tone="warm" label={`范围 ${sourceLabel}`} />
                  <StatusBadge tone="dark" label={`等级 ${levelLabel}`} />
                  <StatusBadge tone="warm" label={voiceStatusLabel} />
                  {isLoadingLibrary && <StatusBadge tone="warm" label="更大词库正在后台接入" />}
                  {isRemoteDictionaryLoading && <StatusBadge tone="warm" label="最新词典检索中" />}
                </div>
                <p className="mt-3 text-sm leading-6 text-[#79624b]">
                  {isRemoteDictionaryMode && remoteDictionaryMeta
                    ? `当前全量词典源为 ${remoteDictionaryMeta.title}，共 ${remoteDictionaryMeta.entryCount.toLocaleString()} 条词条，按关键词即时检索。`
                    : vocabStats
                      ? `当前已接入 ${stats.total.toLocaleString()} 条可检索词条。`
                      : labFallbackCatalog.totalDescription}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {labQuickPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setTab('library')
                      setKeyword(preset.keyword)
                      setSourceMode(preset.sourceMode as SourceMode)
                      setLevelFilter(preset.levelFilter as LevelFilter)
                      setPage(1)
                    }}
                    className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-medium text-[#6a543d] transition hover:bg-[#fff8ef]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <HeroMetric label="全词库" value={vocabStats ? stats.total.toLocaleString() : labFallbackCatalog.totalLabel} description={labFallbackCatalog.totalDescription} />
              <HeroMetric label="今日复习" value={dueItemsAll.length.toString()} description="今天到期、应该优先处理的卡片" />
              <HeroMetric label="今日完成" value={completedTodayCount.toString()} description="今天已经完成反馈的复习张数" />
              <HeroMetric label="当前范围" value={vocabStats ? getSourceCount(stats, sourceMode, remoteDictionaryCount).toLocaleString() : sourceMode === 'featured' ? featuredLabEntries.length.toString() : labFallbackCatalog.totalLabel} description={`${sourceLabel} 视角下的可见规模`} />
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-[32px] border border-[#eadfcb] bg-white/85 p-5 shadow-[0_14px_36px_rgba(125,93,48,0.08)] backdrop-blur md:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Quick Loop</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              最小可用学习闭环
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {['搜索词', '查看词卡', '收藏 / 加入复习', '进入今日复习'].map((item, index) => (
                <div key={item} className="rounded-[22px] bg-[#fbf7ef] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#af8a50]">0{index + 1}</p>
                  <p className="mt-3 text-sm font-medium text-[#332719]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[#eadfcb] bg-white/85 p-5 shadow-[0_14px_36px_rgba(125,93,48,0.08)] backdrop-blur md:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Continue</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              继续今天的学习
            </h2>
            {recentViewedItems[0] ? (
              <div className="mt-5 rounded-[24px] bg-[#fbf7ef] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[30px] font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                      {recentViewedItems[0].word}
                    </p>
                    <p className="mt-1 text-sm text-[#7a6145]">{recentViewedItems[0].kana || recentViewedItems[0].word}</p>
                    <p className="mt-3 text-sm leading-7 text-[#4b3b2d]">{getPrimaryMeaning(recentViewedItems[0])}</p>
                  </div>
                  <StatusBadge tone="warm" label={getTrackLabel(recentViewedItems[0].track)} />
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      openLibraryWord(recentViewedItems[0].id)
                    }}
                    className="rounded-full bg-[#201911] px-4 py-2 text-sm font-medium text-[#fff1da] transition hover:bg-[#342519]"
                  >
                    打开词卡
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTab('review')
                      setSelectedReviewId(dueItemsAll[0]?.id ?? null)
                    }}
                    className="rounded-full border border-[#e3d2bb] px-4 py-2 text-sm font-medium text-[#6c5338] transition hover:bg-[#fff8ef]"
                  >
                    进入今日复习
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-7 text-[#6c5945]">
                先打开一张词卡，系统就会开始记录你的最近学习轨迹。
              </p>
            )}
          </div>
        </section>

        <div className="flex flex-wrap gap-2">
          {TAB_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setTab(item.key)
                setPage(1)
              }}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                tab === item.key ? 'bg-[#201911] text-[#fff1da] shadow-[0_10px_25px_rgba(43,28,12,0.18)]' : 'bg-white text-[#6a543d] hover:bg-[#fff6ea]'
              }`}
            >
              {item.label}
              {item.badge && (
                <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${tab === item.key ? 'bg-[#d6b17b] text-[#201911]' : 'bg-[#f8ecda] text-[#9b7339]'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === 'library' || tab === 'favorites' || tab === 'review' ? (
          <section className="rounded-[32px] border border-[#eadfcb] bg-white/85 p-5 shadow-[0_14px_36px_rgba(125,93,48,0.08)] backdrop-blur md:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Study View</p>
                <h2 className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  {tab === 'library' ? '全词汇词典' : tab === 'favorites' ? '收藏词单' : '今日复习台'}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#6c5945]">
                  {tab === 'library'
                    ? '用更接近词典 App 的方式浏览结果，左边快速切词，右边看完整词卡。'
                    : tab === 'favorites'
                      ? '把常看、常忘或想重点积累的词集中留在收藏本里，方便反复回看。'
                      : '先回忆，再显示答案，再给难度反馈，整个过程会更像一轮完整复习。'}
                </p>
              </div>

              <button
                type="button"
                onClick={resetAll}
                className="rounded-[22px] border border-[#e3d2bb] px-4 py-3 text-sm font-medium text-[#6c5338] transition hover:bg-[#fff8ef]"
              >
                清空收藏与复习记录
              </button>
            </div>

            <div className="mt-6 grid gap-5 xl:grid-cols-[1.3fr,0.9fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#af8a50]">词库范围</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SOURCE_OPTIONS.map((option) => (
                    <FilterChip
                      key={option.value}
                      active={sourceMode === option.value}
                      label={option.label}
                      count={vocabStats
                        ? getSourceCount(stats, option.value, option.value === 'jmdict' ? remoteDictionaryCount : undefined).toLocaleString()
                        : option.value === 'featured'
                          ? featuredLabEntries.length.toString()
                          : option.value === 'all'
                            ? labFallbackCatalog.totalLabel
                            : option.value === 'jmdict'
                              ? '全量'
                              : '...'}
                      onClick={() => {
                        setSourceMode(option.value)
                        setPage(1)
                      }}
                    />
                  ))}
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.26em] text-[#af8a50]">等级筛选</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {LEVEL_OPTIONS.map((option) => (
                    <FilterChip
                      key={option.value}
                      active={levelFilter === option.value}
                      label={option.label}
                      onClick={() => {
                        setLevelFilter(option.value)
                        setPage(1)
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniMetric label="当前命中" value={activeCollectionCount.toString()} description={tab === 'review' ? '本轮待处理的到期复习词' : '当前筛选条件下的可见词条'} />
                <MiniMetric label="复习队列" value={scheduledCount.toString()} description="已加入间隔复习系统的全部词" />
                <MiniMetric label="收藏词汇" value={favoriteItemsAll.length.toString()} description="你主动标记过的词" />
                <MiniMetric label="最近查看" value={recentViewedItems.length.toString()} description="本地记录的最近学习轨迹" />
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-[32px] border border-[#eadfcb] bg-white/85 p-5 shadow-[0_14px_36px_rgba(125,93,48,0.08)] md:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Learning Mode</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {tab === 'quiz' ? '词汇自测' : tab === 'grammar' ? '文法速查' : '句型速查'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#6c5945]">
              {tab === 'quiz'
                ? `从复习和收藏里抽题，看日语先想中文，再做反馈。当前可用：复习 ${dueItemsAll.length} 条，收藏 ${favoriteItemsAll.length} 条。`
                : tab === 'grammar'
                  ? '14 类核心语法保留按需加载，不会拖慢站点首屏。'
                  : '332 个高频表达也改成了按需加载，适合用来补句型语感。'}
            </p>
          </section>
        )}

        {loadError && (
          <PanelMessage title="全词库暂时没有完整接入" description={loadError} compact actionLabel="重新加载" onAction={() => void loadVocabulary(true)} />
        )}

        {tab === 'library' || tab === 'favorites' ? (
          <DictionaryWorkbench
            items={pagedWordItems}
            totalCount={activeWordCount}
            page={page}
            totalPages={totalPages}
            selectedId={selectedWordId}
            selectedItem={selectedWord}
            onSelect={setSelectedWordId}
            onPageChange={setPage}
            favoriteSet={favoriteSet}
            reviewSet={reviewSet}
            dueSet={dueSet}
            onSpeak={speakText}
            onToggleFavorite={toggleFavorite}
            onToggleReview={toggleReviewQueue}
            notice={dictionaryNotice}
            emptyTitle={tab === 'library'
              ? isRemoteDictionaryMode && !remoteDictionaryQuery
                ? '输入关键词开始检索'
                : '没有匹配的词条'
              : '收藏本里没有命中内容'}
            emptyDescription={tab === 'library'
              ? isRemoteDictionaryMode && !remoteDictionaryQuery
                ? 'JMDict 全量词典只在你输入关键词后按需返回结果，这样不会拖慢实验室页的首次加载。'
                : isRemoteDictionaryMode && remoteDictionaryError
                  ? remoteDictionaryError
                  : '换一个关键词、词库范围或等级试试看。'
              : '可以先在词典里点“收藏”，或者调整当前筛选条件。'}
          />
        ) : tab === 'review' ? (
          <ReviewWorkbench
            items={filteredReviewItems}
            queueCount={scheduledCount}
            selectedId={selectedReviewId}
            selectedItem={selectedReview}
            onSelect={setSelectedReviewId}
            onSpeak={speakText}
            onReview={reviewCard}
          />
        ) : tab === 'quiz' ? (
          <QuizMode reviewItems={dueItemsAll} favoriteItems={favoriteItemsAll} onRate={reviewCard} onSpeak={speakText} />
        ) : tab === 'grammar' ? (
          <GrammarTab />
        ) : (
          <PatternTab />
        )}
      </div>
    </main>
  )
}

function HeroMetric({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-[26px] border border-white/70 bg-white/72 p-4 shadow-[0_12px_28px_rgba(123,92,48,0.08)] backdrop-blur">
      <p className="text-sm font-medium text-[#8a6d48]">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#6d5a46]">{description}</p>
    </div>
  )
}

function MiniMetric({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-[24px] bg-[#fbf7ef] p-4">
      <p className="text-sm font-medium text-[#8a6d48]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#6d5a46]">{description}</p>
    </div>
  )
}

function FilterChip({ active, label, count, onClick }: { active: boolean; label: string; count?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active ? 'border-[#1f1710] bg-[#1f1710] text-[#fff1da]' : 'border-[#e3d2bb] bg-[#fffdf9] text-[#6a543d] hover:bg-[#fff6ea]'
      }`}
    >
      {label}
      {count && (
        <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${active ? 'bg-[#d6b17b] text-[#1f1710]' : 'bg-[#f7ead8] text-[#9b7339]'}`}>
          {count}
        </span>
      )}
    </button>
  )
}

function DictionaryWorkbench({
  items,
  totalCount,
  page,
  totalPages,
  selectedId,
  selectedItem,
  onSelect,
  onPageChange,
  favoriteSet,
  reviewSet,
  dueSet,
  onSpeak,
  onToggleFavorite,
  onToggleReview,
  notice,
  emptyTitle,
  emptyDescription,
}: {
  items: VocabEntry[]
  totalCount: number
  page: number
  totalPages: number
  selectedId: string | null
  selectedItem: VocabEntry | null
  onSelect: (id: string) => void
  onPageChange: (page: number) => void
  favoriteSet: Set<string>
  reviewSet: Set<string>
  dueSet: Set<string>
  onSpeak: (text: string) => void
  onToggleFavorite: (id: string) => void
  onToggleReview: (id: string) => void
  notice?: string
  emptyTitle: string
  emptyDescription: string
}) {
  return (
    <section className="grid gap-6 xl:grid-cols-[360px,minmax(0,1fr)]">
      <div className="order-2 xl:order-1">
        <div className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
          <div className="border-b border-[#f1e6d5] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Results</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {totalCount.toLocaleString()} 条结果
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6c5945]">第 {page} / {totalPages} 页，每页 {PAGE_SIZE} 条。左侧快速切词，右侧查看完整词卡。</p>
            {notice && (
              <p className="mt-3 rounded-[18px] bg-[#fbf5e8] px-3 py-2 text-sm leading-6 text-[#7c6243]">
                {notice}
              </p>
            )}
          </div>

          {items.length === 0 ? (
            <div className="p-5">
              <PanelMessage title={emptyTitle} description={emptyDescription} compact />
            </div>
          ) : (
            <>
              <div className="p-3 xl:max-h-[720px] xl:overflow-y-auto">
                {items.map((item) => (
                  <WordListItem
                    key={item.id}
                    item={item}
                    selected={selectedId === item.id}
                    isFavorite={favoriteSet.has(item.id)}
                    inReview={reviewSet.has(item.id)}
                    dueToday={dueSet.has(item.id)}
                    onSelect={() => onSelect(item.id)}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="border-t border-[#f1e6d5] p-4">
                  <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="order-1 xl:order-2 xl:sticky xl:top-28">
        {selectedItem ? (
          <WordCard
            item={selectedItem}
            isFavorite={favoriteSet.has(selectedItem.id)}
            inReview={reviewSet.has(selectedItem.id)}
            dueToday={dueSet.has(selectedItem.id)}
            onSpeak={onSpeak}
            onToggleFavorite={onToggleFavorite}
            onToggleReview={onToggleReview}
          />
        ) : (
          <PanelMessage title={emptyTitle} description={emptyDescription} />
        )}
      </div>
    </section>
  )
}

function ReviewWorkbench({
  items,
  queueCount,
  selectedId,
  selectedItem,
  onSelect,
  onSpeak,
  onReview,
}: {
  items: VocabEntry[]
  queueCount: number
  selectedId: string | null
  selectedItem: VocabEntry | null
  onSelect: (id: string) => void
  onSpeak: (text: string) => void
  onReview: (id: string, rating: 'again' | 'hard' | 'good' | 'easy') => void
}) {
  return (
    <section className="grid gap-6 xl:grid-cols-[360px,minmax(0,1fr)]">
      <div className="order-2 space-y-4 xl:order-1">
        <div className="rounded-[32px] border border-[#eadfcb] bg-white p-5 shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Today</p>
          <h3 className="mt-2 text-2xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
            今日复习工作台
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MiniMetric label="待处理" value={items.length.toString()} description="今天已经到期的词卡" />
            <MiniMetric label="总队列" value={queueCount.toString()} description="已经进入间隔复习的全部词卡" />
          </div>
          <p className="mt-4 text-sm leading-7 text-[#6c5945]">推荐节奏是：先看词，脑中回忆，再显示答案，最后给难度反馈。这样比直接扫答案更能稳住记忆。</p>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
          <div className="border-b border-[#f1e6d5] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Queue</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              到期词列表
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6c5945]">点击左边任意一条，就能在右侧进入完整复习卡。</p>
          </div>

          {items.length === 0 ? (
            <div className="p-5">
              <PanelMessage title="今天没有到期词卡" description="如果你已经把今天的复习做完了，可以回到词典继续加词，或者直接去自测里检验收藏本。" compact />
            </div>
          ) : (
            <div className="p-3 xl:max-h-[720px] xl:overflow-y-auto">
              {items.map((item) => (
                <ReviewQueueItem key={item.id} item={item} selected={selectedId === item.id} onSelect={() => onSelect(item.id)} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="order-1 xl:order-2 xl:sticky xl:top-28">
        {selectedItem ? (
          <ReviewCard key={selectedItem.id} item={selectedItem} onSpeak={onSpeak} onReview={onReview} />
        ) : (
          <PanelMessage title="选择一张词卡开始复习" description="左边会列出今天到期的词卡，点开后就能像词典 App 一样一张张处理。" />
        )}
      </div>
    </section>
  )
}

function WordListItem({
  item,
  selected,
  isFavorite,
  inReview,
  dueToday,
  onSelect,
}: {
  item: VocabEntry
  selected: boolean
  isFavorite: boolean
  inReview: boolean
  dueToday: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`mb-3 w-full rounded-[24px] border p-4 text-left transition ${
        selected ? 'border-[#d3ae77] bg-[#fff7eb] shadow-[0_12px_28px_rgba(140,103,48,0.12)]' : 'border-[#efe3cf] bg-[#fffdf9] hover:border-[#dcc09a] hover:bg-[#fff8ef]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[30px] font-semibold leading-none text-[#201911]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {item.word}
            </span>
            <span className="rounded-full bg-[#f4efe6] px-2.5 py-1 text-[11px] font-semibold text-[#6e5a40]">{getDisplayLevel(item.level)}</span>
            <span className="rounded-full bg-[#fff4dd] px-2.5 py-1 text-[11px] font-semibold text-[#9b6d1f]">{getTrackLabel(item.track)}</span>
          </div>
          <p className="mt-2 text-sm text-[#7a6145]">{item.kana || item.word}</p>
          <p className="mt-3 text-sm leading-6 text-[#544230]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {getPrimaryMeaning(item)}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          {isFavorite && <StatusBadge tone="dark" label="收藏" />}
          {inReview && <StatusBadge tone="warm" label="复习" />}
          {dueToday && <StatusBadge tone="danger" label="今日" />}
        </div>
      </div>
    </button>
  )
}

function ReviewQueueItem({ item, selected, onSelect }: { item: VocabEntry; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`mb-3 w-full rounded-[24px] border p-4 text-left transition ${
        selected ? 'border-[#d3ae77] bg-[#fff7eb] shadow-[0_12px_28px_rgba(140,103,48,0.12)]' : 'border-[#efe3cf] bg-[#fffdf9] hover:border-[#dcc09a] hover:bg-[#fff8ef]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[28px] font-semibold leading-none text-[#201911]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {item.word}
            </span>
            <span className="rounded-full bg-[#f4efe6] px-2.5 py-1 text-[11px] font-semibold text-[#6e5a40]">{getDisplayLevel(item.level)}</span>
          </div>
          <p className="mt-2 text-sm text-[#7a6145]">{item.kana || item.word}</p>
          <p className="mt-3 text-sm leading-6 text-[#544230]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {getPrimaryMeaning(item)}
          </p>
        </div>

        <div className="shrink-0">
          <StatusBadge tone="danger" label="到期" />
        </div>
      </div>
    </button>
  )
}

function StatusBadge({ tone, label }: { tone: 'dark' | 'warm' | 'danger'; label: string }) {
  const className = tone === 'dark' ? 'bg-[#201911] text-[#fff1da]' : tone === 'warm' ? 'bg-[#ffe6d7] text-[#a24d1a]' : 'bg-[#fff0f0] text-[#b34242]'
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}>{label}</span>
}

function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) {
  const windowPages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((value) => {
    if (totalPages <= 7) return true
    if (value === 1 || value === totalPages) return true
    return Math.abs(value - page) <= 1
  })

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="rounded-full border border-[#e3d2bb] px-4 py-2 text-sm text-[#6a543d] transition hover:bg-[#fff8ef] disabled:cursor-not-allowed disabled:opacity-40"
      >
        上一页
      </button>
      <div className="flex items-center gap-1">
        {windowPages.map((value, index) => {
          const previous = windowPages[index - 1]
          const showGap = previous && value - previous > 1
          return (
            <div key={value} className="flex items-center gap-1">
              {showGap && <span className="px-1 text-[#b39b7c]">...</span>}
              <button
                type="button"
                onClick={() => onPageChange(value)}
                className={`min-w-[36px] rounded-full px-3 py-2 text-sm transition ${page === value ? 'bg-[#201911] text-[#fff1da]' : 'text-[#6a543d] hover:bg-[#fff8ef]'}`}
              >
                {value}
              </button>
            </div>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="rounded-full border border-[#e3d2bb] px-4 py-2 text-sm text-[#6a543d] transition hover:bg-[#fff8ef] disabled:cursor-not-allowed disabled:opacity-40"
      >
        下一页
      </button>
    </div>
  )
}

function LibraryLoadingState() {
  return (
    <section className="grid gap-6 xl:grid-cols-[360px,minmax(0,1fr)]">
      <div className="animate-pulse overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white">
        <div className="border-b border-[#f1e6d5] p-5">
          <div className="h-3 w-20 rounded-full bg-[#eee3d1]" />
          <div className="mt-4 h-8 w-40 rounded-full bg-[#f3eadb]" />
          <div className="mt-3 h-4 w-48 rounded-full bg-[#f6efe4]" />
        </div>
        <div className="space-y-3 p-3">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="rounded-[24px] border border-[#f0e7da] bg-[#fffdf9] p-4">
              <div className="h-7 w-24 rounded-full bg-[#efe4d2]" />
              <div className="mt-3 h-4 w-20 rounded-full bg-[#f3eadb]" />
              <div className="mt-4 h-4 w-full rounded-full bg-[#f7f0e6]" />
              <div className="mt-2 h-4 w-4/5 rounded-full bg-[#f7f0e6]" />
            </div>
          ))}
        </div>
      </div>

      <div className="animate-pulse overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white">
        <div className="border-b border-[#f1e6d5] p-6">
          <div className="h-3 w-24 rounded-full bg-[#eee3d1]" />
          <div className="mt-4 h-10 w-48 rounded-full bg-[#efe4d2]" />
          <div className="mt-3 h-5 w-32 rounded-full bg-[#f3eadb]" />
          <div className="mt-5 h-6 w-3/4 rounded-full bg-[#f7f0e6]" />
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-[1.2fr,0.8fr]">
          <div className="h-48 rounded-[28px] bg-[#faf5ec]" />
          <div className="space-y-4">
            <div className="h-32 rounded-[28px] bg-[#faf5ec]" />
            <div className="h-32 rounded-[28px] bg-[#1f1a16]" />
          </div>
        </div>
      </div>
    </section>
  )
}

function PanelMessage({
  title,
  description,
  actionLabel,
  onAction,
  compact = false,
}: {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  compact?: boolean
}) {
  return (
    <div className={`rounded-[32px] border border-dashed border-[#d9c6a9] bg-white/80 text-center shadow-[0_12px_32px_rgba(125,93,48,0.06)] ${compact ? 'p-6' : 'p-10'}`}>
      <h2 className="text-xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#6c5945]">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-[22px] bg-[#201911] px-5 py-3 text-sm font-medium text-[#fff1da] transition hover:bg-[#342519]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
