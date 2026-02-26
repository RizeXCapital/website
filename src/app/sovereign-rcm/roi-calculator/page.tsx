import type { Metadata } from "next";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import ROICalculator from "@/components/ROICalculator";

export const metadata: Metadata = {
  title: "ROI Calculator — Sovereign RCM",
  description:
    "Calculate how much revenue your practice is losing to billing overhead, denials, and undercoding. See the impact with our interactive calculator.",
  openGraph: {
    title: "ROI Calculator — Sovereign RCM",
    description:
      "Calculate how much revenue your practice is losing to billing overhead, denials, and undercoding.",
    url: "https://rizexcapital.com/sovereign-rcm/roi-calculator",
  },
  alternates: {
    canonical: "https://rizexcapital.com/sovereign-rcm/roi-calculator",
  },
};

export default function ROICalculatorPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              How Much Revenue Is Your Practice Losing?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
              Most practices lose revenue in three places they never see:
              billing overhead, claim denials, and systematic undercoding. Use
              this calculator to estimate your annual leakage.
            </p>
          </div>
        </div>
      </section>

      <ROICalculator />

      {/* CTA */}
      <section className="bg-navy px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Ready for a Personalized Revenue Analysis?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            These estimates use industry benchmarks. Let our team analyze your
            actual claims data for a precise projection.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-coral px-10 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover"
            >
              Request a Billing Analysis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
