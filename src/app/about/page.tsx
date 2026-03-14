import type { Metadata } from "next";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedHero,
  HoverCard,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "About: Mission & Values",
  description:
    "The mission and values behind Sovereign RCM. On-premise AI billing built on principles of alignment, discipline, and long-term thinking. Princeton, NJ.",
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
    name: "Mission Drives Outcome",
    description: "We execute relentlessly and trust the process.",
  },
];

const values = [
  "We move with conviction, knowing disciplined effort yields worthy results",
  "Opportunity favors those who prepare with intention",
  "Partnership built on mutual respect and accountability",
  "Integrity is non-negotiable, in every decision",
  "We build for the long term. Systems that outlive any single project",
];

const mission = "Medical practices shouldn't have to choose between accurate billing and data security, or pay a perpetual tax for either. Sovereign RCM is AI that runs inside your facility, codes claims from clinical notes, and keeps every byte of PHI under your roof.";

export default function About() {
  return (
    <>
      {/* Hero */}
      <AnimatedHero className="bg-navy px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Why Sovereign RCM Exists
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Medical billing belongs inside your building, not in the cloud.
                Sovereign RCM combines clinical expertise, engineering
                discipline, and operational rigor to make that possible.
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
                <HoverCard className="h-full rounded-xl border border-gray-300 border-t-2 border-t-steel bg-ice p-6 dark:border-dark-border dark:border-t-steel-light dark:bg-dark-surface">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-steel/10 dark:bg-steel-light/10">
                    <p className="font-heading text-lg font-bold text-steel dark:text-steel-light">
                      {pillar.number}
                    </p>
                  </div>
                  <h3 className="mt-3 font-heading text-base font-bold text-navy dark:text-white">
                    {pillar.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                    {pillar.description}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

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
                  <div className="h-2 w-2 shrink-0 rounded-full bg-coral" />
                  <p className="text-lg leading-relaxed text-charcoal dark:text-dark-text">
                    {value}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-navy px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Our Mission
            </h2>
            <p className="mx-auto mt-8 text-xl leading-relaxed text-gray-300">
              {mission}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white">
              Ready to Work With Us?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light dark:text-gray-300">
              We build for the long term. Systems that outlive any single
              project. Let&apos;s talk
            </p>
            <div className="mt-8">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-block rounded-lg bg-coral px-10 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover"
                >
                  Get in Touch
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
