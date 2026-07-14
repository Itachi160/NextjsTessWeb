import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  scrub?: boolean | number;
  scale?: boolean;
  zDepth?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 1.2,
  distance = 40,
  scrub = 1.5,
  scale = true,
  zDepth = 35,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { transformPerspective: 1000 });

    const from: gsap.TweenVars = {
      opacity: 0,
      z: -zDepth,
    };

    const to: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      duration,
      delay: scrub ? 0 : delay,
      ease: 'power2.out',
      force3D: true,
    };

    switch (direction) {
      case 'up': from.y = distance; break;
      case 'down': from.y = -distance; break;
      case 'left': from.x = distance; break;
      case 'right': from.x = -distance; break;
    }

    if (scale) {
      from.scale = 0.94;
    }

    const isScrubEnabled = scrub !== false;
    const scrubValue = typeof scrub === 'number' ? scrub : (scrub ? 1.2 : false);

    to.scrollTrigger = {
      trigger: el,
      start: 'top 92%',
      end: isScrubEnabled ? 'top 45%' : undefined,
      scrub: scrubValue,
      toggleActions: isScrubEnabled ? undefined : 'play none none none',
    };

    const tween = gsap.fromTo(el, from, to);

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [direction, delay, duration, distance, scrub, scale, zDepth]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

