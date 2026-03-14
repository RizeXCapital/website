"use client";

import { useState, useRef, useEffect } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const loadTime = useRef(Date.now());

  useEffect(() => {
    loadTime.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    // Bot speed check
    if (Date.now() - loadTime.current < 2000) {
      setStatus("done");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website_url: (document.getElementById("website_url") as HTMLInputElement)?.value,
        }),
      });

      if (res.ok) {
        setStatus("done");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Unable to subscribe. Try again later.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl bg-navy/5 p-6 dark:bg-dark-elevated">
        <p className="text-sm font-medium text-navy dark:text-white">
          You&apos;re subscribed
        </p>
        <p className="mt-1 text-xs text-charcoal-light dark:text-gray-400">
          We&apos;ll email you when we publish something new
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-navy/5 p-6 dark:bg-dark-elevated">
      <p className="font-heading text-sm font-bold text-navy dark:text-white">
        Get updates
      </p>
      <p className="mt-1 text-xs text-charcoal-light dark:text-gray-400">
        New posts delivered to your inbox
      </p>
      <form onSubmit={handleSubmit} className="mt-3">
        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input type="text" id="website_url" name="website_url" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex gap-2">
          <input
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-charcoal outline-none transition-colors focus:border-coral focus:ring-1 focus:ring-coral dark:border-dark-border dark:bg-dark-bg dark:text-dark-text dark:placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="shrink-0 rounded-lg bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-hover disabled:opacity-50"
          >
            {status === "sending" ? "..." : "Subscribe"}
          </button>
        </div>
        {errorMsg && (
          <p className="mt-2 text-xs text-coral">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
