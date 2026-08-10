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
   CUSTOM CURSOR — targeting reticle + trail
========================================================= */
const TRAIL_LEN = 14;

export function CursorFX() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [hot, setHot] = useState(false);
  const prm = usePRM();

  useEffect(() => {
    if (prm) return;
    let mx = -100, my = -100, rx = -100, ry = -100;
    const hist: Array<{ x: number; y: number }> = [];
    let raf = 0;
    let lastHot: boolean | null = null;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      const t = e.target as HTMLElement | null;
      const isHot = !!t?.closest?.('a, button, [data-hover], .redact, .flip-card');
      if (isHot !== lastHot) { lastHot = isHot; setHot(isHot); }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;

      hist.unshift({ x: mx, y: my });
      if (hist.length > TRAIL_LEN) hist.pop();
      for (let i = 0; i < TRAIL_LEN; i++) {
        const el = trailRefs.current[i];
        if (!el) continue;
        const p = hist[Math.min(i * 2, hist.length - 1)];
        if (p) {
          el.style.opacity = String((1 - i / TRAIL_LEN) * 0.5);
          el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-50%) scale(${1 - i / TRAIL_LEN})`;
        }
      }
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
      {Array.from({ length: TRAIL_LEN }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full pointer-events-none z-[998]"
          style={{ background: '#ff0033', boxShadow: '0 0 6px rgba(255,0,51,0.8)', opacity: 0 }}
        />
      ))}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[999] transition-[width,height,background-color] duration-300"
        style={{
          width: hot ? 58 : 34,
          height: hot ? 58 : 34,
          borderColor: 'rgba(255,0,51,0.85)',
          backgroundColor: hot ? 'rgba(255,0,51,0.14)' : 'transparent',
          boxShadow: '0 0 18px rgba(255,0,51,0.4), inset 0 0 12px rgba(255,0,51,0.25)',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[999]"
        style={{ background: '#fff', boxShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 16px rgba(255,0,51,0.8)' }}
      />
    </div>
  );
}

/* =========================================================
   AMBIENT BACKGROUND — circuit traces + binary rain + grid
========================================================= */
interface Trace { pts: Array<{ x: number; y: number }>; segLens: number[]; total: number; speed: number; off: number; }
interface RainCol { x: number; y: number; speed: number; chars: string[]; }

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prm = usePRM();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let traces: Trace[] = [];
    let rain: RainCol[] = [];

    const build = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      traces = [];
      const nTraces = Math.max(10, Math.floor(w / 110));
      for (let i = 0; i < nTraces; i++) {
        const pts = [{ x: Math.random() * w, y: Math.random() * h }];
        const segs = 3 + Math.floor(Math.random() * 4);
        let horizontal = Math.random() > 0.5;
        for (let s = 0; s < segs; s++) {
          const prev = pts[pts.length - 1];
          const len = 60 + Math.random() * 220;
          const dir = Math.random() > 0.5 ? 1 : -1;
          pts.push(horizontal
            ? { x: prev.x + len * dir, y: prev.y }
            : { x: prev.x, y: prev.y + len * dir });
          horizontal = !horizontal;
        }
        const segLens: number[] = [];
        let total = 0;
        for (let s = 0; s < pts.length - 1; s++) {
          const l = Math.hypot(pts[s + 1].x - pts[s].x, pts[s + 1].y - pts[s].y);
          segLens.push(l); total += l;
        }
        traces.push({ pts, segLens, total, speed: 30 + Math.random() * 60, off: Math.random() * 1000 });
      }

      rain = [];
      const cols = Math.floor(w / 34);
      for (let c = 0; c < cols; c++) {
        const chars: string[] = [];
        const n = 6 + Math.floor(Math.random() * 8);
        for (let k = 0; k < n; k++) chars.push(Math.random() > 0.5 ? '1' : '0');
        rain.push({ x: c * 34 + 8 + Math.random() * 10, y: Math.random() * h, speed: 0.25 + Math.random() * 0.7, chars });
      }
    };

    const pointAt = (t: Trace, d: number) => {
      let rem = ((d % t.total) + t.total) % t.total;
      for (let i = 0; i < t.segLens.length; i++) {
        if (rem <= t.segLens[i]) {
          const a = t.pts[i], b = t.pts[i + 1];
          const r = t.segLens[i] === 0 ? 0 : rem / t.segLens[i];
          return { x: a.x + (b.x - a.x) * r, y: a.y + (b.y - a.y) * r };
        }
        rem -= t.segLens[i];
      }
      return t.pts[0];
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,0,0,0.055)';
      for (const t of traces) {
        ctx.beginPath();
        ctx.moveTo(t.pts[0].x, t.pts[0].y);
        for (let i = 1; i < t.pts.length; i++) ctx.lineTo(t.pts[i].x, t.pts[i].y);
        ctx.stroke();
      }
    };

    build();

    if (prm) {
      drawStatic();
      const onR = () => { build(); drawStatic(); };
      window.addEventListener('resize', onR);
      return () => window.removeEventListener('resize', onR);
    }

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);

      // circuit traces
      ctx.lineWidth = 1;
      for (const t of traces) {
        ctx.strokeStyle = 'rgba(255,0,0,0.055)';
        ctx.beginPath();
        ctx.moveTo(t.pts[0].x, t.pts[0].y);
        for (let i = 1; i < t.pts.length; i++) ctx.lineTo(t.pts[i].x, t.pts[i].y);
        ctx.stroke();

        // corner nodes
        ctx.fillStyle = 'rgba(255,0,51,0.22)';
        for (const p of t.pts) ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);

        // traveling electric pulse
        const d = (now / 1000) * t.speed + t.off;
        const p1 = pointAt(t, d);
        const p2 = pointAt(t, d - 26);
        const grad = ctx.createLinearGradient(p2.x, p2.y, p1.x, p1.y);
        grad.addColorStop(0, 'rgba(255,0,51,0)');
        grad.addColorStop(1, 'rgba(255,0,51,0.75)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,80,80,0.9)';
        ctx.fillRect(p1.x - 1.5, p1.y - 1.5, 3, 3);
      }

      // binary rain (extremely subtle)
      ctx.font = '11px JetBrains Mono, monospace';
      for (const col of rain) {
        col.y += col.speed * dt * 60;
        if (col.y - col.chars.length * 16 > h) { col.y = -20; col.x = col.x + (Math.random() - 0.5) * 6; }
        for (let k = 0; k < col.chars.length; k++) {
          const yy = col.y - k * 16;
          if (yy < -16 || yy > h + 16) continue;
          const alpha = (1 - k / col.chars.length) * 0.30;
          ctx.fillStyle = k === 0 ? `rgba(255,0,51,${alpha + 0.12})` : `rgba(139,0,0,${alpha})`;
          ctx.fillText(col.chars[k], col.x, yy);
        }
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
        background: 'linear-gradient(90deg, #8b0000, #ff0033, #ff0000)',
        boxShadow: '0 0 14px rgba(255,0,51,0.9)',
      }}
    />
  );
}

/* =========================================================
   PRELOADER — scan reveal
========================================================= */
export function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => { setStage(1); onReveal(); }, 1350);
    const t2 = setTimeout(onDone, 2050);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onReveal, onDone]);

  return (
    <AnimateUp stage={stage}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div className="font-mono2 text-[11px] tracking-[0.5em] red uppercase animate-pulse">
          Loading hostile interface
        </div>
        <div className="font-display text-3xl md:text-4xl tracking-widest text-white">
          SARVAJITH<span className="red">.SYS</span>
        </div>
        <div className="font-mono2 text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
          // do not look away
        </div>
      </div>
      {stage === 0 && <div className="preload-scan" />}
    </AnimateUp>
  );
}

function AnimateUp({ stage, children }: { stage: number; children: ReactNode }) {
  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-black"
      animate={stage === 1 ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.65, ease: [0.7, 0, 0.2, 1] }}
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
      initial={{ x: 140, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 140, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="fixed bottom-6 right-6 z-[90] glass-red px-5 py-3.5 flex items-center gap-3"
    >
      <span className="rec-dot" />
      <div className="font-mono2 text-[11px] tracking-[0.3em] uppercase">
        <span className="text-white">System</span> <span className="red">online</span>
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
      initial={{ opacity: 0, y: 30, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   SLASH WORD — italic red word with violent underline
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
   SECTION HEADER — massive ghost number + eyebrow
========================================================= */
export function SectionHead({
  num, eyebrow, title, sub, align = 'left',
}: {
  num: string; eyebrow: string; title: ReactNode; sub?: string; align?: 'left' | 'center';
}) {
  return (
    <div className={`relative mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      <span
        aria-hidden
        className="font-display absolute -top-14 md:-top-20 text-[7rem] md:text-[11rem] leading-none select-none pointer-events-none"
        style={{
          color: 'rgba(255,0,0,0.07)',
          textShadow: '0 0 60px rgba(139,0,0,0.35)',
          ...(align === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : { right: 0 }),
        }}
      >
        {num}
      </span>
      <Reveal>
        <div className={`font-mono2 text-[11px] md:text-xs tracking-[0.4em] uppercase red mb-4 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="inline-block w-8 h-px bg-gradient-to-r from-transparent to-[#ff0033]" />
          {'//'} {eyebrow}
          <span className="inline-block w-8 h-px bg-gradient-to-l from-transparent to-[#ff0033]" />
        </div>
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-wide text-white leading-[1.05]">
          {title}
        </h2>
        {sub && <p className={`dim mt-5 max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>{sub}</p>}
      </Reveal>
    </div>
  );
}

/* =========================================================
   HACK COUNTER — scrambled digits snapping with red flash
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
    const total = 34;
    const id = window.setInterval(() => {
      frame++;
      if (frame < total) {
        setTxt(String(value >= 10 ? 10 + Math.floor(Math.random() * 89) : Math.floor(Math.random() * 10)));
      } else {
        setTxt(String(value));
        setFlash(true);
        window.setTimeout(() => setFlash(false), 480);
        window.clearInterval(id);
      }
    }, 36);
    return () => window.clearInterval(id);
  }, [inView, value, prm]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${flash ? 'counter-flash' : ''}`}>
      {txt}
      {suffix}
    </span>
  );
}
