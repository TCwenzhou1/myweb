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

const trackMeta: Record<string, { label: string; badgeClass: string }> = {
  core2000: {
    label: 'Core 2000',
    badgeClass: 'bg-[#fff4dd] text-[#9b6d1f]',
  },
  jlpt10k: {
    label: 'JLPT 10K',
    badgeClass: 'bg-[#f5f0ff] text-[#6750a4]',
  },
  jmdict: {
    label: 'JMDict 补充',
    badgeClass: 'bg-[#edf8ff] text-[#0e7490]',
  },
  kaoyan3500: {
    label: '考研 3500',
    badgeClass: 'bg-[#eefbf3] text-[#1f7a46]',
  },
  kaoyan: {
    label: '考研词汇',
    badgeClass: 'bg-[#eefbf3] text-[#1f7a46]',
  },
  full: {
    label: '全词库',
    badgeClass: 'bg-[#fff4dd] text-[#9b6d1f]',
  },
};

function getPrimaryMeaning(item: VocabEntry) {
  return item.meaningZh.trim() || item.meaningEn.trim() || item.detailZh.trim() || '暂未整理释义';
}

export function WordCard({
  item,
  isFavorite,
  inReview,
  dueToday,
  onSpeak,
  onToggleFavorite,
  onToggleReview,
}: WordCardProps) {
  const primaryMeaning = getPrimaryMeaning(item);
  const englishMeaning = item.meaningEn.trim();
  const hasChineseMeaning = item.meaningZh.trim().length > 0;
  const detailText = item.detailZh.trim() || primaryMeaning;
  const meta = trackMeta[item.track] ?? {
    label: item.track,
    badgeClass: 'bg-slate-100 text-slate-700',
  };

  return (
    <article className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white shadow-[0_18px_50px_rgba(125,93,48,0.08)]">
      <div className="border-b border-[#f1e6d5] bg-[linear-gradient(135deg,#fffaf2_0%,#fff4e4_100%)] p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${meta.badgeClass}`}>
              {meta.label}
            </span>
            <span className="rounded-full bg-[#f4efe6] px-3 py-1 text-xs font-semibold text-[#6e5a40]">
              {item.level}
            </span>
            {dueToday && (
              <span className="rounded-full bg-[#fff0f0] px-3 py-1 text-xs font-semibold text-[#b34242]">
                今日待复习
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSpeak(item.kana || item.word)}
              className="rounded-full border border-[#dfcfb7] bg-white px-4 py-2 text-sm font-medium text-[#5b4630] transition hover:border-[#c9af84] hover:bg-[#fff7eb]"
            >
              发音
            </button>
            <button
              type="button"
              aria-pressed={isFavorite}
              onClick={() => onToggleFavorite(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isFavorite
                  ? 'bg-[#201911] text-[#fff6e9]'
                  : 'border border-[#dfcfb7] bg-white text-[#5b4630] hover:border-[#c9af84] hover:bg-[#fff7eb]'
              }`}
            >
              {isFavorite ? '已收藏' : '收藏'}
            </button>
            <button
              type="button"
              aria-pressed={inReview}
              onClick={() => onToggleReview(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                inReview
                  ? 'bg-[#ffe6d7] text-[#a24d1a]'
                  : 'border border-[#dfcfb7] bg-white text-[#5b4630] hover:border-[#c9af84] hover:bg-[#fff7eb]'
              }`}
            >
              {inReview ? '移出复习' : '加入复习'}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#af8a50]">
            Dictionary Entry
          </p>
          <h2
            className="mt-3 text-4xl font-semibold text-[#201911] md:text-5xl"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {item.word}
          </h2>
          <p className="mt-2 text-lg text-[#7a6145]">{item.kana || item.word}</p>
          <p className="mt-5 text-lg leading-8 text-[#2e241a]">{primaryMeaning}</p>
          {hasChineseMeaning && englishMeaning && (
            <p className="mt-2 text-sm leading-6 text-[#7a6a58]">EN: {englishMeaning}</p>
          )}
          {!hasChineseMeaning && englishMeaning && (
            <p className="mt-3 text-sm leading-6 text-[#8a7458]">
              当前词条优先展示原始英文 gloss，这样可以先保证全量词汇可用，后续再逐步补中文释义。
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-[1.2fr,0.8fr] md:p-6">
        <section className="rounded-[28px] bg-[#fbf7ef] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">
            中文详解
          </p>
          <p className="mt-4 text-sm leading-7 text-[#413325]">{detailText}</p>
        </section>

        <div className="space-y-4">
          <section className="rounded-[28px] border border-[#eee2ce] bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">
              词卡信息
            </p>
            <dl className="mt-4 space-y-3 text-sm text-[#5a4937]">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[#9b866b]">读音</dt>
                <dd className="text-right font-medium text-[#2e241a]">{item.kana || item.word}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[#9b866b]">来源</dt>
                <dd className="text-right font-medium text-[#2e241a]">{item.source || '本地词库'}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[#9b866b]">学习状态</dt>
                <dd className="text-right font-medium text-[#2e241a]">
                  {inReview ? '复习队列中' : isFavorite ? '已收藏' : '可加入生词本'}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-[28px] bg-[#1f1a16] p-5 text-[#f7eddc]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d7b780]">
              学习建议
            </p>
            <p className="mt-4 text-sm leading-7 text-[#f7eddc]">
              {inReview
                ? '这张词卡已经进入复习队列，可以直接去“今日复习”里用分级反馈继续巩固。'
                : '如果这是第一次碰到的词，建议先收藏，再加入复习队列，让它自动进入后续学习计划。'}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#ddc8a7]">
              收藏适合做个人词单，复习适合做节奏化记忆，两者一起用会更接近词典 App 的日常学习流。
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
