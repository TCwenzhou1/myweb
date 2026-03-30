/**
 * 日语学习系统 - 学习系统 Hook
 * 整合学习、测验、进度管理
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  VocabularyItem,
  WordProgress,
  DailyPlan,
  StudyPlan,
  Level,
  StudyMode,
  QuizQuestion,
  getAllVocabulary,
  getVocabularyByLevel,
  searchVocabulary,
} from './japaneseData'
import {
  createNewWordProgress,
  updateWordProgress,
  saveProgress,
  loadProgress,
  savePlan,
  loadPlan,
  saveDailyPlan,
  loadDailyPlan,
  getDailyPlan,
  calculateStudyProgress,
  getStreakDays,
  updateStreak,
  DEFAULT_STUDY_PLAN,
  getTodayString,
  needsReview,
  estimateCompletionTime,
  getReviewReminder,
} from './studyPlan'
import {
  generateChoiceQuestions,
  generateFillQuestions,
  generateReverseChoiceQuestions,
  generateMixedQuiz,
  gradeQuiz,
  getQuizByLevel,
  calculateAccuracy,
  getAccuracyComment,
} from './quiz'

// 学习系统状态
export interface StudySystemState {
  // 模式
  mode: StudyMode
  setMode: (mode: StudyMode) => void

  // 等级筛选
  selectedLevel: Level | 'all'
  setSelectedLevel: (level: Level | 'all') => void

  // 搜索
  searchQuery: string
  setSearchQuery: (query: string) => void

  // 当前显示的词汇
  currentWords: VocabularyItem[]

  // 学习进度
  progressMap: Record<string, WordProgress>
  updateProgress: (wordId: string, isCorrect: boolean) => void

  // 学习计划
  studyPlan: StudyPlan
  updateStudyPlan: (plan: Partial<StudyPlan>) => void

  // 每日计划
  dailyPlan: DailyPlan | null

  // 统计
  stats: {
    total: number
    learned: number
    mastered: number
    byLevel: Record<Level, { total: number; learned: number; mastered: number }>
  }

  // 连续学习天数
  streakDays: number

  // 预估完成时间
  completionEstimate: string

  // 复习提醒
  reviewReminder: string

  // 测验相关
  quizQuestions: QuizQuestion[]
  quizAnswers: Record<string, string>
  setQuizAnswers: (answers: Record<string, string>) => void
  startQuiz: (level: Level | 'all', type: 'choice' | 'fill' | 'reverse' | 'mixed') => void
  currentQuizIndex: number
  setCurrentQuizIndex: (index: number) => void
  quizResults: ReturnType<typeof gradeQuiz> | null
  submitQuiz: () => void
  quizCount: number
  correctCount: number

  // 卡片翻转状态
  flippedCards: Set<string>
  flipCard: (wordId: string) => void

  // 收藏/笔记
  favorites: Set<string>
  toggleFavorite: (wordId: string) => void

  // 重置
  resetProgress: () => void
}

export function useStudySystem(): StudySystemState {
  // 模式状态
  const [mode, setMode] = useState<StudyMode>('browse')
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // 进度状态
  const [progressMap, setProgressMap] = useState<Record<string, WordProgress>>({})

  // 计划状态
  const [studyPlan, setStudyPlan] = useState<StudyPlan>(DEFAULT_STUDY_PLAN)

  // 每日计划
  const [dailyPlan, setDailyPlan] = useState<DailyPlan | null>(null)

  // 测验状态
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizResults, setQuizResults] = useState<ReturnType<typeof gradeQuiz> | null>(null)
  const [quizCount, setQuizCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)

  // 卡片翻转
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  // 收藏
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // 连续学习天数
  const [streakDays, setStreakDays] = useState(0)

  // 初始化加载
  useEffect(() => {
    const loadedProgress = loadProgress()
    const loadedPlan = loadPlan()
    const loadedDailyPlan = loadDailyPlan()

    setProgressMap(loadedProgress)
    setStudyPlan(loadedPlan)
    setDailyPlan(loadedDailyPlan)
    setStreakDays(getStreakDays())

    // 加载收藏
    const storedFavorites = localStorage.getItem('japanese_favorites')
    if (storedFavorites) {
      setFavorites(new Set(JSON.parse(storedFavorites)))
    }
  }, [])

  // 计算当前显示的词汇
  const currentWords = useMemo(() => {
    let words: VocabularyItem[]

    if (selectedLevel === 'all') {
      words = getAllVocabulary()
    } else {
      words = getVocabularyByLevel(selectedLevel)
    }

    if (searchQuery.trim()) {
      words = searchVocabulary(searchQuery, selectedLevel === 'all' ? undefined : selectedLevel)
    }

    return words
  }, [selectedLevel, searchQuery])

  // 计算统计
  const stats = useMemo(() => {
    return calculateStudyProgress(progressMap)
  }, [progressMap])

  // 预估完成时间
  const completionEstimate = useMemo(() => {
    return estimateCompletionTime(studyPlan.currentLevel, studyPlan.targetLevel, studyPlan.dailyNewWords, progressMap)
  }, [studyPlan, progressMap])

  // 复习提醒
  const reviewReminder = useMemo(() => {
    return getReviewReminder(progressMap)
  }, [progressMap])

  // 更新进度
  const updateProgress = useCallback((wordId: string, isCorrect: boolean) => {
    setProgressMap(prev => {
      const wordProgress = prev[wordId] || createNewWordProgress(wordId, currentWords.find(w => w.id === wordId)?.level || 'N5')
      const updated = updateWordProgress(wordProgress, isCorrect)
      const newProgressMap = { ...prev, [wordId]: updated }
      saveProgress(newProgressMap)
      updateStreak()
      setStreakDays(getStreakDays())
      return newProgressMap
    })
  }, [currentWords])

  // 更新学习计划
  const updateStudyPlan = useCallback((plan: Partial<StudyPlan>) => {
    setStudyPlan(prev => {
      const updated = { ...prev, ...plan }
      savePlan(updated)
      return updated
    })
  }, [])

  // 开始测验
  const startQuiz = useCallback((level: Level | 'all', type: 'choice' | 'fill' | 'reverse' | 'mixed') => {
    const words = level === 'all' ? getAllVocabulary() : getVocabularyByLevel(level)
    let questions: QuizQuestion[]

    switch (type) {
      case 'choice':
        questions = generateChoiceQuestions(words, 15)
        break
      case 'fill':
        questions = generateFillQuestions(words, 15)
        break
      case 'reverse':
        questions = generateReverseChoiceQuestions(words, 15)
        break
      case 'mixed':
      default:
        questions = generateMixedQuiz(words, 15)
        break
    }

    setQuizQuestions(questions)
    setQuizAnswers({})
    setCurrentQuizIndex(0)
    setQuizResults(null)
    setMode('quiz')
  }, [])

  // 提交测验
  const submitQuiz = useCallback(() => {
    const results = gradeQuiz(quizQuestions, quizAnswers)
    setQuizResults(results)
    setQuizCount(prev => prev + results.total)
    setCorrectCount(prev => prev + results.correct)
    setMode('browse')
  }, [quizQuestions, quizAnswers])

  // 翻转卡片
  const flipCard = useCallback((wordId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(wordId)) {
        newSet.delete(wordId)
      } else {
        newSet.add(wordId)
      }
      return newSet
    })
  }, [])

  // 切换收藏
  const toggleFavorite = useCallback((wordId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev)
      if (newSet.has(wordId)) {
        newSet.delete(wordId)
      } else {
        newSet.add(wordId)
      }
      localStorage.setItem('japanese_favorites', JSON.stringify(Array.from(newSet)))
      return newSet
    })
  }, [])

  // 重置进度
  const resetProgress = useCallback(() => {
    if (typeof window !== 'undefined' && confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
      localStorage.removeItem('japanese_study_progress')
      localStorage.removeItem('japanese_daily_plan')
      localStorage.removeItem('japanese_last_study_date')
      localStorage.removeItem('japanese_streak_days')
      setProgressMap({})
      setDailyPlan(null)
      setStreakDays(0)
    }
  }, [])

  return {
    mode,
    setMode,
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    currentWords,
    progressMap,
    updateProgress,
    studyPlan,
    updateStudyPlan,
    dailyPlan,
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
  }
}

// 导出测验工具函数
export { calculateAccuracy, getAccuracyComment, getQuizByLevel }