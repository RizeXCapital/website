import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  categoryLabels,
} from "@/lib/blog";
import SectionDivider from "@/components/SectionDivider";

// ---------------------------------------------------------------------------
// Author Bios (lookup map for founders)
// ---------------------------------------------------------------------------

const authorBios: Record<string, { role: string; bio: string }> = {
  "Ghulam Shah": {
    role: "Chief Technology Officer",
    bio: "AI architect and data strategist at Sovereign RCM. Ghulam has built enterprise data platforms at scale, led ML forecasting models, and turns complex AI into production-grade products.",
  },
  "Faizan G. Arif, MD": {
    role: "Chief Executive Officer",
    bio: "Board-certified EM physician and the clinical visionary behind Sovereign RCM. Faizan has coded, billed, and fought denials from the bedside at the highest-volume EDs in the country.",
  },
  "Navid M. Rahman, PE": {
    role: "Chief Operating Officer",
    bio: "Licensed PE with 15+ years managing regulated infrastructure. Navid translates complex compliance and procurement into structured AI deployment playbooks.",
  },
};

// ---------------------------------------------------------------------------
// Static Params + Dynamic Metadata
// ---------------------------------------------------------------------------

// Revalidate every 60s so content updates propagate quickly
export const revalidate = 60;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Sovereign RCM Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://rizexcapital.com/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      ...(post.image && {
        images: [{ url: `https://rizexcapital.com${post.image}`, width: 1200, height: 630 }],
      }),
    },
    alternates: {
      canonical: `https://rizexcapital.com/blog/${post.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 3);
  const authorInfo = authorBios[post.author];

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Sovereign RCM",
      url: "https://rizexcapital.com",
    },
    description: post.excerpt,
    mainEntityOfPage: `https://rizexcapital.com/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header */}
      <article className="bg-white px-6 py-16 dark:bg-dark-bg lg:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav
            className="mb-8 text-sm text-charcoal-light dark:text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="transition-colors hover:text-teal dark:hover:text-teal-dark"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/blog"
              className="transition-colors hover:text-teal dark:hover:text-teal-dark"
            >
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-navy dark:text-white">{post.title}</span>
          </nav>

          {/* Category Badge */}
          <p className="text-xs font-medium uppercase tracking-wider text-teal dark:text-teal-dark">
            {categoryLabels[post.category]}
          </p>

          {/* Title */}
          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-navy dark:text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Meta + Share */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-charcoal-light dark:text-gray-400">
              {post.author} &middot; {formattedDate} &middot; {post.readingTime}{" "}
              min read
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://rizexcapital.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal-light transition-colors hover:text-teal dark:text-gray-400 dark:hover:text-teal-dark"
                aria-label="Share on LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://rizexcapital.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal-light transition-colors hover:text-teal dark:text-gray-400 dark:hover:text-teal-dark"
                aria-label="Share on X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.excerpt)}%0A%0A${encodeURIComponent(`https://rizexcapital.com/blog/${post.slug}`)}`}
                className="text-charcoal-light transition-colors hover:text-teal dark:text-gray-400 dark:hover:text-teal-dark"
                aria-label="Share via email"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          {post.image && (
            <div className="mt-8 overflow-hidden rounded-xl">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={630}
                className="h-auto w-full"
                priority
              />
            </div>
          )}

          {/* Article Body */}
          <div
            className="blog-content mt-10"
            dangerouslySetInnerHTML={{ __html: post.content! }}
          />

          {/* Share Buttons */}
          <div className="mt-10 flex items-center gap-4">
            <span className="text-sm font-medium text-charcoal-light dark:text-gray-400">
              Share this article
            </span>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://rizexcapital.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal-light transition-colors hover:text-teal dark:text-gray-400 dark:hover:text-teal-dark"
                aria-label="Share on LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://rizexcapital.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal-light transition-colors hover:text-teal dark:text-gray-400 dark:hover:text-teal-dark"
                aria-label="Share on X"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.excerpt)}%0A%0A${encodeURIComponent(`https://rizexcapital.com/blog/${post.slug}`)}`}
                className="text-charcoal-light transition-colors hover:text-teal dark:text-gray-400 dark:hover:text-teal-dark"
                aria-label="Share via email"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>

          {/* Author Bio */}
          {authorInfo && (
            <div className="mt-12 rounded-xl border border-gray-300 bg-ice p-6 dark:border-dark-border dark:bg-dark-elevated">
              <p className="text-xs font-medium uppercase tracking-wider text-teal dark:text-teal-dark">
                About the Author
              </p>
              <p className="mt-2 font-heading text-lg font-bold text-navy dark:text-white">
                {post.author}
              </p>
              <p className="text-sm font-medium text-charcoal-light dark:text-gray-400">
                {authorInfo.role}
              </p>
              <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                {authorInfo.bio}
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <>
          <SectionDivider variant="light" />
          <section className="bg-ice px-6 py-16 dark:bg-dark-surface lg:py-20">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-center font-heading text-2xl font-bold text-navy dark:text-white sm:text-3xl">
                Related Posts
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                {related.map((relPost) => (
                  <div
                    key={relPost.slug}
                    className="rounded-xl border border-gray-300 bg-white p-6 dark:border-dark-border dark:bg-dark-elevated"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-teal dark:text-teal-dark">
                      {categoryLabels[relPost.category]}
                    </p>
                    <h3 className="mt-2 font-heading text-lg font-bold text-navy dark:text-white">
                      <Link
                        href={`/blog/${relPost.slug}`}
                        className="transition-colors hover:text-teal dark:hover:text-teal-dark"
                      >
                        {relPost.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-charcoal-light dark:text-gray-400">
                      {new Date(relPost.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      &middot; {relPost.readingTime} min read
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <SectionDivider variant="dark" />
      <section className="bg-navy px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            See How Much Revenue You&apos;re Leaving on the Table
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Every day without optimized billing is revenue lost. Find out what
            on-premise AI billing can do for your practice.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-coral px-10 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover"
            >
              Request a Billing Analysis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
