"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1.5,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? end : 0);

  useEffect(() => {
    if (!isInView || prefersReduced) {
      if (prefersReduced) setDisplay(end);
      return;
    }

    let startTime: number | null = null;
    let rafId: number;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setDisplay(easedProgress * end);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplay(end);
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, end, duration, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
