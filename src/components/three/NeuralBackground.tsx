import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    let rect = container.getBoundingClientRect();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost. Suspending render loop.');
      cancelAnimationFrame(animId);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    const isMobile = width < 768;

    const layer1Count = isMobile ? 60 : 180;
    const layer2Count = isMobile ? 80 : 280;
    const layer3Count = isMobile ? 30 : 90;
    const totalCount = layer1Count + layer2Count + layer3Count;

    interface Particle {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      baseVel: THREE.Vector3;
      layer: number;
      size: number;
      color: THREE.Color;
      pulseOffset: number;
    }

    const particles: Particle[] = [];

    const randRange = (min: number, max: number) => min + Math.random() * (max - min);

    const colorL1 = new THREE.Color(0x1e293b);
    const colorL2 = new THREE.Color(0x3b82f6);
    const colorL3 = new THREE.Color(0x475569);
    const colorL3Alt = new THREE.Color(0x64748b);

    for (let i = 0; i < totalCount; i++) {
      let layer = 1;
      let size = 0.08;
      let color = colorL1;
      let speedScale = 0.005;

      if (i >= layer1Count && i < layer1Count + layer2Count) {
        layer = 2;
        size = 0.14;
        color = colorL2;
        speedScale = 0.012;
      } else if (i >= layer1Count + layer2Count) {
        layer = 3;
        size = 0.22;
        color = Math.random() > 0.4 ? colorL3 : colorL3Alt;
        speedScale = 0.02;
      }

      const pos = new THREE.Vector3(
        randRange(-18, 18),
        randRange(-12, 12),
        layer === 1 ? randRange(-8, -4) : layer === 2 ? randRange(-3, 2) : randRange(3, 6)
      );

      const vel = new THREE.Vector3(
        randRange(-0.5, 0.5) * speedScale,
        randRange(-0.5, 0.5) * speedScale,
        randRange(-0.2, 0.2) * speedScale * 0.5
      );

      particles.push({
        pos,
        vel: vel.clone(),
        baseVel: vel.clone(),
        layer,
        size,
        color,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const getLayerGeometryAndMaterial = (layerNum: number, pSize: number, pOpacity: number) => {
      const geom = new THREE.BufferGeometry();
      const layerParticles = particles.filter(p => p.layer === layerNum);
      const positions = new Float32Array(layerParticles.length * 3);
      const colors = new Float32Array(layerParticles.length * 3);

      layerParticles.forEach((p, idx) => {
        positions[idx * 3] = p.pos.x;
        positions[idx * 3 + 1] = p.pos.y;
        positions[idx * 3 + 2] = p.pos.z;

        colors[idx * 3] = p.color.r;
        colors[idx * 3 + 1] = p.color.g;
        colors[idx * 3 + 2] = p.color.b;
      });

      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const canvasTex = document.createElement('canvas');
      canvasTex.width = 32;
      canvasTex.height = 32;
      const ctxTex = canvasTex.getContext('2d');
      if (ctxTex) {
        const grad = ctxTex.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctxTex.fillStyle = grad;
        ctxTex.fillRect(0, 0, 32, 32);
      }
      const texture = new THREE.CanvasTexture(canvasTex);

      const mat = new THREE.PointsMaterial({
        size: pSize,
        vertexColors: true,
        transparent: true,
        opacity: pOpacity,
        map: texture,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      return { geom, mat, particlesList: layerParticles };
    };

    const l1 = getLayerGeometryAndMaterial(1, 0.28, 0.08);
    const l2 = getLayerGeometryAndMaterial(2, 0.45, 0.18);
    const l3 = getLayerGeometryAndMaterial(3, 0.65, 0.28);

    const points1 = new THREE.Points(l1.geom, l1.mat);
    const points2 = new THREE.Points(l2.geom, l2.mat);
    const points3 = new THREE.Points(l3.geom, l3.mat);

    scene.add(points1);
    scene.add(points2);
    scene.add(points3);

    const maxLines = isMobile ? 180 : 550;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineColors = new Float32Array(maxLines * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 0.5,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    const mouse3D = new THREE.Vector3();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();

    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      mousePos.current = { x: e.clientX, y: e.clientY };
      isHovering.current = true;

      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      raycaster.ray.intersectPlane(plane, mouse3D);
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      mouse3D.set(0, 0, -1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animId = 0;
    const startTime = performance.now();

    const updatePointsBuffer = (pts: THREE.Points, pList: Particle[]) => {
      const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;

      pList.forEach((p, idx) => {
        positions[idx * 3] = p.pos.x;
        positions[idx * 3 + 1] = p.pos.y;
        positions[idx * 3 + 2] = p.pos.z;
      });

      posAttr.needsUpdate = true;
    };

    let isFirstFrame = true;
    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }
      if (isFirstFrame) {
        isFirstFrame = false;
        requestAnimationFrame(() => {
          setIsInitialized(true);
        });
      }
      const time = (performance.now() - startTime) * 0.001;

      particles.forEach((p) => {
        p.pos.add(p.vel);

        if (isHovering.current && p.layer >= 2) {
          const distanceToMouse = p.pos.distanceTo(mouse3D);
          const maxInteractionDist = p.layer === 3 ? 5.5 : 4.0;

          if (distanceToMouse < maxInteractionDist) {
            const force = (maxInteractionDist - distanceToMouse) / maxInteractionDist;
            const dir = new THREE.Vector3().subVectors(mouse3D, p.pos).normalize();

            p.vel.addScaledVector(dir, force * 0.002 * p.layer);
            p.vel.clampLength(0.001, 0.04 * p.layer);
          }
        }
        p.vel.lerp(p.baseVel, 0.04);

        if (p.layer === 3) {
          p.pos.z += Math.sin(time * 2.0 + p.pulseOffset) * 0.003;
        }
        const boundX = 18;
        const boundY = 12;
        if (p.pos.x > boundX) { p.pos.x = -boundX; }
        else if (p.pos.x < -boundX) { p.pos.x = boundX; }

        if (p.pos.y > boundY) { p.pos.y = -boundY; }
        else if (p.pos.y < -boundY) { p.pos.y = boundY; }
      });

      updatePointsBuffer(points1, l1.particlesList);
      updatePointsBuffer(points2, l2.particlesList);
      updatePointsBuffer(points3, l3.particlesList);
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePositionsArr = linePosAttr.array as Float32Array;
      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;
      const lineColorsArr = lineColAttr.array as Float32Array;

      let lineCount = 0;
      const l2List = l2.particlesList;
      const maxConnectDist = isMobile ? 2.8 : 3.8;

      for (let i = 0; i < l2List.length; i++) {
        if (lineCount >= maxLines) break;

        const pA = l2List[i];
        for (let j = i + 1; j < l2List.length; j++) {
          if (lineCount >= maxLines) break;

          const pB = l2List[j];
          const dist = pA.pos.distanceTo(pB.pos);

          if (dist < maxConnectDist) {
            const idx = lineCount * 2;

            linePositionsArr[idx * 3] = pA.pos.x;
            linePositionsArr[idx * 3 + 1] = pA.pos.y;
            linePositionsArr[idx * 3 + 2] = pA.pos.z;
            linePositionsArr[(idx + 1) * 3] = pB.pos.x;
            linePositionsArr[(idx + 1) * 3 + 1] = pB.pos.y;
            linePositionsArr[(idx + 1) * 3 + 2] = pB.pos.z;

            const strength = 1.0 - (dist / maxConnectDist);
            const brightness = strength * 0.10;

            lineColorsArr[idx * 3] = pA.color.r * brightness;
            lineColorsArr[idx * 3 + 1] = pA.color.g * brightness;
            lineColorsArr[idx * 3 + 2] = pA.color.b * brightness;

            lineColorsArr[(idx + 1) * 3] = pB.color.r * brightness;
            lineColorsArr[(idx + 1) * 3 + 1] = pB.color.g * brightness;
            lineColorsArr[(idx + 1) * 3 + 2] = pB.color.b * brightness;

            lineCount++;
          }
        }
      }

      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineCount * 2);

      renderer.render(scene, camera);

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      rect = container.getBoundingClientRect();

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('webglcontextlost', handleContextLost);

      scene.remove(points1);
      scene.remove(points2);
      scene.remove(points3);
      scene.remove(lineSegments);
      l1.geom.dispose();
      l1.mat.dispose();
      l2.geom.dispose();
      l2.mat.dispose();
      l3.geom.dispose();
      l3.mat.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #070c1e 0%, #03050d 100%)',
      }}
    >

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block transition-opacity duration-700"
        style={{ opacity: isInitialized ? 1 : 0 }}
      />

      <div
        className="hidden md:block absolute rounded-full pointer-events-none w-[45%] h-[45%] bg-[#06b6d4]/[0.03] blur-[150px] animate-[pulse_8s_infinite_alternate]"
        style={{ top: '10%', left: '15%' }}
      />
      <div
        className="hidden md:block absolute rounded-full pointer-events-none w-[40%] h-[40%] bg-[#a855f7]/[0.02] blur-[160px] animate-[pulse_11s_infinite_alternate]"
        style={{ bottom: '15%', right: '10%' }}
      />
      <div
        className="hidden md:block absolute rounded-full pointer-events-none w-[35%] h-[35%] bg-[#2dd4bf]/[0.02] blur-[130px] animate-[pulse_9s_infinite_alternate]"
        style={{ top: '60%', left: '50%' }}
      />
    </div>
  );
}
