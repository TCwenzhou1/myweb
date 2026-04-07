import HomeHeroClean from '@/components/HomeHeroClean'
import HomeOverviewV2 from '@/components/HomeOverviewV2'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'TCwenzhou',
      url: 'https://www.tcwenzhou.site',
      email: 'mailto:3240468691@qq.com',
      sameAs: ['https://github.com/TCwenzhou1'],
      knowsAbout: ['AI Engineering', 'Reinforcement Learning', 'Learning Product Design', 'Game Prototyping'],
      jobTitle: 'Computer Engineering Student',
    },
    {
      '@type': 'WebSite',
      name: 'TCwenzhou',
      url: 'https://www.tcwenzhou.site',
      description: 'Project cases, a Japanese learning lab, game prototypes, and an open working archive.',
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeHeroClean />
      <HomeOverviewV2 />
    </>
  )
}