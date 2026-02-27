"use client";

import type { ReactNode } from "react";
import { NeuralNetworkCanvas } from "./NeuralNetworkCanvas";

interface AnimatedHeroProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedHero({ children, className }: AnimatedHeroProps) {
  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      <NeuralNetworkCanvas />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
