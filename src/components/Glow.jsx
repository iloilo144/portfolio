import { useEffect, useRef, useState } from 'react'
import { finePointer } from '../lib/motion'

/** A soft light that trails the pointer across the page, eased so it feels like it has weight. */
export default function Glow() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!finePointer()) return
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.3 }
    const pos = { ...target }
    let raf
    const tick = () => {
      // ease toward the pointer every frame: smooth, slightly lagging, never jittery
      pos.x += (target.x - pos.x) * 0.08
      pos.y += (target.y - pos.y) * 0.08
      ref.current?.style.setProperty('--gx', `${pos.x}px`)
      ref.current?.style.setProperty('--gy', `${pos.y}px`)
      raf = requestAnimationFrame(tick)
    }
    const move = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      setOn(true)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className={`glow ${on ? 'is-on' : ''}`} aria-hidden="true" />
}
