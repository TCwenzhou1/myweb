'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useStudySystem, calculateAccuracy, getAccuracyComment } from '@/lib/useStudySystem'
import { Level, getLevelBadgeStyle, getPartOfSpeechZh, getVocabularyStats, VocabularyItem } from '@/lib/japaneseData'
import { getTodayString, formatDate } from '@/lib/studyPlan'
import styles from './lab.module.css'

// 等级选项
const LEVELS: (Level | 'all')[] = ['all', 'N5', 'N4', 'N3', 'N2', 'N1', '考研']
const LEVEL_LABELS: Record<string, string> = {
  all: '全部',
  N5: 'N5',
  N4: 'N4',
  N3: 'N3',
  N2: 'N2',
  N1: 'N1',
  '考研': '考研',
}

// 模式选项
type ViewMode = 'browse' | 'card' | 'quiz' | 'plan'
const MODE_OPTIONS: { value: ViewMode; label: string; icon: string }[] = [
  { value: 'browse', label: '浏览', icon: '📖' },
  { value: 'card', label: '记忆卡', icon: '🃏' },
  { value: 'quiz', label: '自测', icon: '✏️' },
  { value: 'plan', label: '计划', icon: '📊' },
]

// 词汇卡片组件
function VocabularyCardComponent({
  word,
  isFlipped,
  onFlip,
  isFavorite,
  onToggleFavorite,
  showDetails = false,
}: {
  word: VocabularyItem
  isFlipped: boolean
  onFlip: () => void
  isFavorite: boolean
  onToggleFavorite: () => void
  showDetails?: boolean
}) {
  const levelStyle = getLevelBadgeStyle(word.level)

  return (
    <div
      className={`${styles.vocabCard} ${isFlipped ? styles.flipped : ''}`}
      onClick={onFlip}
    >
      <div className={styles.cardInner}>
        {/* 正面 */}
        <div className={styles.cardFront}>
          <div className={styles.cardHeader}>
            <span
              className={styles.levelBadge}
              style={{ backgroundColor: levelStyle.bg, color: levelStyle.text, borderColor: levelStyle.border }}
            >
              {levelStyle.label}
            </span>
            <span className={styles.posTag}>{getPartOfSpeechZh(word.partOfSpeech)}</span>
            <button
              className={styles.favoriteBtn}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite() }}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>

          <div className={styles.mainContent}>
            <h3 className={styles.word}>{word.word}</h3>
            <p className={styles.reading}>{word.reading}</p>
            {word.tone && <span className={styles.tone}>音调 {word.tone}</span>}
          </div>

          <p className={styles.hint}>点击查看释义</p>
        </div>

        {/* 背面 */}
        <div className={styles.cardBack}>
          <div className={styles.cardHeader}>
            <span
              className={styles.levelBadge}
              style={{ backgroundColor: levelStyle.bg, color: levelStyle.text, borderColor: levelStyle.border }}
            >
              {levelStyle.label}
            </span>
            <span className={styles.posTag}>{getPartOfSpeechZh(word.partOfSpeech)}</span>
          </div>

          <div className={styles.mainContent}>
            <h3 className={styles.meaning}>{word.meaning}</h3>
            {word.romaji && <p className={styles.romaji}>{word.romaji}</p>}
          </div>

          {showDetails && (
            <div className={styles.details}>
              {word.example && (
                <div className={styles.example}>
                  <p className={styles.exampleText}>{word.example}</p>
                  {word.exampleMeaning && (
                    <p className={styles.exampleMeaning}>{word.exampleMeaning}</p>
                  )}
                </div>
              )}
              {word.collocation && word.collocation.length > 0 && (
                <div className={styles.collocation}>
                  <span className={styles.detailLabel}>搭配：</span>
                  {word.collocation.slice(0, 3).join('、')}
                </div>
              )}
              {word.examTip && (
                <div className={styles.examTip}>
                  <span className={styles.detailLabel}>考试提示：</span>
                  {word.examTip}
                </div>
              )}
            </div>
          )}

          <p className={styles.hint}>点击返回</p>
        </div>
      </div>
    </div>
  )
}

// 记忆卡片学习模式
function CardStudyView({
  words,
  flippedCards,
  onFlipCard,
  favorites,
  onToggleFavorite,
  onMarkLearned,
}: {
  words: VocabularyItem[]
  flippedCards: Set<string>
  onFlipCard: (id: string) => void
  favorites: Set<string>
  onToggleFavorite: (id: string) => void
  onMarkLearned: (word: VocabularyItem, correct: boolean) => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const currentWord = words[currentIndex]

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
    }
  }

  const handleMark = (correct: boolean) => {
    onMarkLearned(currentWord, correct)
    handleNext()
  }

  if (words.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>没有词汇可学习</p>
      </div>
    )
  }

  return (
    <div className={styles.cardStudyContainer}>
      {/* 进度条 */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>
      <p className={styles.progressText}>
        {currentIndex + 1} / {words.length}
      </p>

      {/* 卡片 */}
      <div
        className={`${styles.studyCard} ${showAnswer ? styles.showAnswer : ''}`}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <div className={styles.studyCardInner}>
          <div className={styles.studyCardFront}>
            <span
              className={styles.levelBadge}
              style={{
                backgroundColor: getLevelBadgeStyle(currentWord.level).bg,
                color: getLevelBadgeStyle(currentWord.level).text,
              }}
            >
              {getLevelBadgeStyle(currentWord.level).label}
            </span>
            <h2 className={styles.studyWord}>{currentWord.word}</h2>
            <p className={styles.studyReading}>{currentWord.reading}</p>
            {currentWord.tone && <span className={styles.tone}>音调 {currentWord.tone}</span>}
            <p className={styles.tapHint}>点击显示答案</p>
          </div>

          <div className={styles.studyCardBack}>
            <h2 className={styles.studyMeaning}>{currentWord.meaning}</h2>
            {currentWord.romaji && <p className={styles.studyRomaji}>{currentWord.romaji}</p>}
            {currentWord.example && (
              <div className={styles.studyExample}>
                <p>{currentWord.example}</p>
                {currentWord.exampleMeaning && <p className={styles.exampleZh}>{currentWord.exampleMeaning}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      {showAnswer && (
        <div className={styles.markButtons}>
          <button
            className={`${styles.markBtn} ${styles.wrong}`}
            onClick={() => handleMark(false)}
          >
            还不会 😓
          </button>
          <button
            className={`${styles.markBtn} ${styles.correct}`}
            onClick={() => handleMark(true)}
          >
            记住了 🎉
          </button>
        </div>
      )}

      {/* 导航 */}
      <div className={styles.cardNav}>
        <button
          className={styles.navBtn}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ← 上一张
        </button>
        <button
          className={styles.navBtn}
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
        >
          下一张 →
        </button>
      </div>
    </div>
  )
}

// 测验视图
function QuizView({
  questions,
  answers,
  setAnswers,
  currentIndex,
  setCurrentIndex,
  onSubmit,
}: {
  questions: any[]
  answers: Record<string, string>
  setAnswers: (answers: Record<string, string>) => void
  currentIndex: number
  setCurrentIndex: (index: number) => void
  onSubmit: () => void
}) {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [inputAnswer, setInputAnswer] = useState('')

  const currentQuestion = questions[currentIndex]

  useEffect(() => {
    if (currentQuestion) {
      setSelectedOption(answers[currentQuestion.wordId] || '')
      setInputAnswer(answers[currentQuestion.wordId] || '')
    }
  }, [currentQuestion, answers])

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    const newAnswers = { ...answers, [currentQuestion.wordId]: option }
    setAnswers(newAnswers)
  }

  const handleInputChange = (value: string) => {
    setInputAnswer(value)
    const newAnswers = { ...answers, [currentQuestion.wordId]: value }
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  if (questions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>请先选择测验模式和等级</p>
      </div>
    )
  }

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === questions.length

  return (
    <div className={styles.quizContainer}>
      {/* 进度 */}
      <div className={styles.quizProgress}>
        <div className={styles.quizProgressText}>
          {currentIndex + 1} / {questions.length}
        </div>
        <div className={styles.quizProgressBar}>
          <div
            className={styles.quizProgressFill}
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>
        <div className={styles.answeredCount}>已答: {answeredCount}/{questions.length}</div>
      </div>

      {/* 题目 */}
      <div className={styles.questionCard}>
        <div className={styles.questionType}>
          {currentQuestion.type === 'choice' && '选择题'}
          {currentQuestion.type === 'fill' && '填空题'}
          {currentQuestion.type === 'reverse' && '反向选择'}
          {currentQuestion.type === 'listen' && '听力题'}
        </div>

        <h3 className={styles.questionText}>
          {currentQuestion.type === 'fill' || currentQuestion.type === 'reverse'
            ? currentQuestion.question
            : currentQuestion.question}
        </h3>

        {currentQuestion.type === 'choice' || currentQuestion.type === 'reverse' ? (
          <div className={styles.options}>
            {currentQuestion.options?.map((option: string, idx: number) => (
              <button
                key={idx}
                className={`${styles.optionBtn} ${selectedOption === option ? styles.selected : ''}`}
                onClick={() => handleSelect(option)}
              >
                <span className={styles.optionLetter}>{String.fromCharCode(65 + idx)}</span>
                <span className={styles.optionText}>{option}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.fillInput}>
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="输入日语单词"
              className={styles.inputField}
            />
          </div>
        )}
      </div>

      {/* 导航 */}
      <div className={styles.quizNav}>
        <button
          className={styles.navBtn}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ← 上一题
        </button>
        {currentIndex < questions.length - 1 ? (
          <button className={styles.navBtn} onClick={handleNext}>
            下一题 →
          </button>
        ) : (
          <button
            className={`${styles.submitBtn} ${allAnswered ? styles.ready : ''}`}
            onClick={onSubmit}
            disabled={!allAnswered}
          >
            提交测验
          </button>
        )}
      </div>
    </div>
  )
}

// 测验结果视图
function QuizResultView({
  results,
  onClose,
}: {
  results: { correct: number; total: number; results: any[] }
  onClose: () => void
}) {
  const accuracy = calculateAccuracy(results.correct, results.total)
  const comment = getAccuracyComment(accuracy)

  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultCard}>
        <h2 className={styles.resultTitle}>测验结果</h2>

        <div className={styles.scoreCircle}>
          <span className={styles.scoreValue}>{accuracy}%</span>
          <span className={styles.scoreLabel}>
            {results.correct}/{results.total} 正确
          </span>
        </div>

        <p className={styles.resultComment}>{comment}</p>

        <div className={styles.resultDetails}>
          {results.results.map((r, idx) => (
            <div key={idx} className={`${styles.resultItem} ${r.isCorrect ? styles.correct : styles.wrong}`}>
              <span className={styles.resultStatus}>{r.isCorrect ? '✓' : '✗'}</span>
              <span className={styles.resultQuestion}>{r.question}</span>
              <span className={styles.resultAnswer}>
                {r.type === 'fill' ? r.correctAnswer : r.userAnswer || '(未作答)'}
              </span>
              {!r.isCorrect && (
                <span className={styles.resultCorrect}>正确答案: {r.correctAnswer}</span>
              )}
            </div>
          ))}
        </div>

        <button className={styles.closeResultBtn} onClick={onClose}>
          返回学习
        </button>
      </div>
    </div>
  )
}

// 学习计划视图
function PlanView({
  stats,
  streakDays,
  completionEstimate,
  reviewReminder,
  quizCount,
  correctCount,
  onReset,
}: {
  stats: {
    total: number
    learned: number
    mastered: number
    byLevel: Record<Level, { total: number; learned: number; mastered: number }>
  }
  streakDays: number
  completionEstimate: string
  reviewReminder: string
  quizCount: number
  correctCount: number
  onReset: () => void
}) {
  const vocabStats = getVocabularyStats()
  const overallAccuracy = quizCount > 0 ? calculateAccuracy(correctCount, quizCount) : 0

  return (
    <div className={styles.planContainer}>
      {/* 概览卡片 */}
      <div className={styles.overviewCards}>
        <div className={styles.overviewCard}>
          <span className={styles.overviewIcon}>🔥</span>
          <span className={styles.overviewValue}>{streakDays}</span>
          <span className={styles.overviewLabel}>连续学习</span>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewIcon}>📚</span>
          <span className={styles.overviewValue}>{stats.learned}</span>
          <span className={styles.overviewLabel}>已学单词</span>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewIcon}>⭐</span>
          <span className={styles.overviewValue}>{stats.mastered}</span>
          <span className={styles.overviewLabel}>已掌握</span>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewIcon}>✏️</span>
          <span className={styles.overviewValue}>{quizCount}</span>
          <span className={styles.overviewLabel}>测验次数</span>
        </div>
      </div>

      {/* 复习提醒 */}
      <div className={styles.reminderCard}>
        <span className={styles.reminderIcon}>📅</span>
        <span className={styles.reminderText}>{reviewReminder}</span>
      </div>

      {/* 预估完成时间 */}
      <div className={styles.estimateCard}>
        <span className={styles.estimateIcon}>⏱️</span>
        <span className={styles.estimateText}>{completionEstimate}</span>
      </div>

      {/* 正确率 */}
      {quizCount > 0 && (
        <div className={styles.accuracyCard}>
          <h3>测验正确率</h3>
          <div className={styles.accuracyBar}>
            <div
              className={styles.accuracyFill}
              style={{
                width: `${overallAccuracy}%`,
                backgroundColor: overallAccuracy >= 80 ? '#4CAF50' : overallAccuracy >= 60 ? '#FF9800' : '#f44336',
              }}
            />
          </div>
          <span className={styles.accuracyText}>{overallAccuracy}%</span>
          <span className={styles.accuracyDetail}>
            {correctCount}/{quizCount} 正确
          </span>
        </div>
      )}

      {/* 等级进度 */}
      <div className={styles.levelProgress}>
        <h3>等级进度</h3>
        {(Object.keys(stats.byLevel) as Level[]).map(level => {
          const data = stats.byLevel[level]
          const progress = data.total > 0 ? (data.learned / data.total) * 100 : 0
          const levelStyle = getLevelBadgeStyle(level)

          return (
            <div key={level} className={styles.levelItem}>
              <div className={styles.levelHeader}>
                <span
                  className={styles.levelBadge}
                  style={{ backgroundColor: levelStyle.bg, color: levelStyle.text }}
                >
                  {levelStyle.label}
                </span>
                <span className={styles.levelCount}>
                  {data.learned}/{data.total}
                </span>
              </div>
              <div className={styles.levelBar}>
                <div
                  className={styles.levelFill}
                  style={{ width: `${progress}%`, backgroundColor: levelStyle.text }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* 重置按钮 */}
      <div className={styles.resetSection}>
        <button className={styles.resetBtn} onClick={onReset}>
          重置学习进度
        </button>
      </div>
    </div>
  )
}

// 主组件
export default function LabPage() {
  const {
    mode,
    setMode,
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    currentWords,
    progressMap,
    updateProgress,
    stats,
    streakDays,
    completionEstimate,
    reviewReminder,
    quizQuestions,
    quizAnswers,
    setQuizAnswers,
    startQuiz,
    currentQuizIndex,
    setCurrentQuizIndex,
    quizResults,
    submitQuiz,
    quizCount,
    correctCount,
    flippedCards,
    flipCard,
    favorites,
    toggleFavorite,
    resetProgress,
  } = useStudySystem()

  const [viewMode, setViewMode] = useState<ViewMode>('browse')
  const [quizType, setQuizType] = useState<'choice' | 'fill' | 'reverse' | 'mixed'>('mixed')

  // 统计
  const vocabStats = getVocabularyStats()

  return (
    <div className={styles.container}>
      {/* 头部 */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <span className={styles.chapterNum}>06</span>
          <div>
            <h1 className={styles.title}>日语学习实验室</h1>
            <p className={styles.subtitle}>JLPT N5-N1 · 考研日语 · 智能记忆系统</p>
          </div>
        </div>

        <div className={styles.headerStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.learned}</span>
            <span className={styles.statLabel}>已学</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{streakDays}</span>
            <span className={styles.statLabel}>连续天</span>
          </div>
        </div>
      </header>

      {/* 模式切换 */}
      <nav className={styles.modeNav}>
        {MODE_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`${styles.modeBtn} ${viewMode === opt.value ? styles.active : ''}`}
            onClick={() => setViewMode(opt.value)}
          >
            <span className={styles.modeIcon}>{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </nav>

      {/* 控制栏 */}
      <div className={styles.controls}>
        {/* 等级筛选 */}
        <div className={styles.levelFilter}>
          {LEVELS.map(level => (
            <button
              key={level}
              className={`${styles.levelBtn} ${selectedLevel === level ? styles.active : ''}`}
              onClick={() => setSelectedLevel(level)}
            >
              {LEVEL_LABELS[level]}
              {level !== 'all' && (
                <span className={styles.levelCount}>{vocabStats[level as Level]}</span>
              )}
            </button>
          ))}
        </div>

        {/* 搜索 */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="搜索词汇..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* 主内容区 */}
      <main className={styles.main}>
        {viewMode === 'browse' && (
          <div className={styles.browseGrid}>
            <p className={styles.resultCount}>
              共 {currentWords.length} 个词汇
            </p>
            <div className={styles.vocabGrid}>
              {currentWords.slice(0, 50).map(word => (
                <div key={word.id} className={styles.vocabItem}>
                  <span
                    className={styles.vocabLevel}
                    style={{ backgroundColor: getLevelBadgeStyle(word.level).bg }}
                  >
                    {getLevelBadgeStyle(word.level).label}
                  </span>
                  <span className={styles.vocabWord}>{word.word}</span>
                  <span className={styles.vocabReading}>{word.reading}</span>
                  <span className={styles.vocabMeaning}>{word.meaning}</span>
                </div>
              ))}
            </div>
            {currentWords.length > 50 && (
              <p className={styles.moreHint}>显示前50个词汇，进入记忆卡模式查看更多</p>
            )}
          </div>
        )}

        {viewMode === 'card' && (
          <CardStudyView
            words={currentWords}
            flippedCards={flippedCards}
            onFlipCard={flipCard}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onMarkLearned={(word, correct) => updateProgress(word.id, correct)}
          />
        )}

        {viewMode === 'quiz' && (
          <div className={styles.quizSection}>
            {!quizQuestions.length ? (
              <div className={styles.quizSetup}>
                <h3>选择测验模式</h3>
                <div className={styles.quizTypeOptions}>
                  {[
                    { value: 'mixed', label: '混合模式', desc: '选择题、填空题混合' },
                    { value: 'choice', label: '选择题', desc: '看日语选中文意思' },
                    { value: 'fill', label: '填空题', desc: '看中文写日语单词' },
                    { value: 'reverse', label: '反向选择', desc: '看中文选日语单词' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`${styles.quizTypeBtn} ${quizType === opt.value ? styles.active : ''}`}
                      onClick={() => setQuizType(opt.value as typeof quizType)}
                    >
                      <span className={styles.quizTypeLabel}>{opt.label}</span>
                      <span className={styles.quizTypeDesc}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
                <button
                  className={styles.startQuizBtn}
                  onClick={() => startQuiz(selectedLevel === 'all' ? 'N5' : selectedLevel as Level, quizType)}
                >
                  开始测验（15题）
                </button>
              </div>
            ) : quizResults ? (
              <QuizResultView
                results={quizResults}
                onClose={() => setQuizAnswers({})}
              />
            ) : (
              <QuizView
                questions={quizQuestions}
                answers={quizAnswers}
                setAnswers={setQuizAnswers}
                currentIndex={currentQuizIndex}
                setCurrentIndex={setCurrentQuizIndex}
                onSubmit={submitQuiz}
              />
            )}
          </div>
        )}

        {viewMode === 'plan' && (
          <PlanView
            stats={stats}
            streakDays={streakDays}
            completionEstimate={completionEstimate}
            reviewReminder={reviewReminder}
            quizCount={quizCount}
            correctCount={correctCount}
            onReset={resetProgress}
          />
        )}
      </main>
    </div>
  )
}