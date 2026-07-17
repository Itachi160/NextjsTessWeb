'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Globe, CheckCircle, Terminal, Cpu, Database, ShieldAlert, Sparkles } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import MagneticButton from '../components/MagneticButton';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACT_EMAIL = atob('Y29udGFjdEB0ZXNzZXJhY3RzeXMuY29t'); // contact@tesseractsys.com

export default function Contact() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedStack, setSelectedStack] = useState<'cloud' | 'ai' | 'security' | 'custom'>('cloud');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'SYSTEM: Initializing contact channel...',
    'SYSTEM: Securing port 443 with TLS 1.3...',
    'SYSTEM: Tesseract HQ nodes online.'
  ]);

  useEffect(() => {
    const logPool = [
      'TELEMETRY: Latency to Baramati node: 12ms',
      'TELEMETRY: System status 100% operational',
      'SECURITY: Zero-Trust session established',
      'TELEMETRY: Cloud gateways configured: Active',
      'TELEMETRY: Database shard latency: 2ms'
    ];

    const intervalId = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      setLogs((prev) => [...prev.slice(-4), randomLog]);
    }, 4500);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLogs((prev) => [...prev, `SYSTEM: Preparing email transmission for ${selectedStack.toUpperCase()}...`]);

    const subject = encodeURIComponent(`Project Inquiry (${selectedStack.toUpperCase()}) - ${name}`);
    const body = encodeURIComponent(`Hello Tesseract Team,\n\nI would like to initiate a request for:\nService: ${selectedStack.toUpperCase()}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setFormSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 6000);
  };

  return (
    <div className="relative min-h-screen font-sans" style={{ background: 'linear-gradient(180deg, #03050d 0%, #080c1e 50%, #03050d 100%)' }}>
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] rounded-full bg-cyber-purple/5 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none animate-pulse" />

      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-between gap-12 relative z-10">

        <div className="w-full lg:w-[45%] flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-cyber-cyan font-black flex items-center gap-2 bg-cyber-cyan/5 border border-cyber-cyan/20 px-3 py-1 rounded-full w-fit mb-4">
                <Globe className="w-3.5 h-3.5 animate-spin-slow text-cyber-cyan" />
                HQ Connection Portal
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
                Initiate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple inline-block">
                  Contact
                </span>
              </h1>
              <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-md">
                Configure your system modules, link your tech targets, and initialize a connection with our core engineering team.
              </p>
            </div>
            <div className="glass-card rounded-2xl border border-white/5 bg-[#03050d]/80 p-5 font-mono text-[11px] text-gray-400 shadow-2xl relative overflow-hidden flex flex-col gap-2.5 min-h-[160px]">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Telemetry Logs HUD</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
              </div>
              <div className="flex flex-col gap-1.5 flex-grow">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-cyber-purple font-black">❯</span>
                    <span className={log.startsWith('SYSTEM') ? 'text-cyber-cyan' : log.startsWith('SECURITY') ? 'text-cyber-green' : 'text-gray-300'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-cyber-cyan/20 bg-[#05091a]/40 flex flex-col gap-4 relative overflow-hidden shadow-lg mt-auto">
            <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />
            <h4 className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyber-cyan" />
              Headquarters Node
            </h4>

            <div className="flex flex-col gap-1">
              <span className="text-white font-extrabold text-sm">Tesseract Infosystems</span>
              <p className="text-gray-400 text-xs leading-relaxed">
                Ozarde Estate, Tc College Road, Baramati Pune, 413102
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5 text-xs text-gray-400">
              <a href="tel:+912055550199" className="flex items-center gap-2 hover:text-cyber-cyan transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyber-purple" />
                +91 20 5555 0199
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-cyber-cyan transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyber-cyan" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          <div className="glass-card-glow rounded-3xl border border-white/10 bg-[#03050d]/90 shadow-2xl relative overflow-hidden flex flex-col h-full">
            <div className="h-10 bg-white/[0.02] border-b border-white/5 flex items-center justify-between px-5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">tesseract_compiler.exe</span>
              <div className="w-[36px]" />
            </div>

            <div className="p-8 flex flex-col gap-6 relative z-10 flex-grow justify-center">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 rounded-2xl border border-cyber-cyan/35 bg-cyber-cyan/[0.04] text-center flex flex-col items-center gap-4 py-12"
                  >
                    <div className="w-14 h-14 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center animate-bounce">
                      <CheckCircle className="w-8 h-8 text-cyber-cyan" />
                    </div>
                    <h4 className="text-white font-black text-xl tracking-tight">Transmission Complete</h4>
                    <p className="text-gray-300 text-xs max-w-sm mt-1 leading-relaxed">
                      Your project inquiry has been prepared for transmission. Please check your default email client to confirm sending. Our team will contact you at `{email}` shortly.
                    </p>
                    <div className="font-mono text-[9px] text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 px-3 py-1 rounded-md mt-4 animate-pulse">
                      MAILTO_LAUNCHED // TARGET_PREPARED
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-lg font-black text-white">Configure Your Project</h3>
                      <p className="text-[11px] text-gray-500">Choose the service you are interested in below.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'cloud', label: 'Cloud-Native', icon: Database },
                        { id: 'ai', label: 'AI & Automation', icon: Cpu },
                        { id: 'security', label: 'Cybersecurity', icon: ShieldAlert },
                        { id: 'custom', label: 'Custom Build', icon: Sparkles }
                      ].map((stack) => {
                        const StackIcon = stack.icon;
                        const isSelected = selectedStack === stack.id;
                        return (
                          <button
                            key={stack.id}
                            type="button"
                            onClick={() => setSelectedStack(stack.id as any)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-left text-xs uppercase font-extrabold tracking-wider transition-all duration-300 ${isSelected
                                ? 'bg-gradient-to-r from-cyber-blue/15 to-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)] font-black'
                                : 'bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                              }`}
                          >
                            <StackIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyber-cyan' : 'text-gray-500'}`} />
                            {stack.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl font-mono text-[10px] text-gray-500 overflow-x-auto whitespace-pre-wrap break-all">
                      <span className="text-cyber-purple">const</span> config = &#123; <br />
                      &nbsp;&nbsp;service: <span className="text-cyber-cyan">'{selectedStack.toUpperCase()}'</span>,<br />
                      &nbsp;&nbsp;name: <span className="text-white">'{name || 'unresolved'}'</span>,<br />
                      &nbsp;&nbsp;email: <span className="text-white">'{email || 'unresolved'}'</span><br />
                      &#125;;
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="c-name" className="text-[9px] uppercase font-mono text-gray-500">Your Name</label>
                        <input
                          id="c-name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          placeholder="Your Name"
                          className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all font-mono"
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="c-email" className="text-[9px] uppercase font-mono text-gray-500">Your Email</label>
                        <input
                          id="c-email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="your@email.com"
                          className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="c-message" className="text-[9px] uppercase font-mono text-gray-500">Message / Requirements</label>
                      <textarea
                        id="c-message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        placeholder="Describe your technical needs and timeline..."
                        className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all resize-none font-mono"
                      />
                    </div>

                    <MagneticButton strength={0.1} className="self-start mt-2">
                      <button
                        type="submit"
                        className="btn-cyber-primary cyber-sheen px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 cursor-pointer relative overflow-hidden shadow-lg hover:shadow-cyan-500/25 transition-all"
                        onMouseEnter={() => setCursorType('magnetic')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        Send Message
                        <Send className="w-3.5 h-3.5 fill-white" />
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
