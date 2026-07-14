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
      
      {/* Page Title */}
      <div className="flex flex-col gap-4">
        <span className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-bold">Company Profile</span>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-none">
          Innovating At <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-blue">
            Hyperscale Speeds
          </span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          CloudSource Technologies was founded by enterprise architects to solve a single critical industry issue: compiling stable, scalable, and secure cloud software products without engineering compromises.
        </p>
      </div>

      {/* Grid: Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Enterprise Engineering */}
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

        {/* Card 2: Security & Compliance */}
        <div
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
          className="glass-card p-8 rounded-3xl border border-white/5 flex gap-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center text-cyber-purple shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Compliance & Security</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Serving highly regulated markets like FinTech, healthcare, and telecommunications requires SOC 2 Type II audit tracking and strict adherence to GDPR / HIPAA privacy guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
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

      {/* Certifications row */}
      <div className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-white font-extrabold text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-cyber-cyan" />
            Accredited Cloud Architects
          </h4>
          <p className="text-gray-400 text-xs mt-1">
            Our company is globally verified across AWS Partner networks, Azure Solutions hubs, and ISO credentials.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-[10px] font-mono font-bold text-gray-500">
          <span className="border border-white/10 px-3 py-1 rounded bg-white/5">AWS SELECT PARTNER</span>
          <span className="border border-white/10 px-3 py-1 rounded bg-white/5">AZURE SOLUTIONS HUB</span>
          <span className="border border-white/10 px-3 py-1 rounded bg-white/5">SOC 2 AUDITED</span>
        </div>
      </div>
    </div>
  );
}
