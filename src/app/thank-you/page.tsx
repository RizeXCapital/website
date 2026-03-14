import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getRecentPosts } from "@/lib/blog";
import { LOGO_LIGHT, LOGO_DARK } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  const posts = getRecentPosts(3);

  return (
    <>
      {/* Confirmation */}
      <section className="bg-white px-6 pt-20 pb-16 dark:bg-dark-bg lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-10 flex justify-center">
            <Image
              src={LOGO_LIGHT}
              alt="Sovereign RCM"
              width={1258}
              height={342}
              className="h-14 w-auto dark:hidden"
              unoptimized
            />
            <Image
              src={LOGO_DARK}
              alt="Sovereign RCM"
              width={1244}
              height={334}
              className="hidden h-14 w-auto dark:block"
              unoptimized
            />
          </div>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-coral/10">
            <svg
              className="h-7 w-7 text-coral"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="mt-6 font-heading text-3xl font-bold text-navy dark:text-white sm:text-4xl">
            Message Received
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-light dark:text-gray-300">
            We&apos;ll respond within one business day
          </p>
        </div>
      </section>

      {/* Recent posts */}
      {posts.length > 0 && (
        <section className="bg-ice px-6 py-16 dark:bg-dark-surface lg:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-heading text-xl font-bold text-navy dark:text-white">
              While you wait
            </h2>
            <p className="mt-2 text-center text-sm text-charcoal-light dark:text-gray-400">
              Recent posts from our team
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-dark-bg"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-coral">
                    {post.category.replace("-", " ")}
                  </p>
                  <h3 className="mt-2 font-heading text-base font-bold leading-snug text-navy group-hover:text-coral dark:text-white dark:group-hover:text-coral">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-400">
                    {post.excerpt}
                  </p>
                  <p className="mt-3 text-xs text-charcoal-light dark:text-gray-500">
                    {post.readingTime} min read
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
