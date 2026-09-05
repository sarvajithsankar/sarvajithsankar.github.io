import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SkillCategory } from '@/components/ui/SkillCategory'
import { sectionCopy } from '@/data/meta'
import { skillCategories } from '@/data/skills'

/**
 * A capability map, not a logo grid.
 *
 * CSS multi-column rather than a two-column grid: there are five categories, and
 * a grid would leave a visible hole in the last row. With `break-inside-avoid`
 * the columns balance and no category is split across them.
 */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="container-page py-24 md:py-32">
      <Reveal className="mb-12">
        <SectionHeading id="skills-heading">{sectionCopy.skillsHeading}</SectionHeading>
      </Reveal>

      <RevealGroup className="columns-1 gap-12 sm:columns-2">
        {skillCategories.map((category) => (
          <RevealItem key={category.id} className="break-inside-avoid">
            <SkillCategory category={category} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
