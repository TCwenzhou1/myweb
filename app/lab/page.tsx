// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import { ReviewCard } from '@/components/ReviewCard';
import { WordCard } from '@/components/WordCard';
import { vocabEntries, vocabStats, type VocabEntry } from '@/lib/vocabularyBank';
import { useSpeech } from '@/lib/useSpeech';
import { useStudyStore } from '@/lib/useStudyStore';
import { GrammarTab } from '@/lib/grammarBank';
import { PatternTab } from '@/lib/sentencePatterns';

type TabKey = 'library' | 'favorites' | 'review' | 'grammar' | 'pattern';
type LibraryMode = 'core2000' | 'n2' | 'n1' | 'all';
const PAGE_SIZE = 24;

function paginate<T>(items: T[], page: number) {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
}

export default function LabPage() {
  const [tab, setTab] = useState<TabKey>('library');
  const [keyword, setKeyword] = useState('');
  const [libraryMode, setLibraryMode] = useState<LibraryMode>('core2000');
  const [levelFilter, setLevelFilter] = useState<'全部' | 'N2' | 'N1' | '考研'>('全部');
  const [page, setPage] = useState(1);

  const { speak } = useSpeech();
  const {
    favorites,
    reviewMap,
    dueTodayIds,
    toggleFavorite,
    toggleReviewQueue,
    reviewCard,
    resetAll
  } = useStudyStore();

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);
  const dueSet = useMemo(() => new Set(dueTodayIds), [dueTodayIds]);
  const reviewSet = useMemo(() => new Set(Object.keys(reviewMap)), [reviewMap]);

  const filteredLibrary = useMemo(() => {
    const next = vocabEntries.filter((item) => {
      const matchesKeyword =
        keyword.trim() === '' ||
        [item.word, item.kana, item.meaningZh, item.meaningEn, item.detailZh]
          .join(' ')
          .toLowerCase()
          .includes(keyword.toLowerCase());

      const matchesMode =
        libraryMode === 'core2000'
          ? item.track === 'core2000'
          : libraryMode === 'n2'
            ? item.level === 'N2'
            : libraryMode === 'n1'
              ? item.level === 'N1'
              : true;

      const matchesLevel = levelFilter === '全部' ? true : item.level === levelFilter;

      return matchesKeyword && matchesMode && matchesLevel;
    });

    return next;
  }, [keyword, libraryMode, levelFilter]);

  const favoriteItems = useMemo(() => {
    return vocabEntries.filter((item) => favoriteSet.has(item.id));
  }, [favoriteSet]);

  const reviewItems = useMemo(() => {
    const dueOnly = vocabEntries.filter((item) => dueSet.has(item.id));
    return dueOnly;
  }, [dueSet]);

  const totalPages = Math.max(1, Math.ceil(filteredLibrary.length / PAGE_SIZE));
  const pagedLibrary = useMemo(() => paginate(filteredLibrary, page), [filteredLibrary, page]);

  const currentItems: VocabEntry[] =
    tab === 'library' ? pagedLibrary : tab === 'favorites' ? favoriteItems : reviewItems;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-lg md:p-8">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
            Japanese Lab · 中文强化版
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">日语学习实验室</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-200 md:text-base">
            这版专门修正「没有中文释义」和「考研核心词太少」的问题。现在默认给你中文释义，
            并把词库升级为：Core 2000 高频层 + N2 全量中文层 + N1 全量中文层，同时保留
            TTS 发音、收藏本和间隔复习。
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-200">总词条</p>
              <p className="mt-2 text-2xl font-bold">{vocabStats.total}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-200">Core 2000</p>
              <p className="mt-2 text-2xl font-bold">{vocabStats.core2000}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-200">收藏数</p>
              <p className="mt-2 text-2xl font-bold">{favorites.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-200">今日复习</p>
              <p className="mt-2 text-2xl font-bold">{dueTodayIds.length}</p>
            </div>
          </div>
        </section>

        {tab === 'grammar' || tab === 'pattern' ? null : (
          <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1.5fr,1fr,1fr,auto]">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">搜索</span>
                <input
                  value={keyword}
                  onChange={(event) => {
                    setKeyword(event.target.value);
                    setPage(1);
                  }}
                  placeholder="输入单词、假名、中文释义、英文释义……"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">词库范围</span>
                <select
                  value={libraryMode}
                  onChange={(event) => {
                    setLibraryMode(event.target.value as LibraryMode);
                    setPage(1);
                  }}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
                >
                  <option value="core2000">Core 2000</option>
                  <option value="n2">N2 全量中文</option>
                  <option value="n1">N1 全量中文</option>
                  <option value="all">全部</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">等级筛选</span>
                <select
                  value={levelFilter}
                  onChange={(event) => {
                    setLevelFilter(event.target.value as '全部' | 'N2' | 'N1' | '考研');
                    setPage(1);
                  }}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
                >
                  <option value="全部">全部</option>
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

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { key: 'library', label: '浏览词库' },
                { key: 'favorites', label: '收藏本' },
                { key: 'review', label: '今日复习' },
                { key: 'grammar', label: '文法', badge: '14类' },
                { key: 'pattern', label: '句型', badge: '332' }
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setTab(item.key as TabKey)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    tab === item.key
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${
                      tab === item.key ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {tab === 'library' && `当前命中 ${filteredLibrary.length} 条；第 ${page} / ${totalPages} 页。`}
              {tab === 'favorites' && `收藏中 ${favoriteItems.length} 条。`}
              {tab === 'review' && `今日待复习 ${reviewItems.length} 条。`}
            </p>
          </section>
        )}

        {tab === 'grammar' ? (
          <GrammarTab />
        ) : tab === 'pattern' ? (
          <PatternTab />
        ) : tab === 'review' ? (
          <section className="mt-8 grid gap-5">
            {reviewItems.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                今天没有到期的复习词。先在词卡上点「加入复习」。
              </div>
            ) : (
              reviewItems.map((item) => (
                <ReviewCard key={item.id} item={item} onSpeak={speak} onReview={reviewCard} />
              ))
            )}
          </section>
        ) : (
          <section className="mt-8 grid gap-5 xl:grid-cols-2">
            {currentItems.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                没有匹配的词条。
              </div>
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

        {tab === 'library' && totalPages > 1 && (
          <section className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="rounded-2xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-white"
            >
              上一页
            </button>
            <span className="px-3 text-sm text-slate-500">{page} / {totalPages}</span>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="rounded-2xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-white"
            >
              下一页
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
