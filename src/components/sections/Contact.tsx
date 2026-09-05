import { ArrowUpRight } from 'lucide-react'

import { ButtonLink } from '@/components/ui/Button'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Reveal } from '@/components/ui/Reveal'
import { profile, sectionCopy } from '@/data/meta'
import { buttonClass } from '@/lib/styles'

const ghostLinkClass = buttonClass('ghost', 'md')

/**
 * No form, no backend. A mailto link is more reliable than a contact form on a
 * static site and cannot silently fail.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-border">
      <div className="container-page py-24 md:py-32">
        <Reveal className="flex flex-col gap-6">
          <h2
            id="contact-heading"
            className="max-w-[22ch] font-display text-[2rem] font-semibold tracking-[-0.02em] text-primary"
          >
            {sectionCopy.contactHeading}
          </h2>

          <p className="max-w-[480px] text-body-sm text-secondary">{sectionCopy.contactBody}</p>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href={`mailto:${profile.email}`}>{profile.email}</ButtonLink>
            <ExternalLink href={profile.links.linkedin} className={ghostLinkClass}>
              LinkedIn
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ExternalLink>
            <ExternalLink href={profile.links.github} className={ghostLinkClass}>
              GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ExternalLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
