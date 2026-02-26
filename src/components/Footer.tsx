import Link from "next/link";

const footerLinks = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
  "Sovereign RCM": [
    { href: "/sovereign-rcm", label: "Overview" },
    { href: "/sovereign-rcm/how-it-works", label: "How It Works" },
    { href: "/sovereign-rcm/pricing", label: "Pricing" },
    { href: "/sovereign-rcm/security", label: "Security & HIPAA" },
    { href: "/sovereign-rcm/pilot-program", label: "90-Day Pilot" },
  ],
  Resources: [
    { href: "/sovereign-rcm/vs-outsourced-billing", label: "vs. Outsourced Billing" },
    { href: "/sovereign-rcm/vs-cloud-rcm", label: "vs. Cloud SaaS" },
    { href: "/sovereign-rcm/roi-calculator", label: "ROI Calculator" },
    { href: "/sovereign-rcm/faq", label: "FAQ" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-navy text-white dark:border-dark-border dark:bg-[#080E1A]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div>
            <span className="font-heading text-lg font-bold tracking-tight">
              RizeX Capital
            </span>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Where Alignment Becomes Power
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Princeton, NJ
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-teal-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-gray-300">
            &copy; {new Date().getFullYear()} RizeX Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
