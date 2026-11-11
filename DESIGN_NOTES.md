# Design Notes & Decisions — Cinematic Dark Editorial Redesign

## 1. Stack Detection & Architecture
- **Framework & Runtime**: Modern Vanilla JavaScript (ES6+), HTML5, CSS3 Custom Properties.
- **Visual & Motion Libraries**: Three.js (r128), Lenis smooth scroll (v1.0.29), GSAP 3 + ScrollTrigger (v3.12.2).
- **Build & Deployment**: Vite v7 with SingleFile plugin and GitHub Pages deployment workflow (`deploy.yml`).
- **Workspace Synchronization**: Mirrored all redesigned production assets and modules across active workspace and `sarvajithsankar.github.io`.

## 2. Design Tokens & Palette (Exact Values Enforced)
- **Surfaces**:
  - Page Background: `--bg: #08090d` (strictly enforced, never pure `#000`).
  - Elevated Surfaces: `--bg-raise: #0d1016`.
  - Glass Instrument Panels: `--panel: rgba(17, 20, 26, 0.86)` with `backdrop-filter: blur(8px)`.
  - Solid Wells & Code Insets: `--panel-solid: #11141a`, `--inset: #0a0c10`.
  - Borders: `--line: rgba(255, 255, 255, 0.08)`, `--line-strong: rgba(255, 255, 255, 0.18)`.
- **Typography & Accents**:
  - Cream Primary: `--ink: #f1ebdd`, Secondary: `--ink-2: rgba(241, 235, 221, 0.62)`, Micro-labels: `--ink-3: rgba(241, 235, 221, 0.38)`.
  - Primary Accent: `--orange: #f28a2e`, Soft: `--orange-soft: rgba(242, 138, 46, 0.16)`, Glow: `--orange-glow: rgba(242, 138, 46, 0.35)`.
  - Secondary Accent: `--blue: #8fb4ff` (keywords, supporting emphasis).
  - Status Accents: `--green: #7ee08f` (success / active verified), `--red: #ff6b5e` (blocked / warning).

## 3. Typography Hierarchy
- **Display**: `Anton` (ALL CAPS, line-height: 0.88-0.92, letter-spacing: -0.005em).
- **Accent Italic**: `Instrument Serif` (Italic, sentence case, burnt orange `--orange: #f28a2e`, line-height: 0.95).
- **Body Serif**: `Newsreader` (17-20px, line-height: 1.48, optical size active, high-contrast cream/secondary).
- **Mono / UI Chrome**: `IBM Plex Mono` (10-12px, UPPERCASE, letter-spacing: 0.08-0.14em).

## 4. Atmosphere Stacking Order
1. `--z-canvas: 0`: WebGL Particle Field (`#bg-particle-canvas`).
2. `--z-bokeh: 1`: 8 drifting radial bokeh orbs in margins (orange & ice-blue gradients, 2 with 1px inset ring).
3. `--z-content: 2`: Editorial content sections, grids, and instrument panels.
4. `--z-chrome`: Animated SVG `feTurbulence` grain overlay (180x180 tile, `steps(8)` 800ms jitter).
5. `--z-chrome: 50`: Persistent UI chrome (Hairline progress, CONTENTS button, tick rail, scroll % readout, scene frame counter).
6. `--z-loader: 200`: Initial loading wipe with progress counter (`000% -> 100%`).

## 5. WebGL Particle Field System
- **Points Scale**: 48,000 points on desktop, 24,000 on tablet, 9,000 on mobile with pixel ratio clamping.
- **Custom Shaders**: GLSL vertex shader implementing per-point staggered morphing (`uMix`), NDC cursor repel (radius 0.22 NDC), idle sine drift, and twinkle.
- **Morphing Library**:
  - `galaxy`: Hero tilted disc (85%) + dense warm torus core (15%).
  - `ring`: Concentric ring with spiral arm swirl.
  - `helix`: Dual-strand DNA double helix with horizontal connecting rungs.
  - `tower`: Stacked floor rectangles with perimeter sampling and vertical columns.
  - `network`: 18 cluster nodes connected by sampled edge lines.
  - `wave`: Continuous undulating sine ribbon.
- **Burst API**: Window event listener (`particles:burst`) triggering short-lived sparks along connector paths on packet arrival.

## 6. Spiral / Ring Card Deck
- **Card Anatomy**: 3:4 aspect ratio, rounded corners (`--radius-card: 10px`), rotated vertical Anton label, 5px corner dot, 3D pointer tilt (`rotateX`/`rotateY`), and 180° flip to reveal summary and `GO →` navigation button.
- **Marble Artwork**: 5 distinct color families (Purple/Orange, Olive/Gold, Teal/Crimson, Blue/Red Silk, Brushed Chrome) procedurally synthesized via domain-warped turbulence noise.
- **Choreography**: GSAP ScrollTrigger timeline smoothly interpolating through 4 stages (peek arc -> 360 circle -> smile fan curve -> left translation exit).

## 7. Interactive Instrument Panels & Pinned Scenes
- Cursor-following ambient glow using CSS variables `--mx` and `--my`.
- Learning-map SVG diagram with five nodes (machine learning, deep learning, transformers, LLMs and agents, cloud and DevOps), traveling notes chip, and spark burst callbacks.
- One pinned scroll-scrubbed scene documenting the four parts of the Maveric Systems agent work: tools, state and memory, pretrained models, and iteration. Includes a floating step card, segmented progress, a four-stage SVG indicator, and the `FRAME 0000 / 0960` readout.

## 8. Progressive Enhancement & Accessibility
- Complete fallback under `@media (prefers-reduced-motion: reduce)`: WebGL disabled for a static layered CSS background, card deck renders as a static grid with visible back faces and its section heading kept in normal flow, loader bypassed, pinned scenes and scroll animations disabled.
- The card deck exposes an `sr-only` level-2 heading because its visual heading is an animated, `aria-hidden` layer; the visual heading becomes static content under reduced motion.
- Focus trap in the CONTENTS overlay with Esc support and full keyboard tab navigation; opening moves focus to the close button, closing restores focus to the CONTENTS toggle.
- Chapter cards are keyboard reachable and open their section on Enter/Space; no nested interactive elements remain inside a card. Tick-rail markers are visual only (`tabindex="-1"`) so they do not add nine stops to the tab order.
- GitHub and LinkedIn cards use real profile URLs with `rel="noopener noreferrer"`, visible focus states, and a decorative activity motif with no invented counts.
- The story is readable with JavaScript, WebGL, or smooth scrolling unavailable; all four work steps also render as a normal list below 1024px and under reduced motion.

## 9. Personal-Story Content Pass
- Replaced the project/module narrative with eight first-person chapters: hello, before the code, two degrees, still curious, learning through work, where this could go, beyond the screen, say hello.
- Removed the project detail modal, the project grid, the pinned timeline, the security-pipeline demo, scenario chips, and the stat-counter tween, because they carried invented demo content or project enumeration the brief explicitly excludes.
- Project links now live only as a single "Explore what I've built" link to GitHub; no individual repositories are named or described.
- Kepler-style card deck repurposed as chapter navigation (8 cards), with targets remapped to the new sections.
- Hero copy, field notes, academic route panel, learning map, work scene, direction panels, conversation section, console commands, profile cards, footer, contents overlay, tick rail, and particle shape map all rewritten/remapped for the new structure.
- Deviations from the original visual spec:
  - Hero lede widened from 26ch to 32ch so the longer personal introduction fits a 900px-tall viewport; hero uses a fluid 12.1vw cap.
  - Reveal statement reduced from `--fs-statement` to `clamp(1.5rem, 2.3vw, 2.1rem)` because it now sits in a two-column layout.
  - Work-scene headline capped at `clamp(2.2rem, 4.4vw, 4.2rem)` to keep the pinned scene inside the viewport.
  - Card ring radius and fan spacing scale with viewport width; below 768px the deck becomes a labelled horizontal carousel.
  - Pinned work scene only runs at 1024px and wider; tablet and mobile use the stacked four-step list.
  - Under reduced motion the deck becomes a static 4-column grid (2 columns below 768px) with the stage-2 headline and lede placed above it in normal flow; the animated center text is omitted.
- Legacy `timeline.js`, `data.js`, `hero.js`, and `app.js` remain in the repository but are no longer referenced by `index.html`; they were left in place rather than deleted.

## 10. Profile and Campus Updates (November 2026)
- Hero headline now shows the name only. The outlined `MACHINE LEARNING` line and its now-unused `.outline` and `.hero-title .line-2` styles were removed; machine learning still appears in the hero lede, meta block, learning map, and work narrative.
- "Open to internships" is stated in the hero status field, the contact lede, the LinkedIn card's `OPEN TO` row, and the terminal `whoami` output.
- Added a LeetCode destination card with a link to `leetcode.com/u/sarvajithsankar`. It deliberately shows no solved counts; the public API numbers change and are not maintained on this static page. The card art is a decorative equalizer motif, not live data.
- Added `LEETCODE` links to the footer, contents overlay, and terminal `links` command. All external links keep `target="_blank"` + `rel="noopener noreferrer"`.
- Added campus roles under "Beyond the screen", listed separately at the user's request: IIC VIT Vellore (participant), IEEE CS VIT Vellore (ex-coordinator), and Gravitas (ex-coordinator).
- The profile grid is three columns at 1024px and wider and a single column below. The contents overlay gained a mobile layout: one column, ESC button first, chapter list above the profile links.
- Certifications were not added. LinkedIn answers automated requests with HTTP 999/authwall, so the profile could not be read. The certifications in the unused `data.js` were not imported because they could not be verified; the user will supply the current list.

## 11. Certifications (November 2026)
- Added seven certifications above the contact profile cards, using the LinkedIn export the user supplied: Google Cloud Computing Foundations: Cloud Computing Fundamentals; Introduction to Cybersecurity (Cisco Networking Academy); Cloud Platform Job Simulation; Cybersecurity Job Simulation; Mastercard Virtual Experience; Verizon Virtual Experience; Pandas (Kaggle Learn).
- Titles and issuers are reproduced exactly as shown. No dates were provided, so none were invented. The two job simulations are labelled by type, and the virtual experiences by company, rather than guessing an issuing platform.
- The credential list uses a two-column grid at 768px and wider and a single column below it.
- The technical-skills half of the same screenshot was not imported; the existing story, hero meta, and terminal `stack` command were left unchanged.

