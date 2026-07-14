import { Cpu, Cloud, Code, Settings, Smartphone, Database, RefreshCw } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import ScrollReveal from '../../../components/ScrollReveal';

interface ServiceItem {
  icon: typeof Cpu;
  title: string;
  desc: string;
  hoverBorder: string;
  accent: string;
}

export default function ServicesSection() {
  const setCursorType = useUIStore((state) => state.setCursorType);

  const services: ServiceItem[] = [
    { icon: Code, title: 'Custom Software Development', desc: 'Building bespoke, scalable, and ultra-reliable software tailored for specific company goals and operational flows.', hoverBorder: 'hover:border-blue-500/40', accent: 'group-hover:text-blue-400' },
    { icon: Database, title: 'Enterprise Applications', desc: 'Designing fault-tolerant backends, transaction managers, and systems engineered to scale for thousands of users.', hoverBorder: 'hover:border-cyber-cyan/40', accent: 'group-hover:text-cyber-cyan' },
    { icon: Cloud, title: 'Cloud Solutions', desc: 'Architecting multi-cloud hybrid systems and serverless topologies to reduce latencies and cut cloud cost footprints.', hoverBorder: 'hover:border-purple-500/40', accent: 'group-hover:text-purple-400' },
    { icon: Settings, title: 'DevOps Engineering', desc: 'Implementing secure CI/CD pipelines, automated deployments, configuration management, and robust microservices.', hoverBorder: 'hover:border-pink-500/40', accent: 'group-hover:text-pink-400' },
    { icon: Cpu, title: 'AI Solutions', desc: 'Integrating deep neural networks, custom LLMs, NLP algorithms, and automated analytical models into standard apps.', hoverBorder: 'hover:border-emerald-500/40', accent: 'group-hover:text-emerald-400' },
    { icon: Code, title: 'Web Development', desc: 'Developing fast, secure, search-engine-optimized frontend platforms that offer premium, immersive interactions.', hoverBorder: 'hover:border-yellow-500/40', accent: 'group-hover:text-yellow-400' },
    { icon: Smartphone, title: 'Mobile Development', desc: 'Building native or cross-platform mobile apps for iOS and Android with offline-first synchronization.', hoverBorder: 'hover:border-orange-500/40', accent: 'group-hover:text-orange-400' },
    { icon: RefreshCw, title: 'Digital Transformation', desc: 'Migrating outdated legacy platforms to cloud-native stacks, boosting speeds, and modernizing workflows.', hoverBorder: 'hover:border-indigo-500/40', accent: 'group-hover:text-indigo-400' },
  ];

  return (
    <section id="services" className="relative py-24 px-6 max-w-7xl mx-auto flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <ScrollReveal direction="up" className="text-center mb-16">
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {services.map((service, idx) => {
          const IconComp = service.icon;
          const colIndex = idx % 4;
          const revealProps = 
            colIndex === 0 
              ? { direction: 'right' as const, zDepth: 60, distance: 140 }
              : colIndex === 1
              ? { direction: 'up' as const, zDepth: 80, distance: 140 }
              : colIndex === 2
              ? { direction: 'down' as const, zDepth: 80, distance: 140 }
              : { direction: 'left' as const, zDepth: 60, distance: 140 };

          return (
            <ScrollReveal key={service.title} {...revealProps} delay={(idx % 4) * 0.08} scale>
              <div
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                className={`glass-card p-6 rounded-2xl border border-white/5 transition-all duration-300 ${service.hoverBorder} hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col gap-4 group h-full`}
              >
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-cyber-cyan ${service.accent} transition-all duration-300`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <h4 className="text-white text-base font-bold group-hover:text-cyber-cyan transition-colors">
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
