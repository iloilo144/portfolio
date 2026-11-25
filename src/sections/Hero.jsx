import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { gsap, useGSAP, onIntroDone, prefersReducedMotion } from '../lib/motion'
import Magnetic from '../components/Magnetic'
import Shot from '../components/Shot'
import './Hero.css'

/**
 * Splits text into letters so each one can swell (variable font weight) as the mouse passes over it.
 * Letters are grouped into unbreakable words, so a line can only ever wrap between words,
 * never in the middle of one.
 */
function Letters({ children }) {
  const words = children.split(' ')
  return words.map((word, w) => (
    <span key={w}>
      <span className="hero__word" aria-hidden="true">
        {word.split('').map((ch, i) => (
          <span key={i} className="hero__char">
            {ch}
          </span>
        ))}
      </span>
      {w < words.length - 1 && ' '}
    </span>
  ))
}

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    (context, contextSafe) => {
      // once the lines have slid in, drop their clipping masks so swelling letters are never cut off
      const ready = () => root.current?.querySelector('.hero__title')?.classList.add('is-ready')
      if (prefersReducedMotion()) {
        ready()
        gsap.from('.hero__line > span, .hero__fade, .hero__pill', { autoAlpha: 0, duration: 1.6, stagger: 0.12, ease: 'power2.out' })
        return
      }
      gsap.set('.hero__line > span, .hero__fade', { autoAlpha: 0 })
      // contextSafe keeps these tweens in the hero's own context, so nothing else can revert them
      onIntroDone(contextSafe(() => {
        const tl = gsap.timeline({ onComplete: ready })
        tl.set('.hero__line > span', { autoAlpha: 1 })
          .from('.hero__line > span', { yPercent: 115, rotate: 2, duration: 1.4, stagger: 0.1, ease: 'expo.out' })
          .from('.hero__pill', { scale: 0, duration: 1.2, ease: 'elastic.out(1, 0.6)' }, 0.35)
          .to('.hero__fade', { autoAlpha: 1, duration: 1, stagger: 0.08, ease: 'power2.out' }, 0.5)
          .from('.hero__fade', { y: 24, duration: 1.2, stagger: 0.08 }, 0.5)
      }))

      // as you scroll away, the headline drifts up and dims, like a title card fading out
      gsap.to('.hero__title', {
        yPercent: -18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__badge-ring', { rotate: 360, duration: 18, ease: 'none', repeat: -1 })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__meta hero__fade">
        <span className="eyebrow">
          {site.role} · {site.speciality}
        </span>
        <span className="hero__where">Based in {site.location}</span>
      </div>

      <h1 id="hero-title" className="hero__title wrap" aria-label="Building thoughtful digital experiences, one interface at a time.">
        <span className="hero__line">
          <span>
            <Letters>Building thoughtful</Letters>
          </span>
        </span>
        <span className="hero__line">
          <span>
            <Letters>digital</Letters>{' '}
            <span className="hero__pill" aria-hidden="true">
              {projects.map((p, i) => (
                <Shot key={p.slug} src={p.shots.cover} project={p} alt="" eager className={`hero__pill-img hero__pill-img--${i}`} />
              ))}
            </span>{' '}
            <Letters>experiences,</Letters>
          </span>
        </span>
        <span className="hero__line hero__line--accent">
          <span>
            <Letters>one interface at a time.</Letters>
          </span>
        </span>
      </h1>

      <div className="wrap hero__foot">
        <p className="hero__intro hero__fade">
          I’m a Junior Front-End Developer specialising in React. I build responsive, interactive, and carefully
          crafted web experiences with a focus on usability and design.
        </p>
        <div className="hero__actions hero__fade">
          <Magnetic>
            <a href="#work" className="btn btn--solid" data-cursor="link">
              Explore selected work <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <Link to="/#contact" className="btn">
              Get in touch <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Magnetic>
        </div>

        <a href="#work" className="hero__badge hero__fade" aria-label="Scroll to selected work">
          <svg className="hero__badge-ring" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="ring" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
            </defs>
            <text>
              <textPath href="#ring" textLength="290" lengthAdjust="spacing">
                Scroll to explore · Selected work ·
              </textPath>
            </text>
          </svg>
          <ArrowDownRight size={22} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
