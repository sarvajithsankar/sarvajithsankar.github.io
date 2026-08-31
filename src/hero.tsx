import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HackCounter, usePRM } from './fx';
import avatarImg from './avatar.jpg';

/* =========================================================
   3D TILT CARD COMPONENT — interactive headshot
 ========================================================= */
function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const prm = usePRM();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prm) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordinates normalized between -1 and 1
    const x = (e.clientX - rect.left - width / 2) / (width / 2);
    const y = (e.clientY - rect.top - height / 2) / (height / 2);
    
    // Rotations limits (max 12 degrees)
    setRotX(-y * 12);
    setRotY(x * 12);
    
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;
    setGlare({ x: glareX, y: glareY, opacity: 0.35 });
  };

  const onMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="perspective-container">
      <div 
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="tilt-element relative w-72 h-72 md:w-80 md:h-80 mx-auto border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl cursor-pointer preserve-3d"
        style={{
          transform: prm ? 'none' : `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`,
          transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
          boxShadow: prm ? 'none' : `0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0, 242, 254, ${Math.max(Math.abs(rotX), Math.abs(rotY)) * 0.02})`
        }}
      >
        {/* Reflection glare overlay */}
        <div 
          className="gloss-overlay absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 140px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.15), transparent 80%)`
          }}
        />
        {/* Real headshot image */}
        <img 
          src={avatarImg} 
          alt="Sarvajith Sankar Headshot" 
          className="tilt-child w-full h-full object-cover select-none pointer-events-none transition-transform duration-300"
          style={{ transform: prm ? 'none' : 'translateZ(20px) scale(1.04)' }}
        />
        {/* Card border shine */}
        <div className="absolute inset-px border border-white/10 rounded-2xl pointer-events-none z-10" />
      </div>
    </div>
  );
}

/* =========================================================
   TYPEWRITER CYCLING EFFECT
 ========================================================= */
const ROLES = ['AI Engineer', 'ML Researcher', 'Full Stack Dev'];

function SimpleTypewriter({ enabled }: { enabled: boolean }) {
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
        t = window.setTimeout(() => setTxt(word.slice(0, txt.length + 1)), 65);
      } else {
        t = window.setTimeout(() => setMode('kill'), 2000);
      }
    } else if (mode === 'kill') {
      if (txt.length > 0) {
        t = window.setTimeout(() => setTxt(word.slice(0, txt.length - 1)), 25);
      } else {
        setMode('type');
        setI((x) => x + 1);
      }
    }
    return () => window.clearTimeout(t);
  }, [txt, mode, i, prm, enabled]);

  return (
    <span className="inline-block text-white">
      {txt}
      <span className="term-cursor" />
    </span>
  );
}

/* =========================================================
   HERO SECTION
 ========================================================= */
const TAGS = ['AI/ML', 'C++', 'Systems', 'Python', 'Data Science', 'LLM Security'];

const fadeUp = {
  hide: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export function Hero({ ready }: { ready: boolean }) {
  const st = ready ? 'show' : 'hide';

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 scroll-mt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          {/* LEFT — identity */}
          <div>
            <motion.div variants={fadeUp} initial="hide" animate={st} transition={{ duration: 0.5, delay: 0.05 }}>
              <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
                <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-zinc-400">
                  AI Intern @ Maveric Systems <span className="red">//</span> Available for summer ops
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hide" animate={st}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display uppercase leading-none tracking-wide text-5xl sm:text-6xl md:text-7xl xl:text-8xl"
            >
              <span className="glitch block text-white" data-text="SARVAJITH">SARVAJITH</span>
              <span className="glitch block text-white" data-text="SANKAR_">
                SANKAR<span className="red">_</span>
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp} initial="hide" animate={st}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 font-mono2 text-base md:text-lg min-h-[1.8rem]"
            >
              <span className="dim">&gt;_ role::</span>{' '}
              <span className="red font-medium">
                <SimpleTypewriter enabled={ready} />
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp} initial="hide" animate={st}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 dim max-w-lg leading-relaxed text-sm md:text-base"
            >
              AI Engineering Intern @ Maveric Systems. CS Sophomore at VIT Vellore + B.S. Data Science at IIT Madras. Architecting systems at the intersection of <span className="text-white font-semibold">AI Agents, Machine Learning &amp; Security.</span>
            </motion.p>

            <motion.div variants={fadeUp} initial="hide" animate={st} transition={{ duration: 0.5, delay: 0.48 }} className="mt-6 flex flex-wrap items-center gap-2">
              {TAGS.map((t) => (
                <span key={t} className="tag-red font-mono2 text-[10px] px-3 py-1 rounded-full">{t}</span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} initial="hide" animate={st} transition={{ duration: 0.5, delay: 0.56 }} className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="btn-void px-6 py-3 font-mono2 text-[11px] tracking-[0.2em] uppercase inline-flex items-center gap-2 rounded-lg">
                <span>View operations</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className="btn-void px-6 py-3 font-mono2 text-[11px] tracking-[0.2em] uppercase rounded-lg">
                <span>Open channel</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — interactive 3D card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center justify-center"
          >
            <TiltCard />
          </motion.div>
        </div>
      </div>

      {/* Simplified horizontal divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
}
