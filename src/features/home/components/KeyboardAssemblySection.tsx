'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Server, Cpu, Play, ChevronRight, Activity } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import MagneticButton from '../../../components/MagneticButton';
import { isSlowConnection, isLowEndDevice } from '../../../utils/performance';

const getFramePath = (index: number, isSlow: boolean) => {
  const mappedIndex = isSlow ? index * 2 : index;
  const paddedIndex = String(mappedIndex).padStart(3, '0');
  return encodeURI(`/Keyboard Assemble Animation/Video 4_${paddedIndex}.webp`);
};

let cachedImages: HTMLImageElement[] = [];
let cachedImagesLoaded = false;
let cachedFrameCount = 0;

export default function KeyboardAssemblySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isIntersectingRef = useRef(false);
  const drawFrameRef = useRef<(latest: number) => void>(() => { });

  const { totalFrames, isSlow } = useMemo(() => {
    const slow = isSlowConnection() || isLowEndDevice();
    return {
      isSlow: slow,
      totalFrames: slow ? 41 : 81,
    };
  }, []);

  const setCursorType = useUIStore((state) => state.setCursorType);
  const router = useRouter();
  const setIsTransitioning = useUIStore((state) => state.setIsTransitioning);

  const handlePageNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(path);
    }, 450);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesArray, setImagesArray] = useState<HTMLImageElement[]>([]);
  const [activeSection, setActiveSection] = useState<'overview' | 'tactility' | 'latency' | 'orchestration' | 'deploy'>('overview');
  const [shouldPreload, setShouldPreload] = useState(false);

  useEffect(() => {
    if (cachedImagesLoaded && cachedFrameCount === totalFrames) {
      setImagesLoaded(true);
      setLoadProgress(100);
      setImagesArray(cachedImages);
      setShouldPreload(true);
    }
  }, [totalFrames]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animObserver = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = entry.isIntersecting;
    }, { threshold: 0.01 });
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldPreload(true);
        preloadObserver.disconnect();
      }
    }, { threshold: 0.01, rootMargin: '1200px 0px 1200px 0px' });

    animObserver.observe(container);
    preloadObserver.observe(container);

    return () => {
      animObserver.disconnect();
      preloadObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (cachedImagesLoaded && cachedFrameCount === totalFrames) {
      setImagesLoaded(true);
      setLoadProgress(100);
      setImagesArray(cachedImages);
      return;
    }

    if (!shouldPreload) return;

    let isAborted = false;
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      tempImages[i] = new Image();
    }

    const handleSingleLoad = () => {
      if (isAborted) return;
      loadedCount++;
      const progress = Math.round((loadedCount / totalFrames) * 100);

      if (progress % 5 === 0 || progress === 100) {
        setLoadProgress(progress);
      }

      if (loadedCount === totalFrames) {
        cachedImages = tempImages;
        cachedImagesLoaded = true;
        cachedFrameCount = totalFrames;
        setImagesArray(tempImages);
        setImagesLoaded(true);
      }
    };

    const initialBatchSize = 12;
    for (let i = 0; i < Math.min(initialBatchSize, totalFrames); i++) {
      tempImages[i].src = getFramePath(i, isSlow);
      tempImages[i].onload = handleSingleLoad;
      tempImages[i].onerror = () => {
        console.error(`Failed to load image frame at index: ${i}`);
        handleSingleLoad();
      };
    }

    const remainingIndices = Array.from(
      { length: totalFrames - initialBatchSize },
      (_, i) => i + initialBatchSize
    );
    const concurrentLimit = 6;
    let queueIndex = 0;

    const loadNext = () => {
      if (isAborted || queueIndex >= remainingIndices.length) return;
      const currentIdx = remainingIndices[queueIndex++];

      const img = tempImages[currentIdx];
      img.src = getFramePath(currentIdx, isSlow);
      img.onload = () => {
        handleSingleLoad();
        loadNext();
      };
      img.onerror = () => {
        console.error(`Failed to load image frame at index: ${currentIdx}`);
        handleSingleLoad();
        loadNext();
      };
    };

    for (let c = 0; c < concurrentLimit; c++) {
      loadNext();
    }

    return () => {
      isAborted = true;
    };
  }, [shouldPreload, totalFrames, isSlow]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (!imagesLoaded || imagesArray.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastValue = -1;
    let lastSection: typeof activeSection = 'overview';

    let rect = canvas.getBoundingClientRect();

    let cachedDpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2.0);
    let smoothingSet = false;

    const handleResize = () => {
      rect = canvas.getBoundingClientRect();
      cachedDpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2.0);
      smoothingSet = false;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const getSectionForProgress = (latest: number): typeof activeSection => {
      if (latest < 0.18) return 'overview';
      if (latest < 0.45) return 'tactility';
      if (latest < 0.70) return 'latency';
      if (latest < 0.88) return 'orchestration';
      return 'deploy';
    };

    const drawFrame = (latest: number) => {
      if (!isIntersectingRef.current) return;

      const newSection = getSectionForProgress(latest);
      if (newSection !== lastSection) {
        lastSection = newSection;
        setActiveSection(newSection);
      }

      if (latest === lastValue) return;
      lastValue = latest;

      const rawFrame = latest < 0.85
        ? (latest / 0.85) * (totalFrames - 1)
        : (totalFrames - 1);

      const floatFrame = Math.min(totalFrames - 1, Math.max(0, rawFrame));
      const frameIndex = Math.floor(floatFrame);
      const nextFrameIndex = Math.min(totalFrames - 1, frameIndex + 1);
      const ratio = floatFrame - frameIndex;

      const img1 = imagesArray[frameIndex];
      const img2 = imagesArray[nextFrameIndex];

      if (img1 && img1.complete) {
        const dpr = cachedDpr;

        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);
          smoothingSet = false;
        }

        if (!smoothingSet) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          smoothingSet = true;
        }

        const imgRatio = img1.width / img1.height;
        const canvasRatio = rect.width / rect.height;

        let drawW = rect.width;
        let drawH = rect.height;
        let drawX = 0;
        let drawY = 0;

        if (imgRatio > canvasRatio) {
          drawW = rect.width;
          drawH = rect.width / imgRatio;
          drawY = (rect.height - drawH) / 2;
        } else {
          drawH = rect.height;
          drawW = rect.height * imgRatio;
          drawX = (rect.width - drawW) / 2;
        }

        ctx.globalAlpha = 1.0;
        ctx.drawImage(img1, drawX, drawY, drawW, drawH);
        if (ratio > 0.005 && img2 && img2.complete && frameIndex !== nextFrameIndex) {
          ctx.globalAlpha = ratio;
          ctx.drawImage(img2, drawX, drawY, drawW, drawH);
          ctx.globalAlpha = 1.0;
        }
      }
    };

    drawFrameRef.current = drawFrame;
    drawFrame(scrollYProgress.get());

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      drawFrame(latest);
    });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded, imagesArray, scrollYProgress, totalFrames]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imagesLoaded) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          drawFrameRef.current(scrollYProgress.get());
        });
      }
    }, { threshold: 0.01 });

    observer.observe(container);
    return () => observer.disconnect();
  }, [imagesLoaded, scrollYProgress]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12, 0.18], [0, -30, -50]);
  const heroVisibility = useTransform(scrollYProgress, (v) => v > 0.18 ? 'hidden' : 'visible');
  const heroPointerEvents = useTransform(scrollYProgress, (v) => v > 0.18 ? 'none' : 'auto');

  const sec2Opacity = useTransform(scrollYProgress, [0.18, 0.23, 0.40, 0.45], [0, 1, 1, 0]);
  const sec2X = useTransform(scrollYProgress, [0.18, 0.23, 0.40, 0.45], [-50, 0, 0, -50]);
  const sec2Visibility = useTransform(scrollYProgress, (v) => (v < 0.18 || v > 0.45) ? 'hidden' : 'visible');
  const sec2PointerEvents = useTransform(scrollYProgress, (v) => (v < 0.18 || v > 0.45) ? 'none' : 'auto');

  const sec3Opacity = useTransform(scrollYProgress, [0.45, 0.50, 0.65, 0.70], [0, 1, 1, 0]);
  const sec3X = useTransform(scrollYProgress, [0.45, 0.50, 0.65, 0.70], [50, 0, 0, 50]);
  const sec3Visibility = useTransform(scrollYProgress, (v) => (v < 0.45 || v > 0.70) ? 'hidden' : 'visible');
  const sec3PointerEvents = useTransform(scrollYProgress, (v) => (v < 0.45 || v > 0.70) ? 'none' : 'auto');

  const sec4Opacity = useTransform(scrollYProgress, [0.70, 0.75, 0.84, 0.88], [0, 1, 1, 0]);
  const sec4X = useTransform(scrollYProgress, [0.70, 0.75, 0.84, 0.88], [-50, 0, 0, -50]);
  const sec4Visibility = useTransform(scrollYProgress, (v) => (v < 0.70 || v > 0.88) ? 'hidden' : 'visible');
  const sec4PointerEvents = useTransform(scrollYProgress, (v) => (v < 0.70 || v > 0.88) ? 'none' : 'auto');

  const sec5Opacity = useTransform(scrollYProgress, [0.88, 0.93, 1.0], [0, 1, 1]);
  const sec5Y = useTransform(scrollYProgress, [0.88, 0.93, 1.0], [50, 0, 0]);
  const sec5Visibility = useTransform(scrollYProgress, (v) => v < 0.88 ? 'hidden' : 'visible');
  const sec5PointerEvents = useTransform(scrollYProgress, (v) => v < 0.88 ? 'none' : 'auto');

  return (
    <div
      ref={containerRef}
      id="matrix-scrollytelling"
      className="relative w-full bg-[#050505]"
      style={{ height: '580vh' }}
    >
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-[#03050d] z-[50] flex flex-col items-center justify-center font-sans">
          <div className="glass-card-glow max-w-md w-full p-8 rounded-3xl text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-cyber-cyan/5 border border-cyber-cyan/20 flex items-center justify-center animate-pulse relative overflow-hidden">
              <img src="/Logo Hd.webp" alt="Loading Logo" className="w-10 h-10 object-contain animate-pulse filter invert brightness-[2.5]" />
              <div className="absolute inset-0 border border-cyber-cyan/30 rounded-2xl animate-ping opacity-25" style={{ animationDuration: '3s' }} />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black text-white tracking-wide">
                Initializing TechStack Matrix
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Deconstructing System Layers...
              </p>
            </div>

            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple transition-all duration-300 shadow-[0_0_10px_#06b6d4]"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <span className="font-mono text-sm text-cyber-cyan font-bold">
              {loadProgress}%
            </span>
          </div>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
          }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-40 blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(0,80,255,0.06) 0%, rgba(6,182,212,0.02) 40%, transparent 70%)' }}
        />
        <div className="relative w-full h-full flex items-center justify-center max-w-6xl mx-auto p-4 md:p-12 z-10 pointer-events-none md:translate-y-0 -translate-y-24">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(0,0,0,0.8)]"
          />
        </div>

        <motion.div
          className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-20 font-sans"
          style={{ opacity: heroOpacity, y: heroY, visibility: heroVisibility, pointerEvents: heroPointerEvents }}
        >
          <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 bg-[#03050d]/85 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col items-center max-w-2xl w-full">
            <div className="flex items-center gap-2 mb-4 bg-white/[0.02] border border-white/[0.06] px-3.5 py-1 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-[#00D6FF] rounded-full animate-pulse shadow-[0_0_8px_#00D6FF]" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-gray-300">
                System Architecture Deconstructed
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Powering Innovation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#00D6FF] inline-block">
                Through Engineering
              </span>
            </h2>

            <p className="text-gray-300 text-sm md:text-base max-w-xl mt-6 leading-relaxed">
              Deconstructing system complexity into clean layers. Watch our core infrastructure disassemble into decoupled modules and reassemble on scroll.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-cyber-cyan font-mono font-bold mt-8">
              <span>SCROLL TO DETACH STACK MODULES</span>
              <ChevronRight className="w-3.5 h-3.5 animate-bounce" style={{ transform: 'rotate(90deg)' }} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-4 right-4 bottom-8 md:bottom-auto md:left-16 md:right-auto md:top-1/2 md:-translate-y-1/2 max-w-sm md:max-w-md w-auto z-20 font-sans"
          style={{ opacity: sec2Opacity, x: sec2X, visibility: sec2Visibility, pointerEvents: sec2PointerEvents }}
        >
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-[#0050FF]/25 shadow-[0_8px_32px_rgba(0,0,0,0.5),_0_0_20px_rgba(0,80,255,0.06)] hover:bg-[#070b19]/90 transition-colors duration-300 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0050FF]/10 border border-[#0050FF]/30 flex items-center justify-center text-[#0050FF] shrink-0">
              <Cpu className="w-5 h-5 text-[#00D6FF]" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00D6FF] uppercase">
                Architecture Design
              </span>
              <h3 className="text-xl font-bold text-white tracking-wide">
                High End System Design
              </h3>
            </div>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Every switch acts as a secure containerized node. Modular components translate tactical user intents into rapid digital pipelines, ensuring no single point of failure.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              {['Decoupled Inputs', 'Node Isolation', 'Zero Latency'].map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-4 right-4 bottom-8 md:bottom-auto md:right-16 md:left-auto md:top-1/2 md:-translate-y-1/2 max-w-sm md:max-w-md w-auto z-20 font-sans"
          style={{ opacity: sec3Opacity, x: sec3X, visibility: sec3Visibility, pointerEvents: sec3PointerEvents }}
        >
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-cyber-cyan/25 shadow-[0_8px_32px_rgba(0,0,0,0.5),_0_0_20px_rgba(6,182,212,0.06)] hover:bg-[#070b19]/90 transition-colors duration-300 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shrink-0">
              <Database className="w-5 h-5" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyber-cyan uppercase">
                Data Systems
              </span>
              <h3 className="text-xl font-bold text-white tracking-wide">
                Data Engineering
              </h3>
            </div>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Underneath the physical layout, rapid copper traces channel events at sub-millisecond speeds. Integrating high-frequency PostgreSQL nodes with isolated Redis layers.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              {['PostgreSQL', 'Redis Cache Grid', 'ACID Transactions'].map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-4 right-4 bottom-8 md:bottom-auto md:left-16 md:right-auto md:top-1/2 md:-translate-y-1/2 max-w-sm md:max-w-md w-auto z-20 font-sans"
          style={{ opacity: sec4Opacity, x: sec4X, visibility: sec4Visibility, pointerEvents: sec4PointerEvents }}
        >
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-cyber-purple/25 shadow-[0_8px_32px_rgba(0,0,0,0.5),_0_0_20px_rgba(168,85,247,0.06)] hover:bg-[#070b19]/90 transition-colors duration-300 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple shrink-0">
              <Server className="w-5 h-5" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyber-purple uppercase">
                Neural Systems
              </span>
              <h3 className="text-xl font-bold text-white tracking-wide">
                AI & Intelligent Automation
              </h3>
            </div>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Every switch, keycap, and stabilizer floats in unified alignment. Managed via Docker containerization and Kubernetes routing for zero downtime on automated workloads.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              {['Docker Engine', 'K8s Cluster Routing', 'AWS & Azure Clouds'].map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-x-4 bottom-6 md:bottom-auto md:inset-x-6 md:top-1/2 md:-translate-y-1/2 flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-20 font-sans"
          style={{ opacity: sec5Opacity, y: sec5Y, visibility: sec5Visibility, pointerEvents: sec5PointerEvents }}
        >
          <div className="glass-card p-8 md:p-12 rounded-3xl border border-[#0050FF]/25 bg-[#03050d]/85 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col items-center max-w-2xl w-full">
            <div className="flex items-center gap-2 mb-4 bg-[#00D6FF]/10 border border-[#00D6FF]/30 px-3 py-1 rounded-full w-fit">
              <Activity className="w-3.5 h-3.5 text-[#00D6FF]" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-white">
                Cloud Infrastructure
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Decoupled. Orchestrated. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-[#0050FF] inline-block">
                Cloud-Native Engineering
              </span>
            </h2>

            <p className="text-gray-300 text-sm md:text-base max-w-xl mt-6 leading-relaxed">
              The platform is complete. All systems are green and container nodes are listening. Initialize your stack deploy and launch your next high-performance microservices stack.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">

              <MagneticButton strength={0.2}>
                <a
                  href="/contact"
                  onClick={(e) => handlePageNav('/contact', e)}
                  className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_8px_25px_rgba(0,80,255,0.35)] hover:shadow-[0_0_35px_#00D6FF] transition-all duration-300 flex items-center gap-2"
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  Initialize Stacks Deploy
                  <Play className="w-3.5 h-3.5 fill-white" />
                </a>
              </MagneticButton>

              <a
                href="/solutions"
                onClick={(e) => handlePageNav('/solutions', e)}
                className="text-xs uppercase font-extrabold tracking-wider font-mono text-gray-400 hover:text-white transition-all py-3 px-6 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04]"
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
              >
                View System Specs →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
