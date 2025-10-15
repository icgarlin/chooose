'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer?: string;
}

const faqItems: FAQItem[] = [
  { question: 'What can I use this portal for?' },
  { question: 'What is sustainable aviation fuel (SAF)?' },
  { question: 'What are SAF environmental attributes?' },
  { question: 'How is SAF produced?' },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl  text-black font-semibold mb-8">Frequently Asked Questions</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg p-6">
            <p className="text-gray-900 mb-4">Couldn't find an answer?</p>
            <p className="text-gray-700 text-sm">
              Feel free to explore our{' '}
              <a href="#" className="text-blue-700 hover:text-blue-800 font-medium">
                knowledge base
              </a>{' '}
              or send us a message on{' '}
              <a href="#" className="text-blue-700 hover:text-blue-800 font-medium">
                support@chooose.today
              </a>
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && item.answer && (
                  <div className="px-4 pb-4 text-gray-700 text-sm">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
