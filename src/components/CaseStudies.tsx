import React, { useState } from 'react';
import { caseStudies, CaseStudy } from '../data/caseStudies';
import { playSfx } from '../utils/sfx';

export const CaseStudies: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    playSfx('click');
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="work" data-ml-section="work">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>UX Case Studies</h2>
            <span className="aside">SELECTED WORK · 2023 — 2026</span>
          </div>
        </div>
      </div>

      <div className="col pad">
        <div className="grid">
          {caseStudies.map((study: CaseStudy) => {
            const isExpanded = expandedId === study.id;
            return (
              <div
                key={study.id}
                className={`card ${study.featured ? 'wide' : ''} rv in ${isExpanded ? 'expanded' : ''}`}
                data-cursor-label={isExpanded ? "collapse case study" : "view deep case study"}
              >
                <div className="shot">
                  <span className="pill n">{study.pillLeft}</span>
                  <span className="pill r">{study.pillRight}</span>

                  {/* Viewfinder overlay */}
                  <div className="vf" aria-hidden="true">
                    <i /><i /><i /><i />
                    <span className="rec">
                      <b />REC
                    </span>
                    <span className="iso">ISO 400</span>
                  </div>

                  <div className="frame">
                    <img
                      src={study.image}
                      alt={study.title}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="cb">
                  <div className="ct">
                    <h3>{study.title}</h3>
                    <span className="yr">{study.year}</span>
                  </div>
                  <p>{study.description}</p>

                  <div className="cfoot">
                    <div className="cfoot-in">
                      <div className="tags">
                        {study.tags.map((tag, idx) => (
                          <span key={idx} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="study-actions">
                        {study.link && (
                          <a
                            href={study.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="study-link-btn"
                            title="Open live site ↗"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="i" style={{ width: '13px', height: '13px' }}>
                              <use href="#i-ext" />
                            </svg>
                          </a>
                        )}

                        <button
                          type="button"
                          className="btn btn-sm study-toggle-btn"
                          onClick={(e) => toggleExpand(study.id, e)}
                        >
                          {isExpanded ? 'Overview ↑' : 'Case Details ↓'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Deep Case Study Detail View */}
                  {isExpanded && (
                    <div className="case-study-drawer">
                      <div className="cs-meta-grid">
                        <div className="cs-meta-col">
                          <span className="cs-lbl">Role:</span>
                          <span className="cs-val">{study.role}</span>
                        </div>
                        <div className="cs-meta-col">
                          <span className="cs-lbl">Context:</span>
                          <span className="cs-val">{study.context}</span>
                        </div>
                      </div>

                      <div className="cs-block">
                        <span className="cs-lbl">The Challenge:</span>
                        <p className="cs-txt">{study.challenge}</p>
                      </div>

                      <div className="cs-block">
                        <span className="cs-lbl">Approach &amp; Methodology:</span>
                        <ul className="cs-list">
                          {study.approach.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="cs-block">
                        <span className="cs-lbl">Key Deliverables:</span>
                        <div className="tags">
                          {study.deliverables.map((item, idx) => (
                            <span key={idx} className="tag tag-client">{item}</span>
                          ))}
                        </div>
                      </div>

                      {study.technology && (
                        <div className="cs-block">
                          <span className="cs-lbl">Technologies Used:</span>
                          <div className="tags">
                            {study.technology.map((tech, idx) => (
                              <span key={idx} className="tag">{tech}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="cs-attribution-box">
                        <span className="cs-lbl" style={{ color: 'var(--amber)' }}>Attribution &amp; Scope:</span>
                        <p className="cs-attribution-txt">{study.attribution}</p>
                        {study.statusNote && (
                          <p className="cs-status-note">Note: {study.statusNote}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
