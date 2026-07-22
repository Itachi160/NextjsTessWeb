import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending } from 'three';
import type { Points } from 'three';
import { isLowEndDevice } from '../../utils/performance';

export default function Particles() {
  const pointsRef = useRef<Points>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isLowEnd = typeof window !== 'undefined' && isLowEndDevice();
  const count = isLowEnd ? 80 : (isMobile ? 250 : 600);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime || performance.now() * 0.001;
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.05;

    pointsRef.current.position.x += (state.pointer.x * 0.3 - pointsRef.current.position.x) * 0.02;
    pointsRef.current.position.y += (state.pointer.y * 0.3 - pointsRef.current.position.y) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#06b6d4"
        transparent
        opacity={0.35}
        sizeAttenuation={true}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
