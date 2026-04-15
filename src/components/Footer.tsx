import React from 'react';
import Image from 'next/image';

export default function Footer() {
  const year = new Date()?.getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/Group_8-1773658068367.png"
              alt="Clicklead logo"
              width={100}
              height={32}
              className="object-contain"
            />
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-500 text-gray-500">
            <a href="#services" className="hover:text-primary-500 transition-colors">Services</a>
            <a href="#calculateur" className="hover:text-primary-500 transition-colors">Calculateur</a>
            <a href="#formulaire" className="hover:text-primary-500 transition-colors">Contact</a>
            <a href="#faq" className="hover:text-primary-500 transition-colors">FAQ</a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {year} Clicklead · <a href="#" className="hover:text-primary-500 transition-colors">Mentions légales</a> · <a href="#" className="hover:text-primary-500 transition-colors">Confidentialité</a>
          </p>
        </div>
      </div>
    </footer>
  );
}