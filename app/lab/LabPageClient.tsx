'use client'

import dynamic from 'next/dynamic'
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { ReviewCard } from '@/components/ReviewCard'
import { WordCard } from '@/components/WordCard'
import type { VocabEntry } from '@/lib/vocabularyBank'
import { useSpeech } from '@/lib/useSpeech'
import { useStudyStore } from '@/lib/useStudyStore'

type TabKey = 'library' | 'favorites' | 'review' | 'grammar' | 'pattern' | 'quiz'
type SourceMode = 'all' | 'core2000' | 'jlpt10k' | 'jmdict' | 'kaoyan3500' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1'
type LevelFilter = 'ALL' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | '考研'

interface LabStats {
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

const PAGE_SIZE = 14
const EMPTY_STATS: LabStats = {
  total: 0,
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
  { value: 'core2000', label: 'Core 2000' },
  { value: 'jlpt10k', label: 'JLPT 10K' },
  { value: 'jmdict', label: 'JMDict 补充' },
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
]

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

function getPrimaryMeaning(item: VocabEntry) {
  return item.meaningZh.trim() || item.meaningEn.trim() || item.detailZh.trim() || '暂未整理释义'
}

function getTrackLabel(track: VocabEntry['track']) {
  if (track === 'core2000') return 'Core 2000'
  if (track === 'jlpt10k') return 'JLPT 10K'
  if (track === 'jmdict') return 'JMDict'
  if (track === 'kaoyan3500' || track === 'kaoyan') return '考研'
  return '全词库'
}

function matchesKeyword(item: VocabEntry, keyword: string) {
  if (!keyword) return true
  return [item.word, item.kana, item.meaningZh, item.meaningEn, item.detailZh].join(' ').toLowerCase().includes(keyword)
}

function matchesSourceMode(item: VocabEntry, mode: SourceMode) {
  if (mode === 'all') return true
  if (mode === 'core2000') return item.track === 'core2000'
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
  return level === 'ALL' ? true : item.level === level
}

function getSourceCount(stats: LabStats, mode: SourceMode) {
  if (mode === 'all') return stats.total
  if (mode === 'core2000') return stats.core2000
  if (mode === 'jlpt10k') return stats.jlpt10k
  if (mode === 'jmdict') return stats.jmdict
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
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null)
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)
  const [vocabAllEntries, setVocabAllEntries] = useState<VocabEntry[]>([])
  const [vocabStats, setVocabStats] = useState<LabStats | null>(null)
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const deferredKeyword = useDeferredValue(keyword)
  const { speak } = useSpeech()
  const { favorites, reviewMap, dueTodayIds, toggleFavorite, toggleReviewQueue, reviewCard, resetAll } = useStudyStore()

  const loadVocabulary = useCallback(async () => {
    setIsLoadingLibrary(true)
    setLoadError(null)

    try {
      const mod = await import('@/lib/vocabularyBank')
      setVocabAllEntries(mod.vocabAllEntries)
      setVocabStats(mod.vocabStats as LabStats)
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
  const stats = vocabStats ?? EMPTY_STATS
  const sourceLabel = SOURCE_OPTIONS.find((option) => option.value === sourceMode)?.label ?? '全词汇'
  const levelLabel = LEVEL_OPTIONS.find((option) => option.value === levelFilter)?.label ?? '全部等级'
  const needsVocabulary = tab === 'library' || tab === 'favorites' || tab === 'review' || tab === 'quiz'

  const filteredLibrary = useMemo(() => {
    return vocabAllEntries.filter((item) => {
      return matchesKeyword(item, normalizedKeyword) && matchesSourceMode(item, sourceMode) && matchesLevel(item, levelFilter)
    })
  }, [vocabAllEntries, normalizedKeyword, sourceMode, levelFilter])

  const favoriteItemsAll = useMemo(() => {
    return vocabAllEntries.filter((item) => favoriteSet.has(item.id))
  }, [vocabAllEntries, favoriteSet])

  const filteredFavorites = useMemo(() => {
    return favoriteItemsAll.filter((item) => {
      return matchesKeyword(item, normalizedKeyword) && matchesSourceMode(item, sourceMode) && matchesLevel(item, levelFilter)
    })
  }, [favoriteItemsAll, normalizedKeyword, sourceMode, levelFilter])

  const reviewQueueItemsAll = useMemo(() => {
    return vocabAllEntries
      .filter((item) => reviewSet.has(item.id))
      .sort((left, right) => {
        const leftDue = new Date(reviewMap[left.id]?.dueAt ?? 0).getTime()
        const rightDue = new Date(reviewMap[right.id]?.dueAt ?? 0).getTime()
        return leftDue - rightDue
      })
  }, [vocabAllEntries, reviewSet, reviewMap])

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

  return (
    <main className="min-h-screen bg-[#f7f2e9] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6" style={{ fontFamily: 'var(--font-jost)' }}>
        <section className="relative overflow-hidden rounded-[36px] border border-[#eadfcb] bg-[linear-gradient(135deg,#fffaf2_0%,#fff0db_45%,#f8ddb1_100%)] p-6 shadow-[0_28px_80px_rgba(128,92,40,0.14)] md:p-8">
          <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-white/70 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-[#ffd89e]/40 blur-3xl" />

          <div className="relative grid gap-6 xl:grid-cols-[1.35fr,0.95fr] xl:items-end">
            <div>
              <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a77a37]">
                Japanese Lab · Dictionary Workflow
              </span>
              <h1 className="mt-5 text-4xl font-semibold text-[#1f1710] md:text-5xl" style={{ fontFamily: 'var(--font-cormorant)' }}>
                日语学习实验室
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5f4b36] md:text-base">
                这版把词汇入口扩成了全词汇词典，也把学习界面改成更像词典 App 的工作台：先搜索，再选词，再决定收藏、复习还是自测。
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
                      disabled={isLoadingLibrary || Boolean(loadError)}
                      placeholder="输入日语、假名、中文释义或 English gloss"
                      className="w-full rounded-[22px] border border-[#e4d2b8] bg-[#fffdf9] px-4 py-3 text-sm text-[#2f2419] outline-none transition placeholder:text-[#a38e73] focus:border-[#caa46e] disabled:cursor-not-allowed disabled:bg-[#f5f1ea]"
                    />
                    <button
                      type="button"
                      onClick={() => void loadVocabulary()}
                      className="shrink-0 rounded-[22px] bg-[#201911] px-5 py-3 text-sm font-medium text-[#fff1da] transition hover:bg-[#342519]"
                    >
                      {isLoadingLibrary ? '加载中...' : '刷新词库'}
                    </button>
                  </div>
                </label>
                <p className="mt-3 text-sm leading-6 text-[#79624b]">
                  当前使用「{sourceLabel} · {levelLabel}」视角。
                  {isLoadingLibrary ? ' 词库正在后台准备中。' : ` 已接入 ${stats.total.toLocaleString()} 条可检索词条。`}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <HeroMetric label="全词条" value={vocabStats ? stats.total.toLocaleString() : '...'} description="聚合 Core、JLPT、考研与补充词库" />
              <HeroMetric label="今日复习" value={dueItemsAll.length.toString()} description="今天到期、应该优先处理的卡片" />
              <HeroMetric label="收藏本" value={favoriteItemsAll.length.toString()} description="你主动留下来的生词与重点词" />
              <HeroMetric label="当前范围" value={vocabStats ? getSourceCount(stats, sourceMode).toLocaleString() : '...'} description={`${sourceLabel} 下的总量`} />
            </div>
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
                      count={vocabStats ? getSourceCount(stats, option.value).toLocaleString() : '...'}
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
                <MiniMetric label="当前命中" value={isLoadingLibrary ? '...' : activeCollectionCount.toLocaleString()} description={tab === 'review' ? '本轮待处理的到期复习词' : '当前筛选条件下的可见词条'} />
                <MiniMetric label="复习队列" value={reviewQueueItemsAll.length.toString()} description="已加入间隔复习系统的全部词" />
                <MiniMetric label="收藏词汇" value={favoriteItemsAll.length.toString()} description="你主动标记过的词" />
                <MiniMetric label="范围总量" value={vocabStats ? getSourceCount(stats, sourceMode).toLocaleString() : '...'} description={`${sourceLabel} 视角下的馆藏规模`} />
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

        {needsVocabulary && isLoadingLibrary ? (
          <LibraryLoadingState />
        ) : loadError && needsVocabulary ? (
          <PanelMessage title="词库没有成功加载" description={loadError} actionLabel="重新加载" onAction={() => void loadVocabulary()} />
        ) : tab === 'library' || tab === 'favorites' ? (
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
            onSpeak={speak}
            onToggleFavorite={toggleFavorite}
            onToggleReview={toggleReviewQueue}
            emptyTitle={tab === 'library' ? '没有匹配的词条' : '收藏本里没有命中内容'}
            emptyDescription={tab === 'library' ? '换一个关键词、词库范围或等级试试看。' : '可以先在词典里点“收藏”，或者调整当前筛选条件。'}
          />
        ) : tab === 'review' ? (
          <ReviewWorkbench
            items={filteredReviewItems}
            queueCount={reviewQueueItemsAll.length}
            selectedId={selectedReviewId}
            selectedItem={selectedReview}
            onSelect={setSelectedReviewId}
            onSpeak={speak}
            onReview={reviewCard}
          />
        ) : tab === 'quiz' ? (
          <QuizMode reviewItems={dueItemsAll} favoriteItems={favoriteItemsAll} onRate={reviewCard} onSpeak={speak} />
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
            <span className="rounded-full bg-[#f4efe6] px-2.5 py-1 text-[11px] font-semibold text-[#6e5a40]">{item.level}</span>
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
            <span className="rounded-full bg-[#f4efe6] px-2.5 py-1 text-[11px] font-semibold text-[#6e5a40]">{item.level}</span>
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
