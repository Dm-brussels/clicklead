import React from 'react';

const comparisonData = [
  {
    classic: 'Menu de navigation distrayant',
    dedicated: 'Zéro distraction — une seule action',
    icon: '🧭',
  },
  {
    classic: 'Message générique',
    dedicated: 'Message aligné avec l\'annonce Ads',
    icon: '💬',
  },
  {
    classic: 'CTA noyé dans la page',
    dedicated: 'CTA répété et visible à chaque scroll',
    icon: '🎯',
  },
  {
    classic: 'Conçu pour informer',
    dedicated: 'Conçu pour convertir',
    icon: '⚡',
  },
];

export default function LandingPageEducation() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Pourquoi une landing page
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            Votre site web n'est pas fait pour convertir
            <br className="hidden sm:block" />
            <span className="text-primary-500"> des visiteurs Ads</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Envoyer du trafic Google Ads sur votre site classique, c'est comme verser de l'eau dans un panier percé.
          </p>
        </div>

        {/* Comparison table */}
        <div className="reveal reveal-delay-1 rounded-2xl overflow-hidden border border-gray-200 shadow-card">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-gray-900 text-white">
            <div className="p-4 text-center text-xs font-600 uppercase tracking-widest text-gray-400" />
            <div className="p-4 text-center border-l border-gray-700">
              <span className="flex items-center justify-center gap-2 text-sm font-600 text-red-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Site classique
              </span>
            </div>
            <div className="p-4 text-center border-l border-gray-700">
              <span className="flex items-center justify-center gap-2 text-sm font-600 text-green-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Landing page dédiée
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparisonData?.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <div className="p-4 flex items-center justify-center">
                <span className="text-xl">{row?.icon}</span>
              </div>
              <div className="p-4 border-l border-gray-100 flex items-center">
                <span className="text-sm text-gray-500 leading-snug">{row?.classic}</span>
              </div>
              <div className="p-4 border-l border-gray-100 flex items-center">
                <span className="text-sm text-primary-700 font-600 leading-snug">{row?.dedicated}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Key stat */}
        <div className="reveal reveal-delay-2 mt-10 bg-primary-500 rounded-2xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <p className="text-4xl lg:text-5xl font-800 mb-3">3×</p>
            <p className="text-lg font-600 text-white/90 max-w-xl mx-auto leading-relaxed">
              Les visiteurs Google Ads qui arrivent sur une landing page dédiée ont en moyenne{' '}
              <span className="underline decoration-white/50">3× plus de chances</span> de remplir un formulaire.
            </p>
            <a
              href="#formulaire"
              className="mt-6 inline-flex items-center gap-2 bg-white text-primary-600 font-700 px-7 py-3 rounded-full text-sm hover:bg-primary-50 transition-colors"
            >
              Créer ma landing page
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}