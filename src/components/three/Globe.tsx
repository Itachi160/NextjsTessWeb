import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useCanvasStore } from '../../store/canvasStore';

interface OfficeLocation {
  name: string;
  coords: [number, number, number]; // 3D local coordinate on radius 2 sphere
  description: string;
  targetRot: [number, number]; // [rotX, rotY] target rotation to face camera
}

const OFFICES: OfficeLocation[] = [
  { name: 'New York', coords: [0.8, 1.1, 1.4], description: 'HQ & Client Relations', targetRot: [-0.45, -0.5] },
  { name: 'London', coords: [-0.2, 1.3, 1.5], description: 'European Delivery Hub', targetRot: [-0.55, 0.1] },
  { name: 'Tokyo', coords: [-1.4, 0.9, 1.1], description: 'APAC Operations Core', targetRot: [-0.4, 0.9] },
  { name: 'Singapore', coords: [-1.6, 0.1, 1.2], description: 'Cloud Infrastructure Center', targetRot: [0, 1.0] },
  { name: 'Sydney', coords: [-1.2, -0.8, 1.3], description: 'Engineering Operations', targetRot: [0.4, 0.75] }
];

export default function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const { activeOffice, setActiveOffice } = useCanvasStore();

  const targetRotation = useRef<[number, number]>([0, 0]);

  // Update target rotation when active office changes
  useEffect(() => {
    const office = OFFICES.find(o => o.name === activeOffice);
    if (office) {
      targetRotation.current = office.targetRot;
    }
  }, [activeOffice]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smoothly interpolate rotation to center the active office towards the camera
    const speed = 0.05;
    
    // Calculate difference and wrap rotation for shortest paths
    let diffX = targetRotation.current[0] - groupRef.current.rotation.x;
    let diffY = targetRotation.current[1] - groupRef.current.rotation.y;
    
    groupRef.current.rotation.x += diffX * speed;
    groupRef.current.rotation.y += diffY * speed;

    // Slow wobble animation to feel floating
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.05; // slowly rotate the inner earth mesh
    }
  });

  return (
    <group ref={groupRef} position={[0, -78, 0]}>
      {/* Ambient glow inside */}
      <pointLight intensity={3} color="#06b6d4" distance={8} />

      {/* Main Globe Mesh (Dotted/Wireframe) */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          wireframe
          transparent
          opacity={0.15}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Meridian Rings */}
      <gridHelper args={[4, 4, '#3b82f6', '#06b6d4']} rotation={[Math.PI / 2, 0, 0]} />

      {/* Office Locations */}
      {OFFICES.map((office) => {
        const isActive = activeOffice === office.name;
        return (
          <group key={office.name} position={office.coords}>
            {/* Glowing marker dot */}
            <mesh onClick={() => setActiveOffice(office.name)}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial
                color={isActive ? '#a855f7' : '#06b6d4'}
                toneMapped={false}
              />
            </mesh>

            {/* Glowing Ring around node */}
            {isActive && (
              <mesh>
                <ringGeometry args={[0.12, 0.16, 32]} />
                <meshBasicMaterial
                  color="#a855f7"
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )}

            {/* HTML label showing active office details */}
            {isActive && (
              <Html distanceFactor={6} center className="pointer-events-none select-none">
                <div className="glass-card-purple p-2.5 rounded-lg border border-purple-500/30 text-[10px] w-36 shadow-lg shadow-purple-500/20 text-white animate-fade-in font-sans">
                  <h4 className="font-extrabold text-cyber-purple uppercase tracking-wider">{office.name}</h4>
                  <p className="text-gray-300 mt-0.5 leading-tight">{office.description}</p>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
