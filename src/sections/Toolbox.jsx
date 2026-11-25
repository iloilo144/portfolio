import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { skills } from '../data/skills'
import { projects } from '../data/projects'
import { gsap, useGSAP } from '../lib/motion'
import Reveal from '../components/Reveal'
import './Toolbox.css'

const STEPS = [
  {
    title: 'Understand',
    text: 'I start with who will use the site and what they need to do, before choosing colours or components.',
  },
  {
    title: 'Design in the browser',
    text: 'Layouts, type and motion are refined directly in code, so what you approve is what ships.',
  },
  {
    title: 'Ship and refine',
    text: 'Deployed early, tested on real phones, then polished: empty states, errors, keyboard and loading.',
  },
]

export default function Toolbox() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.tool', {
        y: 40,
        opacity: 0,
        stagger: 0.06,
        duration: 1,
        scrollTrigger: { trigger: '.tools', start: 'top 85%', once: true },
      })
      gsap.utils.toArray('.step').forEach((step) => {
        gsap.from(step.querySelector('.step__line'), {
          scaleX: 0,
          ease: 'none',
          scrollTrigger: { trigger: step, start: 'top 90%', end: 'top 55%', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="toolbox wrap" aria-labelledby="toolbox-title">
      <header className="toolbox__head">
        <p className="eyebrow">Toolbox</p>
        <Reveal as="h2" id="toolbox-title">
          What I work with, and how I use it.
        </Reveal>
      </header>

      <ul className="tools">
        {skills.map((s, i) => (
          <li key={s.name} className="tool">
            <span className="tool__n">{String(i + 1).padStart(2, '0')}</span>
            <span className="tool__name">{s.name}</span>
            <span className="tool__use">{s.use}</span>
            <span className="tool__seen">
              {s.seen.length ? (
                s.seen.map((n) => {
                  const p = projects.find((proj) => proj.number === n)
                  return (
                    <Link key={n} to={`/work/${p.slug}`} title={p.name} aria-label={`${p.name} case study`}>
                      {n}
                    </Link>
                  )
                })
              ) : (
                <a href={site.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="process">
        <p className="eyebrow">How I work</p>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__line" aria-hidden="true" />
              <span className="step__n">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
