import type { Metadata } from "next";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import { AnimatedHero } from "@/components/motion";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "RizeX Capital privacy policy. Learn how we collect, use, and protect your information — including our commitment to on-premise data processing and HIPAA compliance.",
};

const lastUpdated = "February 26, 2026";

export default function Privacy() {
  return (
    <>
      {/* Hero */}
      <AnimatedHero className="bg-navy px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Your privacy matters. This policy explains what data we collect,
              how we use it, and the measures we take to protect it.
            </p>
            <p className="mt-3 text-sm text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </AnimatedHero>

      {/* Content */}
      <section className="bg-white px-6 py-16 dark:bg-dark-bg lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {/* 1. Who We Are */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                1. Who We Are
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                RizeX Capital (&ldquo;RizeX,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a disciplined AI
                product company headquartered in Princeton, New Jersey. Our
                flagship product, Sovereign RCM, is an on-premise AI billing
                appliance for medical practices. This Privacy Policy applies to
                the RizeX Capital website at{" "}
                <span className="font-medium text-teal dark:text-teal-dark">
                  rizexcapital.com
                </span>{" "}
                and the services we offer.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                2. Information We Collect
              </h2>

              <h3 className="mt-6 font-heading text-lg font-bold text-navy dark:text-white">
                Information You Provide
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                When you submit our contact form, we collect:
              </p>
              <ul className="mt-3 space-y-2 pl-6">
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Full name (required)
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Email address (required)
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Phone number (optional)
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Practice or organization name (optional)
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Your message or inquiry
                </li>
              </ul>

              <h3 className="mt-6 font-heading text-lg font-bold text-navy dark:text-white">
                Information Collected Automatically
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We use a single, essential cookie to store your theme preference
                (light or dark mode). This cookie contains no personal
                information and is not used for tracking or advertising. We do
                not use localStorage or sessionStorage.
              </p>
              <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                Our hosting provider may collect standard server logs (IP
                address, browser type, pages visited, timestamps) for security
                and performance purposes. We do not use these logs for marketing
                or profiling.
              </p>
            </div>

            {/* 3. How We Use Your Information */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                3. How We Use Your Information
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We use the information you provide through our contact form to:
              </p>
              <ul className="mt-3 space-y-2 pl-6">
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Respond to your inquiry within one business day
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Evaluate whether our services are a fit for your practice
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Schedule follow-up conversations you request
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Improve our website and services based on feedback
                </li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We do not sell, rent, or share your personal information with
                third parties for marketing purposes.
              </p>
            </div>

            {/* 4. Sovereign RCM & Patient Data */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                4. Sovereign RCM and Patient Data
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                Sovereign RCM is an on-premise AI appliance. It is deployed
                inside your practice, on hardware you own. By design:
              </p>
              <ul className="mt-3 space-y-2 pl-6">
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  <span className="font-medium text-navy dark:text-white">
                    Protected health information (PHI) never leaves your building.
                  </span>{" "}
                  All AI inference, claim drafting, and data processing happen
                  locally on the appliance.
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  RizeX Capital does not receive, store, transmit, or have
                  access to any patient data processed by Sovereign RCM.
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  The appliance operates in an air-gapped configuration — no
                  cloud connectivity is required for core functionality.
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Your practice retains 100% ownership and control of all data
                  processed by the appliance.
                </li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                Sovereign RCM is designed to support HIPAA compliance. Specific
                data handling, Business Associate Agreement (BAA) terms, and
                security configurations are covered in the deployment agreement
                between RizeX Capital and each practice.
              </p>
            </div>

            {/* 5. Data Sharing */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                5. Data Sharing and Third Parties
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We may share your contact information with the following
                categories of service providers, solely to operate our business:
              </p>
              <ul className="mt-3 space-y-2 pl-6">
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  <span className="font-medium text-navy dark:text-white">
                    Email delivery:
                  </span>{" "}
                  To send contact form submissions to our founders
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  <span className="font-medium text-navy dark:text-white">
                    Hosting:
                  </span>{" "}
                  Our website is hosted on Vercel, which processes requests to
                  serve pages
                </li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We do not use third-party analytics, advertising networks,
                social media trackers, or remarketing pixels on this website.
              </p>
            </div>

            {/* 6. Cookies */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                6. Cookies
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                This website uses a single cookie:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-navy dark:border-teal-dark">
                      <th className="pb-3 pr-6 font-heading font-bold text-navy dark:text-white">
                        Name
                      </th>
                      <th className="pb-3 pr-6 font-heading font-bold text-navy dark:text-white">
                        Purpose
                      </th>
                      <th className="pb-3 pr-6 font-heading font-bold text-navy dark:text-white">
                        Duration
                      </th>
                      <th className="pb-3 font-heading font-bold text-navy dark:text-white">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal-light dark:text-gray-300">
                    <tr className="border-b border-gray-300 dark:border-dark-border">
                      <td className="py-3 pr-6 font-mono text-sm text-teal dark:text-teal-dark">
                        theme
                      </td>
                      <td className="py-3 pr-6">
                        Stores your light/dark mode preference
                      </td>
                      <td className="py-3 pr-6">1 year</td>
                      <td className="py-3">Essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We do not use tracking cookies, advertising cookies, or any
                third-party cookies. You can clear the theme cookie at any time
                through your browser settings; the site will default to your
                operating system&apos;s color scheme preference.
              </p>
            </div>

            {/* 7. Data Security */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                7. Data Security
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We implement reasonable security measures to protect the
                information submitted through our website, including:
              </p>
              <ul className="mt-3 space-y-2 pl-6">
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  HTTPS encryption for all data in transit
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Server-side form validation and spam protection
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Limited access to contact submissions (founders only)
                </li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                No method of transmission over the internet is 100% secure. While
                we strive to protect your personal information, we cannot guarantee
                its absolute security.
              </p>
            </div>

            {/* 8. Data Retention */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                8. Data Retention
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We retain contact form submissions for as long as necessary to
                respond to your inquiry and maintain the business relationship.
                If you would like us to delete your information, contact us at
                the address below and we will do so within 30 days.
              </p>
            </div>

            {/* 9. Your Rights */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                9. Your Rights
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="mt-3 space-y-2 pl-6">
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Request access to the personal information we hold about you
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Request correction of inaccurate information
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Request deletion of your personal information
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Opt out of any future communications
                </li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                To exercise any of these rights, contact us using the
                information in Section 11 below.
              </p>
            </div>

            {/* 10. Children's Privacy */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                10. Children&apos;s Privacy
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                This website is not directed at individuals under the age of 18.
                We do not knowingly collect personal information from children.
                If you believe we have inadvertently collected information from a
                minor, please contact us and we will delete it promptly.
              </p>
            </div>

            {/* 11. Contact Us */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                11. Contact Us
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                If you have questions about this Privacy Policy or wish to
                exercise your data rights, reach out to us:
              </p>
              <div className="mt-4 rounded-xl border border-gray-300 bg-ice p-6 dark:border-dark-border dark:bg-dark-surface">
                <p className="font-heading text-base font-bold text-navy dark:text-white">
                  RizeX Capital
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                  Princeton, NJ
                </p>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                  Email:{" "}
                  <a
                    href="mailto:contact@rizexcapital.com"
                    className="font-medium text-teal hover:underline dark:text-teal-dark"
                  >
                    contact@rizexcapital.com
                  </a>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                  Or use our{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-teal hover:underline dark:text-teal-dark"
                  >
                    contact form
                  </Link>
                </p>
              </div>
            </div>

            {/* 12. Changes */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                12. Changes to This Policy
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We may update this Privacy Policy from time to time. When we do,
                we will revise the &ldquo;Last updated&rdquo; date at the top of
                this page. We encourage you to review this policy periodically.
                Continued use of the website after changes constitutes
                acceptance of the updated policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* CTA */}
      <section className="bg-navy px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Questions About Our Privacy Practices?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            We believe in transparency. If anything in this policy is unclear,
            we&apos;re happy to explain.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-coral px-10 py-4 text-base font-medium text-white transition-colors hover:bg-coral-hover"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
