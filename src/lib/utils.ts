import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names and let tailwind-merge resolve conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * True for http(s) and protocol-relative URLs — the ones that need
 * `target="_blank"` plus `rel="noopener noreferrer"`.
 *
 * `mailto:` is deliberately excluded: opening it in a new tab is undesirable, and
 * `rel` only carries meaning alongside `target="_blank"`.
 */
export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//i.test(href)
}

/** Derive a stable DOM id from a section href such as `#work`. */
export function sectionIdFromHref(href: string): string {
  return href.replace(/^#/, '')
}
