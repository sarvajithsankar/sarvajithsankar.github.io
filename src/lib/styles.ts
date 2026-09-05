import { cn } from '@/lib/utils'

export type ButtonVariant = 'filled' | 'outlined' | 'ghost'
export type ButtonSize = 'sm' | 'md'

const base = [
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-tag',
  'font-display font-medium transition-colors',
  'disabled:pointer-events-none disabled:opacity-50',
].join(' ')

const variantClass: Record<ButtonVariant, string> = {
  // text-background (4.58:1) rather than white (4.32:1) — white fails AA on the accent.
  filled: 'border border-accent bg-accent text-background hover:border-accent/85 hover:bg-accent/85',
  outlined: 'border border-border-emphasis bg-transparent text-primary hover:bg-surface-elevated',
  ghost: 'border border-transparent bg-transparent text-secondary hover:border-border hover:text-primary',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-body-xs',
  md: 'h-11 px-5 text-h5',
}

/** Single source of truth for button appearance, shared by Button and ButtonLink. */
export function buttonClass(
  variant: ButtonVariant = 'filled',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variantClass[variant], sizeClass[size], className)
}
