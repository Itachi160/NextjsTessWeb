import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import ScrollReveal from '../../../components/ScrollReveal';

interface JobRole {
  id: number;
  title: string;
  type: string;
  location: string;
  schedule: string;
  skills: string[];
  desc: string;
}

export default function CareersSection() {
  const [filter, setFilter] = useState<'All' | 'Engineering' | 'Internship'>('All');
  const setCursorType = useUIStore((state) => state.setCursorType);

  const jobs: JobRole[] = [
    {
      id: 1,
      title: 'Senior Software Engineer (Java / AWS)',
      type: 'Engineering',
      location: 'New York (Hybrid)',
      schedule: 'Full-time',
      skills: ['Java', 'Spring Boot', 'AWS', 'Kubernetes'],
      desc: 'Build transaction processing systems and multi-threaded JVM microservices handling millions of users.'
    },
    {
      id: 2,
      title: 'Cloud Infrastructure Architect',
      type: 'Engineering',
      location: 'Singapore (On-site)',
      schedule: 'Full-time',
      skills: ['Kubernetes', 'Docker', 'Terraform', 'Azure'],
      desc: 'Design fault-tolerant container orchestration patterns, load balancers, and multi-tenant clusters.'
    },
    {
      id: 3,
      title: 'Deep Learning Intern (NLP)',
      type: 'Internship',
      location: 'London (Remote)',
      schedule: '6 Months (Paid)',
      skills: ['Python', 'PyTorch', 'Hugging Face', 'Docker'],
      desc: 'Work directly inside our ML lab training model graphs and deploying transformer pipelines into apps.'
    },
    {
      id: 4,
      title: 'Graduate Cloud Developer Training',
      type: 'Internship',
      location: 'Tokyo (Hybrid)',
      schedule: '1 Year Program',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
      desc: 'Fast-track graduate mentorship covering database configurations, UI systems, and CI deployment paths.'
    }
  ];

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(job => job.type === filter);

  return (
    <section id="careers" className="relative py-24 px-6 max-w-7xl mx-auto flex flex-col items-center">

      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />

      <ScrollReveal direction="up" className="text-center mb-16">
        <h2 className="text-xs uppercase font-mono tracking-widest text-cyber-cyan font-semibold mb-3 flex items-center justify-center gap-1.5">
          <GraduationCap className="w-4 h-4" />
          Careers & Internships
        </h2>
        <h3 className="text-3xl md:text-5xl font-black">
          Join the Future of Engineering
        </h3>
      </ScrollReveal>

      <div className="flex gap-4 mb-12">
        {(['All', 'Engineering', 'Internship'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${filter === tab
                ? 'bg-cyber-cyan text-white border-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 text-gray-400 border-white/5 hover:border-cyber-cyan hover:text-cyber-cyan'
              }`}
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
          >
            {tab} {tab === 'All' ? 'Roles' : ''}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <AnimatePresence mode="popLayout">
          {filteredJobs.map((job) => (
            <motion.div
              layout
              key={job.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              className="glass-card p-8 rounded-3xl border border-white/5 hover:border-cyber-cyan/35 transition-colors group flex flex-col justify-between min-h-[260px] shadow-lg"
              style={{ willChange: 'transform, opacity' }}
            >
              <div>
                <div className="flex flex-wrap gap-4 text-[10px] font-mono text-gray-500 uppercase">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-cyber-cyan" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyber-purple" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-pink-500" />
                    {job.schedule}
                  </span>
                </div>

                <h4 className="text-lg md:text-xl font-black text-white mt-4 group-hover:text-cyber-cyan transition-colors">
                  {job.title}
                </h4>
                <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                  {job.desc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((skill) => (
                    <span key={skill} className="text-[9px] font-mono font-bold text-gray-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-cyber-cyan opacity-80 group-hover:opacity-100 transition-opacity">
                  Apply Now
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
