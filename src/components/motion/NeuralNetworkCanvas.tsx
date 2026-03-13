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
  depth: number;
}

interface Signal {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

interface Surge {
  targetIdx: number;
  neighborIndices: number[];
  startTime: number;
  sparks: { burstAngle: number; ringAngle: number; dist: number; size: number; shapeRotation: number }[];
}

const EDGE_MARGIN = 50;

// Surge timing (ms)
const SURGE_CONVERGE_MS = 1800;
const SURGE_FLASH_MS = 10000;
const SURGE_DISPERSE_MS = 1800;
const SURGE_TOTAL_MS = SURGE_CONVERGE_MS + SURGE_FLASH_MS + SURGE_DISPERSE_MS;
const SURGE_COOLDOWN_MS = 12000;
const SURGE_MIN_NEIGHBORS = 3;

// Steel color — #607D8B
// Gold color for convergence burst
const STEEL = { r: 96, g: 125, b: 139 };
const GOLD = { r: 230, g: 185, b: 50 };

const DESKTOP = {
  nodeCount: 28,
  minRadius: 1.5,
  maxRadius: 2.5,
  connectionDist: 140,
  maxLineAlpha: 0.15,
  minSpeed: 0.04,
  maxSpeed: 0.12,
  signalChance: 0.002,
  maxSignals: 4,
  mouseRadius: 150,
  mouseBoost: 0.12,
};

const MOBILE = {
  nodeCount: 14,
  minRadius: 1.5,
  maxRadius: 2,
  connectionDist: 110,
  maxLineAlpha: 0.12,
  minSpeed: 0.03,
  maxSpeed: 0.09,
  signalChance: 0.0015,
  maxSignals: 3,
  mouseRadius: 0,
  mouseBoost: 0,
};

function getConfig(width: number) {
  return width < 768 ? MOBILE : DESKTOP;
}

function createNodes(
  width: number,
  height: number,
  config: typeof DESKTOP
): Node[] {
  const nodes: Node[] = [];

  // Extra nodes for bottom-middle and right zones
  const bonusCount = Math.floor(config.nodeCount * 0.25);
  const totalCount = config.nodeCount + bonusCount;

  for (let i = 0; i < totalCount; i++) {
    let x: number;
    let y: number;

    if (i >= config.nodeCount) {
      // Bonus nodes: bottom-middle area
      x = width * 0.3 + Math.random() * width * 0.4;
      y = height * 0.6 + Math.random() * (height * 0.35 - EDGE_MARGIN);
    } else {
      x = EDGE_MARGIN + Math.random() * (width - 2 * EDGE_MARGIN);
      y = EDGE_MARGIN + Math.random() * (height - 2 * EDGE_MARGIN);
    }

    // Left side (text area): smaller/dimmer nodes. Right side: larger/brighter.
    const xRatio = x / width;
    const depthMin = 0.5 + xRatio * 0.2;
    const depthRange = 0.15 + xRatio * 0.15;
    const depth = depthMin + Math.random() * depthRange;

    const angle = Math.random() * Math.PI * 2;
    const baseSpeed =
      config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
    const speed = baseSpeed * (0.6 + depth * 0.4);
    nodes.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius:
        config.minRadius +
        Math.random() * (config.maxRadius - config.minRadius) * depth,
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: (Math.PI * 2) / (3000 + Math.random() * 3000),
      depth,
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

function findSurgeTarget(
  nodes: Node[],
  connDist: number,
  canvasWidth: number
): { targetIdx: number; neighbors: number[] } | null {
  const connDistSq = connDist * connDist;

  // Build candidates with right-side bias
  // Nodes in right 60% get weight 4, left 40% get weight 1
  const weighted: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const copies = nodes[i].x > canvasWidth * 0.4 ? 4 : 1;
    for (let c = 0; c < copies; c++) weighted.push(i);
  }

  // Shuffle weighted indices
  for (let i = weighted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [weighted[i], weighted[j]] = [weighted[j], weighted[i]];
  }

  // Deduplicate while preserving shuffled order
  const seen = new Set<number>();
  const indices: number[] = [];
  for (const idx of weighted) {
    if (!seen.has(idx)) {
      seen.add(idx);
      indices.push(idx);
    }
  }

  for (const idx of indices) {
    const target = nodes[idx];
    const neighbors: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      if (i === idx) continue;
      const dx = target.x - nodes[i].x;
      const dy = target.y - nodes[i].y;
      if (dx * dx + dy * dy < connDistSq) {
        neighbors.push(i);
      }
    }
    if (neighbors.length >= SURGE_MIN_NEIGHBORS) {
      return { targetIdx: idx, neighbors };
    }
  }
  return null;
}

function renderFrame(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  signals: Signal[],
  width: number,
  height: number,
  config: typeof DESKTOP,
  time: number,
  animate: boolean,
  mouseX: number,
  mouseY: number,
  surge: Surge | null
) {
  ctx.clearRect(0, 0, width, height);

  const connDist = config.connectionDist;
  const connDistSq = connDist * connDist;
  const mouseActive = config.mouseRadius > 0 && mouseX >= 0;
  const mouseRadSq = config.mouseRadius * config.mouseRadius;

  // Build set of surge-active connections for line brightening
  const surgeNeighborSet = new Set<number>();
  if (surge) {
    for (const n of surge.neighborIndices) surgeNeighborSet.add(n);
  }

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distSq = dx * dx + dy * dy;
      if (distSq < connDistSq) {
        const dist = Math.sqrt(distSq);
        const avgDepth = (nodes[i].depth + nodes[j].depth) / 2;
        let alpha = config.maxLineAlpha * (1 - dist / connDist) * avgDepth;

        // Mouse proximity boost for connections
        if (mouseActive) {
          const midX = (nodes[i].x + nodes[j].x) / 2;
          const midY = (nodes[i].y + nodes[j].y) / 2;
          const mDx = midX - mouseX;
          const mDy = midY - mouseY;
          const mDistSq = mDx * mDx + mDy * mDy;
          if (mDistSq < mouseRadSq) {
            const proximity = 1 - Math.sqrt(mDistSq) / config.mouseRadius;
            alpha += config.mouseBoost * proximity;
          }
        }

        const lineWidth = 0.5 + 0.5 * (1 - dist / connDist);

        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(201,201,201,${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // Occasionally spawn a signal pulse along this connection
        if (
          animate &&
          signals.length < config.maxSignals &&
          Math.random() < config.signalChance
        ) {
          const forward = Math.random() > 0.5;
          signals.push({
            fromIdx: forward ? i : j,
            toIdx: forward ? j : i,
            progress: 0,
            speed: 0.008 + Math.random() * 0.007,
          });
        }
      }
    }
  }

  // Draw and advance signal pulses
  for (let s = signals.length - 1; s >= 0; s--) {
    const sig = signals[s];
    const from = nodes[sig.fromIdx];
    const to = nodes[sig.toIdx];

    if (!from || !to) {
      signals.splice(s, 1);
      continue;
    }

    const sx = from.x + (to.x - from.x) * sig.progress;
    const sy = from.y + (to.y - from.y) * sig.progress;

    // Fade in near start, fade out near end
    const fadeIn = Math.min(sig.progress / 0.15, 1);
    const fadeOut = Math.min((1 - sig.progress) / 0.15, 1);
    const sigAlpha = 0.55 * fadeIn * fadeOut;

    // Signal dot
    ctx.beginPath();
    ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,220,220,${sigAlpha})`;
    ctx.fill();

    // Soft glow around the signal
    ctx.beginPath();
    ctx.arc(sx, sy, 4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,220,220,${sigAlpha * 0.12})`;
    ctx.fill();

    sig.progress += sig.speed;
    if (sig.progress >= 1) {
      signals.splice(s, 1);
    }
  }

  // Draw nodes
  for (const node of nodes) {
    const pulse = animate
      ? Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.5 + 0.5
      : 0.5;
    let opacity = (0.25 + pulse * 0.3) * node.depth;

    // Mouse proximity boost for nodes
    if (mouseActive) {
      const mDx = node.x - mouseX;
      const mDy = node.y - mouseY;
      const mDistSq = mDx * mDx + mDy * mDy;
      if (mDistSq < mouseRadSq) {
        const proximity = 1 - Math.sqrt(mDistSq) / config.mouseRadius;
        opacity += config.mouseBoost * proximity;
      }
    }

    // Faint steel tint at pulse peak — #607D8B = rgb(96, 125, 139)
    const tint = pulse * 0.15;
    const nr = Math.round(201 * (1 - tint) + 96 * tint);
    const ng = Math.round(201 * (1 - tint) + 125 * tint);
    const nb = Math.round(201 * (1 - tint) + 139 * tint);

    // Glow ring at pulse peak
    if (pulse > 0.8) {
      const glowAlpha = ((pulse - 0.8) / 0.2) * 0.08 * node.depth;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${nr},${ng},${nb},${glowAlpha})`;
      ctx.fill();
    }

    // Node dot
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${nr},${ng},${nb},${opacity})`;
    ctx.fill();
  }

  // ── Convergence surge ──
  if (surge && animate) {
    const elapsed = time - surge.startTime;
    if (elapsed > SURGE_TOTAL_MS) return;

    const target = nodes[surge.targetIdx];
    if (!target) return;

    // Derive phase and progress from elapsed time
    let phase: "converge" | "flash" | "disperse";
    let phaseProgress: number;
    if (elapsed < SURGE_CONVERGE_MS) {
      phase = "converge";
      phaseProgress = elapsed / SURGE_CONVERGE_MS;
    } else if (elapsed < SURGE_CONVERGE_MS + SURGE_FLASH_MS) {
      phase = "flash";
      phaseProgress = (elapsed - SURGE_CONVERGE_MS) / SURGE_FLASH_MS;
    } else {
      phase = "disperse";
      phaseProgress =
        (elapsed - SURGE_CONVERGE_MS - SURGE_FLASH_MS) / SURGE_DISPERSE_MS;
    }

    // Overall surge intensity for connection brightening
    let surgeIntensity: number;
    if (phase === "converge") {
      surgeIntensity = phaseProgress;
    } else if (phase === "flash") {
      surgeIntensity = 1 - phaseProgress * 0.3;
    } else {
      surgeIntensity = 0.7 * (1 - phaseProgress);
    }

    // Brighten connection lines between target and its neighbors
    for (const nIdx of surge.neighborIndices) {
      const neighbor = nodes[nIdx];
      if (!neighbor) continue;

      const lineAlpha = 0.18 * surgeIntensity;
      ctx.beginPath();
      ctx.moveTo(target.x, target.y);
      ctx.lineTo(neighbor.x, neighbor.y);
      ctx.strokeStyle = `rgba(${STEEL.r},${STEEL.g},${STEEL.b},${lineAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Converge dots (steel, full phase)
    if (phase === "converge") {
      for (const nIdx of surge.neighborIndices) {
        const neighbor = nodes[nIdx];
        if (!neighbor) continue;

        const dotX = neighbor.x + (target.x - neighbor.x) * phaseProgress;
        const dotY = neighbor.y + (target.y - neighbor.y) * phaseProgress;

        const fadeIn = Math.min(phaseProgress / 0.1, 1);
        const fadeOut = Math.min((1 - phaseProgress) / 0.1, 1);
        const dotAlpha = 0.55 * fadeIn * fadeOut;

        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${STEEL.r},${STEEL.g},${STEEL.b},${dotAlpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${STEEL.r},${STEEL.g},${STEEL.b},${dotAlpha * 0.15})`;
        ctx.fill();
      }
    }



    // Golden windmill — burst scales with blade count, smooth settle, spin
    if (phase === "flash") {
      const armLength = 10;
      const burstScale = 2.0;

      // 0–0.17: burst | 0.17–0.48: settle | 0.48–0.49: pause | 0.49–1: spin
      let rotation: number;
      if (phaseProgress < 0.17) {
        rotation = 0;
      } else if (phaseProgress < 0.48) {
        const t = (phaseProgress - 0.163) / 0.317;
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        rotation = eased * Math.PI * 0.4;
      } else if (phaseProgress < 0.49) {
        rotation = Math.PI * 0.4;
      } else {
        const t = (phaseProgress - 0.49) / 0.51;
        // Two-component: t² builds steadily, t⁴ kicks in hard mid-spin
        rotation = Math.PI * 0.4 + (t * t * 2 + t * t * t * t * 4) * Math.PI;
      }

      // Compute blade positions — each blade bursts to its own random distance
      const bladePositions: { bx: number; by: number; angle: number; alpha: number }[] = [];

      for (const spark of surge.sparks) {
        // Per-blade burst distance based on spark.dist
        const sparkBurstScale = burstScale * (spark.dist / 20);
        let bladeRadius: number;
        let angle: number;

        if (phaseProgress < 0.17) {
          const t = phaseProgress / 0.163;
          bladeRadius = armLength * t * sparkBurstScale;
          angle = spark.burstAngle;
        } else if (phaseProgress < 0.48) {
          const t = (phaseProgress - 0.163) / 0.317;
          const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          bladeRadius = armLength * (sparkBurstScale - (sparkBurstScale - 1.0) * eased);
          let diff = spark.ringAngle - spark.burstAngle;
          diff = ((diff + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
          angle = spark.burstAngle + diff * eased;
        } else {
          bladeRadius = armLength;
          angle = spark.ringAngle;
        }
        angle += rotation;

        const fadeIn = Math.min(phaseProgress / 0.08, 1);
        const fadeOut = Math.min((1 - phaseProgress) / 0.12, 1);

        bladePositions.push({
          bx: target.x + Math.cos(angle) * bladeRadius,
          by: target.y + Math.sin(angle) * bladeRadius,
          angle,
          alpha: 0.3 * fadeIn * fadeOut,
        });
      }

      // Draw curved spokes from center to each blade (fade in during settle)
      if (phaseProgress > 0.18) {
        const spokeAlpha =
          phaseProgress < 0.48
            ? ((phaseProgress - 0.163) / 0.317) * 0.18
            : 0.18 * Math.min((1 - phaseProgress) / 0.2, 1);

        for (const bp of bladePositions) {
          // Curved spoke: quadratic bezier from center, curving in spin direction
          const dx = bp.bx - target.x;
          const dy = bp.by - target.y;
          const midDist = Math.sqrt(dx * dx + dy * dy) * 0.5;
          const sweep = Math.PI * 0.15;
          const cpx = target.x + Math.cos(bp.angle + sweep) * midDist;
          const cpy = target.y + Math.sin(bp.angle + sweep) * midDist;

          ctx.beginPath();
          ctx.moveTo(target.x, target.y);
          ctx.quadraticCurveTo(cpx, cpy, bp.bx, bp.by);
          ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${spokeAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Core hub
      const coreAlpha = 0.22 * (1 - Math.max(0, phaseProgress - 0.48) / 0.52);
      ctx.beginPath();
      ctx.arc(target.x, target.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${coreAlpha})`;
      ctx.fill();

      // Draw crescent blades
      for (let i = 0; i < surge.sparks.length; i++) {
        const spark = surge.sparks[i];
        const bp = bladePositions[i];

        // Blade rotation: tangent to formation, sweeping in spin direction
        const bladeRot = bp.angle + Math.PI * 0.5;

        // Interpolate: random during burst → blade tangent during settle (cubic ease-out)
        let cRot: number;
        if (phaseProgress < 0.163) {
          cRot = spark.shapeRotation;
        } else if (phaseProgress < 0.48) {
          const t = (phaseProgress - 0.163) / 0.317;
          const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          let diff = bladeRot - spark.shapeRotation;
          diff = ((diff + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
          cRot = spark.shapeRotation + diff * eased;
        } else {
          cRot = bladeRot;
        }

        // Size: random during burst → uniform during settle (cubic ease-out)
        const uniformSize = 4.5;
        const burstSize = spark.size * 1.5;
        let s: number;
        if (phaseProgress < 0.163) {
          s = burstSize;
        } else if (phaseProgress < 0.48) {
          const t = (phaseProgress - 0.163) / 0.317;
          const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          s = burstSize + (uniformSize - burstSize) * eased;
        } else {
          s = uniformSize;
        }

        // Position crescent so its center sits on the arm
        const cx = bp.bx + Math.cos(cRot) * s * 0.15;
        const cy = bp.by + Math.sin(cRot) * s * 0.15;

        // Wider crescent arc for a blade-like sweep
        ctx.beginPath();
        ctx.arc(cx, cy, s, cRot - Math.PI * 0.5, cRot + Math.PI * 0.5);
        ctx.arc(
          cx + Math.cos(cRot) * s * 0.35,
          cy + Math.sin(cRot) * s * 0.35,
          s * 0.85,
          cRot + Math.PI * 0.45,
          cRot - Math.PI * 0.45,
          true
        );
        ctx.closePath();
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${bp.alpha})`;
        ctx.fill();
      }
    }
  }
}

export function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const configRef = useRef(DESKTOP);
  const isVisibleRef = useRef(true);
  const reducedMotionRef = useRef(false);
  const mouseRef = useRef({ x: -1, y: -1 });
  const surgeRef = useRef<Surge | null>(null);
  const lastSurgeTimeRef = useRef<number>(-7000); // first surge ~5s in

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
    signalsRef.current = [];
    surgeRef.current = null;

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
      renderFrame(
        ctx,
        nodesRef.current,
        signalsRef.current,
        width,
        height,
        configRef.current,
        0,
        false,
        -1,
        -1,
        null
      );
      return () => {
        mql.removeEventListener("change", handleMotionChange);
      };
    }

    // Mouse tracking (desktop only)
    const canvas = canvasRef.current!;
    const parent = canvas.parentElement;

    const handleMouseMove = (e: MouseEvent) => {
      if (configRef.current.mouseRadius <= 0) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
    };

    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Animation loop
    let startTime = performance.now();

    const animate = () => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const currentCtx = currentCanvas.getContext("2d");
      if (!currentCtx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = currentCanvas.width / dpr;
      const h = currentCanvas.height / dpr;
      const time = performance.now() - startTime;

      for (const node of nodesRef.current) {
        updateNode(node, w, h);
      }

      // Surge lifecycle
      if (
        surgeRef.current &&
        time - surgeRef.current.startTime > SURGE_TOTAL_MS
      ) {
        surgeRef.current = null;
      }

      const mouseHovering = mouseRef.current.x >= 0;
      const cooldown = mouseHovering ? 4000 : SURGE_COOLDOWN_MS;

      if (
        !surgeRef.current &&
        time - lastSurgeTimeRef.current > cooldown
      ) {
        const result = findSurgeTarget(
          nodesRef.current,
          configRef.current.connectionDist,
          w
        );
        if (result) {
          const sparkCount = result.neighbors.length;
          const baseAngle = Math.random() * Math.PI * 2;
          const sparks = Array.from({ length: sparkCount }, (_, i) => ({
            burstAngle: Math.random() * Math.PI * 2,
            ringAngle: baseAngle + (i / sparkCount) * Math.PI * 2,
            dist: 12 + Math.random() * 18,
            size: 2.5 + Math.random() * 1.5,
            shapeRotation: Math.random() * Math.PI * 2,
          }));
          surgeRef.current = {
            targetIdx: result.targetIdx,
            neighborIndices: result.neighbors,
            startTime: time,
            sparks,
          };
        }
        lastSurgeTimeRef.current = time;
      }

      renderFrame(
        currentCtx,
        nodesRef.current,
        signalsRef.current,
        w,
        h,
        configRef.current,
        time,
        true,
        mouseRef.current.x,
        mouseRef.current.y,
        surgeRef.current
      );
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // IntersectionObserver: pause when out of view
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
          lastSurgeTimeRef.current = -7000;
          if (reducedMotionRef.current) {
            renderFrame(
              resizeResult.ctx,
              nodesRef.current,
              signalsRef.current,
              resizeResult.width,
              resizeResult.height,
              configRef.current,
              0,
              false,
              -1,
              -1,
              null
            );
          } else {
            rafRef.current = requestAnimationFrame(animate);
          }
        }
      }, 250);
    });

    if (parent) {
      resizeObs.observe(parent);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      intersectionObs.disconnect();
      resizeObs.disconnect();
      mql.removeEventListener("change", handleMotionChange);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
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
