import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

export const Footer: React.FC = () => {
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
    <footer className="credits">
      <div className="by">
        Designed &amp; built by <b>{portfolioData.footerName}</b>
      </div>
      <div className="small">
        <span>© 2026</span>
        <span>·</span>
        <span>{portfolioData.location}</span>
        <span>·</span>
        <span>
          <span className="clock">{timeStr || '11:02:55 AM IST'}</span>
        </span>
        <span>·</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span className="live" aria-hidden="true" />
          <span>{portfolioData.availabilityLabel}</span>
        </span>
      </div>
    </footer>
  );
};
