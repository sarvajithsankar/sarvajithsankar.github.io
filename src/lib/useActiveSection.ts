'use client'

import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently occupying the top of the viewport,
 * used to drive the navbar's animated underline.
 *
 * `ids` must be a stable reference (declare it at module scope) — passing an
 * inline array literal rebuilds the observer on every render.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Topmost intersecting section wins, so short sections near the top of
        // the page do not fight their taller neighbours.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        const top = visible[0]
        if (top) setActiveId(top.target.id)
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
