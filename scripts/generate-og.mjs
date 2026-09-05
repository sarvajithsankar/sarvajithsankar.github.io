/**
 * Generates public/og-image.png (1200 x 630).
 *
 * Run with `npm run og`. The result is committed so a normal build never depends
 * on this script running.
 *
 * Why satori + resvg rather than an image editor or an image model: the OG card
 * has to carry exact typography (the name, the role, the accent colour) and the
 * agent-flow motif. Rendering it from the same layout primitives the site uses
 * means it is reproducible, diffable, and cannot drift from the real design.
 * satori consumes .woff (not .woff2), hence the @fontsource devDependencies.
 */

import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import satori from 'satori'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

const WIDTH = 1200
const HEIGHT = 630

const COLORS = {
  background: '#0A0A0F',
  surface: '#111118',
  border: '#2E2E40',
  primary: '#F0F0F5',
  secondary: '#9090A8',
  mono: '#8585A4',
  accent: '#6C63FF',
  accentSoft: '#9B94FF',
}

const DISPLAY = 'Space Grotesk'
const MONO = 'IBM Plex Mono'

function fontPath(packageName, file) {
  return join(root, 'node_modules', '@fontsource', packageName, 'files', file)
}

const fonts = [
  { name: DISPLAY, weight: 500, data: readFileSync(fontPath('space-grotesk', 'space-grotesk-latin-500-normal.woff')) },
  { name: DISPLAY, weight: 700, data: readFileSync(fontPath('space-grotesk', 'space-grotesk-latin-700-normal.woff')) },
  { name: MONO, weight: 400, data: readFileSync(fontPath('ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff')) },
]

/** Minimal element factory so this file stays plain ESM without a JSX step. */
function el(type, props, ...children) {
  const flat = children.flat()
  // satori throws on a <div> with a non-string `children` and no display:flex,
  // so childless boxes must serialise to `undefined`, not an empty array.
  const value = flat.length === 0 ? undefined : flat.length === 1 ? flat[0] : flat
  return { type, props: { ...props, children: value } }
}

function node(label, { width = '100%', active = false } = {}) {
  return el(
    'div',
    {
      style: {
        width,
        height: 46,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        border: `1px solid ${active ? COLORS.accent : COLORS.border}`,
        backgroundColor: active ? 'rgba(108,99,255,0.10)' : COLORS.surface,
        color: active ? COLORS.primary : COLORS.mono,
        fontFamily: MONO,
        fontSize: 15,
      },
    },
    label,
  )
}

function connector() {
  return el('div', {
    style: { width: 1, height: 22, backgroundColor: COLORS.border, alignSelf: 'center' },
  })
}

/** The same agent-flow motif as the site, drawn statically for the share card. */
function flowDiagram() {
  return el(
    'div',
    { style: { display: 'flex', flexDirection: 'column', width: 330, flexShrink: 0 } },
    node('User Input'),
    connector(),
    node('LLM Core'),
    connector(),
    node('Agent Router', { active: true }),
    connector(),
    el(
      'div',
      { style: { display: 'flex', gap: 10, width: '100%' } },
      node('Tavily', { width: 103 }),
      node('Wikipedia', { width: 113 }),
      node('arXiv', { width: 94 }),
    ),
    connector(),
    node('Structured Output'),
  )
}

function card() {
  return el(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: COLORS.background,
        padding: '72px 80px',
        gap: 56,
        fontFamily: DISPLAY,
      },
    },
    el(
      'div',
      { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' } },
      el(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 } },
        el('div', { style: { width: 28, height: 3, backgroundColor: COLORS.accent } }),
        el(
          'div',
          {
            style: {
              fontFamily: MONO,
              fontSize: 19,
              color: COLORS.mono,
              letterSpacing: '0.10em',
            },
          },
          'AI & SOFTWARE ENGINEERING',
        ),
      ),
      el(
        'div',
        { style: { fontSize: 78, fontWeight: 700, color: COLORS.primary, lineHeight: 1.05 } },
        'Sarvajith Sankar',
      ),
      el(
        'div',
        {
          style: {
            marginTop: 26,
            fontSize: 27,
            color: COLORS.secondary,
            lineHeight: 1.5,
            maxWidth: 560,
          },
        },
        'Building autonomous AI agents and LLM security infrastructure.',
      ),
      el(
        'div',
        {
          style: {
            marginTop: 44,
            display: 'flex',
            gap: 18,
            fontFamily: MONO,
            fontSize: 16,
            color: COLORS.mono,
          },
        },
        'Maveric Systems  ·  TENET-AI  ·  SSoC Season 5',
      ),
    ),
    el('div', { style: { display: 'flex', alignItems: 'center' } }, flowDiagram()),
  )
}

const svg = await satori(card(), {
  width: WIDTH,
  height: HEIGHT,
  fonts: fonts.map(({ name, weight, data }) => ({ name, weight, style: 'normal', data })),
})

const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: WIDTH },
  background: COLORS.background,
}).render().asPng()

const target = join(root, 'public', 'og-image.png')
writeFileSync(target, png)

// eslint-disable-next-line no-console -- build script; this is its only output channel
console.log(`wrote ${target} (${png.length} bytes, ${WIDTH}x${HEIGHT})`)
