import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { playSfx } from '../utils/sfx';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  group: string;
  title: string;
  subtitle: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  const commands: CommandItem[] = [
    {
      group: 'Navigation',
      title: 'About',
      subtitle: 'Biography & background',
      action: () => jumpTo('about')
    },
    {
      group: 'Navigation',
      title: 'Live Tools & Projects',
      subtitle: 'Selected project cards',
      action: () => jumpTo('tools')
    },
    {
      group: 'Navigation',
      title: 'UX Case Studies',
      subtitle: 'In-depth project breakdowns',
      action: () => jumpTo('work')
    },
    {
      group: 'Navigation',
      title: 'Experience',
      subtitle: 'Employment & freelance timeline',
      action: () => jumpTo('experience')
    },
    {
      group: 'Navigation',
      title: 'Freelance Clients',
      subtitle: 'Independent client deliveries 2025',
      action: () => jumpTo('clients')
    },
    {
      group: 'Navigation',
      title: 'Skills & Toolkit',
      subtitle: 'Capabilities & technology stack',
      action: () => jumpTo('skills')
    },
    {
      group: 'Navigation',
      title: 'Education & Credentials',
      subtitle: 'Degrees, certifications & training',
      action: () => jumpTo('education')
    },
    {
      group: 'Navigation',
      title: 'Writing',
      subtitle: 'Technical articles & case notes',
      action: () => jumpTo('writing')
    },
    {
      group: 'Navigation',
      title: 'GitHub Activity',
      subtitle: 'Repositories & profile',
      action: () => jumpTo('github')
    },
    {
      group: 'Navigation',
      title: 'Design Philosophy',
      subtitle: 'Monochrome portrait experiment',
      action: () => jumpTo('quote')
    },
    {
      group: 'Navigation',
      title: 'Contact',
      subtitle: 'Get in touch & socials',
      action: () => jumpTo('contact')
    },
    {
      group: 'Featured Projects',
      title: 'Karyotica Labs',
      subtitle: 'Brand, Website & CMS (karyotica.ca)',
      action: () => {
        window.open('https://karyotica.ca/', '_blank');
        onClose();
      }
    },
    {
      group: 'Featured Projects',
      title: 'Visionicx',
      subtitle: 'Enterprise mobile app UI/UX',
      action: () => jumpTo('work')
    },
    {
      group: 'Featured Projects',
      title: 'Core Volt Matrix',
      subtitle: 'Brand identity & enterprise HRMS',
      action: () => jumpTo('work')
    },
    {
      group: 'Featured Projects',
      title: 'Fintech Product Experiences',
      subtitle: 'Intexm Media product brands',
      action: () => jumpTo('work')
    },
    {
      group: 'Featured Projects',
      title: 'TekWissen & AdvantEdge',
      subtitle: 'Corporate communication design',
      action: () => jumpTo('experience')
    },
    {
      group: 'Links & Social',
      title: 'LinkedIn',
      subtitle: portfolioData.linkedinUrl,
      action: () => {
        window.open(portfolioData.linkedinUrl, '_blank');
        onClose();
      }
    },
    {
      group: 'Links & Social',
      title: 'GitHub',
      subtitle: portfolioData.githubUrl,
      action: () => {
        window.open(portfolioData.githubUrl, '_blank');
        onClose();
      }
    },
    {
      group: 'Links & Social',
      title: 'Behance',
      subtitle: portfolioData.behanceUrl,
      action: () => {
        window.open(portfolioData.behanceUrl, '_blank');
        onClose();
      }
    },
    {
      group: 'Actions',
      title: 'Copy Email Address',
      subtitle: portfolioData.email,
      action: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(portfolioData.email);
        }
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.group.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playSfx('open');
        if (isOpen) onClose();
        else {
          setQuery('');
          setSelectedIndex(0);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="pal"
      className="on"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'pal') {
          playSfx('close');
          onClose();
        }
      }}
    >
      <div className="pbox">
        <div className="pal-in">
          <svg className="i"><use href="#i-search" /></svg>
          <input
            id="pq"
            type="text"
            placeholder="Type a command or jump to section..."
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="kbd">ESC</kbd>
        </div>

        <div id="plist">
          {filteredCommands.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className={`pi ${selectedIndex === idx ? 'on' : ''}`}
              onClick={() => {
                playSfx('click');
                item.action();
              }}
              onMouseEnter={() => setSelectedIndex(idx)}
            >
              <span>{item.title}</span>
              <span className="sub">{item.subtitle}</span>
            </button>
          ))}
          {filteredCommands.length === 0 && (
            <div className="pi" style={{ color: 'var(--soft)' }}>
              No matching commands
            </div>
          )}
        </div>

        <div className="pfoot">
          <span>Navigate with mouse or keyboard</span>
          <span style={{ marginLeft: 'auto' }}>↵ to select</span>
        </div>
      </div>
    </div>
  );
};
