import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Reveal, SectionHead, SlashWord, usePRM } from './fx';

/* =========================================================
   ABOUT — classified document
========================================================= */
function Redact({ children }: { children: React.ReactNode }) {
  return <span className="redact">{children}</span>;
}

function GrowItem({ label, sub }: { label: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className={`grow-border ${inView ? 'grown' : ''} pl-4 py-3 bg-black/40 border border-[rgba(255,0,0,0.12)]`}>
      <div className="text-sm text-white font-semibold">{label}</div>
      <div className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-zinc-500 mt-1">{sub}</div>
    </div>
  );
}

function HexAvatar() {
  return (
    <div className="relative w-36 h-36 mx-auto">
      <div className="absolute inset-0" style={{ animation: 'spin360 26s linear infinite' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5" fill="none" stroke="rgba(255,0,51,0.7)" strokeWidth="1.6" style={{ filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.7))' }} />
        </svg>
      </div>
      <div className="absolute inset-[10%]" style={{ animation: 'spin360 40s linear infinite reverse' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5" fill="rgba(139,0,0,0.15)" stroke="rgba(255,0,51,0.35)" strokeWidth="1" strokeDasharray="4 3" />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-4xl red" style={{ textShadow: '0 0 20px rgba(255,0,51,0.8)' }}>SS</span>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          num="01"
          eyebrow="dossier"
          title={<>THE <SlashWord>OPERATOR</SlashWord></>}
          sub="Declassified on scroll. Hover the redacted bars — if you dare."
        />

        <div className="grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-3">
            <div className="glass-red p-8 md:p-10 h-full relative overflow-hidden">
              {/* classified watermark */}
              <motion.div
                initial={{ opacity: 0.45, rotate: -16, scale: 1.15 }}
                whileInView={{ opacity: 0.08, rotate: -18, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              >
                <span className="classified-stamp font-display text-5xl md:text-7xl red uppercase">Classified</span>
              </motion.div>

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">FILE #SS-2029 // PERSONNEL DOSSIER</span>
                  <span className="font-mono2 text-[10px] tracking-[0.2em] uppercase red">TOP SECRET</span>
                </div>

                <p className="text-zinc-200 text-lg md:text-xl leading-relaxed">
                  I'm a <span className="text-white font-semibold">second-year student</span> pursuing B.Tech in
                  Computer Science Engineering at <span className="text-white">VIT Vellore</span> while
                  simultaneously enrolled in a <span className="text-white">B.S. in Data Science at IIT Madras</span>.
                </p>
                <p className="dim mt-5 leading-relaxed">
                  I build real systems — not tutorial clones. My work includes an{' '}
                  <Redact>autonomous AI research agent</Redact> at Maveric Systems, a{' '}
                  <Redact>SIEM prototype in C++17</Redact>, a{' '}
                  <Redact>phishing URL detection ML system</Redact>, and a Gemini-powered AI campus
                  assistant. My trajectory points toward{' '}
                  <Redact>cloud-native cybersecurity</Redact>.
                </p>

                <div className="mt-9 grid sm:grid-cols-3 gap-3">
                  <GrowItem label="VIT Vellore" sub="B.Tech CSE" />
                  <GrowItem label="IIT Madras" sub="B.S. Data Science" />
                  <GrowItem label="Maveric Systems" sub="EX — AI Eng. Intern" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-2">
            <div className="glass-red p-8 h-full flex flex-col relative overflow-hidden">
              <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-3xl" style={{ background: 'rgba(139,0,0,0.4)' }} />
              <HexAvatar />
              <div className="mt-6 flex items-center justify-center gap-2 font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                <span className="rec-dot" /> subject: sankar, s.
              </div>

              <blockquote className="mt-6 text-lg md:text-xl font-light leading-relaxed text-zinc-200 flex-1">
                "Depth over breadth. I'd rather master three domains at the level where I can{' '}
                <span className="red font-medium">ship production systems</span>, than dabble in thirty."
              </blockquote>

              <div className="mt-6 pt-5 border-t border-[rgba(255,0,0,0.15)] grid grid-cols-2 gap-3 font-mono2 text-[10px] tracking-[0.18em] uppercase">
                <div><span className="text-zinc-600">threat model:</span> <span className="text-zinc-300">chaos</span></div>
                <div><span className="text-zinc-600">alignment:</span> <span className="red">systems</span></div>
                <div><span className="text-zinc-600">status:</span> <span className="text-zinc-300">second-year</span></div>
                <div><span className="text-zinc-600">danger lvl:</span> <span className="red">rising</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECTS — trace-beam cards with spotlights
========================================================= */
const PROJECTS = [
  {
    num: '001', title: 'Sentinel-Vault', badge: 'SYSTEM ACTIVE',
    blurb: 'High-performance SIEM prototype built from scratch in C++17.',
    body: 'Custom AVL Tree for O(log n) real-time IP blacklisting, Merge Sort for event timeline reconstruction, RAID 1 vault with automated mirror recovery.',
    tags: ['C++17', 'AVL Trees', 'RAID 1', 'Cybersecurity'],
  },
  {
    num: '002', title: 'Phishermen', badge: 'DEPLOYED',
    blurb: 'Full-stack ML phishing URL detector, live on Vercel.',
    body: 'Feature extraction pipeline with URL structure analysis, lexical & host-based signals. Deployed end-to-end for real-time classification.',
    tags: ['Python', 'ML', 'Vercel'],
  },
  {
    num: '003', title: 'VIT Smart Assistant', badge: 'SYSTEM ACTIVE',
    blurb: 'Gemini-powered campus chatbot with RAG architecture.',
    body: 'ChromaDB vector store, conversation memory, and a dark-mode Streamlit UI. Answers campus queries from curated documents with citations.',
    tags: ['Python', 'RAG', 'Gemini API'],
  },
  {
    num: '004', title: 'Customer Churn Prediction', badge: 'DEPLOYED',
    blurb: 'ML pipeline on a 7000+ record telecom dataset.',
    body: 'Gradient Boosting with 77% recall on the minority class. Built under IEEE CS VIT as a collaborative operation.',
    tags: ['Scikit-learn', 'Pandas', 'NumPy'],
  },
];

function ProjectCard({ p, idx }: { p: (typeof PROJECTS)[number]; idx: number }) {
  return (
    <Reveal delay={(idx % 2) * 0.1}>
      <div className="trace-wrap h-full">
        <div className="trace-beam" />
        <div className="proj-card glass-red p-7 md:p-8 h-full relative overflow-hidden" style={{ background: 'rgba(139,0,0,0.10)', boxShadow: 'inset 0 0 40px rgba(139,0,0,0.18), 0 0 30px rgba(139,0,0,0.15)' }}>
          <div className="spot" />
          {/* massive ghost number */}
          <span aria-hidden className="font-display absolute -top-5 right-2 text-[6.5rem] md:text-[7.5rem] leading-none select-none pointer-events-none" style={{ color: 'rgba(255,0,0,0.09)', textShadow: '0 0 40px rgba(139,0,0,0.4)' }}>
            {p.num}
          </span>

          <div className="relative">
            <div className="flex items-center justify-between mb-7">
              <span className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">OP-{p.num}</span>
              <span className="inline-flex items-center gap-2 font-mono2 text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 border border-[rgba(255,0,51,0.5)] text-[#ff5c5c] bg-black/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033] animate-ping" />
                {p.badge}
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-white">{p.title}</h3>
            <p className="red font-mono2 text-xs mt-2 tracking-wide">{p.blurb}</p>
            <p className="dim text-sm leading-relaxed mt-4">{p.body}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              {p.tags.map((t) => (
                <span key={t} className="tag-red font-mono2 text-[10px] px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
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
          num="02"
          eyebrow="arsenal"
          title={<>SELECTED <SlashWord>WEAPONS</SlashWord></>}
          sub="Systems I've actually shipped. Each one left a scar and taught me something a textbook never could."
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
   SKILLS — pulsing network graph
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
        ctx.strokeStyle = 'rgba(255,0,0,0.13)';
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
      }
    };

    const drawFrame = (now: number) => {
      drawBase();
      const hov = hoverRef.current;

      // traveling pulses along edges
      for (let e = 0; e < EDGES.length; e++) {
        const [a, b] = EDGES[e];
        const pa = pos(a), pb = pos(b);
        const t = ((now / 1000) * (0.22 + (e % 5) * 0.05) + e * 0.37) % 1;
        const px = pa.x + (pb.x - pa.x) * t;
        const py = pa.y + (pb.y - pa.y) * t;
        ctx.fillStyle = 'rgba(255,0,51,0.75)';
        ctx.beginPath(); ctx.arc(px, py, 1.6, 0, Math.PI * 2); ctx.fill();
      }

      // ripples
      ripplesRef.current = ripplesRef.current.filter((r) => now - r.t < 800);
      for (const r of ripplesRef.current) {
        const p = (now - r.t) / 800;
        ctx.strokeStyle = `rgba(255,0,51,${0.5 * (1 - p)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(r.x, r.y, 8 + p * 46, 0, Math.PI * 2); ctx.stroke();
      }

      // brighten hovered edges
      if (hov >= 0) {
        for (const [a, b] of EDGES) {
          if (a !== hov && b !== hov) continue;
          const pa = pos(a), pb = pos(b);
          ctx.strokeStyle = 'rgba(255,0,51,0.6)';
          ctx.shadowColor = '#ff0033'; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // nodes + labels
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      for (let i = 0; i < NODES.length; i++) {
        const p = pos(i);
        const isHov = i === hov;
        const isNeighbor = hov >= 0 && EDGES.some(([a, b]) => (a === hov && b === i) || (b === hov && a === i));
        const r = isHov ? 7 : isNeighbor ? 5 : 3.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHov ? '#ff0033' : isNeighbor ? 'rgba(255,0,51,0.9)' : 'rgba(255,0,51,0.55)';
        if (isHov) { ctx.shadowColor = '#ff0033'; ctx.shadowBlur = 18; }
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = 'rgba(255,0,51,0.35)';
        ctx.beginPath(); ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2); ctx.stroke();

        ctx.fillStyle = isHov ? '#ffffff' : isNeighbor ? '#ffb4b4' : 'rgba(220,220,230,0.72)';
        if (isHov) { ctx.shadowColor = '#ff0033'; ctx.shadowBlur = 10; }
        ctx.fillText(NODES[i].l, p.x, p.y + r + 16);
        ctx.shadowBlur = 0;
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
      let best = -1, bd = 26 * 26;
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
          num="03"
          eyebrow="armory"
          title={<>THE <SlashWord>ARSENAL</SlashWord></>}
          sub="A live network of everything I wield — hover a node and watch the infection spread."
        />
        <Reveal>
          <div ref={wrapRef} className="glass-red relative h-[440px] md:h-[540px] overflow-hidden" data-hover>
            <canvas ref={canvasRef} className="skill-canvas absolute inset-0" />
            <div className="absolute bottom-4 left-5 font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-600 flex items-center gap-2">
              <span className="rec-dot" /> 22 nodes // signal nominal
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE — self-drawing bloodline timeline
========================================================= */
const EXPERIENCE = [
  {
    role: 'AI Engineering Intern — EX', org: 'Maveric Systems Limited', loc: 'Chennai',
    date: 'Jun 2026', points: ['Autonomous AI research agent', 'Production ML systems'],
  },
  {
    role: 'Open Source Contributor · TENET-AI', org: 'SSoC Season 5', loc: 'Remote',
    date: 'May 2026 – Present', points: ['Contributing to open-source AI infrastructure'],
  },
  {
    role: 'Publicity & Marketing', org: 'graVITas VIT', loc: 'VIT Vellore',
    date: 'Apr 2026 – Present', points: ['Outreach for the flagship technical fest'],
  },
  {
    role: 'Junior Core Member', org: 'IEEE Computer Society VIT', loc: 'VIT Vellore',
    date: 'Jan 2026 – Present', points: ['Workshops, ML projects, peer learning'],
  },
  {
    role: 'Core Member & VP', org: 'Rotaract Club VIT + Bala Vidya Mandir', loc: 'VIT Vellore',
    date: 'Jan 2026 – Present', points: ['Community service and leadership'],
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
          num="04"
          eyebrow="rap sheet"
          title={<>BLOOD <SlashWord>TRAIL</SlashWord></>}
          sub="Where I've operated. The line draws itself — like it was always going to."
        />

        <div ref={trackRef} className="relative">
          {/* faint full-length glow */}
          <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px" style={{ background: 'rgba(139,0,0,0.35)', boxShadow: '0 0 14px rgba(139,0,0,0.5)' }} />
          {/* self-drawing bright line */}
          <motion.div
            className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] origin-top"
            style={{
              scaleY,
              background: 'linear-gradient(180deg, #8b0000, #ff0033, #ff0000)',
              boxShadow: '0 0 18px rgba(255,0,51,0.85)',
            }}
          />

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE.map((e, idx) => {
              const leftSide = idx % 2 === 0;
              return (
                <div key={idx} className="relative md:flex md:items-center">
                  {/* node */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.5, 1] }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="tl-dot absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: leftSide ? -80 : 80, boxShadow: '0 0 60px rgba(255,0,51,0.5)' }}
                    whileInView={{ opacity: 1, x: 0, boxShadow: '0 0 0px rgba(255,0,51,0)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
                    className={`ml-10 md:ml-0 md:w-[calc(50%-44px)] ${leftSide ? 'md:mr-auto md:text-right' : 'md:ml-auto'}`}
                  >
                    <div className={`glass-red p-6 md:p-7 hover:border-[rgba(255,0,51,0.5)] transition-colors ${leftSide ? 'md:[direction:rtl]' : ''}`}>
                      <div className="[direction:ltr]">
                        <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2 ${leftSide ? 'md:justify-end' : ''}`}>
                          <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide text-white">{e.role}</h3>
                          <span className="font-mono2 text-[10px] tracking-[0.2em] red whitespace-nowrap">{e.date}</span>
                        </div>
                        <div className={`text-sm mb-4 ${leftSide ? 'md:text-right' : ''}`}>
                          <span className="sweep-hl text-white font-medium inline-block">{e.org}</span>
                          <span className="dim"> · {e.loc}</span>
                        </div>
                        <ul className={`space-y-1.5 ${leftSide ? 'md:[&>li]:flex-row-reverse' : ''}`}>
                          {e.points.map((pt) => (
                            <li key={pt} className="dim text-sm flex items-start gap-2">
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
