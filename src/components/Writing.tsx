import React from 'react';
import { articles, Article } from '../data/articles';
import { portfolioData } from '../data/portfolio';

export const Writing: React.FC = () => {
  return (
    <section id="writing" data-ml-section="writing">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>Writing</h2>
            <span className="aside">ARTICLES &amp; CASE NOTES</span>
          </div>
        </div>
      </div>

      <div className="col pad">
        {articles.length > 0 ? (
          articles.map((article: Article) => (
            <a
              key={article.id}
              className="post rv in"
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="read article ↗"
            >
              <span className="ptags">{article.category}</span>
              <div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
              <svg className="i pgo">
                <use href="#i-ext" />
              </svg>
            </a>
          ))
        ) : (
          <div className="card rv in writing-placeholder-card">
            <div className="writing-placeholder-top">
              <span className="pill l">In Preparation</span>
              <span className="aside">2026</span>
            </div>
            <h3 className="writing-placeholder-title">
              Technical Writing &amp; Interface Case Notes
            </h3>
            <p className="writing-placeholder-desc">
              Articles examining design systems, visual storytelling, frontend architectures, and AI-assisted workflows are currently in preparation.
            </p>
            <div style={{ marginTop: '12px' }}>
              <a
                href={portfolioData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Follow updates on LinkedIn</span>
                <svg className="i" style={{ width: '12px', height: '12px' }}>
                  <use href="#i-ext" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
