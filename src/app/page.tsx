import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-navy px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Practice&apos;s Billing, Powered by On-Premise AI
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
              Sovereign RCM is an AI appliance that lives inside your practice.
              It drafts compliant claims, catches undercoding, and builds
              audit-ready evidence packs — without your patient data ever
              leaving the building.
            </p>
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
          </div>
        </div>
      </section>

      {/* 2. Triple Leak */}
      <section className="bg-white px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              The Triple Leak Draining Your Practice
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light">
              Most practices lose revenue in three places they never see.
              Sovereign RCM closes all three.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Billing Cost",
                stat: "~5%",
                description:
                  "of collections go to billing and RCM overhead. Sovereign RCM reduces rework, denials, and manual coding labor.",
              },
              {
                title: "Undercoding Loss",
                stat: "$30K+",
                description:
                  "per year lost by family physicians from systematic undercoding. AAFP estimates miscoding level 4 as level 3 costs this much annually.",
              },
              {
                title: "Security Exposure",
                stat: "~50%",
                description:
                  "of U.S. claims processing was disrupted by the Change Healthcare cyberattack. Sovereign RCM keeps all PHI local.",
              },
            ].map((leak) => (
              <div
                key={leak.title}
                className="rounded-xl border border-gray-200 bg-ice p-8"
              >
                <p className="font-heading text-4xl font-bold text-teal">
                  {leak.stat}
                </p>
                <h3 className="mt-3 font-heading text-xl font-bold text-navy">
                  {leak.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal-light">
                  {leak.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Visual — How It Works */}
      <section className="bg-ice px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              From Clinical Notes to Clean Claims
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light">
              Sovereign RCM processes everything inside your practice — no cloud, no exposure.
            </p>
          </div>
          <div className="mt-16 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-0">
            {[
              { label: "EHR", sub: "Signed clinical notes" },
              { label: "Sovereign RCM", sub: "On-premise AI enclave" },
              { label: "837P Claims", sub: "Compliant output" },
              { label: "Audit Pack", sub: "Evidence + rationale" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="flex h-28 w-44 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                  <p className="font-heading text-base font-bold text-navy">
                    {step.label}
                  </p>
                  <p className="mt-1 text-sm text-charcoal-light">
                    {step.sub}
                  </p>
                </div>
                {i < 3 && (
                  <svg
                    className="hidden h-6 w-6 text-teal md:block"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Packages */}
      <section className="bg-white px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              Built for Practices of Every Size
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light">
              Three packages. Fixed pricing. No percentage of collections.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
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
              <div
                key={pkg.name}
                className={`rounded-xl border p-8 ${
                  i === 1
                    ? "border-teal bg-navy text-white shadow-lg"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p
                  className={`font-heading text-sm font-bold uppercase tracking-wider ${
                    i === 1 ? "text-teal-light" : "text-teal"
                  }`}
                >
                  {pkg.name}
                </p>
                <h3
                  className={`mt-2 font-heading text-2xl font-bold ${
                    i === 1 ? "text-white" : "text-navy"
                  }`}
                >
                  {pkg.target}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    i === 1 ? "text-gray-300" : "text-charcoal-light"
                  }`}
                >
                  {pkg.providers} &middot; {pkg.units}
                </p>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        i === 1 ? "text-gray-300" : "text-charcoal-light"
                      }`}
                    >
                      <svg
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          i === 1 ? "text-teal-light" : "text-teal"
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
                <Link
                  href="/contact"
                  className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-medium transition-colors ${
                    i === 1
                      ? "bg-coral text-white hover:bg-coral-hover"
                      : "border border-navy bg-navy text-white hover:bg-navy-light"
                  }`}
                >
                  Contact for Pricing
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Difference */}
      <section className="bg-ice px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              A Different Category Entirely
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light">
              Sovereign RCM is not outsourced billing. It&apos;s not cloud SaaS.
              It&apos;s an owned AI appliance with fixed pricing and zero PHI exposure.
            </p>
          </div>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b-2 border-navy">
                  <th className="pb-4 pr-6 font-heading text-sm font-bold uppercase tracking-wider text-navy">
                    Feature
                  </th>
                  <th className="pb-4 pr-6 font-heading text-sm font-bold uppercase tracking-wider text-navy">
                    Outsourced Billing
                  </th>
                  <th className="pb-4 pr-6 font-heading text-sm font-bold uppercase tracking-wider text-navy">
                    Cloud SaaS
                  </th>
                  <th className="pb-4 font-heading text-sm font-bold uppercase tracking-wider text-teal">
                    Sovereign RCM
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-charcoal-light">
                {[
                  ["Pricing", "% of collections", "Monthly subscription", "Fixed CapEx"],
                  ["PHI Location", "Third-party servers", "Cloud-hosted", "Your building only"],
                  ["AI Inference", "None or cloud", "Cloud-hosted", "On-premise, air-gapped"],
                  ["Evidence Trail", "Limited", "Varies", "Full rationale + spans"],
                  ["Data Ownership", "Vendor controls", "Vendor controls", "Practice owns 100%"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-gray-200">
                    <td className="py-4 pr-6 font-medium text-navy">
                      {row[0]}
                    </td>
                    <td className="py-4 pr-6">{row[1]}</td>
                    <td className="py-4 pr-6">{row[2]}</td>
                    <td className="py-4 font-medium text-teal">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Meet the Team */}
      <section className="bg-white px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              Meet the Founders
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light">
              A physician who knows the problem. An engineer who builds the
              solution. A PE who manages complex regulated implementations.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Faizan G. Arif, MD",
                role: "Chief Executive Officer",
                credential: "Physician | AI-Clinical Strategist",
                description:
                  "The clinical visionary behind RizeX. Board-certified EM physician who's coded, billed, and fought denials from the bedside at the highest-volume EDs in the country. Founder of ArifMED INC — bridging healthcare, AI, and research.",
              },
              {
                name: "Navid M. Rahman, PE",
                role: "Chief Operating Officer",
                credential: "Licensed PE | Regulated Project Leader",
                description:
                  "The operational backbone of RizeX. 15+ years managing multi-million-dollar regulated infrastructure across three states. Translates complex compliance and procurement into structured AI deployment playbooks.",
              },
              {
                name: "Ghulam Shah",
                role: "Chief Technology Officer",
                credential: "AI Architect | Data Strategist",
                description:
                  "The technical force behind RizeX. Architected enterprise data platforms at scale, built ML forecasting models, and led data adoption across Fortune 500 organizations. Turns complex AI into production-grade products.",
              },
            ].map((founder) => (
              <div
                key={founder.name}
                className="rounded-xl border border-gray-200 bg-white p-8"
              >
                {/* Photo placeholder */}
                <div className="mx-auto h-32 w-32 rounded-full bg-ice" />
                <div className="mt-6 text-center">
                  <h3 className="font-heading text-xl font-bold text-navy">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-teal">
                    {founder.role}
                  </p>
                  <p className="mt-1 text-xs text-charcoal-light">
                    {founder.credential}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-light">
                    {founder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Blog Preview */}
      <section className="bg-ice px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              From the Blog
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light">
              Insights on AI medical billing, revenue cycle management, and
              healthcare technology.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              "How AI Is Changing Medical Billing for Small Practices",
              "How Much Revenue Is Your Practice Losing to Claim Denials?",
              "What the Change Healthcare Attack Means for Your Practice",
            ].map((title) => (
              <div
                key={title}
                className="rounded-xl border border-gray-200 bg-white p-8"
              >
                <div className="h-40 rounded-lg bg-gray-100" />
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-teal">
                  Coming Soon
                </p>
                <h3 className="mt-2 font-heading text-lg font-bold text-navy">
                  {title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="bg-navy px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            See How Much Revenue You&apos;re Leaving on the Table
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Every day without optimized billing is revenue lost. Let&apos;s talk
            about what Sovereign RCM can do for your practice.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-coral px-10 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
