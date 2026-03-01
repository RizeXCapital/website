"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Tooltip from "@/components/Tooltip";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ComparisonRow {
  category: string;
  tooltip?: string;
  sovereign: string;
  competitor: string;
}

interface AnimatedComparisonTableProps {
  rows: ComparisonRow[];
  sovereignLabel?: string;
  competitorLabel?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROW_STAGGER = 0.08;
const HEADER_DURATION = 0.4;

/* ------------------------------------------------------------------ */
/*  Static fallback (reduced motion)                                   */
/* ------------------------------------------------------------------ */

function StaticTable({
  rows,
  sovereignLabel,
  competitorLabel,
  className,
}: AnimatedComparisonTableProps) {
  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-dark-border">
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr className="bg-navy">
              <th className="sticky left-0 z-10 w-[18%] bg-navy px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]">
                Category
              </th>
              <th className="bg-teal/20 px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-teal-light">
                {sovereignLabel}
              </th>
              <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-gray-300">
                {competitorLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.category}
                className={
                  i % 2 === 0
                    ? "bg-white dark:bg-dark-bg"
                    : "bg-ice dark:bg-dark-surface"
                }
              >
                <td
                  className={`sticky left-0 z-10 px-6 py-4 font-heading text-sm font-bold text-navy shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] dark:text-white ${
                    i % 2 === 0
                      ? "bg-white dark:bg-dark-bg"
                      : "bg-ice dark:bg-dark-surface"
                  }`}
                >
                  {row.tooltip ? (
                    <Tooltip text={row.tooltip}>{row.category}</Tooltip>
                  ) : (
                    row.category
                  )}
                </td>
                <td className="bg-teal/5 px-6 py-4 text-sm font-medium text-teal dark:bg-teal/10 dark:text-teal-dark">
                  {row.sovereign}
                </td>
                <td className="px-6 py-4 text-sm text-charcoal-light dark:text-gray-300">
                  {row.competitor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function AnimatedComparisonTable({
  rows,
  sovereignLabel = "Sovereign RCM",
  competitorLabel = "Cloud SaaS",
  className = "mt-12",
}: AnimatedComparisonTableProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  if (prefersReduced) {
    return (
      <StaticTable
        rows={rows}
        sovereignLabel={sovereignLabel}
        competitorLabel={competitorLabel}
        className={className}
      />
    );
  }

  const totalReveal = HEADER_DURATION + rows.length * ROW_STAGGER;

  return (
    <>
      <style>{`
        @keyframes teal-glow {
          0%, 100% { box-shadow: inset 0 0 0 rgba(46,134,171,0); }
          50% { box-shadow: inset 0 0 12px rgba(46,134,171,0.08); }
        }
      `}</style>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: {} }}
        className={className}
      >
        <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-dark-border">
          <table className="w-full min-w-[500px] text-left">
            <motion.thead
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: HEADER_DURATION, ease: "easeOut" },
                },
              }}
            >
              <tr className="bg-navy">
                <th className="sticky left-0 z-10 w-[18%] bg-navy px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]">
                  Category
                </th>
                <th className="bg-teal/20 px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-teal-light">
                  {sovereignLabel}
                </th>
                <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-gray-300">
                  {competitorLabel}
                </th>
              </tr>
            </motion.thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.category}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.4,
                        delay: HEADER_DURATION + i * ROW_STAGGER,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className={
                    i % 2 === 0
                      ? "bg-white dark:bg-dark-bg"
                      : "bg-ice dark:bg-dark-surface"
                  }
                >
                  <td
                    className={`sticky left-0 z-10 px-6 py-4 font-heading text-sm font-bold text-navy shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] dark:text-white ${
                      i % 2 === 0
                        ? "bg-white dark:bg-dark-bg"
                        : "bg-ice dark:bg-dark-surface"
                    }`}
                  >
                    {row.tooltip ? (
                      <Tooltip text={row.tooltip}>{row.category}</Tooltip>
                    ) : (
                      row.category
                    )}
                  </td>
                  <td
                    className="bg-teal/5 px-6 py-4 text-sm font-medium text-teal dark:bg-teal/10 dark:text-teal-dark"
                    style={{
                      animationName: "teal-glow",
                      animationDuration: "3s",
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                      animationDelay: `${totalReveal + 0.5}s`,
                    }}
                  >
                    {row.sovereign}
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal-light dark:text-gray-300">
                    {row.competitor}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}
