import Link from "next/link";
import { ArrowDown, ArrowDownToLine, ArrowUpRight, ChevronDown, MapPin } from "lucide-react";
import { featuredProjects } from "@/lib/projects";
import { profileSummary } from "@/lib/profile";
import { ProjectListItem } from "@/components/project-list-item";
import { SkillsDraggable } from "@/components/skills-draggable";
import { GitHubContributions } from "@/components/github-contributions";
import { TimeCounter } from "@/components/time-counter";
import { ContactSection } from "@/components/contact-section";
import { AroundTheWeb } from "@/components/around-the-web";

export default function Page() {
  return <main className="home-page">
    <div className="home-column">
      <header id="about" className="home-hero">
        <div className="hero-topline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lakshya.jpeg" alt="Lakshya Kumar" width={80} height={80} className="hero-portrait" />
          <span className="hero-location"><MapPin size={14} aria-hidden="true" />Dehradun, India<TimeCounter /></span>
        </div>
        <h1>Lakshya Kumar<span className="hero-dot" aria-hidden="true">.</span></h1>
        <p className="hero-role">Full Stack &amp; AI Platform Engineer</p>
        <p className="hero-bio">{profileSummary.bio}</p>
        <div className="hero-actions">
          <Link href="#projects" className="home-button home-button-primary">Explore my work<ArrowDown size={16} aria-hidden="true" /></Link>
          <a href="/resume.pdf" download="Lakshya_Kumar_Resume.pdf" className="home-button">View résumé<ArrowDownToLine size={16} aria-hidden="true" /></a>
        </div>
      </header>

      <section id="experience" className="home-section" aria-labelledby="experience-title">
        <div className="section-heading"><h2 id="experience-title">Experience</h2><span>Where I’m building</span></div>
        <details className="experience-disclosure" open suppressHydrationWarning>
          <summary>
            <div className="job-company">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ophanim-logo.png" alt="" width={44} height={44} />
              <div><h3>Ophanim Technologies</h3><p>Full Stack Developer</p></div>
            </div>
            <span className="job-date">Jan 2026 — Present<ChevronDown size={17} aria-hidden="true" /></span>
          </summary>
          <div className="job-description">
            <ul>
              <li>Built and maintained web applications using Next.js, Node.js, and Express.js, improving backend response time and application performance by 30%.</li>
              <li>Created the <a href="https://www.ophanimtechnologies.com/" target="_blank" rel="noopener noreferrer">official company website<ArrowUpRight size={12} aria-hidden="true" /></a> end-to-end with Next.js, Node.js, Razorpay, Supabase, and Sanity CMS.</li>
              <li>Implemented responsive interfaces, server-side rendering, and static generation, improving SEO scores and page load speed by approximately 20%.</li>
              <li>Built a CRM with multiple departments and role-based access using Next.js, React, Express, Supabase, and Redis.</li>
            </ul>
          </div>
        </details>
        <details id="achievements" className="credentials-disclosure" suppressHydrationWarning>
          <summary>Education &amp; certifications<ChevronDown size={16} aria-hidden="true" /></summary>
          <div className="credentials-content">
            <div><h3>Graphic Era Hill University, Dehradun</h3><p>Bachelor of Computer Applications · 2023–2026 · 8.8 CGPA</p></div>
            <div><h3>Defence Public School</h3><p>XII, CBSE · 2023 · 79.6%</p></div>
            <div><h3>React Foundations for Next.js</h3><p>React patterns, server and client components, and Next.js application architecture.</p></div>
            <div><h3>Next.js SEO Fundamentals</h3><p>SEO best practices, structured data, server-side rendering, and static site generation.</p></div>
          </div>
        </details>
      </section>

      <section id="tech-stack" className="home-section" aria-labelledby="tech-stack-title">
        <div className="section-heading"><h2 id="tech-stack-title">Tech stack</h2><span>The tools behind the work</span></div>
        <SkillsDraggable />
      </section>

      <section id="projects" className="home-section" aria-labelledby="projects-title">
        <div className="section-heading"><h2 id="projects-title">Selected projects</h2><Link href="/projects">All five projects<ArrowUpRight size={15} aria-hidden="true" /></Link></div>
        <p className="section-intro">AI coworkers, shared canvases, and habits that stick. A few things I’ve built from interface to infrastructure.</p>
        <div className="home-projects">{featuredProjects.map(project => <ProjectListItem key={project.slug} project={project} headingLevel={3} showPortraitThumbnails />)}</div>
        <Link href="/projects" className="home-text-link">Explore all projects<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>

      <section id="github" className="home-section" aria-labelledby="github-title">
        <div className="section-heading"><h2 id="github-title">GitHub activity</h2><a href="https://github.com/lakshyakumar90" target="_blank" rel="noopener noreferrer">@lakshyakumar90<ArrowUpRight size={14} aria-hidden="true" /></a></div>
        <GitHubContributions />
      </section>

      <AroundTheWeb />

      <ContactSection />
      <footer className="home-footer"><span>Designed &amp; built by Lakshya Kumar.</span><a href="#about">Back to top ↑</a></footer>
    </div>
  </main>;
}
