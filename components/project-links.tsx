import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects";

const style = "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900";

export function ProjectLinks({ project }: { project: Project }) {
  return <div className="flex flex-wrap items-center gap-2">
    <a href={project.github} target="_blank" rel="noopener noreferrer" className={style}><Github className="h-3.5 w-3.5" aria-hidden="true" />GitHub<span className="sr-only"> for {project.title} (opens in a new tab)</span></a>
    {project.live && (project.live.href.startsWith("/") ? <Link href={project.live.href} className={style}>{project.live.label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link> : <a href={project.live.href} target="_blank" rel="noopener noreferrer" className={style}>{project.live.label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}
  </div>;
}
