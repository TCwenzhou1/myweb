'use client'

import { useState } from 'react'
import { VocabularyItem } from '@/lib/japaneseData'
import { C, FONTS, EASE } from '@/components/CinematicUI'

interface VocabularyCardProps {
  item: VocabularyItem
  isLearned: boolean
  isMastered: boolean
  onLearn: (id: string) => void
  onMaster: (id: string) => void
  onUnmaster: (id: string) => void
}

export default function VocabularyCard({
  item,
  isLearned,
  isMastered,
  onLearn,
  onMaster,
  onUnmaster,
}: VocabularyCardProps) {
  const [showDetail, setShowDetail] = useState(false)

  const levelColors = {
    N5: { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
    N4: { bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9' },
    N3: { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
  }

  const posLabels = {
    名: '名词',
    動: '动词',
    形: '形容词',
    副: '副词',
    助: '助词',
    連: '连语',
  }

  const levelStyle = levelColors[item.level]

  return (
    <div
      className="vocab-card"
      onClick={() => setShowDetail(!showDetail)}
      style={{
        position: 'relative',
        background: isMastered ? `${C.goldChamp}15` : C.cardIvory,
        border: `0.5px solid ${isMastered ? C.goldChamp : 'rgba(200,190,168,0.5)'}`,
        borderRadius: '12px',
        padding: 'clamp(16px, 2vw, 24px)',
        cursor: 'pointer',
        transition: `all 0.35s ${EASE.focus}`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.06)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* 顶部：等级 + 词性 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: levelStyle.text,
            background: levelStyle.bg,
            padding: '3px 8px',
            borderRadius: '4px',
            border: `0.5px solid ${levelStyle.border}`,
          }}
        >
          {item.level}
        </span>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.1em',
            color: C.inkFaint,
          }}
        >
          {posLabels[item.partOfSpeech]}
        </span>
      </div>

      {/* 词汇主体 */}
      <div style={{ marginBottom: '8px' }}>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 400,
            color: C.ink,
            marginBottom: '4px',
            letterSpacing: '0.02em',
          }}
        >
          {item.word}
        </h3>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: '14px',
            fontWeight: 300,
            color: C.inkDim,
            marginBottom: '2px',
          }}
        >
          {item.reading}
        </p>
      </div>

      {/* 释义 */}
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 'clamp(14px, 1.4vw, 16px)',
          fontWeight: 400,
          color: isMastered ? C.gold : C.inkMid,
        }}
      >
        {item.meaning}
      </p>

      {/* 详细面板 */}
      {showDetail && item.example && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: `0.5px solid ${C.goldPale}`,
          }}
        >
          <p style={{
            fontFamily: FONTS.body,
            fontSize: '14px',
            color: C.inkDim,
            marginBottom: '4px',
          }}>
            {item.example}
          </p>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: '13px',
            color: C.inkFaint,
          }}>
            {item.exampleMeaning}
          </p>
        </div>
      )}

      {/* 操作按钮 */}
      <div
        className="vocab-actions"
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '12px',
          opacity: showDetail ? 1 : 0,
          transition: `opacity 0.3s ${EASE.focus}`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {!isLearned ? (
          <button
            onClick={() => onLearn(item.id)}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontFamily: FONTS.body,
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: C.bg,
              background: C.gold,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: `all 0.3s ${EASE.focus}`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = C.goldRich
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = C.gold
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            标记已学
          </button>
        ) : (
          <button
            onClick={() => isMastered ? onUnmaster(item.id) : onMaster(item.id)}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontFamily: FONTS.body,
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: isMastered ? C.gold : C.bg,
              background: isMastered ? `${C.goldChamp}20` : C.gold,
              border: `0.5px solid ${isMastered ? C.goldChamp : 'transparent'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              transition: `all 0.3s ${EASE.focus}`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {isMastered ? '取消掌握' : '标记掌握'}
          </button>
        )}
      </div>

      {/* 已掌握标记 */}
      {isMastered && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: C.gold,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: C.bg, fontSize: '12px', fontWeight: 'bold' }}>✓</span>
        </div>
      )}
    </div>
  )
}
