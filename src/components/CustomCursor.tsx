import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUIStore } from '../store/uiStore';
import { isMobileDevice } from '../utils/performance';

export default function CustomCursor() {
  const cursorType = useUIStore((state) => state.cursorType);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const isVisibleRef = useRef(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isMobileDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };

  }, []);

  useEffect(() => {
    if (cursorType === 'view') {
      setCursorText('VIEW');
    } else if (cursorType === 'click') {
      setCursorText('EXPLORE');
    } else {
      setCursorText('');
    }
  }, [cursorType]);

  if (!isVisible) return null;

  const getCursorVariants = () => {
    switch (cursorType) {
      case 'hover':
        return {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          borderColor: 'rgba(6, 182, 212, 0.8)',
          borderWidth: '2px',
        };
      case 'magnetic':
        return {
          width: 64,
          height: 64,
          backgroundColor: 'rgba(168, 85, 247, 0)',
          borderColor: 'rgba(168, 85, 247, 0.8)',
          borderWidth: '2px',
          boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)',
        };
      case 'view':
        return {
          width: 80,
          height: 80,
          backgroundColor: 'rgba(59, 130, 246, 0.9)',
          borderColor: '#3b82f6',
          borderWidth: '1px',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
        };
      case 'click':
        return {
          width: 70,
          height: 70,
          backgroundColor: 'rgba(6, 182, 212, 0.9)',
          borderColor: '#06b6d4',
          borderWidth: '1px',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
        };
      default:
        return {
          width: 24,
          height: 24,
          backgroundColor: 'rgba(6, 182, 212, 0)',
          borderColor: 'rgba(6, 182, 212, 0.6)',
          borderWidth: '1.5px',
        };
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-bold text-xs tracking-wider text-white select-none hidden md:flex"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={getCursorVariants()}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {cursorText}
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyber-cyan rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#06b6d4] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
