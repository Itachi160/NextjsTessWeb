import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/uiStore';

export default function Preloader() {
  const [phase, setPhase] = useState<'countdown' | 'welcome' | 'to' | 'cloudsource' | 'matrix' | 'done'>('countdown');
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('00');
  const setPreloaderDone = useUIStore((state) => state.setPreloaderDone);
  const center = 190;
  const innerRadius = 138;
  const outerRadius = 162;
  const outerCircleRef = useRef<SVGCircleElement>(null);
  const innerCirclesRefs = useRef<(SVGCircleElement | null)[]>([]);
  const dotGridRef = useRef<SVGGElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const preloaderContainerRef = useRef<HTMLDivElement>(null);
  const [flightState, setFlightState] = useState<'intro' | 'flight'>('intro');
  const [targetRect, setTargetRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  const dotGrid = useMemo(() => {
    const dots = [];
    const size = 11;
    const spacing = 12;
    const start = center - Math.floor(size / 2) * spacing;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const x = start + c * spacing;
        const y = start + r * spacing;
        const dx = x - center;
        const dy = y - center;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= 56) {
          dots.push({ x, y, delay: dist * 0.015 });
        }
      }
    }
    return dots;
  }, []);

  useEffect(() => {
    if (phase !== 'countdown') return;

    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 6) + 3;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => setPhase('matrix'), 500);
      }
      setProgress(start);
      setGlitchText(start.toString().padStart(2, '0'));
    }, 55);

    return () => clearInterval(interval);
  }, [phase]);


  useEffect(() => {
    if (phase !== 'matrix') return;

    let rafId: number;
    let startTime = performance.now();
    let currentRotation = 0;
    let completedFinalRevolution = false;
    let closingAnimStart: number | null = null;

    const innerPerimeter = 2 * Math.PI * innerRadius; // ~867px

    const outerPerimeter = 2 * Math.PI * outerRadius; // ~1017px

    const animLoop = (now: number) => {
      const elapsed = (now - startTime) / 1000; // seconds

      if (elapsed < 3.2) {
        currentRotation = elapsed * 105; // 105 degrees per second

        if (outerCircleRef.current) {
          outerCircleRef.current.style.transform = `rotate(${currentRotation}deg)`;
          const outerOffset = outerPerimeter * (0.35 + Math.sin(elapsed * 2.2) * 0.15);
          outerCircleRef.current.setAttribute('stroke-dashoffset', String(outerOffset));
        }

        innerCirclesRefs.current.forEach((circle, idx) => {
          if (!circle) return;
          const segmentRot = idx * (360 / 7) - (currentRotation * 0.4);
          circle.style.transform = `rotate(${segmentRot}deg)`;

          const drawProgress = Math.min(1, Math.max(0, (elapsed - idx * 0.18) / 1.0));
          const offset = innerPerimeter * (1 - drawProgress);
          circle.setAttribute('stroke-dashoffset', String(offset));
        });
      }
      else if (elapsed >= 3.2 && !completedFinalRevolution) {
        if (closingAnimStart === null) {
          closingAnimStart = now;
        }
        const closingElapsed = (now - closingAnimStart) / 1000;
        const progress = Math.min(1, closingElapsed / 1.0);

        if (outerCircleRef.current) {
          const finalOffset = outerPerimeter * (1 - progress);
          outerCircleRef.current.setAttribute('stroke-dashoffset', String(finalOffset));
          outerCircleRef.current.style.transform = `rotate(${currentRotation + progress * 90}deg)`;
        }

        innerCirclesRefs.current.forEach((circle, idx) => {
          if (!circle) return;
          const segmentRot = idx * (360 / 7) - (currentRotation * 0.4) - (progress * 30);
          circle.style.transform = `rotate(${segmentRot}deg)`;
          circle.setAttribute('stroke-dashoffset', '0');
        });

        if (progress >= 1) {
          completedFinalRevolution = true;
        }
      }

      if (!completedFinalRevolution || elapsed < 5.8) {
        rafId = requestAnimationFrame(animLoop);
      }
    };

    rafId = requestAnimationFrame(animLoop);
    return () => cancelAnimationFrame(rafId);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'matrix') return;

    const timer = setTimeout(() => {
      const el = document.getElementById('navbar-logo-img');
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        });
      } else {
        setTargetRect({
          left: 48,
          top: 28,
          width: 36,
          height: 36
        });
      }
      setFlightState('flight');
    }, 4300);

    return () => clearTimeout(timer);
  }, [phase]);

  // Safety fallback timeout to guarantee the site is unlocked on any HMR state sync errors
  useEffect(() => {
    if (phase === 'done') return;
    const safetyTimer = setTimeout(() => {
      console.warn('Preloader safety fallback triggered. Unlocking page.');
      setPreloaderDone(true);
      setPhase('done');
    }, 7500); // 7.5 seconds absolute maximum preloader duration

    return () => clearTimeout(safetyTimer);
  }, [phase, setPreloaderDone]);

  const handleFinalComplete = () => {
    setPreloaderDone(true);
    setPhase('done');
  };

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={preloaderContainerRef}
        className={`fixed inset-0 z-[99999] bg-[#03050d] flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${flightState === 'flight' && phase === 'matrix' ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        initial={{ backgroundColor: 'rgba(3, 5, 13, 1)' }}
        animate={{
          backgroundColor: flightState === 'flight' && phase === 'matrix' ? 'rgba(3, 5, 13, 0)' : 'rgba(3, 5, 13, 1)'
        }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      >

        <motion.div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          animate={{ opacity: flightState === 'flight' && phase === 'matrix' ? 0 : 0.03 }}
          transition={{ duration: 0.5 }}
        />

        {phase !== 'matrix' && (
          <>
            <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-cyber-blue/5 blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-cyber-purple/5 blur-[120px] pointer-events-none animate-pulse" />
          </>
        )}

        <div className="relative z-10 flex flex-col items-center justify-center">
          {phase === 'countdown' && (
            <motion.div
              className="flex flex-col items-center gap-4"
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="text-7xl md:text-9xl font-mono font-black tracking-widest text-glow-cyan text-cyber-cyan animate-cyber-glitch select-none">
                {glitchText}%
              </div>
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                Initializing Quantum Core Engine
              </div>
              <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}



          {phase === 'matrix' && (
            <motion.div
              className="relative flex items-center justify-center w-[380px] h-[380px]"
              animate={flightState === 'flight' && targetRect ? {
                x: targetRect.left + targetRect.width / 2 - window.innerWidth / 2,
                y: targetRect.top + targetRect.height / 2 - window.innerHeight / 2,
                scale: targetRect.width / 176,
              } : {
                x: 0,
                y: 0,
                scale: 1
              }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                if (flightState === 'flight') {
                  handleFinalComplete();
                }
              }}
            >
              <motion.svg
                viewBox="0 0 380 380"
                className="absolute inset-0 w-full h-full pointer-events-none z-0 transform-gpu"
                style={{ willChange: 'transform' }}
                animate={{
                  opacity: flightState === 'flight' ? 0 : 1,
                  scale: flightState === 'flight' ? 0.3 : 1
                }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              >
                <g>
                  {Array.from({ length: 7 }).map((_, idx) => {
                    const rotAngle = idx * (360 / 7);
                    const colors = [
                      '#ef2d56',
                      '#f1a632',
                      '#a6e22e',
                      '#00e676',
                      '#00e5ff',
                      '#3b82f6',
                      '#b026ff',
                    ];
                    const strokeColor = colors[idx % colors.length];
                    const perimeter = 2 * Math.PI * innerRadius;
                    const seg = perimeter / 7 * 0.75;
                    const gap = perimeter - seg;
                    return (
                      <circle
                        key={idx}
                        ref={(el) => { innerCirclesRefs.current[idx] = el; }}
                        cx={center}
                        cy={center}
                        r={innerRadius}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="6.5"
                        strokeDasharray={`${seg} ${gap}`}
                        strokeLinecap="round"
                        style={{
                          transformOrigin: `${center}px ${center}px`,
                          transform: `rotate(${rotAngle}deg)`,
                          willChange: 'transform, stroke-dashoffset'
                        }}
                      />
                    );
                  })}
                </g>

                <circle
                  ref={outerCircleRef}
                  cx={center}
                  cy={center}
                  r={outerRadius}
                  fill="none"
                  stroke="#ef2d56"
                  strokeWidth="2.5"
                  strokeDasharray={`${2 * Math.PI * outerRadius}`}
                  style={{
                    transformOrigin: `${center}px ${center}px`,
                    willChange: 'transform, stroke-dashoffset'
                  }}
                />

                <circle
                  cx={center}
                  cy={center}
                  r="174"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                />

                <g ref={dotGridRef}>
                  {dotGrid.map((dot, idx) => (
                    <motion.circle
                      key={idx}
                      cx={dot.x}
                      cy={dot.y}
                      r="1.5"
                      fill="rgba(255, 74, 90, 0.35)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + dot.delay, ease: 'easeOut' }}
                    />
                  ))}
                </g>
              </motion.svg>

              <div
                ref={logoWrapperRef}
                className="relative z-10 w-48 h-48 flex items-center justify-center"
              >
                <motion.img
                  src="/Logo Hd.webp"
                  alt="Tesseract Logo"
                  className="w-44 h-44 object-contain filter invert brightness-[2.5] drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 1.3, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {phase === 'matrix' && (
          <motion.div
            className="absolute bottom-16 text-[9px] font-mono tracking-[0.4em] uppercase text-gray-500 flex items-center gap-2 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: flightState === 'flight' ? 0 : 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
            Decentralizing Core Network Modules
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
