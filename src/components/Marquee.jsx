import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import './Marquee.css'

/**
 * An endless strip of words. It speeds up with scroll velocity and flips
 * direction when you scroll back up, then settles to its resting speed.
 */
export default function Marquee({ items, speed = 38 }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const calm = prefersReducedMotion()
      const loop = gsap.to('.marquee__track', { xPercent: -50, duration: calm ? speed * 1.8 : speed, ease: 'none', repeat: -1 })
      if (calm) return
      let direction = 1
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate(self) {
          if (self.direction !== direction) direction = self.direction
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 6)
          gsap.to(loop, { timeScale: direction * boost, duration: 0.2, overwrite: true })
          gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: 'power2.out' })
        },
      })
    },
    { scope: root },
  )

  const row = items.map((item, i) => (
    <span key={i} className="marquee__item">
      {item}
      <span className="marquee__sep" aria-hidden="true" />
    </span>
  ))

  return (
    <div ref={root} className="marquee" aria-label={items.join(', ')} role="img">
      <div className="marquee__track" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  )
}
