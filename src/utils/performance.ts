
export function rafThrottle<T extends (...args: any[]) => any>(fn: T): T {
  let rafId: number | null = null;
  let lastArgs: any[] = [];

  const throttled = function (this: any, ...args: any[]) {
    lastArgs = args;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        fn.apply(this, lastArgs);
        rafId = null;
      });
    }
  };

  return throttled as T;
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, wait);
  };
}

export function isMobileDevice(): boolean {
  return (
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getOptimalDPR(max: number = 2): number {
  return Math.min(window.devicePixelRatio || 1, max);
}

export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  options?: IntersectionObserverInit
): () => void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src;
        observer.disconnect();
      }
    });
  }, options || { rootMargin: '50px' });

  observer.observe(img);

  return () => observer.disconnect();
}

export function addOptimizedScrollListener(
  callback: (event: Event) => void,
  throttle: boolean = true
): () => void {
  const handler = throttle ? rafThrottle(callback) : callback;

  window.addEventListener('scroll', handler, { passive: true });

  return () => window.removeEventListener('scroll', handler as any);
}

export function addOptimizedResizeListener(
  callback: (event: Event) => void,
  wait: number = 150
): () => void {
  const handler = debounce(callback, wait);

  window.addEventListener('resize', handler, { passive: true });

  return () => window.removeEventListener('resize', handler);
}

export function enableGPUAcceleration(element: HTMLElement): void {
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.willChange = 'transform';
}


export function disableGPUAcceleration(element: HTMLElement): void {
  element.style.willChange = 'auto';
}

export function batchDOMReads<T>(reads: (() => T)[]): T[] {
  return reads.map((read) => read());
}

export function batchDOMWrites(writes: (() => void)[]): void {
  requestAnimationFrame(() => {
    writes.forEach((write) => write());
  });
}


export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  mark(label: string): void {
    this.marks.set(label, performance.now());
  }

  measure(label: string, startLabel: string): number {
    const start = this.marks.get(startLabel);
    if (!start) {
      console.warn(`No mark found for ${startLabel}`);
      return 0;
    }

    const duration = performance.now() - start;
    console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  clear(): void {
    this.marks.clear();
  }
}

/*
export function reportWebVitals(onPerfEntry?: (metric: any) => void): void {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals')
      .then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(onPerfEntry);
        onFID(onPerfEntry);
        onFCP(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
        onINP(onPerfEntry);
      })
      .catch(() => {
        console.warn('web-vitals package not installed');
      });
  }
}
*/


export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (!conn) return false;

  if (conn.saveData) return true;

  const slowTypes = ['slow-2g', '2g', '3g'];
  if (slowTypes.includes(conn.effectiveType)) return true;

  if (conn.downlink && conn.downlink < 1.5) return true;

  return false;
}

export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  const cores = navigator.hardwareConcurrency || 4;
  if (cores <= 4) return true;

  const deviceMemory = (navigator as any).deviceMemory || 8;
  if (deviceMemory <= 4) return true;

  return false;
}

