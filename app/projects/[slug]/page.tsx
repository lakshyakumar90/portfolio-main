import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, projects } from "@/lib/projects";
import { Chip } from "@/components/chip";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectLinks } from "@/components/project-links";
import { ThemeToggle } from "@/components/theme-toggle";

type PageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return { title: "Project not found | Lakshya Kumar" };
  return {
    title: `${project.title} | Lakshya Kumar`, description: project.summary,
    alternates: { canonical: `https://lakshyakumar.in/projects/${project.slug}` },
    openGraph: { title: `${project.title} | Lakshya Kumar`, description: project.summary, url: `https://lakshyakumar.in/projects/${project.slug}`, images: ["/og.png"] },
    twitter: { card: "summary_large_image", title: `${project.title} | Lakshya Kumar`, description: project.summary, images: ["/og.png"] },
  };
}
export default async function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  return <main className="min-h-dvh bg-grid px-4 pb-20 pt-6 sm:px-6 sm:pt-8 dark:bg-neutral-950">
    <div className="mx-auto max-w-3xl">
      <nav aria-label="Project navigation" className="mb-10 flex items-center justify-between gap-4">
        <Link href="/projects" className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm text-neutral-600 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-neutral-300 dark:hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" />All projects</Link>
        <div className="flex items-center gap-4"><Link href="/" className="text-xs text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-300">Home</Link><ThemeToggle /></div>
      </nav>
      <article className="space-y-10">
        <header className="space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">{project.title}</h1>
          <p className="max-w-prose text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-300">{project.summary}</p>
          <ProjectLinks project={project} />
        </header>
        <section aria-labelledby="overview-heading" className="max-w-prose space-y-3">
          <h2 id="overview-heading" className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">Overview</h2>
          {project.overview.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">{paragraph}</p>)}
        </section>
        <section aria-labelledby="features-heading" className="max-w-prose space-y-3">
          <h2 id="features-heading" className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">Key features</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-600 marker:text-neutral-400 dark:text-neutral-300">{project.features.map((feature) => <li key={feature} className="pl-1">{feature}</li>)}</ul>
        </section>
        <section aria-labelledby="stack-heading" className="space-y-3">
          <h2 id="stack-heading" className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">Tech stack</h2>
          <div className="flex flex-wrap gap-2">{project.stack.map((tech) => <Chip key={tech} tech={tech}>{tech}</Chip>)}</div>
        </section>
        <ProjectGallery items={project.media} projectSlug={project.slug} />
        <footer className="border-t border-neutral-200 pt-6 dark:border-neutral-800"><Link href="/projects" className="inline-flex min-h-10 items-center gap-2 text-sm text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Explore all projects</Link></footer>
      </article>
    </div>
  </main>;
}
