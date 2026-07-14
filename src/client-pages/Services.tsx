'use client';

import { useState, useEffect } from 'react';
import { Cpu, Cloud, Code2, Calculator, ArrowRight, BadgeCheck, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import MagneticButton from '../components/MagneticButton';
import { useRouter } from 'next/navigation';

interface ServiceItem {
  id: 'software' | 'cloud' | 'ai';
  title: string;
  layer: string;
  icon: any;
  techs: string[];
  details: string;
  features: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'software',
    title: 'Custom Software Systems',
    layer: 'LAYER_01 // SOFTWARE CORE',
    icon: Code2,
    techs: ['Java', 'Spring Boot', 'Node.js', 'Go'],
    details: 'Creating modular service interfaces, high-concurrency backends, and custom integrations configured under strict SOLID rules.',
    features: [
      'Clean Architecture compilation',
      'RESTful / gRPC API contracts',
      'High-concurrency logic fabric'
    ]
  },
  {
    id: 'cloud',
    title: 'Hyperscale Cloud Deployments',
    layer: 'LAYER_02 // CLOUD FABRIC',
    icon: Cloud,
    techs: ['AWS', 'Kubernetes', 'Terraform', 'Istio'],
    details: 'Designing failover cluster topologies, hybrid networks, IAM authorization parameters, and automatic telemetry dashboards.',
    features: [
      'Multi-region active cluster failovers',
      'Infrastructure as Code (IaC) pipelines',
      'Prometheus/Grafana telemetry logs'
    ]
  },
  {
    id: 'ai',
    title: 'AI & Data Orchestrations',
    layer: 'LAYER_03 // NEURAL INTELLIGENCE',
    icon: Cpu,
    techs: ['Python', 'PyTorch', 'Kafka', 'PostgreSQL'],
    details: 'Compiling real-time data buffers, deploying LLMs inside application flows, training analysis charts, and structuring ETL queues.',
    features: [
      'Kafka event-stream integrations',
      'Vector stores for AI retrieval systems',
      'Optimized neural inference engines'
    ]
  }
];

export default function Services() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const setIsTransitioning = useUIStore((state) => state.setIsTransitioning);
  const router = useRouter();

  // Cost Estimator state (in Indian Rupees Lakhs scale)
  const [scope, setScope] = useState<'software' | 'cloud' | 'ai'>('software');
  const [scale, setScale] = useState<'sme' | 'enterprise' | 'hyperscale'>('enterprise');
  const [security, setSecurity] = useState<'standard' | 'high'>('high');
  const [estimatedCost, setEstimatedCost] = useState({ min: 1200000, max: 2400000 });

  // Compute pricing in Indian Rupees based on selected parameters
  useEffect(() => {
    let min = 500000;  // ₹5 Lakhs base
    let max = 1000000; // ₹10 Lakhs base

    // Scope factors
    if (scope === 'software') {
      min += 300000;
      max += 600000;
    } else if (scope === 'cloud') {
      min += 700000;
      max += 1200000;
    } else if (scope === 'ai') {
      min += 1200000;
      max += 2200000;
    }

    // Scale factors
    if (scale === 'sme') {
      min *= 1.0;
      max *= 1.1;
    } else if (scale === 'enterprise') {
      min *= 1.8;
      max *= 2.2;
    } else if (scale === 'hyperscale') {
      min *= 3.0;
      max *= 3.8;
    }

    // Security factor
    if (security === 'high') {
      min += 400000;
      max += 800000;
    }

    setEstimatedCost({
      min: Math.round(min),
      max: Math.round(max),
    });
  }, [scope, scale, security]);

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
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-16 relative z-10 font-mono">
      {/* Background gradients */}
      <div className="absolute top-[10%] left-0 w-85 h-85 rounded-full bg-cyber-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-85 h-85 rounded-full bg-cyber-purple/5 blur-[120px] pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col gap-3 max-w-3xl">
        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-cyber-cyan font-bold flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-cyber-cyan" />
          SYSTEM.SERVICES_CATALOG // COMPACT_GRID
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
          Services & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple inline-block">
            Architectures
          </span>
        </h1>
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans font-normal mt-2">
          Explore the technology systems, delivery pipelines, and framework designs configured by Tesseract Infosystems engineers. All features are fully detailed below.
        </p>
      </div>

      {/* THREE-COLUMN GRID - ALL SERVICE INFORMATION VISIBLE BY DEFAULT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((s) => {
          const NodeIcon = s.icon;
          return (
            <div
              key={s.id}
              className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#03050d]/40 flex flex-col justify-between gap-6 relative overflow-hidden transition-all duration-300 hover:border-cyber-cyan/30 hover:shadow-[0_10px_25px_rgba(6,182,212,0.02)]"
            >
              <div className="flex flex-col gap-5 text-left">
                {/* Header info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-cyber-cyan bg-white/[0.02]">
                    <NodeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-500 uppercase font-mono block">{s.layer}</span>
                    <span className="text-xs md:text-sm font-bold text-white block mt-0.5">{s.title}</span>
                  </div>
                </div>

                {/* Details */}
                <p className="text-gray-300 text-xs leading-relaxed font-sans font-normal">
                  {s.details}
                </p>

                {/* Bullet deliverables checklist */}
                <div className="flex flex-col gap-2 font-sans font-normal border-t border-white/5 pt-4">
                  {s.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies footer */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {s.techs.map((t) => (
                  <span key={t} className="text-[8px] text-gray-400 bg-white/[0.03] border border-white/[0.08] px-2 py-0.5 rounded font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* COST ESTIMATOR */}
      <div className="glass-card p-8 md:p-10 rounded-3xl border border-cyber-cyan/25 max-w-4xl mx-auto w-full relative overflow-hidden shadow-2xl mt-4">
        <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <span className="text-[10px] font-mono font-bold text-cyber-cyan uppercase tracking-widest bg-cyber-cyan/15 border border-cyber-cyan/30 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <Calculator className="w-3.5 h-3.5 text-cyber-cyan" />
            Interactive Quotation Engine
          </span>
          <h2 className="text-2xl font-black text-white mt-4 tracking-tight">Project Cost Estimator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 items-stretch font-mono">
          <div className="flex flex-col gap-5 justify-center">
            
            {/* Scope select */}
            <div>
              <span className="text-[9px] uppercase font-bold text-gray-500 block mb-2 font-mono">Project Scope</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'software', label: 'Custom Software' },
                  { id: 'cloud', label: 'Cloud-Native' },
                  { id: 'ai', label: 'AI Integration' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScope(s.id as any)}
                    className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                      scope === s.id
                        ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_8px_rgba(6,182,212,0.15)]'
                        : 'bg-white/5 border-white/5 text-gray-400'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale select */}
            <div>
              <span className="text-[9px] uppercase font-bold text-gray-500 block mb-2 font-mono">Corporate Scale</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sme', label: 'SME Scale' },
                  { id: 'enterprise', label: 'Enterprise' },
                  { id: 'hyperscale', label: 'Hyperscale' }
                ].map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setScale(sc.id as any)}
                    className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                      scale === sc.id
                        ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_8px_rgba(6,182,212,0.15)]'
                        : 'bg-white/5 border-white/5 text-gray-400'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Compliance */}
            <div>
              <span className="text-[9px] uppercase font-bold text-gray-500 block mb-2 font-mono">Compliance Specs</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSecurity('standard')}
                  className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    security === 'standard'
                      ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_8px_rgba(6,182,212,0.15)]'
                      : 'bg-white/5 border-white/5 text-gray-400'
                  }`}
                >
                  Standard Security
                </button>
                <button
                  onClick={() => setSecurity('high')}
                  className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    security === 'high'
                      ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_8px_rgba(6,182,212,0.15)]'
                      : 'bg-white/5 border-white/5 text-gray-400'
                  }`}
                >
                  SOC 2 / HIPAA Core
                </button>
              </div>
            </div>
          </div>

          {/* Pricing display */}
          <div className="glass-card p-6 rounded-xl border border-white/10 flex flex-col justify-between items-center text-center shadow-lg bg-[#03050d]/80 relative overflow-hidden min-h-[220px]">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-cyan" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-cyan" />

            <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-widest font-black">
              Estimated Architecture Cost
            </span>
            <div className="text-2xl md:text-3xl font-black text-white mt-4 font-sans tracking-tight text-glow-cyan bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-cyber-cyan">
              ₹{estimatedCost.min.toLocaleString('en-IN')} — ₹{estimatedCost.max.toLocaleString('en-IN')}
            </div>
            
            {/* Note text customized */}
            <p className="text-gray-400 text-[10px] mt-4 max-w-[280px] leading-relaxed font-sans">
              *These rates are according to industrial standards. To get your quotation please connect us on{' '}
              <a href="mailto:info@tesseractinfosystems.com" className="text-cyber-cyan hover:underline font-bold font-mono">
                info@tesseractinfosystems.com
              </a>.
            </p>

            <MagneticButton strength={0.12} className="mt-5">
              <a
                href="/contact"
                onClick={handleContactNav}
                className="btn-cyber-primary cyber-sheen px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase text-white flex items-center gap-1.5 relative overflow-hidden shadow-lg"
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
              >
                Discuss Scope
                <ArrowRight className="w-3 h-3" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
