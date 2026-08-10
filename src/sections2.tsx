import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Reveal, SectionHead, SlashWord, usePRM } from './fx';

/* =========================================================
   CERTIFICATIONS — holographic foil + 3D flip + VERIFIED stamp
========================================================= */
const CERTS = [
  {
    title: 'Mastercard Cybersecurity', issuer: 'Forage', date: 'MAY 2026', icon: 'SHIELD',
    back: 'Job simulation covering threat analysis, security posture and incident response workflows.',
  },
  {
    title: 'Intro to Cybersecurity', issuer: 'Cisco', date: 'APR 2026', icon: 'LOCK',
    back: 'Foundations of network security, cryptography, and risk management.',
  },
  {
    title: 'Open Source Contributor', issuer: 'SSoC S5', date: '2026', icon: 'FORK',
    back: 'Contributing to open-source AI infrastructure as part of Social Summer of Code Season 5.',
  },
  {
    title: 'Pandas Certification', issuer: 'Kaggle', date: '2026', icon: 'FRAME',
    back: 'Data manipulation, grouping, indexing, and advanced DataFrame operations.',
  },
  {
    title: 'Cloud Foundations', issuer: 'Google Cloud', date: '2026', icon: 'CLOUD',
    back: 'GCP core services: Compute, Storage, IAM, networking, and billing fundamentals.',
  },
  {
    title: 'Cloud & Verizon Sim.', issuer: 'Forage', date: '2026', icon: 'TOWER',
    back: 'Cloud architecture simulation covering infrastructure design and migration planning.',
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      {paths[kind]}
    </svg>
  );
}

function Seal() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-15" aria-hidden>
      <circle cx="40" cy="40" r="36" fill="none" stroke="#ff0033" strokeWidth="2" strokeDasharray="5 3" />
      <circle cx="40" cy="40" r="27" fill="none" stroke="#ff0033" strokeWidth="1" />
      <text x="40" y="37" textAnchor="middle" fill="#ff0033" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1">VERIFIED</text>
      <text x="40" y="49" textAnchor="middle" fill="#ff0033" fontSize="7" fontFamily="JetBrains Mono, monospace">SS·2029</text>
    </svg>
  );
}

function CertCard({ c, idx }: { c: (typeof CERTS)[number]; idx: number }) {
  return (
    <Reveal delay={(idx % 3) * 0.08}>
      <div className="flip-card h-60">
        <div className="flip-inner">
          {/* FRONT */}
          <div className="flip-face glass-red holo-on relative p-6 flex flex-col justify-between overflow-hidden">
            <div className="holo" />
            <div className="absolute -top-3 -right-3"><Seal /></div>
            <div>
              <div className="w-12 h-12 rounded-sm border border-[rgba(255,0,51,0.5)] bg-black/50 flex items-center justify-center red mb-5" style={{ boxShadow: '0 0 18px rgba(255,0,51,0.25), inset 0 0 10px rgba(139,0,0,0.3)' }}>
                <CertIcon kind={c.icon} />
              </div>
              <h3 className="font-display text-xl uppercase tracking-wide text-white leading-snug">{c.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-zinc-500">{c.issuer}</span>
              <span className="font-mono2 text-[10px] tracking-[0.2em] red">{c.date}</span>
            </div>
          </div>
          {/* BACK */}
          <div className="flip-face flip-back glass-red p-6 flex flex-col justify-between relative overflow-hidden" style={{ background: 'rgba(139,0,0,0.16)' }}>
            <div>
              <div className="font-mono2 text-[10px] tracking-[0.35em] uppercase red mb-4">// intel</div>
              <p className="text-zinc-200 text-sm leading-relaxed">{c.back}</p>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-zinc-500">{c.issuer}</span>
              <span className="stamp heartbeat">VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Certifications() {
  return (
    <section id="certs" className="relative py-28 md:py-36 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          num="05"
          eyebrow="clearance stamps"
          title={<>PROOF OF <SlashWord>POWER</SlashWord></>}
          sub="Hover to flip the file. The back is where the truth lives."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTS.map((c, idx) => (
            <CertCard key={c.title} c={c} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TERMINAL — classified government database breach
========================================================= */
const BOOT_LINES: Array<{ t: string; d: number; bright?: boolean }> = [
  { t: 'SANKAR SECURE BIOS v6.6.6 — COLD BOOT', d: 260 },
  { t: 'CPU ......... QUANTUM-CORE X99 @ 5.8GHz   [OK]', d: 200 },
  { t: 'MEM ......... 64GB DDR5 ECC               [OK]', d: 180 },
  { t: 'GPU ......... RTX — RED TEAM EDITION      [OK]', d: 180 },
  { t: 'NET ......... DARKNET UPLINK              [OK]', d: 240 },
  { t: 'ACCESSING SECURE SERVER...', d: 620 },
  { t: 'AUTHENTICATION REQUIRED...', d: 700 },
  { t: '>>> ACCESS GRANTED <<<', d: 480, bright: true },
];

const PROFILE_JSON = `{
  "name": "Sarvajith Sankar",
  "college": ["VIT Vellore", "IIT Madras"],
  "focus": ["AI", "Cybersecurity", "Cloud"],
  "projects": 4,
  "status": "building",
  "grad_year": 2029
}`;
const CMD = 'cat profile.json';

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-90px' });
  const prm = usePRM();

  const [bootIdx, setBootIdx] = useState(0);
  const [granted, setGranted] = useState(false);
  const [errFlash, setErrFlash] = useState<string | null>(null);
  const [termOn, setTermOn] = useState(false);
  const [cmd, setCmd] = useState('');
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  const err2 = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (prm) {
      setBootIdx(BOOT_LINES.length); setGranted(true); setTermOn(true);
      setCmd(CMD); setOut(PROFILE_JSON); setDone(true);
      return;
    }
    if (bootIdx < BOOT_LINES.length) {
      const t = window.setTimeout(() => setBootIdx((i) => i + 1), BOOT_LINES[bootIdx].d);
      return () => window.clearTimeout(t);
    }
    if (!granted) {
      const t = window.setTimeout(() => setGranted(true), 500);
      return () => window.clearTimeout(t);
    }
  }, [inView, bootIdx, granted, prm]);

  useEffect(() => {
    if (!granted || prm) return;
    setErrFlash('ERR 0x2F :: HANDSHAKE DROPPED — REROUTING VIA NODE-7');
    const t = window.setTimeout(() => setErrFlash(null), 950);
    const t2 = window.setTimeout(() => setTermOn(true), 700);
    return () => { window.clearTimeout(t); window.clearTimeout(t2); };
  }, [granted, prm]);

  useEffect(() => {
    if (!termOn || done || prm) return;
    if (cmd.length < CMD.length) {
      const t = window.setTimeout(() => setCmd(CMD.slice(0, cmd.length + 1)), 70);
      return () => window.clearTimeout(t);
    }
  }, [termOn, cmd, done, prm]);

  useEffect(() => {
    if (cmd !== CMD || done || prm) return;
    if (out.length < PROFILE_JSON.length) {
      if (!err2.current && out.length > 140) {
        err2.current = true;
        setErrFlash('WARN :: PACKET LOSS 0.003% — BUFFERING');
        window.setTimeout(() => setErrFlash(null), 700);
      }
      const t = window.setTimeout(() => setOut(PROFILE_JSON.slice(0, out.length + 1)), 16);
      return () => window.clearTimeout(t);
    }
    setDone(true);
  }, [cmd, out, done, prm]);

  return (
    <section className="relative py-28 md:py-32">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <Reveal>
          {/* boot sequence */}
          {!termOn && (
            <div className="font-mono2 text-xs md:text-sm min-h-[220px] leading-loose">
              {BOOT_LINES.slice(0, bootIdx).map((l, i) => (
                <div key={i} className={l.bright ? 'red font-bold text-base md:text-lg tracking-[0.3em] crt-flicker' : 'text-[#c81e1e]'} style={l.bright ? { textShadow: '0 0 18px rgba(255,0,0,0.9)' } : undefined}>
                  {l.t}
                </div>
              ))}
              {!granted && <span className="term-cursor" />}
            </div>
          )}

          {/* terminal window */}
          {termOn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ transform: 'perspective(1100px) rotateX(1.5deg)' }}
            >
              <div className="crt crt-flicker overflow-hidden border border-[rgba(255,0,51,0.35)]" style={{ background: '#030102', boxShadow: '0 0 70px rgba(139,0,0,0.4), inset 0 0 60px rgba(0,0,0,0.9)' }}>
                {/* header */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-[rgba(255,0,51,0.25)] bg-black relative z-10">
                  <span className="w-3 h-3 rounded-full bg-[#8b0000] border border-[#ff0033]/60" />
                  <span className="w-3 h-3 rounded-full bg-[#8b0000] border border-[#ff0033]/60" />
                  <span className="w-3 h-3 rounded-full bg-[#ff0033] shadow-[0_0_10px_rgba(255,0,51,0.8)]" />
                  <span className="ml-2 font-mono2 text-[10px] md:text-[11px] tracking-[0.3em] uppercase red">
                    CLASSIFIED — LEVEL 5 CLEARANCE // TTY-01
                  </span>
                  <span className="ml-auto rec-dot hidden sm:block" />
                </div>

                {/* body */}
                <div className="p-6 md:p-8 font-mono2 text-[13px] md:text-sm leading-relaxed min-h-[300px] relative z-10" style={{ color: '#ff4d4d' }}>
                  <div>
                    <span className="text-white">root@sankar</span>
                    <span className="text-zinc-600">:</span>
                    <span className="red">/vault</span>
                    <span className="text-zinc-400">$ </span>
                    <span className="text-[#ff6b6b]">{cmd}</span>
                    {cmd.length < CMD.length && <span className="term-cursor" />}
                  </div>

                  {cmd === CMD && (
                    <pre className="mt-3 whitespace-pre-wrap text-[#e63939]" style={{ textShadow: '0 0 8px rgba(255,0,51,0.45)' }}>
                      {out}
                      {out.length < PROFILE_JSON.length && <span className="term-cursor" />}
                    </pre>
                  )}

                  {errFlash && (
                    <div className="mt-3 text-[#ff0033] font-bold crt-flicker">
                      ⚠ {errFlash}
                    </div>
                  )}

                  {done && (
                    <div className="mt-4">
                      <span className="text-white">root@sankar</span>
                      <span className="text-zinc-600">:</span>
                      <span className="red">/vault</span>
                      <span className="text-zinc-400">$ </span>
                      <span className="term-cursor" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT — radar sweep + secure channel
========================================================= */
const CHANNELS = [
  {
    label: 'Encrypted mail', value: 'sarvajith2knot8@gmail.com', href: 'mailto:sarvajith2knot8@gmail.com',
    icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    label: 'LinkedIn uplink', value: 'linkedin.com/in/sarvajithsankar', href: 'https://linkedin.com/in/sarvajithsankar',
    icon: <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />,
  },
  {
    label: 'GitHub mainframe', value: 'github.com/sarvajithsankar', href: 'https://github.com/sarvajithsankar',
    icon: <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />,
  },
];

function Radar() {
  return (
    <div className="relative aspect-square max-w-md mx-auto" data-hover>
      {/* rings */}
      {[100, 72, 44, 18].map((s) => (
        <div key={s} className="absolute rounded-full border border-[rgba(255,0,51,0.28)]" style={{ inset: `${(100 - s) / 2}%` }} />
      ))}
      {/* crosshairs */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[rgba(255,0,51,0.2)]" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-[rgba(255,0,51,0.2)]" />
      {/* sweep */}
      <div className="radar-sweep" />
      {/* blips */}
      <span className="blip" style={{ top: '28%', left: '62%' }} />
      <span className="blip" style={{ top: '58%', left: '30%', animationDelay: '0.6s' }} />
      <span className="blip" style={{ top: '70%', left: '68%', animationDelay: '1.1s' }} />
      {/* center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-2xl red tracking-widest" style={{ textShadow: '0 0 16px rgba(255,0,51,0.8)' }}>SS-29</div>
          <div className="font-mono2 text-[9px] tracking-[0.3em] uppercase text-zinc-500 mt-1">signal lock</div>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const prm = usePRM();
  const [statusIdx, setStatusIdx] = useState(prm ? 4 : 0);
  const [launched, setLaunched] = useState(false);

  const statusLines = ['> ESTABLISHING CONNECTION', '> HANDSHAKE ... AES-256 OK', '> ROUTING THROUGH 7 NODES ... OK', '> CHANNEL SECURE'];

  useEffect(() => {
    if (!inView || prm) return;
    if (statusIdx < statusLines.length) {
      const t = window.setTimeout(() => setStatusIdx((i) => i + 1), 520);
      return () => window.clearTimeout(t);
    }
  }, [inView, statusIdx, prm]); // eslint-disable-line react-hooks/exhaustive-deps

  const channelOpen = statusIdx >= statusLines.length;

  return (
    <section id="contact" className="relative py-28 md:py-36 scroll-mt-20 topo overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <SectionHead
          num="06"
          eyebrow="secure channel"
          title={<>OPEN A <SlashWord>CHANNEL</SlashWord></>}
          sub="Three frequencies monitored around the clock. Choose yours."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Radar />
          </Reveal>

          <div>
            {/* connection status readout */}
            <Reveal>
              <div className="font-mono2 text-xs md:text-sm space-y-1.5 mb-8 min-h-[110px]">
                {statusLines.slice(0, statusIdx).map((l, i) => (
                  <div key={i} className={i === statusLines.length - 1 ? 'red font-bold tracking-[0.2em]' : 'text-[#c81e1e]'}>
                    {l} {i < 3 && <span className="text-zinc-600">▮</span>}
                  </div>
                ))}
                {!prm && statusIdx < statusLines.length && <span className="term-cursor" />}
              </div>
            </Reveal>

            <div className="space-y-4">
              {CHANNELS.map((ch, idx) => (
                <motion.div
                  key={ch.label}
                  initial={{ opacity: 0, x: 60 }}
                  animate={channelOpen ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: idx * 0.14 }}
                >
                  <a
                    href={ch.href}
                    target={ch.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="glass-red group flex items-center gap-5 p-5 hover:border-[rgba(255,0,51,0.55)] transition-colors"
                  >
                    <span className="relative w-12 h-12 shrink-0 rounded-full border border-[rgba(255,0,51,0.45)] bg-black/60 flex items-center justify-center red">
                      <span className="ripple" />
                      <span className="ripple" style={{ animationDelay: '0.8s' }} />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5 relative">
                        {ch.icon}
                      </svg>
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">{ch.label}</span>
                      <span className="arc-hover block text-white text-sm md:text-base truncate mt-1">{ch.value}</span>
                    </span>
                    <svg className="w-5 h-5 red opacity-0 group-hover:opacity-100 transition-opacity shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={channelOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <a
                href="mailto:sarvajith2knot8@gmail.com"
                onClick={() => { setLaunched(true); window.setTimeout(() => setLaunched(false), 1400); }}
                className={`btn-void inline-flex items-center gap-4 px-8 py-4 font-mono2 text-xs tracking-[0.3em] uppercase ${launched ? 'launched' : ''}`}
              >
                <span className="flex items-center gap-4">
                  <span className="relative inline-flex flex-col items-center overflow-visible">
                    <svg className="rocket w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 2c3 2.5 5 6.5 5 10l-2.5 2.5h-5L7 12c0-3.5 2-7.5 5-10z" strokeLinejoin="round" />
                      <path d="M9.5 14.5L7 21l2.5-1.5M14.5 14.5L17 21l-2.5-1.5M12 17v5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="9" r="1.6" />
                    </svg>
                    <svg className="flame w-2.5 h-3 absolute -bottom-2.5 red" viewBox="0 0 10 14" fill="currentColor">
                      <path d="M5 0C7 4 9 6 9 9a4 4 0 11-8 0c0-3 2-5 4-9z" />
                    </svg>
                  </span>
                  Launch message
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */
export function Footer() {
  return (
    <footer className="relative py-10 border-t border-[rgba(255,0,0,0.18)]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rec-dot" />
          <span className="font-mono2 text-[11px] tracking-[0.25em] uppercase text-zinc-400">
            Designed &amp; built with obsession <span className="red">·</span> VIT Vellore '29
          </span>
        </div>
        <div className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-600">
          © 2026 SANKAR <span className="red">//</span> NO MERCY FOR BAD UI
        </div>
      </div>
    </footer>
  );
}
