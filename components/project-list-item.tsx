import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Chip } from "@/components/chip";
import { ProjectLinks } from "@/components/project-links";
import { ProjectMediaAsset } from "@/components/project-media";
import type { Project } from "@/lib/projects";

export function ProjectListItem({ project, headingLevel = 3, showPortraitThumbnails = false }: { project: Project; headingLevel?: 2 | 3 | 4; showPortraitThumbnails?: boolean }) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  const portraitCover = project.cover?.width && project.cover?.height && project.cover.height > project.cover.width;
  const thumbnails = showPortraitThumbnails && portraitCover ? project.media.filter(item => item.type === "image" && item.width && item.height && item.height > item.width).slice(0, 4) : [];
  return <article className="min-w-0 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
    {thumbnails.length > 0 ? <div role="group" aria-label={`${project.title} screenshots`} className="grid grid-cols-4 items-start gap-2 p-3 sm:gap-3 sm:p-4">
      {thumbnails.map(item => item.type === "image" && <div key={item.id} className="min-w-0"><ProjectMediaAsset item={item} /></div>)}
    </div> : project.cover && <div className={`project-cover${portraitCover ? " project-cover-portrait" : ""}`}><ProjectMediaAsset key={project.cover.src} item={project.cover} /></div>}
    <div className="space-y-4 p-4 sm:p-5">
      <div className="space-y-2">
        <Heading className="text-base font-semibold tracking-tight text-neutral-900 sm:text-lg dark:text-neutral-50"><Link href={`/projects/${project.slug}`} className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500">{project.title}</Link></Heading>
        <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">{project.summary}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">{project.stack.slice(0, 6).map((tech) => <Chip key={tech} tech={tech}>{tech}</Chip>)}</div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={`/projects/${project.slug}`} className="inline-flex min-h-10 items-center gap-2 rounded-sm text-xs font-medium text-neutral-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500 dark:text-neutral-100">Explore project<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">: {project.title}</span></Link>
        <ProjectLinks project={project} />
      </div>
    </div>
  </article>;
}
