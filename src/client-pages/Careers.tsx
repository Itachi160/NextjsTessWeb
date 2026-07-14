'use client';

import React, { useState } from 'react';
import { MapPin, IndianRupee, Send, CheckCircle2, Terminal } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import MagneticButton from '../components/MagneticButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function Careers() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Senior Software Engineer (Java / AWS)');
  
  // Form states matching compiler fields
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candPortfolio, setCandPortfolio] = useState('');

  const benefits = [
    { title: 'Remote schedules', desc: 'Hybrid and remote setups.' },
    { title: 'Mac setups & gear', desc: 'Ergonomic hardware budget.' },
    { title: 'Training allowances', desc: '₹1.5 Lakhs annual learning.' }
  ];

  const jobs = [
    { id: 'JVM-SE', title: 'Senior Software Engineer (Java / AWS)', loc: 'Baramati (Hybrid)', sal: '₹12L - ₹18L P.A.' },
    { id: 'CLD-ARCH', title: 'Cloud Infrastructure Architect', loc: 'Pune (On-site)', sal: '₹15L - ₹24L P.A.' },
    { id: 'AI-INT', title: 'Deep Learning Intern (AI Models)', loc: 'Baramati (Remote)', sal: 'Paid Internship' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setCandName('');
      setCandEmail('');
      setCandPortfolio('');
    }, 5000);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-10 relative z-10 font-mono">
      {/* Background visual elements */}
      <div className="absolute top-[10%] left-0 w-80 h-80 rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-0 w-80 h-80 rounded-full bg-cyber-purple/5 blur-[120px] pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-cyber-cyan font-bold flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 animate-pulse" />
          SYSTEM.CAREERS_PORTAL // INITIALIZED
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
          Code the Future <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple inline-block">
            With Us
          </span>
        </h1>
      </div>

      {/* Ultra-compact benefits ticker bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-[#03050d]/60 border border-white/5 p-4 rounded-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/[0.02] to-cyber-purple/[0.02] pointer-events-none" />
        {benefits.map((b, idx) => (
          <div key={idx} className="flex items-center gap-3 text-[11px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_#06b6d4] shrink-0" />
            <div>
              <span className="text-white font-bold block">{b.title}</span>
              <span className="text-[10px] text-gray-500">{b.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Node Active Openings */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">// ACTIVE_CORES</h2>
            <span className="text-[10px] text-cyber-cyan">SELECT CORE</span>
          </div>

          <div className="flex flex-col gap-3">
            {jobs.map((job) => {
              const isSelected = selectedRole === job.title;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedRole(job.title)}
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                  className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-cyber-cyan bg-cyber-cyan/[0.02] shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                      : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase">{job.id}</span>
                      <h4 className="text-xs font-bold text-white mt-1 leading-snug">{job.title}</h4>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isSelected ? 'bg-cyber-cyan shadow-[0_0_6px_#06b6d4]' : 'bg-gray-700'}`} />
                  </div>
                  <div className="flex gap-4 text-[9px] text-gray-500 uppercase mt-2.5 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.loc.split(' ')[0]}
                    </span>
                    <span className="flex items-center gap-1 text-cyber-cyan font-bold">
                      <IndianRupee className="w-3 h-3" />
                      {job.sal}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive Code-based application board */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl border border-white/10 bg-[#03050d]/80 shadow-2xl relative overflow-hidden flex flex-col">
            {/* Title Bar */}
            <div className="h-9 bg-white/[0.02] border-b border-white/5 flex items-center justify-between px-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[9px] uppercase tracking-wider text-gray-500">tesseract_recruiter_hud.ts</span>
              <div className="w-[28px]" />
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/[0.03] text-center flex flex-col items-center gap-4 py-12"
                  >
                    <div className="w-12 h-12 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center animate-pulse">
                      <CheckCircle2 className="w-6 h-6 text-cyber-cyan" />
                    </div>
                    <h4 className="text-white font-extrabold text-base tracking-tight uppercase">TRANSMISSION COMPLETED</h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed max-w-sm">
                      Candidate schema initialized. Telemetry credentials logged successfully inside secure databases.
                    </p>
                    <span className="text-[9px] text-cyber-cyan font-bold animate-pulse mt-2">SYS_LOAD: CONNECT_SUCCESS</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {/* Simulated TypeScript Class format fields */}
                    <div className="text-[10px] text-gray-500 mb-2 leading-relaxed">
                      <span className="text-cyber-purple font-bold">import</span> &#123; Candidate &#125; <span className="text-cyber-purple font-bold">from</span> <span className="text-cyber-cyan">'@tesseract/hr'</span>;<br />
                      <span className="text-cyber-purple font-bold">const</span> application = <span className="text-cyber-purple font-bold">new</span> <span className="text-white font-bold">Candidate</span>(&#123;<br />
                      &nbsp;&nbsp;role: <span className="text-cyber-cyan">'{selectedRole.split(' (')[0]}'</span>
                    </div>

                    {/* Inputs embedded inside compiler HUD */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex flex-col gap-1 w-full">
                          <label className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">Candidate Name</label>
                          <input
                            required
                            type="text"
                            value={candName}
                            onChange={(e) => setCandName(e.target.value)}
                            placeholder="John Doe"
                            className="bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_8px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                          <label className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">E-Mail Address</label>
                          <input
                            required
                            type="email"
                            value={candEmail}
                            onChange={(e) => setCandEmail(e.target.value)}
                            placeholder="john@email.com"
                            className="bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_8px_rgba(6,182,212,0.1)] transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">Portfolio Link / GitHub URL</label>
                        <input
                          required
                          type="url"
                          value={candPortfolio}
                          onChange={(e) => setCandPortfolio(e.target.value)}
                          placeholder="https://github.com/..."
                          className="bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_8px_rgba(6,182,212,0.1)] transition-all"
                        />
                      </div>

                      {/* PDF Dropzone */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">Resume Document (.PDF)</label>
                        <div className="border border-dashed border-white/10 rounded-lg p-4 text-center cursor-pointer hover:border-cyber-cyan/40 bg-white/[0.01] hover:bg-white/[0.02] transition-all relative flex flex-col justify-center items-center gap-0.5">
                          <input
                            required
                            type="file"
                            accept=".pdf"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <span className="text-[10px] text-gray-300 font-bold">Upload Resume File</span>
                          <span className="text-[8px] text-gray-500">Click or drag file (PDF only, up to 5MB)</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-gray-500 mt-1">
                      &#125;);
                    </div>

                    <MagneticButton strength={0.1} className="self-start mt-2">
                      <button
                        type="submit"
                        className="btn-cyber-primary cyber-sheen px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase text-white flex items-center gap-1.5 cursor-pointer relative overflow-hidden shadow-lg hover:shadow-cyan-500/10"
                        onMouseEnter={() => setCursorType('magnetic')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        Submit Application
                        <Send className="w-3 h-3 fill-white" />
                      </button>
                    </MagneticButton>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
