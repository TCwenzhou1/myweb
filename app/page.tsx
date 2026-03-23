import Hero from '@/components/Hero'
import AboutMe from '@/components/AboutMe'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Growth from '@/components/Growth'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="space-y-20 md:space-y-32">
      <Hero />
      <AboutMe />
      <Projects />
      <Skills />
      <Growth />
      <Gallery />
      <Contact />
    </div>
  )
}