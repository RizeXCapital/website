import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://rizexcapital.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/sovereign-rcm", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/sovereign-rcm/how-it-works", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sovereign-rcm/pricing", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sovereign-rcm/security", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sovereign-rcm/pilot-program", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sovereign-rcm/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/sovereign-rcm/roi-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sovereign-rcm/vs-cloud-rcm", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/sovereign-rcm/vs-outsourced-billing", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
