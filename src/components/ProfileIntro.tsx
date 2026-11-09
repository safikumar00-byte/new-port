import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { playSfx } from '../utils/sfx';

interface ProfileIntroProps {
  onOpenSearch: () => void;
}

export const ProfileIntro: React.FC<ProfileIntroProps> = ({ onOpenSearch }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: portfolioData.timeZone
    });

    const updateClock = () => {
      setTimeStr(formatter.format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="profile">
      <div className="who">
        <div className="avatar">
          <img
            src={portfolioData.avatar}
            alt={portfolioData.name}
            loading="eager"
          />
        </div>

        <div>
          <h1 className="name">{portfolioData.name}</h1>
          <div className="roles">
            <div className="roller" aria-label="Rotating professional titles">
              <div className="roller-track">
                {portfolioData.roles.map((role, idx) => (
                  <span key={idx}>{role}</span>
                ))}
                {/* Loop back to first role */}
                <span>{portfolioData.roles[0]}</span>
              </div>
            </div>
          </div>

          <div className="meta">
            <span>
              <svg className="i"><use href="#i-pin" /></svg>
              {portfolioData.location}
            </span>
            <span>·</span>
            <span>
              <svg className="i"><use href="#i-clock" /></svg>
              <span className="clock">{timeStr || '11:02:55 AM IST'}</span>
            </span>
          </div>
        </div>
      </div>

      <button
        className="kpill"
        type="button"
        onClick={() => {
          playSfx('open');
          onOpenSearch();
        }}
      >
        <svg className="i"><use href="#i-search" /></svg>
        <span>Search or jump</span>
        <kbd className="kbd">⌘K</kbd>
      </button>
    </div>
  );
};

