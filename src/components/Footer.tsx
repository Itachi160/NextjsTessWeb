'use client';

import Link from 'next/link';
import { useUIStore } from '../store/uiStore';

const links = {
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Engineering Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Contact', path: '/contact' },
  ],
  services: [
    { name: 'Custom Software', path: '/services' },
    { name: 'Cloud Solutions', path: '/services' },
    { name: 'AI & Automation', path: '/services' },
    { name: 'DevOps Systems', path: '/services' },
  ],
};

export default function Footer() {
  const setCursorType = useUIStore((state) => state.setCursorType);
  const handleMouseEnter = () => setCursorType('hover');
  const handleMouseLeave = () => setCursorType('default');

  return (
    <footer className="relative z-10 border-t border-white/5 bg-space-darkest/90 backdrop-blur-md py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        <div className="flex flex-col gap-4 md:col-span-2">
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
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed mt-2">
            Engineering next-generation software platforms, deep tech artificial intelligence, and hyperscale cloud environments for modern enterprise transformation.
          </p>
          <div className="flex flex-col gap-1.5 mt-1 text-xs text-gray-400">
            <a href="tel:+919588666866" className="hover:text-cyber-cyan transition-colors flex items-center gap-2">
              <span className="text-cyber-cyan font-mono font-bold">PH:</span> +91 9588666866
            </a>
            <a href="mailto:info@tesseractinfosystems.com" className="hover:text-cyber-cyan transition-colors flex items-center gap-2">
              <span className="text-cyber-cyan font-mono font-bold">EMAIL:</span> info@tesseractinfosystems.com
            </a>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <a
              href="https://www.linkedin.com/company/tesseract-infosystems"
              target="_blank"
              rel="noreferrer"
              aria-label="Tesseract InfoSystems LinkedIn Profile"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyber-cyan hover:shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/tesseractinfosystems"
              target="_blank"
              rel="noreferrer"
              aria-label="Tesseract InfoSystems Instagram Profile"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyber-cyan hover:shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Tesseract Infosystems. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Security Architecture</a>
        </div>
      </div>
    </footer>
  );
}
