import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Blog — AI Medical Billing Insights",
  description:
    "Insights on AI medical billing, practice management, revenue cycle optimization, and healthcare technology from the RizeX Capital team.",
};

export default function Blog() {
  return (
    <ComingSoon
      title="Blog"
      description="Insights on AI medical billing, revenue cycle management, and healthcare technology. First posts coming soon."
    />
  );
}
