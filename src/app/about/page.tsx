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
    image: "/FaizMD.jpeg",
    imageStyle: {} as React.CSSProperties,
    imageObjectPosition: "40% top",
    credential:
      "Board-Certified Emergency Medicine Physician | Founder & CEO, ArifMED INC | Principal Investigator",
    bio: "Faizan is a board-certified Emergency Medicine physician who has worked in some of the highest-volume emergency departments in the country, including Kings County (140,000+ annual visits), NYC Elmhurst (Level 1 Trauma, 120,000+), and Mount Sinai. He founded ArifMED INC, a physician-led services company managing contracted coverage, credentialing, scheduling, compliance, and concierge care. As PI and Site Medical Lead at Clinilabs, he brings GCP-aligned research rigor, audit readiness, and sponsor-facing execution.",
    impact:
      "Faizan brings the clinical domain authority that makes Sovereign RCM possible. He understands medical billing, coding complexity, denial patterns, and documentation requirements from the bedside. His applied AI workflow experience bridges clinical operations and technology implementation.",
    awards:
      "ED Physician of the Year | Patient Care Experience Champion | Outstanding Leadership Award | MD, American University of the Caribbean; BA, Rutgers | English, Urdu, Hindi, Spanish",
  },
  {
    name: "Navid M. Rahman, PE",
    role: "Chief Operating Officer",
    image: "/NavidHeadshot.jpeg",
    imageStyle: { transform: "scale(2)", transformOrigin: "43% 35%" } as React.CSSProperties,
    imageObjectPosition: "43% 35%",
    credential:
      "Professional Engineer (NJ, NY, PA) | 15+ Years Bridge & Infrastructure | Procurement & Regulated Project Leadership",
    bio: "Navid is a Professional Engineer licensed in three states with over 15 years leading bridge replacement, rehabilitation, inspection, and load rating programs. He coordinates multi-million-dollar infrastructure projects with NJDOT, NYSDOT, NJTA, PANYNJ, PennDOT, DRPA, and DRJTBC — navigating procurement paths, regulatory standards, and multi-stakeholder approvals that define complex regulated work.",
    impact:
      "Navid brings regulated project management at scale to Sovereign RCM. His experience with design approvals, contractor coordination, and procurement in safety-critical environments translates directly to Sovereign RCM's implementation process: hardware deployment, compliance documentation, and structured rollout playbooks. He also founded Navigator's Watches, LLC.",
    awards:
      "PE (NJ, NY, PA) | NBIS Inspection | LRFR Training | OSHA 10 | English, Urdu, Hindi",
  },
  {
    name: "Ghulam Shah",
    role: "Chief Technology Officer",
    image: "/GhulamPhoto.jpg",
    imageStyle: { transform: "scale(1.8)", transformOrigin: "46% top" } as React.CSSProperties,
    imageObjectPosition: "46% 20%",
    credential:
      "Enterprise Data & AI Operator | M.S. Data Science | Snowflake, ML, Workflow Automation",
    bio: "Ghulam is an enterprise data and AI operator currently serving as Lead Data Analyst at National Grid, where he runs enablement and adoption for a Snowflake-backed Electric Data Platform. He built workflow automation (Power Apps + Power Automate) that moved safety compliance from 60% to 93%, and develops applied ML forecasting models for operational risk prevention. Prior experience includes billion-record data migration at Apple Finance and regulated compliance SaaS at RELX.",
    impact:
      "Ghulam is the technical architect behind Sovereign RCM. His experience building enterprise data platforms, ML models, and workflow automation, combined with regulated environments, data governance, and adoption-first design, makes him the builder who translates Sovereign RCM from concept to deployed product. Led teams up to 42 people; $2M+ B2B revenue at Apple.",
    awards:
      "60%→93% compliance | 384 hrs/yr saved | $2M+ revenue | 17% productivity gain",
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
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              The Founding Team
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              A physician who knows the problem. An engineer who builds the
              solution.
              <br />
              A PE who manages complex regulated implementations.
            </p>
          </FadeIn>
          <div className="mt-16 space-y-16">
            {founders.map((founder, i) => (
              <FadeIn
                key={founder.name}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={0.1}
              >
                <div
                  className={`flex flex-col gap-8 lg:flex-row ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex shrink-0 items-center justify-center">
                    {founder.image ? (
                      <div className="h-48 w-48 overflow-hidden rounded-2xl dark:ring-1 dark:ring-dark-border">
                        <div className="h-full w-full" style={founder.imageStyle}>
                          <Image
                            src={founder.image}
                            alt={founder.name}
                            width={384}
                            height={384}
                            className="h-full w-full object-cover"
                            style={{ objectPosition: founder.imageObjectPosition }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 w-48 rounded-2xl bg-ice dark:bg-dark-surface" />
                    )}
                  </div>
                  {/* Bio */}
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl font-bold text-navy dark:text-white">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-base font-medium text-teal dark:text-teal-dark">
                      {founder.role}
                    </p>
                    <p className="mt-1 text-sm text-charcoal-light dark:text-gray-400">
                      {founder.credential}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                      {founder.bio}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                      {founder.impact}
                    </p>
                    <p className="mt-4 text-sm italic text-charcoal-light dark:text-gray-400">
                      {founder.awards}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
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
