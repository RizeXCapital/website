"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sovereign-rcm", label: "Sovereign RCM" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
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
  onClose,
}: {
  href: string;
  label: string;
  index: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <Link
        href={href}
        className="text-sm font-medium text-charcoal-light transition-colors hover:text-teal dark:text-gray-300 dark:hover:text-teal-dark"
        onClick={onClose}
      >
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
      <Link
        href={href}
        className="text-sm font-medium text-charcoal-light transition-colors hover:text-teal dark:text-gray-300 dark:hover:text-teal-dark"
        onClick={onClose}
      >
        {label}
      </Link>
    </motion.div>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white/95 backdrop-blur-sm dark:border-dark-border dark:bg-dark-bg/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold tracking-tight text-navy dark:text-white">
            RizeX Capital
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-charcoal-light transition-colors hover:text-teal dark:text-gray-300 dark:hover:text-teal-dark after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-teal after:transition-all after:duration-200 hover:after:w-full dark:after:bg-teal-dark"
            >
              {link.label}
            </Link>
          ))}
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
              {navLinks.map((link, i) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  index={i}
                  isOpen={mobileOpen}
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
