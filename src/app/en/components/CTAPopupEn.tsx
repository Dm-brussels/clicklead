'use client';

import React, { useState, useEffect } from 'react';

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

interface CTAPopupEnProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CTAPopupEn({ isOpen, onClose }: CTAPopupEnProps) {
  const [view, setView] = useState<'choice' | 'form' | 'calendly'>('choice');
  const [formData, setFormData] = useState<FormData>({
    prenom: '', email: '', telephone: '', secteur: '',
    budget: '', siteweb: '', siteurl: '', objectif: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView('choice');
        setSubmitted(false);
        setSubmitError(null);
        setErrors({});
        setFormData({ prenom: '', email: '', telephone: '', secteur: '', budget: '', siteweb: '', siteurl: '', objectif: '' });
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

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
        body: JSON.stringify({ ...formData, lang: 'en' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.error || `Server error (${res.status})`;
        console.error('[CTAPopupEn] API error:', msg);
        setSubmitError('An error occurred while sending. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error('[CTAPopupEn] Network error:', err);
      setSubmitError('Unable to reach the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (!isOpen) return null;

  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat' as const,
    backgroundPosition: 'right 12px center',
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-2xl bg-white overflow-y-auto shadow-2xl flex flex-col">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── CHOICE VIEW ── */}
        {view === 'choice' && (
          <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 sm:py-14 text-center">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-600 tracking-wide uppercase mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                Get started this week
              </span>
              <h2 className="font-display font-800 text-gray-900 text-2xl sm:text-3xl mb-3" style={{ letterSpacing: '-0.025em' }}>
                How would you like to start?
              </h2>
              <p className="text-gray-500 text-base max-w-sm mx-auto">
                Choose the option that works best for you
              </p>
            </div>

            {/* Two cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
              {/* Option 1: Form */}
              <button
                onClick={() => setView('form')}
                className="group flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-gray-100 hover:border-primary-400 hover:bg-primary-50/40 transition-all text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <p className="font-700 text-gray-900 text-base mb-1">Get a callback</p>
                  <p className="text-sm text-gray-500 leading-relaxed">Fill out the form and we'll call you back within 24h</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-600 text-primary-600">
                  Fill out the form
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              {/* Option 2: Calendly */}
              <button
                onClick={() => setView('calendly')}
                className="group flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-gray-100 hover:border-green-400 hover:bg-green-50/40 transition-all text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.87v6.26a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-700 text-gray-900 text-base mb-1">Direct video call</p>
                  <p className="text-sm text-gray-500 leading-relaxed">Book a slot with an expert right now</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-600 text-green-600">
                  Book a call
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Reassurance */}
            <p className="mt-8 text-xs text-gray-400 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              No commitment · Setup fee waived — $0 until end of month
            </p>
          </div>
        )}

        {/* ── FORM VIEW ── */}
        {view === 'form' && (
          <div className="flex flex-col flex-1 px-6 py-10">
            <button
              onClick={() => setView('choice')}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6 self-start"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>

            <div className="text-center mb-8">
              <h2 className="font-display font-800 text-gray-900 text-xl sm:text-2xl mb-2" style={{ letterSpacing: '-0.025em' }}>
                Get your free estimate
              </h2>
              <p className="text-gray-500 text-sm">We analyze your situation and get back to you within 24h</p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-700 text-gray-900 mb-2">Thank you {formData.prenom}!</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                  We have received your request. Our team will contact you within 24h for your personalized estimate.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 btn-primary px-6 py-2.5 rounded-full text-sm font-600"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-500">
                    {submitError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-600 text-gray-700 mb-1.5">First name *</label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Your first name" className={`form-input ${errors.prenom ? 'error' : ''}`} />
                    {errors.prenom && <p className="mt-1 text-xs text-red-500">{errors.prenom}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-600 text-gray-700 mb-1.5">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={`form-input ${errors.email ? 'error' : ''}`} />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Phone *</label>
                  <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={`form-input ${errors.telephone ? 'error' : ''}`} />
                  {errors.telephone && <p className="mt-1 text-xs text-red-500">{errors.telephone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Industry *</label>
                  <select name="secteur" value={formData.secteur} onChange={handleChange} className={`form-input appearance-none cursor-pointer ${errors.secteur ? 'error' : ''}`} style={selectStyle}>
                    {sectorOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.secteur && <p className="mt-1 text-xs text-red-500">{errors.secteur}</p>}
                </div>

                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Desired monthly Ads budget *</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className={`form-input appearance-none cursor-pointer ${errors.budget ? 'error' : ''}`} style={selectStyle}>
                    {budgetOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.budget && <p className="mt-1 text-xs text-red-500">{errors.budget}</p>}
                </div>

                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-2">Do you already have a website? *</label>
                  <div className="flex gap-6">
                    {['oui', 'non'].map(val => (
                      <label key={val} className="flex items-center gap-2.5 cursor-pointer">
                        <input type="radio" name="siteweb" value={val} checked={formData.siteweb === val} onChange={handleChange} className="w-4 h-4 accent-primary-500" />
                        <span className="text-sm text-gray-700 capitalize font-500">{val === 'oui' ? 'Yes' : 'No'}</span>
                      </label>
                    ))}
                  </div>
                  {errors.siteweb && <p className="mt-1 text-xs text-red-500">{errors.siteweb}</p>}
                </div>

                {formData.siteweb === 'oui' && (
                  <div>
                    <label className="block text-sm font-600 text-gray-700 mb-1.5">Your website URL *</label>
                    <input type="text" name="siteurl" value={formData.siteurl} onChange={handleChange} placeholder="https://www.yourwebsite.com" className={`form-input ${errors.siteurl ? 'error' : ''}`} />
                    {errors.siteurl && <p className="mt-1 text-xs text-red-500">{errors.siteurl}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Main goal *</label>
                  <select name="objectif" value={formData.objectif} onChange={handleChange} className={`form-input appearance-none cursor-pointer ${errors.objectif ? 'error' : ''}`} style={selectStyle}>
                    {objectifOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.objectif && <p className="mt-1 text-xs text-red-500">{errors.objectif}</p>}
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={loading} className="btn-primary w-full py-4 rounded-xl text-base font-700 shadow-primary-sm flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading ? 'Sending…' : 'Get my free estimate'}
                    {!loading && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-gray-400">No commitment · Reply guaranteed within 24h</p>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ── CALENDLY VIEW ── */}
        {view === 'calendly' && (
          <div className="flex flex-col flex-1 px-6 py-10">
            <button
              onClick={() => setView('choice')}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6 self-start"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>

            <div className="text-center mb-6">
              <h2 className="font-display font-800 text-gray-900 text-xl sm:text-2xl mb-2" style={{ letterSpacing: '-0.025em' }}>
                Book your video call
              </h2>
              <p className="text-gray-500 text-sm">Pick a time that works for you — 30-min kickoff call with an expert</p>
            </div>

            {/* Calendly embed — English link */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50" style={{ minHeight: '500px' }}>
              <iframe
                src="https://calendly.com/start-clicklead/let-s-meet-30-kickoff-call?embed_domain=clicklead9405.builtwithrocket.new&embed_type=Inline"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book a video call"
                style={{ minHeight: '500px', display: 'block' }}
              />
            </div>

            <p className="mt-4 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              No-commitment call · Setup fee waived — $0 until end of month
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
