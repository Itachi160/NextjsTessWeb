'use client';

import { Shield, Users, Award, Code2 } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function About() {
  const setCursorType = useUIStore((state) => state.setCursorType);

  const board = [
    { name: 'Dr. Alistair Vance', role: 'Chief Executive Officer', bio: 'Former Principal Architect at AWS and Distributed Systems researcher.' },
    { name: 'Marcus Sterling', role: 'Head of Software Systems', bio: 'Vetted database systems lead with 15+ years managing scale infrastructure.' },
    { name: 'Dr. Julia Feng', role: 'Director of AI Systems', bio: 'PhD in Machine Learning and neural graph optimizer designer.' }
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

      <div>
        <h2 className="text-2xl font-black mb-8 text-glow-cyan text-cyber-cyan">Engineering Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {board.map((member) => (
            <div
              key={member.name}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              className="glass-card p-6 rounded-2xl border border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-cyber-cyan mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-white font-extrabold text-base">{member.name}</h4>
              <span className="text-cyber-purple text-[10px] font-mono uppercase font-bold block mt-1">{member.role}</span>
              <p className="text-gray-400 text-xs mt-3 leading-relaxed">{member.bio}</p>
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
