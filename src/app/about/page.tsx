import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionDivider from "@/components/SectionDivider";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedHero,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "About — Founders & Philosophy",
  description:
    "Meet the team behind Sovereign RCM — three founders built on shared principles of alignment, discipline, and long-term thinking. Princeton, NJ.",
};

const pillars = [
  {
    number: "01",
    name: "Alignment Before Action",
    description: "Every partnership begins with shared values.",
  },
  {
    number: "02",
    name: "Discipline Before Expansion",
    description: "We scale what is structured, not reactive.",
  },
  {
    number: "03",
    name: "Character Before Capital",
    description: "We invest in people and principles first.",
  },
  {
    number: "04",
    name: "Strategy Before Speed",
    description: "Measured growth outperforms reactive movement.",
  },
  {
    number: "05",
    name: "Faith Above Outcome",
    description: "We execute relentlessly and trust the process.",
  },
];

const values = [
  "We move with conviction, knowing disciplined effort yields worthy results.",
  "Opportunity favors those who prepare with intention.",
  "Partnership built on mutual respect and accountability.",
  "Integrity is non-negotiable — in every decision.",
  "We build for the long term — systems that outlive any single project.",
];

const founders = [
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
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <AnimatedHero className="bg-navy px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                The Team Behind Sovereign RCM
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Sovereign RCM was built by three founders who believe medical
                billing belongs inside your building, not in the cloud. We
                combine clinical expertise, engineering discipline, and
                operational rigor to deliver AI that practices actually own.
              </p>
            </FadeIn>
          </div>
        </div>
      </AnimatedHero>

      {/* Five Pillars */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Our Five Pillars
            </h2>
          </FadeIn>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-5">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.number}>
                <div className="h-full rounded-xl border border-gray-300 bg-ice p-6 dark:border-dark-border dark:bg-dark-surface">
                  <p className="font-heading text-3xl font-bold text-teal dark:text-teal-dark">
                    {pillar.number}
                  </p>
                  <h3 className="mt-3 font-heading text-base font-bold text-navy dark:text-white">
                    {pillar.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                    {pillar.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Values */}
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              What We Believe
            </h2>
          </FadeIn>
          <StaggerContainer className="mt-12 space-y-6">
            {values.map((value) => (
              <StaggerItem key={value}>
                <div className="flex items-center gap-4 rounded-lg bg-white p-6 dark:bg-dark-elevated">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-teal" />
                  <p className="text-lg leading-relaxed text-charcoal dark:text-dark-text">
                    {value}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Founders */}
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
            {founders.map((founder) => (
              <StaggerItem key={founder.name}>
                <div className="h-full rounded-xl border border-gray-300 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
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
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* CTA */}
      <section className="bg-navy px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white">
              Ready to Work With Us?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              We build for the long term — systems that outlive any single
              project. Let&apos;s talk.
            </p>
            <div className="mt-8">
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
