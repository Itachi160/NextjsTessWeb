'use client';

import { useEffect, useState } from 'react';
import { Cpu, Cloud, Code, Settings, Smartphone, Database, RefreshCw, Bot, TrendingUp, Users, ShieldCheck, BarChart3 } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import ScrollReveal from '../../../components/ScrollReveal';

interface ServiceItem {
  icon: any;
  title: string;
  desc: string;
  hoverBorder: string;
  accent: string;
  badge?: string;
}

export default function ServicesSection() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services: ServiceItem[] = [
    { icon: Code, title: 'Custom Software Development', desc: 'Building bespoke, scalable, and ultra-reliable software tailored for specific company goals and operational flows.', hoverBorder: 'hover:border-blue-500/40', accent: 'group-hover:text-blue-400' },
    { icon: Database, title: 'Enterprise Applications', desc: 'Designing fault-tolerant backends, transaction managers, and systems engineered to scale for thousands of users.', hoverBorder: 'hover:border-cyber-cyan/40', accent: 'group-hover:text-cyber-cyan' },
    { icon: Cloud, title: 'Cloud Solutions', desc: 'Architecting multi-cloud hybrid systems and serverless topologies to reduce latencies and cut cloud cost footprints.', hoverBorder: 'hover:border-purple-500/40', accent: 'group-hover:text-purple-400' },
    { icon: Settings, title: 'DevOps Engineering', desc: 'Implementing secure CI/CD pipelines, automated deployments, configuration management, and robust microservices.', hoverBorder: 'hover:border-pink-500/40', accent: 'group-hover:text-pink-400' },
    { icon: Bot, title: 'AI & Automation Solutions', desc: 'Automate workflows, save operational time, and boost productivity with smart intelligent agents and custom neural pipelines.', hoverBorder: 'hover:border-emerald-500/40', accent: 'group-hover:text-emerald-400', badge: 'FEATURED' },
    { icon: TrendingUp, title: 'Digital Marketing', desc: 'Data-driven SEO, PPC, social media strategies, and high-converting content marketing that drives real measurable results.', hoverBorder: 'hover:border-amber-500/40', accent: 'group-hover:text-amber-400', badge: 'GROWTH' },
    { icon: Users, title: 'IT Staffing Solutions', desc: 'Access top IT talent, vetted developers, and specialized engineering pods quickly and efficiently to scale your teams.', hoverBorder: 'hover:border-cyan-500/40', accent: 'group-hover:text-cyan-400', badge: 'TALENT' },
    { icon: Code, title: 'Web Development', desc: 'Developing fast, secure, search-engine-optimized frontend platforms that offer premium, immersive interactions.', hoverBorder: 'hover:border-yellow-500/40', accent: 'group-hover:text-yellow-400' },
    { icon: Smartphone, title: 'Mobile Development', desc: 'Building native or cross-platform mobile apps for iOS and Android with offline-first synchronization.', hoverBorder: 'hover:border-orange-500/40', accent: 'group-hover:text-orange-400' },
    { icon: RefreshCw, title: 'Digital Transformation', desc: 'Migrating outdated legacy platforms to cloud-native stacks, boosting speeds, and modernizing workflows.', hoverBorder: 'hover:border-indigo-500/40', accent: 'group-hover:text-indigo-400' },
    { icon: ShieldCheck, title: 'Cybersecurity & Zero Trust', desc: 'Deploying multi-layered network security, automated vulnerability auditing, eBPF telemetry, and SOC 2/HIPAA compliance.', hoverBorder: 'hover:border-red-500/40', accent: 'group-hover:text-red-400' },
    { icon: BarChart3, title: 'Data & Analytics Engineering', desc: 'Structuring real-time data pipelines, high-throughput ETL buffers, vector search stores, and predictive analytics engines.', hoverBorder: 'hover:border-teal-500/40', accent: 'group-hover:text-teal-400' },
  ];

  return (
    <section id="services" className="relative py-20 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center overflow-hidden">

      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />

      <ScrollReveal direction="up" className="text-center mb-12 md:mb-16">
        <h2 className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-semibold mb-3">
          Our Capability Framework
        </h2>
        <h3 className="text-3xl md:text-5xl font-black">
          Innovative Technology <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple">
            Architectures & Engineering
          </span>
        </h3>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        {services.map((service, idx) => {
          const IconComp = service.icon;
          const colIndex = idx % 4;

          const revealProps = isMobile
            ? { direction: 'up' as const, zDepth: 20, distance: 30, scrub: false, delay: (idx % 3) * 0.05 }
            : colIndex === 0
              ? { direction: 'right' as const, zDepth: 50, distance: 70, scrub: 0.8 }
              : colIndex === 1
                ? { direction: 'up' as const, zDepth: 60, distance: 70, scrub: 0.8 }
                : colIndex === 2
                  ? { direction: 'down' as const, zDepth: 60, distance: 70, scrub: 0.8 }
                  : { direction: 'left' as const, zDepth: 50, distance: 70, scrub: 0.8 };

          return (
            <ScrollReveal key={service.title} {...revealProps} scale>
              <div
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                className={`glass-card p-5 sm:p-6 rounded-2xl border border-white/5 transition-all duration-300 ${service.hoverBorder} hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col gap-3.5 sm:gap-4 group h-full relative overflow-hidden bg-space-darkest/50 backdrop-blur-md`}
              >
                {service.badge && (
                  <span className="absolute top-3 right-3 text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                    {service.badge}
                  </span>
                )}
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-cyber-cyan ${service.accent} transition-all duration-300`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <h4 className="text-white text-base font-bold group-hover:text-cyber-cyan transition-colors pr-10">
                  {service.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed flex-grow">{service.desc}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
