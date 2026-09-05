'use client'

import { useCallback, useState } from 'react'

import { ProjectCard } from '@/components/ui/ProjectCard'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sectionCopy } from '@/data/meta'
import { featuredProjects, personalProjects, projects } from '@/data/projects'

/** Derived from the data, so the counter can never drift from the project list. */
const PROJECT_COUNT = String(projects.length).padStart(2, '0')

export function Work() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  // Stable identity matters: the modal's focus trap re-runs its effect whenever
  // this callback changes, which would steal focus on every parent render.
  const closeModal = useCallback(() => setActiveSlug(null), [])
  const openProject = useCallback((slug: string) => setActiveSlug(slug), [])

  const activeProject = projects.find((project) => project.slug === activeSlug) ?? null

  return (
    <section id="work" aria-labelledby="work-heading" className="container-page py-24 md:py-32">
      <Reveal className="mb-12">
        <SectionHeading id="work-heading" index={PROJECT_COUNT}>
          {sectionCopy.workHeading}
        </SectionHeading>
      </Reveal>

      <RevealGroup className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <RevealItem key={project.slug}>
            <ProjectCard project={project} onOpen={() => openProject(project.slug)} />
          </RevealItem>
        ))}
      </RevealGroup>

      <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {personalProjects.map((project) => (
          <RevealItem key={project.slug}>
            <ProjectCard project={project} onOpen={() => openProject(project.slug)} />
          </RevealItem>
        ))}
      </RevealGroup>

      <ProjectModal project={activeProject} onClose={closeModal} />
    </section>
  )
}
