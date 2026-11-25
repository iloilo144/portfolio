import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Magnetic from '../components/Magnetic'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found'
  }, [])
  return (
    <section className="wrap" style={{ minHeight: '80svh', display: 'grid', alignContent: 'center', gap: '2rem', paddingTop: '7rem' }}>
      <p className="eyebrow">Error 404</p>
      <h1 style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}>
        Lost <span style={{ color: 'var(--accent)', fontWeight: 300 }}>in space.</span>
      </h1>
      <p style={{ color: 'var(--muted)', maxWidth: '30rem' }}>
        This page doesn’t exist, or it moved. The work is still right where you left it.
      </p>
      <div>
        <Magnetic>
          <Link to="/" className="btn btn--solid">
            <ArrowLeft size={18} aria-hidden="true" /> Back home
          </Link>
        </Magnetic>
      </div>
    </section>
  )
}
