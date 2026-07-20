import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Chip } from "@/components/chip";
import Image from "next/image";
import { FadeInText, SlideUp } from "@/components/scroll-animation";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-grid pb-20 sm:pb-24 md:pb-32 pt-4 sm:pt-5 md:pt-6 dark:bg-neutral-950">
      <div className="mx-auto max-w-2xl px-3 sm:px-4 md:px-6 lg:px-8">
        <FadeInText>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </FadeInText>

        <article className="space-y-8">
          <SlideUp delay={0.1}>
            <header className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-xs sm:text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </header>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="h-full w-full object-contain"
              />
            </div>
          </SlideUp>

          <SlideUp delay={0.3}>
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              <p className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium">
                {project.basicInfo}
              </p>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Chip key={tech} variant="soft" tech={tech}>
                      {tech}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Key Features & Architecture</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {project.moreInfo.map((info, idx) => (
                    <li key={idx} className="pl-1">
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SlideUp>

          <SlideUp delay={0.4}>
            <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">Gallery</h3>
              <div className="grid gap-6">
                {project.images.map((img, idx) => (
                  <div key={idx} className="relative w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </SlideUp>
        </article>
      </div>
    </main>
  );
}
