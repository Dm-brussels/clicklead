'use client';

import React, { useState } from 'react';
import CTAPopupEn from './CTAPopupEn';

export default function FinalCTAEn() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section className="py-24 hero-gradient-bg relative overflow-hidden">
      {/* Atmospheric blobs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-300/8 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm text-xs font-600 tracking-widest uppercase text-blue-200 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Launch within 7 days
          </span>

          <h2 className="font-display font-800 text-white mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            Ready to turn your Ads budget into real customers?
          </h2>

          <p className="text-blue-100/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Free audit · Reply within 24h · No-commitment call
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={() => setPopupOpen(true)}
                className="btn-primary inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-700 shadow-primary-lg"
              >
                Get started this week
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-xs text-green-300 font-600 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Setup fee waived — $0 until end of month
              </span>
            </div>
          </div>

          {/* Reassurance pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              'Flexible ad budget',
              'Monthly report included',
              'Hosting included',
              'Free audit',
            ]?.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 text-xs text-blue-200/80 font-500"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Popup */}
      <CTAPopupEn isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
}
