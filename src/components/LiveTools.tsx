import React, { useState } from 'react';
import { liveTools, LiveTool } from '../data/projects';
import { playSfx } from '../utils/sfx';

export const LiveTools: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'framer' | 'web'>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredTools = liveTools.filter((tool) => {
    if (filter === 'all') return true;
    if (filter === 'web') return tool.category === 'web' || tool.tags.some(t => /web|react|next|cms/i.test(t));
    if (filter === 'ai') {
      return (
        tool.category === 'ai' ||
        tool.tags.some(t => /ai/i.test(t)) ||
        /ai/i.test(tool.description) ||
        /ai/i.test(tool.title)
      );
    }
    if (filter === 'framer') {
      return (
        tool.category === 'framer' ||
        tool.tags.some(t => /brand|figma|motion|ui/i.test(t)) ||
        /brand|identity|design/i.test(tool.description)
      );
    }
    return true;
  });

  const displayedTools = showAll ? filteredTools : filteredTools.slice(0, 4);

  return (
    <section id="tools" data-ml-section="tools">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>Live tools</h2>
            <div className="tabs" role="tablist" data-filter="toolGrid">
              {(['all', 'ai', 'framer', 'web'] as const).map((tab) => (
                <button
                  key={tab}
                  data-f={tab}
                  className={filter === tab ? 'on' : ''}
                  type="button"
                  onClick={() => {
                    playSfx('click');
                    setFilter(tab);
                  }}
                >
                  {tab === 'all' ? 'All' : tab.toUpperCase() === 'AI' ? 'AI' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col pad">
        <div className="grid" id="toolGrid">
          {displayedTools.map((tool: LiveTool) => (
            <a
              key={tool.id}
              className="card rv in"
              href={tool.link || '#ux'}
              target={tool.link ? "_blank" : undefined}
              rel={tool.link ? "noopener noreferrer" : undefined}
              data-cat={tool.category}
              data-cursor-label={tool.link ? "click to open live project ↗" : "view case study details ↓"}
              onClick={(e) => {
                if (!tool.link) {
                  // If no external URL, smoothly scroll to Case Studies section
                  e.preventDefault();
                  const target = document.getElementById('ux');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              <div className="shot">
                <span className="pill l">
                  <span className="gdot" />
                  {tool.statusBadge}
                </span>
                <span className="pill r">{tool.pillRight}</span>

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
                    src={tool.image}
                    alt={tool.title}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="cb">
                <div className="ct">
                  <h3>{tool.title}</h3>
                  <span className="yr">{tool.yearOrDomain}</span>
                </div>
                <p>{tool.description}</p>
                <div className="cfoot">
                  <div className="cfoot-in">
                    <div className="tags">
                      {tool.tags.map((tag, idx) => (
                        <span key={idx} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <svg className="i cgo">
                      <use href="#i-ext" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}

          {displayedTools.length === 0 && (
            <div className="empty">No live tools found in this category.</div>
          )}
        </div>

        {filteredTools.length > 4 && (
          <div className="more">
            <button
              className="btn"
              type="button"
              id="moreTools"
              onClick={() => {
                playSfx('click');
                setShowAll(!showAll);
              }}
            >
              {showAll ? 'Show fewer live tools ↑' : `Show all live tools (${filteredTools.length}) ↓`}
              <svg className="i" style={{ width: '13px', height: '13px' }}>
                <use href="#i-arrow" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
