'use client'

import dynamic from 'next/dynamic'
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { ReviewCard } from '@/components/ReviewCard'
import { WordCard } from '@/components/WordCard'
import type { VocabEntry } from '@/lib/vocabularyBank'
import { useSpeech } from '@/lib/useSpeech'
import { useStudyStore } from '@/lib/useStudyStore'

type TabKey = 'library' | 'favorites' | 'review' | 'grammar' | 'pattern' | 'quiz'
type LibraryMode = 'core2000' | 'n2' | 'n1' | 'n3' | 'n4' | 'kaoyan3500' | 'jlpt10k' | 'all'

interface LabStats {
  total: number
  core2000: number
  n4: number
  n3: number
  n2: number
  n1: number
  kaoyan3500: number
}

const PAGE_SIZE = 24
const EMPTY_STATS: LabStats = {
  total: 0,
  core2000: 0,
  n4: 0,
  n3: 0,
  n2: 0,
  n1: 0,
  kaoyan3500: 0,
}

const GrammarTab = dynamic(() => import('@/lib/grammarBank').then((mod) => mod.GrammarTab), {
  loading: () => <PanelMessage title="文法内容加载中" description="正在按需加载语法模块。" />,
})

const PatternTab = dynamic(() => import('@/lib/sentencePatterns').then((mod) => mod.PatternTab), {
  loading: () => <PanelMessage title="句型内容加载中" description="正在按需加载句型模块。" />,
})

const QuizMode = dynamic(() => import('@/components/QuizMode').then((mod) => mod.QuizMode), {
  loading: () => <PanelMessage title="自测模块加载中" description="正在准备测试题。" />,
})

function paginate<T>(items: T[], page: number) {
  const start = (page - 1) * PAGE_SIZE
  return items.slice(start, start + PAGE_SIZE)
}

export default function LabPage() {
  const [tab, setTab] = useState<TabKey>('library')
  const [keyword, setKeyword] = useState('')
  const [libraryMode, setLibraryMode] = useState<LibraryMode>('core2000')
  const [levelFilter, setLevelFilter] = useState<'全部' | 'N4' | 'N3' | 'N2' | 'N1' | '考研'>('全部')
  const [page, setPage] = useState(1)
  const [vocabAllEntries, setVocabAllEntries] = useState<VocabEntry[]>([])
  const [vocabStats, setVocabStats] = useState<LabStats | null>(null)
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const deferredKeyword = useDeferredValue(keyword)
  const { speak } = useSpeech()
  const {
    favorites,
    reviewMap,
    dueTodayIds,
    toggleFavorite,
    toggleReviewQueue,
    reviewCard,
    resetAll,
  } = useStudyStore()

  const loadVocabulary = useCallback(async () => {
    setIsLoadingLibrary(true)
    setLoadError(null)

    try {
      const mod = await import('@/lib/vocabularyBank')

      setVocabAllEntries(mod.vocabAllEntries)
      setVocabStats({
        total: mod.vocabStats.total,
        core2000: mod.vocabStats.core2000,
        n4: mod.vocabStats.n4,
        n3: mod.vocabStats.n3,
        n2: mod.vocabStats.n2,
        n1: mod.vocabStats.n1,
        kaoyan3500: mod.vocabStats.kaoyan3500,
      })
    } catch (error) {
      console.error('Failed to load vocabulary bank:', error)
      setLoadError('词库加载失败，请重试。')
    } finally {
      setIsLoadingLibrary(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let idleId: number | null = null

    const loadWhenIdle = async () => {
      if (cancelled) return
      await loadVocabulary()
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void) => number
      cancelIdleCallback?: (handle: number) => void
    }

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(() => {
        void loadWhenIdle()
      })
    } else {
      timeoutId = setTimeout(() => {
        void loadWhenIdle()
      }, 0)
    }

    return () => {
      cancelled = true
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId)
      }
    }
  }, [loadVocabulary])

  const favoriteSet = useMemo(() => new Set(favorites), [favorites])
  const dueSet = useMemo(() => new Set(dueTodayIds), [dueTodayIds])
  const reviewSet = useMemo(() => new Set(Object.keys(reviewMap)), [reviewMap])
  const normalizedKeyword = deferredKeyword.trim().toLowerCase()

  const filteredLibrary = useMemo(() => {
    return vocabAllEntries.filter((item) => {
      const matchesKeyword =
        normalizedKeyword === '' ||
        [item.word, item.kana, item.meaningZh, item.meaningEn, item.detailZh]
          .join(' ')
          .toLowerCase()
          .includes(normalizedKeyword)

      const matchesMode =
        libraryMode === 'core2000'
          ? item.track === 'core2000'
          : libraryMode === 'n2'
            ? item.level === 'N2'
            : libraryMode === 'n1'
              ? item.level === 'N1'
              : libraryMode === 'n3'
                ? item.level === 'N3'
                : libraryMode === 'n4'
                  ? item.level === 'N4'
                  : libraryMode === 'kaoyan3500'
                    ? item.track === 'kaoyan3500'
                    : libraryMode === 'jlpt10k'
                      ? item.track === 'jlpt10k'
                      : true

      const matchesLevel = levelFilter === '全部' ? true : item.level === levelFilter

      return matchesKeyword && matchesMode && matchesLevel
    })
  }, [vocabAllEntries, normalizedKeyword, libraryMode, levelFilter])

  const favoriteItems = useMemo(() => {
    return vocabAllEntries.filter((item) => favoriteSet.has(item.id))
  }, [vocabAllEntries, favoriteSet])

  const reviewItems = useMemo(() => {
    return vocabAllEntries.filter((item) => dueSet.has(item.id))
  }, [vocabAllEntries, dueSet])

  const totalPages = Math.max(1, Math.ceil(filteredLibrary.length / PAGE_SIZE))
  const pagedLibrary = useMemo(() => paginate(filteredLibrary, page), [filteredLibrary, page])
  const currentItems: VocabEntry[] =
    tab === 'library' ? pagedLibrary : tab === 'favorites' ? favoriteItems : reviewItems

  const stats = vocabStats ?? EMPTY_STATS
  const needsVocabulary = tab === 'library' || tab === 'favorites' || tab === 'review' || tab === 'quiz'

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-lg md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
                Japanese Lab · 中文强化版
              </span>
              <h1 className="mt-4 text-3xl font-bold md:text-4xl">日语学习实验室</h1>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-200 md:text-base">
                词库、复习、自测和语法内容改成按需加载。现在不会因为大词库把整个站的首屏拖慢，但进入实验室后依然能逐步拿到完整内容。
              </p>
            </div>
            <button
              type="button"
              onClick={() => void loadVocabulary()}
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15 lg:w-auto"
            >
              {isLoadingLibrary ? '词库加载中...' : '重新加载词库'}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            <StatCard label="总词条" value={vocabStats ? stats.total : '...'} />
            <StatCard label="Core 2000" value={vocabStats ? stats.core2000 : '...'} />
            <StatCard label="N4" value={vocabStats ? stats.n4 : '...'} />
            <StatCard label="N3" value={vocabStats ? stats.n3 : '...'} />
            <StatCard label="N2" value={vocabStats ? stats.n2 : '...'} />
            <StatCard label="N1" value={vocabStats ? stats.n1 : '...'} />
            <StatCard label="考研3500" value={vocabStats ? stats.kaoyan3500 : '...'} />
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { key: 'library', label: '浏览词库' },
            { key: 'favorites', label: '收藏本' },
            { key: 'review', label: '今日复习' },
            { key: 'quiz', label: '自测', badge: 'Lazy' },
            { key: 'grammar', label: '文法', badge: '14类' },
            { key: 'pattern', label: '句型', badge: '332' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key as TabKey)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === item.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.label}
              {item.badge && (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${
                    tab === item.key ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab !== 'grammar' && tab !== 'pattern' && tab !== 'quiz' ? (
          <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1.5fr,1fr,1fr,auto]">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">搜索</span>
                <input
                  value={keyword}
                  onChange={(event) => {
                    setKeyword(event.target.value)
                    setPage(1)
                  }}
                  disabled={isLoadingLibrary || Boolean(loadError)}
                  placeholder="输入单词、假名、中文释义、英文释义……"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">词库范围</span>
                <select
                  value={libraryMode}
                  onChange={(event) => {
                    setLibraryMode(event.target.value as LibraryMode)
                    setPage(1)
                  }}
                  disabled={isLoadingLibrary || Boolean(loadError)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:bg-slate-50"
                >
                  <option value="core2000">Core 2000</option>
                  <option value="n4">N4</option>
                  <option value="n3">N3</option>
                  <option value="n2">N2</option>
                  <option value="n1">N1</option>
                  <option value="kaoyan3500">考研3500词</option>
                  <option value="jlpt10k">JLPT 10k 全量</option>
                  <option value="all">全部</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">等级筛选</span>
                <select
                  value={levelFilter}
                  onChange={(event) => {
                    setLevelFilter(event.target.value as '全部' | 'N4' | 'N3' | 'N2' | 'N1' | '考研')
                    setPage(1)
                  }}
                  disabled={isLoadingLibrary || Boolean(loadError)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:bg-slate-50"
                >
                  <option value="全部">全部</option>
                  <option value="N4">N4</option>
                  <option value="N3">N3</option>
                  <option value="N2">N2</option>
                  <option value="N1">N1</option>
                  <option value="考研">考研</option>
                </select>
              </label>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={resetAll}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  重置收藏与复习
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {isLoadingLibrary && '词库正在后台加载。'}
              {!isLoadingLibrary && !loadError && tab === 'library' && `当前命中 ${filteredLibrary.length} 条；第 ${page} / ${totalPages} 页。`}
              {!isLoadingLibrary && !loadError && tab === 'favorites' && `收藏中 ${favoriteItems.length} 条。`}
              {!isLoadingLibrary && !loadError && tab === 'review' && `今日待复习 ${reviewItems.length} 条。`}
              {loadError && loadError}
            </p>
          </section>
        ) : tab === 'grammar' ? (
          <p className="mt-4 text-sm text-slate-500">考研日语核心语法 14 大类，已改成进入该标签后再加载。</p>
        ) : tab === 'quiz' ? (
          <p className="mt-4 text-sm text-slate-500">
            看日语想中文，检验真实掌握程度。
            {reviewItems.length > 0
              ? `（今日复习 ${reviewItems.length} 条）`
              : favoriteItems.length > 0
                ? `（收藏本 ${favoriteItems.length} 条）`
                : '（请先收藏或加入复习）'}
          </p>
        ) : (
          <p className="mt-4 text-sm text-slate-500">332 个高频惯用表达，已改成进入该标签后再加载。</p>
        )}

        {needsVocabulary && isLoadingLibrary ? (
          <LibraryLoadingState />
        ) : loadError && needsVocabulary ? (
          <PanelMessage title="词库没有成功加载" description={loadError} actionLabel="重新加载" onAction={() => void loadVocabulary()} />
        ) : tab === 'grammar' ? (
          <GrammarTab />
        ) : tab === 'pattern' ? (
          <PatternTab />
        ) : tab === 'quiz' ? (
          <QuizMode reviewItems={reviewItems} favoriteItems={favoriteItems} onRate={reviewCard} onSpeak={speak} />
        ) : tab === 'review' ? (
          <section className="mt-8 grid gap-5">
            {reviewItems.length === 0 ? (
              <PanelMessage title="今天没有到期复习词" description="先在词卡上点「加入复习」，系统会自动把到期词放到这里。" />
            ) : (
              reviewItems.map((item) => (
                <ReviewCard key={item.id} item={item} onSpeak={speak} onReview={reviewCard} />
              ))
            )}
          </section>
        ) : (
          <section className="mt-8 grid gap-5 xl:grid-cols-2">
            {currentItems.length === 0 ? (
              <PanelMessage title="没有匹配的词条" description="换一个关键词、范围或等级再试试看。" />
            ) : (
              currentItems.map((item) => (
                <WordCard
                  key={item.id}
                  item={item}
                  isFavorite={favoriteSet.has(item.id)}
                  inReview={reviewSet.has(item.id)}
                  dueToday={dueSet.has(item.id)}
                  onSpeak={speak}
                  onToggleFavorite={toggleFavorite}
                  onToggleReview={toggleReviewQueue}
                />
              ))
            )}
          </section>
        )}

        {tab === 'library' && !isLoadingLibrary && !loadError && totalPages > 1 && (
          <section className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page <= 1}
              className="rounded-2xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              上一页
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage(1)}
                className={`min-w-[32px] rounded-lg px-2 py-1 text-sm ${
                  page === 1 ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                1
              </button>
              {totalPages > 7 && page > 3 && <span className="px-1 text-slate-400">...</span>}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((value) => {
                  if (totalPages <= 7) return true
                  return Math.abs(value - page) <= 2
                })
                .filter((value) => value !== 1 && value !== totalPages)
                .map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPage(value)}
                    className={`min-w-[32px] rounded-lg px-2 py-1 text-sm ${
                      page === value ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              {totalPages > 7 && page < totalPages - 2 && <span className="px-1 text-slate-400">...</span>}
              {totalPages > 1 && (
                <button
                  type="button"
                  onClick={() => setPage(totalPages)}
                  className={`min-w-[32px] rounded-lg px-2 py-1 text-sm ${
                    page === totalPages ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {totalPages}
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages}
              className="rounded-2xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              下一页
            </button>
            {totalPages > 10 && (
              <div className="ml-2 flex items-center gap-1">
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  placeholder="页码"
                  className="w-16 rounded-lg border border-slate-300 px-2 py-1.5 text-center text-sm outline-none focus:border-slate-500"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      const value = parseInt((event.target as HTMLInputElement).value, 10)
                      if (value >= 1 && value <= totalPages) setPage(value)
                      ;(event.target as HTMLInputElement).value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(event) => {
                    const input = event.currentTarget.previousElementSibling as HTMLInputElement | null
                    const value = parseInt(input?.value ?? '', 10)
                    if (value >= 1 && value <= totalPages) setPage(value)
                    if (input) input.value = ''
                  }}
                  className="rounded-lg bg-slate-200 px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-300"
                >
                  跳转
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-sm text-slate-200">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  )
}

function LibraryLoadingState() {
  return (
    <section className="mt-8 grid gap-5 xl:grid-cols-2">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-6 w-40 rounded-full bg-slate-200" />
          <div className="mt-4 h-4 w-28 rounded-full bg-slate-200" />
          <div className="mt-6 h-4 w-full rounded-full bg-slate-100" />
          <div className="mt-3 h-4 w-5/6 rounded-full bg-slate-100" />
          <div className="mt-5 h-24 rounded-2xl bg-slate-100" />
        </div>
      ))}
    </section>
  )
}

function PanelMessage({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
