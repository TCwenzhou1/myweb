import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | TCwenzhou',
  description: '关于 TCwenzhou：计算机工程学生，AI 项目学习者，游戏开发探索者。',
}

export default function AboutPage() {
  return (
    <div className="section-padding py-16 max-w-2xl mx-auto">
      {/* header */}
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">
          About
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-4">关于</h1>
      </div>

      {/* content */}
      <div className="space-y-8 text-[15px] text-foreground/80 leading-[1.85]">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">现在在做什么</h2>
          <p>
            计算机工程方向的学生。主要精力放在 AI 项目实践和系统工程上，同时对游戏开发保持长期兴趣。
            不追求「全栈样样通」，更注重在具体问题上把事情做深、做清楚。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">几个方向</h2>
          <ul className="space-y-2 pl-4">
            <li className="relative before:content-['—'] before:absolute before:-left-4 before:text-muted-foreground">
              AI 项目：做了一些强化学习和 LLM 应用的实验，偏工程实践，不止停在论文阶段
            </li>
            <li className="relative before:content-['—'] before:absolute before:-left-4 before:text-muted-foreground">
              游戏开发：长期关注游戏引擎和交互设计，慢慢在积累
            </li>
            <li className="relative before:content-['—'] before:absolute before:-left-4 before:text-muted-foreground">
              系统工程：喜欢把散乱的流程做成可以复用的系统，哪怕只是给自己用
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">成长方式</h2>
          <p>
            倾向于长期主义的路线。不追热点，但也不拒绝新东西。
            更相信一件事做扎实了的价值，比快速切换十件事更大。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">这个站的用途</h2>
          <p>
            记录在做的项目、尝试中的实验、可以玩的游戏。
            不是简历，不是个人品牌展示，更像是一个公开的工作台。
          </p>
        </section>
      </div>
    </div>
  )
}
