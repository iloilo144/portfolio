# Portfolio

The portfolio website of a junior front-end developer specialising in React. It has a dark, cinematic
design with smooth scrolling and scroll-driven motion, four case studies, a skills toolbox and a working
contact form.

**Motion:** GSAP (ScrollTrigger + SplitText) and Lenis smooth scrolling. There is a one-time intro counter,
masked line reveals, a pinned sideways project strip, a velocity-reactive marquee, magnetic buttons, a custom
cursor and page-to-page curtain wipes. All of it is skipped for visitors who prefer reduced motion.

> Live site: _add your Vercel URL here_

## Edit your details

| File | What to change |
|---|---|
| `src/data/site.js` | Name, initials, city, email, GitHub, optional socials, availability, "currently learning", optional Formspree endpoint |
| `src/data/projects.js` | `liveUrl` and `repoUrl` for each project. Text for the case studies also lives here. |
| `src/data/skills.js` | The toolbox table |
| `index.html` | Page `<title>` and meta description |

Empty project links render as "coming soon" instead of dead buttons. In development, the
live link points at each project's local dev server.

## Sections

- **Navigation**: name, Home / Work / About / Contact, an availability indicator and an
  animated mobile menu
- **Hero**: oversized headline with a live screenshot "window" cycling through the projects, intro, magnetic buttons and a rotating scroll badge
- **Selected work**: a pinned horizontal strip on desktop (a vertical stack on phones), each project framed in its own colours
- **Case study pages** (`/work/:slug`): overview, problem, approach, features, technical
  notes, screenshots (desktop + mobile) and links to the next project
- **About** (a statement that lights up word by word as you scroll), the **Toolbox** (what each skill is used for,
  with links to where it appears), **How I work**, and **Contact** (floating-label form with validation, mailto or
  Formspree delivery, copy-email button)
- **Footer** with navigation, GitHub, email, year and a sign-off

## Screenshots

The images in `public/work/` are real captures of the projects, made with
`node scripts/capture-screenshots.mjs` from the repository root (see the root README).
If an image is missing, a typographic placeholder in the project's own colours is shown
instead. Stock photos are never used as a substitute.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & deploy

```bash
npm run build      # outputs to dist/
npm run preview
```

Push to GitHub and import on [Vercel](https://vercel.com). `vercel.json` rewrites routes to
`index.html`, so `/work/proofboard` survives a refresh.

## Contact form

Without configuration, submitting opens the visitor's email app with the message filled in.
To receive messages directly, create a free form on [Formspree](https://formspree.io) and put
its endpoint in `formEndpoint` in `src/data/site.js`.
