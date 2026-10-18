# Lakshya Kumar — portfolio

Next.js portfolio with a shared, typed project catalog.

## Development and checks

- `npm run dev` — local development
- `npm run build` — production build
- `npx tsc --noEmit` — explicit type check (the build currently skips type errors)
- `npx tsc --project tsconfig.projects.json --noEmit` — type-check the showcase and its imported dependencies independently of unused legacy UI components
- `npm run test:projects` — project catalog and media rendering tests
- `npm run test:habitly` — existing account-deletion regression tests

If a development server is running, set `PORTFOLIO_BUILD_DIR=.next-showcase` in the build process to isolate production verification from its `.next` files. Use the same environment variable when starting that build. Normal development/build commands still default to `.next`.

## Editing projects

`lib/projects.ts` owns card summaries, case studies, stacks, GitHub/live links, and all media. Home uses the explicit `featuredProjectSlugs` list. `/projects` lists the complete catalog in array order.

Every project has a `media` array. Add, remove, or reorder as many entries as needed, including multiple diagrams, images, and videos in any order. Each entry needs a unique `id` within its project. Omit screenshots/videos until real media is available; no placeholders are required. `cover` is optional and independent of detail media.

```ts
media: [
  {
    id: "architecture", type: "diagram", heading: "Architectural Diagram",
    caption: "How requests move through the system.",
    nodes: [
      { id: "client", title: "Client", detail: "Browser application", column: 1, row: 0, kind: "interface" },
      { id: "api", title: "API", detail: "Application server", column: 1, row: 1 },
    ],
    edges: [{ from: "client", to: "api", label: "HTTP request" }],
    notes: ["A brief implementation note."],
  },
  {
    id: "dashboard", type: "image", src: "https://your-host.com/dashboard.png",
    alt: "Dashboard showing project activity", heading: "Dashboard",
    caption: "An overview of current activity.", width: 1440, height: 900,
  },
  {
    id: "walkthrough", type: "video", src: "https://your-host.com/demo.mp4",
    poster: "https://your-host.com/poster.png", heading: "Walkthrough",
    caption: "A demonstration of the main workflow.",
    captionTrack: { src: "/captions/demo.vtt", language: "en", label: "English" },
  },
]
```

Use direct HTTPS image/video file URLs or local paths under `public/`; YouTube watch pages and other embed pages are not direct video files. External captions need appropriate cross-origin access. Use captions/transcripts for spoken demos. Optional image dimensions help avoid layout shifts. Failed assets show a readable fallback while keeping their heading and caption. Diagrams fit the original content column with no internal scrolling. Narrow screens use a vertical graph with numbered connections and a matching connection key; larger screens use the compact multi-column graph. An expandable text alternative is also available. Each graph can be opened or downloaded as SVG.

`live` is optional. Use `{ href: "/habitly", label: "Project website" }` for an internal product page or an HTTPS URL for an external live app. Omit unavailable destinations. Existing Stream asset files are retained but Stream is no longer part of the showcase.

Existing Habitly support pages and account-deletion APIs are separate from the project showcase.


## Project diagrams

`lib/project-diagrams.ts` contains three diagrams per project: tech-stack architecture, workflow, and a feature deep dive. `lib/projects.ts` includes these entries in the ordered media arrays. `lib/diagram-svg.ts` renders the same typed graph for inline previews and SVG exports; no diagram runtime or bitmap assets are required.

Nodes have unique IDs, a column (0–2), a non-negative row, title, detail, and optional kind (`interface`, `process`, `storage`, `external`, `decision`). Edges reference node IDs and carry a connection label; `dashed: true` marks a conditional/supporting path. Keep one node per grid cell. The renderer validates references, placement, and text length instead of silently clipping labels.

SVG exports are available at `/projects/{slug}/diagrams/{id}.svg`. Text is escaped, the response uses an SVG content type and restrictive content security policy, and unknown project/diagram IDs return 404. The downloadable SVG follows system color preference; inline diagrams follow the portfolio theme.
