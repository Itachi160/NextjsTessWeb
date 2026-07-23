'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Compass, Layers, Palette, Terminal, ShieldAlert, Rocket, LifeBuoy } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import ScrollReveal from '../../../components/ScrollReveal';

interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  icon: typeof Search;
  desc: string;
  color: string;
}

const STEPS: ProcessStep[] = [
  { number: '01', phase: 'Discovery & Audit', title: 'Legacy Audit & System Constraints', icon: Search, desc: 'We audit your existing legacy systems, document architectural bottlenecks, and define precise engineering scope and constraints.', color: '#06b6d4' },
  { number: '02', phase: 'Strategic Planning', title: 'Roadmap & Milestone Architecture', icon: Compass, desc: 'Establishing technical milestones, resource allocation budgets, staging environments, and project delivery schedules.', color: '#3b82f6' },
  { number: '03', phase: 'System Architecture', title: 'Topology & Database Design', icon: Layers, desc: 'Specifying cloud topologies, high-throughput database schemas, caching strategies, microservices, and load-balancer rules.', color: '#a855f7' },
  { number: '04', phase: 'UI/UX Design', title: 'High-Fidelity Interface Engineering', icon: Palette, desc: 'Crafting premium user interfaces, responsive design systems, intuitive navigation flows, and interactive prototypes.', color: '#ec4899' },
  { number: '05', phase: 'Core Development', title: 'Clean Full-Stack Implementation', icon: Terminal, desc: 'Writing clean, typed, modular code backed by automated unit testing suites, API gateways, and CI/CD pipelines.', color: '#6366f1' },
  { number: '06', phase: 'QA & Hardening', title: 'Security & Stress Telemetry', icon: ShieldAlert, desc: 'Running penetration audits, load stress tests, automated vulnerability checks, and SOC 2/HIPAA compliance verifications.', color: '#10b981' },
  { number: '07', phase: 'Cloud Deployment', title: 'Zero-Downtime Kubernetes Release', icon: Rocket, desc: 'Deploying containerized services onto AWS/Azure Kubernetes clusters under strict zero-downtime blue/green deployment strategies.', color: '#eab308' },
  { number: '08', phase: 'Operations', title: '24/7 Monitoring & Maintenance', icon: LifeBuoy, desc: 'Continuous telemetry tracking (latencies, server loads, error logs) with automated alerts and 24/7 incident SLA response.', color: '#f97316' }
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const setCursorType = useUIStore((state) => state.setCursorType);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 80%']
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} id="process" className="relative py-24 md:py-32 px-4 sm:px-6 max-w-4xl mx-auto select-none isolate">
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyber-cyan/[0.02] blur-[160px] pointer-events-none transform-gpu" />

      {/* Section Header */}
      <ScrollReveal direction="up" className="text-center mb-16 md:mb-24">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyber-cyan px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20">
          ROADMAP TO DELIVERY
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
          Development Process
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-3 max-w-xl mx-auto font-sans leading-relaxed">
          A systematic 8-phase engineering methodology designed for predictable, enterprise-grade software execution.
        </p>
      </ScrollReveal>

      {/* Timeline List Container */}
      <div ref={listRef} className="relative">
        {/* Background Vertical Track */}
        <div className="absolute left-[19px] md:left-[23px] top-4 bottom-4 w-[2px] bg-white/[0.08] pointer-events-none z-0">
          {/* Active Glowing Laser Progress Line */}
          <motion.div
            className="w-full bg-gradient-to-b from-cyber-cyan via-cyber-blue to-cyber-purple shadow-[0_0_12px_#06b6d4]"
            style={{ height: beamHeight, originY: 0 }}
          />
        </div>

        <div className="flex flex-col gap-8 md:gap-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: (idx % 2) * 0.05 }}
                className="flex gap-4 md:gap-8 relative items-start group transform-gpu"
              >
                {/* Timeline Icon Node */}
                <div className="relative shrink-0 mt-1 z-10">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-[#050816] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-cyber-cyan group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110" style={{ color: step.color }} />
                  </div>
                </div>

                {/* Step Card */}
                <div className="flex-1 glass-card p-5 md:p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.03] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] group">
                  {/* Left Accent Glow Bar */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: step.color }}
                  />

                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span
                      className="text-[10px] md:text-[11px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border uppercase"
                      style={{ color: step.color, backgroundColor: `${step.color}15`, borderColor: `${step.color}30` }}
                    >
                      Phase {step.number} — {step.phase}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 text-xs md:text-sm mt-2 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
