'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Clock, ArrowRight, BookOpen, Calendar, Sparkles, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import ScrollReveal from '../components/ScrollReveal';
import { BLOG_POSTS, getAllCategories } from '../lib/blogs';

export default function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);
  const setCursorType = useUIStore((state) => state.setCursorType);
  const setIsTransitioning = useUIStore((state) => state.setIsTransitioning);
  const router = useRouter();

  const categories = useMemo(() => getAllCategories(), []);

  const featuredPosts = useMemo(
    () => BLOG_POSTS.filter((post) => post.featured),
    []
  );

  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredPosts.length]);

  const activeFeatured = featuredPosts[featuredIndex] || BLOG_POSTS[0];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handlePostClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(`/blog/${slug}`);
    }, 450);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  const handlePrevFeatured = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFeaturedIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  const handleNextFeatured = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 max-w-7xl mx-auto select-none min-h-screen">
      { }
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyber-cyan/[0.03] blur-[160px] pointer-events-none transform-gpu" />

      { }
      <ScrollReveal direction="up" className="text-center mb-12">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyber-cyan px-3.5 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/25 inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <BookOpen className="w-3.5 h-3.5" />
          Tesseract Engineering Blog & Insights
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mt-4 tracking-tight leading-tight">
          Software Architecture, AI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple">
            & Cloud Engineering Insights
          </span>
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
          Deep-dive technical guides, honest software cost breakdowns in INR, and real-world architecture benchmarks written by active systems engineers.
        </p>
      </ScrollReveal>

      { }
      {activeFeatured && (
        <ScrollReveal direction="up" className="mb-16">
          <div
            onClick={(e) => handlePostClick(activeFeatured.slug, e)}
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
            className="group relative rounded-3xl border border-white/10 bg-[#040817]/90 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-500 hover:border-cyber-cyan/50 hover:shadow-[0_12px_45px_rgba(6,182,212,0.2)] grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px]"
          >
            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full gap-5 z-10">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-cyber-cyan/15 border border-cyber-cyan/30 text-cyber-cyan flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <Sparkles className="w-3 h-3" /> FEATURED ARTICLE
                  </span>
                  <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyber-cyan" /> {activeFeatured.publishedAt}
                  </span>
                </div>

                { }
                {featuredPosts.length > 1 && (
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={handlePrevFeatured}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-cyber-cyan/20 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-mono text-gray-400 px-1">
                      0{featuredIndex + 1}/0{featuredPosts.length}
                    </span>
                    <button
                      onClick={handleNextFeatured}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-cyber-cyan/20 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-white group-hover:text-cyber-cyan transition-colors leading-tight font-sans">
                  {activeFeatured.title}
                </h2>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans line-clamp-3 mt-3">
                  {activeFeatured.excerpt}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 mt-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/40 flex items-center justify-center overflow-hidden">
                    <User className="w-4 h-4 text-cyber-cyan" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{activeFeatured.author.name}</h4>
                    <p className="text-[10px] text-gray-400 font-mono">{activeFeatured.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-cyan group-hover:translate-x-1 transition-transform">
                  <span>READ ARTICLE</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
              <img
                src={activeFeatured.coverImage}
                alt={activeFeatured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040817] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#040817] lg:via-transparent lg:to-transparent" />
            </div>
          </div>
        </ScrollReveal>
      )}

      { }
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-cyber-cyan text-space-darkest shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        { }
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles or tech..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition-colors"
          />
        </div>
      </div>

      { }
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post, idx) => (
            <ScrollReveal key={post.slug} direction="up" delay={(idx % 3) * 0.08} scrub={false}>
              <div
                onClick={(e) => handlePostClick(post.slug, e)}
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                className="group glass-card rounded-2xl border border-white/10 bg-[#040817]/70 backdrop-blur-md overflow-hidden cursor-pointer flex flex-col h-full transition-all duration-300 hover:border-cyber-cyan/40 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)] transform-gpu"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-[#03050d]/90 backdrop-blur-md px-3 py-1 rounded-full border border-cyber-cyan/30 text-[9.5px] font-mono font-bold text-cyber-cyan uppercase shadow-md z-10">
                    {post.category}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-500" /> {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors leading-snug font-sans">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 font-sans">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono font-bold text-cyber-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
          <BookOpen className="w-10 h-10 text-gray-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Articles Found</h3>
          <p className="text-gray-400 text-xs mt-1">Try adjusting your search query or category filters.</p>
        </div>
      )}
    </div>
  );
}
