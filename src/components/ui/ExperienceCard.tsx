import { Tag } from './Tag'
import type { ExperienceItem } from '@/types'

const cardClass = [
  'rounded-card border border-border border-l-2 border-l-accent bg-surface',
  'p-6 transition-colors duration-fast hover:border-border-emphasis hover:border-l-accent sm:p-8',
].join(' ')

interface ExperienceCardProps {
  item: ExperienceItem
}

/**
 * One experience entry. The 2px accent left border is the only emphasis the card
 * gets — no icon, no logo, no timeline dot.
 *
 * Dates and location are set in --text-mono (5.27:1 on the surface) rather than
 * --text-muted, which measures 2.72:1 and would fail WCAG AA at 11px.
 */
export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <article className={cardClass}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-display text-h4 font-medium text-primary">
          {item.role}
          <span className="text-secondary"> · {item.company}</span>
        </h3>
        <p className="shrink-0 font-mono text-label text-mono">{item.period}</p>
      </div>

      <p className="mt-1 font-mono text-label text-mono">{item.location}</p>

      <ul className="mt-5 flex flex-col gap-3">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-body-sm text-secondary">
            <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-border-emphasis" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  )
}
