"use client";

import { useState, useRef, useCallback } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div className="rounded-xl border border-gray-300 bg-white dark:border-dark-border dark:bg-dark-elevated">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-heading text-base font-bold text-navy dark:text-white"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span
          className={`shrink-0 text-teal transition-transform duration-300 dark:text-teal-dark ${isOpen ? "rotate-45" : ""}`}
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
              d="M10 4V16M4 10H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div ref={contentRef} className="overflow-hidden">
          <div className="px-6 pb-6 text-base leading-relaxed text-charcoal-light dark:text-gray-300">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
