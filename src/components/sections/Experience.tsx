import { AgentFlowDiagram } from '@/components/ui/AgentFlowDiagram'
import { ExperienceCard } from '@/components/ui/ExperienceCard'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experience } from '@/data/experience'
import { sectionCopy } from '@/data/meta'

/**
 * Experience, newest first.
 *
 * The header carries the static variant of the agent flow diagram — the same
 * motif as the hero, drawn once and still, so the section reads as part of one
 * system rather than a new visual language.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-t border-border">
      <div className="container-page py-24 md:py-32">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-8">
          <Reveal>
            <SectionHeading id="experience-heading">{sectionCopy.experienceHeading}</SectionHeading>
          </Reveal>
          <AgentFlowDiagram variant="compact" className="h-[132px] w-[112px] opacity-80" />
        </div>

        <RevealGroup className="flex flex-col gap-6">
          {experience.map((item) => (
            <RevealItem key={item.id}>
              <ExperienceCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
