'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import CTAPopup from './CTAPopup';

export default function HeroSection() {
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column : copy ── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm text-xs font-600 tracking-widest uppercase text-blue-200">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                RÉSULTATS EN 14 JOURS
              </span>
            </div>

            {/* H1 */}
            <h1 className="hero-h1 font-display font-800 text-white mb-6 tracking-tight" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', lineHeight: '1.08' }}>
              Transformez votre budget{' '}
              <span className="gradient-text">Google Ads en clients réels</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-sub text-lg lg:text-xl text-blue-100/80 max-w-2xl mx-auto lg:mx-0 mb-9 leading-relaxed font-400">
              Pour les PME, artisans, indépendants et professions libérales qui veulent des campagnes
              rentables — sans gaspiller leur budget sur des clics non qualifiés.
            </p>

            {/* CTA */}
            <div className="hero-cta flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-10 lg:mb-0">
              <div className="flex flex-col items-center lg:items-start gap-1.5">
                <button
                  onClick={() => setPopupOpen(true)}
                  className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-700 shadow-primary-lg"
                >
                  Commencer cette semaine
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className="text-xs text-green-300 font-600 flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Frais de mise en place offerts — 0 € jusqu'à fin du mois
                </span>
              </div>
            </div>
          </div>

          {/* ── Right column : human visual ── */}
          <div
            className="hero-visual relative mx-auto w-full max-w-md lg:max-w-none"
            style={{ opacity: 0, animation: 'scaleInBlur 1s cubic-bezier(0.16,1,0.3,1) 0.6s forwards' }}
          >
            {/* Glow behind the image */}
            <div className="absolute -inset-4 bg-primary-500/20 rounded-[2rem] blur-2xl pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/15 shadow-primary-lg">
              <Image
                src="/assets/images/hero-team.jpg"
                alt="Une équipe d'entrepreneurs satisfaite des résultats de ses campagnes Google Ads"
                width={1280}
                height={853}
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="w-full h-full object-cover aspect-[4/3] lg:aspect-[5/4]"
              />
              {/* Cohesion overlay (ties the warm photo to the blue theme) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-dark/55 via-dark/5 to-primary-500/15 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark/60 to-transparent pointer-events-none" />

              {/* Floating glass stat badge */}
              <div className="float-badge absolute bottom-4 left-4 sm:bottom-5 sm:left-5 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 shadow-lg">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-400/20 text-green-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="17 6 23 6 23 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-800 text-lg tracking-tight">ROI ×2.8</span>
                  <span className="text-blue-100/80 text-[11px] font-500 uppercase tracking-wider">Retour moyen observé</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust stats — full width below the two columns */}
        <div className="hero-stats mt-14 lg:mt-16 flex flex-row items-center justify-center gap-0 divide-x divide-white/10">
          {[
            { value: '+120', label: 'Campagnes gérées' },
            { value: 'ROI ×2.8', label: 'Moyen observé' },
            { value: '14 jours', label: 'Pour voir les résultats' },
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
        <span className="text-[10px] text-white/50 uppercase tracking-widest font-500">Défiler</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* CTA Popup */}
      <CTAPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
}
