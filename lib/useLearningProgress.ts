'use client'

import { useState, useEffect, useCallback } from 'react'

export interface LearningProgress {
  vocabularyLearned: string[] // 已学习词汇ID
  vocabularyMastered: string[] // 已掌握词汇ID
  grammarLearned: string[] // 已学习语法ID
  grammarMastered: string[] // 已掌握语法ID
  lastStudyDate: string | null
  totalStudyDays: number
  streakDays: number
}

const STORAGE_KEY = 'japanese-learning-progress'

const initialProgress: LearningProgress = {
  vocabularyLearned: [],
  vocabularyMastered: [],
  grammarLearned: [],
  grammarMastered: [],
  lastStudyDate: null,
  totalStudyDays: 0,
  streakDays: 0,
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(initialProgress)
  const [isLoaded, setIsLoaded] = useState(false)

  // 从 localStorage 加载进度
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as LearningProgress
        setProgress(parsed)
      }
    } catch (error) {
      console.error('Failed to load learning progress:', error)
    }
    setIsLoaded(true)
  }, [])

  // 保存到 localStorage
  const saveProgress = useCallback((newProgress: LearningProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
    } catch (error) {
      console.error('Failed to save learning progress:', error)
    }
  }, [])

  // 更新学习日期统计
  const updateStudyStats = useCallback(() => {
    setProgress(prev => {
      const today = new Date().toISOString().split('T')[0]
      const lastDate = prev.lastStudyDate

      let newStreakDays = prev.streakDays
      let newTotalDays = prev.totalStudyDays

      if (lastDate !== today) {
        if (lastDate) {
          const lastStudy = new Date(lastDate)
          const todayDate = new Date(today)
          const diffDays = Math.floor((todayDate.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24))

          if (diffDays === 1) {
            newStreakDays = prev.streakDays + 1
          } else if (diffDays > 1) {
            newStreakDays = 1
          }
        } else {
          newStreakDays = 1
        }
        newTotalDays += 1
      }

      const newProgress = {
        ...prev,
        lastStudyDate: today,
        totalStudyDays: newTotalDays,
        streakDays: newStreakDays,
      }

      saveProgress(newProgress)
      return newProgress
    })
  }, [saveProgress])

  // 学习词汇
  const learnVocabulary = useCallback((id: string) => {
    setProgress(prev => {
      if (prev.vocabularyLearned.includes(id)) return prev

      const newProgress = {
        ...prev,
        vocabularyLearned: [...prev.vocabularyLearned, id],
      }

      saveProgress(newProgress)
      updateStudyStats()
      return newProgress
    })
  }, [saveProgress, updateStudyStats])

  // 掌握词汇
  const masterVocabulary = useCallback((id: string) => {
    setProgress(prev => {
      if (prev.vocabularyMastered.includes(id)) return prev
      if (!prev.vocabularyLearned.includes(id)) return prev

      const newProgress = {
        ...prev,
        vocabularyMastered: [...prev.vocabularyMastered, id],
      }

      saveProgress(newProgress)
      return newProgress
    })
  }, [saveProgress])

  // 取消掌握
  const unmasterVocabulary = useCallback((id: string) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        vocabularyMastered: prev.vocabularyMastered.filter(vid => vid !== id),
      }

      saveProgress(newProgress)
      return newProgress
    })
  }, [saveProgress])

  // 学习语法
  const learnGrammar = useCallback((id: string) => {
    setProgress(prev => {
      if (prev.grammarLearned.includes(id)) return prev

      const newProgress = {
        ...prev,
        grammarLearned: [...prev.grammarLearned, id],
      }

      saveProgress(newProgress)
      updateStudyStats()
      return newProgress
    })
  }, [saveProgress, updateStudyStats])

  // 掌握语法
  const masterGrammar = useCallback((id: string) => {
    setProgress(prev => {
      if (prev.grammarMastered.includes(id)) return prev
      if (!prev.grammarLearned.includes(id)) return prev

      const newProgress = {
        ...prev,
        grammarMastered: [...prev.grammarMastered, id],
      }

      saveProgress(newProgress)
      return newProgress
    })
  }, [saveProgress])

  // 取消掌握
  const unmasterGrammar = useCallback((id: string) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        grammarMastered: prev.grammarMastered.filter(gid => gid !== id),
      }

      saveProgress(newProgress)
      return newProgress
    })
  }, [saveProgress])

  // 重置进度
  const resetProgress = useCallback(() => {
    setProgress(initialProgress)
    saveProgress(initialProgress)
  }, [saveProgress])

  // 获取统计数据
  const stats = {
    vocabularyLearnedCount: progress.vocabularyLearned.length,
    vocabularyMasteredCount: progress.vocabularyMastered.length,
    grammarLearnedCount: progress.grammarLearned.length,
    grammarMasteredCount: progress.grammarMastered.length,
    totalStudyDays: progress.totalStudyDays,
    streakDays: progress.streakDays,
    lastStudyDate: progress.lastStudyDate,
  }

  return {
    progress,
    stats,
    isLoaded,
    learnVocabulary,
    masterVocabulary,
    unmasterVocabulary,
    learnGrammar,
    masterGrammar,
    unmasterGrammar,
    resetProgress,
  }
}
