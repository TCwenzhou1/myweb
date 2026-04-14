'use client'

import type { VocabEntry } from '@/lib/labTypes'

interface WordCardProps {
  item: VocabEntry
  isFavorite: boolean
  inReview: boolean
  dueToday: boolean
  onSpeak: (text: string) => void
  onToggleFavorite: (id: string) => void
  onToggleReview: (id: string) => void
}

const trackMeta: Record<string, { label: string; badgeClass: string }> = {
  featured: { label: '精选词卡', badgeClass: 'bg-[#fff4dd] text-[#9b6d1f]' },
  core2000: { label: 'Core 2000', badgeClass: 'bg-[#fff4dd] text-[#9b6d1f]' },
  full: { label: '整合词库', badgeClass: 'bg-[#f4efe6] text-[#6e5a40]' },
  jlpt10k: { label: 'JLPT 10K', badgeClass: 'bg-[#f5f0ff] text-[#6750a4]' },
  jmdict: { label: 'JMDict 补充', badgeClass: 'bg-[#edf8ff] text-[#0e7490]' },
  kaoyan3500: { label: '考研 3500', badgeClass: 'bg-[#eefbf3] text-[#1f7a46]' },
  kaoyan: { label: '考研整合', badgeClass: 'bg-[#eefbf3] text-[#1f7a46]' },
}

const partOfSpeechMap: Record<string, string> = {
  名: '名词',
  副: '副词',
  形: '形容词',
  形動: '形容动词',
  連体: '连体词',
  代: '代词',
  接: '接续词',
  感: '感叹词',
  助: '助词',
  自五: '五段自动词',
  他五: '五段他动词',
  自一: '一段自动词',
  他一: '一段他动词',
  自サ: 'サ变自动词',
  他サ: 'サ变他动词',
  サ変: 'サ变动词',
  サ変名詞: 'サ变名词',
  サ変名: 'サ变名词',
  自カ: 'カ变自动词',
  他カ: 'カ变他动词',
}

function getPrimaryMeaning(item: VocabEntry) {
  return item.meaningZh.trim() || item.meaningEn.trim() || item.detailZh.trim() || '暂未整理释义'
}

function getPartOfSpeech(item: VocabEntry) {
  if (item.partOfSpeech?.trim()) return item.partOfSpeech.trim()

  const match = item.detailZh.match(/【([^】]+)】/)
  if (!match) return null

  return match[1]
    .split(/[・/]/)
    .map((part) => partOfSpeechMap[part.trim()] ?? part.trim())
    .filter(Boolean)
    .join(' / ') || null
}

function getExample(item: VocabEntry) {
  if (item.exampleJa?.trim() && item.exampleZh?.trim()) {
    return {
      ja: item.exampleJa.trim(),
      zh: item.exampleZh.trim(),
    }
  }

  return {
    ja: `${item.word} を文脈の中で覚えると定着しやすいです。`,
    zh: '把这个词放进语境里记，比只看释义更容易记住。',
  }
}

function getNotes(item: VocabEntry, isFavorite: boolean, inReview: boolean, dueToday: boolean) {
  if (item.notes && item.notes.length > 0) return item.notes
  if (dueToday) return ['这张词卡今天已经到期，建议先听一遍发音，再做一轮完整复习反馈。']
  if (inReview) return ['这张词卡已经进入复习队列，建议今天处理完一轮反馈。']
  if (isFavorite) return ['你已经把它放进收藏本了，下一步建议加入复习队列，形成真正的记忆闭环。']
  return ['先收藏，再加入复习队列，会比只看一遍更容易形成记忆。']
}

export function WordCardV2({
  item,
  isFavorite,
  inReview,
  dueToday,
  onSpeak,
  onToggleFavorite,
  onToggleReview,
}: WordCardProps) {
  const primaryMeaning = getPrimaryMeaning(item)
  const englishMeaning = item.meaningEn.trim()
  const detailText = item.detailZh.trim() || primaryMeaning
  const displayPartOfSpeech = getPartOfSpeech(item)
  const example = getExample(item)
  const notes = getNotes(item, isFavorite, inReview, dueToday)
  const meta = trackMeta[item.track] ?? {
    label: item.track,
    badgeClass: 'bg-slate-100 text-slate-700',
  }

  return (
    <article className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white shadow-[0_18px_50px_rgba(125,93,48,0.08)]">
      <div className="border-b border-[#f1e6d5] bg-[linear-gradient(135deg,#fffaf2_0%,#fff4e4_100%)] p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${meta.badgeClass}`}>{meta.label}</span>
            <span className="rounded-full bg-[#f4efe6] px-3 py-1 text-xs font-semibold text-[#6e5a40]">{item.level}</span>
            {displayPartOfSpeech && (
              <span className="rounded-full bg-[#f4efe6] px-3 py-1 text-xs font-semibold text-[#6e5a40]">{displayPartOfSpeech}</span>
            )}
            {dueToday && <span className="rounded-full bg-[#fff0f0] px-3 py-1 text-xs font-semibold text-[#b34242]">今日待复习</span>}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSpeak(item.kana || item.word)}
              className="rounded-full border border-[#dfcfb7] bg-white px-4 py-2 text-sm font-medium text-[#5b4630] transition hover:border-[#c9af84] hover:bg-[#fff7eb]"
            >
              词条发音
            </button>
            <button
              type="button"
              onClick={() => onSpeak(example.ja)}
              className="rounded-full border border-[#dfcfb7] bg-white px-4 py-2 text-sm font-medium text-[#5b4630] transition hover:border-[#c9af84] hover:bg-[#fff7eb]"
            >
              例句跟读
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#af8a50]">Dictionary Entry</p>
          <h2 className="mt-3 text-4xl font-semibold text-[#201911] md:text-5xl" style={{ fontFamily: 'var(--font-cormorant)' }}>
            {item.word}
          </h2>
          <p className="mt-2 text-lg text-[#7a6145]">{item.kana || item.word}</p>
          <p className="mt-5 text-lg leading-8 text-[#2e241a]">{primaryMeaning}</p>
          {englishMeaning && <p className="mt-2 text-sm leading-6 text-[#7a6a58]">EN: {englishMeaning}</p>}
        </div>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-[1.15fr,0.85fr] md:p-6">
        <section className="rounded-[28px] bg-[#fbf7ef] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">例句与用法</p>
          <p className="mt-4 text-base leading-8 text-[#2e241a]">{example.ja}</p>
          <p className="mt-3 text-sm leading-7 text-[#544230]">{example.zh}</p>
          <div className="mt-4 rounded-[20px] bg-white/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#af8a50]">补充说明</p>
            <p className="mt-3 text-sm leading-7 text-[#413325]">{detailText}</p>
          </div>
        </section>

        <div className="space-y-4">
          <section className="rounded-[28px] border border-[#eee2ce] bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">词卡信息</p>
            <dl className="mt-4 space-y-3 text-sm text-[#5a4937]">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[#9b866b]">词性</dt>
                <dd className="text-right font-medium text-[#2e241a]">{displayPartOfSpeech || '待补充'}</dd>
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d7b780]">学习建议</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#f7eddc]">
              {notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
