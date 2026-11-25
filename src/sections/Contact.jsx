import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { site } from '../data/site'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import RollText from '../components/RollText'
import './Contact.css'

const EMPTY = { name: '', email: '', subject: '', message: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email so I can reply.'
  if (v.subject.trim().length < 3) e.subject = 'Add a short subject.'
  if (v.message.trim().length < 20) e.message = `Tell me a little more (at least 20 characters, ${v.message.trim().length} so far).`
  return e
}

/**
 * Honest delivery:
 * - If site.formEndpoint is set (e.g. Formspree), the message is POSTed there.
 * - Otherwise the visitor's own email app opens with the message pre-filled (mailto).
 */
export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [copied, setCopied] = useState(false)

  const change = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    if (!site.formEndpoint) {
      const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus('sent')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: the address is visible anyway */
    }
  }

  const field = (name, label, props = {}) => {
    const Tag = props.rows ? 'textarea' : 'input'
    return (
      <div className={`cfield ${errors[name] ? 'has-error' : ''}`}>
        <Tag
          id={`c-${name}`}
          name={name}
          value={values[name]}
          onChange={change}
          placeholder=" "
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `c-${name}-err` : undefined}
          {...props}
        />
        <label htmlFor={`c-${name}`}>{label}</label>
        <span className="cfield__line" aria-hidden="true" />
        {errors[name] && (
          <span className="cfield__error" id={`c-${name}-err`}>
            {errors[name]}
          </span>
        )}
      </div>
    )
  }

  return (
    <section id="contact" className="contact wrap" aria-labelledby="contact-title">
      <p className="eyebrow">Contact</p>
      <Reveal as="h2" id="contact-title" className="contact__title">
        Have a project in mind? <span>Let’s talk.</span>
      </Reveal>

      <div className="contact__grid">
        <div className="contact__info">
          <Magnetic strength={0.3}>
            <a href={`mailto:${site.email}`} className="contact__orb" data-cursor="hide">
              <span>Write to me</span>
              <ArrowUpRight size={26} aria-hidden="true" />
            </a>
          </Magnetic>
          <p>
            Available for landing pages, small business websites, React front-ends and turning Figma designs into
            responsive code. I usually reply within a day.
          </p>
          <div className="contact__email">
            <a href={`mailto:${site.email}`}>
              <RollText>{site.email}</RollText>
            </a>
            <button type="button" onClick={copyEmail} aria-label="Copy email address">
              {copied ? <Check size={15} /> : <Copy size={15} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <a className="plinks__link" href={site.github} target="_blank" rel="noreferrer">
            <RollText>GitHub · {site.githubHandle}</RollText> <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        {status === 'sent' ? (
          <div className="contact__state contact__state--ok" role="status">
            <Check size={26} aria-hidden="true" />
            <h3>Thank you. Your message is on its way.</h3>
            <p>I’ll get back to you at the address you gave, usually within a day.</p>
            <button className="btn" onClick={() => setStatus('idle')}>
              Write another message
            </button>
          </div>
        ) : (
          <form className="cform" onSubmit={submit} noValidate>
            <div className="cform__row">
              {field('name', 'Your name', { autoComplete: 'name' })}
              {field('email', 'Email address', { type: 'email', autoComplete: 'email' })}
            </div>
            {field('subject', 'What is it about?')}
            {field('message', 'Tell me about your project', { rows: 4 })}

            {status === 'mailto' && (
              <p className="contact__state" role="status">
                Your email app should have opened with the message ready to send. If nothing happened, email me
                directly at <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            )}
            {status === 'error' && (
              <p className="contact__state contact__state--error" role="alert">
                Sorry, the message couldn’t be sent. Please try again, or email me at{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            )}

            <div className="cform__foot">
              <Magnetic strength={0.2}>
                <button className="btn btn--solid" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </Magnetic>
              {!site.formEndpoint && <p className="cform__note">Opens your own email app. Nothing is stored here.</p>}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
