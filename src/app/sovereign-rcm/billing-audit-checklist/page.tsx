import type { Metadata } from "next";
import { ChecklistGate } from "./ChecklistGate";

export const metadata: Metadata = {
  title: "Medical Practice Billing Audit Checklist: Sovereign RCM",
  description:
    "A free 34-point audit checklist for medical practices. Covers claim accuracy, denial patterns, A/R health, coding accuracy, payer compliance, and PHI security.",
  openGraph: {
    title: "Medical Practice Billing Audit Checklist: Free Download",
    description:
      "34 audit items across 7 sections. Find the billing gaps costing your practice revenue and fix them.",
    url: "https://rizexcapital.com/sovereign-rcm/billing-audit-checklist",
    type: "website",
  },
  alternates: {
    canonical:
      "https://rizexcapital.com/sovereign-rcm/billing-audit-checklist",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Medical Practice Billing Audit Checklist",
  description:
    "A 34-point checklist for auditing medical practice billing operations across claim submission, documentation, denials, A/R, coding, payer contracts, and PHI security.",
  url: "https://rizexcapital.com/sovereign-rcm/billing-audit-checklist",
  publisher: {
    "@type": "Organization",
    name: "Sovereign RCM",
    url: "https://rizexcapital.com",
  },
};

export default function BillingAuditChecklist() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="bg-navy px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-coral">
            Free Resource
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            Medical Practice{" "}
            <br />
            Billing Audit Checklist
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            34 audit items across 7 sections. Find the billing gaps costing your
            practice revenue and the compliance gaps putting it at risk.
          </p>
        </div>
      </section>

      {/* Gate + Checklist */}
      <section className="bg-ice px-6 py-16 dark:bg-dark-surface lg:py-20">
        <div className="mx-auto max-w-4xl">
          <ChecklistGate />
        </div>
      </section>
    </>
  );
}
