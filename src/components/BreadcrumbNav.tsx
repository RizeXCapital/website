"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labelOverrides: Record<string, string> = {
  "sovereign-rcm": "Sovereign RCM",
  "how-it-works": "How It Works",
  "pilot-program": "Pilot Program",
  "roi-calculator": "ROI Calculator",
  "billing-audit-checklist": "Billing Audit Checklist",
  "vs-cloud-rcm": "vs. Cloud RCM",
  "vs-outsourced-billing": "vs. Outsourced Billing",
  faq: "FAQ",
};

function toLabel(segment: string): string {
  if (labelOverrides[segment]) return labelOverrides[segment];
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface BreadcrumbNavProps {
  /** Override the final breadcrumb label (useful for blog post titles) */
  currentLabel?: string;
  /** "light" for dark backgrounds (white text), "dark" for light backgrounds */
  variant?: "light" | "dark";
}

export default function BreadcrumbNav({
  currentLabel,
  variant = "light",
}: BreadcrumbNavProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => ({
    label: i === segments.length - 1 && currentLabel ? currentLabel : toLabel(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  const isLight = variant === "light";

  // JSON-LD BreadcrumbList structured data (all values are internal, no user input)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rizexcapital.com" },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.label,
        ...(c.isLast ? {} : { item: `https://rizexcapital.com${c.href}` }),
      })),
    ],
  };

  return (
    <>
      {/* Safe: JSON-LD generated from internal route segments and static label overrides */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="pb-2">
        <ol className="flex flex-wrap items-center gap-1 text-xs tracking-wide">
          <li>
            <Link
              href="/"
              className={`transition-colors ${
                isLight
                  ? "text-white/40 hover:text-white/70"
                  : "text-charcoal-light/60 hover:text-coral dark:text-gray-500 dark:hover:text-coral"
              }`}
            >
              Home
            </Link>
          </li>
          {crumbs.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                className={isLight ? "text-white/20" : "text-gray-300/60 dark:text-gray-600"}
              >
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {crumb.isLast ? (
                <span
                  className={
                    isLight
                      ? "text-white/50"
                      : "text-charcoal-light/70 dark:text-gray-400"
                  }
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={`transition-colors ${
                    isLight
                      ? "text-white/40 hover:text-white/70"
                      : "text-charcoal-light/60 hover:text-coral dark:text-gray-500 dark:hover:text-coral"
                  }`}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
