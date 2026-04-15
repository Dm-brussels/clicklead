'use client';

import React, { useState } from 'react';

const sectorOptions = [
  { value: '', label: 'Select your industry' },
  { value: 'roofing', label: 'Roofing / Cleaning' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'dentist', label: 'Dentist / Doctor' },
  { value: 'lawyer', label: 'Lawyer / Notary' },
  { value: 'realestate', label: 'Real Estate' },
  { value: 'renovation', label: 'Renovation' },
  { value: 'coaching', label: 'Coach / Therapist' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'cleaning', label: 'Cleaning & Maintenance' },
  { value: 'auto', label: 'Garage / Auto Body' },
  { value: 'other', label: 'Other industry' },
];

const budgetOptions = [
  { value: '', label: 'Desired monthly budget' },
  { value: '<500', label: 'Less than $500' },
  { value: '500-1000', label: '$500 – $1,000' },
  { value: '1000-2500', label: '$1,000 – $2,500' },
  { value: '2500-5000', label: '$2,500 – $5,000' },
  { value: '>5000', label: 'More than $5,000' },
];

const objectifOptions = [
  { value: '', label: 'Main goal' },
  { value: 'leads', label: 'Generate leads' },
  { value: 'sales', label: 'Sell online' },
  { value: 'awareness', label: 'Local awareness' },
  { value: 'other', label: 'Other' },
];

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

export default function ContactFormEn() {
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
    if (!formData.prenom.trim()) newErrors.prenom = 'First name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.telephone.trim()) newErrors.telephone = 'Phone number is required';
    if (!formData.secteur) newErrors.secteur = 'Please select an industry';
    if (!formData.budget) newErrors.budget = 'Please select a budget';
    if (!formData.siteweb) newErrors.siteweb = 'Please answer this question';
    if (formData.siteweb === 'oui' && !formData.siteurl.trim()) {
      newErrors.siteurl = 'Please enter your website URL';
    }
    if (!formData.objectif) newErrors.objectif = 'Please select a goal';
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
        body: JSON.stringify({ ...formData, lang: 'en' })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.error || `Server error (${res.status})`;
        console.error('[ContactFormEn] API error:', msg);
        setSubmitError('An error occurred while sending. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error('[ContactFormEn] Network error:', err);
      setSubmitError('Unable to reach the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat' as const,
    backgroundPosition: 'right 12px center',
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
            Free estimate
          </span>
          <h2 className="font-display font-800 text-gray-900 mt-5" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.25rem)', lineHeight: '1.2', letterSpacing: '-0.025em' }}>
            Get your free estimate
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-md mx-auto">
            We analyze your situation and get back to you within 24h
          </p>
        </div>

        <div className="reveal reveal-delay-1">
          {submitted ? (
            <div className="bg-success/5 border border-success/20 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-700 text-gray-900 mb-3">
                Thank you {formData.prenom}!
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                We have received your request. Our team will contact you within 24h for your personalized estimate. Don't forget to check your spam folder!
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-success font-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Your data is confidential and secure
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 space-y-5">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-500">
                  {submitError}
                </div>
              )}
              {/* Row 1: First name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">First name *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Your first name"
                    className={`form-input ${errors.prenom ? 'error' : ''}`}
                  />
                  {errors.prenom && <p className="mt-1 text-xs text-red-500">{errors.prenom}</p>}
                </div>
                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Phone *</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={`form-input ${errors.telephone ? 'error' : ''}`}
                />
                {errors.telephone && <p className="mt-1 text-xs text-red-500">{errors.telephone}</p>}
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Industry *</label>
                <select
                  name="secteur"
                  value={formData.secteur}
                  onChange={handleChange}
                  className={`form-input appearance-none cursor-pointer ${errors.secteur ? 'error' : ''}`}
                  style={selectStyle}
                >
                  {sectorOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.secteur && <p className="mt-1 text-xs text-red-500">{errors.secteur}</p>}
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Desired monthly Ads budget *</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`form-input appearance-none cursor-pointer ${errors.budget ? 'error' : ''}`}
                  style={selectStyle}
                >
                  {budgetOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.budget && <p className="mt-1 text-xs text-red-500">{errors.budget}</p>}
              </div>

              {/* Website radio */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-2">Do you already have a website? *</label>
                <div className="flex gap-6">
                  {['oui', 'non'].map((val) => (
                    <label key={val} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="siteweb"
                        value={val}
                        checked={formData.siteweb === val}
                        onChange={handleChange}
                        className="w-4 h-4 accent-primary-500"
                      />
                      <span className="text-sm text-gray-700 capitalize font-500">{val === 'oui' ? 'Yes' : 'No'}</span>
                    </label>
                  ))}
                </div>
                {errors.siteweb && <p className="mt-1 text-xs text-red-500">{errors.siteweb}</p>}
              </div>

              {/* Conditional: site URL */}
              {formData.siteweb === 'oui' && (
                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Your website URL *</label>
                  <input
                    type="text"
                    name="siteurl"
                    value={formData.siteurl}
                    onChange={handleChange}
                    placeholder="https://www.yourwebsite.com"
                    className={`form-input ${errors.siteurl ? 'error' : ''}`}
                  />
                  {errors.siteurl && <p className="mt-1 text-xs text-red-500">{errors.siteurl}</p>}
                </div>
              )}

              {/* Goal */}
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Main goal *</label>
                <select
                  name="objectif"
                  value={formData.objectif}
                  onChange={handleChange}
                  className={`form-input appearance-none cursor-pointer ${errors.objectif ? 'error' : ''}`}
                  style={selectStyle}
                >
                  {objectifOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.objectif && <p className="mt-1 text-xs text-red-500">{errors.objectif}</p>}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 rounded-xl text-base font-700 shadow-primary-sm flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? 'Sending…' : 'Get my free estimate'}
                  {!loading && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-gray-400">
                  <span className="font-500">No commitment — reply guaranteed within 24h</span>
                  <span className="hidden sm:block">·</span>
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Your data is confidential
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
