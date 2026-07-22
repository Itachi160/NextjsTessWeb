import { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Cpu, Terminal, Shield, Network, Zap, Compass, ChevronRight } from 'lucide-react';

/* ─────────────── Types ─────────────── */

export interface TechBranch {
  name: string;
  x: number;
  y: number;
}

export interface PathwayTrack {
  id: string;
  name: string;
  codeName: string;
  capsuleName: string;
  color: string;
  hexColor: string;
  glowColor: string;
  hexX: number;
  hexY: number;
  stationX: number;
  stationY: number;
  description: string;
  syllabus: string[];
  techs: { name: string }[];
  branches: TechBranch[];
}


export const GALAXY_TRACKS: PathwayTrack[] = [
  {
    id: 'ai',
    name: 'Artificial Intelligence & Neural Systems',
    codeName: 'AI',
    capsuleName: 'AI',
    color: 'text-pink-500',
    hexColor: '#ec4899',
    glowColor: '236, 72, 153',
    hexX: 375, hexY: 214,
    stationX: 250, stationY: 117,
    description: 'Understand neural network graphs, configure deep learning workflows, train machine learning models, and engineer multi-agent systems.',
    syllabus: [
      'Phase 1: Deep Neural Networks & Backprop Math',
      'Phase 2: NLP, LLM Fine-Tuning & Prompt Pipelines',
      'Phase 3: Reinforcement Learning & Autonomous Agents'
    ],
    techs: [{ name: 'Python' }, { name: 'PyTorch' }, { name: 'TensorFlow' }, { name: 'Hugging Face' }],
    branches: [
      { name: 'Neural Nets', x: 180, y: 50 },
      { name: 'LLM Pipelines', x: 140, y: 90 },
      { name: 'Computer Vision', x: 130, y: 140 },
      { name: 'Agent Systems', x: 180, y: 180 },
      { name: 'Python Core', x: 260, y: 45 }
    ]
  },
  {
    id: 'be',
    name: 'Enterprise Backend Engineering',
    codeName: 'BE',
    capsuleName: 'BACKEND',
    color: 'text-blue-500',
    hexColor: '#3b82f6',
    glowColor: '59, 130, 246',
    hexX: 625, hexY: 214,
    stationX: 750, stationY: 117,
    description: 'Master highly scalable microservices, low-latency API architectures, thread-safe memory paradigms, and distributed message brokers.',
    syllabus: [
      'Phase 1: Concurrent Threading & JVM Internals',
      'Phase 2: Microservice Frameworks & Rest/gRPC',
      'Phase 3: Event Streams & Pub-Sub Broker Design'
    ],
    techs: [{ name: 'Java' }, { name: 'Node.js' }, { name: 'C#' }, { name: 'Spring Boot' }],
    branches: [
      { name: 'JVM Scale', x: 820, y: 50 },
      { name: 'Node Async', x: 860, y: 90 },
      { name: 'Enterprise C#', x: 870, y: 140 },
      { name: 'gRPC APIs', x: 820, y: 180 },
      { name: 'Spring Boot', x: 740, y: 45 }
    ]
  },
  {
    id: 'fe',
    name: 'Advanced Frontend Interfaces',
    codeName: 'FE',
    capsuleName: 'FRONTEND',
    color: 'text-cyan-400',
    hexColor: '#22d3ee',
    glowColor: '34, 211, 238',
    hexX: 430, hexY: 403,
    stationX: 360, stationY: 494,
    description: 'Develop premium interactive applications with extreme fluid animations, sub-millisecond compile setups, and component modularity.',
    syllabus: [
      'Phase 1: React, Component Virtual DOM & Hooks',
      'Phase 2: TypeScript Safety & State Management',
      'Phase 3: WebGL, Canvas Math & Micro-interactions'
    ],
    techs: [{ name: 'React' }, { name: 'TypeScript' }, { name: 'Tailwind CSS' }, { name: 'Vite' }],
    branches: [
      { name: 'React DOM', x: 360, y: 585 },
      { name: 'Tailwind UI', x: 440, y: 540 },
      { name: 'TS Safety', x: 275, y: 565 },
      { name: 'Vite Bundler', x: 410, y: 510 }
    ]
  },
  {
    id: 'ops',
    name: 'DevOps & Hyperscale Cloud',
    codeName: 'OPS',
    capsuleName: 'CLOUD',
    color: 'text-purple-500',
    hexColor: '#a855f7',
    glowColor: '168, 85, 247',
    hexX: 570, hexY: 403,
    stationX: 640, stationY: 494,
    description: 'Deploy, automate, and orchestrate containers across globally replicated networks, hybrid environments, and serverless clusters.',
    syllabus: [
      'Phase 1: Linux Kernels, Bash & Docker Isolation',
      'Phase 2: Kubernetes Nodes, Pod Routing & Ingress',
      'Phase 3: Cloud Telemetry, IAM & IaC Pipelines'
    ],
    techs: [{ name: 'Docker' }, { name: 'Kubernetes' }, { name: 'AWS' }, { name: 'Azure' }],
    branches: [
      { name: 'K8s Clusters', x: 640, y: 585 },
      { name: 'Docker Engine', x: 570, y: 570 },
      { name: 'AWS Clouds', x: 710, y: 550 },
      { name: 'IaC Pipelines', x: 590, y: 510 }
    ]
  },
  {
    id: 'db',
    name: 'Systems Programming & Databases',
    codeName: 'DB',
    capsuleName: 'SYSTEMS',
    color: 'text-emerald-500',
    hexColor: '#10b981',
    glowColor: '16, 185, 129',
    hexX: 275, hexY: 435,
    stationX: 120, stationY: 468,
    description: 'Architect performant relational schemas, elastic document catalogs, and high-frequency systems compilers using systems programming.',
    syllabus: [
      'Phase 1: Memory Compilation, C & C++ Basics',
      'Phase 2: Relational Transactions & B-Tree Indexing',
      'Phase 3: Cache In-Memory Speed & Distributed Logs'
    ],
    techs: [{ name: 'C' }, { name: 'C++' }, { name: 'PostgreSQL' }, { name: 'MongoDB' }],
    branches: [
      { name: 'Postgres SQL', x: 60, y: 410 },
      { name: 'MongoDB JSON', x: 50, y: 465 },
      { name: 'Redis Cache', x: 60, y: 520 },
      { name: 'Systems C/C++', x: 110, y: 570 },
      { name: 'Kafka Streams', x: 180, y: 530 }
    ]
  }
];

const SIDE_LOGOS = [
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', trackId: 'ai' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', trackId: 'fe' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', trackId: 'db' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', trackId: 'fe' }
];


interface TrackSVGProps {
  track: PathwayTrack;
  index: number;
  progress: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  isActive: boolean;
  onHover: (t: PathwayTrack | null) => void;
  onSelect: (t: PathwayTrack | null) => void;
  selectedTrack: PathwayTrack | null;
  viewBoxDims: { w: number; h: number };
  centerCoords: { x: number; y: number };
  isMobile: boolean;
  responsiveTracks: PathwayTrack[];
}

function TrackSVG({
  track, progress, scrollYProgress, isActive,
  onHover, onSelect, selectedTrack,
  centerCoords, isMobile, responsiveTracks
}: TrackSVGProps) {
  const feTrack = responsiveTracks.find(t => t.id === 'fe');
  const xStart = track.id === 'db' ? feTrack?.hexX ?? centerCoords.x : centerCoords.x;
  const yStart = track.id === 'db' ? feTrack?.hexY ?? centerCoords.y : centerCoords.y;
  const beamDash = useTransform(progress, [0.25, 0.55], [350, 0]);
  const beamOpacity = useTransform(progress, [0.25, 0.40], [0, 0.6]);
  const pulseOffset = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const stationX = useTransform(progress, [0.28, 0.58], [xStart - track.stationX, 0]);
  const stationY = useTransform(progress, [0.28, 0.58], [yStart - track.stationY, 0]);
  const stationScale = useTransform(progress, [0.28, 0.52], [0, 1]);
  const stationOpacity = useTransform(progress, [0.28, 0.52], [0, 1]);
  const branchDash = useTransform(progress, [0.60, 0.85], [150, 0]);
  const branchLineOpacity = isActive ? 0.8 : (isMobile ? 0.25 : 0.45);
  const branchDotOpacity = useTransform(progress, [0.70, 0.95], [0, isActive ? 1 : (isMobile ? 0.45 : 0.65)]);

  const pointerEvents = useTransform(progress, p => p > 0.65 ? 'auto' : 'none');

  return (
    <motion.g style={{ pointerEvents }}>
      <motion.line
        x1={xStart} y1={yStart} x2={track.stationX} y2={track.stationY}
        stroke={`url(#beam-grad-${track.id})`}
        strokeWidth={isActive ? 4 : 2}
        opacity={isActive ? 0.9 : beamOpacity}
        filter={isActive ? 'url(#laser-glow)' : undefined}
        strokeDasharray="350 350"
        style={{ strokeDashoffset: beamDash }}
      />
      <motion.line
        x1={xStart} y1={yStart} x2={track.stationX} y2={track.stationY}
        stroke="#ffffff"
        strokeWidth={0.8}
        opacity={isActive ? 0.95 : 0.25}
        strokeDasharray="15 15"
        style={{ strokeDashoffset: pulseOffset }}
      />
      <g transform={`translate(${track.stationX}, ${track.stationY})`}>
        <motion.g style={{ x: stationX, y: stationY, opacity: stationOpacity, scale: stationScale }}>
          <circle r="36" fill="transparent" className="cursor-pointer pointer-events-auto"
            onMouseEnter={() => onHover(track)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(selectedTrack?.id === track.id ? null : track)}
          />
          <circle r="26" fill="none" stroke={track.hexColor} strokeWidth="0.5"
            opacity={isActive ? 0.6 : 0.15} strokeDasharray="4 4" />
          <circle r="22" fill="none" stroke={track.hexColor} strokeWidth="1"
            opacity={isActive ? 0.8 : 0.3} />
          <circle r="28" fill="none" stroke={track.hexColor} strokeWidth="1.5"
            opacity={isActive ? 0.8 : 0}
            filter="url(#laser-glow)"
            className="animate-pulse"
          />

          {track.id === 'ai' && (
            <g>
              <path d="M -14 6 C -14 -12 14 -12 14 6 Z" fill="rgba(236,72,153,0.12)" stroke="#ec4899" strokeWidth="1.5" />
              <rect x="-18" y="6" width="36" height="4" rx="1" fill="#ec4899" />
              <circle cx="0" cy="-2" r="6" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="0" y1="-12" x2="0" y2="-20" stroke="#ec4899" strokeWidth="1" />
              <circle cx="0" cy="-20" r="3" fill="#ffffff" filter="url(#laser-glow)" />
            </g>
          )}
          {track.id === 'be' && (
            <g>
              <rect x="-11" y="-15" width="22" height="26" rx="2" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="-15" y1="-7" x2="15" y2="-7" stroke="#3b82f6" strokeWidth="1" />
              <line x1="-15" y1="3" x2="15" y2="3" stroke="#3b82f6" strokeWidth="1" />
              <circle cx="0" cy="-2" r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1" />
              <circle cx="0" cy="-2" r="2" fill="#3b82f6" />
            </g>
          )}
          {track.id === 'fe' && (
            <g>
              <polygon points="0,18 -16,-14 16,-14" fill="rgba(34,211,238,0.12)" stroke="#22d3ee" strokeWidth="1.5" />
              <circle cx="0" cy="-2" r="4" fill="#ffffff" stroke="#22d3ee" strokeWidth="1" />
              <line x1="-8" y1="-14" x2="-8" y2="-20" stroke="#22d3ee" strokeWidth="1" />
              <line x1="8" y1="-14" x2="8" y2="-20" stroke="#22d3ee" strokeWidth="1" />
            </g>
          )}
          {track.id === 'ops' && (
            <g>
              <circle cx="0" cy="-2" r="13" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="1.5" />
              <path d="M -5 -11 C -2 -11 -2 7 -5 7 M 5 -11 C 2 -11 2 7 5 7 M 0 -13 L 0 9" fill="none" stroke="#a855f7" strokeWidth="0.8" />
              <rect x="-16" y="9" width="32" height="3" fill="#a855f7" />
              <circle cx="0" cy="-2" r="3" fill="#ffffff" filter="url(#laser-glow)" />
            </g>
          )}
          {track.id === 'db' && (
            <g>
              <rect x="-9" y="-16" width="18" height="24" rx="1" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1.5" />
              <rect x="-13" y="-11" width="4" height="14" fill="#10b981" opacity="0.8" />
              <rect x="9" y="-11" width="4" height="14" fill="#10b981" opacity="0.8" />
              <circle cx="0" cy="-4" r="3" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
              <rect x="-6" y="8" width="12" height="4" fill="#10b981" />
            </g>
          )}
        </motion.g>
      </g>
      {track.branches.map((b, bIdx) => (
        <g key={bIdx}>
          <motion.path
            d={`M ${track.stationX} ${track.stationY} L ${(track.stationX + b.x) / 2} ${(track.stationY + b.y) / 2} L ${b.x} ${b.y}`}
            fill="none"
            stroke={track.hexColor}
            strokeWidth={isActive ? 1.5 : 0.8}
            opacity={branchLineOpacity}
            strokeDasharray="150 150"
            style={{ strokeDashoffset: branchDash }}
          />
          <motion.circle
            cx={b.x} cy={b.y}
            r={isActive ? 4 : 2}
            fill={isActive ? "#ffffff" : track.hexColor}
            stroke={track.hexColor}
            strokeWidth={isActive ? 1.5 : 0}
            filter={isActive ? "url(#laser-glow)" : undefined}
            style={{ opacity: branchDotOpacity }}
          />
        </g>
      ))}
    </motion.g>
  );
}



interface TrackOverlayProps {
  track: PathwayTrack;
  progress: MotionValue<number>;
  isActive: boolean;
  onHover: (t: PathwayTrack | null) => void;
  onSelect: (t: PathwayTrack | null) => void;
  selectedTrack: PathwayTrack | null;
  viewBoxDims: { w: number; h: number };
  centerCoords: { x: number; y: number };
  isMobile: boolean;
  responsiveTracks: PathwayTrack[];
}

function TrackOverlay({
  track, progress, isActive, onHover, onSelect, selectedTrack,
  viewBoxDims, centerCoords, isMobile, responsiveTracks
}: TrackOverlayProps) {
  const feTrack = responsiveTracks.find(t => t.id === 'fe');
  const xStart = track.id === 'db' ? feTrack?.hexX ?? centerCoords.x : centerCoords.x;
  const yStart = track.id === 'db' ? feTrack?.hexY ?? centerCoords.y : centerCoords.y;

  const currentHexX = useTransform(progress, [0.26, 0.56], [xStart, track.hexX]);
  const currentHexY = useTransform(progress, [0.26, 0.56], [yStart, track.hexY]);
  const hexScale = useTransform(progress, [0.26, 0.50], [0, 1]);
  const hexOpacity = useTransform(progress, [0.26, 0.50], [0, 1]);

  const branchLabelOpacity = useTransform(progress, [0.70, 0.95], [0, isActive ? 1 : (isMobile ? 0.55 : 0.75)]);


  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-30"
    >
      <motion.div
        className="absolute cursor-pointer flex flex-col items-center gap-1.5"
        style={{
          left: useTransform(currentHexX, v => `${(v / viewBoxDims.w) * 100}%`),
          top: useTransform(currentHexY, v => `${(v / viewBoxDims.h) * 100}%`),
          scale: hexScale,
          opacity: hexOpacity,
          translate: '-50% -50%',
          pointerEvents: useTransform(progress, p => p > 0.65 ? 'auto' : 'none')
        }}
        onMouseEnter={() => onHover(track)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect(selectedTrack?.id === track.id ? null : track)}
      >
        <div className="relative w-12 h-14 sm:w-14 sm:h-16 md:w-16 md:h-18 flex items-center justify-center group">
          <svg className="absolute inset-0 w-full h-full transition-all duration-300 drop-shadow-md" viewBox="0 0 100 115">
            <polygon
              points="50,5 95,30 95,85 50,110 5,85 5,30"
              fill="rgba(3, 5, 13, 0.95)"
              stroke={isActive ? track.hexColor : 'rgba(255,255,255,0.2)'}
              strokeWidth="5"
              style={{ filter: isActive ? `drop-shadow(0 0 10px ${track.hexColor})` : undefined }}
            />
          </svg>
          <span className={`relative z-10 font-black font-mono text-[11px] sm:text-[13px] tracking-wider transition-colors duration-300
            ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
            {track.codeName}
          </span>
        </div>
        <div className="px-2 py-0.5 rounded border bg-space-darkest/95 backdrop-blur-sm shadow-md transition-all duration-300 sm:px-2.5"
          style={{
            borderColor: isActive ? `${track.hexColor}60` : 'rgba(255,255,255,0.06)',
            boxShadow: isActive ? `0 0 12px rgba(${track.glowColor}, 0.2)` : undefined
          }}>
          <span className="text-[7px] sm:text-[8px] font-black font-mono tracking-widest text-gray-300 uppercase block whitespace-nowrap">
            {track.capsuleName}
          </span>
        </div>
      </motion.div>

      {track.branches.map((b, bIdx) => {
        const alignLeft = b.x < track.stationX;
        return (
          <motion.div
            key={bIdx}
            className="absolute pointer-events-none font-mono text-[7.5px] sm:text-[8.5px] font-bold"
            style={{
              left: `${(b.x / viewBoxDims.w) * 100}%`,
              top: `${(b.y / viewBoxDims.h) * 100}%`,
              opacity: branchLabelOpacity,
              translate: `${alignLeft ? '-100%' : '0%'} -50%`,
              x: alignLeft ? -5 : 5
            }}
          >
            {b.name}
          </motion.div>
        );
      })}
    </div>
  );
}

interface MobileExplodedMatrixProps {
  scrollYProgress: MotionValue<number>;
  tracks: PathwayTrack[];
  activeTrack: PathwayTrack | null;
  setActiveTrack: (t: PathwayTrack | null) => void;
}

interface BranchLineProps {
  branchProgress: MotionValue<number>;
  cx: number;
  cy: number;
  bx: number;
  by: number;
  color: string;
}

function BranchLine({ branchProgress, cx, cy, bx, by, color }: BranchLineProps) {
  const lineX2 = useTransform(branchProgress, [0, 1], [cx, bx]);
  const lineY2 = useTransform(branchProgress, [0, 1], [cy, by]);

  return (
    <motion.line
      x1={cx} y1={cy} x2={lineX2} y2={lineY2}
      stroke={color}
      strokeWidth={1.2}
      opacity={0.7}
      strokeDasharray="3 3"
    />
  );
}

interface BranchBubbleProps {
  branchProgress: MotionValue<number>;
  cx: number;
  cy: number;
  bx: number;
  by: number;
  color: string;
  name: string;
}

function BranchBubble({ branchProgress, cx, cy, bx, by, color, name }: BranchBubbleProps) {
  const bubbleX = useTransform(branchProgress, [0, 1], [cx, bx]);
  const bubbleY = useTransform(branchProgress, [0, 1], [cy, by]);
  const bubbleOpacity = useTransform(branchProgress, [0.15, 0.75], [0, 1]);

  return (
    <motion.div
      className="absolute font-mono text-[7px] font-bold px-2 py-0.5 rounded-full border bg-[#030614]/95 text-gray-200 whitespace-nowrap z-30 shadow-lg pointer-events-none transform-gpu max-w-[100px] truncate"
      style={{
        borderColor: `${color}60`,
        boxShadow: `0 0 10px ${color}30`,
        left: bubbleX,
        top: bubbleY,
        translate: '-50% -50%',
        opacity: bubbleOpacity
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block mr-1 animate-pulse shrink-0" style={{ backgroundColor: color }} />
      {name}
    </motion.div>
  );
}

interface TrackSlideProps {
  progress: MotionValue<number>;
  track: PathwayTrack;
  index: number;
}

function TrackSlide({ progress, track, index }: TrackSlideProps) {
  const CARD_START = 0.15;
  const CARD_SPAN = 0.17;
  const p0 = CARD_START + index * CARD_SPAN;
  const p1 = p0 + 0.05;
  const p2 = p0 + 0.12;
  const p3 = p0 + CARD_SPAN;

  const y = useTransform(progress, [p0, p1, p2, p3], [220, 0, 0, -220]);
  const opacity = useTransform(progress, [p0, p1, p2, p3], [0, 1, 1, 0]);
  const scale = useTransform(progress, [p0, p1, p2, p3], [0.85, 1, 1, 0.85]);
  const rotateX = useTransform(progress, [p0, p1, p2, p3], [12, 0, 0, -12]);
  const branchProgress = useTransform(progress, [p1, p2 - 0.02, p2, p3], [0, 1, 1, 1]);

  const detailsOpacity = useTransform(progress, [p0, p1, p1 + 0.04, p2, p3], [0, 0, 1, 1, 1]);

  const pointerEvents = useTransform(progress, p => (p >= p0 && p < p3) ? 'auto' : 'none');

  const cx = 170;
  const cy = 220;

  return (
    <motion.div
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible transform-gpu"
      style={{ opacity, pointerEvents }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        {track.branches.map((_, j) => {
          const isLeft = j % 2 === 0;
          const bx = isLeft ? 38 : 302;
          const by = 50 + (j / Math.max(track.branches.length - 1, 1)) * 320;

          return (
            <BranchLine
              key={j}
              branchProgress={branchProgress}
              cx={cx}
              cy={cy}
              bx={bx}
              by={by}
              color={track.hexColor}
            />
          );
        })}
      </svg>

      {track.branches.map((b, j) => {
        const isLeft = j % 2 === 0;
        const bx = isLeft ? 38 : 302;
        const by = 50 + (j / Math.max(track.branches.length - 1, 1)) * 320;

        return (
          <BranchBubble
            key={j}
            branchProgress={branchProgress}
            cx={cx}
            cy={cy}
            bx={bx}
            by={by}
            color={track.hexColor}
            name={b.name}
          />
        );
      })}

      <motion.div
        className="absolute w-[240px] h-[355px] rounded-3xl border bg-[#05091a]/95 backdrop-blur-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden z-20 pointer-events-auto transform-gpu"
        style={{
          borderColor: `${track.hexColor}50`,
          boxShadow: `0 16px 40px rgba(0, 0, 0, 0.7), 0 0 30px ${track.hexColor}20`,
          left: '50px',
          top: '42px',
          y,
          scale,
          rotateX,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity'
        }}
      >
        {/* Card Header Ambient Laser Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${track.hexColor} 50%, transparent 100%)` }}
        />

        <div className="flex flex-col gap-2.5 text-left font-sans h-full justify-start relative z-10">

          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 shadow-md"
              style={{
                borderColor: `${track.hexColor}50`,
                background: `${track.hexColor}15`
              }}
            >
              {track.id === 'ai' && <Cpu className="w-5 h-5 text-pink-400" />}
              {track.id === 'be' && <Network className="w-5 h-5 text-blue-400" />}
              {track.id === 'fe' && <Zap className="w-5 h-5 text-cyan-400" />}
              {track.id === 'ops' && <Shield className="w-5 h-5 text-purple-400" />}
              {track.id === 'db' && <Terminal className="w-5 h-5 text-emerald-400" />}
            </div>
            <div>
              <span
                className="text-[7.5px] font-mono tracking-widest font-black px-2 py-0.5 rounded-full block w-fit border"
                style={{ color: track.hexColor, backgroundColor: `${track.hexColor}15`, borderColor: `${track.hexColor}30` }}
              >
                {track.capsuleName} PATHWAY
              </span>
              <h4 className="text-xs font-black text-white leading-tight mt-0.5">{track.name}</h4>
            </div>
          </div>

          <motion.div style={{ opacity: detailsOpacity }} className="flex flex-col gap-2 overflow-hidden">
            <p className="text-[9px] text-gray-300 leading-relaxed font-sans mt-0.5">
              {track.description}
            </p>

            <div className="mt-0.5">
              <span className="text-[7px] uppercase font-mono text-gray-400 tracking-wider block mb-1 font-bold">
                ACADEMY SYLLABUS
              </span>
              <div className="flex flex-col gap-1">
                {track.syllabus.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[8.5px] text-gray-200">
                    <ChevronRight className="w-3 h-3 shrink-0 mt-0.5" style={{ color: track.hexColor }} />
                    <span className="font-medium leading-relaxed font-sans">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: detailsOpacity }}
          className="pt-2 border-t border-white/10 flex flex-wrap gap-1 items-center shrink-0 relative z-10"
        >
          <span className="text-[6.5px] uppercase font-mono text-gray-400 tracking-wider mr-1 font-bold">CORE STACKS:</span>
          {track.techs.map((tech) => (
            <span
              key={tech.name}
              className="text-[7px] font-extrabold font-mono px-1.5 py-0.5 rounded-md border text-gray-200"
              style={{ borderColor: `${track.hexColor}30`, backgroundColor: `${track.hexColor}10` }}
            >
              {tech.name}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MobileExplodedMatrix({ scrollYProgress, tracks, activeTrack, setActiveTrack }: MobileExplodedMatrixProps) {

  const progress = useTransform(scrollYProgress, [0.15, 0.88], [0, 1]);

  const smoothProgress = useSpring(progress, {
    damping: 32,
    stiffness: 95,
    restDelta: 0.0001
  });

  const mockupOpacity = useTransform(smoothProgress, [0.0, 0.08], [0, 1]);
  const mockupScale = useTransform(smoothProgress, [0.0, 0.08], [0.88, 1]);

  const coreOpacity = useTransform(smoothProgress, [0.06, 0.12], [0, 0.85]);
  const coreScale = useTransform(smoothProgress, [0.06, 0.12], [0.5, 1]);

  const orderedTracks = useMemo(() => {
    const order = ['ai', 'fe', 'be', 'ops', 'db'];
    return order.map(id => tracks.find(t => t.id === id)).filter(Boolean) as PathwayTrack[];
  }, [tracks]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest < 0.05 || latest > 0.95) {
        if (activeTrack !== null) {
          setActiveTrack(null);
        }
        return;
      }
      const index = Math.min(Math.floor(latest / 0.20), 4);
      const orderedIds = ['ai', 'fe', 'be', 'ops', 'db'];
      const activeId = orderedIds[index];
      const matched = tracks.find(t => t.id === activeId);
      if (matched && activeTrack?.id !== activeId) {
        setActiveTrack(matched);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, tracks, activeTrack, setActiveTrack]);

  return (
    <div className="w-[340px] flex flex-col gap-5 items-center select-none py-6 overflow-visible relative min-h-[500px] transform-gpu">

      {/* Mobile Track Navigator Header Pills */}
      <div className="flex items-center gap-1.5 z-30 px-2 py-1 rounded-full bg-[#030614]/80 border border-white/10 backdrop-blur-md shadow-lg">
        {orderedTracks.map((t) => {
          const isActive = activeTrack?.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTrack(t)}
              className={`px-2.5 py-1 rounded-full text-[8.5px] font-mono font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                isActive
                  ? 'text-white border shadow-md scale-105'
                  : 'text-gray-400 hover:text-gray-200 border border-transparent'
              }`}
              style={{
                backgroundColor: isActive ? `${t.hexColor}25` : 'transparent',
                borderColor: isActive ? `${t.hexColor}60` : 'transparent',
                boxShadow: isActive ? `0 0 12px ${t.hexColor}30` : 'none'
              }}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: t.hexColor }} />}
              {t.codeName}
            </button>
          );
        })}
      </div>

      {/* Cyberpunk 3D Holographic Deck Frame */}
      <motion.div
        className="absolute w-[268px] h-[450px] rounded-[36px] bg-gradient-to-b from-[#060a1a]/95 via-[#030614]/95 to-black border-2 border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),_inset_0_0_35px_rgba(6,182,212,0.1)] z-0 flex flex-col overflow-hidden transform-gpu"
        style={{
          opacity: mockupOpacity,
          scale: mockupScale,
          top: '55px'
        }}
      >
        {/* Dynamic Holographic Scanner Sweep */}
        <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-cyan-400/10 via-cyan-400/20 to-transparent pointer-events-none animate-[sweep_3.5s_ease-in-out_infinite]" />

        {/* 4 HUD Corner Brackets */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-purple-500/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-purple-500/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />

        <div className="w-24 h-4 rounded-full bg-black mx-auto mt-2.5 border border-white/10 flex items-center justify-center shrink-0 z-10">
          <div className="w-8 h-1 rounded-full bg-cyan-400/40" />
        </div>

        <div className="flex-1 w-full relative overflow-visible">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:100%_12px] opacity-30 pointer-events-none" />

          {/* Central Rotating ARC Reactor Core Ring */}
          <motion.div
            className="absolute inset-0 m-auto w-28 h-28 rounded-full flex items-center justify-center pointer-events-none"
            style={{
              opacity: coreOpacity,
              scale: coreScale,
              background: 'radial-gradient(circle, rgba(6,182,212,0.22) 0%, rgba(168,85,247,0.06) 50%, transparent 100%)'
            }}
          >
            <div className="w-16 h-16 rounded-full border border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: '7s' }}>
              <div className="w-11 h-11 rounded-full border border-purple-500/35 animate-[spin_3.5s_linear_infinite_reverse] m-2" />
            </div>
            <div className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_15px_#06b6d4] animate-pulse" />
          </motion.div>
        </div>
      </motion.div>

      <div className="relative w-full h-[450px] flex items-center justify-center overflow-visible mt-2" style={{ perspective: 1000 }}>
        {orderedTracks.map((track, index) => (
          <TrackSlide
            key={track.id}
            progress={smoothProgress}
            track={track}
            index={index}
          />
        ))}
      </div>

    </div>
  );
}


type Breakpoint = 'smallPhone' | 'standardPhone' | 'tablet' | 'desktop';

export default function CyberneticGalaxy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTrack, setSelectedTrack] = useState<PathwayTrack | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<PathwayTrack | null>(null);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 481) {
        setBreakpoint('smallPhone');
      } else if (w < 769) {
        setBreakpoint('standardPhone');
      } else if (w < 1025) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const viewBoxDims = useMemo(() => {
    const dims = {
      smallPhone: { w: 600, h: 750 },
      standardPhone: { w: 600, h: 750 },
      tablet: { w: 800, h: 700 },
      desktop: { w: 1000, h: 650 }
    };
    return dims[breakpoint];
  }, [breakpoint]);

  const centerCoords = useMemo(() => {
    const coords = {
      smallPhone: { x: 300, y: 360 },
      standardPhone: { x: 300, y: 360 },
      tablet: { x: 400, y: 375 },
      desktop: { x: 500, y: 312 }
    };
    return coords[breakpoint];
  }, [breakpoint]);

  const bezelRadii = useMemo(() => {
    const radii = {
      smallPhone: { r1: 100, r2: 150 },
      standardPhone: { r1: 120, r2: 180 },
      tablet: { r1: 140, r2: 210 },
      desktop: { r1: 160, r2: 230 }
    };
    return radii[breakpoint];
  }, [breakpoint]);

  const aspectClass = useMemo(() => {
    const classes = {
      smallPhone: 'aspect-[600/750] max-h-[42vh] md:max-h-none',
      standardPhone: 'aspect-[600/750] max-h-[42vh] md:max-h-none',
      tablet: 'aspect-[800/700] max-h-[45vh] lg:max-h-none',
      desktop: 'aspect-[1000/650]'
    };
    return classes[breakpoint];
  }, [breakpoint]);

  const responsiveTracks = useMemo(() => {
    return GALAXY_TRACKS.map(track => {
      const overrides = {
        smallPhone: {
          ai: {
            hexX: 180, hexY: 180, stationX: 120, stationY: 100,
            branches: [
              { name: 'Neural Nets', x: 50, y: 50 },
              { name: 'LLM Pipelines', x: 30, y: 100 },
              { name: 'Computer Vision', x: 30, y: 150 },
              { name: 'Agent Systems', x: 90, y: 190 },
              { name: 'Python Core', x: 220, y: 60 }
            ]
          },
          be: {
            hexX: 420, hexY: 180, stationX: 480, stationY: 100,
            branches: [
              { name: 'JVM Scale', x: 550, y: 50 },
              { name: 'Node Async', x: 570, y: 100 },
              { name: 'Enterprise C#', x: 570, y: 150 },
              { name: 'gRPC APIs', x: 510, y: 190 },
              { name: 'Spring Boot', x: 380, y: 60 }
            ]
          },
          fe: {
            hexX: 200, hexY: 530, stationX: 140, stationY: 620,
            branches: [
              { name: 'React DOM', x: 60, y: 680 },
              { name: 'Tailwind UI', x: 140, y: 700 },
              { name: 'TS Safety', x: 50, y: 630 },
              { name: 'Vite Bundler', x: 160, y: 615 }
            ]
          },
          ops: {
            hexX: 400, hexY: 530, stationX: 460, stationY: 620,
            branches: [
              { name: 'K8s Clusters', x: 540, y: 680 },
              { name: 'Docker Engine', x: 460, y: 700 },
              { name: 'AWS Clouds', x: 550, y: 630 },
              { name: 'IaC Pipelines', x: 440, y: 615 }
            ]
          },
          db: {
            hexX: 130, hexY: 360, stationX: 50, stationY: 360,
            branches: [
              { name: 'Postgres SQL', x: 30, y: 280 },
              { name: 'MongoDB JSON', x: 20, y: 340 },
              { name: 'Redis Cache', x: 20, y: 400 },
              { name: 'Systems C/C++', x: 40, y: 460 },
              { name: 'Kafka Streams', x: 100, y: 460 }
            ]
          }
        },
        standardPhone: {
          ai: {
            hexX: 180, hexY: 180, stationX: 120, stationY: 100,
            branches: [
              { name: 'Neural Nets', x: 50, y: 50 },
              { name: 'LLM Pipelines', x: 30, y: 100 },
              { name: 'Computer Vision', x: 30, y: 150 },
              { name: 'Agent Systems', x: 90, y: 190 },
              { name: 'Python Core', x: 220, y: 60 }
            ]
          },
          be: {
            hexX: 420, hexY: 180, stationX: 480, stationY: 100,
            branches: [
              { name: 'JVM Scale', x: 550, y: 50 },
              { name: 'Node Async', x: 570, y: 100 },
              { name: 'Enterprise C#', x: 570, y: 150 },
              { name: 'gRPC APIs', x: 510, y: 190 },
              { name: 'Spring Boot', x: 380, y: 60 }
            ]
          },
          fe: {
            hexX: 200, hexY: 530, stationX: 140, stationY: 620,
            branches: [
              { name: 'React DOM', x: 60, y: 680 },
              { name: 'Tailwind UI', x: 140, y: 700 },
              { name: 'TS Safety', x: 50, y: 630 },
              { name: 'Vite Bundler', x: 160, y: 615 }
            ]
          },
          ops: {
            hexX: 400, hexY: 530, stationX: 460, stationY: 620,
            branches: [
              { name: 'K8s Clusters', x: 540, y: 680 },
              { name: 'Docker Engine', x: 460, y: 700 },
              { name: 'AWS Clouds', x: 550, y: 630 },
              { name: 'IaC Pipelines', x: 440, y: 615 }
            ]
          },
          db: {
            hexX: 130, hexY: 360, stationX: 50, stationY: 360,
            branches: [
              { name: 'Postgres SQL', x: 30, y: 280 },
              { name: 'MongoDB JSON', x: 20, y: 340 },
              { name: 'Redis Cache', x: 20, y: 400 },
              { name: 'Systems C/C++', x: 40, y: 460 },
              { name: 'Kafka Streams', x: 100, y: 460 }
            ]
          }
        },
        tablet: {
          ai: {
            hexX: 270, hexY: 240, stationX: 180, stationY: 135,
            branches: [
              { name: 'Neural Nets', x: 90, y: 75 },
              { name: 'LLM Pipelines', x: 60, y: 125 },
              { name: 'Computer Vision', x: 50, y: 180 },
              { name: 'Agent Systems', x: 120, y: 220 },
              { name: 'Python Core', x: 270, y: 70 }
            ]
          },
          be: {
            hexX: 530, hexY: 240, stationX: 620, stationY: 135,
            branches: [
              { name: 'JVM Scale', x: 710, y: 75 },
              { name: 'Node Async', x: 740, y: 125 },
              { name: 'Enterprise C#', x: 750, y: 180 },
              { name: 'gRPC APIs', x: 680, y: 220 },
              { name: 'Spring Boot', x: 620, y: 70 }
            ]
          },
          fe: {
            hexX: 280, hexY: 510, stationX: 200, stationY: 610,
            branches: [
              { name: 'React DOM', x: 100, y: 690 },
              { name: 'Tailwind UI', x: 180, y: 670 },
              { name: 'TS Safety', x: 90, y: 630 },
              { name: 'Vite Bundler', x: 220, y: 625 }
            ]
          },
          ops: {
            hexX: 520, hexY: 510, stationX: 600, stationY: 610,
            branches: [
              { name: 'K8s Clusters', x: 700, y: 690 },
              { name: 'Docker Engine', x: 620, y: 670 },
              { name: 'AWS Clouds', x: 710, y: 630 },
              { name: 'IaC Pipelines', x: 580, y: 625 }
            ]
          },
          db: {
            hexX: 180, hexY: 375, stationX: 70, stationY: 375,
            branches: [
              { name: 'Postgres SQL', x: 40, y: 280 },
              { name: 'MongoDB JSON', x: 30, y: 340 },
              { name: 'Redis Cache', x: 30, y: 410 },
              { name: 'Systems C/C++', x: 50, y: 470 },
              { name: 'Kafka Streams', x: 120, y: 460 }
            ]
          }
        },
        desktop: null
      };

      const bpOverrides = overrides[breakpoint] as Record<string, any> | null;
      if (bpOverrides && bpOverrides[track.id]) {
        const trOver = bpOverrides[track.id];
        return {
          ...track,
          hexX: trOver.hexX,
          hexY: trOver.hexY,
          stationX: trOver.stationX,
          stationY: trOver.stationY,
          branches: track.branches.map((br, bIdx) => ({
            ...br,
            x: trOver.branches[bIdx]?.x ?? br.x,
            y: trOver.branches[bIdx]?.y ?? br.y
          }))
        };
      }
      return track;
    });
  }, [breakpoint]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const progress = useTransform(scrollYProgress, [0.10, 0.90], [0, 1]);

  const coreScale = useTransform(progress, [0.0, 0.25], [0, 1]);
  const coreOpacity = useTransform(progress, [0.0, 0.25], [0, 1]);

  const activeTrack = hoveredTrack || selectedTrack;

  const backgroundStars = useMemo(() =>
    Array.from({ length: 50 }).map((_, i) => {
      const xSeed = Math.sin(i + 1) * 10000;
      const ySeed = Math.cos(i + 1) * 10000;
      const cx = Math.round(Math.abs(xSeed - Math.floor(xSeed)) * 100000) / 100;
      const cy = Math.round(Math.abs(ySeed - Math.floor(ySeed)) * 65000) / 100;
      const r = Math.round(((Math.abs(Math.sin(i * 99)) * 1.0) + 0.4) * 100) / 100;
      const opacity = Math.round(((Math.abs(Math.cos(i * 123)) * 0.6) + 0.1) * 100) / 100;
      return { id: i, cx, cy, r, opacity };
    })
    , []);

  return (
    <section
      ref={containerRef}
      id="career-pathway"
      className="relative h-[800vh] md:h-[600vh] lg:h-[550vh] w-full bg-transparent text-white"
    >

      <div className="sticky top-0 h-screen w-full overflow-hidden z-20">

        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[15%] w-[450px] h-[450px] rounded-full bg-cyber-cyan/[0.03] blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-[20%] right-[15%] w-[550px] h-[550px] rounded-full bg-cyber-purple/[0.03] blur-[150px] animate-[pulse_8s_ease-in-out_infinite]" />

          <AnimatePresence>
            {activeTrack && (
              <motion.div
                key={activeTrack.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.18 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full pointer-events-none will-change-[opacity]"
                style={{
                  background: `radial-gradient(circle at 60% 50%, rgba(${activeTrack.glowColor}, 0.35) 0%, rgba(${activeTrack.glowColor}, 0.1) 35%, transparent 70%)`
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {breakpoint !== 'desktop' ? (
          <div className="relative w-full h-full flex flex-col items-center justify-start px-4 pt-24 pb-12 gap-4 overflow-hidden overflow-x-hidden z-10 select-none">
            <div className="flex flex-col gap-1.5 font-mono text-center items-center">
              <div className="flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 shadow-[0_0_12px_rgba(6,182,212,0.1)] ring-1 ring-cyber-cyan/5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-cyber-cyan font-mono">
                  SYSTEM: ACTIVE // EXPLODED_MATRIX
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white mt-1.5 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                TechStack Matrix
              </h2>
              <p className="text-[9.5px] text-gray-400 max-w-[280px] leading-relaxed font-sans mt-0.5">
                Scroll to assemble the neural matrix mockup deck. Hover or click card elements to explore technology stacks.
              </p>
            </div>

            <div className="w-full flex-1 flex items-center justify-center min-h-[460px] overflow-visible relative">
              <MobileExplodedMatrix
                scrollYProgress={scrollYProgress}
                tracks={responsiveTracks}
                activeTrack={activeTrack}
                setActiveTrack={setSelectedTrack}
              />
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col-reverse lg:flex-row items-center justify-center px-4 lg:px-12 pt-24 pb-8 lg:pt-24 lg:pb-10 gap-4 lg:gap-8 max-w-7xl mx-auto select-none z-10">
            <div className="w-full lg:w-[380px] shrink-0 z-30 flex flex-col gap-3 lg:gap-5 justify-center lg:h-full pointer-events-none">
              <div className="pointer-events-auto flex flex-col gap-3 lg:gap-5 w-full">

                <div className="flex flex-col gap-1.5 font-mono">
                  <div className="flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 shadow-[0_0_12px_rgba(6,182,212,0.1)] ring-1 ring-cyber-cyan/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-cyber-cyan font-mono">
                      SYSTEM: ACTIVE // MAP_GRID
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-white mt-1 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                    TechStack Matrix
                  </h2>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-sans">
                    Explore the core technology stacks driving Tesseract Infosystems engineering. Scroll to assemble the neural matrix system, then hover or click stations to load modules.
                  </p>
                </div>

                <div className="relative h-[38vh] lg:h-auto min-h-[220px] lg:min-h-[320px] w-full">
                  <AnimatePresence mode="wait">
                    {activeTrack ? (
                      <motion.div
                        key={activeTrack.id}
                        initial={{ opacity: 0, x: -15, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: 15, filter: 'blur(8px)' }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="glass-card p-4 lg:p-6 rounded-xl border relative shadow-2xl flex flex-col justify-between h-full overflow-y-auto"
                        style={{
                          borderColor: `${activeTrack.hexColor}40`,
                          boxShadow: `0 0 25px rgba(${activeTrack.glowColor}, 0.08)`,
                          background: 'linear-gradient(135deg, rgba(7,11,25,0.85) 0%, rgba(3,5,13,0.92) 100%)'
                        }}
                      >
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                          style={{
                            backgroundImage: `radial-gradient(circle at 100% 0%, ${activeTrack.hexColor} 0%, transparent 60%),
                                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                            backgroundSize: '100% 100%, 100% 8px'
                          }}
                        />

                        <div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 shadow-lg"
                              style={{
                                borderColor: `${activeTrack.hexColor}50`,
                                background: `${activeTrack.hexColor}15`,
                                boxShadow: `0 0 12px rgba(${activeTrack.glowColor}, 0.15)`
                              }}>
                              {activeTrack.id === 'ai' && <Cpu className="w-5 h-5 text-pink-500" />}
                              {activeTrack.id === 'be' && <Network className="w-5 h-5 text-blue-500" />}
                              {activeTrack.id === 'fe' && <Zap className="w-5 h-5 text-cyber-cyan" />}
                              {activeTrack.id === 'ops' && <Shield className="w-5 h-5 text-purple-500" />}
                              {activeTrack.id === 'db' && <Terminal className="w-5 h-5 text-emerald-500" />}
                            </div>
                            <div>
                              <span className="text-[8px] font-mono tracking-widest font-black px-2 py-0.5 rounded"
                                style={{ color: activeTrack.hexColor, backgroundColor: `${activeTrack.hexColor}15` }}>
                                {activeTrack.capsuleName} STACK
                              </span>
                              <h4 className="text-[14px] font-black text-white mt-0.5 leading-tight">{activeTrack.name}</h4>
                            </div>
                          </div>

                          <p className="text-gray-300 text-[10.5px] leading-relaxed mt-4 font-sans border-l-2 pl-3"
                            style={{ borderColor: activeTrack.hexColor }}>
                            {activeTrack.description}
                          </p>

                          <div className="mt-4">
                            <span className="text-[7.5px] uppercase font-mono text-gray-500 tracking-wider block mb-2 font-bold">
                              TECHNOLOGY MATRIX READOUT
                            </span>
                            <div className="flex flex-col gap-2">
                              {activeTrack.syllabus.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-[9.5px] text-gray-300">
                                  <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: activeTrack.hexColor }} />
                                  <span className="font-medium leading-relaxed font-sans">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-3.5 border-t border-white/5 flex flex-wrap gap-1.5 items-center shrink-0">
                          <span className="text-[7.5px] uppercase font-mono text-gray-500 tracking-wider mr-1.5 font-bold">CORE STACKS:</span>
                          {activeTrack.techs.map((tech) => (
                            <span key={tech.name} className="text-[8px] font-extrabold font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-gray-300"
                              style={{ borderColor: `${activeTrack.hexColor}20` }}>
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default-card"
                        initial={{ opacity: 0, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(5px)' }}
                        className="glass-card p-4 lg:p-6 rounded-xl border border-white/[0.04] bg-space-darkest/75 text-left flex flex-col justify-between h-full overflow-y-auto"
                      >
                        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                          style={{
                            backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                          }}
                        />

                        <div className="flex flex-col items-start gap-3 relative z-10">
                          <div className="w-10 h-10 rounded-lg border border-cyber-cyan/25 bg-cyber-cyan/5 flex items-center justify-center shrink-0">
                            <Compass className="w-5 h-5 text-cyber-cyan/60 animate-pulse" />
                          </div>
                          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest font-mono">TECHSTACK MATRIX READOUT</h4>
                          <p className="text-[10px] text-gray-400 leading-relaxed font-sans mt-1">
                            Hover or click on any active path node (AI, BE, FE, OPS, DB) or the side tech logos to view technical stacks and architectural layers.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/5 font-mono text-[8px] text-gray-500 flex flex-col gap-1.5 relative z-10 shrink-0">
                          <div className="flex justify-between">
                            <span>SYSTEM INTEGRATION:</span>
                            <span className="text-cyber-cyan font-bold">GRID_CONNECTED</span>
                          </div>
                          <div className="flex justify-between">
                            <span>SYSTEM STATUS:</span>
                            <span className="text-cyber-purple font-bold">OPERATIONAL</span>
                          </div>
                          <div className="flex justify-between">
                            <span>INTERACTIVE SENSOR:</span>
                            <span className="text-white">HOVER_STATE_WAIT</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>

            <div className="flex-1 w-full relative flex items-center justify-center z-20">
              <div className={`relative w-full ${aspectClass} max-w-full lg:max-w-[850px] border border-white/[0.03] rounded-xl lg:rounded-2xl bg-space-darkest/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]`}>

                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/10 rounded-tl pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/10 rounded-tr pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/10 rounded-bl pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/10 rounded-br pointer-events-none" />

                <svg viewBox={`0 0 ${viewBoxDims.w} ${viewBoxDims.h}`} className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <defs>
                    {responsiveTracks.map((t) => {
                      const feTrack = responsiveTracks.find(k => k.id === 'fe');
                      const xStart = t.id === 'db' ? feTrack?.hexX ?? centerCoords.x : centerCoords.x;
                      const yStart = t.id === 'db' ? feTrack?.hexY ?? centerCoords.y : centerCoords.y;
                      return (
                        <linearGradient key={`grad-${t.id}`} id={`beam-grad-${t.id}`}
                          x1={xStart} y1={yStart} x2={t.stationX} y2={t.stationY} gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
                          <stop offset="50%" stopColor={t.hexColor} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={t.hexColor} stopOpacity="0.95" />
                        </linearGradient>
                      );
                    })}

                    <radialGradient id="core-glow-grad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="25%" stopColor="#22d3ee" stopOpacity="0.85" />
                      <stop offset="60%" stopColor="#a855f7" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#03050d" stopOpacity="0" />
                    </radialGradient>

                    <pattern id="hud-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6,182,212,0.02)" strokeWidth="0.75" />
                    </pattern>

                    <filter id="laser-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {backgroundStars.map((s) => (
                    <circle key={s.id} cx={(s.cx / 1000) * viewBoxDims.w} cy={(s.cy / 650) * viewBoxDims.h} r={s.r} fill="#fff" opacity={s.opacity} />
                  ))}
                  <rect width="100%" height="100%" fill="url(#hud-grid)" />

                  <circle cx={centerCoords.x} cy={centerCoords.y} r={bezelRadii.r1} fill="none" stroke="rgba(6,182,212,0.02)" strokeWidth="1" />
                  <circle cx={centerCoords.x} cy={centerCoords.y} r={bezelRadii.r2} fill="none" stroke="rgba(168,85,247,0.015)" strokeWidth="1" strokeDasharray="6 6" />

                  {responsiveTracks.map((track, idx) => (
                    <TrackSVG
                      key={track.id}
                      track={track}
                      index={idx}
                      progress={progress}
                      scrollYProgress={scrollYProgress}
                      isActive={activeTrack?.id === track.id}
                      onHover={setHoveredTrack}
                      onSelect={setSelectedTrack}
                      selectedTrack={selectedTrack}
                      viewBoxDims={viewBoxDims}
                      centerCoords={centerCoords}
                      isMobile={breakpoint !== 'desktop'}
                      responsiveTracks={responsiveTracks}
                    />
                  ))}

                  <g transform={`translate(${centerCoords.x}, ${centerCoords.y})`}>
                    <motion.g style={{ scale: coreScale, opacity: coreOpacity }}>
                      <circle r="60" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="1" strokeDasharray="10 5" className="animate-[spin_20s_linear_infinite]" />
                      <circle r="48" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="1.5" strokeDasharray="5 10" className="animate-[spin_10s_linear_infinite_reverse]" />

                      <circle r="36" fill="url(#core-glow-grad)" opacity="0.9" />

                      <circle r="20" fill="rgba(3, 5, 13, 0.92)" stroke="#22d3ee" strokeWidth="1.5" />
                      <circle r="14" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 2" className="animate-[spin_6s_linear_infinite]" />
                      <circle r="4" fill="#ffffff" filter="url(#laser-glow)" />
                    </motion.g>
                  </g>
                </svg>

                {responsiveTracks.map((track) => (
                  <TrackOverlay
                    key={`ov-${track.id}`}
                    track={track}
                    progress={progress}
                    isActive={activeTrack?.id === track.id}
                    onHover={setHoveredTrack}
                    onSelect={setSelectedTrack}
                    selectedTrack={selectedTrack}
                    viewBoxDims={viewBoxDims}
                    centerCoords={centerCoords}
                    isMobile={breakpoint !== 'desktop'}
                    responsiveTracks={responsiveTracks}
                  />
                ))}

                <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3.5 pointer-events-auto z-40">
                  {SIDE_LOGOS.map((logo) => {
                    const matched = responsiveTracks.find(t => t.id === logo.trackId);
                    const isLogoActive = activeTrack?.id === logo.trackId;
                    return (
                      <div key={logo.name} className="relative cursor-pointer group"
                        onMouseEnter={() => { if (matched) setHoveredTrack(matched); }}
                        onMouseLeave={() => setHoveredTrack(null)}
                        onClick={() => { if (matched) setSelectedTrack(selectedTrack?.id === logo.trackId ? null : matched); }}
                      >
                        <div className="w-9 h-9 rounded-xl border border-white/5 bg-space-darker/60 flex items-center justify-center p-2 transition-all duration-300 hover:scale-105"
                          style={{
                            borderColor: isLogoActive ? matched?.hexColor : 'rgba(255,255,255,0.05)',
                            boxShadow: isLogoActive ? `0 0 15px ${matched?.hexColor}50` : undefined,
                            background: isLogoActive ? `${matched?.hexColor}12` : undefined
                          }}>
                          <img src={logo.logo} alt={logo.name} className="w-full h-full object-contain pointer-events-none" loading="lazy" decoding="async" />
                        </div>
                        <span className="absolute right-11 top-1/2 -translate-y-1/2 text-[8px] font-mono bg-space-darkest px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          {logo.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
