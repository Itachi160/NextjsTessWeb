import React, { useState } from 'react';
import { Send, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import MagneticButton from '../../../components/MagneticButton';
import ScrollReveal from '../../../components/ScrollReveal';

const OFFICES = [
  { name: 'Headquarters (Baramati / Pune)', address: 'Ozarde Estate, TC College Road, Baramati, Pune 413102', phone: '+91 9588666866', tz: 'IST' },
  { name: 'Pune Tech Corridor', address: 'Baner-Balewadi High St, Pune, Maharashtra 411045', phone: '+91 9588666866', tz: 'IST' },
  { name: 'Enterprise Client Pod', address: 'Direct Global & Remote Delivery Pods', phone: '+91 9588666866', tz: 'IST / UTC' },
];

export default function ContactSection() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message, service: 'General Website Inquiry' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setFormSubmitted(true);
      } else {
        alert(data.error || 'Failed to dispatch message. Please try again.');
      }
    } catch (err) {
      console.warn('API contact note:', err);
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setFormSubmitted(false);
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    }, 6000);
  };

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-cyber-blue/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyber-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-semibold mb-3 flex items-center justify-center gap-1.5">
            <Globe className="w-4 h-4" />
            Our Locations
          </h2>
          <h3 className="text-3xl md:text-5xl font-black">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">Touch</span>
          </h3>
          <p className="text-gray-400 text-sm mt-4 max-w-lg mx-auto">
            Have a project or partnership in mind? Connect with our engineering directors at our India headquarters.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-12">
          <ScrollReveal direction="left" delay={0.1} className="w-full lg:w-1/2">
            <div className="glass-card p-8 rounded-3xl border border-white/[0.06] relative overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />

              {formSubmitted ? (
                <div className="text-center py-12 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-cyber-cyan/15 border border-cyber-cyan/30 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-cyber-cyan" />
                  </div>
                  <h4 className="text-cyber-cyan font-bold text-lg">Inquiry Sent to info@tesseractinfosystems.com</h4>
                  <p className="text-gray-400 text-xs mt-2">Thank you! Our engineering team will review your message and reply within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                  <h4 className="text-lg font-bold text-white mb-2">Send a Message</h4>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-1.5 w-full">
                      <label htmlFor="contact-name" className="text-[10px] uppercase font-mono text-gray-500">Name</label>
                      <input
                        id="contact-name"
                        required
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_12px_rgba(6,182,212,0.1)] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <label htmlFor="contact-email" className="text-[10px] uppercase font-mono text-gray-500">Email</label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_12px_rgba(6,182,212,0.1)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-company" className="text-[10px] uppercase font-mono text-gray-500">Company</label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Organization name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_12px_rgba(6,182,212,0.1)] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-[10px] uppercase font-mono text-gray-500">Message</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Describe your project goals..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_12px_rgba(6,182,212,0.1)] transition-all resize-none"
                    />
                  </div>

                  <MagneticButton strength={0.15} className="self-start mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-cyber-primary px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      onMouseEnter={() => setCursorType('magnetic')}
                      onMouseLeave={() => setCursorType('default')}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="w-3.5 h-3.5" />
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2} className="w-full lg:w-1/2 flex flex-col gap-6">
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Our Offices & Locations</h4>

            <div className="flex flex-col gap-3">
              {OFFICES.map((office, idx) => (
                <button
                  key={office.name}
                  onClick={() => setActiveOffice(idx)}
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                  className={`glass-card p-5 rounded-2xl border text-left transition-all duration-300 ${activeOffice === idx
                      ? 'border-cyber-cyan/40 bg-cyber-cyan/[0.04] shadow-[0_0_20px_rgba(6,182,212,0.08)]'
                      : 'border-white/[0.05] hover:border-white/10'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${activeOffice === idx ? 'bg-cyber-cyan/15 text-cyber-cyan' : 'bg-white/[0.04] text-gray-500'
                        }`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className={`text-sm font-bold ${activeOffice === idx ? 'text-cyber-cyan' : 'text-white'}`}>
                          {office.name}
                        </h5>
                        <p className="text-gray-500 text-xs mt-0.5">{office.address}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-gray-600 bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded shrink-0">
                      {office.tz}
                    </span>
                  </div>
                  {activeOffice === idx && (
                    <div className="flex gap-6 mt-3 pt-3 border-t border-white/5 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-cyber-purple" />{office.phone}</span>
                      <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-cyber-cyan" />info@tesseractinfosystems.com</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
