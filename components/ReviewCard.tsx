'use client';

import type { VocabEntry } from '@/lib/vocabularyBank';
import type { ReviewRating } from '@/lib/useStudyStore';

interface ReviewCardProps {
  item: VocabEntry;
  onSpeak: (text: string) => void;
  onReview: (id: string, rating: ReviewRating) => void;
}

const actions: Array<{ key: ReviewRating; label: string }> = [
  { key: 'again', label: '不会' },
  { key: 'hard', label: '困难' },
  { key: 'good', label: '一般' },
  { key: 'easy', label: '简单' }
];

export function ReviewCard({ item, onSpeak, onReview }: ReviewCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-bold text-slate-900">{item.word}</h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {item.level}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">假名：{item.kana}</p>
          <p className="mt-4 text-lg font-semibold text-slate-900">{item.meaningZh}</p>
        </div>

        <button
          type="button"
          onClick={() => onSpeak(item.word)}
          className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          播放发音
        </button>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-sm text-slate-700">{item.detailZh}</p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            onClick={() => onReview(item.id, action.key)}
            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {action.label}
          </button>
        ))}
      </div>
    </article>
  );
}
