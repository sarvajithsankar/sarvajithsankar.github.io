'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

import { DURATION_BASE, EASE_SOFT, REVEAL_OFFSET, STAGGER_CHILDREN, duration } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { cn } from '@/lib/utils'

const VIEWPORT = { once: true, margin: '-80px' } as const

interface RevealProps {
  children: ReactNode
  className?: string
  /** Entrance delay in seconds; collapsed to a single frame under reduced motion. */
  delay?: number
  id?: string
}

/**
 * Default scroll reveal: opacity 0 / y 12 -> opacity 1 / y 0, once, 0.4s.
 *
 * The `reveal-target` class exists so the `noscript` block in the root layout can
 * force content visible if JavaScript never runs — otherwise a `initial` opacity
 * of 0 would hide the whole page.
 */
export function Reveal({ children, className, delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: REVEAL_OFFSET },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration(DURATION_BASE, reduced), ease: EASE_SOFT, delay: duration(delay, reduced) },
    },
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      className={cn('reveal-target', className)}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
}

/** Container that staggers its `RevealItem` children into view. */
export function RevealGroup({ children, className, stagger = STAGGER_CHILDREN }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: duration(stagger, reduced), delayChildren: duration(0.05, reduced) },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={cn('reveal-target', className)}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

interface RevealItemProps {
  children: ReactNode
  className?: string
}

/** Child of `RevealGroup`. Must be a direct descendant for staggering to apply. */
export function RevealItem({ children, className }: RevealItemProps) {
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: REVEAL_OFFSET },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration(DURATION_BASE, reduced), ease: EASE_SOFT },
    },
  }

  return (
    <motion.div className={cn('reveal-target', className)} variants={variants}>
      {children}
    </motion.div>
  )
}
