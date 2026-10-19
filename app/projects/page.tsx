import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectListItem } from "@/components/project-list-item";
import { ContactSection } from "@/components/contact-section";
import { AroundTheWeb } from "@/components/around-the-web";


export const metadata: Metadata = {
  title: "Projects | Lakshya Kumar",
  description: "Explore AI Teammates, Excalidraw, Habitly, Aurora UI, and DevConnect: AI tools, collaborative systems, mobile apps, and developer experiences.",
  alternates: { canonical: "https://lakshyakumar.in/projects" },
  openGraph: { title: "Projects | Lakshya Kumar", description: "Five projects spanning AI, collaboration, mobile, and developer tooling.", url: "https://lakshyakumar.in/projects", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Projects | Lakshya Kumar", description: "Five projects spanning AI, collaboration, mobile, and developer tooling.", images: ["/og.png"] },
};

export default function ProjectsPage() {
  return <main className="min-h-dvh bg-grid px-4 pb-20 pt-6 sm:px-6 sm:pt-8 dark:bg-neutral-950">
    <div className="mx-auto max-w-2xl">
      <nav aria-label="Projects navigation" className="mb-10 flex items-center justify-between">
        <Link href="/" className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm text-neutral-600 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-neutral-300 dark:hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to home</Link>

      </nav>
      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">Projects</h1>
        <p className="max-w-prose text-sm leading-7 text-neutral-600 sm:text-base dark:text-neutral-300">AI coworkers, shared canvases, everyday habits, and tools for developers. A closer look at what I build and how it works.</p>
      </header>
      <div className="space-y-5">{projects.map((project) => <ProjectListItem key={project.slug} project={project} headingLevel={2} showPortraitThumbnails />)}</div>
      <AroundTheWeb className="mt-12" />
      <ContactSection />
    </div>
  </main>;
}
