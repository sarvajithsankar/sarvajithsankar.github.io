'use client'

import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { X } from 'lucide-react'

import { ResumeLink } from '@/components/ui/ResumeLink'
import { navLinks, profile } from '@/data/meta'
import { EASE_SOFT, REVEAL_OFFSET, STAGGER_HERO, duration } from '@/lib/motion'
import { useFocusTrap } from '@/lib/useFocusTrap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { cn } from '@/lib/utils'

const ITEM: Variants = {
  hidden: { opacity: 0, y: REVEAL_OFFSET },
  visible: { opacity: 1, y: 0 },
}

const linkClass = [
  'block rounded-tag border-b border-border py-4 font-display text-h3 text-secondary',
  'transition-colors duration-fast hover:text-primary',
].join(' ')

interface MobileNavProps {
  open: boolean
  onClose: () => void
  activeId: string
  closeLabel: string
}

/**
 * Full-screen mobile navigation overlay.
 *
 * Focus is trapped for as long as it is open (which also locks background scroll
 * and binds Escape to close), and links stagger in with Framer Motion. The close
 * button is first in DOM order so it receives initial focus.
 */
export function MobileNav({ open, onClose, activeId, closeLabel }: MobileNavProps) {
  const reduced = useReducedMotion()
  const trapRef = useFocusTrap(open, onClose)

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={trapRef}
          id="mobile-nav"
          tabIndex={-1}
          className="fixed inset-0 z-overlay bg-background/95 backdrop-blur-md md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration(0.2, reduced) }}
        >
          <div className="container-page flex h-16 items-center justify-between">
            <span className="font-display text-h5 font-medium tracking-wide text-primary">
              {profile.wordmark}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-tag text-secondary transition-colors duration-fast hover:text-primary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-page flex flex-col pt-8">
            {navLinks.map((link, index) => {
              const sectionId = link.href.replace(/^#/, '')
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  variants={ITEM}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: duration(0.3, reduced),
                    delay: duration(0.05 + index * STAGGER_HERO, reduced),
                    ease: EASE_SOFT,
                  }}
                  aria-current={activeId === sectionId ? 'true' : undefined}
                  className={cn(linkClass, activeId === sectionId && 'text-primary')}
                >
                  {link.label}
                </motion.a>
              )
            })}
            <ResumeLink size="md" className="mt-8 w-full" />
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
