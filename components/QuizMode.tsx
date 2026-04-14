'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import type { VocabEntry } from '@/lib/labTypes';
import type { ReviewRating } from '@/lib/useStudyStore';

interface QuizConfig {
  reviewItems: VocabEntry[];
  favoriteItems: VocabEntry[];
  onRate: (id: string, rating: ReviewRating) => void;
  onSpeak: (text: string) => void;
}

type QuizPhase = 'config' | 'quiz' | 'result';

interface QuizItem extends VocabEntry {
  result?: 'correct' | 'wrong';
  rating?: ReviewRating;
}

const ratingActions: Array<{ key: ReviewRating; label: string; emoji: string; hint: string }> = [
  { key: 'again', label: '不会', emoji: '😵', hint: '完全想不起来' },
  { key: 'hard', label: '困难', emoji: '😓', hint: '想了很久才想起来' },
  { key: 'good', label: '一般', emoji: '🙂', hint: '基本能回忆起来' },
  { key: 'easy', label: '简单', emoji: '😎', hint: '轻松回忆起来' }
];

export function QuizMode({ reviewItems, favoriteItems, onRate, onSpeak }: QuizConfig) {
  const [phase, setPhase] = useState<QuizPhase>('config');
  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [quizCount, setQuizCount] = useState(10);
  const [quizSource, setQuizSource] = useState<'review' | 'favorites'>(
    reviewItems.length > 0 ? 'review' : 'favorites'
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSourceItems = quizSource === 'review' ? reviewItems : favoriteItems;
  const sourceLabel = quizSource === 'review' ? '今日复习' : '收藏本';

  const shuffled = useMemo(() => {
    return [...currentSourceItems].sort(() => Math.random() - 0.5);
  }, [currentSourceItems]);

  const startQuiz = useCallback(() => {
    const count = Math.min(quizCount, shuffled.length);
    setQuizItems(shuffled.slice(0, count));
    setCurrentIndex(0);
    setRevealed(false);
    setPhase('quiz');
  }, [quizCount, shuffled]);

  const current = quizItems[currentIndex];
  const progress = quizItems.length > 0 ? ((currentIndex) / quizItems.length) * 100 : 0;
  const correctCount = quizItems.filter((i) => i.result === 'correct').length;
  const wrongCount = quizItems.filter((i) => i.result === 'wrong').length;

  const handleRate = useCallback((rating: ReviewRating) => {
    if (!current) return;

    const isCorrect = rating === 'good' || rating === 'easy';
    setQuizItems((prev) =>
      prev.map((item, idx) =>
        idx === currentIndex ? { ...item, result: isCorrect ? 'correct' : 'wrong', rating } : item
      )
    );
    onRate(current.id, rating);

    if (currentIndex < quizItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRevealed(false);
    } else {
      setPhase('result');
    }
  }, [current, currentIndex, quizItems, onRate]);

  const handleReveal = useCallback(() => {
    setRevealed(true);
    // Auto-play pronunciation
    if (current) {
      onSpeak(current.word);
    }
  }, [current, onSpeak]);

  const retryWrong = useCallback(() => {
    const wrongItems = quizItems.filter((i) => i.result === 'wrong');
    if (wrongItems.length === 0) return;
    setQuizItems(wrongItems.map((i) => ({ ...i, result: undefined, rating: undefined })));
    setCurrentIndex(0);
    setRevealed(false);
    setPhase('quiz');
  }, [quizItems]);

  // Phase: Config
  if (phase === 'config') {
    return (
      <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white text-xl">
            ✏️
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">词汇自测</h2>
            <p className="mt-1 text-sm text-slate-500">
              从「{sourceLabel}」中抽取词汇，看日语想中文释义，检验真实掌握程度。
            </p>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                选择词库来源
              </label>
              <div className="flex flex-wrap gap-3 mb-4">
                {[
                  { key: 'review', label: '今日复习', count: reviewItems.length },
                  { key: 'favorites', label: '收藏本', count: favoriteItems.length },
                ].map((src) => (
                  <button
                    key={src.key}
                    type="button"
                    onClick={() => setQuizSource(src.key as 'review' | 'favorites')}
                    disabled={src.count === 0}
                    className={`rounded-2xl px-5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      quizSource === src.key
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {src.label}（{src.count}条）
                  </button>
                ))}
              </div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                本轮测试数量
              </label>
              <div className="flex flex-wrap gap-3">
                {[5, 10, 20, 50].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setQuizCount(n)}
                    className={`rounded-2xl px-5 py-2.5 text-sm font-medium transition ${
                      quizCount === n
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {n} 题
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400">
                {sourceLabel} 共有 {currentSourceItems.length} 条，题目随机打乱
              </p>
            </div>

            <button
              type="button"
              onClick={startQuiz}
              disabled={currentSourceItems.length === 0}
              className="mt-5 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentSourceItems.length === 0 ? '暂无可测试词汇' : `开始测试（${Math.min(quizCount, currentSourceItems.length)}题）`}
            </button>
          </div>
        </div>

        {reviewItems.length === 0 && favoriteItems.length === 0 && (
          <p className="mt-4 text-sm text-slate-400">
            请先在词库中点击 ♥ 收藏单词，或在复习中加入复习队列。
          </p>
        )}
      </section>
    );
  }

  // Phase: Result
  if (phase === 'result') {
    const score = quizItems.length > 0 ? Math.round((correctCount / quizItems.length) * 100) : 0;
    const wrongItems = quizItems.filter((i) => i.result === 'wrong');

    return (
      <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="text-center">
          <div className="text-6xl">
            {score >= 80 ? '🎉' : score >= 60 ? '💪' : score >= 40 ? '📚' : '😭'}
          </div>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">测试完成！</h2>
          <p className="mt-2 text-4xl font-bold text-indigo-600">{score}分</p>
          <p className="mt-1 text-sm text-slate-500">
            正确 {correctCount} 题 · 错误 {wrongCount} 题 · 共 {quizItems.length} 题
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quizItems.map((item, idx) => (
            <div
              key={item.id}
              className={`rounded-xl p-3 text-center text-sm ${
                item.result === 'correct'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <span className={`font-bold ${item.result === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                {item.result === 'correct' ? '✓' : '✗'}
              </span>
              <span className="ml-1 font-bold text-slate-800">{item.word}</span>
            </div>
          ))}
        </div>

        {wrongItems.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-700 mb-2">❌ 错题本（{wrongItems.length}题）</p>
            <div className="space-y-2">
              {wrongItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 p-3">
                  <span className="shrink-0 text-lg font-bold text-red-600">{item.word}</span>
                  <span className="text-sm text-slate-500">假名：{item.kana}</span>
                  <span className="text-sm font-semibold text-slate-800 ml-auto">{item.meaningZh}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPhase('config')}
            className="rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            重新配置
          </button>
          {wrongItems.length > 0 && (
            <button
              type="button"
              onClick={retryWrong}
              className="rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              错题重做 ({wrongItems.length}题)
            </button>
          )}
          <button
            type="button"
            onClick={() => { setPhase('quiz'); setCurrentIndex(0); setRevealed(false); }}
            className="rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            再测一遍
          </button>
        </div>
      </section>
    );
  }

  // Phase: Quiz
  return (
    <section className="mt-6 space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="shrink-0 text-sm text-slate-500">
          {currentIndex + 1} / {quizItems.length}
        </span>
      </div>

      {/* Quiz card */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {currentIndex + 1} / {quizItems.length}
          </p>

          {/* Question side */}
          <div className="mt-6">
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">{current.word}</h2>
            <p className="mt-3 text-xl text-slate-500">{current.kana}</p>
          </div>

          {/* Reveal button */}
          {!revealed ? (
            <button
              type="button"
              onClick={handleReveal}
              className="mt-8 w-full rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 py-4 text-sm font-semibold text-indigo-600 transition hover:border-indigo-400 hover:bg-indigo-100"
            >
              看不到？点击揭示答案
            </button>
          ) : (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="rounded-2xl bg-indigo-50 p-4">
                <p className="text-lg font-semibold text-indigo-900">{current.meaningZh}</p>
                {current.meaningEn && (
                  <p className="mt-1 text-sm text-indigo-600">{current.meaningEn}</p>
                )}
                {current.detailZh && (
                  <p className="mt-2 text-sm text-slate-600">{current.detailZh}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => onSpeak(current.word)}
                className="mt-3 rounded-full border border-slate-300 px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                🔊 听发音
              </button>

              {/* Rating buttons */}
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ratingActions.map((action) => (
                  <button
                    key={action.key}
                    type="button"
                    onClick={() => handleRate(action.key)}
                    className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-3 py-3 transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <span className="text-xl">{action.emoji}</span>
                    <span className="mt-1 text-sm font-semibold text-slate-800">{action.label}</span>
                    <span className="mt-0.5 text-xs text-slate-400">{action.hint}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quit */}
      <button
        type="button"
        onClick={() => setPhase('result')}
        className="w-full rounded-2xl border border-slate-300 py-2 text-xs text-slate-400 hover:bg-slate-50"
      >
        提前结束测试
      </button>
    </section>
  );
}
