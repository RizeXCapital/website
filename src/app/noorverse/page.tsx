import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "NoorVerse — Islamic Children's Publishing",
  description:
    "NoorVerse is an Islamic children's publishing venture by RizeX Capital. Coming soon.",
};

export default function NoorVerse() {
  return (
    <ComingSoon
      title="NoorVerse"
      description="Islamic children's publishing. A RizeX Capital venture. Details coming soon."
    />
  );
}
