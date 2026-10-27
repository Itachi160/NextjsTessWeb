'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  Database,
  Building,
  Hotel,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  ChevronRight,
  Boxes,
  Lock,
  Car,
  Key,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUIStore } from '../store/uiStore';
import MagneticButton from '../components/MagneticButton';
import ScrollReveal from '../components/ScrollReveal';

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: 'Enterprise' | 'AutoTech' | 'PropTech' | 'Hospitality' | 'EdTech' | 'SaaS';
  badge: string;
  description: string;
  icon: any;
  customLogo?: string;
  gradient: string;
  borderColor: string;
  badgeColor: string;
  features: string[];
  specs: { label: string; value: string }[];
  isComingSoon?: boolean;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'garage-360',
    name: 'Garage 360',
    tagline: 'Automotive Workshop & Multi-Brand Garage OS',
    category: 'AutoTech',
    badge: 'Workshop OS',
    description:
      'All-in-one digital operating system for modern auto repair shops and multi-brand service centers. Streamlines digital job cards, mechanic assignment, spare parts barcode inventory, vehicle service history, GST invoicing, and automated WhatsApp reminder alerts.',
    icon: Wrench,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderColor: 'border-amber-500/30 hover:border-amber-400',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    features: [
      'Digital Job Cards with photo inspection logs',
      'Spare parts inventory with barcode & low-stock alerts',
      'Mechanic labor tracking & productivity metrics',
      '1-Click GST invoicing & automated WhatsApp reminders',
    ],
    specs: [
      { label: 'Job Card Time', value: '< 60 Sec' },
      { label: 'Inventory Sync', value: 'Realtime' },
      { label: 'Mode', value: 'Cloud & Offline' },
    ],
  },
  {
    id: 'tesseract-erp',
    name: 'Tesseract ERP Core',
    tagline: 'Hyperscale Enterprise Resource Planning Suite',
    category: 'Enterprise',
    badge: 'Enterprise Core',
    description:
      'A modular, unified enterprise operating architecture engineered for cross-functional scale. Integrates multi-warehouse supply chains, automated procurement, double-entry financial ledger telemetry, biometric HR payroll, and real-time GST tax compliance.',
    icon: Database,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    features: [
      'Multi-warehouse telemetry & automated replenishment',
      'Double-entry financial accounting & automated GST e-way bills',
      'End-to-end supply chain tracking & vendor portal',
      'Employee biometric attendance, shifts & automated payroll',
    ],
    specs: [
      { label: 'Architecture', value: 'Multi-Tenant' },
      { label: 'Audit Compliance', value: 'SOC 2 Type II' },
      { label: 'Latency', value: '< 3ms Shards' },
    ],
  },
  {
    id: 'quvouch',
    name: 'QuVouch',
    tagline: 'Merchant Intelligence & Customer Engagement Architecture',
    category: 'SaaS',
    badge: 'Reputation SaaS',
    description:
      'Proprietary customer loyalty, multi-location merchant presence, and digital relationship management platform. Designed for authorized business information synchronization, customer service workflows, and fraud-proof digital vouchers.',
    icon: Sparkles,
    customLogo: '/images/quvouch_logo.png',
    gradient: 'from-cyan-500/20 via-purple-500/15 to-transparent',
    borderColor: 'border-cyber-cyan/40 hover:border-cyber-cyan shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    badgeColor: 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/40',
    isComingSoon: true,
    features: [
      'Multi-location merchant presence & listings synchronization',
      'Unified customer feedback & direct inquiry management',
      'Digital voucher rewards with QR code fraud-proof redemption',
      'Local analytics telemetry & customer retention insights',
    ],
    specs: [
      { label: 'Platform Mode', value: 'Private Beta' },
      { label: 'Architecture', value: 'Cloud-Native' },
      { label: 'Security', value: 'SOC 2 & OAuth' },
    ],
  },
  {
    id: 'rent-it',
    name: 'Rent-It',
    tagline: 'Real Estate & Brokerage Management Application',
    category: 'PropTech',
    badge: 'Brokerage OS',
    description:
      'Tailored power-tool designed for property brokers, real estate consultants, and rental managers. Manage flat inventories, broker commission splits, tenant verification documents, digital rental agreements, and automated monthly rent collection schedules.',
    icon: Building,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    features: [
      'Property & flat inventory catalogue with photos & amenities',
      'Tenant KYC verification & automated background checks',
      '1-Click digital rental agreement PDF generation',
      'Rent collection due tracking with automated payment links',
    ],
    specs: [
      { label: 'Inventory Match', value: 'Instant Query' },
      { label: 'Reminders', value: 'Automated WhatsApp' },
      { label: 'Agreement', value: 'Legally Formatted' },
    ],
  },
  {
    id: 'atithi',
    name: 'Atithi',
    tagline: 'Hotel & Guest Hospitality Management System',
    category: 'Hospitality',
    badge: 'Hospitality Suite',
    description:
      'A full-stack hospitality management suite for boutique hotels, resorts, and luxury stays. Coordinates contactless mobile check-in/out, visual room matrix allocation, restaurant POS, housekeeping fleet tracking, and automated guest folios.',
    icon: Hotel,
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    borderColor: 'border-rose-500/30 hover:border-rose-400',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    features: [
      'Visual front-desk room matrix & live availability board',
      'Contactless guest mobile check-in with digital ID uploads',
      'Restaurant, banquet & 24/7 room service POS integration',
      'Housekeeping telemetry with instant room turnover alerts',
    ],
    specs: [
      { label: 'Check-In Speed', value: '< 45 Seconds' },
      { label: 'Room Turnover', value: 'Realtime Alerts' },
      { label: 'Folio Engine', value: 'Zero-Audit Errors' },
    ],
  },
  {
    id: 'gurukul-lms',
    name: 'Gurukul-LMS',
    tagline: 'Next-Gen Learning Management & Academy System',
    category: 'EdTech',
    badge: 'EdTech Cloud',
    description:
      'Interactive, high-concurrency learning management system engineered for coaching academies, colleges, and corporate training centers. Features visual curriculum builders, live video batches, automated quiz grading, and tamper-proof digital certificates.',
    icon: GraduationCap,
    gradient: 'from-violet-500/20 via-indigo-500/10 to-transparent',
    borderColor: 'border-violet-500/30 hover:border-violet-400',
    badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    features: [
      'Course curriculum architect with video chapters & PDFs',
      'Live interactive video classes with attendance tracking',
      'Automated quiz assessment engines & student gradebooks',
      'Tamper-proof verifiable digital completion certificates',
    ],
    specs: [
      { label: 'Streaming', value: 'Adaptive Bitrate' },
      { label: 'Concurrency', value: 'Hyperscale Batches' },
      { label: 'Analytics', value: 'Per-Student Insights' },
    ],
  },
];

const CATEGORIES = ['All', 'Enterprise', 'AutoTech', 'PropTech', 'Hospitality', 'EdTech', 'SaaS'] as const;

export default function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const router = useRouter();
  const setIsTransitioning = useUIStore((state) => state.setIsTransitioning);
  const openLegalModal = useUIStore((state) => state.openLegalModal);

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleContactNav = (productName: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(`/contact?service=${encodeURIComponent(productName)}`);
    }, 450);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto text-gray-200 font-sans">

      { }
      <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] rounded-full bg-cyber-cyan/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-10 w-[500px] h-[500px] rounded-full bg-cyber-purple/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-10 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      { }
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <ScrollReveal direction="up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Boxes className="w-3.5 h-3.5" />
            Proprietary Software Systems
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-purple">Products</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed">
            Scalable, battle-tested software suites built by Tesseract InfoSystems. From workshop automation and enterprise ERPs to Google-verified review engines and hospitality cores.
          </p>
        </ScrollReveal>

        { }
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${selectedCategory === cat
                ? 'bg-cyber-cyan text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
            >
              {cat === 'All' ? 'All Products' : cat}
            </button>
          ))}
        </div>
      </div>

      { }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => {
            const IconComponent = product.icon;
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className={`rounded-3xl border ${product.borderColor} bg-gradient-to-b ${product.gradient} p-7 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-cyber-cyan/50 transition-colors pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 group-hover:border-cyber-cyan/50 transition-colors pointer-events-none" />

                {/* Coming Soon Corner Ribbon */}
                {product.isComingSoon && (
                  <div className="absolute top-7 -right-12 rotate-45 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-mono text-[9px] font-black tracking-widest py-1 px-14 shadow-[0_0_25px_rgba(244,63,94,0.5)] z-20 uppercase text-center border-y border-white/20 select-none">
                    Coming Soon
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black/90 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
                      {product.customLogo ? (
                        <Image
                          src={product.customLogo}
                          alt={`${product.name} Logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          priority
                        />
                      ) : (
                        <div className="p-3.5">
                          <IconComponent className="w-8 h-8 text-white group-hover:text-cyber-cyan transition-colors" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {product.isComingSoon && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border bg-amber-500/15 text-amber-300 border-amber-500/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          Coming Soon
                        </span>
                      )}
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border ${product.badgeColor}`}>
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white tracking-wide group-hover:text-cyber-cyan transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1 mb-4 leading-snug">
                    {product.tagline}
                  </p>

                  {/* Prominent Coming Soon Banner for QuVouch */}
                  {product.isComingSoon && (
                    <div className="mb-4 py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-cyber-cyan/15 border border-amber-500/40 flex items-center justify-between shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        <span className="text-[11px] font-mono font-black text-amber-300 uppercase tracking-wider">
                          Coming Soon • In Development
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-gray-300 bg-black/50 px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">
                        Waitlist Open
                      </span>
                    </div>
                  )}

                  {product.isComingSoon ? (
                    <div className="relative mb-5 rounded-2xl overflow-hidden p-4 bg-black/60 border border-white/5 group-hover:border-amber-500/30 transition-all">
                      <p className="text-xs text-gray-400 leading-relaxed filter blur-[4px] select-none pointer-events-none opacity-40">
                        {product.description}
                      </p>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] p-3 text-center">
                        <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-1.5 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-300">
                          Architecture In Private Beta
                        </span>
                        <p className="text-[9px] font-mono text-gray-400 mt-0.5 max-w-[220px]">
                          Proprietary platform details currently restricted to waitlist partners.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-300 leading-relaxed mb-5">
                      {product.description}
                    </p>
                  )}

                  { }
                  <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold block mb-1">
                      Key Capabilities
                    </span>
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                { }
                <div>
                  { }
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-black/40 border border-white/5 mb-5 text-center">
                    {product.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase text-gray-500 truncate">{spec.label}</span>
                        <span className="text-xs font-bold text-white mt-0.5 truncate">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleContactNav(product.isComingSoon ? `${product.name} (Early Access Waitlist)` : product.name)}
                    className={`w-full py-3 px-4 rounded-xl border text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer group/btn ${
                      product.isComingSoon
                        ? 'bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-cyber-purple/20 hover:from-amber-500/30 hover:to-rose-500/30 border-amber-500/40 hover:border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'bg-white/5 hover:bg-cyber-cyan/20 border-white/10 hover:border-cyber-cyan'
                    }`}
                  >
                    <span>{product.isComingSoon ? 'Join Early Access Waitlist' : 'Request Demo & Quote'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyber-cyan group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      { }
      <div className="mt-20 p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-black/80 via-cyber-cyan/10 to-black/80 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-cyber-cyan font-bold flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-cyber-cyan" /> Need a Bespoke Platform?
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
            Custom Software &amp; Platform Architecture
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-3 leading-relaxed">
            Need a tailored solution built from the ground up? Tesseract InfoSystems engineers high-performance web systems, cross-platform mobile apps, AI automation engines, and cloud infrastructures.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => handleContactNav('Custom Software Architecture')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:opacity-90 transition-opacity cursor-pointer"
            >
              Consult an Architect
            </button>
            <button
              onClick={() => router.push('/solutions')}
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              View System Blueprints
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
