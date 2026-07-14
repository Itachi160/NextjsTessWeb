'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import Preloader from './Preloader';
import CinematicTransition from './CinematicTransition';
import { MessageSquare } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// Register ScrollTrigger client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import ThreeCanvas with SSR disabled since Three.js relies on WebGL/window
const ThreeCanvas = dynamic(() => import('./three/ThreeCanvas'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const setIsTransitioning = useUIStore((state) => state.setIsTransitioning);
  const setCursorType = useUIStore((state) => state.setCursorType);
  const [mountThree, setMountThree] = useState(false);

  // Defer loading Three.js until idle callback or timeout to optimize initial FCP/LCP
  useEffect(() => {
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
    const handle = idleCallback(() => {
      setMountThree(true);
    });
    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, []);

  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Syncs touch scrolling on mobile to emulate smooth scrolling
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll position update checks with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      // time is in seconds from gsap.ticker, lenis expects milliseconds
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Reset scroll ONLY on actual page transitions (prevents scrolling to top on HMR hot-reloads or tab focus re-syncs)
  const prevPathname = useRef<string | null>(null);
  useEffect(() => {
    if (prevPathname.current !== null && prevPathname.current !== pathname) {
      window.scrollTo(0, 0);
    }
    prevPathname.current = pathname;
  }, [pathname]);

  const handleContactClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/contact');
    }, 450);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  // Only render the Three.js background on pages that benefit from it.
  // Login has its own NeuralBackground — mounting ThreeCanvas there doubles GPU load.
  const showThreeCanvas = pathname !== '/login';

  return (
    <div className="relative min-h-screen text-white">
      {/* Cinematic intro preloader */}
      <Preloader />

      {/* Cinematic page transition */}
      <CinematicTransition />

      {/* 3D Particle Background - only on non-login pages */}
      {showThreeCanvas && mountThree && (
        <ThreeCanvas />
      )}

      {/* ═══ Global Parallax Star Field ═══ */}
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden z-0 global-starfield" 
        style={{ background: 'linear-gradient(180deg, #120303 0%, #080101 45%, #000000 100%)' }}
      >
        {/* Layer 1: Small fast stars */}
        <div
          className="absolute top-0 left-0 w-[1px] h-[1px] bg-transparent stars-layer-1"
          style={{ animation: 'animStar 28s linear infinite' }}
        />
        {/* Layer 2: Medium slower stars */}
        <div
          className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent stars-layer-2"
          style={{ animation: 'animStar 45s linear infinite' }}
        />
        {/* Layer 3: Coloured accent stars (very slow) */}
        <div
          className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent stars-layer-3"
          style={{ animation: 'animStar 75s linear infinite' }}
        />
      </div>

      {/* DOM Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </div>

      {/* Floating vertical contact badge */}
      {pathname !== '/contact' && (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center pointer-events-none">
          <motion.button
            onClick={handleContactClick}
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 100 }}
            className="pointer-events-auto flex flex-col items-center gap-3 py-5 px-3 bg-[#03050d]/90 backdrop-blur-xl border-y border-l border-cyber-cyan/30 hover:border-cyber-cyan rounded-l-2xl text-white font-mono text-[9px] tracking-[0.2em] font-extrabold uppercase shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:-translate-x-1 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-cyber-cyan" />
            </div>
            <span className="[writing-mode:vertical-lr] rotate-180 select-none">Contact Us</span>
          </motion.button>
        </div>
      )}

      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
}
