"use client";

import { useEffect, useRef, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  phase: number; // 0–1 mapped to x position
}

interface DataFlowVisualizationProps {
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

// Zone boundaries (percentage of canvas width)
const ZONES = {
  input: { start: 0, end: 0.2 },
  processing: { start: 0.2, end: 0.7 },
  output: { start: 0.7, end: 0.85 },
  barrier: { start: 0.85, end: 0.87 },
  blocked: { start: 0.87, end: 1.0 },
};

const DESKTOP_PARTICLES = 24;
const MOBILE_PARTICLES = 12;

// Colors
const TEAL = { r: 46, g: 134, b: 171 };     // #2E86AB
const NAVY = { r: 27, g: 42, b: 74 };       // #1B2A4A
const CORAL = { r: 232, g: 97, b: 77 };     // #E8614D

const EDGE_PAD = 20;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getParticleCount(width: number): number {
  return width < 768 ? MOBILE_PARTICLES : DESKTOP_PARTICLES;
}

function createParticle(width: number, height: number): Particle {
  return {
    x: ZONES.input.start * width + Math.random() * (ZONES.input.end * width - ZONES.input.start * width),
    y: EDGE_PAD + Math.random() * (height - 2 * EDGE_PAD),
    speed: 0.3 + Math.random() * 0.4,
    size: 1.5 + Math.random() * 1,
    phase: 0,
  };
}

function createParticles(width: number, height: number): Particle[] {
  const count = getParticleCount(width);
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const p = createParticle(width, height);
    // Spread initial positions across the flow for immediate visual interest
    p.x = Math.random() * (ZONES.output.end * width);
    p.phase = p.x / width;
    particles.push(p);
  }
  return particles;
}

function lerpColor(
  from: { r: number; g: number; b: number },
  to: { r: number; g: number; b: number },
  t: number,
): { r: number; g: number; b: number } {
  return {
    r: Math.round(from.r + (to.r - from.r) * t),
    g: Math.round(from.g + (to.g - from.g) * t),
    b: Math.round(from.b + (to.b - from.b) * t),
  };
}

function getParticleColor(phase: number): { r: number; g: number; b: number } {
  if (phase < 0.3) {
    // Input → processing: teal
    return TEAL;
  } else if (phase < 0.6) {
    // Processing: teal → navy
    const t = (phase - 0.3) / 0.3;
    return lerpColor(TEAL, NAVY, t);
  } else {
    // Output approach: navy → coral fade
    const t = (phase - 0.6) / 0.25;
    return lerpColor(NAVY, CORAL, Math.min(t, 1));
  }
}

/* ------------------------------------------------------------------ */
/*  Render                                                             */
/* ------------------------------------------------------------------ */

function renderFrame(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
  time: number,
  animate: boolean,
) {
  ctx.clearRect(0, 0, width, height);

  // Blocked zone dimmed overlay
  const blockedStart = ZONES.blocked.start * width;
  ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  ctx.fillRect(blockedStart, 0, width - blockedStart, height);

  // Barrier line — kept subtle since this is a background element
  const barrierX = (ZONES.barrier.start + ZONES.barrier.end) / 2 * width;
  const glowIntensity = animate
    ? 0.08 + Math.sin(time * 0.002) * 0.04
    : 0.1;

  // Barrier glow
  const grad = ctx.createLinearGradient(barrierX - 6, 0, barrierX + 6, 0);
  grad.addColorStop(0, `rgba(${CORAL.r},${CORAL.g},${CORAL.b},0)`);
  grad.addColorStop(0.5, `rgba(${CORAL.r},${CORAL.g},${CORAL.b},${glowIntensity})`);
  grad.addColorStop(1, `rgba(${CORAL.r},${CORAL.g},${CORAL.b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(barrierX - 6, 0, 12, height);

  // Barrier core line
  ctx.beginPath();
  ctx.moveTo(barrierX, 0);
  ctx.lineTo(barrierX, height);
  ctx.strokeStyle = `rgba(${CORAL.r},${CORAL.g},${CORAL.b},0.15)`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Particles
  for (const p of particles) {
    const color = getParticleColor(p.phase);

    // Fade out near barrier — keep subtle for background use
    let alpha = 0.3;
    const barrierDist = ZONES.barrier.start * width - p.x;
    if (barrierDist < 30 && barrierDist > 0) {
      alpha = 0.3 * (barrierDist / 30);
    }

    // Subtle vertical drift
    if (animate) {
      p.y += Math.sin(time * 0.001 + p.x * 0.01) * 0.15;
      // Keep in bounds
      if (p.y < EDGE_PAD) p.y = EDGE_PAD;
      if (p.y > height - EDGE_PAD) p.y = height - EDGE_PAD;
    }

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
    ctx.fill();

    // Small glow for larger particles
    if (p.size > 2) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha * 0.1})`;
      ctx.fill();
    }
  }
}

function updateParticles(particles: Particle[], width: number, height: number) {
  const barrierX = ZONES.barrier.start * width;

  for (const p of particles) {
    p.x += p.speed;
    p.phase = p.x / width;

    // Respawn at input when reaching barrier
    if (p.x >= barrierX) {
      p.x = ZONES.input.start * width + Math.random() * (ZONES.input.end * width * 0.5);
      p.y = EDGE_PAD + Math.random() * (height - 2 * EDGE_PAD);
      p.speed = 0.3 + Math.random() * 0.4;
      p.phase = p.x / width;
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function DataFlowVisualization({
  className = "",
}: DataFlowVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const isVisibleRef = useRef(true);
  const reducedMotionRef = useRef(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    particlesRef.current = createParticles(width, height);

    return { ctx, width, height };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener("change", handleMotionChange);

    const result = initCanvas();
    if (!result) return;

    const { ctx, width, height } = result;

    // Reduced motion: single static frame
    if (reducedMotionRef.current) {
      renderFrame(ctx, particlesRef.current, width, height, 0, false);
      return () => {
        mql.removeEventListener("change", handleMotionChange);
      };
    }

    // Animation loop
    let startTime = performance.now();

    const animate = () => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const currentCtx = canvas.getContext("2d");
      if (!currentCtx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const time = performance.now() - startTime;

      updateParticles(particlesRef.current, w, h);
      renderFrame(currentCtx, particlesRef.current, w, h, time, true);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // IntersectionObserver: pause when out of view
    const canvas = canvasRef.current!;
    const intersectionObs = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObs.observe(canvas);

    // ResizeObserver: reinitialize on resize (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeObs = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(rafRef.current);
        const resizeResult = initCanvas();
        if (resizeResult) {
          startTime = performance.now();
          if (reducedMotionRef.current) {
            renderFrame(
              resizeResult.ctx,
              particlesRef.current,
              resizeResult.width,
              resizeResult.height,
              0,
              false,
            );
          } else {
            rafRef.current = requestAnimationFrame(animate);
          }
        }
      }, 250);
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObs.observe(parent);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      intersectionObs.disconnect();
      resizeObs.disconnect();
      mql.removeEventListener("change", handleMotionChange);
    };
  }, [initCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
