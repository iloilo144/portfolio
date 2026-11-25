import { useState } from 'react'

/**
 * A screenshot of a real project. If the image hasn't been captured yet
 * (see scripts/capture-screenshots.mjs) it falls back to a typographic placeholder
 * in the project's own colours. Stock photos are never used.
 */
export default function Shot({ src, project, alt, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  const { bg, ink, accent } = project.theme

  if (failed) {
    return (
      <div className={`shot-fallback ${className}`} style={{ background: bg, color: ink }} role="img" aria-label={alt}>
        <span style={{ color: accent }}>{project.number}</span>
        <strong>{project.name}</strong>
        <small>Screenshot pending</small>
      </div>
    )
  }
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
