"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Connect to email backend (Formspree, Resend, or API route)
    setSubmitted(true);
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
          <h1 className="mt-6 font-heading text-3xl font-bold text-navy">
            Thank You
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-light">
            We&apos;ve received your message. A founder will respond within 24
            hours. In the meantime, explore our{" "}
            <a href="/blog" className="font-medium text-teal hover:underline">
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
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Whether you&apos;re a practice exploring AI billing or a partner
              looking to collaborate — we&apos;d like to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Form column */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy">
                Send Us a Message
              </h2>
              <p className="mt-2 text-base text-charcoal-light">
                All fields marked with * are required.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-navy"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-navy"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-navy"
                  >
                    Phone Number{" "}
                    <span className="text-charcoal-light">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
                    placeholder="(555) 000-0000"
                  />
                </div>

                {/* Practice Name */}
                <div>
                  <label
                    htmlFor="practice"
                    className="block text-sm font-medium text-navy"
                  >
                    Practice Name{" "}
                    <span className="text-charcoal-light">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="practice"
                    name="practice"
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
                    placeholder="Your practice or organization"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-navy"
                  >
                    Message / Question *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-charcoal outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
                    placeholder="Tell us about your practice or what you're looking for..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-coral px-8 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover sm:w-auto"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info column */}
            <div className="lg:pl-8">
              <h2 className="font-heading text-2xl font-bold text-navy">
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
                      <h3 className="font-heading text-base font-bold text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-xl bg-ice p-8">
                <h3 className="font-heading text-base font-bold text-navy">
                  Based in Princeton, NJ
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                  RizeX Capital serves medical practices across Central New
                  Jersey and beyond. Sovereign RCM is deployed on-site at your
                  practice — wherever you are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
