import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HackCounter, usePRM } from './fx';

/* =========================================================
   SKULL PARTICLE FIELD — forms, holds, dissolves, reforms
========================================================= */
function sampleSkull(bw: number, bh: number) {
  const off = document.createElement('canvas');
  off.width = bw; off.height = bh;
  const c = off.getContext('2d');
  if (!c) return [];
  const cx = bw / 2;
  c.fillStyle = '#fff';
  // cranium
  c.beginPath();
  c.ellipse(cx, bh * 0.38, bw * 0.27, bh * 0.30, 0, 0, Math.PI * 2);
  c.fill();
  // cheek bridge
  c.fillRect(cx - bw * 0.20, bh * 0.48, bw * 0.40, bh * 0.12);
  // jaw
  c.fillRect(cx - bw * 0.145, bh * 0.56, bw * 0.29, bh * 0.20);
  c.beginPath();
  c.ellipse(cx, bh * 0.76, bw * 0.145, bh * 0.05, 0, 0, Math.PI);
  c.fill();
  // carve eyes / nose / teeth
  c.globalCompositeOperation = 'destination-out';
  c.beginPath(); c.ellipse(cx - bw * 0.105, bh * 0.40, bw * 0.06, bh * 0.052, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(cx + bw * 0.105, bh * 0.40, bw * 0.06, bh * 0.052, 0, 0, Math.PI * 2); c.fill();
  c.beginPath();
  c.moveTo(cx, bh * 0.47); c.lineTo(cx - bw * 0.025, bh * 0.545); c.lineTo(cx + bw * 0.025, bh * 0.545);
  c.closePath(); c.fill();
  c.fillRect(cx - bw * 0.13, bh * 0.615, bw * 0.26, 2.5);
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue;
    c.fillRect(cx + i * bw * 0.048 - 1.2, bh * 0.62, 2.4, bh * 0.11);
  }
  const data = c.getImageData(0, 0, bw, bh).data;
  const pts: Array<{ x: number; y: number }> = [];
  const step = 5;
  for (let y = 0; y < bh; y += step) {
    for (let x = 0; x < bw; x += step) {
      if (data[(y * bw + x) * 4 + 3] > 128) pts.push({ x, y });
    }
  }
  // shuffle
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  return pts;
}

interface SkullParticle {
  x: number; y: number; sx: number; sy: number; tx: number; ty: number;
  vx: number; vy: number; delay: number; seed: number; bright: boolean;
}

function SkullCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prm = usePRM();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let particles: SkullParticle[] = [];

    const build = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.offsetWidth; h = parent.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const bw = Math.min(460, w * 0.5);
      const bh = bw * 1.22;
      const ox = w * 0.66 - bw / 2;
      const oy = h * 0.5 - bh / 2 - 10;
      const pts = sampleSkull(bw, bh).slice(0, 720);
      particles = pts.map((p) => ({
        x: Math.random() * w, y: Math.random() * h,
        sx: 0, sy: 0,
        tx: p.x + ox, ty: p.y + oy,
        vx: 0, vy: 0,
        delay: Math.random() * 0.35,
        seed: Math.random() * Math.PI * 2,
        bright: Math.random() > 0.86,
      }));
    };
    build();

    if (prm || !active) {
      // static formed skull
      const drawStatic = () => {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
          ctx.fillStyle = p.bright ? 'rgba(255,120,120,0.95)' : 'rgba(255,0,51,0.6)';
          ctx.fillRect(p.tx - 1, p.ty - 1, 2, 2);
        }
      };
      drawStatic();
      const onR = () => { build(); drawStatic(); };
      window.addEventListener('resize', onR);
      return () => window.removeEventListener('resize', onR);
    }

    // phase timings (ms)
    const CONV = 1800, HOLD = 3600, DISS = 1400, CYCLE = 7000;
    const start = performance.now();
    let raf = 0;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const loop = (now: number) => {
      const t = (now - start) % CYCLE;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (t < CONV) {
          if (p.delay === 0 && p.sx === 0) { p.sx = p.x; p.sy = p.y; }
          if (p.vx === 0 && p.vy === 0 && t < 16) { p.sx = p.x; p.sy = p.y; }
          const raw = (t / CONV - p.delay) / (1 - p.delay);
          const k = ease(Math.max(0, Math.min(1, raw)));
          p.x = p.sx + (p.tx - p.sx) * k;
          p.y = p.sy + (p.ty - p.sy) * k;
        } else if (t < HOLD) {
          p.x = p.tx + Math.sin(now * 0.002 + p.seed) * 1.6;
          p.y = p.ty + Math.cos(now * 0.0017 + p.seed) * 1.6;
        } else if (t < DISS + HOLD) {
          if (t - (now - 16.7 - start) % CYCLE > 0 && p.vx === 0) {
            const ang = Math.atan2(p.ty - h / 2, p.tx - w * 0.66) + (Math.random() - 0.5) * 1.2;
            const sp = 1.5 + Math.random() * 3.5;
            p.vx = Math.cos(ang) * sp; p.vy = Math.sin(ang) * sp;
          }
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.985; p.vy *= 0.985;
        } else {
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.99; p.vy *= 0.99;
          // wrap drift
          if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
          if (t > CYCLE - 40) { p.sx = p.x; p.sy = p.y; p.vx = 0; p.vy = 0; }
        }

        ctx.fillStyle = p.bright ? 'rgba(255,130,130,0.95)' : 'rgba(255,0,51,0.62)';
        ctx.fillRect(p.x - 1, p.y - 1, p.bright ? 2.6 : 2, p.bright ? 2.6 : 2);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => build();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [prm, active]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
}

/* =========================================================
   VIOLENT TYPEWRITER
========================================================= */
const ROLES = ['AI Engineer', 'Systems Architect', 'Cybersecurity Obsessive', 'Building What Matters'];

function ViolentTypewriter({ enabled }: { enabled: boolean }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState('');
  const [mode, setMode] = useState<'type' | 'hold' | 'kill'>('type');
  const prm = usePRM();

  useEffect(() => {
    if (prm || !enabled) { setTxt(ROLES[0]); return; }
    const word = ROLES[i % ROLES.length];
    let t = 0;
    if (mode === 'type') {
      if (txt.length < word.length) {
        t = window.setTimeout(() => setTxt(word.slice(0, txt.length + 1)), 75);
      } else {
        t = window.setTimeout(() => setMode('kill'), 1700);
      }
    } else if (mode === 'kill') {
      if (txt.length > 0) {
        t = window.setTimeout(() => setTxt(word.slice(0, txt.length - 1)), 22);
      } else {
        setMode('type');
        setI((x) => x + 1);
      }
    }
    return () => window.clearTimeout(t);
  }, [txt, mode, i, prm, enabled]);

  return (
    <span className={mode === 'kill' ? 'violent inline-block' : 'inline-block'}>
      {txt}
      <span className="term-cursor" />
    </span>
  );
}

/* =========================================================
   ROTATING HEX MONOLITH
========================================================= */
function HexMonolith() {
  return (
    <div
      aria-hidden
      className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] md:w-[680px] md:h-[680px] pointer-events-none opacity-70"
      style={{ perspective: '1100px' }}
    >
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,0,0,0.35) 0%, transparent 62%)', filter: 'blur(40px)' }} />
      <div className="absolute inset-0" style={{ transform: 'rotateX(16deg) rotateY(-14deg)', transformStyle: 'preserve-3d' }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ animation: 'spin360 46s linear infinite' }}>
          <polygon
            points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5"
            fill="rgba(139,0,0,0.10)"
            stroke="rgba(255,0,51,0.5)"
            strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,0,51,0.55))' }}
          />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-[12%] w-[76%] h-[76%]" style={{ animation: 'spin360 30s linear infinite reverse' }}>
          <polygon
            points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5"
            fill="none"
            stroke="rgba(255,0,51,0.32)"
            strokeWidth="0.4"
            strokeDasharray="6 3"
          />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-[27%] w-[46%] h-[46%]" style={{ animation: 'spin360 22s linear infinite' }}>
          <polygon points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5" fill="rgba(139,0,0,0.16)" stroke="rgba(255,0,51,0.6)" strokeWidth="0.6" />
        </svg>
      </div>
    </div>
  );
}

/* =========================================================
   PARALLAX CUBES
========================================================= */
function Cube({ size, dur, className }: { size: number; dur: number; className: string }) {
  const half = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];
  return (
    <div className={`cube ${className}`} style={{ width: size, height: size, animationDuration: `${dur}s` }} aria-hidden>
      {faces.map((f, idx) => (
        <div key={idx} className="cube-face" style={{ transform: f }} />
      ))}
    </div>
  );
}

function ParallaxCubes() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 900], [0, -90]);
  const y2 = useTransform(scrollY, [0, 900], [0, -180]);
  const y3 = useTransform(scrollY, [0, 900], [0, -50]);
  const y4 = useTransform(scrollY, [0, 900], [0, -140]);
  return (
    <>
      <motion.div style={{ y: y1 }} className="absolute left-[6%] top-[18%] hidden md:block"><Cube size={54} dur={15} className="relative" /></motion.div>
      <motion.div style={{ y: y2 }} className="absolute left-[16%] bottom-[20%] hidden md:block"><Cube size={30} dur={11} className="relative" /></motion.div>
      <motion.div style={{ y: y3 }} className="absolute right-[30%] top-[12%] hidden lg:block"><Cube size={40} dur={19} className="relative" /></motion.div>
      <motion.div style={{ y: y4 }} className="absolute right-[8%] bottom-[26%] hidden lg:block"><Cube size={64} dur={23} className="relative" /></motion.div>
    </>
  );
}

/* =========================================================
   EKG DIVIDER
========================================================= */
function EkgDivider() {
  const d = 'M0,50 L150,50 L175,50 L190,18 L205,84 L218,34 L230,50 L420,50 L445,50 L460,10 L476,90 L490,30 L502,50 L700,50 L725,50 L740,16 L756,86 L770,32 L782,50 L1000,50 L1030,50 L1045,20 L1060,82 L1074,36 L1086,50 L1200,50';
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="w-full h-16 md:h-20 block">
        <path d={d} fill="none" stroke="rgba(255,0,51,0.22)" strokeWidth="1.5" />
        <path d={d} fill="none" stroke="#ff0033" strokeWidth="2.5" pathLength={1000} className="ekg-pulse" />
      </svg>
      <div className="pulse-line h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #8b0000 20%, #ff0033 50%, #8b0000 80%, transparent)' }} />
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */
const TAGS = ['Cybersecurity', 'Cloud', 'AI/ML', 'C++', 'Systems', 'Python', 'Data Science'];

const fadeUp = {
  hide: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

export function Hero({ ready }: { ready: boolean }) {
  const st = ready ? 'show' : 'hide';

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-24 scroll-mt-24">
      <SkullCanvas active={ready} />
      <HexMonolith />
      <ParallaxCubes />
      <div className="scanline-sweep" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-14 items-center">
          {/* LEFT — identity */}
          <div>
            <motion.div variants={fadeUp} initial="hide" animate={st} transition={{ duration: 0.6, delay: 0.05 }}>
              <div className="inline-flex items-center gap-3 glass-red px-4 py-2 mb-8">
                <span className="rec-dot" />
                <span className="font-mono2 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-zinc-300">
                  EX AI Intern @ Maveric Systems <span className="red">//</span> open for ops
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hide" animate={st}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display uppercase leading-[0.95] tracking-wide text-[13vw] sm:text-7xl md:text-8xl xl:text-[7.5rem]"
            >
              <span className="glitch block text-white" data-text="SARVAJITH">SARVAJITH</span>
              <span className="glitch block text-white" data-text="SANKAR_">
                SANKAR<span className="red">_</span>
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp} initial="hide" animate={st}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 font-mono2 text-base md:text-xl min-h-[2rem]"
            >
              <span className="dim">&gt;_ role::</span>{' '}
              <span className="red font-medium">
                <ViolentTypewriter enabled={ready} />
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp} initial="hide" animate={st}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="mt-5 dim max-w-xl leading-relaxed text-sm md:text-base"
            >
              <span className="text-white">EX AI Intern @ Maveric Systems Limited.</span> CS Engineer at
              VIT Vellore · B.S. Data Science at IIT Madras. Building at the intersection of{' '}
              <span className="red">AI, Cybersecurity &amp; Cloud.</span>
            </motion.p>

            <motion.div variants={fadeUp} initial="hide" animate={st} transition={{ duration: 0.6, delay: 0.52 }} className="mt-7 flex flex-wrap items-center gap-2">
              <span className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-zinc-600 mr-1">domains:</span>
              {TAGS.map((t) => (
                <span key={t} className="tag-red font-mono2 text-[11px] px-3 py-1 rounded-full">{t}</span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} initial="hide" animate={st} transition={{ duration: 0.6, delay: 0.62 }} className="mt-10 flex flex-wrap gap-4">
              <a href="#projects" className="btn-void px-7 py-3.5 font-mono2 text-xs tracking-[0.25em] uppercase inline-flex items-center gap-3">
                <span className="flex items-center gap-3">
                  View operations
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a href="#contact" className="btn-void px-7 py-3.5 font-mono2 text-xs tracking-[0.25em] uppercase">
                <span>Open channel</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — diagnostics panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="relative"
          >
            <div className="glass-red p-6 md:p-7 relative">
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#ff0033] to-transparent" />
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono2 text-[10px] tracking-[0.35em] uppercase text-zinc-400">System diagnostics</span>
                <span className="rec-dot" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: 4, s: '+', label: 'Projects deployed' },
                  { n: 3, s: '', label: 'Certifications' },
                  { n: 2, s: '', label: 'Active degrees' },
                  { n: 29, s: "'", label: 'Grad year' },
                ].map((stat) => (
                  <div key={stat.label} className="grow-border pl-4 py-3 bg-black/40 border border-[rgba(255,0,0,0.12)] hover:border-[rgba(255,0,51,0.45)] transition-colors">
                    <div className="font-display text-4xl md:text-5xl red" style={{ textShadow: '0 0 18px rgba(255,0,51,0.55)' }}>
                      <HackCounter value={stat.n} suffix={stat.s} />
                    </div>
                    <div className="font-mono2 text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-zinc-500 mt-1.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-[rgba(255,0,0,0.15)] flex items-center justify-between">
                <div className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-zinc-500">
                  clearance <span className="red">LVL-5</span> // eyes only
                </div>
                <svg className="w-5 h-5 red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <EkgDivider />
    </section>
  );
}
