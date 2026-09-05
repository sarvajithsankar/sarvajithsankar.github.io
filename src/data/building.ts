import type { BuildingItem } from '@/types'

/**
 * Trajectory, not a skills list. No progress bars, no percentages, no
 * completion indicators — a status label and one honest sentence each.
 */

export const building: BuildingItem[] = [
  {
    id: 'agent-architectures',
    status: 'ACTIVE',
    title: 'Advanced Agent Architectures',
    description:
      'Deepening LangGraph expertise — stateful agents, multi-agent orchestration, and memory persistence strategies.',
  },
  {
    id: 'llm-security',
    status: 'ACTIVE',
    title: 'LLM Security',
    description:
      "Contributing to TENET-AI's detection pipeline. Studying the OWASP LLM Top 10 by implementing defenses, not reading theory.",
  },
  {
    id: 'systems-backend',
    status: 'LEARNING',
    title: 'Systems & Backend',
    description:
      'Reading "Designing Data-Intensive Applications". Building intuition for the tradeoffs that production backends make.',
  },
  {
    id: 'open-source',
    status: 'EXPLORING',
    title: 'Open Source Engineering',
    description:
      'Understanding how to contribute meaningfully to LLM tooling ecosystems beyond SSoC.',
  },
]
