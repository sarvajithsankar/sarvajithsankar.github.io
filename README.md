# Sarvajith Sankar — Portfolio

A single-page developer portfolio built to answer three questions in order:
*who is this* (hero), *why care* (selected work), *how deep* (experience, skills,
currently building), then *how to reach them* (contact).

## Stack

- **Next.js 14** (App Router) with `output: "export"` — a fully static site
- **TypeScript** strict mode, no `any`
- **Tailwind CSS v3** driven entirely by CSS-variable design tokens
- **Framer Motion** for the entrance/scroll reveals and the agent-flow diagram
- **Lucide React** for the handful of icons
- Fonts self-hosted via `next/font/local` (Space Grotesk + IBM Plex Mono)

Because the site is a static export, the same `out/` directory deploys to **Vercel**
and to **GitHub Pages** (see `.github/workflows/deploy.yml`).

## Commands

```bash
npm run dev        # dev server on :3000
npm run build      # type-check, lint, and static-export into out/
npm run lint       # eslint (no-console + no-explicit-any enforced)
npm run typecheck  # tsc --noEmit
npm run og         # regenerate public/og-image.png (1200x630) via satori
```

## Editing content

All copy lives in `src/data/` and is typed in `src/types/index.ts` — you never need
to touch a component to change text:

| File | What it holds |
| ---- | ------------- |
| `projects.ts` | The six projects, their case-study content, tags, and verified links |
| `experience.ts` | Maveric Systems, TENET-AI, InAmigos Foundation |
| `skills.ts` | The categorized capability map |
| `building.ts` | The "Currently Building" trajectory items |
| `meta.ts` | Identity, nav, credibility row, SEO, section copy |
| `agentFlow.ts` | Geometry for the hero SVG motif |

Adding a link or flipping `resume.available` in `meta.ts` is data-only; the UI adapts.

## Design tokens

Colours are defined once as RGB channels in `src/app/globals.css` and exposed through
`tailwind.config.ts`. No raw hex appears in components. Depth is border-based; there
are no box shadows.

## Deliberate deviations from the original brief

Each of these was measured, not guessed. Contrast ratios are WCAG 2.1 relative
luminance; the brief requires Lighthouse Accessibility ≥ 95, and axe's color-contrast
audit runs in that suite.

1. **`--text-muted` (#55556A) is decorative-only.** It measures 2.72:1 on the
   background and fails WCAG AA, so it is used only for `aria-hidden` SVG node labels.
   Readable metadata (dates, statuses, the credibility row, the footer) uses
   `--text-mono` instead.
2. **`--text-mono` is #8585A4, not #7B7B9A.** The original mono colour passes on the
   background (4.84:1) and surface (4.60:1) but drops to 4.32:1 on the card *hover*
   surface. #8585A4 clears 4.95:1 on the worst surface.
3. **`--accent-foreground` (#9B94FF) for small accent text.** The base accent #6C63FF
   composites to 3.98:1 as 11px tag text on an accent-muted pill; the lifted tint is
   6.60:1. The base accent remains for fills, borders, and focus rings.
4. **Filled buttons use `text-background`, not white.** White on the accent is 4.32:1;
   the near-black text is 4.58:1.
5. **Fonts are `next/font/local`, not `next/font/google`.** `next/font/google` fetches
   CSS at build time and would make every build depend on fonts.googleapis.com. The six
   woff2 files this site uses are vendored in `src/fonts/` (OFL), preserving zero-FOUT,
   preloading, and automatic fallback metrics while keeping builds reproducible offline.
6. **No public link for Phishermen.** There is no public repository for it (verified
   against the GitHub API), so the card ships without a guessed URL. The case study
   still explains why (`noPublicRepoNote`). Likewise the Maveric agent links to its case
   study only, since it is company work.
7. **Hero leads with the name.** The brief's hero copy omitted the full name, but its
   own recruiter test requires name + role + specialisation in the first viewport, so
   the name sits above the headline.
8. **Work counter is derived from the data** (`projects.length` → `[06]`), not the
   hardcoded `[04]`, so it can never drift from the list.

## Verified against the live account

Project links in `projects.ts` were checked against `github.com/sarvajithsankar`:
`TENET-AI`, `Vit-Smart-Assistant`, `Sentinel-Vault`, and `customer_churn` exist; the
Maveric agent and Phishermen intentionally do not link out. The InAmigos dates
(Dec 2025 – Feb 2026) come from this repository's own history.
