"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TimelinePhase {
  number: string;
  title: string;
  duration: string;
  description: string;
  /** Optional weight for duration bar width. Auto-parsed from duration if omitted. */
  weight?: number;
}

interface AnimatedTimelineProps {
  phases: TimelinePhase[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const NODE_STAGGER = 0.25;
const LINE_DURATION = 0.6;

/** Parse "Weeks 3–8" → 6, "Weeks 1–2" → 2, etc. */
function parseWeeks(duration: string): number {
  const match = duration.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (match) return parseInt(match[2]) - parseInt(match[1]) + 1;
  const single = duration.match(/Week\s+(\d+)/i);
  if (single) return 1;
  return 2; // fallback
}

function getWeight(phase: TimelinePhase): number {
  return phase.weight ?? parseWeeks(phase.duration);
}

/* ------------------------------------------------------------------ */
/*  Static fallback                                                    */
/* ------------------------------------------------------------------ */

function StaticTimeline({ phases, className }: AnimatedTimelineProps) {
  const maxWeight = Math.max(...phases.map(getWeight));

  return (
    <div className={className}>
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-6 top-0 hidden h-full w-px bg-teal/25 dark:bg-teal-dark/25 md:left-1/2 md:block" />
        <div className="absolute left-6 top-0 h-full w-px bg-teal/25 dark:bg-teal-dark/25 md:hidden" />

        <div className="space-y-8 md:space-y-12">
          {phases.map((phase, i) => {
            const isLeft = i % 2 === 0;
            const widthPct = (getWeight(phase) / maxWeight) * 100;

            return (
              <div
                key={phase.number}
                className="relative pl-16 md:pl-0"
              >
                {/* Mobile node dot */}
                <div className="absolute left-4 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy dark:bg-teal md:hidden">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>

                {/* Desktop layout */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-8">
                  {isLeft ? (
                    <>
                      <div className="text-right">
                        <PhaseContent phase={phase} widthPct={widthPct} align="right" />
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div>
                        <PhaseContent phase={phase} widthPct={widthPct} align="left" />
                      </div>
                    </>
                  )}
                </div>


                {/* Mobile layout */}
                <div className="md:hidden">
                  <PhaseContent phase={phase} widthPct={widthPct} align="left" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PhaseContent({
  phase,
  widthPct,
  align,
}: {
  phase: TimelinePhase;
  widthPct: number;
  align: "left" | "right";
}) {
  return (
    <div>
      <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
        {phase.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-teal dark:text-teal-dark">
        {phase.duration}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
        {phase.description}
      </p>
      <div className={`mt-3 flex ${align === "right" ? "justify-end" : "justify-start"}`}>
        <div
          className="h-1.5 rounded-full bg-teal/20 dark:bg-teal-dark/20"
          style={{ width: `${widthPct}%`, minWidth: "2rem", maxWidth: "100%" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Component                                                 */
/* ------------------------------------------------------------------ */

export function AnimatedTimeline({
  phases,
  className = "mt-12",
}: AnimatedTimelineProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  if (prefersReduced) {
    return <StaticTimeline phases={phases} className={className} />;
  }

  const maxWeight = Math.max(...phases.map(getWeight));
  const totalReveal = phases.length * NODE_STAGGER + LINE_DURATION;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: {} }}
      className={className}
    >
      <div className="relative">
        {/* Desktop center line — draws downward */}
        <motion.div
          variants={{
            hidden: { scaleY: 0 },
            visible: {
              scaleY: 1,
              transition: {
                duration: totalReveal,
                ease: "easeOut",
              },
            },
          }}
          className="absolute left-1/2 top-0 hidden h-full w-px origin-top bg-teal/25 dark:bg-teal-dark/25 md:block"
        />

        {/* Mobile left line — draws downward */}
        <motion.div
          variants={{
            hidden: { scaleY: 0 },
            visible: {
              scaleY: 1,
              transition: {
                duration: totalReveal,
                ease: "easeOut",
              },
            },
          }}
          className="absolute left-6 top-0 h-full w-px origin-top bg-teal/25 dark:bg-teal-dark/25 md:hidden"
        />

        <div className="space-y-8 md:space-y-12">
          {phases.map((phase, i) => {
            const isLeft = i % 2 === 0;
            const widthPct = (getWeight(phase) / maxWeight) * 100;
            const nodeDelay = i * NODE_STAGGER;

            return (
              <div
                key={phase.number}
                className="relative pl-16 md:pl-0"
              >
                {/* Mobile node dot */}
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                        delay: nodeDelay,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className="absolute left-4 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy dark:bg-teal md:hidden"
                >
                  <div className="h-2 w-2 rounded-full bg-white" />
                </motion.div>

                {/* Desktop layout */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-8">
                  {isLeft ? (
                    <>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: -30 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: {
                              duration: 0.45,
                              delay: nodeDelay,
                              ease: "easeOut",
                            },
                          },
                        }}
                        className="text-right"
                      >
                        <AnimatedPhaseContent
                          phase={phase}
                          widthPct={widthPct}
                          align="right"
                          delay={nodeDelay + 0.3}
                        />
                      </motion.div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: 30 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: {
                              duration: 0.45,
                              delay: nodeDelay,
                              ease: "easeOut",
                            },
                          },
                        }}
                      >
                        <AnimatedPhaseContent
                          phase={phase}
                          widthPct={widthPct}
                          align="left"
                          delay={nodeDelay + 0.3}
                        />
                      </motion.div>
                    </>
                  )}
                </div>


                {/* Mobile layout */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                        delay: nodeDelay,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className="md:hidden"
                >
                  <AnimatedPhaseContent
                    phase={phase}
                    widthPct={widthPct}
                    align="left"
                    delay={nodeDelay + 0.3}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedPhaseContent({
  phase,
  widthPct,
  align,
  delay,
}: {
  phase: TimelinePhase;
  widthPct: number;
  align: "left" | "right";
  delay: number;
}) {
  return (
    <div>
      <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
        {phase.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-teal dark:text-teal-dark">
        {phase.duration}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
        {phase.description}
      </p>
      <div className={`mt-3 flex ${align === "right" ? "justify-end" : "justify-start"}`}>
        <motion.div
          variants={{
            hidden: { width: 0 },
            visible: {
              width: `${widthPct}%`,
              transition: {
                duration: 0.5,
                delay,
                ease: "easeOut",
              },
            },
          }}
          className="h-1.5 rounded-full bg-teal/20 dark:bg-teal-dark/20"
          style={{ minWidth: 0, maxWidth: "100%" }}
        />
      </div>
    </div>
  );
}
