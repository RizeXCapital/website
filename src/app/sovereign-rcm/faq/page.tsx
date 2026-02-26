import type { Metadata } from "next";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "FAQ — Sovereign RCM",
  description:
    "Frequently asked questions about Sovereign RCM — how it works, installation, pricing, specialties, and support for your medical practice.",
  openGraph: {
    title: "FAQ — Sovereign RCM",
    description:
      "Answers to the most common questions about Sovereign RCM's on-premise AI billing appliance for medical practices.",
    url: "https://rizexcapital.com/sovereign-rcm/faq",
    type: "website",
  },
  alternates: {
    canonical: "https://rizexcapital.com/sovereign-rcm/faq",
  },
};

const faqCategories = [
  {
    heading: "Product & Technology",
    faqs: [
      {
        question: "What is Sovereign RCM?",
        answer:
          "Sovereign RCM is a physical AI appliance deployed inside your medical practice. It reads signed clinical notes and drafts compliant 837P professional claims using a multi-agent AI pipeline — Chart Reader, Procedure Specialist, Payer Logic Bot, and Denial Analyst. Everything runs locally. No PHI leaves your building.",
      },
      {
        question: "How does the AI generate claims from clinical notes?",
        answer:
          "The system uses a multi-agent pipeline. The Chart Reader extracts relevant clinical data from signed notes. The Procedure Specialist identifies appropriate CPT and ICD-10 codes. The Payer Logic Bot applies payer-specific rules and modifier requirements. The Denial Analyst reviews the draft claim against historical denial patterns before submission. Each agent produces an evidence trail so your billing staff can verify every coding decision.",
      },
      {
        question: "Which medical specialties does Sovereign RCM support?",
        answer:
          "We are launching with six beachhead specialties: Emergency Medicine, Orthopedics, Cardiology, Pain Management, Dermatology, and Multi-Specialty Groups. These were selected because they have high coding complexity, significant undercoding risk, or procedure-heavy workflows where AI-assisted billing delivers the most value. Dental practices are not supported — dental billing uses CDT codes and the 837D format, which is a different system.",
      },
      {
        question:
          "Does Sovereign RCM replace our billing staff?",
        answer:
          "No. Sovereign RCM drafts claims and flags potential issues — your billing team reviews, approves, and submits. The goal is to reduce coder touch time, catch undercoding, and improve clean-claim rates. Your staff focuses on exceptions and complex cases instead of routine data entry.",
      },
    ],
  },
  {
    heading: "Implementation & Setup",
    faqs: [
      {
        question: "What does the installation process look like?",
        answer:
          "Our engineering team handles physical installation of the appliance at your facility. We configure the system to work with your clinical documentation workflow, run initial calibration against your specialty and payer mix, and validate output with your billing team. The 90-day pilot runs in shadow mode alongside your existing billing so you can compare results before fully transitioning.",
      },
      {
        question: "Can we try Sovereign RCM before committing?",
        answer:
          "Yes. Every engagement starts with a 90-day pilot in shadow mode — the appliance runs alongside your existing billing process without disrupting it. At the end of 90 days, we measure clean-claim rate, denial rate changes, days-in-A/R, and undercoding recapture. You see the results before making a long-term decision. Exit criteria include a clean-claim rate of 95% or higher and at least a 30% reduction in coder touch time.",
      },
    ],
  },
  {
    heading: "Pricing & Packages",
    faqs: [
      {
        question: "How much does Sovereign RCM cost?",
        answer:
          "Pricing depends on your practice size and specialty mix. We offer three tiers: SR-1 for solo and small practices (1\u20133 providers), SR-2 for group practices (4\u201310 providers), and SR-3 for multi-specialty groups (11\u201325 providers). Contact us for a custom quote tailored to your practice.",
      },
      {
        question: "How is the payment structured?",
        answer:
          "Sovereign RCM is a one-time capital expenditure, not a recurring subscription. The payment structure is 50% deposit, 40% at installation, and 10% at acceptance after the pilot period. You own the hardware and software outright — no monthly percentage of collections, no per-claim fees.",
      },
    ],
  },
  {
    heading: "Comparison",
    faqs: [
      {
        question:
          "How is Sovereign RCM different from outsourced billing companies?",
        answer:
          "Outsourced billing companies typically charge 5\u201310% of collections, require you to share PHI with a third party, and give you limited visibility into their process. Sovereign RCM is a fixed capital expenditure with no ongoing percentage fees. Your data stays on-premise, and every coding decision comes with a full evidence trail your team can audit.",
      },
      {
        question:
          "How is Sovereign RCM different from cloud-based RCM software?",
        answer:
          "Cloud RCM platforms process your patient data on remote servers, creating PHI exposure risk and dependency on internet connectivity. Sovereign RCM runs entirely on a local appliance inside your facility. No internet connection is required for claim generation. You own the system outright rather than renting access through a subscription.",
      },
    ],
  },
  {
    heading: "Support & Operations",
    faqs: [
      {
        question:
          "What happens if the appliance needs maintenance or updates?",
        answer:
          "Software updates are delivered on secure, portable media and applied on-site — no network connection required. For hardware maintenance, our engineering team coordinates with your practice to schedule on-site service. During the pilot period, support is included. Post-deployment support terms are outlined in your service agreement.",
      },
    ],
  },
];

// Flatten all FAQs for JSON-LD
const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
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
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Everything you need to know about Sovereign RCM — from how it
              works to what it costs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-16">
            {faqCategories.map((category) => (
              <div key={category.heading}>
                <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                  {category.heading}
                </h2>
                <div className="mt-6 space-y-4">
                  {category.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-xl border border-gray-300 bg-white dark:border-dark-border dark:bg-dark-elevated"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-heading text-base font-bold text-navy dark:text-white [&::-webkit-details-marker]:hidden">
                        <span>{faq.question}</span>
                        <span
                          className="shrink-0 text-teal transition-transform group-open:rotate-45 dark:text-teal-dark"
                          aria-hidden="true"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 4V16M4 10H16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-6 pb-6 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Security link + more coming */}
          <div className="mt-16 rounded-xl border border-gray-300 bg-ice p-6 dark:border-dark-border dark:bg-dark-surface">
            <p className="font-heading text-base font-bold text-navy dark:text-white">
              Looking for security and HIPAA questions?
            </p>
            <p className="mt-2 text-base text-charcoal-light dark:text-gray-300">
              We have a dedicated{" "}
              <Link
                href="/sovereign-rcm/security"
                className="font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
              >
                Security &amp; HIPAA
              </Link>{" "}
              page covering data protection, compliance, and breach prevention.
            </p>
          </div>

          <p className="mt-8 text-sm text-charcoal-light dark:text-gray-400">
            More questions coming. Don&apos;t see what you need?{" "}
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
            Still Have Questions?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Every practice is different. Tell us about yours and we&apos;ll walk
            you through how Sovereign RCM fits.
          </p>
          <div className="mt-8">
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
