import React, { useState } from "react";

const faqs = [
  {
    question: "What is AssetVerse?",
    answer:
      "AssetVerse is a corporate asset management tool that helps HR teams track, assign, and manage company assets from a centralized dashboard.",
  },
  {
    question: "Can employees work under multiple companies?",
    answer:
      "Yes. Employees can request assets from multiple HR managers, and upon approval, they become affiliated with each company.",
  },
  {
    question: "How does asset assignment work?",
    answer:
      "Employees request an asset → HR approves → The system automatically assigns the asset and updates the available quantity.",
  },
  {
    question: "Is payment required to increase employee limit?",
    answer:
      "Yes. HR managers must upgrade their package through Stripe when they reach the employee limit.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. AssetVerse uses JWT authentication, role-based access control, and secure database handling.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mt-3">
            Everything you need to know about using AssetVerse.
          </p>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-xl shadow-sm bg-slate-50"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left"
                onClick={() => toggleFAQ(i)}
              >
                <span className="text-base md:text-lg font-medium text-slate-900">
                  {item.question}
                </span>

                {/* Arrow icon */}
                <svg
                  className={`w-5 h-5 text-slate-600 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Answer */}
              {openIndex === i && (
                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
