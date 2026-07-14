'use client';

import { lazy, Suspense } from 'react';
import HeroSection from '../features/home/components/HeroSection';
import CyberneticGalaxy from '../features/home/components/CyberneticGalaxy';
import KeyboardAssemblySection from '../features/home/components/KeyboardAssemblySection';
import AboutSection from '../features/home/components/AboutSection';
import ServicesSection from '../features/home/components/ServicesSection';
import EcosystemSection from '../features/home/components/EcosystemSection';
import ProjectsSection from '../features/home/components/ProjectsSection';

const ProcessSection = lazy(() => import('../features/home/components/ProcessSection'));
const WhySection = lazy(() => import('../features/home/components/WhySection'));
const TestimonialsSection = lazy(() => import('../features/home/components/TestimonialsSection'));
const CareersSection = lazy(() => import('../features/home/components/CareersSection'));


export default function Home() {

  return (
    <div className="relative z-10 w-full">
      {/* 1. Hero */}
      <HeroSection />

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Career Pathway Cybernetic Galaxy */}
      <CyberneticGalaxy />

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

      {/* Keyboard Assembly Scrollytelling Section */}
      <KeyboardAssemblySection />

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

      {/* 2. About (Steel-blue/Slate tech layout for visual variety without harsh white flash) */}
      <div className="relative border-y border-white/[0.02]">
        <AboutSection />
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

      {/* 3. Services */}
      <div style={{ background: 'rgba(5, 9, 19, 0.65)' }} className="relative">
        <ServicesSection />
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-purple/10 to-transparent" />

      {/* 4. Technology Ecosystem */}
      <div style={{ background: 'rgba(3, 5, 13, 0.65)' }} className="relative">
        <EcosystemSection />
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

      {/* 5. Projects - Horizontal Scroll (has its own background) */}
      <ProjectsSection />

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-purple/10 to-transparent" />

      {/* 6. Process */}
      <div className="relative min-h-[400px]">
        <Suspense fallback={<div className="h-[400px]" />}>
          <ProcessSection />
        </Suspense>
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* 7. Why Choose Us */}
      <div style={{ background: 'rgba(3, 5, 13, 0.65)' }} className="relative min-h-[400px]">
        <Suspense fallback={<div className="h-[400px]" />}>
          <WhySection />
        </Suspense>
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

      {/* 8. Testimonials */}
      <div style={{ background: 'rgba(5, 9, 19, 0.65)' }} className="relative min-h-[400px]">
        <Suspense fallback={<div className="h-[400px]" />}>
          <TestimonialsSection />
        </Suspense>
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-purple/10 to-transparent" />

      {/* 9. Careers */}
      <div style={{ background: 'rgba(3, 5, 13, 0.65)' }} className="relative min-h-[400px]">
        <Suspense fallback={<div className="h-[400px]" />}>
          <CareersSection />
        </Suspense>
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

    </div>
  );
}
