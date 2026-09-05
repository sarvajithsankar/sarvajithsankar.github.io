import type { ProjectArchitecture } from '@/types'
import { cn } from '@/lib/utils'

const WIDTH = 360
const BOX_H = 32
const CAPTION_H = 15
const GAP_X = 12
const GAP_Y = 32
const HEADER_H = 24
const BOX_RX = 4

interface Box {
  label: string
  x: number
  width: number
  cx: number
  y: number
}

interface LayerGeometry {
  id: string
  caption?: string
  captionY: number
  boxes: Box[]
}

/** Fan out / converge when either side is a single node; pair by index otherwise. */
function connect(fromCount: number, toCount: number): Array<[number, number]> {
  const pairs: Array<[number, number]> = []

  if (fromCount === 1 || toCount === 1) {
    for (let a = 0; a < fromCount; a += 1) {
      for (let b = 0; b < toCount; b += 1) pairs.push([a, b])
    }
    return pairs
  }

  for (let a = 0; a < fromCount; a += 1) pairs.push([a, Math.min(a, toCount - 1)])
  return pairs
}

function layout(architecture: ProjectArchitecture) {
  let cursor = HEADER_H

  const layers: LayerGeometry[] = architecture.layers.map((layer) => {
    const count = layer.nodes.length
    const width = (WIDTH - (count - 1) * GAP_X) / count
    const y = cursor + CAPTION_H

    const boxes = layer.nodes.map((label, index) => {
      const x = index * (width + GAP_X)
      return { label, x, width, cx: x + width / 2, y }
    })

    cursor = y + BOX_H + GAP_Y
    return { id: layer.id, caption: layer.caption, captionY: cursor - GAP_Y - BOX_H - 5, boxes }
  })

  return { layers, height: cursor - GAP_Y + 4 }
}

function edgePath(from: Box, to: Box): string {
  const y1 = from.y + BOX_H
  const y2 = to.y
  const mid = (y1 + y2) / 2
  return `M${from.cx} ${y1} C${from.cx} ${mid}, ${to.cx} ${mid}, ${to.cx} ${y2}`
}

interface ProjectArchitectureDiagramProps {
  architecture: ProjectArchitecture
  className?: string
}

/**
 * Static, project-specific architecture diagram for the case study modal.
 *
 * Rendered from the `layers` data rather than hand-drawn per project, so adding a
 * diagram to a new project means editing `src/data/projects.ts` only. The SVG is
 * hidden from assistive tech and replaced by a linear text walkthrough of the
 * same layers, which is faster to scan than a diagram is to parse.
 */
export function ProjectArchitectureDiagram({ architecture, className }: ProjectArchitectureDiagramProps) {
  const { layers, height } = layout(architecture)

  const walkthrough = architecture.layers
    .map((layer) => layer.nodes.join(', '))
    .join(', then ')

  return (
    <figure className={cn('m-0', className)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="h-auto w-full"
        aria-hidden="true"
        focusable="false"
        role="presentation"
      >
        <text x={0} y={12} fontSize={10} fill="var(--accent-foreground-hex)" className="font-mono" letterSpacing="0.08em">
          {architecture.label}
        </text>

        {layers.slice(0, -1).map((layer, layerIndex) => {
          const next = layers[layerIndex + 1]
          if (!next) return null
          return connect(layer.boxes.length, next.boxes.length).map(([fromIndex, toIndex]) => {
            const from = layer.boxes[fromIndex]
            const to = next.boxes[toIndex]
            if (!from || !to) return null
            return (
              <path
                key={`${layer.id}-${fromIndex}-${toIndex}`}
                d={edgePath(from, to)}
                fill="none"
                strokeWidth={1}
                stroke="var(--border-emphasis-hex)"
              />
            )
          })
        })}

        {layers.map((layer) => (
          <g key={layer.id}>
            {layer.caption ? (
              <text x={0} y={layer.captionY} fontSize={9} fill="var(--text-muted-hex)" className="font-mono" letterSpacing="0.1em">
                {layer.caption}
              </text>
            ) : null}
            {layer.boxes.map((box) => (
              <g key={box.label}>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={BOX_H}
                  rx={BOX_RX}
                  fill="var(--surface-hex)"
                  stroke="var(--border-emphasis-hex)"
                />
                <text
                  x={box.cx}
                  y={box.y + BOX_H / 2 + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--text-mono-hex)"
                  className="font-mono"
                >
                  {box.label}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
      <figcaption className="sr-only">{`${architecture.label}: ${walkthrough}.`}</figcaption>
    </figure>
  )
}
