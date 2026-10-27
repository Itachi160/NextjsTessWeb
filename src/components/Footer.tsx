'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

const links = {
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Our Products', path: '/products' },
    { name: 'Solutions Blueprint', path: '/solutions' },
    { name: 'Engineering Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ],
  services: [
    { name: 'Custom Software', path: '/services' },
    { name: 'Cloud Solutions', path: '/services' },
    { name: 'AI & Automation', path: '/services' },
    { name: 'DevOps Systems', path: '/services' },
  ],
  policies: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
    { name: 'Security & Safety', path: '/security' },
  ],
};

export default function Footer() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const handleMouseEnter = () => setCursorType('hover');
  const handleMouseLeave = () => setCursorType('default');

  return (
    <footer className="relative z-10 border-t border-white/5 bg-space-darkest/90 backdrop-blur-md py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center gap-3 text-white font-black text-xl tracking-wider uppercase text-left shrink-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src="/Logo Hd.webp"
                alt="Tesseract InfoSystems Logo"
                className="w-full h-full object-contain filter invert brightness-[2.5] drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              />
            </div>
            <span className="font-sans text-glow-cyan bg-clip-text text-transparent bg-gradient-to-r from-white to-cyber-cyan text-sm tracking-widest font-black uppercase">
              Tesseract Infosystems
            </span>
          </Link>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed mt-1">
            Engineering next-generation software platforms, deep tech artificial intelligence, and hyperscale cloud environments for modern enterprise transformation.
          </p>

          <div className="flex flex-col gap-2 mt-1 text-xs text-gray-400">
            <div className="flex items-start gap-2 max-w-sm">
              <MapPin className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                1st Floor, Omkar Commercial Building, TC College Rd, above Durga Cafe, Avdhut Nagar, Baramati, Pune, Maharashtra 413102
              </span>
            </div>
            <a href="tel:+919588666866" className="hover:text-cyber-cyan transition-colors flex items-center gap-2 mt-0.5">
              <span className="text-cyber-cyan font-mono font-bold">PH:</span> +91 9588666866
            </a>
            <a href="mailto:info@tesseractinfosystems.com" className="hover:text-cyber-cyan transition-colors flex items-center gap-2">
              <span className="text-cyber-cyan font-mono font-bold">EMAIL:</span> info@tesseractinfosystems.com
            </a>
          </div>

          <div className="flex items-center gap-3.5 mt-2">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/tesseract-infosystems"
              target="_blank"
              rel="noreferrer"
              aria-label="Tesseract InfoSystems LinkedIn Profile"
              className="w-10 h-10 rounded-full bg-[#0A66C2]/15 border border-[#0A66C2]/40 hover:border-[#0A66C2] flex items-center justify-center shadow-[0_0_12px_rgba(10,102,194,0.3)] hover:shadow-[0_0_20px_rgba(10,102,194,0.7)] hover:scale-110 transition-all duration-300 group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="5" fill="#0A66C2" />
                <circle cx="6.5" cy="6.5" r="1.5" fill="#ffffff" />
                <rect x="5" y="9.5" width="3" height="9.5" rx="0.5" fill="#ffffff" />
                <path fill="#ffffff" d="M10 9.5h2.8v1.3h.04c.39-.74 1.34-1.52 2.77-1.52 2.96 0 3.51 1.95 3.51 4.48V19h-2.92v-4.63c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.77 1.2-1.77 2.44V19H10V9.5z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/tesseractinfosystems"
              target="_blank"
              rel="noreferrer"
              aria-label="Tesseract InfoSystems Instagram Profile"
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 border border-pink-500/40 hover:border-pink-500 flex items-center justify-center shadow-[0_0_12px_rgba(220,39,67,0.3)] hover:shadow-[0_0_20px_rgba(220,39,67,0.7)] hover:scale-110 transition-all duration-300 group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="footer-instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="10%" stopColor="#fdf497" />
                    <stop offset="50%" stopColor="#fd5949" />
                    <stop offset="70%" stopColor="#d6249f" />
                    <stop offset="100%" stopColor="#285AEB" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#footer-instagram-gradient)" />
                <rect x="4.8" y="4.8" width="14.4" height="14.4" rx="4" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-extrabold text-xs uppercase tracking-widest text-cyber-cyan">Company</h4>
          <ul className="flex flex-col gap-2.5">
            {links.company.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-extrabold text-xs uppercase tracking-widest text-cyber-purple">Services</h4>
          <ul className="flex flex-col gap-2.5">
            {links.services.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-extrabold text-xs uppercase tracking-widest text-emerald-400">Policies</h4>
          <ul className="flex flex-col gap-2.5">
            {links.policies.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Tesseract Infosystems. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-gray-400">
          <Link
            href="/privacy"
            className="hover:text-cyber-cyan transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-white/10 hidden sm:inline">•</span>
          <Link
            href="/terms"
            className="hover:text-cyber-purple transition-colors"
          >
            Terms &amp; Conditions
          </Link>
          <span className="text-white/10 hidden sm:inline">•</span>
          <Link
            href="/cookie-policy"
            className="hover:text-amber-400 transition-colors"
          >
            Cookie Policy
          </Link>
          <span className="text-white/10 hidden sm:inline">•</span>
          <Link
            href="/security"
            className="hover:text-emerald-400 transition-colors"
          >
            Security &amp; Safety
          </Link>
        </div>
      </div>
    </footer>
  );
}
