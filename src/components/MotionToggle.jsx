import { motionPref, setMotionPref } from '../lib/motion'

/** Lets visitors choose the full cinematic motion or a calm version, whatever their system says. */
export default function MotionToggle({ className = '' }) {
  const full = motionPref() === 'full'
  return (
    <button
      type="button"
      className={`motion-toggle ${className}`}
      onClick={() => setMotionPref(full ? 'calm' : 'full')}
      aria-pressed={full}
      title={full ? 'Switch to calm mode (less movement)' : 'Switch to full motion'}
    >
      <span className="motion-toggle__bars" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      {full ? 'Motion on' : 'Calm mode'}
    </button>
  )
}
