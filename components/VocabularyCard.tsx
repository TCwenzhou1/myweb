// @ts-nocheck
'use client';

// import { VocabularyEntry } from '@/lib/vocabularyBank';

interface VocabularyCardProps {
  item: VocabularyEntry;
  isFavorite: boolean;
  isDue: boolean;
  onToggleFavorite: (id: string) => void;
  onSpeak: (text: string) => void;
}

export function VocabularyCard({
  item,
  isFavorite,
  isDue,
  onToggleFavorite,
  onSpeak
}: VocabularyCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-900">{item.word}</h3>
            <button
              type="button"
              onClick={() => onSpeak(item.kana || item.word)}
              className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              发音
            </button>
            <button
              type="button"
              onClick={() => onToggleFavorite(item.id)}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                isFavorite
                  ? 'bg-amber-100 text-amber-800'
                  : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isFavorite ? '已收藏' : '收藏'}
            </button>
            {isDue && (
              <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                待复习
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
            {item.levelTags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1">
                {tag}
              </span>
            ))}
            {item.isExamFocus && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
                考研重点
              </span>
            )}
            {item.source === 'manual_exam' && (
              <span className="rounded-full bg-violet-50 px-2.5 py-1 font-semibold text-violet-700">
                精讲词条
              </span>
            )}
          </div>

          <p className="mt-3 text-sm text-slate-500">假名：{item.kana || '—'}</p>
          <p className="mt-2 text-base font-medium text-slate-900">{item.meaning}</p>
          {item.meaningZh && item.meaningEn && (
            <p className="mt-1 text-sm text-slate-500">EN: {item.meaningEn}</p>
          )}
        </div>
      </div>

      {item.collocation && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">常见搭配</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.collocation}</p>
        </div>
      )}

      {item.note && (
        <div className="mt-4 rounded-xl bg-amber-50 p-4">
          <p className="text-sm font-semibold text-slate-900">考试提醒</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.note}</p>
        </div>
      )}

      {!item.meaningZh && (
        <p className="mt-4 text-xs leading-5 text-slate-500">
          这个批量词条的释义保持了原始英文 gloss，用来避免未经逐条校对的批量机翻误差。
        </p>
      )}
    </article>
  );
}
