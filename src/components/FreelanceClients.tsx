import React from 'react';
import { freelanceClients, FreelanceClient } from '../data/freelanceClients';

export const FreelanceClients: React.FC = () => {
  return (
    <section id="clients" data-ml-section="clients">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>Freelance Clients</h2>
            <span className="aside">INDEPENDENT ENGAGEMENTS · 2025</span>
          </div>
        </div>
      </div>

      <div className="col pad">
        <p className="clients-intro">
          Selected independent client engagements delivered across visual identity, marketing creatives, campaign assets, and video production during freelance practice in 2025.
        </p>

        <div className="clients-grid">
          {freelanceClients.map((client: FreelanceClient) => (
            <div key={client.id} className="client-card rv in">
              <div className="client-top">
                <div className="client-avatar">
                  <span>{client.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <div className="client-info">
                  <h3 className="client-name">{client.name}</h3>
                  <span className="client-period">{client.period}</span>
                </div>
              </div>

              <div className="client-deliverables">
                <span className="client-lbl">Confirmed deliverables:</span>
                <div className="tags">
                  {client.confirmedDeliverables.map((deliv, idx) => (
                    <span key={idx} className="tag tag-client">
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="client-badge">
                <span className="pill n">Independent client</span>
              </div>
            </div>
          ))}
        </div>

        <div className="client-attribution-note">
          <svg className="i" style={{ width: '13px', height: '13px', flexShrink: 0 }}>
            <use href="#i-check" />
          </svg>
          <span>
            Deliverables recorded from verified project files. Work samples and campaign metrics will be added upon client clearance.
          </span>
        </div>
      </div>
    </section>
  );
};
