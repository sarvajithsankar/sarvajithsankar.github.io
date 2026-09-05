/**
 * Shared motion tokens. Every animation in the app references these — no
 * component declares its own easing curve or duration.
 */

/** The single easing curve used across the site. */
export const EASE_SOFT = [0.25, 0.46, 0.45, 0.94] as const

/** Default entrance duration, in seconds. */
export const DURATION_BASE = 0.4

/** Hover transitions. */
export const DURATION_FAST = 0.15

/** Delay between staggered children. */
export const STAGGER_CHILDREN = 0.06

/** Delay between hero text blocks. */
export const STAGGER_HERO = 0.08

/** Vertical offset for the default entrance. */
export const REVEAL_OFFSET = 12

/** Collapses every duration to a single frame for reduced-motion users. */
export function duration(seconds: number, reduced: boolean): number {
  return reduced ? 0.001 : seconds
}
