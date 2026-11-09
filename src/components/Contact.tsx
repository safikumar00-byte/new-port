import React from 'react';
import { portfolioData } from '../data/portfolio';
import { playSfx } from '../utils/sfx';

interface ContactProps {
  onShowToast: (message: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const copyEmail = () => {
    playSfx('sparkle');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(portfolioData.email);
    }
    onShowToast(`Copied ${portfolioData.email}`);
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!portfolioData.resumeUrl) {
      e.preventDefault();
      playSfx('sparkle');
      onShowToast('Resume available upon request · Email sent');
      window.location.href = `mailto:${portfolioData.email}?subject=Resume%20Request%20-%20Sunil%20Kumar%20Reddy`;
    }
  };

  return (
    <section id="contact" data-ml-section="contact">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>Contact</h2>
            <span className="aside em">
              <a
                href={`mailto:${portfolioData.email}`}
                data-cursor-label="write to me ↗"
              >
                {portfolioData.email}
              </a>
              <button
                className="cpy"
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                data-cursor-label="copy email"
              >
                <svg className="i">
                  <use href="#i-copy" />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="col cstrip">
        <a
          href={portfolioData.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="ic">
            <svg className="i">
              <use href="#gh" />
            </svg>
          </span>
          GitHub<span className="arr">↗</span>
        </a>

        <a
          href={portfolioData.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="ic">
            <svg className="i">
              <use href="#li" />
            </svg>
          </span>
          LinkedIn<span className="arr">↗</span>
        </a>

        <a
          href={portfolioData.behanceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="ic">
            <svg className="i">
              <use href="#be" />
            </svg>
          </span>
          Behance<span className="arr">↗</span>
        </a>

        <a
          href={portfolioData.resumeUrl || '#contact'}
          target={portfolioData.resumeUrl ? "_blank" : undefined}
          rel={portfolioData.resumeUrl ? "noopener noreferrer" : undefined}
          onClick={handleResumeClick}
        >
          <span className="ic">
            <svg className="i">
              <use href="#i-file" />
            </svg>
          </span>
          Résumé<span className="arr">{portfolioData.resumeUrl ? '↓' : '↗'}</span>
        </a>
      </div>
    </section>
  );
};
