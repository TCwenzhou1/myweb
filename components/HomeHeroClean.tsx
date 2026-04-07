import Link from 'next/link'

const pillars = [
  {
    label: 'Projects',
    title: 'AI systems and shipped case studies',
    note: '把问题定义、系统拆分和工程取舍讲清楚，让每个项目都能看见过程与结果。',
  },
  {
    label: 'Lab',
    title: 'Learning product experiments',
    note: '把日语词卡、复习循环和自测体验做成真正能每天使用的学习工具。',
  },
  {
    label: 'Games',
    title: 'Game prototypes and playtesting',
    note: '持续公开迭代中的原型证据、玩法判断和下一步方向。',
  },
]

export default function HomeHeroClean() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5EE] px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(212,188,138,0.22),transparent_58%)]" />
      <div className="pointer-events-none absolute left-[-8%] top-24 h-72 w-72 rounded-full bg-[#E8DCC4]/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 right-[-6%] h-80 w-80 rounded-full bg-[#F1E7D4]/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-[36px] border border-[#E7D9C0] bg-[linear-gradient(145deg,rgba(255,252,246,0.94),rgba(248,243,234,0.9))] p-6 shadow-[0_28px_80px_rgba(76,58,29,0.08)] sm:p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr,0.85fr] lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-[#A88B55]">TCwenzhou Personal Lab</p>
              <h1
                className="mt-5 max-w-4xl text-5xl leading-[0.92] text-[#111111] sm:text-6xl lg:text-[5.7rem]"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                Projects, experiments, and proof of work that keeps moving.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5C585E] sm:text-lg">
                计算机工程 / 系统实践
                <br />
                聚焦 AI、学习产品与游戏探索
              </p>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-[#5C585E] sm:text-base">
                这里不是一次性完成的作品集，而是我持续推进 AI 系统、学习产品和游戏原型的工作台。
                首页先帮助你快速判断哪里最值得看，再把你带到真正有证据的页面。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="rounded-full bg-[#111111] px-6 py-3 text-sm font-medium text-[#F8F5EE] transition hover:bg-[#252227]"
                >
                  查看项目
                </Link>
                <Link
                  href="/lab"
                  className="rounded-full border border-[#D4BC8A] px-6 py-3 text-sm font-medium text-[#4A413F] transition hover:border-[#A88B55] hover:text-[#111111]"
                >
                  进入实验室
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {pillars.map((pillar) => (
                <div key={pillar.label} className="rounded-[28px] border border-[#EADFCC] bg-white/70 p-5 backdrop-blur">
                  <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#A88B55]">{pillar.label}</p>
                  <h2 className="mt-3 text-2xl text-[#111111]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    {pillar.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#5C585E]">{pillar.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#E8DCC4] pt-6 text-sm text-[#5C585E]">
            <span>github.com/TCwenzhou1</span>
            <span>3240468691@qq.com</span>
          </div>
        </div>
      </div>
    </section>
  )
}
