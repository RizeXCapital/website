import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import FaqItem from "@/components/FaqItem";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "How It Works — Sovereign RCM Pipeline",
  description:
    "Step-by-step walkthrough of Sovereign RCM's multi-agent AI pipeline. Four specialized agents turn clinical notes into compliant 837P claims with full evidence tracing.",
  openGraph: {
    title: "How It Works — Sovereign RCM Pipeline",
    description:
      "Four AI agents process clinical notes into compliant claims — on-premise, air-gapped, every decision documented.",
    url: "https://rizexcapital.com/sovereign-rcm/how-it-works",
  },
  alternates: {
    canonical: "https://rizexcapital.com/sovereign-rcm/how-it-works",
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface PipelineStep {
  number: string;
  label: string;
  description: string;
  dataIn: string;
  dataOut: string;
  icon: ReactNode;
}

const pipelineSteps: PipelineStep[] = [
  {
    number: "01",
    label: "Clinical Notes",
    description:
      "Signed encounter notes are pulled from your EHR through a one-directional, read-only connection. No data is modified at the source.",
    dataIn: "EHR encounter record",
    dataOut: "Raw clinical note + encounter metadata",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    number: "02",
    label: "Chart Reader",
    description:
      "The first AI agent reads the full clinical note and extracts structured medical detail — diagnoses, procedures, medical decision-making complexity.",
    dataIn: "Raw clinical note",
    dataOut: "Structured clinical extract",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    number: "03",
    label: "Procedure Specialist",
    description:
      "Maps the clinical extract to CPT and ICD-10 codes at the level the documentation supports — no conservative defaults.",
    dataIn: "Structured clinical extract",
    dataOut: "Code assignments with rationale",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "04",
    label: "Payer Logic Bot",
    description:
      "Applies carrier-specific rules — modifiers, bundling edits, frequency limits, and prior authorization requirements.",
    dataIn: "Coded claim + payer rules",
    dataOut: "Payer-adjusted claim with corrections",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M6 8h.01M10 8h.01" />
      </svg>
    ),
  },
  {
    number: "05",
    label: "Denial Analyst",
    description:
      "Reviews the draft claim against your practice's historical denial data. Flags risk before submission — predictive, not reactive.",
    dataIn: "Adjusted claim + denial history",
    dataOut: "Final claim with risk flags",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "06",
    label: "837P Claim + Audit Pack",
    description:
      "A compliant 837P claim paired with a per-claim evidence pack documenting every coding decision, payer rule applied, and risk assessment.",
    dataIn: "Final reviewed claim",
    dataOut: "Submission-ready 837P + evidence trail",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
  },
];

interface AgentDeepDive {
  name: string;
  narrative: string;
  whyItMatters: string;
  inputs: string[];
  outputs: string[];
  bgClass: string;
  darkBgClass: string;
  direction: "left" | "right";
  icon: ReactNode;
}

const agentDeepDives: AgentDeepDive[] = [
  {
    name: "Chart Reader",
    narrative:
      "The first agent in the pipeline reads the full signed clinical note — history of present illness, exam findings, medical decision-making, and plan. It extracts structured clinical detail the same way a senior coder would, but without the time pressure that causes human readers to default to conservative interpretations.",
    whyItMatters:
      "Undercoding starts at the reading stage. When coders are processing 80+ charts per day, nuance gets missed. The AAFP estimates this costs physicians $30K or more per provider per year in lost revenue that the documentation already supports.",
    inputs: ["Signed clinical note", "Encounter metadata (date, provider, facility)"],
    outputs: ["Structured clinical extract with diagnoses, procedures, and MDM complexity"],
    bgClass: "bg-ice",
    darkBgClass: "dark:bg-dark-surface",
    direction: "left",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    name: "Procedure Specialist",
    narrative:
      "The second agent takes the structured clinical extract and maps it to CPT and ICD-10 codes at the level the documentation actually supports. It does not default to lower-level codes when the note justifies a higher one — and it flags when documentation is insufficient for the code a practice might expect.",
    whyItMatters:
      "The gap between a 99213 and a 99214 is $40 to $70 per visit. Across thousands of encounters per year, systematic undercoding compounds into significant lost revenue. The Procedure Specialist codes to documentation, not to habit.",
    inputs: ["Structured clinical extract from Chart Reader"],
    outputs: ["CPT/ICD-10 code assignments with rationale", "Undercoding alerts where documentation supports a higher level"],
    bgClass: "bg-white",
    darkBgClass: "dark:bg-dark-bg",
    direction: "right",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "Payer Logic Bot",
    narrative:
      "The third agent applies carrier-specific rules to the coded claim. Different payers require different modifiers, have different bundling edits, enforce different frequency limits, and have different prior authorization thresholds. The Payer Logic Bot knows these rules and adjusts the claim before submission.",
    whyItMatters:
      "Payer-specific denials are the most preventable category of rejection. A claim that is clinically correct can still be denied because of a missing modifier or a bundling edit the coder did not catch. These are rule-based errors that AI eliminates consistently.",
    inputs: ["Coded claim from Procedure Specialist", "Payer-specific rule sets"],
    outputs: ["Payer-adjusted claim with applied corrections", "Modifier and bundling edit documentation"],
    bgClass: "bg-ice",
    darkBgClass: "dark:bg-dark-surface",
    direction: "left",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M6 8h.01M10 8h.01" />
      </svg>
    ),
  },
  {
    name: "Denial Analyst",
    narrative:
      "The fourth and final agent reviews the draft claim against your practice's own historical denial data. It identifies patterns — specific codes that get denied by specific payers, documentation gaps that trigger reviews, modifier combinations that fail — and flags risk before the claim is submitted.",
    whyItMatters:
      "Industry denial rates run 5 to 10 percent, with each denial costing $25 to $50 in rework. The Denial Analyst shifts your practice from reactive (appealing denials after the fact) to predictive (preventing them before submission).",
    inputs: ["Payer-adjusted claim from Payer Logic Bot", "Practice denial history and patterns"],
    outputs: ["Final reviewed claim with risk flags", "Per-code denial probability and mitigation notes"],
    bgClass: "bg-white",
    darkBgClass: "dark:bg-dark-bg",
    direction: "right",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
      </svg>
    ),
  },
];

interface EvidenceBenefit {
  title: string;
  description: string;
  icon: ReactNode;
}

const evidenceBenefits: EvidenceBenefit[] = [
  {
    title: "Billing Staff",
    description:
      "Review AI-drafted claims with full rationale instead of re-reading charts. Focus time shifts from coding to quality assurance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Compliance Team",
    description:
      "Per-claim documentation of every coding decision. Audit-ready evidence that maps codes to clinical support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Physicians",
    description:
      "Immediate visibility into how notes translate to codes. Undercoding alerts highlight where documentation supports higher reimbursement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

interface DeploymentItem {
  title: string;
  description: string;
  icon: ReactNode;
}

const deploymentItems: DeploymentItem[] = [
  {
    title: "Physical Installation",
    description:
      "A dedicated appliance installed on-site in your facility. Standard rack-mount form factor, minimal footprint, connected to your local network.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    title: "EHR Connection",
    description:
      "One-directional, read-only integration with your EHR. The appliance reads clinical notes — it never writes back or modifies source records.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "Air-Gapped Processing",
    description:
      "All AI inference runs locally with no internet connection. Only the final 837P claim leaves your facility through your existing clearinghouse workflow.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Updates & Maintenance",
    description:
      "Model and rule updates delivered via secure portable media. No remote access, no cloud sync, no background connections.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal dark:text-teal-dark">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: "How long does it take to process a single claim?",
    answer:
      "The full pipeline — from clinical note ingestion to 837P output — typically completes in under 60 seconds per encounter. Batch processing of a full day's encounters runs overnight without manual intervention.",
  },
  {
    question: "Does the AI replace billing staff?",
    answer:
      "No. Sovereign RCM drafts claims and provides evidence packs. Your billing staff reviews, approves, and submits. The AI handles the time-intensive chart reading and coding work so your team can focus on quality assurance, denial management, and patient communication.",
  },
  {
    question: "What if my team disagrees with a code assignment?",
    answer:
      "Every code includes the clinical documentation that supports it. Your team can override any assignment — the system records the change and learns from the correction. The AI makes recommendations; your staff makes final decisions.",
  },
  {
    question: "How does the system learn our practice patterns?",
    answer:
      "During the pilot, the appliance processes your historical claims and denial data to calibrate to your specialty mix, payer contracts, and coding patterns. It adapts to your practice over time without sending data externally.",
  },
  {
    question: "What EHR systems are supported?",
    answer:
      "Sovereign RCM integrates with major EHR platforms through standard HL7/FHIR interfaces. During the discovery phase, we confirm compatibility with your specific system and configure the read-only connection.",
  },
  {
    question: "Can it handle multiple specialties in one practice?",
    answer:
      "Yes. The SR-2 and SR-3 packages are designed for multi-specialty groups. Each agent in the pipeline applies specialty-specific coding rules based on the encounter type, so orthopedic visits and cardiology visits are coded with their respective logic.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HowItWorks() {
  return (
    <>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── 1. Hero (navy) ───────────────────────────────────────── */}
      <section className="bg-navy px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                From Clinical Notes to Clean Claims
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Four specialized AI agents work in sequence inside your facility.
                Each one handles a distinct stage of the billing pipeline — reading
                the chart, assigning codes, applying payer rules, and flagging
                denial risk. Every decision is documented. Nothing leaves the
                building except the final claim.
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
                <a
                  href="#pipeline"
                  className="rounded-lg border border-white/30 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Jump to the Pipeline
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 2. The Complete Pipeline (white) ─────────────────────── */}
      <section id="pipeline" className="scroll-mt-24 bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              The Complete Pipeline
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Six stages from clinical note to submission-ready claim. Each step
              produces structured output that feeds the next — nothing is skipped,
              nothing is assumed.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {pipelineSteps.map((step) => (
              <StaggerItem key={step.number}>
                <HoverCard className="h-full rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy font-heading text-lg font-bold text-white dark:bg-teal">
                      {step.number}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-navy dark:text-white">
                      {step.label}
                    </h3>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                    {step.description}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-ice px-3 py-2 dark:bg-dark-surface">
                      <p className="text-xs font-semibold uppercase tracking-wider text-teal dark:text-teal-dark">
                        In
                      </p>
                      <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                        {step.dataIn}
                      </p>
                    </div>
                    <div className="rounded-lg bg-teal/15 px-3 py-2 dark:bg-teal/20">
                      <p className="text-xs font-semibold uppercase tracking-wider text-teal dark:text-teal-dark">
                        Out
                      </p>
                      <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                        {step.dataOut}
                      </p>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ── 3. Agent Deep Dives ──────────────────────────────────── */}
      {agentDeepDives.map((agent, i) => (
        <div key={agent.name}>
          <section className={`${agent.bgClass} ${agent.darkBgClass} px-6 py-20 lg:py-24`}>
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <FadeIn direction={agent.direction}>
                  <div className="flex items-center gap-3">
                    {agent.icon}
                    <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                      {agent.name}
                    </h2>
                  </div>
                  <p className="mt-6 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                    {agent.narrative}
                  </p>
                  <div className="mt-6 rounded-lg border-l-4 border-teal bg-white/60 px-5 py-4 dark:border-teal-dark dark:bg-dark-elevated/60">
                    <p className="text-sm font-semibold uppercase tracking-wider text-teal dark:text-teal-dark">
                      Why it matters
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-charcoal dark:text-dark-text">
                      {agent.whyItMatters}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn direction={agent.direction === "left" ? "right" : "left"}>
                  <HoverCard className="rounded-xl border border-gray-300 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
                    <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                      Agent Specification
                    </h3>
                    <div className="mt-5 space-y-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-teal dark:text-teal-dark">
                          Inputs
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {agent.inputs.map((input) => (
                            <li key={input} className="flex items-start gap-2 text-sm text-charcoal dark:text-dark-text">
                              <svg className="mt-0.5 h-4 w-4 shrink-0 text-teal dark:text-teal-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                              {input}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t border-gray-200 pt-5 dark:border-dark-border">
                        <p className="text-xs font-semibold uppercase tracking-wider text-teal dark:text-teal-dark">
                          Outputs
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {agent.outputs.map((output) => (
                            <li key={output} className="flex items-start gap-2 text-sm text-charcoal dark:text-dark-text">
                              <svg className="mt-0.5 h-4 w-4 shrink-0 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                              </svg>
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </HoverCard>
                </FadeIn>
              </div>
            </div>
          </section>
          {i === 1 && <SectionDivider variant="light" />}
        </div>
      ))}

      <SectionDivider variant="light" />

      {/* ── 4. The Evidence Trail (ice) ──────────────────────────── */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                The Evidence Trail
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Every claim produced by Sovereign RCM includes a per-claim evidence
                pack. Not a summary — a decision-by-decision record of what was
                coded, why it was coded that way, what payer rules were applied, and
                what denial risks were identified.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                This is the difference between a billing system that assigns codes
                and one that defends them. When an audit comes, the evidence is
                already assembled.
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <HoverCard className="rounded-xl border border-gray-300 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Example Evidence Entry
                </h3>
                <div className="mt-5 space-y-4">
                  <div className="rounded-lg bg-ice px-4 py-3 dark:bg-dark-surface">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal dark:text-teal-dark">
                      Code Assigned
                    </p>
                    <p className="mt-1 font-heading text-base font-bold text-navy dark:text-white">
                      99214 — Office Visit, Moderate Complexity
                    </p>
                  </div>
                  <div className="rounded-lg bg-ice px-4 py-3 dark:bg-dark-surface">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal dark:text-teal-dark">
                      Documentation Support
                    </p>
                    <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                      HPI documents 4+ elements, exam covers 2+ organ systems,
                      MDM includes prescription drug management with moderate data
                      review.
                    </p>
                  </div>
                  <div className="rounded-lg bg-ice px-4 py-3 dark:bg-dark-surface">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal dark:text-teal-dark">
                      Payer Rule Applied
                    </p>
                    <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                      BlueCross modifier -25 required for same-day E/M with
                      procedure. Applied automatically.
                    </p>
                  </div>
                  <div className="rounded-lg bg-ice px-4 py-3 dark:bg-dark-surface">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal dark:text-teal-dark">
                      Denial Risk
                    </p>
                    <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                      Low — practice has 97% acceptance rate for 99214 with this
                      payer over the past 12 months.
                    </p>
                  </div>
                </div>
              </HoverCard>
            </FadeIn>
          </div>

          {/* Who Benefits */}
          <FadeIn delay={0.2}>
            <h3 className="mt-16 font-heading text-2xl font-bold text-navy dark:text-white">
              Who Benefits
            </h3>
          </FadeIn>
          <StaggerContainer className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {evidenceBenefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <HoverCard className="h-full rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <div aria-hidden="true">{benefit.icon}</div>
                  <h4 className="mt-4 font-heading text-lg font-bold text-navy dark:text-white">
                    {benefit.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                    {benefit.description}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 5. Deployment & Integration (white) ──────────────────── */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Deployment & Integration
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Sovereign RCM is installed on-site in your facility. The architecture
              is designed so patient data stays inside your building at every stage.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {deploymentItems.map((item) => (
              <StaggerItem key={item.title}>
                <HoverCard className="h-full rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <div aria-hidden="true">{item.icon}</div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-navy dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                    {item.description}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-6">
              <Link
                href="/sovereign-rcm/security"
                className="text-sm font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
              >
                Security & HIPAA architecture
              </Link>
              <Link
                href="/sovereign-rcm/pilot-program"
                className="text-sm font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
              >
                90-Day Pilot Program
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ── 6. FAQ (ice) ─────────────────────────────────────────── */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              How It Works FAQ
            </h2>
            <p className="mt-4 text-lg text-charcoal-light dark:text-gray-300">
              Common questions about the pipeline, integration, and day-to-day
              operation.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-12 space-y-4">
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
            <p className="mt-8 text-sm text-charcoal-light dark:text-gray-400">
              Have a question not covered here?{" "}
              <Link
                href="/contact"
                className="font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
              >
                Reach out directly
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 7. CTA (navy) ────────────────────────────────────────── */}
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              See the Pipeline in Action
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Start with a free billing analysis. We&apos;ll walk you through
              exactly how Sovereign RCM would process your claims.
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
