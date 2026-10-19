import { test } from "node:test";
import assert from "node:assert/strict";
import { parsePublicCalendar } from "../lib/github-calendar";

test("public calendar uses the actual date, tooltip count, and intensity", () => {
  const cells = Array.from({ length: 7 }, (_, i) => `<td data-date="2026-01-${String(i + 4).padStart(2, "0")}" id="day-${i}" data-level="${i % 5}"></td><tool-tip for="day-${i}">${i ? `${i} contributions` : "No contributions"} on a day.</tool-tip>`).reverse().join("");
  const calendar = parsePublicCalendar(cells);
  assert.equal(calendar.totalContributions, 21);
  assert.equal(calendar.source, "public");
  assert.equal(calendar.weeks.length, 1);
  assert.equal(calendar.weeks[0].contributionDays[0].date, "2026-01-04");
  assert.equal(calendar.weeks[0].contributionDays[4].contributionLevel, "FOURTH_QUARTILE");
  assert.equal(calendar.weeks[0].contributionDays[0].contributionCount, 0);
});

test("missing or changed upstream markup never produces fabricated activity", () => {
  assert.throws(() => parsePublicCalendar("<html>Temporarily unavailable</html>"), /unavailable/);
  assert.throws(() => parsePublicCalendar('<td data-date="2026-01-04" id="day-0" data-level="4"></td>'), /unavailable/);
});
