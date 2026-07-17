import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/uiStore';

const easeOutQuad = (x: number) => x * (2 - x);
const easeInQuad = (x: number) => x * x;
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeOutExpo = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);

const PAT_COLORS = [
  '#ef2d56',
  '#f1a632',
  '#a6e22e',
  '#00e676',
  '#00e5ff',
  '#3b82f6',
  '#b026ff',
];

export default function Preloader() {
  const [timelineStage, setTimelineStage] = useState<'countdown' | 'boot'>('countdown');
  const [flightState, setFlightState] = useState<'intro' | 'flight'>('intro');
  const [targetRect, setTargetRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  const preloaderDone = useUIStore((state) => state.preloaderDone);
  const setPreloaderDone = useUIStore((state) => state.setPreloaderDone);

  const center = 190;
  const innerRadius = 138;
  const outerRadius = 162;

  const outerCircleRef = useRef<SVGCircleElement>(null);
  const innerCirclesRefs = useRef<(SVGCircleElement | null)[]>([]);
  const dotGridRef = useRef<SVGGElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoImageRef = useRef<HTMLImageElement>(null);
  const preloaderContainerRef = useRef<HTMLDivElement>(null);

  const innerSparksRefs = useRef<(SVGCircleElement | null)[]>([]);

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
          dots.push({ x, y });
        }
      }
    }
    return dots;
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setTimelineStage('boot');
    }, 1750);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timelineStage !== 'boot') return;

    let rafId: number;
    let startTime = 0;
    let lastTime = 0;

    let rotationAngle = 0;
    let currentSpeed = 0;
    let flightTriggered = false;

    const innerPerimeter = 2 * Math.PI * innerRadius;
    const outerPerimeter = 2 * Math.PI * outerRadius;

    const animLoop = (now: number) => {
      if (!startTime) {
        startTime = now;
        lastTime = now;
      }
      const elapsedBoot = now - startTime;
      const dt = now - lastTime;
      lastTime = now;

      if (elapsedBoot < 100) {
        innerCirclesRefs.current.forEach((circle) => {
          if (circle) circle.style.opacity = '0';
        });
        innerSparksRefs.current.forEach((spark) => {
          if (spark) spark.style.opacity = '0';
        });
        if (outerCircleRef.current) {
          outerCircleRef.current.style.opacity = '0';
          outerCircleRef.current.setAttribute('stroke-dashoffset', String(outerPerimeter));
        }
        if (logoImageRef.current) logoImageRef.current.style.opacity = '0';
        if (dotGridRef.current) dotGridRef.current.style.opacity = '0';
      }

      else if (elapsedBoot < 1800) {
        if (logoImageRef.current) logoImageRef.current.style.opacity = '0';
        const localT = elapsedBoot - 100;
        innerCirclesRefs.current.forEach((circle, idx) => {
          if (!circle) return;

          const patchStart = idx * 220;
          const patchDuration = 350;
          const spark = innerSparksRefs.current[idx];

          if (localT < patchStart) {
            circle.style.opacity = '0';
            if (spark) spark.style.opacity = '0';
          } else {
            const lp = Math.min(1, (localT - patchStart) / patchDuration);
            const easedLp = easeOutCubic(lp);
            circle.style.opacity = String(easedLp);

            const segProgress = easeOutExpo(lp);
            const seg = (innerPerimeter / 7) * 0.75;
            circle.setAttribute('stroke-dashoffset', String(seg * (1 - segProgress)));

            const flash = 1.0 + 1.2 * Math.sin(lp * Math.PI) * Math.exp(-lp * 2.5);
            circle.setAttribute('stroke-width', String(6.5 * flash));
            circle.style.filter = `drop-shadow(0 0 ${12 * lp}px ${circle.getAttribute('stroke')})`;

            if (spark) {
              if (lp < 0.99) {
                spark.style.opacity = '1';
                const rotAngle = idx * (360 / 7);
                const arcAngle = (360 / 7) * 0.75;

                const theta = (rotAngle + arcAngle * segProgress) * Math.PI / 180;
                const sparkX = center + innerRadius * Math.cos(theta);
                const sparkY = center + innerRadius * Math.sin(theta);

                spark.setAttribute('cx', String(sparkX));
                spark.setAttribute('cy', String(sparkY));

                const fR = 2.5 + Math.random() * 2.5;
                spark.setAttribute('r', String(fR));
                spark.setAttribute('fill', '#ffffff');
                spark.style.filter = `drop-shadow(0 0 5px #ffffff) drop-shadow(0 0 10px ${PAT_COLORS[idx]})`;
              } else {
                spark.style.opacity = '0';
              }
            }
          }
        });
      }

      else if (elapsedBoot < 3000) {
        if (logoImageRef.current) logoImageRef.current.style.opacity = '0';
        innerCirclesRefs.current.forEach((circle) => {
          if (circle) {
            circle.style.opacity = '1';
            circle.setAttribute('stroke-dashoffset', '0');
            circle.setAttribute('stroke-width', '6.5');
            circle.style.filter = `drop-shadow(0 0 8px ${circle.getAttribute('stroke')})`;
          }
        });
        innerSparksRefs.current.forEach((spark) => {
          if (spark) spark.style.opacity = '0';
        });

        if (outerCircleRef.current) {
          outerCircleRef.current.style.opacity = '1';
          const lp = (elapsedBoot - 1800) / 1200;
          const easedLp = easeOutCubic(lp);
          outerCircleRef.current.setAttribute('stroke-dashoffset', String(outerPerimeter * (1 - easedLp)));
          outerCircleRef.current.style.filter = `drop-shadow(0 0 ${8 * easedLp}px #ef2d56)`;
        }
      }

      else if (elapsedBoot < 3800) {
        if (logoImageRef.current) logoImageRef.current.style.opacity = '0';
        if (outerCircleRef.current) {
          outerCircleRef.current.setAttribute('stroke-dashoffset', '0');
        }

        const lp = (elapsedBoot - 3000) / 800;
        const targetSpeed = 120;
        currentSpeed = targetSpeed * easeInQuad(lp);
        rotationAngle += currentSpeed * (dt / 1000);

        if (outerCircleRef.current) {
          outerCircleRef.current.style.transform = `rotate(${rotationAngle}deg)`;
        }

        innerCirclesRefs.current.forEach((circle, idx) => {
          if (circle) {
            const baseRot = idx * (360 / 7);
            circle.style.transform = `rotate(${baseRot - (rotationAngle * 0.35)}deg)`;
          }
        });
      }

      else if (elapsedBoot < 5000) {
        rotationAngle += 120 * (dt / 1000);
        if (outerCircleRef.current) {
          outerCircleRef.current.style.transform = `rotate(${rotationAngle}deg)`;
        }
        innerCirclesRefs.current.forEach((circle, idx) => {
          if (circle) {
            const baseRot = idx * (360 / 7);
            circle.style.transform = `rotate(${baseRot - (rotationAngle * 0.35)}deg)`;
          }
        });

        const lp = (elapsedBoot - 3800) / 1200;
        const easedOpacity = easeOutQuad(lp);
        const easedScale = 0.88 + 0.12 * easeOutCubic(lp);
        const easedMask = easeOutCubic(lp) * 100;

        if (logoImageRef.current) {
          logoImageRef.current.style.opacity = String(easedOpacity);
          logoImageRef.current.style.transform = `scale(${easedScale})`;
          logoImageRef.current.style.clipPath = `circle(${easedMask}% at 50% 50%)`;
          logoImageRef.current.style.filter = `invert(1) brightness(2.5) drop-shadow(0 0 ${25 + easedOpacity * 15}px rgba(6,182,212,${0.45 + easedOpacity * 0.25}))`;
        }

        if (dotGridRef.current) {
          dotGridRef.current.style.opacity = String(easedOpacity * 0.7);
        }
      }

      else if (elapsedBoot < 6000) {
        rotationAngle += 120 * (dt / 1000);
        if (outerCircleRef.current) {
          outerCircleRef.current.style.transform = `rotate(${rotationAngle}deg)`;
        }
        innerCirclesRefs.current.forEach((circle, idx) => {
          if (circle) {
            const baseRot = idx * (360 / 7);
            circle.style.transform = `rotate(${baseRot - (rotationAngle * 0.35)}deg)`;
          }
        });

        const breatheT = elapsedBoot - 5000;
        const breatheScale = 1.0 + 0.015 * Math.sin(breatheT * 0.003);
        const breatheGlow = 0.6 + 0.4 * Math.sin(breatheT * 0.003);

        if (logoImageRef.current) {
          logoImageRef.current.style.opacity = '1';
          logoImageRef.current.style.transform = `scale(${breatheScale})`;
          logoImageRef.current.style.clipPath = 'circle(100% at 50% 50%)';
          logoImageRef.current.style.filter = `invert(1) brightness(2.5) drop-shadow(0 0 ${25 + breatheGlow * 15}px rgba(6,182,212,${0.45 + breatheGlow * 0.25}))`;
        }

        if (dotGridRef.current) {
          dotGridRef.current.style.opacity = String((0.6 + 0.2 * Math.sin(breatheT * 0.003)) * 0.7);
        }
      }

      else {
        if (!flightTriggered) {
          flightTriggered = true;
          setFlightState('flight');

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
        }

        const localT = elapsedBoot - 6000;
        const fadeDuration = 800;
        const fp = Math.min(1, localT / fadeDuration);
        const easedFp = easeOutQuad(fp);

        currentSpeed = Math.max(0, 120 * (1 - easedFp));
        rotationAngle += currentSpeed * (dt / 1000);

        if (outerCircleRef.current) {
          outerCircleRef.current.style.transform = `rotate(${rotationAngle}deg)`;
          outerCircleRef.current.style.opacity = String(Math.max(0, 1 - easedFp * 1.5));
        }

        innerCirclesRefs.current.forEach((circle, idx) => {
          if (circle) {
            const baseRot = idx * (360 / 7);
            circle.style.transform = `rotate(${baseRot - (rotationAngle * 0.35)}deg)`;
            circle.style.opacity = String(Math.max(0, 1 - easedFp * 1.5));
          }
        });

        if (dotGridRef.current) {
          dotGridRef.current.style.opacity = String(Math.max(0, 0.7 * (1 - easedFp * 1.5)));
        }
      }

      rafId = requestAnimationFrame(animLoop);
    };

    rafId = requestAnimationFrame(animLoop);
    return () => cancelAnimationFrame(rafId);
  }, [timelineStage]);

  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      console.warn('Preloader safety fallback triggered.');
      setPreloaderDone(true);
      setTimelineStage('boot');
    }, 11000);

    return () => clearTimeout(safetyTimer);
  }, [setPreloaderDone]);

  const handleFinalComplete = () => {
    setPreloaderDone(true);
  };

  if (preloaderDone) return null;
  if (timelineStage === 'boot' && !flightState) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={preloaderContainerRef}
        className={`fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${flightState === 'flight' ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        initial={{ backgroundColor: 'rgba(5, 5, 5, 1)' }}
        animate={{
          backgroundColor: flightState === 'flight' ? 'rgba(5, 5, 5, 0)' : 'rgba(5, 5, 5, 1)'
        }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      >

        {timelineStage === 'countdown' && (
          <div className="boot-container">

            <div className="boot-vignette" />

            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none transform-gpu"
              preserveAspectRatio="none"
            >
              <g className="boot-traces">
                <line x1="0" y1="30" x2="100" y2="30" className="trace-l2r" stroke="rgba(255,255,255,0.22)" strokeWidth="0.25" strokeDasharray="30 70" />
                <line x1="100" y1="70" x2="0" y2="70" className="trace-r2l" stroke="rgba(255,255,255,0.22)" strokeWidth="0.25" strokeDasharray="30 70" />
                <line x1="0" y1="50" x2="100" y2="50" className="trace-l2r" stroke="rgba(255,255,255,0.18)" strokeWidth="0.25" strokeDasharray="20 80" />

                <line x1="25" y1="0" x2="25" y2="100" className="trace-l2r" stroke="rgba(255,255,255,0.22)" strokeWidth="0.25" strokeDasharray="30 70" />
                <line x1="75" y1="100" x2="75" y2="0" className="trace-r2l" stroke="rgba(255,255,255,0.22)" strokeWidth="0.25" strokeDasharray="30 70" />
                <line x1="50" y1="0" x2="50" y2="100" className="trace-l2r" stroke="rgba(255,255,255,0.18)" strokeWidth="0.25" strokeDasharray="20 80" />
              </g>

              <g className="boot-panels">
                <rect x="8" y="10" width="22" height="12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" />
                <rect x="70" y="78" width="22" height="12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" />
              </g>
            </svg>

            <div className="boot-countdown-hud">
              <div className="count-number" />
              <div className="boot-diagnostic">
                <div className="diag-msg msg-1">INITIALIZING CORES...</div>
                <div className="diag-msg msg-2">SYNCING MEMORY REGISTER...</div>
                <div className="diag-msg msg-3">MOUNTING PORTAL INTERFACE...</div>
              </div>
            </div>

            <div className="absolute inset-0 boot-sweep bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none transform-gpu" />


          </div>
        )}

        {timelineStage === 'boot' && (
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
                  const perimeter = 2 * Math.PI * innerRadius;
                  const seg = (perimeter / 7) * 0.75;
                  const gap = perimeter - seg;
                  return (
                    <circle
                      key={idx}
                      ref={(el) => { innerCirclesRefs.current[idx] = el; }}
                      cx={center}
                      cy={center}
                      r={innerRadius}
                      fill="none"
                      stroke={PAT_COLORS[idx % PAT_COLORS.length]}
                      strokeWidth="6.5"
                      strokeDasharray={`${seg} ${gap}`}
                      strokeLinecap="round"
                      style={{
                        transformOrigin: `${center}px ${center}px`,
                        transform: `rotate(${rotAngle}deg)`,
                        willChange: 'transform, stroke-dashoffset, opacity, stroke-width, filter',
                        opacity: 0
                      }}
                    />
                  );
                })}
              </g>

              <g>
                {Array.from({ length: 7 }).map((_, idx) => (
                  <circle
                    key={`spark-${idx}`}
                    ref={(el) => { innerSparksRefs.current[idx] = el; }}
                    cx={center}
                    cy={center}
                    r="3"
                    fill="#ffffff"
                    style={{
                      transformOrigin: `${center}px ${center}px`,
                      opacity: 0,
                      willChange: 'cx, cy, r, opacity, filter'
                    }}
                  />
                ))}
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
                  willChange: 'transform, stroke-dashoffset, opacity, filter',
                  opacity: 0
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

              <g ref={dotGridRef} style={{ opacity: 0, willChange: 'opacity' }}>
                {dotGrid.map((dot, idx) => (
                  <circle
                    key={idx}
                    cx={dot.x}
                    cy={dot.y}
                    r="1.5"
                    fill="rgba(255, 74, 90, 0.3)"
                  />
                ))}
              </g>
            </motion.svg>

            <div
              ref={logoWrapperRef}
              className="relative z-10 w-48 h-48 flex items-center justify-center"
            >
              <img
                ref={logoImageRef}
                src="/Logo Hd.webp"
                alt="Tesseract Logo"
                className="w-44 h-44 object-contain filter invert brightness-[2.5] drop-shadow-[0_0_25px_rgba(6,182,212,0.4)] opacity-0"
                style={{ willChange: 'transform, opacity, clip-path, filter' }}
              />
            </div>
          </motion.div>
        )}


        {timelineStage === 'boot' && (
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
