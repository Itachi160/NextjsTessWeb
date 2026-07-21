import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCanvasStore } from '../../store/canvasStore';

interface CameraMilestone {
  scroll: number;
  pos: [number, number, number];
  target: [number, number, number];
}

const MILESTONES: CameraMilestone[] = [
  { scroll: 0.00, pos: [0, 0, 5], target: [0, 0, 0] },
  { scroll: 0.11, pos: [2.5, -8, 5.5], target: [0, -8, 0] },
  { scroll: 0.22, pos: [4, -16, 5], target: [2.5, -16, 0] },
  { scroll: 0.33, pos: [-12, -22, 6.5], target: [-15, -22, 0] },
  { scroll: 0.44, pos: [11, -32, 6], target: [14, -32, 0] },
  { scroll: 0.55, pos: [0, -42, 8], target: [0, -42, 0] },
  { scroll: 0.66, pos: [-3, -50, 7.5], target: [-5, -50, 0] },
  { scroll: 0.77, pos: [5, -58, 6.5], target: [2, -58, 0] },
  { scroll: 0.88, pos: [-4, -66, 6], target: [-2, -66, 0] },
  { scroll: 1.00, pos: [0, -78, 6.5], target: [0, -78, 0] }
];

export default function CameraController() {
  const { camera } = useThree();
  const scrollProgress = useCanvasStore((state) => state.scrollProgress);
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));


  const { setActiveSection } = useCanvasStore();

  useEffect(() => {
    let section = 'hero';
    if (scrollProgress > 0.93) section = 'contact';
    else if (scrollProgress > 0.82) section = 'careers';
    else if (scrollProgress > 0.71) section = 'testimonials';
    else if (scrollProgress > 0.60) section = 'why';
    else if (scrollProgress > 0.49) section = 'process';
    else if (scrollProgress > 0.38) section = 'projects';
    else if (scrollProgress > 0.27) section = 'ecosystem';
    else if (scrollProgress > 0.16) section = 'services';
    else if (scrollProgress > 0.05) section = 'about';

    setActiveSection(section);
  }, [scrollProgress, setActiveSection]);

  useFrame((state) => {
    let index = 0;
    for (let i = 0; i < MILESTONES.length - 1; i++) {
      if (scrollProgress >= MILESTONES[i].scroll && scrollProgress <= MILESTONES[i + 1].scroll) {
        index = i;
        break;
      }
    }

    const mStart = MILESTONES[index];
    const mEnd = MILESTONES[index + 1];

    const segmentRange = mEnd.scroll - mStart.scroll;
    const localRatio = segmentRange > 0 ? (scrollProgress - mStart.scroll) / segmentRange : 0;

    const targetX = THREE.MathUtils.lerp(mStart.pos[0], mEnd.pos[0], localRatio);
    const targetY = THREE.MathUtils.lerp(mStart.pos[1], mEnd.pos[1], localRatio);
    const targetZ = THREE.MathUtils.lerp(mStart.pos[2], mEnd.pos[2], localRatio);

    const focusX = THREE.MathUtils.lerp(mStart.target[0], mEnd.target[0], localRatio);
    const focusY = THREE.MathUtils.lerp(mStart.target[1], mEnd.target[1], localRatio);
    const focusZ = THREE.MathUtils.lerp(mStart.target[2], mEnd.target[2], localRatio);

    const px = state.pointer.x * 0.4;
    const py = state.pointer.y * 0.4;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + px, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + py, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    currentTarget.current.x = THREE.MathUtils.lerp(currentTarget.current.x, focusX, 0.08);
    currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, focusY, 0.08);
    currentTarget.current.z = THREE.MathUtils.lerp(currentTarget.current.z, focusZ, 0.08);

    camera.lookAt(currentTarget.current);
  });

  return null;
}
