# Project diagram images

All 15 PNGs were generated using the built-in image generation tool. Each project has architecture, workflow, and feature diagrams with charcoal backgrounds and off-white handwritten labels and arrows, following the supplied AI Teammates references.

- Final assets: `public/diagrams/<project-slug>/<diagram-id>.png`.
- Exact generation prompts: `generation-prompts.json`.
- Selected original outputs and targeted correction prompts: `generated-assets.json`.
- Image paths and intrinsic dimensions: `lib/diagram-images.json`; refresh with `node scripts/index-diagram-images.mjs` after replacing an asset.
- Semantic graph descriptions: `lib/project-diagrams.ts`. Keep these synchronized with image changes; they power accessible text and optional SVG exports.

The gallery displays unframed images at their natural aspect ratio within the existing column, without horizontal scrolling. Clicking an image opens a full-screen dialog; Escape or Close dismisses it and returns keyboard focus. Headings, captions, load-failure messages, direct image links, PNG downloads, and text alternatives remain available. Images keep the same dark palette in both portfolio themes.
