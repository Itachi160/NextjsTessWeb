import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Search, Compass, Layers, Palette, Terminal, ShieldAlert, Rocket, LifeBuoy } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import ScrollReveal from '../../../components/ScrollReveal';

interface ProcessStep {
  number: number;
  title: string;
  icon: typeof Search;
  desc: string;
  color: string;
}

interface RoadmapStepProps {
  step: ProcessStep;
  idx: number;
  scrollYProgress: MotionValue<number>;
  setCursorType: (type: 'default' | 'hover' | 'magnetic' | 'view' | 'click') => void;
}

function RoadmapStep({ step, idx, scrollYProgress, setCursorType }: RoadmapStepProps) {
  const startVal = idx === 0 ? 0 : (idx - 0.5) / 7;
  const endVal = idx === 0 ? 0.02 : idx / 7;

  // Transform scroll progress to highlight styles
  const borderGlow = useTransform(
    scrollYProgress,
    [startVal, endVal],
    ['rgba(255, 255, 255, 0.08)', 'rgba(6, 182, 212, 0.85)'],
    { clamp: true }
  );

  const glowScale = useTransform(
    scrollYProgress,
    [startVal, endVal],
    [0.96, 1.04],
    { clamp: true }
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [startVal, endVal],
    [0, 0.25],
    { clamp: true }
  );

  const numColor = useTransform(
    scrollYProgress,
    [startVal, endVal],
    ['rgba(6, 182, 212, 0.4)', 'rgba(6, 182, 212, 1)'],
    { clamp: true }
  );

  const titleColor = useTransform(
    scrollYProgress,
    [startVal, endVal],
    ['rgba(255, 255, 255, 0.45)', 'rgba(255, 255, 255, 1)'],
    { clamp: true }
  );

  const shadowGlow = useTransform(
    scrollYProgress,
    [startVal, endVal],
    ['0px 0px 0px rgba(6, 182, 212, 0)', '0px 0px 15px rgba(6, 182, 212, 0.4)'],
    { clamp: true }
  );

  // Hacking Morph Effect: Morph number to icon as the scroll line hits the dot
  const numberOpacity = useTransform(scrollYProgress, [startVal, endVal], [1, 0], { clamp: true });
  const iconOpacity = useTransform(scrollYProgress, [startVal, endVal], [0, 1], { clamp: true });
  const iconScale = useTransform(scrollYProgress, [startVal, endVal], [0.6, 1.0], { clamp: true });

  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className="flex gap-4 md:gap-8 relative items-start group"
    >
      {/* Ripple container */}
      <div className="relative shrink-0">
        {/* Ripple ring effect */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [startVal, endVal], [0, 0.6]),
            scale: useTransform(scrollYProgress, [startVal, endVal], [1, 1.35])
          }}
          className="absolute inset-0 border border-cyber-cyan/40 rounded-lg md:rounded-xl pointer-events-none"
        />

        {/* Left side node structure */}
        <motion.div
          style={{
            borderColor: borderGlow,
            boxShadow: shadowGlow,
            scale: glowScale,
          }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl glass-card flex items-center justify-center border transition-all duration-300 relative z-10 shrink-0 overflow-hidden"
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
        >
          {/* Glowing core when inside step */}
          <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute -inset-0.5 rounded-lg md:rounded-xl bg-gradient-to-br from-cyber-blue to-cyber-cyan pointer-events-none" 
          />

          {/* Cyber laser scanning line when active */}
          <motion.div
            style={{ opacity: iconOpacity }}
            className="absolute left-0 right-0 h-0.5 bg-cyber-cyan shadow-[0_0_8px_#06b6d4] z-20 pointer-events-none"
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Cyber binary coordinate code text background (fades in when active) */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [startVal, endVal], [0, 0.25]) }}
            className="absolute inset-0 font-mono text-[5px] md:text-[6px] text-cyber-cyan/50 leading-none overflow-hidden select-none pointer-events-none p-0.5 flex flex-col justify-around items-center"
          >
            <div className="tracking-tighter">0101</div>
            <div className="tracking-tighter">1010</div>
          </motion.div>

          {/* Target Lock Corners (Hacking Effect) */}
          <motion.div
            style={{ opacity: iconOpacity }}
            className="absolute inset-1 pointer-events-none"
          >
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyber-cyan" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyber-cyan" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyber-cyan" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyber-cyan" />
          </motion.div>

          {/* Normal Number */}
          <motion.span 
            style={{ color: numColor, opacity: numberOpacity }}
            className="text-xs md:text-base font-black font-mono transition-colors z-10"
          >
            {step.number}
          </motion.span>

          {/* Hacker Icon when Active */}
          <motion.div
            style={{ opacity: iconOpacity, scale: iconScale }}
            className="absolute z-10 text-cyber-cyan flex items-center justify-center"
          >
            <Icon className="w-4 h-4 md:w-6 h-6 text-cyber-cyan filter drop-shadow-[0_0_5px_#06b6d4]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Right side content */}
      <div className="pt-1 md:pt-1.5">
        <motion.h4 
          style={{ color: titleColor }}
          className="text-sm md:text-base font-black transition-colors flex items-center gap-2"
        >
          <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${step.color}`} />
          {step.title}
        </motion.h4>
        <p className="text-gray-400 text-[10px] md:text-sm mt-1 md:mt-2 leading-relaxed max-w-2xl font-sans">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setCursorType = useUIStore((state) => state.setCursorType);

  const steps: ProcessStep[] = [
    { number: 1, title: 'Discovery & Audit', icon: Search, desc: 'We audit your legacy systems, document bottlenecks, and clarify engineering constraints.', color: 'text-blue-500' },
    { number: 2, title: 'Strategic Planning', icon: Compass, desc: 'Defining technical milestones, budgeting, scheduling, and staging server environments.', color: 'text-cyan-500' },
    { number: 3, title: 'Architecture Design', icon: Layers, desc: 'Specifying system topologies, database models, caching layers, and load-balancer settings.', color: 'text-purple-500' },
    { number: 4, title: 'High-Fidelity UI/UX', icon: Palette, desc: 'Drafting high-end user interfaces, navigation maps, design systems, and responsive layouts.', color: 'text-pink-500' },
    { number: 5, title: 'Core Development', icon: Terminal, desc: 'Writing clean, typed, modular code backed by automated testing suites and CI integrations.', color: 'text-indigo-500' },
    { number: 6, title: 'Testing & Hardening', icon: ShieldAlert, desc: 'Running unit tests, penetration auditing, load stress tests, and usability quality checks.', color: 'text-emerald-500' },
    { number: 7, title: 'Orchestrated Deployment', icon: Rocket, desc: 'Pushing containers to Kubernetes clusters or serverless nodes under zero-downtime rules.', color: 'text-yellow-500' },
    { number: 8, title: 'Operations & support', icon: LifeBuoy, desc: 'Monitoring metrics (latencies, logs, CPU loads) and providing 24/7 incident responses.', color: 'text-orange-500' }
  ];

  // Track scroll progress of this specific container
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center']
  });

  // Transform scroll progress to height percentage of the progress line
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'], { clamp: true });

  return (
    <section ref={containerRef} id="process" className="relative py-24 px-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <ScrollReveal direction="up" className="text-center mb-20">
        <h2 className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-semibold mb-3">
          Roadmap to Delivery
        </h2>
        <h3 className="text-3xl md:text-5xl font-black">
          Development Process
        </h3>
      </ScrollReveal>

      {/* Roadmap List Container */}
      <div ref={listRef} className="relative">
        
        {/* Track container representing centers of circle 1 to circle 8 */}
        <div className="absolute left-[18px] md:left-[22px] top-5 md:top-6 bottom-5 md:bottom-6 w-1 pointer-events-none">
          {/* Background Track Line */}
          <div className="absolute inset-0 bg-white/10 rounded-full" />

          {/* Glowing Progress Line */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyber-cyan via-cyber-blue to-cyber-purple rounded-full shadow-[0_0_12px_#06b6d4]"
            style={{ height, originY: 0 }}
          />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-12">
          {steps.map((step, idx) => (
            <RoadmapStep 
              key={step.number}
              step={step}
              idx={idx}
              scrollYProgress={scrollYProgress}
              setCursorType={setCursorType}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
