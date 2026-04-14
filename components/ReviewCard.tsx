'use client';

import { useEffect, useState } from 'react';
import type { VocabEntry } from '@/lib/labTypes';
import type { ReviewRating } from '@/lib/useStudyStore';

interface ReviewCardProps {
  item: VocabEntry;
  onSpeak: (text: string) => void;
  onReview: (id: string, rating: ReviewRating) => void;
}

const actions: Array<{ key: ReviewRating; label: string }> = [
  { key: 'again', label: '再来一次' },
  { key: 'hard', label: '有点困难' },
  { key: 'good', label: '基本记住' },
  { key: 'easy', label: '已经很稳' }
];

export function ReviewCard({ item, onSpeak, onReview }: ReviewCardProps) {
  const [revealed, setRevealed] = useState(false);
  const primaryMeaning = item.meaningZh.trim() || item.meaningEn.trim() || item.detailZh.trim() || '暂未整理释义';
  const englishMeaning = item.meaningEn.trim();

  useEffect(() => {
    setRevealed(false);
  }, [item.id]);

  return (
    <article className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white shadow-[0_18px_50px_rgba(125,93,48,0.08)]">
      <div className="border-b border-[#f1e6d5] bg-[linear-gradient(135deg,#fffaf2_0%,#fff1de_100%)] p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#201911] px-3 py-1 text-xs font-semibold text-[#fff1da]">
              今日复习
            </span>
            <span className="rounded-full bg-[#f4efe6] px-3 py-1 text-xs font-semibold text-[#6e5a40]">
              {item.level}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSpeak(item.kana || item.word)}
            className="rounded-full border border-[#dfcfb7] bg-white px-4 py-2 text-sm font-medium text-[#5b4630] transition hover:border-[#c9af84] hover:bg-[#fff7eb]"
          >
            发音
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="rounded-[30px] bg-[linear-gradient(180deg,#fffaf2_0%,#fff5e6_100%)] p-6 text-center md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#af8a50]">
            Review Card
          </p>
          <h2
            className="mt-4 text-5xl font-semibold text-[#201911] md:text-6xl"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {item.word}
          </h2>
          <p className="mt-3 text-lg text-[#7a6145]">{item.kana || item.word}</p>

          <div className="mt-6">
            {revealed ? (
              <div className="rounded-[24px] bg-white px-5 py-6 text-left shadow-[inset_0_0_0_1px_rgba(226,208,180,0.65)]">
                <p className="text-lg font-semibold leading-8 text-[#2e241a]">{primaryMeaning}</p>
                {item.meaningZh.trim() && englishMeaning && (
                  <p className="mt-2 text-sm leading-6 text-[#7a6a58]">EN: {englishMeaning}</p>
                )}
                <p className="mt-4 text-sm leading-7 text-[#544230]">{item.detailZh}</p>
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-[#dcc9ad] bg-white/70 px-5 py-6 text-sm leading-7 text-[#7a6145]">
                先在脑中回忆释义，再点“显示答案”。这样会比直接看解释更接近真实记忆过程。
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setRevealed((prev) => !prev)}
            className="mt-5 rounded-full bg-[#201911] px-5 py-2.5 text-sm font-medium text-[#fff1da] transition hover:bg-[#382b1b]"
          >
            {revealed ? '隐藏答案' : '显示答案'}
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              disabled={!revealed}
              onClick={() => {
                onReview(item.id, action.key);
                setRevealed(false);
              }}
              className={`rounded-[24px] px-4 py-4 text-left text-sm font-medium transition ${
                revealed
                  ? 'border border-[#dfcfb7] bg-white text-[#2f2419] hover:border-[#c8a978] hover:bg-[#fff8ef]'
                  : 'cursor-not-allowed border border-[#ede4d5] bg-[#f8f4ee] text-[#b09e86]'
              }`}
            >
              <span className="block text-base font-semibold">{action.label}</span>
              <span className="mt-1 block text-xs leading-5 text-inherit">
                {action.key === 'again'
                  ? '需要尽快再次见到'
                  : action.key === 'hard'
                    ? '记得不牢，还要加深'
                    : action.key === 'good'
                      ? '可以按正常节奏复习'
                      : '可以把间隔拉长一些'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
