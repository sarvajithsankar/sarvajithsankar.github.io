'use client'

import { motion } from 'framer-motion'

import type { FlowEdge, FlowNode } from '@/types'
import { EASE_SOFT, duration } from '@/lib/motion'

const NODE_RX = 4
const LABEL_OFFSET = 4

interface FlowNodeShapeProps {
  node: FlowNode
  isActive: boolean
  animated: boolean
  reduced: boolean
  /** Entrance delay in seconds for the fade-in. */
  delay: number
}

/**
 * One box in the agent flow. The active node takes the accent stroke and the
 * 10%-opacity accent fill; every other node stays on the border/surface pair.
 * Geometry alone communicates state — no glow, no blur, no shadow.
 */
export function FlowNodeShape({ node, isActive, animated, reduced, delay }: FlowNodeShapeProps) {
  const labelX = node.x + node.width / 2
  const labelY = node.y + node.height / 2 + LABEL_OFFSET

  if (!animated) {
    return (
      <g>
        <rect
          x={node.x}
          y={node.y}
          width={node.width}
          height={node.height}
          rx={NODE_RX}
          fill="var(--surface-hex)"
          stroke="var(--border-emphasis-hex)"
        />
        <text x={labelX} y={labelY} textAnchor="middle" fontSize={11} fill="var(--text-muted-hex)" className="font-mono">
          {node.label}
        </text>
      </g>
    )
  }

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration(0.3, reduced), delay: duration(delay, reduced) }}
    >
      <motion.rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx={NODE_RX}
        initial={{ stroke: 'var(--border-emphasis-hex)', fill: 'var(--surface-hex)' }}
        animate={{
          stroke: isActive ? 'var(--accent-hex)' : 'var(--border-emphasis-hex)',
          fill: isActive ? 'var(--accent-muted-hex)' : 'var(--surface-hex)',
        }}
        transition={{ duration: duration(0.25, reduced) }}
      />
      <motion.text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        fontSize={11}
        className="font-mono"
        initial={{ fill: 'var(--text-muted-hex)' }}
        animate={{ fill: isActive ? 'var(--text-primary-hex)' : 'var(--text-muted-hex)' }}
        transition={{ duration: duration(0.25, reduced) }}
      >
        {node.label}
      </motion.text>
    </motion.g>
  )
}

interface FlowEdgePathProps {
  edge: FlowEdge
  isLit: boolean
  animated: boolean
  reduced: boolean
  /** Draw-in delay in seconds. */
  delay: number
  drawDuration: number
}

/**
 * One connector. Draws itself in with `pathLength` 0 -> 1 on mount (Framer Motion
 * drives stroke-dasharray under the hood), then changes colour as the activation
 * loop passes through its source node.
 */
export function FlowEdgePath({ edge, isLit, animated, reduced, delay, drawDuration }: FlowEdgePathProps) {
  if (!animated) {
    return <path d={edge.d} fill="none" strokeWidth={1} stroke="var(--border-emphasis-hex)" />
  }

  return (
    <motion.path
      d={edge.d}
      fill="none"
      strokeWidth={1}
      strokeLinecap="round"
      initial={{ pathLength: 0, stroke: 'var(--border-emphasis-hex)' }}
      animate={{ pathLength: 1, stroke: isLit ? 'var(--accent-hex)' : 'var(--border-emphasis-hex)' }}
      transition={{
        pathLength: { duration: duration(drawDuration, reduced), delay: duration(delay, reduced), ease: EASE_SOFT },
        stroke: { duration: duration(0.25, reduced) },
      }}
    />
  )
}
