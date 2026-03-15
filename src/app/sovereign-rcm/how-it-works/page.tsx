import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import FaqItem from "@/components/FaqItem";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import {
  AnimatedHero,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedPipeline,
  HoverCard,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "How It Works: Sovereign RCM Pipeline",
  description:
    "Step-by-step walkthrough of Sovereign RCM's multi-agent AI pipeline. Four specialized agents turn clinical notes into compliant 837P claims with full evidence tracing.",
  openGraph: {
    title: "How It Works: Sovereign RCM Pipeline",
    description:
      "Four AI agents process clinical notes into compliant 837P claims. On-premise, air-gapped, every decision documented.",
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
      "The first AI agent reads the full clinical note and extracts structured medical detail: diagnoses, procedures, and medical decision-making complexity. When coders process 80+ charts a day, nuance gets missed. The AAFP estimates that costs $30K+ per provider annually.",
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
      "Maps the clinical extract to CPT and ICD-10 codes at the level the documentation supports, with no conservative defaults. The gap between a 99213 and a 99214 is $40 to $70 per visit, and across thousands of encounters, that compounds fast.",
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
      "Applies carrier-specific rules: modifiers, bundling edits, frequency limits, and prior authorization requirements. These are the most preventable category of denial, and rule-based errors AI eliminates consistently.",
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
      "Reviews the draft claim against your practice's historical denial data. Flags risk before submission. Industry denial rates run 5 to 10 percent at $25 to $50 per rework. Predictive, not reactive.",
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral dark:text-coral">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral dark:text-coral">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral dark:text-coral">
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
    title: "EHR Connection",
    description:
      "One-directional, read-only integration with your EHR. The appliance reads clinical notes and never writes back or modifies source records.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral dark:text-coral">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "Updates & Maintenance",
    description:
      "Model and rule updates delivered via secure portable media. No remote access, no cloud sync, no background connections.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral dark:text-coral">
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
      "The full pipeline, from clinical note ingestion to 837P output, typically completes in under 60 seconds per encounter. Batch processing of a full day's encounters runs overnight without manual intervention.",
  },
  {
    question: "Does the AI replace billing staff?",
    answer:
      "No. Sovereign RCM drafts claims and provides evidence packs. Your billing staff reviews, approves, and submits. The AI handles the time-intensive chart reading and coding work so your team can focus on quality assurance, denial management, and patient communication.",
  },
  {
    question: "What if my team disagrees with a code assignment?",
    answer:
      "Every code includes the clinical documentation that supports it. Your team can override any assignment; the system records the change and learns from the correction. The AI makes recommendations, your staff makes final decisions.",
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
      <AnimatedHero className="bg-navy px-6 pt-4 pb-20 lg:pt-6 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <BreadcrumbNav />
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                From Clinical Notes to Clean Claims
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Four specialized AI agents work in sequence inside your facility.
                Each one handles a distinct stage of the billing pipeline: reading
                the chart, assigning codes, applying payer rules, and flagging
                denial risk. Every decision is documented. Nothing leaves the
                building except the final claim.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="block rounded-lg bg-coral px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-coral-hover"
                  >
                    Request a Billing Analysis
                  </Link>
                </MagneticButton>
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
      </AnimatedHero>

      {/* ── 2. The Complete Pipeline (white) ─────────────────────── */}
      <section id="pipeline" className="scroll-mt-24 bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              The Complete Pipeline
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Six stages from clinical note to submission-ready claim. Each step
              produces structured output that feeds the next. Nothing is skipped,
              nothing is assumed.
            </p>
          </FadeIn>

          <AnimatedPipeline compact className="mt-12" />

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {pipelineSteps.map((step) => (
              <StaggerItem key={step.number}>
                <HoverCard className="h-full rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy font-heading text-lg font-bold text-white dark:bg-coral">
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
                      <p className="text-xs font-semibold uppercase tracking-wider text-coral dark:text-coral">
                        In
                      </p>
                      <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                        {step.dataIn}
                      </p>
                    </div>
                    <div className="rounded-lg bg-coral/10 px-3 py-2 dark:bg-coral/15">
                      <p className="text-xs font-semibold uppercase tracking-wider text-coral dark:text-coral">
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

      {/* ── 3. The Evidence Trail (ice) ──────────────────────────── */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                The Evidence Trail
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Every claim produced by Sovereign RCM includes a per-claim evidence
                pack. Not a summary. A decision-by-decision record of what was
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
              <div className="rounded-xl border border-gray-300 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Example Evidence Entry
                </h3>
                <div className="mt-5 space-y-4">
                  <div className="rounded-lg bg-ice px-4 py-3 dark:bg-dark-surface">
                    <p className="text-xs font-semibold uppercase tracking-wider text-coral dark:text-coral">
                      Code Assigned
                    </p>
                    <p className="mt-1 font-heading text-base font-bold text-navy dark:text-white">
                      99214: Office Visit, Moderate Complexity
                    </p>
                  </div>
                  <div className="rounded-lg bg-ice px-4 py-3 dark:bg-dark-surface">
                    <p className="text-xs font-semibold uppercase tracking-wider text-coral dark:text-coral">
                      Documentation Support
                    </p>
                    <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                      HPI documents 4+ elements, exam covers 2+ organ systems,
                      MDM includes prescription drug management with moderate data
                      review.
                    </p>
                  </div>
                  <div className="rounded-lg bg-ice px-4 py-3 dark:bg-dark-surface">
                    <p className="text-xs font-semibold uppercase tracking-wider text-coral dark:text-coral">
                      Payer Rule Applied
                    </p>
                    <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                      BlueCross modifier -25 required for same-day E/M with
                      procedure. Applied automatically.
                    </p>
                  </div>
                  <div className="rounded-lg bg-ice px-4 py-3 dark:bg-dark-surface">
                    <p className="text-xs font-semibold uppercase tracking-wider text-coral dark:text-coral">
                      Denial Risk
                    </p>
                    <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                      Low. Practice has 97% acceptance rate for 99214 with this
                      payer over the past 12 months.
                    </p>
                  </div>
                </div>
              </div>
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

      {/* ── 4. Deployment & Integration (white) ──────────────────── */}
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
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <Link
                href="/sovereign-rcm/security"
                className="text-sm font-medium text-coral underline decoration-coral/30 hover:decoration-coral dark:text-coral dark:decoration-coral/30 dark:hover:decoration-coral"
              >
                Security & HIPAA architecture
              </Link>
              <Link
                href="/sovereign-rcm/pilot-program"
                className="text-sm font-medium text-coral underline decoration-coral/30 hover:decoration-coral dark:text-coral dark:decoration-coral/30 dark:hover:decoration-coral"
              >
                90-Day Pilot Program
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ── 5. FAQ (ice) ─────────────────────────────────────────── */}
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
                className="font-medium text-coral underline decoration-coral/30 hover:decoration-coral dark:text-coral dark:decoration-coral/30 dark:hover:decoration-coral"
              >
                Reach out directly
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 6. CTA (navy) ────────────────────────────────────────── */}
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
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-block rounded-lg bg-coral px-10 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover"
                >
                  Request a Free Product Demo
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
