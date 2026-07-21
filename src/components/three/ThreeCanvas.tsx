import { Canvas } from '@react-three/fiber';
import Particles from './Particles';
import { isLowEndDevice } from '../../utils/performance';

export default function ThreeCanvas() {
  const dpr = typeof window !== 'undefined' && isLowEndDevice() ? 1.0 : ([1, 1.5] as [number, number]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={dpr}
        style={{ background: 'transparent' }}
      >
        {/* Subtle ambient light */}
        <ambientLight intensity={0.3} />

        {/* Persistent Particle Dust - background only */}
        <Particles />
      </Canvas>
    </div>
  );
}
