import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { buttonClass, type ButtonSize, type ButtonVariant } from '@/lib/styles'
import { cn } from '@/lib/utils'

interface SharedProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  /** Trailing element — an icon or the ↗ glyph. */
  trailing?: ReactNode
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>

/** Interactive control. Use ButtonLink for anything that navigates. */
export function Button({ variant, size, className, children, trailing, ...rest }: ButtonProps) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
      {trailing}
    </button>
  )
}

type ButtonLinkProps = SharedProps & { href: string }

/**
 * Navigation styled as a button. Deliberately not polymorphic with `Button` —
 * splitting the two keeps both prop types exact instead of leaning on a union
 * that would need `any` to satisfy.
 */
export function ButtonLink({ variant, size, className, children, trailing, href }: ButtonLinkProps) {
  return (
    <a href={href} className={cn(buttonClass(variant, size, className))}>
      {children}
      {trailing}
    </a>
  )
}
