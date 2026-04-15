import React from 'react';

const pillars = [
  {
    number: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: 'Google Ads Management',
    description: 'Initial audit, campaign structure (Search, Display, Shopping), ad A/B tests, weekly optimization and conversion tracking.',
    why: 'Without active optimization, up to 60% of budget is wasted on unqualified clicks.',
    whyIcon: '⚠️',
    accent: 'bg-primary-50 border-primary-100',
    iconBg: 'bg-primary-500',
    badge: 'Continuous optimization',
  },
  {
    number: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Dedicated landing page',
    description: 'Custom design, conversion-focused copywriting, optimized form and full tracking integration.',
    why: 'A dedicated landing page converts 2 to 4× better than a generic website — built for a single action.',
    whyIcon: '🎯',
    accent: 'bg-blue-50 border-blue-100',
    iconBg: 'bg-blue-500',
    badge: 'Custom design',
  },
  {
    number: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Hosting & technical setup',
    description: 'Fast hosting, SSL, domain name, redirects, GA4 and Google Tag Manager integration included.',
    why: 'Load speed and proper tracking are critical for campaign performance.',
    whyIcon: '⚡',
    accent: 'bg-indigo-50 border-indigo-100',
    iconBg: 'bg-indigo-500',
    badge: 'All included',
  },
];

export default function PillarsSectionEn() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="section-label mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            The 3 pillars of the service
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: '1.15', letterSpacing: '-0.025em' }}>
            A complete service, managed for you
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            We handle every aspect of your digital acquisition — from campaign to conversion.
          </p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="spotlight-group grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large featured card - Pillar 1 */}
          <div className="spotlight-card pillar-card lg:col-span-2 rounded-2xl p-8 bg-white relative overflow-hidden reveal reveal-delay-1">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-primary-sm">
                  {pillars?.[0]?.icon}
                </div>
                <span className="text-xs font-600 bg-primary-50 text-primary-600 px-3 py-1.5 rounded-full border border-primary-100">
                  {pillars?.[0]?.badge}
                </span>
              </div>

              <span className="text-4xl font-800 text-primary-100 select-none">{pillars?.[0]?.number}</span>
              <h3 className="text-xl font-700 text-gray-900 mt-2 mb-3">{pillars?.[0]?.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">{pillars?.[0]?.description}</p>

              <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <span className="text-lg">{pillars?.[0]?.whyIcon}</span>
                <p className="text-sm text-amber-800 font-500 leading-relaxed">{pillars?.[0]?.why}</p>
              </div>

              {/* Mini feature list */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                {['Initial audit', 'Search + Display', 'A/B tests', 'Monthly report']?.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — 2 stacked cards */}
          <div className="flex flex-col gap-6">
            {pillars?.slice(1)?.map((pillar, i) => (
              <div
                key={pillar?.number}
                className={`spotlight-card pillar-card rounded-2xl p-6 bg-white relative overflow-hidden flex-1 reveal reveal-delay-${i + 2}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${pillar?.iconBg} rounded-xl flex items-center justify-center text-white`}>
                    {pillar?.icon}
                  </div>
                  <span className="text-3xl font-800 text-gray-100 select-none">{pillar?.number}</span>
                </div>

                <h3 className="text-lg font-700 text-gray-900 mb-2">{pillar?.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{pillar?.description}</p>

                <div className="flex items-start gap-2 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <span className="text-base">{pillar?.whyIcon}</span>
                  <p className="text-xs text-gray-600 font-500 leading-relaxed">{pillar?.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
