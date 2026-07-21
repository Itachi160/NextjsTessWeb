import { useRef } from 'react';
import { Layout, Cpu, Database, Settings, Cloud } from 'lucide-react';

interface MobileExplodedViewProps {
  scrollProgress: number;
}

interface LayerConfig {
  id: number;
  title: string;
  category: string;
  icon: any;
  color: string;
  borderColor: string;
  shadowColor: string;
  logos: string[];
  techNames: string[];
  exX: number;
  exY: number;
  lockedY: number;
}

const LAYERS: LayerConfig[] = [
  {
    id: 1,
    title: 'Frontend Presentation',
    category: 'CLIENT INTERFACE',
    icon: Layout,
    color: '#06b6d4',
    borderColor: 'border-cyber-cyan/35',
    shadowColor: 'rgba(6, 182, 212, 0.25)',
    logos: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg'
    ],
    techNames: ['React', 'Angular'],
    exX: -90,
    exY: -130,
    lockedY: -180
  },
  {
    id: 2,
    title: 'Backend Core Services',
    category: 'BUSINESS LOGIC',
    icon: Cpu,
    color: '#3b82f6',
    borderColor: 'border-cyber-blue/35',
    shadowColor: 'rgba(59, 130, 246, 0.25)',
    logos: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg'
    ],
    techNames: ['Java', 'Node.js', 'Spring', 'C#'],
    exX: 95,
    exY: -70,
    lockedY: -90
  },
  {
    id: 3,
    title: 'Persistence & Cache',
    category: 'DATA ENGINE',
    icon: Database,
    color: '#a855f7',
    borderColor: 'border-cyber-purple/35',
    shadowColor: 'rgba(168, 85, 247, 0.25)',
    logos: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg'
    ],
    techNames: ['Postgres', 'MongoDB', 'Redis'],
    exX: -100,
    exY: 40,
    lockedY: 0
  },
  {
    id: 4,
    title: 'Orchestration & DevOps',
    category: 'CONTAINERIZATION',
    icon: Settings,
    color: '#ec4899',
    borderColor: 'border-pink-500/35',
    shadowColor: 'rgba(236, 72, 153, 0.25)',
    logos: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg'
    ],
    techNames: ['Docker', 'Kubernetes'],
    exX: 100,
    exY: 100,
    lockedY: 90
  },
  {
    id: 5,
    title: 'Cloud Infrastructure',
    category: 'DEPLOYMENT LAYER',
    icon: Cloud,
    color: '#f97316',
    borderColor: 'border-orange-500/35',
    shadowColor: 'rgba(249, 115, 22, 0.25)',
    logos: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg'
    ],
    techNames: ['AWS', 'Azure'],
    exX: 0,
    exY: 160,
    lockedY: 180
  }
];

function interpolate(value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) {
  if (value <= inputMin) return outputMin;
  if (value >= inputMax) return outputMax;
  const progress = (value - inputMin) / (inputMax - inputMin);
  return outputMin + progress * (outputMax - outputMin);
}

export default function MobileExplodedView({ scrollProgress }: MobileExplodedViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const coreOpacity = interpolate(scrollProgress, 0.20, 0.35, 0, 1) - interpolate(scrollProgress, 0.60, 0.70, 0, 1);
  const coreScale = interpolate(scrollProgress, 0.20, 0.35, 0.3, 1);
  const linesOpacity = interpolate(scrollProgress, 0.25, 0.40, 0, 0.4) - interpolate(scrollProgress, 0.58, 0.68, 0, 0.4);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[350px] mx-auto flex items-center justify-center select-none font-sans overflow-visible h-[420px]"
    >
      <div
        className="absolute w-24 h-24 rounded-full flex items-center justify-center z-0 pointer-events-none transition-all duration-75"
        style={{
          opacity: coreOpacity,
          transform: `scale(${coreScale})`,
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.05) 50%, transparent 100%)'
        }}
      >
        <div className="w-12 h-12 rounded-full border border-cyber-cyan/30 animate-spin flex items-center justify-center" style={{ animationDuration: '6s' }}>
          <div className="w-8 h-8 rounded-full border border-dashed border-cyber-purple/40 animate-[spin_3s_linear_infinite_reverse]" />
        </div>
        <div className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#06b6d4] animate-pulse" />
      </div>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-75"
        viewBox="0 0 350 420"
        style={{ opacity: linesOpacity }}
      >
        <defs>
          <linearGradient id="grad-lt" x1="50%" y1="50%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="grad-rt" x1="50%" y1="50%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="grad-ll" x1="50%" y1="50%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="grad-lr" x1="50%" y1="50%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="grad-bc" x1="50%" y1="50%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <line x1="175" y1="210" x2="85" y2="80" stroke="url(#grad-lt)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="175" y1="210" x2="270" y2="140" stroke="url(#grad-rt)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="175" y1="210" x2="75" y2="250" stroke="url(#grad-ll)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="175" y1="210" x2="275" y2="310" stroke="url(#grad-lr)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="175" y1="210" x2="175" y2="370" stroke="url(#grad-bc)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: 1000 }}>
        {LAYERS.map((layer) => {
          const RenderIcon = layer.icon;

          const rx = interpolate(scrollProgress, 0.60, 0.82, 45, 0);
          const rz = interpolate(scrollProgress, 0.60, 0.82, -45, 0);

          let x = 0;
          let y = 0;
          let z = 0;

          if (scrollProgress <= 0.20) {
            z = (3 - layer.id) * 16;
            y = (layer.id - 3) * 8;
          } else if (scrollProgress <= 0.60) {
            const factor = (scrollProgress - 0.20) / 0.40;
            const startZ = (3 - layer.id) * 16;
            const startY = (layer.id - 3) * 8;
            z = startZ * (1 - factor);
            x = layer.exX * factor;
            y = startY + (layer.exY - startY) * factor;
          } else {
            const factor = (scrollProgress - 0.60) / 0.30;
            x = layer.exX * (1 - Math.min(1, factor));
            y = interpolate(scrollProgress, 0.60, 0.90, layer.exY, layer.lockedY);
          }

          const sc = scrollProgress <= 0.60
            ? 0.82 + (layer.id * 0.02)
            : interpolate(scrollProgress, 0.60, 0.90, 0.9, 1.0);
          const showDetails = scrollProgress >= 0.75;
          const detailsOpacity = interpolate(scrollProgress, 0.72, 0.90, 0, 1);

          return (
            <div
              key={layer.id}
              className={`absolute w-[240px] ${showDetails ? 'w-[280px] h-[64px]' : 'h-[52px]'} rounded-xl glass-card border ${layer.borderColor} flex items-center justify-between p-3 select-none transition-[width,height,background-color] duration-300 bg-space-darkest/85 backdrop-blur-md shadow-lg`}
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${sc})`,
                boxShadow: `0 0 18px ${layer.shadowColor}`,
                zIndex: showDetails ? 20 - layer.id : 10 + (3 - layer.id) * 3,
                willChange: 'transform, opacity, width, height'
              }}
            >
              <div className="flex items-center gap-2.5 text-left w-full overflow-hidden">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${layer.color}15`, border: `1px solid ${layer.color}35` }}
                >
                  <RenderIcon className="w-4 h-4" style={{ color: layer.color }} />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  {!showDetails ? (
                    <span className="text-[9px] font-mono font-bold tracking-wider text-white truncate">
                      {layer.category}
                    </span>
                  ) : (
                    <div className="flex flex-col select-none" style={{ opacity: detailsOpacity }}>
                      <span className="text-[7.5px] font-mono font-bold uppercase tracking-widest" style={{ color: layer.color }}>
                        {layer.category}
                      </span>
                      <span className="text-[10px] font-bold text-white leading-tight font-sans truncate">
                        {layer.title}
                      </span>
                      <span className="text-[8px] font-mono text-gray-400 leading-tight mt-0.5 truncate">
                        {layer.techNames.join(' • ')}
                      </span>
                    </div>
                  )}
                </div>

                {showDetails && (
                  <div className="flex items-center gap-1.5 pl-2 shrink-0 border-l border-white/5" style={{ opacity: detailsOpacity }}>
                    {layer.logos.map((logo, logoIdx) => (
                      <div key={logoIdx} className="w-6 h-6 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center p-0.5">
                        <img src={logo} alt="logo" className="w-4 h-4 object-contain" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
