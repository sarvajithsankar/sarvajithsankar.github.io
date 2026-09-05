import type { FlowEdge, FlowNode } from '@/types'

/**
 * Geometry for the site's single visual motif: the agent execution flow.
 *
 *   [ User Input ] -> [ LLM Core ] -> [ Agent Router ]
 *        -> [ Tavily | Wikipedia | arXiv ]
 *        -> [ Memory / State ] -> [ Structured Output ]
 *
 * The three fan-out nodes are the real MCP clients wired up in the Maveric
 * research agent, so the diagram is a picture of actual work rather than
 * decoration.
 *
 * Canvas is 360 x 428 user units; the component scales it with CSS.
 */

export const FLOW_VIEW_BOX = '0 0 360 428'

const H = 34

export const flowNodes: FlowNode[] = [
  { id: 'input', label: 'User Input', x: 105, y: 8, width: 150, height: H },
  { id: 'llm', label: 'LLM Core', x: 115, y: 78, width: 130, height: H },
  { id: 'router', label: 'Agent Router', x: 105, y: 148, width: 150, height: H },
  { id: 'tavily', label: 'Tavily', x: 6, y: 232, width: 100, height: H },
  { id: 'wikipedia', label: 'Wikipedia', x: 130, y: 232, width: 100, height: H },
  { id: 'arxiv', label: 'arXiv', x: 254, y: 232, width: 100, height: H },
  { id: 'memory', label: 'Memory / State', x: 100, y: 316, width: 160, height: H },
  { id: 'output', label: 'Structured Output', x: 90, y: 386, width: 180, height: H },
]

export const flowEdges: FlowEdge[] = [
  { id: 'input-llm', d: 'M180 42 L180 78', source: 'input' },
  { id: 'llm-router', d: 'M180 112 L180 148', source: 'llm' },
  { id: 'router-tavily', d: 'M180 182 C180 207 56 207 56 232', source: 'router' },
  { id: 'router-wikipedia', d: 'M180 182 L180 232', source: 'router' },
  { id: 'router-arxiv', d: 'M180 182 C180 207 304 207 304 232', source: 'router' },
  { id: 'tavily-memory', d: 'M56 266 C56 291 180 291 180 316', source: 'tavily' },
  { id: 'wikipedia-memory', d: 'M180 266 L180 316', source: 'wikipedia' },
  { id: 'arxiv-memory', d: 'M304 266 C304 291 180 291 180 316', source: 'arxiv' },
  { id: 'memory-output', d: 'M180 350 L180 386', source: 'memory' },
]

/** Activation order for the looping highlight. */
export const flowSequence: string[] = flowNodes.map((node) => node.id)
