import Hero from '@/components/Hero'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Marquee from '@/components/Marquee'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import SectionDivider from '@/components/SectionDivider'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Marquee />
      <SectionDivider color="emerald" />
      <Skills />
      <SectionDivider color="amber" />
      <Experience />
      <SectionDivider color="coral" />
      <Projects />
      <SectionDivider color="emerald" />
      <Education />
      <SectionDivider color="amber" />
      <Contact />
    </>
  )
}
