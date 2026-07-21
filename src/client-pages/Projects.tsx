import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, ShieldCheck, Globe, X, TrendingUp } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  icon: typeof Database;
  tech: string[];
  gradient: string;
  caseStudy: {
    problem: string;
    solution: string;
    metrics: string[];
  };
}

export default function Projects() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Cloud' | 'AI' | 'Security' | 'Software'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.title = 'Projects Showcase | Tesseract Infosystems';
    window.scrollTo(0, 0);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Hyperscale Cloud Platform',
      category: 'Cloud',
      desc: 'Orchestrating multi-region hybrid Kubernetes clusters on AWS and Azure, processing 150M+ requests per day with 99.999% uptime.',
      icon: Globe,
      tech: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
      gradient: 'from-blue-600/35 via-cyan-500/10 to-transparent',
      caseStudy: {
        problem: 'A international brokerage faced massive connection timeouts during market opening hours, causing significant customer churn and infrastructure costs.',
        solution: 'We rebuilt their API routing layers using AWS EKS clusters across 3 regions, adding Envoy proxy gateway meshes and custom telemetry auto-scalers.',
        metrics: ['Connection timeouts reduced to 0.001%', '35% cloud budget savings', 'Average latency drops under 40ms'],
      }
    },
    {
      id: 2,
      title: 'Enterprise AI Logistics Platform',
      category: 'AI',
      desc: 'Developing an intelligent route optimization and freight distribution engine leveraging custom neural networks, decreasing delivery lead times by 22%.',
      icon: Cpu,
      tech: ['Python', 'PyTorch', 'Kafka', 'Redis'],
      gradient: 'from-purple-600/35 via-pink-500/10 to-transparent',
      caseStudy: {
        problem: 'A global logistics provider suffered scheduling overheads, manual routing mistakes, and fuel cost spikes across their 500-vehicle fleet.',
        solution: 'Our AI team deployed custom neural graph neural networks using PyTorch. We connected these graphs to real-time traffic stream buffers powered by Kafka.',
        metrics: ['22% decrease in fuel costs', '80% faster scheduling cycles', 'Dynamic route updates under 2 seconds'],
      }
    },
    {
      id: 3,
      title: 'Zero-Trust Cybersecurity Shield',
      category: 'Security',
      desc: 'Implementing an identity management access gateway with hardware key triggers, securing proprietary financial ledgers for global markets.',
      icon: ShieldCheck,
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
      gradient: 'from-green-600/35 via-emerald-500/10 to-transparent',
      caseStudy: {
        problem: 'A FinTech corporation required SOC 2 Type II validation and robust database isolation models to secure transaction data against unauthorized access.',
        solution: 'We engineered a hardware key (FIDO2) identity access gateway, coupled with cell-level database encryption and isolated microservices.',
        metrics: ['100% compliance with SOC 2 policies', 'Zero breach records in stress audits', 'Authorized access log syncing under 1s'],
      }
    },
    {
      id: 4,
      title: 'Omni-Channel FinTech Core',
      category: 'Software',
      desc: 'Designing microservices transaction engines with event-driven data streaming, reducing settlement processing latencies under 15ms.',
      icon: Database,
      tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
      gradient: 'from-pink-600/35 via-rose-500/10 to-transparent',
      caseStudy: {
        problem: 'Legacy banking systems failed to update transaction logs concurrently, causing database locks and delayed settlement times.',
        solution: 'We built an event-sourced transaction processor with Redis cache buffers and isolated node handlers for concurrency optimization.',
        metrics: ['Settlement processing time <15ms', 'Concurrency load supports 50,000 TPS', 'Zero transaction collision events'],
      }
    },
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

      <div className="flex flex-col gap-4">
        <span className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-bold">Case Studies</span>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-none">
          Proven Engineering <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple">
            Deployments
          </span>
        </h1>
      </div>

      <div className="flex flex-wrap gap-3">
        {(['All', 'Cloud', 'AI', 'Security', 'Software'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${activeCategory === cat
                ? 'bg-cyber-cyan text-white border-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 text-gray-400 border-white/5 hover:border-cyber-cyan hover:text-cyber-cyan'
              }`}
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
          >
            {cat} {cat === 'All' ? 'Projects' : 'Solutions'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const Icon = project.icon;
          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              className="glass-card rounded-3xl border border-white/5 p-8 relative overflow-hidden flex flex-col justify-between h-[360px] group transition-all duration-300 hover:border-cyber-cyan/35 hover:scale-[1.02] cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-25 transition-opacity duration-300`} />

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <span className="text-[10px] uppercase font-mono text-cyber-cyan tracking-widest bg-cyber-cyan/15 border border-cyber-cyan/30 px-2 py-0.5 rounded">
                    {project.category} Division
                  </span>
                  <h4 className="text-xl md:text-2xl font-black text-white mt-4 group-hover:text-cyber-cyan transition-colors">
                    {project.title}
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:border-cyber-cyan/30 group-hover:bg-cyber-cyan/10 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="relative z-10 mt-6 flex flex-col gap-4">
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[9px] font-mono font-bold text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-space-darkest/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card max-w-2xl w-full rounded-3xl border border-cyber-cyan/40 p-8 relative overflow-hidden flex flex-col gap-6"
            >

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyber-cyan transition-all"
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-[10px] uppercase font-mono text-cyber-cyan tracking-widest bg-cyber-cyan/10 border border-cyber-cyan/20 px-2.5 py-1 rounded-full">
                  {selectedProject.category} Case Study
                </span>
                <h3 className="text-2xl font-black text-white mt-4">{selectedProject.title}</h3>
              </div>

              <div className="flex flex-col gap-5 max-h-[400px] overflow-y-auto pr-2">
                <div>
                  <h4 className="text-xs uppercase font-mono text-gray-500 mb-1">Corporate Bottleneck</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.caseStudy.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono text-gray-500 mb-1">Engineered Solution</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.caseStudy.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono text-gray-500 mb-2">Resulting telemetry metrics</h4>
                  <ul className="flex flex-col gap-2">
                    {selectedProject.caseStudy.metrics.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-bold text-cyber-cyan font-sans">
                        <TrendingUp className="w-4 h-4 text-cyber-purple shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="text-[9px] font-mono font-bold text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
