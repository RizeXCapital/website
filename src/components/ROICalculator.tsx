"use client";

import { useState, useMemo, useCallback } from "react";

/* -----------------------------------------------------------------------
   Specialty benchmark data
   Sources: MGMA, AAFP, HFMA — see methodology section for details.
   ----------------------------------------------------------------------- */
const SPECIALTIES = {
  "Emergency Medicine": {
    collections: 550000,
    denialRate: 8,
    undercodingRate: 18,
    visitsPerProvider: 4000,
    undercodeDelta: 42,
  },
  Orthopedics: {
    collections: 700000,
    denialRate: 7,
    undercodingRate: 12,
    visitsPerProvider: 2500,
    undercodeDelta: 65,
  },
  Cardiology: {
    collections: 650000,
    denialRate: 9,
    undercodingRate: 15,
    visitsPerProvider: 2800,
    undercodeDelta: 55,
  },
  "Pain Management": {
    collections: 450000,
    denialRate: 10,
    undercodingRate: 20,
    visitsPerProvider: 3200,
    undercodeDelta: 38,
  },
  Dermatology: {
    collections: 500000,
    denialRate: 6,
    undercodingRate: 22,
    visitsPerProvider: 3500,
    undercodeDelta: 35,
  },
  "Family Medicine": {
    collections: 400000,
    denialRate: 6,
    undercodingRate: 15,
    visitsPerProvider: 3800,
    undercodeDelta: 32,
  },
  "Internal Medicine": {
    collections: 420000,
    denialRate: 7,
    undercodingRate: 16,
    visitsPerProvider: 3500,
    undercodeDelta: 38,
  },
  "Multi-Specialty Group": {
    collections: 600000,
    denialRate: 8,
    undercodingRate: 16,
    visitsPerProvider: 3000,
    undercodeDelta: 45,
  },
  Other: {
    collections: 500000,
    denialRate: 8,
    undercodingRate: 15,
    visitsPerProvider: 3000,
    undercodeDelta: 40,
  },
} as const;

type SpecialtyKey = keyof typeof SPECIALTIES;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function sliderBg(value: number, min: number, max: number): React.CSSProperties {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, var(--range-fill) 0%, var(--range-fill) ${pct}%, var(--range-track) ${pct}%, var(--range-track) 100%)`,
  };
}

export default function ROICalculator() {
  const [specialty, setSpecialty] = useState<SpecialtyKey>("Emergency Medicine");
  const [providers, setProviders] = useState(3);
  const [collectionsPerProvider, setCollectionsPerProvider] = useState(550000);
  const [billingCostPct, setBillingCostPct] = useState(5);
  const [denialRatePct, setDenialRatePct] = useState(8);
  const [undercodingPct, setUndercodingPct] = useState(18);

  // Track which fields user has manually changed so specialty
  // switch doesn't overwrite intentional edits
  const [overrides, setOverrides] = useState<Set<string>>(new Set());

  const handleSpecialtyChange = useCallback(
    (newSpecialty: SpecialtyKey) => {
      setSpecialty(newSpecialty);
      const defaults = SPECIALTIES[newSpecialty];
      if (!overrides.has("collections"))
        setCollectionsPerProvider(defaults.collections);
      if (!overrides.has("denialRate"))
        setDenialRatePct(defaults.denialRate);
      if (!overrides.has("undercodingRate"))
        setUndercodingPct(defaults.undercodingRate);
    },
    [overrides],
  );

  const markOverride = useCallback((field: string) => {
    setOverrides((prev) => new Set(prev).add(field));
  }, []);

  const resetDefaults = useCallback(() => {
    const defaults = SPECIALTIES[specialty];
    setCollectionsPerProvider(defaults.collections);
    setBillingCostPct(5);
    setDenialRatePct(defaults.denialRate);
    setUndercodingPct(defaults.undercodingRate);
    setProviders(3);
    setOverrides(new Set());
  }, [specialty]);

  /* ------- Calculations (plan formulas) ------- */
  const results = useMemo(() => {
    const defaults = SPECIALTIES[specialty];
    const totalCollections = providers * collectionsPerProvider;

    // Leak 1 — Billing overhead
    const billingCost = totalCollections * (billingCostPct / 100);

    // Leak 2 — Denials (35% of denied revenue is permanently lost)
    const deniedRevenue = totalCollections * (denialRatePct / 100);
    const unrecoveredLoss = deniedRevenue * 0.35;
    // Sovereign target: 3% denial rate
    const projectedLoss = totalCollections * 0.03 * 0.35;
    const denialSavings = Math.max(0, unrecoveredLoss - projectedLoss);

    // Leak 3 — Undercoding
    const undercodedVisits =
      providers * defaults.visitsPerProvider * (undercodingPct / 100);
    const undercodingLoss = undercodedVisits * defaults.undercodeDelta;
    // Sovereign target: recapture 70%
    const undercodingRecapture = undercodingLoss * 0.7;

    // Totals
    const totalLeakage = billingCost + unrecoveredLoss + undercodingLoss;
    const recoverableRevenue = denialSavings + undercodingRecapture;
    const perProviderLeakage = providers > 0 ? totalLeakage / providers : 0;
    const monthlyImpact = totalLeakage / 12;

    return {
      billingCost,
      unrecoveredLoss,
      undercodingLoss,
      totalLeakage,
      recoverableRevenue,
      perProviderLeakage,
      monthlyImpact,
    };
  }, [specialty, providers, collectionsPerProvider, billingCostPct, denialRatePct, undercodingPct]);

  // Bar segment percentages (guard against 0 total)
  const barSegments = useMemo(() => {
    const total = results.totalLeakage;
    if (total === 0)
      return { billing: 33.3, denials: 33.3, undercoding: 33.4 };
    return {
      billing: (results.billingCost / total) * 100,
      denials: (results.unrecoveredLoss / total) * 100,
      undercoding: (results.undercodingLoss / total) * 100,
    };
  }, [results]);

  return (
    <>
      {/* Slider styling — inline per CLAUDE.md (no separate CSS files) */}
      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          --range-fill: #2E86AB;
          --range-track: #D1D5DB;
        }
        .dark input[type="range"] {
          --range-track: #2D3F5E;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #2E86AB;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #2E86AB;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        @media (pointer: coarse) {
          input[type="range"]::-webkit-slider-thumb {
            width: 28px;
            height: 28px;
          }
          input[type="range"]::-moz-range-thumb {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      {/* ── Calculator Section ────────────────────────────────────── */}
      <section className="bg-white px-6 py-20 dark:bg-dark-bg lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Column 1 — Inputs */}
            <div className="min-w-0">
              <h2 className="font-heading text-lg font-bold text-navy dark:text-white">
                Your Practice Details
              </h2>
              <p className="mt-1 text-xs text-charcoal-light dark:text-gray-300">
                Adjust values to match your practice.
              </p>

              <div className="mt-6 space-y-4">
                {/* Specialty */}
                <div>
                  <label
                    htmlFor="roi-specialty"
                    className="block text-xs font-medium text-navy dark:text-white"
                  >
                    Specialty
                  </label>
                  <select
                    id="roi-specialty"
                    value={specialty}
                    onChange={(e) =>
                      handleSpecialtyChange(e.target.value as SpecialtyKey)
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-charcoal dark:border-dark-border dark:bg-dark-elevated dark:text-dark-text"
                  >
                    {Object.keys(SPECIALTIES).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Providers */}
                <div>
                  <label className="block text-xs font-medium text-navy dark:text-white">
                    Providers
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setProviders(Math.max(1, providers - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-sm text-navy transition-colors hover:bg-ice dark:border-dark-border dark:text-white dark:hover:bg-dark-elevated"
                      aria-label="Decrease providers"
                    >
                      &minus;
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={25}
                      value={providers}
                      onChange={(e) =>
                        setProviders(
                          Math.max(1, Math.min(25, parseInt(e.target.value) || 1)),
                        )
                      }
                      className="w-14 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-center text-xs text-charcoal dark:border-dark-border dark:bg-dark-elevated dark:text-dark-text"
                    />
                    <button
                      type="button"
                      onClick={() => setProviders(Math.min(25, providers + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-sm text-navy transition-colors hover:bg-ice dark:border-dark-border dark:text-white dark:hover:bg-dark-elevated"
                      aria-label="Increase providers"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Annual Collections / Provider */}
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-navy dark:text-white">
                    <span>Collections / Provider</span>
                    <span className="font-mono text-teal dark:text-teal-dark">
                      {formatCurrency(collectionsPerProvider)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={200000}
                    max={1200000}
                    step={10000}
                    value={collectionsPerProvider}
                    onChange={(e) => {
                      markOverride("collections");
                      setCollectionsPerProvider(parseInt(e.target.value));
                    }}
                    className="mt-1.5"
                    style={sliderBg(collectionsPerProvider, 200000, 1200000)}
                  />
                  <div className="mt-0.5 flex justify-between text-[10px] text-charcoal-light dark:text-gray-400">
                    <span>$200K</span>
                    <span>$1.2M</span>
                  </div>
                </div>

                {/* Billing Cost % */}
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-navy dark:text-white">
                    <span>Billing Cost (%)</span>
                    <span className="font-mono text-teal dark:text-teal-dark">
                      {billingCostPct}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={0.5}
                    value={billingCostPct}
                    onChange={(e) =>
                      setBillingCostPct(parseFloat(e.target.value))
                    }
                    className="mt-1.5"
                    style={sliderBg(billingCostPct, 2, 12)}
                  />
                  <div className="mt-0.5 flex justify-between text-[10px] text-charcoal-light dark:text-gray-400">
                    <span>2%</span>
                    <span>12%</span>
                  </div>
                </div>

                {/* Denial Rate */}
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-navy dark:text-white">
                    <span>Denial Rate</span>
                    <span className="font-mono text-teal dark:text-teal-dark">
                      {denialRatePct}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    step={0.5}
                    value={denialRatePct}
                    onChange={(e) => {
                      markOverride("denialRate");
                      setDenialRatePct(parseFloat(e.target.value));
                    }}
                    className="mt-1.5"
                    style={sliderBg(denialRatePct, 2, 20)}
                  />
                  <div className="mt-0.5 flex justify-between text-[10px] text-charcoal-light dark:text-gray-400">
                    <span>2%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Undercoding Rate */}
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-navy dark:text-white">
                    <span>Undercoding Rate</span>
                    <span className="font-mono text-teal dark:text-teal-dark">
                      {undercodingPct}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={35}
                    step={1}
                    value={undercodingPct}
                    onChange={(e) => {
                      markOverride("undercodingRate");
                      setUndercodingPct(parseInt(e.target.value));
                    }}
                    className="mt-1.5"
                    style={sliderBg(undercodingPct, 5, 35)}
                  />
                  <div className="mt-0.5 flex justify-between text-[10px] text-charcoal-light dark:text-gray-400">
                    <span>5%</span>
                    <span>35%</span>
                  </div>
                </div>

                {/* Reset */}
                <button
                  type="button"
                  onClick={resetDefaults}
                  className="text-xs font-medium text-teal transition-colors hover:text-teal-light dark:text-teal-dark dark:hover:text-teal"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>

            {/* Column 2 — Revenue Impact */}
            <div className="min-w-0">
              <h2 className="font-heading text-lg font-bold text-navy dark:text-white">
                Your Revenue Impact
              </h2>
              <p className="mt-1 text-xs text-charcoal-light dark:text-gray-300">
                For {specialty.toLowerCase()} practices
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-surface">
                  <p className="text-xs font-medium text-charcoal-light dark:text-gray-400">
                    Total Annual Leakage
                  </p>
                  <p className="mt-1 font-heading text-xl font-bold text-teal dark:text-teal-dark">
                    {formatCurrency(results.totalLeakage)}
                  </p>
                  <p className="text-[10px] text-charcoal-light dark:text-gray-400">
                    per year
                  </p>
                </div>

                <div className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-surface">
                  <p className="text-xs font-medium text-charcoal-light dark:text-gray-400">
                    Recoverable Revenue
                  </p>
                  <p className="mt-1 font-heading text-xl font-bold text-coral">
                    {formatCurrency(results.recoverableRevenue)}
                  </p>
                  <p className="text-[10px] text-charcoal-light dark:text-gray-400">
                    with optimized billing
                  </p>
                </div>

                <div className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-surface">
                  <p className="text-xs font-medium text-charcoal-light dark:text-gray-400">
                    Per-Provider Impact
                  </p>
                  <p className="mt-1 font-heading text-xl font-bold text-navy dark:text-white">
                    {formatCurrency(results.perProviderLeakage)}
                  </p>
                  <p className="text-[10px] text-charcoal-light dark:text-gray-400">
                    leakage per provider / year
                  </p>
                </div>

                <div className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-surface">
                  <p className="text-xs font-medium text-charcoal-light dark:text-gray-400">
                    Monthly Impact
                  </p>
                  <p className="mt-1 font-heading text-xl font-bold text-navy dark:text-white">
                    {formatCurrency(results.monthlyImpact)}
                  </p>
                  <p className="text-[10px] text-charcoal-light dark:text-gray-400">
                    lost every month
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3 — Where the Money Goes */}
            <div className="min-w-0">
              <h2 className="font-heading text-lg font-bold text-navy dark:text-white">
                Where the Money Goes
              </h2>
              <p className="mt-1 text-xs text-charcoal-light dark:text-gray-300">
                The three leaks draining your revenue
              </p>

              {/* Stacked bar */}
              <div className="mt-6 flex h-9 overflow-hidden rounded-lg">
                <div
                  className="flex items-center justify-center bg-navy text-[10px] font-medium text-white transition-all duration-300"
                  style={{ width: `${barSegments.billing}%` }}
                >
                  {barSegments.billing >= 18 && `${barSegments.billing.toFixed(0)}%`}
                </div>
                <div
                  className="flex items-center justify-center bg-coral text-[10px] font-medium text-white transition-all duration-300"
                  style={{ width: `${barSegments.denials}%` }}
                >
                  {barSegments.denials >= 18 && `${barSegments.denials.toFixed(0)}%`}
                </div>
                <div
                  className="flex items-center justify-center bg-teal text-[10px] font-medium text-white transition-all duration-300"
                  style={{ width: `${barSegments.undercoding}%` }}
                >
                  {barSegments.undercoding >= 18 &&
                    `${barSegments.undercoding.toFixed(0)}%`}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-8 space-y-8">
                <div className="flex items-start gap-2.5">
                  <div className="mt-2 h-4 w-4 shrink-0 rounded bg-navy" />
                  <div>
                    <p className="text-base font-medium text-navy dark:text-white">
                      Billing Overhead
                    </p>
                    <p className="font-heading text-2xl font-bold text-navy dark:text-white">
                      {formatCurrency(results.billingCost)}
                    </p>
                    <p className="text-sm text-charcoal-light dark:text-gray-400">
                      {barSegments.billing.toFixed(0)}% of total
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-2 h-4 w-4 shrink-0 rounded bg-coral" />
                  <div>
                    <p className="text-base font-medium text-navy dark:text-white">
                      Unrecovered Denials
                    </p>
                    <p className="font-heading text-2xl font-bold text-coral">
                      {formatCurrency(results.unrecoveredLoss)}
                    </p>
                    <p className="text-sm text-charcoal-light dark:text-gray-400">
                      {barSegments.denials.toFixed(0)}% of total
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-2 h-4 w-4 shrink-0 rounded bg-teal" />
                  <div>
                    <p className="text-base font-medium text-navy dark:text-white">
                      Undercoding Loss
                    </p>
                    <p className="font-heading text-2xl font-bold text-teal dark:text-teal-dark">
                      {formatCurrency(results.undercodingLoss)}
                    </p>
                    <p className="text-sm text-charcoal-light dark:text-gray-400">
                      {barSegments.undercoding.toFixed(0)}% of total
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Methodology ───────────────────────────────────────────── */}
      <section className="bg-white px-6 py-16 dark:bg-dark-bg lg:py-20">
        <div className="mx-auto max-w-3xl">
          <details className="group">
            <summary className="cursor-pointer list-none font-heading text-3xl font-bold text-navy dark:text-white [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-teal transition-transform group-open:rotate-90 dark:text-teal-dark"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
                How We Calculate These Estimates
              </span>
            </summary>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
              <p>
                These projections use specialty-adjusted industry benchmarks
                from leading healthcare analytics organizations:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-navy dark:text-white">
                    Billing overhead (5% benchmark):
                  </strong>{" "}
                  Medical Group Management Association (MGMA) reports average
                  RCM costs at 4.8–5.2% of net collections for outsourced
                  billing.
                </li>
                <li>
                  <strong className="text-navy dark:text-white">
                    Denial rates and recovery:
                  </strong>{" "}
                  HFMA data shows average first-pass denial rates of 6–13%
                  depending on specialty, with 65% eventual recovery. We apply a
                  35% permanent loss factor to denied claims.
                </li>
                <li>
                  <strong className="text-navy dark:text-white">
                    Undercoding:
                  </strong>{" "}
                  AAFP research indicates systematic undercoding costs $30,000+
                  per physician annually. We calculate per-visit deltas based on
                  specialty-specific visit complexity and E/M coding patterns.
                </li>
                <li>
                  <strong className="text-navy dark:text-white">
                    Recovery targets:
                  </strong>{" "}
                  Sovereign RCM targets a &le;3% denial rate and 70% undercoding
                  recapture based on our multi-agent AI pipeline&apos;s
                  documented performance.
                </li>
              </ul>
              <p className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-elevated">
                <strong className="text-navy dark:text-white">Note:</strong>{" "}
                These are directional estimates based on published industry
                data, not guarantees. Actual results depend on your payer mix,
                coding patterns, and practice operations. Contact us for a
                personalized analysis using your actual claims data.
              </p>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
