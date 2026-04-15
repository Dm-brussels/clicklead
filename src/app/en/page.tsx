import React from 'react';
import HeaderEn from './components/HeaderEn';
import FooterEn from './components/FooterEn';
import HeroSectionEn from './components/HeroSectionEn';
import PillarsSectionEn from './components/PillarsSectionEn';
import LandingPageEducationEn from './components/LandingPageEducationEn';
import ProcessSectionEn from './components/ProcessSectionEn';
import ROICalculatorEn from './components/ROICalculatorEn';
import SectorsSectionEn from './components/SectorsSectionEn';
import ResultsSectionEn from './components/ResultsSectionEn';
import ContactFormEn from './components/ContactFormEn';
import FAQSectionEn from './components/FAQSectionEn';
import FinalCTAEn from './components/FinalCTAEn';
import ScrollRevealInit from '../home/components/ScrollRevealInit';

export const metadata = {
  title: 'Clicklead — Profitable Google Ads Campaigns in 90 Days',
  description: 'Clicklead manages your Google Ads campaigns, creates your dedicated landing page and hosts everything — measurable results for SMBs, tradespeople and independent professionals.',
};

export default function EnglishPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderEn />
      <HeroSectionEn />
      <PillarsSectionEn />
      <LandingPageEducationEn />
      <ProcessSectionEn />
      <ROICalculatorEn />
      <SectorsSectionEn />
      <ResultsSectionEn />
      <ContactFormEn />
      <FAQSectionEn />
      <FinalCTAEn />
      <FooterEn />
      <ScrollRevealInit />
    </main>
  );
}
