'use client'

import { useState } from 'react'
import { VocabularyItem, getLevelBadgeStyle, getPartOfSpeechZh } from '@/lib/japaneseData'
import styles from './VocabularyCard.module.css'

interface VocabularyCardProps {
  item: VocabularyItem
  isLearned: boolean
  isMastered: boolean
  onLearn: () => void
  onMaster: () => void
  onUnmaster: () => void
}

export default function VocabularyCard({
  item,
  isLearned,
  isMastered,
  onLearn,
  onMaster,
  onUnmaster,
}: VocabularyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const levelStyle = getLevelBadgeStyle(item.level)

  const handleMarkLearned = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isMastered) {
      onUnmaster()
    } else {
      onMaster()
    }
  }

  return (
    <div className={styles.card} onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}>
        {/* 正面 - 单词 */}
        <div className={styles.front}>
          <div className={styles.header}>
            <span
              className={styles.levelBadge}
              style={{
                backgroundColor: levelStyle.bg,
                color: levelStyle.text,
                borderColor: levelStyle.border,
              }}
            >
              {levelStyle.label}
            </span>
            <span className={styles.posTag}>{getPartOfSpeechZh(item.partOfSpeech)}</span>
            {isMastered && <span className={styles.masteredBadge}>已掌握 ⭐</span>}
          </div>

          <div className={styles.mainContent}>
            <h3 className={styles.word}>{item.word}</h3>
            <p className={styles.reading}>{item.reading}</p>
            {item.tone && <span className={styles.tone}>音调 {item.tone}</span>}
            {item.romaji && <p className={styles.romaji}>{item.romaji}</p>}
          </div>

          <p className={styles.hint}>点击查看释义</p>
        </div>

        {/* 背面 - 释义 */}
        <div className={styles.back}>
          <div className={styles.header}>
            <span
              className={styles.levelBadge}
              style={{
                backgroundColor: levelStyle.bg,
                color: levelStyle.text,
                borderColor: levelStyle.border,
              }}
            >
              {levelStyle.label}
            </span>
            <span className={styles.posTag}>{getPartOfSpeechZh(item.partOfSpeech)}</span>
          </div>

          <div className={styles.mainContent}>
            <h3 className={styles.meaning}>{item.meaning}</h3>
          </div>

          {item.example && (
            <div className={styles.example}>
              <p className={styles.exampleText}>{item.example}</p>
              {item.exampleMeaning && (
                <p className={styles.exampleMeaning}>{item.exampleMeaning}</p>
              )}
            </div>
          )}

          {item.collocation && item.collocation.length > 0 && (
            <div className={styles.collocation}>
              <span className={styles.detailLabel}>搭配：</span>
              {item.collocation.slice(0, 3).join('、')}
            </div>
          )}

          {item.examTip && (
            <div className={styles.examTip}>
              <span className={styles.detailLabel}>考试提示：</span>
              {item.examTip}
            </div>
          )}

          <p className={styles.hint}>点击返回</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${isMastered ? styles.mastered : ''}`}
          onClick={handleMarkLearned}
        >
          {isMastered ? '取消掌握' : '标记掌握'}
        </button>
      </div>
    </div>
  )
}