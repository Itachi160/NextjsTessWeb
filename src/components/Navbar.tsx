'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Home, Info, Cpu, Layers, Briefcase, Mail } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import MagneticButton from './MagneticButton';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Services', path: '/services', icon: Cpu },
  { name: 'Solutions', path: '/solutions', icon: Layers },
  { name: 'Careers', path: '/careers', icon: Briefcase },
  { name: 'Contact', path: '/contact', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const setCursorType = useUIStore((state) => state.setCursorType);
  const setIsTransitioning = useUIStore((state) => state.setIsTransitioning);
  const preloaderDone = useUIStore((state) => state.preloaderDone);
  const handleMouseEnter = () => setCursorType('hover');
  const handleMouseLeave = () => setCursorType('default');

  const handleNav = (path: string) => {
    if (pathname === path) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    setIsTransitioning(true);

    setTimeout(() => {
      router.push(path);
    }, 450);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  return (
    <header className="fixed top-5 left-0 w-full z-[100] px-4 md:px-8 pointer-events-none">
      <motion.div
        className="max-w-7xl mx-auto h-16 rounded-full border border-white/10 bg-[#03050d]/80 backdrop-blur-xl flex items-center justify-between px-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 pointer-events-auto hover:border-white/20 relative transform-gpu will-change-transform"
        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        initial={{ clipPath: 'inset(0 90% 0 0 round 32px)' }}
        animate={preloaderDone ? {
          clipPath: 'inset(0 0% 0 0 round 32px)',
        } : {
          clipPath: 'inset(0 90% 0 0 round 32px)',
        }}
        transition={{
          clipPath: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        }}
      >

        {preloaderDone && (
          <motion.div
            className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyber-cyan via-white to-cyber-purple shadow-[0_0_15px_rgba(6,182,212,0.8)] z-30 pointer-events-none rounded-full"
            initial={{ left: '36px', opacity: 0 }}
            animate={{ left: ['36px', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 text-white font-black text-xl tracking-wider uppercase group cursor-pointer text-left"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            id="navbar-logo-img"
            className="w-9 h-9 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 transition-opacity duration-300"
            style={{ opacity: preloaderDone ? 1 : 0 }}
          >
            <img
              src="/Logo Hd.webp"
              alt="Logo"
              className="w-full h-full object-contain filter invert brightness-[2.5] drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            />
          </div>
          <motion.span
            className="font-sans text-[11px] xs:text-xs md:text-sm font-black tracking-wider sm:tracking-widest text-glow-cyan bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-cyber-cyan whitespace-nowrap block"
            initial={{ x: -15, opacity: 0 }}
            animate={preloaderDone ? { x: 0, opacity: 1 } : { x: -15, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            Tesseract Infosystems
          </motion.span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  className="relative py-1.5"
                  onMouseEnter={() => {
                    handleMouseEnter();
                    setHoveredPath(item.path);
                  }}
                  onMouseLeave={() => {
                    handleMouseLeave();
                    setHoveredPath(null);
                  }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={preloaderDone ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 + idx * 0.07, type: 'spring', stiffness: 130, damping: 13 }}
                >
                  <button
                    onClick={() => handleNav(item.path)}
                    className={`relative px-4 py-2 text-xs font-bold tracking-wider uppercase cursor-pointer transition-colors duration-300 z-10 block ${isActive ? 'text-white text-glow-cyan' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    {item.name}
                  </button>

                  {isActive && (
                    <motion.span
                      layoutId="activeNavHighlight"
                      className="absolute inset-x-2 inset-y-1 z-0 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    >

                      <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyber-cyan shadow-[1px_-1px_4px_rgba(6,182,212,0.4)]" />

                      <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyber-cyan shadow-[-1px_1px_4px_rgba(6,182,212,0.4)]" />
                    </motion.span>
                  )}

                  {hoveredPath === item.path && (
                    <motion.span
                      layoutId="hoverNavHighlight"
                      className="absolute inset-y-1 inset-x-0 rounded-full bg-white/[0.04] border border-white/5 shadow-[inset_0_0_8px_rgba(255,255,255,0.03)] z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.button
            onClick={() => handleNav('/login')}
            className="text-[10px] uppercase font-bold tracking-widest font-mono text-gray-400 hover:text-white transition-all cursor-pointer mr-2 py-2 px-4 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }}
            animate={preloaderDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
          >
            Login
          </motion.button>

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={preloaderDone ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.15, type: 'spring', stiffness: 200 }}
          >
            <MagneticButton strength={0.25}>
              <button
                onClick={() => handleNav('/contact')}
                className="btn-cyber-primary cyber-sheen px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-lg cursor-pointer block relative overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Start Project
              </button>
            </MagneticButton>
          </motion.div>
        </nav>

        <button
          className="md:hidden text-white hover:text-cyber-cyan transition-colors pointer-events-auto"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden absolute top-20 left-4 right-4 bg-[#03050d]/95 backdrop-blur-2xl border border-white/10 rounded-2xl py-8 px-6 flex flex-col gap-5 shadow-2xl z-50 pointer-events-auto"
          >
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyber-cyan/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyber-cyan/30" />

            <div className="flex flex-col gap-1 border-b border-white/5 pb-2">
              <span className="text-[10px] font-sans text-gray-500 font-bold tracking-widest uppercase">Navigation</span>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="flex flex-col gap-2"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                const ItemIcon = item.icon;
                return (
                  <motion.button
                    key={item.path}
                    variants={{
                      hidden: { x: -10, opacity: 0 },
                      visible: { x: 0, opacity: 1 }
                    }}
                    onClick={() => handleNav(item.path)}
                    className={`flex items-center justify-between py-3 border-b border-white/5 text-xs font-bold uppercase tracking-wider text-left cursor-pointer transition-colors duration-300 ${isActive ? 'text-cyber-cyan font-black' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <ItemIcon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyber-cyan' : 'text-gray-500'}`} />
                      <span className="font-sans font-extrabold tracking-widest">{item.name}</span>
                    </div>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_#06b6d4]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>

            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => handleNav('/login')}
                className="text-center text-xs font-sans font-bold tracking-wider uppercase text-gray-400 hover:text-white cursor-pointer py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
              >
                Login
              </button>
              <button
                onClick={() => handleNav('/contact')}
                className="btn-cyber-primary py-3.5 rounded-xl text-center text-xs font-sans font-bold tracking-wider uppercase text-white shadow-lg mt-2 cursor-pointer"
              >
                Start Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
