'use client'

import dynamic from 'next/dynamic'
import { type ReactNode, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { LabReviewCardClean as ReviewCard } from '@/components/LabReviewCardClean'
import { LabWordCardClean as WordCard } from '@/components/LabWordCardClean'
import type { LabLevelFilter, LabLookupResponse, LabSearchResponse, LabSourceMode, LabSourceSummary, VocabEntry } from '@/lib/labTypes'
import { useSpeech } from '@/lib/useSpeech'
import { useStudyStore } from '@/lib/useStudyStore'

type TabKey = 'library' | 'favorites' | 'review' | 'grammar' | 'pattern' | 'quiz'

const PAGE_SIZE = 14
const LOOKUP_CHUNK_SIZE = 80
const BASE_TRACKS = new Set(['core2000', 'full', 'kaoyan'])
const TAB_ITEMS: Array<{ key: TabKey; label: string }> = [
  { key: 'library', label: '全词库检索' },
  { key: 'favorites', label: '收藏本' },
  { key: 'review', label: '今日复习' },
  { key: 'quiz', label: '自测' },
  { key: 'grammar', label: '文法' },
  { key: 'pattern', label: '句型' },
]
const SOURCE_OPTIONS: Array<{ value: LabSourceMode; label: string }> = [
  { value: 'all', label: '全部来源' },
  { value: 'core2000', label: '基础整合库' },
  { value: 'jlpt10k', label: 'JLPT 10K' },
  { value: 'jmdict', label: 'JMDict 补充' },
  { value: 'kaoyan3500', label: '考研 3500' },
]
const LEVEL_OPTIONS: Array<{ value: LabLevelFilter; label: string }> = [
  { value: 'ALL', label: '全部等级' },
  { value: 'N5', label: 'N5' },
  { value: 'N4', label: 'N4' },
  { value: 'N3', label: 'N3' },
  { value: 'N2', label: 'N2' },
  { value: 'N1', label: 'N1' },
  { value: '考研', label: '考研' },
]

const GrammarTab = dynamic(() => import('@/lib/grammarBank').then((mod) => mod.GrammarTab), {
  loading: () => <EmptyState title="文法内容加载中" description="正在按需加载语法模块。" />,
})
const PatternTab = dynamic(() => import('@/lib/sentencePatterns').then((mod) => mod.PatternTab), {
  loading: () => <EmptyState title="句型内容加载中" description="正在按需加载句型模块。" />,
})
const QuizMode = dynamic(() => import('@/components/LabQuizModeClean').then((mod) => mod.QuizMode), {
  loading: () => <EmptyState title="自测模块加载中" description="正在准备测试题。" />,
})

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase()
}

function buildEntryMap(entries: VocabEntry[]) {
  return entries.reduce<Record<string, VocabEntry>>((acc, entry) => {
    acc[entry.id] = entry
    return acc
  }, {})
}

function mergeEntryMap(previous: Record<string, VocabEntry>, entries: VocabEntry[]) {
  const next = { ...previous }
  for (const entry of entries) next[entry.id] = entry
  return next
}

function getPrimaryMeaning(item: VocabEntry) {
  return item.meaningZh.trim() || item.meaningEn.trim() || item.detailZh.trim() || '暂未整理释义'
}

function getDisplayLevel(level: VocabEntry['level']) {
  return level
}

function getTrackLabel(track: VocabEntry['track']) {
  if (track === 'core2000') return '基础整合库'
  if (track === 'jlpt10k') return 'JLPT 10K'
  if (track === 'jmdict') return 'JMDict'
  if (track === 'kaoyan3500' || track === 'kaoyan') return '考研'
  if (track === 'featured') return '精选词卡'
  return '整合词库'
}

function matchesKeyword(item: VocabEntry, keyword: string) {
  if (!keyword) return true
  return (item.searchText ?? [item.word, item.kana, item.meaningZh, item.meaningEn, item.detailZh, ...(item.notes ?? [])].join(' ').toLowerCase()).includes(keyword)
}

function matchesSource(item: VocabEntry, source: LabSourceMode) {
  if (source === 'all') return true
  const tracks = item.tracks ?? [item.track]
  if (source === 'core2000') return tracks.some((track) => BASE_TRACKS.has(track))
  if (source === 'jlpt10k') return tracks.includes('jlpt10k')
  if (source === 'jmdict') return tracks.includes('jmdict')
  return tracks.includes('kaoyan3500')
}

function matchesLevel(item: VocabEntry, level: LabLevelFilter) {
  if (level === 'ALL') return true
  return (item.levels ?? [item.level]).includes(level)
}

function getSourceCount(response: LabSearchResponse, source: LabSourceMode) {
  if (source === 'all') return response.stats.total
  if (source === 'core2000') return response.stats.core2000
  if (source === 'jlpt10k') return response.stats.jlpt10k
  if (source === 'jmdict') return response.stats.jmdict
  return response.stats.kaoyan3500
}

function getLevelCount(response: LabSearchResponse, level: LabLevelFilter) {
  if (level === 'ALL') return response.stats.total
  if (level === 'N5') return response.stats.n5
  if (level === 'N4') return response.stats.n4
  if (level === 'N3') return response.stats.n3
  if (level === 'N2') return response.stats.n2
  if (level === 'N1') return response.stats.n1
  return response.stats.kaoyan
}

async function requestLibrary(params: { keyword: string; source: LabSourceMode; level: LabLevelFilter; page: number }) {
  const searchParams = new URLSearchParams({
    source: params.source,
    level: params.level,
    page: String(params.page),
    pageSize: String(PAGE_SIZE),
  })

  if (params.keyword.trim()) searchParams.set('q', params.keyword.trim())

  const response = await fetch(`/api/lab/vocabulary?${searchParams.toString()}`)
  if (!response.ok) throw new Error(`Failed to search vocabulary (${response.status})`)
  return (await response.json()) as LabSearchResponse
}

async function requestEntriesByIds(ids: string[]) {
  const chunks: string[][] = []
  for (let index = 0; index < ids.length; index += LOOKUP_CHUNK_SIZE) {
    chunks.push(ids.slice(index, index + LOOKUP_CHUNK_SIZE))
  }

  const responses = await Promise.all(
    chunks.map(async (chunk) => {
      const searchParams = new URLSearchParams({ ids: chunk.join(',') })
      const response = await fetch(`/api/lab/vocabulary?${searchParams.toString()}`)
      if (!response.ok) throw new Error(`Failed to load vocabulary entries (${response.status})`)
      return (await response.json()) as LabLookupResponse
    }),
  )

  return {
    items: responses.flatMap((payload) => payload.items),
  } satisfies LabLookupResponse
}

export default function LabPageClient({ initialLibrary }: { initialLibrary: LabSearchResponse }) {
  const [tab, setTab] = useState<TabKey>('library')
  const [keyword, setKeyword] = useState(initialLibrary.keyword)
  const [sourceMode, setSourceMode] = useState<LabSourceMode>(initialLibrary.source)
  const [levelFilter, setLevelFilter] = useState<LabLevelFilter>(initialLibrary.level)
  const [page, setPage] = useState(initialLibrary.page)
  const [libraryResponse, setLibraryResponse] = useState(initialLibrary)
  const [entryMap, setEntryMap] = useState<Record<string, VocabEntry>>(() => buildEntryMap(initialLibrary.items))
  const [selectedWordId, setSelectedWordId] = useState<string | null>(initialLibrary.items[0]?.id ?? null)
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false)
  const [isLoadingLinkedEntries, setIsLoadingLinkedEntries] = useState(false)
  const deferredKeyword = useDeferredValue(keyword)
  const initialQueryRef = useRef<{ keyword: string; source: LabSourceMode; level: LabLevelFilter; page: number } | null>({ keyword: initialLibrary.keyword, source: initialLibrary.source, level: initialLibrary.level, page: initialLibrary.page })
  const pendingSelectionIdRef = useRef<string | null>(null)

  const { speak, voiceStatusLabel } = useSpeech()
  const {
    favorites,
    reviewMap,
    recentViewedIds,
    dueTodayIds,
    completedTodayCount,
    scheduledCount,
    toggleFavorite,
    markViewed,
    toggleReviewQueue,
    reviewCard,
  } = useStudyStore()

  const mergeCachedEntries = useCallback((items: VocabEntry[]) => {
    setEntryMap((previous) => mergeEntryMap(previous, items))
  }, [])

  const runLibrarySearch = useCallback(async (params: { keyword: string; source: LabSourceMode; level: LabLevelFilter; page: number }) => {
    setIsLoadingLibrary(true)
    setLoadError(null)
    try {
      const payload = await requestLibrary(params)
      setLibraryResponse(payload)
      mergeCachedEntries(payload.items)
      if (payload.page !== params.page) setPage(payload.page)
    } catch (error) {
      console.error('Failed to query vocabulary search:', error)
      setLoadError('服务端词库查询失败，当前保留上一轮结果。请稍后重试。')
    } finally {
      setIsLoadingLibrary(false)
    }
  }, [mergeCachedEntries])

  useEffect(() => {
    const normalized = normalizeKeyword(deferredKeyword)
    const initialQuery = initialQueryRef.current
    if (initialQuery && initialQuery.keyword === normalized && initialQuery.source === sourceMode && initialQuery.level === levelFilter && initialQuery.page === page) {
      initialQueryRef.current = null
      return
    }

    void runLibrarySearch({ keyword: normalized, source: sourceMode, level: levelFilter, page })
  }, [deferredKeyword, levelFilter, page, runLibrarySearch, sourceMode])

  const linkedIds = useMemo(() => Array.from(new Set([...favorites, ...Object.keys(reviewMap), ...recentViewedIds])).filter((id) => !entryMap[id]), [entryMap, favorites, recentViewedIds, reviewMap])

  useEffect(() => {
    if (linkedIds.length === 0) return
    let cancelled = false
    setIsLoadingLinkedEntries(true)
    void requestEntriesByIds(linkedIds)
      .then((payload) => {
        if (cancelled) return
        mergeCachedEntries(payload.items)
      })
      .catch((error) => {
        if (cancelled) return
        console.error('Failed to hydrate linked vocabulary entries:', error)
      })
      .finally(() => {
        if (cancelled) return
        setIsLoadingLinkedEntries(false)
      })

    return () => {
      cancelled = true
    }
  }, [linkedIds, mergeCachedEntries])

  const speakText = useCallback((text: string) => {
    void speak({ text })
  }, [speak])

  const favoriteSet = useMemo(() => new Set(favorites), [favorites])
  const dueSet = useMemo(() => new Set(dueTodayIds), [dueTodayIds])
  const reviewSet = useMemo(() => new Set(Object.keys(reviewMap)), [reviewMap])
  const normalizedKeyword = normalizeKeyword(deferredKeyword)

  const favoriteItems = useMemo(() => favorites.map((id) => entryMap[id]).filter((item): item is VocabEntry => Boolean(item)), [entryMap, favorites])
  const filteredFavorites = useMemo(() => favoriteItems.filter((item) => matchesKeyword(item, normalizedKeyword) && matchesSource(item, sourceMode) && matchesLevel(item, levelFilter)), [favoriteItems, levelFilter, normalizedKeyword, sourceMode])
  const reviewItems = useMemo(() => Object.keys(reviewMap).map((id) => entryMap[id]).filter((item): item is VocabEntry => Boolean(item)).sort((left, right) => new Date(reviewMap[left.id]?.dueAt ?? 0).getTime() - new Date(reviewMap[right.id]?.dueAt ?? 0).getTime()), [entryMap, reviewMap])
  const dueItems = useMemo(() => reviewItems.filter((item) => dueSet.has(item.id)), [dueSet, reviewItems])
  const filteredReviewItems = useMemo(() => dueItems.filter((item) => matchesKeyword(item, normalizedKeyword) && matchesSource(item, sourceMode) && matchesLevel(item, levelFilter)), [dueItems, levelFilter, normalizedKeyword, sourceMode])
  const recentViewedItems = useMemo(() => recentViewedIds.map((id) => entryMap[id]).filter((item): item is VocabEntry => Boolean(item)), [entryMap, recentViewedIds])

  const isLibraryTab = tab === 'library'
  const favoriteTotalPages = Math.max(1, Math.ceil(filteredFavorites.length / PAGE_SIZE))
  const currentListItems = isLibraryTab ? libraryResponse.items : filteredFavorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const currentTotal = isLibraryTab ? libraryResponse.total : filteredFavorites.length
  const currentTotalPages = isLibraryTab ? libraryResponse.totalPages : favoriteTotalPages
  const selectedWord = currentListItems.find((item) => item.id === selectedWordId) ?? currentListItems[0] ?? null
  const selectedReview = filteredReviewItems.find((item) => item.id === selectedReviewId) ?? filteredReviewItems[0] ?? null

  useEffect(() => {
    if (page > currentTotalPages) setPage(currentTotalPages)
  }, [currentTotalPages, page])

  useEffect(() => {
    if (tab !== 'library' && tab !== 'favorites') return
    if (currentListItems.length === 0) {
      setSelectedWordId(null)
      return
    }
    const pendingId = pendingSelectionIdRef.current
    if (pendingId && currentListItems.some((item) => item.id === pendingId)) {
      setSelectedWordId(pendingId)
      pendingSelectionIdRef.current = null
      return
    }
    if (!currentListItems.some((item) => item.id === selectedWordId)) setSelectedWordId(currentListItems[0].id)
  }, [currentListItems, selectedWordId, tab])

  useEffect(() => {
    if (filteredReviewItems.length === 0) {
      setSelectedReviewId(null)
      return
    }
    if (!filteredReviewItems.some((item) => item.id === selectedReviewId)) setSelectedReviewId(filteredReviewItems[0].id)
  }, [filteredReviewItems, selectedReviewId])

  useEffect(() => {
    if ((tab === 'library' || tab === 'favorites') && selectedWord) markViewed(selectedWord.id)
  }, [markViewed, selectedWord, tab])

  const sourceLabel = SOURCE_OPTIONS.find((option) => option.value === sourceMode)?.label ?? '全部来源'
  const levelLabel = LEVEL_OPTIONS.find((option) => option.value === levelFilter)?.label ?? '全部等级'

  return (
    <main className="min-h-screen bg-[#f7f2e9] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6" style={{ fontFamily: 'var(--font-jost)' }}>
        <section className="rounded-[36px] border border-[#eadfcb] bg-[linear-gradient(135deg,#fffaf2_0%,#fff0db_45%,#f8ddb1_100%)] p-6 shadow-[0_28px_80px_rgba(128,92,40,0.14)] md:p-8">
          <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a77a37]">Japanese Vocabulary System · Server Search</span>
          <h1 className="mt-5 text-4xl font-semibold text-[#1f1710] md:text-5xl" style={{ fontFamily: 'var(--font-cormorant)' }}>日语全词库系统</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5f4b36] md:text-base">现在首屏直接来自服务端检索，不再先下载整包词库。你可以按日文、假名、中文、英文、来源与等级搜索，并把结果直接接入收藏、复习与自测。</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value)
                setPage(1)
              }}
              placeholder="输入日语、假名、中文释义、英文释义或词性"
              className="w-full rounded-[22px] border border-[#e4d2b8] bg-[#fffdf9] px-4 py-3 text-sm text-[#2f2419] outline-none transition placeholder:text-[#a38e73] focus:border-[#caa46e]"
            />
            <button
              type="button"
              onClick={() => void runLibrarySearch({ keyword: normalizeKeyword(keyword), source: sourceMode, level: levelFilter, page })}
              className="shrink-0 rounded-[22px] bg-[#201911] px-5 py-3 text-sm font-medium text-[#fff1da] transition hover:bg-[#342519]"
            >
              {isLoadingLibrary ? '检索中...' : '重新检索'}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="dark">服务端检索</Badge>
            <Badge tone="warm">范围 {sourceLabel}</Badge>
            <Badge tone="warm">等级 {levelLabel}</Badge>
            <Badge tone="warm">{voiceStatusLabel}</Badge>
            {isLoadingLibrary && <Badge tone="neutral">正在刷新结果</Badge>}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="真实词条" value={libraryResponse.stats.total.toLocaleString()} description="服务端主索引去重后的当前规模" />
            <MetricCard label="当前命中" value={libraryResponse.total.toLocaleString()} description="当前搜索和筛选条件下的结果数" />
            <MetricCard label="今日复习" value={dueItems.length.toString()} description="今天到期、应优先处理的词卡" />
            <MetricCard label="学习队列" value={scheduledCount.toString()} description="已进入收藏或复习体系的词条" />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-[32px] border border-[#eadfcb] bg-white/85 p-5 shadow-[0_14px_36px_rgba(125,93,48,0.08)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Sources</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>当前数据覆盖</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {libraryResponse.sources.map((source) => (
                <SourceCard key={source.key} source={source} />
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-[#eadfcb] bg-white/85 p-5 shadow-[0_14px_36px_rgba(125,93,48,0.08)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Continue</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>今天的学习进度</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <MetricCard label="已收藏" value={favorites.length.toString()} description="已经纳入个人词库的词条" compact />
              <MetricCard label="已完成" value={completedTodayCount.toString()} description="今天已经完成反馈的复习张数" compact />
            </div>
            {recentViewedItems[0] ? (
              <div className="mt-5 rounded-[24px] bg-[#fbf7ef] p-5">
                <p className="text-[30px] font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>{recentViewedItems[0].word}</p>
                <p className="mt-1 text-sm text-[#7a6145]">{recentViewedItems[0].kana || recentViewedItems[0].word}</p>
                <p className="mt-3 text-sm leading-7 text-[#4b3b2d]">{getPrimaryMeaning(recentViewedItems[0])}</p>
                <button
                  type="button"
                  onClick={() => {
                    pendingSelectionIdRef.current = recentViewedItems[0].id
                    setTab('library')
                    setSourceMode('all')
                    setLevelFilter('ALL')
                    setKeyword(recentViewedItems[0].word)
                    setPage(1)
                  }}
                  className="mt-4 rounded-full border border-[#dfcfb7] bg-white px-4 py-2 text-sm font-medium text-[#5b4630] transition hover:border-[#c9af84] hover:bg-[#fff7eb]"
                >
                  回到词典查看
                </button>
              </div>
            ) : (
              <p className="mt-5 text-sm leading-7 text-[#6c5945]">你开始查词、收藏或复习后，这里会记录最近的学习轨迹。</p>
            )}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#eadfcb] bg-white/85 p-5 shadow-[0_14px_36px_rgba(125,93,48,0.08)]">
          <div className="flex flex-wrap gap-2">
            {TAB_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setTab(item.key)
                  setPage(1)
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${tab === item.key ? 'bg-[#201911] text-[#fff1da]' : 'border border-[#e3d2bb] bg-[#fffdf9] text-[#6a543d] hover:bg-[#fff8ef]'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold text-[#332719]">来源筛选</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOURCE_OPTIONS.map((option) => (
                <Chip
                  key={option.value}
                  active={sourceMode === option.value}
                  onClick={() => {
                    setSourceMode(option.value)
                    setPage(1)
                  }}
                >
                  {option.label} · {getSourceCount(libraryResponse, option.value).toLocaleString()}
                </Chip>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold text-[#332719]">等级筛选</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LEVEL_OPTIONS.map((option) => (
                <Chip
                  key={option.value}
                  active={levelFilter === option.value}
                  onClick={() => {
                    setLevelFilter(option.value)
                    setPage(1)
                  }}
                >
                  {option.label} · {getLevelCount(libraryResponse, option.value).toLocaleString()}
                </Chip>
              ))}
            </div>
          </div>
        </section>

        {loadError && <EmptyState title="词库查询失败" description={loadError} actionLabel="重新检索" onAction={() => void runLibrarySearch({ keyword: normalizedKeyword, source: sourceMode, level: levelFilter, page })} compact />}

        {tab === 'library' || tab === 'favorites' ? (
          <section className="grid gap-6 xl:grid-cols-[360px,minmax(0,1fr)]">
            <div className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
              <div className="border-b border-[#f1e6d5] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Results</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>{currentTotal.toLocaleString()} 条结果</h3>
                <p className="mt-2 text-sm leading-6 text-[#6c5945]">第 {page} / {currentTotalPages} 页，每页 {PAGE_SIZE} 条。{isLibraryTab ? '当前结果直接来自服务端检索。' : '收藏结果来自真实词库回查。'}</p>
                {!isLibraryTab && isLoadingLinkedEntries && <p className="mt-3 rounded-[18px] bg-[#fbf5e8] px-3 py-2 text-sm leading-6 text-[#7c6243]">正在从服务端词库回查收藏词条。</p>}
              </div>
              {currentListItems.length === 0 ? (
                <div className="p-5">
                  <EmptyState title={isLibraryTab ? '没有匹配的词条' : '收藏本里没有命中内容'} description={isLibraryTab ? '换一个关键词、来源或等级再试试。' : '可以先在词典里收藏词条，或者调整当前筛选条件。'} compact />
                </div>
              ) : (
                <>
                  <div className="p-3 xl:max-h-[720px] xl:overflow-y-auto">
                    {currentListItems.map((item) => (
                      <ResultListItem key={item.id} item={item} selected={selectedWordId === item.id} isFavorite={favoriteSet.has(item.id)} inReview={reviewSet.has(item.id)} dueToday={dueSet.has(item.id)} onSelect={() => setSelectedWordId(item.id)} />
                    ))}
                  </div>
                  {currentTotalPages > 1 && (
                    <div className="border-t border-[#f1e6d5] p-4">
                      <Pagination page={page} totalPages={currentTotalPages} onPageChange={setPage} />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="xl:sticky xl:top-28">
              {selectedWord ? (
                <WordCard item={selectedWord} isFavorite={favoriteSet.has(selectedWord.id)} inReview={reviewSet.has(selectedWord.id)} dueToday={dueSet.has(selectedWord.id)} onSpeak={speakText} onToggleFavorite={toggleFavorite} onToggleReview={toggleReviewQueue} />
              ) : (
                <EmptyState title="选择一条词目" description="左侧列表会展示当前页结果，点开后右侧就会显示完整词卡。" />
              )}
            </div>
          </section>
        ) : tab === 'review' ? (
          <section className="grid gap-6 xl:grid-cols-[360px,minmax(0,1fr)]">
            <div className="space-y-4">
              <div className="rounded-[32px] border border-[#eadfcb] bg-white p-5 shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Today</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>今日复习工作台</h3>
                <p className="mt-3 text-sm leading-7 text-[#6c5945]">今天到期 {filteredReviewItems.length} 条，复习队列总计 {scheduledCount} 条。{isLoadingLinkedEntries ? '正在从真实词库回查复习词条。' : '先回忆，再显示答案，再给难度反馈。'}</p>
              </div>
              <div className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
                <div className="border-b border-[#f1e6d5] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Queue</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>到期词列表</h3>
                </div>
                {filteredReviewItems.length === 0 ? (
                  <div className="p-5">
                    <EmptyState title="今天没有到期词卡" description="如果你已经把今天的复习做完了，可以回到词典继续加词，或者直接去自测里检验收藏本。" compact />
                  </div>
                ) : (
                  <div className="p-3 xl:max-h-[720px] xl:overflow-y-auto">
                    {filteredReviewItems.map((item) => (
                      <ResultListItem key={item.id} item={item} selected={selectedReviewId === item.id} isFavorite={favoriteSet.has(item.id)} inReview dueToday onSelect={() => setSelectedReviewId(item.id)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="xl:sticky xl:top-28">
              {selectedReview ? (
                <ReviewCard item={selectedReview} onSpeak={speakText} onReview={reviewCard} />
              ) : (
                <EmptyState title="选择一张词卡开始复习" description="左边会列出今天到期的词卡，点开后就能进入完整复习卡。" />
              )}
            </div>
          </section>
        ) : tab === 'quiz' ? (
          <QuizMode reviewItems={dueItems} favoriteItems={favoriteItems} onRate={reviewCard} onSpeak={speakText} />
        ) : tab === 'grammar' ? (
          <GrammarTab />
        ) : (
          <PatternTab />
        )}
      </div>
    </main>
  )
}

function SourceCard({ source }: { source: LabSourceSummary }) {
  return (
    <div className="rounded-[24px] bg-[#fbf7ef] p-4">
      <p className="text-sm font-medium text-[#8a6d48]">{source.label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>{source.count.toLocaleString()}</p>
      <p className="mt-2 text-sm leading-6 text-[#6d5a46]">{source.description}</p>
    </div>
  )
}

function MetricCard({ label, value, description, compact = false }: { label: string; value: string; description: string; compact?: boolean }) {
  return (
    <div className={`rounded-[26px] border border-white/70 bg-white/72 shadow-[0_12px_28px_rgba(123,92,48,0.08)] backdrop-blur ${compact ? 'p-4' : 'p-4'}`}>
      <p className="text-sm font-medium text-[#8a6d48]">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#6d5a46]">{description}</p>
    </div>
  )
}

function ResultListItem({ item, selected, isFavorite, inReview, dueToday, onSelect }: { item: VocabEntry; selected: boolean; isFavorite: boolean; inReview: boolean; dueToday: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`mb-3 w-full rounded-[24px] border p-4 text-left transition ${selected ? 'border-[#d3ae77] bg-[#fff7eb] shadow-[0_12px_28px_rgba(140,103,48,0.12)]' : 'border-[#efe3cf] bg-[#fffdf9] hover:border-[#dcc09a] hover:bg-[#fff8ef]'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[28px] font-semibold leading-none text-[#201911]" style={{ fontFamily: 'var(--font-cormorant)' }}>{item.word}</span>
            <span className="rounded-full bg-[#f4efe6] px-2.5 py-1 text-[11px] font-semibold text-[#6e5a40]">{getDisplayLevel(item.level)}</span>
            <span className="rounded-full bg-[#fff4dd] px-2.5 py-1 text-[11px] font-semibold text-[#9b6d1f]">{getTrackLabel(item.track)}</span>
          </div>
          <p className="mt-2 text-sm text-[#7a6145]">{item.kana || item.word}</p>
          <p className="mt-3 text-sm leading-6 text-[#544230]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{getPrimaryMeaning(item)}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          {isFavorite && <Badge tone="dark">收藏</Badge>}
          {inReview && <Badge tone="warm">复习</Badge>}
          {dueToday && <Badge tone="danger">今日</Badge>}
        </div>
      </div>
    </button>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active ? 'border-[#1f1710] bg-[#1f1710] text-[#fff1da]' : 'border-[#e3d2bb] bg-[#fffdf9] text-[#6a543d] hover:bg-[#fff6ea]'}`}
    >
      {children}
    </button>
  )
}

function Badge({ tone, children }: { tone: 'dark' | 'warm' | 'danger' | 'neutral'; children: ReactNode }) {
  const className = tone === 'dark' ? 'bg-[#201911] text-[#fff1da]' : tone === 'warm' ? 'bg-[#ffe6d7] text-[#a24d1a]' : tone === 'danger' ? 'bg-[#fff0f0] text-[#b34242]' : 'bg-[#edf1f5] text-[#495666]'
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}>{children}</span>
}

function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button type="button" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1} className="rounded-full border border-[#e3d2bb] px-4 py-2 text-sm text-[#6a543d] transition hover:bg-[#fff8ef] disabled:cursor-not-allowed disabled:opacity-40">上一页</button>
      <span className="text-sm text-[#6a543d]">{page} / {totalPages}</span>
      <button type="button" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages} className="rounded-full border border-[#e3d2bb] px-4 py-2 text-sm text-[#6a543d] transition hover:bg-[#fff8ef] disabled:cursor-not-allowed disabled:opacity-40">下一页</button>
    </div>
  )
}

function EmptyState({ title, description, actionLabel, onAction, compact = false }: { title: string; description: string; actionLabel?: string; onAction?: () => void; compact?: boolean }) {
  return (
    <div className={`rounded-[32px] border border-dashed border-[#d9c6a9] bg-white/80 text-center shadow-[0_12px_32px_rgba(125,93,48,0.06)] ${compact ? 'p-6' : 'p-10'}`}>
      <h2 className="text-xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#6c5945]">{description}</p>
      {actionLabel && onAction && <button type="button" onClick={onAction} className="mt-5 rounded-[22px] bg-[#201911] px-5 py-3 text-sm font-medium text-[#fff1da] transition hover:bg-[#342519]">{actionLabel}</button>}
    </div>
  )
}
