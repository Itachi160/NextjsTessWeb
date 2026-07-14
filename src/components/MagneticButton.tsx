import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUIStore } from '../store/uiStore';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursorType = useUIStore((state) => state.setCursorType);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.1 });

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (!rect) return;
    const { clientX, clientY } = e;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    rawX.set((clientX - centerX) * strength);
    rawY.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setCursorType('default');
    rectRef.current = null;
  };

  const handleMouseEnter = () => {
    setCursorType('magnetic');
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`cursor-pointer inline-block ${className}`}
    >
      <motion.div style={{ x: springX, y: springY }}>
        {children}
      </motion.div>
    </div>
  );
}
