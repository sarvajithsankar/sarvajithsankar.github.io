import { ArrowUpRight } from 'lucide-react'

import { resume } from '@/data/meta'
import { buttonClass, type ButtonSize } from '@/lib/styles'
import { cn } from '@/lib/utils'

const linkClass = [
  'inline-flex items-center gap-2 font-display text-h5 text-secondary',
  'transition-colors duration-fast hover:text-primary',
].join(' ')

interface ResumeLinkProps {
  /** `button` renders an outlined pill; `link` renders a plain ghost text link. */
  appearance?: 'button' | 'link'
  size?: ButtonSize
  className?: string
}

/**
 * Resume CTA.
 *
 * `resume.available` is false until `public/resume.pdf` exists, so the control
 * renders as a non-navigating pill carrying the "Resume coming soon" tooltip
 * rather than a link that 404s. Flip the flag in `src/data/meta.ts` when the PDF
 * lands — no component changes.
 */
export function ResumeLink({ appearance = 'button', size = 'sm', className }: ResumeLinkProps) {
  const isButton = appearance === 'button'

  const label = (
    <>
      Resume
      <ArrowUpRight className={isButton ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
    </>
  )

  const classes = cn(
    isButton ? buttonClass('outlined', size, 'cursor-help') : cn(linkClass, 'cursor-help'),
    className,
  )

  if (!resume.available) {
    return (
      <span className={classes} title={resume.unavailableTooltip}>
        {label}
        <span className="sr-only"> — {resume.unavailableTooltip}</span>
      </span>
    )
  }

  return (
    <a
      href={resume.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(isButton ? buttonClass('outlined', size) : linkClass, className)}
    >
      {label}
    </a>
  )
}
