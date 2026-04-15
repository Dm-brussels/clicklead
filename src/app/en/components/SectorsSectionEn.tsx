import React from 'react';

const sectors = [
  { icon: '🏠', name: 'Roofing / Cleaning', metric: 'Leads from $25/lead' },
  { icon: '🔧', name: 'Plumbing', metric: 'Emergency leads from $28/lead' },
  { icon: '🦷', name: 'Dentist', metric: 'New patients from $42/lead' },
  { icon: '⚖️', name: 'Lawyer / Notary', metric: 'Qualified cases from $65/lead' },
  { icon: '🏡', name: 'Real Estate', metric: 'Listings & viewings from $35/lead' },
  { icon: '🔨', name: 'Renovation', metric: 'Qualified quotes from $30/lead' },
  { icon: '🧘', name: 'Coach / Therapist', metric: 'Prospects from $18/lead' },
  { icon: '🛒', name: 'E-commerce', metric: 'Average ROAS ×2 to ×3.5' },
  { icon: '🧹', name: 'Cleaning & Maintenance', metric: 'Leads from $16/lead' },
  { icon: '🚗', name: 'Garage / Auto Body', metric: 'Leads from $24/lead' },
  { icon: '💊', name: 'Doctor / Physio', metric: 'On request' },
  { icon: '📞', name: 'Other industry', metric: 'Contact us' },
];

export default function SectorsSectionEn() {
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
            Compatible industries
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            Does it work in your industry?
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            Google Ads is particularly effective for industries with strong local purchase intent.
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
          <p className="text-gray-500 text-sm mb-4">Your industry is not on the list?</p>
          <a
            href="#formulaire"
            className="btn-outline-primary inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-600"
          >
            Contact us for a personalized study
          </a>
        </div>
      </div>
    </section>
  );
}
