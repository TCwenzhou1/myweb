// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import { ReviewRating } from '@/lib/srs';
import { VocabularyEntry } from '@/lib/vocabularyBank';

interface ReviewSessionProps {
  items: VocabularyEntry[];
  onRate: (id: string, rating: ReviewRating) => void;
  onToggleFavorite: (id: string) => void;
  favoriteSet: Set<string>;
  onSpeak: (text: string) => void;
}

export function ReviewSession({
  items,
  onRate,
  onToggleFavorite,
  favoriteSet,
  onSpeak
}: ReviewSessionProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const current = items[index] ?? null;
  const total = items.length;

  const progressText = useMemo(() => {
    if (total === 0) return '0 / 0';
    return `${Math.min(index + 1, total)} / ${total}`;
  }, [index, total]);

  const handleRate = (rating: ReviewRating) => {
    if (!current) return;
    onRate(current.id, rating);
    setRevealed(false);
    setIndex((prev) => prev + 1);
  };

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
        当前没有到期复习卡片。先去浏览区收藏一些词，或者直接给重点词做第一次复习。
      </div>
    );
  }

  if (!current) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">本轮复习完成</h3>
        <p className="mt-2 text-sm text-slate-500">已把当前到期卡片过完一轮，刷新页面后会按新的到期时间继续安排。</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          复习进度 {progressText}
        </span>
        <button
          type="button"
          onClick={() => onToggleFavorite(current.id)}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            favoriteSet.has(current.id)
              ? 'bg-amber-100 text-amber-800'
              : 'border border-slate-300 text-slate-700'
          }`}
        >
          {favoriteSet.has(current.id) ? '已收藏' : '收藏'}
        </button>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-4xl font-bold tracking-wide text-slate-900">{current.word}</p>
        <p className="mt-3 text-lg text-slate-600">{current.kana}</p>
        <div className="mt-4 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => onSpeak(current.kana || current.word)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white"
          >
            播放发音
          </button>
          <button
            type="button"
            onClick={() => setRevealed((prev) => !prev)}
            className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white"
          >
            {revealed ? '隐藏答案' : '显示答案'}
          </button>
        </div>

        {revealed && (
          <div className="mt-6 rounded-2xl bg-white p-5 text-left">
            <p className="text-base font-semibold text-slate-900">{current.meaning}</p>
            {current.meaningZh && current.meaningEn && (
              <p className="mt-2 text-sm text-slate-500">EN: {current.meaningEn}</p>
            )}
            {current.collocation && (
              <p className="mt-3 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">搭配：</span>
                {current.collocation}
              </p>
            )}
            {current.note && (
              <p className="mt-3 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">提醒：</span>
                {current.note}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => handleRate('again')}
          className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
        >
          Again
        </button>
        <button
          type="button"
          onClick={() => handleRate('hard')}
          className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700"
        >
          Hard
        </button>
        <button
          type="button"
          onClick={() => handleRate('good')}
          className="rounded-2xl border border-blue-300 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"
        >
          Good
        </button>
        <button
          type="button"
          onClick={() => handleRate('easy')}
          className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
        >
          Easy
        </button>
      </div>
    </div>
  );
}
