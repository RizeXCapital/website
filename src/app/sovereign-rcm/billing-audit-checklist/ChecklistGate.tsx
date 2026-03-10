"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// Checklist data
// ---------------------------------------------------------------------------

const sections = [
  {
    title: "Claim Submission Accuracy",
    items: [
      "Correct NPI type used per payer requirement (Type 1 individual vs. Type 2 organizational)",
      "Required modifiers attached where applicable (bilateral, multiple procedures, assistant surgeon)",
      "ICD-10 codes at highest level of specificity — no unspecified codes where specific codes exist",
      "CPT/HCPCS codes validated against current payer fee schedule for the date of service",
      "Diagnosis-to-procedure linking documented — medical necessity supported for every line item",
    ],
  },
  {
    title: "Documentation Completeness",
    items: [
      "E/M level supported by medical decision-making complexity or total time documented",
      "Procedure notes include all elements required by payer policy",
      "Prior authorization on file for every service that requires it, attached to the claim",
      "Referring and ordering provider information complete on specialist and ancillary claims",
      "Supervising physician co-signature present on mid-level provider (PA/NP) claims where required",
    ],
  },
  {
    title: "Denial Pattern Analysis",
    items: [
      "90-day denial report pulled and sorted by denial reason code",
      "Top 5 denial codes identified by dollar volume, not just volume",
      "Denials categorized: clinical (medical necessity), administrative (missing info), or duplicate",
      "First-pass clean-claim rate calculated — benchmark is ≥ 95%",
      "Payers with denial rates exceeding 10% flagged for contract and submission review",
    ],
  },
  {
    title: "Accounts Receivable Health",
    items: [
      "Days in A/R calculated for the last 90 days — benchmark is < 45 days for most specialties",
      "A/R aging analysis run: percentage of balance over 90 days should be < 10%",
      "Claims older than 120 days without resolution identified and actioned",
      "Timely filing deadlines reviewed by payer for all open claims approaching cutoff",
      "Credit balance accounts reviewed — patient refunds issued as required by law",
    ],
  },
  {
    title: "Coding Accuracy & Undercoding",
    items: [
      "Random sample audit: 20 charts pulled, coded independently, then compared to what was billed",
      "Systematic undercoding identified — e.g., Level 3 billed when Level 4 is supported by documentation",
      "High-frequency CPT codes reviewed for correct modifier usage and sequencing",
      "Split/shared billing rules applied correctly for physician–PA/NP teams",
      "Global period rules verified on all post-operative claims — no unbundled services in the global window",
    ],
  },
  {
    title: "Payer Contract Compliance",
    items: [
      "Fee schedules loaded in the practice management system match current signed contracts",
      "Non-covered services identified and removed from the standard billing workflow",
      "Bundling edits reviewed — no inappropriate unbundling of services the payer considers inclusive",
      "Coordination of benefits rules applied correctly for dual-coverage patients",
    ],
  },
  {
    title: "PHI Security & Compliance",
    items: [
      "PHI transmissions use encrypted channels (TLS 1.2 or higher) for all payer and clearinghouse connections",
      "Business Associate Agreements (BAAs) on file for every vendor with access to patient billing data",
      "User access to billing systems reviewed — principle of least privilege applied",
      "EHR and billing system access logs audited for anomalous access patterns",
      "Data retention policy meets HIPAA minimum (6 years from creation or last effective date)",
    ],
  },
];

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------

function GateForm({ onUnlock }: { onUnlock: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Honeypot
  const [companyUrl, setCompanyUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checklist-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          practice,
          company_url: companyUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        onUnlock();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-dark-border dark:bg-dark-elevated">
      <p className="text-xs font-medium uppercase tracking-wider text-teal dark:text-teal-dark">
        Free Resource
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold text-navy dark:text-white">
        Get the Checklist
      </h2>
      <p className="mt-3 text-base text-charcoal-light dark:text-gray-300">
        Enter your name and email to access all 35 audit items across 7 sections
        — no spam, no sales call required.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="company_url"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <div>
          <label
            htmlFor="cl-name"
            className="block text-sm font-medium text-navy dark:text-white"
          >
            Name <span className="text-coral">*</span>
          </label>
          <input
            id="cl-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. Jane Smith"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-navy placeholder-gray-400 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal dark:border-dark-border dark:bg-dark-bg dark:text-white dark:placeholder-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="cl-email"
            className="block text-sm font-medium text-navy dark:text-white"
          >
            Email <span className="text-coral">*</span>
          </label>
          <input
            id="cl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourpractice.com"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-navy placeholder-gray-400 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal dark:border-dark-border dark:bg-dark-bg dark:text-white dark:placeholder-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="cl-practice"
            className="block text-sm font-medium text-navy dark:text-white"
          >
            Practice Name{" "}
            <span className="text-charcoal-light dark:text-gray-400">
              (optional)
            </span>
          </label>
          <input
            id="cl-practice"
            type="text"
            value={practice}
            onChange={(e) => setPractice(e.target.value)}
            placeholder="Westside Family Medicine"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-navy placeholder-gray-400 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal dark:border-dark-border dark:bg-dark-bg dark:text-white dark:placeholder-gray-500"
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-coral" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-coral px-6 py-3 text-base font-medium text-white transition-colors hover:bg-coral-hover disabled:opacity-60"
        >
          {loading ? "Sending…" : "Access the Checklist"}
        </button>

        <p className="text-center text-xs text-charcoal-light dark:text-gray-400">
          Your information is never sold or shared.
        </p>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Checklist display
// ---------------------------------------------------------------------------

function ChecklistContent() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm text-charcoal-light dark:text-gray-400">
          {sections.reduce((acc, s) => acc + s.items.length, 0)} items across{" "}
          {sections.length} sections
        </p>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-gray-50 dark:border-dark-border dark:text-white dark:hover:bg-dark-elevated"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
            />
          </svg>
          Print / Save as PDF
        </button>
      </div>

      <div className="space-y-10">
        {sections.map((section, si) => (
          <div key={section.title}>
            <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
              <span className="mr-2 font-mono text-sm text-teal dark:text-teal-dark">
                0{si + 1}
              </span>
              {section.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {section.items.map((item, ii) => (
                <li key={ii} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-gray-300 dark:border-dark-border" />
                  <span className="text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-teal/20 bg-teal/5 p-6 dark:border-teal/20 dark:bg-teal/10">
        <p className="font-heading text-base font-bold text-navy dark:text-white">
          Found issues in your audit?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
          Sovereign RCM closes every gap on this list — clean-claim rate, denial
          patterns, undercoding, A/R velocity, and PHI security — with an
          on-premise AI appliance that never sends your data to the cloud.
        </p>
        <a
          href="/contact"
          className="mt-4 inline-block rounded-lg bg-coral px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-coral-hover"
        >
          Request a Billing Analysis
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function ChecklistGate() {
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return <ChecklistContent />;
  }

  return (
    <div>
      <GateForm onUnlock={() => setUnlocked(true)} />

      {/* Teaser — blurred preview below the form */}
      <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl border border-gray-200 bg-white p-8 dark:border-dark-border dark:bg-dark-elevated">
        <div className="select-none blur-sm" aria-hidden="true">
          <p className="font-heading text-base font-bold text-navy dark:text-white">
            01 Claim Submission Accuracy
          </p>
          <ul className="mt-3 space-y-2">
            {sections[0].items.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-gray-300" />
                <span className="text-sm text-charcoal-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/60 dark:bg-dark-elevated/60">
          <p className="font-heading text-sm font-bold text-navy dark:text-white">
            Enter your details above to unlock
          </p>
        </div>
      </div>
    </div>
  );
}
