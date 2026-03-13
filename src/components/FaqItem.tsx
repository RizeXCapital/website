"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div
      className={`rounded-xl border bg-white transition-colors duration-300 dark:bg-dark-elevated ${
        isOpen
          ? "border-coral/40 dark:border-coral/30"
          : "border-gray-300 dark:border-dark-border"
      }`}
    >
      <button
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-heading text-base font-bold text-navy dark:text-white"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: prefersReduced ? 0 : isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`shrink-0 text-coral dark:text-coral ${prefersReduced && isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 8L10 13L15 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
