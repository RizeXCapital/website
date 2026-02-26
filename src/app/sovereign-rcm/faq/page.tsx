import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "FAQ — Sovereign RCM",
  description:
    "Frequently asked questions about Sovereign RCM — installation, compliance, pricing, support, and more.",
};

export default function FAQ() {
  return (
    <ComingSoon
      title="Frequently Asked Questions"
      description="Everything you need to know about Sovereign RCM. Comprehensive FAQ coming soon."
    />
  );
}
