import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Amazon Seller — AI E-Commerce Optimization",
  description:
    "AI-powered e-commerce optimization for Amazon sellers. A RizeX Capital venture. Coming soon.",
};

export default function AmazonSeller() {
  return (
    <ComingSoon
      title="Amazon Seller"
      description="AI e-commerce optimization. A RizeX Capital venture. Details coming soon."
    />
  );
}
