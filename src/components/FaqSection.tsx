"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { productConfig } from "@/config/product";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Everything you need to know about the DermaSpine™ Pillow &amp; 30-night trial.
          </p>
        </div>

        <div className="space-y-3">
          {productConfig.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-white shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
