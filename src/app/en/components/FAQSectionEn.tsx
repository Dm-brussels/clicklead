'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'What is the minimum budget needed for Google Ads?',
    a: 'We recommend a minimum of $300/month to get meaningful data. The ideal range for most industries is between $500 and $1,500/month. Below that, click volume is too low for the algorithm to optimize properly.',
  },
  {
    q: 'How long does it take to see the first results?',
    a: 'The first leads typically appear within the first 7 to 14 days. Google\'s algorithm goes through a learning phase over 4 to 8 weeks — that\'s why we recommend a 3-month commitment to fairly judge results, rather than the first two weeks.',
  },
  {
    q: "I don't have a website — is that a problem?",
    a: "Not at all — it's actually an opportunity. We build your landing page from scratch, optimized from day one to convert Ads visitors. No existing website needed to get started.",
  },
  {
    q: 'What happens after the 3 months?',
    a: 'You continue month by month, with no additional commitment. We continuously adjust the strategy based on results. The majority of our clients stay well beyond the initial 3 months.',
  },
  {
    q: 'What does the monthly report look like?',
    a: 'A clear document with: total budget spent, impressions, clicks, number of leads, cost per lead, and the 3 priority recommendations for the next month. A follow-up call is included in the Growth and Scale plans.',
  },
];

export default function FAQSectionEn() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="section-label mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Frequently asked questions
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            Frequently asked questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3 reveal reveal-delay-1">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                openIndex === i ? 'border-primary-200 shadow-primary-sm' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-inset rounded-xl"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-600 text-gray-800 leading-snug">{faq.q}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={openIndex === i ? '#0066cc' : '#9ca3af'}
                  strokeWidth="2.5"
                  className={`faq-chevron flex-shrink-0 ${openIndex === i ? 'open' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className={`faq-content ${openIndex === i ? 'open' : ''}`}>
                <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below FAQ */}
        <div className="reveal mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Have more questions?</p>
          <a
            href="#formulaire"
            className="btn-outline-primary inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-600"
          >
            Contact us directly
          </a>
        </div>
      </div>
    </section>
  );
}
