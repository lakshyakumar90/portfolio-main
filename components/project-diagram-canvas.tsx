export function ProjectDiagramCanvas({ svg, compactSvg, heading }: { svg: string; compactSvg: string; heading: string }) {
  return <div className="diagram-canvas w-full min-w-0 rounded-xl border border-neutral-200 dark:border-neutral-800" aria-label={heading}>
    <div className="diagram-wide" dangerouslySetInnerHTML={{ __html: svg }} />
    <div className="diagram-compact" dangerouslySetInnerHTML={{ __html: compactSvg }} />
  </div>;
}
