import type { SkillCategory as SkillCategoryType } from '@/types'

interface SkillCategoryProps {
  category: SkillCategoryType
}

/**
 * A capability group. Deliberately not a logo grid: the value is in the
 * description — what the tool was actually used for — not in recognising an icon.
 *
 * Descriptions use --text-secondary (6.03:1 on the surface). The spec's
 * --text-muted would be 2.72:1 at 13px and fail WCAG AA.
 */
export function SkillCategory({ category }: SkillCategoryProps) {
  return (
    <section aria-labelledby={`skills-${category.id}`} className="break-inside-avoid pb-10">
      <h3 id={`skills-${category.id}`} className="mb-5 font-mono text-label text-accent-foreground">
        {category.label}
      </h3>

      <dl className="flex flex-col gap-4">
        {category.skills.map((skill) => (
          <div key={skill.name} className="flex flex-col gap-1">
            <dt className="font-display text-h5 font-medium text-primary">{skill.name}</dt>
            <dd className="m-0 text-body-xs text-secondary">{skill.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
