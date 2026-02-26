import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "How It Works — Sovereign RCM Technical Architecture",
  description:
    "Learn how Sovereign RCM's multi-agent AI pipeline processes clinical notes into compliant 837P claims with full evidence tracing.",
};

export default function HowItWorks() {
  return (
    <ComingSoon
      title="How It Works"
      description="A detailed look at Sovereign RCM's multi-agent AI pipeline — from clinical notes to compliant claims."
    />
  );
}
