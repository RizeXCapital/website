import Link from "next/link";
import { FadeIn } from "@/components/motion";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <FadeIn>
        <div className="max-w-lg text-center">
          <p className="font-heading text-7xl font-bold text-teal dark:text-teal-dark">
            404
          </p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-navy dark:text-white">
            Page Not Found
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-light dark:text-gray-300">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-lg bg-coral px-8 py-4 text-center text-base font-medium text-white transition-colors hover:bg-coral-hover active:scale-[0.97]"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 px-8 py-4 text-center text-base font-medium text-navy transition-colors hover:border-teal hover:text-teal dark:border-dark-border dark:text-white dark:hover:border-teal-dark dark:hover:text-teal-dark active:scale-[0.97]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
