import type { NavLink, Profile, SeoConfig } from '@/types'

/**
 * Identity, navigation, and every piece of chrome copy that is not a project,
 * an experience entry, or a skill. Editing this file never requires opening a
 * component.
 */

export const profile: Profile = {
  name: 'Sarvajith Sankar',
  wordmark: 'SARVAJITH',
  role: 'AI & Software Engineering',
  headline: ['Building systems where', 'language models become', 'intelligent agents.'],
  bio: 'CS student at VIT Vellore × IIT Madras. Interning at Maveric Systems building autonomous AI research agents with LangChain, LangGraph, and MCP. Contributing to LLM security infrastructure at TENET-AI.',
  location: 'Vellore / Chennai, India',
  email: 'sarvajith2knot8@gmail.com',
  links: {
    github: 'https://github.com/sarvajithsankar',
    linkedin: 'https://linkedin.com/in/sarvajithsankar',
    resume: '/resume.pdf',
  },
}

export const education = {
  line1: 'BTech Computer Engineering — VIT Vellore',
  line2: 'BS Data Science — IIT Madras',
  period: '2025–2029',
}

/**
 * `available: false` until `public/resume.pdf` exists. The button still renders
 * in both the navbar and the hero — it just carries a tooltip instead of a link
 * that 404s. Flip this to `true` and drop the PDF in `public/`; no component
 * changes required.
 */
export const resume = {
  href: profile.links.resume,
  available: false,
  unavailableTooltip: 'Resume coming soon',
} as const

export const navLinks: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

/** Replaces a "trusted by" logo row with an honest credibility signal. */
export const credibilityRow: string[] = [
  'Maveric Systems',
  'TENET-AI',
  'SSoC Season 5',
  'VIT Vellore',
  'IIT Madras',
  'Open Source',
]

export const sectionCopy = {
  heroEyebrow: '// AI & Software Engineering',
  heroPrimaryCta: 'View Work',
  heroSecondaryCta: "Let's Connect",
  workHeading: 'Selected Work',
  experienceHeading: 'Experience',
  skillsHeading: 'Technical Capabilities',
  buildingHeading: 'Currently Building',
  contactHeading: 'Have something interesting to build?',
  contactBody:
    "I'm open to internship opportunities, research collaborations, and interesting engineering problems. Best reached by email.",
} as const

/** Chrome for the project case study modal. */
export const caseStudy = {
  ariaLabel: 'Project details',
  closeLabel: 'Close project details',
  sections: {
    problem: { index: '01', heading: 'Problem' },
    built: { index: '02', heading: 'What I Built' },
    decisions: { index: '03', heading: 'Technical Decisions' },
    stack: { index: '04', heading: 'Stack' },
    links: { index: '05', heading: 'Links' },
  },
} as const

export const footerCopy = {
  copyright: '© 2026 Sarvajith Sankar',
  built: 'Built with Next.js · Deployed on Vercel',
} as const

export const seo: SeoConfig = {
  title: 'Sarvajith Sankar — AI & Software Engineering',
  description:
    'CS student at VIT Vellore and IIT Madras building autonomous AI agents, LLM security systems, and intelligent backends. AI Intern at Maveric Systems.',
  ogDescription: 'Building autonomous AI agents and LLM security infrastructure.',
  siteName: 'Sarvajith Sankar',
  url: 'https://portfolio-original-sigma.vercel.app',
  keywords: [
    'Sarvajith Sankar',
    'AI engineer',
    'LangChain',
    'LangGraph',
    'VIT Vellore',
    'IIT Madras',
    'portfolio',
  ],
  ogImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
}

/** Read by `AgentFlowDiagram` for its screen-reader description. */
export const diagramDescription =
  'Agent execution flow: user input passes to an LLM core, then an agent router, which fans out to Tavily, Wikipedia and arXiv tools, converges into memory and state, and emits structured output.'
