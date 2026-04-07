'use client'

import { useEffect, useState } from 'react'
import type { VocabEntry } from '@/lib/labTypes'
import type { ReviewRating } from '@/lib/useStudyStore'

interface LabReviewCardProps {
  item: VocabEntry
  onSpeak: (text: string) => void
  onReview: (id: string, rating: ReviewRating) => void
}

const actions: Array<{ key: ReviewRating; label: string; hint: string }> = [
  { key: 'again', label: '再来一次', hint: '还没记住，需要尽快再见一遍。' },
  { key: 'hard', label: '有点困难', hint: '勉强想起来了，但还不够稳。' },
  { key: 'good', label: '基本记住', hint: '可以按正常节奏进入下一轮复习。' },
  { key: 'easy', label: '已经很稳', hint: '可以把复习间隔再拉长一点。' },
]

function getPrimaryMeaning(item: VocabEntry) {
  return item.meaningZh.trim() || item.meaningEn.trim() || item.detailZh.trim() || '暂未整理释义'
}

function getDisplayLevel(level: VocabEntry['level']) {
  return level === '鑰冪爺' ? '考研' : level
}

function getExample(item: VocabEntry) {
  if (item.exampleJa?.trim() && item.exampleZh?.trim()) {
    return {
      ja: item.exampleJa.trim(),
      zh: item.exampleZh.trim(),
    }
  }

  return {
    ja: `${item.word} を文脈の中で思い出せると、記憶が定着しやすくなります。`,
    zh: '如果能在语境里回忆起这个词，记忆通常会更稳。',
  }
}

export function LabReviewCardClean({ item, onSpeak, onReview }: LabReviewCardProps) {
  const [revealed, setRevealed] = useState(false)
  const primaryMeaning = getPrimaryMeaning(item)
  const englishMeaning = item.meaningEn.trim()
  const example = getExample(item)

  useEffect(() => {
    setRevealed(false)
  }, [item.id])

  return (
    <article className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white shadow-[0_18px_50px_rgba(125,93,48,0.08)]">
      <div className="border-b border-[#f1e6d5] bg-[linear-gradient(135deg,#fffaf2_0%,#fff1de_100%)] p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#201911] px-3 py-1 text-xs font-semibold text-[#fff1da]">今日复习</span>
            <span className="rounded-full bg-[#f4efe6] px-3 py-1 text-xs font-semibold text-[#6e5a40]">{getDisplayLevel(item.level)}</span>
            {item.partOfSpeech && (
              <span className="rounded-full bg-[#f4efe6] px-3 py-1 text-xs font-semibold text-[#6e5a40]">{item.partOfSpeech}</span>
            )}
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
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="rounded-[30px] bg-[linear-gradient(180deg,#fffaf2_0%,#fff5e6_100%)] p-6 text-center md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#af8a50]">Review Card</p>
          <h2 className="mt-4 text-5xl font-semibold text-[#201911] md:text-6xl" style={{ fontFamily: 'var(--font-cormorant)' }}>
            {item.word}
          </h2>
          <p className="mt-3 text-lg text-[#7a6145]">{item.kana || item.word}</p>

          {!revealed ? (
            <div className="mt-8">
              <p className="text-sm leading-7 text-[#6d5a46]">
                先在脑中回忆中文释义和使用场景，再点下面的按钮显示答案。
              </p>
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="mt-6 rounded-full bg-[#201911] px-6 py-3 text-sm font-medium text-[#fff1da] transition hover:bg-[#342519]"
              >
                显示答案
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-5 text-left">
              <div className="rounded-[24px] bg-white/80 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Meaning</p>
                <p className="mt-3 text-lg leading-8 text-[#2e241a]">{primaryMeaning}</p>
                {englishMeaning && <p className="mt-2 text-sm leading-6 text-[#7a6a58]">EN: {englishMeaning}</p>}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <section className="rounded-[24px] bg-white/80 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Example</p>
                  <p className="mt-3 text-base leading-8 text-[#2e241a]">{example.ja}</p>
                  <p className="mt-3 text-sm leading-7 text-[#544230]">{example.zh}</p>
                </section>
                <section className="rounded-[24px] bg-[#1f1a16] p-5 text-[#f7eddc]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d7b780]">Next Action</p>
                  <p className="mt-3 text-sm leading-7">
                    根据你刚才回忆的难度，给这张卡一个真实反馈。比起“答对了没”，稳定的难度判断更有价值。
                  </p>
                </section>
              </div>
            </div>
          )}
        </div>

        {revealed && (
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {actions.map((action) => (
              <button
                key={action.key}
                type="button"
                onClick={() => onReview(item.id, action.key)}
                className="rounded-[24px] border border-[#eadfcb] bg-[#fffdf9] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#d3ae77] hover:bg-[#fff8ef]"
              >
                <p className="text-sm font-semibold text-[#201911]">{action.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#6d5a46]">{action.hint}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
