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
  isGoogleVerified?: boolean;
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
    tagline: 'Reputation Engine & Digital Voucher Rewards',
    category: 'SaaS',
    badge: 'Google Cloud Verified',
    description:
      'Our proprietary customer loyalty and review management platform. Integrates with the Google Business Profile API to synchronize multi-location business data, capture customer reviews, power automated responses, and deploy digital voucher rewards that drive repeat sales.',
    icon: Sparkles,
    customLogo: '/images/quvouch_logo.png',
    gradient: 'from-cyan-500/20 via-purple-500/15 to-transparent',
    borderColor: 'border-cyber-cyan/40 hover:border-cyber-cyan shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    badgeColor: 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/40',
    isGoogleVerified: true,
    features: [
      'Official Google Business Profile API synchronization',
      'Real-time customer review capture & authorized responses',
      'Digital voucher rewards with QR code fraud-proof redemption',
      'Multi-location local SEO telemetry & traffic insights',
    ],
    specs: [
      { label: 'Google API Scope', value: 'business.manage' },
      { label: 'Security', value: 'Limited Use Compliant' },
      { label: 'Traffic Uplift', value: '+45% Repeat Footfall' },
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

      {/* Background Ambient Glows */}
      <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] rounded-full bg-cyber-cyan/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-10 w-[500px] h-[500px] rounded-full bg-cyber-purple/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-10 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Hero Header */}
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

        {/* Category Filter Tabs */}
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

      {/* Products Grid */}
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
                {/* Tech Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-cyber-cyan/50 transition-colors pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 group-hover:border-cyber-cyan/50 transition-colors pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & Category Badge */}
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

                    <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-black text-white tracking-wide group-hover:text-cyber-cyan transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1 mb-4 leading-snug">
                    {product.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-gray-300 leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Feature Highlights */}
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

                {/* Bottom Metrics & Actions */}
                <div>
                  {/* Specs Matrix */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-black/40 border border-white/5 mb-5 text-center">
                    {product.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase text-gray-500 truncate">{spec.label}</span>
                        <span className="text-xs font-bold text-white mt-0.5 truncate">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Special Google Verification Link for QuVouch */}
                  {product.isGoogleVerified && (
                    <div className="mb-4 p-2.5 rounded-lg border border-cyber-cyan/30 bg-cyber-cyan/5 flex items-center justify-between text-[11px]">
                      <span className="text-cyber-cyan font-mono flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Google Cloud Compliant
                      </span>
                      <button
                        onClick={() => openLegalModal('privacy')}
                        className="text-white hover:text-cyber-cyan underline font-semibold cursor-pointer"
                      >
                        View Policy
                      </button>
                    </div>
                  )}

                  {/* Request Demo Button */}
                  <button
                    onClick={() => handleContactNav(product.name)}
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-cyber-cyan/20 border border-white/10 hover:border-cyber-cyan text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <span>Request Demo &amp; Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyber-cyan group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Enterprise Custom Product Blueprint Banner */}
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
