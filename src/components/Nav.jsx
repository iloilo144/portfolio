import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import { useLenis } from '../lib/SmoothScroll'
import Magnetic from './Magnetic'
import RollText from './RollText'
import MotionToggle from './MotionToggle'
import './Nav.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/#work', label: 'Work' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => setOpen(false), [location])

  // hide while scrolling down, come back on the slightest scroll up
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400)
        last = y
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis])

  return (
    <header className={`nav ${hidden && !open ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__bar wrap">
        <Link to="/" className="nav__brand" aria-label={`${site.name}, home`}>
          <span className="nav__mark" aria-hidden="true" />
          <RollText>{site.name}</RollText>
        </Link>

        {/* one highlight glides to whichever link is hovered, instead of each link lighting up on its own */}
        <nav
          className="nav__links"
          aria-label="Main"
          onMouseLeave={(e) => e.currentTarget.style.setProperty('--hl-o', '0')}
        >
          <span className="nav__hl" aria-hidden="true" />
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onMouseEnter={(e) => {
                const nav = e.currentTarget.parentElement
                nav.style.setProperty('--hl-x', `${e.currentTarget.offsetLeft}px`)
                nav.style.setProperty('--hl-w', `${e.currentTarget.offsetWidth}px`)
                nav.style.setProperty('--hl-o', '1')
              }}
            >
              <RollText>{l.label}</RollText>
            </Link>
          ))}
        </nav>

        <div className="nav__end">
          <MotionToggle className="nav__motion" />
          {site.available && (
            <p className="nav__status">
              <span className="nav__pulse" aria-hidden="true" />
              Available for freelance work
            </p>
          )}
          <Magnetic strength={0.25}>
            <Link to="/#contact" className="btn btn--solid nav__cta">
              Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Magnetic>
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            <RollText>{open ? 'Close' : 'Menu'}</RollText>
          </button>
        </div>
      </div>

      <div id="menu" className="menu" inert={!open}>
        <nav className="menu__links wrap" aria-label="Menu">
          {LINKS.map((l, i) => (
            <Link key={l.to} to={l.to} style={{ '--i': i }}>
              <span className="menu__num">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="menu__foot wrap">
          {site.available && (
            <p className="nav__status">
              <span className="nav__pulse" aria-hidden="true" />
              Available for freelance work
            </p>
          )}
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <MotionToggle />
        </div>
      </div>
    </header>
  )
}
