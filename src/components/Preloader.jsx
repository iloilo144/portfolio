import { useRef, useState } from 'react'
import { gsap, useGSAP, finishIntro, prefersReducedMotion } from '../lib/motion'
import { site } from '../data/site'
import './Preloader.css'

/** A short intro: a counter runs to 100, then the curtain lifts. Plays once per browser session. */
export default function Preloader() {
  const root = useRef(null)
  const [show] = useState(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('intro-seen') === '1'
      sessionStorage.setItem('intro-seen', '1')
    } catch {
      /* storage blocked: just play it */
    }
    const skip = seen || prefersReducedMotion()
    if (skip) finishIntro()
    return !skip
  })
  const [gone, setGone] = useState(!show)

  useGSAP(
    () => {
      if (!show) return
      const counter = { value: 0 }
      const tl = gsap.timeline({
        onComplete: () => setGone(true),
      })
      tl.from('.preloader__name span', { yPercent: 110, duration: 0.9, stagger: 0.06 })
        .to(
          counter,
          {
            value: 100,
            duration: 1.3,
            ease: 'power2.inOut',
            onUpdate: () => {
              const el = root.current?.querySelector('.preloader__count')
              if (el) el.textContent = String(Math.round(counter.value)).padStart(3, '0')
            },
          },
          0.1,
        )
        .to('.preloader__bar span', { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0.1)
        .to('.preloader__inner', { yPercent: -30, opacity: 0, duration: 0.6, ease: 'power3.in' }, '+=0.1')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=0.25')
        .call(finishIntro, null, '-=0.55')
    },
    { scope: root },
  )

  if (gone) return null

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <p className="preloader__name">
          {site.name.split(' ').map((w) => (
            <span key={w}>{w}</span>
          ))}
        </p>
        <div className="preloader__foot">
          <span>Portfolio · {new Date().getFullYear()}</span>
          <span className="preloader__count">000</span>
        </div>
        <div className="preloader__bar">
          <span />
        </div>
      </div>
    </div>
  )
}
