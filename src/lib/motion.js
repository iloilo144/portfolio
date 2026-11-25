import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

gsap.defaults({ ease: 'expo.out', duration: 1.1 })

/**
 * Motion preference: "full" (cinematic) or "calm" (fades and hovers only, nothing large moves).
 * It follows the operating system's "reduce motion" setting until the visitor picks one
 * with the Motion toggle; that choice is remembered.
 * index.html applies it to <html data-motion> before the first paint.
 */
const KEY = 'motion-pref'

export function motionPref() {
  if (typeof window === 'undefined') return 'full'
  try {
    const saved = window.localStorage.getItem(KEY)
    if (saved === 'full' || saved === 'calm') return saved
  } catch {
    /* storage blocked: fall back to the OS setting */
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'calm' : 'full'
}

export function setMotionPref(value) {
  try {
    window.localStorage.setItem(KEY, value)
  } catch {
    /* ignore */
  }
  // every scroll animation is built around the preference, so a clean reload is the honest way to switch
  window.location.reload()
}

/** true in calm mode: skip large movement (pinning, parallax, smooth scroll, big slides) */
export const prefersReducedMotion = () => motionPref() === 'calm'

export const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

/**
 * The intro curtain plays once per visit. Hero animations wait for it,
 * so everything feels like one continuous shot.
 */
let introDone = false
const waiting = []
export function onIntroDone(cb) {
  if (introDone) cb()
  else waiting.push(cb)
}
export function finishIntro() {
  introDone = true
  waiting.splice(0).forEach((cb) => cb())
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
