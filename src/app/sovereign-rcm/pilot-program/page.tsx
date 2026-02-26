import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "90-Day Pilot Program — Sovereign RCM",
  description:
    "Try Sovereign RCM risk-free for 90 days. We prove the ROI before you commit. Shadow mode alongside your existing billing.",
};

export default function PilotProgram() {
  return (
    <ComingSoon
      title="90-Day Pilot Program"
      description="Try risk-free for 90 days. We prove the ROI before you commit. Full pilot details coming soon."
    />
  );
}
