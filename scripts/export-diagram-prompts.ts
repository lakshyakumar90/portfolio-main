import { mkdirSync, writeFileSync } from 'node:fs';
import { projectDiagrams } from '../lib/project-diagrams';
const names: Record<string,string> = { 'ai-teammates': 'AI Teammates', excalidraw: 'Excalidraw', habitly: 'Habitly', 'aurora-ui': 'Aurora UI', devconnect: 'DevConnect' };
const jobs = Object.entries(projectDiagrams).flatMap(([slug, diagrams]) => diagrams.map(d => {
  const reference = d.id === 'architecture' ? '1' : d.id === 'workflow' ? '2' : '3';
  return {
    slug, id: d.id,
    reference: `C:\\Users\\laksh\\Downloads\\diagrams\\ai-teammates\\${reference}.png`,
    prompt: `Use case: infographic-diagram. Create ONE finished raster diagram image for ${names[slug]}: ${d.heading}. The attached image is a STYLE REFERENCE ONLY, not an edit target. Keep its Excalidraw-like handwritten layout and line style, but INVERT THE PALETTE consistently: solid dark charcoal-gray background (#202124), unfilled rectangular boxes on the same charcoal background outlined with thin off-white (#F1F3F4) hand-drawn strokes, casual bold off-white handwritten lettering similar to Virgil, and thin off-white directional arrows. Every line, label and arrowhead must be light on dark. Match this exact palette across the whole series. Do not use the white background or black lettering of the reference. Decision nodes use diamonds. No icons, logos, accent colors, gradients, shadows, decorative elements, page title, or watermark. No light rectangular panels and no black text. This image will be displayed inside a narrow portfolio page, so use LARGE clear lettering, few words per line, generous spacing, wide boxes and balanced compact composition. Aim for a crisp high-resolution landscape 4:3 image with consistent typography, line weight, and dark background across all images. Keep every label accurate and every arrow direction correct. The reference is for style and diagram conventions only. Use exactly the current project graph below, even when the project itself is AI Teammates. Use only the ${names[slug]} graph below. Arrange nodes to avoid crossed arrows and overlapping labels; logical topology takes precedence over exact node positions. All boxes, arrowheads and labels must stay inside the frame with comfortable margins.
EXACT NODE TEXT (title, then smaller parenthesized detail; adjust line breaks for readability):
${d.nodes.map(n => `${n.id}: "${n.title}" ("${n.detail}")${n.kind === 'decision' ? ' [DECISION DIAMOND]' : ''}`).join('\n')}
EXACT CONNECTIONS (draw directed arrows with these labels; dashed where stated):
${d.edges.map(e => `${e.from} ${e.bidirectional ? '<->' : '->'} ${e.to}: "${e.label}"${e.dashed ? ' [dashed arrow]' : ''}`).join('\n')}
Context for semantic accuracy only; do not print this paragraph: ${d.caption}
Deliver one complete diagram image, not a contact sheet or multiple panels.`
  };
}));
mkdirSync('docs/diagrams', {recursive:true});
writeFileSync('docs/diagrams/generation-prompts.json', JSON.stringify(jobs, null, 2));
console.log(`Prepared ${jobs.length} image prompts.`);

