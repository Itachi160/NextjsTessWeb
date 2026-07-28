import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Particles from './Particles';
import { isLowEndDevice } from '../../utils/performance';

if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = function (...args: any[]) {
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

export default function ThreeCanvas() {
  const [dpr, setDpr] = useState<number | [number, number]>([1, 1.5]);

  useEffect(() => {
    if (isLowEndDevice()) {
      setDpr(1.0);
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={dpr}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />

        <Particles />
      </Canvas>
    </div>
  );
}
