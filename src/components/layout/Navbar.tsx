'use client'

import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { MobileNav } from './MobileNav'
import { ResumeLink } from '@/components/ui/ResumeLink'
import { navLinks, profile } from '@/data/meta'
import { EASE_SOFT } from '@/lib/motion'
import { useActiveSection } from '@/lib/useActiveSection'
import { sectionIdFromHref } from '@/lib/utils'

/** Module scope so the observer is not rebuilt on every render. */
const SECTION_IDS = navLinks.map((link) => sectionIdFromHref(link.href))
const MOBILE_QUERY = '(min-width: 768px)'
const MENU_LABEL = 'Open navigation menu'
const CLOSE_LABEL = 'Close navigation menu'

const navLinkClass = [
  'relative py-1 font-display text-[13px] text-secondary',
  'transition-colors duration-fast hover:text-primary',
].join(' ')

export function Navbar() {
  const [open, setOpen] = useState(false)
  const activeId = useActiveSection(SECTION_IDS)

  // Stable identity: the mobile nav's focus trap re-runs its effect whenever this
  // callback changes, which would steal focus on every scroll-driven re-render.
  const closeMobileNav = useCallback(() => setOpen(false), [])

  // Resizing past the mobile breakpoint with the overlay open would trap focus
  // inside an `md:hidden` element. Close it instead.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const mediaQuery = window.matchMedia(MOBILE_QUERY)
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-nav border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a
            href="#main-content"
            className="font-display text-h5 font-medium tracking-wide text-primary transition-colors duration-fast hover:text-accent-foreground"
          >
            {profile.wordmark}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const sectionId = sectionIdFromHref(link.href)
              const isActive = activeId === sectionId

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={navLinkClass}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-px left-0 h-px w-full bg-accent"
                      transition={{ duration: 0.25, ease: EASE_SOFT }}
                    />
                  ) : null}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ResumeLink />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? CLOSE_LABEL : MENU_LABEL}
              className="flex h-10 w-10 items-center justify-center rounded-tag text-secondary transition-colors duration-fast hover:text-primary md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={closeMobileNav} activeId={activeId} closeLabel={CLOSE_LABEL} />
    </>
  )
}
