// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import { ReviewSession } from '@/components/ReviewSession';
import { VocabularyCard } from '@/components/VocabularyCard';
import { useJapaneseLabState } from '@/lib/useJapaneseLabState';
import { useSpeechSynthesis } from '@/lib/useSpeechSynthesis';
import { coreVocabulary, deckStats, fullVocabulary, VocabularyEntry } from '@/lib/vocabularyBank';

type SurfaceTab = 'browse' | 'favorites' | 'review';
type DeckMode = 'core' | 'full';

const PAGE_SIZE = 24;

export default function LabPage() {
  const [surfaceTab, setSurfaceTab] = useState<SurfaceTab>('browse');
  const [deckMode, setDeckMode] = useState<DeckMode>('core');
  const [keyword, setKeyword] = useState('');
  const [levelFilter, setLevelFilter] = useState<'全部' | 'N2' | 'N1' | '考研'>('全部');
  const [page, setPage] = useState(1);

  const {
    favoriteSet,
    toggleFavorite,
    getCardState,
    reviewCard,
    seedReviewCard,
    isCardDue,
    resetAll
  } = useJapaneseLabState();

  const { speak, hasJapaneseVoice } = useSpeechSynthesis();

  const activeDeck = deckMode === 'core' ? coreVocabulary : fullVocabulary;

  const filtered = useMemo(() => {
    const lower = keyword.trim().toLowerCase();
    return activeDeck.filter((item) => {
      const matchesKeyword =
        !lower ||
        [
          item.word,
          item.kana,
          item.meaning,
          item.meaningEn ?? '',
          item.meaningZh ?? '',
          item.note ?? '',
          item.collocation ?? ''
        ]
          .join(' ')
          .toLowerCase()
          .includes(lower);

      const matchesLevel =
        levelFilter === '全部' ? true : item.levelTags.includes(levelFilter);

      return matchesKeyword && matchesLevel;
    });
  }, [activeDeck, keyword, levelFilter]);

  const favoriteItems = useMemo(
    () => filtered.filter((item) => favoriteSet.has(item.id)),
    [filtered, favoriteSet]
  );

  const dueReviewItems = useMemo(() => {
    const source = deckMode === 'core' ? coreVocabulary : fullVocabulary;
    return source.filter((item) => isCardDue(item.id)).slice(0, 80);
  }, [deckMode, isCardDue]);

  const browseItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const visibleItems = surfaceTab === 'favorites' ? favoriteItems : browseItems;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-lg md:p-8">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
            Japanese Lab · Verified Core Deck
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">日语学习实验室 · 核心 2000 + 全量扩展</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-200 md:text-base">
            这版把站内日语学习页升级成三层结构：
            <span className="font-semibold text-white">Core 2000 高频核心层</span>、
            <span className="font-semibold text-white">Full N2/N1 扩展层</span>、
            <span className="font-semibold text-white">考研精讲词层</span>。
            同时加入 TTS 发音、收藏本和间隔复习算法（SM-2 风格）。
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-200">Core 2000</p>
              <p className="mt-2 text-2xl font-bold">{deckStats.coreCount}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-200">Full Deck</p>
              <p className="mt-2 text-2xl font-bold">{deckStats.fullCount}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-200">考研精讲</p>
              <p className="mt-2 text-2xl font-bold">{deckStats.examFocusCount}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-200">收藏数</p>
              <p className="mt-2 text-2xl font-bold">{favoriteSet.size}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-200">待复习</p>
              <p className="mt-2 text-2xl font-bold">{dueReviewItems.length}</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-100">
            <p>
              数据策略：
              N2/N1 批量层使用经过社区长期使用的 JLPT 词表，并参考 JMdict 体系做拼写层面的校对；
              考研层额外做了手工精讲。为了避免未逐条校对的机翻误差，批量层默认保留英文 gloss，
              精讲词条再补中文释义和考试提醒。
            </p>
            <p className="mt-2">
              发音策略：
              站内直接走浏览器 Web Speech API 的日语 TTS；如果设备上没有日语语音包，
              也能保留按钮但朗读效果会受系统环境影响。
              {!hasJapaneseVoice && ' 当前环境未检测到明确的日语 voice，建议在真机浏览器测试。'}
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1.4fr,1fr,1fr,auto]">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">搜索</span>
              <input
                value={keyword}
                onChange={(event) => {
                  setKeyword(event.target.value);
                  setPage(1);
                }}
                placeholder="输入单词、假名、英文释义、中文释义、考点……"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">词库范围</span>
              <select
                value={deckMode}
                onChange={(event) => {
                  setDeckMode(event.target.value as DeckMode);
                  setPage(1);
                }}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none"
              >
                <option value="core">Core 2000</option>
                <option value="full">Full N2/N1</option>
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
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                重置收藏与复习
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              ['browse', '浏览词库'],
              ['favorites', '收藏本'],
              ['review', '今日复习']
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSurfaceTab(value as SurfaceTab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  surfaceTab === value
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {surfaceTab !== 'review' && (
            <p className="mt-4 text-sm text-slate-500">
              当前命中 {filtered.length} 条；收藏命中 {favoriteItems.length} 条。
              {surfaceTab === 'browse' && ` 第 ${page} / ${totalPages} 页。`}
            </p>
          )}
        </section>

        {surfaceTab === 'review' ? (
          <section className="mt-8">
            <ReviewSession
              items={dueReviewItems}
              onRate={reviewCard}
              onToggleFavorite={toggleFavorite}
              favoriteSet={favoriteSet}
              onSpeak={(text) => speak(text)}
            />
          </section>
        ) : (
          <section className="mt-8">
            <div className="grid gap-5 xl:grid-cols-2">
              {visibleItems.map((item) => (
                <VocabularyCard
                  key={item.id}
                  item={item}
                  isFavorite={favoriteSet.has(item.id)}
                  isDue={isCardDue(item.id)}
                  onToggleFavorite={(id) => {
                    toggleFavorite(id);
                    seedReviewCard(id);
                  }}
                  onSpeak={(text) => speak(text)}
                />
              ))}
            </div>

            {visibleItems.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                当前筛选条件下没有结果，换个关键词或切到 Full N2/N1 看看。
              </div>
            )}

            {surfaceTab === 'browse' && totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40"
                >
                  上一页
                </button>
                <span className="text-sm text-slate-500">{page} / {totalPages}</span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40"
                >
                  下一页
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
