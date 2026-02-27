"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SecurityArchitectureProps {
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BOUNDARY_DRAW = 0.8;
const BOX_STAGGER = 0.3;
const PULSE_DELAY = 1.8;

/*
 * Desktop layout (viewBox 800×340):
 *   Practice boundary: x=60..540 (480px wide, centered-left)
 *   Wall: x=580
 *   Cloud zone: x=620..760
 *   → Total used width: 60..760 = 700, centered in 800 with ~50px margins
 *
 * Mobile layout (viewBox 360×460):
 *   Practice boundary fills width, wall is horizontal, cloud below
 */

/* ------------------------------------------------------------------ */
/*  Desktop coordinates                                                */
/* ------------------------------------------------------------------ */

const D = {
  // viewBox
  vw: 800, vh: 340,
  // Practice Network boundary
  bx: 60, by: 20, bw: 480, bh: 280,
  // Boxes — wider with more spacing so flow labels have room
  boxW: 120, boxH: 56,
  ehrX: 80, ehrY: 120,
  srmX: 250, srmY: 120,
  outX: 400, outY: 120,
  // Wall & cloud
  wallX: 575,
  cloudX: 625, cloudW: 130, cloudH: 150, cloudY: 75,
};

/* ------------------------------------------------------------------ */
/*  Mobile coordinates                                                 */
/* ------------------------------------------------------------------ */

const M = {
  vw: 360, vh: 460,
  bx: 10, by: 10, bw: 340, bh: 290,
  boxW: 170, boxH: 48,
  ehrY: 46, srmY: 130, outY: 214,
  wallY: 310, wallH: 6,
  cloudY: 340, cloudH: 80,
};

/* ------------------------------------------------------------------ */
/*  Shared box SVG subcomponent                                        */
/* ------------------------------------------------------------------ */

function SystemBox({
  x, y, width, height, label, sublabel, fill, strokeColor, textColor,
}: {
  x: number; y: number; width: number; height: number;
  label: string; sublabel?: string;
  fill: string; strokeColor: string; textColor: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={8}
        fill={fill} stroke={strokeColor} strokeWidth={1.5} />
      <text
        x={x + width / 2}
        y={sublabel ? y + height / 2 - 6 : y + height / 2 + 1}
        textAnchor="middle" dominantBaseline="middle"
        className="font-heading text-[11px] font-bold" fill={textColor}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + width / 2} y={y + height / 2 + 10}
          textAnchor="middle" dominantBaseline="middle"
          className="text-[9px]" fill={textColor} opacity={0.7}
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Arrow marker defs                                                  */
/* ------------------------------------------------------------------ */

function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#2E86AB" />
      </marker>
    </defs>
  );
}

/* ------------------------------------------------------------------ */
/*  Blocked Cloud Zone                                                 */
/* ------------------------------------------------------------------ */

function CloudZone({ cx, cy, w, h }: { cx: number; cy: number; w: number; h: number }) {
  const x = cx - w / 2;
  const y = cy - h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12}
        fill="none" stroke="#ccc" strokeWidth={1} strokeDasharray="6 3" />
      <text x={cx} y={cy - 14} textAnchor="middle" className="text-[10px]" fill="#999">
        Internet /
      </text>
      <text x={cx} y={cy} textAnchor="middle" className="text-[10px]" fill="#999">
        Cloud Services
      </text>
      <line x1={cx - 20} y1={cy + 14} x2={cx + 20} y2={cy + 34}
        stroke="#E8614D" strokeWidth={2.5} opacity={0.6} />
      <line x1={cx + 20} y1={cy + 14} x2={cx - 20} y2={cy + 34}
        stroke="#E8614D" strokeWidth={2.5} opacity={0.6} />
      <text x={cx} y={cy + 50} textAnchor="middle"
        className="text-[9px] font-bold" fill="#E8614D" opacity={0.7}>
        BLOCKED
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Static fallback (reduced motion)                                   */
/* ------------------------------------------------------------------ */

function StaticDiagram({ className }: SecurityArchitectureProps) {
  return (
    <div className={className}>
      {/* Desktop */}
      <div className="hidden md:block">
        <svg viewBox={`0 0 ${D.vw} ${D.vh}`} className="mx-auto w-full max-w-4xl" aria-label="Security architecture diagram showing air-gapped data flow">
          <title>Security Architecture — Air-Gapped Data Flow</title>
          <StaticDesktopContent />
        </svg>
      </div>
      {/* Mobile */}
      <div className="md:hidden">
        <svg viewBox={`0 0 ${M.vw} ${M.vh}`} className="mx-auto w-full" aria-label="Security architecture diagram showing air-gapped data flow">
          <title>Security Architecture — Air-Gapped Data Flow</title>
          <StaticMobileContent />
        </svg>
      </div>
    </div>
  );
}

function StaticDesktopContent() {
  const midY = D.ehrY + D.boxH / 2;
  return (
    <g>
      <ArrowDefs id="ah" />
      {/* Boundary */}
      <rect x={D.bx} y={D.by} width={D.bw} height={D.bh} rx={16}
        fill="rgba(46,134,171,0.04)" stroke="rgba(46,134,171,0.3)" strokeWidth={2} strokeDasharray="8 4" />
      <text x={D.bx + 12} y={D.by + 20} className="font-heading text-[11px] font-bold" fill="#2E86AB" opacity={0.8}>
        Practice Network
      </text>
      {/* Boxes */}
      <SystemBox x={D.ehrX} y={D.ehrY} width={D.boxW} height={D.boxH}
        label="EHR System" fill="#F0F6FA" strokeColor="#1B2A4A" textColor="#1B2A4A" />
      <SystemBox x={D.srmX} y={D.srmY} width={D.boxW} height={D.boxH}
        label="Sovereign RCM" sublabel="AI Appliance" fill="#1B2A4A" strokeColor="#2E86AB" textColor="white" />
      <SystemBox x={D.outX} y={D.outY} width={D.boxW} height={D.boxH}
        label="837P Claim" sublabel="Output" fill="#F0F6FA" strokeColor="#2E86AB" textColor="#1B2A4A" />
      {/* Arrows */}
      <line x1={D.ehrX + D.boxW} y1={midY} x2={D.srmX} y2={midY}
        stroke="#2E86AB" strokeWidth={1.5} markerEnd="url(#ah)" />
      <line x1={D.srmX + D.boxW} y1={midY} x2={D.outX} y2={midY}
        stroke="#2E86AB" strokeWidth={1.5} markerEnd="url(#ah)" />
      {/* Labels */}
      <text x={(D.ehrX + D.boxW + D.srmX) / 2} y={midY - 18} textAnchor="middle" className="text-[11px]" fill="#2E86AB">Clinical Notes</text>
      <text x={(D.srmX + D.boxW + D.outX) / 2} y={midY - 18} textAnchor="middle" className="text-[11px]" fill="#2E86AB">Formatted Claim</text>
      {/* Wall */}
      <rect x={D.wallX} y={D.by + 10} width={8} height={D.bh - 20} rx={4} fill="#E8614D" opacity={0.8} />
      <text x={D.wallX + 4} y={D.by + D.bh + 8} textAnchor="middle" className="font-heading text-[10px] font-bold" fill="#E8614D">AIR GAP</text>
      {/* Cloud */}
      <g opacity={0.4}>
        <CloudZone cx={D.cloudX + D.cloudW / 2} cy={D.cloudY + D.cloudH / 2} w={D.cloudW} h={D.cloudH} />
      </g>
    </g>
  );
}

function StaticMobileContent() {
  const cx = M.bx + M.bw / 2 - M.boxW / 2;
  const midX = cx + M.boxW / 2;
  return (
    <g>
      <ArrowDefs id="ah-m" />
      {/* Boundary */}
      <rect x={M.bx} y={M.by} width={M.bw} height={M.bh} rx={16}
        fill="rgba(46,134,171,0.04)" stroke="rgba(46,134,171,0.3)" strokeWidth={2} strokeDasharray="8 4" />
      <text x={M.bx + 12} y={M.by + 20} className="font-heading text-[11px] font-bold" fill="#2E86AB" opacity={0.8}>
        Practice Network
      </text>
      {/* Boxes */}
      <SystemBox x={cx} y={M.ehrY} width={M.boxW} height={M.boxH}
        label="EHR System" fill="#F0F6FA" strokeColor="#1B2A4A" textColor="#1B2A4A" />
      <SystemBox x={cx} y={M.srmY} width={M.boxW} height={M.boxH}
        label="Sovereign RCM" sublabel="AI Appliance" fill="#1B2A4A" strokeColor="#2E86AB" textColor="white" />
      <SystemBox x={cx} y={M.outY} width={M.boxW} height={M.boxH}
        label="837P Claim Output" fill="#F0F6FA" strokeColor="#2E86AB" textColor="#1B2A4A" />
      {/* Arrows */}
      <line x1={midX} y1={M.ehrY + M.boxH} x2={midX} y2={M.srmY}
        stroke="#2E86AB" strokeWidth={1.5} markerEnd="url(#ah-m)" />
      <line x1={midX} y1={M.srmY + M.boxH} x2={midX} y2={M.outY}
        stroke="#2E86AB" strokeWidth={1.5} markerEnd="url(#ah-m)" />
      {/* Wall */}
      <rect x={M.bx + 20} y={M.wallY} width={M.bw - 40} height={M.wallH} rx={3} fill="#E8614D" opacity={0.8} />
      <text x={M.bx + M.bw / 2} y={M.wallY + 20} textAnchor="middle" className="font-heading text-[10px] font-bold" fill="#E8614D">AIR GAP</text>
      {/* Cloud */}
      <g opacity={0.4}>
        <CloudZone cx={M.bx + M.bw / 2} cy={M.cloudY + M.cloudH / 2} w={M.bw - 80} h={M.cloudH} />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function SecurityArchitecture({
  className = "mt-12 mb-4",
}: SecurityArchitectureProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  if (prefersReduced) {
    return <StaticDiagram className={className} />;
  }

  return (
    <>
      <style>{`
        @keyframes wall-glow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(232,97,77,0.2)); }
          50% { filter: drop-shadow(0 0 10px rgba(232,97,77,0.4)); }
        }
      `}</style>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: {} }}
        className={className}
      >
        {/* Desktop */}
        <div className="hidden md:block">
          <svg viewBox={`0 0 ${D.vw} ${D.vh}`} className="mx-auto w-full max-w-4xl" role="img" aria-label="Security architecture diagram showing air-gapped data flow">
            <title>Security Architecture — Air-Gapped Data Flow</title>
            <AnimatedDesktopDiagram />
          </svg>
        </div>
        {/* Mobile */}
        <div className="md:hidden">
          <svg viewBox={`0 0 ${M.vw} ${M.vh}`} className="mx-auto w-full" role="img" aria-label="Security architecture diagram showing air-gapped data flow">
            <title>Security Architecture — Air-Gapped Data Flow</title>
            <AnimatedMobileDiagram />
          </svg>
        </div>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Desktop Diagram                                           */
/* ------------------------------------------------------------------ */

function AnimatedDesktopDiagram() {
  const midY = D.ehrY + D.boxH / 2;

  return (
    <g>
      <ArrowDefs id="ah" />

      {/* Practice network boundary — draws in */}
      <motion.rect
        x={D.bx} y={D.by} width={D.bw} height={D.bh} rx={16}
        fill="rgba(46,134,171,0.04)" stroke="rgba(46,134,171,0.3)" strokeWidth={2}
        strokeDasharray="8 4"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: BOUNDARY_DRAW, ease: "easeOut" } },
        }}
      />
      <motion.text
        x={D.bx + 12} y={D.by + 20}
        className="font-heading text-[11px] font-bold" fill="#2E86AB"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.8, transition: { delay: 0.3, duration: 0.3 } },
        }}
      >
        Practice Network
      </motion.text>

      {/* EHR box */}
      <motion.g variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { delay: BOX_STAGGER, duration: 0.4 } },
      }}>
        <SystemBox x={D.ehrX} y={D.ehrY} width={D.boxW} height={D.boxH}
          label="EHR System" fill="#F0F6FA" strokeColor="#1B2A4A" textColor="#1B2A4A" />
      </motion.g>

      {/* Sovereign RCM box */}
      <motion.g variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { delay: BOX_STAGGER * 2, duration: 0.4 } },
      }}>
        <SystemBox x={D.srmX} y={D.srmY} width={D.boxW} height={D.boxH}
          label="Sovereign RCM" sublabel="AI Appliance" fill="#1B2A4A" strokeColor="#2E86AB" textColor="white" />
      </motion.g>

      {/* 837P output box */}
      <motion.g variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { delay: BOX_STAGGER * 3, duration: 0.4 } },
      }}>
        <SystemBox x={D.outX} y={D.outY} width={D.boxW} height={D.boxH}
          label="837P Claim" sublabel="Output" fill="#F0F6FA" strokeColor="#2E86AB" textColor="#1B2A4A" />
      </motion.g>

      {/* Flow arrows */}
      <motion.line
        x1={D.ehrX + D.boxW} y1={midY} x2={D.srmX} y2={midY}
        stroke="#2E86AB" strokeWidth={1.5} markerEnd="url(#ah)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { delay: BOX_STAGGER * 1.5, duration: 0.3 } },
        }}
      />
      <motion.line
        x1={D.srmX + D.boxW} y1={midY} x2={D.outX} y2={midY}
        stroke="#2E86AB" strokeWidth={1.5} markerEnd="url(#ah)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { delay: BOX_STAGGER * 2.5, duration: 0.3 } },
        }}
      />

      {/* Flow labels */}
      <motion.text
        x={(D.ehrX + D.boxW + D.srmX) / 2} y={midY - 18}
        textAnchor="middle" className="text-[11px]" fill="#2E86AB"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: BOX_STAGGER * 2, duration: 0.3 } },
        }}
      >
        Clinical Notes
      </motion.text>
      <motion.text
        x={(D.srmX + D.boxW + D.outX) / 2} y={midY - 18}
        textAnchor="middle" className="text-[11px]" fill="#2E86AB"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: BOX_STAGGER * 3, duration: 0.3 } },
        }}
      >
        Formatted Claim
      </motion.text>

      {/* Pulse dots on flow paths */}
      <path id="flow1" d={`M${D.ehrX + D.boxW},${midY} L${D.srmX},${midY}`} fill="none" />
      <path id="flow2" d={`M${D.srmX + D.boxW},${midY} L${D.outX},${midY}`} fill="none" />
      <circle r={3} fill="#2E86AB" opacity={0.6}>
        <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${PULSE_DELAY}s`}>
          <mpath xlinkHref="#flow1" />
        </animateMotion>
      </circle>
      <circle r={3} fill="#2E86AB" opacity={0.6}>
        <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${PULSE_DELAY + 1.2}s`}>
          <mpath xlinkHref="#flow2" />
        </animateMotion>
      </circle>

      {/* Air Gap Wall */}
      <motion.g
        variants={{
          hidden: { opacity: 0, x: 10 },
          visible: { opacity: 1, x: 0, transition: { delay: BOX_STAGGER * 3.5, duration: 0.4 } },
        }}
        style={{ animationName: "wall-glow", animationDuration: "3s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: `${PULSE_DELAY}s` }}
      >
        <rect x={D.wallX} y={D.by + 10} width={8} height={D.bh - 20} rx={4} fill="#E8614D" opacity={0.8} />
        <text x={D.wallX + 4} y={D.by + D.bh + 8} textAnchor="middle" className="font-heading text-[10px] font-bold" fill="#E8614D">AIR GAP</text>
      </motion.g>

      {/* Blocked Cloud zone */}
      <motion.g
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.4, transition: { delay: BOX_STAGGER * 4, duration: 0.5 } },
        }}
      >
        <CloudZone cx={D.cloudX + D.cloudW / 2} cy={D.cloudY + D.cloudH / 2} w={D.cloudW} h={D.cloudH} />
      </motion.g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Mobile Diagram                                            */
/* ------------------------------------------------------------------ */

function AnimatedMobileDiagram() {
  const cx = M.bx + M.bw / 2 - M.boxW / 2;
  const midX = cx + M.boxW / 2;

  return (
    <g>
      <ArrowDefs id="ah-m" />

      {/* Practice network boundary */}
      <motion.rect
        x={M.bx} y={M.by} width={M.bw} height={M.bh} rx={16}
        fill="rgba(46,134,171,0.04)" stroke="rgba(46,134,171,0.3)" strokeWidth={2}
        strokeDasharray="8 4"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: BOUNDARY_DRAW, ease: "easeOut" } },
        }}
      />
      <motion.text
        x={M.bx + 12} y={M.by + 20}
        className="font-heading text-[11px] font-bold" fill="#2E86AB"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.8, transition: { delay: 0.3, duration: 0.3 } },
        }}
      >
        Practice Network
      </motion.text>

      {/* Boxes */}
      <motion.g variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { delay: BOX_STAGGER, duration: 0.4 } },
      }}>
        <SystemBox x={cx} y={M.ehrY} width={M.boxW} height={M.boxH}
          label="EHR System" fill="#F0F6FA" strokeColor="#1B2A4A" textColor="#1B2A4A" />
      </motion.g>
      <motion.g variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { delay: BOX_STAGGER * 2, duration: 0.4 } },
      }}>
        <SystemBox x={cx} y={M.srmY} width={M.boxW} height={M.boxH}
          label="Sovereign RCM" sublabel="AI Appliance" fill="#1B2A4A" strokeColor="#2E86AB" textColor="white" />
      </motion.g>
      <motion.g variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { delay: BOX_STAGGER * 3, duration: 0.4 } },
      }}>
        <SystemBox x={cx} y={M.outY} width={M.boxW} height={M.boxH}
          label="837P Claim Output" fill="#F0F6FA" strokeColor="#2E86AB" textColor="#1B2A4A" />
      </motion.g>

      {/* Vertical arrows */}
      <motion.line
        x1={midX} y1={M.ehrY + M.boxH} x2={midX} y2={M.srmY}
        stroke="#2E86AB" strokeWidth={1.5} markerEnd="url(#ah-m)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { delay: BOX_STAGGER * 1.5, duration: 0.3 } },
        }}
      />
      <motion.line
        x1={midX} y1={M.srmY + M.boxH} x2={midX} y2={M.outY}
        stroke="#2E86AB" strokeWidth={1.5} markerEnd="url(#ah-m)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { delay: BOX_STAGGER * 2.5, duration: 0.3 } },
        }}
      />

      {/* Air Gap Wall (horizontal) */}
      <motion.g
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { delay: BOX_STAGGER * 3.5, duration: 0.4 } },
        }}
      >
        <rect x={M.bx + 20} y={M.wallY} width={M.bw - 40} height={M.wallH} rx={3} fill="#E8614D" opacity={0.8} />
        <text x={M.bx + M.bw / 2} y={M.wallY + 20} textAnchor="middle" className="font-heading text-[10px] font-bold" fill="#E8614D">AIR GAP</text>
      </motion.g>

      {/* Blocked Cloud zone */}
      <motion.g
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.4, transition: { delay: BOX_STAGGER * 4, duration: 0.5 } },
        }}
      >
        <CloudZone cx={M.bx + M.bw / 2} cy={M.cloudY + M.cloudH / 2} w={M.bw - 80} h={M.cloudH} />
      </motion.g>
    </g>
  );
}
