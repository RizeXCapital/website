"use client";

import { useState, useRef, useEffect } from "react";
import SectionDivider from "@/components/SectionDivider";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formLoadTime = useRef(Date.now());

  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot: if this hidden field is filled, it's a bot
    if (formData.get("company_url")) {
      setSubmitted(true);
      return;
    }

    // Time check: if form was submitted in under 3 seconds, likely a bot
    const elapsed = Date.now() - formLoadTime.current;
    if (elapsed < 3000) {
      setSubmitted(true);
      return;
    }

    // Prevent double-submit
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          practice: formData.get("practice"),
          message: formData.get("message"),
          company_url: formData.get("company_url"),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/10">
            <svg
              className="h-8 w-8 text-teal"
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
          <h1 className="mt-6 font-heading text-3xl font-bold text-navy dark:text-white">
            Thank You
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-light dark:text-gray-300">
            We&apos;ve received your message. We&apos;ll respond within one
            business day. In the meantime, explore our{" "}
            <a href="/blog" className="font-medium text-teal hover:underline dark:text-teal-dark">
              blog
            </a>{" "}
            for insights on AI medical billing.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Whether you&apos;re a practice exploring AI billing or a partner looking to collaborate — we&apos;d like to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white px-6 py-16 dark:bg-dark-bg lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Form column */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                Send Us a Message
              </h2>
              <p className="mt-2 text-base text-charcoal-light dark:text-gray-300">
                All fields marked with * are required.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Honeypot — invisible to real users, bots auto-fill it */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="company_url">Website</label>
                  <input
                    type="text"
                    id="company_url"
                    name="company_url"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-navy dark:text-white"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-navy dark:text-white"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-navy dark:text-white"
                  >
                    Phone Number{" "}
                    <span className="text-charcoal-light dark:text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
                    placeholder="(555) 000-0000"
                  />
                </div>

                {/* Practice Name */}
                <div>
                  <label
                    htmlFor="practice"
                    className="block text-sm font-medium text-navy dark:text-white"
                  >
                    Practice Name{" "}
                    <span className="text-charcoal-light dark:text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="practice"
                    name="practice"
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
                    placeholder="Your practice or organization"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-navy dark:text-white"
                  >
                    Message / Question *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
                    placeholder="Tell us about your practice or what you're looking for..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-coral">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-coral px-8 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover disabled:opacity-50 sm:w-auto"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Info column */}
            <div className="lg:pl-8">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                What Happens Next
              </h2>
              <div className="mt-8 space-y-8">
                {[
                  {
                    step: "1",
                    title: "We receive your message",
                    description:
                      "Your inquiry is sent directly to all three founders.",
                  },
                  {
                    step: "2",
                    title: "A founder responds within 24 hours",
                    description:
                      "The designated founder reviews your message and follows up personally.",
                  },
                  {
                    step: "3",
                    title: "We schedule a call",
                    description:
                      "If there's a fit, we'll schedule a call to discuss your practice's needs in detail.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-navy dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-xl bg-ice p-8 dark:bg-dark-surface">
                <h3 className="font-heading text-base font-bold text-navy dark:text-white">
                  Based in Princeton, NJ
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                  RizeX Capital serves practices across Central New
                  Jersey and beyond. Sovereign RCM deploys on-site at your
                  practice — wherever you are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />
    </>
  );
}
