'use client'

import { useCallback, useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Traps keyboard focus inside a container while `active` is true.
 *
 * Handles the four things a modal must get right: initial focus on open,
 * Tab / Shift+Tab wrapping at both ends, Escape to dismiss, and returning focus
 * to the element that opened it on close. Also locks background scroll so the
 * page behind the overlay cannot drift while the dialog is open.
 */
export function useFocusTrap(active: boolean, onEscape: () => void): RefObject<HTMLDivElement> {
  const containerRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const getFocusable = useCallback((): HTMLElement[] => {
    const node = containerRef.current
    if (!node) return []
    return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (element) => element.offsetWidth > 0 || element.offsetHeight > 0,
    )
  }, [])

  useEffect(() => {
    if (!active) return

    openerRef.current = document.activeElement as HTMLElement | null

    const focusables = getFocusable()
    const first = focusables[0]
    if (first) {
      first.focus()
    } else {
      containerRef.current?.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onEscape()
        return
      }

      if (event.key !== 'Tab') return

      const items = getFocusable()
      if (items.length === 0) {
        event.preventDefault()
        return
      }

      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      const current = document.activeElement

      if (event.shiftKey && (current === firstItem || current === containerRef.current)) {
        event.preventDefault()
        lastItem?.focus()
      } else if (!event.shiftKey && current === lastItem) {
        event.preventDefault()
        firstItem?.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.body.style.overflow = previousOverflow
      openerRef.current?.focus()
    }
  }, [active, getFocusable, onEscape])

  return containerRef
}
