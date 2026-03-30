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

  const levelColors: Record<string, { bg: string; text: string; border: string }> = {
    N5: { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
    N4: { bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9' },
    N3: { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
    N2: { bg: '#F3E5F5', text: '#7B1FA2', border: '#CE93D8' },
    N1: { bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A' },
    '考研': { bg: '#E8F5E9', text: '#1B5E20', border: '#81C784' },
  }

  const levelStyle = levelColors[item.level] || levelColors.N5

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
      {/* 顶部：等级 + 词性 + 标签 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: levelStyle.text,
              background: levelStyle.bg,
              padding: '3px 10px',
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
            {item.partOfSpeech}
          </span>
        </div>
        {item.tags && item.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {item.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '9px',
                  color: C.gold,
                  padding: '2px 6px',
                  background: `${C.goldChamp}15`,
                  borderRadius: '3px',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
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
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: '14px',
              fontWeight: 300,
              color: C.inkDim,
            }}
          >
            {item.kana}
          </p>
          {item.romaji && (
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: '12px',
                fontWeight: 300,
                color: C.inkFaint,
              }}
            >
              {item.romaji}
            </p>
          )}
        </div>
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
      {showDetail && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: `0.5px solid ${C.goldPale}`,
          }}
        >
          {/* 发音提示 */}
          {item.pronunciation && (
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{
                fontFamily: FONTS.body,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: C.gold,
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                发音
              </h4>
              <p style={{
                fontFamily: FONTS.body,
                fontSize: '13px',
                color: C.inkDim,
                lineHeight: 1.6,
              }}>
                {item.pronunciation}
              </p>
            </div>
          )}

          {/* 核心用法 */}
          {item.usageCore && (
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{
                fontFamily: FONTS.body,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: C.gold,
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                核心用法
              </h4>
              <p style={{
                fontFamily: FONTS.body,
                fontSize: '13px',
                color: C.inkDim,
                lineHeight: 1.6,
              }}>
                {item.usageCore}
              </p>
            </div>
          )}

          {/* 高频句型 */}
          {item.usagePatterns && item.usagePatterns.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{
                fontFamily: FONTS.body,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: C.gold,
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}>
                高频句型
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item.usagePatterns.map((pattern, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: '12px',
                      color: C.inkMid,
                      padding: '4px 10px',
                      background: `${C.goldChamp}10`,
                      borderRadius: '4px',
                      border: `0.5px solid ${C.goldPale}40`,
                    }}
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 常见搭配 */}
          {item.collocations && item.collocations.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{
                fontFamily: FONTS.body,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: C.gold,
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}>
                常见搭配
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item.collocations.map((col, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: '12px',
                      color: C.inkDim,
                    }}
                  >
                    • {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 考试提醒 */}
          {item.examFocus && (
            <div style={{
              marginBottom: '12px',
              padding: '10px 12px',
              background: `${C.goldChamp}10`,
              borderRadius: '8px',
              border: `0.5px solid ${C.goldPale}40`,
            }}>
              <h4 style={{
                fontFamily: FONTS.body,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: C.gold,
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                考试提醒
              </h4>
              <p style={{
                fontFamily: FONTS.body,
                fontSize: '13px',
                color: C.inkDim,
                lineHeight: 1.6,
              }}>
                {item.examFocus}
              </p>
            </div>
          )}

          {/* 例句 */}
          {item.examples && item.examples.length > 0 && (
            <div>
              <h4 style={{
                fontFamily: FONTS.body,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: C.gold,
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                例句
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {item.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      background: C.bg,
                      borderRadius: '8px',
                    }}
                  >
                    <p style={{
                      fontFamily: FONTS.body,
                      fontSize: '14px',
                      color: C.ink,
                      lineHeight: 1.6,
                      marginBottom: '2px',
                    }}>
                      {ex.jp}
                    </p>
                    {ex.kana && (
                      <p style={{
                        fontFamily: FONTS.body,
                        fontSize: '12px',
                        color: C.inkFaint,
                        marginBottom: '4px',
                      }}>
                        {ex.kana}
                      </p>
                    )}
                    <p style={{
                      fontFamily: FONTS.body,
                      fontSize: '13px',
                      color: C.inkDim,
                    }}>
                      {ex.zh}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 操作按钮 */}
      <div
        className="vocab-actions"
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '12px',
          opacity: showDetail ? 1 : 0.7,
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
