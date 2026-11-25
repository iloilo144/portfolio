import { useEffect, useRef, useState } from 'react'
import { gsap, finePointer } from '../lib/motion'
import './Cursor.css'

/**
 * A soft follower cursor for mouse users only. Elements can ask for a state:
 *   data-cursor="view"  → grows into a labelled disc ("View")
 *   data-cursor="hide"  → disappears (e.g. over form fields)
 * Links and buttons make it shrink slightly.
 */
export default function Cursor() {
  const dot = useRef(null)
  const [enabled] = useState(() => finePointer())
  const [state, setState] = useState({ mode: 'default', label: '' })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const xTo = gsap.quickTo(dot.current, 'x', { duration: 0.45, ease: 'power3' })
    const yTo = gsap.quickTo(dot.current, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const target = e.target.closest?.('[data-cursor], a, button, input, textarea, label')
      if (!target) return setState((s) => (s.mode === 'default' ? s : { mode: 'default', label: '' }))
      const mode = target.dataset.cursor ?? (['INPUT', 'TEXTAREA'].includes(target.tagName) ? 'hide' : 'link')
      const label = target.dataset.cursorLabel ?? 'View'
      setState((s) => (s.mode === mode && s.label === label ? s : { mode, label }))
    }
    const leave = () => setState({ mode: 'hidden', label: '' })
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={dot} className={`cursor cursor--${state.mode}`} aria-hidden="true">
      <span className="cursor__label">{state.label}</span>
    </div>
  )
}
