import type { Metadata } from "next";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import FaqItem from "@/components/FaqItem";
import {
  AnimatedHero,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  AnimatedComparisonTable,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Sovereign RCM vs. Outsourced Medical Billing",
  description:
    "Compare Sovereign RCM's on-premise AI billing appliance to traditional outsourced billing companies. Fixed cost, full visibility, no percentage of collections.",
  openGraph: {
    title: "Sovereign RCM vs. Outsourced Medical Billing",
    description:
      "Compare Sovereign RCM's on-premise AI billing appliance to traditional outsourced billing companies. Fixed cost, full visibility, no percentage of collections.",
    url: "https://rizexcapital.com/sovereign-rcm/vs-outsourced-billing",
    type: "website",
  },
  alternates: {
    canonical: "https://rizexcapital.com/sovereign-rcm/vs-outsourced-billing",
  },
};

const outsourcedProblems = [
  {
    icon: "📉",
    title: "Percentage Drain",
    description:
      "Outsourced billing companies charge 4–10% of collections. The more revenue your practice generates, the more you pay — indefinitely. A 5-provider practice collecting $2.5M/yr pays $100K–$250K/yr with no path to ownership.",
  },
  {
    icon: "🔍",
    title: "Missed Revenue",
    description:
      "Outsourced coders miss undercoding worth $30K+ per provider per year (AAFP). With 30%+ annual coder turnover (MGMA), quality is inconsistent. Volume-based review incentives favor speed over accuracy.",
  },
  {
    icon: "🚫",
    title: "Limited Visibility",
    description:
      "Black-box billing processes give you monthly totals, not per-claim reasoning. Limited insight into coding decisions, denial patterns, or revenue left on the table. You pay for results you cannot independently verify.",
  },
];

const comparisonRows = [
  {
    category: "Cost Model",
    tooltip: "How you pay — fixed one-time cost vs. perpetual percentage of collections",
    sovereign: "One-time capital expenditure — you own the appliance",
    outsourced: "4–10% of collections, paid every month, indefinitely",
  },
  {
    category: "5-Year Cost Trajectory",
    tooltip: "How total billing costs change over five years as your practice grows",
    sovereign: "Fixed hardware cost, no ongoing fees — cost decreases over time",
    outsourced:
      "Scales with revenue — a growing practice pays more every year",
  },
  {
    category: "Coding Accuracy",
    tooltip: "Consistency and correctness of CPT/ICD-10 code assignment on claims",
    sovereign:
      "Multi-agent AI pipeline with consistent, evidence-based coding",
    outsourced:
      "Human coders with 30%+ annual turnover and variable quality",
  },
  {
    category: "Undercoding Detection",
    tooltip: "Ability to identify visits billed at lower levels than clinical documentation supports",
    sovereign:
      "AI cross-references documentation against payer rules to flag missed codes",
    outsourced:
      "Volume-based incentives favor conservative coding over accuracy",
  },
  {
    category: "Denial Management",
    tooltip: "How denied claims are identified, analyzed, and corrected to recover revenue",
    sovereign:
      "Dedicated Denial Analyst agent identifies patterns and corrects root causes",
    outsourced:
      "Reactive appeals process, often delayed, limited pattern analysis",
  },
  {
    category: "PHI Handling",
    tooltip: "How protected health information is stored, transmitted, and accessed during billing",
    sovereign: "On-premise, air-gapped — PHI never leaves your facility",
    outsourced:
      "PHI transmitted to third-party offices, expanding your breach surface",
  },
  {
    category: "Audit Trail",
    tooltip: "Level of documentation for why each coding and billing decision was made",
    sovereign:
      "Per-claim reasoning trail — every coding decision is documented",
    outsourced:
      "Monthly summary reports with limited claim-level transparency",
  },
  {
    category: "Staff Dependency",
    tooltip: "Whether billing operations depend on external staff availability and turnover",
    sovereign: "Appliance operates independently after deployment",
    outsourced:
      "Dependent on billing company staffing levels and coder availability",
  },
  {
    category: "Scalability",
    tooltip: "How billing costs and capacity change as your practice adds providers or volume",
    sovereign:
      "Same appliance handles increased volume without proportional cost increase",
    outsourced: "Costs scale linearly — more claims means proportionally higher fees",
  },
  {
    category: "Switching Cost",
    tooltip: "The financial and operational cost of moving to a different billing system",
    sovereign: "Data stays on your hardware in standard formats",
    outsourced:
      "Transition requires re-credentialing, workflow rebuild, and revenue gaps",
  },
];

const faqs = [
  {
    question: "Can AI really replace our outsourced billing team?",
    answer:
      "Sovereign RCM is designed to handle the core coding and claim preparation workflow — reading clinical notes, assigning CPT and ICD-10 codes, applying payer-specific rules, and generating compliant 837P claims. For most practices, this covers 80–90% of claim volume. Edge cases and complex appeals may still benefit from human review, which is why we run a 90-day pilot in shadow mode to measure exactly what the appliance handles versus what needs manual attention in your specific specialty mix.",
  },
  {
    question:
      "We've used the same billing company for years — why switch now?",
    answer:
      "Loyalty to a billing company often masks compounding costs. If your practice collects $500K per provider annually and pays 6% of collections, you are spending $30K per provider per year — $150K over five years for a single provider. That number grows as your collections grow. The question is not whether your current billing company is adequate — it is whether paying an escalating percentage indefinitely is the most efficient use of your revenue when a fixed-cost alternative exists.",
  },
  {
    question: "What about complex specialty coding?",
    answer:
      "Sovereign RCM's multi-agent pipeline includes a Procedure Specialist agent trained on specialty-specific coding patterns. The system handles modifier-intensive specialties like orthopedics and cardiology, high-volume specialties like dermatology, and documentation-heavy specialties like pain management. During the 90-day pilot, we validate coding accuracy against your specific specialty mix and payer contracts before you make any transition.",
  },
  {
    question: "How does the transition from outsourced billing work?",
    answer:
      "We run Sovereign RCM in shadow mode alongside your existing billing company for 90 days. During this period, both systems process claims independently. You compare clean-claim rates, denial rates, coding accuracy, and turnaround times side by side. There is no disruption to your current revenue cycle during the evaluation. If the pilot meets exit criteria — 95%+ clean-claim rate, 30%+ reduction in coder touch time — you transition at your own pace.",
  },
  {
    question: "Is the upfront cost worth it vs. continuing to pay a percentage?",
    answer:
      "For most practices, the math favors ownership within 18–24 months. A 5-provider practice paying 6% of $2.5M in annual collections spends $150K per year on outsourced billing. Sovereign RCM's one-time capital cost is recovered in that timeframe, and every month after that is savings. Use our ROI calculator to model the payback period for your specific practice size and collection volume.",
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

export default function VsOutsourcedBilling() {
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
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                On-Premise AI vs. Outsourced Medical Billing
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Why practices are moving away from percentage-based billing
                companies to fixed-cost, on-premise infrastructure they own and
                control.
              </p>
            </FadeIn>
          </div>
        </div>
      </AnimatedHero>

      {/* The Outsourced Billing Problem */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              The Outsourced Billing Problem
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Outsourced billing companies charge a percentage of your collections
              for a process you cannot see or control. That creates three
              compounding problems.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {outsourcedProblems.map((problem) => (
              <StaggerItem key={problem.title}>
                <HoverCard className="h-full rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <p className="text-3xl" aria-hidden="true">
                    {problem.icon}
                  </p>
                  <h3 className="mt-4 font-heading text-xl font-bold text-navy dark:text-white">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                    {problem.description}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Side-by-Side Comparison */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Side-by-Side Comparison
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              How Sovereign RCM compares to traditional outsourced billing
              companies across the dimensions that matter most.
            </p>
          </FadeIn>

          <AnimatedComparisonTable
            rows={comparisonRows.map((r) => ({
              category: r.category,
              tooltip: r.tooltip,
              sovereign: r.sovereign,
              competitor: r.outsourced,
            }))}
            competitorLabel="Outsourced Billing"
          />
        </div>
      </section>

      {/* Deep Dive A: Cost — Fixed vs. Percentage */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Cost: Fixed vs. Percentage
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                The percentage-of-collections model creates a fundamental
                misalignment: the more revenue your practice generates, the more
                you pay your billing company. Solo practitioners pay the highest
                rates — 10.9% of collections on average (AMA 2024) — while
                administrative overhead consumes 15.5% of net patient revenue
                across the industry.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Sovereign RCM replaces that perpetual cost with a one-time
                capital expenditure. The appliance processes claims at a fixed
                cost regardless of volume or collections. As your practice
                grows, your billing cost stays flat — the opposite of the
                percentage model where success is penalized with higher fees.
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <div className="rounded-xl border border-gray-300 bg-ice p-8 dark:border-dark-border dark:bg-dark-surface">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Outsourced Billing Cost Benchmarks
                </h3>
                <ul className="mt-4 space-y-3 text-base text-charcoal dark:text-dark-text">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>4–10%</strong> of collections (industry range)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>10.9%</strong> average for solo practitioners (AMA
                      2024)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>15.5%</strong> of net patient revenue spent on
                      billing administration
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>$100K–$250K/yr</strong> for a 5-provider practice at
                      $2.5M collections
                    </span>
                  </li>
                </ul>
                <Link
                  href="/sovereign-rcm/roi-calculator"
                  className="mt-6 inline-block text-sm font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                >
                  Model the numbers for your practice
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider variant="dark" />

      {/* Deep Dive B: Coding Accuracy — AI vs. Human Coders */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <FadeIn direction="right" className="order-2 lg:order-1">
              <div className="rounded-xl border border-gray-300 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Human Coder Accuracy Data
                </h3>
                <ul className="mt-4 space-y-3 text-base text-charcoal dark:text-dark-text">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>$30K+</strong> per provider per year lost to
                      undercoding (AAFP)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>30%+</strong> annual medical coder turnover (MGMA
                      2024)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>11.8%</strong> average claim denial rate (Experian
                      Health)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>$25–$118</strong> cost to rework each denied claim
                      (MGMA)
                    </span>
                  </li>
                </ul>
                <Link
                  href="/sovereign-rcm/how-it-works"
                  className="mt-6 inline-block text-sm font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                >
                  See how the multi-agent pipeline works
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="left" className="order-1 lg:order-2">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Coding Accuracy: AI Pipeline vs. Human Coders
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Outsourced billing companies face a structural problem: 30%+
                annual turnover in medical coding staff (MGMA 2024). New coders
                default to conservative coding to avoid audit flags, leaving
                documented services unbilled. Volume-based incentives reward
                speed over thoroughness, and physician undercoding costs $30K+
                per provider per year (AAFP).
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Sovereign RCM&apos;s multi-agent pipeline eliminates these
                variables. The Chart Reader extracts clinical detail, the
                Procedure Specialist assigns codes based on documentation, the
                Payer Logic Bot applies insurer-specific rules, and the Denial
                Analyst identifies patterns that cause rejections. Every claim
                is processed with the same rigor — no turnover, no fatigue, no
                conservative defaults.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Deep Dive C: Data Security — On-Premise vs. Third Party */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Data Security: On-Premise vs. Third Party
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Outsourced billing requires transmitting PHI — patient names,
                diagnoses, insurance details, Social Security numbers — to a
                third-party company. That data travels over networks, sits on
                external servers, and is accessible to billing company staff.
                Your BAA chain extends to every subprocessor they use.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                The 2024 Change Healthcare breach exposed 192.7 million patient
                records through a single point of failure in a centralized
                billing infrastructure. Sovereign RCM eliminates third-party PHI
                transmission entirely. Clinical notes are processed on a local,
                air-gapped appliance. Only the final 837P claim — containing the
                minimum data required by the payer — leaves your facility.
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <div className="rounded-xl border border-gray-300 bg-ice p-8 dark:border-dark-border dark:bg-dark-surface">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Third-Party PHI Risk
                </h3>
                <ul className="mt-4 space-y-3 text-base text-charcoal dark:text-dark-text">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>192.7M</strong> records exposed in the Change
                      Healthcare breach
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>725</strong> major breach incidents reported to HHS
                      in 2024
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      Every outsourced billing relationship extends your BAA chain
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      PHI transmitted to third parties is outside your direct
                      control
                    </span>
                  </li>
                </ul>
                <Link
                  href="/sovereign-rcm/security"
                  className="mt-6 inline-block text-sm font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                >
                  Full security architecture details
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Deep Dive D: Visibility — Full Audit Trail vs. Black Box */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <FadeIn direction="right" className="order-2 lg:order-1">
              <div className="rounded-xl border border-gray-300 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Visibility Comparison
                </h3>
                <ul className="mt-4 space-y-3 text-base text-charcoal dark:text-dark-text">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>Per-claim reasoning</strong> — see exactly why
                      each code was assigned
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>Denial pattern analysis</strong> — identify root
                      causes, not just totals
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>Real-time dashboards</strong> — not monthly
                      summary reports
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">&bull;</span>
                    <span>
                      <strong>Undercoding alerts</strong> — flagged
                      opportunities, not missed silently
                    </span>
                  </li>
                </ul>
                <Link
                  href="/sovereign-rcm/pilot-program"
                  className="mt-6 inline-block text-sm font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                >
                  See transparency in action during the 90-day pilot
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="left" className="order-1 lg:order-2">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Visibility: Full Audit Trail vs. Black Box
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Most outsourced billing companies provide monthly summary
                reports — total claims submitted, total collected, total denied.
                What they rarely provide is per-claim reasoning: why a specific
                code was chosen, why a modifier was applied or omitted, or why a
                claim was denied and what pattern it belongs to.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Sovereign RCM generates a complete evidence trail for every
                claim. Each coding decision is linked to the clinical
                documentation that supports it. Denial patterns are analyzed
                across your full claim history, not just individual rejections.
                You see exactly where revenue is being captured, where it is
                being missed, and why — in real time, not 30 days later.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-charcoal-light dark:text-gray-300">
              Common questions from practices evaluating on-premise AI billing
              versus traditional outsourced billing companies.
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

      <SectionDivider variant="dark" />

      {/* CTA */}
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white">
              Ready to Stop Paying a Percentage?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Replace your outsourced billing company with infrastructure you own.
              Fixed cost, full visibility, no percentage of collections — and your
              PHI never leaves the building.
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
