import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { site } from '../data/site'
import { useLenis, scrollToTarget } from '../lib/SmoothScroll'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import Magnetic from './Magnetic'
import RollText from './RollText'
import './Footer.css'

function useLocalTime() {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 20000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Footer() {
  const lenis = useLenis()
  const time = useLocalTime()
  const root = useRef(null)

  // the oversized name rises out of the bottom edge as you reach the end of the page
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.footer__giant span', {
        yPercent: 100,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'bottom bottom', scrub: 1 },
      })
    },
    { scope: root },
  )

  return (
    <footer ref={root} className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <p className="footer__sign">
            Designed and built by hand.
            <br />
            <span>Thanks for scrolling this far.</span>
          </p>
          <nav aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <Link to="/"><RollText>Home</RollText></Link>
            <Link to="/#work"><RollText>Work</RollText></Link>
            <Link to="/#about"><RollText>About</RollText></Link>
            <Link to="/#contact"><RollText>Contact</RollText></Link>
          </nav>
          <div>
            <p className="eyebrow">Elsewhere</p>
            <a href={site.github} target="_blank" rel="noreferrer"><RollText>GitHub</RollText></a>
            <a href={`mailto:${site.email}`}><RollText>Email</RollText></a>
            {site.socials
              .filter((s) => s.url)
              .map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                  <RollText>{s.label}</RollText>
                </a>
              ))}
          </div>
          <div className="footer__top">
            <Magnetic>
              <button className="footer__up" onClick={() => scrollToTarget(lenis, 0, { duration: 2 })} aria-label="Back to top">
                <ArrowUp size={20} />
              </button>
            </Magnetic>
          </div>
        </div>

        <p className="footer__giant" aria-hidden="true">
          {site.name.split('').map((c, i) => (
            <span key={i}>{c === ' ' ? ' ' : c}</span>
          ))}
        </p>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>
            {site.location} · {time}
          </span>
        </div>
      </div>
    </footer>
  )
}
