'use client';

import React, { useState } from 'react';
import CTAPopupEn from './CTAPopupEn';

export default function HeroSectionEn() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-gradient-bg"
      aria-label="Hero"
    >
      {/* Parallax dot grid */}
      <div className="parallax-dots" id="parallax-dots" />
      {/* Atmospheric blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-8 pt-36 pb-20 text-center">

        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm text-xs font-600 tracking-widest uppercase text-blue-200">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            RESULTS IN 14 DAYS
          </span>
        </div>

        {/* H1 */}
        <h1 className="hero-h1 font-display font-800 text-white mb-6 tracking-tight" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', lineHeight: '1.08' }}>
          Turn your Google Ads budget{' '}
          <br className="hidden sm:block" />
          <span className="gradient-text">into real customers</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub text-lg lg:text-xl text-blue-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-400">
          For SMBs, tradespeople, freelancers and independent professionals who want profitable campaigns
          — without wasting their budget on unqualified clicks.
        </p>

        {/* CTA */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => setPopupOpen(true)}
              className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-700 shadow-primary-lg"
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

        {/* Trust stats */}
        <div className="hero-stats flex flex-row items-center justify-center gap-0 divide-x divide-white/10">
          {[
            { value: '+120', label: 'Campaigns managed' },
            { value: 'ROI ×2.8', label: 'Average observed' },
            { value: '14 days', label: 'To see results' },
          ]?.map((stat, i) => (
            <div key={i} className="flex flex-col items-center px-4 sm:px-8 py-2 sm:py-0">
              <span className="text-lg sm:text-2xl lg:text-3xl font-800 text-white tracking-tight">{stat?.value}</span>
              <span className="text-[10px] sm:text-xs font-500 text-blue-200/70 uppercase tracking-widest mt-1 text-center">{stat?.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-50">
        <span className="text-[10px] text-white/50 uppercase tracking-widest font-500">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* CTA Popup */}
      <CTAPopupEn isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
}
