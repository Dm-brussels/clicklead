'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CTAPopup from '@/app/home/components/CTAPopup';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Comment ça marche', href: '#process' },
  { label: 'Calculateur ROI', href: '#calculateur' },
  { label: 'FAQ', href: '#faq' }];


  return (
    <>
      {/* Promotional Banner */}
      <div className="fixed top-0 inset-x-0 z-[60] bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-2 px-4">
        <p className="text-xs sm:text-sm font-600 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 leading-snug">
          🎉 Frais de mise en place offerts — <strong>0 € jusqu'à fin du mois</strong>
        </p>
      </div>
      <header
        className={`fixed top-8 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ?
        'bg-dark/90 backdrop-blur-md border-b border-white/10 shadow-lg' :
        'bg-transparent'}`
        }>

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-18">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <Image
                src="/assets/images/Group_8-1773658068367.png"
                alt="Clicklead logo"
                width={120}
                height={40}
                className="object-contain cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks?.map((link) =>
              <a
                key={link?.href}
                href={link?.href}
                className="nav-link px-4 py-2 rounded-full hover:bg-white/5 transition-all">

                  {link?.label}
                </a>
              )}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPopupOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 btn-primary px-5 py-2.5 rounded-full text-sm font-600 shadow-primary-sm">

                Commencer cette semaine
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Mobile CTA button */}
              <button
                onClick={() => setPopupOpen(true)}
                className="sm:hidden inline-flex items-center btn-primary px-3 py-2 rounded-full text-xs font-600">

                Commencer
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition"
                aria-label="Menu">

                <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`
        }>

        <nav className="flex flex-col items-center gap-6">
          {navLinks?.map((link) =>
          <a
            key={link?.href}
            href={link?.href}
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-600 text-white/70 hover:text-white transition-colors">

              {link?.label}
            </a>
          )}
          <button
            onClick={() => {setMenuOpen(false);setPopupOpen(true);}}
            className="mt-4 btn-primary px-8 py-3.5 rounded-full text-base font-600">

            Commencer cette semaine
          </button>
        </nav>
      </div>

      {/* CTA Popup */}
      <CTAPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* Mobile Bottom CTA Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 flex sm:hidden gap-3 px-4 py-3 backdrop-blur-md border-t border-white/10 shadow-lg bg-[rgba(247,247,247,0)]">
        <button
          onClick={() => setPopupOpen(true)}
          className="flex-1 btn-primary py-3 rounded-full text-sm font-600 text-center">

          Commencer
        </button>
        <a
          href="https://wa.link/81xvcu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-600 text-white"
          style={{ backgroundColor: '#25d366' }}>

          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </>);

}