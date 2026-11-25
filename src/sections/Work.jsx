import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import Reveal from '../components/Reveal'
import Shot from '../components/Shot'
import ProjectLinks from '../components/ProjectLinks'
import Magnetic from '../components/Magnetic'
import './Work.css'

/** Tilts the framed screenshot toward the pointer and moves a soft sheen with it. */
function tilt(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.classList.add('is-tilting')
  el.style.setProperty('--ry', `${(x - 0.5) * 7}deg`)
  el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`)
  el.style.setProperty('--sx', `${x * 100}%`)
  el.style.setProperty('--sy', `${y * 100}%`)
}

function untilt(e) {
  const el = e.currentTarget
  el.classList.remove('is-tilting')
  el.style.setProperty('--ry', '0deg')
  el.style.setProperty('--rx', '0deg')
}

function Card({ project }) {
  const { bg, accent } = project.theme
  return (
    <article className="wcard" style={{ '--card-bg': bg, '--card-accent': accent }} aria-labelledby={`w-${project.slug}`}>
      <Link
        to={`/work/${project.slug}`}
        className="wcard__media"
        onPointerMove={tilt}
        onPointerLeave={untilt}
        data-cursor="view"
        data-cursor-label="View case"
        tabIndex={-1}
        aria-hidden="true"
      >
        <span className="wcard__frame">
          <Shot src={project.shots.cover} project={project} alt="" className="wcard__img" />
        </span>
      </Link>
      <div className="wcard__info">
        <span className="wcard__num">{project.number}</span>
        <div>
          <h3 id={`w-${project.slug}`}>
            <Link to={`/work/${project.slug}`}>{project.name}</Link>
          </h3>
          <p className="wcard__tagline">{project.tagline}</p>
        </div>
        <div className="wcard__side">
          <p className="wcard__cat">
            {project.category} · {project.year}
          </p>
          <ul className="wcard__tags" aria-label="Technologies">
            {project.tech.slice(0, 4).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <ProjectLinks project={project} />
    </article>
  )
}

export default function Work() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // desktop: the track is pinned and slides sideways as you scroll down
      const calm = prefersReducedMotion()
      // calm mode: cards simply fade in as they arrive
      if (calm) {
        gsap.utils.toArray('.wcard').forEach((card) => {
          gsap.from(card, { opacity: 0, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } })
        })
        return
      }
      mm.add('(min-width: 1024px)', () => {
        const track = root.current.querySelector('.work__track')
        const distance = () => track.scrollWidth - window.innerWidth
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.work__pin',
            start: 'center center',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        // each screenshot drifts inside its frame against the slide: a cheap, convincing parallax
        gsap.utils.toArray('.wcard__img').forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: img, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
            },
          )
        })
        gsap.to('.work__progress span', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.work__pin', start: 'center center', end: () => `+=${distance()}`, scrub: true },
        })
      })
      // smaller screens: cards rise in one by one
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray('.wcard').forEach((card) => {
          gsap.from(card, { y: 80, opacity: 0, duration: 1.2, scrollTrigger: { trigger: card, start: 'top 90%', once: true } })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="work" className="work" aria-labelledby="work-title">
      <header className="wrap work__head">
        <p className="eyebrow">Selected work</p>
        <Reveal as="h2" id="work-title" className="work__title">
          Four projects, four different problems.
        </Reveal>
        <Reveal as="p" className="work__intro" delay={0.15}>
          Each one is a complete React application with its own identity, built from an empty folder to a deployable
          site.
        </Reveal>
      </header>

      <div className="work__pin">
        <div className="work__track">
          {projects.map((p) => (
            <Card key={p.slug} project={p} />
          ))}
          <div className="wcard wcard--end">
            <p className="eyebrow">Next</p>
            <p className="wcard__endtitle">Your project could be number 05.</p>
            <Magnetic>
              <Link to="/#contact" className="btn btn--solid">
                Start a conversation <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </Magnetic>
          </div>
        </div>
        <div className="work__progress wrap" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
