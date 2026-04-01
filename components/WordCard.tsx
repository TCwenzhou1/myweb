'use client';

import type { VocabEntry } from '@/lib/vocabularyBank';

interface WordCardProps {
  item: VocabEntry;
  isFavorite: boolean;
  inReview: boolean;
  dueToday: boolean;
  onSpeak: (text: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleReview: (id: string) => void;
}

export function WordCard({
  item,
  isFavorite,
  inReview,
  dueToday,
  onSpeak,
  onToggleFavorite,
  onToggleReview
}: WordCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-900">{item.word}</h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {item.level}
            </span>
            {item.track === 'core2000' && (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                Core 2000
              </span>
            )}
            {dueToday && (
              <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                待复习
              </span>
            )}
          </div>

          <p className="mt-3 text-sm text-slate-500">假名：{item.kana}</p>
          <p className="mt-3 text-lg font-semibold text-slate-900">{item.meaningZh}</p>
          <p className="mt-2 text-sm text-slate-500">英义参考：{item.meaningEn}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onSpeak(item.word)}
            className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            发音
          </button>
          <button
            type="button"
            onClick={() => onToggleFavorite(item.id)}
            className={`rounded-full px-3 py-1.5 text-sm ${
              isFavorite
                ? 'bg-slate-900 text-white'
                : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isFavorite ? '已收藏' : '收藏'}
          </button>
          <button
            type="button"
            onClick={() => onToggleReview(item.id)}
            className={`rounded-full px-3 py-1.5 text-sm ${
              inReview
                ? 'bg-rose-100 text-rose-700'
                : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {inReview ? '移出复习' : '加入复习'}
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">中文详解</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{item.detailZh}</p>
      </div>
    </article>
  );
}
