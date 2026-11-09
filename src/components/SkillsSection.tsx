import React, { useState } from 'react';
import { skillGroups, toolkitItems, SkillGroup, ToolItem } from '../data/skills';
import { playSfx } from '../utils/sfx';

export const SkillsSection: React.FC = () => {
  const [toolFilter, setToolFilter] = useState<'all' | 'design' | 'code' | 'ship'>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>(skillGroups[0].id);

  const filteredTools = toolkitItems.filter((tool: ToolItem) => {
    if (toolFilter === 'all') return true;
    return tool.category === toolFilter;
  });

  const activeSkillGroup = skillGroups.find(g => g.id === selectedGroup) || skillGroups[0];

  return (
    <section id="skills" data-ml-section="skills">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>Skills &amp; Toolkit</h2>
            <span className="aside">CAPABILITIES &amp; TECH STACK</span>
          </div>
        </div>
      </div>

      <div className="col pad">
        {/* Compact Toolkit Strip */}
        <div className="toolkit-wrap">
          <div className="toolkit-head">
            <span className="toolkit-label">Core Tools &amp; Technologies</span>
            <div className="tabs" role="tablist">
              {(['all', 'design', 'code', 'ship'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={toolFilter === tab ? 'on' : ''}
                  onClick={() => {
                    playSfx('click');
                    setToolFilter(tab);
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="toolkit-chips">
            {filteredTools.map((item: ToolItem) => (
              <div key={item.id} className="tool-chip" title={`${item.name} (${item.category})`}>
                <svg className="i">
                  <use href={item.iconValue} />
                </svg>
                <span>{item.name}</span>
                <span className="chip-cat">{item.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grouped Capabilities Architecture */}
        <div className="skills-architecture">
          <div className="skills-nav">
            <span className="skills-nav-label">Focus Areas ({skillGroups.length})</span>
            <div className="skills-tabs">
              {skillGroups.map((group: SkillGroup) => (
                <button
                  key={group.id}
                  type="button"
                  className={`skill-tab-btn ${selectedGroup === group.id ? 'active' : ''}`}
                  onClick={() => {
                    playSfx('click');
                    setSelectedGroup(group.id);
                  }}
                >
                  <span className="skill-tab-title">{group.title}</span>
                  <span className="skill-count">{group.skills.length}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="skills-details card">
            <div className="skills-details-head">
              <h3 className="skills-details-title">{activeSkillGroup.title}</h3>
              <p className="skills-details-desc">{activeSkillGroup.description}</p>
            </div>
            <div className="skills-tags-grid">
              {activeSkillGroup.skills.map((skill, idx) => (
                <span key={idx} className="skill-badge">
                  <span className="skill-bullet" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
