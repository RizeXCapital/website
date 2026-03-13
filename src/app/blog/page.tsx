import type { Metadata } from "next";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import Image from "next/image";
import {
  getAllPosts,
  getPostsByCategory,
  categoryLabels,
  type BlogCategory,
} from "@/lib/blog";
import SectionDivider from "@/components/SectionDivider";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedHero } from "@/components/motion";

export const metadata: Metadata = {
  title: "Blog: AI Medical Billing Insights | Sovereign RCM",
  description:
    "Insights on AI medical billing, practice management, revenue cycle optimization, and healthcare technology from the Sovereign RCM team.",
  openGraph: {
    title: "Blog: AI Medical Billing Insights | Sovereign RCM",
    description:
      "Insights on AI medical billing, practice management, revenue cycle optimization, and healthcare technology from the Sovereign RCM team.",
    url: "https://rizexcapital.com/blog",
  },
  alternates: {
    canonical: "https://rizexcapital.com/blog",
  },
};

const categories = Object.keys(categoryLabels) as BlogCategory[];

const authorPhotos: Record<string, string> = {
  "Ghulam Shah": "/GhulamPhoto.jpg",
  "Faizan G. Arif, MD": "/FaizMD.jpeg",
  "Navid M. Rahman, PE": "/NavidHeadshot.jpeg",
};

const authorPhotoPosition: Record<string, string> = {
  "Faizan G. Arif, MD": "[object-position:50%_30%]",
};

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = categories.includes(category as BlogCategory)
    ? (category as BlogCategory)
    : undefined;

  const posts = activeCategory
    ? getPostsByCategory(activeCategory)
    : getAllPosts();

  return (
    <>
      {/* Hero */}
      <AnimatedHero className="bg-navy px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
              Blog
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
              Insights on AI medical billing, revenue cycle management, and healthcare technology
            </p>
          </FadeIn>
        </div>
      </AnimatedHero>

      {/* Category Filters + Posts */}
      <section className="bg-white px-6 py-16 dark:bg-dark-bg lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Filter Tabs */}
          <nav className="flex flex-wrap gap-3" aria-label="Blog categories">
            <Link
              href="/blog"
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                !activeCategory
                  ? "bg-coral text-white"
                  : "bg-gray-100 text-charcoal-light hover:bg-gray-200 dark:bg-dark-elevated dark:text-gray-300 dark:hover:bg-dark-border"
              }`}
            >
              All Posts
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-coral text-white"
                    : "bg-gray-100 text-charcoal-light hover:bg-gray-200 dark:bg-dark-elevated dark:text-gray-300 dark:hover:bg-dark-border"
                }`}
              >
                {categoryLabels[cat]}
              </Link>
            ))}
          </nav>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Main posts */}
              <StaggerContainer className="grid grid-cols-1 gap-8 lg:col-span-2">
                {posts.map((post) => (
                  <StaggerItem key={post.slug}>
                  <article
                    className="group overflow-hidden rounded-xl border border-gray-300 border-l-4 border-l-coral bg-white transition-[box-shadow,transform] duration-2800 ease-out hover:scale-[1.01] hover:shadow-md active:scale-[0.99] dark:border-dark-border dark:border-l-coral dark:bg-dark-elevated dark:hover:shadow-lg dark:hover:shadow-black/20"
                  >
                    {post.image && (
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="aspect-[21/9] overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={257}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="p-8">
                      <p className="inline-block rounded-full bg-coral/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-coral dark:bg-coral/20 dark:text-coral">
                        {categoryLabels[post.category]}
                      </p>
                      <h2 className="mt-2 font-heading text-xl font-bold text-navy dark:text-white">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition-colors hover:text-coral dark:hover:text-coral"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <div className="mt-2 flex items-center gap-2">
                        {authorPhotos[post.author] && (
                          <div className="overflow-hidden rounded-full">
                            <Image
                              src={authorPhotos[post.author]}
                              alt={post.author}
                              width={24}
                              height={24}
                              className={`rounded-full object-cover transition-transform duration-300 hover:scale-125 ${authorPhotoPosition[post.author] ?? ""}`}
                            />
                          </div>
                        )}
                        <p className="text-sm text-charcoal-light dark:text-gray-400">
                          {post.author} &middot;{" "}
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          &middot; {post.readingTime} min read
                        </p>
                      </div>
                      <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-4 inline-block text-sm font-medium text-coral transition-colors hover:text-coral dark:text-coral dark:hover:text-coral"
                      >
                        Read More &rarr;
                      </Link>
                    </div>
                  </article>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Upcoming post teasers — stacked on the right */}
              {!activeCategory && (
                <StaggerContainer className="space-y-6 lg:col-span-1">
                  {/* Checklist lead magnet */}
                  <FadeIn>
                    <div className="rounded-xl border border-coral/20 bg-coral/5 p-6 dark:border-coral/20 dark:bg-coral/10">
                      <p className="text-xs font-medium uppercase tracking-wider text-coral dark:text-coral">
                        Free Resource
                      </p>
                      <p className="mt-2 font-heading text-base font-bold text-navy dark:text-white">
                        Medical Practice Billing Audit Checklist
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                        35 audit items across claim accuracy, denial patterns,
                        A/R, coding, and PHI compliance. Free download.
                      </p>
                      <Link
                        href="/sovereign-rcm/billing-audit-checklist"
                        className="mt-4 inline-block text-sm font-medium text-coral transition-colors hover:text-coral dark:text-coral dark:hover:text-coral"
                      >
                        Get the Free Checklist &rarr;
                      </Link>
                    </div>
                  </FadeIn>

                  <FadeIn>
                    <p className="font-heading text-sm font-bold uppercase tracking-wider text-charcoal-light dark:text-gray-400">
                      Coming Up
                    </p>
                  </FadeIn>
                  {[
                    {
                      title: "Building an Air-Gapped AI System for Medical Billing",
                      author: "Zubair Khan, DO",
                      date: "Mid March 2026",
                    },
                    {
                      title: "The Prior Authorization Problem: What Every Practice Owner Should Know",
                      author: "Shahan G. Arif, MD",
                      date: "Late March 2026",
                    },
                    {
                      title: "Why Credentialing Delays Are Costing Your Practice More Than You Know",
                      author: "Fawad Aziz",
                      date: "Early April 2026",
                    },
                    {
                      title: "Days in A/R: The One Metric That Reveals Everything About Your Billing Health",
                      author: "Usman Khan",
                      date: "Mid April 2026",
                    },
                  ].map((upcoming) => (
                    <StaggerItem key={upcoming.title}>
                    <article
                      className="rounded-xl border border-dashed border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated"
                    >
                      <span className="inline-block rounded-full bg-steel/10 px-2.5 py-0.5 text-xs font-medium text-steel dark:bg-steel-light/10 dark:text-steel-light">
                        Coming Soon
                      </span>
                      <h2 className="mt-2 font-heading text-lg font-bold text-navy dark:text-white">
                        {upcoming.title}
                      </h2>
                      <p className="mt-2 text-sm text-charcoal-light dark:text-gray-400">
                        {upcoming.author} &middot; {upcoming.date}
                      </p>
                    </article>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-lg text-charcoal-light dark:text-gray-400">
                No posts in this category yet. Check back soon.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-sm font-medium text-coral hover:underline dark:text-coral"
              >
                &larr; View all posts
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="light" />

      {/* CTA */}
      <section className="bg-navy px-6 py-16 lg:py-20">
        <FadeIn>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready to Stop Losing Revenue to Billing Inefficiency?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
              Find out how much revenue your practice could recover with on-premise AI billing.
            </p>
            <div className="mt-8">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-block rounded-lg bg-coral px-10 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover"
                >
                  Get in Touch
                </Link>
              </MagneticButton>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
