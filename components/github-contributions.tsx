"use client";

import { useEffect, useState } from "react";
import type { ContributionWeek } from "@/lib/github-calendar";

const levels = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];
type Calendar = { weeks: ContributionWeek[]; totalContributions: number; source?: string };

export function GitHubContributions() {
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("Unavailable");
      const data = await response.json();
      if (!Array.isArray(data.weeks) || !data.weeks.length || typeof data.totalContributions !== "number") throw new Error("Invalid calendar");
      setCalendar(data);
    }).catch(error => { if (error.name !== "AbortError") setFailed(true); });
    return () => controller.abort();
  }, []);

  if (failed) return <div className="github-fallback"><p>Activity is temporarily unavailable.</p><a href="https://github.com/lakshyakumar90" target="_blank" rel="noopener noreferrer">View activity on GitHub ↗</a></div>;
  if (!calendar) return <div className="github-loading" role="status">Loading GitHub activity…</div>;
  const days = calendar.weeks.flatMap(week => week.contributionDays);
  return <div className="github-activity">
    <div className="contribution-grid" role="img" aria-label={`${calendar.totalContributions} contributions over the last year. A calendar of daily GitHub activity.`} style={{ gridTemplateColumns: `repeat(${calendar.weeks.length}, minmax(0, 1fr))` }}>
      {calendar.weeks.map((week, index) => <div className="contribution-week" key={index}>{week.contributionDays.map(day => <span key={day.date} className={`contribution-cell contribution-level-${Math.max(0, levels.indexOf(day.contributionLevel))}`} style={{ gridRow: new Date(`${day.date}T00:00:00Z`).getUTCDay() + 1 }} title={`${day.date}: ${day.contributionCount} contributions`} />)}</div>)}
    </div>
    <div className="contribution-meta"><p><strong>{calendar.totalContributions.toLocaleString("en-US")}</strong> contributions in the last year</p><div className="contribution-legend" aria-label="Activity intensity from less to more"><span>Less</span>{levels.map((level, index) => <i key={level} className={`contribution-cell contribution-level-${index}`} />)}<span>More</span></div></div>
    <p className="contribution-source">{calendar.source === "public" ? "Public GitHub contribution data" : "GitHub contribution data"} · {days[0]?.date} — {days.at(-1)?.date}</p>
  </div>;
}
