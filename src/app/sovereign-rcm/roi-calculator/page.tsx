import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "ROI Calculator — Sovereign RCM",
  description:
    "Calculate how much revenue your practice is losing to billing errors, undercoding, and denials. See the Sovereign RCM difference.",
};

export default function ROICalculator() {
  return (
    <ComingSoon
      title="ROI Calculator"
      description="See how much revenue your practice is leaving on the table. Interactive calculator coming soon."
    />
  );
}
