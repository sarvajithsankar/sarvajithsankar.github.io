import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, SectionHead, SlashWord } from './fx';

/* =========================================================
   RESEARCH — semantic schema matching focus
 ========================================================= */
export function Research() {
  return (
    <section id="research" className="relative py-28 md:py-36 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          num="05"
          eyebrow="investigation"
          title={<>RESEARCH <SlashWord>INITIATIVES</SlashWord></>}
          sub="Automating schema alignments in federated data integrations using dense neural representations."
        />

        <div className="grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-3">
            <div className="glass-red p-8 md:p-10 h-full relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/10">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6 border-b border-zinc-800/40 pb-4">
                  <span className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">PROJECT: SEMANTIC SCHEMA MATCHING</span>
                  <span className="font-mono2 text-[9px] tracking-[0.2em] uppercase red font-semibold">ACTIVE INQUIRY</span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wide mb-4">
                  Federated Database Integration
                </h3>

                <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                  Heterogeneous database systems typically require manual schema matching, creating a massive data integration bottleneck. My research focuses on automating this virtual database layer mapping using pre-trained sentence transformer embeddings.
                </p>

                <p className="dim mt-4 leading-relaxed text-sm">
                  By mapping semantic contexts instead of syntactic string matching, the engine resolves synonyms and homonyms across database columns, achieving over 90% mapping precision. This approach reduces data integration overhead in federated data systems by bypassing manual mapping rules.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/30 border border-zinc-800/60 rounded-xl">
                    <div className="font-mono2 text-xs red uppercase mb-1">// architecture</div>
                    <div className="text-zinc-300 text-xs">Bi-encoder network matching column properties via dense vector similarity.</div>
                  </div>
                  <div className="p-4 bg-black/30 border border-zinc-800/60 rounded-xl">
                    <div className="font-mono2 text-xs red uppercase mb-1">// objective</div>
                    <div className="text-zinc-300 text-xs">Eliminate manual mapping rules in virtual schemas and data virtualization layers.</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-2">
            <div className="glass-red p-8 h-full flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/10">
              <div>
                <div className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-6 pb-2 border-b border-zinc-800/40">METHODOLOGY STACK</div>
                <div className="space-y-4">
                  {[
                    { title: 'Dense Representation', desc: 'Encoding column metadata and sample values into high-dimensional vector spaces.' },
                    { title: 'Cosine Similarity matching', desc: 'Evaluating similarity thresholds to automatically align federated schemas.' },
                    { title: 'Synonym Resolution', desc: 'Handling vocabulary mismatches (e.g., "customer_id" vs "client_no") out-of-the-box.' }
                  ].map((m, idx) => (
                    <div key={idx} className="border-l border-[#00f2fe] pl-4 py-1">
                      <div className="text-sm text-white font-semibold">{m.title}</div>
                      <div className="text-xs text-zinc-400 mt-1 leading-normal">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/40 flex items-center justify-between">
                <span className="font-mono2 text-[9px] tracking-[0.25em] uppercase text-zinc-500">scope: academic &amp; systems</span>
                <svg className="w-5 h-5 red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STATIC CODE EDITOR MOCKUP — clean profile config visual
 ========================================================= */
function CodeMockup() {
  return (
    <div className="relative w-full border border-zinc-800/80 rounded-2xl overflow-hidden bg-[#070912]/95 shadow-2xl">
      {/* header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/60 border-b border-zinc-900/80">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-3 font-mono2 text-[10px] tracking-[0.2em] uppercase text-zinc-500">
          sarvajith_config.json
        </span>
      </div>

      {/* editor space */}
      <div className="p-5 font-mono2 text-[12px] md:text-[13px] leading-relaxed overflow-x-auto text-[#9cdcfe]">
        <pre className="whitespace-pre">
          <span className="text-[#cccccc]">{'{'}</span>{'\n'}
          {'  '}<span className="text-[#9cdcfe]">"operator"</span><span className="text-[#cccccc]">:</span> <span className="text-[#ce9178]">"Sarvajith Sankar"</span><span className="text-[#cccccc]">,</span>{'\n'}
          {'  '}<span className="text-[#9cdcfe]">"education"</span><span className="text-[#cccccc]">: [</span><span className="text-[#ce9178]">"VIT Vellore"</span><span className="text-[#cccccc]">,</span> <span className="text-[#ce9178]">"IIT Madras"</span><span className="text-[#cccccc]">],</span>{'\n'}
          {'  '}<span className="text-[#9cdcfe]">"focus"</span><span className="text-[#cccccc]">: [</span><span className="text-[#ce9178]">"AI Agents"</span><span className="text-[#cccccc]">,</span> <span className="text-[#ce9178]">"ML Systems"</span><span className="text-[#cccccc]">,</span> <span className="text-[#ce9178]">"LLM Security"</span><span className="text-[#cccccc] Rhine">],</span>{'\n'}
          {'  '}<span className="text-[#9cdcfe]">"status"</span><span className="text-[#cccccc]">:</span> <span className="text-[#ce9178]">"active_development"</span><span className="text-[#cccccc]">,</span>{'\n'}
          {'  '}<span className="text-[#9cdcfe]">"metrics"</span><span className="text-[#cccccc]">: {`{`}</span>{'\n'}
          {'    '}<span className="text-[#9cdcfe]">"gpa"</span><span className="text-[#cccccc]">:</span> <span className="text-[#b5cea8]">8.2</span><span className="text-[#cccccc]">,</span>{'\n'}
          {'    '}<span className="text-[#9cdcfe]">"contributor"</span><span className="text-[#cccccc]">:</span> <span className="text-[#569cd6]">true</span>{'\n'}
          {'  '}<span className="text-[#cccccc]">{`}`}</span>{'\n'}
          <span className="text-[#cccccc]">{`}`}</span>
        </pre>
      </div>
    </div>
  );
}

/* =========================================================
   NOW — what building/learning/targeting (signals momentum)
 ========================================================= */
export function Now() {
  return (
    <section id="now" className="relative py-28 md:py-36 scroll-mt-20 topo">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          num="06"
          eyebrow="momentum"
          title={<>ACTIVE <SlashWord>VECTORS</SlashWord></>}
          sub="Current development tracks, study plans, and engineering targets."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* LEFT — current logs */}
          <Reveal>
            <div className="glass-red p-8 h-full flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/10">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
                    <h3 className="font-display text-lg uppercase tracking-wider text-white">1. BUILDING</h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed pl-5">
                    Expanding <span className="text-white font-semibold">TENET-AI</span> to support token-level streaming interception for real-time generative agents, while profiling latency overhead under load.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
                    <h3 className="font-display text-lg uppercase tracking-wider text-white">2. LEARNING</h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed pl-5">
                    Distributed inference serving topologies, Triton Inference Server integration, and low-level optimization using custom attention heads.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <h3 className="font-display text-lg uppercase tracking-wider text-white">3. TARGETING</h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed pl-5">
                    AI Engineering and Machine Learning Research positions at Tier 1 product companies (Google STEP, Microsoft Explore India, Goldman Sachs).
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-zinc-800/40 font-mono2 text-[9px] tracking-[0.25em] uppercase text-zinc-500">
                STATUS: ACTIVE DEVELOPMENT // STACK REINFORCEMENT
              </div>
            </div>
          </Reveal>

          {/* RIGHT — static code config view */}
          <Reveal delay={0.12}>
            <div className="h-full flex items-center justify-center">
              <CodeMockup />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT — clean communication channel list
 ========================================================= */
const CHANNELS = [
  {
    label: 'Direct Email', value: 'sarvajith2knot8@gmail.com', href: 'mailto:sarvajith2knot8@gmail.com',
    icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    label: 'LinkedIn Uplink', value: 'linkedin.com/in/sarvajithsankar', href: 'https://linkedin.com/in/sarvajithsankar',
    icon: <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />,
  },
  {
    label: 'GitHub Mainframe', value: 'github.com/sarvajithsankar', href: 'https://github.com/sarvajithsankar',
    icon: <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />,
  },
];

export function Contact() {
  const [launched, setLaunched] = useState(false);

  return (
    <section id="contact" className="relative py-28 md:py-36 scroll-mt-20 topo overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHead
          num="07"
          eyebrow="contact channel"
          title={<>OPEN A <SlashWord>CHANNEL</SlashWord></>}
          sub="Direct communication frequencies monitored regularly. Select a connection below."
          align="center"
        />

        <div className="space-y-4 max-w-xl mx-auto">
          {CHANNELS.map((ch, idx) => (
            <Reveal key={ch.label} delay={idx * 0.08}>
              <a
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="glass-red group flex items-center gap-5 p-5 hover:border-[rgba(0,242,254,0.45)] transition-colors rounded-xl border border-zinc-800 bg-zinc-900/10"
              >
                <span className="relative w-12 h-12 shrink-0 rounded-full border border-zinc-800 bg-black/40 flex items-center justify-center red">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5 relative">
                    {ch.icon}
                  </svg>
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-mono2 text-[9px] tracking-[0.3em] uppercase text-zinc-500">{ch.label}</span>
                  <span className="block text-white text-sm md:text-base truncate mt-1">{ch.value}</span>
                </span>
                <svg className="w-5 h-5 red opacity-0 group-hover:opacity-100 transition-opacity shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <a
            href="mailto:sarvajith2knot8@gmail.com"
            onClick={() => { setLaunched(true); window.setTimeout(() => setLaunched(false), 1400); }}
            className={`btn-void inline-flex items-center gap-4 px-8 py-4 font-mono2 text-xs tracking-[0.3em] uppercase rounded-xl ${launched ? 'launched' : ''}`}
          >
            Launch Message
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
 ========================================================= */
export function Footer() {
  return (
    <footer className="relative py-10 border-t border-zinc-800/80 bg-[#06070c]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
          <span className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-zinc-400">
            Designed &amp; built with precision <span className="red">·</span> VIT Vellore '29
          </span>
        </div>
        <div className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">
          © 2026 SANKAR <span className="red">//</span> NO MERCY FOR BAD UI
        </div>
      </div>
    </footer>
  );
}
