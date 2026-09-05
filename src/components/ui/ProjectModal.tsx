'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import type { ReactNode } from 'react'

import { ExternalLink } from './ExternalLink'
import { ProjectArchitectureDiagram } from './ProjectArchitectureDiagram'
import { Tag } from './Tag'
import { caseStudy } from '@/data/meta'
import { EASE_SOFT, duration } from '@/lib/motion'
import { useFocusTrap } from '@/lib/useFocusTrap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import type { Project } from '@/types'

const overlayClass = [
  'fixed inset-0 z-overlay overflow-y-auto bg-background/95 backdrop-blur-lg',
  'px-4 py-16 sm:px-6',
].join(' ')

const panelClass =
  'relative mx-auto w-full max-w-3xl rounded-card border border-border bg-surface p-6 sm:p-10'

const closeButtonClass = [
  'absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-tag',
  'border border-border text-secondary transition-colors duration-fast',
  'hover:border-border-emphasis hover:bg-surface-elevated hover:text-primary sm:right-6 sm:top-6',
].join(' ')

const linkClass = [
  'inline-flex items-center gap-2 font-display text-h5 text-accent-foreground',
  'transition-colors duration-fast hover:text-primary',
].join(' ')

interface CaseStudySectionProps {
  index: string
  heading: string
  children: ReactNode
}

function CaseStudySection({ index, heading, children }: CaseStudySectionProps) {
  return (
    <section className="border-t border-border pt-6">
      <h3 className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-label text-accent-foreground">{index}</span>
        <span className="font-display text-h5 font-medium text-primary">{heading}</span>
      </h3>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-3 text-body-sm text-secondary">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-border-emphasis" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

/**
 * Case study modal.
 *
 * Deliberately not a route: a recruiter stays on the page, reads, presses Escape,
 * and is back where they were. Focus is trapped for the lifetime of the dialog
 * (which also binds Escape and locks background scroll), the overlay carries
 * `aria-modal`, and the close button is first in DOM order so it takes initial
 * focus on open and receives it back on close.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduced = useReducedMotion()
  const trapRef = useFocusTrap(project !== null, onClose)

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label={caseStudy.ariaLabel}
          tabIndex={-1}
          className={overlayClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration(0.2, reduced) }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            className={panelClass}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: duration(0.25, reduced), ease: EASE_SOFT }}
          >
            <button type="button" onClick={onClose} aria-label={caseStudy.closeLabel} className={closeButtonClass}>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="mb-3 font-mono text-label text-mono">
              {[project.context, project.category, project.year].join(' · ')}
            </p>
            <h2 className="pr-12 font-display text-h3 font-semibold text-primary">{project.name}</h2>
            <p className="mt-3 max-w-prose text-body-sm text-secondary">{project.summary}</p>

            <div className="mt-8 flex flex-col gap-8">
              <CaseStudySection {...caseStudy.sections.problem}>
                <p className="text-body-sm text-secondary">{project.problem}</p>
              </CaseStudySection>

              <CaseStudySection {...caseStudy.sections.built}>
                <BulletList items={project.built} />
              </CaseStudySection>

              {project.architecture ? (
                <ProjectArchitectureDiagram
                  architecture={project.architecture}
                  className="rounded-card border border-border bg-background p-4 sm:p-6"
                />
              ) : null}

              <CaseStudySection {...caseStudy.sections.decisions}>
                <BulletList items={project.decisions} />
              </CaseStudySection>

              <CaseStudySection {...caseStudy.sections.stack}>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </CaseStudySection>

              <CaseStudySection {...caseStudy.sections.links}>
                {project.links.length > 0 ? (
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {project.links.map((link) => (
                      <ExternalLink key={link.href} href={link.href} className={linkClass}>
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </ExternalLink>
                    ))}
                  </div>
                ) : (
                  <p className="text-body-sm text-secondary">{project.noPublicRepoNote}</p>
                )}
              </CaseStudySection>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
