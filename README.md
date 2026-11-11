# Sarvajith Sankar — Portfolio

A single-page personal story: cricket and volleyball, two degrees, learning how
machine-learning systems fit together, one past internship, and an open door for
internships and conversations.

## Stack

- **Next.js 14** (App Router) with `output: "export"` — a fully static site
- **TypeScript** strict mode
- Hand-authored HTML and CSS (no component framework on the page itself)
- Vanilla enhancement scripts: Lenis, GSAP + ScrollTrigger, Three.js, IntersectionObservers
- Google Fonts: Anton, Instrument Serif, Newsreader, IBM Plex Mono

The same `out/` directory deploys to **Vercel** and **GitHub Pages** (see
`.github/workflows/deploy.yml` and `vercel.json`).

## Commands

```bash
npm install
npm run dev        # dev server on :3000
npm run build      # type-check, lint, and static-export into out/
npm run lint
npm run typecheck
npm run og         # regenerate public/og-image.png (1200x630)
```

## Structure

| Path | What it holds |
| ---- | ------------- |
| `src/portfolio/page.html` | The page body: eight chapters, chrome, panels, terminal |
| `src/app/portfolio.css` | Design tokens, layout, responsive and reduced-motion rules |
| `src/app/portfolio-scripts.tsx` | Post-hydration loader for CDN libraries and local modules |
| `public/*.js` | `particles`, `chrome`, `card-deck`, `projects`, `contact`, `main` |
| `src/data/meta.ts` | Title, description, keywords, canonical URL, share image |
| `scripts/generate-og.mjs` | Share card generator using the installed font packages |
| `DESIGN_NOTES.md` | Design decisions, deviations, and QA record |

To change copy, edit `src/portfolio/page.html` (and the matching module data,
such as the deck chapter descriptions in `public/card-deck.js` or terminal
output in `public/contact.js`). The page is intentionally one document.

## Content constraints

- First person, no invented projects, metrics, dates, outcomes, architecture
  details, endorsements, or job history.
- Maveric Systems is described in the past tense as a former AI internship.
- Certifications are reproduced from the user-supplied LinkedIn list with no
  invented dates or issuers.
- No individual projects are listed. GitHub is linked as a destination only.
- GitHub, LinkedIn, and LeetCode links open in a new tab with
  `rel="noopener noreferrer"`.

## Progressive enhancement

The page is server-rendered and readable without JavaScript. A `<noscript>`
block hides the loader and JS-only chrome, disables headline masks, and keeps
reveal copy visible. Under `prefers-reduced-motion: reduce`, WebGL and the
loader are disabled, pinned scenes flatten, and the chapter deck becomes a
static grid with its heading in normal flow.
