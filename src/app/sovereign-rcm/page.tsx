import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  AnimatedHero,
  AnimatedPipeline,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Sovereign RCM — On-Premise AI Billing Appliance",
  description:
    "Sovereign RCM is an on-premise, air-gapped AI appliance that drafts compliant 837P claims from clinical notes. No PHI leaves your building. Fixed cost, full transparency.",
  openGraph: {
    title: "Sovereign RCM — On-Premise AI Billing Appliance",
    description:
      "On-premise AI that drafts compliant claims, catches undercoding, and keeps PHI inside your practice.",
    url: "https://rizexcapital.com/sovereign-rcm",
  },
  alternates: {
    canonical: "https://rizexcapital.com/sovereign-rcm",
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Leak {
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const tripleLeaks: Leak[] = [
  {
    label: "Cost Leak",
    title: "Billing Overhead",
    description:
      "Outsourced billing charges 4\u201310% of collections \u2014 a perpetual tax that grows as your practice grows. Solo practitioners pay the highest rates at 10.9% (AMA 2024).",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Revenue Leak",
    title: "Undercoding Loss",
    description:
      "Physicians lose $30K+ per provider per year from systematic undercoding (AAFP). Conservative coding defaults and 30%+ annual coder turnover compound the problem.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: "Security Leak",
    title: "PHI Exposure",
    description:
      "The 2024 Change Healthcare breach exposed 192.7 million records. Cloud-based billing centralizes PHI into attack surfaces you don\u2019t control.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9.5 12.5 8 14l4 4 6-8-1.5-1.5L12 14z" className="hidden" />
      </svg>
    ),
  },
];

interface Agent {
  name: string;
  description: string;
  icon: ReactNode;
}

const agents: Agent[] = [
  {
    name: "Chart Reader",
    description:
      "Extracts clinical detail from signed notes \u2014 diagnoses, procedures, medical decision-making complexity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    name: "Procedure Specialist",
    description:
      "Assigns CPT and ICD-10 codes based on documentation, matching procedure complexity to the correct billing level.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "Payer Logic Bot",
    description:
      "Applies payer-specific rules, modifier requirements, and prior authorization logic before submission.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M6 8h.01M10 8h.01" />
      </svg>
    ),
  },
  {
    name: "Denial Analyst",
    description:
      "Identifies denial patterns across your claim history and flags root causes before claims go out.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
      </svg>
    ),
  },
];

interface Specialty {
  name: string;
  fit: string;
  icon: ReactNode;
}

const specialties: Specialty[] = [
  {
    name: "Emergency Medicine",
    fit: "High-acuity E/M coding, time-critical documentation, complex modifier requirements.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-coral">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: "Orthopedics",
    fit: "Procedure-heavy workflows, modifier-intensive billing, surgical vs. conservative care distinctions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-coral">
        <path d="M18 2l-3 3-2-2-4 4 2 2-5 5-2-2-3 3 4 4 3-3-2-2 5-5 2 2 4-4-2-2 3-3z" />
      </svg>
    ),
  },
  {
    name: "Cardiology",
    fit: "Complex E/M levels combined with procedural coding, multi-component encounters.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-coral">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: "Pain Management",
    fit: "High documentation burden, frequent prior authorizations, injection and procedure stacking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-coral">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: "Dermatology",
    fit: "High visit volume, undercoding risk on destruction vs. excision, modifier-sensitive procedures.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-coral">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <circle cx="11" cy="11" r="3" />
      </svg>
    ),
  },
  {
    name: "Multi-Specialty Groups",
    fit: "SR-2/SR-3 scale, cross-specialty coding rules, unified billing across departments.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-coral">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

interface Differentiator {
  title: string;
  description: string;
  icon: ReactNode;
}

const differentiators: Differentiator[] = [
  {
    title: "Air-Gapped Security",
    description:
      "No cloud, no external API calls. PHI is processed locally and never transmitted. Only the final 837P claim leaves your facility.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Fixed Cost, Not a Tax",
    description:
      "One-time capital expenditure. No monthly subscription, no percentage of collections. Cost stays flat as your practice grows.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Per-Claim Evidence Trail",
    description:
      "Every coding decision includes the clinical documentation that supports it. Full rationale, not just a code assignment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Owned, Not Rented",
    description:
      "You own the hardware and all data on it. No vendor lock-in, no data hostage, no switching costs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

interface SubPage {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

const subPages: SubPage[] = [
  {
    title: "How It Works",
    description: "Step-by-step walkthrough of the four-agent AI pipeline.",
    href: "/sovereign-rcm/how-it-works",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "Security & HIPAA",
    description: "How the air-gapped architecture protects your practice.",
    href: "/sovereign-rcm/security",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "90-Day Pilot Program",
    description: "Prove the value in shadow mode before you commit.",
    href: "/sovereign-rcm/pilot-program",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "vs. Outsourced Billing",
    description: "Why fixed-cost AI outperforms percentage-based billing companies.",
    href: "/sovereign-rcm/vs-outsourced-billing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal">
        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
      </svg>
    ),
  },
  {
    title: "vs. Cloud RCM",
    description: "Why on-premise beats cloud-hosted billing platforms.",
    href: "/sovereign-rcm/vs-cloud-rcm",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal">
        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
      </svg>
    ),
  },
  {
    title: "ROI Calculator",
    description: "Estimate your annual revenue leakage and recovery potential.",
    href: "/sovereign-rcm/roi-calculator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="10" y2="10" />
        <line x1="14" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="10" y2="14" />
        <line x1="14" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="16" y2="18" />
      </svg>
    ),
  },
];


/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SovereignRCM() {
  return (
    <>
      {/* ── 1. Hero (navy) ───────────────────────────────────────── */}
      <AnimatedHero className="bg-navy px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                On-Premise AI That Owns Your Revenue Cycle
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Sovereign RCM is an air-gapped AI appliance installed inside your
                practice. It reads clinical notes, drafts compliant 837P claims,
                catches undercoding, and builds audit-ready evidence packs
                &mdash;&nbsp;without patient data ever leaving the building.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-lg bg-coral px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-coral-hover"
                >
                  Request a Billing Analysis
                </Link>
                <Link
                  href="/sovereign-rcm/how-it-works"
                  className="rounded-lg border border-white/30 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  See How It Works
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </AnimatedHero>

      {/* ── 2. The Problem — Triple Leak (white) ─────────────────── */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              The Triple Leak
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Medical practices lose revenue in three compounding ways. Most never
              see the full picture until they measure it.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {tripleLeaks.map((leak) => (
              <StaggerItem key={leak.title}>
                <div className="flex h-full flex-col rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <div className="flex items-center gap-3">
                    {leak.icon}
                    <span className="text-xs font-semibold uppercase tracking-wider text-coral">
                      {leak.label}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-navy dark:text-white">
                    {leak.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                    {leak.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ── 3. Multi-Agent Pipeline (ice) ────────────────────────── */}
      <section id="pipeline" className="scroll-mt-24 bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              The Multi-Agent Pipeline
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Four specialized AI agents work in sequence — each focused on one
              stage of the billing workflow, each passing structured output to the
              next.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => (
              <StaggerItem key={agent.name}>
                <div className="flex h-full flex-col rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  {agent.icon}
                  <h3 className="mt-4 font-heading text-lg font-bold text-navy dark:text-white">
                    {agent.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                    {agent.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Animated pipeline flow visualization */}
          <AnimatedPipeline compact />
        </div>
      </section>

      {/* ── 4. Built for Your Specialty (white) ──────────────────── */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Built for Your Specialty
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Sovereign RCM is trained on specialty-specific coding patterns,
              modifier rules, and payer logic for the specialties that lose the
              most to billing inefficiency.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {specialties.map((s) => (
              <StaggerItem key={s.name}>
                <div className="flex h-full flex-col rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <div className="flex items-center gap-2.5">
                    {s.icon}
                    <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                      {s.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                    {s.fit}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ── 5. Why On-Premise (ice) ──────────────────────────────── */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Why On-Premise
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Sovereign RCM is not cloud software repackaged as a local install.
              It was designed from day one to run inside your building, on hardware
              you own.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {differentiators.map((d) => (
              <StaggerItem key={d.title}>
                <div className="flex h-full flex-col rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  {d.icon}
                  <h3 className="mt-4 font-heading text-lg font-bold text-navy dark:text-white">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                    {d.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 6. Explore Sovereign RCM (white) ─────────────────────── */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Explore Sovereign RCM
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Dive deeper into specific topics — security architecture, the pilot
              process, competitive comparisons, and more.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subPages.map((page) => (
              <StaggerItem key={page.href}>
                <Link href={page.href} className="block h-full">
                  <HoverCard className="flex h-full flex-col justify-between rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                    <div>
                      <div className="flex items-center gap-2.5">
                        {page.icon}
                        <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                          {page.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                        {page.description}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal dark:text-teal-dark">
                      Learn more
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </HoverCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="dark" />

      {/* ── 7. CTA (navy) ────────────────────────────────────────── */}
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white">
              Ready to Take Control of Your Revenue Cycle?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Start with a free billing analysis. We&apos;ll show you exactly
              where your practice is losing revenue.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-coral px-10 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover"
              >
                Request a Billing Analysis
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
