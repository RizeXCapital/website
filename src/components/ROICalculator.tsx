"use client";

import { useState, useMemo, useCallback } from "react";
import SectionDivider from "@/components/SectionDivider";
import Tooltip from "@/components/Tooltip";

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
          height: 8px;
          border-radius: 9999px;
          outline: none;
          --range-fill: #2E86AB;
          --range-track: #E2E8F0;
        }
        .dark input[type="range"] {
          --range-track: #2D3F5E;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          border: 2px solid #2E86AB;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(46,134,171,0.25), 0 1px 2px rgba(0,0,0,0.1);
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 2px 10px rgba(46,134,171,0.4), 0 1px 3px rgba(0,0,0,0.12);
          transform: scale(1.1);
        }
        input[type="range"]::-webkit-slider-thumb:active {
          transform: scale(1.15);
          box-shadow: 0 2px 12px rgba(46,134,171,0.5), 0 1px 3px rgba(0,0,0,0.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          border: 2px solid #2E86AB;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(46,134,171,0.25), 0 1px 2px rgba(0,0,0,0.1);
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }
        input[type="range"]::-moz-range-thumb:hover {
          box-shadow: 0 2px 10px rgba(46,134,171,0.4), 0 1px 3px rgba(0,0,0,0.12);
          transform: scale(1.1);
        }
        input[type="range"]::-moz-range-thumb:active {
          transform: scale(1.15);
          box-shadow: 0 2px 12px rgba(46,134,171,0.5), 0 1px 3px rgba(0,0,0,0.15);
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
      <section className="bg-ice px-6 py-20 dark:bg-dark-surface lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm sm:p-8 lg:p-10 dark:border-dark-border dark:bg-dark-elevated">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-10">
              {/* Left — Inputs */}
              <div className="min-w-0">
                <div className="rounded-xl bg-ice p-6 dark:bg-dark-surface">
                  <h2 className="font-heading text-lg font-bold text-navy dark:text-white">
                    Your Practice Details
                  </h2>
                  <p className="mt-1 text-sm text-charcoal-light dark:text-gray-300">
                    Adjust values to match your practice.
                  </p>

                  <div className="mt-6 space-y-5">
                    {/* Specialty */}
                    <div>
                      <label
                        htmlFor="roi-specialty"
                        className="block text-sm font-medium text-navy dark:text-white"
                      >
                        <Tooltip text="Selecting a specialty auto-fills industry benchmarks for denial rate, undercoding, and collections">
                          Specialty
                        </Tooltip>
                      </label>
                      <select
                        id="roi-specialty"
                        value={specialty}
                        onChange={(e) =>
                          handleSpecialtyChange(e.target.value as SpecialtyKey)
                        }
                        className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-charcoal focus:ring-2 focus:ring-teal/20 dark:border-dark-border dark:bg-dark-elevated dark:text-dark-text"
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
                      <label className="block text-sm font-medium text-navy dark:text-white">
                        Providers
                      </label>
                      <div className="mt-1.5 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setProviders(Math.max(1, providers - 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-base text-navy transition-colors hover:bg-white dark:border-dark-border dark:text-white dark:hover:bg-dark-elevated"
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
                          className="w-16 rounded-lg border border-gray-300 bg-white px-2 py-2 text-center text-sm text-charcoal dark:border-dark-border dark:bg-dark-elevated dark:text-dark-text"
                        />
                        <button
                          type="button"
                          onClick={() => setProviders(Math.min(25, providers + 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-base text-navy transition-colors hover:bg-white dark:border-dark-border dark:text-white dark:hover:bg-dark-elevated"
                          aria-label="Increase providers"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Annual Collections / Provider */}
                    <div>
                      <label className="flex items-center justify-between text-sm font-medium text-navy dark:text-white">
                        <Tooltip text="Total annual collections per provider before billing costs — includes all payer sources">
                          Collections / Provider
                        </Tooltip>
                        <span className="font-mono text-base text-teal dark:text-teal-dark">
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
                        className="mt-2"
                        style={sliderBg(collectionsPerProvider, 200000, 1200000)}
                      />
                      <div className="mt-1 flex justify-between text-xs text-charcoal-light dark:text-gray-400">
                        <span>$200K</span>
                        <span>$1.2M</span>
                      </div>
                    </div>

                    {/* Billing Cost % */}
                    <div>
                      <label className="flex items-center justify-between text-sm font-medium text-navy dark:text-white">
                        <Tooltip text="Percentage of collections paid to your billing company — MGMA benchmark: 4.8–5.2% for outsourced billing">
                          Billing Cost (%)
                        </Tooltip>
                        <span className="font-mono text-base text-teal dark:text-teal-dark">
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
                        className="mt-2"
                        style={sliderBg(billingCostPct, 2, 12)}
                      />
                      <div className="mt-1 flex justify-between text-xs text-charcoal-light dark:text-gray-400">
                        <span>2%</span>
                        <span>12%</span>
                      </div>
                    </div>

                    {/* Denial Rate */}
                    <div>
                      <label className="flex items-center justify-between text-sm font-medium text-navy dark:text-white">
                        <Tooltip text="Percentage of claims denied on first submission — industry average is 6–13% depending on specialty">
                          Denial Rate
                        </Tooltip>
                        <span className="font-mono text-base text-teal dark:text-teal-dark">
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
                        className="mt-2"
                        style={sliderBg(denialRatePct, 2, 20)}
                      />
                      <div className="mt-1 flex justify-between text-xs text-charcoal-light dark:text-gray-400">
                        <span>2%</span>
                        <span>20%</span>
                      </div>
                    </div>

                    {/* Undercoding Rate */}
                    <div>
                      <label className="flex items-center justify-between text-sm font-medium text-navy dark:text-white">
                        <Tooltip text="Percentage of visits where documented services are billed at a lower level than supported — AAFP estimates $30K+ lost per provider annually">
                          Undercoding Rate
                        </Tooltip>
                        <span className="font-mono text-base text-teal dark:text-teal-dark">
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
                        className="mt-2"
                        style={sliderBg(undercodingPct, 5, 35)}
                      />
                      <div className="mt-1 flex justify-between text-xs text-charcoal-light dark:text-gray-400">
                        <span>5%</span>
                        <span>35%</span>
                      </div>
                    </div>

                    {/* Reset */}
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={resetDefaults}
                        className="text-sm font-medium text-teal transition-colors hover:text-teal-light dark:text-teal-dark dark:hover:text-teal"
                      >
                        Reset to Defaults
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Results & Breakdown */}
              <div className="min-w-0 lg:col-span-2">
                {/* Top row: Featured metrics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Total Annual Leakage */}
                  <div className="rounded-xl border-2 border-teal bg-white p-6 dark:border-teal-dark dark:bg-dark-surface">
                    <p className="text-sm font-medium text-charcoal-light dark:text-gray-400">
                      Total Annual Leakage
                    </p>
                    <p className="mt-1 font-heading text-4xl font-bold text-teal dark:text-teal-dark">
                      {formatCurrency(results.totalLeakage)}
                    </p>
                    <p className="mt-1 text-xs text-charcoal-light dark:text-gray-400">
                      per year
                    </p>
                  </div>

                  {/* Recoverable Revenue */}
                  <div className="rounded-xl border-2 border-coral bg-white p-6 dark:border-coral dark:bg-dark-surface">
                    <p className="text-sm font-medium text-charcoal-light dark:text-gray-400">
                      Recoverable Revenue
                    </p>
                    <p className="mt-1 font-heading text-4xl font-bold text-coral">
                      {formatCurrency(results.recoverableRevenue)}
                    </p>
                    <p className="mt-1 text-xs text-charcoal-light dark:text-gray-400">
                      with optimized billing
                    </p>
                  </div>
                </div>

                {/* Secondary metrics row */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-surface">
                    <p className="text-xs font-medium text-charcoal-light dark:text-gray-400">
                      Per-Provider Impact
                    </p>
                    <p className="mt-1 font-heading text-2xl font-bold text-navy dark:text-white">
                      {formatCurrency(results.perProviderLeakage)}
                    </p>
                    <p className="text-xs text-charcoal-light dark:text-gray-400">
                      per provider / year
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-surface">
                    <p className="text-xs font-medium text-charcoal-light dark:text-gray-400">
                      Monthly Impact
                    </p>
                    <p className="mt-1 font-heading text-2xl font-bold text-navy dark:text-white">
                      {formatCurrency(results.monthlyImpact)}
                    </p>
                    <p className="text-xs text-charcoal-light dark:text-gray-400">
                      lost every month
                    </p>
                  </div>
                </div>

                {/* Breakdown: bar + legend */}
                <div className="mt-8">
                  <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                    Where the Money Goes
                  </h3>
                  <p className="mt-1 text-xs text-charcoal-light dark:text-gray-300">
                    The three leaks draining your revenue
                  </p>

                  {/* Stacked bar */}
                  <div className="mt-4 flex h-12 overflow-hidden rounded-xl">
                    <div
                      className="flex items-center justify-center bg-navy text-[10px] font-semibold text-white transition-all duration-300"
                      style={{ width: `${barSegments.billing}%` }}
                    >
                      {`${barSegments.billing.toFixed(0)}%`}
                    </div>
                    <div
                      className="flex items-center justify-center bg-coral text-[10px] font-semibold text-white transition-all duration-300"
                      style={{ width: `${barSegments.denials}%` }}
                    >
                      {`${barSegments.denials.toFixed(0)}%`}
                    </div>
                    <div
                      className="flex items-center justify-center bg-teal text-[10px] font-semibold text-white transition-all duration-300"
                      style={{ width: `${barSegments.undercoding}%` }}
                    >
                      {`${barSegments.undercoding.toFixed(0)}%`}
                    </div>
                  </div>

                  {/* Legend — horizontal row */}
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-surface">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-navy" />
                        <p className="text-sm font-medium text-navy dark:text-white">
                          Billing Overhead
                        </p>
                      </div>
                      <p className="mt-1 font-heading text-xl font-bold text-navy dark:text-white">
                        {formatCurrency(results.billingCost)}
                      </p>
                      <p className="text-xs text-charcoal-light dark:text-gray-400">
                        {barSegments.billing.toFixed(0)}% of total
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-surface">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-coral" />
                        <p className="text-sm font-medium text-navy dark:text-white">
                          Unrecovered Denials
                        </p>
                      </div>
                      <p className="mt-1 font-heading text-xl font-bold text-coral">
                        {formatCurrency(results.unrecoveredLoss)}
                      </p>
                      <p className="text-xs text-charcoal-light dark:text-gray-400">
                        {barSegments.denials.toFixed(0)}% of total
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-300 bg-ice p-4 dark:border-dark-border dark:bg-dark-surface">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-teal" />
                        <p className="text-sm font-medium text-navy dark:text-white">
                          Undercoding Loss
                        </p>
                      </div>
                      <p className="mt-1 font-heading text-xl font-bold text-teal dark:text-teal-dark">
                        {formatCurrency(results.undercodingLoss)}
                      </p>
                      <p className="text-xs text-charcoal-light dark:text-gray-400">
                        {barSegments.undercoding.toFixed(0)}% of total
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Methodology ───────────────────────────────────────────── */}
      <section className="bg-ice px-6 pt-16 pb-16 dark:bg-dark-surface lg:pt-20 lg:pb-20">
        <div className="mx-auto max-w-3xl">
          <div>
            <h2 className="text-center font-heading text-3xl font-bold text-navy dark:text-white">
              How We Calculate These Estimates
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
              <p>
                Projections based on specialty-adjusted benchmarks from MGMA, AAFP, and HFMA:
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
                  Healthcare Financial Management Association (HFMA) data shows average first-pass denial rates of 6–13%
                  depending on specialty, with 65% eventual recovery. We apply a
                  35% permanent loss factor to denied claims.
                </li>
                <li>
                  <strong className="text-navy dark:text-white">
                    Undercoding:
                  </strong>{" "}
                  American Academy of Family Physicians (AAFP) research indicates systematic undercoding costs $30,000+
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
          </div>
        </div>
      </section>

      <SectionDivider variant="dark" />
    </>
  );
}
