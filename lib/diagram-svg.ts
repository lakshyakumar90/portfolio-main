import type { DiagramNode, ProjectDiagram } from "./project-diagrams";

const WIDTH = 880;
const NODE_WIDTH = 224;
const NODE_HEIGHT = 120;
const COLUMN_STEP = 272;
const ROW_STEP = 208;

const escape = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[character]!));
function wrap(text: string, length: number) {
  const lines: string[] = [];
  for (const word of text.split(/\s+/)) {
    if (!lines.length || lines[lines.length - 1].length + word.length + 1 > length) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  return lines;
}


export function validateDiagram(diagram: ProjectDiagram) {
  if (!diagram.nodes.length) throw new Error(`Empty diagram: ${diagram.id}`);
  const ids = new Set<string>();
  const cells = new Set<string>();
  for (const node of diagram.nodes) {
    if (ids.has(node.id)) throw new Error(`Duplicate diagram node: ${node.id}`);
    if (!Number.isInteger(node.row) || node.row < 0 || ![0, 1, 2].includes(node.column)) throw new Error(`Invalid diagram position: ${node.id}`);
    if (cells.has(`${node.row}:${node.column}`)) throw new Error(`Overlapping diagram node: ${node.id}`);
    if (wrap(node.title, 22).length > 2 || wrap(node.detail, 28).length > 3) throw new Error(`Diagram text is too long: ${node.id}`);
    ids.add(node.id);
    cells.add(`${node.row}:${node.column}`);
  }
  for (const edge of diagram.edges) {
    if (!ids.has(edge.from) || !ids.has(edge.to)) throw new Error(`Unknown diagram endpoint: ${edge.from} → ${edge.to}`);
  }
}

export function renderDiagramSvg(diagram: ProjectDiagram, namespace = diagram.id, compact = false): string {
  validateDiagram(diagram);
  const identifier = `diagram-${namespace.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  const orderedNodes = [...diagram.nodes].sort((a, b) => a.row - b.row || a.column - b.column);
  const nodeWidth = compact ? 248 : NODE_WIDTH;
  const width = compact ? 360 : WIDTH;
  const position = (node: DiagramNode) => ({
    x: compact ? 56 : 56 + node.column * COLUMN_STEP,
    y: 52 + (compact ? orderedNodes.findIndex(item => item.id === node.id) : node.row) * ROW_STEP,
  });
  const height = (compact ? orderedNodes.length - 1 : Math.max(...diagram.nodes.map(node => node.row))) * ROW_STEP + NODE_HEIGHT + 104;
  const nodes = new Map(diagram.nodes.map((node) => [node.id, node]));
  const lines = diagram.edges.map((edge, index) => {
    const source = nodes.get(edge.from)!;
    const target = nodes.get(edge.to)!;
    const a = position(source);
    const b = position(target);
    let path: string;
    let labelX: number;
    let labelY: number;
    if (compact) {
      const sy = a.y + NODE_HEIGHT / 2;
      const ty = b.y + NODE_HEIGHT / 2;
      const adjacent = Math.abs(orderedNodes.indexOf(source) - orderedNodes.indexOf(target)) === 1;
      if (adjacent) {
        const down = ty > sy;
        const sx = a.x + nodeWidth / 2;
        path = `M ${sx} ${down ? a.y + NODE_HEIGHT : a.y} V ${down ? b.y : b.y + NODE_HEIGHT}`;
        labelX = sx;
        labelY = (down ? a.y + NODE_HEIGHT + b.y : a.y + b.y + NODE_HEIGHT) / 2;
      } else {
        const rail = 15 + (index % 4) * 9;
        path = `M ${a.x} ${sy} H ${rail} V ${ty} H ${b.x}`;
        labelX = rail;
        labelY = (sy + ty) / 2;
      }
    } else if (source.row === target.row) {
      const right = b.x > a.x;
      const sx = right ? a.x + nodeWidth : a.x;
      const tx = right ? b.x : b.x + nodeWidth;
      const y = a.y + NODE_HEIGHT / 2;
      path = `M ${sx} ${y} H ${tx}`;
      labelX = (sx + tx) / 2;
      labelY = y - 16;
    } else if (source.column === target.column && Math.abs(source.row - target.row) > 1) {
      const rail = a.x - 28 - (index % 3) * 8;
      const sy = a.y + NODE_HEIGHT / 2;
      const ty = b.y + NODE_HEIGHT / 2;
      path = `M ${a.x} ${sy} H ${rail} V ${ty} H ${b.x}`;
      labelX = rail;
      labelY = (sy + ty) / 2 + (source.column - 1) * 14;
    } else {
      const down = b.y > a.y;
      const sx = a.x + nodeWidth / 2;
      const sy = down ? a.y + NODE_HEIGHT : a.y;
      const tx = b.x + nodeWidth / 2;
      const ty = down ? b.y : b.y + NODE_HEIGHT;
      const middle = Math.abs(source.row - target.row) > 1 ? (down ? ty - 42 : ty + 42) : (sy + ty) / 2 + (source.column - 1) * 14;
      path = `M ${sx} ${sy} V ${middle} H ${tx} V ${ty}`;
      labelX = (sx + tx) / 2;
      labelY = middle;
    }
    const textLines = compact ? [String(index + 1)] : wrap(edge.label, 24);
    const labelWidth = Math.max(...textLines.map((line) => line.length)) * 6.2 + 16;
    const labelHeight = textLines.length * 16 + 6;
    return `<g><path class="dg-edge" d="${path}" fill="none" stroke-width="1.7" ${edge.dashed ? 'stroke-dasharray="6 5"' : ""} marker-end="url(#${identifier}-arrow)" ${edge.bidirectional ? `marker-start="url(#${identifier}-arrow)"` : ""}/><rect class="dg-label-bg" x="${labelX - labelWidth / 2}" y="${labelY - labelHeight / 2}" width="${labelWidth}" height="${labelHeight}" rx="5"/><text class="dg-label" text-anchor="middle" font-size="12">${textLines.map((line, lineIndex) => `<tspan x="${labelX}" y="${labelY + 4 + (lineIndex - (textLines.length - 1) / 2) * 16}">${escape(line)}</tspan>`).join("")}</text></g>`;
  }).join("");
  const boxes = diagram.nodes.map((node) => {
    const { x, y } = position(node);
    const titles = wrap(node.title, node.kind === "decision" ? 20 : compact ? 25 : 22);
    const details = wrap(node.detail, compact ? 33 : 28);
    const isDecision = node.kind === "decision";
    const shape = isDecision
      ? `<path d="M ${x + nodeWidth / 2} ${y} L ${x + nodeWidth} ${y + NODE_HEIGHT / 2} L ${x + nodeWidth / 2} ${y + NODE_HEIGHT} L ${x} ${y + NODE_HEIGHT / 2} Z"/>`
      : `<rect x="${x}" y="${y}" width="${nodeWidth}" height="${NODE_HEIGHT}" rx="${node.kind === "storage" ? 22 : 12}"/>`;
    const startY = y + (NODE_HEIGHT - (titles.length * 21 + 9 + details.length * 18)) / 2 + 16;
    if (isDecision) {
      return `<g class="dg-node dg-decision">${shape}<text class="dg-title" text-anchor="middle" font-size="16" font-weight="600">${titles.map((line, index) => `<tspan x="${x + nodeWidth / 2}" y="${y + NODE_HEIGHT / 2 + 5 + (index - (titles.length - 1) / 2) * 21}">${escape(line)}</tspan>`).join("")}</text></g>`;
    }
    return `<g class="dg-node dg-${node.kind ?? "process"}">${shape}<text class="dg-title" font-size="16" font-weight="600">${titles.map((line, index) => `<tspan x="${x + 20}" y="${startY + index * 21}">${escape(line)}</tspan>`).join("")}</text><text class="dg-detail" font-size="13">${details.map((line, index) => `<tspan x="${x + 20}" y="${startY + titles.length * 21 + 7 + index * 18}">${escape(line)}</tspan>`).join("")}</text></g>`;
  }).join("");
  const description = `${diagram.caption} ${diagram.nodes.map((node) => `${node.title}: ${node.detail}.`).join(" ")} Connections: ${diagram.edges.map((edge) => `${nodes.get(edge.from)!.title} to ${nodes.get(edge.to)!.title}: ${edge.label}.`).join(" ")}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" class="diagram-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="${identifier}-title ${identifier}-desc"><title id="${identifier}-title">${escape(diagram.heading)}</title><desc id="${identifier}-desc">${escape(description)}</desc><style>
.diagram-svg{--dg-bg:#fafafa;--dg-node:#ffffff;--dg-stroke:#b7bbc2;--dg-fg:#171717;--dg-muted:#52525b;--dg-interface:#f0ecff;--dg-storage:#eaf4f5;--dg-decision:#fff6df;font-family:var(--font-bricolage-grotesque,Arial),sans-serif}
@media(prefers-color-scheme:dark){.diagram-svg{--dg-bg:#111113;--dg-node:#1d1d21;--dg-stroke:#64646e;--dg-fg:#f5f5f5;--dg-muted:#c4c4cd;--dg-interface:#2e2546;--dg-storage:#193335;--dg-decision:#3d321c}}
.light .diagram-svg{--dg-bg:#fafafa;--dg-node:#fff;--dg-stroke:#b7bbc2;--dg-fg:#171717;--dg-muted:#52525b;--dg-interface:#f0ecff;--dg-storage:#eaf4f5;--dg-decision:#fff6df}
.dark .diagram-svg{--dg-bg:#111113;--dg-node:#1d1d21;--dg-stroke:#64646e;--dg-fg:#f5f5f5;--dg-muted:#c4c4cd;--dg-interface:#2e2546;--dg-storage:#193335;--dg-decision:#3d321c}
.dg-background,.dg-label-bg{fill:var(--dg-bg)}.dg-node>rect,.dg-node>path{fill:var(--dg-node);stroke:var(--dg-stroke);stroke-width:1.3}.dg-interface>rect{fill:var(--dg-interface)}.dg-storage>rect{fill:var(--dg-storage)}.dg-decision>path{fill:var(--dg-decision)}.dg-external>rect{stroke-dasharray:5 4}.dg-title{fill:var(--dg-fg)}.dg-detail,.dg-label{fill:var(--dg-muted)}.dg-edge{stroke:var(--dg-stroke)}.dg-arrow{fill:var(--dg-stroke)}
</style><defs><marker id="${identifier}-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path class="dg-arrow" d="M0,0 L8,4 L0,8 Z"/></marker></defs><rect class="dg-background" width="${width}" height="${height}" rx="12"/>${lines}${boxes}</svg>`;
}

