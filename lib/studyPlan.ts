/**
 * 日语学习系统 - 学习计划模块
 * 基于艾宾浩斯遗忘曲线的智能复习系统
 */

import { Level, WordProgress, DailyPlan, StudyPlan, VocabularyItem, getAllVocabulary, getVocabularyByLevel } from './japaneseData'

// 艾宾浩斯遗忘曲线间隔（天）
const REVIEW_INTERVALS = [1, 2, 4, 7, 15, 30, 60, 120]

// 默认学习计划
export const DEFAULT_STUDY_PLAN: StudyPlan = {
  dailyNewWords: 20,
  dailyReviewWords: 50,
  startDate: new Date().toISOString().split('T')[0],
  currentLevel: 'N5',
  targetLevel: 'N1',
}

// 创建新的单词进度
export function createNewWordProgress(wordId: string, level: Level): WordProgress {
  const today = new Date().toISOString().split('T')[0]
  return {
    wordId,
    level,
    state: 'new',
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReviewDate: today,
    lastReviewDate: today,
    correctCount: 0,
    wrongCount: 0,
  }
}

// 计算下次复习日期（基于艾宾浩斯）
export function calculateNextReview(progress: WordProgress, isCorrect: boolean): string {
  const nextDate = new Date()

  if (isCorrect) {
    // 答对了：根据重复次数增加间隔
    const intervalDays = REVIEW_INTERVALS[Math.min(progress.repetitions, REVIEW_INTERVALS.length - 1)]
    nextDate.setDate(nextDate.getDate() + intervalDays)
  } else {
    // 答错了：缩短间隔，重新开始
    nextDate.setDate(nextDate.getDate() + 1)
  }

  return nextDate.toISOString().split('T')[0]
}

// 更新单词进度
export function updateWordProgress(
  progress: WordProgress,
  isCorrect: boolean
): WordProgress {
  const now = new Date().toISOString().split('T')[0]

  if (isCorrect) {
    const newRepetitions = progress.repetitions + 1
    const newEaseFactor = Math.max(1.3, progress.easeFactor + 0.1)
    const newInterval = REVIEW_INTERVALS[Math.min(newRepetitions, REVIEW_INTERVALS.length - 1)]

    return {
      ...progress,
      state: newRepetitions >= 5 ? 'mastered' : 'reviewing',
      easeFactor: newEaseFactor,
      interval: newInterval,
      repetitions: newRepetitions,
      nextReviewDate: calculateNextReview({ ...progress, repetitions: newRepetitions }, true),
      lastReviewDate: now,
      correctCount: progress.correctCount + 1,
    }
  } else {
    return {
      ...progress,
      state: 'learning',
      easeFactor: Math.max(1.3, progress.easeFactor - 0.2),
      interval: 1,
      repetitions: 0,
      nextReviewDate: calculateNextReview({ ...progress, repetitions: 0 }, false),
      lastReviewDate: now,
      wrongCount: progress.wrongCount + 1,
    }
  }
}

// 获取今天的日期字符串
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

// 检查是否需要复习
export function needsReview(progress: WordProgress): boolean {
  const today = getTodayString()
  return progress.nextReviewDate <= today && progress.state !== 'new'
}

// 获取今日学习计划
export function getDailyPlan(
  plan: StudyPlan,
  progressMap: Record<string, WordProgress>
): DailyPlan {
  const today = getTodayString()
  const allWords = getVocabularyByLevel(plan.currentLevel)
  const todayStr = new Date().toISOString().split('T')[0]

  // 获取需要复习的单词
  const reviewWords = allWords
    .filter(w => {
      const progress = progressMap[w.id]
      return progress && needsReview(progress)
    })
    .map(w => w.id)

  // 获取新词（还未学习过的）
  const learnedWordIds = Object.keys(progressMap)
  const newWords = allWords
    .filter(w => !learnedWordIds.includes(w.id))
    .slice(0, plan.dailyNewWords)
    .map(w => w.id)

  return {
    date: todayStr,
    newWords,
    reviewWords,
    completedNew: 0,
    completedReview: 0,
    totalNew: newWords.length,
    totalReview: Math.min(reviewWords.length, plan.dailyReviewWords),
  }
}

// 计算学习进度
export function calculateStudyProgress(
  progressMap: Record<string, WordProgress>
): {
  total: number
  learned: number
  mastered: number
  byLevel: Record<Level, { total: number; learned: number; mastered: number }>
} {
  const allWords = getAllVocabulary()

  const byLevel: Record<Level, { total: number; learned: number; mastered: number }> = {
    N5: { total: 0, learned: 0, mastered: 0 },
    N4: { total: 0, learned: 0, mastered: 0 },
    N3: { total: 0, learned: 0, mastered: 0 },
    N2: { total: 0, learned: 0, mastered: 0 },
    N1: { total: 0, learned: 0, mastered: 0 },
    '考研': { total: 0, learned: 0, mastered: 0 },
  }

  let total = 0
  let learned = 0
  let mastered = 0

  allWords.forEach(word => {
    total++
    byLevel[word.level].total++

    const progress = progressMap[word.id]
    if (progress) {
      learned++
      byLevel[word.level].learned++

      if (progress.state === 'mastered') {
        mastered++
        byLevel[word.level].mastered++
      }
    }
  })

  return { total, learned, mastered, byLevel }
}

// 保存/加载进度（localStorage）
const PROGRESS_KEY = 'japanese_study_progress'
const PLAN_KEY = 'japanese_study_plan'
const DAILY_KEY = 'japanese_daily_plan'

export function saveProgress(progressMap: Record<string, WordProgress>): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap))
}

export function loadProgress(): Record<string, WordProgress> {
  if (typeof window === 'undefined') return {}
  const stored = localStorage.getItem(PROGRESS_KEY)
  return stored ? JSON.parse(stored) : {}
}

export function savePlan(plan: StudyPlan): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan))
}

export function loadPlan(): StudyPlan {
  if (typeof window === 'undefined') return DEFAULT_STUDY_PLAN
  const stored = localStorage.getItem(PLAN_KEY)
  return stored ? JSON.parse(stored) : DEFAULT_STUDY_PLAN
}

export function saveDailyPlan(dailyPlan: DailyPlan): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(DAILY_KEY, JSON.stringify(dailyPlan))
}

export function loadDailyPlan(): DailyPlan | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(DAILY_KEY)
  if (!stored) return null

  const plan: DailyPlan = JSON.parse(stored)
  const today = getTodayString()

  // 如果不是今天的计划，返回 null
  if (plan.date !== today) return null

  return plan
}

// 重置学习进度
export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PROGRESS_KEY)
  localStorage.removeItem(DAILY_KEY)
}

// 获取连续学习天数
export function getStreakDays(): number {
  if (typeof window === 'undefined') return 0

  const lastStudy = localStorage.getItem('japanese_last_study_date')
  if (!lastStudy) return 0

  const today = getTodayString()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  if (lastStudy === today) {
    return parseInt(localStorage.getItem('japanese_streak_days') || '1', 10)
  } else if (lastStudy === yesterdayStr) {
    const streak = parseInt(localStorage.getItem('japanese_streak_days') || '1', 10)
    return streak
  }

  return 0
}

export function updateStreak(): number {
  if (typeof window === 'undefined') return 0

  const today = getTodayString()
  const lastStudy = localStorage.getItem('japanese_last_study_date')
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  let streak = 1

  if (lastStudy === today) {
    // 今天已经更新过
    return parseInt(localStorage.getItem('japanese_streak_days') || '1', 10)
  } else if (lastStudy === yesterdayStr) {
    // 连续学习
    streak = parseInt(localStorage.getItem('japanese_streak_days') || '0', 10) + 1
  }

  localStorage.setItem('japanese_last_study_date', today)
  localStorage.setItem('japanese_streak_days', streak.toString())

  return streak
}

// 格式化日期显示
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

// 获取复习提醒
export function getReviewReminder(progressMap: Record<string, WordProgress>): string {
  const today = getTodayString()
  const reviewCount = Object.values(progressMap).filter(p => needsReview(p)).length

  if (reviewCount === 0) {
    return '今日没有需要复习的单词 🎉'
  }

  return `今日有 ${reviewCount} 个单词需要复习 📚`
}

// 预估完成时间
export function estimateCompletionTime(
  currentLevel: Level,
  targetLevel: Level,
  dailyWords: number,
  progressMap: Record<string, WordProgress>
): string {
  const levels: Level[] = ['N5', 'N4', 'N3', 'N2', 'N1', '考研']
  const currentIndex = levels.indexOf(currentLevel)
  const targetIndex = levels.indexOf(targetLevel)

  let totalWords = 0
  for (let i = currentIndex; i <= targetIndex; i++) {
    const levelWords = getVocabularyByLevel(levels[i])
    const learnedCount = levelWords.filter(w => progressMap[w.id]).length
    totalWords += levelWords.length - learnedCount
  }

  if (totalWords === 0) return '恭喜！你已完成目标！🎉'

  const days = Math.ceil(totalWords / dailyWords)
  const months = Math.ceil(days / 30)

  if (months >= 12) {
    return `预计需要 ${Math.round(months / 12)} 年左右`
  } else if (months >= 3) {
    return `预计需要 ${months} 个月左右`
  } else {
    return `预计需要 ${days} 天左右`
  }
}