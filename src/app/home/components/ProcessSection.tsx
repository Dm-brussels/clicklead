import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Audit gratuit',
    description: 'On analyse votre secteur, vos concurrents, votre budget et vos objectifs. Sans engagement.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    color: 'bg-primary-500',
    delay: 'reveal-delay-1',
  },
  {
    number: '02',
    title: 'On configure tout',
    description: 'Création des campagnes, de la landing page et du tracking en moins de 7 jours.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    color: 'bg-blue-500',
    delay: 'reveal-delay-2',
  },
  {
    number: '03',
    title: 'Lancement & optimisation',
    description: 'Les campagnes sont actives. On optimise chaque semaine selon les données réelles.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: 'bg-indigo-500',
    delay: 'reveal-delay-3',
  },
  {
    number: '04',
    title: 'Rapport mensuel + call',
    description: 'Un rapport clair avec tous les chiffres clés et les recommandations pour le mois suivant.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    color: 'bg-violet-500',
    delay: 'reveal-delay-4',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="section-label mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Comment ça marche
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            De l'audit au premier lead en 14 jours
          </h2>
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-violet-300 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps?.map((step, i) => (
              <div key={i} className={`flex flex-col items-center text-center reveal ${step?.delay}`}>
                {/* Step circle */}
                <div className={`w-20 h-20 ${step?.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 relative`}>
                  {step?.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-xs font-800 text-gray-700">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-base font-700 text-gray-900 mb-2">{step?.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3-month commitment callout */}
        <div className="reveal mt-14 bg-primary-50 border border-primary-100 rounded-2xl p-7 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="text-xs font-700 text-primary-600 uppercase tracking-widest">Engagement 3 mois</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            Nous recommandons un engagement de <strong>3 mois</strong> — pas pour vous bloquer, mais parce que l'algorithme Google a besoin de 4 à 8 semaines pour s'optimiser.{' '}
            <span className="text-primary-600 font-600">Juger une campagne sur 2 semaines, c'est s'arrêter avant les vrais résultats.</span>
          </p>
        </div>
      </div>
    </section>
  );
}