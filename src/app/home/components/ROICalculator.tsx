'use client';

import React, { useState, useEffect, useRef } from 'react';

const sectors: Record<string, { cpl?: number; conv: number; panier: number; note: string; ecom?: boolean }> = {
  toiture:    { cpl: 25,  conv: 0.22, panier: 700,  note: "Forte saisonnalité — bon volume au printemps et en automne" },
  plomberie:  { cpl: 28,  conv: 0.25, panier: 280,  note: "Urgences bien converties — concurrence locale variable" },
  dentiste:   { cpl: 42,  conv: 0.18, panier: 580,  note: "CPCs élevés en zone urbaine — landing page indispensable" },
  avocat:     { cpl: 65,  conv: 0.14, panier: 950,  note: "CPCs parmi les plus élevés — valeur client forte" },
  immo:       { cpl: 35,  conv: 0.12, panier: 2800, note: "Cycle de vente long — objectif : mandats ou visites" },
  renovation: { cpl: 30,  conv: 0.16, panier: 3200, note: "Ticket élevé — 1 chantier rentabilise plusieurs mois" },
  coach:      { cpl: 18,  conv: 0.20, panier: 260,  note: "Bon volume de recherches — suivi rapide des leads essentiel" },
  ecommerce:  { ecom: true, conv: 0.012, panier: 55, note: "ROAS réaliste entre x2 et x3.5 — Shopping + Search combinés" },
  nettoyage:  { cpl: 16,  conv: 0.25, panier: 160,  note: "Excellent rapport coût/résultat pour les petits budgets" },
  auto:       { cpl: 24,  conv: 0.20, panier: 380,  note: "Fort trafic local — recherches d'urgence bien converties" },
};

const sectorLabels: Record<string, string> = {
  toiture: 'Nettoyage / toiture',
  plomberie: 'Plomberie',
  dentiste: 'Dentiste / médecin',
  avocat: 'Avocat / notaire',
  immo: 'Immobilier',
  renovation: 'Rénovation',
  coach: 'Coach / thérapeute',
  ecommerce: 'E-commerce',
  nettoyage: 'Nettoyage & entretien',
  auto: 'Garage / carrosserie',
};

function formatEur(val: number): string {
  if (val >= 1000) return `${(val / 1000).toFixed(1).replace('.0', '')} k€`;
  return `${Math.round(val)} €`;
}

export default function ROICalculator() {
  const [sector, setSector] = useState<string>('plomberie');
  const [budget, setBudget] = useState<number>(800);
  const [results, setResults] = useState({ leads: 0, clients: 0, ca: 0, cpl: 0, roas: 0 });
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sectors[sector];
    let leads = 0, clients = 0, ca = 0, cpl = 0, roas = 0;

    if (s.ecom) {
      const clicks = budget / 0.55;
      const sales = clicks * s.conv;
      ca = sales * s.panier;
      roas = Math.min(ca / budget, 3.5);
      ca = budget * roas;
      clients = Math.round(ca / s.panier);
      leads = clients;
      cpl = s.panier * (1 - s.conv);
    } else {
      leads = Math.round(budget / (s.cpl || 30));
      clients = Math.round(leads * s.conv);
      ca = clients * s.panier;
      roas = Math.min(ca / budget, 6);
      ca = budget * roas;
      clients = Math.round(ca / s.panier);
      cpl = s.cpl || 30;
    }

    setResults({ leads, clients, ca, cpl, roas });
  }, [sector, budget]);

  const roasColor = results.roas < 2 ? '#6b7280' : results.roas < 4 ? '#d97706' : '#059669';
  const roasBarWidth = Math.min((results.roas / 6) * 100, 100);

  const budgetMin = 300, budgetMax = 5000;
  const sliderProgress = ((budget - budgetMin) / (budgetMax - budgetMin)) * 100;

  return (
    <section id="calculateur" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="section-label mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Calculateur ROI
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            Estimez votre retour sur investissement
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            Basé sur nos moyennes observées par secteur
          </p>
        </div>

        <div className="reveal reveal-delay-1 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          {/* Inputs */}
          <div className="p-8 border-b border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sector dropdown */}
            <div>
              <label className="block text-sm font-600 text-gray-700 mb-2">
                Votre secteur d'activité
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="form-input appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                {Object.entries(sectorLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              {/* Sector note */}
              <p className="mt-2 text-xs text-primary-600 bg-primary-50 border border-primary-100 rounded-lg px-3 py-2 leading-relaxed">
                💡 {sectors[sector].note}
              </p>
            </div>

            {/* Budget slider */}
            <div>
              <label className="block text-sm font-600 text-gray-700 mb-2">
                Budget mensuel Google Ads
                <span className="ml-2 text-primary-600 font-700">{budget.toLocaleString('fr-FR')} €/mois</span>
              </label>
              <input
                type="range"
                min={budgetMin}
                max={budgetMax}
                step={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="roi-slider mt-3"
                style={{ '--slider-progress': `${sliderProgress}%` } as React.CSSProperties}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>300 €</span>
                <span>5 000 €</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Leads / mois', value: results.leads.toString(), sub: 'estimés', icon: '👥' },
                { label: 'Clients / mois', value: results.clients.toString(), sub: 'estimés', icon: '🤝' },
                { label: 'CA potentiel', value: formatEur(results.ca), sub: 'estimé', icon: '💰' },
                { label: 'Coût par lead', value: `${results.cpl} €`, sub: 'estimé', icon: '🎯' },
              ].map((card, i) => (
                <div key={i} className="roi-card text-center">
                  <span className="text-2xl mb-2 block">{card.icon}</span>
                  <div className="text-2xl font-800 text-gray-900">{card.value}</div>
                  <div className="text-xs text-gray-400 font-500 mt-1">{card.label}</div>
                  <div className="text-[10px] text-gray-300 uppercase tracking-widest">{card.sub}</div>
                </div>
              ))}
            </div>

            {/* ROAS bar */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-sm font-600 text-gray-700">ROAS estimé</span>
                  <span className="text-xs text-gray-400 ml-2">— CA généré pour 1 € investi</span>
                </div>
                <span className="text-xl font-800" style={{ color: roasColor }}>
                  ×{results.roas.toFixed(1)}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  ref={barRef}
                  className="roas-bar-fill h-full rounded-full"
                  style={{
                    width: `${roasBarWidth}%`,
                    backgroundColor: roasColor,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 uppercase tracking-widest">
                <span>Faible &lt;×2</span>
                <span>Bon ×2–×4</span>
                <span>Excellent &gt;×4</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <a
                href="#formulaire"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-700 shadow-primary-sm"
              >
                Ces chiffres vous intéressent ? Obtenons votre estimation personnalisée
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-gray-400 leading-relaxed" style={{ fontSize: '11px' }}>
          Estimations basées sur des moyennes de marché conservatrices. Les résultats réels varient selon la zone géographique,
          la concurrence locale, la qualité de la landing page et la réactivité commerciale.
        </p>
      </div>
    </section>
  );
}