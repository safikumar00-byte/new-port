import React, { useState, useEffect } from 'react';
import { SvgIcons } from './components/SvgIcons';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { HeroCanvas } from './components/HeroCanvas';
import { ProfileIntro } from './components/ProfileIntro';
import { About } from './components/About';
import { LiveTools } from './components/LiveTools';
import { CaseStudies } from './components/CaseStudies';
import { Experience } from './components/Experience';
import { FreelanceClients } from './components/FreelanceClients';
import { SkillsSection } from './components/SkillsSection';
import { EducationCertifications } from './components/EducationCertifications';
import { Writing } from './components/Writing';
import { GitHubActivity } from './components/GitHubActivity';
import { PortraitExperiment } from './components/PortraitExperiment';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { CommandPalette } from './components/CommandPalette';
import { SideRail } from './components/SideRail';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add('smooth');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* SVG Icon Sprite Definitions */}
      <SvgIcons />

      {/* Signature Animated Wireframe Preloader */}
      <Preloader onComplete={() => {}} />

      {/* Floating Figma Multiplayer Cursor */}
      <CustomCursor />

      {/* Floating Right Section Quick-Jump Rail */}
      <SideRail />

      {/* Margin Floating Stickers */}
      <div className="decor" aria-hidden="true">
        <div className="dz s1">
          <div className="sticker" title="Figma">
            <img src="/images/figma.svg" alt="Figma" />
          </div>
        </div>
        <div className="dz s2">
          <div className="sticker" title="Claude">
            <img src="/images/claude.svg" alt="Claude" />
          </div>
        </div>
        <div className="dz s3">
          <div className="sticker" title="Vercel">
            <img src="/images/vercel.svg" alt="Vercel" />
          </div>
        </div>
      </div>

      {/* Top Sticky Navigation */}
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Narrow Portfolio Column */}
      <main id="top">
        <div className="col">
          {/* 1. Hero Interactive Design Canvas */}
          <HeroCanvas />

          {/* 2. Profile Introduction & Live Clock */}
          <ProfileIntro onOpenSearch={() => setIsSearchOpen(true)} />

          {/* 3. About Section with Calisthenics Mascot */}
          <About />

          {/* 4. Selected Work / Live Tools Grid with Filtering */}
          <LiveTools />

          {/* 5. UX Case Studies */}
          <CaseStudies />

          {/* 6. Experience (Employment, Freelance & Foundational Operations) */}
          <Experience />

          {/* 7. Freelance Clients (Independent Engagements 2025) */}
          <FreelanceClients />

          {/* 8. Skills & Toolkit (Grouped Capabilities & Tech Stack) */}
          <SkillsSection />

          {/* 9. Education, Certifications & Internships */}
          <EducationCertifications />

          {/* 10. Writing Editorial Rows */}
          <Writing />

          {/* 11. GitHub Profile & Technical Activity */}
          <GitHubActivity />

          {/* 12. Interactive Monochrome Portrait Experiment */}
          <PortraitExperiment />

          {/* 13. Contact Strip */}
          <Contact onShowToast={showToast} />

          {/* 14. Footer Attribution & Status */}
          <Footer />
        </div>
      </main>

      {/* ⌘K Command Palette */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Interactive Toast Notifications */}
      <Toast message={toastMessage} />
    </>
  );
};

export default App;
