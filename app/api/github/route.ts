import { NextResponse } from "next/server";
import { parsePublicCalendar } from "@/lib/github-calendar";

export async function GET() {
  const login = process.env.GITHUB_USERNAME || "lakshyakumar90";
  if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(login)) return NextResponse.json({ error: "Invalid GitHub username" }, { status: 400 });
  try {
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      const to = new Date();
      const from = new Date(to);
      from.setUTCFullYear(to.getUTCFullYear() - 1);
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ query: "query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}", variables: { login, from: from.toISOString(), to: to.toISOString() } }),
        signal: AbortSignal.timeout(10000), next: { revalidate: 3600 },
      });
      if (response.ok) {
        const data = await response.json();
        const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) return NextResponse.json({ ...calendar, source: "api" }, { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } });
      }
    }
    const response = await fetch(`https://github.com/users/${login}/contributions`, { headers: { Accept: "text/html" }, signal: AbortSignal.timeout(10000), next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("GitHub unavailable");
    return NextResponse.json(parsePublicCalendar(await response.text()), { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } });
  } catch {
    return NextResponse.json({ error: "GitHub activity is temporarily unavailable." }, { status: 503 });
  }
}
