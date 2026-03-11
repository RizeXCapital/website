import Link from "next/link";
import Image from "next/image";
import SectionDivider from "@/components/SectionDivider";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
  HoverCard,
  AnimatedHero,
  AnimatedPipeline,
} from "@/components/motion";


export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <AnimatedHero className="bg-navy px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Get Paid Faster While Keeping Patient Data Inside Your Practice
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
                Sovereign RCM is an AI-powered billing appliance installed
                directly in your clinic. It drafts compliant claims, captures
                missed revenue from undercoding, reduces denials, and accelerates
                reimbursements, all while keeping patient data securely inside
                your building.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Built by an EM physician and an AI architect
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-lg bg-coral px-8 py-4 text-center text-base font-medium text-white transition-colors hover:bg-coral-hover"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/sovereign-rcm"
                  className="rounded-lg border border-white/20 px-8 py-4 text-center text-base font-medium text-white transition-colors hover:border-teal hover:text-teal"
                >
                  Learn More
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </AnimatedHero>

      {/* 2a. Stats Band */}
      <section className="bg-navy px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-y-3 divide-x divide-white/10">
            {[
              { stat: "≥ 95%", label: "Clean-Claim Rate" },
              { stat: "≤ 48hr", label: "Deployment" },
              { stat: "$30K+", label: "Recaptured Per Provider" },
              { stat: "0", label: "PHI in the Cloud" },
            ].map((item) => (
              <div key={item.label} className="px-6 text-center first:pl-0 last:pr-0">
                <span className="font-heading text-lg font-bold text-coral">
                  {item.stat}
                </span>
                <span className="ml-2 text-sm text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2b. EHR Trust Bar */}
      <section className="bg-white px-6 py-4 dark:bg-dark-bg">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Compatible with
              </span>
              {["Epic", "Oracle Health", "athenahealth", "eClinicalWorks"].map((ehr) => (
                <span
                  key={ehr}
                  className="rounded border border-gray-200 px-3 py-1 text-sm font-medium text-gray-500 dark:border-dark-border dark:text-gray-400"
                >
                  {ehr}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-teal/20 bg-teal/5 px-4 py-2">
              <svg
                className="h-4 w-4 text-teal"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span className="text-sm font-semibold text-teal dark:text-teal-dark">
                HIPAA Compliant
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Triple Leak */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                The Triple Leak Draining Your Practice
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light dark:text-gray-300">
                Most practices lose revenue in three places they never see
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-lg font-medium text-teal dark:text-teal-dark">
                Sovereign RCM closes all three
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Billing Cost",
                statPrefix: "~",
                statEnd: 5,
                statSuffix: "%",
                description:
                  "of collections go to billing and RCM overhead. Sovereign RCM reduces rework, denials, and manual coding labor.",
              },
              {
                title: "Undercoding Loss",
                statPrefix: "$",
                statEnd: 30,
                statSuffix: "K+",
                description:
                  "per year lost by physicians from systematic undercoding. AAFP estimates miscoding level 4 as level 3 costs this annually.",
              },
              {
                title: "Security Exposure",
                statPrefix: "~",
                statEnd: 50,
                statSuffix: "%",
                description:
                  "of U.S. claims processing was disrupted by the Change Healthcare cyberattack. Sovereign RCM keeps all PHI local.",
              },
            ].map((leak) => (
              <StaggerItem key={leak.title}>
                <div className="h-full rounded-xl border border-gray-300 bg-ice p-8 dark:border-dark-border dark:bg-dark-surface">
                  <p className="font-heading text-4xl font-bold text-teal dark:text-teal-dark">
                    <CountUp
                      prefix={leak.statPrefix}
                      end={leak.statEnd}
                      suffix={leak.statSuffix}
                      duration={1.5}
                    />
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-bold text-navy dark:text-white">
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

      {/* Divider: Triple Leak → Product Visual */}
      <SectionDivider variant="light" />

      {/* Citation Strip */}
      <section className="bg-navy px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-y-2 divide-x divide-white/10">
            <span className="pr-6 text-xs font-medium uppercase tracking-wider text-gray-500 first:pl-0">
              Industry context from
            </span>
            {["MGMA", "AAFP", "AMA", "Modern Healthcare"].map((org) => (
              <span key={org} className="px-6 text-sm font-semibold text-gray-400">
                {org}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Visual — How It Works */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                From Clinical Notes to Clean Claims
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light dark:text-gray-300">
                Sovereign RCM processes everything inside your practice
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-lg font-medium text-teal dark:text-teal-dark">
                No cloud. No exposure
              </p>
            </div>
          </FadeIn>
          <AnimatedPipeline
            className="mt-16"
            steps={[
              { label: "EHR", sub: "Signed clinical notes", type: "input" },
              { label: "Sovereign RCM", sub: "On-premise AI enclave", type: "agent" },
              { label: "837P Claims", sub: "Compliant output", type: "output" },
              { label: "Audit Pack", sub: "Evidence + rationale", type: "output" },
            ]}
          />
        </div>
      </section>

      {/* 4. Packages */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Built for Practices of Every Size
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light dark:text-gray-300">
                Three packages. Fixed pricing. No percentage of collections
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "SR-1",
                target: "Solo / Small Practice",
                providers: "1-3 providers",
                units: "1 appliance unit",
                features: [
                  "Multi-agent AI pipeline",
                  "837P claim generation",
                  "Evidence pack & rationale",
                  "On-premise deployment",
                  "Annual support included",
                ],
              },
              {
                name: "SR-2",
                target: "Group Practice",
                providers: "4-10 providers",
                units: "2 appliance units",
                features: [
                  "Everything in SR-1",
                  "Multi-provider support",
                  "Priority onboarding",
                  "Extended training",
                  "Dedicated support line",
                ],
              },
              {
                name: "SR-3",
                target: "Enterprise",
                providers: "11-25 providers",
                units: "4 appliance units",
                features: [
                  "Everything in SR-2",
                  "Multi-location deployment",
                  "Custom payer configurations",
                  "Advanced analytics",
                  "SLA-backed support",
                ],
              },
            ].map((pkg, i) => (
              <StaggerItem key={pkg.name}>
                <HoverCard
                  className={`flex h-full flex-col rounded-xl border p-8 ${
                    i === 1
                      ? "border-teal bg-navy text-white shadow-lg"
                      : "border-gray-300 bg-white dark:border-dark-border dark:bg-dark-elevated"
                  }`}
                >
                  <p
                    className={`font-heading text-sm font-bold uppercase tracking-wider ${
                      i === 1 ? "text-teal-light" : "text-teal dark:text-teal-dark"
                    }`}
                  >
                    {pkg.name}
                  </p>
                  <h3
                    className={`mt-2 font-heading text-2xl font-bold ${
                      i === 1 ? "text-white" : "text-navy dark:text-white"
                    }`}
                  >
                    {pkg.target}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      i === 1 ? "text-gray-300" : "text-charcoal-light dark:text-gray-300"
                    }`}
                  >
                    {pkg.providers} &middot; {pkg.units}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2 text-sm ${
                          i === 1 ? "text-gray-300" : "text-charcoal-light dark:text-gray-300"
                        }`}
                      >
                        <svg
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            i === 1 ? "text-teal-light" : "text-teal dark:text-teal-dark"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Link
                      href="/contact"
                      className={`block rounded-lg px-6 py-3 text-center text-sm font-medium transition-colors ${
                        i === 1
                          ? "bg-coral text-white hover:bg-coral-hover"
                          : "border border-navy bg-navy text-white hover:bg-navy-light"
                      }`}
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

      {/* Divider: Packages → The Difference */}
      <SectionDivider variant="light" />

      {/* 5. The Difference */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                A Different Category Entirely
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light dark:text-gray-300">
                Not outsourced billing. Not cloud SaaS
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-lg font-medium text-teal dark:text-teal-dark">
                An owned AI appliance with fixed pricing and zero patient data exposure
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mx-auto mt-12 max-w-4xl overflow-x-auto">
              <div className="rounded-xl border border-gray-300 dark:border-dark-border">
                <table className="w-full min-w-[600px] text-center">
                  <thead>
                    <tr className="bg-navy dark:bg-navy-light">
                      <th className="sticky left-0 z-10 bg-navy px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] dark:bg-navy-light">
                        Feature
                      </th>
                      <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-gray-300">
                        Outsourced Billing
                      </th>
                      <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-gray-300">
                        Cloud SaaS
                      </th>
                      <th className="bg-teal/20 px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-teal-light">
                        Sovereign RCM
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      ["Pricing", "% of collections", "Monthly subscription", "Fixed CapEx"],
                      ["PHI Location", "Third-party servers", "Cloud-hosted", "Your building only"],
                      ["AI Inference", "None or cloud", "Cloud-hosted", "On-premise, air-gapped"],
                      ["Evidence Trail", "Limited", "Varies", "Full rationale + spans"],
                      ["Data Ownership", "Vendor controls", "Vendor controls", "Practice owns 100%"],
                    ].map((row, i) => (
                      <tr
                        key={row[0]}
                        className={
                          i % 2 === 0
                            ? "bg-white dark:bg-dark-elevated"
                            : "bg-ice dark:bg-dark-surface"
                        }
                      >
                        <td
                          className={`sticky left-0 z-10 px-6 py-4 font-medium text-navy shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] dark:text-white ${
                            i % 2 === 0
                              ? "bg-white dark:bg-dark-elevated"
                              : "bg-ice dark:bg-dark-surface"
                          }`}
                        >
                          {row[0]}
                        </td>
                        <td className="px-6 py-4 text-charcoal-light dark:text-gray-400">
                          {row[1]}
                        </td>
                        <td className="px-6 py-4 text-charcoal-light dark:text-gray-400">
                          {row[2]}
                        </td>
                        <td className="bg-teal/5 px-6 py-4 font-semibold text-teal dark:bg-teal/10 dark:text-teal-dark">
                          {row[3]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="bg-coral px-6 py-10 lg:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              See How Much Revenue You&apos;re Leaving on the Table
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Every day without optimized billing is revenue lost. Let&apos;s talk
              about what Sovereign RCM can do for your practice.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-white px-10 py-4 text-base font-medium text-coral transition-colors hover:bg-gray-100"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
