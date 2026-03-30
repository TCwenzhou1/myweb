'use client'

import { useState, useMemo } from 'react'
import { CinematicSection, C, FONTS, EASE } from '@/components/CinematicUI'
import VocabularyCard from '@/components/VocabularyCard'
import GrammarCard from '@/components/GrammarCard'
import { useLearningProgress } from '@/lib/useLearningProgress'
import { allVocabulary, vocabularyByLevel, grammarByLevel, type VocabularyItem, type GrammarPoint } from '@/lib/japaneseData'

type StudyMode = 'vocabulary' | 'grammar'
type LevelFilter = 'all' | 'N5' | 'N4' | 'N3'

export default function LabContent() {
  const [mode, setMode] = useState<StudyMode>('vocabulary')
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const {
    stats,
    isLoaded,
    learnVocabulary,
    masterVocabulary,
    unmasterVocabulary,
    learnGrammar,
    masterGrammar,
    unmasterGrammar,
    resetProgress,
  } = useLearningProgress()

  // 过滤后的词汇
  const filteredVocabulary = useMemo(() => {
    let result = levelFilter === 'all'
      ? allVocabulary
      : vocabularyByLevel[levelFilter as keyof typeof vocabularyByLevel]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item: VocabularyItem) =>
          item.word.toLowerCase().includes(query) ||
          item.reading.toLowerCase().includes(query) ||
          item.meaning.toLowerCase().includes(query)
      )
    }

    return result
  }, [levelFilter, searchQuery])

  // 过滤后的语法
  const filteredGrammar = useMemo(() => {
    let result = levelFilter === 'all'
      ? grammarByLevel.N5.concat(grammarByLevel.N4, grammarByLevel.N3)
      : grammarByLevel[levelFilter as keyof typeof grammarByLevel]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item: GrammarPoint) =>
          item.pattern.toLowerCase().includes(query) ||
          item.meaning.toLowerCase().includes(query)
      )
    }

    return result
  }, [levelFilter, searchQuery])

  const currentItems = mode === 'vocabulary' ? filteredVocabulary : filteredGrammar

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景氛围 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 40% at 25% 20%, rgba(212,188,138,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 70% 85%, rgba(232,196,160,0.06) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 装饰性网格线 */}
      <div
        className="lab-grid-bg"
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(${C.goldPale}08 1px, transparent 1px),
            linear-gradient(90deg, ${C.goldPale}08 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.5,
        }}
      />

      {/* 主内容 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(100px, 12vh, 140px) clamp(24px, 5vw, 80px) clamp(60px, 8vh, 100px)',
        }}
      >
        {/* 页头 */}
        <CinematicSection delay={0}>
          <div style={{ marginBottom: 'clamp(40px, 6vh, 64px)' }}>
            {/* 场景标签 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: C.gold,
                  textTransform: 'uppercase',
                }}
              >
                03
              </span>
              <div
                style={{
                  width: '28px',
                  height: '0.5px',
                  background: `linear-gradient(to right, ${C.gold}, transparent)`,
                  opacity: 0.7,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  color: C.inkDim,
                  textTransform: 'uppercase',
                }}
              >
                Workshop
              </span>
            </div>

            {/* 主标题 */}
            <h1
              style={{
                fontFamily: FONTS.display,
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: C.ink,
                marginBottom: '16px',
              }}
            >
              考研日语
            </h1>

            {/* 副标题 */}
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                fontWeight: 300,
                letterSpacing: '0.04em',
                color: C.inkMid,
                marginBottom: '20px',
              }}
            >
              JLPT N5-N3 词汇与语法
            </p>

            {/* 装饰线 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div
                style={{
                  height: '0.5px',
                  background: `linear-gradient(to right, ${C.goldChamp}, ${C.goldPale})`,
                  opacity: 0.6,
                  width: '48px',
                }}
              />
              <div
                style={{
                  height: '0.5px',
                  background: `linear-gradient(to right, ${C.ink}, transparent)`,
                  opacity: 0.06,
                  width: '100%',
                }}
              />
            </div>

            {/* 描述 */}
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 'clamp(14px, 1.4vw, 16px)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.inkDim,
                maxWidth: '480px',
                marginTop: '20px',
              }}
            >
              备战考研日语203，系统记忆N5至N3核心词汇，掌握考研必备语法句型。
            </p>
          </div>
        </CinematicSection>

        {/* 学习进度卡片 */}
        <CinematicSection delay={100}>
          <div
            style={{
              background: C.cardIvory,
              border: `0.5px solid rgba(200,190,168,0.5)`,
              borderRadius: '16px',
              padding: 'clamp(20px, 3vw, 32px)',
              marginBottom: 'clamp(32px, 4vh, 48px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{
                fontFamily: FONTS.display,
                fontSize: '20px',
                fontWeight: 400,
                color: C.ink,
              }}>
                学习进度
              </h2>
              {stats.totalStudyDays > 0 && (
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: FONTS.body,
                    fontSize: '12px',
                    color: C.gold,
                    padding: '4px 10px',
                    background: `${C.goldChamp}15`,
                    borderRadius: '4px',
                  }}>
                    🔥 连续 {stats.streakDays} 天
                  </span>
                  <span style={{
                    fontFamily: FONTS.body,
                    fontSize: '12px',
                    color: C.inkDim,
                  }}>
                    共学习 {stats.totalStudyDays} 天
                  </span>
                </div>
              )}
            </div>

            {/* 统计数据 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
              <StatBox
                label="词汇已学"
                value={stats.vocabularyLearnedCount}
                total={allVocabulary.length}
                color={C.gold}
              />
              <StatBox
                label="词汇掌握"
                value={stats.vocabularyMasteredCount}
                total={allVocabulary.length}
                color={C.goldChamp}
              />
              <StatBox
                label="语法已学"
                value={stats.grammarLearnedCount}
                total={grammarByLevel.N5.length + grammarByLevel.N4.length + grammarByLevel.N3.length}
                color="#7B809A"
              />
              <StatBox
                label="语法掌握"
                value={stats.grammarMasteredCount}
                total={grammarByLevel.N5.length + grammarByLevel.N4.length + grammarByLevel.N3.length}
                color={C.goldRich}
              />
            </div>

            {/* 重置按钮 */}
            {stats.vocabularyLearnedCount > 0 && (
              <button
                onClick={resetProgress}
                style={{
                  marginTop: '16px',
                  padding: '8px 16px',
                  fontFamily: FONTS.body,
                  fontSize: '12px',
                  color: C.inkFaint,
                  background: 'transparent',
                  border: '0.5px solid rgba(200,190,168,0.3)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: `all 0.3s ${EASE.focus}`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.goldPale
                  e.currentTarget.style.color = C.inkDim
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,190,168,0.3)'
                  e.currentTarget.style.color = C.inkFaint
                }}
              >
                重置进度
              </button>
            )}
          </div>
        </CinematicSection>

        {/* 学习模式切换 */}
        <CinematicSection delay={150}>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}
          >
            <ModeButton
              active={mode === 'vocabulary'}
              onClick={() => setMode('vocabulary')}
            >
              📖 词汇学习
            </ModeButton>
            <ModeButton
              active={mode === 'grammar'}
              onClick={() => setMode('grammar')}
            >
              📝 语法学习
            </ModeButton>
          </div>
        </CinematicSection>

        {/* 等级筛选 */}
        <CinematicSection delay={200}>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}
          >
            <FilterButton
              active={levelFilter === 'all'}
              onClick={() => setLevelFilter('all')}
            >
              全部
            </FilterButton>
            <FilterButton
              active={levelFilter === 'N5'}
              onClick={() => setLevelFilter('N5')}
              color="#2E7D32"
            >
              N5
            </FilterButton>
            <FilterButton
              active={levelFilter === 'N4'}
              onClick={() => setLevelFilter('N4')}
              color="#1565C0"
            >
              N4
            </FilterButton>
            <FilterButton
              active={levelFilter === 'N3'}
              onClick={() => setLevelFilter('N3')}
              color="#E65100"
            >
              N3
            </FilterButton>
          </div>
        </CinematicSection>

        {/* 搜索框 */}
        <CinematicSection delay={250}>
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <input
              type="text"
              placeholder={mode === 'vocabulary' ? '搜索词汇、假名或释义...' : '搜索语法句型或含义...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px',
                paddingLeft: '48px',
                fontFamily: FONTS.body,
                fontSize: '15px',
                color: C.ink,
                background: C.cardIvory,
                border: `0.5px solid rgba(200,190,168,0.5)`,
                borderRadius: '12px',
                outline: 'none',
                transition: `all 0.3s ${EASE.focus}`,
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = C.goldChamp
                e.currentTarget.style.boxShadow = `0 0 0 3px ${C.goldChamp}20`
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(200,190,168,0.5)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '18px',
              opacity: 0.4,
            }}>
              🔍
            </span>
          </div>
        </CinematicSection>

        {/* 学习内容列表 */}
        <CinematicSection delay={300}>
          {isLoaded ? (
            <div>
              {/* 结果统计 */}
              <p style={{
                fontFamily: FONTS.body,
                fontSize: '13px',
                color: C.inkFaint,
                marginBottom: '16px',
              }}>
                共 {currentItems.length} 条结果
              </p>

              {/* 词汇卡片网格 */}
              {mode === 'vocabulary' && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {(filteredVocabulary as VocabularyItem[]).map((item) => (
                    <VocabularyCard
                      key={item.id}
                      item={item}
                      isLearned={false}
                      isMastered={false}
                      onLearn={learnVocabulary}
                      onMaster={masterVocabulary}
                      onUnmaster={unmasterVocabulary}
                    />
                  ))}
                </div>
              )}

              {/* 语法卡片网格 */}
              {mode === 'grammar' && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {(filteredGrammar as GrammarPoint[]).map((item) => (
                    <GrammarCard
                      key={item.id}
                      item={item}
                      isLearned={false}
                      isMastered={false}
                      onLearn={learnGrammar}
                      onMaster={masterGrammar}
                      onUnmaster={unmasterGrammar}
                    />
                  ))}
                </div>
              )}

              {/* 空状态 */}
              {currentItems.length === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: C.inkFaint,
                  }}
                >
                  <p style={{
                    fontFamily: FONTS.display,
                    fontSize: '24px',
                    marginBottom: '8px',
                  }}>
                    没有找到相关内容
                  </p>
                  <p style={{ fontFamily: FONTS.body, fontSize: '14px' }}>
                    尝试调整搜索关键词或筛选条件
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontFamily: FONTS.body, color: C.inkFaint }}>加载中...</p>
            </div>
          )}
        </CinematicSection>

        {/* 底部场景编号与导航 */}
        <CinematicSection delay={350}>
          <div
            style={{
              marginTop: 'clamp(60px, 8vh, 80px)',
              paddingTop: '24px',
              borderTop: '0.5px solid rgba(200,190,168,0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '13px',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: C.inkFaint,
                opacity: 0.6,
              }}
            >
              03 — 04
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              <a
                href="/projects"
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  color: C.inkDim,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  transition: `all 0.3s ${EASE.focus}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = C.inkMid
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = C.inkDim
                  e.currentTarget.style.opacity = '0.7'
                }}
              >
                ← Projects
              </a>
              <a
                href="/games"
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  color: C.inkDim,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  transition: `all 0.3s ${EASE.focus}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = C.inkMid
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = C.inkDim
                  e.currentTarget.style.opacity = '0.7'
                }}
              >
                Games →
              </a>
            </div>

            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: '12px',
                fontWeight: 300,
                letterSpacing: '0.12em',
                color: C.gold,
                opacity: 0.5,
              }}
            >
              Lab · 考研日语
            </span>
          </div>
        </CinematicSection>
      </div>

      {/* 响应式样式 */}
      <style>{`
        /* ── Mobile (< 768px) ── */
        @media (max-width: 767px) {
          .lab-grid-bg {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

// 统计盒子组件
function StatBox({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div
      style={{
        background: `${color}08`,
        borderRadius: '10px',
        padding: '14px',
        border: `0.5px solid ${color}20`,
      }}
    >
      <div style={{
        fontFamily: FONTS.body,
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.1em',
        color: C.inkFaint,
        textTransform: 'uppercase',
        marginBottom: '6px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: FONTS.display,
        fontSize: '28px',
        fontWeight: 400,
        color: color,
        lineHeight: 1,
      }}>
        {value}
        <span style={{
          fontFamily: FONTS.body,
          fontSize: '14px',
          color: C.inkFaint,
          marginLeft: '4px',
        }}>
          / {total}
        </span>
      </div>
      <div style={{
        marginTop: '8px',
        height: '3px',
        background: `${color}20`,
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: color,
            borderRadius: '2px',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}

// 模式切换按钮
function ModeButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontFamily: FONTS.body,
        fontSize: '14px',
        fontWeight: active ? 500 : 400,
        letterSpacing: '0.08em',
        color: active ? C.bg : C.inkMid,
        background: active ? C.ink : C.cardIvory,
        border: `0.5px solid ${active ? C.ink : 'rgba(200,190,168,0.5)'}`,
        borderRadius: '10px',
        cursor: 'pointer',
        transition: `all 0.3s ${EASE.focus}`,
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = C.goldChamp
          e.currentTarget.style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(200,190,168,0.5)'
          e.currentTarget.style.transform = 'translateY(0)'
        }
      }}
    >
      {children}
    </button>
  )
}

// 筛选按钮
function FilterButton({ children, active, onClick, color }: { children: React.ReactNode; active: boolean; onClick: () => void; color?: string }) {
  const activeColor = color || C.gold

  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        fontFamily: FONTS.body,
        fontSize: '13px',
        fontWeight: active ? 500 : 400,
        letterSpacing: '0.08em',
        color: active ? C.bg : C.inkDim,
        background: active ? activeColor : 'transparent',
        border: `0.5px solid ${active ? activeColor : 'rgba(200,190,168,0.4)'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: `all 0.3s ${EASE.focus}`,
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = activeColor
          e.currentTarget.style.color = activeColor
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(200,190,168,0.4)'
          e.currentTarget.style.color = C.inkDim
        }
      }}
    >
      {children}
    </button>
  )
}
