'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tracks the user's motion preference and reacts to it changing at runtime.
 *
 * Initialises to `false` rather than reading `matchMedia` during render: the
 * server cannot know the preference, so reading it eagerly would desync
 * hydration and throw a React warning. The CSS layer in `globals.css` already
 * neutralises transitions under this media query, so the single frame before
 * this settles is not visible.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const mediaQuery = window.matchMedia(QUERY)
    setReduced(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return reduced
}
