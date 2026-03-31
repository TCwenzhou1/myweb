// 手动转换示例（前20条考研词汇）
const kaoyanVocab = [
  {
    "id": "v-3364",
    "word": "政治",
    "kana": "せいじ",
    "level": "考研",
    "meaningZh": "政治",
    "meaningEn": "politics",
    "detailZh": "（せいじ）seiji【名】政治。政治活动、政治事务。考研高频词，常与「学」组成「政治学」。例：政治に興味を持つ（对政治感兴趣）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3365",
    "word": "経済",
    "kana": "けいざい",
    "level": "考研",
    "meaningZh": "经济",
    "meaningEn": "economics",
    "detailZh": "（けいざい）keizai【名】经济。国民经济、个人经济。考研超高频词，经济类文章必背。例：経済を発展させる（发展经济）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3366",
    "word": "社会",
    "kana": "しゃかい",
    "level": "考研",
    "meaningZh": "社会",
    "meaningEn": "society",
    "detailZh": "（しゃかい）shakai【名】社会。社会、社交圈。考研必备词，可组成大量复合词。例：社会貢献を行う（为社会做贡献）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3367",
    "word": "法律",
    "kana": "ほうりつ",
    "level": "考研",
    "meaningZh": "法律",
    "meaningEn": "law",
    "detailZh": "（ほうりつ）houritsu【名】法律。法律法规。法律类文章核心词汇。例：法律を遵守する（遵守法律）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3368",
    "word": "政策",
    "kana": "せいさく",
    "level": "考研",
    "meaningZh": "政策",
    "meaningEn": "policy",
    "detailZh": "（せいさく）seisaku【名】政策。政府制定的政策。政府、改革类话题核心词。例：政策を実行する（执行政策）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3369",
    "word": "政府",
    "kana": "せいふ",
    "level": "考研",
    "meaningZh": "政府",
    "meaningEn": "government",
    "detailZh": "（せいふ）seifu【名】政府。国家行政机关。政治经济类文章必备。例：政府工作报告（政府工作报告）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3370",
    "word": "国家",
    "kana": "こっか",
    "level": "考研",
    "meaningZh": "国家",
    "meaningEn": "country, nation",
    "detailZh": "（こっか）kokka【名】国家。国家、国土。常与「安全保障」「経済」搭配。例：国家安全を守る（保卫国家安全）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3371",
    "word": "権利",
    "kana": "けんり",
    "level": "考研",
    "meaningZh": "权利",
    "meaningEn": "rights",
    "detailZh": "（けんり）kenri【名】权利。法律赋予的权利。人权、法律类话题核心。例：権利を守る（维护权利）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3372",
    "word": "義務",
    "kana": "ぎむ",
    "level": "考研",
    "meaningZh": "义务",
    "meaningEn": "obligation",
    "detailZh": "（ぎむ）gimu【名】义务。法律或道德上的义务。常与「教育」「納税」搭配。例：教育的義務（教育的义务）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3373",
    "word": "民主",
    "kana": "みんしゅ",
    "level": "考研",
    "meaningZh": "民主",
    "meaningEn": "democracy",
    "detailZh": "（みんしゅ）minshu【名】民主。民主主义。政治制度类话题常用词。例：民主主義を実行する（实行民主主义）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3374",
    "word": "平和",
    "kana": "へいわ",
    "level": "考研",
    "meaningZh": "和平",
    "meaningEn": "peace",
    "detailZh": "（へいわ）heiwa【名】和平。和平、安宁。国际关系、社会话题常见。例：世界平和を実現する（实现世界和平）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3375",
    "word": "戦争",
    "kana": "せんそう",
    "level": "考研",
    "meaningZh": "战争",
    "meaningEn": "war",
    "detailZh": "（せんそう）sensou【名】战争。武装冲突。历史、国际关系话题核心。例：戦争を起こす（发动战争）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3376",
    "word": "革命",
    "kana": "かくめい",
    "level": "考研",
    "meaningZh": "革命",
    "meaningEn": "revolution",
    "detailZh": "（かくめい）kakumei【名】革命。根本性变革。历史政治类话题常考。例：産業革命が起こる（发生产业革命）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3377",
    "word": "自由",
    "kana": "じゆう",
    "level": "考研",
    "meaningZh": "自由",
    "meaningEn": "freedom",
    "detailZh": "（じゆう）jiyuu【名】自由。不受限制的状态。考研超高频，权利类话题必备。例：言論の自由を守る（维护言论自由）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3378",
    "word": "平等",
    "kana": "びょうどう",
    "level": "考研",
    "meaningZh": "平等",
    "meaningEn": "equality",
    "detailZh": "（びょうどう）byoudou【名】平等。同等对待。社会公平类话题核心词。例：機会の平等を実現する（实现机会平等）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3379",
    "word": "責任",
    "kana": "せきにん",
    "level": "考研",
    "meaningZh": "责任",
    "meaningEn": "responsibility",
    "detailZh": "（せきにん）sekinin【名】责任。应承担的义务或后果。考研高频词，常与「を持つ」搭配。例：責任を負う（承担责任）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3380",
    "word": "影響",
    "kana": "えいきょう",
    "level": "考研",
    "meaningZh": "影响",
    "meaningEn": "influence",
    "detailZh": "（えいきょう）eikyou【名】影响。对其他事物产生作用。考研超高频，分析类文章必备。例：環境に影響を与える（对环境产生影响）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3381",
    "word": "関係",
    "kana": "かんけい",
    "level": "考研",
    "meaningZh": "关系",
    "meaningEn": "relation",
    "detailZh": "（かんけい）kankei【名】关系。事物之间的联系。考研必备常考词。例：関係を深める（加深关系）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3382",
    "word": "組織",
    "kana": "そしき",
    "level": "考研",
    "meaningZh": "组织",
    "meaningEn": "organization",
    "detailZh": "（そしき）soshiki【名】组织。有结构的团体。社会类、管理类话题常用。例：組織を作る（建立组织）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  },
  {
    "id": "v-3383",
    "word": "制度",
    "kana": "せいど",
    "level": "考研",
    "meaningZh": "制度",
    "meaningEn": "system, institution",
    "detailZh": "（せいど）seido【名】制度。被确立的体系。改革、制度类话题核心。例：制度を改革する（改革制度）",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  }
];

// 导出 JSON 字符串用于插入
export const kaoyanVocabString = JSON.stringify(kaoyanVocab, null, 2);
