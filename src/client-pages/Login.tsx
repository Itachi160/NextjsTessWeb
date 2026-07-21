'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, CheckCircle2, ArrowLeft, Shield } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import dynamic from 'next/dynamic';
import { validateCredentials } from '../utils/auth';

const NeuralBackground = dynamic(() => import('../components/three/NeuralBackground'), { ssr: false });

function TypingText({ text, speed = 60, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let i = 0;
    const startTimeout = setTimeout(() => {
      const type = () => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
          timeout = setTimeout(type, speed);
        } else {
          const blink = setInterval(() => setShowCursor(prev => !prev), 530);
          return () => clearInterval(blink);
        }
      };
      type();
    }, delay);
    return () => { clearTimeout(startTimeout); clearTimeout(timeout); };
  }, [text, speed, delay]);

  return <>{displayed}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>▋</span></>;
}

function HUDCorners() {
  const cornerStyle = "absolute w-5 h-5 pointer-events-none";
  return (
    <>

      <motion.div
        className={`${cornerStyle} top-2 left-2`}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="#06b6d4" strokeWidth="1.5">
          <path d="M1 8 L1 1 L8 1" />
        </svg>
      </motion.div>

      <motion.div
        className={`${cornerStyle} top-2 right-2`}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="#06b6d4" strokeWidth="1.5">
          <path d="M12 1 L19 1 L19 8" />
        </svg>
      </motion.div>

      <motion.div
        className={`${cornerStyle} bottom-2 left-2`}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="#a855f7" strokeWidth="1.5">
          <path d="M1 12 L1 19 L8 19" />
        </svg>
      </motion.div>

      <motion.div
        className={`${cornerStyle} bottom-2 right-2`}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="#a855f7" strokeWidth="1.5">
          <path d="M12 19 L19 19 L19 12" />
        </svg>
      </motion.div>
    </>
  );
}

function StatusBar() {
  const [latency, setLatency] = useState(12);
  const [uptime, setUptime] = useState('99.97');

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 18) + 8);
      setUptime((99.9 + Math.random() * 0.09).toFixed(2));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 text-[7px] font-mono tracking-wider text-gray-600 mt-6 pt-4 border-t border-white/[0.04]">
      <div className="flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
        <span>SESSION: <span className="text-cyber-cyan">ENCRYPTED</span></span>
      </div>
      <span className="text-white/10">│</span>
      <span>TLS <span className="text-gray-400">1.3</span></span>
      <span className="text-white/10">│</span>
      <span>UPTIME <span className="text-gray-400">{uptime}%</span></span>
      <span className="text-white/10">│</span>
      <span>LATENCY <span className="text-cyber-cyan">{latency}ms</span></span>
    </div>
  );
}

function FocusRipple({ active, color = '#06b6d4' }: { active: boolean; color?: string }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none z-0 will-change-[opacity,transform]"
          style={{
            boxShadow: `0 0 16px 3px ${color}`,
            border: `1px solid ${color}`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: [0, 0.45, 0], scale: [0.96, 1.04, 1.08] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  );
}


export default function Login() {
  const router = useRouter();
  const setCursorType = useUIStore((state) => state.setCursorType);
  const setIsTransitioning = useUIStore((state) => state.setIsTransitioning);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState<'email' | 'password' | null>(null);

  const [status, setStatus] = useState<'idle' | 'authenticating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const orbitRef = useRef<HTMLCanvasElement>(null);

  const handleMouseEnter = () => setCursorType('hover');
  const handleMouseLeave = () => setCursorType('default');

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/');
    }, 450);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'authenticating' || status === 'success') return;

    if (!email || !password) {
      setStatus('error');
      setErrorMessage('Please fill in all security fields.');
      return;
    }

    setStatus('authenticating');
    setErrorMessage('');

    const isValid = await validateCredentials(email, password);

    setTimeout(() => {
      if (isValid) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Invalid ID or password. Access denied.');
      }
    }, 1800);
  };

  useEffect(() => {
    if (status === 'success') {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          router.push('/');
        }, 450);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 900);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  useEffect(() => {
    const canvas = orbitRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const w = rect.width || 460;
      const h = rect.height || 400;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const createGlowCanvas = (color: number[]): HTMLCanvasElement => {
      const c = document.createElement('canvas');
      c.width = 32;
      c.height = 32;
      const cCtx = c.getContext('2d');
      if (cCtx) {
        const grad = cCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},1.0)`);
        grad.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0.0)`);
        cCtx.beginPath();
        cCtx.arc(16, 16, 16, 0, Math.PI * 2);
        cCtx.fillStyle = grad;
        cCtx.fill();
      }
      return c;
    };

    const cyanGlow = createGlowCanvas([6, 182, 212]);
    const purpleGlow = createGlowCanvas([168, 85, 247]);

    const particles = Array.from({ length: 30 }).map((_, i) => ({
      angle: (i / 30) * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.004,
      radiusX: 0.5 + Math.random() * 0.04,
      radiusY: 0.5 + Math.random() * 0.04,
      size: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.6 + 0.15,
      color: Math.random() > 0.5 ? [6, 182, 212] : [168, 85, 247],
    }));

    let rafId: number;
    const draw = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      particles.forEach(p => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * (w * p.radiusX);
        const y = cy + Math.sin(p.angle) * (h * p.radiusY);

        const glowCanvas = p.color[0] === 6 ? cyanGlow : purpleGlow;
        const glowSize = p.size * 4;

        ctx.globalAlpha = p.opacity;
        ctx.drawImage(glowCanvas, x - glowSize, y - glowSize, glowSize * 2, glowSize * 2);

        ctx.globalAlpha = Math.min(1.0, p.opacity + 0.3);
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},1.0)`;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full text-white flex items-center justify-center px-6 relative overflow-hidden font-sans select-none"
      style={{
        background: 'radial-gradient(circle at center, #070c1e 0%, #03050d 100%)'
      }}
    >
      <NeuralBackground />

      <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />

      <button
        onClick={handleBack}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer z-20 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Return to Home</span>
      </button>

      <div className="relative w-full max-w-[460px] z-10">

        <canvas
          ref={orbitRef}
          className="absolute -inset-12 pointer-events-none z-0"
          style={{ width: 'calc(100% + 96px)', height: 'calc(100% + 96px)' }}
        />

        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none z-[1]" style={{ isolation: 'isolate' }}>
          <motion.div
            className="absolute -inset-[150%] z-0 will-change-transform"
            animate={{ rotate: [0, 360] }}
            transformTemplate={({ rotate }) => `rotate(${rotate}) translateZ(0)`}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: 'conic-gradient(from 0deg, transparent 0%, #06b6d4 8%, #06b6d4 12%, transparent 20%, transparent 45%, #a855f7 53%, #a855f7 57%, transparent 65%, transparent 100%)',
            }}
          />
          <div className="absolute inset-[1.5px] rounded-2xl bg-[#03050d] z-[1]" />
        </div>

        <div
          className="p-10 rounded-2xl border border-white/[0.06] shadow-2xl relative overflow-hidden z-[2]"
          style={{
            background: '#03050d',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            isolation: 'isolate',
          }}
        >
          <div
            className="absolute inset-0 bg-[#03050d]/95 md:bg-[#03050d]/85 backdrop-blur-none md:backdrop-blur-2xl rounded-2xl z-0 pointer-events-none"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />

          <HUDCorners />

          <motion.div
            className="absolute left-0 right-0 h-[1px] top-0 pointer-events-none z-30 will-change-transform"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.4) 20%, rgba(6,182,212,0.7) 50%, rgba(6,182,212,0.4) 80%, transparent 100%)',
              boxShadow: '0 0 15px rgba(6,182,212,0.3), 0 0 30px rgba(6,182,212,0.1)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            animate={{ y: [-10, 440] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] rounded-2xl z-[1]"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, #06b6d4 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {status === 'authenticating' && (
                <motion.div
                  key="auth-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col justify-center items-center py-12 min-h-[320px] text-center"
                >
                  <div className="relative w-16 h-16 mb-6">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-transparent"
                      style={{ borderTopColor: '#06b6d4', borderRightColor: '#06b6d4' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute inset-1.5 rounded-full border-2 border-transparent"
                      style={{ borderBottomColor: '#a855f7', borderLeftColor: '#a855f7' }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-cyber-cyan/70" />
                    </div>
                  </div>
                  <h4 className="text-sm font-black tracking-widest text-cyber-cyan uppercase font-mono">
                    Verifying Identity Key
                  </h4>
                  <p className="text-gray-400 text-xs mt-3 max-w-[260px] leading-relaxed">
                    Establishing a zero-trust encrypted session tunnel to our core servers. Please wait...
                  </p>
                  <div className="flex gap-1.5 mt-5">
                    {[0, 1, 2, 3, 4].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col justify-center items-center py-12 min-h-[320px] text-center"
                >
                  <motion.div
                    className="w-14 h-14 rounded-full bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <CheckCircle2 className="w-7 h-7 text-cyber-green" />
                  </motion.div>
                  <h3 className="text-xl font-black text-white">Access Granted</h3>
                  <span className="text-[10px] font-mono tracking-wider text-cyber-green mt-1.5 uppercase font-bold">
                    Session Established
                  </span>
                  <p className="text-gray-400 text-xs mt-3.5 max-w-[260px] leading-relaxed">
                    Handshake verified. Welcome to Tesseract Infosystems.
                  </p>
                </motion.div>
              )}

              {(status === 'idle' || status === 'error') && (
                <motion.div
                  key="form-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col text-center"
                >
                  <div className="flex flex-col items-center gap-3 mb-8">
                    <motion.div
                      className="w-12 h-12 flex items-center justify-center relative"
                      animate={{ filter: ['drop-shadow(0 0 8px rgba(6,182,212,0.3))', 'drop-shadow(0 0 16px rgba(6,182,212,0.5))', 'drop-shadow(0 0 8px rgba(6,182,212,0.3))'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <img
                        src="/Logo Hd.webp"
                        alt="Logo"
                        className="w-full h-full object-contain filter invert brightness-[2.5]"
                      />
                    </motion.div>
                    <div>
                      <h2 className="text-sm font-black tracking-[0.25em] text-glow-cyan bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-cyber-cyan uppercase">
                        Tesseract Infosystems
                      </h2>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mt-1 h-4">
                        <TypingText text="Enterprise Gateway Terminal" speed={55} delay={400} />
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                    <div className="flex flex-col gap-2 relative">
                      <label className="text-[9px] font-mono font-bold tracking-wider text-gray-400 uppercase">
                        Secure Email Identifier
                      </label>
                      <div className="relative">
                        <FocusRipple active={isFocused === 'email'} />
                        <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 z-10
                        ${isFocused === 'email' ? 'text-cyber-cyan' : 'text-gray-500'}`} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setIsFocused('email')}
                          onBlur={() => setIsFocused(null)}
                          className={`w-full bg-white/[0.02] border rounded-xl pl-10 pr-4 py-3 font-mono text-xs text-white placeholder-gray-600 transition-all duration-300 outline-none relative z-[1]
                          ${isFocused === 'email'
                              ? 'border-cyber-cyan/60 shadow-[0_0_12px_rgba(6,182,212,0.15)] bg-white/[0.04]'
                              : 'border-white/10'
                            }`}
                          placeholder="identity@tesseractsys.com"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 relative">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] font-mono font-bold tracking-wider text-gray-400 uppercase">
                          Station Decrypt Key
                        </label>
                        <a href="#" className="text-[9px] font-mono text-cyber-cyan hover:text-white transition-colors uppercase">
                          Forgot Key?
                        </a>
                      </div>
                      <div className="relative">
                        <FocusRipple active={isFocused === 'password'} color="#a855f7" />
                        <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 z-10
                        ${isFocused === 'password' ? 'text-cyber-cyan' : 'text-gray-500'}`} />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setIsFocused('password')}
                          onBlur={() => setIsFocused(null)}
                          className={`w-full bg-white/[0.02] border rounded-xl pl-10 pr-4 py-3 font-mono text-xs text-white placeholder-gray-600 transition-all duration-300 outline-none relative z-[1]
                          ${isFocused === 'password'
                              ? 'border-cyber-cyan/60 shadow-[0_0_12px_rgba(6,182,212,0.15)] bg-white/[0.04]'
                              : 'border-white/10'
                            }`}
                          placeholder="••••••••••••"
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2.5 px-4 py-3 border border-rose-500/20 bg-rose-500/5 rounded-xl text-xs text-rose-400 font-bold overflow-hidden"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                          <span>{errorMessage}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="btn-cyber-primary cyber-sheen w-full py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase text-white shadow-xl cursor-pointer relative overflow-hidden transition-all mt-2"
                    >
                      Compile & Connect
                    </button>
                  </form>

                  <StatusBar />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
