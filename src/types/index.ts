/**
 * Shared domain types for the portfolio.
 *
 * Every content file in `src/data/` is typed against these interfaces so that
 * copy can be edited without touching a component — and so a missing field is a
 * compile error rather than a runtime blank.
 */

export type ExternalLinkKind = 'github' | 'website' | 'mail'

export interface ExternalLinkData {
  /** Visible label, e.g. "GitHub" or "Case Study". */
  label: string
  href: string
  kind: ExternalLinkKind
}

/** A row of the per-project architecture diagram. One node = full width,
 *  two or three nodes fan out side by side. */
export interface ArchitectureLayer {
  id: string
  /** Optional mono caption rendered above the layer's boxes. */
  caption?: string
  nodes: string[]
}

export interface ProjectArchitecture {
  /** Mono label shown in the diagram header, e.g. "REQUEST PATH". */
  label: string
  layers: ArchitectureLayer[]
}

export interface Project {
  slug: string
  name: string
  /** `featured` renders a large card + modal case study; `personal` renders compact. */
  tier: 'featured' | 'personal'
  /** Mono context line, e.g. "MAVERIC SYSTEMS". */
  context: string
  year: string
  category: string
  summary: string
  tags: string[]
  problem: string
  built: string[]
  decisions: string[]
  stack: string[]
  links: ExternalLinkData[]
  /** Shown in the case study when `links` is empty, explaining why. */
  noPublicRepoNote?: string
  /** Present only where a real architecture is worth drawing. */
  architecture?: ProjectArchitecture
  /** A real, stated metric. Only the churn project has one. */
  metric?: { value: string; label: string }
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  /** ISO-ish label rendered in mono. Empty string renders no date at all. */
  period: string
  location: string
  bullets: string[]
  tags: string[]
}

export interface Skill {
  name: string
  /** Honest, specific description of level or actual use. Never a rating. */
  detail: string
}

export interface SkillCategory {
  id: string
  /** Mono category identifier, e.g. "AI / AGENTS". */
  label: string
  skills: Skill[]
}

export type BuildingStatus = 'ACTIVE' | 'LEARNING' | 'EXPLORING'

export interface BuildingItem {
  id: string
  status: BuildingStatus
  title: string
  description: string
}

export interface NavLink {
  label: string
  href: string
}

export interface Profile {
  name: string
  /** Navbar wordmark — plain text, never an image. */
  wordmark: string
  role: string
  headline: string[]
  bio: string
  location: string
  email: string
  links: {
    github: string
    linkedin: string
    resume: string
  }
}

/** A box in the AgentFlowDiagram. Coordinates are in SVG user units. */
export interface FlowNode {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
}

/** A connector in the AgentFlowDiagram. `source` names the node whose activation
 *  lights this edge during the loop. */
export interface FlowEdge {
  id: string
  /** SVG path data. */
  d: string
  source: string
}

export interface SeoConfig {
  title: string
  description: string
  ogDescription: string
  siteName: string
  url: string
  keywords: string[]
  ogImage: string
  ogImageWidth: number
  ogImageHeight: number
}
