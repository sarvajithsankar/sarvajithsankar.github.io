import type { SkillCategory } from '@/types'

/**
 * Capability map.
 *
 * Every entry is tied to something real in `projects.ts` or `experience.ts` —
 * that is the inclusion test. No rating bars, no percentages, and nothing here
 * that a project does not back up. HTML, CSS, and JavaScript are deliberately
 * absent as standalone entries: they are implied by everything above them.
 */

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-agents',
    label: 'AI / AGENTS',
    skills: [
      { name: 'LangChain', detail: 'Used in production at Maveric for agent orchestration.' },
      { name: 'LangGraph', detail: 'Stateful multi-step agent graphs with conditional routing.' },
      { name: 'MCP (Model Context Protocol)', detail: 'Tool-calling integration with external APIs.' },
      { name: 'Deep Agents SDK', detail: 'Custom agent framework development with pluggable skills.' },
      { name: 'LLM APIs (Gemini, OpenAI-compatible)', detail: 'Integration and prompt engineering.' },
    ],
  },
  {
    id: 'security-backend',
    label: 'SECURITY / BACKEND',
    skills: [
      { name: 'FastAPI', detail: 'LLM middleware services at TENET-AI.' },
      { name: 'Redis / PostgreSQL', detail: 'Detection state and audit persistence layers.' },
      { name: 'Docker / Kubernetes', detail: 'Containerisation for the TENET-AI stack.' },
      { name: 'Prompt injection detection', detail: 'Pattern-based and ML-based classification.' },
    ],
  },
  {
    id: 'data-ml',
    label: 'DATA / ML',
    skills: [
      { name: 'Gradient boosting', detail: 'Churn prediction at 77% recall.' },
      { name: 'Isolation Forest', detail: 'Anomaly detection in Phishermen.' },
      { name: 'ChromaDB + Gemini embeddings', detail: 'RAG pipeline construction.' },
      { name: 'Python', detail: 'Primary language across every project here.' },
    ],
  },
  {
    id: 'systems',
    label: 'SYSTEMS',
    skills: [
      { name: 'C++17', detail: 'SIEM prototype (Sentinel-Vault), AVL trees, RAID simulation.' },
      { name: 'Data structures', detail: 'AVL trees and Merge Sort at implementation level.' },
    ],
  },
  {
    id: 'web-tools',
    label: 'WEB / TOOLS',
    skills: [
      { name: 'Next.js / React', detail: 'This portfolio.' },
      { name: 'Flask', detail: 'Lightweight Python web services.' },
      { name: 'Git / GitHub', detail: 'Version control and open-source contribution workflow.' },
      { name: 'Streamlit', detail: 'ML app prototyping.' },
    ],
  },
]
