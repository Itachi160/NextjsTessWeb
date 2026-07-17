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

      <HeroSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <CyberneticGalaxy />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

      <KeyboardAssemblySection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />
      <div className="relative border-y border-white/[0.02] content-visibility-auto">
        <AboutSection />
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

      <div style={{ background: 'rgba(5, 9, 19, 0.65)' }} className="relative content-visibility-auto">
        <ServicesSection />
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-purple/10 to-transparent" />

      <div style={{ background: 'rgba(3, 5, 13, 0.65)' }} className="relative content-visibility-auto">
        <EcosystemSection />
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

      <ProjectsSection />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-purple/10 to-transparent" />

      <div className="relative min-h-[400px] content-visibility-auto">
        <Suspense fallback={<div className="h-[400px]" />}>
          <ProcessSection />
        </Suspense>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div style={{ background: 'rgba(3, 5, 13, 0.65)' }} className="relative min-h-[400px] content-visibility-auto">
        <Suspense fallback={<div className="h-[400px]" />}>
          <WhySection />
        </Suspense>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

      <div style={{ background: 'rgba(5, 9, 19, 0.65)' }} className="relative min-h-[400px] content-visibility-auto">
        <Suspense fallback={<div className="h-[400px]" />}>
          <TestimonialsSection />
        </Suspense>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-purple/10 to-transparent" />

      <div style={{ background: 'rgba(3, 5, 13, 0.65)' }} className="relative min-h-[400px] content-visibility-auto">
        <Suspense fallback={<div className="h-[400px]" />}>
          <CareersSection />
        </Suspense>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />

    </div>
  );
}
