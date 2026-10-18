# Screenshots and videos

Screenshots live in `public/project-images/<project-slug>/`. Walkthroughs live in `public/project-videos/`. Original files and orientations are preserved.

`lib/project-assets.json` records ordered sources, captions, accessible descriptions, and native dimensions. `lib/projects.ts` uses these assets for card covers and detail galleries, followed by each project's diagrams. Edit the manifest to customize labels or ordering. To regenerate it after adding files, run `node scripts/index-project-media.mjs` (requires ffprobe for video metadata).

Habitly screenshots and its portrait video display at a maximum width of 360px and shrink to fit narrow screens. Landscape media uses the existing page column. All media retains its own aspect ratio, without cropping or forced landscape frames. Videos use native controls, metadata preload, and no autoplay.
