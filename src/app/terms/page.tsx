import type { Metadata } from "next";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import { AnimatedHero } from "@/components/motion";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for the RizeX Capital website. Read our terms governing use of rizexcapital.com and Sovereign RCM product information.",
  alternates: {
    canonical: "https://rizexcapital.com/terms",
  },
};

const lastUpdated = "March 13, 2026";

export default function Terms() {
  return (
    <>
      {/* Hero */}
      <AnimatedHero className="bg-navy px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              The terms that govern your use of the RizeX Capital website and
              Sovereign RCM product information.
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
            {/* 1. Acceptance */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                1. Acceptance of Terms
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                By accessing or using the RizeX Capital website at{" "}
                <span className="font-medium text-coral dark:text-coral">
                  rizexcapital.com
                </span>{" "}
                (&ldquo;the Site&rdquo;), you agree to be bound by these Terms
                of Service (&ldquo;Terms&rdquo;). If you do not agree, please do
                not use the Site.
              </p>
            </div>

            {/* 2. Description of Service */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                2. Description of Service
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                RizeX Capital (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) operates this website to provide information
                about our company and our product, Sovereign RCM, an on-premise
                AI billing appliance for medical practices. The Site includes a
                contact form, blog, product descriptions, and related
                educational content.
              </p>
              <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                The Site is informational. It does not constitute medical,
                legal, or financial advice. Product capabilities, pricing
                structures, and deployment terms described on the Site are
                subject to the specific agreements between RizeX Capital and
                each client.
              </p>
            </div>

            {/* 3. Use of the Site */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                3. Acceptable Use
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                You agree to use the Site only for lawful purposes. You may not:
              </p>
              <ul className="mt-3 space-y-2 pl-6">
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Submit false, misleading, or fraudulent information through
                  any form on the Site
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Attempt to gain unauthorized access to any part of the Site,
                  its servers, or any connected systems
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Use automated tools to scrape, crawl, or extract data from
                  the Site beyond what is permitted by our robots.txt
                </li>
                <li className="list-disc text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                  Interfere with or disrupt the operation of the Site
                </li>
              </ul>
            </div>

            {/* 4. Intellectual Property */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                4. Intellectual Property
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                All content on this Site, including text, graphics, logos,
                images, blog posts, and software, is the property of RizeX
                Capital or its licensors and is protected by applicable
                intellectual property laws.
              </p>
              <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                &ldquo;Sovereign RCM,&rdquo; &ldquo;RizeX Capital,&rdquo; and
                associated logos are trademarks of RizeX Capital. You may not
                use these marks without our prior written consent.
              </p>
              <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                You may share links to our blog posts and pages. You may not
                reproduce, distribute, or create derivative works from our
                content without permission.
              </p>
            </div>

            {/* 5. Contact Form Submissions */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                5. Contact Form Submissions
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                When you submit information through our contact form or
                checklist download form, you consent to receiving a response
                from our team. We will not add you to a marketing list or send
                unsolicited communications beyond responding to your inquiry.
                See our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-coral hover:underline dark:text-coral"
                >
                  Privacy Policy
                </Link>{" "}
                for details on how we handle your data.
              </p>
            </div>

            {/* 6. Disclaimer */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                6. Disclaimer of Warranties
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                The Site and its content are provided &ldquo;as is&rdquo; and
                &ldquo;as available&rdquo; without warranties of any kind,
                either express or implied. We do not warrant that the Site will
                be uninterrupted, error-free, or free of harmful components.
              </p>
              <p className="mt-3 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                Product performance metrics, benchmarks, and case studies
                referenced on the Site are based on specific conditions and may
                not reflect the results for every practice. Actual outcomes
                depend on factors including practice size, specialty, payer mix,
                and existing workflows.
              </p>
            </div>

            {/* 7. Limitation of Liability */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                7. Limitation of Liability
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                To the fullest extent permitted by law, RizeX Capital shall not
                be liable for any indirect, incidental, special, consequential,
                or punitive damages arising from your use of or inability to use
                the Site. This includes damages for loss of profits, data, or
                other intangible losses, even if we have been advised of the
                possibility of such damages.
              </p>
            </div>

            {/* 8. Third-Party Links */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                8. Third-Party Links
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                The Site may contain links to third-party websites or resources.
                These links are provided for convenience only. We do not endorse
                and are not responsible for the content, products, or services
                offered by third parties.
              </p>
            </div>

            {/* 9. Governing Law */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                9. Governing Law
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                These Terms are governed by and construed in accordance with the
                laws of the State of New Jersey, without regard to its conflict
                of law provisions. Any disputes arising under these Terms shall
                be resolved in the state or federal courts located in Mercer
                County, New Jersey.
              </p>
            </div>

            {/* 10. Changes */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                10. Changes to These Terms
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                We may update these Terms from time to time. When we do, we will
                revise the &ldquo;Last updated&rdquo; date at the top of this
                page. Continued use of the Site after changes constitutes
                acceptance of the updated Terms.
              </p>
            </div>

            {/* 11. Contact */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white">
                11. Contact Us
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
                If you have questions about these Terms, reach out to us:
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
                    className="font-medium text-coral hover:underline dark:text-coral"
                  >
                    contact@rizexcapital.com
                  </a>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-light dark:text-gray-300">
                  Or use our{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-coral hover:underline dark:text-coral"
                  >
                    contact form
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* CTA */}
      <section className="bg-navy px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Questions About These Terms?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            We believe in transparency. If anything here is unclear,
            we&apos;re happy to explain.
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
      </section>
    </>
  );
}
