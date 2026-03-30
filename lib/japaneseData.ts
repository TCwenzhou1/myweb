// 考研日语学习数据
// 涵盖 N5-N3 等级词汇和考研必备语法

export interface VocabularyItem {
  id: string
  word: string
  reading: string // 假名注音
  meaning: string
  partOfSpeech: '名' | '動' | '形' | '副' | '助' | '連'
  level: 'N5' | 'N4' | 'N3'
  example?: string
  exampleMeaning?: string
}

export interface GrammarPoint {
  id: string
  pattern: string // 语法句型
  meaning: string
  level: 'N5' | 'N4' | 'N3'
  explanation: string
  example?: string
  exampleMeaning?: string
}

// ─── N5 级别词汇 ─────────────────────────────────────────────────────────────────
export const n5Vocabulary: VocabularyItem[] = [
  { id: 'n5-001', word: '本', reading: 'ほん', meaning: '书', partOfSpeech: '名', level: 'N5', example: '本を読みます', exampleMeaning: '读书' },
  { id: 'n5-002', word: '日本人', reading: 'にほんじん', meaning: '日本人', partOfSpeech: '名', level: 'N5', example: '日本人は優しいです', exampleMeaning: '日本人很温柔' },
  { id: 'n5-003', word: '学生', reading: 'がくせい', meaning: '学生', partOfSpeech: '名', level: 'N5', example: '私は学生です', exampleMeaning: '我是学生' },
  { id: 'n5-004', word: '先生', reading: 'せんせい', meaning: '老师', partOfSpeech: '名', level: 'N5', example: '先生が来ました', exampleMeaning: '老师来了' },
  { id: 'n5-005', word: '学校', reading: 'がっこう', meaning: '学校', partOfSpeech: '名', level: 'N5', example: '学校に行きます', exampleMeaning: '去学校' },
  { id: 'n5-006', word: '友達', reading: 'ともだち', meaning: '朋友', partOfSpeech: '名', level: 'N5', example: '友達と遊びます', exampleMeaning: '和朋友玩' },
  { id: 'n5-007', word: '今日', reading: 'きょう', meaning: '今天', partOfSpeech: '名', level: 'N5', example: '今日は晴れです', exampleMeaning: '今天是晴天' },
  { id: 'n5-008', word: '明日', reading: 'あした', meaning: '明天', partOfSpeech: '名', level: 'N5', example: '明日會います', exampleMeaning: '明天见面' },
  { id: 'n5-009', word: '昨日', reading: 'きのう', meaning: '昨天', partOfSpeech: '名', level: 'N5', example: '昨日は寒かったです', exampleMeaning: '昨天很冷' },
  { id: 'n5-010', word: '食べる', reading: 'たべる', meaning: '吃', partOfSpeech: '動', level: 'N5', example: '朝ごはんを食べます', exampleMeaning: '吃早饭' },
  { id: 'n5-011', word: '飲む', reading: 'のむ', meaning: '喝', partOfSpeech: '動', level: 'N5', example: '水を飲みます', exampleMeaning: '喝水' },
  { id: 'n5-012', word: '行く', reading: 'いく', meaning: '去', partOfSpeech: '動', level: 'N5', example: '東京に行きます', exampleMeaning: '去东京' },
  { id: 'n5-013', word: '来る', reading: 'くる', meaning: '来', partOfSpeech: '動', level: 'N5', example: '家に来てください', exampleMeaning: '请来我家' },
  { id: 'n5-014', word: '見る', reading: 'みる', meaning: '看', partOfSpeech: '動', level: 'N5', example: '映画を見ます', exampleMeaning: '看电影' },
  { id: 'n5-015', word: '聞く', reading: 'きく', meaning: '听/问', partOfSpeech: '動', level: 'N5', example: '音楽を聞きます', exampleMeaning: '听音乐' },
  { id: 'n5-016', word: '話す', reading: 'はなす', meaning: '说', partOfSpeech: '動', level: 'N5', example: '日本語を話します', exampleMeaning: '说日语' },
  { id: 'n5-017', word: '書く', reading: 'かく', meaning: '写', partOfSpeech: '動', level: 'N5', example: '手紙を書きます', exampleMeaning: '写信' },
  { id: 'n5-018', word: '読む', reading: 'よむ', meaning: '读', partOfSpeech: '動', level: 'N5', example: '本を読みます', exampleMeaning: '读书' },
  { id: 'n5-019', word: '大きい', reading: 'おおきい', meaning: '大的', partOfSpeech: '形', level: 'N5', example: '大きい犬', exampleMeaning: '大的狗' },
  { id: 'n5-020', word: '小さい', reading: 'ちいさい', meaning: '小的', partOfSpeech: '形', level: 'N5', example: '小さい子供', exampleMeaning: '小孩' },
  { id: 'n5-021', word: '新しい', reading: 'あたらしい', meaning: '新的', partOfSpeech: '形', level: 'N5', example: '新しい車', exampleMeaning: '新车' },
  { id: 'n5-022', word: '古い', reading: 'ふるい', meaning: '旧的/老的', partOfSpeech: '形', level: 'N5', example: '古い家', exampleMeaning: '老房子' },
  { id: 'n5-023', word: '美味しい', reading: 'おいしい', meaning: '好吃的', partOfSpeech: '形', level: 'N5', example: '美味しい食べ物', exampleMeaning: '好吃的食物' },
  { id: 'n5-024', word: '静かな', reading: 'しずかな', meaning: '安静的', partOfSpeech: '形', level: 'N5', example: '静かな公園', exampleMeaning: '安静的公园' },
  { id: 'n5-025', word: 'とても', reading: 'とても', meaning: '非常', partOfSpeech: '副', level: 'N5', example: 'とても美味しい', exampleMeaning: '非常好吃' },
  { id: 'n5-026', word: '一緒に', reading: 'いっしょに', meaning: '一起', partOfSpeech: '副', level: 'N5', example: '一緒に食べましょう', exampleMeaning: '一起吃吧' },
  { id: 'n5-027', word: 'まだ', reading: 'まだ', meaning: '还', partOfSpeech: '副', level: 'N5', example: 'まだ決めていません', exampleMeaning: '还没决定' },
  { id: 'n5-028', word: 'もう一度', reading: 'もういちど', meaning: '再一次', partOfSpeech: '副', level: 'N5', example: 'もう一度言ってください', exampleMeaning: '请再说一遍' },
  { id: 'n5-029', word: 'ありがとう', reading: 'ありがとう', meaning: '谢谢', partOfSpeech: '副', level: 'N5', example: 'ありがとう存じます', exampleMeaning: '非常感谢' },
  { id: 'n5-030', word: 'ごめんなさい', reading: 'ごめんなさい', meaning: '对不起', partOfSpeech: '副', level: 'N5', example: 'ごめんなさい、遅れました', exampleMeaning: '对不起，我迟到了' },
]

// ─── N4 级别词汇 ─────────────────────────────────────────────────────────────────
export const n4Vocabulary: VocabularyItem[] = [
  { id: 'n4-001', word: '経験', reading: 'けいけん', meaning: '经验', partOfSpeech: '名', level: 'N4', example: '経験があります', exampleMeaning: '有经验' },
  { id: 'n4-002', word: '関係', reading: 'かんけい', meaning: '关系', partOfSpeech: '名', level: 'N4', example: '環境と関係があります', exampleMeaning: '与环境有关' },
  { id: 'n4-003', word: '結果', reading: 'けっか', meaning: '结果', partOfSpeech: '名', level: 'N4', example: '結果的に成功了', exampleMeaning: '结果成功了' },
  { id: 'n4-004', word: '理由', reading: 'りゆう', meaning: '理由', partOfSpeech: '名', level: 'N4', example: '理由を聞きたい', exampleMeaning: '想问理由' },
  { id: 'n4-005', word: '問題', reading: 'もんだい', meaning: '问题', partOfSpeech: '名', level: 'N4', example: '問題を解きます', exampleMeaning: '解题' },
  { id: 'n4-006', word: '方法', reading: 'ほうほう', meaning: '方法', partOfSpeech: '名', level: 'N4', example: '良い方法があります', exampleMeaning: '有好方法' },
  { id: 'n4-007', word: '研究', reading: 'けんきゅう', meaning: '研究', partOfSpeech: '名', level: 'N4', example: '研究を重ねる', exampleMeaning: '反复研究' },
  { id: 'n4-008', word: '準備', reading: 'じゅんび', meaning: '准备', partOfSpeech: '名', level: 'N4', example: '準備が整いました', exampleMeaning: '准备就绪' },
  { id: 'n4-009', word: '説明', reading: 'せつめい', meaning: '说明', partOfSpeech: '名', level: 'N4', example: '説明してください', exampleMeaning: '请说明' },
  { id: 'n4-010', word: '状態', reading: 'じょうたい', meaning: '状态', partOfSpeech: '名', level: 'N4', example: '状態が悪い', exampleMeaning: '状态不好' },
  { id: 'n4-011', word: '影響', reading: 'えいきょう', meaning: '影响', partOfSpeech: '名', level: 'N4', example: '環境に影響します', exampleMeaning: '影响环境' },
  { id: 'n4-012', word: '結果', reading: 'けっか', meaning: '结果', partOfSpeech: '名', level: 'N4', example: '結果を見る', exampleMeaning: '看结果' },
  { id: 'n4-013', word: '考える', reading: 'かんがえる', meaning: '考虑', partOfSpeech: '動', level: 'N4', example: 'よく考えてください', exampleMeaning: '请好好考虑' },
  { id: 'n4-014', word: '始める', reading: 'はじめる', meaning: '开始', partOfSpeech: '動', level: 'N4', example: '勉強を始めます', exampleMeaning: '开始学习' },
  { id: 'n4-015', word: '続ける', reading: 'つづける', meaning: '继续', partOfSpeech: '動', level: 'N4', example: '読み続けます', exampleMeaning: '继续读' },
  { id: 'n4-016', word: '現れる', reading: 'あらわれる', meaning: '出现', partOfSpeech: '動', level: 'N4', example: '機会が現れます', exampleMeaning: '机会出现' },
  { id: 'n4-017', word: '伝える', reading: 'つたえる', meaning: '传达', partOfSpeech: '動', level: 'N4', example: '言葉を伝えます', exampleMeaning: '传达话语' },
  { id: 'n4-018', word: '重要な', reading: 'じゅうような', meaning: '重要的', partOfSpeech: '形', level: 'N4', example: '重要な問題', exampleMeaning: '重要的问题' },
  { id: 'n4-019', word: '必要な', reading: 'ひつような', meaning: '必要的', partOfSpeech: '形', level: 'N4', example: '必要な準備', exampleMeaning: '必要的准备' },
  { id: 'n4-020', word: '面倒な', reading: 'めんどいな', meaning: '麻烦的', partOfSpeech: '形', level: 'N4', example: '面倒な手続き', exampleMeaning: '麻烦的手续' },
  { id: 'n4-021', word: '複雑な', reading: 'ふくざつな', meaning: '复杂的', partOfSpeech: '形', level: 'N4', example: '複雑な問題', exampleMeaning: '复杂的问题' },
  { id: 'n4-022', word: '幸せな', reading: 'しあわせな', meaning: '幸福的', partOfSpeech: '形', level: 'N4', example: '幸せな生活', exampleMeaning: '幸福的生活' },
  { id: 'n4-023', word: '確かに', reading: 'たしかに', meaning: '确实', partOfSpeech: '副', level: 'N4', example: '確かに存在します', exampleMeaning: '确实存在' },
  { id: 'n4-024', word: '特に', reading: 'ことに', meaning: '特别', partOfSpeech: '副', level: 'N4', example: '特に重要 です', exampleMeaning: '特别重要' },
  { id: 'n4-025', word: '結局', reading: 'けっきょく', meaning: '最终', partOfSpeech: '副', level: 'N4', example: '結局失敗しました', exampleMeaning: '最终失败了' },
]

// ─── N3 级别词汇 ─────────────────────────────────────────────────────────────────
export const n3Vocabulary: VocabularyItem[] = [
  { id: 'n3-001', word: '主張', reading: 'しゅちょう', meaning: '主张', partOfSpeech: '名', level: 'N3', example: '自分の主張を通す', exampleMeaning: '坚持自己的主张' },
  { id: 'n3-002', word: '意識', reading: 'いしき', meaning: '意识', partOfSpeech: '名', level: 'N3', example: '環境意識が高まりました', exampleMeaning: '环境意识提高了' },
  { id: 'n3-003', word: '格差', reading: 'かくさ', meaning: '差距', partOfSpeech: '名', level: 'N3', example: '格差が広がっています', exampleMeaning: '差距在扩大' },
  { id: 'n3-004', word: '傾向', reading: 'けいこう', meaning: '倾向', partOfSpeech: '名', level: 'N3', example: '増加傾向にあります', exampleMeaning: '呈增加趋势' },
  { id: 'n3-005', word: '背景', reading: 'はいけい', meaning: '背景', partOfSpeech: '名', level: 'N3', example: '時代背景を理解する', exampleMeaning: '理解时代背景' },
  { id: 'n3-006', word: '概念', reading: 'がいねん', meaning: '概念', partOfSpeech: '名', level: 'N3', example: '新しい概念', exampleMeaning: '新概念' },
  { id: 'n3-007', word: '本質', reading: 'ほんしつ', meaning: '本质', partOfSpeech: '名', level: 'N3', example: '本質を見抜く', exampleMeaning: '看穿本质' },
  { id: 'n3-008', word: '対する', reading: 'たいする', meaning: '对于', partOfSpeech: '動', level: 'N3', example: '問題に対する態度', exampleMeaning: '对问题的态度' },
  { id: 'n3-009', word: '属する', reading: 'ぞくする', meaning: '属于', partOfSpeech: '動', level: 'N3', example: 'このグループに属する', exampleMeaning: '属于这个 group' },
  { id: 'n3-010', word: '関与する', reading: 'かんよする', meaning: '参与', partOfSpeech: '動', level: 'N3', example: '事件に関与する', exampleMeaning: '参与事件' },
  { id: 'n3-011', word: '提唱する', reading: 'ていしょうする', meaning: '提倡', partOfSpeech: '動', level: 'N3', example: '新理論を提唱する', exampleMeaning: '提倡新理论' },
  { id: 'n3-012', word: '不可欠', reading: 'ふかけつ', meaning: '不可或缺', partOfSpeech: '形', level: 'N3', example: '不可欠の条件', exampleMeaning: '不可或缺的条件' },
  { id: 'n3-013', word: '潜在的な', reading: 'せんざいてきな', meaning: '潜在的', partOfSpeech: '形', level: 'N3', example: '潜在的な危険', exampleMeaning: '潜在的危险' },
  { id: 'n3-014', word: '広範な', reading: 'こうはん', meaning: '广泛的', partOfSpeech: '形', level: 'N3', example: '広範な影響', exampleMeaning: '广泛的影响' },
  { id: 'n3-015', word: '根本上', reading: 'こんぽんてき', meaning: '根本上的', partOfSpeech: '副', level: 'N3', example: '根本上から変わる', exampleMeaning: '从根本上改变' },
  { id: 'n3-016', word: '例えば', reading: 'たとえば', meaning: '例如', partOfSpeech: '副', level: 'N3', example: '例えば、この場合', exampleMeaning: '例如，这种情况' },
  { id: 'n3-017', word: '同時に', reading: 'どうじに', meaning: '同时', partOfSpeech: '副', level: 'N3', example: '同時に進行する', exampleMeaning: '同时进行' },
  { id: 'n3-018', word: '次第に', reading: 'しだいに', meaning: '逐渐', partOfSpeech: '副', level: 'N3', example: '次第に改善される', exampleMeaning: '逐渐改善' },
  { id: 'n3-019', word: 'そもそも', reading: 'そもそも', meaning: '本来', partOfSpeech: '副', level: 'N3', example: 'そもそも違う', exampleMeaning: '本来就不同' },
  { id: 'n3-020', word: 'あえて', reading: 'あえて', meaning: '特意', partOfSpeech: '副', level: 'N3', example: 'あえて失敗する', exampleMeaning: '故意失败' },
]

// ─── 考研必备语法 ─────────────────────────────────────────────────────────────────
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
  { id: 'gram-n4-01', pattern: '〜てくださいました', meaning: '（别人）为我〜', level: 'N4', explanation: '动词て形 + くれました，表示别人为自己做某事', example: '先生が教えてくださいました', exampleMeaning: '老师教我了' },
  { id: 'gram-n4-02', pattern: '〜ようになります', meaning: '变得〜', level: 'N4', explanation: '表示能力、状态的变化', example: '泳げるようになりました', exampleMeaning: '变得会游泳了' },
  { id: 'gram-n4-03', pattern: '〜そうです', meaning: '看起来〜', level: 'N4', explanation: '样态推测', example: '雨が降りそうです', exampleMeaning: '看起来要下雨' },
  { id: 'gram-n4-04', pattern: '〜ようです', meaning: '好像〜', level: 'N4', explanation: '比喻或推测', example: '病気のようですね', exampleMeaning: '好像生病了' },
  { id: 'gram-n4-05', pattern: '〜ために', meaning: '为了〜', level: 'N4', explanation: '表示目的或原因', example: '試験のために勉強する', exampleMeaning: '为了考试而学习' },
  { id: 'gram-n4-06', pattern: '〜によると', meaning: '根据〜', level: 'N4', explanation: '表示信息来源', example: '天気予報によると、明日は晴れです', exampleMeaning: '根据天气预报，明天是晴天' },
  { id: 'gram-n4-07', pattern: '〜ことが大切です', meaning: '〜很重要', level: 'N4', explanation: '表示重要性', example: '続けることが大切です', exampleMeaning: '坚持很重要' },
  { id: 'gram-n4-08', pattern: '〜と言われています', meaning: '被称为〜', level: 'N4', explanation: '表示普遍认识', example: '日本人は勤勉と言われています', exampleMeaning: '日本人被称为勤劳' },

  // N3 语法
  { id: 'gram-n3-01', pattern: '〜一方で', meaning: '另一方面〜', level: 'N3', explanation: '对比两个相反的事实', example: '経済は成長一方で、環境は悪化しています', exampleMeaning: '经济在增长，另一方面环境在恶化' },
  { id: 'gram-n3-02', pattern: '〜反面', meaning: '〜相反', level: 'N3', explanation: '同一事物的正反两面', example: '便利な反面、プライバシーに問題があります', exampleMeaning: '方便的同时，也有隐私问题' },
  { id: 'gram-n3-03', pattern: '〜を通じて/〜を通して', meaning: '通过〜', level: 'N3', explanation: '表示手段或媒介', example: '経験を通じて学ぶ', exampleMeaning: '通过经验学习' },
  { id: 'gram-n3-04', pattern: '〜にもかかわらず', meaning: '尽管〜', level: 'N3', explanation: '表示逆接', example: '努力にもかかわらず、失敗しました', exampleMeaning: '尽管努力了，还是失败了' },
  { id: 'gram-n3-05', pattern: '〜と言えます', meaning: '可以说〜', level: 'N3', explanation: '表示评价', example: '環境問題深刻化と言えます', exampleMeaning: '可以说环境问题日益严重' },
  { id: 'gram-n3-06', pattern: '〜に他なりません', meaning: '不外乎是〜', level: 'N3', explanation: '强调必然性', example: '成功は努力に他なりません', exampleMeaning: '成功不外乎是努力' },
  { id: 'gram-n3-07', pattern: '〜ざるを得ない', meaning: '不得不〜', level: 'N3', explanation: '表示无奈的选择', example: '止めざるを得ない', exampleMeaning: '不得不停止' },
  { id: 'gram-n3-08', pattern: '〜ものです', meaning: '确实是〜', level: 'N3', explanation: '表示本质或感慨', example: '人は失敗するものですね', exampleMeaning: '人确实是会失败的' },
  { id: 'gram-n3-09', pattern: '〜かけです', meaning: '〜到一半', level: 'N3', explanation: '表示动作刚开始或进行中', example: '読みかけた本', exampleMeaning: '读到一半的书' },
  { id: 'gram-n3-10', pattern: '〜を踏まえて', meaning: '基于〜', level: 'N3', explanation: '表示根据', example: '事実を踏まえて判断する', exampleMeaning: '基于事实判断' },
]

// ─── 获取所有词汇 ─────────────────────────────────────────────────────────────────
export const allVocabulary = [...n5Vocabulary, ...n4Vocabulary, ...n3Vocabulary]

// ─── 按等级分组 ─────────────────────────────────────────────────────────────────
export const vocabularyByLevel = {
  N5: n5Vocabulary,
  N4: n4Vocabulary,
  N3: n3Vocabulary,
}

// ─── 语法按等级分组 ─────────────────────────────────────────────────────────────────
export const grammarByLevel = {
  N5: grammarPoints.filter(g => g.level === 'N5'),
  N4: grammarPoints.filter(g => g.level === 'N4'),
  N3: grammarPoints.filter(g => g.level === 'N3'),
}
