// 考研日语学习数据 - 合并增强版
// 涵盖 N5-N1 / 考研 等级词汇和语法
// 合并了原有的 N5-N3 数据和新增强的 N2/N1/考研 数据

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | '考研'
export type StudyCategory = 'jlpt' | 'exam'

// 例句结构
export interface ExampleSentence {
  jp: string
  kana: string
  zh: string
}

// 统一词汇接口（兼容新旧两种格式）
export interface VocabularyItem {
  id: string
  word: string
  kana: string // 假名
  romaji?: string // 罗马音（新增字段）
  meaning: string
  level: JLPTLevel
  category: StudyCategory
  partOfSpeech: string
  pronunciation?: string // 发音提示（新增字段）
  usageCore?: string // 核心用法（新增字段）
  usagePatterns?: string[] // 高频句型（新增字段）
  collocations?: string[] // 常见搭配（新增字段）
  examFocus?: string // 考试提醒（新增字段）
  examples?: ExampleSentence[] // 例句（新增字段）
  tags?: string[] // 标签（新增字段）
  // 兼容旧字段
  reading?: string // 旧字段：假名（alias for kana）
  example?: string // 旧字段：例句
  exampleMeaning?: string // 旧字段：例句翻译
}

// 语法接口（兼容新旧两种格式）
export interface GrammarPoint {
  id: string
  pattern: string // 语法句型（也用 title）
  title?: string // 新格式用 title
  meaning: string
  level: JLPTLevel
  explanation?: string // 新格式用 explanation（也用 usage）
  usage?: string // 新格式
  example?: string
  exampleMeaning?: string
  examTip?: string // 考试提醒（新增）
}

// ─── N5 级别词汇 ─────────────────────────────────────────────────────────────────
export const n5Vocabulary: VocabularyItem[] = [
  { id: 'n5-001', word: '本', kana: 'ほん', romaji: 'hon', meaning: '书', level: 'N5', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'ほん，注意长音。', usageCore: '最基础的词汇之一', usagePatterns: ['本を読みます'], collocations: ['本屋', '小説'], examFocus: 'N5 基础词汇', examples: [{ jp: '本を読みます', kana: 'ほん を よみます', zh: '读书' }], tags: ['N5基础'] },
  { id: 'n5-002', word: '日本人', kana: 'にほんじん', romaji: 'nihonjin', meaning: '日本人', level: 'N5', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'に-ほん-じん', usageCore: '表示日本国籍的人', usagePatterns: ['日本人は〜です'], collocations: ['日本人は優しい'], examFocus: 'N5 基础词汇', examples: [{ jp: '日本人は優しいです', kana: 'にほんじん は やさしいです', zh: '日本人很温柔' }], tags: ['N5基础'] },
  { id: 'n5-003', word: '学生', kana: 'がくせい', romaji: 'gakusei', meaning: '学生', level: 'N5', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'がく-せい，长音要读满。', usageCore: '学校在校生', usagePatterns: ['私は学生です'], collocations: ['大学生', '留学生'], examFocus: 'N5 基础词汇', examples: [{ jp: '私は学生です', kana: 'わたし は がくせい です', zh: '我是学生' }], tags: ['N5基础'] },
  { id: 'n5-004', word: '先生', kana: 'せんせい', romaji: 'sensei', meaning: '老师', level: 'N5', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'せん-せい', usageCore: '对教师、医生、律师等专业人士的尊称', usagePatterns: ['先生が来ます'], collocations: ['日本語先生'], examFocus: 'N5 基础词汇', examples: [{ jp: '先生が来ました', kana: 'せんせい が きました', zh: '老师来了' }], tags: ['N5基础', '尊称'] },
  { id: 'n5-005', word: '学校', kana: 'がっこう', romaji: 'gakkou', meaning: '学校', level: 'N5', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'がっ-こう，两个促音要短促。', usageCore: '教育机构', usagePatterns: ['学校に行きます'], collocations: ['学校生活'], examFocus: 'N5 基础词汇', examples: [{ jp: '学校に行きます', kana: 'がっこう に いきます', zh: '去学校' }], tags: ['N5基础'] },
  { id: 'n5-006', word: '友達', kana: 'ともだち', romaji: 'tomodachi', meaning: '朋友', level: 'N5', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'とも-だち', usageCore: '朋友、友人', usagePatterns: ['友達と遊びます'], collocations: ['友達紹介'], examFocus: 'N5 基础词汇', examples: [{ jp: '友達と遊びます', kana: 'ともだち と あそびます', zh: '和朋友玩' }], tags: ['N5基础', '人际关系'] },
  { id: 'n5-007', word: '今日', kana: 'きょう', romaji: 'kyou', meaning: '今天', level: 'N5', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'きょう，长音要读满。', usageCore: '当前这一天', usagePatterns: ['今日は〜です'], collocations: ['今日会います'], examFocus: 'N5 基础词汇', examples: [{ jp: '今日は晴れです', kana: 'きょう は はれ です', zh: '今天是晴天' }], tags: ['N5基础', '时间'] },
  { id: 'n5-008', word: '明日', kana: 'あした', romaji: 'ashita', meaning: '明天', level: 'N5', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'あ-した', usageCore: '当前的明天', usagePatterns: ['明日会います'], collocations: ['明日出発'], examFocus: 'N5 基础词汇', examples: [{ jp: '明日会います', kana: 'あした あいます', zh: '明天见面' }], tags: ['N5基础', '时间'] },
  { id: 'n5-009', word: '昨日', kana: 'きのう', romaji: 'kinou', meaning: '昨天', level: 'N5', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'き-の-う', usageCore: '当前的昨天', usagePatterns: ['昨日は〜でした'], collocations: ['昨日寒かった'], examFocus: 'N5 基础词汇', examples: [{ jp: '昨日は寒かったです', kana: 'きのう は さむかったです', zh: '昨天很冷' }], tags: ['N5基础', '时间'] },
  { id: 'n5-010', word: '食べる', kana: 'たべる', romaji: 'taberu', meaning: '吃', level: 'N5', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'た-べ-る，注意一段动词变形。', usageCore: '摄入食物的动作', usagePatterns: ['〜を食べます'], collocations: ['朝ごはんを食べます'], examFocus: 'N5 基础词汇', examples: [{ jp: '朝ごはんを食べます', kana: 'あさごはん を たべます', zh: '吃早饭' }], tags: ['N5基础', '动词'] },
  { id: 'n5-011', word: '飲む', kana: 'のむ', romaji: 'nomu', meaning: '喝', level: 'N5', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'の-む', usageCore: '摄入液体的动作', usagePatterns: ['〜を飲みます'], collocations: ['水を飲みます'], examFocus: 'N5 基础词汇', examples: [{ jp: '水を飲みます', kana: 'みず を のみます', zh: '喝水' }], tags: ['N5基础', '动词'] },
  { id: 'n5-012', word: '行く', kana: 'いく', romaji: 'iku', meaning: '去', level: 'N5', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'い-く，五段动词。', usageCore: '从某地前往另一地', usagePatterns: ['〜に行きます'], collocations: ['東京に行きます'], examFocus: 'N5 基础词汇', examples: [{ jp: '東京に行きます', kana: 'とうきょう に いきます', zh: '去东京' }], tags: ['N5基础', '动词', '高频'] },
  { id: 'n5-013', word: '来る', kana: 'くる', romaji: 'kuru', meaning: '来', level: 'N5', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'く-る，特殊变形动词。', usageCore: '从别处来到此地', usagePatterns: ['〜に来ます'], collocations: ['家に来てください'], examFocus: 'N5 基础词汇', examples: [{ jp: '家に来てください', kana: 'いえ に きて ください', zh: '请来我家' }], tags: ['N5基础', '动词', '高频'] },
  { id: 'n5-014', word: '見る', kana: 'みる', romaji: 'miru', meaning: '看', level: 'N5', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'み-る，一段动词。', usageCore: '用眼睛看的动作', usagePatterns: ['〜を見ます'], collocations: ['映画を見ます'], examFocus: 'N5 基础词汇', examples: [{ jp: '映画を見ます', kana: 'えいが を みます', zh: '看电影' }], tags: ['N5基础', '动词'] },
  { id: 'n5-015', word: '聞く', kana: 'きく', romaji: 'kiku', meaning: '听/问', level: 'N5', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'き-く，多义词：听声音或问问题。', usageCore: '用耳朵听，或向人询问', usagePatterns: ['音楽を聞きます', '名前を聞きます'], collocations: ['音楽を聞きます'], examFocus: 'N5 基础词汇', examples: [{ jp: '音楽を聞きます', kana: 'おんがく を ききます', zh: '听音乐' }], tags: ['N5基础', '动词'] },
  { id: 'n5-016', word: '話す', kana: 'はなす', romaji: 'hanasu', meaning: '说', level: 'N5', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'は-な-す，五段动词。', usageCore: '用语言表达', usagePatterns: ['日本語を話します'], collocations: ['日本語を話します'], examFocus: 'N5 基础词汇', examples: [{ jp: '日本語を話します', kana: 'にほんご を はなします', zh: '说日语' }], tags: ['N5基础', '动词'] },
  { id: 'n5-017', word: '書く', kana: 'かく', romaji: 'kaku', meaning: '写', level: 'N5', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'か-く，五段动词。', usageCore: '用笔书写或电子输入', usagePatterns: ['手紙を書きます'], collocations: ['手紙を書きます'], examFocus: 'N5 基础词汇', examples: [{ jp: '手紙を書きます', kana: 'てがみ を かきます', zh: '写信' }], tags: ['N5基础', '动词'] },
  { id: 'n5-018', word: '読む', kana: 'よむ', romaji: 'yomu', meaning: '读', level: 'N5', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'よ-む，五段动词。', usageCore: '阅读文字内容', usagePatterns: ['本を読みます'], collocations: ['本を読みます'], examFocus: 'N5 基础词汇', examples: [{ jp: '本を読みます', kana: 'ほん を よみます', zh: '读书' }], tags: ['N5基础', '动词'] },
  { id: 'n5-019', word: '大きい', kana: 'おおきい', romaji: 'ookii', meaning: '大的', level: 'N5', category: 'jlpt', partOfSpeech: '形容词', pronunciation: 'お-お-き-い，注意第一个「お」要拉长。', usageCore: '表示体积、规模大', usagePatterns: ['大きい犬'], collocations: ['大きい家'], examFocus: 'N5 基础词汇', examples: [{ jp: '大きい犬', kana: 'おおきい いぬ', zh: '大的狗' }], tags: ['N5基础', '形容词'] },
  { id: 'n5-020', word: '小さい', kana: 'ちいさい', romaji: 'chiisai', meaning: '小的', level: 'N5', category: 'jlpt', partOfSpeech: '形容词', pronunciation: 'ち-い-さ-い', usageCore: '表示体积、规模小', usagePatterns: ['小さい子供'], collocations: ['小さい車'], examFocus: 'N5 基础词汇', examples: [{ jp: '小さい子供', kana: 'ちいさい こども', zh: '小孩' }], tags: ['N5基础', '形容词'] },
  { id: 'n5-021', word: '新しい', kana: 'あたらしい', romaji: 'atarashii', meaning: '新的', level: 'N5', category: 'jlpt', partOfSpeech: '形容词', pronunciation: 'あ-た-ら-し-い', usageCore: '表示刚出现或刚获得不久', usagePatterns: ['新しい車'], collocations: ['新しい時代'], examFocus: 'N5 基础词汇', examples: [{ jp: '新しい車', kana: 'あたらしい くるま', zh: '新车' }], tags: ['N5基础', '形容词'] },
  { id: 'n5-022', word: '古い', kana: 'ふるい', romaji: 'furui', meaning: '旧的/老的', level: 'N5', category: 'jlpt', partOfSpeech: '形容词', pronunciation: 'ふ-る-い', usageCore: '表示存在时间长或使用已久', usagePatterns: ['古い家'], collocations: ['古い友達'], examFocus: 'N5 基础词汇', examples: [{ jp: '古い家', kana: 'ふるい いえ', zh: '老房子' }], tags: ['N5基础', '形容词'] },
  { id: 'n5-023', word: '美味しい', kana: 'おいしい', romaji: 'oishii', meaning: '好吃的', level: 'N5', category: 'jlpt', partOfSpeech: '形容词', pronunciation: 'お-い-し-い', usageCore: '食物味道好', usagePatterns: ['美味しい食べ物'], collocations: ['美味しい和食'], examFocus: 'N5 基础词汇', examples: [{ jp: '美味しい食べ物', kana: 'おいしい たべもの', zh: '好吃的食物' }], tags: ['N5基础', '形容词'] },
  { id: 'n5-024', word: '静かな', kana: 'しずかな', romaji: 'shizuka', meaning: '安静的', level: 'N5', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'し-ず-か-な', usageCore: '没有声音或很少声音', usagePatterns: ['静かな公園'], collocations: ['静かな町'], examFocus: 'N5 基础词汇', examples: [{ jp: '静かな公園', kana: 'しずかな こうえん', zh: '安静的公园' }], tags: ['N5基础', '形容动词'] },
  { id: 'n5-025', word: 'とても', kana: 'とても', romaji: 'totemo', meaning: '非常', level: 'N5', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'と-も-と，长音要读满。', usageCore: '强调程度高', usagePatterns: ['とても美味しい'], collocations: ['とても難しい'], examFocus: 'N5 基础词汇', examples: [{ jp: 'とても美味しい', kana: 'とても おいしい', zh: '非常好吃' }], tags: ['N5基础', '副词'] },
  { id: 'n5-026', word: '一緒に', kana: 'いっしょに', romaji: 'isshoni', meaning: '一起', level: 'N5', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'いっ-しょ-に，注意促音。', usageCore: '与他人共同做某事', usagePatterns: ['一緒に食べましょう'], collocations: ['一緒に頑張る'], examFocus: 'N5 基础词汇', examples: [{ jp: '一緒に食べましょう', kana: 'いっしょに たべましょう', zh: '一起吃吧' }], tags: ['N5基础', '副词'] },
  { id: 'n5-027', word: 'まだ', kana: 'まだ', romaji: 'mada', meaning: '还', level: 'N5', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'ま-だ', usageCore: '表示尚未完成或继续', usagePatterns: ['まだ決めていません'], collocations: ['まだ来ていません'], examFocus: 'N5 基础词汇', examples: [{ jp: 'まだ決めていません', kana: 'まだ きめて いません', zh: '还没决定' }], tags: ['N5基础', '副词'] },
  { id: 'n5-028', word: 'もう一度', kana: 'もういちど', romaji: 'mouichido', meaning: '再一次', level: 'N5', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'もう-いち-ど', usageCore: '重复或再次做某事', usagePatterns: ['もう一度言ってください'], collocations: ['もう一度見る'], examFocus: 'N5 基础词汇', examples: [{ jp: 'もう一度言ってください', kana: 'もういちど いって ください', zh: '请再说一遍' }], tags: ['N5基础', '副词'] },
  { id: 'n5-029', word: 'ありがとう', kana: 'ありがとう', romaji: 'arigatou', meaning: '谢谢', level: 'N5', category: 'jlpt', partOfSpeech: '寒暄', pronunciation: 'あ-り-が-と-う', usageCore: '表示感谢的寒暄语', usagePatterns: ['ありがとうございます'], collocations: ['ありがとう存じます'], examFocus: 'N5 基础词汇', examples: [{ jp: 'ありがとうございます', kana: 'ありがとうございます', zh: '谢谢' }], tags: ['N5基础', '寒暄'] },
  { id: 'n5-030', word: 'ごめんなさい', kana: 'ごめんなさい', romaji: 'gomennasai', meaning: '对不起', level: 'N5', category: 'jlpt', partOfSpeech: '寒暄', pronunciation: 'ご-め-ん-な-さ-い', usageCore: '道歉或请求原谅', usagePatterns: ['ごめんなさい、遅れました'], collocations: ['ごめんなさいね'], examFocus: 'N5 基础词汇', examples: [{ jp: 'ごめんなさい、遅れました', kana: 'ごめんなさい、おくれました', zh: '对不起，我迟到了' }], tags: ['N5基础', '寒暄'] },
]

// ─── N4 级别词汇 ─────────────────────────────────────────────────────────────────
export const n4Vocabulary: VocabularyItem[] = [
  { id: 'n4-001', word: '経験', kana: 'けいけん', romaji: 'keiken', meaning: '经验', level: 'N4', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'けい-けん，长音要读满。', usageCore: '通过实践获得的知识和技能', usagePatterns: ['経験がある', '経験を積む'], collocations: ['生活経験', '工作经验'], examFocus: 'N4 阅读高频词', examples: [{ jp: '経験があります', kana: 'けいけん が あります', zh: '有经验' }], tags: ['N4', '高频'] },
  { id: 'n4-002', word: '関係', kana: 'かんけい', romaji: 'kankei', meaning: '关系', level: 'N4', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'かん-けい，长音要读满。', usageCore: '两个事物之间的联系', usagePatterns: ['〜と関係がある', '関係を持つ'], collocations: ['環境と関係があります'], examFocus: 'N4 阅读高频词', examples: [{ jp: '環境と関係があります', kana: 'かんきょう と かんけい が あります', zh: '与环境有关' }], tags: ['N4', '高频'] },
  { id: 'n4-003', word: '結果', kana: 'けっか', romaji: ' kekka', meaning: '结果', level: 'N4', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'けっ-か，促音要短促。', usageCore: '某事结束后的状态', usagePatterns: ['結果的に', '結果を見る'], collocations: ['結果報告'], examFocus: 'N4 阅读高频词', examples: [{ jp: '結果的に成功了', kana: 'けっかてきに せいこうしました', zh: '结果成功了' }], tags: ['N4', '高频'] },
  { id: 'n4-004', word: '理由', kana: 'りゆう', romaji: 'riyuu', meaning: '理由', level: 'N4', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'り-ゆう，注意长音。', usageCore: '做某事或判断的原因', usagePatterns: ['理由がない', '理由を聞く'], collocations: ['理由を説明'], examFocus: 'N4 阅读高频词', examples: [{ jp: '理由を聞きたい', kana: 'りゆう を ききたい', zh: '想问理由' }], tags: ['N4', '高频'] },
  { id: 'n4-005', word: '問題', kana: 'もんだい', romaji: 'mondai', meaning: '问题', level: 'N4', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'もん-だい', usageCore: '需要解决的课题或考试题', usagePatterns: ['問題を解く', '問題点'], collocations: ['社会問題'], examFocus: 'N4 阅读超高频', examples: [{ jp: '問題を解きます', kana: 'もんだい を ときます', zh: '解题' }], tags: ['N4', '超高频'] },
  { id: 'n4-006', word: '方法', kana: 'ほうほう', romaji: 'houhou', meaning: '方法', level: 'N4', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'ほう-ほう，双长音。', usageCore: '做某事的手段或方式', usagePatterns: ['方法を使う', '良い方法'], collocations: ['解決方法'], examFocus: 'N4 阅读高频词', examples: [{ jp: '良い方法があります', kana: 'よい ほうほう が あります', zh: '有好方法' }], tags: ['N4', '高频'] },
  { id: 'n4-007', word: '研究', kana: 'けんきゅう', romaji: 'kenkyuu', meaning: '研究', level: 'N4', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'けん-きゅう，双长音。', usageCore: '系统性探索和研究', usagePatterns: ['研究する', '研究を重ねる'], collocations: ['科学研究'], examFocus: 'N4 阅读高频词', examples: [{ jp: '研究を重ねる', kana: 'けんきゅう を かさなげる', zh: '反复研究' }], tags: ['N4', '高频', '学术'] },
  { id: 'n4-008', word: '準備', kana: 'じゅんび', romaji: 'junbi', meaning: '准备', level: 'N4', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'じゅん-び，长音要读满。', usageCore: '为某事提前做的准备', usagePatterns: ['準備する', '準備が整う'], collocations: ['事前準備'], examFocus: 'N4 阅读高频词', examples: [{ jp: '準備が整いました', kana: 'じゅんび が ととのいました', zh: '准备就绪' }], tags: ['N4', '高频'] },
  { id: 'n4-009', word: '説明', kana: 'せつめい', romaji: 'setsumei', meaning: '说明', level: 'N4', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'せつ-めい，长音要读满。', usageCore: '向他人解释或阐述', usagePatterns: ['説明する', '説明を読む'], collocations: ['产品説明'], examFocus: 'N4 阅读高频词', examples: [{ jp: '説明してください', kana: 'せつめい して ください', zh: '请说明' }], tags: ['N4', '高频'] },
  { id: 'n4-010', word: '状態', kana: 'じょうたい', romaji: 'joutai', meaning: '状态', level: 'N4', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'じょう-たい，长音要读满。', usageCore: '某人或某物的情况', usagePatterns: ['状態が悪い', '健康状態'], collocations: ['生活状態'], examFocus: 'N4 阅读高频词', examples: [{ jp: '状態が悪い', kana: 'じょうたい が わるい', zh: '状态不好' }], tags: ['N4', '高频'] },
  { id: 'n4-011', word: '影響', kana: 'えいきょう', romaji: 'eikyou', meaning: '影响', level: 'N4', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'えい-きょう，长音要读满。', usageCore: '某事物对另一事物产生作用', usagePatterns: ['影響を受ける', '影響を与える'], collocations: ['環境に影響'], examFocus: 'N4/N3 阅读超高频', examples: [{ jp: '環境に影響します', kana: 'かんきょう に えいきょう します', zh: '影响环境' }], tags: ['N4', '超高频'] },
  { id: 'n4-012', word: '考える', kana: 'かんがえる', romaji: 'kangaeru', meaning: '考虑', level: 'N4', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'かん-が-える，一段动词。', usageCore: '思考、琢磨', usagePatterns: ['考える必要がある', 'よく考えて'], collocations: ['自分で考える'], examFocus: 'N4 阅读高频词', examples: [{ jp: 'よく考えてください', kana: 'よく かんがえて ください', zh: '请好好考虑' }], tags: ['N4', '高频', '动词'] },
  { id: 'n4-013', word: '始める', kana: 'はじめる', romaji: 'hajimeru', meaning: '开始', level: 'N4', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'はじ-める，一段动词。', usageCore: '某动作或状态开始', usagePatterns: ['〜を始める'], collocations: ['勉強を始めます'], examFocus: 'N4 语法高频', examples: [{ jp: '勉強を始めます', kana: 'べんきょう を はじめます', zh: '开始学习' }], tags: ['N4', '高频', '动词'] },
  { id: 'n4-014', word: '続ける', kana: 'つづける', romaji: 'tsuzukeru', meaning: '继续', level: 'N4', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'つず-ける，一段动词。', usageCore: '不间断地持续做某事', usagePatterns: ['〜を続ける'], collocations: ['読み続ける'], examFocus: 'N4 语法高频', examples: [{ jp: '読み続けます', kana: 'よみ つづけます', zh: '继续读' }], tags: ['N4', '高频', '动词'] },
  { id: 'n4-015', word: '現れる', kana: 'あらわれる', romaji: 'arawareru', meaning: '出现', level: 'N4', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'あら-われる，一段动词。', usageCore: '原本没有的事物显现出来', usagePatterns: ['姿が現れる', '出現する'], collocations: ['機会が現れます'], examFocus: 'N4 阅读高频词', examples: [{ jp: '機会が現れます', kana: 'きかい が あらわれます', zh: '机会出现' }], tags: ['N4', '高频', '动词'] },
  { id: 'n4-016', word: '伝える', kana: 'つたえる', romaji: 'tsutaeru', meaning: '传达', level: 'N4', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'つた-える，一段动词。', usageCore: '将信息、感情等转达给他人', usagePatterns: ['〜伝える', 'お伝えする'], collocations: ['言葉を伝えます'], examFocus: 'N4 阅读高频词', examples: [{ jp: '言葉を伝えます', kana: 'ことを つたえます', zh: '传达话语' }], tags: ['N4', '高频', '动词'] },
  { id: 'n4-017', word: '重要な', kana: 'じゅうような', romaji: 'juuyou', meaning: '重要的', level: 'N4', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'じゅう-よう-な', usageCore: '非常必要或有很大意义', usagePatterns: ['重要な問題', '重要なポイント'], collocations: ['重要な発見'], examFocus: 'N4 阅读超高频', examples: [{ jp: '重要な問題', kana: 'じゅうよう な もんだい', zh: '重要的问题' }], tags: ['N4', '超高频', '形容动词'] },
  { id: 'n4-018', word: '必要な', kana: 'ひつような', romaji: 'hitsuyou', meaning: '必要的', level: 'N4', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'ひつ-よう-な', usageCore: '必须有或不可缺少', usagePatterns: ['〜必要的', '必要最小限'], collocations: ['必要な準備'], examFocus: 'N4 阅读高频词', examples: [{ jp: '必要な準備', kana: 'ひつよう な じゅんび', zh: '必要的准备' }], tags: ['N4', '高频', '形容动词'] },
  { id: 'n4-019', word: '面倒な', kana: 'めんどいな', romaji: 'mendokona', meaning: '麻烦的', level: 'N4', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'めん-ど-い-な', usageCore: '处理起来复杂或费事', usagePatterns: ['面倒な手続き', '面倒を見る'], collocations: ['面倒な問題'], examFocus: 'N4 阅读高频词', examples: [{ jp: '面倒な手続き', kana: 'めんどい て続き', zh: '麻烦的手续' }], tags: ['N4', '高频', '形容动词'] },
  { id: 'n4-020', word: '複雑な', kana: 'ふくざつな', romaji: 'fukuzatsu', meaning: '复杂的', level: 'N4', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'ふく-ざつ-な', usageCore: '涉及多个要素，不简单', usagePatterns: ['複雑な問題', '複雑な構造'], collocations: ['複雑な状況'], examFocus: 'N4 阅读高频词', examples: [{ jp: '複雑な問題', kana: 'ふくざつ な もんだい', zh: '复杂的问题' }], tags: ['N4', '高频', '形容动词'] },
  { id: 'n4-021', word: '幸せな', kana: 'しあわせな', romaji: 'shiawase', meaning: '幸福的', level: 'N4', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'し-あ-わ-せ-な', usageCore: '生活美满、满足', usagePatterns: ['幸せな生活', '幸せだ'], collocations: ['幸せな家族'], examFocus: 'N4 阅读高频词', examples: [{ jp: '幸せな生活', kana: 'しあわせ な せいかつ', zh: '幸福的生活' }], tags: ['N4', '高频', '形容动词'] },
  { id: 'n4-022', word: '確かに', kana: 'たしかに', romaji: 'tashikani', meaning: '确实', level: 'N4', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'た-し-か-に', usageCore: '肯定地、确实地', usagePatterns: ['確かに存在する', '確かにそうだ'], collocations: ['確かに覚えて'], examFocus: 'N4 阅读高频词', examples: [{ jp: '確かに存在します', kana: 'たしかに そんざい します', zh: '确实存在' }], tags: ['N4', '高频', '副词'] },
  { id: 'n4-023', word: '特に', kana: 'ことに', romaji: 'tokuni', meaning: '特别', level: 'N4', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'と-く-に', usageCore: '强调其中某个特别突出', usagePatterns: ['特に重要', '特に好き'], collocations: ['特に注意'], examFocus: 'N4 阅读超高频', examples: [{ jp: '特に大切です', kana: 'とく に たいせつ です', zh: '特别重要' }], tags: ['N4', '超高频', '副词'] },
  { id: 'n4-024', word: '結局', kana: 'けっきょく', romaji: 'kekkyoku', meaning: '最终', level: 'N4', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'けっ-きょく，促音要短促。', usageCore: '经过各种经过后的最终结果', usagePatterns: ['結局〜になった', '結局失敗'], collocations: ['結局同じ'], examFocus: 'N4 阅读高频词', examples: [{ jp: '結局失敗しました', kana: 'けっきょく しっぱい しました', zh: '最终失败了' }], tags: ['N4', '高频', '副词'] },
]

// ─── N3 级别词汇 ─────────────────────────────────────────────────────────────────
export const n3Vocabulary: VocabularyItem[] = [
  { id: 'n3-001', word: '主張', kana: 'しゅちょう', romaji: 'shuchou', meaning: '主张', level: 'N3', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'しゅ-ちょう，长音要读满。', usageCore: '坚持自己的观点或立场', usagePatterns: ['〜を主張する', '自分の主張'], collocations: ['意見主張'], examFocus: 'N3 阅读高频', examples: [{ jp: '自分の主張を通す', kana: 'じぶん の しゅちょう を とおす', zh: '坚持自己的主张' }], tags: ['N3', '高频', '观点'] },
  { id: 'n3-002', word: '意識', kana: 'いしき', romaji: 'ishiki', meaning: '意识', level: 'N3', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'い-しき，长音要读满。', usageCore: '人的知觉、觉悟程度', usagePatterns: ['〜を認識する', '意識が高い'], collocations: ['環境意識'], examFocus: 'N3 阅读高频', examples: [{ jp: '環境意識が高まりました', kana: 'かんきょう いしき が たかまりました', zh: '环境意识提高了' }], tags: ['N3', '高频', '社会'] },
  { id: 'n3-003', word: '格差', kana: 'かくさ', romaji: 'kakusa', meaning: '差距', level: 'N3', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'かく-さ', usageCore: '社会成员之间的差异', usagePatterns: ['格差が広がる', '格差がある'], collocations: ['貧富の格差'], examFocus: 'N3 阅读高频', examples: [{ jp: '格差が広がっています', kana: 'かくさ が ひろがって います', zh: '差距在扩大' }], tags: ['N3', '高频', '社会'] },
  { id: 'n3-004', word: '傾向', kana: 'けいこう', romaji: 'keikou', meaning: '倾向', level: 'N3', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'けい-こう，双长音。', usageCore: '事物发展的趋势', usagePatterns: ['〜の傾向がある', '増加傾向'], collocations: ['増加傾向'], examFocus: 'N3 阅读超高频', examples: [{ jp: '増加傾向があります', kana: 'ぞうか けいこう が あります', zh: '呈增加趋势' }], tags: ['N3', '超高频', '趋势'] },
  { id: 'n3-005', word: '背景', kana: 'はいけい', romaji: 'haikei', meaning: '背景', level: 'N3', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'はい-けい，长音要读满。', usageCore: '事物发生的环境或缘由', usagePatterns: ['時代背景', '事件的背景'], collocations: ['歴史的背景'], examFocus: 'N3 阅读高频', examples: [{ jp: '時代背景を理解する', kana: 'じだい はいけい を りかい する', zh: '理解时代背景' }], tags: ['N3', '高频'] },
  { id: 'n3-006', word: '概念', kana: 'がいねん', romaji: 'gainen', meaning: '概念', level: 'N3', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'がい-ねん，长音要读满。', usageCore: '对事物本质的抽象认识', usagePatterns: ['概念を理解する', '新しい概念'], collocations: ['基本概念'], examFocus: 'N3 阅读高频', examples: [{ jp: '新しい概念', kana: 'あたらしい がいねん', zh: '新概念' }], tags: ['N3', '高频', '学术'] },
  { id: 'n3-007', word: '本質', kana: 'ほんしつ', romaji: 'honshitsu', meaning: '本质', level: 'N3', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'ほん-しつ，长音要读满。', usageCore: '事物最核心的性质', usagePatterns: ['本質を見抜く', '本質的な問題'], collocations: ['問題の本質'], examFocus: 'N3 阅读高频', examples: [{ jp: '本質を見抜く', kana: 'ほんしつ を みぬく', zh: '看穿本质' }], tags: ['N3', '高频', '学术'] },
  { id: 'n3-008', word: '対する', kana: 'たいする', romaji: 'taisuru', meaning: '对于', level: 'N3', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'たい-する', usageCore: '对某事物的态度或动作', usagePatterns: ['〜に対する', '問題に対する'], collocations: ['問題に対する態度'], examFocus: 'N3 阅读超高频', examples: [{ jp: '問題に対する態度', kana: 'もんだい に たいする たいど', zh: '对问题的态度' }], tags: ['N3', '超高频', '语法'] },
  { id: 'n3-009', word: '属する', kana: 'ぞくする', romaji: 'zokusuru', meaning: '属于', level: 'N3', category: 'jlpt', partOfSpeech: 'サ变', pronunciation: 'ぞく-する', usageCore: '归类于某个群体', usagePatterns: ['〜に属する', 'グループに属する'], collocations: ['このグループに属する'], examFocus: 'N3 阅读高频', examples: [{ jp: 'このグループに属する', kana: 'この グループ に ぞくする', zh: '属于这个 group' }], tags: ['N3', '高频', '语法'] },
  { id: 'n3-010', word: '不可欠', kana: 'ふかけつ', romaji: 'fukaketsu', meaning: '不可或缺', level: 'N3', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'ふ-か-けつ', usageCore: '必不可少，无法替代', usagePatterns: ['〜に不可欠', '不可欠な要素'], collocations: ['不可缺少'], examFocus: 'N3 阅读高频', examples: [{ jp: '不可欠の条件', kana: 'ふかけつ な じょうけん', zh: '不可或缺的条件' }], tags: ['N3', '高频', '形容动词'] },
  { id: 'n3-011', word: '潜在的な', kana: 'せんざいてきな', romaji: 'senzai', meaning: '潜在的', level: 'N3', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'せん-ざい-てき-な', usageCore: '现在尚不显著但可能发展', usagePatterns: ['潜在的な危険', '潜在能力'], collocations: ['潜在的な問題'], examFocus: 'N3 阅读高频', examples: [{ jp: '潜在的な危険', kana: 'せんざいてき な きけん', zh: '潜在的危险' }], tags: ['N3', '高频', '形容动词'] },
  { id: 'n3-012', word: '広範な', kana: 'こうはん', romaji: 'kouhan', meaning: '广泛的', level: 'N3', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'こう-はん，长音要读满。', usageCore: '涉及范围广泛', usagePatterns: ['広範な影響', '広範に存在する'], collocations: ['影響が広範囲'], examFocus: 'N3 阅读高频', examples: [{ jp: '広範な影響', kana: 'こうはん な えいきょう', zh: '广泛的影响' }], tags: ['N3', '高频', '形容动词'] },
  { id: 'n3-013', word: '例えば', kana: 'たとえば', romaji: 'tatoeba', meaning: '例如', level: 'N3', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'た-と-え-ば', usageCore: '举出具体例子', usagePatterns: ['例えば〜', '例として'], collocations: ['例えばこんなこと'], examFocus: 'N3 阅读超高频', examples: [{ jp: '例えば、この場合', kana: 'たとえば この ばあい', zh: '例如，这种情况' }], tags: ['N3', '超高频', '副词'] },
  { id: 'n3-014', word: '同時に', kana: 'どうじに', romaji: 'doujini', meaning: '同时', level: 'N3', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'どう-じ-に，长音要读满。', usageCore: '两个以上的事物同时发生', usagePatterns: ['同時に进行する', '〜と同時に'], collocations: ['同時に発生'], examFocus: 'N3 阅读高频', examples: [{ jp: '同時に進行する', kana: 'どうじに しんこう する', zh: '同时进行' }], tags: ['N3', '高频', '副词'] },
  { id: 'n3-015', word: '次第に', kana: 'しだいに', romaji: 'shidaini', meaning: '逐渐', level: 'N3', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'し-だ-いに', usageCore: '按照顺序渐渐变化', usagePatterns: ['次第に改善する', '次第に減る'], collocations: ['次第に回復'], examFocus: 'N3 阅读高频', examples: [{ jp: '次第に改善される', kana: 'しだいに かいぜん される', zh: '逐渐改善' }], tags: ['N3', '高频', '副词'] },
  { id: 'n3-016', word: 'そもそも', kana: 'そもそも', romaji: 'somosomo', meaning: '本来', level: 'N3', category: 'jlpt', partOfSpeech: '副词', pronunciation: 'そ-も-そ-も', usageCore: '谈论事物的起点或根源', usagePatterns: ['そもそも〜だ', 'そもそも問題だ'], collocations: ['そもそも考え'], examFocus: 'N3 阅读高频', examples: [{ jp: 'そもそも違う', kana: 'そもそも ちがう', zh: '本来就不同' }], tags: ['N3', '高频', '副词'] },
]

// ─── N2 级别词汇（新增）────────────────────────────────────────────────────────────────
export const n2Vocabulary: VocabularyItem[] = [
  { id: 'n2-001', word: '影響', kana: 'えいきょう', romaji: 'eikyou', meaning: '影响', level: 'N2', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'えい-きょう，注意长音「きょう」要拉开。', usageCore: '多用于书面表达，表示对人、事、结果产生作用。', usagePatterns: ['〜に影響する', '〜へ影響を与える', '影響が大きい'], collocations: ['経済に影響する', '社会へ影響を与える', '悪い影響'], examFocus: '阅读里常和「環境」「経済」「社会」搭配，常考因果关系。', examples: [{ jp: '気候の変化は農業に大きな影響を与える。', kana: 'きこう の へんか は のうぎょう に おおきな えいきょう を あたえる。', zh: '气候变化会对农业产生很大影响。' }, { jp: 'その事件は人々の考え方に影響した。', kana: 'その じけん は ひとびと の かんがえかた に えいきょう した。', zh: '那起事件影响了人们的思考方式。' }], tags: ['高频阅读', '因果', '书面语'] },
  { id: 'n2-002', word: '制度', kana: 'せいど', romaji: 'seido', meaning: '制度，体制', level: 'N2', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'せい-ど，前长后短。', usageCore: '表示社会、组织或国家层面的规则体系。', usagePatterns: ['制度を導入する', '制度を見直す', '制度が整っている'], collocations: ['教育制度', '社会制度', '新しい制度'], examFocus: '考研阅读中常和教育、福祉、雇用主题一起出现。', examples: [{ jp: '新しい制度を導入する前に十分な議論が必要だ。', kana: 'あたらしい せいど を どうにゅう する まえ に じゅうぶんな ぎろん が ひつよう だ。', zh: '在引入新制度之前需要充分讨论。' }, { jp: 'その国の教育制度は地域によって異なる。', kana: 'その くに の きょういく せいど は ちいき に よって ことなる。', zh: '那个国家的教育制度因地区而异。' }], tags: ['社会主题', '制度类', '书面语'] },
  { id: 'n2-003', word: '傾向', kana: 'けいこう', romaji: 'keikou', meaning: '倾向，趋势', level: 'N2', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'けい-こう，两个长音都要读满。', usageCore: '表示某种持续出现的方向、特点或变化趋势。', usagePatterns: ['〜の傾向がある', '増加傾向', '〜する傾向にある'], collocations: ['若者の傾向', '消費の傾向', '保守的な傾向'], examFocus: '常与图表、社会调查、消费行为一起出现。', examples: [{ jp: '答えは一つではない。', kana: 'こたえ は ひとつ ではない。', zh: '答案不是唯一的。' }], tags: ['趋势', '数据阅读', '高频'] },
  { id: 'n2-004', word: '現状', kana: 'げんじょう', romaji: 'genjou', meaning: '现状，目前情况', level: 'N2', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'げん-じょう，后半部分是长音。', usageCore: '用于说明当前状态，常与分析、问题意识一起出现。', usagePatterns: ['現状では', '現状を把握する', '現状の問題点'], collocations: ['現状分析', '現状維持', '現状認識'], examFocus: '写作和阅读都很常见，常作为论述的起点。', examples: [{ jp: '現状ではこの計画を実行するのは難しい。', kana: 'げんじょう では この けいかく を じっこう する の は むずかしい。', zh: '就目前情况而言，很难执行这个计划。' }, { jp: 'まず現状を正確に把握することが大切だ。', kana: 'まず げんじょう を せいかく に はあく する こと が たいせつ だ。', zh: '首先准确把握现状很重要。' }], tags: ['写作常用', '问题分析', '书面语'] },
  { id: 'n2-005', word: '拡大', kana: 'かくだい', romaji: 'kakudai', meaning: '扩大，扩张', level: 'N2', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'かく-だい，第二拍发音清楚。', usageCore: '表示范围、规模、影响力等变大。', usagePatterns: ['規模を拡大する', '被害が拡大する', '拡大傾向'], collocations: ['市場を拡大する', '、感染拡大', '需要拡大'], examFocus: '新闻、社会、经济类文本的常见词。', examples: [{ jp: '被害の拡大を防ぐため、早急な対応が求められる。', kana: 'ひがい の かくだい を ふせぐ ため、そうきゅう な たいおう が もとめられる。', zh: '为了防止损害扩大，需要迅速应对。' }], tags: ['经济', '社会', '高频'] },
  { id: 'n2-006', word: '目的', kana: 'もくてき', romaji: 'mokuteki', meaning: '目的', level: 'N2', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'もく-てき，后半清晰收音。', usageCore: '说明行为、制度或研究的目标。', usagePatterns: ['〜を目的として', '目的を達成する', '目的意識'], collocations: ['教育の目的', '利用目的', '明確な目的'], examFocus: '说明文里常用于定义段和结论句。', examples: [{ jp: 'この制度は高齢者の生活を支えることを目的としている。', kana: 'この せいど は こうれいしゃ の せいかつ を ささえる こと を もくてき として いる。', zh: '这一制度以支持老年人的生活为目的。' }], tags: ['定义句', '高频', '写作'] },
  { id: 'n2-007', word: '費やす', kana: 'ついやす', romaji: 'tsuiyasu', meaning: '花费，耗费（时间/精力/金钱）', level: 'N2', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'つ-い-や-す，注意不是「つかう」。', usageCore: '强调为某事投入较多资源。', usagePatterns: ['時間を費やす', '努力を費やす', '多額の費用を費やす'], collocations: ['研究に費やす', '準備に費やす', '人生を費やす'], examFocus: '文章里常带有"投入巨大"语气色彩。', examples: [{ jp: '彼はその研究に十年以上を費やした。', kana: 'かれ は その けんきゅう に じゅうねん いじょう を ついやした。', zh: '他为那项研究花费了十多年。' }], tags: ['动词', '投入', '书面表达'] },
  { id: 'n2-008', word: '維持', kana: 'いじ', romaji: 'iji', meaning: '维持', level: 'N2', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'い-じ，短而稳。', usageCore: '表示保持现有状态、水平或关系。', usagePatterns: ['現状を維持する', '秩序を維持する', '維持が難しい'], collocations: ['体力を維持する', '関係維持', '品質維持'], examFocus: '经常和「向上」「改善」对照出现。', examples: [{ jp: '健康を維持するためには適度な運動が必要だ。', kana: 'けんこう を いじ する ため に は てきど な うんどう が ひつよう だ。', zh: '为了维持健康，需要适度运动。' }], tags: ['对比词', '常考', '书面语'] },
  { id: 'n2-009', word: '課題', kana: 'かだい', romaji: 'kadai', meaning: '课题，问题，任务', level: 'N2', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'か-だい，后半长音明显。', usageCore: '既可指作业任务，也常指社会/研究层面的课题。', usagePatterns: ['課題を抱える', '今後の課題', '課題に取り組む'], collocations: ['教育課題', '共通の課題', '重要な課題'], examFocus: '考研阅读里非常高频，多用第二层"社会问题"的意思。', examples: [{ jp: '少子高齢化は日本社会の大きな課題である。', kana: 'しょうし こうれいか は にほん しゃかい の おおきな かだい で ある。', zh: '少子高龄化是日本社会的一大课题。' }], tags: ['超高频', '社会问题', '写作'] },
  { id: 'n2-010', word: '重視', kana: 'じゅうし', romaji: 'juushi', meaning: '重视', level: 'N2', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'じゅう-し，首拍长音。', usageCore: '强调将某个要素放在重要位置。', usagePatterns: ['〜を重視する', '重視される', '効率を重視する'], collocations: ['個性を重視する', '結果を重視する', '安全を重視する'], examFocus: '常和教育理念、企业经营、价值判断搭配。', examples: [{ jp: '最近の教育では思考力が重視されている。', kana: 'さいきん の きょういく では しこうりょく が じゅうし されて いる。', zh: '最近的教育中，思考能力受到重视。' }], tags: ['价值判断', '高频', '写作'] },
  { id: 'n2-011', word: '明らか', kana: 'あきらか', romaji: 'akiraka', meaning: '明显，明确', level: 'N2', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'あ-き-ら-か，平稳念出四拍。', usageCore: '用于说明事实、差异、原因等变得清楚。', usagePatterns: ['明らかになる', '明らかにする', '明らかな違い'], collocations: ['事実が明らかになる', '原因を明らかにする', '明らかな変化'], examFocus: '论文摘要、调查报告、说明文中都很高频。', examples: [{ jp: '調査の結果、新たな問題点が明らかになった。', kana: 'ちょうさ の けっかあらたな もんだいてん が あきらか に なった。', zh: '调查结果显示，新的问题点变得明确了。' }], tags: ['说明文', '常考', '结果表达'] },
  { id: 'n2-012', word: '実態', kana: 'じったい', romaji: 'jittai', meaning: '实际情况，真实状态', level: 'N2', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'じっ-たい，促音要短促有力。', usageCore: '强调与表面说法不同的真实情况。', usagePatterns: ['実態を調べる', '実態が見えにくい', '実態調査'], collocations: ['生活実態', '雇用実態', '実態把握'], examFocus: '常出现在社会调查、纪实和批判性文章中。', examples: [{ jp: '外国人労働者の実態を正しく理解する必要がある。', kana: 'がいこくじん ろうどうしゃ の じったい を ただしく りかい する ひつよう が ある。', zh: '有必要正确理解外国劳动者的实际情况。' }], tags: ['调查类', '社会议题', '高频'] },
]

// ─── N1 级别词汇（新增）────────────────────────────────────────────────────────────────
export const n1Vocabulary: VocabularyItem[] = [
  { id: 'n1-001', word: '顕著', kana: 'けんちょ', romaji: 'kencho', meaning: '显著，明显', level: 'N1', category: 'jlpt', partOfSpeech: '形容动词', pronunciation: 'けん-ちょ，第二拍要短。', usageCore: '书面程度高，用于突出变化或差异非常明显。', usagePatterns: ['顕著な変化', '顕著に表れる', '差が顕著だ'], collocations: ['地域差が顕著', '顕著な傾向', '成果が顕著に現れる'], examFocus: 'N1阅读与学术说明文常见，替代普通的「明らか」。', examples: [{ jp: '都市と地方の格差は近年愈来愈顕著になっている。', kana: 'とし と ちほう の かくさ は きんねん ますます けんちょ に なって いる。', zh: '近年城市与地方的差距越来越显著。' }], tags: ['N1高频', '学术书面', '替换词'] },
  { id: 'n1-002', word: '促進', kana: 'そくしん', romaji: 'sokushin', meaning: '促进，推进', level: 'N1', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'そく-しん，促音短。', usageCore: '常用于政策、交流、发展等正式语境。', usagePatterns: ['交流を促進する', '促進策', '利用促進'], collocations: ['地域活性化を促進する', '理解促進', '成長促進'], examFocus: '政策类文本、作文正式表达里非常好用。', examples: [{ jp: '文化交流は相互理解を促進する役割を果たす。', kana: 'ぶんか こうりゅう は そうご りかい を そくしん する やくわり を はたす。', zh: '文化交流起到促进相互理解的作用。' }], tags: ['政策类', '作文高级词', 'N1'] },
  { id: 'n1-003', word: '見解', kana: 'けんかい', romaji: 'kenkai', meaning: '见解，看法', level: 'N1', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'けん-かい，尾音拉开。', usageCore: '比「意見」更正式，常用于学者、机构、作者观点。', usagePatterns: ['見解を示す', '〜という見解', '見解の相違'], collocations: ['政府の見解', '専門家の見解', '公式見解'], examFocus: '阅读主旨题中经常用来引出作者或机构态度。', examples: [{ jp: '専門家の間でもその点について見解が分かれている。', kana: 'せんもんか の あいだ でも その てん について けんかい が わかれて いる。', zh: '即使在专家之间，对于这一点的见解也存在分歧。' }], tags: ['观点题', '阅读理解', '书面'] },
  { id: 'n1-004', word: '枠組み', kana: 'わくぐみ', romaji: 'wakugumi', meaning: '框架，体系', level: 'N1', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'わ-く-ぐ-み，四拍分明。', usageCore: '指思考框架、制度结构、分析体系。', usagePatterns: ['枠組みを作る', '既存の枠組み', '新たな枠組み'], collocations: ['制度の枠組み', '分析の枠組み', '国際的枠組み'], examFocus: '学术文章和社会评论中频繁出现。', examples: [{ jp: '従来の枠組みではこの問題を十分に説明できない。', kana: 'じゅうらい の わくぐみ では この もんだい を じゅうぶん に せつめい できない。', zh: '用传统框架无法充分说明这个问题。' }], tags: ['抽象名词', '学术阅读', 'N1'] },
  { id: 'n1-005', word: '担う', kana: 'になう', romaji: 'ninau', meaning: '承担，担负', level: 'N1', category: 'jlpt', partOfSpeech: '动词', pronunciation: 'に-な-う，尾音长。', usageCore: '多用于承担责任、角色、功能，书面色彩强。', usagePatterns: ['役割を担う', '将来を担う', '責任|Fee担う'], collocations: ['社会を担う若者', '中核|Fee担う', '重要な役割|Fee担う'], examFocus: '阅读和作文都很常见，常与"若者""教育"搭配。', examples: [{ jp: '若者は次の時代|Fee担う存在だと言われている。', kana: 'わかもの は つぎ の じだい を になう そんざい だ と いわれて いる。', zh: '年轻人被认为是肩负下一个时代的存在。' }], tags: ['作文加分', '责任', '高频'] },
  { id: 'n1-006', word: '過程', kana: 'かてい', romaji: 'katei', meaning: '过程', level: 'N1', category: 'jlpt', partOfSpeech: '名词', pronunciation: 'か-てい，后长音。', usageCore: '强调变化、形成或解决问题的过程本身。', usagePatterns: ['形成の過程', '過程において', '発達過程'], collocations: ['学習過程', '議論の過程', '変化の過程'], examFocus: '常出现在论证过程、研究过程、成长过程描述中。', examples: [{ jp: '結果だけでなく、その過程を評価することが大切だ。', kana: 'けっか だけ で なく、その かてい を ひょうか する こと が たいせつ だ。', zh: '不仅结果，评价其过程也很重要。' }], tags: ['论证', '过程题', 'N1'] },
  { id: 'n1-007', word: '実践', kana: 'じっせん', romaji: 'jissen', meaning: '实践，实行', level: 'N1', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'じっ-せん，促音清晰。', usageCore: '表示将理论、方法、理念付诸实施。', usagePatterns: ['理論を実践する', '実践例', '実践的な知識'], collocations: ['教育実践', '実践力', '実践活動'], examFocus: '教育类、研究类、方法论文章高频。', examples: [{ jp: '知識を社会で実践できる人材が求められている。', kana: 'ちしき を しゃかい で じっせん できる じんざい が もとめられて いる。', zh: '社会需要能够将知识付诸实践的人才。' }], tags: ['教育类', '理论实践', '高频'] },
  { id: 'n1-008', word: '検証', kana: 'けんしょう', romaji: 'kenshou', meaning: '验证，检验', level: 'N1', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'けん-しょう，后半长音。', usageCore: '多指对观点、假设、政策、效果进行验证。', usagePatterns: ['効果を検証する', '検証結果', '仮説を検証する'], collocations: ['実証的に検証する', '政策検証', '検証作業'], examFocus: '论文摘要、实验说明、研究方法题中常见。', examples: [{ jp: 'その仮説が正しいかどうかを検証する必要がある。', kana: 'その かせつ が ただしい か どうか を けんしょう する ひつよう が ある。', zh: '有必要验证那个假设是否正确。' }], tags: ['学术', '研究', 'N1'] },
  { id: 'n1-009', word: '転換', kana: 'てんかん', romaji: 'tenkan', meaning: '转换，转变', level: 'N1', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'てん-かん，尾音收紧。', usageCore: '表示方向、政策、思路、模式等的改变。', usagePatterns: ['発想を転換する', '政策転換', '大きな転換点'], collocations: ['<minimax:tool_call>', '方向転換', '意識の転換'], examFocus: '评论文中常用来描述时代变化或观念变化。', examples: [{ jp: 'これからは量より質を重視する方向への転換が必要だ。', kana: 'これから は りょう より しつ を じゅうし する ほうこう への てんかん が ひつよう だ。', zh: '今后有必要转向重视质量而非数量。' }], tags: ['转折', '观点变化', 'N1'] },
  { id: 'n1-010', word: '一貫', kana: 'いっかん', romaji: 'ikkan', meaning: '一贯，始终一致', level: 'N1', category: 'jlpt', partOfSpeech: '名词/副词/サ变', pronunciation: 'いっ-かん，促音短。', usageCore: '表示立场、方针、态度、内容前后一致。', usagePatterns: ['一貫して', '一貫性がある', '方針を一貫させる'], collocations: ['一貫した態度', '一貫した方針', '論理の一貫性'], examFocus: '主旨题、论证结构题中很好用。', examples: [{ jp: '彼は教育の平等を一貫して主張してきた。', kana: 'かれ は きょういく の びょうどう を いっかん して しゅちょう して きた。', zh: '他始终一贯地坚持教育平等。' }], tags: ['结构题', '逻辑', 'N1'] },
  { id: 'n1-011', word: '示唆', kana: 'しさ', romaji: 'shisa', meaning: '启示，暗示', level: 'N1', category: 'jlpt', partOfSpeech: '名词/サ变', pronunciation: 'し-さ，两拍干净。', usageCore: '表示间接提示某种意义、方向或结论。', usagePatterns: ['〜を示唆する', '示唆に富む', '結果が示唆する'], collocations: ['重要な示唆', '研究が示唆する', '将来を示唆する'], examFocus: '推论题、研究结论题中非常常见。', examples: [{ jp: 'この調査結果は教育格差の拡大を示唆している。', kana: 'この ちょうさ けっか は きょういく かくさ の かくだい を しさ して いる。', zh: '这项调查结果暗示了教育差距正在扩大。' }], tags: ['推论', '研究结论', 'N1'] },
]

// ─── 考研核心词汇（新增）────────────────────────────────────────────────────────────────
export const examVocabulary: VocabularyItem[] = [
  { id: 'exam-001', word: '把握', kana: 'はあく', romaji: 'haaku', meaning: '把握，掌握', level: '考研', category: 'exam', partOfSpeech: '名词/サ变', pronunciation: 'は-あ-く，中间长音要自然过渡。', usageCore: '高频用于"准确掌握情况、重点、数据、主旨"。', usagePatterns: ['実態を把握する', '要点を把握する', '正確に把握する'], collocations: ['現状把握', '状況を把握する', '全体を把握する'], examFocus: '做阅读时经常对应"主旨把握""信息把握"类题眼。', examples: [{ jp: 'まず文章全体の流れを把握してから細部を見るべきだ。', kana: 'まず ぶんしょう ぜんたい の ながれ を はあく して から さいぶ を みる べき だ。', zh: '应先把握文章整体脉络，再看细节。' }, { jp: '現状を正確に把握しなければ対策は立てられない。', kana: 'げんじょう を せいかく に はあく しなければ たいさく は たてられない。', zh: '如果不能准确把握现状，就无法制定对策。' }], tags: ['考研核心', '阅读技巧', '超高频'] },
  { id: 'exam-002', word: '指摘', kana: 'してき', romaji: 'shiteki', meaning: '指出，指摘', level: '考研', category: 'exam', partOfSpeech: '名词/サ变', pronunciation: 'し-てき，读得利落。', usageCore: '表示作者、学者、文章对问题或事实进行指出。', usagePatterns: ['問題点を指摘する', '著者が指摘する', '以前から指摘されている'], collocations: ['欠点を指摘する', '鋭く指摘する', '繰り返し指摘される'], examFocus: '题干里经常会问"作者指出了什么"。', examples: [{ jp: '僕は現代教育の問題点を鋭く指摘している。', kana: 'ひっしゃ は げんだい きょういく の もんだいてん を するどく してき して いる。', zh: '作者尖锐地指出了现代教育的问题点。' }, { jp: '以前からその危険性が指摘されてきた。', kana: 'いぜん から その きけんせい が してき されて きた。', zh: '其危险性从以前开始就一直被指出。' }], tags: ['作者观点', '阅读题眼', '高频'] },
  { id: 'exam-003', word: '捉える', kana: 'とらえる', romaji: 'toraeru', meaning: '把握，捕捉，看待', level: '考研', category: 'exam', partOfSpeech: '动词', pronunciation: 'と-ら-え-る，注意「え」不要吞掉。', usageCore: '除"抓住"外，阅读里更常表示"理解、看待某事物"。', usagePatterns: ['本質を捉える', '〜と捉える', '多面的に捉える'], collocations: ['問題を捉える', '変化を捉える', '正しく捉える'], examFocus: '主旨题和作者态度题的核心动词。', examples: [{ jp: '現象だけでなく背景まで捉える必要がある。', kana: 'げんしょう だけ で なく はいけい まで とらえる ひつよう が ある。', zh: '不仅要看到现象，还要把握其背景。' }, { jp: '僕は失敗を成長の機会として捉えている。', kana: 'ひっしゃ は しっぱい を せいちょう の きかい として とらえて いる。', zh: '作者将失败看作成长的机会。' }], tags: ['主旨理解', '态度题', '高频'] },
  { id: 'exam-004', word: '論じる', kana: 'ろんじる', romaji: 'ronjiru', meaning: '论述，讨论', level: '考研', category: 'exam', partOfSpeech: '动词', pronunciation: 'ろん-じ-る，鼻音后接浊音要清楚。', usageCore: '用于正式讨论某个主题，比「話す」高级得多。', usagePatterns: ['〜について論じる', '詳しく論じる', '多角的に論じる'], collocations: ['社会問題を論じる', '教育を論じる', '歴史的に論じる'], examFocus: '经常出现在文章目的、结构题中。', examples: [{ jp: 'この文章は都市化の影響について論じている。', kana: 'この ぶんしょう は としか の えいきょう について ろんじて いる。', zh: '这篇文章论述了城市化的影响。' }, { jp: '僕はその問題を多角的に論じている。', kana: 'ひっしゃ は その もんだい を たかくてき に ろんじて いる。', zh: '作者从多角度论述了这个问题。' }], tags: ['文章结构', '论述文', '核心'] },
  { id: 'exam-005', word: '見なす', kana: 'みなす', romaji: 'minasu', meaning: '看作，视为', level: '考研', category: 'exam', partOfSpeech: '动词', pronunciation: 'み-な-す，短促有力。', usageCore: '表示将A判断为B，常用于观点和定义。', usagePatterns: ['AをBと見なす', '〜と見なされる', '一般に見なす'], collocations: ['成功と見なす', '重要と見なす', '例外と見なす'], examFocus: '定义题、态度题、作者立场题高频。', examples: [{ jp: '彼は失敗を貴重な経験と見なしている。', kana: 'かれ は しっぱい を きちょう な けいけん と みなして いる。', zh: '他把失败视为宝贵经验。' }, { jp: 'その行為は社会的に問題があると見なされる。', kana: 'その こうい は しゃかいてき に もんだい が ある と みなされる。', zh: '那种行为被视为在社会层面有问题。' }], tags: ['观点判断', '定义', '高频'] },
  { id: 'exam-006', word: '裏付ける', kana: 'うらづける', romaji: 'urazukeru', meaning: '证实，佐证', level: '考研', category: 'exam', partOfSpeech: '动词', pronunciation: 'う-ら-づ-け-る，浊音要清楚。', usageCore: '表示某数据、事实、例子对观点形成支撑。', usagePatterns: ['データが裏付ける', '事実に裏付けられる', '根拠を裏付ける'], collocations: ['研究結果が裏付ける', '証拠に裏付けられる', '仮説を裏付ける'], examFocus: '推论题和论证结构题核心词。', examples: [{ jp: 'その主張は多くの調査結果によって裏付けられている。', kana: 'その しゅちょう は おおく の ちょうさ けっか に よって うらづけられて いる。', zh: '那个主张被许多调查结果所证实。' }, { jp: '具体例が僕の考えを裏付けている。', kana: 'ぐたいれい が ひっしゃ の かんがえ を うらづけて いる。', zh: '具体例佐证了作者的观点。' }], tags: ['论证', '佐证', '高频'] },
  { id: 'exam-007', word: '妥当', kana: 'だとう', romaji: 'datou', meaning: '妥当，恰当', level: '考研', category: 'exam', partOfSpeech: '形容动词', pronunciation: 'だ-とう，后长音。', usageCore: '表示评价、判断、解释是否合理。', usagePatterns: ['妥当な判断', '妥当である', '妥当性がある'], collocations: ['妥当な結論', '妥当な評価', '妥当性を欠く'], examFocus: '选项判断题非常实用。', examples: [{ jp: 'この結論は一定の条件の下では妥当だと言える。', kana: 'この けつろん は いってい の じょうけん の もと では だとう だ と いえる。', zh: '可以说这个结论在一定条件下是妥当的。' }, { jp: 'その説明は一見妥当だが、十分ではない。', kana: 'その せつめい は いっけん だとう だ が、じゅうぶん では ない。', zh: '那个解释乍看之下妥当，但并不充分。' }], tags: ['选项分析', '评价', '高频'] },
  { id: 'exam-008', word: '妨げる', kana: 'さまたげる', romaji: 'samatageru', meaning: '妨碍，阻碍', level: '考研', category: 'exam', partOfSpeech: '动词', pronunciation: 'さ-ま-た-げ-る，节奏均匀。', usageCore: '书面语，表示某因素对发展、理解、交流形成阻碍。', usagePatterns: ['発展を妨げる', '理解を妨げる', '〜を妨げない'], collocations: ['成長を妨げる', '交通を妨げる', '要因を妨げる'], examFocus: '社会问题、教育、沟通主题文章高频。', examples: [{ jp: '過度な競争は子どもの主体性を妨げることがある。', kana: 'かど な きょうそう は こども の しゅたいせい を さまたげる こと が ある。', zh: '过度竞争有时会妨碍孩子的主体性。' }, { jp: '偏見は相互理解を妨げる大きな要因だ。', kana: 'へんけん は そうご りかい を さまたげる おおきな よういん だ。', zh: '偏见是妨碍相互理解的重要因素。' }], tags: ['社会问题', '阻碍', '高频'] },
  { id: 'exam-009', word: '根拠', kana: 'こんきょ', romaji: 'konkyo', meaning: '根据，依据', level: '考研', category: 'exam', partOfSpeech: '名词', pronunciation: 'こん-きょ，尾音轻短。', usageCore: '表示判断、主张、推论的依据。', usagePatterns: ['根拠に基づく', '根拠を示す', '根拠が乏しい'], collocations: ['科学的根拠', '十分な根拠', '法的根拠'], examFocus: '选项题中常考"有无根据""根据是否充分"。', examples: [{ jp: 'その主張には十分な根拠が示されていない。', kana: 'その しゅちょう に は じゅうぶんな こんきょ が しめされて いない。', zh: '那个主张没有给出充分依据。' }, { jp: '私たちは感情ではなく根拠に基づいて判断すべきだ。', kana: 'わたしたち は かんじょう では なく こんきょ に もとづいて はんだん すべき だ。', zh: '我们应基于依据而不是感情做判断。' }], tags: ['论证', '选项题', '超高频'] },
  { id: 'exam-010', word: '先行', kana: 'せんこう', romaji: 'senkou', meaning: '先行，优先于；先行研究', level: '考研', category: 'exam', partOfSpeech: '名词/サ变', pronunciation: 'せん-こう，后长音。', usageCore: '学术文和评论文中表示先一步展开或已存在的相关研究。', usagePatterns: ['先行研究', '〜が先行する', '意識が先行する'], collocations: ['先行事例', '先行投資', '先行条件'], examFocus: '学术说明文里见到率很高。', examples: [{ jp: 'このテーマについては多くの先行研究がある。', kana: 'この テーマ について は おおく の せんこう けんきゅう が ある。', zh: '关于这个主题已经有很多先行研究。' }, { jp: '結果ばかりを求める意識が先行している。', kana: 'けっか ばかり を もとめる いしき が せんこう して いる。', zh: '只追求结果的意识走在前面了。' }], tags: ['学术文', '研究', '高频'] },
  { id: 'exam-011', word: '有効', kana: 'ゆうこう', romaji: 'yuukou', meaning: '有效', level: '考研', category: 'exam', partOfSpeech: '形容动词', pronunciation: 'ゆう-こう，双长音。', usageCore: '表示方法、对策、制度有效可行。', usagePatterns: ['有効な手段', '有効に活用する', '有効性を高める'], collocations: ['有効な対策', '有効利用', '有効性の検証'], examFocus: '对策题、结论句、政策说明都高频。', examples: [{ jp: '地域の活性化には住民参加が有効だと考えられる。', kana: 'ちいき の かっせいか に は じゅうみん さんか が ゆうこう だ と かんがえられる。', zh: '一般认为居民参与对地区振兴是有效的。' }, { jp: 'その方法がすべての場面で有効とは限らない。', kana: 'その ほうほう が すべて の ばめん で ゆうこう と は かぎらない。', zh: '那种方法并不一定在所有场景都有效。' }], tags: ['对策', '结论', '高频'] },
  { id: 'exam-012', word: '適応', kana: 'てきおう', romaji: 'tekiou', meaning: '适应', level: '考研', category: 'exam', partOfSpeech: '名词/サ变', pronunciation: 'てき-おう，后长音。', usageCore: '多指个体、制度、组织对环境变化作出适应。', usagePatterns: ['環境に適応する', '社会適応', '適応能力'], collocations: ['変化に適応する', '適応力を高める', '新環境に適応する'], examFocus: '教育、心理、社会变迁话题高频。', examples: [{ jp: '人は環境の変化に適応しながら生きている。', kana: 'ひと は かんきょう の へんか に てきおう しながら いきて いる。', zh: '人是一边适应环境变化一边生活的。' }, { jp: '新しい技術に適応できない歇歇是生き残れない。', kana: 'あたらしい ぎじゅつ に てきおう できない きぎょう は いきのこれない。', zh: '无法适应新技术的企业无法生存。' }], tags: ['变化', '教育心理', '高频'] },
]

// ─── 考研日语语法（合并+N2/N1/考研新增）────────────────────────────────────────────────────────────────
export const grammarPoints: GrammarPoint[] = [
  // N5 语法
  { id: 'gram-n5-01', pattern: '〜は〜です', meaning: '〜是〜', level: 'N5', explanation: '判断句的基本句型，表示等同或归属', example: '私は学生です', exampleMeaning: '我是学生' },
  { id: 'gram-n5-02', pattern: '〜は〜ではありません', meaning: '〜不是〜', level: 'N5', explanation: '否定判断句', example: '彼は先生ではありません', exampleMeaning: '他不是老师' },
  { id: 'gram-n5-03', pattern: '〜を〜ます（动词）', meaning: '做〜', level: 'N5', explanation: '动词现在时肯定式', example: '本を読みます', exampleMeaning: '读书' },
  { id: 'gram-n5-04', pattern: '〜てください', meaning: '请〜', level: 'N5', explanation: '请求对方做某事', example: '教えてください', exampleMeaning: '请告诉我' },
  { id: 'gram-n5-05', pattern: '〜たいです', meaning: '想〜', level: 'N5', explanation: '表达愿望', example: '日本に行きたいです', exampleMeaning: '我想去日本' },
  { id: 'gram-n5-06', pattern: '〜ましょう', meaning: '〜吧', level: 'N5', explanation: '劝诱或提议', example: '一緒に食べましょう', exampleMeaning: '一起吃吧' },
  { id: 'gram-n5-07', pattern: '〜と思います', meaning: '我认为〜', level: 'N5', explanation: '表达想法', example: '美味しいと思います', exampleMeaning: '我觉得好吃' },
  { id: 'gram-n5-08', pattern: '〜があります/います', meaning: '有〜', level: 'N5', explanation: '存在句，无生命用「あります」，有生命用「います」', example: '猫がいます', exampleMeaning: '有猫' },

  // N4 语法
  { id: 'gram-n4-01', pattern: '〜てくださいました', meaning: '（别人）为我〜', level: 'N4', explanation: '动词て形 + くれます，表示别人为自己做某事', example: '先生が教えてくださいました', exampleMeaning: '老师教我了' },
  { id: 'gram-n4-02', pattern: '〜ようになります', meaning: '变得〜', level: 'N4', explanation: '表示能力、状态的变化', example: '泳げるようになりました', exampleMeaning: '变得会游泳了' },
  { id: 'gram-n4-03', pattern: '〜そうです', meaning: '看起来〜', level: 'N4', explanation: '样态推测', example: '雨が降りそうです', exampleMeaning: '看起来要下雨' },
  { id: 'gram-n4-04', pattern: '〜ようです', meaning: '好像〜', level: 'N4', explanation: '比喻或推测', example: '病気のようですね', exampleMeaning: '好像生病了' },
  { id: 'gram-n4-05', pattern: '〜ために', meaning: '为了〜', level: 'N4', explanation: '表示目的或原因', example: '試験のために勉強する', exampleMeaning: '为了考试而学习' },
  { id: 'gram-n4-06', pattern: '〜によると', meaning: '根据〜', level: 'N4', explanation: '表示信息来源', example: '天気予報によると、明日は晴れです', exampleMeaning: '根据天气预报，明天是晴天' },
  { id: 'gram-n4-07', pattern: '〜ことが大切です', meaning: '〜很重要', level: 'N4', explanation: '表示重要性', example: '続けることが大切です', exampleMeaning: '坚持很重要' },
  { id: 'gram-n4-08', pattern: '〜と言われています', meaning: '被称为〜', level: 'N4', explanation: '表示普遍认识', example: '日本人は勤勉と言われています', exampleMeaning: '日本人被称为勤劳' },

  // N3 语法
  { id: 'gram-n3-01', pattern: '〜。一方で', meaning: '另一方面〜', level: 'N3', explanation: '对比两个相反的事实', example: '経済は成長一方的で、環境は悪化しています', exampleMeaning: '经济在增长，另一方面环境在恶化' },
  { id: 'gram-n3-02', pattern: '〜反面', meaning: '〜相反', level: 'N3', explanation: '同一事物的正反两面', example: '便利な反面、プライバシーに問題があります', exampleMeaning: '方便的同时，也有隐私问题' },
  { id: 'gram-n3-03', pattern: '〜を通じて/〜を通して', meaning: '通过〜', level: 'N3', explanation: '表示手段或媒介', example: '経験を通じて学ぶ', exampleMeaning: '通过经验学习' },
  { id: 'gram-n3-04', pattern: '〜にもかかわらず', meaning: '尽管〜', level: 'N3', explanation: '表示逆接', example: '努力にもかかわらず、失敗しました', exampleMeaning: '尽管努力了，还是失败了' },
  { id: 'gram-n3-05', pattern: '〜と言えます', meaning: '可以说〜', level: 'N3', explanation: '表示评价', example: '環境問題深刻化と言えます', exampleMeaning: '可以说环境问题日益严重' },
  { id: 'gram-n3-06', pattern: '〜に他なりません', meaning: '不外乎是〜', level: 'N3', explanation: '强调必然性', example: '成功は努力に他なりません', exampleMeaning: '成功不外乎是努力' },
  { id: 'gram-n3-07', pattern: '〜ざるを得ない', meaning: '不得不〜', level: 'N3', explanation: '表示无奈的选择', example: '止めざるを得ない', exampleMeaning: '不得不停止' },
  { id: 'gram-n3-08', pattern: '〜ものです', meaning: '确实是〜', level: 'N3', explanation: '表示本质或感慨', example: '人は失敗するものですね', exampleMeaning: '人确实是会失败的' },
  { id: 'gram-n3-09', pattern: '〜かけです', meaning: '〜到一半', level: 'N3', explanation: '表示动作刚开始或进行中', example: '読みかけた本', exampleMeaning: '读到一半的书' },
  { id: 'gram-n3-10', pattern: '〜を踏まえて', meaning: '基于〜', level: 'N3', explanation: '表示根据', example: '事実を踏まえて判断する', exampleMeaning: '基于事实判断' },

  // N2 语法（新增）
  { id: 'gram-n2-01', pattern: '〜にすぎない', meaning: '只不过，仅仅', level: 'N2', explanation: '名词/普通形 + にすぎない。用来降低评价或限定范围。', example: 'それは一つの例にすぎない。', exampleMeaning: '那只不过是一个例子。', examTip: '常用于作者弱化表面现象，提示不要过度解读。' },
  { id: 'gram-n2-02', pattern: '〜とされています', meaning: '被认为，被视为', level: 'N2', explanation: '普通形 + とされています。书面表达，用于客观陈述一般看法。', example: '日本では協調性が重視されるとされています。', exampleMeaning: '一般认为在日本重视协调性。', examTip: '阅读里常用来淡化主语，制造客观感。' },

  // N1 语法（新增）
  { id: 'gram-n1-01', pattern: '〜に他ならない', meaning: '无非就是，正是', level: 'N1', explanation: '名词 + に他ならない。用于强烈下定义。', example: '教育とは人間理解の営みに他ならない。', exampleMeaning: '教育无非就是理解人的活动。', examTip: '很适合判断作者核心定义。' },
  { id: 'gram-n1-02', pattern: '〜ないことには', meaning: '如果不……就……', level: 'N1', explanation: '动词未然形 + ないことには。表示前提不成立，后项无法实现。', example: '実態を把握しないことには、対策は立てられない。', exampleMeaning: '如果不掌握实际情况，就无法制定对策。', examTip: '适合记成因果句型，写作也好用。' },

  // 考研日语语法（新增）
  { id: 'gram-exam-01', pattern: '〜をめぐって', meaning: '围绕……', level: '考研', explanation: '名词 + をめぐって。表示围绕某问题展开讨论、对立、争论。', example: '少子化対策をめぐって議論が続いている。', exampleMeaning: '围绕少子化对策的讨论仍在继续。', examTip: '新闻类、社会议题类文章高频。' },
  { id: 'gram-exam-02', pattern: '〜に基づいて', meaning: '根据，基于', level: '考研', explanation: '名词 + に基づいて。表示以某依据、原则、资料为基础。', example: 'データに基づいて判断すべきだ。', exampleMeaning: '应该根据数据来判断。', examTip: '和「根拠」「調査結果」一起记忆。' },
]

// ─── 获取所有词汇（合并）────────────────────────────────────────────────────────────────
export const allVocabulary = [
  ...n5Vocabulary,
  ...n4Vocabulary,
  ...n3Vocabulary,
  ...n2Vocabulary,
  ...n1Vocabulary,
  ...examVocabulary,
]

// ─── 按等级分组 ─────────────────────────────────────────────────────────────────
export const vocabularyByLevel = {
  N5: n5Vocabulary,
  N4: n4Vocabulary,
  N3: n3Vocabulary,
  N2: n2Vocabulary,
  N1: n1Vocabulary,
  '考研': examVocabulary,
}

// ─── 语法按等级分组 ─────────────────────────────────────────────────────────────────
export const grammarByLevel = {
  N5: grammarPoints.filter(g => g.level === 'N5'),
  N4: grammarPoints.filter(g => g.level === 'N4'),
  N3: grammarPoints.filter(g => g.level === 'N3'),
  N2: grammarPoints.filter(g => g.level === 'N2'),
  N1: grammarPoints.filter(g => g.level === 'N1'),
  '考研': grammarPoints.filter(g => g.level === '考研'),
}

// ─── 等级列表 ─────────────────────────────────────────────────────────────────
export const vocabularyLevels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1', '考研']

// ─── 获取词汇统计 ─────────────────────────────────────────────────────────────────
export function getVocabularyStats() {
  const byLevel = vocabularyLevels.reduce<Record<JLPTLevel, number>>((acc, level) => {
    acc[level] = allVocabulary.filter((item) => item.level === level).length
    return acc
  }, {} as Record<JLPTLevel, number>)

  return {
    total: allVocabulary.length,
    byLevel,
  }
}
