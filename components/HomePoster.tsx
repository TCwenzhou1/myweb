import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, Bot, Gamepad2, Mail, Sparkles } from 'lucide-react'
import {
  currentFocusAreas,
  featuredProject,
  gameProofs,
  labHighlights,
  projectStatusLabelMap,
  quickDestinations,
} from '@/lib/siteContent'

const laneIcons = [Bot, BookOpen, Gamepad2]

const posterStats = [
  {
    value: '03',
    label: 'Main Lanes',
    note: 'Projects, Lab, Games',
  },
  {
    value: '01',
    label: 'Usable Product',
    note: '可直接打开体验的日语学习实验室',
  },
  {
    value: '∞',
    label: 'Working Archive',
    note: '持续迭代的个人网站，不是一次性作品页',
  },
]

export default function HomePoster() {
  const leadGame = gameProofs[0]
  const supportGame = gameProofs[1] ?? gameProofs[0]
  const primaryRoutes = quickDestinations.slice(0, 3)
  const contactRoute = quickDestinations.find((item) => item.href === '/contact')

  return (
    <div className="relative overflow-hidden bg-[#f5f1e8] text-[#12110f]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(199,158,91,0.24),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(111,142,123,0.16),transparent_22%),linear-gradient(180deg,#f8f3ea_0%,#eee4d5_52%,#e4d4bd_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:radial-gradient(#171819_0.7px,transparent_0.7px)] [background-size:12px_12px]" />
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-[28rem] w-[28rem] rounded-full bg-[#fbf7ef] blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-[32rem] h-[24rem] w-[24rem] rounded-full bg-[#dde5da]/55 blur-3xl" />

      <section className="relative px-4 pb-4 pt-24 sm:px-6 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
            <article className="relative overflow-hidden rounded-[36px] border border-[#cdbb9f] bg-[linear-gradient(145deg,rgba(255,251,245,0.96),rgba(242,232,216,0.92))] p-6 shadow-[0_28px_100px_rgba(56,43,29,0.10)] sm:p-8 lg:min-h-[720px] lg:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(150,112,63,0.13),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(111,142,123,0.10),transparent_34%),linear-gradient(135deg,transparent_55%,rgba(18,17,15,0.035)_100%)]" />
              <div className="pointer-events-none absolute right-4 top-3 font-[var(--font-bodoni)] text-[7rem] leading-none text-[#12110f]/[0.055] sm:right-8 sm:top-6 sm:text-[11rem] lg:text-[14rem]">
                TC
              </div>

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-[#8f6a3a]">
                    <span className="rounded-full border border-[#cdbb9f] bg-white/70 px-3 py-1">Poster Index</span>
                    <span>TCwenzhou Personal Lab</span>
                  </div>

                  <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr),220px] lg:items-start">
                    <div>
                      <p className="max-w-2xl text-sm leading-8 text-[#5a5149] sm:text-base">
                        AI 系统、学习产品实验、游戏原型。
                      </p>
                      <h1
                        className="mt-4 max-w-4xl text-[3.5rem] leading-[0.88] tracking-[-0.05em] text-[#12110f] sm:text-[4.8rem] lg:text-[7.2rem]"
                        style={{ fontFamily: 'var(--font-cormorant), serif' }}
                      >
                        把个人网站
                        <br />
                        做成一张持续更新的海报
                      </h1>
                      <p className="mt-6 max-w-2xl text-base leading-8 text-[#514940] sm:text-lg">
                        这里不是把项目简单堆成列表，而是把我正在推进的方向压缩成一张能快速读懂的首页。
                        先让你判断值不值得继续看，再把你带去真正有内容的页面。
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                          href="/projects"
                          className="inline-flex items-center gap-2 rounded-full bg-[#12110f] px-6 py-3 text-sm font-medium text-[#f5efe4] transition hover:bg-[#27231f]"
                        >
                          查看项目案例
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          href="/lab"
                          className="inline-flex items-center gap-2 rounded-full border border-[#b18447] bg-white/60 px-6 py-3 text-sm font-medium text-[#302c28] transition hover:border-[#96703f] hover:bg-white"
                        >
                          进入实验室
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[#d8c8ad] bg-[#f7f0e5]/90 p-5">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#8f6a3a]">Read Order</p>
                      <div className="mt-5 space-y-4">
                        {currentFocusAreas.map((item, index) => {
                          const Icon = laneIcons[index] ?? Sparkles

                          return (
                            <div key={item.href} className="border-b border-[#e3d4bd] pb-4 last:border-b-0 last:pb-0">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[10px] uppercase tracking-[0.28em] text-[#8d7e6a]">{`0${index + 1}`}</span>
                                <Icon className="h-4 w-4 text-[#6f8e7b]" />
                              </div>
                              <p className="mt-3 text-xl text-[#12110f]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                                {item.eyebrow}
                              </p>
                              <p className="mt-2 text-sm leading-6 text-[#5a5149]">{item.description}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-[#d8c8ad] pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {posterStats.map((item) => (
                      <div key={item.label} className="rounded-[24px] border border-[#e4d4bd] bg-white/70 p-5">
                        <p className="font-[var(--font-bodoni)] text-4xl leading-none text-[#12110f] sm:text-5xl">{item.value}</p>
                        <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-[#8f6a3a]">{item.label}</p>
                        <p className="mt-2 text-sm leading-6 text-[#5a5149]">{item.note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e6d8c3] pt-5 text-sm text-[#5a5149]">
                    <span>github.com/TCwenzhou1</span>
                    <span>3240468691@qq.com</span>
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              <article className="relative overflow-hidden rounded-[36px] border border-[#cdbb9f] bg-[#171819] p-6 text-[#f5efe4] shadow-[0_24px_80px_rgba(20,18,20,0.20)] sm:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(199,158,91,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(111,142,123,0.13),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_45%)]" />
                <div className="relative">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#c79e5b]">Manifesto</p>
                  <h2
                    className="mt-4 max-w-md text-4xl leading-[0.96] text-[#fff8ee] sm:text-5xl"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    不是“个人简介”，而是公开工作台。
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-7 text-[#d8cbbb] sm:text-base">
                    首页的任务不是把信息讲完，而是用一屏视觉和几块证据，把方向、能力和入口说明白。
                  </p>
                  <div className="mt-8 grid gap-3">
                    {[
                      'Projects 讲案例证明',
                      'Lab 讲产品证明',
                      'Games 讲原型证明',
                    ].map((item) => (
                      <div key={item} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#f5efe4]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className="rounded-[36px] border border-[#cdbb9f] bg-[linear-gradient(180deg,rgba(250,246,239,0.95),rgba(239,229,211,0.9))] p-6 shadow-[0_22px_64px_rgba(56,43,29,0.09)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#8f6a3a]">Site Role</p>
                    <h2 className="mt-3 text-3xl text-[#12110f] sm:text-4xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                      一张能继续扩写的首页海报
                    </h2>
                  </div>
                  <Sparkles className="mt-1 h-5 w-5 text-[#96703f]" />
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    '让第一次进入的网站访客在 10 秒内判断方向',
                    '把最值得看的项目、实验室和原型压缩成清晰入口',
                    '保留气质，但不牺牲信息效率与移动端阅读',
                  ].map((item) => (
                    <div key={item} className="rounded-[22px] border border-[#e3d4bd] bg-white/60 px-4 py-4 text-sm leading-7 text-[#514940]">
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[36px] border border-[#cdbb9f] bg-white/80 p-6 shadow-[0_22px_70px_rgba(56,43,29,0.09)] backdrop-blur sm:p-8 lg:p-10">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f6a3a]">Featured Project</p>
                  <h2 className="mt-4 max-w-3xl text-4xl leading-[0.95] text-[#12110f] sm:text-5xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    {featuredProject.title}
                  </h2>
                </div>
                <div className="rounded-full border border-[#ddceb5] bg-[#f4ecdd] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#5a5149]">
                  {projectStatusLabelMap[featuredProject.status]} / {featuredProject.year}
                </div>
              </div>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#514940] sm:text-lg">{featuredProject.headline}</p>

              <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_240px]">
                <div className="grid gap-4 sm:grid-cols-3">
                  <PosterDataBlock label="角色" text={featuredProject.role} />
                  <PosterDataBlock label="核心问题" text={featuredProject.problem} />
                  <PosterDataBlock label="当前结果" text={featuredProject.outcomes[0]} />
                </div>

                <div className="rounded-[28px] border border-[#d8c8ad] bg-[#171819] p-5 text-[#f5efe4]">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#c79e5b]">Tags</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-[#eadccb]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#12110f] px-5 py-3 text-sm font-medium text-[#f5efe4] transition hover:bg-[#27231f]"
                >
                  阅读完整案例
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {featuredProject.github && (
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#d5c6ac] bg-[#f7f0e5] px-5 py-3 text-sm font-medium text-[#302c28] transition hover:border-[#96703f] hover:bg-white"
                  >
                    GitHub
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </article>

            <div className="grid gap-4">
              <article className="rounded-[36px] border border-[#cdbb9f] bg-[linear-gradient(180deg,rgba(247,241,230,0.94),rgba(237,226,207,0.88))] p-6 shadow-[0_22px_70px_rgba(56,43,29,0.09)] sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f6a3a]">Lab Preview</p>
                <h2 className="mt-4 text-3xl leading-tight text-[#12110f] sm:text-4xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                  先做能真正打开使用的学习产品
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#514940] sm:text-base">
                  搜索、词卡、收藏、复习，不是放一个概念入口，而是让用户一进来就能判断它已经能用了多少。
                </p>

                <div className="mt-6 grid gap-3">
                  {labHighlights.slice(0, 4).map((item, index) => (
                    <div key={item.title} className="rounded-[22px] border border-[#e3d4bd] bg-white/70 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-[#12110f]">{item.title}</p>
                        <span className="text-[10px] uppercase tracking-[0.24em] text-[#96703f]">{`0${index + 1}`}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#5a5149]">{item.description}</p>
                    </div>
                  ))}
                </div>

                <Link href="/lab" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#12110f] transition hover:text-[#6f8e7b]">
                  打开 Lab
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>

              <article className="rounded-[36px] border border-[#cdbb9f] bg-[#171819] p-6 text-[#f5efe4] shadow-[0_22px_70px_rgba(20,18,20,0.20)] sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#c79e5b]">Games Snapshot</p>
                <h2 className="mt-4 text-3xl leading-tight text-[#fff8ee] sm:text-4xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                  {leadGame.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#d8cbbb] sm:text-base">{leadGame.description}</p>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.24em] text-[#c79e5b]">
                    <span>{leadGame.stage}</span>
                    <span>{leadGame.engine}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#ede2d2]">{leadGame.snapshot}</p>
                </div>

                <div className="mt-5 space-y-2">
                  {leadGame.evidence.map((item) => (
                    <p key={item} className="text-sm leading-6 text-[#d8cbbb]">
                      {item}
                    </p>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#c79e5b]">Next Milestone</p>
                  <p className="mt-2 text-sm leading-7 text-[#ede2d2]">{leadGame.nextMilestone}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
            <article className="rounded-[36px] border border-[#cdbb9f] bg-[linear-gradient(180deg,rgba(248,244,236,0.96),rgba(237,226,207,0.9))] p-6 shadow-[0_22px_70px_rgba(56,43,29,0.09)] sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f6a3a]">In Progress</p>
              <h2 className="mt-4 text-3xl leading-tight text-[#12110f] sm:text-4xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                {supportGame.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#514940] sm:text-base">{supportGame.snapshot}</p>

              <div className="mt-6 grid gap-3">
                {supportGame.evidence.map((item, index) => (
                  <div key={item} className="rounded-[22px] border border-[#e3d4bd] bg-white/70 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#96703f]">{`0${index + 1}`}</p>
                    <p className="mt-2 text-sm leading-6 text-[#5a5149]">{item}</p>
                  </div>
                ))}
              </div>

              <Link href="/games" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#12110f] transition hover:text-[#6f8e7b]">
                查看原型记录
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="rounded-[36px] border border-[#cdbb9f] bg-white/80 p-6 shadow-[0_22px_70px_rgba(56,43,29,0.09)] backdrop-blur sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f6a3a]">Start Here</p>
                  <h2 className="mt-4 max-w-2xl text-4xl leading-[0.95] text-[#12110f] sm:text-5xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    你可以把这张首页当成一张导航海报
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-8 text-[#514940] sm:text-base">
                    如果你第一次来，先看案例；如果你更关心产品完成度，直接进 Lab；如果你想看我正在试什么，就看 Games。
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {primaryRoutes.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group rounded-[24px] border border-[#e3d4bd] bg-[#f8f3ea] p-5 transition hover:-translate-y-1 hover:border-[#b18447] hover:bg-white"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[10px] uppercase tracking-[0.24em] text-[#96703f]">{`0${index + 1}`}</p>
                          <ArrowUpRight className="h-4 w-4 text-[#6f8e7b] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <p className="mt-4 text-xl text-[#12110f]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                          {item.title}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-[#5a5149]">{item.description}</p>
                        <span className="mt-5 inline-flex text-sm font-medium text-[#12110f]">{item.cta}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-[#d8c8ad] bg-[#171819] p-6 text-[#f5efe4]">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[#c79e5b]">Contact Strip</p>
                  <h3 className="mt-4 text-3xl leading-tight text-[#fff8ee]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    如果你想聊合作、产品实验或项目方向
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#d8cbbb]">
                    这张首页负责让你快速读懂我在做什么，真正的对话和合作入口放在 Contact。
                  </p>

                  <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center gap-3 text-[#c79e5b]">
                      <Mail className="h-4 w-4" />
                      <span className="text-[11px] uppercase tracking-[0.24em]">Fastest Reach</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#ede2d2]">3240468691@qq.com</p>
                  </div>

                  {contactRoute && (
                    <Link
                      href={contactRoute.href}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-medium text-[#f5efe4] transition hover:bg-white/[0.1]"
                    >
                      {contactRoute.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

function PosterDataBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[28px] border border-[#e3d4bd] bg-[#f8f3ea] p-5">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#8f6a3a]">{label}</p>
      <p className="mt-3 text-sm leading-7 text-[#514940]">{text}</p>
    </div>
  )
}
