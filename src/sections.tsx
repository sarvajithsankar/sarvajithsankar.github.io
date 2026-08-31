import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Reveal, SectionHead, SlashWord, usePRM } from './fx';

/* =========================================================
   ABOUT — clean credentials & profile overview
 ========================================================= */
function GrowItem({ label, sub }: { label: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className={`grow-border ${inView ? 'grown' : ''} pl-4 py-3 bg-black/20 border-l border-zinc-800`}>
      <div className="text-sm text-white font-semibold">{label}</div>
      <div className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-zinc-500 mt-1">{sub}</div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          num="01"
          eyebrow="overview"
          title={<>THE <SlashWord>ENGINEER</SlashWord></>}
          sub="CS Sophomore B.Tech B.S. dual degree building robust machine learning applications and scalable AI systems."
        />

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          <Reveal>
            <div className="glass-red p-8 md:p-10 h-full rounded-2xl relative overflow-hidden border border-zinc-800/80 bg-zinc-900/10">
              <div className="relative">
                <div className="flex items-center justify-between mb-6 border-b border-zinc-800/60 pb-4">
                  <span className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">OPERATOR DOSSIER // SARVAJITH SANKAR</span>
                  <span className="font-mono2 text-[10px] tracking-[0.2em] uppercase red">LEVEL-1 CORE</span>
                </div>

                <p className="text-zinc-200 text-lg md:text-xl leading-relaxed">
                  Dual Degree: B.Tech in <span className="text-white font-semibold">Computer Engineering at VIT Vellore</span> + B.S. in <span className="text-white font-semibold">Data Science at IIT Madras</span> (2025-2029, current CGPA ~8.2).
                </p>
                <p className="dim mt-4 leading-relaxed text-sm md:text-base">
                  I write production-grade code. Previously an AI Intern at Maveric Systems where I built autonomous multi-agent research architectures. Developed TENET-AI, an LLM prompt injection protection middleware, and engineered ML matching algorithms to automate column alignments in federated databases.
                </p>

                <div className="mt-8 grid sm:grid-cols-3 gap-4 border-t border-zinc-800/60 pt-6">
                  <GrowItem label="VIT Vellore" sub="B.Tech Computer Eng." />
                  <GrowItem label="IIT Madras" sub="B.S. Data Science" />
                  <GrowItem label="Maveric Systems" sub="AI Eng. Intern" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass-red p-8 h-full flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/10">
              <div>
                <span className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 block mb-4">ENGINEERING ETHOS</span>
                <blockquote className="text-lg md:text-xl font-light leading-relaxed text-zinc-200">
                  "I focus on shipping <span className="red font-medium">reliable systems</span> that solve complex backend, security, and machine learning problems, prioritizing depth and robust implementation."
                </blockquote>
              </div>

              <div className="mt-8 pt-5 border-t border-zinc-800/60 grid grid-cols-2 gap-3 font-mono2 text-[10px] tracking-[0.18em] uppercase">
                <div><span className="text-zinc-500">Focus:</span> <span className="text-zinc-300">AI / Systems</span></div>
                <div><span className="text-zinc-500">Alignment:</span> <span className="red">Systems</span></div>
                <div><span className="text-zinc-500">Status:</span> <span className="text-zinc-300">High Agency</span></div>
                <div><span className="text-zinc-500">CGPA:</span> <span className="red">~8.2</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE — clean chronicle timeline
 ========================================================= */
const EXPERIENCE = [
  {
    role: 'AI Engineering Intern', org: 'Maveric Systems Limited', loc: 'Chennai',
    date: 'Jun 2026 – Present', points: [
      'Architected and deployed an autonomous AI research agent using multi-source retrieval (RAG) and LLM orchestration.',
      'Designed custom context-aware agentic workflows to automate deep business and academic research, optimizing token usage.'
    ],
  },
  {
    role: 'Open Source Contributor', org: 'SSoC Season 5', loc: 'GitHub',
    date: 'May 2026 – Present', points: [
      'Built TENET-AI, a defensive security middleware for Large Language Models to shield APIs from prompt injection and jailbreaks.',
      'Implemented real-time semantic validation checkers and token-level input sanitizers to guard agentic execution pipelines.'
    ],
  },
  {
    role: 'Web Development Intern', org: 'InAmigos Foundation', loc: 'Remote',
    date: 'Dec 2025 – Feb 2026', points: [
      'Engineered and optimized highly responsive user interfaces, improving asset delivery speeds and overall rendering performance.',
      'Refactored legacy UI components into modular, reusable components using modern ES6+ Javascript standards.'
    ],
  },
  {
    role: 'Junior Core Member (ML Focus)', org: 'IEEE Computer Society VIT', loc: 'VIT Vellore',
    date: 'Jan 2026 – Present', points: [
      'Conducting technical workshops on neural network architectures, predictive modeling, and machine learning pipeline designs.',
      'Collaborated on ML prediction engines, including telecom customer churn predictive analytics.'
    ],
  },
  {
    role: 'Core Member & Vice President', org: 'Rotaract Club VIT / GDG / OWASP', loc: 'VIT Vellore',
    date: 'Jan 2026 – Present', points: [
      'Coordinating developer meetups, capture-the-flag (CTF) cybersecurity competitions, and technical publicity campaigns.',
      'Active leadership in community-driven dev events, including graVITas Publicity & Marketing Core operations.'
    ],
  },
];

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 0.78', 'end 0.55'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-28 md:py-36 scroll-mt-20 topo">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead
          num="02"
          eyebrow="record"
          title={<>WORK <SlashWord>HISTORY</SlashWord></>}
          sub="Professional background and technical operations."
        />

        <div ref={trackRef} className="relative">
          <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-zinc-800" />
          <motion.div
            className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              scaleY,
              background: 'linear-gradient(180deg, #a855f7, #00f2fe)',
              boxShadow: '0 0 10px rgba(0,242,254,0.4)',
            }}
          />

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE.map((e, idx) => {
              const leftSide = idx % 2 === 0;
              return (
                <div key={idx} className="relative md:flex md:items-center">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="tl-dot absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: leftSide ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`ml-10 md:ml-0 md:w-[calc(50%-40px)] ${leftSide ? 'md:mr-auto md:text-right' : 'md:ml-auto'}`}
                  >
                    <div className={`glass-red p-6 rounded-xl hover:border-zinc-700 transition-colors ${leftSide ? 'md:[direction:rtl]' : ''}`}>
                      <div className="[direction:ltr]">
                        <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1 ${leftSide ? 'md:justify-end' : ''}`}>
                          <h3 className="font-display text-lg md:text-xl uppercase tracking-wide text-white font-semibold">{e.role}</h3>
                          <span className="font-mono2 text-[10px] tracking-[0.15em] red whitespace-nowrap">{e.date}</span>
                        </div>
                        <div className={`text-xs mb-3 ${leftSide ? 'md:text-right' : ''}`}>
                          <span className="sweep-hl text-white font-medium inline-block">{e.org}</span>
                          <span className="dim"> · {e.loc}</span>
                        </div>
                        <ul className={`space-y-1.5 ${leftSide ? 'md:[&>li]:flex-row-reverse' : ''}`}>
                          {e.points.map((pt) => (
                            <li key={pt} className="dim text-xs md:text-sm flex items-start gap-2">
                              <span className="red mt-0.5">▸</span><span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECTS — clean glassmorphic pods
 ========================================================= */
const PROJECTS = [
  {
    num: '001', title: 'TENET-AI', badge: 'ACTIVE MIDWARE',
    blurb: 'Defensive security middleware protecting LLM endpoints.',
    body: 'Built real-time validation pipelines, semantic jailbreak detectors, and token-level input sanitizers to shield generative AI APIs from injection attacks.',
    tags: ['Python', 'LLM Security', 'Middleware', 'Regex'],
    github: 'https://github.com/sarvajithsankar/TENET-AI',
    demo: 'https://github.com/sarvajithsankar/TENET-AI'
  },
  {
    num: '002', title: 'RAG Assistant', badge: 'DEPLOYED',
    blurb: 'Document Q&A assistant leveraging vector embeddings.',
    body: 'Integrated Gemini API with ChromaDB vector store and Streamlit interface, enabling semantically-accurate document retrieval with verified citations.',
    tags: ['Python', 'Gemini API', 'ChromaDB', 'Streamlit'],
    github: 'https://github.com/sarvajithsankar/RAG-Assistant',
    demo: 'https://github.com/sarvajithsankar/RAG-Assistant'
  },
  {
    num: '003', title: 'Semantic Schema Matcher', badge: 'RESEARCH PROTOTYPE',
    blurb: 'Automated column mapping engine for database integration.',
    body: 'Utilized sentence embeddings and semantic matching algorithms to automate column mapping across heterogeneous schemas, bypassing manual integration overhead.',
    tags: ['Python', 'PyTorch', 'Embeddings', 'SQL'],
    github: 'https://github.com/sarvajithsankar/schema-matching',
    demo: 'https://github.com/sarvajithsankar/schema-matching'
  },
  {
    num: '004', title: 'Engagement Predictor', badge: 'DEPLOYED',
    blurb: 'Audience engagement forecasting tool for short-form media.',
    body: 'Engineered a machine learning pipeline using XGBoost and Scikit-learn to analyze visual, audio, and metadata features from short-form video datasets.',
    tags: ['Python', 'ML', 'Scikit-learn', 'XGBoost'],
    github: 'https://github.com/sarvajithsankar/video-engagement',
    demo: 'https://github.com/sarvajithsankar/video-engagement'
  },
];

function ProjectCard({ p, idx }: { p: (typeof PROJECTS)[number]; idx: number }) {
  return (
    <Reveal delay={(idx % 2) * 0.1}>
      <div className="proj-card glass-red p-6 rounded-2xl h-full flex flex-col justify-between border border-zinc-800/80 bg-zinc-900/10">
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-zinc-800/40 pb-3">
            <span className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-zinc-500">PROJECT-{p.num}</span>
            <span className="inline-flex items-center gap-1.5 font-mono2 text-[9px] tracking-[0.15em] uppercase text-[#6be5ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
              {p.badge}
            </span>
          </div>

          <h3 className="font-display text-xl uppercase tracking-wide text-white font-semibold">{p.title}</h3>
          <p className="red font-mono2 text-[11px] mt-1.5 tracking-wide">{p.blurb}</p>
          <p className="dim text-xs md:text-sm leading-relaxed mt-3">{p.body}</p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {p.tags.map((t) => (
              <span key={t} className="tag-red font-mono2 text-[9px] px-2.5 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6 justify-end items-center">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 border border-zinc-800 hover:border-zinc-700 bg-black/30 rounded-lg text-zinc-400 hover:text-[#00f2fe] transition-colors"
              aria-label="GitHub Repository"
              data-hover
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 border border-zinc-800 hover:border-zinc-700 bg-black/30 rounded-lg text-zinc-400 hover:text-[#a855f7] transition-colors"
              aria-label="Live Demo"
              data-hover
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36 scroll-mt-20 topo">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          num="03"
          eyebrow="arsenal"
          title={<>PROJECTS &amp; <SlashWord>WEAPONS</SlashWord></>}
          sub="Production-grade AI applications and pipeline modules."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, idx) => (
            <ProjectCard key={p.num} p={p} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SKILLS & CREDENTIALS — network graph + credentials grid
 ========================================================= */
const NODES: Array<{ l: string; x: number; y: number; g: number }> = [
  { l: 'C', x: 0.09, y: 0.30, g: 0 }, { l: 'C++17', x: 0.17, y: 0.46, g: 0 },
  { l: 'Python', x: 0.08, y: 0.62, g: 0 }, { l: 'JavaScript', x: 0.18, y: 0.76, g: 0 },
  { l: 'SQL', x: 0.07, y: 0.88, g: 0 },
  { l: 'LangChain', x: 0.76, y: 0.16, g: 1 }, { l: 'LangGraph', x: 0.90, y: 0.24, g: 1 },
  { l: 'Scikit-learn', x: 0.66, y: 0.27, g: 1 }, { l: 'Pandas', x: 0.85, y: 0.38, g: 1 },
  { l: 'NumPy', x: 0.70, y: 0.42, g: 1 },
  { l: 'FastAPI', x: 0.40, y: 0.84, g: 2 }, { l: 'Streamlit', x: 0.55, y: 0.90, g: 2 },
  { l: 'GCP', x: 0.28, y: 0.90, g: 2 }, { l: 'Git', x: 0.66, y: 0.80, g: 2 },
  { l: 'DSA', x: 0.38, y: 0.32, g: 3 }, { l: 'OOP', x: 0.52, y: 0.24, g: 3 },
  { l: 'OS', x: 0.31, y: 0.52, g: 3 }, { l: 'DBMS', x: 0.47, y: 0.56, g: 3 },
  { l: 'Networking', x: 0.58, y: 0.44, g: 3 },
  { l: 'Threat Analysis', x: 0.84, y: 0.60, g: 4 }, { l: 'SIEM', x: 0.91, y: 0.74, g: 4 },
  { l: 'Anti-Phishing', x: 0.80, y: 0.88, g: 4 },
];

const EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [5, 6], [5, 7], [7, 8], [7, 9], [6, 8],
  [10, 11], [12, 10], [13, 11], [13, 10],
  [14, 15], [14, 16], [16, 17], [17, 18], [15, 18], [14, 17],
  [19, 20], [20, 21], [19, 21],
  [2, 7], [2, 9], [1, 14], [4, 17], [18, 19], [8, 10], [15, 5], [16, 18],
];

const CERTS = [
  {
    title: 'Mastercard Cybersecurity', issuer: 'Forage', date: 'MAY 2026', icon: 'SHIELD',
    back: 'Simulated threat analysis, security posture auditing and incident response plans.',
  },
  {
    title: 'Intro to Cybersecurity', issuer: 'Cisco', date: 'APR 2026', icon: 'LOCK',
    back: 'Foundations of network security architectures, cryptography, and systems vulnerability assessment.',
  },
  {
    title: 'Open Source Contributor', issuer: 'SSoC S5', date: '2026', icon: 'FORK',
    back: 'Contributed to defensive LLM security middleware infrastructure (TENET-AI) for Social Summer of Code.',
  },
  {
    title: 'Pandas Certification', issuer: 'Kaggle', date: '2026', icon: 'FRAME',
    back: 'Data analysis pipelines, matrix manipulation, indexing, and feature engineering.',
  },
  {
    title: 'Cloud Foundations', issuer: 'Google Cloud', date: '2026', icon: 'CLOUD',
    back: 'GCP core infrastructure: Identity and Access Management (IAM), Compute Engine, BigQuery, and networking architectures.',
  },
  {
    title: 'Cloud & Verizon Sim.', issuer: 'Forage', date: '2026', icon: 'TOWER',
    back: 'Architected enterprise cloud migrations and load-balanced network infrastructures.',
  },
];

function CertIcon({ kind }: { kind: string }) {
  const paths: Record<string, React.ReactNode> = {
    SHIELD: <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" strokeLinejoin="round" />,
    LOCK: <><rect x="4" y="11" width="16" height="10" rx="1" /><path d="M8 11V7a4 4 0 018 0v4" /></>,
    FORK: <><circle cx="6" cy="5" r="2.2" /><circle cx="18" cy="5" r="2.2" /><circle cx="12" cy="19" r="2.2" /><path d="M6 7.2V10a3 3 0 003 3h6a3 3 0 003-3V7.2M12 13v3.8" strokeLinecap="round" /></>,
    FRAME: <><path d="M3 3v18h18" strokeLinecap="round" /><path d="M7 14l4-4 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" /></>,
    CLOUD: <path d="M17.5 19a4.5 4.5 0 000-9 6 6 0 00-11.7 1.7A4 4 0 006 19h11.5z" strokeLinejoin="round" />,
    TOWER: <><path d="M12 21V9M12 9l-5 12M12 9l5 12" strokeLinecap="round" /><path d="M7.5 4.5a7 7 0 019 0M9.3 6.8a4 4 0 015.4 0" strokeLinecap="round" /><circle cx="12" cy="9" r="1.4" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      {paths[kind]}
    </svg>
  );
}

function Seal() {
  return (
    <svg viewBox="0 0 80 80" className="w-14 h-14 opacity-10" aria-hidden>
      <circle cx="40" cy="40" r="36" fill="none" stroke="#00f2fe" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="40" y="37" textAnchor="middle" fill="#00f2fe" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1">VERIFIED</text>
      <text x="40" y="47" textAnchor="middle" fill="#00f2fe" fontSize="6" fontFamily="JetBrains Mono, monospace">SS·2029</text>
    </svg>
  );
}

function CertCard({ c, idx }: { c: (typeof CERTS)[number]; idx: number }) {
  return (
    <Reveal delay={(idx % 3) * 0.08}>
      <div className="flip-card h-52">
        <div className="flip-inner">
          {/* FRONT */}
          <div className="flip-face glass-red holo-on relative p-5 flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/10">
            <div className="holo" />
            <div className="absolute -top-2 -right-2"><Seal /></div>
            <div>
              <div className="w-10 h-10 rounded-lg border border-zinc-800 bg-black/40 flex items-center justify-center red mb-4">
                <CertIcon kind={c.icon} />
              </div>
              <h3 className="font-display text-base uppercase tracking-wide text-white leading-snug font-semibold">{c.title}</h3>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-800/40 pt-3">
              <span className="font-mono2 text-[9px] tracking-[0.2em] uppercase text-zinc-500">{c.issuer}</span>
              <span className="font-mono2 text-[9px] tracking-[0.15em] red">{c.date}</span>
            </div>
          </div>
          {/* BACK */}
          <div className="flip-face flip-back glass-red p-5 flex flex-col justify-between relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/20" style={{ background: 'rgba(10,15,30,0.3)' }}>
            <div>
              <div className="font-mono2 text-[9px] tracking-[0.25em] uppercase red mb-2">// credentials</div>
              <p className="text-zinc-300 text-xs leading-relaxed">{c.back}</p>
            </div>
            <div className="flex items-end justify-between border-t border-zinc-800/40 pt-3">
              <span className="font-mono2 text-[9px] tracking-[0.15em] uppercase text-zinc-500">{c.issuer}</span>
              <span className="stamp">VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Skills() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(-1);
  const ripplesRef = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const prm = usePRM();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;

    const pos = (i: number) => ({
      x: NODES[i].x * (w - 80) + 40,
      y: NODES[i].y * (h - 70) + 30,
    });

    const build = () => {
      w = wrap.offsetWidth; h = wrap.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    build();

    const drawBase = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (const [a, b] of EDGES) {
        const pa = pos(a), pb = pos(b);
        ctx.strokeStyle = 'rgba(0,242,254,0.06)';
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
      }
    };

    const drawFrame = (now: number) => {
      drawBase();
      const hov = hoverRef.current;

      for (let e = 0; e < EDGES.length; e++) {
        const [a, b] = EDGES[e];
        const pa = pos(a), pb = pos(b);
        const t = ((now / 1000) * (0.2 + (e % 5) * 0.04) + e * 0.3) % 1;
        const px = pa.x + (pb.x - pa.x) * t;
        const py = pa.y + (pb.y - pa.y) * t;
        ctx.fillStyle = 'rgba(168,85,247,0.5)';
        ctx.beginPath(); ctx.arc(px, py, 1.2, 0, Math.PI * 2); ctx.fill();
      }

      ripplesRef.current = ripplesRef.current.filter((r) => now - r.t < 800);
      for (const r of ripplesRef.current) {
        const p = (now - r.t) / 800;
        ctx.strokeStyle = `rgba(0,242,254,${0.35 * (1 - p)})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(r.x, r.y, 6 + p * 36, 0, Math.PI * 2); ctx.stroke();
      }

      if (hov >= 0) {
        for (const [a, b] of EDGES) {
          if (a !== hov && b !== hov) continue;
          const pa = pos(a), pb = pos(b);
          ctx.strokeStyle = 'rgba(0,242,254,0.3)';
          ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
        }
      }

      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      for (let i = 0; i < NODES.length; i++) {
        const p = pos(i);
        const isHov = i === hov;
        const isNeighbor = hov >= 0 && EDGES.some(([a, b]) => (a === hov && b === i) || (b === hov && a === i));
        const r = isHov ? 5.5 : isNeighbor ? 4 : 3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHov ? '#00f2fe' : isNeighbor ? 'rgba(0,242,254,0.7)' : 'rgba(168,85,247,0.5)';
        ctx.fill();

        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.beginPath(); ctx.arc(p.x, p.y, r + 3, 0, Math.PI * 2); ctx.stroke();

        ctx.fillStyle = isHov ? '#ffffff' : isNeighbor ? '#d2f8ff' : 'rgba(200,200,210,0.65)';
        ctx.fillText(NODES[i].l, p.x, p.y + r + 13);
      }
    };

    if (prm) {
      drawFrame(0);
      const onR = () => { build(); drawFrame(0); };
      window.addEventListener('resize', onR);
      return () => window.removeEventListener('resize', onR);
    }

    let raf = 0;
    const loop = (now: number) => { drawFrame(now); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let best = -1, bd = 24 * 24;
      for (let i = 0; i < NODES.length; i++) {
        const p = pos(i);
        const d = (p.x - mx) * (p.x - mx) + (p.y - my) * (p.y - my);
        if (d < bd) { bd = d; best = i; }
      }
      if (best !== hoverRef.current) {
        hoverRef.current = best;
        if (best >= 0) {
          const p = pos(best);
          ripplesRef.current.push({ x: p.x, y: p.y, t: performance.now() });
        }
      }
    };
    const onLeave = () => { hoverRef.current = -1; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const onResize = () => build();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [prm]);

  return (
    <section id="skills" className="relative py-28 md:py-36 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          num="04"
          eyebrow="armory"
          title={<>THE <SlashWord>ARSENAL</SlashWord></>}
          sub="Interactive semantic network of technologies and frameworks. Hover nodes to view connection trails."
        />
        <Reveal>
          <div ref={wrapRef} className="glass-red relative h-[400px] md:h-[480px] overflow-hidden mb-16 rounded-2xl border border-zinc-800/80 bg-zinc-900/10" data-hover>
            <canvas ref={canvasRef} className="skill-canvas absolute inset-0" />
            <div className="absolute bottom-4 left-5 font-mono2 text-[9px] tracking-[0.25em] uppercase text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" /> 22 nodes // online
            </div>
          </div>
        </Reveal>

        {/* Credentials subsection */}
        <div className="mt-24">
          <div className="font-mono2 text-[10px] md:text-[11px] tracking-[0.3em] uppercase red mb-6 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-[#00f2fe]" />
            {'//'} certifications
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTS.map((c, idx) => (
              <CertCard key={c.title} c={c} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
