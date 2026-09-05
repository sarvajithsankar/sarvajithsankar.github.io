'use client'

import { motion, type Variants } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import { useMemo } from 'react'

import { AgentFlowDiagram } from '@/components/ui/AgentFlowDiagram'
import { ButtonLink } from '@/components/ui/Button'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { ResumeLink } from '@/components/ui/ResumeLink'
import { credibilityRow, profile, sectionCopy } from '@/data/meta'
import { EASE_SOFT, STAGGER_HERO, duration } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

/** 16px lift, per the hero entrance spec (the generic reveal uses 12px). */
const HERO_OFFSET = 16

const heroLinkClass = [
  'inline-flex items-center gap-2 font-display text-h5 text-secondary',
  'transition-colors duration-fast hover:text-primary',
].join(' ')

export function Hero() {
  const reduced = useReducedMotion()

  // Five text blocks at a 0.08s stagger, 0.4s each: the last one settles at
  // 0.72s, keeping the whole entrance under a second.
  const container = useMemo<Variants>(
    () => ({
      hidden: {},
      visible: { transition: { staggerChildren: duration(STAGGER_HERO, reduced) } },
    }),
    [reduced],
  )

  const block = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: HERO_OFFSET },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: duration(0.4, reduced), ease: EASE_SOFT },
      },
    }),
    [reduced],
  )

  return (
    <section aria-labelledby="hero-heading" className="container-page pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-6">
          <motion.p variants={block} className="font-mono text-meta text-mono">
            {sectionCopy.heroEyebrow}
          </motion.p>

          {/* The full name must sit inside the first viewport so a recruiter gets
              identity + specialisation without reading the tab title. */}
          <motion.p
            variants={block}
            className="-mb-3 font-display text-h4 font-semibold tracking-wide text-accent-foreground"
          >
            {profile.name}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={block}
            className="font-display text-display font-bold tracking-[-0.02em] text-primary"
          >
            {profile.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={block} className="max-w-prose text-body text-secondary">
            {profile.bio}
          </motion.p>

          <motion.div variants={block} className="flex flex-wrap items-center gap-3 pt-1">
            <ButtonLink href="#work">{sectionCopy.heroPrimaryCta}</ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              {sectionCopy.heroSecondaryCta}
            </ButtonLink>
          </motion.div>

          <motion.div variants={block} className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ExternalLink href={profile.links.github} className={heroLinkClass}>
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </ExternalLink>
            <ExternalLink href={profile.links.linkedin} className={heroLinkClass}>
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </ExternalLink>
            <ResumeLink appearance="link" />
          </motion.div>
        </motion.div>

        {/* Not a staggered child: the diagram has its own 0.4s entrance so its
            nodes appear after the text has finished. */}
        <div className="mx-auto w-full max-w-[280px] lg:max-w-none">
          <AgentFlowDiagram delay={0.4} className="h-[280px] w-full lg:h-[460px]" />
        </div>
      </div>

      <div className="mt-20 md:mt-24">
        <hr className="rule mb-8" />
        <p className="font-mono text-label text-mono">
          {credibilityRow.map((item, index) => (
            <span key={item} className="inline-flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className="mx-3 text-muted">
                  ·
                </span>
              ) : null}
              {item}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
