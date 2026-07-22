import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface NodeInfo {
  id: number;
  position: [number, number, number];
  size: number;
  color: string;
  distort: boolean;
}

export default function CloudNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes: NodeInfo[] = [
    { id: 1, position: [0, 0, 0], size: 0.6, color: '#3b82f6', distort: false },
    { id: 2, position: [2, 1.5, -1], size: 0.4, color: '#06b6d4', distort: true },
    { id: 3, position: [-2, 1, 1], size: 0.35, color: '#a855f7', distort: false },
    { id: 4, position: [1.8, -1.8, 1.2], size: 0.3, color: '#ec4899', distort: true },
    { id: 5, position: [-2.2, -1.5, -1.2], size: 0.45, color: '#10b981', distort: false },
  ];

  const connections = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 3],
    [2, 4],
  ];

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime || performance.now() * 0.001;
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    groupRef.current.rotation.y = time * 0.05;
    groupRef.current.children.forEach((child, idx) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x = time * 0.2 + idx;
        child.rotation.y = time * 0.3 + idx;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <pointLight position={[2, 3, 2]} intensity={2.5} color="#06b6d4" />
      <pointLight position={[-2, -3, -2]} intensity={1.5} color="#a855f7" />

      {nodes.map((node) => {
        const key = `node-${node.id}`;
        return (
          <mesh key={key} position={node.position}>
            {node.distort ? (
              <>
                <sphereGeometry args={[node.size, 32, 32]} />
                <MeshDistortMaterial
                  color={node.color}
                  distort={0.3}
                  speed={2}
                  roughness={0.2}
                  metalness={0.8}
                  emissive={node.color}
                  emissiveIntensity={0.5}
                />
              </>
            ) : (
              <>
                <boxGeometry args={[node.size, node.size, node.size]} />
                <meshStandardMaterial
                  color={node.color}
                  roughness={0.1}
                  metalness={0.9}
                  emissive={node.color}
                  emissiveIntensity={0.6}
                />
              </>
            )}
          </mesh>
        );
      })}

      {connections.map(([startIdx, endIdx], idx) => {
        const startPos = nodes[startIdx].position;
        const endPos = nodes[endIdx].position;
        const key = `conn-${idx}`;

        return (
          <Line
            key={key}
            points={[startPos, endPos]}
            color="#06b6d4"
            lineWidth={1.2}
            transparent
            opacity={0.4}
          />
        );
      })}
    </group>
  );
}
