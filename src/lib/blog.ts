import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BlogCategory =
  | "sovereign-rcm"
  | "ai-insights"
  | "practice-management"
  | "company-news";

export const categoryLabels: Record<BlogCategory, string> = {
  "sovereign-rcm": "Sovereign RCM",
  "ai-insights": "AI Insights",
  "practice-management": "Practice Management",
  "company-news": "Company News",
};

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: BlogCategory;
  excerpt: string;
  keywords: string[];
  featured?: boolean;
  content?: string; // HTML — only populated by getPostBySlug
  readingTime: number; // minutes
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function computeReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 265));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: data.slug as string,
      title: data.title as string,
      date: data.date as string,
      author: data.author as string,
      category: data.category as BlogCategory,
      excerpt: data.excerpt as string,
      keywords: (data.keywords as string[]) ?? [],
      featured: (data.featured as boolean) ?? false,
      readingTime: computeReadingTime(content),
    };
  });

  // Sort by date descending
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = getAllPosts();
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) return undefined;

  // Re-read file to get raw markdown body
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      const result = await remark().use(html).process(content);
      return { ...meta, content: result.toString() };
    }
  }

  return undefined;
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getRelatedPosts(
  currentSlug: string,
  category: BlogCategory,
  count: number = 3
): BlogPost[] {
  const sameCategory = getAllPosts().filter(
    (p) => p.category === category && p.slug !== currentSlug
  );

  if (sameCategory.length >= count) return sameCategory.slice(0, count);

  // Fill remaining slots with recent posts from other categories
  const remaining = count - sameCategory.length;
  const others = getAllPosts().filter(
    (p) => p.slug !== currentSlug && !sameCategory.some((s) => s.slug === p.slug)
  );

  return [...sameCategory, ...others.slice(0, remaining)];
}
