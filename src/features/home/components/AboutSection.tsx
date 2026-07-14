import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, ShieldCheck, Target, Zap } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import ScrollReveal from '../../../components/ScrollReveal';

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export default function AboutSection() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const pillars = [
    { icon: Target, title: 'Our Mission', desc: 'To design and build high-performance, fault-tolerant cloud software solutions that drive growth for enterprise organizations.', border: 'border-cyber-blue/30', text: 'text-cyber-blue' },
    { icon: Eye, title: 'Our Vision', desc: 'To pioneer the next wave of artificial intelligence and digital transformations, bridging logic and imagination.', border: 'border-cyber-cyan/30', text: 'text-cyber-cyan' },
    { icon: ShieldCheck, title: 'Core Values', desc: 'Rooted in strict engineering ethics, transparency, zero-trust cybersecurity, and hyper-scalable architectures.', border: 'border-cyber-purple/30', text: 'text-cyber-purple' },
  ];

  const timeline: TimelineItem[] = [
    { year: 'Phase 1', title: 'Architecture Blueprinting', desc: 'We design zero-trust, high-throughput system blueprints tailored to your specific scale and security requirements.' },
    { year: 'Phase 2', title: 'Cloud-Native Orchestration', desc: 'Deploying modular, containerized microservices across Kubernetes, AWS, or GCP with automated horizontal scaling.' },
    { year: 'Phase 3', title: 'AI & Automation Integration', desc: 'We inject secure, intelligent automation nodes into your operations to accelerate data tasks and workflows.' },
    { year: 'Phase 4', title: 'Zero-Downtime Deploy & SLA', desc: 'Continuous telemetry monitoring and active engineering support to guarantee 99.99% system uptime and reliability.' },
  ];

  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto flex flex-col items-center">

      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-cyber-purple/5 blur-[100px] pointer-events-none" />

      <ScrollReveal direction="up" className="text-center mb-16">
        <h2 className="text-xs uppercase font-mono tracking-widest text-cyber-purple font-semibold flex items-center justify-center gap-1.5 mb-3">
          <Zap className="w-3.5 h-3.5" />
          Who We Are
        </h2>
        <h3 className="text-3xl md:text-5xl font-black">
          Architecting Secure, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-cyan">
            Enterprise Digital Futures
          </span>
        </h3>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-24">
        {pillars.map((pillar, idx) => {
          const IconComponent = pillar.icon;
          const revealProps =
            idx === 0
              ? { direction: 'right' as const, zDepth: 40 }
              : idx === 1
                ? { direction: 'up' as const, zDepth: 115, scale: true }
                : { direction: 'left' as const, zDepth: 40 };

          return (
            <ScrollReveal key={pillar.title} {...revealProps} delay={idx * 0.1}>
              <div
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                className={`glass-card p-8 rounded-2xl border ${pillar.border} transition-all duration-300 hover:scale-[1.03] hover:bg-space-dark/60 h-full`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 ${pillar.text} mb-6`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="text-white text-xl font-bold mb-3">{pillar.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal direction="up" className="w-full">
        <h4 className="text-center text-xl font-bold mb-16 text-glow-cyan text-cyber-cyan">Our Engineering Pipeline</h4>

        <div ref={timelineRef} className="relative border-l border-white/10 max-w-3xl mx-auto pl-8 flex flex-col gap-12">

          <motion.div
            className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-cyber-cyan via-cyber-blue to-cyber-purple shadow-[0_0_12px_#06b6d4]"
            style={{ height: lineHeight, originY: 0 }}
          />

          {timeline.map((item, idx) => (
            <ScrollReveal key={item.year} direction="left" delay={idx * 0.1}>
              <div className="relative group">

                <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border border-cyber-cyan bg-space-darkest group-hover:bg-cyber-cyan transition-colors duration-300 shadow-[0_0_8px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_12px_#06b6d4]" />

                <div>
                  <span className="font-mono text-sm font-bold text-cyber-cyan bg-cyber-cyan/5 border border-cyber-cyan/20 px-2 py-0.5 rounded">
                    {item.year}
                  </span>
                  <h5 className="text-lg font-bold text-white mt-2 group-hover:text-cyber-cyan transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
