import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { site } from '../data/site'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import Reveal from '../components/Reveal'
import Shot from '../components/Shot'
import ProjectLinks from '../components/ProjectLinks'
import RollText from '../components/RollText'
import NotFound from './NotFound'
import './CaseStudy.css'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  const root = useRef(null)

  useEffect(() => {
    document.title = project ? `${project.name}, case study | ${site.name}` : `Not found | ${site.name}`
  }, [project])

  useGSAP(
    () => {
      if (!project) return
      if (prefersReducedMotion()) {
        // calm mode: sections simply fade in
        gsap.utils.toArray('.case__fade, .case__features li').forEach((el) => {
          gsap.from(el, { opacity: 0, duration: 1.3, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
        })
        return
      }
      // the cover grows from an inset card to full width as it scrolls into place
      gsap.fromTo(
        '.case__stage',
        { clipPath: 'inset(0 6% 0 6% round 28px)' },
        {
          clipPath: 'inset(0 0% 0 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: '.case__stage', start: 'top 85%', end: 'top 15%', scrub: true },
        },
      )
      gsap.fromTo(
        '.case__cover',
        { yPercent: 8 },
        { yPercent: -4, ease: 'none', scrollTrigger: { trigger: '.case__stage', start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      gsap.from('.case__meta > div, .case__head .plinks', { y: 30, opacity: 0, stagger: 0.07, duration: 1, delay: 0.3 })
      gsap.utils.toArray('.case__fade').forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1.2, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
      gsap.from('.case__features li', {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        scrollTrigger: { trigger: '.case__features ol', start: 'top 85%', once: true },
      })
    },
    { scope: root, dependencies: [slug], revertOnUpdate: true },
  )

  if (!project) return <NotFound />

  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const { bg, accent } = project.theme

  return (
    <article ref={root} key={slug} className="case" style={{ '--case-bg': bg, '--case-accent': accent }}>
      <header className="case__head wrap">
        <Link to="/#work" className="case__back">
          <ArrowLeft size={16} aria-hidden="true" /> <RollText>All work</RollText>
        </Link>
        <p className="eyebrow">
          {project.number} · {project.category}
        </p>
        <Reveal as="h1" on="intro" className="case__title">
          {project.name}
        </Reveal>
        <Reveal as="p" on="intro" delay={0.15} className="case__tagline">
          {project.tagline}
        </Reveal>

        <dl className="case__meta">
          <div>
            <dt>Role</dt>
            <dd>Design &amp; front-end development</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>Personal project</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.tech.join(', ')}</dd>
          </div>
        </dl>
        <ProjectLinks project={project} />
      </header>

      <div className="case__stage">
        <div className="case__cover">
          <Shot src={project.shots.cover} project={project} alt={`${project.name}: main screen`} eager />
        </div>
      </div>

      <section className="case__story wrap">
        <p className="eyebrow case__sticky">The story</p>
        <div className="case__blocks">
          <div className="case__block">
            <h2>Overview</h2>
            <Reveal as="p" className="case__lead">
              {project.description}
            </Reveal>
          </div>
          <div className="case__block case__fade">
            <h2>The problem</h2>
            <p>{project.problem}</p>
          </div>
          <div className="case__block case__fade">
            <h2>The approach</h2>
            <p>{project.approach}</p>
          </div>
        </div>
      </section>

      <section className="case__gallery wrap" aria-label="More screens">
        <figure className="case__fade" style={{ '--frame': bg }}>
          <Shot src={project.shots.second} project={project} alt={`${project.name}: second screen`} />
        </figure>
        <figure className="case__phone case__fade">
          <Shot src={project.shots.mobile} project={project} alt={`${project.name} on a phone`} />
          <figcaption>Mobile · 390 px</figcaption>
        </figure>
      </section>

      <section className="case__features wrap" aria-labelledby="features-title">
        <Reveal as="h2" id="features-title">
          Main features
        </Reveal>
        <ol>
          {project.features.map((f, i) => (
            <li key={f}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {f}
            </li>
          ))}
        </ol>
      </section>

      <section className="case__tech wrap">
        <figure className="case__fade">
          <Shot src={project.shots.third} project={project} alt={`${project.name}: another view`} />
        </figure>
        <div className="case__fade">
          <h2>Under the hood</h2>
          <p>{project.notes}</p>
          <ul className="wcard__tags case__chips" aria-label="Technologies used">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </div>
      </section>

      <nav className="case__next" aria-label="Next project">
        <Link to={`/work/${next.slug}`} className="wrap" data-cursor="view" data-cursor-label="Next">
          <span className="eyebrow">Next project · {next.number}</span>
          <span className="case__next-name">
            {next.name}
            <ArrowUpRight aria-hidden="true" />
          </span>
          <span className="case__next-peek" aria-hidden="true">
            <Shot src={next.shots.cover} project={next} alt="" />
          </span>
        </Link>
      </nav>
    </article>
  )
}
