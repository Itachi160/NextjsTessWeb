import { useRef, useEffect, useState, memo, useCallback } from 'react';
import type { MotionValue } from 'framer-motion';

export interface TechItem {
  name: string;
  logo: string;
  color: string;
  category: string;
  desc: string;
  useCase: string;
  strength: string;
}

export const TECH_ITEMS: TechItem[] = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB', category: 'Frontend Platforms', desc: 'Our primary tool for high-end web designs. Offers seamless component modularity, virtual DOM speed, and expansive developer tools.', useCase: 'Immersive SPAs & Web UIs', strength: 'Component Modularity & Rapid Render' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#007396', category: 'Backend Languages', desc: 'The bedrock of enterprise programming. Provides extreme type safety, threading execution, and legacy modernization.', useCase: 'Enterprise Backends & Microservices', strength: 'High Concurrency & Threading' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB', category: 'Data & AI Languages', desc: 'Used to write neural network graphs, compile deep learning logic, configure ETL pipelines, and automate tasks.', useCase: 'AI Modeling & Machine Learning', strength: 'Extensive Data Packages' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933', category: 'Backend Runtimes', desc: 'Powers real-time streaming tools, web socket servers, and low-latency microservices with its event-driven model.', useCase: 'Event-Driven APIs & Serverless', strength: 'Async I/O & V8 Speeds' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED', category: 'Containerization', desc: 'Enforces the "run anywhere" paradigm. Packages applications, runtimes, and dependencies into lightweight containers.', useCase: 'App Isolation & Deployment', strength: 'Immutable Environment Images' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: '#326CE5', category: 'Cloud Orchestration', desc: 'Automates container deployment, scaling, and load-balancing as the core orchestrator of hyperscale cloud setups.', useCase: 'Container Scaling & Routing', strength: 'Self-Healing & Load Balancing' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#FF9900', category: 'Cloud Providers', desc: 'Our primary cloud ecosystem, supplying serverless functions, data pipelines, and global network infrastructure.', useCase: 'Global Infrastructure & Big Data', strength: '99.999% Service Availability' },
  { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', color: '#0078D4', category: 'Cloud Providers', desc: 'Provides robust hybrid cloud options, tightly integrated Active Directory management, and reliable analytics nodes.', useCase: 'Hybrid Enterprise Cloud', strength: 'AD Integration & Compliance' },
  { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', color: '#DD0031', category: 'Frontend Platforms', desc: 'An opinionated framework preferred for large-scale corporate management platforms requiring unified structures.', useCase: 'Enterprise Dashboards', strength: 'Strict MVC Structure' },
  { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', color: '#6DB33F', category: 'Application Frameworks', desc: 'Enables developers to bootstrap cloud-ready API services quickly with built-in filters, telemetry, and security.', useCase: 'Secure API Frameworks', strength: 'Dependency Injection & Scale' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#4169E1', category: 'Databases', desc: 'A robust SQL database engine for transactional logs, financial datasets, and user state matrices with relational integrity.', useCase: 'Relational Transaction Systems', strength: 'ACID Compliance & JSON Querying' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248', category: 'Databases', desc: 'Our database of choice for product catalogs, unstructured text, and user sessions requiring elastic JSON records.', useCase: 'Document Databases & Catalogs', strength: 'Dynamic Schemas & Sharding' },
  { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#DC382D', category: 'Caching & Queues', desc: 'Used as an ultra-fast temporary data cache and message broker to reduce database loads and accelerate response speeds.', useCase: 'In-Memory Cache & Pub/Sub', strength: 'Sub-Millisecond Latencies' },
  { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', color: '#239120', category: 'Backend Languages', desc: 'Powers enterprise .NET applications, game engines with Unity, and Windows-native desktop software with strong typing.', useCase: '.NET Enterprise & Unity Games', strength: 'CLR Performance & LINQ' },
  { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', color: '#A8B9CC', category: 'Systems Languages', desc: 'The foundational language for operating systems, embedded firmware, and performance-critical drivers and compilers.', useCase: 'OS Kernels & Embedded Systems', strength: 'Direct Memory & Hardware Access' },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#00599C', category: 'Systems Languages', desc: 'Powers high-performance applications including game engines, real-time trading systems, and physics simulations.', useCase: 'Game Engines & HFT Systems', strength: 'Zero-Cost Abstractions & Speed' },
  { name: 'Kafka', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', color: '#231F20', category: 'Message Queues', desc: 'Connects distributed systems by streaming event logs and microservice signals without losing package sequence.', useCase: 'Real-Time Event Streams', strength: 'High Throughput Buffers' },
];

interface TechSphere3DProps {
  onSelect: (tech: TechItem | null) => void;
  selectedTech: TechItem | null;
  scrollProgress?: MotionValue<number>;
}

function TechSphere3D({ onSelect, selectedTech, scrollProgress }: TechSphere3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  const basePositions = useRef<{ x: number; y: number; z: number }[]>([]);
  const [isIntersecting, setIsIntersecting] = useState(false);

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
    const n = TECH_ITEMS.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    basePositions.current = TECH_ITEMS.map((_, i) => {
      const y = 1 - (2 * (i + 0.5)) / n;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
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
      width = rect?.width || 480;
      height = rect?.height || 480;

      width = Math.max(10, width);
      height = Math.max(10, height);

      const dpr = Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2.0);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      updateRectCache();
    };

    resize();
    window.addEventListener('resize', resize);

    const orbiters = [
      { angle: 0, speed: 0.006, radiusFraction: 1.22, tiltX: 0.3, tiltY: 0, size: 2.8, color: '#06b6d4', glowSize: 8 },
      { angle: Math.PI * 0.7, speed: -0.004, radiusFraction: 1.38, tiltX: 0, tiltY: -0.25, size: 2.2, color: '#a855f7', glowSize: 6 },
      { angle: Math.PI * 1.3, speed: 0.008, radiusFraction: 1.12, tiltX: -0.4, tiltY: 0, size: 3.2, color: '#ffffff', glowSize: 10 },
      { angle: Math.PI * 0.3, speed: -0.005, radiusFraction: 1.30, tiltX: 0.15, tiltY: 0.2, size: 2.0, color: '#ec4899', glowSize: 6 },
      { angle: Math.PI * 1.8, speed: 0.003, radiusFraction: 1.45, tiltX: -0.1, tiltY: -0.35, size: 2.5, color: '#3b82f6', glowSize: 7 },
    ];

    const fov = 480;
    const centerX = () => width / 2;
    const centerY = () => height / 2;

    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      if (!hovering.current) {
        autoAngle.current += 0.003;
      } else {
        autoAngle.current += 0.0005;
      }

      const ay = autoAngle.current + scrollAngle.current + mouseOffset.current.x * 0.1;
      const ax = mouseOffset.current.y * 0.25;

      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);

      const getRotated = (x: number, y: number, z: number) => {
        const rx = x * cosY - z * sinY;
        const rz = x * sinY + z * cosY;
        const ry = y * cosX - rz * sinX;
        const finalZ = y * sinX + rz * cosX;
        return { x: rx, y: ry, z: finalZ };
      };

      const dynamicRadius = Math.max(10, Math.min(width, height) * 0.36);

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';

      const lonRings = 8;
      for (let rIdx = 0; rIdx < lonRings; rIdx++) {
        const lonAngle = (rIdx * Math.PI) / lonRings;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const theta = (i * Math.PI * 2) / 60;
          const rx = Math.cos(theta) * dynamicRadius * Math.sin(lonAngle);
          const ry = Math.sin(theta) * dynamicRadius;
          const rz = Math.cos(theta) * dynamicRadius * Math.cos(lonAngle);

          const p = getRotated(rx, ry, rz);
          const scale = fov / (fov + p.z);
          const sx = centerX() + p.x * scale;
          const sy = centerY() + p.y * scale;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      const latLines = 5;
      for (let latIdx = 1; latIdx <= latLines; latIdx++) {
        const latAngle = -Math.PI / 2 + (latIdx * Math.PI) / (latLines + 1);
        const latRadius = dynamicRadius * Math.cos(latAngle);
        const latY = dynamicRadius * Math.sin(latAngle);
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const theta = (i * Math.PI * 2) / 60;
          const rx = Math.cos(theta) * latRadius;
          const rz = Math.sin(theta) * latRadius;

          const p = getRotated(rx, latY, rz);
          const scale = fov / (fov + p.z);
          const sx = centerX() + p.x * scale;
          const sy = centerY() + p.y * scale;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
      ctx.lineWidth = 1;
      const t1Radius = dynamicRadius * 1.18;
      for (let i = 0; i <= 60; i++) {
        const theta = (i * Math.PI * 2) / 60;
        const rx = Math.cos(theta) * t1Radius;
        const rz = Math.sin(theta) * t1Radius;
        const ry = rx * 0.3; // tilt

        const p = getRotated(rx, ry, rz);
        const scale = fov / (fov + p.z);
        const sx = centerX() + p.x * scale;
        const sy = centerY() + p.y * scale;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.07)';
      ctx.lineWidth = 1;
      const t2Radius = dynamicRadius * 1.35;
      for (let i = 0; i <= 60; i++) {
        const theta = (i * Math.PI * 2) / 60;
        const rz = Math.cos(theta) * t2Radius;
        const ry = Math.sin(theta) * t2Radius;
        const rx = ry * -0.25;

        const p = getRotated(rx, ry, rz);
        const scale = fov / (fov + p.z);
        const sx = centerX() + p.x * scale;
        const sy = centerY() + p.y * scale;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      const coreScale = fov / (fov + 0);
      const csx = centerX();
      const csy = centerY();

      ctx.beginPath();
      const coreGrad = ctx.createRadialGradient(csx, csy, 0, csx, csy, 35 * coreScale);
      coreGrad.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
      coreGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
      coreGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = coreGrad;
      ctx.arc(csx, csy, 35 * coreScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(csx, csy, 14 * coreScale, Date.now() * 0.001, Date.now() * 0.001 + Math.PI * 1.3);
      ctx.stroke();
      const orbPulse = 4.0 + Math.sin(Date.now() * 0.0035) * 1.0;
      ctx.beginPath();
      ctx.arc(csx, csy, orbPulse * coreScale, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#06b6d4';
      ctx.fill();
      ctx.shadowBlur = 0;

      orbiters.forEach((orb) => {
        orb.angle += orb.speed;

        let ox: number, oy: number, oz: number;
        const orbRadius = dynamicRadius * orb.radiusFraction;

        if (Math.abs(orb.tiltX) > Math.abs(orb.tiltY)) {
          ox = Math.cos(orb.angle) * orbRadius;
          oz = Math.sin(orb.angle) * orbRadius;
          oy = ox * orb.tiltX;
        } else {
          oz = Math.cos(orb.angle) * orbRadius;
          oy = Math.sin(orb.angle) * orbRadius;
          ox = oy * orb.tiltY;
        }

        const op = getRotated(ox, oy, oz);
        const oScale = fov / (fov + op.z);
        const osx = centerX() + op.x * oScale;
        const osy = centerY() + op.y * oScale;

        ctx.beginPath();
        ctx.arc(osx, osy, orb.size * oScale, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.shadowBlur = orb.glowSize * oScale;
        ctx.shadowColor = orb.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(osx, osy, (orb.size + 3) * oScale, 0, Math.PI * 2);
        const haloGrad = ctx.createRadialGradient(osx, osy, 0, osx, osy, (orb.size + 3) * oScale);
        haloGrad.addColorStop(0, orb.color + '30');
        haloGrad.addColorStop(1, orb.color + '00');
        ctx.fillStyle = haloGrad;
        ctx.fill();
      });

      basePositions.current.forEach((p, idx) => {
        const el = itemRefs.current[idx];
        if (!el) return;

        const rotated = getRotated(p.x, p.y, p.z);
        const scaleFactor = fov / (fov + rotated.z * dynamicRadius);

        const sx = centerX() + rotated.x * dynamicRadius * scaleFactor;
        const sy = centerY() - rotated.y * dynamicRadius * scaleFactor;
        const sz = rotated.z * dynamicRadius;
        const norm = (rotated.z + 1) / 2; // 0 to 1
        const sc = 0.55 + norm * 0.55;
        const op = Math.max(0.15, norm);

        el.style.transform = `translate(-50%, -50%) translate3d(${sx}px, ${sy}px, 0) scale(${sc})`;
        el.style.opacity = `${op}`;
        el.style.zIndex = `${Math.round(sz + dynamicRadius + 40)}`;

        if (rotated.z < -0.6) {
          el.style.pointerEvents = 'none';
          el.style.visibility = 'hidden';
        } else {
          el.style.pointerEvents = 'auto';
          el.style.visibility = 'visible';
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const applyScrollProgress = (progress: number) => {
      scrollAngle.current = progress * Math.PI * 2;
    };

    if (scrollProgress) {
      applyScrollProgress(scrollProgress.get());
      const unsubscribe = scrollProgress.on('change', applyScrollProgress);
      return () => {
        cancelAnimationFrame(animId);
        unsubscribe();
        window.removeEventListener('resize', resize);
        window.removeEventListener('resize', updateRectCache);
      };
    }

    const handleScroll = () => {
      scrollAngle.current = window.scrollY * 0.0035;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    window.addEventListener('resize', updateRectCache);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', updateRectCache);
    };
  }, [isIntersecting, updateRectCache, scrollProgress]);

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
      className="relative w-full aspect-square max-w-[480px] mx-auto cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { hovering.current = true; updateRectCache(); }}
      onMouseLeave={() => { hovering.current = false; mouseOffset.current = { x: 0, y: 0 }; }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (!touch || !containerRef.current) return;
        if (!rectRef.current) updateRectCache();
        const rect = rectRef.current;
        if (!rect) return;
        mouseOffset.current = {
          x: ((touch.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((touch.clientY - rect.top) / rect.height - 0.5) * 2,
        };
        hovering.current = true;
      }}
      onTouchStart={() => { hovering.current = true; updateRectCache(); }}
      onTouchEnd={() => { hovering.current = false; mouseOffset.current = { x: 0, y: 0 }; }}
    >

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-cyber-cyan/5 blur-[50px] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-white/[0.012] pointer-events-none" />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {TECH_ITEMS.map((tech, i) => {
        const isSelected = selectedTech?.name === tech.name;
        return (
          <button
            key={tech.name}
            ref={(el) => { itemRefs.current[i] = el; }}
            onClick={() => onSelect(isSelected ? null : tech)}
            className={`absolute left-0 top-0 w-[52px] h-[52px] rounded-xl flex items-center justify-center
              transition-[border-color,box-shadow,background] duration-300 border backdrop-blur-sm z-20
              ${isSelected
                ? 'border-cyber-cyan bg-cyber-cyan/20 shadow-[0_0_25px_rgba(6,182,212,0.5)] ring-2 ring-cyber-cyan/30'
                : 'border-white/10 bg-space-darker/90 hover:border-cyber-cyan/50 hover:bg-white/[0.06] hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
              }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-7 h-7 object-contain pointer-events-none"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent && !parent.querySelector('span')) {
                  const span = document.createElement('span');
                  span.className = 'text-[9px] font-bold text-white font-mono';
                  span.textContent = tech.name;
                  parent.appendChild(span);
                }
              }}
            />

            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-gray-400 whitespace-nowrap opacity-0 pointer-events-none"
              style={{ opacity: isSelected ? 1 : undefined }}
            >
              {isSelected ? tech.name : ''}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default memo(TechSphere3D);
