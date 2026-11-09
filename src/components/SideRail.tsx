import React, { useState, useEffect } from 'react';
import { playSfx } from '../utils/sfx';

export const SideRail: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('top');

  const railLinks = [
    { id: 'top', label: 'Top', symbol: 'i-user' },
    { id: 'about', label: 'About', symbol: 'i-user' },
    { id: 'tools', label: 'Live tools', symbol: 'i-bolt' },
    { id: 'work', label: 'Case Studies', symbol: 'i-folder' },
    { id: 'experience', label: 'Experience', symbol: 'i-brief' },
    { id: 'clients', label: 'Clients', symbol: 'i-layers' },
    { id: 'skills', label: 'Skills', symbol: 'i-wrench' },
    { id: 'education', label: 'Education', symbol: 'i-file' },
    { id: 'writing', label: 'Writing', symbol: 'i-pen' },
    { id: 'github', label: 'GitHub', symbol: 'i-git' },
    { id: 'contact', label: 'Contact', symbol: 'i-mail' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = railLinks.length - 1; i >= 0; i--) {
        const item = railLinks[i];
        const el = document.getElementById(item.id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    playSfx('click');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav id="rail" aria-label="Section shortcuts">
      <div className="rl">JUMP</div>
      {railLinks.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeSection === item.id ? 'on' : ''}
          onClick={(e) => {
            e.preventDefault();
            scrollTo(item.id);
          }}
        >
          <span className="bar" />
          <svg className="i"><use href={`#${item.symbol}`} /></svg>
          <span className="lb">{item.label}</span>
        </a>
      ))}
    </nav>
  );
};
