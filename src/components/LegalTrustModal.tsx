'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/uiStore';
import {
  ShieldCheck,
  FileText,
  Cookie,
  Lock,
  X,
  CheckCircle2,
  ExternalLink,
  Mail,
  Phone,
  Server,
  Database,
  Key,
  Shield,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { useLenis } from 'lenis/react';

interface LegalModalProps {
  initialTab?: 'privacy' | 'terms' | 'cookies' | 'security';
  isEmbedded?: boolean;
}

export default function LegalTrustModal({ initialTab, isEmbedded = false }: LegalModalProps) {
  const legalModalOpen = useUIStore((state) => state.legalModalOpen);
  const legalModalTab = useUIStore((state) => state.legalModalTab);
  const closeLegalModal = useUIStore((state) => state.closeLegalModal);
  const openLegalModal = useUIStore((state) => state.openLegalModal);
  const lenis = useLenis();

  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies' | 'security'>(
    initialTab || legalModalTab || 'privacy'
  );

  useEffect(() => {
    if (legalModalTab) {
      setActiveTab(legalModalTab);
    }
  }, [legalModalTab]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (!isEmbedded) {
      if (legalModalOpen) {
        document.body.style.overflow = 'hidden';
        lenis?.stop();
      } else {
        document.body.style.overflow = 'auto';
        lenis?.start();
      }
    }
    return () => {
      if (!isEmbedded) {
        document.body.style.overflow = 'auto';
        lenis?.start();
      }
    };
  }, [legalModalOpen, isEmbedded, lenis]);

  const handleTabChange = (tab: 'privacy' | 'terms' | 'cookies' | 'security') => {
    setActiveTab(tab);
    if (!isEmbedded) {
      openLegalModal(tab);
    }
  };

  const modalContent = (
    <div
      data-lenis-prevent="true"
      className={`w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-cyber-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] bg-[#070b14]/95 backdrop-blur-2xl text-gray-200 flex flex-col ${isEmbedded ? 'my-8' : 'max-h-[90vh]'}`}
    >

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-cyber-cyan/10 via-cyber-purple/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg p-1.5 bg-black/60 border border-cyber-cyan/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Image
              src="/android-chrome-192x192.png"
              alt="Tesseract InfoSystems Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-extrabold tracking-wider text-white uppercase flex items-center gap-2">
              Tesseract Legal &amp; Trust Center
            </h2>
            <p className="text-[11px] font-mono tracking-wider text-cyber-cyan">
              Comprehensive Security, Privacy &amp; Service Terms
            </p>
          </div>
        </div>

        {!isEmbedded && (
          <button
            onClick={closeLegalModal}
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 bg-black/40 text-xs font-semibold">
        <button
          onClick={() => handleTabChange('privacy')}
          className={`flex items-center justify-center gap-2 py-3 px-4 transition-all border-b-2 cursor-pointer ${activeTab === 'privacy'
            ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10 shadow-[inset_0_-2px_10px_rgba(0,240,255,0.2)]'
            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => handleTabChange('terms')}
          className={`flex items-center justify-center gap-2 py-3 px-4 transition-all border-b-2 cursor-pointer ${activeTab === 'terms'
            ? 'border-cyber-purple text-cyber-purple bg-cyber-purple/10 shadow-[inset_0_-2px_10px_rgba(168,85,247,0.2)]'
            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Terms &amp; Conditions</span>
        </button>

        <button
          onClick={() => handleTabChange('cookies')}
          className={`flex items-center justify-center gap-2 py-3 px-4 transition-all border-b-2 cursor-pointer ${activeTab === 'cookies'
            ? 'border-amber-400 text-amber-400 bg-amber-400/10 shadow-[inset_0_-2px_10px_rgba(251,191,36,0.2)]'
            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
          <Cookie className="w-3.5 h-3.5" />
          <span>Cookie Policy</span>
        </button>

        <button
          onClick={() => handleTabChange('security')}
          className={`flex items-center justify-center gap-2 py-3 px-4 transition-all border-b-2 cursor-pointer ${activeTab === 'security'
            ? 'border-emerald-400 text-emerald-400 bg-emerald-400/10 shadow-[inset_0_-2px_10px_rgba(52,211,153,0.2)]'
            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Security &amp; Safety</span>
        </button>
      </div>

      { }
      <div
        data-lenis-prevent="true"
        onWheel={(e) => {
          e.stopPropagation();
        }}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#00f0ff #050a14',
          overscrollBehavior: 'contain',
        }}
        className={`p-6 md:p-8 space-y-6 text-xs md:text-sm leading-relaxed overflow-y-auto ${isEmbedded ? '' : 'max-h-[62vh]'
          } font-sans overscroll-contain touch-auto`}
      >

        { }
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-cyber-cyan/20 bg-cyber-cyan/5">
              <h3 className="text-base font-bold text-white mb-1">Tesseract Data Privacy Commitment</h3>
              <p className="text-gray-300 text-xs">
                We respect your privacy and are committed to protecting all confidential personal, enterprise, and third-party API data entrusted to us.
              </p>
            </div>

            { }
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-cyber-cyan flex items-center gap-2">
                <Shield className="w-4 h-4" /> 1. Information Collection &amp; Scope
              </h4>
              <p className="text-gray-300">
                Tesseract InfoSystems collects information necessary to deliver enterprise software solutions, website development, cloud architectures, and proprietary software applications. This includes:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-300">
                <li><strong className="text-white">Contact Information:</strong> Name, business email, phone number, and company name provided via project inquiry forms or direct communication.</li>
                <li><strong className="text-white">Client Project Assets:</strong> Technical specifications, business databases, and requirements submitted for system configuration.</li>
                <li><strong className="text-white">Technical Diagnostics:</strong> Browser type, IP address, and system telemetry collected automatically for performance optimization.</li>
              </ul>
            </div>

            { }
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-cyber-cyan flex items-center gap-2">
                <Lock className="w-4 h-4" /> 2. How We Use Your Data
              </h4>
              <p className="text-gray-300">
                Your information is used strictly to fulfill contractual obligations, configure enterprise modules, set up customer communication workflows, and provide ongoing technical maintenance.
              </p>
              <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div className="text-xs text-gray-200">
                  <strong className="text-emerald-300">Zero Data Monetization Guarantee:</strong> Tesseract InfoSystems will NEVER sell, lease, rent, or trade client data or customer lists to third-party advertisers or data brokers under any circumstances.
                </div>
              </div>
            </div>

            { }
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-cyber-cyan flex items-center gap-2">
                <Key className="w-4 h-4" /> 3. Data Confidentiality &amp; Access
              </h4>
              <p className="text-gray-300">
                Access to client source code, databases, cloud keys, and assets is strictly restricted on a need-to-know basis to authorized Tesseract InfoSystems engineers and developers bound by strict non-disclosure agreements (NDAs) and SOC 2 Type II audit tracking.
              </p>
            </div>

            { }
            <div className="p-5 rounded-xl border-2 border-cyber-cyan/40 bg-gradient-to-br from-black/80 via-cyber-cyan/5 to-black/80 shadow-[0_0_25px_rgba(0,240,255,0.1)] space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black/90 border border-cyber-cyan/50 flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.35)] shrink-0">
                  <Image
                    src="/images/quvouch_logo.png"
                    alt="QuVouch Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white tracking-wide flex items-center gap-2">
                    QuVouch Application Privacy
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30">
                      Verified App
                    </span>
                  </h4>
                  <p className="text-xs text-gray-400 font-mono">App Name: <span className="text-cyber-cyan font-bold">QuVouch</span></p>
                </div>
              </div>

              <div className="space-y-3 text-gray-300">
                <p>
                  <strong className="text-white">QuVouch</strong> adheres to strict data security standards as required for Google Cloud branding verification and the Google Business Profile API. The data accessed by QuVouch is solely utilized to provide the intended application functionality. We do not sell, share, or monetize your personal or business data with any third parties.
                </p>

                <div className="p-3 rounded-lg border border-cyber-cyan/30 bg-cyber-cyan/10">
                  <h5 className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" /> Google API Limited Use Disclosure
                  </h5>
                  <p className="text-xs text-cyber-cyan leading-relaxed">
                    QuVouch's use and transfer to any other app of information received from Google APIs will adhere to the{' '}
                    <a
                      href="https://developers.google.com/terms/api-services-user-data-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold hover:text-white"
                    >
                      Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h5 className="font-semibold text-white text-xs">Google Business Profile Data Handling:</h5>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
                    <li><strong className="text-gray-200">Scopes Used:</strong> QuVouch utilizes authorized OAuth scopes (including <code className="text-cyber-cyan bg-black/40 px-1 py-0.5 rounded">https://www.googleapis.com/auth/business.manage</code>) exclusively to allow verified business owners to manage location information, monitor customer reviews, publish local posts, and issue promotional vouchers.</li>
                    <li><strong className="text-gray-200">No Advertising or Resale:</strong> Data retrieved from Google APIs is never utilized for targeted advertising, broker marketplaces, or third-party behavioral tracking.</li>
                    <li><strong className="text-gray-200">User Rights &amp; Access Revocation:</strong> Users can revoke QuVouch&apos;s access at any time via{' '}
                      <a
                        href="https://myaccount.google.com/permissions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-cyan underline hover:text-white"
                      >
                        Google Security Settings
                      </a>.
                    </li>
                    <li><strong className="text-gray-200">Data Deletion:</strong> You can request immediate, permanent deletion of all stored data by emailing our support desk.</li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-400">
                  <div>
                    <span className="font-semibold text-white">User Support Email:</span>{' '}
                    <a href="mailto:info@tesseractinfosystems.com" className="text-cyber-cyan hover:underline">
                      info@tesseractinfosystems.com
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Hotline:</span>{' '}
                    <a href="tel:+919588666866" className="text-gray-300 hover:text-white">
                      +91 9588666866
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: TERMS & CONDITIONS ==================== */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-cyber-purple/20 bg-cyber-purple/5">
              <h3 className="text-base font-bold text-white mb-1">Terms of Service &amp; Project Agreement</h3>
              <p className="text-gray-300 text-xs">
                These terms govern your use of Tesseract InfoSystems digital engineering services, custom software products, and proprietary applications including QuVouch.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-cyber-purple flex items-center gap-2">
                <FileText className="w-4 h-4" /> 1. Service Scope &amp; Development Deliverables
              </h4>
              <p className="text-gray-300">
                Tesseract InfoSystems agrees to perform custom enterprise software development, cloud infrastructure architecture, AI pipeline integration, and software deployment according to project scopes and statements of work (SOW) executed prior to project kickoff.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-cyber-purple flex items-center gap-2">
                <Key className="w-4 h-4" /> 2. Intellectual Property Rights
              </h4>
              <p className="text-gray-300">
                Upon receipt of 100% full payment for completed projects, full ownership of custom bespoke code, visual designs, and brand identity assets transfers to the client. Tesseract InfoSystems retains proprietary ownership of its pre-existing core software frameworks, proprietary architecture engines, and standalone SaaS products (such as the QuVouch platform).
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-cyber-purple flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> 3. Payment Schedules &amp; Revisions
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-300">
                <li>Projects require a standard milestone advance deposit prior to kickoff.</li>
                <li>Scope changes or additions requested outside agreed milestone documents will be quoted transparently as add-ons.</li>
                <li>Revision periods are granted for 30 days following official project delivery for bug fixes and minor adjustments.</li>
              </ul>
            </div>

            { }
            <div className="p-4 rounded-xl border border-cyber-purple/30 bg-cyber-purple/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyber-purple" /> 4. Google Business Profile &amp; Third-Party Transparency
              </h4>
              <p className="text-gray-300 text-xs">
                In strict compliance with Google&apos;s Third-Party Policies for agencies and software developers:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-gray-300">
                <li><strong className="text-white">Independent Provider:</strong> Tesseract InfoSystems and QuVouch are independent third parties and are not Google LLC, nor endorsed or officially affiliated with Google.</li>
                <li><strong className="text-white">Free Platform Notice:</strong> <span className="text-cyber-cyan font-semibold">Google Business Profile is a free tool provided directly by Google</span>. Any fees billed by Tesseract InfoSystems are solely for QuVouch software features, dashboard management tools, analytics, and automation.</li>
                <li><strong className="text-white">Profile Ownership:</strong> Clients retain primary ownership and full control of their Google Business Profile listings at all times and can revoke QuVouch&apos;s manager access immediately.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-cyber-purple flex items-center gap-2">
                <Lock className="w-4 h-4" /> 5. Limitation of Liability
              </h4>
              <p className="text-gray-300">
                Tesseract InfoSystems is not liable for third-party service outages (cloud hosting providers, domain registrars, external APIs like Google Business Profile) beyond our direct technical control.
              </p>
            </div>
          </div>
        )}

        { }
        {activeTab === 'cookies' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/5">
              <h3 className="text-base font-bold text-white mb-1">Cookie Policy &amp; Tracking Preferences</h3>
              <p className="text-gray-300 text-xs">
                Learn how Tesseract InfoSystems uses essential cookies and lightweight scripts to provide a fast, secure, and intuitive web experience.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Cookie className="w-4 h-4" /> 1. What Are Cookies?
              </h4>
              <p className="text-gray-300">
                Cookies are small text files stored on your computer or mobile device when you visit a website. They help remember your preferences and ensure smooth navigation across our portal.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Server className="w-4 h-4" /> 2. Types of Cookies We Use
              </h4>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0 mt-0.5">Essential</span>
                  <div>
                    <strong className="text-white">Strictly Necessary Cookies:</strong> Required for site navigation, security token verification, quote modal states, and interactive tools.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0 mt-0.5">Performance</span>
                  <div>
                    <strong className="text-white">Performance &amp; Speed Cookies:</strong> Cache static media assets and CSS transitions for lightning-fast page reloads.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">Analytics</span>
                  <div>
                    <strong className="text-white">Privacy-First Telemetry:</strong> Aggregated anonymous stats to measure overall traffic and latency without tracking personal IDs.
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Lock className="w-4 h-4" /> 3. Managing Cookie Settings
              </h4>
              <p className="text-gray-300">
                You can adjust your browser settings at any time to block or delete cookies. Note that disabling essential cookies may impact certain interactive features on our portal.
              </p>
            </div>
          </div>
        )}

        { }
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5">
              <h3 className="text-base font-bold text-white mb-1">Enterprise Infrastructure &amp; Data Security</h3>
              <p className="text-gray-300 text-xs">
                Your security is built into our core codebase with industry-standard encryption, SSL protection, and robust zero-trust cloud defenses.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Key className="w-4 h-4" /> 1. SSL/TLS Encryption &amp; Transport Safety
              </h4>
              <p className="text-gray-300">
                All traffic between your browser and Tesseract InfoSystems servers is encrypted using 256-bit SSL (Secure Sockets Layer) and TLS 1.3 encryption protocols.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Database className="w-4 h-4" /> 2. Software &amp; Database Security
              </h4>
              <p className="text-gray-300">
                For enterprise systems and SaaS products such as <strong className="text-white">QuVouch</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-300">
                <li><strong className="text-white">Local &amp; Cloud Storage Safeguards:</strong> Database tables and OAuth tokens are encrypted at rest with AES-256 and backed up daily.</li>
                <li><strong className="text-white">Input Sanitization:</strong> Strict XSS and SQL injection prevention layers on all API endpoints.</li>
                <li><strong className="text-white">Authentication Controls:</strong> Role-based access control (RBAC) and OAuth 2.0 PKCE ensuring unauthorized parties cannot access client backend panels.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Server className="w-4 h-4" /> 3. Server Uptime &amp; Incident Response
              </h4>
              <p className="text-gray-300">
                We deploy on global edge CDN infrastructure featuring continuous health telemetry, automated DDoS mitigation, and 99.99% uptime SLA commitments.
              </p>
            </div>
          </div>
        )}

      </div>

      { }
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-white/10 bg-black/60">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <CheckCircle2 className="w-4 h-4 text-cyber-cyan" />
          <span>Status: <strong className="text-cyber-cyan">✓ Verified &amp; Compliant 2026</strong></span>
        </div>

        <button
          onClick={!isEmbedded ? closeLegalModal : undefined}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-extrabold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        >
          I Understand &amp; Agree
        </button>
      </div>

    </div>
  );

  if (isEmbedded) {
    return modalContent;
  }

  return (
    <AnimatePresence>
      {legalModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLegalModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          { }
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-4xl"
          >
            {modalContent}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
