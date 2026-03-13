"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className }: HoverCardProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: "0 8px 30px rgba(201, 201, 201, 0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}

      className={className}
    >
      {children}
    </motion.div>
  );
}
