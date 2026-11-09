import React, { useState } from 'react';
import { education, EducationItem } from '../data/education';
import { certifications, internships, Certification, InternshipItem } from '../data/certifications';
import { playSfx } from '../utils/sfx';

export const EducationCertifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'certifications' | 'internships'>('education');

  return (
    <section id="education" data-ml-section="education">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>Education &amp; Credentials</h2>
            <div className="tabs" role="tablist">
              <button
                type="button"
                className={activeTab === 'education' ? 'on' : ''}
                onClick={() => {
                  playSfx('click');
                  setActiveTab('education');
                }}
              >
                Education ({education.length})
              </button>
              <button
                type="button"
                className={activeTab === 'certifications' ? 'on' : ''}
                onClick={() => {
                  playSfx('click');
                  setActiveTab('certifications');
                }}
              >
                Certifications ({certifications.length})
              </button>
              <button
                type="button"
                className={activeTab === 'internships' ? 'on' : ''}
                onClick={() => {
                  playSfx('click');
                  setActiveTab('internships');
                }}
              >
                Internships ({internships.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col pad">
        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="edu-list">
            {education.map((item: EducationItem) => (
              <div key={item.id} className="edu-item card rv in">
                <div className="edu-top">
                  <div>
                    <h3 className="edu-title">{item.qualification}</h3>
                    <div className="edu-inst">
                      <span>{item.institution}</span>
                      {item.boardOrUniversity && (
                        <>
                          <span className="sep">·</span>
                          <span className="board">{item.boardOrUniversity}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="edu-right">
                    <span className="pill n">{item.period}</span>
                    {item.result && <span className="pill g">{item.result}</span>}
                  </div>
                </div>
                <div className="edu-loc">
                  <svg className="i" style={{ width: '12px', height: '12px' }}>
                    <use href="#i-pin" />
                  </svg>
                  <span>{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="cert-grid">
            {certifications.map((cert: Certification) => (
              <div key={cert.id} className="cert-item card rv in">
                <div className="cert-head">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date">{cert.issued}</span>
                </div>
                <h4 className="cert-name">{cert.name}</h4>
                {cert.notes && (
                  <p className="cert-notes">{cert.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Internships Tab */}
        {activeTab === 'internships' && (
          <div className="intern-list">
            {internships.map((intern: InternshipItem) => (
              <div key={intern.id} className="intern-item card rv in">
                <div className="intern-top">
                  <div>
                    <h3 className="intern-role">{intern.role}</h3>
                    <div className="intern-org">
                      <span>{intern.organization}</span>
                    </div>
                  </div>
                  <span className="pill n">{intern.duration}</span>
                </div>
                <ul className="exp-bullet-list" style={{ marginTop: '10px' }}>
                  {intern.highlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
                {intern.notes && (
                  <div className="intern-note-box">
                    <span className="aside">{intern.notes}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
