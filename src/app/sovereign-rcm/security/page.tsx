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
  DataFlowVisualization,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Security & HIPAA — Sovereign RCM",
  description:
    "Sovereign RCM is deployed on-premise in an air-gapped enclave. No PHI leaves your building. HIPAA-compliant by architecture, not by policy.",
  openGraph: {
    title: "Security & HIPAA — Sovereign RCM",
    description:
      "On-premise AI billing that keeps patient data inside your building. Air-gapped, HIPAA-compliant by architecture.",
    url: "https://rizexcapital.com/sovereign-rcm/security",
    type: "website",
  },
  alternates: {
    canonical: "https://rizexcapital.com/sovereign-rcm/security",
  },
};

const securityFeatures = [
  {
    icon: "🔒",
    title: "Air-Gapped Processing",
    description:
      "All AI inference runs locally on the appliance. No internet connection is required for claim generation. Your clinical data is processed in a fully isolated environment.",
  },
  {
    icon: "🏥",
    title: "PHI Stays On-Premise",
    description:
      "Patient records, clinical notes, and billing data never travel to cloud servers or third-party processors. Zero external data transmission by design.",
  },
  {
    icon: "🔑",
    title: "You Own Your Data",
    description:
      "No vendor has access to your data without explicit, documented permission. The appliance is yours — physically inside your facility, under your control.",
  },
];

const faqs = [
  {
    question: "How does Sovereign RCM protect patient data?",
    answer:
      "Sovereign RCM processes all data locally on a physical appliance inside your facility. Clinical notes, patient records, and billing data never leave your building. There is no cloud component, no external API calls during claim generation, and no third-party data sharing. The appliance operates in an air-gapped environment — it does not require an internet connection to function.",
  },
  {
    question: "Is Sovereign RCM HIPAA compliant?",
    answer:
      "Yes. Sovereign RCM is HIPAA-compliant by architecture, not just by policy. Because PHI never leaves your premises, the entire category of transmission and cloud-storage risks is eliminated. There are no Business Associate Agreements needed for data processing — the data stays under your direct control. We provide full documentation for your compliance team.",
  },
  {
    question: "What about attacks like the Change Healthcare breach?",
    answer:
      "The 2024 Change Healthcare attack exposed 192.7 million patient records and disrupted roughly 40% of U.S. medical claims — because all that data was centralized in cloud infrastructure. Sovereign RCM takes the opposite approach: your data lives on a local appliance with no external network dependency. A breach at a clearinghouse or cloud vendor cannot reach data that was never sent there.",
  },
  {
    question: "Who has access to our data on the appliance?",
    answer:
      "Only your authorized staff. RizeX has zero standing access to the appliance or any data on it. During the initial installation and 90-day pilot, our engineering team works on-site or via a temporary, monitored connection that you control and can revoke at any time. After deployment, the appliance operates independently.",
  },
  {
    question: "What happens to our data if we stop using Sovereign RCM?",
    answer:
      "Your data is yours. If you discontinue service, all processed records, claim history, and configuration data remain on the appliance hardware in your facility. We provide export tooling in standard formats so you can migrate to any system. Nothing is held hostage, and nothing is deleted without your explicit instruction.",
  },
];

// FAQPage JSON-LD for Google rich results
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

export default function Security() {
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
                Security &amp; HIPAA
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                On-premise. Air-gapped. Your data never leaves your building.
              </p>
            </FadeIn>
          </div>
        </div>
      </AnimatedHero>

      {/* Security Architecture */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Security Architecture
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-charcoal-light dark:text-gray-300">
              Sovereign RCM eliminates cloud risk at the architectural level.
              Patient data stays inside your facility because the system was
              designed that way from day one.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {securityFeatures.map((feature) => (
              <StaggerItem key={feature.title}>
                <HoverCard className="h-full rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated">
                  <p className="text-3xl" aria-hidden="true">
                    {feature.icon}
                  </p>
                  <h3 className="mt-4 font-heading text-xl font-bold text-navy dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                    {feature.description}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Change Healthcare Context */}
      <section className="relative overflow-hidden bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <DataFlowVisualization />
        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeIn direction="left">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
                Why This Matters Now
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                In February 2024, the Change Healthcare attack exposed 192.7
                million patient records and disrupted claims processing for roughly
                40% of U.S. healthcare transactions. Practices lost weeks of
                revenue. Patients had prescriptions delayed. The root cause was
                architectural: all that data was centralized in cloud
                infrastructure.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal dark:text-dark-text">
                Sovereign RCM is the architectural answer. When patient data never
                leaves your building, a breach at a clearinghouse or cloud vendor
                has zero impact on your practice. This isn&apos;t a feature
                checkbox — it&apos;s a fundamentally different approach to billing
                infrastructure.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/sovereign-rcm"
                  className="rounded-lg border border-navy/20 px-6 py-3 text-center text-base font-medium text-navy transition-colors hover:bg-navy hover:text-white dark:border-dark-border dark:text-white dark:hover:bg-dark-elevated"
                >
                  Sovereign RCM Overview
                </Link>
                <Link
                  href="/sovereign-rcm/pilot-program"
                  className="rounded-lg border border-navy/20 px-6 py-3 text-center text-base font-medium text-navy transition-colors hover:bg-navy hover:text-white dark:border-dark-border dark:text-white dark:hover:bg-dark-elevated"
                >
                  90-Day Pilot Program
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              Security FAQs
            </h2>
            <p className="mt-4 text-lg text-charcoal-light dark:text-gray-300">
              Common questions from physicians and practice managers about data
              security, HIPAA compliance, and how Sovereign RCM protects patient
              information.
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
          </FadeIn>
          <p className="mt-8 text-sm text-charcoal-light dark:text-gray-400">
            Have a specific security concern not covered here?{" "}
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

    </>
  );
}
