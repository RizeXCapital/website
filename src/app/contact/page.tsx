"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SectionDivider from "@/components/SectionDivider";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedHero } from "@/components/motion";

export default function Contact() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [messageLen, setMessageLen] = useState(0);
  const formLoadTime = useRef(Date.now());
  const MESSAGE_MAX = 2000;

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
      router.push("/thank-you");
      return;
    }

    // Time check: if form was submitted in under 3 seconds, likely a bot
    const elapsed = Date.now() - formLoadTime.current;
    if (elapsed < 3000) {
      router.push("/thank-you");
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
        router.push("/thank-you");
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

  return (
    <>
      {/* Hero */}
      <AnimatedHero className="bg-navy px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <FadeIn>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Get in Touch
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-4 text-lg leading-relaxed text-gray-300">
                Whether you&apos;re a practice exploring AI billing or a partner looking to collaborate, we&apos;d like to hear from you.
              </p>
            </FadeIn>
          </div>
        </div>
      </AnimatedHero>

      {/* Form */}
      <section className="bg-white px-6 py-16 dark:bg-dark-bg lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Form column */}
            <div>
              <FadeIn>
                <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-base text-charcoal-light dark:text-gray-300">
                  All fields marked with * are required.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
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
                    minLength={2}
                    maxLength={50}
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
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
                    maxLength={60}
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
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
                    maxLength={15}
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
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
                    maxLength={80}
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
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
                    minLength={10}
                    maxLength={MESSAGE_MAX}
                    onChange={(e) => setMessageLen(e.target.value.length)}
                    className="mt-2 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-[#3B5178] dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-gray-500"
                    placeholder="Tell us about your practice or what you're looking for..."
                  />
                  <p className={`mt-1 text-right text-xs ${messageLen > MESSAGE_MAX * 0.9 ? "text-coral" : "text-charcoal-light dark:text-gray-400"}`}>
                    {messageLen} / {MESSAGE_MAX}
                  </p>
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
              </FadeIn>
            </div>

            {/* Info column */}
            <div className="lg:pl-8">
              <FadeIn>
                <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                  What Happens Next
                </h2>
              </FadeIn>
              <StaggerContainer className="mt-8 space-y-8">
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
                  <StaggerItem key={item.step}>
                    <div className="flex gap-4">
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
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <FadeIn delay={0.3}>
              <div className="mt-12 rounded-xl bg-ice p-8 dark:bg-dark-surface">
                <h3 className="font-heading text-base font-bold text-navy dark:text-white">
                  Based in Princeton, NJ
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                  Sovereign RCM serves practices across Central New
                  Jersey and beyond. Sovereign RCM deploys on-site at your
                  practice, wherever you are.
                </p>
              </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />
    </>
  );
}
