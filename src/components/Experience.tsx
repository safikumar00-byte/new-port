import React, { useState } from 'react';
import { experiences, additionalExperience, ExperienceItem } from '../data/experiences';
import { playSfx } from '../utils/sfx';

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAdditional, setShowAdditional] = useState<boolean>(false);

  const toggleExpand = (id: string) => {
    playSfx('click');
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="experience" data-ml-section="experience">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>Experience</h2>
            <span className="aside">EMPLOYMENT &amp; INDEPENDENT PRACTICE</span>
          </div>
        </div>
      </div>

      <div className="col pad">
        <div className="exp-timeline">
          {experiences.map((exp: ExperienceItem) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div key={exp.id} className="exp-card rv in">
                <div className="exp-top">
                  <div className="exp-meta">
                    <div className="exp-badges">
                      <span className={`pill ${exp.type === 'employment' ? 'l' : 'n'}`}>
                        {exp.type === 'employment' ? 'Employment' : 'Independent'}
                      </span>
                      {exp.period.includes('Present') && (
                        <span className="pill g">Current</span>
                      )}
                    </div>
                    <span className="exp-period">{exp.period}</span>
                  </div>

                  <div className="exp-title-row">
                    <div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <div className="exp-company">
                        <span>{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="sep">·</span>
                            <span className="loc">{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="exp-desc">{exp.description}</p>

                {/* Highlights toggle */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="exp-highlights-wrap">
                    <button
                      type="button"
                      className="exp-toggle-btn"
                      onClick={() => toggleExpand(exp.id)}
                      aria-expanded={isExpanded}
                    >
                      <span>
                        {isExpanded
                          ? 'Hide key responsibilities ↑'
                          : `View key responsibilities (${exp.highlights.length}) ↓`}
                      </span>
                    </button>

                    {isExpanded && (
                      <ul className="exp-bullet-list">
                        {exp.highlights.map((hl, i) => (
                          <li key={i}>{hl}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Tools footer */}
                {exp.tools && exp.tools.length > 0 && (
                  <div className="cfoot" style={{ marginTop: '16px' }}>
                    <div className="cfoot-in">
                      <div className="tags">
                        {exp.tools.map((tool, idx) => (
                          <span key={idx} className="tag">{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Experience Accordion */}
        <div className="additional-exp-section">
          <div className="additional-header">
            <div>
              <span className="sub-title">Foundational Operations</span>
              <span className="aside" style={{ marginLeft: '12px' }}>ADDITIONAL EXPERIENCE</span>
            </div>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                playSfx('click');
                setShowAdditional(!showAdditional);
              }}
            >
              {showAdditional ? 'Hide operations record ↑' : 'Show foundational operations ↓'}
            </button>
          </div>

          {showAdditional && (
            <div className="additional-body">
              {additionalExperience.map((item: ExperienceItem) => (
                <div key={item.id} className="exp-card additional-card">
                  <div className="exp-top">
                    <div className="exp-meta">
                      <span className="pill n">Operational exposure</span>
                      <span className="exp-period" style={{ color: 'var(--amber)' }}>
                        {item.period}
                      </span>
                    </div>
                    <div className="exp-title-row">
                      <div>
                        <h3 className="exp-role">{item.role}</h3>
                        <div className="exp-company">
                          <span>{item.company}</span>
                          <span className="sep">·</span>
                          <span className="loc">{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="exp-desc">{item.description}</p>
                  <ul className="exp-bullet-list" style={{ marginTop: '12px' }}>
                    {item.highlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                  {item.tools && (
                    <div className="tags" style={{ marginTop: '12px' }}>
                      {item.tools.map((t, i) => (
                        <span key={i} className="tag">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
