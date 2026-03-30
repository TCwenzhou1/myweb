/**
 * 日语学习系统 - 类型定义
 */

// ==================== 词汇相关类型 ====================

export type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | '考研'

export interface VocabularyItem {
  id: string
  word: string           // 日语单词
  reading: string        // 假名/罗马音
  meaning: string        // 中文意思
  tone?: string          // 音调
  partOfSpeech: '名' | '动' | '形' | '副' | '助' | '接' | '叹' | '连体' | '连语'
  example?: string       // 例句
  exampleMeaning?: string // 例句翻译
  collocation?: string[]  // 高频搭配
  synonym?: string        // 同义词
  antonym?: string        // 反义词
  note?: string          // 记忆笔记
  // 新增字段
  romaji?: string         // 罗马音
  pronunciationTip?: string // 发音提示
  usage?: string          // 使用场景/核心用法
  examTip?: string         // 考试提醒
  frequency?: '高' | '中' | '低'  // 频率
  level: Level
}

// ==================== 语法相关类型 ====================

export interface GrammarPoint {
  id: string
  pattern: string       // 语法 pattern/句型
  meaning: string        // 意思
  formation: string      // 构成
  level: Level
  explanation?: string  // 解释
  example?: string       // 例句
  exampleMeaning?: string // 例句翻译
  note?: string         // 备注
}

// ==================== 记忆相关类型 ====================

export type MemoryState = 'new' | 'learning' | 'reviewing' | 'mastered'

export interface WordProgress {
  wordId: string
  level: Level
  state: MemoryState
  easeFactor: number       // 艾宾浩斯简易度因子 (1.3 - 2.5)
  interval: number          // 复习间隔（天）
  repetitions: number       // 连续正确次数
  nextReviewDate: string    // 下次复习日期 (ISO string)
  lastReviewDate: string   // 最后复习日期
  correctCount: number      // 正确次数
  wrongCount: number         // 错误次数
}

// ==================== 学习计划类型 ====================

export interface DailyPlan {
  date: string              // 日期 (YYYY-MM-DD)
  newWords: string[]        // 今日新词 ID 列表
  reviewWords: string[]     // 今日复习词 ID 列表
  completedNew: number      // 已完成新词数
  completedReview: number   // 已完成复习数
  totalNew: number          // 计划新词数
  totalReview: number       // 计划复习词数
}

export interface StudyPlan {
  dailyNewWords: number     // 每日新词数量 (默认 20)
  dailyReviewWords: number  // 每日复习词数量 (默认 50)
  startDate: string        // 开始日期
  currentLevel: Level      // 当前学习级别
  targetLevel: Level       // 目标级别
}

// ==================== 自测相关类型 ====================

export type QuizType = 'choice' | 'fill' | 'listen' | 'reverse'

export interface QuizQuestion {
  wordId: string
  type: QuizType
  question: string          // 题目
  options?: string[]         // 选项（选择题用）
  correctAnswer: string     // 正确答案
  userAnswer?: string        // 用户答案
  isCorrect?: boolean       // 是否正确
}

// ==================== 学习统计类型 ====================

export interface StudyStats {
  totalWordsLearned: number     // 已学单词总数
  totalWordsMastered: number     // 已掌握单词数
  totalQuizzesTaken: number      // 已做测验数
  totalCorrectAnswers: number    // 正确答题数
  streakDays: number             // 连续学习天数
  lastStudyDate: string          // 最后学习日期
  studyTimeByLevel: Record<Level, number>  // 各级别学习时间
  wordsLearnedByLevel: Record<Level, number> // 各级别已学词数
}

// ==================== 学习模式类型 ====================

export type StudyMode = 'browse' | 'card' | 'quiz' | 'plan'

export interface StudySession {
  mode: StudyMode
  startTime: string
  endTime?: string
  wordsStudied: string[]
  quizzesAnswered: number
  correctAnswers: number
}

// ==================== 导出默认词汇数据 ====================

export const VOCABULARY_N5: Omit<VocabularyItem, 'id'>[] = [
  // 名词
  { word: '日本', reading: 'にほん', meaning: '日本', partOfSpeech: '名', level: 'N5', romaji: 'nihon', usage: '表示日本这个国家', examTip: 'N5考试必背基础词汇' },
  { word: '中国人', reading: 'ちゅうごくじん', meaning: '中国人', partOfSpeech: '名', level: 'N5', example: '私は中国人です', exampleMeaning: '我是中国人', examTip: '常与「です」连用' },
  { word: '先生', reading: 'せんせい', meaning: '老师', partOfSpeech: '名', level: 'N5', examTip: '对老师、医生、律师等的尊称' },
  { word: '学生', reading: 'がくせい', meaning: '学生', partOfSpeech: '名', level: 'N5', example: '私は学生です', exampleMeaning: '我是学生', examTip: '大学及以下学生使用' },
  { word: '友達', reading: 'ともだち', meaning: '朋友', partOfSpeech: '名', level: 'N5', example: '友達と遊園地に行きました', exampleMeaning: '和朋友去了游乐园', examTip: '「と」表示伴随' },
  { word: '家族', reading: 'かぞく', meaning: '家人、家族', partOfSpeech: '名', level: 'N5', example: '家族は4人います', exampleMeaning: '家里有4口人', examTip: '谓语用「います」表示存在生物' },
  { word: '父', reading: 'ちち', meaning: '父亲', partOfSpeech: '名', level: 'N5', example: '父は会社で働いています', exampleMeaning: '父亲在公司工作', examTip: '自谦语，对外人可用' },
  { word: '母', reading: 'はは', meaning: '母亲', partOfSpeech: '名', level: 'N5', example: '母は料理が上手です', exampleMeaning: '妈妈很擅长做饭', examTip: '自谦语' },
  { word: '学校', reading: 'がっこう', meaning: '学校', partOfSpeech: '名', level: 'N5', example: '学校はどこですか', exampleMeaning: '学校在哪里', examTip: '常与「に」表示存在地点' },
  { word: '教室', reading: 'きょうしつ', meaning: '教室', partOfSpeech: '名', level: 'N5', example: '教室は2階にあります', exampleMeaning: '教室在2楼', frequency: '高' },
  { word: '食堂', reading: 'しょくどう', meaning: '食堂、餐厅', partOfSpeech: '名', level: 'N5', example: '食堂でお昼を食べます', exampleMeaning: '在食堂吃午饭', frequency: '中' },
  { word: '部屋', reading: 'へや', meaning: '房间', partOfSpeech: '名', level: 'N5', example: '私の部屋は狭いです', exampleMeaning: '我的房间很小', examTip: '「狭い」反义词「広い」' },
  { word: '家', reading: 'いえ', meaning: '家、房子', partOfSpeech: '名', level: 'N5', example: '家は駅に近いです', exampleMeaning: '家离车站近', frequency: '高' },
  { word: '庭', reading: 'にわ', meaning: '庭院、院子', partOfSpeech: '名', level: 'N5', example: '庭に花が咲いています', exampleMeaning: '院子里开着花', frequency: '中' },
  { word: '本', reading: 'ほん', meaning: '书', partOfSpeech: '名', level: 'N5', example: '本を読みます', exampleMeaning: '读书', frequency: '高' },
  { word: '新聞', reading: 'しんぶん', meaning: '报纸', partOfSpeech: '名', level: 'N5', example: '毎朝新聞を読みます', exampleMeaning: '每天早上看报纸', frequency: '中' },
  { word: '雑誌', reading: 'ざっし', meaning: '杂志', partOfSpeech: '名', level: 'N5', example: '雑誌を置いています', exampleMeaning: '放着杂志', frequency: '中' },
  { word: '手紙', reading: 'てがみ', meaning: '信、信件', partOfSpeech: '名', level: 'N5', example: '手紙を書きます', exampleMeaning: '写信', examTip: '注意和「てぶくろ（手套）」区分' },
  { word: '電話', reading: 'でんわ', meaning: '电话', partOfSpeech: '名', level: 'N5', example: '電話をかけます', exampleMeaning: '打电话', frequency: '高' },
  { word: '時計', reading: 'とけい', meaning: '钟、表', partOfSpeech: '名', level: 'N5', example: '時計が遅れています', exampleMeaning: '表慢了', examTip: '注意和「とけい（冬季）」区分' },
  { word: '傘', reading: 'かさ', meaning: '伞', partOfSpeech: '名', level: 'N5', example: '傘を忘れました', exampleMeaning: '忘了带伞', frequency: '中' },
  { word: '鍵', reading: 'かぎ', meaning: '钥匙', partOfSpeech: '名', level: 'N5', example: '鍵をかけます', exampleMeaning: '锁门', frequency: '中' },
  { word: '靴', reading: 'くつ', meaning: '鞋子', partOfSpeech: '名', level: 'N5', example: '靴を脱ぎます', exampleMeaning: '脱鞋', frequency: '中' },
  { word: '帽子', reading: 'ぼうし', meaning: '帽子', partOfSpeech: '名', level: 'N5', example: '帽子をかぶります', exampleMeaning: '戴帽子', frequency: '低' },
  { word: '時計', reading: 'とけい', meaning: '时钟、手表', partOfSpeech: '名', level: 'N5', frequency: '高' },

  // 动词
  { word: '食べる', reading: 'たべる', meaning: '吃', partOfSpeech: '动', level: 'N5', tone: '②', example: '朝ごはんを食べます', exampleMeaning: '吃早饭', examTip: '一段动词' },
  { word: '飲む', reading: 'のむ', meaning: '喝', partOfSpeech: '动', level: 'N5', tone: '①', example: '水を飲みます', exampleMeaning: '喝水', examTip: '五段动词' },
  { word: '見る', reading: 'みる', meaning: '看', partOfSpeech: '动', level: 'N5', tone: '①', example: 'テレビを見ます', exampleMeaning: '看电视', examTip: '一段动词' },
  { word: '聞く', reading: 'きく', meaning: '听、问', partOfSpeech: '动', level: 'N5', tone: '①', example: '音楽を聞きます', exampleMeaning: '听音乐', examTip: '五段动词' },
  { word: '行く', reading: 'いく', meaning: '去', partOfSpeech: '动', level: 'N5', tone: '②①', example: '学校に行きます', exampleMeaning: '去学校', examTip: '特殊五段动词，去语气' },
  { word: '来る', reading: 'くる', meaning: '来', partOfSpeech: '动', level: 'N5', tone: '②', example: '友達が家に来ます', exampleMeaning: '朋友来我家', examTip: '特殊一段动词' },
  { word: '帰る', reading: 'かえる', meaning: '回来、回去', partOfSpeech: '动', level: 'N5', tone: '②①', example: '家に戻ります', exampleMeaning: '回家', examTip: '五段动词' },
  { word: '書く', reading: 'かく', meaning: '写', partOfSpeech: '动', level: 'N5', tone: '①', example: '手紙を書きます', exampleMeaning: '写信', examTip: '五段动词' },
  { word: '読む', reading: 'よむ', meaning: '读', partOfSpeech: '动', level: 'N5', tone: '①', example: '本を読みます', exampleMeaning: '读书', examTip: '五段动词' },
  { word: '話す', reading: 'はなす', meaning: '说、谈话', partOfSpeech: '动', level: 'N5', tone: '②', example: '日本語を話します', exampleMeaning: '说日语', examTip: '五段动词' },
  { word: '聞く', reading: 'きく', meaning: '听、问', partOfSpeech: '动', level: 'N5', tone: '①', example: '先生の話を聞きます', exampleMeaning: '听老师的话', examTip: '五段动词，多义词' },
  { word: '買う', reading: 'かう', meaning: '买', partOfSpeech: '动', level: 'N5', tone: '①', example: '野菜を買います', exampleMeaning: '买菜', examTip: '五段动词' },
  { word: '取る', reading: 'とる', meaning: '拿、取', partOfSpeech: '动', level: 'N5', tone: '①', example: '写真を取ります', exampleMeaning: '拍照', examTip: '五段动词' },
  { word: '持つ', reading: 'もつ', meaning: '拿、带', partOfSpeech: '动', level: 'N5', tone: '①', example: '鍵を持ちます', exampleMeaning: '拿着钥匙', examTip: '五段动词' },
  { word: '座る', reading: 'すわる', meaning: '坐', partOfSpeech: '动', level: 'N5', tone: '②', example: 'ここに座ってください', exampleMeaning: '请坐这里', examTip: '一段动词' },
  { word: '立つ', reading: 'たつ', meaning: '站、立', partOfSpeech: '动', level: 'N5', tone: '①', example: '立って答えなさい', exampleMeaning: '站起来回答', examTip: '五段动词' },
  { word: '寝る', reading: 'ねる', meaning: '睡觉', partOfSpeech: '动', level: 'N5', tone: '②', example: '早く寝ます', exampleMeaning: '早点睡', examTip: '一段动词' },
  { word: '起きる', reading: 'おきる', meaning: '起床、醒来', partOfSpeech: '动', level: 'N5', tone: '②', example: '6時に起きます', exampleMeaning: '6点起床', examTip: '一段动词' },
  { word: '始める', reading: 'はじめる', meaning: '开始', partOfSpeech: '动', level: 'N5', tone: '③②', example: '勉強を始めます', exampleMeaning: '开始学习', examTip: '一段动词，使役形' },
  { word: '終わる', reading: 'おわる', meaning: '结束', partOfSpeech: '动', level: 'N5', tone: '③', example: '授業が終わりました', exampleMeaning: '下课了', examTip: '五段动词' },
  { word: '作る', reading: 'つくる', meaning: '做、制造', partOfSpeech: '动', level: 'N5', tone: '②', example: '料理を作ります', exampleMeaning: '做菜', examTip: '五段动词' },
  { word: '洗う', reading: 'あらう', meaning: '洗', partOfSpeech: '动', level: 'N5', tone: '②', example: '手を洗います', exampleMeaning: '洗手', examTip: '五段动词' },
  { word: '磨く', reading: 'みがく', meaning: '刷、擦', partOfSpeech: '动', level: 'N5', tone: '②', example: '歯を磨きます', exampleMeaning: '刷牙', frequency: '中' },
  { word: '切る', reading: 'きる', meaning: '切、剪', partOfSpeech: '动', level: 'N5', tone: '①', example: '野菜を切ります', exampleMeaning: '切菜', frequency: '中' },

  // 形容词
  { word: '大きい', reading: 'おおきい', meaning: '大的', partOfSpeech: '形', level: 'N5', tone: '③', example: '大きい部屋がほしい', exampleMeaning: '想要大房间', examTip: 'い形容词' },
  { word: '小さい', reading: 'ちいさい', meaning: '小的', partOfSpeech: '形', level: 'N5', tone: '③', example: '小さい字で見えません', exampleMeaning: '字太小看不见', examTip: 'い形容词' },
  { word: '新しい', reading: 'あたらしい', meaning: '新的', partOfSpeech: '形', level: 'N5', tone: '④', example: '新しい車を買いました', exampleMeaning: '买了新车', examTip: 'い形容词' },
  { word: '古い', reading: 'ふるい', meaning: '旧的、老的', partOfSpeech: '形', level: 'N5', tone: '②', example: '古い友達', exampleMeaning: '老朋友', examTip: 'い形容词' },
  { word: '良い', reading: 'よい', meaning: '好的', partOfSpeech: '形', level: 'N5', tone: '①', example: '天気が良い', exampleMeaning: '天气好', examTip: 'い形容词，「いい」是口语形式' },
  { word: '悪い', reading: 'わるい', meaning: '坏的、不好的', partOfSpeech: '形', level: 'N5', tone: '②', example: '態度が悪い', exampleMeaning: '态度不好', examTip: 'い形容词' },
  { word: '高い', reading: 'たかい', meaning: '高的、贵的', partOfSpeech: '形', level: 'N5', tone: '②', example: '山が高いです', exampleMeaning: '山很高', examTip: 'い形容词，多义词' },
  { word: '低い', reading: 'ひくい', meaning: '低的', partOfSpeech: '形', level: 'N5', tone: '②②', example: '温度が低い', exampleMeaning: '温度低', frequency: '中' },
  { word: '安い', reading: 'やすい', meaning: '便宜的', partOfSpeech: '形', level: 'N5', tone: '②', example: 'この水果は安いです', exampleMeaning: '这个水果便宜', examTip: 'い形容词' },
  { word: '短い', reading: 'みじかい', meaning: '短的、少的', partOfSpeech: '形', level: 'N5', tone: '③', example: '髪が短いです', exampleMeaning: '头发短', frequency: '中' },
  { word: '長い', reading: 'ながい', meaning: '长的', partOfSpeech: '形', level: 'N5', tone: '②', example: '道长いです', exampleMeaning: '路很长', examTip: 'い形容词' },
  { word: '広い', reading: 'ひろい', meaning: '宽阔的', partOfSpeech: '形', level: 'N5', tone: '②', example: '部屋が広いです', exampleMeaning: '房间宽敞', examTip: 'い形容词' },
  { word: '狭い', reading: 'せまい', meaning: '狭窄的', partOfSpeech: '形', level: 'N5', tone: '②', example: '道が狭いです', exampleMeaning: '路窄', examTip: 'い形容词' },
  { word: '白い', reading: 'しろい', meaning: '白色的', partOfSpeech: '形', level: 'N5', tone: '②', example: '雪が白い', exampleMeaning: '雪白', frequency: '中' },
  { word: '黒い', reading: 'くろい', meaning: '黑色的', partOfSpeech: '形', level: 'N5', tone: '②', example: '髪が黒い', exampleMeaning: '头发黑', frequency: '中' },
  { word: '赤い', reading: 'あかい', meaning: '红色的', partOfSpeech: '形', level: 'N5', tone: '②', example: 'リンゴが赤い', exampleMeaning: '苹果红', frequency: '中' },
  { word: '青い', reading: 'あおい', meaning: '蓝色的', partOfSpeech: '形', level: 'N5', tone: '②', example: '海が青い', exampleMeaning: '海蓝', frequency: '中' },
  { word: '忙しい', reading: 'いそがしい', meaning: '忙碌的', partOfSpeech: '形', level: 'N5', tone: '④', example: '毎日忙です', exampleMeaning: '每天很忙', examTip: 'い形容词' },
  { word: '赤い', reading: 'あかい', meaning: '红的', partOfSpeech: '形', level: 'N5', tone: '②', frequency: '高' },
  { word: '美味しい', reading: 'おいしい', meaning: '好吃的、美味的', partOfSpeech: '形', level: 'N5', tone: '③', example: '料理が美味しい', exampleMeaning: '菜好吃', examTip: 'い形容词' },
  { word: '眠い', reading: 'ねむい', meaning: '困的、想睡觉的', partOfSpeech: '形', level: 'N5', tone: '②', example: '眠くて何も見えない', exampleMeaning: '困得什么都看不见', frequency: '中' },
  { word: '冷たい', reading: 'つめたい', meaning: '冰冷的', partOfSpeech: '形', level: 'N5', tone: '③②', example: '手が冷たい', exampleMeaning: '手冷', examTip: 'い形容词' },
  { word: '温かい', reading: 'あたたかい', meaning: '温热的、暖和的', partOfSpeech: '形', level: 'N5', tone: '④', example: 'お粥が温かい', exampleMeaning: '粥是热的', frequency: '中' },
  { word: '難しい', reading: 'むずかしい', meaning: '难的', partOfSpeech: '形', level: 'N5', tone: '④③', example: 'この問題は難しい', exampleMeaning: '这个问题难', examTip: 'い形容词' },

  // 形容动词
  { word: '綺麗', reading: 'きれい', meaning: '漂亮的、干净的', partOfSpeech: '形', level: 'N5', tone: '①', example: '部屋が綺麗です', exampleMeaning: '房间干净', examTip: 'な形容词' },
  { word: '静か', reading: 'しずか', meaning: '安静的', partOfSpeech: '形', level: 'N5', tone: '①', example: '図書館は静かです', exampleMeaning: '图书馆安静', examTip: 'な形容词' },
  { word: '便利', reading: 'べんり', meaning: '方便的', partOfSpeech: '形', level: 'N5', tone: '①', example: 'この地铁は便利です', exampleMeaning: '这个地铁方便', examTip: 'な形容词' },
  { word: '不便', reading: 'ふべん', meaning: '不方便的', partOfSpeech: '形', level: 'N5', tone: '①', example: '此地不便です', exampleMeaning: '这里不方便', examTip: 'な形容词' },
  { word: '好き', reading: 'すき', meaning: '喜欢的', partOfSpeech: '形', level: 'N5', tone: '①', example: '海鲜が好きです', exampleMeaning: '喜欢海鲜', examTip: 'な形容词' },
  { word: '嫌い', reading: 'きらい', meaning: '讨厌的', partOfSpeech: '形', level: 'N5', tone: '①', example: '彼は嫌いです', exampleMeaning: '讨厌他', examTip: 'な形容词' },
  { word: '簡単', reading: 'かんたん', meaning: '简单的', partOfSpeech: '形', level: 'N5', tone: '①', example: '簡単な問題', exampleMeaning: '简单的问题', examTip: 'な形容词' },
  { word: '有名', reading: 'ゆうめい', meaning: '有名的', partOfSpeech: '形', level: 'N5', tone: '①', example: '此地有 名です', exampleMeaning: '这里有名', examTip: 'な形容词' },
  { word: '元気', reading: 'げんき', meaning: '精神好的、健康的', partOfSpeech: '形', level: 'N5', tone: '①', example: 'お爺さんは元気です', exampleMeaning: '爷爷精神很好', examTip: 'な形容词' },
  { word: '暇', reading: 'ひま', meaning: '空闲的', partOfSpeech: '形', level: 'N5', tone: '①', example: '今日暇です', exampleMeaning: '今天有空', examTip: 'な形容词' },
  { word: '親切', reading: 'しんせつ', meaning: '亲切的、热心的', partOfSpeech: '形', level: 'N5', tone: '①', example: ' человек が親切です', exampleMeaning: '那个人很热心', examTip: 'な形容词' },
  { word: '危険', reading: 'きけん', meaning: '危险的', partOfSpeech: '形', level: 'N5', tone: '①', example: '此処は危険です', exampleMeaning: '这里危险', frequency: '中' },
  { word: '安全', reading: 'あんぜん', meaning: '安全的', partOfSpeech: '形', level: 'N5', tone: '①', example: '此地安全です', exampleMeaning: '这里安全', frequency: '中' },
  { word: '好き', reading: 'すき', meaning: '喜欢', partOfSpeech: '形', level: 'N5', tone: '①', frequency: '高' },

  // 代词/副词/连词
  { word: 'これ', reading: 'これ', meaning: '这、这个', partOfSpeech: '名', level: 'N5', example: 'これは本です', exampleMeaning: '这是书', examTip: '近称指示词' },
  { word: 'それ', reading: 'それ', meaning: '那、那个', partOfSpeech: '名', level: 'N5', example: 'それは誰の伞ですか', exampleMeaning: '那是谁的伞', examTip: '中称指示词' },
  { word: 'あれ', reading: 'あれ', meaning: '那、那个（远称）', partOfSpeech: '名', level: 'N5', example: 'あれは何ですか', exampleMeaning: '那是什么', examTip: '远称指示词' },
  { word: 'どれ', reading: 'どれ', meaning: '哪个', partOfSpeech: '名', level: 'N5', example: 'あなたの本はどれですか', exampleMeaning: '你的书是哪本', examTip: '疑问指示词' },
  { word: 'この', reading: 'この', meaning: '这、这个', partOfSpeech: '连体', level: 'N5', example: 'この猫は可愛です', exampleMeaning: '这只猫可爱', examTip: '修饰名词' },
  { word: 'その', reading: 'その', meaning: '那、那个', partOfSpeech: '连体', level: 'N5', example: 'その辞物は新しいですか', exampleMeaning: '那本字典是新的吗', examTip: '修饰名词' },
  { word: 'あの', reading: 'あの', meaning: '那、那个（远称）', partOfSpeech: '连体', level: 'N5', example: 'あの山は富士山です', exampleMeaning: '那座山是富士山', examTip: '修饰名词' },
  { word: 'どんな', reading: 'どんな', meaning: '什么样的', partOfSpeech: '连体', level: 'N5', example: 'どんな先生が好きですか', exampleMeaning: '喜欢什么样的老师', examTip: '连体词' },
  { word: 'どこ', reading: 'どこ', meaning: '哪里', partOfSpeech: '副', level: 'N5', example: '食堂はどこですか', exampleMeaning: '食堂在哪里', examTip: '疑问词' },
  { word: '誰', reading: 'だれ', meaning: '谁', partOfSpeech: '副', level: 'N5', example: '彼は誰ですか', exampleMeaning: '他是谁', examTip: '疑问词' },
  { word: '何', reading: 'なに', meaning: '什么', partOfSpeech: '副', level: 'N5', example: 'これは何ですか', exampleMeaning: '这是什么', examTip: '疑问词' },
  { word: '何时', reading: 'いつ', meaning: '什么时候', partOfSpeech: '副', level: 'N5', example: '彼女はいつ来ますか', exampleMeaning: '她什么时候来', examTip: '疑问词' },
  { word: '何故', reading: 'なぜ', meaning: '为什么', partOfSpeech: '副', level: 'N5', example: '何故泣いていますか', exampleMeaning: '为什么哭', examTip: '书面语，口语用「なんで」' },
  { word: '此処', reading: 'ここ', meaning: '这里', partOfSpeech: '副', level: 'N5', example: 'ここはどこですか', exampleMeaning: '这里是什么地方', examTip: '近称' },
  { word: '其処', reading: 'そこ', meaning: '那里', partOfSpeech: '副', level: 'N5', example: '其処に行きます', exampleMeaning: '去那里', examTip: '中称' },
  { word: '良く', reading: 'よく', meaning: '经常、好好地', partOfSpeech: '副', level: 'N5', example: 'よく遊園地に行きます', exampleMeaning: '经常去游乐园', examTip: '副词' },
  { word: '少し', reading: 'すこし', meaning: '一点、少许', partOfSpeech: '副', level: 'N5', example: '少し休憩しましょう', exampleMeaning: '休息一下吧', examTip: '副词' },
  { word: '大変', reading: 'たいへん', meaning: '非常、很、了不起', partOfSpeech: '副', level: 'N5', example: '今夜大便意です', exampleMeaning: '今晚非常冷', frequency: '高' },
  { word: '是非', reading: 'ぜひ', meaning: '务必、一定', partOfSpeech: '副', level: 'N5', example: '是非来てください', exampleMeaning: '请务必来', frequency: '中' },
  { word: '多分', reading: 'たぶん', meaning: '大概、可能', partOfSpeech: '副', level: 'N5', example: '明日は多分晴れです', exampleMeaning: '明天大概是晴天', frequency: '高' },
  { word: '更に', reading: 'さらに', meaning: '更加、进一步', partOfSpeech: '副', level: 'N5', example: '更に美しくなりました', exampleMeaning: '变得更加漂亮了', frequency: '中' },
  { word: '如何', reading: 'どう', meaning: '怎样、如何', partOfSpeech: '副', level: 'N5', example: '彼女のことが如何ですか', exampleMeaning: '你觉得她怎么样', examTip: '疑问词' },
  { word: '左', reading: 'ひだり', meaning: '左、左侧', partOfSpeech: '名', level: 'N5', example: '左に曲がってください', exampleMeaning: '请左转', frequency: '中' },
  { word: '右', reading: 'みぎ', meaning: '右、右侧', partOfSpeech: '名', level: 'N5', example: '右側を通ってください', exampleMeaning: '请走右侧', frequency: '中' },
  { word: '前', reading: 'まえ', meaning: '前、前面', partOfSpeech: '名', level: 'N5', example: '前に并んでください', exampleMeaning: '请在前面排队', examTip: '时间或空间上的"前"' },
  { word: '後ろ', reading: 'うしろ', meaning: '后、后面', partOfSpeech: '名', level: 'N5', example: '私の後ろに座ってください', exampleMeaning: '请坐在我后面', frequency: '中' },
  { word: '上', reading: 'うえ', meaning: '上、上面', partOfSpeech: '名', level: 'N5', example: '棚の上に置きます', exampleMeaning: '放在架子上', examTip: '空间上的"上"' },
  { word: '下', reading: 'した', meaning: '下、下面', partOfSpeech: '名', level: 'N5', example: '机の下に入ってください', exampleMeaning: '请钻进桌子下面', examTip: '空间上的"下"' },
  { word: '中', reading: 'なか', meaning: '中、里面', partOfSpeech: '名', level: 'N5', example: '部屋の中にいます', exampleMeaning: '在房间里', examTip: '空间上的"中"' },
  { word: '外', reading: 'そと', meaning: '外、外面', partOfSpeech: '名', level: 'N5', example: '外に出てください', exampleMeaning: '请出去', examTip: '空间上的"外"' },
]

export const VOCABULARY_N4: Omit<VocabularyItem, 'id'>[] = [
  // N4 词汇 - 日常生活
  { word: '料理', reading: 'りょうり', meaning: '烹饪、菜肴', partOfSpeech: '名', level: 'N4', example: '日本料理を習いたい', exampleMeaning: '想学日本料理', examTip: '可作动词「料理する」' },
  { word: '食事', reading: 'しょくじ', meaning: '吃饭、用餐', partOfSpeech: '名', level: 'N4', example: '食事の準備をしましょう', exampleMeaning: '来做饭准备吧', frequency: '高' },
  { word: '朝食', reading: 'ちょうしょく', meaning: '早饭', partOfSpeech: '名', level: 'N4', example: '朝食を食べましたか', exampleMeaning: '吃早饭了吗', examTip: '同「朝ごはん」' },
  { word: '夕食', reading: 'ゆうしょく', meaning: '晚饭', partOfSpeech: '名', level: 'N4', example: '夕食は何時に食べますか', exampleMeaning: '晚饭几点吃', frequency: '高' },
  { word: '肉', reading: 'にく', meaning: '肉', partOfSpeech: '名', level: 'N4', example: '肉を食べませんか', exampleMeaning: '吃肉吗', frequency: '中' },
  { word: '魚', reading: 'さかな', meaning: '鱼', partOfSpeech: '名', level: 'N4', example: '魚料理が得意です', exampleMeaning: '擅长做鱼', frequency: '中' },
  { word: '野菜', reading: 'やさい', meaning: '蔬菜', partOfSpeech: '名', level: 'N4', example: '野菜を育てています', exampleMeaning: '在种菜', frequency: '中' },
  { word: '果物', reading: 'くだもの', meaning: '水果', partOfSpeech: '名', level: 'N4', example: '果物が好きです', exampleMeaning: '喜欢水果', frequency: '中' },
  { word: 'ご飯', reading: 'ごはん', meaning: '米饭、饭', partOfSpeech: '名', level: 'N4', example: 'ご飯を炊きます', exampleMeaning: '煮饭', frequency: '高' },
  { word: '卵', reading: 'たまご', meaning: '鸡蛋', partOfSpeech: '名', level: 'N4', example: '卵を茹でます', exampleMeaning: '煮鸡蛋', frequency: '中' },
  { word: '牛乳', reading: 'ぎゅうにゅう', meaning: '牛奶', partOfSpeech: '名', level: 'N4', example: '牛乳を飲みます', exampleMeaning: '喝牛奶', frequency: '中' },
  { word: '駅', reading: 'えき', meaning: '车站', partOfSpeech: '名', level: 'N4', example: '駅まで歩いて行きます', exampleMeaning: '走到车站', examTip: '铁路车站' },
  { word: '病院', reading: 'びょういん', meaning: '医院', partOfSpeech: '名', level: 'N4', example: '病院に通っています', exampleMeaning: '经常去医院', frequency: '高' },
  { word: '銀行', reading: 'ぎんこう', meaning: '银行', partOfSpeech: '名', level: 'N4', example: '銀行からお金を下ろします', exampleMeaning: '从银行取钱', frequency: '高' },
  { word: '邮局', reading: 'ゆうびんきょく', meaning: '邮局', partOfSpeech: '名', level: 'N4', example: '邮局で切手を買います', exampleMeaning: '在邮局买邮票', frequency: '中' },
  { word: '映画館', reading: 'えいがかん', meaning: '电影院', partOfSpeech: '名', level: 'N4', example: '映画館で映画を見ます', exampleMeaning: '在电影院看电影', frequency: '中' },
  { word: '博物館', reading: 'はくぶつかん', meaning: '博物馆', partOfSpeech: '名', level: 'N4', example: '博物館参观は有趣です', exampleMeaning: '参观博物馆很有趣', frequency: '低' },
  { word: '美术馆', reading: 'びじゅつかん', meaning: '美术馆', partOfSpeech: '名', level: 'N4', frequency: '低' },
  { word: '神社', reading: 'じんじゃ', meaning: '神社', partOfSpeech: '名', level: 'N4', example: '初詣で神社へ行きます', exampleMeaning: '新年参拜去神社', frequency: '中' },
  { word: '寺院', reading: 'じいん', meaning: '寺院', partOfSpeech: '名', level: 'N4', frequency: '中' },
  { word: '旅行', reading: 'りょこう', meaning: '旅行', partOfSpeech: '名', level: 'N4', example: '旅行の計画を立てる', exampleMeaning: '制定旅行计划', examTip: '可作动词「旅行する」' },
  { word: '観光', reading: 'かんこう', meaning: '观光、旅游', partOfSpeech: '名', level: 'N4', example: '京都を観光します', exampleMeaning: '观光京都', frequency: '中' },
  { word: '工事', reading: 'こうじ', meaning: '工程、施工', partOfSpeech: '名', level: 'N4', example: '道が工事中です', exampleMeaning: '道路施工中', frequency: '中' },
  { word: '会議', reading: 'かいぎ', meaning: '会议', partOfSpeech: '名', level: 'N4', example: '会議に出席します', exampleMeaning: '出席会议', examTip: '商务用语' },
  { word: '会社', reading: 'かいしゃ', meaning: '公司', partOfSpeech: '名', level: 'N4', example: '会社で働いています', exampleMeaning: '在公司工作', frequency: '高' },
  { word: '仕事', reading: 'しごと', meaning: '工作', partOfSpeech: '名', level: 'N4', example: '仕事厌倦', exampleMeaning: '工作很无聊', frequency: '高' },
  { word: '経験', reading: 'けいけん', meaning: '经验、经历', partOfSpeech: '名', level: 'N4', example: 'いろ皱な経験をした', exampleMeaning: '经历了各种事情', frequency: '高' },
  { word: '興味', reading: 'きょうみ', meaning: '兴趣', partOfSpeech: '名', level: 'N4', example: '日本文化に興味があります', exampleMeaning: '对日本文化有兴趣', examTip: '常与「が」连用' },
  { word: '約束', reading: 'やくそく', meaning: '约定、诺言', partOfSpeech: '名', level: 'N4', example: '約束を破らないで', exampleMeaning: '不要打破约定', examTip: '可作动词「約束する」' },
  { word: '説明', reading: 'せつめい', meaning: '说明、解释', partOfSpeech: '名', level: 'N4', example: '簡単に説明してください', exampleMeaning: '请简单地说明', frequency: '高' },

  // N4 动词
  { word: '始める', reading: 'はじめる', meaning: '开始', partOfSpeech: '动', level: 'N4', tone: '③②', example: '勉強を始めましょう', exampleMeaning: '开始学习吧', examTip: '一段动词的使役形式' },
  { word: '終わる', reading: 'おわる', meaning: '结束', partOfSpeech: '动', level: 'N4', tone: '③', example: '授業が終わる', exampleMeaning: '下课', examTip: '五段动词' },
  { word: '続ける', reading: 'つつける', meaning: '继续、持续', partOfSpeech: '动', level: 'N4', tone: '③②', example: '食べ続ける', exampleMeaning: '继续吃', examTip: '一段动词' },
  { word: '止まる', reading: 'とまる', meaning: '停止、停下', partOfSpeech: '动', level: 'N4', tone: '②①', example: '時計が止まった', exampleMeaning: '表停了', examTip: '五段动词' },
  { word: '変える', reading: 'かえる', meaning: '改变', partOfSpeech: '动', level: 'N4', tone: '②③', example: '計画を変えます', exampleMeaning: '改变计划', examTip: '一段动词' },
  { word: '出る', reading: 'でる', meaning: '出来、离开', partOfSpeech: '动', level: 'N4', tone: '②①', example: '部屋を出ます', exampleMeaning: '离开房间', examTip: '一段动词' },
  { word: '入れる', reading: 'いれる', meaning: '放进、加入', partOfSpeech: '动', level: 'N4', tone: '③②', example: '冷蔵庫に入れます', exampleMeaning: '放进冰箱', examTip: '一段动词' },
  { word: '立つ', reading: 'たつ', meaning: '站、立', partOfSpeech: '动', level: 'N4', tone: '①', example: 'まっすぐ立ちなさい', exampleMeaning: '站直', examTip: '五段动词' },
  { word: '並ぶ', reading: 'ならぶ', meaning: '排队、并列', partOfSpeech: '动', level: 'N4', tone: '②①', example: '并んで待つ', exampleMeaning: '排队等', examTip: '五段动词' },
  { word: '集的', reading: 'あつまる', meaning: '集合、聚集', partOfSpeech: '动', level: 'N4', tone: '③', example: '广场に集的する', exampleMeaning: '在广场集合', examTip: '五段动词' },
  { word: '変える', reading: 'かえる', meaning: '换、交换', partOfSpeech: '动', level: 'N4', tone: '②①', example: ' 자리를 바꾸다', exampleMeaning: '换座位', examTip: '一段动词' },
  { word: '送る', reading: 'おくる', meaning: '送、寄', partOfSpeech: '动', level: 'N4', tone: '②①', example: '荷物を送る', exampleMeaning: '寄包裹', examTip: '五段动词' },
  { word: '持つ', reading: 'もつ', meaning: '拿、有', partOfSpeech: '动', level: 'N4', tone: '①', example: '責任を持つ', exampleMeaning: '承担责任', examTip: '五段动词' },
  { word: '書く', reading: 'かく', meaning: '写', partOfSpeech: '动', level: 'N4', tone: '①', example: '日记を書く', exampleMeaning: '写日记', examTip: '五段动词' },
  { word: '話す', reading: 'はなす', meaning: '说', partOfSpeech: '动', level: 'N4', tone: '②', example: 'ゆっくり話してください', exampleMeaning: '请慢慢说', examTip: '五段动词' },
  { word: '答える', reading: 'こたえる', meaning: '回答', partOfSpeech: '动', level: 'N4', tone: '③②', example: '質問に答えます', exampleMeaning: '回答问题', examTip: '一段动词' },
  { word: '笑う', reading: 'わらう', meaning: '笑', partOfSpeech: '动', level: 'N4', tone: '②①', example: '憋的笑う', exampleMeaning: '苦笑', examTip: '五段动词' },
  { word: '泣く', reading: 'なく', meaning: '哭', partOfSpeech: '动', level: 'N4', tone: '①', example: '婴acherな泣く', exampleMeaning: '婴儿哭', examTip: '五段动词' },
  { word: '探す', reading: 'さがす', meaning: '找、寻找', partOfSpeech: '动', level: 'N4', tone: '②①', example: '仕事を探す', exampleMeaning: '找工作', examTip: '五段动词' },
  { word: '待つ', reading: 'まつ', meaning: '等、等待', partOfSpeech: '动', level: 'N4', tone: '①', example: 'ここで待ちます', exampleMeaning: '在这里等', examTip: '五段动词' },
  { word: '知る', reading: 'しる', meaning: '知道、认识', partOfSpeech: '动', level: 'N4', tone: '①', example: '彼を知っています', exampleMeaning: '认识他', examTip: '五段动词' },
  { word: '思う', reading: 'おもう', meaning: '想、认为', partOfSpeech: '动', level: 'N4', tone: '②①', example: 'そう思います', exampleMeaning: '我也这么想', examTip: '五段动词' },
  { word: '考える', reading: 'かんがえる', meaning: '想、思考', partOfSpeech: '动', level: 'N4', tone: '④③', example: 'ゆっくり考えてください', exampleMeaning: '请慢慢想', examTip: '一段动词' },
  { word: '寝る', reading: 'ねる', meaning: '睡', partOfSpeech: '动', level: 'N4', tone: '②', example: '早く寝てください', exampleMeaning: '请早点睡', examTip: '一段动词' },
  { word: '降ろす', reading: 'おろす', meaning: '降下、卸下', partOfSpeech: '动', level: 'N4', tone: '②③', example: '屁股降ろす', exampleMeaning: '让婴儿下（车）', examTip: '五段动词' },

  // N4 形容词
  { word: '甘い', reading: 'あまい', meaning: '甜的', partOfSpeech: '形', level: 'N4', tone: '②②', example: 'このお菓子は甘いです', exampleMeaning: '这个点心甜', examTip: 'い形容词' },
  { word: '辛い', reading: 'からい', meaning: '辣的、咸的', partOfSpeech: '形', level: 'N4', tone: '②②', example: 'このカレーは辛いです', exampleMeaning: '这个咖喱辣', examTip: 'い形容词' },
  { word: '苦い', reading: 'にがい', meaning: '苦的', partOfSpeech: '形', level: 'N4', tone: '②', example: 'コーヒーが苦い', exampleMeaning: '咖啡苦', frequency: '中' },
  { word: '酸い', reading: 'すい', meaning: '酸的', partOfSpeech: '形', level: 'N4', tone: '①', example: '柠檬が酸い', exampleMeaning: '柠檬酸', frequency: '中' },
  { word: '署い', reading: 'あつい', meaning: '热的、烫的', partOfSpeech: '形', level: 'N4', tone: '②', example: 'お茶が署い', exampleMeaning: '茶烫', examTip: 'い形容词，温度高' },
  { word: '寒い', reading: 'さむい', meaning: '冷的（天气）', partOfSpeech: '形', level: 'N4', tone: '②', example: '今日は寒いです', exampleMeaning: '今天冷', examTip: 'い形容词，天气冷' },
  { word: '温い', reading: 'ぬくい', meaning: '微温的', partOfSpeech: '形', level: 'N4', tone: '②②', example: '署い日に温い함이心地よい', exampleMeaning: '热天微温让人舒服', frequency: '低' },
  { word: '詳しい', reading: 'くわしい', meaning: '详细的、熟悉的', partOfSpeech: '形', level: 'N4', tone: '③', example: '地形に詳いい', exampleMeaning: '熟悉地形', frequency: '中' },
  { word: '嫌な', reading: 'いやな', meaning: '讨厌的、不愉快的', partOfSpeech: '形', level: 'N4', tone: '③', example: '嫌な天気', exampleMeaning: '讨厌的天气', frequency: '中' },
  { word: '新鮮な', reading: 'しんせんな', meaning: '新鲜的', partOfSpeech: '形', level: 'N4', tone: '①', example: '新鮮な魚介類', exampleMeaning: '新鲜的海鲜', frequency: '高' },
  { word: '複雑な', reading: 'ふくざつな', meaning: '复杂的', partOfSpeech: '形', level: 'N4', tone: '①', example: '複雑な問題', exampleMeaning: '复杂的问题', frequency: '高' },
  { word: '余計な', reading: 'よけいな', meaning: '多余的', partOfSpeech: '形', level: 'N4', tone: '①', example: '余計な心配をする', exampleMeaning: '多余的担心', frequency: '中' },
  { word: '特別な', reading: 'とくべつな', meaning: '特别的', partOfSpeech: '形', level: 'N4', tone: '①', example: '特別な事情', exampleMeaning: '特别的事情', frequency: '高' },
  { word: '個人的な', reading: 'こじんてきな', meaning: '个人的', partOfSpeech: '形', level: 'N4', tone: '①', example: '個人的な意見', exampleMeaning: '个人意见', frequency: '高' },
  { word: '旺旺', reading: 'おうおう', meaning: '往往、常常', partOfSpeech: '副', level: 'N4', example: '旺旺失敗する', exampleMeaning: '往往失败', frequency: '中' },
  { word: '既に', reading: 'すでに', meaning: '已经', partOfSpeech: '副', level: 'N4', example: '既に始まりました', exampleMeaning: '已经开始了', frequency: '高' },
  { word: '絶対に', reading: 'ぜったいに', meaning: '绝对、一定', partOfSpeech: '副', level: 'N4', example: '絶対に諦めない', exampleMeaning: '绝对不放弃', frequency: '高' },
  { word: '思わず', reading: 'おもわず', meaning: '不由得、无意中', partOfSpeech: '副', level: 'N4', example: '思わず笑った', exampleMeaning: '不由得笑了', frequency: '中' },
  { word: 'arder', reading: 'がつやりと', meaning: '凉、冰冷', partOfSpeech: '副', level: 'N4', example: 'aderっと冷える', exampleMeaning: '冰冷地冷下去', frequency: '低' },
]

export const VOCABULARY_N3: Omit<VocabularyItem, 'id'>[] = [
  // N3 词汇
  { word: '人心', reading: 'じんしん', meaning: '人心', partOfSpeech: '名', level: 'N3', example: '人心掌握が鍵です', exampleMeaning: '掌握人心是关键', frequency: '低' },
  { word: '世代', reading: 'せだい', meaning: '世代、一代', partOfSpeech: '名', level: 'N3', example: '若者の世代', exampleMeaning: '年轻一代', frequency: '高' },
  { word: '象', reading: 'ぞう', meaning: '象、象征', partOfSpeech: '名', level: 'N3', example: '像征的な建物', exampleMeaning: '象征性的建筑', frequency: '中' },
  { word: '状沉', reading: 'じょうきょう', meaning: '状况、情况', partOfSpeech: '名', level: 'N3', example: '現在の状沉は', exampleMeaning: '现在的情况是', frequency: '高' },
  { word: '結果', reading: 'けっか', meaning: '结果', partOfSpeech: '名', level: 'N3', example: '結果的に良かった', exampleMeaning: '结果很好', frequency: '高' },
  { word: '理由', reading: 'りゆう', meaning: '理由、原因', partOfSpeech: '名', level: 'N3', example: '理由は明白です', exampleMeaning: '理由很明显', frequency: '高' },
  { word: '意味', reading: 'いみ', meaning: '意思、意义', partOfSpeech: '名', level: 'N3', example: 'この言葉の意味は何ですか', exampleMeaning: '这个词的意思是什么', frequency: '高' },
  { word: '関係', reading: 'かんけい', meaning: '关系', partOfSpeech: '名', level: 'N3', example: '関係があります', exampleMeaning: '有关系', frequency: '高' },
  { word: '場合', reading: 'ばあい', meaning: '情况、场合', partOfSpeech: '名', level: 'N3', example: '病気の場合', exampleMeaning: '生病的情况下', frequency: '高' },
  { word: '状態', reading: 'じょうたい', meaning: '状态', partOfSpeech: '名', level: 'N3', example: '状态が悪いです', exampleMeaning: '状态不好', frequency: '高' },
  { word: '社会', reading: 'しゃかい', meaning: '社会', partOfSpeech: '名', level: 'N3', example: '社会貢献', exampleMeaning: '社会贡献', frequency: '高' },
  { word: '環境', reading: 'かんきょう', meaning: '环境', partOfSpeech: '名', level: 'N3', example: '環境を守ります', exampleMeaning: '保护环境', frequency: '高' },
  { word: '生活', reading: 'せいかつ', meaning: '生活', partOfSpeech: '名', level: 'N3', example: '日常生活', exampleMeaning: '日常生活', frequency: '高' },
  { word: '人生', reading: 'じんせい', meaning: '人生', partOfSpeech: '名', level: 'N3', example: '人生 везде', exampleMeaning: '人生各种各样', frequency: '高' },
  { word: '価値', reading: 'かち', meaning: '价值', partOfSpeech: '名', level: 'N3', example: '価値観', exampleMeaning: '价值观', frequency: '高' },
  { word: '目的', reading: 'もくてき', meaning: '目的', partOfSpeech: '名', level: 'N3', example: '目的を達成する', exampleMeaning: '达到目的', frequency: '高' },
  { word: '理由', reading: 'りゆう', meaning: '理由', partOfSpeech: '名', level: 'N3', frequency: '高' },
  { word: '興味', reading: 'きょうみ', meaning: '兴趣', partOfSpeech: '名', level: 'N3', example: '興味深いです', exampleMeaning: '很感兴趣', frequency: '高' },
  { word: '日記', reading: 'にっき', meaning: '日记', partOfSpeech: '名', level: 'N3', example: '日記をつける', exampleMeaning: '写日记', frequency: '中' },
  { word: '作文', reading: 'さくぶん', meaning: '作文', partOfSpeech: '名', level: 'N3', example: '作文を書きます', exampleMeaning: '写作文', frequency: '中' },
  { word: '小説', reading: 'しょうせつ', meaning: '小说', partOfSpeech: '名', level: 'N3', example: '小説を読みます', exampleMeaning: '读小说', frequency: '中' },
  { word: '物語', reading: 'ものがたり', meaning: '故事', partOfSpeech: '名', level: 'N3', example: '古老しい物語', exampleMeaning: '古老的故事', frequency: '中' },
  { word: '歴史', reading: 'れきし', meaning: '历史', partOfSpeech: '名', level: 'N3', example: '日本の歴史', exampleMeaning: '日本历史', frequency: '高' },
  { word: '文化', reading: 'ぶんか', meaning: '文化', partOfSpeech: '名', level: 'N3', example: '日本文化', exampleMeaning: '日本文化', frequency: '高' },
  { word: '伝統', reading: 'でんとう', meaning: '传统', partOfSpeech: '名', level: 'N3', example: '伝統を守る', exampleMeaning: '守护传统', frequency: '高' },

  // N3 动词
  { word: '感じる', reading: 'かんじる', meaning: '感觉、感到', partOfSpeech: '动', level: 'N3', tone: '④③', example: '興味を感じました', exampleMeaning: '感到有兴趣', examTip: '一段动词' },
  { word: '信じる', reading: 'しんじる', meaning: '相信', partOfSpeech: '动', level: 'N3', tone: '③②', example: 'もっと信じるべきです', exampleMeaning: '应该更加相信', examTip: '一段动词' },
  { word: '感じる', reading: 'かんじる', meaning: '感觉', partOfSpeech: '动', level: 'N3', tone: '④③', frequency: '高' },
  { word: '考える', reading: 'かんがえる', meaning: '思考、考虑', partOfSpeech: '动', level: 'N3', tone: '④③', example: 'よく考えてください', exampleMeaning: '请好好考虑一下', frequency: '高' },
  { word: '始める', reading: 'はじめる', meaning: '开始', partOfSpeech: '动', level: 'N3', tone: '③②', example: '勉強を始めます', exampleMeaning: '开始学习', frequency: '高' },
  { word: '続ける', reading: 'つつける', meaning: '继续', partOfSpeech: '动', level: 'N3', tone: '③②', example: '食べ続ける', exampleMeaning: '继续吃', frequency: '高' },
  { word: '終える', reading: 'おえる', meaning: '完成、结束', partOfSpeech: '动', level: 'N3', tone: '③②', example: '使命を終えた', exampleMeaning: '完成了使命', frequency: '高' },
  { word: '変える', reading: 'かえる', meaning: '改变', partOfSpeech: '动', level: 'N3', tone: '②③', example: '观念を変えます', exampleMeaning: '改变观念', frequency: '高' },
  { word: '高める', reading: 'たかめる', meaning: '提高', partOfSpeech: '动', level: 'N3', tone: '③②', example: '水位を高めます', exampleMeaning: '提高水位', frequency: '中' },
  { word: '集める', reading: 'あつめる', meaning: '收集', partOfSpeech: '动', level: 'N3', tone: '③②', example: '情報を集める', exampleMeaning: '收集信息', frequency: '高' },
  { word: '保つ', reading: 'たもつ', meaning: '保持、维持', partOfSpeech: '动', level: 'N3', tone: '②①', example: '平衡を保つ', exampleMeaning: '保持平衡', frequency: '中' },
  { word: '及ぼす', reading: 'およぼす', meaning: '波及、影响到', partOfSpeech: '动', level: 'N3', tone: '②③', example: '影響及ぼします', exampleMeaning: '施加影响', frequency: '低' },
  { word: '含む', reading: 'ふくむ', meaning: '包含、含有', partOfSpeech: '动', level: 'N3', tone: '②①', example: '水を含有する', exampleMeaning: '含有水分', frequency: '高' },
  { word: '異なる', reading: 'ことなる', meaning: '不同、不一样', partOfSpeech: '动', level: 'N3', tone: '③', example: '環境が異なる', exampleMeaning: '环境不同', frequency: '高' },
  { word: '応じる', reading: 'おうじる', meaning: '响应、适应', partOfSpeech: '动', level: 'N3', tone: '③②', example: '需要に応じる', exampleMeaning: '响应需求', frequency: '高' },
  { word: '及ぼす', reading: 'およぼす', meaning: '使...受到影响', partOfSpeech: '动', level: 'N3', tone: '③②', frequency: '中' },
  { word: '得万', reading: 'うる', meaning: '得到、获得', partOfSpeech: '动', level: 'N3', tone: '①', example: '知識を得る', exampleMeaning: '获得知识', examTip: '文语动词，口语说「える」' },
  { word: '失う', reading: 'うしなう', meaning: '失去、丢失', partOfSpeech: '动', level: 'N3', tone: '②①', example: '命を失う', exampleMeaning: '丧命', examTip: '五段动词' },
  { word: '満たす', reading: 'みたす', meaning: '满足、填满', partOfSpeech: '动', level: 'N3', tone: '②③', example: '条件を満たします', exampleMeaning: '满足条件', frequency: '高' },
  { word: '超える', reading: 'こえる', meaning: '超过、超越', partOfSpeech: '动', level: 'N3', tone: '②①', example: '100方を超えます', exampleMeaning: '超过100万', frequency: '高' },
  { word: '限る', reading: 'かざる', meaning: '限于、限制', partOfSpeech: '动', level: 'N3', tone: '②①', example: '三日に限ります', exampleMeaning: '限于三天', frequency: '高' },
  { word: '基つく', reading: 'もとづく', meaning: '基于、根据', partOfSpeech: '动', level: 'N3', tone: '③', example: '事実に基づきます', exampleMeaning: '基于事实', frequency: '高' },
  { word: '至る', reading: 'いたる', meaning: '到达、达到', partOfSpeech: '动', level: 'N3', tone: '②', example: '結果に至る', exampleMeaning: '导致结果', frequency: '高' },
  { word: '沿う', reading: 'そう', meaning: '沿着、按照', partOfSpeech: '动', level: 'N3', tone: '①', example: '道路に沿って歩く', exampleMeaning: '沿着道路走', frequency: '中' },

  // N3 形容词/形容动词
  { word: '必要な', reading: 'ひつような', meaning: '必要的、需要的', partOfSpeech: '形', level: 'N3', tone: '①', example: '必要なものだ', exampleMeaning: '需要的东西', frequency: '高' },
  { word: '様々な', reading: 'さまざまな', meaning: '各种各样的', partOfSpeech: '形', level: 'N3', tone: '④', example: '様々な問題', exampleMeaning: '各种各样的问题', frequency: '高' },
  { word: '複雑な', reading: 'ふくざつな', meaning: '复杂的', partOfSpeech: '形', level: 'N3', tone: '①', example: '複雑な心情', exampleMeaning: '复杂的心情', frequency: '高' },
  { word: '重要な', reading: 'じゅうような', meaning: '重要的', partOfSpeech: '形', level: 'N3', tone: '①', example: '重要な案件', exampleMeaning: '重要的案件', frequency: '高' },
  { word: '必要な', reading: 'ひつような', meaning: '必要的', partOfSpeech: '形', level: 'N3', tone: '①', frequency: '高' },
  { word: '静かな', reading: 'しずかな', meaning: '安静的', partOfSpeech: '形', level: 'N3', tone: '①', example: '静か公园', exampleMeaning: '安静的公园', frequency: '高' },
  { word: '嫌な', reading: 'いやな', meaning: '讨厌的', partOfSpeech: '形', level: 'N3', tone: '③', example: '嫌な匐い', exampleMeaning: '讨厌的气味', frequency: '中' },
  { word: '新しい', reading: 'あたらしい', meaning: '新的', partOfSpeech: '形', level: 'N3', tone: '④', example: '新しい発見', exampleMeaning: '新发现', frequency: '高' },
  { word: '懐かしい', reading: 'なつかしい', meaning: '怀念的、令人思念的', partOfSpeech: '形', level: 'N3', tone: '④', example: '故郷が懐かしい', exampleMeaning: '怀念故乡', frequency: '中' },
  { word: '恐ろしい', reading: 'おそろしい', meaning: '可怕的、惊人的', partOfSpeech: '形', level: 'N3', tone: '④', example: '恐ろしい速さ', exampleMeaning: '惊人的速度', frequency: '中' },
  { word: '冷たい', reading: 'つめたい', meaning: '冷淡的、冰冷的', partOfSpeech: '形', level: 'N3', tone: '③②', example: '冷たい仕草', exampleMeaning: '冷淡的态度', frequency: '中' },
  { word: '甘い', reading: 'あまい', meaning: '甜的、宽松的', partOfSpeech: '形', level: 'N3', tone: '②②', example: '甘い考え', exampleMeaning: '天真的想法', frequency: '中' },
  { word: '酸い', reading: 'すい', meaning: '酸痛的', partOfSpeech: '形', level: 'N3', tone: '①', example: '酸い息', exampleMeaning: '喘不过气来', frequency: '低' },
  { word: '苦い', reading: 'にがい', meaning: '痛苦的', partOfSpeech: '形', level: 'N3', tone: '②', example: '苦い経験', exampleMeaning: '痛苦的经历', frequency: '中' },
  { word: '可惜的', reading: 'あつなが可惜', meaning: '遗憾的，可惜的', partOfSpeech: '形', level: 'N3', tone: '①', example: '可惜此刻', exampleMeaning: '可惜的是', frequency: '中' },
  { word: '甚だしい', reading: 'はなはだしい', meaning: '非常、很', partOfSpeech: '形', level: 'N3', tone: '⑤', example: '甚だしい誤解', exampleMeaning: '很大的误解', frequency: '低' },
]

export const VOCABULARY_N2: Omit<VocabularyItem, 'id'>[] = [
  // N2 高频词汇
  { word: '現象', reading: 'げんしょう', meaning: '现象', partOfSpeech: '名', level: 'N2', example: '自然現象', exampleMeaning: '自然现象', frequency: '高' },
  { word: '事実', reading: 'じじつ', meaning: '事实', partOfSpeech: '名', level: 'N2', example: '事実を確認します', exampleMeaning: '确认事实', frequency: '高' },
  { word: '結果', reading: 'けっか', meaning: '结果、后果', partOfSpeech: '名', level: 'N2', example: '結果的に良かった', exampleMeaning: '结果很好', frequency: '高' },
  { word: '原因', reading: 'げんいん', meaning: '原因', partOfSpeech: '名', level: 'N2', example: '原因を調べます', exampleMeaning: '调查原因', frequency: '高' },
  { word: '結果', reading: 'けっか', meaning: '结果', partOfSpeech: '名', level: 'N2', frequency: '高' },
  { word: '影響', reading: 'えいきょう', meaning: '影响', partOfSpeech: '名', level: 'N2', example: '影響を受ける', exampleMeaning: '受到影响', frequency: '高' },
  { word: '目的', reading: 'もくてき', meaning: '目的', partOfSpeech: '名', level: 'N2', example: '目的を達成する', exampleMeaning: '达到目的', frequency: '高' },
  { word: '理由', reading: 'りゆう', meaning: '理由', partOfSpeech: '名', level: 'N2', example: '理由説明する', exampleMeaning: '说明理由', frequency: '高' },
  { word: '状態', reading: 'じょうたい', meaning: '状态', partOfSpeech: '名', level: 'N2', example: '状沉不妙', exampleMeaning: '状态不妙', frequency: '高' },
  { word: '意味', reading: 'いみ', meaning: '意思、意义', partOfSpeech: '名', level: 'N2', example: '意味がない', exampleMeaning: '没有意义', frequency: '高' },
  { word: '関係', reading: 'かんけい', meaning: '关系', partOfSpeech: '名', level: 'N2', example: '関係が深い', exampleMeaning: '关系很深', frequency: '高' },
  { word: '自体', reading: 'じたい', meaning: '本身、自己', partOfSpeech: '名', level: 'N2', example: '问题自体', exampleMeaning: '问题本身', frequency: '高' },
  { word: '結果', reading: 'けっか', meaning: '结果', partOfSpeech: '名', level: 'N2', frequency: '高' },
  { word: '以上', reading: 'いじょう', meaning: '以上、不少于', partOfSpeech: '名', level: 'N2', example: '100人以上', exampleMeaning: '100人以上', frequency: '高' },
  { word: '以下', reading: 'いか', meaning: '以下、不超过', partOfSpeech: '名', level: 'N2', example: '18歳以下', exampleMeaning: '18岁以下', frequency: '高' },
  { word: '自体', reading: 'じたい', meaning: '自身', partOfSpeech: '名', level: 'N2', frequency: '高' },
  { word: '一方', reading: 'いつぽう', meaning: '一方面、一方', partOfSpeech: '名', level: 'N2', example: '一方では...他方では', exampleMeaning: '一方面...另一方面...', frequency: '高' },
  { word: '反面', reading: 'はんめん', meaning: '反面、另一面', partOfSpeech: '名', level: 'N2', example: '懒惰的反面', exampleMeaning: '懒惰的反面', frequency: '中' },
  { word: '態度', reading: 'たいど', meaning: '态度', partOfSpeech: '名', level: 'N2', example: '態度を変えます', exampleMeaning: '改变态度', frequency: '高' },
  { word: '印象', reading: 'いんしょう', meaning: '印象', partOfSpeech: '名', level: 'N2', example: '印象に残ります', exampleMeaning: '留下印象', frequency: '高' },
  { word: '感情', reading: 'かんじょう', meaning: '感情', partOfSpeech: '名', level: 'N2', example: '感情をコントロールする', exampleMeaning: '控制感情', frequency: '高' },
  { word: '心理', reading: 'しんり', meaning: '心理', partOfSpeech: '名', level: 'N2', example: '心理学', exampleMeaning: '心理学', frequency: '中' },
  { word: '意識', reading: 'いしき', meaning: '意识', partOfSpeech: '名', level: 'N2', example: '意識が低い', exampleMeaning: '意识薄弱', frequency: '高' },
  { word: '目的', reading: 'もくてき', meaning: '目的', partOfSpeech: '名', level: 'N2', frequency: '高' },
  { word: '彼此', reading: 'あれこれ', meaning: '这个那个、种种', partOfSpeech: '名', level: 'N2', example: '彼此錯誤する', exampleMeaning: '纠缠不清', frequency: '中' },

  // N2 动词
  { word: '行う', reading: 'おこなう', meaning: '进行、举办', partOfSpeech: '动', level: 'N2', tone: '②①', example: '試合を行う', exampleMeaning: '进行比赛', examTip: '五段动词' },
  { word: '得る', reading: 'うる', meaning: '得到、获得', partOfSpeech: '动', level: 'N2', tone: '①', example: '了解を得る', exampleMeaning: '获得理解', examTip: '文语动词，口语用「える」' },
  { word: '言う', reading: 'いう', meaning: '说', partOfSpeech: '动', level: 'N2', tone: '①', example: '结构だと言う', exampleMeaning: '说辛苦了', frequency: '高' },
  { word: '示す', reading: 'しめす', meaning: '表示、显示', partOfSpeech: '动', level: 'N2', tone: '②①', example: '答えを示します', exampleMeaning: '给出答案', frequency: '高' },
  { word: '認める', reading: 'みとめる', meaning: '承认、认可', partOfSpeech: '动', level: 'N2', tone: '③②', example: '間違いを認めます', exampleMeaning: '承认错误', frequency: '高' },
  { word: '保つ', reading: 'たもつ', meaning: '保持、维持', partOfSpeech: '动', level: 'N2', tone: '②①', example: '冷静を保つ', exampleMeaning: '保持冷静', frequency: '高' },
  { word: '接触', reading: 'せっしょく', meaning: '接触', partOfSpeech: '动', level: 'N2', tone: '①', example: '接触を持つ', exampleMeaning: '有接触', frequency: '高' },
  { word: '対応', reading: 'たいおう', meaning: '对应、应对', partOfSpeech: '动', level: 'N2', tone: '①', example: '状況に対応します', exampleMeaning: '应对情况', frequency: '高' },
  { word: '実現', reading: 'じつげん', meaning: '实现', partOfSpeech: '动', level: 'N2', tone: '①', example: '夢を実現します', exampleMeaning: '实现梦想', frequency: '高' },
  { word: '完了', reading: 'かんりょう', meaning: '完成', partOfSpeech: '动', level: 'N2', tone: '①', example: '準備が完了しました', exampleMeaning: '准备完成了', frequency: '高' },
  { word: '把握', reading: 'はあく', meaning: '掌握、抓住', partOfSpeech: '动', level: 'N2', tone: '①', example: '状況を把握します', exampleMeaning: '掌握情况', frequency: '高' },
  { word: '排除', reading: 'はいじょ', meaning: '排除、清除', partOfSpeech: '动', level: 'N2', tone: '①', example: '障碍を排除します', exampleMeaning: '排除障碍', frequency: '高' },
  { word: '適用', reading: 'てきよう', meaning: '适用、应用', partOfSpeech: '动', level: 'N2', tone: '①', example: '法律を適用する', exampleMeaning: '适用法律', frequency: '高' },
  { word: '強調', reading: 'きょうちょう', meaning: '强调', partOfSpeech: '动', level: 'N2', tone: '①', example: '重要性を強調します', exampleMeaning: '强调重要性', frequency: '高' },
  { word: '提起', reading: 'ていき', meaning: '提出、提起', partOfSpeech: '动', level: 'N2', tone: '①', example: '問題を提起する', exampleMeaning: '提出问题', frequency: '高' },
  { word: '評価', reading: 'ひょうか', meaning: '评价', partOfSpeech: '动', level: 'N2', tone: '①', example: '高く評価する', exampleMeaning: '高度评价', frequency: '高' },
  { word: '接触', reading: 'せっしょく', meaning: '接触、联系', partOfSpeech: '动', level: 'N2', tone: '①', example: '互いに接触する', exampleMeaning: '互相接触', frequency: '高' },
  { word: '直面', reading: 'ちょくめん', meaning: '面临、面对', partOfSpeech: '动', level: 'N2', tone: '①', example: '困難に直面する', exampleMeaning: '面临困难', frequency: '高' },
  { word: '区別', reading: 'くべつ', meaning: '区别、分辨', partOfSpeech: '动', level: 'N2', tone: '①', example: '区別をつける', exampleMeaning: '加以区别', frequency: '高' },
  { word: '接触', reading: 'せっしょく', meaning: '接触', partOfSpeech: '动', level: 'N2', frequency: '高' },

  // N2 形容词/形容动词
  { word: '単なる', reading: 'たんんなる', meaning: '单纯的、仅仅的', partOfSpeech: '形', level: 'N2', tone: '①', example: '単に面白い', exampleMeaning: '仅仅是有趣', frequency: '高' },
  { word: '新たな', reading: 'あらたな', meaning: '新的', partOfSpeech: '形', level: 'N2', tone: '①', example: '新たな発見', exampleMeaning: '新发现', frequency: '高' },
  { word: '具体的な', reading: 'ぐたいてきな', meaning: '具体的们', partOfSpeech: '形', level: 'N2', tone: '①', example: '具体的な例', exampleMeaning: '具体的例子', frequency: '高' },
  { word: '様々な', reading: 'さまざまな', meaning: '各种各样', partOfSpeech: '形', level: 'N2', tone: '④', example: '様々な意見', exampleMeaning: '各种意见', frequency: '高' },
  { word: '静かな', reading: 'しずかな', meaning: '安静的', partOfSpeech: '形', level: 'N2', tone: '①', frequency: '高' },
  { word: '可惜な', reading: 'あicana', meaning: '可惜的', partOfSpeech: '形', level: 'N2', tone: '①', example: '可惜な結果', exampleMeaning: '可惜的结果', frequency: '高' },
  { word: '剧烈な', reading: 'げきれい', meaning: '剧烈的', partOfSpeech: '形', level: 'N2', tone: '①', example: '激しい競争', exampleMeaning: '激烈的竞争', frequency: '高' },
  { word: '深刻な', reading: 'しんざくな', meaning: '严重的', partOfSpeech: '形', level: 'N2', tone: '①', example: '深刻な問題', exampleMeaning: '严重的问题', frequency: '高' },
  { word: '明確な', reading: 'めいかくな', meaning: '明确的', partOfSpeech: '形', level: 'N2', tone: '①', example: '明確な目標', exampleMeaning: '明确的目标', frequency: '高' },
  { word: '純粋な', reading: 'じゅんすいな', meaning: '纯粹的', partOfSpeech: '形', level: 'N2', tone: '①', example: '純粋な気持ち', exampleMeaning: '纯粹的心情', frequency: '高' },
  { word: '微妙な', reading: 'びみょうな', meaning: '微妙的', partOfSpeech: '形', level: 'N2', tone: '①', example: '微妙な関係', exampleMeaning: '微妙的关系', frequency: '高' },
  { word: '残酷な', reading: 'ざんこくな', meaning: '残酷的', partOfSpeech: '形', level: 'N2', tone: '①', example: '現実が残酷だ', exampleMeaning: '现实很残酷', frequency: '中' },
  { word: '空き', reading: 'あき', meaning: '空、闲', partOfSpeech: '形', level: 'N2', tone: '①', example: '空き部屋', exampleMeaning: '空房间', frequency: '中' },
  { word: '太多的', reading: 'たて', meaning: '太甚、过多', partOfSpeech: '形', level: 'N2', tone: '①', example: '多すぎて選び分からない', exampleMeaning: '太多无法选择', frequency: '中' },
]

export const VOCABULARY_N1: Omit<VocabularyItem, 'id'>[] = [
  // N1 词汇
  { word: '象', reading: 'しょう', meaning: '象征', partOfSpeech: '名', level: 'N1', example: '平和の象', exampleMeaning: '和平的象征', frequency: '高' },
  { word: '認識', reading: 'にんしき', meaning: '认识', partOfSpeech: '名', level: 'N1', example: '認識が足りない', exampleMeaning: '认识不足', frequency: '高' },
  { word: '概念', reading: 'がいねん', meaning: '概念', partOfSpeech: '名', level: 'N1', example: '基本概念', exampleMeaning: '基本概念', frequency: '高' },
  { word: '本質', reading: 'ほんしつ', meaning: '本质', partOfSpeech: '名', level: 'N1', example: '本質を見极める', exampleMeaning: '看透本质', frequency: '高' },
  { word: '原則', reading: 'げんそく', meaning: '原则', partOfSpeech: '名', level: 'N1', example: ' 원칙に従う', exampleMeaning: '遵守原则', frequency: '高' },
  { word: '規定', reading: 'きてい', meaning: '规定、规章', partOfSpeech: '名', level: 'N1', example: '規定を守る', exampleMeaning: '遵守规定', frequency: '高' },
  { word: '基準', reading: 'きじゅん', meaning: '基准、标准', partOfSpeech: '名', level: 'N1', example: '基準を超える', exampleMeaning: '超过基准', frequency: '高' },
  { word: '論理', reading: 'ろんり', meaning: '逻辑', partOfSpeech: '名', level: 'N1', example: '論理的に考える', exampleMeaning: '逻辑性思考', frequency: '高' },
  { word: '意識', reading: 'いしき', meaning: '意识', partOfSpeech: '名', level: 'N1', example: '意識が朦朧とする', exampleMeaning: '意识模糊', frequency: '高' },
  { word: '形而上', reading: 'けいじじょう', meaning: '形而上', partOfSpeech: '名', level: 'N1', example: '形而上学', exampleMeaning: '形而上学', frequency: '中' },
  { word: '客観', reading: 'きゃつかん', meaning: '客观', partOfSpeech: '名', level: 'N1', example: '客観的に見る', exampleMeaning: '客观地看', frequency: '高' },
  { word: '主観', reading: 'しゅかん', meaning: '主观', partOfSpeech: '名', level: 'N1', example: '主観的意見', exampleMeaning: '主观意见', frequency: '高' },
  { word: '具体', reading: 'ぐたい', meaning: '具体', partOfSpeech: '名', level: 'N1', example: '具体例を示す', exampleMeaning: '举例说明', frequency: '高' },
  { word: '抽象', reading: 'ちゅうしょう', meaning: '抽象', partOfSpeech: '名', level: 'N1', example: '抽象的な話', exampleMeaning: '抽象的话', frequency: '高' },
  { word: '矛盾', reading: 'むじゅん', meaning: '矛盾', partOfSpeech: '名', level: 'N1', example: '矛盾が生じる', exampleMeaning: '产生矛盾', frequency: '高' },
  { word: '因果', reading: 'いんが', meaning: '因果', partOfSpeech: '名', level: 'N1', example: '因果関係', exampleMeaning: '因果关系', frequency: '中' },
  { word: '相互作用', reading: 'そうごさよう', meaning: '相互作用', partOfSpeech: '名', level: 'N1', example: '相互作用し合う', exampleMeaning: '相互影响', frequency: '高' },
  { word: '根源', reading: 'こんげん', meaning: '根源', partOfSpeech: '名', level: 'N1', example: '問題の根源', exampleMeaning: '问题的根源', frequency: '高' },
  { word: '真相', reading: 'そうしん', meaning: '真相', partOfSpeech: '名', level: 'N1', example: '真相を查明する', exampleMeaning: '查明真相', frequency: '高' },
  { word: '実相', reading: 'じっそう', meaning: '实相、真实情况', partOfSpeech: '名', level: 'N1', example: '社会の実相', exampleMeaning: '社会的真实情况', frequency: '中' },
  { word: '見識', reading: 'けんしき', meaning: '见识、见解', partOfSpeech: '名', level: 'N1', example: '見識が高い', exampleMeaning: '见识高', frequency: '中' },
  { word: '視座', reading: 'しざ', meaning: '视角、立场', partOfSpeech: '名', level: 'N1', example: '別の視座から見る', exampleMeaning: '从别的角度看', frequency: '中' },
  { word: '志向', reading: 'しこう', meaning: '志向、意向', partOfSpeech: '名', level: 'N1', example: '将来を志向する', exampleMeaning: '以将来为目标', frequency: '高' },
  { word: '観点', reading: 'かんてん', meaning: '观点', partOfSpeech: '名', level: 'N1', example: '別の観点から', exampleMeaning: '从别的观点', frequency: '高' },
  { word: '角度', reading: 'かくど', meaning: '角度', partOfSpeech: '名', level: 'N1', example: '角度を変えて見る', exampleMeaning: '换角度看', frequency: '中' },

  // N1 动词
  { word: '推奨', reading: 'すいしょう', meaning: '推荐', partOfSpeech: '动', level: 'N1', tone: '①', example: 'お推荐的商品', exampleMeaning: '推荐商品', frequency: '高' },
  { word: '推薦', reading: 'すいせん', meaning: '推荐、推举', partOfSpeech: '动', level: 'N1', tone: '①', example: '入学を推薦する', exampleMeaning: '推荐入学', frequency: '高' },
  { word: '唱道', reading: 'せんどう', meaning: '倡导、提倡', partOfSpeech: '动', level: 'N1', tone: '①', example: '平和を唱える', exampleMeaning: '倡导和平', frequency: '高' },
  { word: '主張', reading: 'しゅちょう', meaning: '主张', partOfSpeech: '动', level: 'N1', tone: '①', example: '自己主張がましい', exampleMeaning: '过于自我主张', frequency: '高' },
  { word: '断言', reading: 'だんげん', meaning: '断言、肯定', partOfSpeech: '动', level: 'N1', tone: '①', example: '断言できない', exampleMeaning: '无法断言', frequency: '高' },
  { word: '批判', reading: 'ひihan', meaning: '批判、批评', partOfSpeech: '动', level: 'N1', tone: '①', example: '他者を批判する', exampleMeaning: '批评他人', frequency: '高' },
  { word: '示唆', reading: 'しさ', meaning: '暗示、启示', partOfSpeech: '动', level: 'N1', tone: '①', example: '示唆に富む', exampleMeaning: '富有启示', frequency: '高' },
  { word: '象徴', reading: 'しょうちょう', meaning: '象征', partOfSpeech: '动', level: 'N1', tone: '①', example: '平和を象徴する', exampleMeaning: '象征和平', frequency: '高' },
  { word: '定義', reading: 'ていぎ', meaning: '定义', partOfSpeech: '动', level: 'N1', tone: '①', example: '明確に定義する', exampleMeaning: '明确地定义', frequency: '高' },
  { word: '解釈', reading: 'かいしゃく', meaning: '解释、理解', partOfSpeech: '动', level: 'N1', tone: '①', example: '別の解釈がある', exampleMeaning: '有另一种解释', frequency: '高' },
  { word: '洞察', reading: 'どうさつ', meaning: '洞察', partOfSpeech: '动', level: 'N1', tone: '①', example: '先を洞察する', exampleMeaning: '洞察先机', frequency: '高' },
  { word: '熟慮', reading: 'じゅくりょ', meaning: '熟虑、深思熟虑', partOfSpeech: '动', level: 'N1', tone: '①', example: '熟慮探索', exampleMeaning: '深思熟虑后决定', frequency: '高' },
  { word: '凝縮', reading: 'ぎょうしゅく', meaning: '凝结、凝聚', partOfSpeech: '动', level: 'N1', tone: '①', example: '努力が凝縮する', exampleMeaning: '努力凝聚', frequency: '中' },
  { word: '昇華', reading: 'しょうか', meaning: '升华', partOfSpeech: '动', level: 'N1', tone: '①', example: '苦難を昇華する', exampleMeaning: '将苦难升华', frequency: '中' },
  { word: '統合', reading: 'とうごう', meaning: '统一、整合', partOfSpeech: '动', level: 'N1', tone: '①', example: '情報を統合する', exampleMeaning: '整合信息', frequency: '高' },
  { word: '帰納', reading: 'きのう', meaning: '归纳', partOfSpeech: '动', level: 'N1', tone: '①', example: '演繹ではなく帰納的に', exampleMeaning: '不是演绎而是归纳地', frequency: '中' },
  { word: '演繹', reading: 'えんえき', meaning: '演绎', partOfSpeech: '动', level: 'N1', tone: '①', example: '演繹的に考える', exampleMeaning: '演绎地思考', frequency: '中' },
  { word: '波及', reading: 'はきゅう', meaning: '波及、影响到', partOfSpeech: '动', level: 'N1', tone: '①', example: '影響が波及する', exampleMeaning: '影响波及', frequency: '高' },
  { word: '投映', reading: 'とうえい', meaning: '投射、映照', partOfSpeech: '动', level: 'N1', tone: '①', example: '影が壁に映る', exampleMeaning: '影子映在墙上', frequency: '中' },
  { word: '溶場', reading: 'ようかい', meaning: '溶解、融化', partOfSpeech: '动', level: 'N1', tone: '①', example: '塩が水に溶ける', exampleMeaning: '盐溶于水', frequency: '中' },

  // N1 形容词/形容动词
  { word: '複雑な', reading: 'ふくざつな', meaning: '复杂的', partOfSpeech: '形', level: 'N1', tone: '①', example: '複雑な事情', exampleMeaning: '复杂的情况', frequency: '高' },
  { word: '重大な', reading: 'じゅうだいな', meaning: '重大的', partOfSpeech: '形', level: 'N1', tone: '①', example: '重大な決断', exampleMeaning: '重大的决断', frequency: '高' },
  { word: '純粋な', reading: 'じゅんすいな', meaning: '纯粹的', partOfSpeech: '形', level: 'N1', tone: '①', example: '純粋な好意', exampleMeaning: '纯粹的好意', frequency: '高' },
  { word: '抽象的な', reading: 'ちゅうしょうてきな', meaning: '抽象的', partOfSpeech: '形', level: 'N1', tone: '①', example: '抽象的な概念', exampleMeaning: '抽象的概念', frequency: '高' },
  { word: '具体的な', reading: 'ぐたいてきな', meaning: '具体的们', partOfSpeech: '形', level: 'N1', tone: '①', example: '具体的に示す', exampleMeaning: '具体地展示', frequency: '高' },
  { word: '全面的な', reading: 'ぜんめんてきな', meaning: '全方面的', partOfSpeech: '形', level: 'N1', tone: '①', example: '全面的に支持する', exampleMeaning: '全面支持', frequency: '高' },
  { word: '内面的な', reading: 'ないめんてきな', meaning: '内心的', partOfSpeech: '形', level: 'N1', tone: '①', example: '内面的な成長', exampleMeaning: '内心的成长', frequency: '中' },
  { word: '外面的な', reading: 'がいめんてきな', meaning: '外表的', partOfSpeech: '形', level: 'N1', tone: '①', example: '外面的な評価', exampleMeaning: '外表的评价', frequency: '中' },
  { word: '潜在的な', reading: 'せんざいてきな', meaning: '潜在的', partOfSpeech: '形', level: 'N1', tone: '①', example: '潜在的な危険', exampleMeaning: '潜在的危险', frequency: '高' },
  { word: '致命的な', reading: 'ちめいてきな', meaning: '致命的', partOfSpeech: '形', level: 'N1', tone: '①', example: '致命的な誤り', exampleMeaning: '致命的错误', frequency: '高' },
  { word: '急速な', reading: 'きゅうそくな', meaning: '快速的', partOfSpeech: '形', level: 'N1', tone: '①', example: '急速に変化する', exampleMeaning: '快速变化', frequency: '高' },
  { word: '劇的な', reading: 'げきてきな', meaning: '戏剧性的', partOfSpeech: '形', level: 'N1', tone: '①', example: '劇的に改善する', exampleMeaning: '戏剧性地改善', frequency: '中' },
  { word: '激烈な', reading: 'げきれい', meaning: '激烈的', partOfSpeech: '形', level: 'N1', tone: '①', example: '激烈的議論', exampleMeaning: '激烈的讨论', frequency: '高' },
  { word: '深刻な', reading: 'しんざくな', meaning: '严重的', partOfSpeech: '形', level: 'N1', tone: '①', example: '深刻な事態', exampleMeaning: '严重的事态', frequency: '高' },
  { word: '甚大な', reading: 'じんだいな', meaning: '很大的', partOfSpeech: '形', level: 'N1', tone: '①', example: '甚大な被害', exampleMeaning: '很大的损失', frequency: '高' },
  { word: '広範な', reading: 'こうはん', meaning: '广泛的', partOfSpeech: '形', level: 'N1', tone: '①', example: '広範な影響', exampleMeaning: '广泛的影响', frequency: '高' },
  { word: '潜在的な', reading: 'せんざいてき', meaning: '潜在的', partOfSpeech: '形', level: 'N1', frequency: '高' },
]

// 考研核心词汇
export const VOCABULARY_考研: Omit<VocabularyItem, 'id'>[] = [
  // 考研高频词汇
  { word: '政治', reading: 'せいじ', meaning: '政治', partOfSpeech: '名', level: '考研', example: '政治を理解する', exampleMeaning: '理解政治', frequency: '高' },
  { word: '経済', reading: 'けいざい', meaning: '经济', partOfSpeech: '名', level: '考研', example: '経済を発展させる', exampleMeaning: '发展经济', frequency: '高' },
  { word: '社会', reading: 'しゃかい', meaning: '社会', partOfSpeech: '名', level: '考研', example: '社会貢献', exampleMeaning: '社会贡献', frequency: '高' },
  { word: '文化', reading: 'ぶんか', meaning: '文化', partOfSpeech: '名', level: '考研', example: '文化交流', exampleMeaning: '文化交流', frequency: '高' },
  { word: '歴史', reading: 'れきし', meaning: '历史', partOfSpeech: '名', level: '考研', example: '歴史を学ぶ', exampleMeaning: '学习历史', frequency: '高' },
  { word: '科学', reading: 'かがく', meaning: '科学', partOfSpeech: '名', level: '考研', example: '科学技術', exampleMeaning: '科学技术', frequency: '高' },
  { word: '技術', reading: 'ぎじゅつ', meaning: '技术', partOfSpeech: '名', level: '考研', example: '技術が进步する', exampleMeaning: '技术进步', frequency: '高' },
  { word: '教育', reading: 'きょういく', meaning: '教育', partOfSpeech: '名', level: '考研', example: '教育改革', exampleMeaning: '教育改革', frequency: '高' },
  { word: '環境', reading: 'かんきょう', meaning: '环境', partOfSpeech: '名', level: '考研', example: '環境を守る', exampleMeaning: '保护环境', frequency: '高' },
  { word: '資源', reading: 'しげん', meaning: '资源', partOfSpeech: '名', level: '考研', example: '天然資源', exampleMeaning: '天然资源', frequency: '高' },
  { word: '問題', reading: 'もんだい', meaning: '问题', partOfSpeech: '名', level: '考研', example: '問題を解決する', exampleMeaning: '解决问题', frequency: '高' },
  { word: '研究', reading: 'けんきゅう', meaning: '研究', partOfSpeech: '名', level: '考研', example: '研究を行う', exampleMeaning: '进行研究', frequency: '高' },
  { word: '開発', reading: 'かいはつ', meaning: '开发', partOfSpeech: '名', level: '考研', example: '新产品開発', exampleMeaning: '新产品开发', frequency: '高' },
  { word: '国際', reading: 'こくさい', meaning: '国际', partOfSpeech: '名', level: '考研', example: '国際関係', exampleMeaning: '国际关系', frequency: '高' },
  { word: '交流', reading: 'こうりゅう', meaning: '交流', partOfSpeech: '名', level: '考研', example: '文化交流', exampleMeaning: '文化交流', frequency: '高' },
  { word: '影響', reading: 'えいきょう', meaning: '影响', partOfSpeech: '名', level: '考研', example: '影響を受ける', exampleMeaning: '受到影响', frequency: '高' },
  { word: '関係', reading: 'かんけい', meaning: '关系', partOfSpeech: '名', level: '考研', example: '関係を深める', exampleMeaning: '加深关系', frequency: '高' },
  { word: '状態', reading: 'じょうたい', meaning: '状态', partOfSpeech: '名', level: '考研', example: '現在の状態', exampleMeaning: '现在的状态', frequency: '高' },
  { word: '原因', reading: 'げんいん', meaning: '原因', partOfSpeech: '名', level: '考研', example: '原因を調べる', exampleMeaning: '调查原因', frequency: '高' },
  { word: '結果', reading: 'けっか', meaning: '结果', partOfSpeech: '名', level: '考研', example: '結果を出す', exampleMeaning: '出成果', frequency: '高' },
  { word: '意味', reading: 'いみ', meaning: '意思、意义', partOfSpeech: '名', level: '考研', example: '意味がない', exampleMeaning: '没有意义', frequency: '高' },
  { word: '機会', reading: 'きかい', meaning: '机会', partOfSpeech: '名', level: '考研', example: '機会を逃す', exampleMeaning: '错过机会', frequency: '高' },
  { word: '可能性', reading: 'かのうせい', meaning: '可能性', partOfSpeech: '名', level: '考研', example: '可能性が低い', exampleMeaning: '可能性低', frequency: '高' },
  { word: '重要', reading: 'じゅうよう', meaning: '重要', partOfSpeech: '形', level: '考研', example: '重要性を認識する', exampleMeaning: '认识到重要性', frequency: '高' },
  { word: '必要', reading: 'ひつよう', meaning: '必要', partOfSpeech: '形', level: '考研', example: '必要性がある', exampleMeaning: '有必要', frequency: '高' },
  { word: '発展', reading: 'はってん', meaning: '发展', partOfSpeech: '名', level: '考研', example: '急速に発展する', exampleMeaning: '快速发展', frequency: '高' },
  { word: '実現', reading: 'じつげん', meaning: '实现', partOfSpeech: '名', level: '考研', example: '目標を実現する', exampleMeaning: '实现目标', frequency: '高' },
  { word: '改革', reading: 'かいかく', meaning: '改革', partOfSpeech: '名', level: '考研', example: '教育改革', exampleMeaning: '教育改革', frequency: '高' },
  { word: '進歩', reading: 'しんぽ', meaning: '进步', partOfSpeech: '名', level: '考研', example: '技術が進歩する', exampleMeaning: '技术进步', frequency: '高' },
  { word: '影響', reading: 'えいきょう', meaning: '影响', partOfSpeech: '名', level: '考研', frequency: '高' },
  { word: '現代', reading: 'げんだい', meaning: '现代', partOfSpeech: '名', level: '考研', example: '現代社会', exampleMeaning: '现代社会', frequency: '高' },
  { word: '伝統', reading: 'でんとう', meaning: '传统', partOfSpeech: '名', level: '考研', example: '伝統を守る', exampleMeaning: '守护传统', frequency: '高' },
  { word: '個人', reading: 'こじん', meaning: '个人', partOfSpeech: '名', level: '考研', example: '個人の自由', exampleMeaning: '个人自由', frequency: '高' },
  { word: '家族', reading: 'かぞく', meaning: '家庭', partOfSpeech: '名', level: '考研', example: '核家族', exampleMeaning: '核心家庭', frequency: '高' },
  { word: '人間', reading: 'にんげん', meaning: '人、人类', partOfSpeech: '名', level: '考研', example: '人間関係', exampleMeaning: '人际关系', frequency: '高' },
  { word: '生命', reading: 'せいめい', meaning: '生命', partOfSpeech: '名', level: '考研', example: '命を尊ぶ', exampleMeaning: '尊重生命', frequency: '高' },
  { word: '権利', reading: 'けんり', meaning: '权利', partOfSpeech: '名', level: '考研', example: '権利を守る', exampleMeaning: '维护权利', frequency: '高' },
  { word: '義務', reading: 'ぎむ', meaning: '义务', partOfSpeech: '名', level: '考研', example: '教育的義務', exampleMeaning: '教育的义务', frequency: '高' },
  { word: '自由', reading: 'じゆう', meaning: '自由', partOfSpeech: '名', level: '考研', example: '言論の自由', exampleMeaning: '言论自由', frequency: '高' },
  { word: '平等', reading: 'びょうどう', meaning: '平等', partOfSpeech: '名', level: '考研', example: '機会の平等', exampleMeaning: '机会平等', frequency: '高' },
]

// 生成唯一 ID 的辅助函数
export function generateVocabularyId(level: Level, index: number): string {
  return `${level.toLowerCase()}-${String(index).padStart(4, '0')}`
}

// 获取所有词汇（带 ID）
export function getAllVocabulary(): VocabularyItem[] {
  const allVocabulary: VocabularyItem[] = []

  const addVocabulary = (vocabList: Omit<VocabularyItem, 'id'>[], level: Level) => {
    vocabList.forEach((vocab, index) => {
      allVocabulary.push({
        ...vocab,
        id: generateVocabularyId(level, index + 1),
        level,
      })
    })
  }

  addVocabulary(VOCABULARY_N5, 'N5')
  addVocabulary(VOCABULARY_N4, 'N4')
  addVocabulary(VOCABULARY_N3, 'N3')
  addVocabulary(VOCABULARY_N2, 'N2')
  addVocabulary(VOCABULARY_N1, 'N1')
  addVocabulary(VOCABULARY_考研, '考研')

  return allVocabulary
}

// 按等级获取词汇
export function getVocabularyByLevel(level: Level): VocabularyItem[] {
  const all = getAllVocabulary()
  return all.filter(v => v.level === level)
}

// 搜索词汇
export function searchVocabulary(query: string, level?: Level): VocabularyItem[] {
  const all = getAllVocabulary()
  const lowerQuery = query.toLowerCase()

  return all.filter(v => {
    const matchesLevel = level ? v.level === level : true
    const matchesQuery =
      v.word.toLowerCase().includes(lowerQuery) ||
      v.reading.toLowerCase().includes(lowerQuery) ||
      v.meaning.toLowerCase().includes(lowerQuery)
    return matchesLevel && matchesQuery
  })
}

// 等级颜色配置
export const levelColors: Record<Level, { bg: string; text: string; border: string; label: string }> = {
  N5: { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7', label: 'N5' },
  N4: { bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9', label: 'N4' },
  N3: { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80', label: 'N3' },
  N2: { bg: '#F3E5F5', text: '#7B1FA2', border: '#CE93D8', label: 'N2' },
  N1: { bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A', label: 'N1' },
  '考研': { bg: '#E8F5E9', text: '#1B5E20', border: '#81C784', label: '考研' },
}

// 获取等级徽章颜色
export function getLevelBadgeStyle(level: Level) {
  return levelColors[level] || levelColors.N5
}

// 词性中文映射
export const partOfSpeechMap: Record<string, string> = {
  '名': '名词',
  '动': '动词',
  '形': '形容词/形容动词',
  '副': '副词',
  '助': '助词',
  '接': '接续词',
  '叹': '感叹词',
  '连体': '连体词',
  '连语': '连语',
}

// 获取词性中文
export function getPartOfSpeechZh(pos: string): string {
  return partOfSpeechMap[pos] || pos
}

// 统计信息
export function getVocabularyStats() {
  return {
    N5: VOCABULARY_N5.length,
    N4: VOCABULARY_N4.length,
    N3: VOCABULARY_N3.length,
    N2: VOCABULARY_N2.length,
    N1: VOCABULARY_N1.length,
    '考研': VOCABULARY_考研.length,
    total: VOCABULARY_N5.length + VOCABULARY_N4.length + VOCABULARY_N3.length + VOCABULARY_N2.length + VOCABULARY_N1.length + VOCABULARY_考研.length,
  }
}