/**
 * Generates public/og-image.png (1200 x 630).
 *
 * Run with `npm run og`. The result is committed so a normal build never depends
 * on this script running. Fonts come from the installed @fontsource packages so
 * generation stays reproducible offline.
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
  background: '#08090D',
  panel: '#0D1016',
  line: '#24262D',
  cream: '#F1EBDD',
  secondary: '#B8B2A5',
  mono: '#8F8B81',
  orange: '#F28A2E',
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

const chapters = [
  ['00', 'HELLO'],
  ['01', 'BEFORE THE CODE'],
  ['02', 'TWO DEGREES'],
  ['03', 'STILL CURIOUS'],
  ['04', 'LEARNING THROUGH WORK'],
  ['05', 'WHERE THIS COULD GO'],
  ['06', 'BEYOND THE SCREEN'],
  ['07', 'SAY HELLO'],
]

function chapterRow(index, title, last) {
  return el(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '11px 0',
        borderBottom: last ? 'none' : `1px solid ${COLORS.line}`,
      },
    },
    el(
      'div',
      { style: { width: 28, fontFamily: MONO, fontSize: 13, color: COLORS.orange, letterSpacing: '0.06em' } },
      index,
    ),
    el(
      'div',
      { style: { fontSize: 19, fontWeight: 500, color: COLORS.cream, letterSpacing: '0.01em' } },
      title,
    ),
  )
}

function chapterPanel() {
  return el(
    'div',
    {
      style: {
        width: 386,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.panel,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 4,
        padding: '24px 26px',
      },
    },
    el(
      'div',
      {
        style: {
          fontFamily: MONO,
          fontSize: 13,
          color: COLORS.mono,
          letterSpacing: '0.16em',
          marginBottom: 12,
        },
      },
      'EIGHT SMALL CHAPTERS',
    ),
    ...chapters.map(([index, title], i) => chapterRow(index, title, i === chapters.length - 1)),
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
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: '64px 80px',
        gap: 64,
        fontFamily: DISPLAY,
      },
    },
    el(
      'div',
      { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' } },
      el(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 } },
        el('div', { style: { width: 28, height: 2, backgroundColor: COLORS.orange } }),
        el(
          'div',
          {
            style: {
              fontFamily: MONO,
              fontSize: 17,
              color: COLORS.mono,
              letterSpacing: '0.12em',
            },
          },
          'MACHINE LEARNING / AGENTS / SYSTEMS',
        ),
      ),
      el(
        'div',
        { style: { fontSize: 76, fontWeight: 700, color: COLORS.cream, lineHeight: 1.02, letterSpacing: '-0.015em' } },
        'Sarvajith Sankar',
      ),
      el(
        'div',
        {
          style: {
            marginTop: 22,
            fontSize: 25,
            color: COLORS.secondary,
            lineHeight: 1.35,
            maxWidth: 620,
          },
        },
        'CS at VIT Vellore · Data Science at IIT Madras',
      ),
      el(
        'div',
        {
          style: {
            marginTop: 22,
            fontSize: 21,
            color: COLORS.mono,
            lineHeight: 1.5,
            maxWidth: 560,
          },
        },
        'Learning how models, tools, and systems fit together. Open to internships.',
      ),
      el(
        'div',
        {
          style: {
            marginTop: 38,
            display: 'flex',
            fontFamily: MONO,
            fontSize: 15,
            color: COLORS.orange,
            letterSpacing: '0.08em',
          },
        },
        'VIT VELLORE  ·  IIT MADRAS  ·  OPEN TO INTERNSHIPS',
      ),
    ),
    chapterPanel(),
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
