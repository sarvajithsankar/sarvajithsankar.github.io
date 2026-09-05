'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { ExternalLink } from './ExternalLink'
import { Tag } from './Tag'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

const cardBase =
  'group relative flex h-full flex-col rounded-card border border-border bg-surface transition-colors duration-fast'

const featuredClass = cn(
  cardBase,
  'gap-4 border-border p-6 hover:border-border-emphasis hover:bg-surface-elevated sm:p-8',
)

const compactClass = cn(cardBase, 'gap-3 p-5 hover:border-border-emphasis')

const stretchedButtonClass =
  "cursor-pointer text-left after:absolute after:inset-0 after:content-[''] hover:underline hover:decoration-border-emphasis hover:underline-offset-4"

const cardLinkClass = [
  'relative z-10 inline-flex items-center gap-2 font-display text-h5 text-secondary',
  'transition-colors duration-fast hover:text-primary',
].join(' ')

const caseStudyButtonClass = [
  'relative z-10 inline-flex cursor-pointer items-center gap-2 font-display text-h5',
  'text-accent-foreground transition-colors duration-fast hover:text-primary',
].join(' ')

interface ProjectCardProps {
  project: Project
  onOpen: () => void
}

/**
 * Project card. `featured` renders the large case-study card; `compact` renders
 * the small grid card. Both open the same modal — the compact name carries a
 * hover underline so the affordance is unambiguous without adding an animation.
 *
 * The title button uses a stretched `::after` overlay to make the whole card
 * clickable while remaining a single accessible control. Real links in the card
 * sit at `z-10` so they stay above that overlay.
 */
export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const github = project.links[0]
  const isFeatured = project.tier === 'featured'
  const metaLine = [isFeatured ? 'FEATURED' : project.context, project.category, project.year].join(' · ')

  if (!isFeatured) {
    return (
      <article className={compactClass}>
        <p className="font-mono text-label text-mono">{metaLine}</p>
        <h3 className="font-display text-h4 font-medium text-primary">
          <button type="button" onClick={onOpen} className={cn(stretchedButtonClass, 'relative')}>
            {project.name}
          </button>
        </h3>
        <p className="text-body-xs text-secondary">{project.summary}</p>
        {project.metric ? (
          <p className="font-mono text-label text-accent-foreground">
            {project.metric.value} {project.metric.label}
          </p>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </article>
    )
  }

  return (
    <article className={featuredClass}>
      <p className="font-mono text-label text-mono">{metaLine}</p>

      <h3 className="font-display text-card-title font-semibold text-primary">
        <button type="button" onClick={onOpen} className={stretchedButtonClass}>
          {project.name}
        </button>
      </h3>

      <p className="text-body-sm text-secondary">{project.summary}</p>

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5">
        {github ? (
          <ExternalLink href={github.href} className={cardLinkClass}>
            GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ExternalLink>
        ) : null}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open case study for ${project.name}`}
          className={caseStudyButtonClass}
        >
          Case Study
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
