import HeroSection from '@/components/HeroCards'
import HomeOverview from '@/components/HomeOverview'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'TCwenzhou',
      url: 'https://www.tcwenzhou.site',
      email: 'mailto:hello@tcwenzhou.site',
      sameAs: ['https://github.com/TCwenzhou1'],
      knowsAbout: ['AI Engineering', 'Reinforcement Learning', 'Game Development', 'Web Engineering'],
      jobTitle: 'Computer Engineering Student',
    },
    {
      '@type': 'WebSite',
      name: 'TCwenzhou',
      url: 'https://www.tcwenzhou.site',
      description: 'TCwenzhou 的个人主页，记录项目、实验和长期成长。',
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
      <HeroSection />
      <HomeOverview />
    </>
  )
}
