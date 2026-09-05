import { footerCopy } from '@/data/meta'

/**
 * Single row, no social icons — GitHub, LinkedIn, and email already appear in the
 * hero and in the contact section, and repeating them here just adds noise.
 * Set in --text-mono (5.54:1 on the background) rather than --text-muted (2.72:1).
 */
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-meta text-mono">{footerCopy.copyright}</p>
        <p className="font-mono text-meta text-mono">{footerCopy.built}</p>
      </div>
    </footer>
  )
}
