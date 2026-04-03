import Link from 'next/link'
import { currentFocusAreas, portfolioProjects, quickDestinations } from '@/lib/siteContent'

const statusLabelMap = {
  active: '运行中',
  done: '已完成',
  wip: '进行中',
} as const

export default function HomeOverview() {
  return (
    <section className="bg-[#F8F5EE] px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[28px] border border-[#E8DCC4] bg-white/80 p-6 shadow-[0_16px_48px_rgba(15,14,16,0.06)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#A88B55]">Now</p>
              <h2
                className="mt-3 text-3xl text-[#0F0E10] sm:text-4xl"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                现在更想让人一眼看懂我在做什么
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#5C585E] sm:text-base">
                首页保留片头感，但下面补上真正能帮助访客决策的信息层：方向、项目和入口。这样第一次访问的人不会只记住风格，也能快速记住内容。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-[#0F0E10] px-5 py-3 text-sm font-medium text-[#F8F5EE] transition hover:bg-[#252227]"
              >
                查看项目
              </Link>
              <Link
                href="/lab"
                className="rounded-full border border-[#D4BC8A] px-5 py-3 text-sm font-medium text-[#5C585E] transition hover:border-[#A88B55] hover:text-[#0F0E10]"
              >
                进入实验室
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {currentFocusAreas.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-[24px] border border-[#E8DCC4] bg-[#FCFBF8] p-6 transition hover:-translate-y-1 hover:border-[#D4BC8A] hover:shadow-[0_18px_40px_rgba(15,14,16,0.07)]"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#A88B55]">Focus</p>
              <h3 className="mt-3 text-2xl text-[#0F0E10]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5C585E]">{item.description}</p>
            </Link>
          ))}
        </div>

        <div className="rounded-[28px] border border-[#E8DCC4] bg-white/80 p-6 shadow-[0_16px_48px_rgba(15,14,16,0.06)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#A88B55]">Featured</p>
              <h2
                className="mt-3 text-3xl text-[#0F0E10] sm:text-4xl"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                精选项目
              </h2>
            </div>
            <Link href="/projects" className="text-sm font-medium text-[#5C585E] transition hover:text-[#0F0E10]">
              查看完整项目页
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <article
                key={project.title}
                className="rounded-[24px] border border-[#E8DCC4] bg-[#FCFBF8] p-5 transition hover:-translate-y-1 hover:border-[#D4BC8A]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl text-[#0F0E10]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#A88B55]">
                      {statusLabelMap[project.status]}
                      {project.year ? ` · ${project.year}` : ''}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#5C585E]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#E8DCC4] bg-[#F3EEE4] px-3 py-1 text-xs text-[#5C585E]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  <Link href={project.href} className="font-medium text-[#0F0E10] transition hover:text-[#A88B55]">
                    查看说明
                  </Link>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#5C585E] transition hover:text-[#0F0E10]"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#5C585E] transition hover:text-[#0F0E10]"
                    >
                      在线访问
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickDestinations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[24px] border border-[#E8DCC4] bg-[#FCFBF8] p-5 transition hover:-translate-y-1 hover:border-[#D4BC8A] hover:shadow-[0_18px_40px_rgba(15,14,16,0.07)]"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#A88B55]">Route</p>
              <h3 className="mt-3 text-2xl text-[#0F0E10]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5C585E]">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
