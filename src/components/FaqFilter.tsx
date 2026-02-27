"use client";

import { useState, useCallback } from "react";
import FaqItem from "@/components/FaqItem";

interface Faq {
  question: string;
  answer: string;
}

interface FaqCategory {
  heading: string;
  faqs: Faq[];
}

interface FaqFilterProps {
  categories: FaqCategory[];
}

const ALL = "All";

export default function FaqFilter({ categories }: FaqFilterProps) {
  const [active, setActive] = useState(ALL);

  const categoryNames = [ALL, ...categories.map((c) => c.heading)];

  const handleClick = useCallback((name: string) => {
    setActive(name);
  }, []);

  return (
    <>
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categoryNames.map((name) => {
          const isActive = active === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => handleClick(name)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-teal text-white dark:bg-teal-dark"
                  : "border border-gray-300 bg-white text-charcoal hover:border-teal hover:text-teal dark:border-dark-border dark:bg-dark-elevated dark:text-dark-text dark:hover:border-teal-dark dark:hover:text-teal-dark"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* FAQ Sections */}
      <div className="mt-10 space-y-4">
        {categories.map((category) => {
          const isVisible = active === ALL || active === category.heading;
          return (
            <div
              key={category.heading}
              className="grid transition-[grid-template-rows] duration-300 ease-in-out"
              style={{ gridTemplateRows: isVisible ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <h2 className="mb-6 font-heading text-2xl font-bold text-navy dark:text-white">
                  {category.heading}
                </h2>
                <div className="space-y-4 pb-12">
                  {category.faqs.map((faq) => (
                    <FaqItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
