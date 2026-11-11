'use client'

import { useEffect } from 'react'

/**
 * Loaded in order. The three libraries are CDN builds because the page's
 * enhancement modules call `Lenis`, `gsap`, `ScrollTrigger`, and `THREE` as
 * globals; bundling them would change the initialization order the static
 * version relies on.
 */
const CDN_SCRIPTS = [
  'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
]

const LOCAL_SCRIPTS = [
  '/particles.js',
  '/chrome.js',
  '/card-deck.js',
  '/projects.js',
  '/contact.js',
  '/main.js',
]

const LOAD_TIMEOUT_MS = 10_000

let hasStarted = false

function loadScript(src: string) {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.async = false

    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      resolve()
    }

    // A blocked CDN must not leave the loader covering the page forever.
    const timer = window.setTimeout(() => {
      script.remove()
      finish()
    }, LOAD_TIMEOUT_MS)

    script.addEventListener('load', finish)
    script.addEventListener('error', finish)
    document.body.appendChild(script)
  })
}

export function PortfolioScripts() {
  useEffect(() => {
    // React Strict Mode mounts effects twice in development; the markup and
    // handlers must only be built once.
    if (hasStarted) return
    hasStarted = true

    const run = async () => {
      for (const src of CDN_SCRIPTS) await loadScript(src)
      for (const src of LOCAL_SCRIPTS) await loadScript(src)
    }

    void run()
  }, [])

  return null
}
