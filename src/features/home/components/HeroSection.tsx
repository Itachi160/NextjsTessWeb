'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { gsap } from 'gsap';
import MagneticButton from '../../../components/MagneticButton';
import { useUIStore } from '../../../store/uiStore';
import TextScramble from '../../../components/TextScramble';

const HERO_TECHS = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', x: '8%', y: '18%', size: 40, depth: 0.8, delay: 0 },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', x: '88%', y: '22%', size: 36, depth: 0.5, delay: 1 },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', x: '15%', y: '70%', size: 34, depth: 0.6, delay: 2 },
  { name: 'K8s', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', x: '82%', y: '65%', size: 38, depth: 0.7, delay: 0.5 },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', x: '5%', y: '45%', size: 42, depth: 0.4, delay: 1.5 },
  { name: 'Node', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', x: '92%', y: '45%', size: 34, depth: 0.6, delay: 3 },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', x: '25%', y: '85%', size: 32, depth: 0.3, delay: 2.5 },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', x: '75%', y: '82%', size: 30, depth: 0.5, delay: 1.8 },
];

const STATS = [
  { label: 'Enterprise Pilots', value: 2, suffix: '' },
  { label: 'SLA Core Uptime', value: 99.9, suffix: '%', decimals: 1 },
  { label: 'Active Interns', value: 15, suffix: '+' },
  { label: 'Training Stacks', value: 5, suffix: '' },
];

export default function HeroSection() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const preloaderDone = useUIStore((state) => state.preloaderDone);
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let rectCache: DOMRect | null = null;
    const hero = heroRef.current;
    if (hero) {
      rectCache = hero.getBoundingClientRect();
    }

    const handleResize = () => {
      if (hero) {
        rectCache = hero.getBoundingClientRect();
      }
    };

    const handleMouseEnter = () => {
      if (hero) {
        rectCache = hero.getBoundingClientRect();
      }
    };

    let rafScheduled = false;

    const updateParallax = () => {
      rafScheduled = false;
      floatingRefs.current.forEach((el, i) => {
        if (!el) return;
        const tech = HERO_TECHS[i];
        gsap.to(el, {
          x: mousePos.current.x * 30 * tech.depth,
          y: mousePos.current.y * 30 * tech.depth,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    const handleMouse = (e: MouseEvent) => {
      if (!rectCache) return;
      mousePos.current = {
        x: (e.clientX - rectCache.left) / rectCache.width - 0.5,
        y: (e.clientY - rectCache.top) / rectCache.height - 0.5,
      };
      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    if (hero) {
      hero.addEventListener('mousemove', handleMouse, { passive: true });
      hero.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      if (hero) {
        hero.removeEventListener('mousemove', handleMouse);
        hero.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  useEffect(() => {
    if (!preloaderDone) return;
    const duration = 2000;
    const startTime = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const val = stat.value * eased;
        el.textContent = (stat as any).decimals ? val.toFixed((stat as any).decimals) : String(Math.round(val));
      });
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [preloaderDone]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, damping: 20, stiffness: 100 } },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6"
    >

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,35,60,0.05) 0%, transparent 70%)' }}
      />
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#ef233c]/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] rounded-full bg-[#ef233c]/[0.03] blur-[100px] pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
        }}
      />
      {HERO_TECHS.map((tech, i) => (
        <div
          key={tech.name}
          ref={(el) => { floatingRefs.current[i] = el; }}
          className="absolute pointer-events-none hidden md:block"
          style={{ left: tech.x, top: tech.y }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15 + tech.depth * 0.25, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 + tech.delay * 0.2 }}
            className="relative"
          >
            <div
              className="rounded-xl border border-white/[0.06] bg-space-darker/40 backdrop-blur-sm p-2 flex items-center justify-center"
              style={{ width: tech.size + 16, height: tech.size + 16 }}
            >
              <img src={tech.logo} alt={tech.name} className="object-contain" style={{ width: tech.size, height: tech.size }} loading="lazy" decoding="async" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-xl border border-cyber-cyan/10"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + tech.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      ))}

      <motion.div
        className="max-w-4xl w-full mx-auto flex flex-col items-center gap-8 z-10 mt-16"
        animate={{
          filter: preloaderDone ? 'blur(0px)' : 'blur(15px)',
          opacity: preloaderDone ? 1 : 0
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.div
          className="flex flex-col items-center gap-6 text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate={preloaderDone ? "visible" : "hidden"}
        >

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ef233c]/20 bg-white/[0.03] backdrop-blur-md text-[11px] font-bold uppercase tracking-widest"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef233c] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef233c]" />
            </span>
            <span className="text-red-100/90">
              <TextScramble text="Enterprise Cloud & Intelligence" trigger={preloaderDone} delay={200} />
            </span>
            <ArrowRight className="w-3 h-3 text-[#ef233c]" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] w-full"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
              <TextScramble text="Engineering the Future" trigger={preloaderDone} delay={450} />
            </span>
            <span className="block">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                <TextScramble text="Through " trigger={preloaderDone} delay={600} />
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-[#ef233c] inline-block relative">
                <TextScramble text="Cloud Innovation" trigger={preloaderDone} delay={700} />

                <svg className="absolute w-full h-3 -bottom-2 left-0 opacity-60 text-[#ef233c]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed"
          >
            <TextScramble
              text="Transforming complex legacy structures into scalable software architecture, AI engines, and automated cloud platforms designed for enterprise execution."
              trigger={preloaderDone}
              delay={950}
              duration={1000}
            />
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5 mt-4">

            <MagneticButton strength={0.2}>
              <Link
                href="/contact"
                className="shiny-cta group"
                onMouseEnter={() => setCursorType('magnetic')}
                onMouseLeave={() => setCursorType('default')}
              >
                <span className="relative z-10 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                  Start Your Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <Link
                href="/services"
                className="group px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-wider hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center gap-2"
                onMouseEnter={() => setCursorType('magnetic')}
                onMouseLeave={() => setCursorType('default')}
              >
                <Terminal className="w-4 h-4" />
                Explore Services
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full max-w-5xl mx-auto mt-20 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="glass-card rounded-2xl border border-white/[0.06] p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">
                <span ref={(el) => { counterRefs.current[i] = el; }}>0</span>
                <span className="text-cyber-cyan">{stat.suffix}</span>
              </div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
        <span className="text-[10px] tracking-widest uppercase text-gray-500 font-mono">Scroll</span>
        <div className="w-5 h-9 border border-white/15 rounded-full flex justify-center p-1.5">
          <motion.div
            className="w-1 h-1 bg-cyber-cyan rounded-full"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}
