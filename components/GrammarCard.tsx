'use client'

import { useState } from 'react'
import { GrammarPoint } from '@/lib/japaneseData'
import { C, FONTS, EASE } from '@/components/CinematicUI'

interface GrammarCardProps {
  item: GrammarPoint
  isLearned: boolean
  isMastered: boolean
  onLearn: (id: string) => void
  onMaster: (id: string) => void
  onUnmaster: (id: string) => void
}

export default function GrammarCard({
  item,
  isLearned,
  isMastered,
  onLearn,
  onMaster,
  onUnmaster,
}: GrammarCardProps) {
  const [showDetail, setShowDetail] = useState(false)

  const levelColors = {
    N5: { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
    N4: { bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9' },
    N3: { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
  }

  const levelStyle = levelColors[item.level]

  return (
    <div
      className="grammar-card"
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
      {/* 顶部：等级 */}
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
            fontFamily: '"Bodoni Moda", serif',
            fontSize: '16px',
            color: C.gold,
            opacity: 0.6,
          }}
        >
          文法
        </span>
      </div>

      {/* 语法句型 */}
      <div style={{ marginBottom: '12px' }}>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 'clamp(18px, 2.2vw, 24px)',
            fontWeight: 400,
            color: C.ink,
            marginBottom: '6px',
            letterSpacing: '0.01em',
            lineHeight: 1.3,
          }}
        >
          {item.pattern}
        </h3>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: '14px',
            fontWeight: 400,
            color: C.inkMid,
          }}
        >
          {item.meaning}
        </p>
      </div>

      {/* 详细面板 */}
      {showDetail && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: `0.5px solid ${C.goldPale}`,
          }}
        >
          <p style={{
            fontFamily: FONTS.body,
            fontSize: '13px',
            color: C.inkDim,
            lineHeight: 1.7,
            marginBottom: '12px',
          }}>
            {item.explanation}
          </p>
          {item.example && (
            <div style={{
              background: `${C.goldChamp}10`,
              padding: '12px',
              borderRadius: '8px',
              border: `0.5px solid ${C.goldPale}40`,
            }}>
              <p style={{
                fontFamily: FONTS.body,
                fontSize: '14px',
                color: C.ink,
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
        </div>
      )}

      {/* 操作按钮 */}
      <div
        className="grammar-actions"
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
