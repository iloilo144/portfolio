import { ArrowUpRight, Clock } from 'lucide-react'
import RollText from './RollText'
import { motionPref } from '../lib/motion'

/**
 * Live + GitHub links for a project.
 * Empty URLs render an honest "coming soon" note instead of a dead button.
 * In development, the live link falls back to the project's local dev server.
 */
export default function ProjectLinks({ project, className = '' }) {
  const live = project.liveUrl || (import.meta.env.DEV ? project.localUrl : '')
  const isLocal = !project.liveUrl && Boolean(live)
  // carry the visitor's motion choice over to the project, which lives on another address
  const liveHref = live ? `${live}${live.includes('?') ? '&' : '?'}motion=${motionPref()}` : ''

  return (
    <div className={`plinks ${className}`}>
      {live ? (
        <a className="plinks__link" href={liveHref} target="_blank" rel="noreferrer" data-cursor="link">
          <RollText>View live website{isLocal ? ' (local)' : ''}</RollText>
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="visually-hidden">(opens in a new tab)</span>
        </a>
      ) : (
        <span className="pending">
          <Clock size={15} aria-hidden="true" /> Live site coming soon
        </span>
      )}
      {project.repoUrl ? (
        <a className="plinks__link" href={project.repoUrl} target="_blank" rel="noreferrer">
          <RollText>View GitHub repository</RollText>
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="visually-hidden">(opens in a new tab)</span>
        </a>
      ) : (
        <span className="pending">
          <Clock size={15} aria-hidden="true" /> Repository coming soon
        </span>
      )}
    </div>
  )
}
