import Link from "next/link";
import Image from "next/image";
import SectionDivider from "@/components/SectionDivider";
import { getRecentPosts, categoryLabels } from "@/lib/blog";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
  HoverCard,
  AnimatedHero,
  AnimatedPipeline,
} from "@/components/motion";

const upcomingPosts = [
  {
    title: "How Much Revenue Is Your Practice Losing to Claim Denials?",
    author: "Faizan G. Arif, MD",
    date: "March 2026",
    image: "/blog/revenue-leak-funnel.svg",
  },
  {
    title: "What the Change Healthcare Attack Means for Your Practice",
    author: "Navid M. Rahman, PE",
    date: "Late March 2026",
    image: "/blog/cloud-vs-onpremise.svg",
  },
];

function BlogPreviewSection() {
  const posts = getRecentPosts(3);

  return (
    <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              From the Blog
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Insights on AI medical billing, revenue cycle management, and
              healthcare technology
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Real posts */}
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full overflow-hidden rounded-xl border border-gray-300 bg-white transition-shadow hover:shadow-md dark:border-dark-border dark:bg-dark-elevated dark:hover:shadow-lg dark:hover:shadow-black/20"
              >
                {post.image && (
                  <div className="aspect-[21/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={257}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8">
                  <p className="text-xs font-medium uppercase tracking-wider text-teal dark:text-teal-dark">
                    {categoryLabels[post.category]}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold text-navy transition-colors group-hover:text-teal dark:text-white dark:group-hover:text-teal-dark">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-light dark:text-gray-400">
                    {post.author} &middot;{" "}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}

          {/* Upcoming post teasers to fill up to 3 */}
          {upcomingPosts.slice(0, 3 - posts.length).map((post) => (
            <StaggerItem key={post.title}>
              <div className="h-full overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-dark-border dark:bg-dark-elevated">
                {post.image && (
                  <div className="aspect-[21/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={257}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <p className="text-xs font-medium uppercase tracking-wider text-coral">
                    Coming Soon
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold text-navy dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-light dark:text-gray-400">
                    {post.author} &middot; {post.date}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All link */}
        <FadeIn delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="text-sm font-medium text-teal transition-colors hover:text-teal-light dark:text-teal-dark dark:hover:text-teal"
            >
              View All Posts &rarr;
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <AnimatedHero className="bg-navy px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your Practice&apos;s Billing, Powered by On-Premise AI
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
                Sovereign RCM is an AI appliance that lives inside your practice.
                It drafts compliant claims, catches undercoding, and builds
                audit-ready evidence packs — without your patient data ever
                leaving the building.
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
                <HoverCard className="h-full rounded-xl border border-gray-300 bg-ice p-8 dark:border-dark-border dark:bg-dark-surface">
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
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Divider: Triple Leak → Product Visual */}
      <SectionDivider variant="light" />

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
                  <Link
                    href="/contact"
                    className={`mt-auto block rounded-lg px-6 py-3 text-center text-sm font-medium transition-colors ${
                      i === 1
                        ? "bg-coral text-white hover:bg-coral-hover"
                        : "border border-navy bg-navy text-white hover:bg-navy-light"
                    }`}
                  >
                    Contact for Pricing
                  </Link>
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
              <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-dark-border">
                <table className="w-full min-w-[600px] text-center">
                  <thead>
                    <tr className="bg-navy dark:bg-navy-light">
                      <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white">
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
                        <td className="px-6 py-4 font-medium text-navy dark:text-white">
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

      {/* 6. Meet the Team */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Meet the Founders
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-lg text-charcoal-light dark:text-gray-300">
                A physician who knows the problem. An engineer who builds the solution. A PE who executes at scale
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Faizan G. Arif, MD",
                role: "Chief Executive Officer",
                credential: "Physician | AI-Clinical Strategist",
                image: "/FaizMD.jpeg",
                imageStyle: {} as React.CSSProperties,
                imageObjectPosition: "40% top",
                description:
                  "The clinical visionary behind Sovereign RCM. Board-certified EM physician who's coded, billed, and fought denials from the bedside at the highest-volume EDs in the country. Founder of ArifMED INC — bridging healthcare, AI, and research.",
              },
              {
                name: "Navid M. Rahman, PE",
                role: "Chief Operating Officer",
                credential: "Licensed PE | Regulated Project Leader",
                image: "/NavidHeadshot.jpeg",
                imageStyle: { transform: "scale(2)", transformOrigin: "43% 35%" } as React.CSSProperties,
                imageObjectPosition: "43% 35%",
                description:
                  "The operational backbone of Sovereign RCM. 15+ years managing multi-million-dollar regulated infrastructure across three states. Translates complex compliance and procurement into structured AI deployment playbooks.",
              },
              {
                name: "Ghulam Shah",
                role: "Chief Technology Officer",
                credential: "AI Architect | Data Strategist",
                image: "/GhulamPhoto.jpg",
                imageStyle: { transform: "scale(1.8)", transformOrigin: "46% top" } as React.CSSProperties,
                imageObjectPosition: "46% 20%",
                description:
                  "The technical force behind Sovereign RCM. Architected enterprise data platforms at scale, built ML forecasting models, and led data adoption across Fortune 500 organizations. Turns complex AI into production-grade products.",
              },
            ].map((founder) => (
              <StaggerItem key={founder.name}>
                <HoverCard className="h-full rounded-xl border border-gray-300 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
                  {founder.image ? (
                    <div className="mx-auto h-32 w-32 overflow-hidden rounded-full dark:ring-1 dark:ring-dark-border">
                      <div className="h-full w-full" style={founder.imageStyle}>
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          width={256}
                          height={256}
                          className="h-full w-full object-cover"
                          style={{ objectPosition: founder.imageObjectPosition }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mx-auto h-32 w-32 rounded-full bg-ice dark:bg-dark-surface" />
                  )}
                  <div className="mt-6 text-center">
                    <h3 className="font-heading text-xl font-bold text-navy dark:text-white">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-teal dark:text-teal-dark">
                      {founder.role}
                    </p>
                    <p className="mt-1 text-xs text-charcoal-light dark:text-gray-400">
                      {founder.credential}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                      {founder.description}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Divider: Meet the Team → Blog Preview */}
      <SectionDivider variant="light" />

      {/* 7. Blog Preview */}
      <BlogPreviewSection />

      {/* 8. Final CTA */}
      <section className="bg-navy px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
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
          </FadeIn>
        </div>
      </section>
    </>
  );
}
