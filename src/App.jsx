import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useLenis, scrollToTarget } from './lib/SmoothScroll'
import { gsap, ScrollTrigger, prefersReducedMotion } from './lib/motion'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Glow from './components/Glow'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
import './App.css'

/** On every navigation: wipe the curtain away, then jump to the top or to the #section. */
function RouteEffects() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  const curtain = useRef(null)
  const first = useRef(true)
  const lastPath = useRef(pathname)

  useEffect(() => {
    const samePage = lastPath.current === pathname && !first.current
    lastPath.current = pathname

    const goToTarget = () => {
      if (hash) {
        const el = document.getElementById(hash.slice(1))
        if (el) scrollToTarget(lenis, el, { immediate: !samePage })
      } else if (!samePage) {
        scrollToTarget(lenis, 0, { immediate: true })
      }
      ScrollTrigger.refresh()
    }

    if (first.current || samePage || prefersReducedMotion()) {
      first.current = false
      requestAnimationFrame(goToTarget)
      return
    }
    // new page: the curtain starts closed and lifts away
    requestAnimationFrame(goToTarget)
    gsap.fromTo(
      curtain.current,
      { clipPath: 'inset(0% 0 0 0)' },
      { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut', delay: 0.05 },
    )
  }, [pathname, hash, lenis])

  return <div ref={curtain} className="curtain" aria-hidden="true" />
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Preloader />
      <Cursor />
      <Glow />
      <RouteEffects />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
