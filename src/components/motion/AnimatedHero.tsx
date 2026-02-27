"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedHeroProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedHero({ children, className }: AnimatedHeroProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(46, 134, 171, 0.12) 0%, transparent 60%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(46, 134, 171, 0.08) 0%, transparent 50%)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
