"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
  pulseSpeed: number;
}

const EDGE_MARGIN = 50;

// Desktop defaults
const DESKTOP = {
  nodeCount: 28,
  minRadius: 1.5,
  maxRadius: 2.5,
  connectionDist: 140,
  maxLineAlpha: 0.15,
  minSpeed: 0.08,
  maxSpeed: 0.2,
};

// Mobile overrides
const MOBILE = {
  nodeCount: 14,
  minRadius: 1.5,
  maxRadius: 2,
  connectionDist: 110,
  maxLineAlpha: 0.12,
  minSpeed: 0.06,
  maxSpeed: 0.15,
};

function getConfig(width: number) {
  return width < 768 ? MOBILE : DESKTOP;
}

function createNodes(width: number, height: number, config: typeof DESKTOP): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < config.nodeCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
    nodes.push({
      x: EDGE_MARGIN + Math.random() * (width - 2 * EDGE_MARGIN),
      y: EDGE_MARGIN + Math.random() * (height - 2 * EDGE_MARGIN),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: config.minRadius + Math.random() * (config.maxRadius - config.minRadius),
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: (Math.PI * 2) / (3000 + Math.random() * 3000), // 3–6s cycle
    });
  }
  return nodes;
}

function updateNode(node: Node, width: number, height: number) {
  node.x += node.vx;
  node.y += node.vy;

  if (node.x < EDGE_MARGIN) {
    node.x = EDGE_MARGIN;
    node.vx = Math.abs(node.vx);
  } else if (node.x > width - EDGE_MARGIN) {
    node.x = width - EDGE_MARGIN;
    node.vx = -Math.abs(node.vx);
  }

  if (node.y < EDGE_MARGIN) {
    node.y = EDGE_MARGIN;
    node.vy = Math.abs(node.vy);
  } else if (node.y > height - EDGE_MARGIN) {
    node.y = height - EDGE_MARGIN;
    node.vy = -Math.abs(node.vy);
  }
}

function renderFrame(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  width: number,
  height: number,
  config: typeof DESKTOP,
  time: number,
  animate: boolean
) {
  ctx.clearRect(0, 0, width, height);

  const connDist = config.connectionDist;
  const connDistSq = connDist * connDist;

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distSq = dx * dx + dy * dy;
      if (distSq < connDistSq) {
        const dist = Math.sqrt(distSq);
        const alpha = config.maxLineAlpha * (1 - dist / connDist);
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(46,134,171,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  for (const node of nodes) {
    // Pulse: sine wave between 0.25 and 0.55 opacity
    const pulse = animate
      ? Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.5 + 0.5
      : 0.5;
    const opacity = 0.25 + pulse * 0.3;

    // Interpolate color from #2E86AB to #5BACCC based on pulse
    const r = Math.round(46 + pulse * (91 - 46));
    const g = Math.round(134 + pulse * (172 - 134));
    const b = Math.round(171 + pulse * (204 - 171));

    // Glow ring at pulse peak (>0.8)
    if (pulse > 0.8) {
      const glowAlpha = (pulse - 0.8) / 0.2 * 0.08;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${glowAlpha})`;
      ctx.fill();
    }

    // Node dot
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
    ctx.fill();
  }
}

export function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const configRef = useRef(DESKTOP);
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

    configRef.current = getConfig(width);
    nodesRef.current = createNodes(width, height, configRef.current);

    return { ctx, width, height };
  }, []);

  useEffect(() => {
    // Check reduced motion preference
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener("change", handleMotionChange);

    const result = initCanvas();
    if (!result) return;

    const { ctx, width, height } = result;

    // If reduced motion, render single static frame and stop
    if (reducedMotionRef.current) {
      renderFrame(ctx, nodesRef.current, width, height, configRef.current, 0, false);
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

      for (const node of nodesRef.current) {
        updateNode(node, w, h);
      }

      renderFrame(currentCtx, nodesRef.current, w, h, configRef.current, time, true);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // IntersectionObserver: pause when out of view
    const canvas = canvasRef.current!;
    const intersectionObs = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
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
              nodesRef.current,
              resizeResult.width,
              resizeResult.height,
              configRef.current,
              0,
              false
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
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
