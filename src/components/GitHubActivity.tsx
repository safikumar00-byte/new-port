import React, { useMemo } from 'react';
import { githubData } from '../data/github';
import { portfolioData } from '../data/portfolio';

export const GitHubActivity: React.FC = () => {
  const hasCounts = githubData.counts && githubData.counts.length > 0;

  const { weeks, monthLabels, totalContributions } = useMemo(() => {
    if (!hasCounts || !githubData.start) {
      return { weeks: [], monthLabels: [], totalContributions: 0 };
    }

    const startDate = new Date(githubData.start + 'T00:00:00Z');
    const counts = githubData.counts;
    let sum = 0;

    const nonZero = counts.filter(Boolean).sort((a, b) => a - b);
    const q1 = nonZero[Math.floor(0.25 * nonZero.length)] || 1;
    const q2 = nonZero[Math.floor(0.5 * nonZero.length)] || 3;
    const q3 = nonZero[Math.floor(0.75 * nonZero.length)] || 7;

    const daysList: Array<{
      date: string;
      count: number;
      level: number;
    }> = [];

    counts.forEach((c, i) => {
      sum += c;
      const d = new Date(startDate.getTime() + i * 86400000);
      let level = 0;
      if (c > 0) {
        if (c >= q3) level = 4;
        else if (c >= q2) level = 3;
        else if (c >= q1) level = 2;
        else level = 1;
      }
      daysList.push({
        date: d.toISOString().slice(0, 10),
        count: c,
        level
      });
    });

    const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const months: Array<{ name: string; left: number }> = [];
    let lastMonth = -1;

    const padDays = startDate.getUTCDay();
    const stride = 13;
    const colsCount = Math.ceil((counts.length + padDays) / 7);

    for (let w = 0; w < colsCount; w++) {
      const dayIdx = w * 7 - padDays;
      if (dayIdx >= 0 && dayIdx < counts.length) {
        const d = new Date(startDate.getTime() + dayIdx * 86400000);
        const m = d.getUTCMonth();
        if (m !== lastMonth && d.getUTCDate() <= 14) {
          lastMonth = m;
          months.push({ name: MON[m], left: w * stride });
        }
      }
    }

    return {
      weeks: daysList,
      monthLabels: months,
      totalContributions: sum
    };
  }, [hasCounts]);

  return (
    <section id="github" data-ml-section="github">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>GitHub activity</h2>
            <span className="aside" id="ghTotal">
              {hasCounts
                ? `${totalContributions} contributions in the last year`
                : `Profile: @${githubData.username}`}
            </span>
          </div>
        </div>
      </div>

      <div className="col pad">
        {hasCounts ? (
          <div className="gh-scroll" id="ghScroll">
            <div className="gh-chart">
              <div className="gh-months" id="ghMonths" aria-hidden="true">
                {monthLabels.map((m, idx) => (
                  <span key={idx} style={{ left: `${m.left}px` }}>
                    {m.name}
                  </span>
                ))}
              </div>

              <div className="gh-gridwrap">
                <div className="gh-grid" id="ghGrid" role="img" aria-label="GitHub contribution calendar">
                  {weeks.map((day, idx) => (
                    <i
                      key={idx}
                      className={`l${day.level}`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              </div>

              <div className="gh-foot">
                <span className="aside">@{githubData.username}</span>
                <div className="gh-legend" aria-hidden="true">
                  <span className="aside">Less</span>
                  <i className="l0" />
                  <i className="l1" />
                  <i className="l2" />
                  <i className="l3" />
                  <i className="l4" />
                  <span className="aside">More</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card rv in gh-profile-card">
            <div className="gh-profile-top">
              <div className="gh-profile-left">
                <div className="gh-profile-avatar">
                  <svg className="i" style={{ width: '22px', height: '22px' }}>
                    <use href="#gh" />
                  </svg>
                </div>
                <div>
                  <h3 className="gh-username">@{githubData.username}</h3>
                  <span className="gh-status-note">
                    Verified GitHub Identity · Live Activity Sync Pending
                  </span>
                </div>
              </div>

              <a
                href={portfolioData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
              >
                <span>View GitHub Profile ↗</span>
              </a>
            </div>

            <div className="gh-tech-stack">
              <span className="gh-tech-lbl">Public repositories &amp; technical contributions:</span>
              <div className="tags" style={{ marginTop: '6px' }}>
                <span className="tag">TypeScript</span>
                <span className="tag">Next.js</span>
                <span className="tag">React Native</span>
                <span className="tag">Tailwind CSS</span>
                <span className="tag">Supabase</span>
                <span className="tag">REST APIs</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
