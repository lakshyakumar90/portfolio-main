# Portfolio visual system

## Direction

An editorial developer portfolio: a wider home reading column, calm neutral surfaces, serif headings, a readable sans-serif body, and generous vertical rhythm. Inspired by the typography, whitespace, and section hierarchy of https://palakonweb.in/, while keeping Lakshya's content, projects, photography, and light/dark themes.

## Typography and space

- Home and shared navigation: Inter for body text and controls; Instrument Serif for home headings and the wordmark.
- Project listing and detail content retain their established Bricolage Grotesque typography, card layouts, media aspect ratios, and content widths.
- Home outer column: 880px maximum, with 44px interior space on desktop and 18–22px page gutters on mobile.
- Home body: 14–15px with generous line height; section headings: 30–34px; name: 46–68px.
- Section spacing: 44px vertically on desktop, 32px on mobile. Separate sections with a thin neutral rule.

## Surfaces and interactions

- Warm paper light surface and charcoal dark surface; muted terracotta accents and sage contribution cells.
- Fixed top navigation and bottom dock are shared across all routes. Reserve space for both, account for device safe areas, and keep anchors below the header.
- Static wrapping tech pills; no marquee, carousel, or drag affordance.
- Experience uses a native keyboard-accessible disclosure. Education and certifications remain available in a separate disclosure.
- Home order: introduction, experience and credentials, tech stack, featured projects, GitHub activity, external links, and contact options.
- Contact offers email, a meeting link, and LinkedIn; no contact form.
- Loading is a real route-loading skeleton, with a short home entrance and reduced-motion bypass. Content is never held behind an artificial delay.
- Preserve all project screenshot, video, diagram, and full-screen viewer behavior.

## Data integrity

GitHub activity uses the authenticated API when a server token is available, otherwise GitHub's public contribution calendar. Unavailable data shows an honest fallback and a profile link. Never fabricate cells or activity counts.
