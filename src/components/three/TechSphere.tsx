import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useCanvasStore } from '../../store/canvasStore';

interface TechItem {
  name: string;
  position: [number, number, number];
  color: string;
}

const TECHNOLOGIES = [
  { name: 'Java', color: 'from-orange-500 to-red-600' },
  { name: 'Spring Boot', color: 'from-green-500 to-emerald-700' },
  { name: 'React', color: 'from-cyan-400 to-blue-500' },
  { name: 'Angular', color: 'from-red-500 to-pink-600' },
  { name: 'Node.js', color: 'from-green-400 to-emerald-600' },
  { name: 'Python', color: 'from-yellow-400 to-blue-600' },
  { name: 'Docker', color: 'from-blue-400 to-blue-600' },
  { name: 'Kubernetes', color: 'from-blue-500 to-indigo-700' },
  { name: 'AWS', color: 'from-yellow-500 to-orange-600' },
  { name: 'Azure', color: 'from-blue-500 to-cyan-500' },
  { name: 'PostgreSQL', color: 'from-blue-600 to-indigo-800' },
  { name: 'MongoDB', color: 'from-green-500 to-emerald-800' },
  { name: 'Redis', color: 'from-red-500 to-red-700' },
  { name: 'Kafka', color: 'from-gray-400 to-gray-600' }
];

export default function TechSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const { setHoveredTech, hoveredTech } = useCanvasStore();

  const techItems = useMemo(() => {
    const items: TechItem[] = [];
    const count = TECHNOLOGIES.length;
    const radius = 2.4;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      items.push({
        name: TECHNOLOGIES[i].name,
        position: [x, y, z],
        color: TECHNOLOGIES[i].color
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime || performance.now() * 0.001;
    groupRef.current.rotation.y = time * 0.12;
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef} position={[-15, -22, 0]}>
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.1} />
      </mesh>

      {techItems.map((tech) => {
        const isHovered = hoveredTech === tech.name;
        return (
          <group key={tech.name} position={tech.position}>
            <Html
              distanceFactor={8}
              center
              className="pointer-events-auto select-none"
            >
              <div
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border backdrop-blur-md flex items-center gap-1.5 ${isHovered
                    ? 'scale-110 bg-gradient-to-r text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] border-cyber-cyan border-opacity-100'
                    : 'bg-space-darkest/75 text-gray-300 border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan hover:scale-105'
                  }`}
                style={{
                  boxShadow: isHovered
                    ? '0 0 20px rgba(6,182,212,0.4), inset 0 0 10px rgba(6,182,212,0.2)'
                    : 'none',
                }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-white animate-pulse' : 'bg-cyber-cyan'
                    }`}
                />
                {tech.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
