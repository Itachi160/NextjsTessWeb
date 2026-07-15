import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, MessageSquare } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import ScrollReveal from '../../../components/ScrollReveal';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  border: string;
  shadow: string;
}

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const setCursorType = useUIStore((state) => state.setCursorType);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Jioji Green India pvt ltd',
      role: 'Director',
      company: 'Fintech Global LLC',
      quote: 'Tesseract Infosystems re-engineered our core payment systems from a legacy server base to a distributed Kubernetes stack. Their DevOps audit saved us 35% in active cloud hosting costs while improving system latencies under load.',
      border: 'border-cyber-blue/30',
      shadow: 'shadow-blue-500/10',
    },
    {
      id: 2,
      name: 'Anuarc Sales & Services',
      role: 'Director',
      company: 'LogiSmart Automations',
      quote: 'The AI computer vision systems delivered by their deep tech team enabled our warehouse robots to coordinate packing speeds automatically. A flawless integration that showcased exceptional engineering capability.',
      border: 'border-cyber-cyan/30',
      shadow: 'shadow-cyan-500/10',
    },
    {
      id: 3,
      name: 'Auto Car Care',
      role: 'CEO',
      company: 'MedCore Health Platforms',
      quote: 'Their security design is state-of-the-art. They designed our HIPAA-compliant database matrices and microservice channels, allowing safe patient state records access across 12 countries with zero leaks.',
      border: 'border-cyber-purple/30',
      shadow: 'shadow-purple-500/10',
    },
  ];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-24 px-6 max-w-5xl mx-auto flex flex-col items-center">

      {/* Background neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyber-purple/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <ScrollReveal direction="up" className="text-center mb-16">
        <h2 className="text-xs uppercase font-mono tracking-widest text-cyber-purple font-semibold mb-3 flex items-center justify-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          Client Testimonials
        </h2>
        <h3 className="text-3xl md:text-5xl font-black">
          Trusted by Industry Leaders
        </h3>
      </ScrollReveal>

      {/* 3D Glass Carousel Container */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="relative w-full max-w-3xl min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {testimonials.map((item, idx) => {
              if (idx !== activeIdx) return null;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -15, z: -100 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 15, z: -100 }}
                  transition={{ duration: 0.45 }}
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                  className={`glass-card p-8 md:p-12 rounded-3xl border ${item.border} ${item.shadow} flex flex-col gap-6 relative w-full`}
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                >
                  {/* Quote Icon overlay */}
                  <Quote className="absolute top-8 right-8 w-20 h-20 text-white/5 pointer-events-none" />

                  {/* Quote details */}
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed italic relative z-10 font-medium">
                    "{item.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="flex justify-between items-center mt-4 pt-6 border-t border-white/5 relative z-10">
                    <div>
                      <h4 className="text-white font-extrabold text-sm md:text-base">{item.name}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{item.role} — <span className="text-cyber-cyan">{item.company}</span></p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </ScrollReveal>

      {/* Carousel Navigation Controllers */}
      <div className="flex items-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyber-cyan hover:shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all"
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Indicator dots */}
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIdx ? 'w-6 bg-cyber-cyan shadow-[0_0_5px_#06b6d4]' : 'bg-white/20'
                }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyber-cyan hover:shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all"
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
