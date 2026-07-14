import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useUIStore } from '../store/uiStore';

const LOGS = [
  'INITIALIZING PORTAL_WARP...',
  'COMPILING DESTINATION_MATRIX...',
  'SYNC_LINK_ESTABLISHED',
  'DECRYPTING PORTAL_LINK...',
  'SYS_WARP: OK // ROUTING_COMPLETE'
];

export default function CinematicTransition() {
  const isTransitioning = useUIStore((state) => state.isTransitioning);
  const [logIndex, setLogIndex] = useState(0);
  const [hexText, setHexText] = useState('0x0000');

  useEffect(() => {
    if (!isTransitioning) {
      setLogIndex(0);
      return;
    }

    // Cycle through telemetry log texts rapidly
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < LOGS.length - 1 ? prev + 1 : prev));
    }, 180);

    // Scramble hex values
    const hexInterval = setInterval(() => {
      const hex = Array.from({ length: 4 })
        .map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase())
        .join('');
      setHexText(`0x${hex}`);
    }, 40);

    return () => {
      clearInterval(logInterval);
      clearInterval(hexInterval);
    };
  }, [isTransitioning]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 w-full h-full z-[99999] bg-[#03050d]/98 backdrop-blur-2xl flex items-center justify-center overflow-hidden"
        >
          {/* Holographic matrix background grids */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Glowing laser swipe line */}
          <motion.div
            initial={{ translateY: '-100vh' }}
            animate={{ translateY: '100vh' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-[0_0_20px_#06b6d4] z-10"
          />

          <div className="flex flex-col items-center gap-6 relative z-20">
            {/* Spinning gyroscopic loader */}
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Outer circular animated SVG track */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
                className="absolute w-52 h-52"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#cyan-grad)"
                  strokeWidth="2"
                  strokeDasharray="60 120"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Inner counter-rotating circular animated SVG track */}
              <motion.svg
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="absolute w-40 h-40"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#purple-grad)"
                  strokeWidth="2.5"
                  strokeDasharray="40 80"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Orbiting glowing dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="absolute w-48 h-48 pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-cyber-cyan shadow-[0_0_12px_#06b6d4] animate-pulse" />
              </motion.div>

              {/* Orbiting purple glowing dot on a second axis */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                className="absolute w-36 h-36 pointer-events-none"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyber-purple shadow-[0_0_10px_#a855f7]" />
              </motion.div>

              {/* Central Logo Container */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="absolute w-24 h-24 rounded-3xl bg-[#05091e]/85 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] p-4"
              >
                <img src="/Logo Hd.webp" alt="Transition Logo" className="w-full h-full object-contain filter invert brightness-[2.5]" />
              </motion.div>
            </div>

            {/* Readouts panel */}
            <div className="flex flex-col items-center gap-1 font-mono text-center select-none">
              <span className="text-[10px] tracking-widest text-cyber-cyan uppercase font-bold animate-pulse">
                HOLOGRAPHIC COMPILER ACTIVE
              </span>
              <div className="text-[12px] text-white font-bold h-5 mt-2">
                {LOGS[logIndex]}
              </div>
              <div className="text-[9px] text-gray-500 mt-1.5 flex gap-3 items-center justify-center">
                <span>PORTAL_ADDR: <span className="text-cyber-purple">{hexText}</span></span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>LINK_STRENGTH: <span className="text-cyber-green">100%</span></span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
