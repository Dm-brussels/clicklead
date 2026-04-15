'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'Quel budget minimum faut-il prévoir en Google Ads ?',
    a: 'Nous recommandons 300 € / mois minimum pour obtenir des données significatives. L\'idéal pour la plupart des secteurs se situe entre 500 € et 1 500 € / mois. En dessous, le volume de clics est trop faible pour que l\'algorithme s\'optimise correctement.',
  },
  {
    q: 'En combien de temps voit-on les premiers résultats ?',
    a: 'Les premiers leads apparaissent généralement dans les 7 à 14 premiers jours. L\'algorithme Google entre dans une phase d\'apprentissage sur 4 à 8 semaines — c\'est pour ça que nous recommandons un engagement de 3 mois pour juger honnêtement les résultats, et non sur les deux premières semaines.',
  },
  {
    q: "Je n\'ai pas de site web — est-ce un problème ?",
    a: "Pas du tout, c'est même une opportunité. Nous créons votre landing page from scratch, optimisée dès le départ pour convertir les visiteurs Ads. Pas besoin d'un site existant pour démarrer.",
  },
  {
    q: 'Que se passe-t-il après les 3 mois ?',
    a: 'Vous continuez mois par mois, sans engagement supplémentaire. Nous ajustons la stratégie en continu selon les résultats obtenus. La majorité de nos clients restent bien au-delà des 3 mois initiaux.',
  },
  {
    q: 'À quoi ressemble le rapport mensuel ?',
    a: 'Un document clair avec : budget total dépensé, impressions, clics, nombre de leads, coût par lead, et les 3 recommandations prioritaires pour le mois suivant. Un call de suivi est inclus dans les offres Growth et Scale.',
  },
];

export default function FAQSection() {
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
            Questions fréquentes
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            Questions fréquentes
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
          <p className="text-gray-500 text-sm mb-4">Vous avez d'autres questions ?</p>
          <a
            href="#formulaire"
            className="btn-outline-primary inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-600"
          >
            Contactez-nous directement
          </a>
        </div>
      </div>
    </section>
  );
}