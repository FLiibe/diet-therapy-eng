import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Who is this material for?",
      answer: "This material is designed for acupuncturists, TCM therapists, nutritionists, integrative health practitioners, and students who want a clear, practical system to apply Chinese Diet Therapy in their consultations.",
    },
    {
      question: "Is this a physical book?",
      answer: "No, it is a complete digital collection (high-resolution PDF format) that you can download immediately to your phone, tablet, or computer, or print at your convenience.",
    },
    {
      question: "Do I need advanced knowledge of Chinese Medicine?",
      answer: "No. While it is structured for clinical application, the material explains concepts with clarity and precision, making it accessible whether you are deepening your existing TCM knowledge or starting to integrate dietary therapy.",
    },
    {
      question: "How will I receive the files?",
      answer: "Immediately after your purchase is confirmed, you will receive an email with instant access links to download the entire manual and all bonus materials.",
    },
    {
      question: "How long will I have access?",
      answer: "You have permanent lifetime access. Once downloaded, the files are yours to keep, consult, and use forever without any recurring fees or expiration dates.",
    },
    {
      question: "Can I request a refund?",
      answer: "Yes, absolutely. You are protected by our unconditional 7-day money-back guarantee. If you feel the material does not add meaningful value to your practice, simply contact us within 7 days for a 100% refund.",
    },
    {
      question: "Does the material replace medical care?",
      answer: "No. This material is designed for professional educational reference and dietary guidance. It is not a substitute for individual medical diagnosis, emergency care, or prescribed medical treatments.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3 px-4" id="faq-accordion-group">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-sand-dark/60 overflow-hidden shadow-xs transition-all duration-300"
            id={`faq-item-${idx}`}
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-sand-light/50 transition-colors duration-200 cursor-pointer"
              aria-expanded={isOpen}
              id={`faq-toggle-${idx}`}
            >
              <span className="font-serif text-sm md:text-base font-semibold text-forest-dark leading-tight">
                {faq.question}
              </span>
              <span className="text-gold-dark shrink-0 font-bold text-lg">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>

            {/* Dynamic collapse answer */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[500px] border-t border-sand-medium opacity-100 py-4 px-5" : "max-h-0 opacity-0 overflow-hidden"
              } bg-sand-light/30`}
              id={`faq-content-${idx}`}
            >
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
