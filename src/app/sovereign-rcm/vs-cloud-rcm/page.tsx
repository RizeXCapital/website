import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Sovereign RCM vs. Cloud SaaS RCM",
  description:
    "Compare Sovereign RCM's on-premise AI appliance to cloud-hosted SaaS RCM platforms. Own your data, own your infrastructure.",
};

export default function VsCloudRCM() {
  return (
    <ComingSoon
      title="vs. Cloud SaaS"
      description="On-premise AI vs. cloud subscriptions. Why practices are choosing to own their billing infrastructure."
    />
  );
}
