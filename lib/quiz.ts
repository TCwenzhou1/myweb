/**
 * 日语学习系统 - 自测模块
 * 支持选择题、填空题、听力题、反向测试
 */

import { VocabularyItem, QuizQuestion, QuizType, Level, getAllVocabulary, getVocabularyByLevel } from './japaneseData'

// 生成随机选项（用于选择题）
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 获取错误选项
function getWrongOptions(correctAnswer: string, allWords: VocabularyItem[], count: number = 3): string[] {
  const wrongAnswers = allWords
    .filter(w => w.meaning !== correctAnswer)
    .map(w => w.meaning)
  return shuffleArray(wrongAnswers).slice(0, count)
}

// 生成选择题（日语选中文）
export function generateChoiceQuestions(
  words: VocabularyItem[],
  count: number = 10
): QuizQuestion[] {
  const allWords = getAllVocabulary()
  const selectedWords = shuffleArray(words).slice(0, count)

  return selectedWords.map(word => {
    const wrongOptions = getWrongOptions(word.meaning, allWords, 3)
    const options = shuffleArray([word.meaning, ...wrongOptions])

    return {
      wordId: word.id,
      type: 'choice' as QuizType,
      question: word.word,
      options,
      correctAnswer: word.meaning,
    }
  })
}

// 生成填空题（看中文写日语）
export function generateFillQuestions(
  words: VocabularyItem[],
  count: number = 10
): QuizQuestion[] {
  const selectedWords = shuffleArray(words).slice(0, count)

  return selectedWords.map(word => ({
    wordId: word.id,
    type: 'fill' as QuizType,
    question: word.meaning,
    correctAnswer: word.word,
  }))
}

// 生成反向选择题（中文选日语）
export function generateReverseChoiceQuestions(
  words: VocabularyItem[],
  count: number = 10
): QuizQuestion[] {
  const allWords = getAllVocabulary()
  const selectedWords = shuffleArray(words).slice(0, count)

  return selectedWords.map(word => {
    const wrongOptions = allWords
      .filter(w => w.word !== word.word)
      .slice(0, 3)
      .map(w => w.word)
    const options = shuffleArray([word.word, ...wrongOptions])

    return {
      wordId: word.id,
      type: 'reverse' as QuizType,
      question: word.meaning,
      options,
      correctAnswer: word.word,
    }
  })
}

// 生成混合测验
export function generateMixedQuiz(
  words: VocabularyItem[],
  count: number = 20
): QuizQuestion[] {
  const selectedWords = shuffleArray(words).slice(0, count)
  const questions: QuizQuestion[] = []

  selectedWords.forEach((word, index) => {
    const questionType = index % 4

    switch (questionType) {
      case 0: {
        // 选择题
        const wrongOptions = getWrongOptions(word.meaning, getAllVocabulary(), 3)
        questions.push({
          wordId: word.id,
          type: 'choice',
          question: word.word,
          options: shuffleArray([word.meaning, ...wrongOptions]),
          correctAnswer: word.meaning,
        })
        break
      }
      case 1: {
        // 填空题
        questions.push({
          wordId: word.id,
          type: 'fill',
          question: word.meaning,
          correctAnswer: word.word,
        })
        break
      }
      case 2: {
        // 反向选择
        const allWords = getAllVocabulary()
        const wrongOptions = allWords
          .filter(w => w.word !== word.word)
          .slice(0, 3)
          .map(w => w.word)
        questions.push({
          wordId: word.id,
          type: 'reverse',
          question: word.meaning,
          options: shuffleArray([word.word, ...wrongOptions]),
          correctAnswer: word.word,
        })
        break
      }
      case 3: {
        // 听力选择题（这里用罗马音代替听力）
        const wrongOptions = getWrongOptions(word.romaji || word.reading, getAllVocabulary().map(w => ({ ...w, meaning: w.romaji || w.reading })) as VocabularyItem[], 3)
        questions.push({
          wordId: word.id,
          type: 'choice',
          question: word.romaji || word.reading,
          options: shuffleArray([word.word, ...wrongOptions]),
          correctAnswer: word.word,
        })
        break
      }
    }
  })

  return shuffleArray(questions)
}

// 批改测验
export function gradeQuiz(
  questions: QuizQuestion[],
  answers: Record<string, string>
): { correct: number; total: number; results: QuizQuestion[] } {
  let correct = 0

  const results = questions.map(q => {
    const userAnswer = answers[q.wordId] || ''
    const isCorrect = userAnswer === q.correctAnswer
    if (isCorrect) correct++

    return {
      ...q,
      userAnswer,
      isCorrect,
    }
  })

  return {
    correct,
    total: questions.length,
    results,
  }
}

// 获取指定等级的测验题目
export function getQuizByLevel(level: Level, type: 'choice' | 'fill' | 'reverse' | 'mixed' = 'mixed', count: number = 10): QuizQuestion[] {
  const words = getVocabularyByLevel(level)

  switch (type) {
    case 'choice':
      return generateChoiceQuestions(words, count)
    case 'fill':
      return generateFillQuestions(words, count)
    case 'reverse':
      return generateReverseChoiceQuestions(words, count)
    case 'mixed':
    default:
      return generateMixedQuiz(words, count)
  }
}

// 获取每日复习题目（从已学习的词中抽取）
export function getDailyReviewQuiz(
  learnedWordIds: string[],
  count: number = 20
): QuizQuestion[] {
  const allWords = getAllVocabulary()
  const learnedWords = allWords.filter(w => learnedWordIds.includes(w.id))

  if (learnedWords.length === 0) {
    return []
  }

  return generateMixedQuiz(learnedWords, Math.min(count, learnedWords.length))
}

// 计算正确率
export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

// 获取正确率评价
export function getAccuracyComment(accuracy: number): string {
  if (accuracy >= 90) return '优秀！继续保持！🎉'
  if (accuracy >= 80) return '很好！再接再厉！✨'
  if (accuracy >= 70) return '不错，还可以更好！💪'
  if (accuracy >= 60) return '需要多加练习哦 📚'
  return '别灰心，多复习一下 💪'
}