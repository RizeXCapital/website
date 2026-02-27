"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Hide on contact page — user is already there
  const isContactPage = pathname === "/contact";

  // Use "Request a Billing Analysis" on Sovereign RCM pages
  const isSovereignPage = pathname.startsWith("/sovereign-rcm");
  const label = isSovereignPage ? "Request a Billing Analysis" : "Get in Touch";

  useEffect(() => {
    if (isContactPage) return;

    function handleScroll() {
      // Show after scrolling past 300px
      const pastHero = window.scrollY > 300;

      // Hide when footer is visible
      const footer = document.querySelector("footer");
      if (footer) {
        if (!observerRef.current) {
          observerRef.current = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setVisible(false);
              } else if (window.scrollY > 300) {
                setVisible(true);
              }
            },
            { threshold: 0.1 }
          );
          observerRef.current.observe(footer);
        }
      }

      if (pastHero) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [isContactPage]);

  if (isContactPage) return null;

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 border-t border-coral-hover bg-coral px-4 py-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href="/contact"
        className="block w-full rounded-lg bg-white px-6 py-3 text-center text-sm font-semibold text-coral transition-colors hover:bg-gray-100 active:scale-[0.98]"
      >
        {label}
      </Link>
    </div>
  );
}
