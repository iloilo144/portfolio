import { useEffect } from 'react'
import { site } from '../data/site'
import Hero from '../sections/Hero'
import Work from '../sections/Work'
import About from '../sections/About'
import Toolbox from '../sections/Toolbox'
import Contact from '../sections/Contact'
import Marquee from '../components/Marquee'

const STACK = ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive design', 'Git & GitHub']

export default function Home() {
  useEffect(() => {
    document.title = `${site.name} | ${site.role}`
  }, [])

  return (
    <>
      <Hero />
      <Marquee items={STACK} />
      <Work />
      <About />
      <Toolbox />
      <Contact />
    </>
  )
}
