import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { isExternalHref } from '@/lib/utils'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

/**
 * The only way to render an anchor in this app.
 *
 * External and mailto hrefs get `target="_blank"` and `rel="noopener noreferrer"`
 * automatically; internal hrefs are left alone. Centralising it here means the
 * attributes cannot be forgotten on a new link.
 */
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  if (!isExternalHref(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}
