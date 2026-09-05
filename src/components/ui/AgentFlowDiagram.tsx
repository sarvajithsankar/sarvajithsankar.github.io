'use client'

import { useEffect, useState } from 'react'

import { FLOW_VIEW_BOX, flowEdges, flowNodes, flowSequence } from '@/data/agentFlow'
import { diagramDescription } from '@/data/meta'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { cn } from '@/lib/utils'

import { FlowEdgePath, FlowNodeShape } from './AgentFlowParts'

const STEP_MS = 600
const PAUSE_MS = 3000
const EDGE_DRAW = 1.2
/**
 * Tightened from the 0.3s in the spec. Nine edges at 0.3s would still be tracing
 * at ~3.6s, by which point the hero reads as unfinished. 0.15s lands the last
 * edge at ~2.4s while keeping the per-edge duration at the specified 1.2s.
 */
const EDGE_STAGGER = 0.15

interface AgentFlowDiagramProps {
  /** `compact` renders a static, purely decorative instance for section headers. */
  variant?: 'hero' | 'compact'
  className?: string
  /** Seconds before the mount animation begins. */
  delay?: number
}

/**
 * The site's single recurring visual motif.
 *
 * The hero instance loops: each node takes the accent stroke for 600ms in
 * sequence, the final node holds for a 3s pause, then the sequence restarts.
 * Under `prefers-reduced-motion` — and in the `compact` variant — it renders as
 * a still frame with no timers at all.
 */
export function AgentFlowDiagram({ variant = 'hero', className, delay = 0 }: AgentFlowDiagramProps) {
  const reduced = useReducedMotion()
  const animated = variant === 'hero' && !reduced
  const [step, setStep] = useState(-1)

  useEffect(() => {
    if (!animated) return

    let timer: ReturnType<typeof setTimeout>
    let index = 0

    const tick = () => {
      setStep(index)
      index += 1
      // Hold the final node lit through the pause, then restart.
      if (index >= flowSequence.length) {
        index = 0
        timer = setTimeout(tick, PAUSE_MS)
      } else {
        timer = setTimeout(tick, STEP_MS)
      }
    }

    timer = setTimeout(tick, delay * 1000)
    return () => clearTimeout(timer)
  }, [animated, delay])

  const activeId = animated ? flowSequence[step] : undefined

  return (
    <div className={cn('relative', className)} aria-hidden={variant === 'compact' ? true : undefined}>
      <svg viewBox={FLOW_VIEW_BOX} className="h-full w-full" aria-hidden="true" focusable="false">
        {flowEdges.map((edge, index) => (
          <FlowEdgePath
            key={edge.id}
            edge={edge}
            isLit={activeId === edge.source}
            animated={animated}
            reduced={reduced}
            delay={delay + index * EDGE_STAGGER}
            drawDuration={EDGE_DRAW}
          />
        ))}
        {flowNodes.map((node, index) => (
          <FlowNodeShape
            key={node.id}
            node={node}
            isActive={activeId === node.id}
            animated={animated}
            reduced={reduced}
            delay={delay + index * 0.05}
          />
        ))}
      </svg>
      {variant === 'hero' ? <p className="sr-only">{diagramDescription}</p> : null}
    </div>
  )
}
