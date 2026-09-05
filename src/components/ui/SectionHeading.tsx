import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  children: ReactNode
  /** Mono index rendered beside the heading, e.g. "[06]". */
  index?: string
}

/** Section title with an optional mono counter. Every <h2> goes through here. */
export function SectionHeading({ id, children, index }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h2 id={id} className="font-display text-title font-semibold tracking-[-0.02em] text-primary">
        {children}
      </h2>
      {index ? <span className="font-mono text-label text-accent-foreground">[{index}]</span> : null}
    </div>
  )
}
