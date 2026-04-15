import React from 'react';

const sectors = [
  { icon: '🏠', name: 'Nettoyage toiture', metric: 'Leads dès 25 €/lead' },
  { icon: '🔧', name: 'Plomberie', metric: 'Leads urgences dès 28 €/lead' },
  { icon: '🦷', name: 'Dentiste', metric: 'Nouveaux patients dès 42 €/lead' },
  { icon: '⚖️', name: 'Avocat / Notaire', metric: 'Dossiers qualifiés dès 65 €/lead' },
  { icon: '🏡', name: 'Immobilier', metric: 'Mandats & visites dès 35 €/lead' },
  { icon: '🔨', name: 'Rénovation', metric: 'Devis qualifiés dès 30 €/lead' },
  { icon: '🧘', name: 'Coach / Thérapeute', metric: 'Prospects dès 18 €/lead' },
  { icon: '🛒', name: 'E-commerce', metric: 'ROAS moyen ×2 à ×3.5' },
  { icon: '🧹', name: 'Nettoyage & entretien', metric: 'Leads dès 16 €/lead' },
  { icon: '🚗', name: 'Garage / Carrosserie', metric: 'Leads dès 24 €/lead' },
  { icon: '💊', name: 'Médecin / Kiné', metric: 'Sur demande' },
  { icon: '📞', name: 'Autre secteur', metric: 'Nous contacter' },
];

export default function SectorsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Secteurs compatibles
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            Ça fonctionne dans votre secteur ?
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            Google Ads est particulièrement efficace pour les secteurs à forte intention d'achat locale.
          </p>
        </div>

        {/* 4×3 Grid */}
        <div className="spotlight-group grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sectors?.map((s, i) => (
            <div
              key={i}
              className={`spotlight-card sector-card rounded-xl p-5 bg-white cursor-default reveal reveal-delay-${Math.min((i % 4) + 1, 4)}`}
            >
              <div className="text-3xl mb-3">{s?.icon}</div>
              <h3 className="text-sm font-700 text-gray-900 mb-1 leading-tight">{s?.name}</h3>
              <p className="text-xs text-primary-600 font-600">{s?.metric}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Votre secteur n'est pas dans la liste ?</p>
          <a
            href="#formulaire"
            className="btn-outline-primary inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-600"
          >
            Contactez-nous pour une étude personnalisée
          </a>
        </div>
      </div>
    </section>
  );
}