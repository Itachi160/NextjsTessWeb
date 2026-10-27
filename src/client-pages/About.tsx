'use client';

import { Shield, Users, Award, Code2 } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function About() {
  const setCursorType = useUIStore((state) => state.setCursorType);

  const capabilities = [
    {
      title: 'Cloud Infrastructure & DevOps',
      desc: 'Automated Kubernetes clusters, zero-downtime rolling updates, and resilient multi-region infrastructure as code.'
    },
    {
      title: 'High-Concurrency Backends',
      desc: 'Clean architecture microservices, event-driven streaming with Kafka & Redis, and high-throughput transactional databases.'
    },
    {
      title: 'AI & Intelligent Systems',
      desc: 'End-to-end automated pipelines, neural classification models, and private retrieval-augmented generation architectures.'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-16 relative z-10" style={{ background: 'linear-gradient(180deg, #03050d 0%, #070b19 40%, #03050d 100%)' }}>

      <div className="flex flex-col gap-4">
        <span className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-bold">Company Profile</span>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-none">
          Innovating At <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-blue">
            Hyperscale Speeds
          </span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Tesseract Infosystems was founded by enterprise architects to solve a single critical industry issue: compiling stable, scalable, and secure cloud software products without engineering compromises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
          className="glass-card p-8 rounded-3xl border border-white/5 flex gap-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan shrink-0">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Our Engineering Ethos</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              We write strictly typed, compiled systems. We reject code shortcuts, enforcing 90%+ unit test coverage and automated vulnerability pipelines before any merge occurs.
            </p>
          </div>
        </div>

        <div
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
          className="glass-card p-8 rounded-3xl border border-white/5 flex gap-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center text-cyber-purple shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Security & Quality Engineering</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              We engineer zero-trust architectures, TLS 1.3 encrypted payloads, automated vulnerability testing, and secure data handling standards across all enterprise deployments.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-bold">Leadership & Governance</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
            Founders & Technical Leadership
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mt-2 leading-relaxed">
            Founded by systems architects and product engineers dedicated to compiling resilient software, high-throughput cloud infrastructure, and intelligent automation for growing enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ashutosh */}
          <div
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
            className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-cyber-cyan/40 transition-all duration-300"
          >
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent border border-cyan-500/30 flex items-center justify-center text-cyber-cyan font-black text-2xl font-mono shadow-[0_0_20px_rgba(6,182,212,0.15)] shrink-0">
                A
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors">
                    Ashutosh
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30">
                    Co-Founder
                  </span>
                </div>
                <p className="text-xs font-mono text-cyan-300/80 mt-1">
                  Systems Architecture & Cloud Infrastructure
                </p>
                <p className="text-gray-400 text-xs md:text-sm mt-3 leading-relaxed">
                  Specializes in distributed cloud topologies, multi-region Kubernetes orchestration, and resilient microservices. Oversees core infrastructure architecture, zero-downtime deployment pipelines, and high-availability operations at Tesseract Infosystems.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 text-[10px] font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Distributed Systems</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Cloud-Native K8s</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">DevOps & SRE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Somesh */}
          <div
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
            className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-cyber-purple/40 transition-all duration-300"
          >
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent border border-purple-500/30 flex items-center justify-center text-cyber-purple font-black text-2xl font-mono shadow-[0_0_20px_rgba(168,85,247,0.15)] shrink-0">
                S
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyber-purple transition-colors">
                    Somesh
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyber-purple/15 text-cyber-purple border border-cyber-purple/30">
                    Co-Founder
                  </span>
                </div>
                <p className="text-xs font-mono text-purple-300/80 mt-1">
                  Product Engineering & Technology Solutions
                </p>
                <p className="text-gray-400 text-xs md:text-sm mt-3 leading-relaxed">
                  Specializes in high-concurrency enterprise software engineering, AI automation workflows, and full-lifecycle product architecture. Directs proprietary software platforms, client technology modernization, and scalable solution delivery at Tesseract Infosystems.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 text-[10px] font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Product Engineering</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">AI Automation</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">Full Stack Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black mb-8 text-glow-cyan text-cyber-cyan">Core Engineering Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              className="glass-card p-6 rounded-2xl border border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-cyber-cyan mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-white font-extrabold text-base">{cap.title}</h4>
              <p className="text-gray-400 text-xs mt-3 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-white font-extrabold text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-cyber-cyan" />
            Enterprise Technology Standards
          </h4>
          <p className="text-gray-400 text-xs mt-1">
            Production-grade systems built using modern cloud infrastructure, strict type systems, and scalable microservices.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-[10px] font-mono font-bold">
          <span className="border border-cyan-500/30 px-3.5 py-1.5 rounded-lg bg-cyber-cyan/10 text-cyber-cyan">MODERN CLOUD ARCHITECTURE</span>
          <span className="border border-purple-500/30 px-3.5 py-1.5 rounded-lg bg-cyber-purple/10 text-cyber-purple">ENTERPRISE SECURITY</span>
          <span className="border border-white/10 px-3.5 py-1.5 rounded-lg bg-white/5 text-gray-300">HIGH-CONCURRENCY SYSTEMS</span>
        </div>
      </div>
    </div>
  );
}
