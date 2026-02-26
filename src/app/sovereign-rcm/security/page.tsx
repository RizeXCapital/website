import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Security & HIPAA — Sovereign RCM",
  description:
    "Sovereign RCM is deployed on-premise in an air-gapped enclave. No PHI leaves your building. HIPAA-compliant by architecture.",
};

export default function Security() {
  return (
    <ComingSoon
      title="Security & HIPAA"
      description="On-premise. Air-gapped. Zero cloud PHI exposure. Sovereign RCM is HIPAA-compliant by architecture, not by policy."
    />
  );
}
