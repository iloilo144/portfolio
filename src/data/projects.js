/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECT LINKS. Update these after you deploy.
 *
 *  liveUrl  → your Vercel URL for the project, e.g. 'https://localloop-yourname.vercel.app'
 *  repoUrl  → the GitHub repository, e.g. 'https://github.com/your-username/localloop'
 *
 *  While a link is empty the site shows "coming soon" instead of a broken button.
 *  During local development (npm run dev) the live link points at the project's
 *  local dev server (localUrl) so you can click through everything.
 * ─────────────────────────────────────────────────────────────
 */
export const projects = [
  {
    slug: 'localloop',
    number: '01',
    name: 'LocalLoop',
    category: 'Community marketplace',
    year: '2026',
    liveUrl: 'https://localloop-gamma.vercel.app',
    repoUrl: 'https://github.com/iloilo144/localloop',
    localUrl: 'http://localhost:5174',
    tagline: 'A neighbourhood sharing platform for lending and borrowing everyday things.',
    description:
      'LocalLoop helps neighbours share drills, tents, cameras and kitchen gadgets instead of each buying their own. You can browse by shelf, search, save favourites, request to borrow with dates and a note, and list your own items.',
    problem:
      'Most households own tools and equipment they use a few times a year. Marketplace apps are built for selling, not lending, and they feel anonymous. The goal was to make borrowing from the person three doors down feel as easy and as trustworthy as buying something online.',
    approach:
      'I designed it like a friendly consumer app: bright and rounded, with springy motion everywhere. Cards reflow when you filter, the photo stack on the home page can be dragged and thrown, and a word in the headline keeps rotating. Everything is ordered by walking distance rather than price, and the borrow flow validates dates against each lender’s rules.',
    features: [
      'Search across items, lenders and streets, synced to the URL',
      'Category tabs, an "available now" filter and three sort orders',
      'Item pages with availability, deposit, condition and what’s included',
      'Borrow requests with date validation and a success state',
      'Favourites and requests saved in localStorage',
      'A "lend something" form with validation and a live preview card',
      'Spring animations: layout reflow, drag gestures, shared highlights, a 3D tilt preview',
      'Loading skeletons, empty states and a responsive mobile menu',
    ],
    tech: ['React', 'Motion', 'React Router', 'Context API', 'localStorage', 'CSS'],
    notes:
      'State lives in a small context provider backed by a reusable useLocalStorage hook. Filters are stored in URL search params, so any filtered view can be bookmarked or shared.',
    theme: { bg: '#EAF5EE', ink: '#121212', accent: '#128049' },
    shots: {
      cover: '/work/localloop-home.jpg',
      second: '/work/localloop-browse.jpg',
      third: '/work/localloop-item.jpg',
      mobile: '/work/localloop-mobile.jpg',
    },
  },
  {
    slug: 'proofboard',
    number: '02',
    name: 'Proofboard',
    category: 'Freelancer collaboration SaaS',
    year: '2026',
    liveUrl: 'https://proofboard-seven.vercel.app',
    repoUrl: 'https://github.com/iloilo144/proofboard',
    localUrl: 'http://localhost:5175',
    tagline: 'A shared workspace where freelancers and clients review, discuss and approve work.',
    description:
      'Proofboard brings project progress, deliverables, feedback and approvals into one place. A role switch lets you act as the freelancer (upload versions, tick off milestones) or as the client (approve work or request changes), so the whole review loop really works.',
    problem:
      'Freelance feedback usually lives in long email threads: “final_v3_REAL.pdf”, unclear approvals and lost comments. Both sides need to know what is waiting on whom, and what was approved.',
    approach:
      'Instead of a grid of KPI cards, the overview opens with one plain sentence about what needs attention. Progress bars are split into one segment per milestone, so you can see where a project is, not just a percentage. Motion is quick and precise: native View Transitions between screens, a ⌘K command menu, counting numbers and stacked toasts.',
    features: [
      'Overview with a plain-language summary, key numbers and upcoming milestones',
      'Project list with status filters, search and sorting',
      'Segmented milestone progress and a checklist you can tick off',
      'Deliverable review: versions, approve / request changes, comment threads',
      'Freelancer and client roles with different permissions',
      'Notifications with unread counts and an activity timeline filterable by type',
      '⌘K command menu with fuzzy search, plus toasts for every action',
      'Everything persists locally, with a one-click “reset demo” option',
    ],
    tech: ['React', 'React Router', 'useReducer', 'View Transitions API', 'localStorage', 'CSS'],
    notes:
      'All changes go through a single reducer (approve, request changes, upload version, toggle milestone). Each action also writes an activity entry, so notifications and the timeline can never drift out of sync with the data.',
    theme: { bg: '#E9EBFF', ink: '#0F1012', accent: '#4353FF' },
    shots: {
      cover: '/work/proofboard-overview.jpg',
      second: '/work/proofboard-review.jpg',
      third: '/work/proofboard-project.jpg',
      mobile: '/work/proofboard-mobile.jpg',
    },
  },
  {
    slug: 'shelflife',
    number: '03',
    name: 'ShelfLife',
    category: 'Productivity · Food waste',
    year: '2026',
    liveUrl: 'https://shelflife-brown-three.vercel.app',
    repoUrl: 'https://github.com/iloilo144/shelflife',
    localUrl: 'http://localhost:5176',
    tagline: 'A kitchen journal that tracks expiry dates and suggests what to cook first.',
    description:
      'ShelfLife keeps an inventory of your fridge and cupboards, highlights what is about to expire, and suggests recipes from a local dataset, ranked by how much food they rescue. A waste log shows how much you used and threw away, week by week.',
    problem:
      'Food gets forgotten at the back of the fridge. Most pantry apps are spreadsheets with a logo. They tell you what you have, but not what to do about it today.',
    approach:
      'I gave it a tactile “sticker” look: thick outlines, hard shadows that buttons sink into, and bouncy spring motion made with CSS linear() curves. Freshness is shown as a ring that empties as the date gets closer. The recipe matcher scores each recipe by how many ingredients you already have, with extra weight for ingredients that expire within three days.',
    features: [
      'Add, edit and delete ingredients in an accessible native dialog',
      'Freshness bars and colour-coded expiry labels',
      '“Use first” spread for anything expiring within three days',
      'Search, category filters and sorting',
      'Recipe suggestions ranked by coverage and food rescued',
      '“I cooked this” marks the ingredients you used in one go',
      'Waste log with weekly chart, category breakdown and undo',
    ],
    tech: ['React', 'useReducer', 'Custom hooks', 'Web Animations API', '<dialog>', 'CSS'],
    notes:
      'A small FLIP hook built on the Web Animations API makes used items squash and fly out while the rest of the list springs into place. Dates are stored as local yyyy-mm-dd strings to avoid time-zone off-by-one bugs. Sample data is generated relative to today, so the demo always has something expiring. Undo works by snapshotting state before each destructive action.',
    theme: { bg: '#FFE7A8', ink: '#2B1D14', accent: '#D9401F' },
    shots: {
      cover: '/work/shelflife-pantry.jpg',
      second: '/work/shelflife-cook.jpg',
      third: '/work/shelflife-insights.jpg',
      mobile: '/work/shelflife-mobile.jpg',
    },
  },
  {
    slug: 'form-and-found',
    number: '04',
    name: 'Form & Found',
    category: 'Architecture studio landing page',
    year: '2026',
    liveUrl: 'https://form-and-found-iota.vercel.app',
    repoUrl: 'https://github.com/iloilo144/form-and-found',
    localUrl: 'http://localhost:5177',
    tagline: 'A premium landing page for a fictional architecture and interiors studio.',
    description:
      'An art-directed one-page site for an independent architecture studio, with a crossfading hero, an asymmetric project layout and a project index where a preview image follows your cursor. It also has a services accordion, a sideways-scrolling gallery and an enquiry form.',
    problem:
      'Small creative studios need a site that feels as considered as their work, without a heavy CMS. Template agency sites all look alike and hide the projects behind generic marketing text.',
    approach:
      'I took cues from architecture monographs: high-contrast Bodoni at very large sizes, small-caps labels and generous whitespace over full-bleed photography. The motion is driven by the scroll position using native CSS scroll timelines: the hero zooms away, images unclip with parallax and the gallery pins while it slides sideways.',
    features: [
      'Live studio clock in the navigation',
      'Hero carousel with crossfade, progress bar, pause on hover and controls',
      'Cursor-following image previews on the project index (pointer devices only)',
      'Project detail overlay built on the native <dialog> element',
      'Services accordion animated with CSS grid rows, no height measuring',
      'Pinned horizontal gallery driven purely by CSS scroll timelines',
      'Enquiry form with validation and an honest success state',
    ],
    tech: ['React', 'CSS scroll-driven animations', 'CSS Grid', 'IntersectionObserver', '<dialog>', 'CSS'],
    notes:
      'Scroll reveals use animation-timeline: view() where supported, with one shared IntersectionObserver as the fallback. The cursor preview is positioned with requestAnimationFrame and direct style updates instead of React state, which keeps it smooth.',
    theme: { bg: '#E7E2D9', ink: '#121110', accent: '#9C4A2B' },
    shots: {
      cover: '/work/formfound-hero.jpg',
      second: '/work/formfound-work.jpg',
      third: '/work/formfound-gallery.jpg',
      mobile: '/work/formfound-mobile.jpg',
    },
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
