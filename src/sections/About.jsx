import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { site } from '../data/site'
import { gsap, useGSAP, SplitText } from '../lib/motion'
import './About.css'

const ENJOY = [
  'Building interfaces with React',
  'Creating responsive websites that feel right on any screen',
  'Improving user experiences, one small detail at a time',
  'Learning new front-end technologies',
  'Turning design concepts into functional websites',
]

export default function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      // the statement "lights up" word by word as it passes through the viewport
      const split = SplitText.create('.about__statement', { type: 'words', wordsClass: 'about__word' })
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: '.about__statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )
      gsap.from('.about__enjoy li', {
        x: -30,
        opacity: 0,
        stagger: 0.07,
        duration: 1,
        scrollTrigger: { trigger: '.about__enjoy', start: 'top 85%', once: true },
      })
      gsap.from('.about__card', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        scrollTrigger: { trigger: '.about__cards', start: 'top 88%', once: true },
      })
      return () => split.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className="about wrap" aria-labelledby="about-title">
      <p className="eyebrow" id="about-title">
        About
      </p>
      <p className="about__statement">
        I’m {site.name}, a junior front-end developer. I turn designs into fast, responsive React interfaces, and I care
        about the small things most people skip: the hover state, the empty state, the error message that actually
        helps.
      </p>

      <div className="about__grid">
        <div className="about__enjoy">
          <p className="eyebrow">What I enjoy</p>
          <ul>
            {ENJOY.map((item, i) => (
              <li key={item}>
                <span className="about__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="about__t">{item}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>

        <div className="about__cards">
          <div className="about__card about__card--accent">
            <p className="eyebrow">Currently learning</p>
            <p className="about__big">{site.currentlyLearning}</p>
          </div>
          <div className="about__card">
            <p className="eyebrow">Honestly</p>
            <p>
              I’m early in my career. Every project on this page was planned, designed and built by me, and each one
              taught me something new. I’m looking for freelance work where I can keep doing that for real clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
