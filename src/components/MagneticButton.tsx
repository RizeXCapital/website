"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Max pixel offset in any direction. Default: 8 */
  strength?: number;
}

/**
 * Wraps children with a spring-based magnetic cursor effect.
 * The element follows the cursor position within its bounding box,
 * then springs back to rest on mouse leave.
 *
 * Safe on touch/mobile — onMouseMove never fires without a pointer.
 * Respects prefers-reduced-motion automatically.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 8,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 400, damping: 25, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 400, damping: 25, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || prefersReduced) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      rawX.set(dx * strength);
      rawY.set(dy * strength);
    },
    [prefersReduced, rawX, rawY, strength],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
