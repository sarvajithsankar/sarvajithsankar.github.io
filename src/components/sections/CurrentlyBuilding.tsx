import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { building } from '@/data/building'
import { sectionCopy } from '@/data/meta'
import type { BuildingStatus } from '@/types'

/**
 * The dot colour reinforces the status text; it never replaces it, so the state
 * is still conveyed with colour removed.
 */
const statusDot: Record<BuildingStatus, string> = {
  ACTIVE: 'bg-success',
  LEARNING: 'bg-accent',
  EXPLORING: 'bg-border-emphasis',
}

const cardClass = [
  'flex h-full flex-col gap-3 rounded-card border border-border bg-surface p-6',
  'transition-colors duration-fast hover:border-border-emphasis hover:bg-surface-elevated',
].join(' ')

/** Trajectory, not a skills list. No progress bars, no percentages. */
export function CurrentlyBuilding() {
  return (
    <section id="building" aria-labelledby="building-heading" className="container-page py-24 md:py-32">
      <Reveal className="mb-12">
        <SectionHeading id="building-heading">{sectionCopy.buildingHeading}</SectionHeading>
      </Reveal>

      <RevealGroup className="grid gap-6 sm:grid-cols-2">
        {building.map((item) => (
          <RevealItem key={item.id}>
            <article className={cardClass}>
              <p className="flex items-center gap-2 font-mono text-label text-mono">
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${statusDot[item.status]}`} />
                STATUS: {item.status}
              </p>
              <h3 className="font-display text-body font-medium text-primary">{item.title}</h3>
              <p className="text-body-xs text-secondary">{item.description}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
