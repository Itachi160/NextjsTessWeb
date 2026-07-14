import { useRef, useEffect, useState, memo, useCallback } from 'react';

export interface Office {
  name: string;
  lat: number;
  lng: number;
  role: string;
  description: string;
}

export const OFFICES: Office[] = [
  { name: 'New York', lat: 40.7128, lng: -74.0060, role: 'Global Headquarters', description: 'HQ, client management, enterprise relations, and strategic operations core.' },
  { name: 'London', lat: 51.5074, lng: -0.1278, role: 'European Delivery Hub', description: 'European sales, client solutions, local cloud deployment architectures.' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, role: 'APAC Operations Core', description: 'Strategic APAC scaling, enterprise product consulting, high-availability networks.' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, role: 'Cloud Platform Hub', description: 'Sub-millisecond routing, data replication management, and server ops.' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, role: 'Oceania Engineering', description: 'Site reliability engineering, 24/7 incident response, and performance monitoring.' }
];

interface Globe3DProps {
  onSelect: (office: Office | null) => void;
  selectedOffice: Office | null;
}

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function Globe3D({ onSelect, selectedOffice }: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const officeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const autoAngle = useRef(0);
  const scrollAngle = useRef(0);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);
  const updateRectCache = useCallback(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Viewport intersection observer to eliminate background rendering load
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.01 });

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!isIntersecting) return;

    let animId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      width = rect?.width || 450;
      height = rect?.height || 450;

      // Ensure we don't have invalid 0 or negative dimensions
      width = Math.max(10, width);
      height = Math.max(10, height);

      const dpr = Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2.0);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset scale transformation matrix first
      ctx.scale(dpr, dpr);
      
      updateRectCache();
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Direct scroll binding in the render loop to achieve zero lag
      scrollAngle.current = window.scrollY * 0.0035;

      // Auto rotate Y
      if (!hovering.current) {
        autoAngle.current += 0.002;
      } else {
        autoAngle.current += 0.0005;
      }

      const ay = autoAngle.current + scrollAngle.current + mouseOffset.current.x * 0.2;
      const ax = mouseOffset.current.y * 0.2;

      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);

      const getRotated = (x: number, y: number, z: number) => {
        // Y-Axis rotation
        const rx = x * cosY - z * sinY;
        const rz = x * sinY + z * cosY;
        // X-Axis rotation
        const ry = y * cosX - rz * sinX;
        const finalZ = y * sinX + rz * cosX;
        return { x: rx, y: ry, z: finalZ };
      };

      const dynamicRadius = Math.max(10, Math.min(width, height) * 0.38);

      const backSegments: Segment[] = [];
      const frontSegments: Segment[] = [];

      // 1. Generate grid lines - meridians
      const meridiansCount = 10;
      const latPointsCount = 20;
      for (let m = 0; m < meridiansCount; m++) {
        const theta = (m * Math.PI) / meridiansCount;
        let prevPt: { x: number; y: number; z: number } | null = null;

        for (let i = 0; i <= latPointsCount; i++) {
          const phi = -Math.PI / 2 + (i * Math.PI) / latPointsCount;
          const x = Math.cos(phi) * Math.sin(theta);
          const y = Math.sin(phi);
          const z = Math.cos(phi) * Math.cos(theta);

          const p = getRotated(x, y, z);
          if (prevPt) {
            const avgZ = (p.z + prevPt.z) / 2;
            const seg: Segment = {
              x1: width / 2 + prevPt.x * dynamicRadius,
              y1: height / 2 - prevPt.y * dynamicRadius,
              x2: width / 2 + p.x * dynamicRadius,
              y2: height / 2 - p.y * dynamicRadius,
            };
            if (avgZ < 0) backSegments.push(seg);
            else frontSegments.push(seg);
          }
          prevPt = p;
        }
      }

      // 2. Generate grid lines - parallels
      const parallelsCount = 7;
      const lngPointsCount = 30;
      for (let pIdx = 1; pIdx < parallelsCount; pIdx++) {
        const phi = -Math.PI / 2 + (pIdx * Math.PI) / parallelsCount;
        let prevPt: { x: number; y: number; z: number } | null = null;

        for (let i = 0; i <= lngPointsCount; i++) {
          const theta = (i * Math.PI * 2) / lngPointsCount;
          const x = Math.cos(phi) * Math.sin(theta);
          const y = Math.sin(phi);
          const z = Math.cos(phi) * Math.cos(theta);

          const p = getRotated(x, y, z);
          if (prevPt) {
            const avgZ = (p.z + prevPt.z) / 2;
            const seg: Segment = {
              x1: width / 2 + prevPt.x * dynamicRadius,
              y1: height / 2 - prevPt.y * dynamicRadius,
              x2: width / 2 + p.x * dynamicRadius,
              y2: height / 2 - p.y * dynamicRadius,
            };
            if (avgZ < 0) backSegments.push(seg);
            else frontSegments.push(seg);
          }
          prevPt = p;
        }
      }

      // 3. Draw back segments (dim, thin)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.lineWidth = 0.8;
      backSegments.forEach((seg) => {
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      });
      ctx.stroke();

      // 4. Draw outer atmosphere boundary
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, dynamicRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Subtle inner globe radial shade
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, dynamicRadius * 0.99, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(3, 5, 13, 0.4)';
      ctx.fill();

      // 5. Draw front segments (bright, thicker)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.18)';
      ctx.lineWidth = 1.1;
      frontSegments.forEach((seg) => {
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      });
      ctx.stroke();

      // 6. Draw glowing core effect on canvas
      ctx.beginPath();
      const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, dynamicRadius * 0.6);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.06)');
      grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = grad;
      ctx.arc(width / 2, height / 2, dynamicRadius * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // 7. Update office markers (HTML elements overlay)
      OFFICES.forEach((office, idx) => {
        const el = officeRefs.current[idx];
        if (!el) return;

        const latRad = (office.lat * Math.PI) / 180;
        const lngRad = (office.lng * Math.PI) / 180;

        const x = Math.cos(latRad) * Math.sin(lngRad);
        const y = Math.sin(latRad);
        const z = Math.cos(latRad) * Math.cos(lngRad);

        const p = getRotated(x, y, z);
        const sx = width / 2 + p.x * dynamicRadius;
        const sy = height / 2 - p.y * dynamicRadius;
        const sz = p.z * dynamicRadius;

        // Project coordinates and scale factor based on depth z
        const norm = (p.z + 1) / 2; // 0 to 1
        const scaleFactor = 0.65 + norm * 0.55;
        const opacityFactor = Math.max(0.1, norm);

        el.style.transform = `translate(-50%, -50%) translate3d(${sx}px, ${sy}px, 0) scale(${scaleFactor})`;
        el.style.opacity = `${opacityFactor}`;
        el.style.zIndex = `${Math.round(sz + dynamicRadius + 20)}`;

        // Hide or disable if too deep in the back
        if (p.z < -0.3) {
          el.style.pointerEvents = 'none';
          el.style.display = 'none';
        } else {
          el.style.pointerEvents = 'auto';
          el.style.display = 'flex';
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener('resize', updateRectCache);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', updateRectCache);
    };
  }, [isIntersecting, updateRectCache]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rectRef.current) updateRectCache();
    const rect = rectRef.current;
    if (!rect) return;
    mouseOffset.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[450px] mx-auto cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { hovering.current = true; updateRectCache(); }}
      onMouseLeave={() => { hovering.current = false; mouseOffset.current = { x: 0, y: 0 }; }}
    >
      {/* Outer Atmosphere Glow Effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] h-[82%] rounded-full bg-cyber-cyan/5 blur-[50px] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[86%] h-[86%] rounded-full border border-white/[0.02] pointer-events-none" />

      {/* Interactive Canvas Grid */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Interactive HTML Location Markers */}
      {OFFICES.map((office, idx) => {
        const isSelected = selectedOffice?.name === office.name;
        return (
          <button
            key={office.name}
            ref={(el) => { officeRefs.current[idx] = el; }}
            onClick={() => onSelect(isSelected ? null : office)}
            className={`absolute left-0 top-0 flex items-center justify-center pointer-events-auto
              transition-[border-color,box-shadow,background] duration-300 rounded-full w-5 h-5 border backdrop-blur-sm
              after:absolute after:inset-[-12px] after:rounded-full after:content-[""]
              ${isSelected
                ? 'border-cyber-purple bg-cyber-purple/20 shadow-[0_0_15px_rgba(168,85,247,0.6)] ring-4 ring-cyber-purple/35'
                : 'border-cyber-cyan/60 bg-space-darker/90 hover:border-cyber-cyan hover:bg-cyber-cyan/15 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)]'
              }`}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Pulsing core dot */}
            <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyber-purple animate-ping' : 'bg-cyber-cyan animate-pulse'}`} />

            {/* Faint text label of city */}
            <span
              className={`absolute left-7 px-2 py-0.5 rounded font-mono text-[9px] font-bold border whitespace-nowrap
                transition-all duration-300
                ${isSelected
                  ? 'bg-cyber-purple/10 border-cyber-purple/30 text-white shadow-md'
                  : 'bg-space-darkest/75 border-white/5 text-gray-400 group-hover:text-cyber-cyan'
                }`}
            >
              {office.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default memo(Globe3D);
