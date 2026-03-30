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

// 考研核心词汇（约300+词汇）
export const VOCABULARY_考研: Omit<VocabularyItem, 'id'>[] = [
  // ========== 政治/法律/社会 ==========
  { word: '政治', reading: 'せいじ', meaning: '政治', partOfSpeech: '名', level: '考研', romaji: 'seiji', usage: '政治活动、政治事务', examTip: '考研高频词，常与「学」组成「政治学」', example: '政治に興味を持つ', exampleMeaning: '对政治感兴趣', frequency: '高', collocation: ['政治活動', '政治改革', '政治問題'] },
  { word: '経済', reading: 'けいざい', meaning: '经济', partOfSpeech: '名', level: '考研', romaji: 'keizai', usage: '国民经济、个人经济', examTip: '考研超高频词，经济类文章必背', example: '経済を発展させる', exampleMeaning: '发展经济', frequency: '高', collocation: ['経済成長', '経済効果', '世界経済'] },
  { word: '社会', reading: 'しゃかい', meaning: '社会', partOfSpeech: '名', level: '考研', romaji: 'shakai', usage: '社会、社交圈', examTip: '考研必备词，可组成大量复合词', example: '社会貢献を行う', exampleMeaning: '为社会做贡献', frequency: '高', collocation: ['社会問題', '社会福祉', '現代社会'] },
  { word: '法律', reading: 'ほうりつ', meaning: '法律', partOfSpeech: '名', level: '考研', romaji: 'houritsu', usage: '法律法规', examTip: '法律类文章核心词汇', example: '法律を遵守する', exampleMeaning: '遵守法律', frequency: '高', collocation: ['法律違反', '法律家', '法律制度'] },
  { word: '政策', reading: 'せいさく', meaning: '政策', partOfSpeech: '名', level: '考研', romaji: 'seisaku', usage: '政府制定的政策', examTip: '政府、改革类话题核心词', example: '政策を実行する', exampleMeaning: '执行政策', frequency: '高', collocation: ['政策決定', '貿易政策', '環境政策'] },
  { word: '政府', reading: 'せいふ', meaning: '政府', partOfSpeech: '名', level: '考研', romaji: 'seifu', usage: '国家行政机关', examTip: '政治经济类文章必备', example: '政府工作报告', exampleMeaning: '政府工作报告', frequency: '高', collocation: ['政府機関', '中央政府', '地方政府'] },
  { word: '国家', reading: 'こっか', meaning: '国家', partOfSpeech: '名', level: '考研', romaji: 'kokka', usage: '国家、国土', examTip: '常与「安全保障」「経済」搭配', example: '国家安全を守る', exampleMeaning: '保卫国家安全', frequency: '高', collocation: ['国家権力', '国家試験', '国家戦略'] },
  { word: '権利', reading: 'けんり', meaning: '权利', partOfSpeech: '名', level: '考研', romaji: 'kenri', usage: '法律赋予的权利', examTip: '人权、法律类话题核心', example: '権利を守る', exampleMeaning: '维护权利', frequency: '高', collocation: ['基本的人権', '権利侵害', '権利主張'] },
  { word: '義務', reading: 'ぎむ', meaning: '义务', partOfSpeech: '名', level: '考研', romaji: 'gimu', usage: '法律或道德上的义务', examTip: '常与「教育」「納税」搭配', example: '教育的義務', exampleMeaning: '教育的义务', frequency: '高', collocation: ['義務教育', '納税義務', '社会義務'] },
  { word: '民主', reading: 'みんしゅ', meaning: '民主', partOfSpeech: '名', level: '考研', romaji: 'minshu', usage: '民主主义', examTip: '政治制度类话题常用词', example: '民主主義を実行する', exampleMeaning: '实行民主主义', frequency: '高', collocation: ['民主主義', '民主党', '民主化'] },
  { word: '平和', reading: 'へいわ', meaning: '和平', partOfSpeech: '名', level: '考研', romaji: 'heiwa', usage: '和平、安宁', examTip: '国际关系、社会话题常见', example: '世界平和を実現する', exampleMeaning: '实现世界和平', frequency: '高', collocation: ['平和条約', '平和共存', '平和主義'] },
  { word: '戦争', reading: 'せんそう', meaning: '战争', partOfSpeech: '名', level: '考研', romaji: 'sensou', usage: '武装冲突', examTip: '历史、国际关系话题核心', example: '戦争を起こす', exampleMeaning: '发动战争', frequency: '高', collocation: ['世界大战', '戦争状態', '戦争犯罪'] },
  { word: '革命', reading: 'かくめい', meaning: '革命', partOfSpeech: '名', level: '考研', romaji: 'kakumei', usage: '根本性变革', examTip: '历史政治类话题常考', example: '産業革命が起こる', exampleMeaning: '发生产业革命', frequency: '高', collocation: ['技術革命', '情報革命', '社会革命'] },
  { word: '自由', reading: 'じゆう', meaning: '自由', partOfSpeech: '名', level: '考研', romaji: 'jiyuu', usage: '不受限制的状态', examTip: '考研超高频，权利类话题必备', example: '言論の自由を守る', exampleMeaning: '维护言论自由', frequency: '高', collocation: ['人身自由', '信仰の自由', '表現の自由'] },
  { word: '平等', reading: 'びょうどう', meaning: '平等', partOfSpeech: '名', level: '考研', romaji: 'byoudou', usage: '同等对待', examTip: '社会公平类话题核心词', example: '機会の平等を実現する', exampleMeaning: '实现机会平等', frequency: '高', collocation: ['男女平等', '平等待遇', '法的平等'] },
  { word: '責任', reading: 'せきにん', meaning: '责任', partOfSpeech: '名', level: '考研', romaji: 'sekinin', usage: '应承担的义务或后果', examTip: '考研高频词，常与「を持つ」搭配', example: '責任を負う', exampleMeaning: '承担责任', frequency: '高', collocation: ['社会的責任', '責任感', '責任所在'] },
  { word: '影響', reading: 'えいきょう', meaning: '影响', partOfSpeech: '名', level: '考研', romaji: 'eikyou', usage: '对其他事物产生作用', examTip: '考研超高频，分析类文章必备', example: '環境に影響を与える', exampleMeaning: '对环境产生影响', frequency: '高', collocation: ['影響力', '影響を受ける', '悪影響'] },
  { word: '関係', reading: 'かんけい', meaning: '关系', partOfSpeech: '名', level: '考研', romaji: 'kankei', usage: '事物之间的联系', examTip: '考研必备常考词', example: '関係を深める', exampleMeaning: '加深关系', frequency: '高', collocation: ['国際関係', '人間関係', '因果関係'] },
  { word: '組織', reading: 'そしき', meaning: '组织', partOfSpeech: '名', level: '考研', romaji: 'soshiki', usage: '有结构的团体', examTip: '社会类、管理类话题常用', example: '組織を作る', exampleMeaning: '建立组织', frequency: '高', collocation: ['組織的', '大規模組織', '政治組織'] },
  { word: '制度', reading: 'せいど', meaning: '制度', partOfSpeech: '名', level: '考研', romaji: 'seido', usage: '被确立的体系', examTip: '改革、制度类话题核心', example: '制度を改革する', exampleMeaning: '改革制度', frequency: '高', collocation: ['社会制度', '教育制度', '経済制度'] },
  { word: '政治', reading: 'せいじ', meaning: '政治', partOfSpeech: '名', level: '考研', frequency: '高' },
  // ========== 经济/商务 ==========
  { word: '産業', reading: 'さんぎょう', meaning: '产业', partOfSpeech: '名', level: '考研', romaji: 'sangyou', usage: '工业、生产事业', examTip: '经济类文章必备词汇', example: '第三次産業', exampleMeaning: '第三产业', frequency: '高', collocation: ['産業構造', '情報産業', '幼稚産業'] },
  { word: '企業', reading: 'きぎょう', meaning: '企业', partOfSpeech: '名', level: '考研', romaji: 'kigyou', usage: '以营利为目的的法人团体', examTip: '经济管理类话题常考', example: '企業を分析する', exampleMeaning: '分析企业', frequency: '高', collocation: ['企業家', '企業戦略', '外资系企業'] },
  { word: '市場', reading: 'しじょう', meaning: '市场', partOfSpeech: '名', level: '考研', romaji: 'shijou', usage: '商品交易的场所', examTip: '经济类核心词汇', example: '市場を開放する', exampleMeaning: '开放市场', frequency: '高', collocation: ['市場経済', '国際市場', '労働市場'] },
  { word: '商品', reading: 'しょうひん', meaning: '商品', partOfSpeech: '名', level: '考研', romaji: 'shouhin', usage: '用于销售的物品', examTip: '商贸类话题基础词汇', example: '商品を開発する', exampleMeaning: '开发商品', frequency: '高', collocation: ['商品化', '新商品', '商品流通'] },
  { word: '貿易', reading: 'ぼうえき', meaning: '贸易', partOfSpeech: '名', level: '考研', romaji: 'boueki', usage: '国际间的商品交易', examTip: '国际经济话题必备', example: '貿易を行う', exampleMeaning: '进行贸易', frequency: '高', collocation: ['貿易摩擦', '自由貿易', '貿易黒字'] },
  { word: '投資', reading: 'とうし', meaning: '投资', partOfSpeech: '名', level: '考研', romaji: 'toushi', usage: '投入资金以获取收益', examTip: '金融经济类常考词', example: '海外に投資する', exampleMeaning: '向海外投资', frequency: '高', collocation: ['投資家', '直接投資', '証券投資'] },
  { word: '金融', reading: 'きんゆう', meaning: '金融', partOfSpeech: '名', level: '考研', romaji: 'kinyuu', usage: '货币资金融通', examTip: '金融财经类话题核心', example: '金融危機が発生する', exampleMeaning: '发生金融危机', frequency: '高', collocation: ['金融政策', '金融市場', '金融資産'] },
  { word: '会社', reading: 'かいしゃ', meaning: '公司', partOfSpeech: '名', level: '考研', romaji: 'kaisha', usage: '企业法人团体', examTip: '职场商务类基础词汇', example: '会社を起こす', exampleMeaning: '创办公司', frequency: '高', collocation: ['会社概要', '社長', '勤め先'] },
  { word: '計画', reading: 'けいかく', meaning: '计划', partOfSpeech: '名', level: '考研', romaji: 'keikaku', usage: '为达成目标而制定的方案', examTip: '考研必备常考词', example: '計画を立てる', exampleMeaning: '制定计划', frequency: '高', collocation: ['実行計画', '事業計画', '計画的'] },
  { word: '管理', reading: 'かんり', meaning: '管理', partOfSpeech: '名', level: '考研', romaji: 'kanri', usage: '统筹安排', examTip: '经营管理类话题常用', example: '人员进行管理', exampleMeaning: '人员进行管理', frequency: '高', collocation: ['管理職', '情報管理', '品質管理'] },
  { word: '開発', reading: 'かいはつ', meaning: '开发', partOfSpeech: '名', level: '考研', romaji: 'kaihatsu', usage: '发掘资源或新技术', examTip: '科技经济类常考词', example: '新能源を開発する', exampleMeaning: '开发新能源', frequency: '高', collocation: ['技術開発', '新人開発', '開発途上国'] },
  { word: '生産', reading: 'せいさん', meaning: '生产', partOfSpeech: '名', level: '考研', romaji: 'seisan', usage: '制造产品', examTip: '经济生产类话题核心', example: '生産性を高める', exampleMeaning: '提高生产率', frequency: '高', collocation: ['生産力', '生産量', '大量生産'] },
  { word: '消費', reading: 'しょうひ', meaning: '消费', partOfSpeech: '名', level: '考研', romaji: 'shouhi', usage: '使用消耗物品', examTip: '经济民生类常考词', example: '消費を伸ばす', exampleMeaning: '扩大消费', frequency: '高', collocation: ['消費者', '消費財', '消費支出'] },
  { word: '競争', reading: 'きょうそう', meaning: '竞争', partOfSpeech: '名', level: '考研', romaji: 'kyousou', usage: '争抢取胜', examTip: '经济商业类核心词', example: '競争に勝つ', exampleMeaning: '竞争中取胜', frequency: '高', collocation: ['竞争力的', '市場競争', '価格競争'] },
  { word: '成功', reading: 'せいこう', meaning: '成功', partOfSpeech: '名', level: '考研', romaji: 'seikou', usage: '达成目标', examTip: '考研必备常考词', example: '事業に成功する', exampleMeaning: '事业成功', frequency: '高', collocation: ['成功裏', '成功率', '成功体験'] },
  { word: '失敗', reading: 'しっぱい', meaning: '失败', partOfSpeech: '名', level: '考研', romaji: 'shippai', usage: '未达到预期目的', examTip: '考研常考词，常与「する」连用', example: '改革が失敗する', exampleMeaning: '改革失败', frequency: '高', collocation: ['失敗作', '失敗例', '失敗談'] },
  // ========== 教育/研究 ==========
  { word: '教育', reading: 'きょういく', meaning: '教育', partOfSpeech: '名', level: '考研', romaji: 'kyouiku', usage: '培养人才的活动', examTip: '考研必备常考词', example: '教育改革を進める', exampleMeaning: '推进教育改革', frequency: '高', collocation: ['教育改革', '教育方針', '义务教育'] },
  { word: '学校', reading: 'がっこう', meaning: '学校', partOfSpeech: '名', level: '考研', romaji: 'gakkou', usage: '教育机构', examTip: '基础词汇，各种话题均可', example: '学校に通ら', exampleMeaning: '上学', frequency: '高', collocation: ['学校教育', '学校側', '学校法人'] },
  { word: '学生', reading: 'がくせい', meaning: '学生', partOfSpeech: '名', level: '考研', romaji: 'gakusei', usage: '在校学习的人', examTip: '基础词汇，社会话题常考', example: '大学院生', exampleMeaning: '研究生', frequency: '高', collocation: ['大学生', '留学生', '卒業'] },
  { word: '研究', reading: 'けんきゅう', meaning: '研究', partOfSpeech: '名', level: '考研', romaji: 'kenkyuu', usage: '深入探讨', examTip: '考研必备，学术类话题核心', example: '科学研究を行う', exampleMeaning: '进行科学研究', frequency: '高', collocation: ['研究者', '研究室', '研究課題'] },
  { word: '知識', reading: 'ちしき', meaning: '知识', partOfSpeech: '名', level: '考研', romaji: 'chishiki', usage: '通过学习获得的信息', examTip: '教育文化类话题常用', example: '知識を深める', exampleMeaning: '深化知识', frequency: '高', collocation: ['専門知識', '知識人', '知識水準'] },
  { word: '学問', reading: 'がくもん', meaning: '学问', partOfSpeech: '名', level: '考研', romaji: 'gakumon', usage: '系统的知识', examTip: '学术研究类话题常用', example: '学問を修める', exampleMeaning: '修习学问', frequency: '高', collocation: ['学問的', '自由学問', '実学'] },
  { word: '科学', reading: 'かがく', meaning: '科学', partOfSpeech: '名', level: '考研', romaji: 'kagaku', usage: '系统化的知识体系', examTip: '科技类话题必备词', example: '科学技術を 발전시키다', exampleMeaning: '发展科学技术', frequency: '高', collocation: ['科学者', '自然科学', '科学技術'] },
  { word: '技術', reading: 'ぎじゅつ', meaning: '技术', partOfSpeech: '名', level: '考研', romaji: 'gijutsu', usage: '实际操作的方法', examTip: '科技发展类话题核心', example: '技術が进步する', exampleMeaning: '技术进步', frequency: '高', collocation: ['技術革新', '先端技術', '専門技術'] },
  { word: '専門', reading: 'せんもん', meaning: '专业', partOfSpeech: '名', level: '考研', romaji: 'senmon', usage: '特定的学术领域', examTip: '教育职业类话题常用', example: '専門が異なる', exampleMeaning: '专业不同', frequency: '高', collocation: ['専門家', '専攻', '専門用語'] },
  { word: '能力', reading: 'のうりょく', meaning: '能力', partOfSpeech: '名', level: '考研', romaji: 'nouryoku', usage: '完成事情的力量', examTip: '考研常考词', example: '能力を発揮する', exampleMeaning: '发挥能力', frequency: '高', collocation: ['記憶能力', '言語能力', '能力試験'] },
  { word: '経験', reading: 'けいけん', meaning: '经验', partOfSpeech: '名', level: '考研', romaji: 'keiken', usage: '从实践中获得的知识', examTip: '考研高频词', example: '経験を積む', exampleMeaning: '积累经验', frequency: '高', collocation: ['人生経験', '工作经验', '経験談'] },
  // ========== 文化/歴史/伝統 ==========
  { word: '文化', reading: 'ぶんか', meaning: '文化', partOfSpeech: '名', level: '考研', romaji: 'bunka', usage: '人类创造的精神物质财富', examTip: '文化社会类话题必备', example: '文化交流を行う', exampleMeaning: '进行文化交流', frequency: '高', collocation: ['異文化', '現代文化', '文化遺産'] },
  { word: '歴史', reading: 'れきし', meaning: '历史', partOfSpeech: '名', level: '考研', romaji: 'rekishi', usage: '过去发生的事件', examTip: '考研必备常考词', example: '歴史を学ぶ', exampleMeaning: '学习历史', frequency: '高', collocation: ['歴史的背景', '近代史', '歴史認識'] },
  { word: '伝統', reading: 'でんとう', meaning: '传统', partOfSpeech: '名', level: '考研', romaji: 'dentou', usage: '代代相传的风俗习惯', examTip: '文化类话题核心词', example: '伝統を守る', exampleMeaning: '守护传统', frequency: '高', collocation: ['伝統文化', '伝統的', '悪習'] },
  { word: '現代', reading: 'げんだい', meaning: '现代', partOfSpeech: '名', level: '考研', romaji: 'gendai', usage: '当前所处的时代', examTip: '时事话题常考词', example: '現代社会に適応する', exampleMeaning: '适应现代社会', frequency: '高', collocation: ['現代日本語', '現代社会', '現代美術'] },
  { word: '生活', reading: 'せいかつ', meaning: '生活', partOfSpeech: '名', level: '考研', romaji: 'seikatsu', usage: '日常生存状态', examTip: '社会民生类话题必备', example: '水準を高める', exampleMeaning: '提高生活水平', frequency: '高', collocation: ['日常生活', '社会生活', '生活費'] },
  { word: '宗教', reading: 'しゅうきょう', meaning: '宗教', partOfSpeech: '名', level: '考研', romaji: 'shuukyou', usage: '对超自然力量的信仰', examTip: '文化类话题常见', example: '宗教を信仰する', exampleMeaning: '信仰宗教', frequency: '高', collocation: ['宗教的自由', '宗教戦争', '宗教施設'] },
  { word: '芸術', reading: 'げいじゅつ', meaning: '艺术', partOfSpeech: '名', level: '考研', romaji: 'geijutsu', usage: '创造性审美活动', examTip: '文化类话题常用词', example: '芸術作品を作る', exampleMeaning: '创作艺术作品', frequency: '高', collocation: ['芸術家', '芸術的', '伝統芸術'] },
  { word: '言語', reading: 'げんご', meaning: '语言', partOfSpeech: '名', level: '考研', romaji: 'gengo', usage: '交流工具', examTip: '语言学文化类话题常用', example: '言語を獲得する', exampleMeaning: '获得语言', frequency: '高', collocation: ['言語学', '日本語', '.Foreign語'] },
  // ========== 科技/環境 ==========
  { word: '環境', reading: 'かんきょう', meaning: '环境', partOfSpeech: '名', level: '考研', romaji: 'kankyou', usage: '周围的条件', examTip: '考研超高频，环保类必备', example: '環境を守る', exampleMeaning: '保护环境', frequency: '高', collocation: ['環境問題', '自然環境', '環境汚染'] },
  { word: '資源', reading: 'しげん', meaning: '资源', partOfSpeech: '名', level: '考研', romaji: 'shigen', usage: '可利用的物质', examTip: '环保经济类话题常考', example: '天然資源を守る', exampleMeaning: '保护天然资源', frequency: '高', collocation: ['天然資源', '人的資源', '資源開発'] },
  { word: '宇宙', reading: 'うちゅう', meaning: '宇宙', partOfSpeech: '名', level: '考研', romaji: 'uchuu', usage: '包括天体在内的无限空间', examTip: '科技类话题常见', example: '宇宙を探索する', exampleMeaning: '探索宇宙', frequency: '高', collocation: ['宇宙開発', '宇宙船', '宇宙科学'] },
  { word: '情報', reading: 'じょうほう', meaning: '信息', partOfSpeech: '名', level: '考研', romaji: 'jouhou', usage: '有意义的数据', examTip: '考研超高频，信息时代必备', example: '情報を收集する', exampleMeaning: '收集信息', frequency: '高', collocation: ['情報化', ' 情報社会', '個人情報の'] },
  { word: '技術', reading: 'ぎじゅつ', meaning: '技术', partOfSpeech: '名', level: '考研', frequency: '高' },
  { word: '機器', reading: 'きき', meaning: '机器设备', partOfSpeech: '名', level: '考研', romaji: 'kiki', usage: '机械装置', examTip: '科技类话题常用', example: '精密機器を製造する', exampleMeaning: '制造精密机器', frequency: '高', collocation: ['事務機器', '測定機器', '医療機器'] },
  { word: '通信', reading: 'つうしん', meaning: '通信', partOfSpeech: '名', level: '考研', romaji: 'tsuushin', usage: '信息传递', examTip: '信息技术类话题常用', example: '通信技術を発達する', exampleMeaning: '通信技术发达', frequency: '高', collocation: ['通信販売', '通信網', '光通信'] },
  { word: '网络', reading: 'もうふく', meaning: '网络', partOfSpeech: '名', level: '考研', romaji: 'mouhuku', usage: '像网一样纵横交错的系统', examTip: '信息时代核心词汇', example: '网络社会', exampleMeaning: '网络社会', frequency: '高', collocation: ['信息网络', 'ネットワーク', '网络的'] },
  // ========== 社会/人間 ==========
  { word: '人間', reading: 'にんげん', meaning: '人、人类', partOfSpeech: '名', level: '考研', romaji: 'ningen', usage: '人类', examTip: '考研高频，人性类话题必备', example: '人間関係が大切だ', exampleMeaning: '人际关系很重要', frequency: '高', collocation: ['人間関係', '人性的', '人間国宝'] },
  { word: '個人', reading: 'こじん', meaning: '个人', partOfSpeech: '名', level: '考研', romaji: 'kojin', usage: '单个的人', examTip: '社会个人话题常用词', example: '個人の自由を守る', exampleMeaning: '保护个人自由', frequency: '高', collocation: ['個人情報', '個人の権利', '個人主義'] },
  { word: '家族', reading: 'かぞく', meaning: '家庭', partOfSpeech: '名', level: '考研', romaji: 'kazoku', usage: '有血缘关系的人', examTip: '社会生活类话题常用', example: '核家族', exampleMeaning: '核心家庭', frequency: '高', collocation: ['家族構成', '大家庭', '家族写真'] },
  { word: '人口', reading: 'じんこう', meaning: '人口', partOfSpeech: '名', level: '考研', romaji: 'jinkou', usage: '居住在一个地区的人数', examTip: '社会问题类话题常考', example: '人口が増える', exampleMeaning: '人口增加', frequency: '高', collocation: ['人口問題', '人口増加', '老年人口'] },
  { word: '民族', reading: 'みんぞく', meaning: '民族', partOfSpeech: '名', level: '考研', romaji: 'minzoku', usage: '有共同文化的群体', examTip: '历史文化类话题常用', example: '民族衣装', exampleMeaning: '民族服装', frequency: '高', collocation: ['少数民族', '民族問題', '民族意識'] },
  { word: '世代', reading: 'せだい', meaning: '世代', partOfSpeech: '名', level: '考研', romaji: 'sedai', usage: '相差不同时代出生的群体', examTip: '社会变迁类话题常用', example: '次世代の指導者', exampleMeaning: '下一代领导者', frequency: '高', collocation: ['世代間', '新旧世代', '世代交代'] },
  { word: '老人', reading: 'ろうじん', meaning: '老人', partOfSpeech: '名', level: '考研', romaji: 'roujin', usage: '年纪大的人', examTip: '老龄化社会话题常考', example: '老人介護', exampleMeaning: '老人护理', frequency: '高', collocation: ['老年人', '敬老', '老齢'] },
  { word: '子供', reading: 'こども', meaning: '孩子', partOfSpeech: '名', level: '考研', romaji: 'kodomo', usage: '年幼的人', examTip: '教育家庭类话题必备', example: '子供教育', exampleMeaning: '儿童教育', frequency: '高', collocation: ['子供心', '未来の子供', '小孩子'] },
  { word: '女性', reading: 'じょせい', meaning: '女性', partOfSpeech: '名', level: '考研', romaji: 'josei', usage: '女子、妇女', examTip: '社会性别话题常用词', example: '女性の権利', exampleMeaning: '女性权利', frequency: '高', collocation: ['女性蔑視', '職業女性', '女性向け'] },
  { word: '男性', reading: 'だんせい', meaning: '男性', partOfSpeech: '名', level: '考研', romaji: 'dansei', usage: '男子', examTip: '社会性别话题常用词', example: '男性優位的社会', exampleMeaning: '男性占优势的社会', frequency: '高', collocation: ['男性向け', '男性的', '男性優位'] },
  // ========== 心理/思想/感情 ==========
  { word: '心理', reading: 'しんり', meaning: '心理', partOfSpeech: '名', level: '考研', romaji: 'shinri', usage: '内心的精神活动', examTip: '心理类话题常用词', example: '心理状態を把握する', exampleMeaning: '把握心理状态', frequency: '高', collocation: ['心理学', '心理的', '子供心理'] },
  { word: '感情', reading: 'かんじょう', meaning: '感情', partOfSpeech: '名', level: '考研', romaji: 'kanjou', usage: '喜怒哀乐等情绪', examTip: '心理人性类话题常用', example: '感情を込めて話す', exampleMeaning: '充满感情地说', frequency: '高', collocation: ['感情的', '感情表現', '怒りの感情'] },
  { word: '意識', reading: 'いしき', meaning: '意识', partOfSpeech: '名', level: '考研', romaji: 'ishiki', usage: '对事物的认知', examTip: '考研高频词，哲学社会类常考', example: '環境意識を高める', exampleMeaning: '提高环境意识', frequency: '高', collocation: ['意識改革', ' Self意識', '意識的'] },
  { word: '思想', reading: 'しそう', meaning: '思想', partOfSpeech: '名', level: '考研', romaji: 'shisou', usage: '思考活动及其结果', examTip: '哲学文化类话题核心词', example: '思想の流れ', exampleMeaning: '思想的潮流', frequency: '高', collocation: ['思想的', '思想史', '外来思想'] },
  { word: '理性', reading: 'りせい', meaning: '理性', partOfSpeech: '名', level: '考研', romaji: 'risei', usage: '分辨是非的能力', examTip: '哲学思想类话题常用', example: '理性的に判断する', exampleMeaning: '理性判断', frequency: '高', collocation: ['理性的', '理性主義', '理性の判断'] },
  { word: '感情', reading: 'かんじょう', meaning: '感情', partOfSpeech: '名', level: '考研', frequency: '高' },
  { word: '精神', reading: 'せいしん', meaning: '精神', partOfSpeech: '名', level: '考研', romaji: 'seishin', usage: '人的意识思维', examTip: '哲学心理类话题核心词', example: '精神病', exampleMeaning: '精神病', frequency: '高', collocation: ['精神的な', '精神薄弱', '精神状態'] },
  // ========== 自然/宇宙/地理 ==========
  { word: '自然', reading: 'しぜん', meaning: '自然', partOfSpeech: '名', level: '考研', romaji: 'shizen', usage: '自然界', examTip: '环保类话题必备词', example: '自然に親しむ', exampleMeaning: '亲近自然', frequency: '高', collocation: ['自然保护区', '自然界', '自然現象'] },
  { word: '地球', reading: 'ちきゅう', meaning: '地球', partOfSpeech: '名', level: '考研', romaji: 'chikyuu', usage: '人类居住的星球', examTip: '环保科技类话题必备', example: '地球環境を守る', exampleMeaning: '保护地球环境', frequency: '高', collocation: ['地球規模', '地球儀', '地球環境'] },
  { word: '宇宙', reading: 'うちゅう', meaning: '宇宙', partOfSpeech: '名', level: '考研', frequency: '高' },
  { word: '山', reading: 'やま', meaning: '山', partOfSpeech: '名', level: '考研', romaji: 'yama', usage: '地面高耸的部分', examTip: '地理风景类话题基础词', example: '山に登る', exampleMeaning: '登山', frequency: '高', collocation: ['山脈', '富士山', '登山'] },
  { word: '川', reading: 'かわ', meaning: '河', partOfSpeech: '名', level: '考研', romaji: 'kawa', usage: '流淌的水道', examTip: '地理类话题基础词', example: '川が流れる', exampleMeaning: '河水流淌', frequency: '高', collocation: ['川岸', '河の流れ', '信濃川'] },
  { word: '海', reading: 'うみ', meaning: '海', partOfSpeech: '名', level: '考研', romaji: 'umi', usage: '大洋的一部分', examTip: '地理资源类话题常用', example: '海産物', exampleMeaning: '海产品', frequency: '高', collocation: ['海洋', '海上', '海運'] },
  // ========== 抽象概念/状態 ==========
  { word: '状態', reading: 'じょうたい', meaning: '状态', partOfSpeech: '名', level: '考研', romaji: 'joutai', usage: '呈现的样子', examTip: '考研常考词', example: '現状の状態', exampleMeaning: '现在的状态', frequency: '高', collocation: ['健康状態', '経済状態', '精神状態'] },
  { word: '原因', reading: 'げんいん', meaning: '原因', partOfSpeech: '名', level: '考研', romaji: 'genin', usage: '造成某种结果的条件', examTip: '分析类文章必备词', example: '原因を調查する', exampleMeaning: '调查原因', frequency: '高', collocation: ['主要原因', '結果原因', '原因究明'] },
  { word: '結果', reading: 'けっか', meaning: '结果', partOfSpeech: '名', level: '考研', romaji: 'kekka', usage: '因某种原因而产生的情况', examTip: '考研高频，分析类必备', example: '結果적으로', exampleMeaning: '结果上', frequency: '高', collocation: ['結果発表', '原因結果', '成果'] },
  { word: '意味', reading: 'いみ', meaning: '意思、意义', partOfSpeech: '名', level: '考研', romaji: 'imi', usage: '语言文字的内容', examTip: '考研必备常考词', example: '意味がない', exampleMeaning: '没有意义', frequency: '高', collocation: ['意味深長', '無意味', '意味不明'] },
  { word: '目的', reading: 'もくてき', meaning: '目的', partOfSpeech: '名', level: '考研', romaji: 'mokuteki', usage: '想要达成的目标', examTip: '考研必备词', example: '目的は異なる', exampleMeaning: '目的不同', frequency: '高', collocation: ['目的意識', '到達目的', '最終目的'] },
  { word: '理由', reading: 'りゆう', meaning: '理由', partOfSpeech: '名', level: '考研', romaji: 'riyuu', usage: '事情发生的原因', examTip: '论证类话题常用词', example: '理由を述べる', exampleMeaning: '阐述理由', frequency: '高', collocation: ['理由充足的', '理由不明', '理由なく'] },
  { word: '根拠', reading: 'こんきょ', meaning: '根据', partOfSpeech: '名', level: '考研', romaji: 'konkyo', usage: '判断事物的依据', examTip: '论证类话题常用词', example: ' научный根拠', exampleMeaning: '科学根据', frequency: '高', collocation: ['事実根拠', '法的根拠', '理論的根拠'] },
  { word: '本質', reading: 'ほんしつ', meaning: '本质', partOfSpeech: '名', level: '考研', romaji: 'honshitsu', usage: '事物固有的根本属性', examTip: '哲学分析类话题核心', example: '本質を見抜く', exampleMeaning: '看穿本质', frequency: '高', collocation: ['本質的', '本質理解', '本質的な問題'] },
  { word: '可能性', reading: 'かのうせい', meaning: '可能性', partOfSpeech: '名', level: '考研', romaji: 'kanousei', usage: '可以实现的机会', examTip: '考研常考词', example: '可能性がある', exampleMeaning: '有可能', frequency: '高', collocation: ['可能性のある', '可能性が低い', '可能性を示す'] },
  { word: '機会', reading: 'きかい', meaning: '机会', partOfSpeech: '名', level: '考研', romaji: 'kikai', usage: '可以实现愿望的良机', examTip: '考研高频词', example: '機会を逃がす', exampleMeaning: '错过机会', frequency: '高', collocation: ['絶好の機', '雇用機会', '学習機会'] },
  // ========== 形容詞/形容動詞 ==========
  { word: '重要', reading: 'じゅうよう', meaning: '重要', partOfSpeech: '形', level: '考研', romaji: 'juuyou', usage: '具有重大意义', examTip: '考研超高频词', example: '重要性を認識する', exampleMeaning: '认识到重要性', frequency: '高', collocation: ['重要性を保つ', '最重要', '極めて重要'] },
  { word: '必要', reading: 'ひつよう', meaning: '必要', partOfSpeech: '形', level: '考研', romaji: 'hitsuyou', usage: '不可或缺', examTip: '考研必备常考词', example: '必要性がある', exampleMeaning: '有必要', frequency: '高', collocation: ['必要十分', '不必要', '生存に必需'] },
  { word: '可能', reading: 'かのう', meaning: '可能', partOfSpeech: '形', level: '考研', romaji: 'kanou', usage: '可以实现', examTip: '考研高频词', example: '不可能', exampleMeaning: '不可能', frequency: '高', collocation: ['可能性', '不可能', '可能的な'] },
  { word: '必要', reading: 'ひつよう', meaning: '必要', partOfSpeech: '形', level: '考研', frequency: '高' },
  { word: '各種', reading: 'かくしゅ', meaning: '各种', partOfSpeech: '名', level: '考研', romaji: 'kakushu', usage: '多个种类', examTip: '考研常考词', example: '各種の問題', exampleMeaning: '各种问题', frequency: '高', collocation: ['各種団体', '各種書類', '各族'] },
  { word: '一定', reading: 'いってい', meaning: '一定', partOfSpeech: '名', level: '考研', romaji: 'ittei', usage: '固定不变', examTip: '考研常考词', example: '一定の条件下', exampleMeaning: '在一定条件下', frequency: '高', collocation: ['一定期間', '一定数量', '一定温度'] },
  { word: ' особлив', reading: 'とくべつ', meaning: '特别', partOfSpeech: '形', level: '考研', romaji: 'tokubetsu', usage: '与众不同', examTip: '考研高频词', example: '特に必要がある', exampleMeaning: '特别有必要', frequency: '高', collocation: ['特別に', '特別美しい', '特別な場合'] },
  { word: '具体的', reading: 'ぐたいてき', meaning: '具体的', partOfSpeech: '形', level: '考研', romaji: 'gutai-teki', usage: '明确的、非抽象的', examTip: '论证说明类文章必备', example: '具体的に説明する', exampleMeaning: '具体说明', frequency: '高', collocation: ['具体的計画', '具体性', '具体的事項'] },
  { word: '特殊的', reading: 'とくしゅてき', meaning: '特殊的', partOfSpeech: '形', level: '考研', romaji: 'tokushuteki', usage: '超出一般的', examTip: '考研常考词', example: '特殊情况', exampleMeaning: '特殊情况', frequency: '高', collocation: ['特殊性', '特殊教育', '特殊機能'] },
  { word: '十分な', reading: 'じゅうぶん', meaning: '充分的', partOfSpeech: '形', level: '考研', romaji: 'juubun', usage: '足够', examTip: '考研高频词', example: '十分に注意する', exampleMeaning: '充分注意', frequency: '高', collocation: ['充分な根拠', '充分に', '不充分'] },
  { word: '必要な', reading: 'ひつような', meaning: '必要的', partOfSpeech: '形', level: '考研', romaji: 'hitsuyouna', usage: '必不可少的', examTip: '考研必备词', example: '必要な条件', exampleMeaning: '必要的条件', frequency: '高', collocation: ['必要充分', '不必要', '必需'] },
  // ========== 動詞 ==========
  { word: 'する', reading: 'する', meaning: '做、干', partOfSpeech: '动', level: '考研', romaji: 'suru', usage: '表示各种动作行为', examTip: '考研最高频词，用法极多', example: '勉強する', exampleMeaning: '学习', frequency: '高', collocation: ['影響する', '興味がある', '利用する'] },
  { word: '見る', reading: 'みる', meaning: '看', partOfSpeech: '动', level: '考研', romaji: 'miru', usage: '用眼睛看', examTip: '考研高频一段动词', example: '映画を見る', exampleMeaning: '看电影', frequency: '高', collocation: ['観察する', '見つめる', '見直す'] },
  { word: '行く', reading: 'いく', meaning: '去', partOfSpeech: '动', level: '考研', romaji: 'iku', usage: '从所在地点到别处', examTip: '考研高频特殊五段动词', example: '学校に行く', exampleMeaning: '去学校', frequency: '高', collocation: ['に向かって行く', '行かせる', '進出する'] },
  { word: '来る', reading: 'くる', meaning: '来', partOfSpeech: '动', level: '考研', romaji: 'kuru', usage: '从别处到这里', examTip: '考研高频特殊动词', example: '日本に来る', exampleMeaning: '来日本', frequency: '高', collocation: ['連れてくる', 'やってくる', '想いを寄せる'] },
  { word: '言う', reading: 'いう', meaning: '说', partOfSpeech: '动', level: '考研', romaji: 'iu', usage: '用语言表达', examTip: '考研高频词', example: '日本語で言う', exampleMeaning: '用日语说', frequency: '高', collocation: ['称之为', '要である', '意思表示'] },
  { word: '考える', reading: 'かんがえる', meaning: '考虑、认为', partOfSpeech: '动', level: '考研', romaji: 'kangaeru', usage: '思考', examTip: '考研高频一段动词', example: 'よく考える', exampleMeaning: '仔细考虑', frequency: '高', collocation: ['思考する', '分析方法', '批判的に検討する'] },
  { word: '思う', reading: 'おもう', meaning: '想、认为', partOfSpeech: '动', level: '考研', romaji: 'omou', usage: '思考、相信', examTip: '考研高频五段动词', example: '真実だ思う', exampleMeaning: '认为是真实的', frequency: '高', collocation: ['想念', '，思料', 'thought'] },
  { word: '分かる', reading: 'わかる', meaning: '懂、明白', partOfSpeech: '动', level: '考研', romaji: 'wakaru', usage: '理解、知道', examTip: '考研高频五段动词', example: '意味が分かる', exampleMeaning: '懂意思', frequency: '高', collocation: ['理解する', '知見', '認識する'] },
  { word: '知る', reading: 'しる', meaning: '知道', partOfSpeech: '动', level: '考研', romaji: 'shiru', usage: '了解、掌握', examTip: '考研高频五段动词', example: '真相を知る', exampleMeaning: '了解真相', frequency: '高', collocation: ['認識する', '既知の', '知悉する'] },
  { word: '使う', reading: 'つかう', meaning: '使用', partOfSpeech: '动', level: '考研', romaji: 'tsukau', usage: '使人员或物品为一定目的服务', examTip: '考研高频五段动词', example: '日本語を使う', exampleMeaning: '使用日语', frequency: '高', collocation: ['使用禁止', '利用率', '使用に耐える'] },
  { word: '及ぼす', reading: 'およぼす', meaning: '波及、影响到', partOfSpeech: '动', level: '考研', romaji: 'oyobosu', usage: '使受到影响', examTip: '考研常考词，常与「影響」连用', example: '影響を及ぼす', exampleMeaning: '带来影响', frequency: '高', collocation: ['被害を及ぼす', '影響波及', 'span'] },
  { word: '示す', reading: 'しめす', meaning: '表示、显示', partOfSpeech: '动', level: '考研', romaji: 'shimesu', usage: '让对方知道', examTip: '考研高频五段动词', example: 'データを示す', exampleMeaning: '显示数据', frequency: '高', collocation: ['標本を示す', '事実を示す', '証拠を示す'] },
  { word: '合う', reading: 'あう', meaning: '适合、一致', partOfSpeech: '动', level: '考研', romaji: 'au', usage: '互相吻合', examTip: '考研常考词，常用复合形式', example: 'りに合う', exampleMeaning: '合乎道理', frequency: '高', collocation: [' FACE合う', '見合う', '程良い'] },
  { word: '進める', reading: 'すすめる', meaning: '推进', partOfSpeech: '动', level: '考研', romaji: 'susumeru', usage: '使向前进', examTip: '考研高频一段动词', example: '改革を進める', exampleMeaning: '推进改革', frequency: '高', collocation: ['進行する', '進捗', '開発に進める'] },
  { word: '進める', reading: 'すすめる', meaning: '推进', partOfSpeech: '动', level: '考研', frequency: '高' },
  { word: '続ける', reading: 'つづける', meaning: '继续', partOfSpeech: '动', level: '考研', romaji: 'tsuzukeru', usage: '不停止地持续', examTip: '考研高频一段动词', example: '進捗し続けている', exampleMeaning: '持续取得进展', frequency: '高', collocation: ['続く', '継続する', '_States'] },
  { word: '終わる', reading: 'おわる', meaning: '结束', partOfSpeech: '动', level: '考研', romaji: 'owaru', usage: '终止、完结', examTip: '考研高频五段动词', example: '会議が終わる', exampleMeaning: '会议结束', frequency: '高', collocation: ['終了', '完遂', 'Termination'] },
  { word: '始める', reading: 'はじめる', meaning: '开始', partOfSpeech: '动', level: '考研', romaji: 'hajimeru', usage: '使开始', examTip: '考研高频一段动词', example: '研究を始める', exampleMeaning: '开始研究', frequency: '高', collocation: [' начало', '起始', '開始'] },
  { word: '変わる', reading: 'かわる', meaning: '变化', partOfSpeech: '动', level: '考研', romaji: 'kawaru', usage: '与以前不同', examTip: '考研高频五段动词', example: '変わり続ける', exampleMeaning: '持续变化', frequency: '高', collocation: ['変容', '変化', 'Transition'] },
  { word: '保つ', reading: 'たもつ', meaning: '保持', partOfSpeech: '动', level: '考研', romaji: 'tamotsu', usage: '维持原状', examTip: '考研高频五段动词', example: '平衡を保つ', exampleMeaning: '保持平衡', frequency: '高', collocation: ['保存', '維持する', '持続'] },
  { word: '含む', reading: 'ふくむ', meaning: '包含、含有', partOfSpeech: '动', level: '考研', romaji: 'fukumu', usage: '整体中含有', examTip: '考研高频五段动词', example: '重要性を含む', exampleMeaning: '包含重要性', frequency: '高', collocation: ['内包', '包含', '含有'] },
  { word: '得る', reading: 'える', meaning: '得到', partOfSpeech: '动', level: '考研', romaji: 'eru', usage: '获得', examTip: '考研高频一段动词', example: '了解を得る', exampleMeaning: '获得理解', frequency: '高', collocation: ['獲得', ' 취득', '実現'] },
  { word: '生ずる', reading: 'しょうずる', meaning: '产生', partOfSpeech: '动', level: '考研', romaji: 'shouzuru', usage: '发生、引起', examTip: '考研高频サ变动词', example: '問題を引起的', exampleMeaning: '引起问题', frequency: '高', collocation: ['生出', ' Cause', 'もたらす'] },
  { word: '存在する', reading: 'そんざいする', meaning: '存在', partOfSpeech: '动', level: '考研', romaji: 'sonzai suru', usage: '实际上有', examTip: '考研高频サ变动词', example: '不合理が存在する', exampleMeaning: '存在不合理', frequency: '高', collocation: ['存在意義', '存在的', '现有'] },
  { word: '増加する', reading: 'ぞうかする', meaning: '增加', partOfSpeech: '动', level: '考研', romaji: 'zouka suru', usage: '数量增多', examTip: '考研高频サ变动词', example: '人口が増加する', exampleMeaning: '人口增加', frequency: '高', collocation: ['増加率', '増加傾向', '急増'] },
  { word: '減少する', reading: 'げんしょうする', meaning: '减少', partOfSpeech: '动', level: '考研', romaji: 'genshou suru', usage: '数量变少', examTip: '考研高频サ变动词', example: '出荷が減少する', exampleMeaning: '出货减少', frequency: '高', collocation: ['減少傾向', '減耗', '递减'] },
  { word: '異なる', reading: 'ことなる', meaning: '不同', partOfSpeech: '动', level: '考研', romaji: 'kotonaru', usage: '互相不一致', examTip: '考研高频五段动词', example: '看法が異なる', exampleMeaning: '看法不同', frequency: '高', collocation: ['差異', '違う', ' 구별'] },
  { word: '認める', reading: 'みとめる', meaning: '承认', partOfSpeech: '动', level: '考研', romaji: 'mitomeru', usage: '肯定其存在或价值', examTip: '考研高频一段动词', example: '価値を認める', exampleMeaning: '承认价值', frequency: '高', collocation: ['確認', '認知', ' Acknowledge'] },
  { word: '考える', reading: 'かんがえる', meaning: '考虑', partOfSpeech: '动', level: '考研', frequency: '高' },
  // ========== 副詞 ==========
  { word: '特に', reading: 'とく', meaning: '特别', partOfSpeech: '副', level: '考研', romaji: 'toku', usage: '强调事物突出', examTip: '考研高频副词', example: '特に重要', exampleMeaning: '特别重要', frequency: '高', collocation: ['特別に', 'とりわけ', ' 중 особенно'] },
  { word: '一般に', reading: 'いっぱん', meaning: '一般来说', partOfSpeech: '副', level: '考研', romaji: 'ippan', usage: '表示普遍性', examTip: '考研高频副词', example: '一般に言われる', exampleMeaning: '一般来说', frequency: '高', collocation: ['一般的に', '一般論', '一般的な'] },
  { word: '事実', reading: 'じじつ', meaning: '事实上', partOfSpeech: '副', level: '考研', romaji: 'jijitsu', usage: '表示情况属实', examTip: '考研高频副词', example: '事実誤認', exampleMeaning: '事实误认', frequency: '高', collocation: ['事実上', ' 사실', 'Actual'] },
  { word: '現在', reading: 'げんざい', meaning: '目前', partOfSpeech: '副', level: '考研', romaji: 'genzai', usage: '说话时', examTip: '考研高频时间副词', example: '現在進行中', exampleMeaning: '目前进行中', frequency: '高', collocation: ['現代の', '現在の', ' Existing'] },
  { word: '既に', reading: 'すでに', meaning: '已经', partOfSpeech: '副', level: '考研', romaji: 'sueni', usage: '已经发生', examTip: '考研高频副词', example: '既に解決済み', exampleMeaning: '已经解决', frequency: '高', collocation: ['まだ', '未だ', 'Already'] },
  { word: '特に', reading: 'と', meaning: '特别', partOfSpeech: '副', level: '考研', frequency: '高' },
  // ========== 名詞（追加）==========
  { word: '問題', reading: 'もんだい', meaning: '问题', partOfSpeech: '名', level: '考研', romaji: 'mondai', usage: '需要解决的课题', examTip: '考研超高频词', example: '問題を解決する', exampleMeaning: '解决问题', frequency: '高', collocation: ['問題点', '問題提起', '社会問題'] },
  { word: '象', reading: 'しょう', meaning: '现象', partOfSpeech: '名', level: '考研', romaji: 'shou', usage: '表现出来的情况', examTip: '考研常考词', example: '自然現象', exampleMeaning: '自然现象', frequency: '高', collocation: ['社会現象', '心理現象', '物理現象'] },
  { word: '分野', reading: 'ぶんや', meaning: '领域', partOfSpeech: '名', level: '考研', romaji: 'bunya', usage: '学术或活动的范围', examTip: '考研常考词', example: '別の分野', exampleMeaning: '另一个领域', frequency: '高', collocation: ['研究分野', '専門分野', '異分野'] },
  { word: '観点', reading: 'かいてん', meaning: '观点', partOfSpeech: '名', level: '考研', romaji: 'kaiten', usage: '看问题的角度', examTip: '考研论证类必备词', example: '別の観点から見る', exampleMeaning: '从另一角度看待', frequency: '高', collocation: ['視点', '見地', '意見'] },
  { word: '側面', reading: 'そくめん', meaning: '侧面', partOfSpeech: '名', level: '考研', romaji: 'sokumen', usage: '事物的一个方面', examTip: '考研常考词', example: '経済的側面に注目する', exampleMeaning: '关注经济侧面', frequency: '高', collocation: ['各側面', '側面から', '侧面的'] },
  { word: '見地', reading: 'けんち', meaning: '见地、立场', partOfSpeech: '名', level: '考研', romaji: 'kenchi', usage: '观察判断事物的立场', examTip: '考研常考词', example: '教育的見地', exampleMeaning: '从教育角度', frequency: '高', collocation: ['見地不同的', '学術的見地', '実際的見地'] },
  { word: '形', reading: 'かたち', meaning: '形式、外形', partOfSpeech: '名', level: '考研', romaji: 'katachi', usage: '事物的外形或结构', examTip: '考研常考词', example: '新しい形', exampleMeaning: '新形式', frequency: '高', collocation: ['形態', '形而上', '形的'] },
  { word: '型', reading: 'かた', meaning: '模型、类型', partOfSpeech: '名', level: '考研', romaji: 'kata', usage: '事物的类型', examTip: '考研常考词', example: '型通りの', exampleMeaning: '按惯例', frequency: '高', collocation: ['類型', '血型', '形式型'] },
  { word: '立場', reading: 'たちは', meaning: '立场', partOfSpeech: '名', level: '考研', romaji: 'tachiba', usage: '所处的地位或境遇', examTip: '考研必备常考词', example: 'rafa立场的', exampleMeaning: '从...立场', frequency: '高', collocation: ['立場上的', '臨床立場', ' Display'] },
  { word: '保障', reading: 'ほしょう', meaning: '保障', partOfSpeech: '名', level: '考研', romaji: 'hoshou', usage: '保护使不受损失', examTip: '考研常考词', example: '生活保障', exampleMeaning: '生活保障', frequency: '高', collocation: ['社会保障', '安全保障', '年老保障'] },
  { word: '権利', reading: 'けんり', meaning: '权利', partOfSpeech: '名', level: '考研', romaji: 'kenri', usage: '法律上赋予的权利', examTip: '考研必备常考词', example: '権利|ga aru', exampleMeaning: '有权利', frequency: '高', collocation: [' 所有権利', '基本的権利', '財産権'] },
  { word: '価値', reading: 'かち', meaning: '价值', partOfSpeech: '名', level: '考研', romaji: 'kachi', usage: '值得珍视的性质', examTip: '考研常考词', example: '価値観', exampleMeaning: '价值观', frequency: '高', collocation: ['価値観念', '経済価値', '美的価値'] },
  { word: '点', reading: 'てん', meaning: '点', partOfSpeech: '名', level: '考研', romaji: 'ten', usage: '事物的某个方面', examTip: '考研高频词', example: '長所と短所', exampleMeaning: '长处和短处', frequency: '高', collocation: ['ポイント', '論点', '欠点'] },
  { word: '面', reading: 'めん', meaning: '面、方面', partOfSpeech: '名', level: '考研', romaji: 'men', usage: '某个范围或领域', examTip: '考研常考词', example: '各方面', exampleMeaning: '各个方面', frequency: '高', collocation: ['表面', '内面', '外面'] },
  { word: '級', reading: 'きゅう', meaning: '等级', partOfSpeech: '名', level: '考研', romaji: 'kyuu', usage: '级别、等级', examTip: '考研常考词', example: '同じ級', exampleMeaning: '同级', frequency: '高', collocation: ['上中下級', '级别', '段階'] },
  { word: '的', reading: 'てき', meaning: '关于...的', partOfSpeech: '名', level: '考研', romaji: 'teki', usage: '表示某种性质', examTip: '考研高频接尾词', example: '学校教育', exampleMeaning: '学校教育', frequency: '高', collocation: ['経済的', '歴史的', '理論的'] },
  { word: '化', reading: 'か', meaning: '化', partOfSpeech: '名', level: '考研', romaji: 'ka', usage: '变成某种状态', examTip: '考研高频接尾词', example: '真実化の时代', exampleMeaning: '现实化的时代', frequency: '高', collocation: ['近代化', '情報化', '多様化'] },
  { word: '性', reading: 'せい', meaning: '性', partOfSpeech: '名', level: '考研', romaji: 'sei', usage: '表示某种性质', examTip: '考研高频接尾词', example: '可能性', exampleMeaning: '可能性', frequency: '高', collocation: ['公益性', '機動性', '持続可能性'] },
  // ========== 其他重要単語 ==========
  { word: ' развит', reading: 'はってん', meaning: '发展', partOfSpeech: '名', level: '考研', romaji: 'hatten', usage: '事物由小到大由弱到强', examTip: '考研必备常考词', example: '急速に発展する', exampleMeaning: '快速发展', frequency: '高', collocation: ['発展途上国', '発展的な', '進展'] },
  { word: '実現', reading: 'じつげん', meaning: '实现', partOfSpeech: '名', level: '考研', romaji: 'jitsugen', usage: '使理想成为现实', examTip: '考研必备常考词', example: '目標を実現する', exampleMeaning: '实现目标', frequency: '高', collocation: ['実現可能性', '夢の現実化', ' 현실화'] },
  { word: '改革', reading: 'かいかく', meaning: '改革', partOfSpeech: '名', level: '考研', romaji: 'kaikaku', usage: '根本性的变革', examTip: '考研必备常考词', example: '教育改革', exampleMeaning: '教育改革', frequency: '高', collocation: ['改革開放', '改革的', '革新'] },
  { word: '進歩', reading: 'しんぽ', meaning: '进步', partOfSpeech: '名', level: '考研', romaji: 'shinpo', usage: '向前发展', examTip: '考研必备常考词', example: '技術が進歩する', exampleMeaning: '技术进步', frequency: '高', collocation: ['技術革新', '進捗', '進んだ'] },
  { word: '向上', reading: 'こうじょう', meaning: '向上、提高', partOfSpeech: '名', level: '考研', romaji: 'koujou', usage: '质量和水平提高', examTip: '考研常考词', example: '生活水準が向上する', exampleMeaning: '生活水平提高', frequency: '高', collocation: ['品質向上', '向上心', '改善'] },
  { word: '変化', reading: 'へんか', meaning: '变化', partOfSpeech: '名', level: '考研', romaji: 'henka', usage: '和以前不同', examTip: '考研必备常考词', example: ' 변화를 싶다', exampleMeaning: '寻求变化', frequency: '高', collocation: ['変化に富む', '環境変化', '急速な変化'] },
  { word: '影響', reading: 'えいきょう', meaning: '影响', partOfSpeech: '名', level: '考研', frequency: '高' },
  { word: '生命', reading: 'せいめい', meaning: '生命', partOfSpeech: '名', level: '考研', romaji: 'seimei', usage: '生物生存的能力', examTip: '考研常考词', example: '命を尊ぶ', exampleMeaning: '尊重生命', frequency: '高', collocation: ['生命線', '生命力', '生死'] },
  { word: '時間', reading: 'じかん', meaning: '时间', partOfSpeech: '名', level: '考研', romaji: 'jikan', usage: '时间的流逝', examTip: '考研必备基础词', example: '時間が経つ', exampleMeaning: '时间流逝', frequency: '高', collocation: ['時間内', '時間外', '瞬時'] },
  { word: '空間', reading: 'くうかん', meaning: '空间', partOfSpeech: '名', level: '考研', romaji: 'kuukan', usage: '物质存在的场所', examTip: '考研常考词', example: '三次元空間', exampleMeaning: '三维空间', frequency: '高', collocation: ['生活空間', '公共空間', '宇宙空間'] },
  { word: '世界', reading: 'せかい', meaning: '世界', partOfSpeech: '名', level: '考研', romaji: 'sekai', usage: '地球上的所有地方', examTip: '考研必备基础词', example: '世界中', exampleMeaning: '全世界', frequency: '高', collocation: ['世界観', '世界平和', '世界的に'] },
  { word: '国', reading: 'くに', meaning: '国家', partOfSpeech: '名', level: '考研', romaji: 'kuni', usage: '主权国家', examTip: '考研必备基础词', example: '祖母', exampleMeaning: '祖国', frequency: '高', collocation: ['外国', '国内', '異国'] },
  { word: '人々', reading: 'ひとびと', meaning: '人们', partOfSpeech: '名', level: '考研', romaji: 'hitobito', usage: '多数人', examTip: '考研常考词', example: '縣民性生活', exampleMeaning: '人们的性生活', frequency: '高', collocation: ['人々の考え', '、各種の人々'] },
  { word: '体', reading: 'たい', meaning: '体、整体', partOfSpeech: '名', level: '考研', romaji: 'tai', usage: '事物的总体', examTip: '考研高频词', example: '对身体好', exampleMeaning: '对身体好', frequency: '高', collocation: ['全体をカバー', '体温', '物理的身体'] },
  { word: '間', reading: 'あいだ', meaning: '之间', partOfSpeech: '名', level: '考研', romaji: 'aida', usage: '两者之间', examTip: '考研高频词', example: '歴史の間に', exampleMeaning: '在历史长河中', frequency: '高', collocation: ['間隔', '両者の間', '差'] },
  { word: '前', reading: 'まえ', meaning: '前', partOfSpeech: '名', level: '考研', romaji: 'mae', usage: '时间或地点的前面', examTip: '考研基础语法词', example: '飯の前', exampleMeaning: '饭前', frequency: '高', collocation: ['以前', '事前', '前行'] },
  { word: '後', reading: 'あと', meaning: '后', partOfSpeech: '名', level: '考研', romaji: 'ato', usage: '时间或地点的后面', examTip: '考研基础语法词', example: '後で電話する', exampleMeaning: '之后打电话', frequency: '高', collocation: ['以后', '事後', '後ほど'] },
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