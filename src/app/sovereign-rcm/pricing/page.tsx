import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Pricing — Sovereign RCM Packages",
  description:
    "Sovereign RCM offers three tiers for solo practices, group practices, and enterprise. Contact us for a custom quote.",
};

export default function Pricing() {
  return (
    <ComingSoon
      title="Packages & Pricing"
      description="Sovereign RCM packages for practices of every size. Contact us for a custom quote tailored to your needs."
    />
  );
}
