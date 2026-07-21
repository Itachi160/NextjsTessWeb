import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Cpu, ShieldCheck, Globe } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  desc: string;
  icon: typeof Database;
  tech: string[];
  gradient: string;
  image: string;
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'Hyperscale Cloud Platform',
    category: 'Cloud Architecture',
    desc: 'Orchestrating multi-region hybrid Kubernetes clusters on AWS and Azure, processing 150M+ requests per day with 99.999% uptime.',
    icon: Globe,
    tech: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    gradient: 'from-blue-600/30 to-cyan-500/10',
    image: '/img-cloud.webp',
  },
  {
    id: 2,
    title: 'Enterprise AI Logistics',
    category: 'AI & Data Engineering',
    desc: 'Developing an intelligent route optimization engine leveraging custom neural networks, decreasing delivery lead times by 22%.',
    icon: Cpu,
    tech: ['Python', 'PyTorch', 'Kafka', 'Redis'],
    gradient: 'from-purple-600/30 to-pink-500/10',
    image: '/img-ai.webp',
  },
  {
    id: 3,
    title: 'Zero-Trust Security Shield',
    category: 'Cybersecurity',
    desc: 'Implementing an identity management access gateway with hardware key triggers, securing proprietary financial ledgers.',
    icon: ShieldCheck,
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    gradient: 'from-green-600/30 to-emerald-500/10',
    image: '/img-security.webp',
  },
  {
    id: 4,
    title: 'Omni-Channel FinTech Core',
    category: 'Software Engineering',
    desc: 'Designing microservices transaction engines with event-driven data streaming, reducing settlement latencies under 15ms.',
    icon: Database,
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    gradient: 'from-pink-600/30 to-rose-500/10',
    image: '/img-fintech.webp',
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setCursorType = useUIStore((state) => state.setCursorType);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const getScrollDistance = () => {
      const containerWidth = container.offsetWidth;
      const trackWidth = track.scrollWidth;
      return Math.max(0, trackWidth - containerWidth);
    };

    let ctx: gsap.Context | null = null;
    let refreshQueued = false;

    const queueRefresh = () => {
      if (refreshQueued) return;
      refreshQueued = true;
      requestAnimationFrame(() => {
        refreshQueued = false;
        ScrollTrigger.refresh();
      });
    };

    const setupScroll = () => {
      if (getScrollDistance() <= 0) return;

      ctx?.revert();

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 0,
            pinSpacing: true,
            onToggle: (self) => {
              scrollTriggerRef.current = self;
            },
          },
        });
      }, container);

      queueRefresh();
    };

    setupScroll();

    const handleResize = () => {
      setupScroll();
    };

    const images = track.querySelectorAll('img');
    let pendingImages = 0;

    const handleImageReady = () => {
      pendingImages -= 1;
      if (pendingImages <= 0) {
        queueRefresh();
      }
    };

    images.forEach((img) => {
      if (!img.complete) {
        pendingImages += 1;
        img.addEventListener('load', handleImageReady, { once: true });
        img.addEventListener('error', handleImageReady, { once: true });
      }
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      images.forEach((img) => {
        img.removeEventListener('load', handleImageReady);
        img.removeEventListener('error', handleImageReady);
      });
      if (ctx) {
        ctx.revert();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 overflow-hidden"
      style={{ background: '#03050d' }}
    >

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />

      <div className="h-screen flex items-center w-full">
        <div
          ref={trackRef}
          className="flex items-center gap-6 md:gap-8 px-6 md:pl-12 md:pr-24 overflow-visible w-max will-change-transform"
        >

          <div className="w-[200px] sm:w-[240px] md:w-[440px] shrink-0 flex flex-col justify-center gap-3 sm:gap-4 md:gap-5 pr-2 md:pr-8">
            <h2 className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-cyber-cyan font-semibold">
              Solutions Showcase
            </h2>
            <h3 className="text-xl sm:text-3xl md:text-5xl font-black text-white leading-tight">
              Enterprise <br />Solutions
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
              Explore how we design and deploy high-performance applications, server topologies, and complex databases for global enterprises.
            </p>
            <div className="flex gap-2 items-center font-mono text-[10px] sm:text-xs text-cyber-cyan/70 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
              <span>Scroll to explore →</span>
            </div>
          </div>

          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                className="w-[280px] md:w-[440px] h-[370px] sm:h-[420px] md:h-[520px] shrink-0 glass-card rounded-2xl md:rounded-3xl border border-white/[0.06] relative overflow-hidden flex flex-col group transition-all duration-500 hover:border-cyber-cyan/30"
              >

                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                <div className="h-[130px] sm:h-[160px] md:h-[200px] relative overflow-hidden rounded-t-2xl md:rounded-t-3xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 280px, 440px"
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-darkest via-space-darkest/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase font-mono text-cyber-cyan tracking-widest bg-space-darkest/80 backdrop-blur-sm border border-cyber-cyan/20 px-2.5 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-grow p-4 sm:p-5 md:p-6 relative z-10">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm sm:text-base md:text-xl font-black text-white group-hover:text-cyber-cyan transition-colors leading-tight">
                        {project.title}
                      </h4>
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/[0.04] flex items-center justify-center text-gray-400 border border-white/[0.06] group-hover:border-cyber-cyan/30 group-hover:text-cyber-cyan transition-all shrink-0 ml-2 sm:ml-3">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed mt-1 sm:mt-2 md:mt-3 line-clamp-3 md:line-clamp-none">
                      {project.desc}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[8px] sm:text-[9px] font-mono font-bold text-gray-400 bg-white/[0.04] border border-white/[0.08] px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="w-6 md:w-12 shrink-0" aria-hidden="true" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-purple/20 to-transparent" />
    </section>
  );
}
