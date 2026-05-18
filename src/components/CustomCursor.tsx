import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const outerX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const outerY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });
  const innerX = useSpring(mouseX, { stiffness: 500, damping: 30, mass: 0.1 });
  const innerY = useSpring(mouseY, { stiffness: 500, damping: 30, mass: 0.1 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : isClicking ? 16 : 32,
          height: isHovering ? 48 : isClicking ? 16 : 32,
          opacity: isHovering ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: isHovering ? '1px solid #D4AF37' : '1px solid rgba(212,175,55,0.5)',
            boxShadow: isHovering ? '0 0 12px rgba(212,175,55,0.4)' : 'none',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 10 : 6,
          height: isClicking ? 10 : 6,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="w-full h-full rounded-full bg-jkd-gold" />
      </motion.div>

      {/* Trailing glow particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-jkd-gold/20"
          style={{
            x: outerX,
            y: outerY,
            translateX: '-50%',
            translateY: '-50%',
            width: 4 - i,
            height: 4 - i,
          }}
          transition={{ delay: (i + 1) * 0.03 }}
        />
      ))}
    </>
  );
}
