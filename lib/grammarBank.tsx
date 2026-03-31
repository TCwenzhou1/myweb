import { motion } from 'framer-motion';

export interface GrammarItem {
  grammar: string;
  explanation: string;
}

export interface GrammarCategory {
  id: string;
  number: string;
  title: string;
  items: GrammarItem[];
}

export const grammarCategories: GrammarCategory[] = [
  {
    "id": "g-1",
    "number": "1",
    "title": "基础活用总览",
    "items": [
      {
        "grammar": "动词五段、一段、サ变、カ变",
        "explanation": "先熟悉辞书形、ます形、て形、た形、ない形、可能形、被动形、使役形、使役被动形。"
      },
      {
        "grammar": "い形容词",
        "explanation": "高い／高くない／高かった／高くて"
      },
      {
        "grammar": "な形容词",
        "explanation": "静かだ／静かではない／静かだった／静かで"
      },
      {
        "grammar": "名词谓语",
        "explanation": "学生だ／学生ではない／学生だった"
      }
    ]
  },
  {
    "id": "g-2",
    "number": "2",
    "title": "助词高频考点",
    "items": [
      {
        "grammar": "は",
        "explanation": "提示主题"
      },
      {
        "grammar": "が",
        "explanation": "主语、强调对象、存在句"
      },
      {
        "grammar": "を",
        "explanation": "宾语、移动经过点（道を歩く）"
      },
      {
        "grammar": "に",
        "explanation": "时间点、存在地点、到达点、对象"
      },
      {
        "grammar": "へ",
        "explanation": "方向"
      },
      {
        "grammar": "で",
        "explanation": "动作场所、手段、范围"
      },
      {
        "grammar": "と",
        "explanation": "共同者、引用、并列、结果"
      },
      {
        "grammar": "から／まで",
        "explanation": "起点／终点"
      },
      {
        "grammar": "より",
        "explanation": "比较基准"
      },
      {
        "grammar": "ほど",
        "explanation": "程度、对比"
      },
      {
        "grammar": "しか～ない",
        "explanation": "仅仅，只有"
      },
      {
        "grammar": "さえ",
        "explanation": "连……都"
      },
      {
        "grammar": "でも",
        "explanation": "即使、举例"
      },
      {
        "grammar": "ばかり",
        "explanation": "净是、刚刚"
      },
      {
        "grammar": "だけ",
        "explanation": "只，仅"
      },
      {
        "grammar": "こそ",
        "explanation": "正是"
      },
      {
        "grammar": "でも／ても",
        "explanation": "转折让步要区分"
      }
    ]
  },
  {
    "id": "g-3",
    "number": "3",
    "title": "时态与体",
    "items": [
      {
        "grammar": "～てある",
        "explanation": "人为动作结果的存续"
      },
      {
        "grammar": "～ておく",
        "explanation": "事先准备"
      },
      {
        "grammar": "～てしまう",
        "explanation": "做完；遗憾、懊悔"
      },
      {
        "grammar": "～てみる",
        "explanation": "试着做"
      },
      {
        "grammar": "～てくる／～ていく",
        "explanation": "变化的起点和延伸方向"
      }
    ]
  },
  {
    "id": "g-4",
    "number": "4",
    "title": "常考动词语态",
    "items": [
      {
        "grammar": "可能",
        "explanation": "読める／できる"
      },
      {
        "grammar": "被动",
        "explanation": "ほめられる"
      },
      {
        "grammar": "使役",
        "explanation": "行かせる"
      },
      {
        "grammar": "使役被动",
        "explanation": "行かされる"
      }
    ]
  },
  {
    "id": "g-5",
    "number": "5",
    "title": "授受表达",
    "items": [
      {
        "grammar": "あげる",
        "explanation": "我方给别人"
      },
      {
        "grammar": "くれる",
        "explanation": "别人给我方"
      },
      {
        "grammar": "もらう",
        "explanation": "我方得到"
      },
      {
        "grammar": "～てあげる／～てくれる／～てもらう",
        "explanation": "动作授受"
      }
    ]
  },
  {
    "id": "g-6",
    "number": "6",
    "title": "敬语体系",
    "items": [
      {
        "grammar": "尊敬语",
        "explanation": "いらっしゃる、召し上がる、なさる、ご覧になる"
      },
      {
        "grammar": "自谦语",
        "explanation": "参る、申す、いたす、拝見する、伺う"
      },
      {
        "grammar": "郑重语",
        "explanation": "ございます"
      }
    ]
  },
  {
    "id": "g-7",
    "number": "7",
    "title": "条件表达辨析",
    "items": [
      {
        "grammar": "と",
        "explanation": "自然恒常结果"
      },
      {
        "grammar": "ば",
        "explanation": "一般条件、书面"
      },
      {
        "grammar": "たら",
        "explanation": "一次性条件、发现"
      },
      {
        "grammar": "なら",
        "explanation": "承接前项信息的假定"
      }
    ]
  },
  {
    "id": "g-8",
    "number": "8",
    "title": "原因理由表达",
    "items": [
      {
        "grammar": "から／ので",
        "explanation": "原因"
      },
      {
        "grammar": "ため（に）",
        "explanation": "书面，较客观"
      },
      {
        "grammar": "おかげで",
        "explanation": "正面原因"
      },
      {
        "grammar": "せいで",
        "explanation": "负面原因"
      },
      {
        "grammar": "あまり",
        "explanation": "过于……以至于"
      }
    ]
  },
  {
    "id": "g-9",
    "number": "9",
    "title": "转折、对比、让步",
    "items": [
      {
        "grammar": "が／けれども",
        "explanation": "但是"
      },
      {
        "grammar": "のに",
        "explanation": "尽管，却"
      },
      {
        "grammar": "ても",
        "explanation": "即使"
      },
      {
        "grammar": "一方（で）",
        "explanation": "另一方面"
      },
      {
        "grammar": "反面",
        "explanation": "反过来说"
      },
      {
        "grammar": "反対に",
        "explanation": "相反"
      }
    ]
  },
  {
    "id": "g-10",
    "number": "10",
    "title": "判断、推测、传闻",
    "items": [
      {
        "grammar": "ようだ",
        "explanation": "比况、推测"
      },
      {
        "grammar": "みたいだ",
        "explanation": "口语化的ようだ"
      },
      {
        "grammar": "らしい",
        "explanation": "有根据的推测，典型性"
      },
      {
        "grammar": "はずだ",
        "explanation": "按理应当"
      },
      {
        "grammar": "べきだ",
        "explanation": "应该"
      },
      {
        "grammar": "に違いない",
        "explanation": "一定"
      },
      {
        "grammar": "かもしれない",
        "explanation": "可能"
      }
    ]
  },
  {
    "id": "g-11",
    "number": "11",
    "title": "限定、强调、添加",
    "items": [
      {
        "grammar": "だけ",
        "explanation": "仅仅"
      },
      {
        "grammar": "しか～ない",
        "explanation": "只有"
      },
      {
        "grammar": "ばかり",
        "explanation": "尽是；刚刚"
      },
      {
        "grammar": "ほど",
        "explanation": "程度"
      },
      {
        "grammar": "くらい／ぐらい",
        "explanation": "程度，最低限"
      },
      {
        "grammar": "こそ",
        "explanation": "正是"
      },
      {
        "grammar": "さえ",
        "explanation": "连……都"
      },
      {
        "grammar": "まで",
        "explanation": "甚至"
      }
    ]
  },
  {
    "id": "g-12",
    "number": "12",
    "title": "目的、手段、变化",
    "items": [
      {
        "grammar": "ために",
        "explanation": "为了"
      },
      {
        "grammar": "ように",
        "explanation": "为了达到状态"
      },
      {
        "grammar": "ことにする / ことになる",
        "explanation": "主观决定 / 客观决定"
      },
      {
        "grammar": "ようになる",
        "explanation": "能力、习惯、状态变化"
      },
      {
        "grammar": "ようにする",
        "explanation": "努力使之成为习惯"
      },
      {
        "grammar": "になる",
        "explanation": "变成"
      },
      {
        "grammar": "とする",
        "explanation": "把……作为……"
      }
    ]
  },
  {
    "id": "g-13",
    "number": "13",
    "title": "名词化与书面表达",
    "items": [
      {
        "grammar": "こと",
        "explanation": "抽象事项、规则、经验"
      },
      {
        "grammar": "の",
        "explanation": "口语名词化、说明"
      },
      {
        "grammar": "わけだ",
        "explanation": "难怪、就是说"
      },
      {
        "grammar": "わけではない",
        "explanation": "并非……"
      },
      {
        "grammar": "という",
        "explanation": "叫作；所谓；引用说明"
      },
      {
        "grammar": "として",
        "explanation": "作为"
      },
      {
        "grammar": "にとって",
        "explanation": "对于……来说"
      },
      {
        "grammar": "について",
        "explanation": "关于"
      },
      {
        "grammar": "に対して",
        "explanation": "对；与……相对"
      },
      {
        "grammar": "によって",
        "explanation": "依据；因……而异；被动施事者"
      }
    ]
  },
  {
    "id": "g-14",
    "number": "14",
    "title": "203 高频易错对比",
    "items": []
  }
];

export const grammarStats = {
  total: 84,
  categories: 14
};

interface GrammarCardProps {
  category: GrammarCategory;
  index: number;
}

function GrammarCard({ category, index }: GrammarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-lg"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">
          {category.number}
        </span>
        <h3 className="text-lg font-semibold text-amber-100">{category.title}</h3>
      </div>
      <div className="space-y-2">
        {category.items.slice(0, 8).map((item, i) => (
          <div key={i} className="flex gap-2 text-sm">
            <span className="font-mono text-amber-400">{item.grammar}</span>
            <span className="text-slate-300">— {item.explanation}</span>
          </div>
        ))}
        {category.items.length > 8 && (
          <p className="text-xs text-slate-400">...还有 {category.items.length - 8} 条</p>
        )}
      </div>
    </motion.div>
  );
}

export function GrammarTab() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {grammarCategories.map((category, index) => (
        <GrammarCard key={category.id} category={category} index={index} />
      ))}
    </div>
  );
}
