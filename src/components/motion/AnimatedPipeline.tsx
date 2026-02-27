"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types & defaults                                                   */
/* ------------------------------------------------------------------ */

export interface PipelineStep {
  label: string;
  /** Subtitle shown below the label (replaces the type badge when provided) */
  sub?: string;
  /** Controls border color: "agent" = teal, "input"/"output" = navy.
   *  Auto-inferred from position when omitted. */
  type?: "input" | "agent" | "output";
}

const DEFAULT_STEPS: PipelineStep[] = [
  { label: "Clinical Notes", type: "input" },
  { label: "Chart Reader", type: "agent" },
  { label: "Procedure Specialist", type: "agent" },
  { label: "Payer Logic Bot", type: "agent" },
  { label: "Denial Analyst", type: "agent" },
  { label: "837P Claim + Audit Pack", type: "output" },
];

interface AnimatedPipelineProps {
  steps?: PipelineStep[];
  className?: string;
  /** Smaller nodes for dense pipelines (e.g. the 6-step sovereign-rcm overview) */
  compact?: boolean;
}

const STEP_STAGGER = 0.25;
const LINE_DRAW_DURATION = 0.35;

/**
 * Pool of organic pulse configs — segments cycle through these
 * so each connection has a distinct rhythm.
 */
const PULSE_POOL = [
  { duration: 2.4, delay: 0,   anim: "pulse-steady" },
  { duration: 3.2, delay: 0.8, anim: "pulse-pause" },
  { duration: 2.0, delay: 1.6, anim: "pulse-steady" },
  { duration: 3.6, delay: 0.4, anim: "pulse-pause" },
  { duration: 2.8, delay: 1.2, anim: "pulse-steady" },
];

function inferType(index: number, total: number): "input" | "agent" | "output" {
  if (index === 0) return "input";
  if (index === total - 1) return "output";
  return "agent";
}

/* ------------------------------------------------------------------ */
/*  Subcomponents                                                      */
/* ------------------------------------------------------------------ */

function StepNode({
  step,
  index,
  total,
  compact,
}: {
  step: PipelineStep;
  index: number;
  total: number;
  compact: boolean;
}) {
  const type = step.type ?? inferType(index, total);
  const borderColor =
    type === "agent"
      ? "border-teal dark:border-teal-dark"
      : "border-navy dark:border-dark-border";

  const pad = compact ? "px-4 py-3" : "px-5 py-4";
  const labelSize = compact ? "text-sm" : "text-base";
  const subSize = compact ? "text-xs" : "text-sm";
  const badgeSize = compact ? "text-[10px]" : "text-xs";
  const gap = compact ? "mt-0.5" : "mt-1";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            delay: index * STEP_STAGGER,
            ease: "easeOut",
          },
        },
      }}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 bg-white shadow-sm dark:bg-dark-elevated ${pad} ${borderColor}`}
      style={{ minWidth: compact ? "9rem" : "10.5rem" }}
    >
      <span className={`text-center font-bold text-navy dark:text-white ${labelSize}`}>
        {step.label}
      </span>
      {step.sub ? (
        <span className={`${gap} text-center text-charcoal-light dark:text-gray-400 ${subSize}`}>
          {step.sub}
        </span>
      ) : (
        <span className={`${gap} font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${badgeSize}`}>
          {type === "input" ? "Input" : type === "output" ? "Output" : "AI Agent"}
        </span>
      )}
    </motion.div>
  );
}

function StaticStepNode({ step, total, index, compact }: { step: PipelineStep; total: number; index: number; compact: boolean }) {
  const type = step.type ?? inferType(index, total);
  const borderColor =
    type === "agent"
      ? "border-teal dark:border-teal-dark"
      : "border-navy dark:border-dark-border";

  const pad = compact ? "px-4 py-3" : "px-5 py-4";
  const labelSize = compact ? "text-sm" : "text-base";
  const subSize = compact ? "text-xs" : "text-sm";
  const badgeSize = compact ? "text-[10px]" : "text-xs";
  const gap = compact ? "mt-0.5" : "mt-1";

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border-2 bg-white shadow-sm dark:bg-dark-elevated ${pad} ${borderColor}`}
      style={{ minWidth: compact ? "9rem" : "10.5rem" }}
    >
      <span className={`text-center font-bold text-navy dark:text-white ${labelSize}`}>
        {step.label}
      </span>
      {step.sub ? (
        <span className={`${gap} text-center text-charcoal-light dark:text-gray-400 ${subSize}`}>
          {step.sub}
        </span>
      ) : (
        <span className={`${gap} font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${badgeSize}`}>
          {type === "input" ? "Input" : type === "output" ? "Output" : "AI Agent"}
        </span>
      )}
    </div>
  );
}

/** Horizontal connecting line (desktop) with draw animation */
function HLine({ index, revealTotal }: { index: number; revealTotal: number }) {
  const delay = (index + 1) * STEP_STAGGER;
  const pulse = PULSE_POOL[index % PULSE_POOL.length];

  return (
    <div className="relative hidden items-center md:flex" style={{ width: "2.5rem" }}>
      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: {
              duration: LINE_DRAW_DURATION,
              delay,
              ease: "easeOut",
            },
          },
        }}
        className="h-px w-full origin-left bg-teal/25 dark:bg-teal-dark/25"
      />
      <span
        className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-teal/60 dark:bg-teal-dark/60"
        style={{
          opacity: 0,
          animationName: `${pulse.anim}-h`,
          animationDuration: `${pulse.duration}s`,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: `${revealTotal + pulse.delay}s`,
        }}
      />
    </div>
  );
}

/** Vertical connecting line (mobile) with draw animation */
function VLine({ index, revealTotal }: { index: number; revealTotal: number }) {
  const delay = (index + 1) * STEP_STAGGER;
  const pulse = PULSE_POOL[index % PULSE_POOL.length];

  return (
    <div className="relative flex justify-center md:hidden" style={{ height: "2rem" }}>
      <motion.div
        variants={{
          hidden: { scaleY: 0 },
          visible: {
            scaleY: 1,
            transition: {
              duration: LINE_DRAW_DURATION,
              delay,
              ease: "easeOut",
            },
          },
        }}
        className="h-full w-px origin-top bg-teal/25 dark:bg-teal-dark/25"
      />
      <span
        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-teal/60 dark:bg-teal-dark/60"
        style={{
          opacity: 0,
          animationName: `${pulse.anim}-v`,
          animationDuration: `${pulse.duration}s`,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: `${revealTotal + pulse.delay}s`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function AnimatedPipeline({
  steps = DEFAULT_STEPS,
  className = "mt-12",
  compact = false,
}: AnimatedPipelineProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const revealTotal = steps.length * STEP_STAGGER + LINE_DRAW_DURATION;

  /* ── Reduced motion: static pipeline ──────────────────────────── */
  if (prefersReduced) {
    return (
      <div className={className}>
        {/* Desktop */}
        <div className="hidden items-center justify-center gap-3 md:flex">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <StaticStepNode step={step} total={steps.length} index={i} compact={compact} />
              {i < steps.length - 1 && (
                <div className="h-px w-10 bg-teal/25 dark:bg-teal-dark/25" />
              )}
            </div>
          ))}
        </div>
        {/* Mobile */}
        <div className="flex flex-col items-center gap-3 md:hidden">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <StaticStepNode step={step} total={steps.length} index={i} compact={compact} />
              {i < steps.length - 1 && (
                <div className="h-8 w-px bg-teal/25 dark:bg-teal-dark/25" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── Animated pipeline ────────────────────────────────────────── */
  return (
    <>
      {/* CSS keyframes — two variants per axis for organic timing */}
      <style>{`
        /* Steady: smooth travel from start to end */
        @keyframes pulse-steady-h {
          0%   { left: 0; opacity: 0; }
          8%   { opacity: 0.5; }
          92%  { opacity: 0.5; }
          100% { left: calc(100% - 0.5rem); opacity: 0; }
        }
        @keyframes pulse-steady-v {
          0%   { top: 0; opacity: 0; }
          8%   { opacity: 0.5; }
          92%  { opacity: 0.5; }
          100% { top: calc(100% - 0.5rem); opacity: 0; }
        }
        /* Pause: lingers at midpoint before continuing */
        @keyframes pulse-pause-h {
          0%   { left: 0; opacity: 0; }
          8%   { opacity: 0.45; }
          40%  { left: 45%; opacity: 0.5; }
          55%  { left: 50%; opacity: 0.35; }
          92%  { opacity: 0.45; }
          100% { left: calc(100% - 0.5rem); opacity: 0; }
        }
        @keyframes pulse-pause-v {
          0%   { top: 0; opacity: 0; }
          8%   { opacity: 0.45; }
          40%  { top: 45%; opacity: 0.5; }
          55%  { top: 50%; opacity: 0.35; }
          92%  { opacity: 0.45; }
          100% { top: calc(100% - 0.5rem); opacity: 0; }
        }
      `}</style>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: {} }}
        className={className}
      >
        {/* Desktop: horizontal */}
        <div className="hidden items-center justify-center md:flex">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <StepNode step={step} index={i} total={steps.length} compact={compact} />
              {i < steps.length - 1 && <HLine index={i} revealTotal={revealTotal} />}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="flex flex-col items-center md:hidden">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <StepNode step={step} index={i} total={steps.length} compact={compact} />
              {i < steps.length - 1 && <VLine index={i} revealTotal={revealTotal} />}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
