export type ContributionDay = { date: string; contributionCount: number; contributionLevel: string };
export type ContributionWeek = { contributionDays: ContributionDay[] };
const levels = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];

/** Parse public contribution data; never substitute an invented activity calendar. */
export function parsePublicCalendar(html: string) {
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = match[1].match(/\bfor="([^"]+)"/)?.[1];
    if (id) counts.set(id, Number((match[2].match(/([\d,]+) contributions?/)?.[1] ?? "0").replaceAll(",", "")));
  }
  const days = new Map<string, ContributionDay>();
  for (const match of html.matchAll(/<td\b[^>]*\bdata-date="\d{4}-\d{2}-\d{2}"[^>]*>/g)) {
    const date = match[0].match(/\bdata-date="([^"]+)"/)?.[1];
    const id = match[0].match(/\bid="([^"]+)"/)?.[1];
    const level = Number(match[0].match(/\bdata-level="(\d)"/)?.[1] ?? 0);
    if (date && id && counts.has(id)) days.set(date, { date, contributionCount: counts.get(id)!, contributionLevel: levels[level] ?? "NONE" });
  }
  if (days.size < 7) throw new Error("Public GitHub calendar is unavailable");
  const weeks: ContributionWeek[] = [];
  for (const day of [...days.values()].sort((a, b) => a.date.localeCompare(b.date))) {
    if (!weeks.length || new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0) weeks.push({ contributionDays: [] });
    weeks.at(-1)!.contributionDays.push(day);
  }
  return { totalContributions: [...days.values()].reduce((total, day) => total + day.contributionCount, 0), weeks, source: "public" };
}
