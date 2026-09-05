import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const tagClass = [
  'inline-flex items-center rounded-tag border border-accent/25 bg-accent-muted',
  'px-2 py-1 font-mono text-label text-accent-foreground',
].join(' ')

interface TagProps {
  children: ReactNode
  className?: string
}

/** Stack/technology pill. Accent text is --accent-foreground (6.60:1 on the
 *  composited pill); the base --accent only reaches 3.98:1 there. */
export function Tag({ children, className }: TagProps) {
  return <span className={cn(tagClass, className)}>{children}</span>
}
