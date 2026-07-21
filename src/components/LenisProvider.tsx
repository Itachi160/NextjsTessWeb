'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  syncTouch: false,
  touchMultiplier: 1.5,
};

function LenisScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          ScrollTrigger.update();
        });
      }
    };
    lenis.on('scroll', onScroll);
    ScrollTrigger.refresh();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      lenis.off('scroll', onScroll);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [lenis]);

  return null;
}

function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (prevPathname.current !== null && prevPathname.current !== pathname) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
    prevPathname.current = pathname;
  }, [pathname, lenis]);

  return null;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisScrollTriggerSync />
      <ScrollToTopOnRouteChange />
      {children}
    </ReactLenis>
  );
}
