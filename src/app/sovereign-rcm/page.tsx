import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Sovereign RCM — On-Premise AI Billing Appliance",
  description:
    "Sovereign RCM is an on-premise AI appliance that drafts compliant professional claims from signed clinical notes. No PHI leaves your building.",
};

export default function SovereignRCM() {
  return (
    <ComingSoon
      title="Sovereign RCM"
      description="Your practice's billing, powered by on-premise AI. Full product details coming soon."
    />
  );
}
