'use client'

import { useCallback, useMemo, useState } from 'react'
import type { VocabEntry } from '@/lib/labTypes'
import type { ReviewRating } from '@/lib/useStudyStore'

interface QuizConfig {
  reviewItems: VocabEntry[]
  favoriteItems: VocabEntry[]
  onRate: (id: string, rating: ReviewRating) => void
  onSpeak: (text: string) => void
}

type QuizPhase = 'config' | 'quiz' | 'result'

interface QuizItem extends VocabEntry {
  result?: 'correct' | 'wrong'
  rating?: ReviewRating
}

const ratingActions: Array<{ key: ReviewRating; label: string; hint: string }> = [
  { key: 'again', label: '不会', hint: '完全没想起来。' },
  { key: 'hard', label: '困难', hint: '想了很久才回忆起来。' },
  { key: 'good', label: '一般', hint: '基本能回忆出来。' },
  { key: 'easy', label: '轻松', hint: '几乎立刻就想起来了。' },
]

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

export function QuizMode({ reviewItems, favoriteItems, onRate, onSpeak }: QuizConfig) {
  const [phase, setPhase] = useState<QuizPhase>('config')
  const [quizItems, setQuizItems] = useState<QuizItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [quizCount, setQuizCount] = useState(10)
  const [quizSource, setQuizSource] = useState<'review' | 'favorites'>(reviewItems.length > 0 ? 'review' : 'favorites')

  const currentSourceItems = useMemo(
    () => (quizSource === 'review' ? reviewItems : favoriteItems),
    [favoriteItems, quizSource, reviewItems],
  )
  const sourceLabel = quizSource === 'review' ? '今日复习' : '收藏本'
  const current = quizItems[currentIndex] ?? null
  const progress = quizItems.length > 0 ? ((currentIndex + 1) / quizItems.length) * 100 : 0
  const correctCount = quizItems.filter((item) => item.result === 'correct').length
  const wrongItems = quizItems.filter((item) => item.result === 'wrong')

  const startQuiz = useCallback(() => {
    const shuffled = shuffle(currentSourceItems)
    const count = Math.min(quizCount, shuffled.length)
    setQuizItems(shuffled.slice(0, count))
    setCurrentIndex(0)
    setRevealed(false)
    setPhase('quiz')
  }, [currentSourceItems, quizCount])

  const handleReveal = useCallback(() => {
    if (!current) return
    setRevealed(true)
    onSpeak(current.word)
  }, [current, onSpeak])

  const handleRate = useCallback((rating: ReviewRating) => {
    if (!current) return

    const isCorrect = rating === 'good' || rating === 'easy'
    setQuizItems((prev) =>
      prev.map((item, index) =>
        index === currentIndex ? { ...item, result: isCorrect ? 'correct' : 'wrong', rating } : item,
      ),
    )
    onRate(current.id, rating)

    if (currentIndex >= quizItems.length - 1) {
      setPhase('result')
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setRevealed(false)
  }, [current, currentIndex, onRate, quizItems.length])

  const retryWrong = useCallback(() => {
    if (wrongItems.length === 0) return
    setQuizItems(wrongItems.map((item) => ({ ...item, result: undefined, rating: undefined })))
    setCurrentIndex(0)
    setRevealed(false)
    setPhase('quiz')
  }, [wrongItems])

  if (phase === 'config') {
    return (
      <section className="rounded-[32px] border border-[#eadfcb] bg-white p-6 shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Quiz Setup</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
          词汇自测
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#6c5945]">
          从{sourceLabel}里抽题，看日语先想中文，再给自己一个真实反馈。
        </p>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[#332719]">选择题目来源</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {[
              { key: 'review', label: '今日复习', count: reviewItems.length },
              { key: 'favorites', label: '收藏本', count: favoriteItems.length },
            ].map((source) => (
              <button
                key={source.key}
                type="button"
                onClick={() => setQuizSource(source.key as 'review' | 'favorites')}
                disabled={source.count === 0}
                className={`rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  quizSource === source.key
                    ? 'bg-[#201911] text-[#fff1da]'
                    : 'border border-[#e3d2bb] bg-[#fffdf9] text-[#6a543d] hover:bg-[#fff8ef]'
                }`}
              >
                {source.label}（{source.count}）
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[#332719]">本轮题量</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {[5, 10, 20, 50].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setQuizCount(count)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  quizCount === count
                    ? 'bg-[#201911] text-[#fff1da]'
                    : 'border border-[#e3d2bb] bg-[#fffdf9] text-[#6a543d] hover:bg-[#fff8ef]'
                }`}
              >
                {count} 题
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-[#7c6243]">
            {sourceLabel}当前共有 {currentSourceItems.length} 条，题目会在开始时随机打乱。
          </p>
        </div>

        <button
          type="button"
          onClick={startQuiz}
          disabled={currentSourceItems.length === 0}
          className="mt-6 rounded-[22px] bg-[#201911] px-5 py-3 text-sm font-medium text-[#fff1da] transition hover:bg-[#342519] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {currentSourceItems.length === 0 ? '当前没有可测词条' : `开始测试（${Math.min(quizCount, currentSourceItems.length)} 题）`}
        </button>

        {reviewItems.length === 0 && favoriteItems.length === 0 && (
          <p className="mt-4 text-sm leading-7 text-[#7c6243]">
            先在词典里收藏单词，或把词卡加入复习队列，这里就会自动有题目。
          </p>
        )}
      </section>
    )
  }

  if (phase === 'result') {
    const total = quizItems.length
    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0

    return (
      <section className="rounded-[32px] border border-[#eadfcb] bg-white p-6 shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Quiz Result</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
          测试完成
        </h2>
        <p className="mt-3 text-4xl font-semibold text-[#1f1710]" style={{ fontFamily: 'var(--font-cormorant)' }}>
          {score} 分
        </p>
        <p className="mt-3 text-sm leading-7 text-[#6c5945]">
          正确 {correctCount} 题，错误 {wrongItems.length} 题，共 {total} 题。
        </p>

        {wrongItems.length > 0 && (
          <div className="mt-6 rounded-[28px] bg-[#fbf7ef] p-5">
            <p className="text-sm font-semibold text-[#332719]">错题回看</p>
            <div className="mt-4 space-y-3">
              {wrongItems.map((item) => (
                <div key={item.id} className="rounded-[20px] border border-[#eadfcb] bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-[#201911]">{item.word}</p>
                      <p className="mt-1 text-sm text-[#7a6145]">{item.kana}</p>
                    </div>
                    <p className="text-sm font-medium text-[#4b3b2d]">{item.meaningZh || item.meaningEn || '暂未整理释义'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPhase('config')}
            className="rounded-full border border-[#e3d2bb] px-4 py-2 text-sm font-medium text-[#6a543d] transition hover:bg-[#fff8ef]"
          >
            重新配置
          </button>
          {wrongItems.length > 0 && (
            <button
              type="button"
              onClick={retryWrong}
              className="rounded-full bg-[#8f4027] px-4 py-2 text-sm font-medium text-[#fff1da] transition hover:bg-[#77341f]"
            >
              错题重做（{wrongItems.length}）
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setCurrentIndex(0)
              setRevealed(false)
              setPhase('quiz')
            }}
            className="rounded-full bg-[#201911] px-4 py-2 text-sm font-medium text-[#fff1da] transition hover:bg-[#342519]"
          >
            再测一轮
          </button>
        </div>
      </section>
    )
  }

  if (!current) {
    return (
      <section className="rounded-[32px] border border-[#eadfcb] bg-white p-6 shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
        <p className="text-sm leading-7 text-[#6c5945]">当前没有可展示的题目，请返回上一步重新开始。</p>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#efe3d2]">
          <div className="h-full rounded-full bg-[#201911] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <span className="shrink-0 text-sm text-[#7a6145]">
          {currentIndex + 1} / {quizItems.length}
        </span>
      </div>

      <div className="rounded-[32px] border border-[#eadfcb] bg-white p-6 shadow-[0_16px_40px_rgba(125,93,48,0.08)]">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#af8a50]">Quiz Card</p>
          <h2 className="mt-5 text-5xl font-semibold text-[#1f1710] md:text-6xl" style={{ fontFamily: 'var(--font-cormorant)' }}>
            {current.word}
          </h2>
          <p className="mt-3 text-lg text-[#7a6145]">{current.kana || current.word}</p>

          {!revealed ? (
            <button
              type="button"
              onClick={handleReveal}
              className="mt-8 w-full rounded-[24px] border border-dashed border-[#d8c1a0] bg-[#fbf7ef] px-5 py-5 text-sm font-medium text-[#6a543d] transition hover:bg-[#fff8ef]"
            >
              先想中文释义，再点这里显示答案
            </button>
          ) : (
            <div className="mt-8">
              <div className="rounded-[24px] bg-[#fbf7ef] p-5 text-left">
                <p className="text-lg leading-8 text-[#2e241a]">{current.meaningZh || current.meaningEn || '暂未整理释义'}</p>
                {current.meaningEn && current.meaningZh && (
                  <p className="mt-2 text-sm leading-6 text-[#7a6a58]">EN: {current.meaningEn}</p>
                )}
                {current.detailZh && <p className="mt-3 text-sm leading-7 text-[#544230]">{current.detailZh}</p>}
              </div>

              <button
                type="button"
                onClick={() => onSpeak(current.word)}
                className="mt-4 rounded-full border border-[#e3d2bb] px-4 py-2 text-sm font-medium text-[#6a543d] transition hover:bg-[#fff8ef]"
              >
                再听一遍发音
              </button>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {ratingActions.map((action) => (
                  <button
                    key={action.key}
                    type="button"
                    onClick={() => handleRate(action.key)}
                    className="rounded-[24px] border border-[#eadfcb] bg-[#fffdf9] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#d3ae77] hover:bg-[#fff8ef]"
                  >
                    <p className="text-sm font-semibold text-[#201911]">{action.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[#6d5a46]">{action.hint}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPhase('result')}
        className="w-full rounded-full border border-[#e3d2bb] px-4 py-2 text-sm font-medium text-[#6a543d] transition hover:bg-[#fff8ef]"
      >
        提前结束本轮测试
      </button>
    </section>
  )
}
