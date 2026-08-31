import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AmbientBackground, CursorFX, Preloader, ScrollProgress, SystemToast,
} from './fx';
import { Hero } from './hero';
import { About, Experience, Projects, Skills } from './sections';
import { Contact, Footer, Now, Research } from './sections2';

/* =========================================================
   NAVBAR — transparent until scroll, border draws itself
 ========================================================= */
const NAV_LINKS = [
  { label: 'Dossier', href: '#about' },
  { label: 'Chronicle', href: '#experience' },
  { label: 'Arsenal', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Now', href: '#now' },
  { label: 'Contact', href: '#contact' },
];

function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -36, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-[70] transition-colors duration-500 ${
        scrolled ? 'bg-[#030408]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/* self-drawing border */}
      <span
        className={`absolute bottom-0 left-0 right-0 h-px origin-left transition-transform duration-700 ease-out ${
          scrolled ? 'scale-x-100' : 'scale-x-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, #a855f7, #00f2fe 60%, rgba(0,242,254,0.2))',
          boxShadow: '0 0 14px rgba(0,242,254,0.65)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a href="#home" className="logo-ul font-display text-xl md:text-2xl tracking-widest text-white uppercase">
          sarvajith<span className="red">.</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flicker-hover font-mono2 text-[11px] tracking-[0.28em] uppercase text-zinc-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <span className="rec-dot" />
          <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-zinc-400">
            AI Intern <span className="red">@</span> Maveric
          </span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] border border-[rgba(0,242,254,0.4)] bg-black/60"
        >
          <span className={`block w-5 h-px bg-[#00f2fe] transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`block w-5 h-px bg-[#00f2fe] transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#00f2fe] transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:hidden overflow-hidden bg-[#030408]/95 backdrop-blur-xl border-t border-[rgba(0,242,254,0.2)]"
          >
            <div className="px-6 py-4 flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flicker-hover py-3.5 font-mono2 text-xs tracking-[0.3em] uppercase text-zinc-300 border-b border-[rgba(0,242,254,0.12)] flex items-center gap-3"
                >
                  <span className="red">0{i + 1}</span> {l.label}
                </a>
              ))}
              <div className="py-4 flex items-center gap-2.5">
                <span className="rec-dot" />
                <span className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-zinc-500">
                  AI Intern <span className="red">@</span> Maveric
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* =========================================================
   APP
 ========================================================= */
export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [booted, setBooted] = useState(false);
  const [toast, setToast] = useState(false);

  const onReveal = useCallback(() => setRevealed(true), []);
  const onDone = useCallback(() => {
    setBooted(true);
    setToast(true);
    window.setTimeout(() => setToast(false), 4200);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030408] text-white overflow-x-clip">
      <AmbientBackground />
      <CursorFX />
      <ScrollProgress />

      {!booted && <Preloader onReveal={onReveal} onDone={onDone} />}

      <AnimatePresence>{toast && <SystemToast key="toast" />}</AnimatePresence>

      <Navbar visible={revealed} />

      <main className="relative z-10">
        <Hero ready={revealed} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Research />
        <Now />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
