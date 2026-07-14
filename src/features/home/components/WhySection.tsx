import { useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import ScrollReveal from '../../../components/ScrollReveal';

interface MetricProps {
  target: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

function Counter({ target, suffix = '', duration = 1500, decimals = 0 }: MetricProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = target;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  const displayCount = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <span ref={elementRef}>
      {displayCount}
      {suffix}
    </span>
  );
}

// 1. Radar Scanning Animation for Active Pilots
function ActivePilotsAnimation() {
  return (
    <div className="w-12 h-12 relative flex items-center justify-center bg-blue-500/5 rounded-xl border border-blue-500/10 overflow-hidden">
      <svg className="w-9 h-9" viewBox="0 0 100 100">
        {/* Concentric rings */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
        
        {/* Coordinate axis */}
        <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" />

        {/* 2 Pulsing Target Nodes (Representing the 2 pilot projects) */}
        <circle cx="35" cy="40" r="3" fill="#3b82f6" className="animate-ping" style={{ animationDuration: '2s' }} />
        <circle cx="35" cy="40" r="2.5" fill="#3b82f6" />
        
        <circle cx="65" cy="60" r="3" fill="#06b6d4" className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <circle cx="65" cy="60" r="2.5" fill="#06b6d4" />

        {/* Rotating radar sweep */}
        <g style={{ transformOrigin: '50px 50px', animation: 'radar-sweep 4s linear infinite' }}>
          <line x1="50" y1="50" x2="50" y2="5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <polygon points="50,50 50,5 35,7 45,30" fill="rgba(59, 130, 246, 0.15)" />
        </g>
      </svg>
      <style>{`
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// 2. Orbiting Tech Nodes Animation for Training Stacks
function TrainingStacksAnimation() {
  return (
    <div className="w-12 h-12 relative flex items-center justify-center bg-cyan-500/5 rounded-xl border border-cyan-500/10">
      <svg className="w-9 h-9" viewBox="0 0 100 100">
        {/* Core node */}
        <circle cx="50" cy="50" r="6" fill="#06b6d4" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" />

        {/* Orbit ring */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" strokeDasharray="3 3" />

        {/* 5 Orbiting skill nodes (FE, BE, CLOUD, AI, DB) */}
        <g style={{ transformOrigin: '50px 50px', animation: 'orbit-rotate 8s linear infinite' }}>
          {/* Node 1 */}
          <line x1="50" y1="50" x2="50" y2="20" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
          <circle cx="50" cy="20" r="4.5" fill="#06b6d4" />
          
          {/* Node 2 */}
          <line x1="50" y1="50" x2="78.5" y2="40.7" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
          <circle cx="78.5" cy="40.7" r="4" fill="#a855f7" />

          {/* Node 3 */}
          <line x1="50" y1="50" x2="67.6" y2="74.3" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
          <circle cx="67.6" cy="74.3" r="4" fill="#3b82f6" />

          {/* Node 4 */}
          <line x1="50" y1="50" x2="32.4" y2="74.3" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
          <circle cx="32.4" cy="74.3" r="4" fill="#ec4899" />

          {/* Node 5 */}
          <line x1="50" y1="50" x2="21.5" y2="40.7" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
          <circle cx="21.5" cy="40.7" r="4" fill="#10b981" />
        </g>
      </svg>
      <style>{`
        @keyframes orbit-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// 3. Oscilloscope Sine Wave for Client SLA
function SlaUptimeAnimation() {
  return (
    <div className="w-12 h-12 relative flex items-center justify-center bg-purple-500/5 rounded-xl border border-purple-500/10 overflow-hidden">
      <svg className="w-10 h-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="1" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(168, 85, 247, 0.1)" strokeWidth="1" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="1" />
        
        <line x1="25" y1="0" x2="25" y2="100" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="1" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="1" />
        <line x1="75" y1="0" x2="75" y2="100" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="1" />

        {/* Telemetry wave */}
        <g style={{ animation: 'wave-slide 2.5s linear infinite' }}>
          <path
            d="M -40 50 Q -20 15, 0 50 T 40 50 T 80 50 T 120 50 T 160 50"
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M -40 50 Q -20 15, 0 50 T 40 50 T 80 50 T 120 50 T 160 50"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1"
            opacity="0.5"
            strokeLinecap="round"
            style={{ transform: 'translateY(2px)' }}
          />
        </g>
      </svg>
      <style>{`
        @keyframes wave-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-80px); }
        }
      `}</style>
    </div>
  );
}

// 4. Staggered Growth Bars for Incubated Talent
function TalentMeterAnimation() {
  return (
    <div className="w-12 h-12 relative flex items-center justify-center bg-pink-500/5 rounded-xl border border-pink-500/10">
      <svg className="w-9 h-9" viewBox="0 0 100 100">
        {/* Core framework container */}
        <rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="rgba(236, 72, 153, 0.1)" strokeWidth="1.5" />
        
        {/* Rising bars (5 channels) */}
        <rect x="25" y="55" width="6" height="20" rx="1.5" fill="#ec4899" style={{ animation: 'bar-grow 1.4s ease-in-out infinite', transformOrigin: 'bottom' }} />
        <rect x="37" y="40" width="6" height="35" rx="1.5" fill="#a855f7" style={{ animation: 'bar-grow 1.4s ease-in-out infinite', animationDelay: '0.2s', transformOrigin: 'bottom' }} />
        <rect x="49" y="25" width="6" height="50" rx="1.5" fill="#06b6d4" style={{ animation: 'bar-grow 1.4s ease-in-out infinite', animationDelay: '0.4s', transformOrigin: 'bottom' }} />
        <rect x="61" y="45" width="6" height="30" rx="1.5" fill="#3b82f6" style={{ animation: 'bar-grow 1.4s ease-in-out infinite', animationDelay: '0.1s', transformOrigin: 'bottom' }} />
        <rect x="73" y="30" width="6" height="45" rx="1.5" fill="#10b981" style={{ animation: 'bar-grow 1.4s ease-in-out infinite', animationDelay: '0.3s', transformOrigin: 'bottom' }} />
      </svg>
      <style>{`
        @keyframes bar-grow {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1.0); }
        }
      `}</style>
    </div>
  );
}

interface MetricCard {
  title: string;
  target: number;
  suffix: string;
  decimals?: number;
  desc: string;
  borderColor: string;
  glowColor: string;
  animation: () => ReactNode;
}

export default function WhySection() {
  const setCursorType = useUIStore((state) => state.setCursorType);

  const metrics: MetricCard[] = [
    {
      title: 'Active Pilots',
      target: 2,
      suffix: '',
      desc: 'Bespoke corporate platform deployments built, verified, and running under strict enterprise client SLA rules.',
      borderColor: 'border-blue-500/20 hover:border-blue-500/40',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
      animation: ActivePilotsAnimation,
    },
    {
      title: 'Core Architectures',
      target: 5,
      suffix: '+ Stacks',
      desc: 'Hyperscale microservice layers spanning Cloud-Native, AI Automation, and High-Performance Data Systems.',
      borderColor: 'border-cyan-500/20 hover:border-cyan-500/40',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
      animation: TrainingStacksAnimation,
    },
    {
      title: 'Client SLA',
      target: 99.9,
      suffix: '%',
      decimals: 1,
      desc: 'Observed cloud architecture stability and API network request reliability across deployed client systems.',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
      animation: SlaUptimeAnimation,
    },
    {
      title: 'Elite Engineers',
      target: 15,
      suffix: '+ Team',
      desc: 'Senior cloud architects, AI automation pioneers, and system engineers delivering custom high-throughput solutions.',
      borderColor: 'border-pink-500/20 hover:border-pink-500/40',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]',
      animation: TalentMeterAnimation,
    },
  ];

  return (
    <section id="why" className="relative py-24 px-6 max-w-7xl mx-auto">
      {/* Aurora glow overlay */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-cyber-blue/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <ScrollReveal direction="up" className="text-center mb-20">
        <h2 className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-semibold mb-3">
          Our Credentials
        </h2>
        <h3 className="text-3xl md:text-5xl font-black">
          Why Tesseract Infosystems?
        </h3>
      </ScrollReveal>

      {/* Stats Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {metrics.map((metric, idx) => {
          const RenderAnimation = metric.animation;
          return (
            <ScrollReveal key={metric.title} direction="up" delay={idx * 0.1} scale>
              <div
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                className={`glass-card p-8 rounded-3xl border ${metric.borderColor} relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:bg-space-dark/50 ${metric.glowColor}`}
              >
                {/* SVG Illustration Container */}
                <div className="flex justify-between items-start mb-6">
                  <RenderAnimation />
                </div>

                {/* Number Count */}
                <h4 className="text-4xl font-extrabold text-white tracking-tight font-sans">
                  <Counter target={metric.target} suffix={metric.suffix} decimals={metric.decimals} />
                </h4>

                {/* Title */}
                <h5 className="text-sm font-bold text-gray-200 mt-3 group-hover:text-cyber-cyan transition-colors">
                  {metric.title}
                </h5>

                {/* Desc */}
                <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Special Security Banner */}
      <ScrollReveal direction="up" delay={0.3}>
        <div className="mt-12 glass-card p-6 rounded-3xl border border-cyber-cyan/30 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-[0_0_20px_rgba(6,182,212,0.05)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shrink-0 animate-pulse">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">Enterprise-Grade Security Protocol</h4>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                Every deploy is vetted by automated vulnerability scanners and adheres to strict ISO/IEC 27001 data isolation policies.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-cyber-cyan border border-cyber-cyan/30 px-3 py-1.5 rounded-full select-none shrink-0 bg-cyber-cyan/5">
            ISO 27001 AUDITED
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
