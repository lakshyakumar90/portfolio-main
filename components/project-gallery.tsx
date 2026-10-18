import { ArrowUpRight, Download } from "lucide-react";
import type { ProjectMedia } from "@/lib/projects";
import { ProjectMediaAsset } from "@/components/project-media";
import { renderDiagramSvg } from "@/lib/diagram-svg";
import { ProjectDiagramCanvas } from "@/components/project-diagram-canvas";
import { ProjectDiagramImage } from "@/components/project-diagram-image";

export function ProjectFigure({ item, projectSlug }: { item: ProjectMedia; projectSlug?: string }) {
  const exportUrl = item.type === "diagram" ? item.image?.src ?? (projectSlug ? `/projects/${projectSlug}/diagrams/${item.id}.svg` : undefined) : undefined;
  const format = item.type === "diagram" && item.image ? "PNG" : "SVG";
  return <figure id={item.id} className="min-w-0 scroll-mt-6 space-y-4">
    {item.heading && <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">{item.heading}</h2>
      {exportUrl && <div className="flex flex-wrap gap-4 text-xs text-neutral-600 dark:text-neutral-300">
        <a href={exportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1.5 rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">Open full diagram<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/><span className="sr-only">: {item.heading} (opens in a new tab)</span></a>
        <a href={exportUrl} download={`${projectSlug}-${item.id}.${format.toLowerCase()}`} className="inline-flex min-h-9 items-center gap-1.5 rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{format}<Download className="h-3.5 w-3.5" aria-hidden="true"/><span className="sr-only">: download {item.heading}</span></a>
      </div>}
    </div>}
    {item.caption && <figcaption className="max-w-prose text-sm leading-7 text-neutral-600 dark:text-neutral-300">{item.caption}</figcaption>}
    {item.type === "diagram" ? <>
      {item.image ? <ProjectDiagramImage image={item.image} heading={item.heading} /> : <>
        <ProjectDiagramCanvas svg={renderDiagramSvg(item, `${projectSlug ?? "project"}-${item.id}`)} compactSvg={renderDiagramSvg(item, `${projectSlug ?? "project"}-${item.id}-compact`, true)} heading={item.heading} />
        <ol aria-label="Numbered diagram connections" className="diagram-compact list-decimal space-y-2 pl-5 text-xs leading-6 text-neutral-600 dark:text-neutral-300">{item.edges.map((edge, index) => <li key={index}>{item.nodes.find(node => node.id === edge.from)?.title} {edge.bidirectional ? "↔" : "→"} {item.nodes.find(node => node.id === edge.to)?.title}: {edge.label}.</li>)}</ol>
      </>}
      <p className="text-xs leading-6 text-neutral-500 dark:text-neutral-400">Arrows show direction. Dashed connections indicate conditional or supporting paths.</p>
      {/* The native disclosure can be opened before hydration; keep its browser-owned open state. */}
      <details suppressHydrationWarning className="rounded-lg border border-neutral-200 px-4 py-3 text-sm dark:border-neutral-800">
        <summary className="cursor-pointer font-medium text-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-neutral-200">Read diagram as text</summary>
        <div className="mt-4 space-y-4 leading-7 text-neutral-600 dark:text-neutral-300">
          <dl className="space-y-3">{item.nodes.map(node => <div key={node.id}><dt className="font-medium text-neutral-900 dark:text-neutral-100">{node.title}</dt><dd>{node.detail}</dd></div>)}</dl>
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Connections</h3>
          <ul className="list-disc space-y-2 pl-5">{item.edges.map((edge, index) => <li key={index}>{item.nodes.find(node => node.id === edge.from)?.title} {edge.bidirectional ? "↔" : "→"} {item.nodes.find(node => node.id === edge.to)?.title}: {edge.label}{edge.dashed ? " (conditional or supporting)" : ""}.</li>)}</ul>
        </div>
      </details>
      {item.notes.length > 0 && <ul aria-label="Diagram notes" className="max-w-prose list-disc space-y-2 pl-5 text-xs leading-6 text-neutral-600 dark:text-neutral-400">{item.notes.map(note => <li key={note}>{note}</li>)}</ul>}
    </> : <ProjectMediaAsset key={item.src} item={item} />}
  </figure>;
}

export function ProjectGallery({ items, projectSlug }: { items: ProjectMedia[]; projectSlug?: string }) {
  if (!items.length) return null;
  const diagrams = items.filter(item => item.type === "diagram");
  return <div className="space-y-12">
    {diagrams.length > 1 && <nav aria-label="Project diagrams" className="flex flex-wrap gap-x-5 gap-y-2 border-y border-neutral-200 py-4 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">{diagrams.map(item => <a key={item.id} href={`#${item.id}`} className="inline-flex min-h-9 items-center rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{item.id === "architecture" ? "Architecture" : item.id === "workflow" ? "Workflow" : "Feature deep dive"}</a>)}</nav>}
    {items.map(item => <ProjectFigure key={item.id} item={item} projectSlug={projectSlug} />)}
  </div>;
}

