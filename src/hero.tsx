import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HackCounter, usePRM } from './fx';

/* =========================================================
   SKULL PARTICLE FIELD — forms, holds, dissolves, reforms
========================================================= */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

function NeuralConstellationCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const prm = usePRM();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let particles: Particle[] = [];
    const maxParticles = 65;

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.offsetWidth; h = parent.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.2 + Math.random() * 2,
          color: Math.random() > 0.48 ? '#00f2fe' : '#a855f7'
        });
      }
    };
    init();

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (prm) {
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color === '#00f2fe' ? 'rgba(0, 242, 254, 0.4)' : 'rgba(168, 85, 247, 0.4)';
          ctx.fill();
        }
        return;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx = -p.vx;
        if (p.y < 0 || p.y > h) p.vy = -p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.14;
            ctx.strokeStyle = p.color === '#00f2fe' ? `rgba(0, 242, 254, ${alpha})` : `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx > -1000 && my > -1000) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 170) {
            const alpha = (1 - dist / 170) * 0.22;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    if (active) {
      raf = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const onResize = () => {
      init();
    };

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [prm, active]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
}

/* =========================================================
   VIOLENT TYPEWRITER
========================================================= */
const ROLES = ['AI Engineer', 'ML Researcher', 'Full Stack Dev'];

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
      className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] md:w-[680px] md:h-[680px] pointer-events-none opacity-50"
      style={{ perspective: '1100px' }}
    >
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 62%)', filter: 'blur(40px)' }} />
      <div className="absolute inset-0" style={{ transform: 'rotateX(16deg) rotateY(-14deg)', transformStyle: 'preserve-3d' }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ animation: 'spin360 46s linear infinite' }}>
          <polygon
            points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5"
            fill="rgba(10,15,30,0.2)"
            stroke="rgba(0,242,254,0.4)"
            strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,242,254,0.4))' }}
          />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-[12%] w-[76%] h-[76%]" style={{ animation: 'spin360 30s linear infinite reverse' }}>
          <polygon
            points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5"
            fill="none"
            stroke="rgba(168,85,247,0.25)"
            strokeWidth="0.4"
            strokeDasharray="6 3"
          />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-[27%] w-[46%] h-[46%]" style={{ animation: 'spin360 22s linear infinite' }}>
          <polygon points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5" fill="rgba(10,15,30,0.3)" stroke="rgba(0,242,254,0.5)" strokeWidth="0.6" />
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
        <path d={d} fill="none" stroke="rgba(0,242,254,0.15)" strokeWidth="1.5" />
        <path d={d} fill="none" stroke="#00f2fe" strokeWidth="2.5" pathLength={1000} className="ekg-pulse" />
      </svg>
      <div className="pulse-line h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #a855f7 20%, #00f2fe 50%, #a855f7 80%, transparent)' }} />
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
      <NeuralConstellationCanvas active={ready} />
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
                  AI Engineering Intern @ Maveric Systems <span className="red">//</span> open for ops
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
              <span className="text-white">AI Engineering Intern @ Maveric Systems.</span> CS Sophomore at
              VIT Vellore + B.S. Data Science at IIT Madras. Architecting systems at the intersection of{' '}
              <span className="red">AI Agents, Machine Learning &amp; Cybersecurity.</span>
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
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent" />
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono2 text-[10px] tracking-[0.35em] uppercase text-zinc-400">System diagnostics</span>
                <span className="rec-dot" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: 4, s: '+', label: 'Systems shipped' },
                  { n: 6, s: '', label: 'Credentials verified' },
                  { n: 2, s: '', label: 'Active degrees' },
                  { n: 29, s: "'", label: 'Grad year' },
                ].map((stat) => (
                  <div key={stat.label} className="grow-border pl-4 py-3 bg-black/40 border border-[rgba(0,242,254,0.12)] hover:border-[rgba(0,242,254,0.45)] transition-colors">
                    <div className="font-display text-4xl md:text-5xl red" style={{ textShadow: '0 0 18px rgba(0,242,254,0.55)' }}>
                      <HackCounter value={stat.n} suffix={stat.s} />
                    </div>
                    <div className="font-mono2 text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-zinc-500 mt-1.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-[rgba(0,242,254,0.15)] flex items-center justify-between">
                <div className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-zinc-500">
                  clearance <span className="red">LVL-5</span> // system online
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
