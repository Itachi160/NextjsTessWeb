import { useRef, useEffect, useState } from 'react';
import { BookOpen, Award, ArrowUpRight } from 'lucide-react';

interface TechHub {
  name: string;
  techs: string[];
  desc: string;
  color: string;
  phi: number; // latitude angle (-PI/2 to PI/2)
  theta: number; // longitude angle (0 to 2*PI)
  radius: number; // Orbit distance (legacy, replaced dynamically)
}

const HUBS: TechHub[] = [
  {
    name: 'Frontend Architecture',
    techs: ['React', 'Angular', 'TypeScript', 'Tailwind'],
    desc: 'Deep-dive into component lifecycles, virtual DOM rendering, state management pipelines, and responsive CSS frameworks.',
    color: '#06b6d4', // Cyber Cyan
    phi: Math.PI / 3, // Floating high
    theta: 0,
    radius: 125,
  },
  {
    name: 'Backend Systems',
    techs: ['Node.js', 'Java', 'C#', 'Spring Boot'],
    desc: 'Designing asynchronous REST/gRPC API structures, database routing layers, multi-threaded pipelines, and secure auth gateways.',
    color: '#3b82f6', // Cyber Blue
    phi: -Math.PI / 12, // Slightly below equator
    theta: (Math.PI * 2) / 5,
    radius: 125,
  },
  {
    name: 'Cloud & Infrastructure',
    techs: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    desc: 'Orchestrating hyperscale cloud clusters, automated YAML pipelines, infrastructure as code, and virtualized runtime isolation.',
    color: '#a855f7', // Cyber Purple
    phi: Math.PI / 12, // Slightly above equator
    theta: (Math.PI * 4) / 5,
    radius: 125,
  },
  {
    name: 'AI & Data Engineering',
    techs: ['Python', 'PyTorch', 'Kafka', 'Redis'],
    desc: 'Training custom NLP/neural network layers, building distributed Kafka message logs, and implementing low-latency caching.',
    color: '#ec4899', // Cyber Pink
    phi: -Math.PI / 4, // Floating low
    theta: (Math.PI * 6) / 5,
    radius: 125,
  },
  {
    name: 'Systems & Databases',
    techs: ['C++', 'PostgreSQL', 'MongoDB', 'C'],
    desc: 'Writing low-level systems logic, memory buffers, optimized ACID transactional queries, and document catalogs.',
    color: '#10b981', // Cyber Emerald
    phi: Math.PI / 6,
    theta: (Math.PI * 8) / 5,
    radius: 125,
  }
];

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredHub, setHoveredHub] = useState<number | null>(null);
  const hoveredHubRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const scrollAngle = useRef(0);
  const autoAngle = useRef({ x: 0, y: 0 });

  // Floating packets state (per pipeline, 4 packets traveling from center to hub)
  const packetsRef = useRef<{ progress: number; speed: number }[][]>(
    HUBS.map(() => [
      { progress: 0.0, speed: 0.007 },
      { progress: 0.25, speed: 0.007 },
      { progress: 0.5, speed: 0.007 },
      { progress: 0.75, speed: 0.007 }
    ])
  );
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

    let rectCache = canvas.getBoundingClientRect();

    const updateRectCache = () => {
      rectCache = canvas.getBoundingClientRect();
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      width = rect?.width || 500;
      height = rect?.height || 500;

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
      rectCache = canvas.getBoundingClientRect();
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX - rectCache.left,
        y: e.clientY - rectCache.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      hoveredHubRef.current = null;
      setHoveredHub(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mouseenter', updateRectCache);

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      mouseRef.current = {
        x: touch.clientX - rectCache.left,
        y: touch.clientY - rectCache.top,
        active: true,
      };
    };
    const handleTouchEnd = () => {
      mouseRef.current.active = false;
      hoveredHubRef.current = null;
      setHoveredHub(null);
    };

    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchstart', updateRectCache, { passive: true });

    // Orbital track packet nodes (structured data paths)
    const trackNodes = [
      { angle: 0, speed: 0.005, radiusFraction: 1.15, tiltX: 0.35, color: '#a855f7', size: 2.8 },
      { angle: Math.PI, speed: 0.005, radiusFraction: 1.15, tiltX: 0.35, color: '#ec4899', size: 2.0 },
      { angle: Math.PI / 2, speed: -0.004, radiusFraction: 1.35, tiltY: -0.3, color: '#06b6d4', size: 3.2 },
      { angle: Math.PI * 1.5, speed: -0.004, radiusFraction: 1.35, tiltY: -0.3, color: '#3b82f6', size: 2.2 }
    ];

    const fov = 480; // High focal length to prevent layout/visual clipping
    const centerX = () => width / 2;
    const centerY = () => height / 2;

    const drawRoundedRect = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    };

    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Direct scroll binding in the render loop to achieve zero lag
      scrollAngle.current = window.scrollY * 0.0045;

      // Auto-rotation increment (slower rotation)
      autoAngle.current.y += hoveredHubRef.current !== null ? 0.0005 : 0.0018;
      autoAngle.current.x = Math.sin(Date.now() * 0.0003) * 0.08; // slight pitch tilt oscillation

      const ay = autoAngle.current.y + scrollAngle.current;
      const ax = autoAngle.current.x;

      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);

      const getRotated = (x: number, y: number, z: number) => {
        // Rotate Y
        const rx = x * cosY - z * sinY;
        const rz = x * sinY + z * cosY;
        // Rotate X
        const ry = y * cosX - rz * sinX;
        const finalZ = y * sinX + rz * cosX;
        return { x: rx, y: ry, z: finalZ };
      };

      // Compute dynamic radius based on container size to prevent clipping
      const dynamicRadius = Math.max(10, Math.min(width, height) * 0.28);

      // 1. Draw structured spinning 3D holographic wireframe grid sphere (Globe lines)
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.09)'; // Cyan grid

      // Longitude rings (6 segments)
      const lonRings = 6;
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

      // Latitude rings (4 slices)
      const latLines = 4;
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

      // 2. Draw solid tilted planetary tracks (ring orbits)
      // Track 1 (XZ tilted)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.09)'; // Purple track
      ctx.lineWidth = 1;
      const t1Radius = dynamicRadius * 1.15;
      for (let i = 0; i <= 60; i++) {
        const theta = (i * Math.PI * 2) / 60;
        const rx = Math.cos(theta) * t1Radius;
        const rz = Math.sin(theta) * t1Radius;
        const ry = rx * 0.35; // tilt

        const p = getRotated(rx, ry, rz);
        const scale = fov / (fov + p.z);
        const sx = centerX() + p.x * scale;
        const sy = centerY() + p.y * scale;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Track 2 (YZ tilted)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.09)'; // Cyan track
      ctx.lineWidth = 1;
      const t2Radius = dynamicRadius * 1.35;
      for (let i = 0; i <= 60; i++) {
        const theta = (i * Math.PI * 2) / 60;
        const rz = Math.cos(theta) * t2Radius;
        const ry = Math.sin(theta) * t2Radius;
        const rx = ry * -0.3; // tilt

        const p = getRotated(rx, ry, rz);
        const scale = fov / (fov + p.z);
        const sx = centerX() + p.x * scale;
        const sy = centerY() + p.y * scale;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // 3. Draw active track nodes (glowing data packets)
      trackNodes.forEach((node) => {
        node.angle += node.speed;
        
        let rx = 0, ry = 0, rz = 0;
        const rad = dynamicRadius * node.radiusFraction;
        if (node.tiltX !== undefined) {
          rx = Math.cos(node.angle) * rad;
          rz = Math.sin(node.angle) * rad;
          ry = rx * node.tiltX;
        } else if (node.tiltY !== undefined) {
          rz = Math.cos(node.angle) * rad;
          ry = Math.sin(node.angle) * rad;
          rx = ry * node.tiltY;
        }

        const p = getRotated(rx, ry, rz);
        const scale = fov / (fov + p.z);
        const sx = centerX() + p.x * scale;
        const sy = centerY() + p.y * scale;

        ctx.beginPath();
        ctx.arc(sx, sy, node.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = node.size * 2.5;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. Project the central Knowledge Core
      const coreRot = getRotated(0, 0, 0);
      const coreScale = fov / (fov + coreRot.z);
      const csx = centerX() + coreRot.x * coreScale;
      const csy = centerY() + coreRot.y * coreScale;

      // Draw Knowledge Core glow
      ctx.beginPath();
      const coreGrad = ctx.createRadialGradient(csx, csy, 0, csx, csy, 40 * coreScale);
      coreGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      coreGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.12)');
      coreGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = coreGrad;
      ctx.arc(csx, csy, 40 * coreScale, 0, Math.PI * 2);
      ctx.fill();

      // Core layer 1: Ticks ring (dashed, rotating counter-clockwise)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const ticksRadius = 18 * coreScale;
      ctx.setLineDash([3, 4]);
      ctx.arc(csx, csy, ticksRadius, -Date.now() * 0.0012, -Date.now() * 0.0012 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Core layer 2: Rotating inner cyber hexagon
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      const hexRadius = 10 * coreScale;
      const hexAngleOffset = Date.now() * 0.0018;
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 + hexAngleOffset;
        const hx = csx + Math.cos(angle) * hexRadius;
        const hy = csy + Math.sin(angle) * hexRadius;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      // Core layer 3: Pulsing reactor core
      const pulseRate = 4.5 + Math.sin(Date.now() * 0.004) * 1.5;
      ctx.beginPath();
      ctx.arc(csx, csy, pulseRate * coreScale, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#06b6d4';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Core layer 4: Expanding circular shockwaves
      const shockProgress = (Date.now() % 1600) / 1600; // 0 to 1
      const shockRadius = (15 + shockProgress * 22) * coreScale;
      const shockAlpha = 1 - shockProgress;
      ctx.strokeStyle = `rgba(6, 182, 212, ${shockAlpha * 0.45})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(csx, csy, shockRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Project & Draw Tech Hubs
      const projectedHubs = HUBS.map((hub, idx) => {
        // Convert spherical latitude (phi) and longitude (theta) to 3D Cartesian
        const hx = Math.cos(hub.phi) * Math.sin(hub.theta) * dynamicRadius;
        const hy = Math.sin(hub.phi) * dynamicRadius;
        const hz = Math.cos(hub.phi) * Math.cos(hub.theta) * dynamicRadius;

        const p = getRotated(hx, hy, hz);
        const scale = fov / (fov + p.z);
        const sx = centerX() + p.x * scale;
        const sy = centerY() + p.y * scale;

        // Hover detection
        let isHovered = false;
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - sx;
          const dy = mouseRef.current.y - sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 32) {
            isHovered = true;
          }
        }

        return {
          hub,
          idx,
          sx,
          sy,
          sz: p.z,
          scale,
          isHovered
        };
      });

      // Update hovered hub state
      const currentlyHovered = projectedHubs.find(p => p.isHovered);
      if (currentlyHovered !== undefined) {
        if (hoveredHubRef.current !== currentlyHovered.idx) {
          hoveredHubRef.current = currentlyHovered.idx;
          setHoveredHub(currentlyHovered.idx);
        }
      } else {
        if (hoveredHubRef.current !== null) {
          hoveredHubRef.current = null;
          setHoveredHub(null);
        }
      }

      // Sort hubs back-to-front
      const sortedHubs = [...projectedHubs].sort((a, b) => b.sz - a.sz);

      // 4. Draw Geodesic Mesh Lines between hubs (creates 3D network shell look)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projectedHubs.length; i++) {
        const h1 = projectedHubs[i];
        for (let j = i + 1; j < projectedHubs.length; j++) {
          const h2 = projectedHubs[j];
          // Connect nodes to form a spherical mesh cage
          const dx = h1.sx - h2.sx;
          const dy = h1.sy - h2.sy;
          const screenDist = Math.sqrt(dx * dx + dy * dy);

          if (screenDist < 190) {
            ctx.beginPath();
            ctx.moveTo(h1.sx, h1.sy);
            ctx.lineTo(h2.sx, h2.sy);

            // Highlight link if either node is hovered
            if (h1.idx === hoveredHubRef.current || h2.idx === hoveredHubRef.current) {
              ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }
      }

      // 5. Draw Pipelines & Flowing Packets from Core to Hubs
      projectedHubs.forEach((ph) => {
        const hubIsHovered = ph.idx === hoveredHubRef.current;

        // Core to Hub line
        ctx.beginPath();
        ctx.moveTo(csx, csy);
        ctx.lineTo(ph.sx, ph.sy);
        ctx.strokeStyle = hubIsHovered
          ? `rgba(6, 182, 212, 0.35)`
          : `rgba(255, 255, 255, 0.07)`;
        ctx.lineWidth = hubIsHovered ? 1.5 : 0.8;
        ctx.stroke();

        // Flowing packets
        const packets = packetsRef.current[ph.idx];
        packets.forEach((pkt) => {
          pkt.progress += hubIsHovered ? pkt.speed * 2.0 : pkt.speed;
          if (pkt.progress >= 1.0) pkt.progress = 0;

          const psx = csx + pkt.progress * (ph.sx - csx);
          const psy = csy + pkt.progress * (ph.sy - csy);
          const pScale = 1.0 + pkt.progress * (ph.scale - 1.0);

          const size = (hubIsHovered ? 3.5 : 2.0) * pScale;
          ctx.beginPath();
          ctx.arc(psx, psy, size, 0, Math.PI * 2);
          ctx.fillStyle = ph.hub.color;
          ctx.shadowBlur = size * 2;
          ctx.shadowColor = ph.hub.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      // 6. Draw Hub Nodes & Bounding Labels
      sortedHubs.forEach((ph) => {
        const hubIsHovered = ph.idx === hoveredHubRef.current;
        const radius = (hubIsHovered ? 21 : 16) * ph.scale;

        // Outer node shape (Hexagon)
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 + Date.now() * 0.0003;
          const x = ph.sx + Math.cos(angle) * radius;
          const y = ph.sy + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        ctx.fillStyle = hubIsHovered ? 'rgba(3, 5, 13, 0.95)' : 'rgba(3, 5, 13, 0.85)';
        ctx.fill();
        ctx.strokeStyle = ph.hub.color;
        ctx.lineWidth = hubIsHovered ? 2 : 1;
        ctx.stroke();

        // Glow
        if (hubIsHovered) {
          ctx.beginPath();
          ctx.arc(ph.sx, ph.sy, radius * 1.3, 0, Math.PI * 2);
          const radGrad = ctx.createRadialGradient(ph.sx, ph.sy, 0, ph.sx, ph.sy, radius * 1.3);
          radGrad.addColorStop(0, ph.hub.color + '25');
          radGrad.addColorStop(1, ph.hub.color + '00');
          ctx.fillStyle = radGrad;
          ctx.fill();
        }

        // Initials code inside node
        ctx.fillStyle = hubIsHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.45)';
        ctx.font = `bold ${Math.round(7.5 * ph.scale)}px "Outfit", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const initials =
          ph.hub.name.includes('Frontend') ? 'FE' :
          ph.hub.name.includes('Backend') ? 'BE' :
          ph.hub.name.includes('Cloud') ? 'OPS' :
          ph.hub.name.includes('AI') ? 'AI' : 'DB';

        ctx.fillText(initials, ph.sx, ph.sy);

        // 7. Dynamic Rounded Tag Box for Label (prevents overlaps and looks highly premium)
        const tagText = ph.hub.name.split(' ')[0].toUpperCase();
        ctx.font = `bold ${Math.round(6.5 * ph.scale)}px "Outfit", sans-serif`;
        const textWidth = ctx.measureText(tagText).width;

        const tagW = textWidth + 8;
        const tagH = 10;
        const tagX = ph.sx - tagW / 2;
        const tagY = ph.sy + radius + 4;

        ctx.fillStyle = hubIsHovered ? 'rgba(6, 182, 212, 0.12)' : 'rgba(3, 5, 13, 0.75)';
        ctx.strokeStyle = hubIsHovered ? ph.hub.color : 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 0.8;

        drawRoundedRect(ctx, tagX, tagY, tagW, tagH, 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = hubIsHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.35)';
        ctx.fillText(tagText, ph.sx, tagY + tagH / 2 + 0.5);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mouseenter', updateRectCache);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchstart', updateRectCache);
    };
  }, [isIntersecting]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[340px] md:max-w-[480px] lg:max-w-[500px] mx-auto flex flex-col justify-between p-4 md:p-6 pointer-events-auto"
    >
      {/* Background visual rings */}
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] rounded-full border border-white/[0.005] pointer-events-none" />
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full border border-dashed border-white/[0.012] pointer-events-none animate-[spin_100s_linear_infinite]" />
      <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full border border-cyan-500/[0.015] pointer-events-none animate-[spin_50s_linear_infinite_reverse]" />

      {/* Title Tag */}
      <div className="text-center z-10 select-none pointer-events-none mb-1">
        <span className="text-[9px] uppercase font-mono tracking-widest text-cyber-cyan/50 flex items-center justify-center gap-1.5 bg-white/[0.02] border border-white/[0.05] px-2.5 py-0.5 rounded-full w-fit mx-auto">
          <Award className="w-3 h-3 text-cyber-cyan" />
          Tesseract Infosystems TechStack Hub
        </span>
      </div>

      {/* Canvas container */}
      <div className="relative w-full flex-grow flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 cursor-crosshair z-10" />
      </div>

      {/* Curriculum Board Panel */}
      <div className="z-10 mt-2 md:mt-3 min-h-[70px] md:min-h-[96px] relative flex items-center justify-center">
        {hoveredHub !== null ? (
          <div className="w-full glass-card border-cyber-cyan/25 bg-space-darkest/95 p-3.5 rounded-xl shadow-2xl animate-fade-in flex items-center gap-3.5 transition-all duration-300">
            <div className="w-9 h-9 rounded-lg bg-white/[0.03] border flex items-center justify-center shrink-0" style={{ borderColor: HUBS[hoveredHub].color + '35' }}>
              <BookOpen className="w-4.5 h-4.5" style={{ color: HUBS[hoveredHub].color }} />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[12px] text-white tracking-wide truncate">
                  {HUBS[hoveredHub].name}
                </h4>
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: HUBS[hoveredHub].color + '15', color: HUBS[hoveredHub].color }}>
                  Academy Link
                </span>
              </div>
              <p className="text-[9px] text-gray-400 truncate mt-0.5 font-mono">
                Stacks: {HUBS[hoveredHub].techs.join(' • ')}
              </p>
              <p className="text-[9.5px] text-gray-300 line-clamp-1 mt-1 leading-normal">
                {HUBS[hoveredHub].desc}
              </p>
            </div>
            <div className="shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 opacity-55" style={{ color: HUBS[hoveredHub].color }} />
            </div>
          </div>
        ) : (
          <div className="w-full glass-card border-white/[0.04] bg-space-darkest/45 p-3.5 rounded-xl text-center select-none pointer-events-none flex flex-col justify-center items-center gap-1 transition-all duration-300">
            <span className="text-[9.5px] uppercase font-mono tracking-widest text-cyber-cyan/60 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-cyber-cyan animate-pulse" />
              Interactive Skill Pathway Matrix
            </span>
            <p className="text-[9px] text-gray-500 max-w-xs leading-normal">
              Hover over the 3D training nodes to explore the curricula designed to accelerate intern engineers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
