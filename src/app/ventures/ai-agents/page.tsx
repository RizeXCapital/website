import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "AI Agents — Voice & Chatbot Intelligence",
  description:
    "AI-powered voice and chatbot agents for businesses. A RizeX Capital venture. Coming soon.",
};

export default function AIAgents() {
  return (
    <ComingSoon
      title="AI Agents"
      description="Voice and chatbot intelligence for businesses. A RizeX Capital venture. Details coming soon."
    />
  );
}
