'use client';

import React from 'react';
import { Database, ShieldAlert, Cpu, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import MagneticButton from '../components/MagneticButton';
import { useRouter } from 'next/navigation';

interface SolutionItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  icon: any;
  techs: string[];
  features: string[];
  metrics: { label: string; val: string }[];
}

const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'CLD-NODE',
    title: 'Hyperscale Cloud Platform',
    category: 'Cloud-Native',
    shortDesc: 'Automated Kubernetes cluster orchestration with elastic load balancing and zero-downtime rolling updates.',
    icon: Database,
    techs: ['EKS / GKE', 'Terraform', 'Istio'],
    features: [
      'Multi-region active replication',
      'Frictionless GitOps pipelining',
    ],
    metrics: [
      { label: 'Uptime', val: '99.99%' },
      { label: 'Auto-Scale', val: '< 45s' },
      { label: 'Latency', val: '2ms' }
    ]
  },
  {
    id: 'AI-CORE',
    title: 'AI Logistics & Automation Core',
    category: 'AI & Data Engineering',
    shortDesc: 'Deep learning pipeline to structure files, optimize routes, and trigger automatic data models.',
    icon: Cpu,
    techs: ['PyTorch', 'Kafka', 'Redis'],
    features: [
      'ETL data buffer ingest systems',
      'Neural model classifications',
    ],
    metrics: [
      { label: 'Throughput', val: '50k/s' },
      { label: 'Latency', val: '12ms' },
      { label: 'Accuracy', val: '99.2%' }
    ]
  },
  {
    id: 'SEC-SHIELD',
    title: 'Zero-Trust Cybersecurity Shield',
    category: 'Information Security',
    shortDesc: 'Advanced network isolation layer integrating automatic threat detection protocols and hardware access controls.',
    icon: ShieldAlert,
    techs: ['OAuth 2.1', 'eBPF Audits', 'Vault'],
    features: [
      'Real-time threat blacklisting',
      'Vault cryptographic decryptions',
    ],
    metrics: [
      { label: 'Auth Time', val: '< 8ms' },
      { label: 'Audit Lag', val: 'Realtime' },
      { label: 'Cipher', val: 'AES_256' }
    ]
  },
  {
    id: 'TX-FABRIC',
    title: 'Omni-Channel Transaction Core',
    category: 'Financial Engineering',
    shortDesc: 'High-availability transaction orchestrator featuring atomic ledger updates and distributed state cache checks.',
    icon: Layers,
    techs: ['Spring Boot', 'Postgres Shards', 'Kafka'],
    features: [
      'Atomic database partitions',
      'Optimized ledger failovers',
    ],
    metrics: [
      { label: 'Peak TPS', val: '25,000' },
      { label: 'Sync', val: 'Strict' },
      { label: 'Settle', val: 'Instant' }
    ]
  }
];

export default function Solutions() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const setIsTransitioning = useUIStore((state) => state.setIsTransitioning);
  const router = useRouter();

  const handleContactNav = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/contact');
    }, 450);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-12 relative z-10 font-mono">
      {/* Background gradients */}
      <div className="absolute top-[10%] right-0 w-80 h-80 bg-cyber-purple/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-80 h-80 bg-cyber-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header title */}
      <div className="flex flex-col gap-3 max-w-3xl">
        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-cyber-cyan font-bold flex items-center gap-2">
          <Layers className="w-3.5 h-3.5" />
          SYSTEM.CORE_RESOLUTIONS // EXPANDED_BLUEPRINT
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
          Solutions <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple inline-block">
            Architectures
          </span>
        </h1>
        <p className="text-gray-400 text-xs md:text-sm font-sans font-normal mt-2 leading-relaxed">
          Tesseract modular core modules. Explore the technical specifications, metrics, and software stacks of our customizable corporate architectures.
        </p>
      </div>

      {/* 2x2 CORECTLY ALIGNED GRID - ALL INFORMATION VISIBLE BY DEFAULT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
        {SOLUTIONS_DATA.map((sol) => {
          const SolIcon = sol.icon;
          return (
            <div
              key={sol.id}
              className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#03050d]/40 flex flex-col justify-between gap-6 relative overflow-hidden transition-all duration-300 hover:border-cyber-cyan/30 hover:shadow-[0_10px_25px_rgba(6,182,212,0.02)]"
            >
              {/* Outer grid circuit pattern */}
              <div className="absolute inset-0 cyber-grid opacity-[0.01] pointer-events-none" />
              
              {/* LED Status Node indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[8px] text-gray-500 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                <span>{sol.id}</span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-cyber-cyan bg-white/[0.02]">
                  <SolIcon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] uppercase font-bold text-cyber-purple font-mono">{sol.category}</span>
                  <h3 className="text-sm md:text-base font-extrabold text-white leading-tight mt-0.5">
                    {sol.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-xs font-sans font-normal leading-relaxed text-left">
                {sol.shortDesc}
              </p>

              {/* Metrics pills (Sleek and compact) */}
              <div className="grid grid-cols-3 gap-2 font-mono">
                {sol.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white/[0.01] border border-white/5 p-2 rounded-lg text-center">
                    <span className="text-[8px] text-gray-500 block uppercase tracking-wider">{m.label}</span>
                    <span className="text-[10px] font-bold text-white block mt-1">{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Core Deliverables Checklists */}
              <div className="flex flex-col gap-2 font-sans font-normal text-left pt-4 border-t border-white/5">
                {sol.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Technologies & CTA Link */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1">
                  {sol.techs.map((t) => (
                    <span key={t} className="text-[8px] text-cyber-cyan bg-cyber-cyan/5 border border-cyber-cyan/20 px-2 py-0.5 rounded font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                
                <MagneticButton strength={0.12} className="self-end sm:self-center">
                  <a
                    href="/contact"
                    onClick={handleContactNav}
                    className="btn-cyber-primary px-4 py-2 rounded-full text-[9px] font-bold tracking-widest uppercase text-white flex items-center gap-1.5 cursor-pointer relative overflow-hidden transition-all shadow-md hover:shadow-cyan-500/10"
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    Deploy
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </MagneticButton>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
