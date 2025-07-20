import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ProblemSolutionSection from '../components/sections/ProblemSolutionSection';
import ServicePillarsSection from '../components/sections/ServicePillarsSection';
import MultiAxisSection from '../components/sections/MultiAxisSection';
import CaseStudySection from '../components/sections/CaseStudySection';
import TeamSection from '../components/sections/TeamSection';
import SocialProofSection from '../components/sections/SocialProofSection';
import FinalCTASection from '../components/sections/FinalCTASection';

const HomePage = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ProblemSolutionSection />
      <ServicePillarsSection />
      <MultiAxisSection />
      <CaseStudySection />
      <TeamSection />
      <SocialProofSection />
      <FinalCTASection />
    </main>
  );
};

export default HomePage;
