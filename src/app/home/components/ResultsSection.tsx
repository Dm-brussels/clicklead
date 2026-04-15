'use client';

import React, { useState, useEffect, useCallback } from 'react';

const userCases = [
  {
    id: 'case-1',
    title: 'Agence de production vidéo',
    sector: 'Production vidéo',
    budget: '740 €',
    image: '/assets/images/Screenshot_2026-03-14_at_22.47.39-1773526080176.png',
    metrics: [
      { label: 'Leads générés', value: '16' },
      { label: 'Coût par lead', value: '46,25 €' },
      { label: 'ROAS', value: '4,1' },
    ],
  },
  {
    id: 'case-2',
    title: 'Plombier / Débouchage',
    sector: 'Plomberie & débouchage',
    budget: '62 900 €',
    image: '/assets/images/Screenshot_2026-03-14_at_22.46.45-1773526120911.png',
    metrics: [
      { label: 'Leads générés', value: '+2 000' },
      { label: 'Coût par lead', value: '31 €' },
      { label: "Chiffre d'affaires", value: '~670 000 €' },
      { label: 'ROAS moyen', value: '5' },
    ],
  },
  {
    id: 'case-3',
    title: 'Nettoyage de toiture',
    sector: 'Nettoyage toiture',
    budget: '1 220 €',
    image: '/assets/images/Screenshot_2026-03-14_at_22.46.12-1773526212977.png',
    metrics: [
      { label: 'Leads générés', value: '18' },
      { label: 'Clients signés', value: '13' },
      { label: 'Coût par lead', value: '67,78 €' },
      { label: 'ROAS', value: '7,4' },
    ],
  },
  {
    id: 'case-4',
    title: 'Agence événementielle',
    sector: 'Événementiel',
    budget: '1 050 €',
    image: '/assets/images/Screenshot_2026-03-14_at_22.44.52-1773526333036.png',
    metrics: [
      { label: 'Clics générés', value: '1 720' },
      { label: 'Leads / jour', value: '~5' },
      { label: "Chiffre d'affaires", value: '~10 000 €' },
      { label: 'ROAS', value: '10,8' },
    ],
  },
];

function getSlidesVisible(width: number): number {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

export default function ResultsSection() {
  const [current, setCurrent] = useState(0);
  const [slidesVisible, setSlidesVisible] = useState(3);

  const total = userCases?.length;
  const maxIndex = Math.max(0, total - slidesVisible);

  const updateSlidesVisible = useCallback(() => {
    const newVisible = getSlidesVisible(window.innerWidth);
    setSlidesVisible(newVisible);
    setCurrent((c) => Math.min(c, Math.max(0, total - newVisible)));
  }, [total]);

  useEffect(() => {
    updateSlidesVisible();
    window.addEventListener('resize', updateSlidesVisible);
    return () => window.removeEventListener('resize', updateSlidesVisible);
  }, [updateSlidesVisible]);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 0-2 2h-2a2 2 0 0 0-2-2z" />
            </svg>
            Résultats clients
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            Des résultats réels, pas des promesses
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            Extraits de comptes clients gérés — chiffres non retouchés
          </p>
        </div>

        {/* Carousel */}
        <div className="relative reveal">
          {/* Slides wrapper */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * (100 / slidesVisible)}%)` }}
            >
              {userCases?.map((uc) => (
                <div
                  key={uc?.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesVisible}%` }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden h-full">
                    {/* Screenshot placeholder */}
                    <div className="screenshot-placeholder" style={{ aspectRatio: '16/5', margin: '0', background: '#f8f9fa' }}>
                      {uc?.image ? (
                        <img
                          src={uc?.image}
                          alt={`Résultats campagne — ${uc?.title}`}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                        />
                      ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="text-xs font-500 text-gray-400">[ Screenshot à insérer ]</span>
                      </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Title & sector */}
                      <div className="mb-4">
                        <h3 className="text-base font-700 text-gray-900">{uc?.title}</h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs font-500 text-primary-600 bg-primary-50 border border-primary-100 rounded-full px-2.5 py-0.5">
                            {uc?.sector}
                          </span>
                        </div>
                      </div>

                      {/* Key info */}
                      <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-500 flex-shrink-0">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span className="text-xs">Budget investi : <strong className="text-gray-800">{uc?.budget}</strong></span>
                      </div>

                      {/* Metrics grid */}
                      <div className={`grid gap-2 ${uc?.metrics?.length <= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {uc?.metrics?.map((m, j) => (
                          <div key={j} className="text-center bg-primary-50 rounded-xl p-2.5 border border-primary-100">
                            <div className="text-sm font-700 text-primary-700">{m?.value}</div>
                            <div className="text-[9px] text-gray-400 mt-1 uppercase tracking-wide leading-tight">{m?.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Cas précédent"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-gray-200 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-colors z-10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={current >= maxIndex}
            aria-label="Cas suivant"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-gray-200 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-colors z-10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 })?.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Aller au groupe ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-primary-600 w-6 h-2.5' : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-gray-400 text-sm mt-3">
          {current + 1} / {maxIndex + 1}
        </p>

        {/* Legal mention */}
        <p className="mt-6 text-center text-gray-400 leading-relaxed" style={{ fontSize: '11px' }}>
          Résultats obtenus par des clients réels. Les performances varient selon le secteur, la zone géographique et le budget investi.
        </p>
      </div>
    </section>
  );
}