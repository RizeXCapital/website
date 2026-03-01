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
  AnimatedPipeline,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Pricing — Sovereign RCM Packages",
  description:
    "Three Sovereign RCM tiers for solo practices, group practices, and multi-specialty groups. Fixed cost, no percentage of collections. Contact us for a custom quote.",
  openGraph: {
    title: "Pricing — Sovereign RCM Packages",
    description:
      "Three Sovereign RCM tiers for solo practices, group practices, and multi-specialty groups. Fixed cost, no percentage of collections.",
    url: "https://rizexcapital.com/sovereign-rcm/pricing",
    type: "website",
  },
  alternates: {
    canonical: "https://rizexcapital.com/sovereign-rcm/pricing",
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Tier {
  id: string;
  label: string;
  providers: string;
  description: string;
  features: string[];
  excluded?: string[];
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    id: "SR-1",
    label: "Solo & Small Practice",
    providers: "1–3 Providers",
    description:
      "Everything a solo or small practice needs to own its billing infrastructure. Single-specialty focus with standard support.",
    features: [
      "On-premise AI appliance",
      "Air-gapped PHI processing",
      "Multi-agent claim pipeline",
      "837P claim generation",
      "Single specialty configuration",
      "EHR read-only integration",
      "Standard support",
    ],
    excluded: [
      "Multi-specialty configuration",
      "Denial pattern analysis",
      "Undercoding recapture alerts",
    ],
  },
  {
    id: "SR-2",
    label: "Group Practice",
    providers: "4–10 Providers",
    description:
      "Built for group practices that need multi-specialty support, denial analysis, and payer optimization across a larger provider panel.",
    features: [
      "Everything in SR-1",
      "Multi-specialty configuration",
      "Denial pattern analysis",
      "Undercoding recapture alerts",
      "Priority support",
      "Quarterly performance reviews",
      "Practice analytics dashboard",
    ],
    excluded: [
      "Custom EHR integrations",
      "Multi-location deployment",
      "Dedicated account manager",
    ],
    highlighted: true,
  },
  {
    id: "SR-3",
    label: "Multi-Specialty Group",
    providers: "11–25 Providers",
    description:
      "Designed for multi-location groups that require custom integrations, dedicated account management, and enterprise-grade support.",
    features: [
      "Everything in SR-2",
      "Custom EHR integrations",
      "Multi-location deployment",
      "Dedicated account manager",
      "Monthly performance reviews",
      "Staff training program",
      "Custom reporting and analytics",
      "Advanced payer contract analysis",
      "Compliance audit preparation",
      "Dedicated support line",
    ],
  },
];

interface FeatureRow {
  feature: string;
  sr1: boolean | string;
  sr2: boolean | string;
  sr3: boolean | string;
}

const featureRows: FeatureRow[] = [
  { feature: "On-premise AI appliance", sr1: true, sr2: true, sr3: true },
  { feature: "Air-gapped PHI processing", sr1: true, sr2: true, sr3: true },
  { feature: "Multi-agent claim pipeline", sr1: true, sr2: true, sr3: true },
  { feature: "837P claim generation", sr1: true, sr2: true, sr3: true },
  { feature: "Per-claim evidence trail", sr1: true, sr2: true, sr3: true },
  { feature: "EHR read-only integration", sr1: true, sr2: true, sr3: true },
  { feature: "Specialty configuration", sr1: "Single", sr2: "Multi", sr3: "Multi" },
  { feature: "Denial pattern analysis", sr1: false, sr2: true, sr3: true },
  { feature: "Payer-specific optimization", sr1: false, sr2: true, sr3: true },
  { feature: "Undercoding recapture alerts", sr1: false, sr2: true, sr3: true },
  { feature: "Practice analytics dashboard", sr1: false, sr2: true, sr3: true },
  { feature: "Custom EHR integrations", sr1: false, sr2: false, sr3: true },
  { feature: "Multi-location deployment", sr1: false, sr2: false, sr3: true },
  { feature: "Dedicated account manager", sr1: false, sr2: false, sr3: true },
  {
    feature: "Performance reviews",
    sr1: false,
    sr2: "Quarterly",
    sr3: "Monthly",
  },
  { feature: "Staff training program", sr1: false, sr2: false, sr3: true },
  { feature: "Support level", sr1: "Standard", sr2: "Priority", sr3: "Dedicated" },
];

interface PaymentStep {
  step: string;
  label: string;
  description: string;
}

const paymentSteps: PaymentStep[] = [
  {
    step: "1",
    label: "50% Deposit",
    description:
      "Locks in your deployment slot and initiates hardware provisioning",
  },
  {
    step: "2",
    label: "40% at Installation",
    description:
      "Appliance configured, connected to your EHR, and validated",
  },
  {
    step: "3",
    label: "10% at Acceptance",
    description:
      "Final payment after you confirm everything works as expected",
  },
];

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: "Why don't you list prices on the website?",
    answer:
      "Every practice is different — specialty mix, provider count, claim volume, and EHR environment all affect deployment scope. We provide custom quotes so pricing reflects exactly what your practice needs, not a one-size-fits-all number.",
  },
  {
    question:
      "Is there a monthly subscription or percentage of collections?",
    answer:
      "No. Sovereign RCM is a one-time capital expenditure. You own the appliance outright. There are no recurring fees, no percentage of collections, and no subscription. The cost stays the same whether you process 100 claims or 10,000.",
  },
  {
    question: "What does the 50/40/10 payment structure mean?",
    answer:
      "You pay 50% as a deposit to reserve your deployment slot and begin hardware provisioning. 40% is due at installation, after the appliance is configured and connected to your EHR. The final 10% is due at acceptance — after you confirm everything works as expected. You never pay in full until you have verified the system.",
  },
  {
    question: "Can I start with SR-1 and upgrade later?",
    answer:
      "Yes. The tiers are designed to grow with your practice. If you start as a solo practice on SR-1 and later add providers or specialties, we can upgrade your configuration to SR-2 or SR-3 without replacing the hardware. Contact us to discuss upgrade paths.",
  },
  {
    question: "Is the 90-day pilot included in the price?",
    answer:
      "The pilot is priced separately and scoped to your specific practice. If you proceed to full deployment after a successful pilot, the pilot investment is credited toward your package. Contact us for pilot pricing details.",
  },
  {
    question: "What specialties are supported?",
    answer:
      "Sovereign RCM supports emergency medicine, orthopedics, cardiology, pain management, dermatology, and multi-specialty groups. Each specialty has dedicated coding logic within the AI pipeline. Dental practices are not currently supported as they use CDT codes and the 837D format.",
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

const scenarios = [
  {
    tier: "SR-1",
    title: "Solo & Small Practice",
    description:
      "You are a solo physician or small group with 1–3 providers in a single specialty. You want to own your billing infrastructure, eliminate the percentage drain, and keep patient data in your building.",
  },
  {
    tier: "SR-2",
    title: "Group Practice",
    description:
      "You run a group practice with 4–10 providers across multiple specialties. You need denial analysis, payer optimization, and undercoding recapture to maximize revenue. Priority support keeps billing on track.",
  },
  {
    tier: "SR-3",
    title: "Multi-Specialty Group",
    description:
      "You manage a multi-specialty group with 11–25 providers across multiple locations. You need custom integrations, a dedicated account manager, and monthly performance reviews with enterprise-grade support.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function renderCell(value: boolean | string) {
  if (value === true) {
    return (
      <svg
        className="mx-auto h-5 w-5 text-teal dark:text-teal-dark"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        aria-label="Included"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    );
  }
  if (value === false) {
    return (
      <span className="text-gray-400 dark:text-gray-500" aria-label="Not included">
        —
      </span>
    );
  }
  return (
    <span className="text-sm font-medium text-charcoal dark:text-dark-text">
      {value}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Pricing() {
  return (
    <>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── 1. Hero (navy) ───────────────────────────────────────── */}
      <AnimatedHero className="bg-navy px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto text-center">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Packages Built for Your Practice Size
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
                Three tiers. Fixed cost. No percentage of collections. Own your
                billing infrastructure instead of renting it.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="rounded-lg bg-coral px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-coral-hover"
                >
                  Request a Billing Analysis
                </Link>
                <a
                  href="#packages"
                  className="rounded-lg border border-white/30 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View Packages
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </AnimatedHero>

      {/* ── 2. Tier Cards (white) ────────────────────────────────── */}
      <section
        id="packages"
        className="scroll-mt-24 bg-white px-6 py-20 dark:bg-dark-bg lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Choose Your Package
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Each tier includes the on-premise AI appliance, full claim
              pipeline, and air-gapped security. Higher tiers add multi-specialty
              support, analytics, and dedicated account management.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <StaggerItem key={tier.id}>
                <HoverCard
                  className={`relative flex h-full flex-col rounded-xl border bg-white p-6 dark:bg-dark-elevated ${
                    tier.highlighted
                      ? "border-2 border-teal dark:border-teal-dark"
                      : "border-gray-300 dark:border-dark-border"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-1 text-xs font-bold uppercase tracking-wide text-white dark:bg-teal-dark">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy font-heading text-lg font-bold text-white dark:bg-teal">
                      {tier.id}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-navy dark:text-white">
                        {tier.label}
                      </h3>
                      <p className="text-sm font-medium text-teal dark:text-teal-dark">
                        {tier.providers}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                    {tier.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
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
                        <span className="text-sm text-charcoal dark:text-dark-text">
                          {feature}
                        </span>
                      </li>
                    ))}
                    {tier.excluded?.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 opacity-40">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-sm text-charcoal-light line-through dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Link
                      href="/contact"
                      className="block rounded-lg bg-coral px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-coral-hover"
                    >
                      Contact for Pricing
                    </Link>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ── 3. Feature Comparison Table (ice) ────────────────────── */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Feature Comparison
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              A detailed look at what is included in each package. All tiers
              share the same core pipeline and security architecture.
            </p>
          </FadeIn>

          {/* Desktop Table */}
          <FadeIn delay={0.2}>
            <div className="mt-12 overflow-x-auto rounded-xl border border-gray-300 dark:border-dark-border">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="bg-navy">
                    <th className="sticky left-0 z-10 w-[30%] bg-navy px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center font-heading text-sm font-bold uppercase tracking-wide text-gray-300">
                      SR-1
                    </th>
                    <th className="bg-teal/20 px-6 py-4 text-center font-heading text-sm font-bold uppercase tracking-wide text-teal-light">
                      SR-2
                    </th>
                    <th className="px-6 py-4 text-center font-heading text-sm font-bold uppercase tracking-wide text-gray-300">
                      SR-3
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, i) => (
                    <tr
                      key={row.feature}
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
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCell(row.sr1)}
                      </td>
                      <td className="bg-teal/5 px-6 py-4 text-center dark:bg-teal/10">
                        {renderCell(row.sr2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCell(row.sr3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── 4. Payment Structure (white) ─────────────────────────── */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Ownership, Not Subscription
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Sovereign RCM is a one-time capital expenditure. You own the
                appliance, the software runs locally, and there are no recurring
                fees. The cost stays flat whether you process 100 claims a month
                or 10,000.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                As your practice grows, your billing cost per claim decreases.
                That is the opposite of percentage-based billing, where growing
                revenue means growing costs.
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
                  href="/sovereign-rcm/pilot-program"
                  className="mt-6 inline-block text-sm font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                >
                  Learn about the 90-day pilot
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* ── 5. Which Package Is Right? (ice) ─────────────────────── */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Which Package Is Right for You?
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Not sure which tier fits your practice? Here is how most practices
              align.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {scenarios.map((scenario) => (
              <StaggerItem key={scenario.tier}>
                <HoverCard className="h-full rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <span className="inline-block rounded bg-navy px-3 py-1 font-heading text-sm font-bold text-white dark:bg-teal">
                    {scenario.tier}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-navy dark:text-white">
                    {scenario.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                    {scenario.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-block text-sm font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                  >
                    Get a quote for {scenario.tier}
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 6. FAQ (white) ───────────────────────────────────────── */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Pricing FAQ
            </h2>
            <p className="mt-4 text-lg text-charcoal-light dark:text-gray-300">
              Common questions about Sovereign RCM pricing, payment, and package
              selection.
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
              Request a Custom Quote
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Tell us about your practice — specialty, provider count, and claim
              volume — and we will put together pricing tailored to your needs.
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
