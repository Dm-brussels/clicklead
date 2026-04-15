'use client';

import React, { useState } from 'react';

const sectorOptions = [
{ value: '', label: 'Sélectionnez votre secteur' },
{ value: 'toiture', label: 'Nettoyage / Toiture' },
{ value: 'plomberie', label: 'Plomberie' },
{ value: 'dentiste', label: 'Dentiste / Médecin' },
{ value: 'avocat', label: 'Avocat / Notaire' },
{ value: 'immo', label: 'Immobilier' },
{ value: 'renovation', label: 'Rénovation' },
{ value: 'coach', label: 'Coach / Thérapeute' },
{ value: 'ecommerce', label: 'E-commerce' },
{ value: 'nettoyage', label: 'Nettoyage & Entretien' },
{ value: 'auto', label: 'Garage / Carrosserie' },
{ value: 'autre', label: 'Autre secteur' }];


const budgetOptions = [
{ value: '', label: 'Budget mensuel souhaité' },
{ value: '<500', label: 'Moins de 500 €' },
{ value: '500-1000', label: '500 – 1 000 €' },
{ value: '1000-2500', label: '1 000 – 2 500 €' },
{ value: '2500-5000', label: '2 500 – 5 000 €' },
{ value: '>5000', label: 'Plus de 5 000 €' }];


const objectifOptions = [
{ value: '', label: 'Objectif principal' },
{ value: 'leads', label: 'Générer des leads' },
{ value: 'vente', label: 'Vendre en ligne' },
{ value: 'notoriete', label: 'Notoriété locale' },
{ value: 'autre', label: 'Autre' }];


interface FormData {
  prenom: string;
  email: string;
  telephone: string;
  secteur: string;
  budget: string;
  siteweb: string;
  siteurl: string;
  objectif: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    prenom: '', email: '', telephone: '', secteur: '',
    budget: '', siteweb: '', siteurl: '', objectif: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est obligatoire';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
    }
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est obligatoire';
    if (!formData.secteur) newErrors.secteur = 'Veuillez sélectionner un secteur';
    if (!formData.budget) newErrors.budget = 'Veuillez sélectionner un budget';
    if (!formData.siteweb) newErrors.siteweb = 'Veuillez répondre à cette question';
    if (formData.siteweb === 'oui' && !formData.siteurl.trim()) {
      newErrors.siteurl = 'Veuillez indiquer l\'URL de votre site';
    }
    if (!formData.objectif) newErrors.objectif = 'Veuillez sélectionner un objectif';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/send-form-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.error || `Erreur serveur (${res.status})`;
        console.error('[ContactForm] API error:', msg);
        setSubmitError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error('[ContactForm] Network error:', err);
      setSubmitError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section id="formulaire" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="section-label mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 11.6 19.79 19.79 0 0 1 1.06 3 2 2 0 0 1 3.03 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Estimation gratuite
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            Obtenez votre estimation gratuite
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-md mx-auto">
            On analyse votre situation et on vous répond sous 24h
          </p>
        </div>

        <div className="reveal reveal-delay-1">
          {submitted ? (
          /* Confirmation message */
          <div className="bg-success/5 border border-success/20 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-700 text-gray-900 mb-3">
                Merci {formData.prenom} !
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">Nous avons bien reçu votre demande. Notre équipe vous contacte sous 24h pour votre estimation personnalisée. Pensez à consulter vos Spams !

            </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-success font-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Vos données sont confidentielles et sécurisées
              </div>
            </div>) :

          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 space-y-5">
              {submitError &&
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-500">
                  {submitError}
                </div>
            }
              {/* Row 1: Prenom + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Prénom *</label>
                  <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className={`form-input ${errors.prenom ? 'error' : ''}`} />

                  {errors.prenom && <p className="mt-1 text-xs text-red-500">{errors.prenom}</p>}
                </div>
                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Email *</label>
                  <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className={`form-input ${errors.email ? 'error' : ''}`} />

                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* Telephone */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Téléphone *</label>
                <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="06 XX XX XX XX"
                className={`form-input ${errors.telephone ? 'error' : ''}`} />

                {errors.telephone && <p className="mt-1 text-xs text-red-500">{errors.telephone}</p>}
              </div>

              {/* Secteur */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Secteur d'activité *</label>
                <select
                name="secteur"
                value={formData.secteur}
                onChange={handleChange}
                className={`form-input appearance-none cursor-pointer ${errors.secteur ? 'error' : ''}`}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>

                  {sectorOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.secteur && <p className="mt-1 text-xs text-red-500">{errors.secteur}</p>}
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Budget mensuel souhaité en Ads *</label>
                <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`form-input appearance-none cursor-pointer ${errors.budget ? 'error' : ''}`}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>

                  {budgetOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.budget && <p className="mt-1 text-xs text-red-500">{errors.budget}</p>}
              </div>

              {/* Site web radio */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-2">Avez-vous déjà un site web ? *</label>
                <div className="flex gap-6">
                  {['oui', 'non'].map((val) =>
                <label key={val} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                    type="radio"
                    name="siteweb"
                    value={val}
                    checked={formData.siteweb === val}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary-500" />

                      <span className="text-sm text-gray-700 capitalize font-500">{val === 'oui' ? 'Oui' : 'Non'}</span>
                    </label>
                )}
                </div>
                {errors.siteweb && <p className="mt-1 text-xs text-red-500">{errors.siteweb}</p>}
              </div>

              {/* Conditional: site URL */}
              {formData.siteweb === 'oui' &&
            <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">URL de votre site *</label>
                  <input
                type="text"
                name="siteurl"
                value={formData.siteurl}
                onChange={handleChange}
                placeholder="https://www.votresite.fr"
                className={`form-input ${errors.siteurl ? 'error' : ''}`} />

                  {errors.siteurl && <p className="mt-1 text-xs text-red-500">{errors.siteurl}</p>}
                </div>
            }

              {/* Objectif */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Objectif principal *</label>
                <select
                name="objectif"
                value={formData.objectif}
                onChange={handleChange}
                className={`form-input appearance-none cursor-pointer ${errors.objectif ? 'error' : ''}`}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>

                  {objectifOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.objectif && <p className="mt-1 text-xs text-red-500">{errors.objectif}</p>}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 rounded-xl text-base font-700 shadow-primary-sm flex items-center justify-center gap-2 disabled:opacity-70">

                  {loading ? 'Envoi en cours…' : 'Recevoir mon estimation gratuite'}
                  {!loading &&
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
                </button>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-gray-400">
                  <span className="font-500">Sans engagement — réponse garantie sous 24h</span>
                  <span className="hidden sm:block">·</span>
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Vos données sont confidentielles
                  </span>
                </div>
              </div>
            </form>
          }
        </div>
      </div>
    </section>);

}