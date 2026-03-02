"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const sovereignDropdownLinks = [
  { href: "/sovereign-rcm", label: "Overview" },
  { href: "/sovereign-rcm/how-it-works", label: "How It Works" },
  { href: "/sovereign-rcm/pricing", label: "Pricing" },
  { href: "/sovereign-rcm/security", label: "Security" },
  { href: "/sovereign-rcm/pilot-program", label: "Pilot Program" },
  { href: "/sovereign-rcm/faq", label: "FAQ" },
];

function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.add("theme-transitioning");
    document.documentElement.classList.toggle("dark", next);
    document.cookie = `theme=${next ? "dark" : "light"};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 350);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`rounded-lg p-2 text-charcoal-light transition-colors hover:text-teal dark:text-gray-400 dark:hover:text-teal-dark ${className}`}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        /* Sun icon */
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        /* Moon icon */
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  );
}

function MobileNavLink({
  href,
  label,
  index,
  isOpen,
  isActive,
  onClose,
  className = "",
}: {
  href: string;
  label: string;
  index: number;
  isOpen: boolean;
  isActive: boolean;
  onClose: () => void;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  const linkClass = `text-sm font-medium ${
    isActive
      ? "text-teal dark:text-teal-dark"
      : "text-charcoal-light transition-colors hover:text-teal dark:text-gray-300 dark:hover:text-teal-dark"
  } ${className}`;

  if (prefersReduced) {
    return (
      <Link href={href} className={linkClass} onClick={onClose}>
        {label}
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={
        isOpen
          ? { opacity: 1, x: 0, transition: { delay: index * 0.05, duration: 0.25 } }
          : { opacity: 0, x: -10, transition: { duration: 0.15 } }
      }
    >
      <Link href={href} className={linkClass} onClick={onClose}>
        {label}
      </Link>
    </motion.div>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSovereignActive = pathname.startsWith("/sovereign-rcm");

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  // Close desktop dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDropdown();
    }
    if (dropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [dropdownOpen, closeDropdown]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    }
    if (dropdownOpen) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [dropdownOpen, closeDropdown]);

  // Close mobile dropdown when mobile menu closes
  useEffect(() => {
    if (!mobileOpen) setMobileDropdownOpen(false);
  }, [mobileOpen]);

  // Close dropdown on route change
  useEffect(() => {
    closeDropdown();
    setMobileOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname, closeDropdown]);

  function handleMouseEnter() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  }

  function handleMouseLeave() {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  }

  // Nav links before and after sovereign-rcm slot
  const beforeLinks = navLinks.filter((l) => l.href === "/" || l.href === "/about");
  const afterLinks = navLinks.filter((l) => l.href === "/blog" || l.href === "/contact");

  // Mobile: build ordered list with Sovereign RCM inserted at position 2
  const mobileNavOrder = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    // Sovereign RCM is handled separately
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white/95 backdrop-blur-sm dark:border-dark-border dark:bg-dark-bg/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/crown-logo.svg"
            alt=""
            width={32}
            height={27}
            className="h-7 w-auto"
            priority
          />
          <span className="font-heading text-xl font-bold tracking-tight text-navy dark:text-white">
            Sovereign RCM
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {beforeLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-teal after:transition-all after:duration-200 dark:after:bg-teal-dark ${
                  active
                    ? "text-teal after:w-full dark:text-teal-dark"
                    : "text-charcoal-light hover:text-teal after:w-0 hover:after:w-full dark:text-gray-300 dark:hover:text-teal-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Sovereign RCM with dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/sovereign-rcm"
              className={`relative flex items-center gap-1 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-teal after:transition-all after:duration-200 dark:after:bg-teal-dark ${
                isSovereignActive
                  ? "text-teal after:w-full dark:text-teal-dark"
                  : "text-charcoal-light hover:text-teal after:w-0 hover:after:w-full dark:text-gray-300 dark:hover:text-teal-dark"
              }`}
            >
              Sovereign RCM
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Link>

            {/* Dropdown panel */}
            <div
              className={`absolute left-0 top-full z-50 mt-3 w-[280px] origin-top-left rounded-xl border border-gray-200/80 bg-white p-1.5 shadow-xl shadow-navy/5 transition-all duration-200 dark:border-dark-border dark:bg-dark-elevated dark:shadow-black/20 ${
                dropdownOpen
                  ? "pointer-events-auto scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-0.5">
                {sovereignDropdownLinks.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      pathname === subLink.href
                        ? "bg-ice font-medium text-teal dark:bg-dark-surface dark:text-teal-dark"
                        : "text-charcoal-light hover:bg-ice hover:text-navy dark:text-gray-300 dark:hover:bg-dark-surface dark:hover:text-white"
                    }`}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {afterLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-teal after:transition-all after:duration-200 dark:after:bg-teal-dark ${
                  active
                    ? "text-teal after:w-full dark:text-teal-dark"
                    : "text-charcoal-light hover:text-teal after:w-0 hover:after:w-full dark:text-gray-300 dark:hover:text-teal-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-lg bg-coral px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-hover"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-navy dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden"
        style={{ gridTemplateRows: mobileOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-300 bg-white px-6 py-4 dark:border-dark-border dark:bg-dark-bg">
            <div className="flex flex-col gap-4">
              {/* Home + About */}
              {mobileNavOrder.slice(0, 2).map((link, i) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  index={i}
                  isOpen={mobileOpen}
                  isActive={isActive(link.href)}
                  onClose={() => setMobileOpen(false)}
                />
              ))}

              {/* Sovereign RCM expandable */}
              <MobileSovereignDropdown
                isMenuOpen={mobileOpen}
                isExpanded={mobileDropdownOpen}
                isSovereignActive={isSovereignActive}
                pathname={pathname}
                onToggle={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                onClose={() => setMobileOpen(false)}
                index={2}
              />

              {/* Blog + Contact */}
              {mobileNavOrder.slice(2).map((link, i) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  index={i + 3 + (mobileDropdownOpen ? sovereignDropdownLinks.length : 0)}
                  isOpen={mobileOpen}
                  isActive={isActive(link.href)}
                  onClose={() => setMobileOpen(false)}
                />
              ))}

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <span className="text-sm text-charcoal-light dark:text-gray-400">Toggle theme</span>
              </div>
              <Link
                href="/contact"
                className="mt-2 rounded-lg bg-coral px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-coral-hover"
                onClick={() => setMobileOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileSovereignDropdown({
  isMenuOpen,
  isExpanded,
  isSovereignActive,
  pathname,
  onToggle,
  onClose,
  index,
}: {
  isMenuOpen: boolean;
  isExpanded: boolean;
  isSovereignActive: boolean;
  pathname: string;
  onToggle: () => void;
  onClose: () => void;
  index: number;
}) {
  const prefersReduced = useReducedMotion();

  const labelClass = isSovereignActive
    ? "text-teal dark:text-teal-dark"
    : "text-charcoal-light dark:text-gray-300";

  const wrapper = (children: React.ReactNode) => {
    if (prefersReduced) return <div>{children}</div>;
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={
          isMenuOpen
            ? { opacity: 1, x: 0, transition: { delay: index * 0.05, duration: 0.25 } }
            : { opacity: 0, x: -10, transition: { duration: 0.15 } }
        }
      >
        {children}
      </motion.div>
    );
  };

  return wrapper(
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between text-sm font-medium transition-colors hover:text-teal dark:hover:text-teal-dark ${labelClass}`}
      >
        Sovereign RCM
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Sub-links */}
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 pl-4 pt-3">
            {sovereignDropdownLinks.map((subLink, i) => {
              const subActive = pathname === subLink.href;
              if (prefersReduced) {
                return (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    onClick={onClose}
                    className={`text-sm ${
                      subActive
                        ? "font-medium text-teal dark:text-teal-dark"
                        : "text-charcoal-light transition-colors hover:text-teal dark:text-gray-300 dark:hover:text-teal-dark"
                    }`}
                  >
                    {subLink.label}
                  </Link>
                );
              }
              return (
                <motion.div
                  key={subLink.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isExpanded
                      ? { opacity: 1, x: 0, transition: { delay: i * 0.04, duration: 0.2 } }
                      : { opacity: 0, x: -10, transition: { duration: 0.1 } }
                  }
                >
                  <Link
                    href={subLink.href}
                    onClick={onClose}
                    className={`text-sm ${
                      subActive
                        ? "font-medium text-teal dark:text-teal-dark"
                        : "text-charcoal-light transition-colors hover:text-teal dark:text-gray-300 dark:hover:text-teal-dark"
                    }`}
                  >
                    {subLink.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
