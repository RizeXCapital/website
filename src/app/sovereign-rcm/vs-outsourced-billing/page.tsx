import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Sovereign RCM vs. Outsourced Billing",
  description:
    "Compare Sovereign RCM's fixed-cost on-premise AI to traditional outsourced billing agencies that charge a percentage of collections.",
};

export default function VsOutsourcedBilling() {
  return (
    <ComingSoon
      title="vs. Outsourced Billing"
      description="Why own your billing intelligence instead of renting it. A direct comparison of Sovereign RCM and traditional outsourced billing."
    />
  );
}
