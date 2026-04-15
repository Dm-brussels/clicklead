import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import PillarsSection from './components/PillarsSection';
import LandingPageEducation from './components/LandingPageEducation';
import ProcessSection from './components/ProcessSection';
import ROICalculator from './components/ROICalculator';
import SectorsSection from './components/SectorsSection';
import ResultsSection from './components/ResultsSection';
import ContactForm from './components/ContactForm';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';
import ScrollRevealInit from './components/ScrollRevealInit';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PillarsSection />
      <LandingPageEducation />
      <ProcessSection />
      <ROICalculator />
      <SectorsSection />
      <ResultsSection />
      <ContactForm />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <ScrollRevealInit />
    </main>
  );
}