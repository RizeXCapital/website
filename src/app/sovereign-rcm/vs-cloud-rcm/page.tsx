import type { Metadata } from "next";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import FaqItem from "@/components/FaqItem";
import Tooltip from "@/components/Tooltip";

export const metadata: Metadata = {
  title: "On-Premise AI vs. Cloud SaaS Billing — Sovereign RCM",
  description:
    "Compare Sovereign RCM's on-premise AI billing appliance to cloud SaaS RCM platforms. See how on-premise deployment eliminates breach risk, ends recurring fees, and gives you full data ownership.",
  openGraph: {
    title: "On-Premise AI vs. Cloud SaaS Billing — Sovereign RCM",
    description:
      "Compare Sovereign RCM's on-premise AI billing appliance to cloud SaaS RCM platforms. Security, cost, data ownership, and uptime — side by side.",
    url: "https://rizexcapital.com/sovereign-rcm/vs-cloud-rcm",
    type: "website",
  },
  alternates: {
    canonical: "https://rizexcapital.com/sovereign-rcm/vs-cloud-rcm",
  },
};

const cloudProblems = [
  {
    icon: "🛡️",
    title: "Security Exposure",
    description:
      "The 2024 Change Healthcare breach exposed 192.7 million patient records. Cloud billing centralizes PHI into a single attack surface — one breach compromises every practice on the platform.",
  },
  {
    icon: "💸",
    title: "Recurring Cost Drain",
    description:
      "Cloud RCM charges 4–8% of collections or $200–$500 per provider per month — indefinitely. A 5-provider practice pays $120K–$300K over five years with nothing to show for it.",
  },
  {
    icon: "🔗",
    title: "Vendor Lock-In",
    description:
      "Switching cloud RCM vendors costs $50K–$250K+ in migration, retraining, and downtime. Your data, workflows, and payer integrations are held hostage by the platform.",
  },
];

const comparisonRows = [
  {
    category: "Data Location",
    tooltip: "Where patient records and billing data are physically stored and processed",
    sovereign: "On-premise appliance in your facility",
    cloud: "Vendor-managed cloud servers",
  },
  {
    category: "PHI Transmission",
    tooltip: "Whether protected health information travels over external networks to reach the billing system",
    sovereign: "None — data never leaves the building",
    cloud: "Transmitted over internet to vendor infrastructure",
  },
  {
    category: "Breach Exposure",
    tooltip: "The scope of damage if the billing system or its vendor is compromised",
    sovereign: "Limited to your physical facility",
    cloud: "Vendor breach exposes all clients simultaneously",
  },
  {
    category: "Cost Model",
    tooltip: "How you pay for the billing system — one-time purchase vs. ongoing fees",
    sovereign: "One-time capital expenditure — you own it",
    cloud: "Recurring % of collections or per-provider monthly fee",
  },
  {
    category: "5-Year Total Cost",
    tooltip: "Cumulative spend over five years including all fees, subscriptions, and maintenance",
    sovereign: "Fixed hardware cost, no ongoing subscription",
    cloud: "$120K–$300K+ for a 5-provider practice",
  },
  {
    category: "Data Ownership",
    tooltip: "Who controls access to your billing data, claim history, and payer configurations",
    sovereign: "You own the hardware and all data on it",
    cloud: "Vendor controls data access, export, and retention",
  },
  {
    category: "Vendor Dependency",
    tooltip: "Whether your billing operations continue if the vendor has issues",
    sovereign: "Appliance operates independently after deployment",
    cloud: "Platform outage halts your billing operations",
  },
  {
    category: "Internet Required",
    tooltip: "Whether the system needs an active internet connection to process claims",
    sovereign: "No — fully air-gapped inference",
    cloud: "Yes — internet outage stops all billing",
  },
  {
    category: "BAA Complexity",
    tooltip: "The chain of Business Associate Agreements required to stay HIPAA-compliant",
    sovereign: "Simplified — PHI stays under your direct control",
    cloud: "Multi-party BAA chain with vendor subprocessors",
  },
  {
    category: "Switching Cost",
    tooltip: "The financial and operational cost of moving to a different billing system",
    sovereign: "Data stays on your hardware in standard formats",
    cloud: "$50K–$250K+ in migration and retraining",
  },
];

const faqs = [
  {
    question:
      "Isn't the upfront cost of on-premise higher than starting with cloud?",
    answer:
      "The initial capital outlay for Sovereign RCM is higher than the first monthly payment on a cloud subscription. But cloud fees never stop. Over a 3–5 year period, the total cost of a cloud platform significantly exceeds the one-time cost of owning your infrastructure. Most practices reach cost parity within 18–24 months, and everything after that is savings. Use our ROI calculator to model the numbers for your practice size.",
  },
  {
    question: "We already use a cloud RCM platform. Can we switch?",
    answer:
      "Yes. We run a 90-day pilot in shadow mode alongside your existing billing system. During the pilot, Sovereign RCM processes claims in parallel without disrupting your current workflow. This lets you validate clean-claim rates, denial rate reduction, and time savings before making the transition. Migration support is included — we handle data mapping and payer enrollment coordination.",
  },
  {
    question: "Does the appliance need to connect to payers and clearinghouses?",
    answer:
      "Claim submission to payers and clearinghouses does require a controlled, outbound-only network connection — the same connection your practice already uses for claim submission today. The critical difference: clinical notes and patient records are processed entirely on the local appliance. Only the final, formatted 837P claim is transmitted, containing the minimum data required by the payer. No bulk PHI is ever sent to a cloud service.",
  },
  {
    question: "How are updates and maintenance handled?",
    answer:
      "Software updates are delivered on encrypted media or through a secure, authenticated channel that you initiate. Updates are never pushed automatically — your team controls when and whether to apply them. The appliance includes self-diagnostic monitoring that alerts you to hardware health issues. For practices that want hands-off maintenance, we offer optional support agreements.",
  },
  {
    question: "Is Sovereign RCM only for large practices?",
    answer:
      "No. Sovereign RCM starts at the SR-1 tier for practices with 1–3 providers. Small practices often have the most to gain — they pay the highest percentage of collections to outsourced billing and have the least bargaining power to negotiate rates. The appliance scales from solo practices to multi-specialty groups with up to 25 providers.",
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

export default function VsCloudRCM() {
  return (
    <>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-navy px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              On-Premise AI vs. Cloud SaaS Billing
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Why practices are choosing to own their billing infrastructure
              instead of renting it.
            </p>
          </div>
        </div>
      </section>

      {/* The Cloud Problem */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
            The Cloud Problem
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
            Cloud RCM platforms centralize your most sensitive data on
            infrastructure you don&apos;t control. That creates three compounding
            risks.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {cloudProblems.map((problem) => (
              <div
                key={problem.title}
                className="rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated"
              >
                <p className="text-3xl" aria-hidden="true">
                  {problem.icon}
                </p>
                <h3 className="mt-4 font-heading text-xl font-bold text-navy dark:text-white">
                  {problem.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Side-by-Side Comparison */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
            Side-by-Side Comparison
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
            How Sovereign RCM compares to cloud SaaS billing platforms across the
            dimensions that matter most.
          </p>

          {/* Desktop Table */}
          <div className="mt-12 hidden rounded-xl border border-gray-300 dark:border-dark-border md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide">
                    Category
                  </th>
                  <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide">
                    Sovereign RCM
                  </th>
                  <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide">
                    Cloud SaaS
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.category}
                    className={
                      i % 2 === 0
                        ? "bg-white dark:bg-dark-bg"
                        : "bg-ice dark:bg-dark-surface"
                    }
                  >
                    <td className="px-6 py-4 font-heading text-sm font-bold text-navy dark:text-white">
                      {row.tooltip ? (
                        <Tooltip text={row.tooltip}>{row.category}</Tooltip>
                      ) : (
                        row.category
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal dark:text-dark-text">
                      {row.sovereign}
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-light dark:text-gray-300">
                      {row.cloud}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="mt-12 space-y-4 md:hidden">
            {comparisonRows.map((row) => (
              <div
                key={row.category}
                className="rounded-xl border border-gray-300 bg-white p-5 dark:border-dark-border dark:bg-dark-elevated"
              >
                <p className="font-heading text-sm font-bold uppercase tracking-wide text-navy dark:text-white">
                  {row.tooltip ? (
                    <Tooltip text={row.tooltip}>{row.category}</Tooltip>
                  ) : (
                    row.category
                  )}
                </p>
                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-teal dark:text-teal-dark">
                      Sovereign RCM
                    </p>
                    <p className="mt-1 text-sm text-charcoal dark:text-dark-text">
                      {row.sovereign}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-charcoal-light dark:text-gray-400">
                      Cloud SaaS
                    </p>
                    <p className="mt-1 text-sm text-charcoal-light dark:text-gray-300">
                      {row.cloud}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive: Security */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Security: Breach Risk Comparison
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Healthcare data breaches reached record levels in 2024. The HHS
                Office for Civil Rights reported 725 major incidents exposing
                over 275 million patient records. The Change Healthcare attack
                alone compromised 192.7 million records — roughly 60% of the
                U.S. population.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Cloud RCM platforms are high-value targets because they
                aggregate data from thousands of practices into centralized
                infrastructure. Sovereign RCM eliminates this risk category
                entirely. Your data sits on a local appliance — a breach at
                another organization has no impact on your practice.
              </p>
            </div>
            <div className="rounded-xl border border-gray-300 bg-ice p-8 dark:border-dark-border dark:bg-dark-surface">
              <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                2024 Healthcare Breach Data
              </h3>
              <ul className="mt-4 space-y-3 text-base text-charcoal dark:text-dark-text">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-coral">
                    &bull;
                  </span>
                  <span>
                    <strong>725</strong> major breach incidents reported to HHS
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-coral">
                    &bull;
                  </span>
                  <span>
                    <strong>275M+</strong> patient records exposed
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-coral">
                    &bull;
                  </span>
                  <span>
                    <strong>192.7M</strong> records from Change Healthcare alone
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-coral">
                    &bull;
                  </span>
                  <span>
                    <strong>40%</strong> of U.S. claims disrupted for weeks
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
          </div>
        </div>
      </section>

      <SectionDivider variant="dark" />

      {/* Deep Dive: Cost */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="rounded-xl border border-gray-300 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Cloud RCM Cost Benchmarks
                </h3>
                <ul className="mt-4 space-y-3 text-base text-charcoal dark:text-dark-text">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">
                      &bull;
                    </span>
                    <span>
                      <strong>4–8%</strong> of collections (industry standard)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">
                      &bull;
                    </span>
                    <span>
                      <strong>$200–$500</strong> per provider per month (SaaS
                      tier)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">
                      &bull;
                    </span>
                    <span>
                      <strong>$120K–$300K+</strong> over 5 years for a
                      5-provider practice
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">
                      &bull;
                    </span>
                    <span>
                      Ongoing fees regardless of utilization or satisfaction
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
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Cost: Ownership vs. Subscription
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Cloud RCM pricing is designed to be easy to start and expensive
                to keep. Percentage-of-collections models mean your costs scale
                with your success — the more revenue you collect, the more you
                pay your billing vendor. Per-provider monthly fees compound
                quietly over years.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Sovereign RCM is a one-time capital expenditure. You purchase the
                appliance, deploy it in your facility, and own it outright. There
                are no recurring platform fees, no percentage cuts, and no
                surprise price increases. Most practices recover the investment
                within 18–24 months through eliminated billing fees and
                recaptured revenue from reduced undercoding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: Data Ownership */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Data Ownership: Your Practice, Your Data
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                With cloud RCM, your billing data, coding patterns, denial
                history, and payer configurations live on someone else&apos;s
                servers. Need to switch vendors? Expect migration costs of
                $50K–$250K+, months of transition time, and the risk of data
                loss or format incompatibility.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Sovereign RCM puts all data on hardware you physically own. Your
                claim history, coding models, and payer logic stay inside your
                facility in standard, exportable formats. There is no vendor that
                can hold your data hostage, raise prices, or discontinue a
                product and leave you scrambling.
              </p>
            </div>
            <div className="rounded-xl border border-gray-300 bg-ice p-8 dark:border-dark-border dark:bg-dark-surface">
              <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                Cloud Vendor Lock-In Costs
              </h3>
              <ul className="mt-4 space-y-3 text-base text-charcoal dark:text-dark-text">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-coral">
                    &bull;
                  </span>
                  <span>
                    <strong>$50K–$250K+</strong> typical migration cost
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-coral">
                    &bull;
                  </span>
                  <span>
                    <strong>3–6 months</strong> average transition timeline
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-coral">
                    &bull;
                  </span>
                  <span>Staff retraining, workflow disruption, revenue dips</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-coral">
                    &bull;
                  </span>
                  <span>
                    Proprietary data formats that resist clean export
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Deep Dive: Uptime */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="rounded-xl border border-gray-300 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                  Cloud Outage Impact
                </h3>
                <ul className="mt-4 space-y-3 text-base text-charcoal dark:text-dark-text">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">
                      &bull;
                    </span>
                    <span>
                      Athenahealth reported <strong>465+ outage incidents</strong> over
                      recent tracking periods
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">
                      &bull;
                    </span>
                    <span>
                      Internet dependency means ISP issues halt billing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">
                      &bull;
                    </span>
                    <span>
                      Vendor maintenance windows force downtime on your schedule
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-coral">
                      &bull;
                    </span>
                    <span>
                      Every hour of downtime delays claims and cash flow
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Uptime: No Internet, No Problem
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Cloud platforms depend on internet connectivity, vendor server
                uptime, and third-party infrastructure — all outside your
                control. When any link in that chain breaks, your billing stops.
                Athenahealth alone has logged over 465 outage incidents, each one
                delaying claims for thousands of practices simultaneously.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Sovereign RCM runs entirely on local hardware. Internet outages,
                vendor maintenance windows, and cloud provider incidents have
                zero effect on your billing operations. The appliance processes
                claims whenever your staff is ready — no external dependencies,
                no waiting on someone else&apos;s infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-charcoal-light dark:text-gray-300">
            Common questions from practices evaluating on-premise AI billing
            versus cloud SaaS platforms.
          </p>
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
        </div>
      </section>

      <SectionDivider variant="dark" />

      {/* CTA */}
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white">
            Ready to Own Your Billing Infrastructure?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Stop paying rent on your billing system. Sovereign RCM gives your
            practice full control — security, cost, data, and uptime — with no
            recurring platform fees.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-coral px-10 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover"
            >
              Request a Billing Analysis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
