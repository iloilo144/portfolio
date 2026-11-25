import { useRef } from 'react'
import { gsap, useGSAP, SplitText, onIntroDone, prefersReducedMotion } from '../lib/motion'

/**
 * Splits its text into masked lines that slide up into view.
 *   on="scroll" (default): when it scrolls into view
 *   on="intro":            right after the intro curtain lifts
 */
export default function Reveal({ as: Tag = 'div', children, on = 'scroll', delay = 0, stagger = 0.09, className = '', ...rest }) {
  const ref = useRef(null)

  useGSAP(
    (context, contextSafe) => {
      const el = ref.current
      if (prefersReducedMotion()) {
        gsap.from(el, {
          autoAlpha: 0,
          duration: 1.4,
          delay,
          ease: 'power2.out',
          scrollTrigger: on === 'scroll' ? { trigger: el, start: 'top 90%', once: true } : undefined,
        })
        return
      }
      gsap.set(el, { autoAlpha: 0 })
      let split
      const run = () => {
        split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 })
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.25,
              stagger,
              delay,
              ease: 'expo.out',
              scrollTrigger: on === 'scroll' ? { trigger: el, start: 'top 88%', once: true } : undefined,
            })
          },
        })
      }
      if (on === 'intro') onIntroDone(contextSafe(run))
      else run()
      return () => split?.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
