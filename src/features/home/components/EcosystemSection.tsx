'use client';

import { useRef, useState } from 'react';
import { Compass, Network, Cpu } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import ScrollReveal from '../../../components/ScrollReveal';
import dynamic from 'next/dynamic';
import type { TechItem } from './TechSphere3D';

const TechSphere3D = dynamic(() => import('./TechSphere3D'), { ssr: false });

export default function EcosystemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative z-30 h-[180vh] lg:h-[220vh] w-full bg-[#03050d]">

      <section className="sticky top-0 z-30 h-screen w-full flex flex-col justify-center overflow-hidden bg-[#03050d] pt-24 pb-8 px-4 sm:px-6 isolate">

        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-cyber-cyan/5 blur-[150px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyber-purple/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto font-sans w-full relative z-10">

          <ScrollReveal direction="up" className="text-center mb-4 sm:mb-10">
            <h2 className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-cyber-cyan font-semibold mb-1 sm:mb-3">
              Operational Ecosystem
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white">
              Unified Technology{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">Stack</span>
            </h3>
            <p className="text-gray-400 text-[11px] sm:text-sm mt-1 sm:mt-4 max-w-xl mx-auto font-sans line-clamp-2 sm:line-clamp-none">
              Our modern engineering stack in action. The 3D sphere rotates dynamically with your scroll, letting you click nodes to inspect their architectural details.
            </p>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 items-center w-full">

            <div className="w-full lg:w-1/2 flex justify-center items-center relative min-h-[260px] sm:min-h-[320px] lg:min-h-[460px]">
              <TechSphere3D onSelect={setSelectedTech} selectedTech={selectedTech} scrollProgress={scrollYProgress} />
            </div>

            <div className="w-full lg:w-1/2 relative z-10">
              <div className="glass-card p-4 sm:p-5 md:p-8 rounded-2xl border border-white/[0.08] min-h-[220px] sm:min-h-[280px] lg:min-h-[380px] flex flex-col justify-center relative overflow-hidden shadow-2xl bg-space-darkest/45 backdrop-blur-md">
                <div className="absolute inset-0 cyber-grid opacity-[0.04] pointer-events-none" />

                <AnimatePresence mode="wait">
                  {selectedTech ? (
                    <motion.div
                      key={selectedTech.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-3 sm:gap-5 relative z-10 text-left"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                          <img
                            src={selectedTech.logo}
                            alt={selectedTech.name}
                            className="w-6 h-6 sm:w-9 sm:h-9 object-contain pointer-events-none"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div>
                          <span className="text-[8px] sm:text-[10px] uppercase font-mono tracking-wider text-cyber-cyan px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/25 font-bold font-mono">
                            {selectedTech.category}
                          </span>
                          <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-white mt-1 sm:mt-2 leading-tight">
                            {selectedTech.name}
                          </h4>
                        </div>
                      </div>

                      <p className="text-gray-300 text-xs sm:text-[13px] leading-relaxed mt-1 sm:mt-2 font-sans">{selectedTech.desc}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-3 sm:pt-5 border-t border-white/5">
                        <div>
                          <span className="text-[8px] sm:text-[10px] uppercase font-mono text-gray-500 block">Primary Application</span>
                          <span className="text-[11px] sm:text-xs font-bold text-white mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-1.5 font-mono">
                            <Compass className="w-3.5 h-3.5 text-cyber-cyan" />
                            {selectedTech.useCase}
                          </span>
                        </div>
                        <div>
                          <span className="text-[8px] sm:text-[10px] uppercase font-mono text-gray-500 block">Architectural Advantage</span>
                          <span className="text-[11px] sm:text-xs font-bold text-white mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-1.5 font-mono">
                            <Network className="w-3.5 h-3.5 text-cyber-purple" />
                            {selectedTech.strength}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-tech"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center flex flex-col items-center gap-2 sm:gap-4 relative z-10"
                    >
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl border border-white/10 flex items-center justify-center text-cyber-cyan bg-white/[0.03] shadow-inner">
                        <Cpu className="w-5 h-5 sm:w-7 sm:h-7" />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-200">Select a Technology</h4>
                      <p className="text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed font-sans">
                        Click on any logo in the 3D rotating sphere to explore its role in our enterprise cloud architecture stack.
                      </p>
                      <div className="flex flex-wrap gap-1.5 justify-center mt-1 sm:mt-2 font-mono text-[8px] sm:text-[9px] text-gray-500">
                        {['17 Stack Components', 'Fibonacci Sphere', 'Interactive Hub'].map((tag) => (
                          <span key={tag} className="bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
