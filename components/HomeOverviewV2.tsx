import Link from 'next/link'
import {
  currentFocusAreas,
  featuredProject,
  gameProofs,
  labHighlights,
  projectStatusLabelMap,
  quickDestinations,
} from '@/lib/siteContent'

export default function HomeOverviewV2() {
  const leadGameProof = gameProofs[0]

  return (
    <section className="bg-[#F8F5EE] px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[28px] border border-[#E8DCC4] bg-white/85 p-6 shadow-[0_16px_48px_rgba(15,14,16,0.06)] backdrop-blur sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr,0.7fr] lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#A88B55]">Overview</p>
              <h2
                className="mt-3 max-w-3xl text-3xl text-[#0F0E10] sm:text-4xl lg:text-[3.15rem] lg:leading-[1.08]"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                TCwenzhou builds AI systems, learning products, and game prototypes.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5C585E] sm:text-base">
                Start with Projects if you want the strongest case studies. Open Lab if you want to jump straight into a usable product. Games is where ongoing prototype evidence lives.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="rounded-full bg-[#0F0E10] px-5 py-3 text-sm font-medium text-[#F8F5EE] transition hover:bg-[#252227]"
                >
                  See Projects
                </Link>
                <Link
                  href="/lab"
                  className="rounded-full border border-[#D4BC8A] px-5 py-3 text-sm font-medium text-[#5C585E] transition hover:border-[#A88B55] hover:text-[#0F0E10]"
                >
                  Open Lab
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { label: 'Projects', value: 'Case Proof', note: 'Systems, flow design, and engineering tradeoffs' },
                { label: 'Lab', value: 'Product Proof', note: 'Vocabulary, review, grammar, and self-test' },
                { label: 'Games', value: 'Prototype Proof', note: 'Gameplay, AI, and development logs' },
              ].map((item) => (
                <div key={item.label} className="rounded-[22px] border border-[#EEE3D0] bg-[#FCFBF8] p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#A88B55]">{item.label}</p>
                  <p className="mt-2 text-xl text-[#0F0E10]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5C585E]">{item.note}</p>
                </div>
              ))}
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
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#A88B55]">{item.eyebrow}</p>
              <h3 className="mt-3 text-2xl text-[#0F0E10]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5C585E]">{item.description}</p>
              <span className="mt-5 inline-flex text-sm font-medium text-[#0F0E10]">Follow this lane</span>
            </Link>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.35fr,0.95fr]">
          <article className="rounded-[28px] border border-[#E8DCC4] bg-white/85 p-6 shadow-[0_16px_48px_rgba(15,14,16,0.06)] backdrop-blur sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#A88B55]">Featured Project</p>
                <h3 className="mt-3 text-3xl text-[#0F0E10] sm:text-4xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                  {featuredProject.title}
                </h3>
              </div>
              <span className="rounded-full border border-[#E8DCC4] bg-[#F3EEE4] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#5C585E]">
                {projectStatusLabelMap[featuredProject.status]} · {featuredProject.year}
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-base leading-8 text-[#5C585E]">{featuredProject.headline}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <InfoBox label="Role" text={featuredProject.role} />
              <InfoBox label="Problem" text="Decision-making and training under incomplete information." />
              <InfoBox label="Outcome" text={featuredProject.outcomes[0]} />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredProject.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#E8DCC4] bg-[#F3EEE4] px-3 py-1 text-xs text-[#5C585E]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href={`/projects/${featuredProject.slug}`} className="font-medium text-[#0F0E10] transition hover:text-[#A88B55]">
                Read case study
              </Link>
              {featuredProject.github && (
                <a href={featuredProject.github} target="_blank" rel="noopener noreferrer" className="font-medium text-[#5C585E] transition hover:text-[#0F0E10]">
                  GitHub
                </a>
              )}
            </div>
          </article>

          <article className="rounded-[28px] border border-[#E8DCC4] bg-[#FCFBF8] p-6 shadow-[0_16px_48px_rgba(15,14,16,0.05)] sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#A88B55]">Lab Preview</p>
            <h3 className="mt-3 text-3xl text-[#0F0E10]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              A usable Japanese learning lab
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#5C585E]">
              The first screen should feel like a real product: search, a complete word card, review entry points, and a clear learning loop.
            </p>
            <div className="mt-6 grid gap-3">
              {labHighlights.map((item) => (
                <div key={item.title} className="rounded-[20px] border border-[#EEE3D0] bg-white/70 p-4">
                  <p className="text-sm font-medium text-[#0F0E10]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#5C585E]">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/lab" className="font-medium text-[#0F0E10] transition hover:text-[#A88B55]">
                Open Lab
              </Link>
              <Link href="/contact" className="font-medium text-[#5C585E] transition hover:text-[#0F0E10]">
                Talk learning products
              </Link>
            </div>
          </article>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.05fr,0.95fr]">
          <article className="rounded-[28px] border border-[#E8DCC4] bg-white/85 p-6 shadow-[0_16px_48px_rgba(15,14,16,0.05)] sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#A88B55]">Games In Progress</p>
            <h3 className="mt-3 text-3xl text-[#0F0E10]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              {leadGameProof.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#5C585E]">{leadGameProof.description}</p>
            <div className="mt-5 rounded-[22px] border border-[#EEE3D0] bg-[#FCFBF8] p-5">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-[#A88B55]">
                <span>{leadGameProof.stage}</span>
                <span>{leadGameProof.engine}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#0F0E10]">{leadGameProof.snapshot}</p>
              <div className="mt-4 space-y-2">
                {leadGameProof.evidence.map((item) => (
                  <p key={item} className="text-sm leading-6 text-[#5C585E]">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#5C585E]">Next step: {leadGameProof.nextMilestone}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <Link href="/games" className="font-medium text-[#0F0E10] transition hover:text-[#A88B55]">
                View prototype log
              </Link>
              <a href="https://github.com/TCwenzhou1" target="_blank" rel="noopener noreferrer" className="font-medium text-[#5C585E] transition hover:text-[#0F0E10]">
                GitHub updates
              </a>
            </div>
          </article>

          <article className="rounded-[28px] border border-[#E8DCC4] bg-[#FCFBF8] p-6 shadow-[0_16px_48px_rgba(15,14,16,0.05)] sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#A88B55]">Start Here</p>
            <h3 className="mt-3 text-3xl text-[#0F0E10]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Quick routes for first-time visitors
            </h3>
            <div className="mt-6 space-y-3">
              {quickDestinations.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-[20px] border border-[#EEE3D0] bg-white/70 p-4 transition hover:border-[#D4BC8A] hover:bg-white"
                >
                  <p className="text-sm font-medium text-[#0F0E10]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#5C585E]">{item.description}</p>
                  <span className="mt-3 inline-flex text-sm font-medium text-[#A88B55]">{item.cta}</span>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function InfoBox({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[22px] border border-[#EEE3D0] bg-[#FCFBF8] p-5">
      <p className="text-[11px] uppercase tracking-[0.24em] text-[#A88B55]">{label}</p>
      <p className="mt-3 text-sm leading-7 text-[#0F0E10]">{text}</p>
    </div>
  )
}
