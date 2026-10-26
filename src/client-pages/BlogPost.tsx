'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  User,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import { BlogPost } from '../lib/blogs';

// FAANG-Grade Professional Markdown to HTML Engine
function renderMarkdownContent(content: string): string {
  let html = content.trim();

  // 1. Process Code / Spec / Architecture Diagram Blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const cleanCode = code.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="my-8 rounded-2xl border border-cyber-cyan/20 bg-[#030614] overflow-hidden shadow-2xl transform-gpu">
      <div class="bg-white/5 px-5 py-2.5 border-b border-white/10 text-[10.5px] font-mono text-cyber-cyan uppercase font-bold tracking-widest flex items-center justify-between">
        <span class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_#06b6d4]"></span>
          ${lang ? `${lang.toUpperCase()} SYSTEM DIAGRAM & BLUEPRINT` : 'PRODUCTION SPECIFICATION'}
        </span>
        <span class="text-gray-500 text-[9px] font-mono">TESSERACT ARCHITECTURE LAB</span>
      </div>
      <pre class="p-5 sm:p-6 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed selection:bg-cyber-cyan selection:text-black"><code>${cleanCode}</code></pre>
    </div>`;
  });

  // 2. Process Markdown Tables
  const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, (match, headerRow, bodyRows) => {
    const headers = headerRow.split('|').filter((cell: string) => cell.trim().length > 0).map((c: string) => c.trim());
    const rows = bodyRows.trim().split('\n').map((row: string) =>
      row.split('|').filter((cell: string) => cell.trim().length > 0).map((c: string) => c.trim())
    );

    let tableHtml = `<div class="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#040818]/95 p-1 shadow-2xl transform-gpu">
      <table class="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr class="border-b border-white/10 bg-white/5 text-cyber-cyan font-mono font-bold uppercase text-[11px] tracking-wider">`;
    headers.forEach((h: string) => {
      tableHtml += `<th class="px-4 sm:px-6 py-4 font-semibold">${h}</th>`;
    });
    tableHtml += `</tr></thead><tbody class="divide-y divide-white/5">`;

    rows.forEach((row: string[], rIdx: number) => {
      tableHtml += `<tr class="hover:bg-white/[0.03] transition-colors ${rIdx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'}">`;
      row.forEach((cell: string) => {
        tableHtml += `<td class="px-4 sm:px-6 py-4 text-gray-300 font-sans text-xs sm:text-sm leading-relaxed">${cell}</td>`;
      });
      tableHtml += `</tr>`;
    });

    tableHtml += `</tbody></table></div>`;
    return tableHtml;
  });

  // 3. Process Custom Headings with Anchors
  html = html.replace(/<h2 id="([^"]+)">([^<]+)<\/h2>/g, '<h2 id="$1" class="text-xl sm:text-2xl md:text-3xl font-black text-white mt-14 mb-5 border-b border-white/10 pb-3 leading-snug flex items-center gap-2 font-sans tracking-tight">$2</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-base sm:text-lg font-bold text-cyber-cyan mt-8 mb-3 font-sans leading-snug">$1</h3>');

  // 4. Process Grouped Numbered Lists (Fixes CSS counter bug cleanly by wrapping in <ol>)
  html = html.replace(/(?:(?:^[0-9]+\. .*\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(line => {
      const content = line.replace(/^[0-9]+\. /, '');
      return `<li class="leading-relaxed text-gray-300 font-sans text-sm sm:text-base mb-2 pl-1">${content}</li>`;
    }).join('');
    return `<ol class="my-6 pl-6 list-decimal space-y-2 text-gray-300 font-sans">${items}</ol>`;
  });

  // 5. Process Grouped Bullet Lists (Wraps in <ul>)
  html = html.replace(/(?:(?:^\* .*\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(line => {
      const content = line.replace(/^\* /, '');
      return `<li class="leading-relaxed text-gray-300 font-sans text-sm sm:text-base mb-2 pl-1">${content}</li>`;
    }).join('');
    return `<ul class="my-6 pl-6 list-disc space-y-2 text-gray-300 font-sans">${items}</ul>`;
  });

  // 6. Process Inline Formatting Tags
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
  html = html.replace(/`([^`]+)`/g, '<code class="text-cyber-cyan bg-white/5 border border-white/10 px-2 py-0.5 rounded font-mono text-xs">$1</code>');
  html = html.replace(/^---$/gim, '<hr class="my-10 border-white/10" />');

  // 7. Wrap Paragraphs
  const blocks = html.split(/\n\n+/);
  html = blocks.map(b => {
    const trimmed = b.trim();
    if (
      trimmed.startsWith('<h2') ||
      trimmed.startsWith('<h3') ||
      trimmed.startsWith('<div') ||
      trimmed.startsWith('<table') ||
      trimmed.startsWith('<ol') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<hr')
    ) {
      return trimmed;
    }
    return `<p class="mt-4 mb-4 leading-relaxed text-gray-300 font-sans text-sm sm:text-base">${trimmed}</p>`;
  }).join('');

  return html;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const [activeHeading, setActiveHeading] = useState('');
  const [copied, setCopied] = useState(false);
  const progressBarFillRef = useRef<HTMLDivElement>(null);
  const activeHeadingRef = useRef('');
  const setCursorType = useUIStore((state) => state.setCursorType);
  const setIsTransitioning = useUIStore((state) => state.setIsTransitioning);
  const router = useRouter();

  const formattedContent = useMemo(() => renderMarkdownContent(post.content), [post.content]);

  // Zero-Re-Render Scroll Progress & rAF Throttled Active Heading Tracker
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (progressBarFillRef.current) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const ratio = Math.min(1, Math.max(0, window.scrollY / totalHeight));
          progressBarFillRef.current.style.transform = `scaleX(${ratio})`;
        }
      }

      let currentHeading = '';
      post.tableOfContents.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top >= 0 && top <= 260) {
            currentHeading = item.id;
          }
        }
      });

      if (currentHeading && currentHeading !== activeHeadingRef.current) {
        activeHeadingRef.current = currentHeading;
        setActiveHeading(currentHeading);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.tableOfContents]);

  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(path);
    }, 450);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-24 pb-28 px-4 sm:px-6 max-w-7xl mx-auto select-none min-h-screen relative">
      {/* Scroll Reading Progress Bar (Direct DOM GPU Scale Transform) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[110] pointer-events-none transform-gpu">
        <div
          ref={progressBarFillRef}
          className="h-full w-full bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple shadow-[0_0_12px_#06b6d4] origin-left transform-gpu"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Back Button Navigation */}
      <div className="mb-8">
        <a
          href="/blog"
          onClick={(e) => handleNav('/blog', e)}
          onMouseEnter={() => setCursorType('hover')}
          onMouseLeave={() => setCursorType('default')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Articles
        </a>
      </div>

      {/* Article Header */}
      <ScrollReveal direction="up" scrub={false} className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-3 text-xs font-mono mb-4 flex-wrap">
          <span className="px-3.5 py-1 rounded-full bg-cyber-cyan/15 border border-cyber-cyan/30 text-cyber-cyan font-bold uppercase tracking-widest text-[10px] shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            {post.category}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyber-cyan" /> {post.publishedAt}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyber-cyan" /> {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-sans">
          {post.title}
        </h1>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg mt-5 leading-relaxed font-sans max-w-3xl mx-auto">
          {post.excerpt}
        </p>

        {/* Author Details Bar */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/40 flex items-center justify-center overflow-hidden shrink-0">
              <User className="w-5 h-5 text-cyber-cyan" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">{post.author.name}</h4>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{post.author.role}</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-300 bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-full hover:bg-white/[0.1] hover:text-white transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>
      </ScrollReveal>

      {/* Main Hero Cover Image */}
      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.6)] mb-16 h-72 sm:h-96 md:h-[420px] relative transform-gpu">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03050d] via-transparent to-transparent opacity-60" />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-4 sticky top-28 hidden lg:block transform-gpu">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#040817]/95 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-cyan mb-4 flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5" /> Table of Contents
            </h3>
            <nav className="flex flex-col gap-2.5">
              {post.tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-xs font-sans transition-colors leading-relaxed block py-1 border-l-2 pl-3 ${
                    activeHeading === item.id
                      ? 'border-cyber-cyan text-cyber-cyan font-bold'
                      : 'border-white/10 text-gray-400 hover:text-white hover:border-white/40'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-xs font-bold text-white mb-2">Need Custom Software?</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-4 font-sans">
                Our engineering team builds custom enterprise platforms, cloud architectures, and AI systems in India.
              </p>
              <a
                href="/contact"
                onClick={(e) => handleNav('/contact', e)}
                className="block text-center text-xs font-mono font-bold text-space-darkest bg-cyber-cyan hover:bg-cyan-400 py-2.5 rounded-xl transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                Request Architecture Quote
              </a>
            </div>
          </div>
        </aside>

        {/* Formatted Article Body */}
        <article className="lg:col-span-8 font-sans">
          {/* Key Takeaways Card */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="mb-10 p-6 sm:p-7 rounded-2xl border border-cyber-cyan/30 bg-[#061224]/80 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.12)]">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyber-cyan flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-cyber-cyan" /> Key Takeaways for Technical Leaders
              </h3>
              <ul className="space-y-3">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* HTML Rendered Content */}
          <div
            className="prose prose-invert max-w-none text-gray-200"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

          {/* Technical References & Citations */}
          {post.references && post.references.length > 0 && (
            <div className="mt-14 pt-8 border-t border-white/10">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyber-cyan" /> References & Authoritative Technical Sources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-cyber-cyan/40 transition-all flex items-start justify-between gap-3 group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover:text-cyber-cyan transition-colors leading-snug">
                        {ref.title}
                      </h5>
                      <p className="text-[11px] text-gray-400 mt-1 font-mono">{ref.note}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyber-cyan shrink-0 mt-0.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Frequently Asked Questions (FAQs) */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-base sm:text-lg font-black text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyber-cyan" /> Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-white/10 bg-[#040817]/90 shadow-md">
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-2 flex items-start gap-2 leading-snug">
                      <span className="text-cyber-cyan font-mono font-bold shrink-0">Q:</span>
                      <span>{faq.question}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans pl-5 border-l-2 border-cyber-cyan/40">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-2 mt-12">
            <span className="text-xs font-mono text-gray-500 font-bold">TAGS:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-cyber-cyan"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Tailored Article Footer Consultation Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl border border-cyber-cyan/30 bg-[#040817]/95 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(6,182,212,0.1)] transform-gpu">
            <div>
              <span className="text-[10px] font-mono font-bold text-cyber-cyan uppercase tracking-wider">
                {post.cta?.badge || 'ENTERPRISE SOLUTIONS'}
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                {post.cta?.title || 'Ready to Architect Your Next System?'}
              </h3>
              <p className="text-gray-400 text-xs mt-1.5 max-w-md font-sans leading-relaxed">
                {post.cta?.description || 'Schedule a technical discovery session with our senior systems architects.'}
              </p>
            </div>

            <MagneticButton strength={0.2}>
              <a
                href="/contact"
                onClick={(e) => handleNav('/contact', e)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-blue text-space-darkest font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_#06b6d4] hover:shadow-[0_0_30px_#06b6d4] transition-all flex items-center gap-2 shrink-0"
              >
                {post.cta?.buttonText || 'Start Technical Audit'}
                <ChevronRight className="w-4 h-4" />
              </a>
            </MagneticButton>
          </div>
        </article>
      </div>
    </div>
  );
}
