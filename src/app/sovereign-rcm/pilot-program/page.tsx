import type { Metadata } from "next";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import FaqItem from "@/components/FaqItem";
import {
  AnimatedHero,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedPipeline,
  AnimatedTimeline,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "90-Day Pilot Program — Sovereign RCM",
  description:
    "Prove Sovereign RCM works for your practice with a zero-risk, 90-day shadow pilot. Real claims, real results — no obligation.",
  openGraph: {
    title: "90-Day Pilot Program — Sovereign RCM",
    description:
      "Prove Sovereign RCM works for your practice with a zero-risk, 90-day shadow pilot.",
    url: "https://rizexcapital.com/sovereign-rcm/pilot-program",
  },
  alternates: {
    canonical: "https://rizexcapital.com/sovereign-rcm/pilot-program",
  },
};

const phases = [
  {
    number: "01",
    title: "Discovery & Onboarding",
    duration: "Weeks 1–2",
    description:
      "Practice assessment, appliance installation, EHR integration, and staff orientation. We learn your specialty mix, payer contracts, and current denial patterns.",
  },
  {
    number: "02",
    title: "Shadow Mode",
    duration: "Weeks 3–8",
    description:
      "The AI processes your claims in parallel — your existing billing continues untouched. Every claim is drafted, coded, and scrubbed without affecting your live revenue cycle.",
  },
  {
    number: "03",
    title: "Comparison & Analysis",
    duration: "Weeks 9–10",
    description:
      "Side-by-side comparison of AI-drafted claims versus your manually-billed claims. We measure clean-claim rates, coding accuracy, denial patterns, and undercoding recapture.",
  },
  {
    number: "04",
    title: "Decision Point",
    duration: "Weeks 11–12",
    description:
      "Review the results with your team. If the pilot meets exit criteria, transition at your own pace. If it doesn't — walk away with zero obligation.",
  },
];

const metrics = [
  {
    title: "Clean Claim Rate",
    target: "≥ 95%",
    description: "First-pass acceptance without manual edits or resubmission",
  },
  {
    title: "Denial Rate Reduction",
    target: "≥ 30%",
    description: "Fewer rejected claims compared to your current process",
  },
  {
    title: "Days in A/R",
    target: "Measurable decrease",
    description: "Faster reimbursement turnaround from submission to payment",
  },
  {
    title: "Undercoding Recapture",
    target: "Documented gains",
    description:
      "Revenue recovered from visits billed below documentation support",
  },
];

const shadowBenefits = [
  {
    title: "Zero Revenue Risk",
    description:
      "Your existing billing continues uninterrupted. The AI runs in parallel, not in place — no disruption to your cash flow.",
    icon: (
      <svg
        className="h-8 w-8 text-teal dark:text-teal-dark"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    title: "Real Data, Not Projections",
    description:
      "Results are based on your actual claims, payer mix, and specialty — not industry averages or hypothetical models.",
    icon: (
      <svg
        className="h-8 w-8 text-teal dark:text-teal-dark"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
  },
  {
    title: "Staff Confidence",
    description:
      "Your team watches the system work before any workflow changes. By decision day, they have seen 6 weeks of real output.",
    icon: (
      <svg
        className="h-8 w-8 text-teal dark:text-teal-dark"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Full Transparency",
    description:
      "Every AI coding decision includes a reasoning trail. You see exactly why each code was assigned — nothing is a black box.",
    icon: (
      <svg
        className="h-8 w-8 text-teal dark:text-teal-dark"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
  },
];

const paymentSteps = [
  {
    step: "1",
    label: "50% Deposit",
    description: "Locks in your deployment slot and initiates hardware provisioning",
  },
  {
    step: "2",
    label: "40% at Installation",
    description: "Appliance configured, connected to your EHR, and validated",
  },
  {
    step: "3",
    label: "10% at Acceptance",
    description: "Final payment after you confirm everything works as expected",
  },
];

const faqs = [
  {
    question: "What happens to my current billing during the pilot?",
    answer:
      "It continues exactly as-is. Shadow mode runs the AI in parallel with your existing billing process. Your current revenue cycle is never interrupted — the pilot is purely observational until you decide to transition.",
  },
  {
    question: "What do I need to provide for the pilot?",
    answer:
      "EHR access credentials for the AI to read clinical notes, 90 days of historical claims data for baseline comparison, and a designated point of contact at your practice. We handle all hardware installation and configuration.",
  },
  {
    question: "Is my patient data safe during the pilot?",
    answer:
      "Yes. The appliance is installed on-premise in your facility and operates air-gapped — no cloud connection, no external data transmission. PHI never leaves your building. The same security architecture applies during the pilot as in full deployment.",
  },
  {
    question: "What if the pilot doesn't meet the benchmarks?",
    answer:
      "You walk away. No deployment fee, no obligation, no hard feelings. The pilot exists specifically so you can evaluate results against objective criteria before making any commitment.",
  },
  {
    question: "How much does the pilot cost?",
    answer:
      "Pilot pricing depends on your practice size, specialty mix, and claim volume. Contact us for a quote specific to your practice — we will scope the pilot to your exact needs.",
  },
  {
    question: "Can I extend the pilot period?",
    answer:
      "Yes. If additional time would provide meaningful data — for example, to capture seasonal volume variations or a broader payer mix — we can extend the pilot by mutual agreement.",
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

const exitCriteria = [
  "Clean claim rate of 95% or higher on first-pass submissions",
  "30% or greater reduction in coder touch time",
  "Measurable decrease in average days in accounts receivable",
  "Documented undercoding recapture with supporting evidence",
];

export default function PilotProgram() {
  return (
    <>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <AnimatedHero className="bg-navy px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Prove It Before You Pay
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
                Shadow mode runs alongside your current billing — zero
                disruption, full transparency. See the results before you make
                any commitment.
              </p>
            </FadeIn>
          </div>
        </div>
      </AnimatedHero>

      {/* How the Pilot Works */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              How the Pilot Works
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Four phases over 90 days. Your existing billing runs untouched the
              entire time — we prove value before you transition anything.
            </p>
          </FadeIn>
          <AnimatedTimeline phases={phases} className="mt-12" />
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* What We Measure */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              What We Measure
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Every pilot is evaluated against four objective benchmarks — the
              same metrics your practice already tracks.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <StaggerItem key={metric.title}>
                <div className="h-full rounded-xl border border-gray-300 bg-white p-6 text-center dark:border-dark-border dark:bg-dark-elevated">
                  <p className="font-heading text-3xl font-bold text-teal dark:text-teal-dark">
                    {metric.target}
                  </p>
                  <h3 className="mt-3 font-heading text-lg font-bold text-navy dark:text-white">
                    {metric.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                    {metric.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Exit Criteria */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Clear Exit Criteria
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                The pilot succeeds or fails on objective benchmarks — not
                subjective impressions. Before day one, we agree on the specific
                thresholds your practice needs to see. If they are not met, you
                walk away with zero obligation.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                This structure exists because we believe the results speak for
                themselves. We do not need a long-term contract to prove value —
                we need 90 days of your real claims data.
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <div className="rounded-xl border border-gray-300 bg-ice p-8 dark:border-dark-border dark:bg-dark-surface">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Pilot Success Benchmarks
                </h3>
                <ul className="mt-5 space-y-4">
                  {exitCriteria.map((criterion) => (
                    <li key={criterion} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-teal dark:text-teal-dark"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-base text-charcoal dark:text-dark-text">
                        {criterion}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Why Shadow Mode? */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Why Shadow Mode?
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Shadow mode is how we eliminate risk. Your practice operates
              exactly as it does today while the AI proves its value in
              parallel.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {shadowBenefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="h-full rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <div aria-hidden="true">{benefit.icon}</div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-navy dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* From Pilot to Deployment */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                From Pilot to Deployment
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                If the pilot meets your benchmarks, transitioning to full
                deployment is straightforward. The same appliance that ran in
                shadow mode becomes your production billing engine — no new
                hardware, no reconfiguration, no learning curve.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                You own the appliance outright. No monthly subscription, no
                percentage of collections, no recurring fees. The payment
                structure is designed so you never pay in full until you have
                confirmed everything works.
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <div className="rounded-xl border border-gray-300 bg-ice p-8 dark:border-dark-border dark:bg-dark-surface">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Payment Structure
                </h3>
                <AnimatedPipeline
                  compact
                  staticBorders
                  className="mt-5"
                  steps={[
                    { label: "50% Deposit", sub: "Reserve slot + provision hardware" },
                    { label: "40% Install", sub: "Configured + EHR connected" },
                    { label: "10% Accept", sub: "Confirmed working" },
                  ]}
                />
                <Link
                  href="/sovereign-rcm/pricing"
                  className="mt-6 inline-block text-sm font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                >
                  View package tiers and features
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Pilot FAQs */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Pilot Program FAQ
            </h2>
            <p className="mt-4 text-lg text-charcoal-light dark:text-gray-300">
              Common questions from practices evaluating the 90-day pilot.
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

      {/* CTA */}
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              See What Your Practice Is Missing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Start with a no-obligation pilot. If we don&apos;t prove the
              value, you walk away.
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
