import type { ExperienceItem } from '@/types'

/**
 * Experience, newest first.
 *
 * Every bullet is a specific technical fact. No "responsible for", no passive
 * voice, and no outcome percentages that were never measured.
 *
 * The InAmigos Foundation entry is included with dates because they are on
 * record in this repository's history (`src/sections.tsx` at commit 0ea309b:
 * "Dec 2025 – Feb 2026"). Its two bullets are drawn from that same record,
 * with the unbacked "improving asset delivery speeds" claim removed.
 */

export const experience: ExperienceItem[] = [
  {
    id: 'maveric',
    company: 'Maveric Systems',
    role: 'AI Intern',
    period: 'JUNE 2026 — PRESENT',
    location: 'Chennai, India',
    bullets: [
      'Built an autonomous multi-step research agent on LangChain and LangGraph that orchestrates MCP-based tool calls across Tavily, Wikipedia, and arXiv, producing structured research documents without human intervention.',
      'Built a custom agent framework on the Deep Agents SDK — create_deep_agent over a FilesystemBackend, with a pluggable SKILL.md skill system and Gemini as the model backend.',
      'Designed the agent’s tool-routing layer so a source that returns no useful material re-routes the graph instead of failing the run.',
    ],
    tags: ['LangChain', 'LangGraph', 'MCP', 'Gemini'],
  },
  {
    id: 'tenet-ai',
    company: 'TENET-AI',
    role: 'SSoC Season 5 Contributor',
    period: '2026',
    location: 'Open Source · Remote',
    bullets: [
      'Contributing to defensive LLM security middleware. The FastAPI service sits in front of LLM endpoints and detects prompt injection, jailbreak attempts, and data-extraction patterns before they reach the model.',
      'Wired detection state through Redis and an append-only PostgreSQL audit trail, giving SOC-style visibility over attempted and blocked requests.',
      'Runs containerised on Docker and Kubernetes as part of the TENET-AI stack.',
    ],
    tags: ['FastAPI', 'Redis', 'PostgreSQL', 'Kubernetes'],
  },
  {
    id: 'inamigos',
    company: 'InAmigos Foundation',
    role: 'Web Developer Intern',
    period: 'DEC 2025 — FEB 2026',
    location: 'Remote',
    bullets: [
      'Built responsive user interfaces for the foundation’s web properties.',
      'Refactored legacy UI into modular, reusable components using modern ES6+ JavaScript.',
    ],
    tags: ['JavaScript', 'Responsive UI', 'Component Architecture'],
  },
]
