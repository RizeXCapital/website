import type { Metadata } from "next";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import FaqFilter from "@/components/FaqFilter";
import { AnimatedHero, FadeIn } from "@/components/motion";

export const metadata: Metadata = {
  title: "FAQ — Sovereign RCM",
  description:
    "Frequently asked questions about Sovereign RCM — how it works, the AI pipeline, security, pricing, the 90-day pilot, and how it compares to outsourced billing and cloud platforms.",
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
        question: "Does Sovereign RCM replace our billing staff?",
        answer:
          "No. Sovereign RCM drafts claims and flags potential issues — your billing team reviews, approves, and submits. The goal is to reduce coder touch time, catch undercoding, and improve clean-claim rates. Your staff focuses on exceptions and complex cases instead of routine data entry.",
      },
      {
        question: "What EHR systems are supported?",
        answer:
          "Sovereign RCM integrates with major EHR platforms through standard HL7/FHIR interfaces. During the discovery phase, we confirm compatibility with your specific system and configure the read-only connection.",
      },
      {
        question: "Can it handle multiple specialties in one practice?",
        answer:
          "Yes. The SR-2 and SR-3 packages are designed for multi-specialty groups. Each agent in the pipeline applies specialty-specific coding rules based on the encounter type, so orthopedic visits and cardiology visits are coded with their respective logic.",
      },
    ],
  },
  {
    heading: "Pipeline & Coding",
    faqs: [
      {
        question: "How long does it take to process a single claim?",
        answer:
          "The full pipeline — from clinical note ingestion to 837P output — typically completes in under 60 seconds per encounter. Batch processing of a full day's encounters runs overnight without manual intervention.",
      },
      {
        question: "What if my team disagrees with a code assignment?",
        answer:
          "Every code includes the clinical documentation that supports it. Your team can override any assignment — the system records the change and learns from the correction. The AI makes recommendations; your staff makes final decisions.",
      },
      {
        question: "How does the system learn our practice patterns?",
        answer:
          "During the pilot, the appliance processes your historical claims and denial data to calibrate to your specialty mix, payer contracts, and coding patterns. It adapts to your practice over time without sending data externally.",
      },
      {
        question: "What does the installation process look like?",
        answer:
          "Our engineering team handles physical installation of the appliance at your facility. We configure the system to work with your clinical documentation workflow, run initial calibration against your specialty and payer mix, and validate output with your billing team. The 90-day pilot runs in shadow mode alongside your existing billing so you can compare results before fully transitioning.",
      },
      {
        question: "What about complex specialty coding?",
        answer:
          "Sovereign RCM's multi-agent pipeline includes a Procedure Specialist agent trained on specialty-specific coding patterns. The system handles modifier-intensive specialties like orthopedics and cardiology, high-volume specialties like dermatology, and documentation-heavy specialties like pain management. During the 90-day pilot, we validate coding accuracy against your specific specialty mix and payer contracts before you make any transition.",
      },
    ],
  },
  {
    heading: "Security & Compliance",
    faqs: [
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
        question:
          "What happens to our data if we stop using Sovereign RCM?",
        answer:
          "Your data is yours. If you discontinue service, all processed records, claim history, and configuration data remain on the appliance hardware in your facility. We provide export tooling in standard formats so you can migrate to any system. Nothing is held hostage, and nothing is deleted without your explicit instruction.",
      },
    ],
  },
  {
    heading: "Pricing & Packages",
    faqs: [
      {
        question: "How much does Sovereign RCM cost?",
        answer:
          "Pricing depends on your practice size and specialty mix. We offer three tiers: SR-1 for solo and small practices (1–3 providers), SR-2 for group practices (4–10 providers), and SR-3 for multi-specialty groups (11–25 providers). Contact us for a custom quote tailored to your practice.",
      },
      {
        question: "What does the 50/40/10 payment structure mean?",
        answer:
          "You pay 50% as a deposit to reserve your deployment slot and begin hardware provisioning. 40% is due at installation, after the appliance is configured and connected to your EHR. The final 10% is due at acceptance — after you confirm everything works as expected. You never pay in full until you have verified the system.",
      },
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
        question: "Can I start with SR-1 and upgrade later?",
        answer:
          "Yes. The tiers are designed to grow with your practice. If you start as a solo practice on SR-1 and later add providers or specialties, we can upgrade your configuration to SR-2 or SR-3 without replacing the hardware. Contact us to discuss upgrade paths.",
      },
      {
        question: "Is the 90-day pilot included in the price?",
        answer:
          "The pilot is priced separately and scoped to your specific practice. If you proceed to full deployment after a successful pilot, the pilot investment is credited toward your package. Contact us for pilot pricing details.",
      },
    ],
  },
  {
    heading: "Pilot Program",
    faqs: [
      {
        question: "Can we try Sovereign RCM before committing?",
        answer:
          "Yes. Every engagement starts with a 90-day pilot in shadow mode — the appliance runs alongside your existing billing process without disrupting it. At the end of 90 days, we measure clean-claim rate, denial rate changes, days-in-A/R, and undercoding recapture. You see the results before making a long-term decision. Exit criteria include a clean-claim rate of 95% or higher and at least a 30% reduction in coder touch time.",
      },
      {
        question:
          "What happens to my current billing during the pilot?",
        answer:
          "It continues exactly as-is. Shadow mode runs the AI in parallel with your existing billing process. Your current revenue cycle is never interrupted — the pilot is purely observational until you decide to transition.",
      },
      {
        question: "What do I need to provide for the pilot?",
        answer:
          "EHR access credentials for the AI to read clinical notes, 90 days of historical claims data for baseline comparison, and a designated point of contact at your practice. We handle all hardware installation and configuration.",
      },
      {
        question: "What if the pilot doesn't meet the benchmarks?",
        answer:
          "You walk away. No deployment fee, no obligation, no hard feelings. The pilot exists specifically so you can evaluate results against objective criteria before making any commitment.",
      },
      {
        question: "How much does the pilot cost?",
        answer:
          "Pilot pricing depends on your practice size, specialty mix, and claim volume. Contact us for a quote specific to your practice — we will scope the pilot to your exact needs.",
      },
    ],
  },
  {
    heading: "Billing Comparison",
    faqs: [
      {
        question: "Can AI really replace our outsourced billing team?",
        answer:
          "Sovereign RCM is designed to handle the core coding and claim preparation workflow — reading clinical notes, assigning CPT and ICD-10 codes, applying payer-specific rules, and generating compliant 837P claims. For most practices, this covers 80–90% of claim volume. Edge cases and complex appeals may still benefit from human review, which is why we run a 90-day pilot in shadow mode to measure exactly what the appliance handles versus what needs manual attention in your specific specialty mix.",
      },
      {
        question:
          "We've used the same billing company for years — why switch now?",
        answer:
          "Loyalty to a billing company often masks compounding costs. If your practice collects $500K per provider annually and pays 6% of collections, you are spending $30K per provider per year — $150K over five years for a single provider. That number grows as your collections grow. The question is not whether your current billing company is adequate — it is whether paying an escalating percentage indefinitely is the most efficient use of your revenue when a fixed-cost alternative exists.",
      },
      {
        question:
          "Is the upfront cost worth it vs. continuing to pay a percentage?",
        answer:
          "For most practices, the math favors ownership within 18–24 months. A 5-provider practice paying 6% of $2.5M in annual collections spends $150K per year on outsourced billing. Sovereign RCM's one-time capital cost is recovered in that timeframe, and every month after that is savings. Use our ROI calculator to model the payback period for your specific practice size and collection volume.",
      },
      {
        question: "How are updates and maintenance handled?",
        answer:
          "Software updates are delivered on encrypted media or through a secure, authenticated channel that you initiate. Updates are never pushed automatically — your team controls when and whether to apply them. The appliance includes self-diagnostic monitoring that alerts you to hardware health issues. For practices that want hands-off maintenance, we offer optional support agreements.",
      },
      {
        question:
          "Isn't the upfront cost of on-premise higher than starting with cloud?",
        answer:
          "The initial capital outlay for Sovereign RCM is higher than the first monthly payment on a cloud subscription. But cloud fees never stop. Over a 3–5 year period, the total cost of a cloud platform significantly exceeds the one-time cost of owning your infrastructure. Most practices reach cost parity within 18–24 months, and everything after that is savings. Use our ROI calculator to model the numbers for your practice size.",
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
      <AnimatedHero className="bg-navy px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Frequently Asked Questions
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Everything you need to know about Sovereign RCM — from how it
                works to what it costs.
              </p>
            </FadeIn>
          </div>
        </div>
      </AnimatedHero>

      {/* Filter + FAQ List */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-3xl">
          <FaqFilter categories={faqCategories} />

          {/* Cross-link cards */}
          <FadeIn>
            <div className="mt-8 rounded-xl border border-gray-300 bg-ice p-6 dark:border-dark-border dark:bg-dark-surface">
              <p className="font-heading text-base font-bold text-navy dark:text-white">
                Want to go deeper?
              </p>
              <p className="mt-2 text-base text-charcoal-light dark:text-gray-300">
                Visit our dedicated pages for{" "}
                <Link
                  href="/sovereign-rcm/security"
                  className="font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                >
                  Security &amp; HIPAA
                </Link>
                ,{" "}
                <Link
                  href="/sovereign-rcm/pilot-program"
                  className="font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                >
                  90-Day Pilot Program
                </Link>
                , and{" "}
                <Link
                  href="/sovereign-rcm/pricing"
                  className="font-medium text-teal underline decoration-teal/30 hover:decoration-teal dark:text-teal-dark dark:decoration-teal-dark/30 dark:hover:decoration-teal-dark"
                >
                  Pricing &amp; Packages
                </Link>
                .
              </p>
            </div>
          </FadeIn>

          <p className="mt-8 text-sm text-charcoal-light dark:text-gray-400">
            Don&apos;t see what you need?{" "}
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
        <FadeIn>
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
        </FadeIn>
      </section>
    </>
  );
}
