import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'

const LenisContext = createContext(null)

/** Smooth, inertia-based scrolling (Lenis) kept in sync with GSAP's ScrollTrigger. */
export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const instance = new Lenis({ lerp: 0.09, anchors: { offset: -20 } })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

/** Scroll to an element or position, smoothly when Lenis is running. */
export function scrollToTarget(lenis, target, options = {}) {
  if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.4, ...options })
  else if (typeof target === 'number') window.scrollTo(0, target)
  else (typeof target === 'string' ? document.querySelector(target) : target)?.scrollIntoView()
}
