import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';

/* =========================================================
   prefers-reduced-motion hook
 ========================================================= */
export function usePRM(): boolean {
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrm(mq.matches);
    const fn = (e: MediaQueryListEvent) => setPrm(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return prm;
}

/* =========================================================
   CUSTOM CURSOR — subtle glowing reticle
 ========================================================= */
export function CursorFX() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState(false);
  const prm = usePRM();

  useEffect(() => {
    if (prm) return;
    let mx = -100, my = -100, rx = -100, ry = -100;
    let raf = 0;
    let lastHot: boolean | null = null;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      const t = e.target as HTMLElement | null;
      const isHot = !!t?.closest?.('a, button, [data-hover], .redact, .flip-card, .tilt-element');
      if (isHot !== lastHot) { lastHot = isHot; setHot(isHot); }
    };

    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [prm]);

  if (prm) return null;

  return (
    <div className="cursor-fx" aria-hidden>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[999] transition-[width,height,background-color] duration-300"
        style={{
          width: hot ? 48 : 28,
          height: hot ? 48 : 28,
          borderColor: hot ? 'rgba(168, 85, 247, 0.7)' : 'rgba(0, 242, 254, 0.5)',
          backgroundColor: hot ? 'rgba(168, 85, 247, 0.08)' : 'transparent',
          boxShadow: hot ? '0 0 14px rgba(168, 85, 247, 0.3)' : '0 0 10px rgba(0, 242, 254, 0.15)',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[4px] h-[4px] rounded-full pointer-events-none z-[999]"
        style={{ background: '#fff', boxShadow: '0 0 8px rgba(0, 242, 254, 0.8)' }}
      />
    </div>
  );
}

/* =========================================================
   AMBIENT BACKGROUND — 3D Neural Constellation & Blobs
 ========================================================= */
interface Particle { x: number; y: number; vx: number; vy: number; radius: number; }
interface Blob { x: number; y: number; vx: number; vy: number; radius: number; color: string; }

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prm = usePRM();
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let blobs: Blob[] = [];
    let particles: Particle[] = [];

    const build = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Radial glowing background spots
      blobs = [
        { x: w * 0.25, y: h * 0.3, vx: 0.15, vy: 0.1, radius: Math.min(w * 0.3, 400), color: 'rgba(0, 242, 254, 0.04)' },
        { x: w * 0.75, y: h * 0.6, vx: -0.1, vy: 0.15, radius: Math.min(w * 0.35, 450), color: 'rgba(168, 85, 247, 0.04)' },
        { x: w * 0.5, y: h * 0.8, vx: 0.12, vy: -0.12, radius: Math.min(w * 0.28, 350), color: 'rgba(0, 242, 254, 0.03)' }
      ];

      // Constellation particles (fewer nodes to maintain simple layout)
      const count = Math.min(Math.floor((w * h) / 18000), 55);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 1
        });
      }
    };

    build();

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    if (prm) {
      // Draw static frame
      ctx.clearRect(0, 0, w, h);
      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2); ctx.fill();
      }
      const onR = () => build();
      window.addEventListener('resize', onR);
      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('resize', onR);
      };
    }

    let raf = 0;
    const loop = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      // 1. Draw glowing background blobs
      for (const b of blobs) {
        b.x += b.vx; b.y += b.vy;
        if (b.x - b.radius < -100 || b.x + b.radius > w + 100) b.vx = -b.vx;
        if (b.y - b.radius < -100 || b.y + b.radius > h + 100) b.vy = -b.vy;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2); ctx.fill();
      }

      // 2. Draw neural constellation particles
      ctx.lineWidth = 0.55;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;

        // Draw particle
        ctx.fillStyle = 'rgba(168, 85, 247, 0.16)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();

        // Connect to neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.08;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }

        // Connect to mouse cursor
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const malpha = (1 - mdist / 140) * 0.12;
          ctx.strokeStyle = `rgba(168, 85, 247, ${malpha})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    const onResize = () => build();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [prm]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden />
      <div className="red-grid" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}

/* =========================================================
   SCROLL PROGRESS BAR
 ========================================================= */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[80] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #a855f7, #00f2fe)',
        boxShadow: '0 0 8px rgba(0, 242, 254, 0.4)',
      }}
    />
  );
}

/* =========================================================
   PRELOADER — simple spinner loading screen
 ========================================================= */
export function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => { setStage(1); onReveal(); }, 900);
    const t2 = setTimeout(onDone, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onReveal, onDone]);

  return (
    <AnimateUp stage={stage}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="preload-spinner" />
        <div className="font-mono2 text-[10px] tracking-[0.4em] text-zinc-400 uppercase">
          Initializing Portfolio
        </div>
      </div>
    </AnimateUp>
  );
}

function AnimateUp({ stage, children }: { stage: number; children: ReactNode }) {
  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-[#06070c]"
      animate={stage === 1 ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   SYSTEM ONLINE TOAST
 ========================================================= */
export function SystemToast() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-[90] glass-red px-4 py-2.5 flex items-center gap-2.5 border border-zinc-800"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
      <div className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-zinc-300">
        System Initialized
      </div>
    </motion.div>
  );
}

/* =========================================================
   REVEAL — intersection-observer driven entrance
 ========================================================= */
export function Reveal({
  children, delay = 0, x = 0, className = '',
}: {
  children: ReactNode; delay?: number; x?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   SLASH WORD — italic word with underline
 ========================================================= */
export function SlashWord({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <em ref={ref} className={`slash red font-display ${inView ? 'on' : ''}`}>
      {children}
    </em>
  );
}

/* =========================================================
   SECTION HEADER — subtle background numbers + clean title
 ========================================================= */
export function SectionHead({
  num, eyebrow, title, sub, align = 'left',
}: {
  num: string; eyebrow: string; title: ReactNode; sub?: string; align?: 'left' | 'center';
}) {
  return (
    <div className={`relative mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <span
        aria-hidden
        className="font-display absolute -top-8 md:-top-12 text-[5rem] md:text-[8rem] leading-none select-none pointer-events-none font-bold"
        style={{
          color: 'rgba(255,255,255,0.02)',
          ...(align === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : { right: 0 }),
        }}
      >
        {num}
      </span>
      <Reveal>
        <div className={`font-mono2 text-[10px] md:text-[11px] tracking-[0.4em] uppercase red mb-3 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="inline-block w-6 h-px bg-gradient-to-r from-transparent to-[#00f2fe]" />
          {'//'} {eyebrow}
          <span className="inline-block w-6 h-px bg-gradient-to-l from-transparent to-[#a855f7]" />
        </div>
        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wide text-white leading-none">
          {title}
        </h2>
        {sub && <p className={`dim mt-4 max-w-xl text-sm leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>{sub}</p>}
      </Reveal>
    </div>
  );
}

/* =========================================================
   HACK COUNTER — digits snapping with flash
 ========================================================= */
export function HackCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prm = usePRM();
  const [txt, setTxt] = useState(prm ? String(value) : '–');
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (prm) { setTxt(String(value)); return; }
    let frame = 0;
    const total = 20;
    const id = window.setInterval(() => {
      frame++;
      if (frame < total) {
        setTxt(String(value >= 10 ? 10 + Math.floor(Math.random() * 89) : Math.floor(Math.random() * 10)));
      } else {
        setTxt(String(value));
        setFlash(true);
        window.setTimeout(() => setFlash(false), 300);
        window.clearInterval(id);
      }
    }, 40);
    return () => window.clearInterval(id);
  }, [inView, value, prm]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${flash ? 'counter-flash' : ''}`}>
      {txt}
      {suffix}
    </span>
  );
}
