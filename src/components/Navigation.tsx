import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { playSfx } from '../utils/sfx';

interface NavigationProps {
  onOpenSearch: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenSearch }) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Theme sync
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.dataset.theme = saved;
    } else {
      document.documentElement.dataset.theme = 'dark';
    }

    // Active section scroll spy
    const sections = ['top', 'tools', 'work', 'experience', 'clients', 'skills', 'education', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id === 'top' ? 'home' : id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    playSfx('toggle');
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);

    if ('startViewTransition' in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        document.documentElement.dataset.theme = nextTheme;
      });
    }
  };

  const toggleSound = () => {
    playSfx('click');
    setSoundEnabled(!soundEnabled);
    if (window.SFX && typeof window.SFX.mute === 'function') {
      window.SFX.mute(!soundEnabled);
    }
  };

  const scrollTo = (id: string) => {
    playSfx('click');
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <div className="col">
        <div className="brand">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('top');
            }}
          >
            {portfolioData.brand}
          </a>
        </div>

        <nav className="links">
          <a
            href="#top"
            className={activeSection === 'home' ? 'on' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollTo('top');
            }}
          >
            Home
          </a>
          <a
            href="#tools"
            className={activeSection === 'tools' ? 'on' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollTo('tools');
            }}
          >
            Tools
          </a>
          <a
            href="#work"
            className={activeSection === 'work' ? 'on' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollTo('work');
            }}
          >
            Case Studies
          </a>
          <a
            href="#experience"
            className={activeSection === 'experience' ? 'on' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollTo('experience');
            }}
          >
            Experience
          </a>
          <a
            href="#clients"
            className={activeSection === 'clients' ? 'on' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollTo('clients');
            }}
          >
            Clients
          </a>
          <a
            href="#skills"
            className={activeSection === 'skills' ? 'on' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollTo('skills');
            }}
          >
            Skills
          </a>
          <a
            href="#education"
            className={activeSection === 'education' ? 'on' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollTo('education');
            }}
          >
            Education
          </a>
        </nav>

        <div className="hbtns">
          <button
            className="ibtn"
            id="searchBtn"
            type="button"
            aria-label="Search or jump to section"
            onClick={() => {
              playSfx('open');
              onOpenSearch();
            }}
          >
            <svg className="i"><use href="#i-search" /></svg>
          </button>

          <button
            className={`ibtn snd ${soundEnabled ? 'playing' : ''}`}
            id="soundBtn"
            type="button"
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            onClick={toggleSound}
          >
            <div className="eq" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
            <svg className="i spk" aria-hidden="true"><use href="#i-bolt" /></svg>
          </button>

          <button
            className="ibtn"
            id="themeBtn"
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <svg className="i sun" aria-hidden="true"><use href="#i-sun" /></svg>
            <svg className="i moon" aria-hidden="true"><use href="#i-moon" /></svg>
          </button>

          <button
            className="ibtn"
            id="menuBtn"
            type="button"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              playSfx('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <svg className="i"><use href="#i-menu" /></svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation accordion */}
      <nav id="mnav" className={mobileMenuOpen ? 'on' : ''}>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('top');
          }}
        >
          Home
        </a>
        <a
          href="#tools"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('tools');
          }}
        >
          Live Tools
        </a>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('work');
          }}
        >
          UX Case Studies
        </a>
        <a
          href="#experience"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('experience');
          }}
        >
          Experience
        </a>
        <a
          href="#clients"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('clients');
          }}
        >
          Freelance Clients
        </a>
        <a
          href="#skills"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('skills');
          }}
        >
          Skills &amp; Toolkit
        </a>
        <a
          href="#education"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('education');
          }}
        >
          Education &amp; Credentials
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('contact');
          }}
        >
          Contact
        </a>
      </nav>
    </header>
  );
};
