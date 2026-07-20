import Link from "next/link";
import { Github, Linkedin, Mail, Calendar, ChevronDown, Globe } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Typewriter } from "@/components/ui/typewriter";
import { TimeCounter } from "@/components/time-counter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ProjectListItem } from "@/components/project-list-item";
import { AchievementCard, AchievementItem } from "@/components/achievement-item";
import { Dock } from "@/components/dock";
import { SkillsDraggable } from "@/components/skills-draggable";
import { ThemeToggle } from "@/components/theme-toggle";
import { ContactForm } from "@/components/contact-form";
import {
  FadeInText,
  SlideUp,
  SlideInLeft,
  SlideInRight,
} from "@/components/scroll-animation";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>X</title>
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  );
}

export default function Page() {
  const experienceItems = [
    {
      icon: "building",
      company: "Ophanim Technologies Pvt. Ltd.",
      role: "Full Stack Developer",
      period: "Jan 2026 - Present",
      bullets: [
        "Built and maintained scalable web applications using Next.js, Node.js, and Express.js, improving backend response time and application performance by 30%.",
        <span key="ophanim-website">Created their official website end-to-end (<a href="https://www.ophanimtechnologies.com/" target="_blank" rel="noreferrer" className="underline hover:text-neutral-900 dark:hover:text-neutral-100">ophanimtechnologies.com</a>) using Next.js, Node.js, Razorpay payment gateway, Supabase, and Sanity CMS.</span>,
        "Implemented responsive UI components and optimized server-side rendering (SSR) and static site generation (SSG), improving SEO scores and page load speed by ~20%.",
        "Built their entire CRM which has multiple departments and role-based access control, using Next.js, Node.js, React, Express, Supabase, and Redis."
      ],
      logoUrl: "/ophanim-logo.png",
      companyUrl: "https://www.ophanimtechnologies.com/",
    },
  ];

  return (
    <main className="min-h-dvh bg-grid pb-20 sm:pb-24 md:pb-32 pt-4 sm:pt-5 md:pt-6 dark:bg-neutral-950">
      <FadeInText>
        <nav className="mx-auto mb-3 sm:mb-4 flex w-full max-w-xl items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 text-xs text-neutral-600 dark:text-neutral-300">
          <Link
            href="#"
            className="font-semibold text-neutral-900 dark:text-neutral-50 text-sm sm:text-base tracking-tight"
          >
            lakshya.
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <a
              href="#experience"
              className="hover:text-neutral-900 dark:hover:text-neutral-50 text-xs sm:text-xs transition-colors"
            >
              experience
            </a>
            <a
              href="#projects"
              className="hover:text-neutral-900 dark:hover:text-neutral-50 text-xs sm:text-xs transition-colors"
            >
              projects
            </a>
            <a
              href="#achievements"
              className="hover:text-neutral-900 dark:hover:text-neutral-50 text-xs sm:text-xs transition-colors"
            >
              achievements
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </FadeInText>

      <div className="mx-auto max-w-xl px-3 sm:px-4 md:px-6 lg:px-8">
        <article
          aria-label="Portfolio"
          className="relative rounded-xl sm:rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
        >
          <div className="p-3 sm:p-4 md:p-6 lg:p-6">
            {/* Header */}
            <SlideUp>
              <header id="about" className="space-y-2 p-2 sm:p-3 md:p-4">
                <FadeInText delay={0.1}>
                  <div className="flex items-center justify-between gap-2">
                    <TextShimmer
                      as="p"
                      className="text-xs"
                      duration={2.2}
                      spread={1.2}
                    >
                      Hola ! I'm
                    </TextShimmer>
                    <TimeCounter className="text-xs text-neutral-500 dark:text-neutral-400 font-mono" />
                  </div>
                </FadeInText>
                <SlideInLeft delay={0.2}>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 ring-2 ring-neutral-200 dark:ring-neutral-900 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="/lakshya.jpeg"
                        alt="Lakshya Kumar"
                        className="h-full w-full object-cover scale-110"
                      />
                    </div>
                    <h1 className="text-lg sm:text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50">
                      Lakshya Kumar
                      <p className="flex flex-wrap items-center mt-1 gap-2 sm:gap-5 md:gap-5 text-xs text-neutral-600 dark:text-neutral-400 font-normal">
                        Full Stack &amp; AI Platform Engineer
                      </p>
                    </h1>
                  </div>
                </SlideInLeft>
                <FadeInText delay={0.3}>
                  <div className="flex flex-wrap items-center mt-3 gap-2 sm:gap-4 text-xs text-neutral-600 dark:text-neutral-300">
                    <span>Dehradun, India </span>
                    <span className="hidden sm:inline">{"|"}</span>
                    <span className="max-w-[38ch]">
                      <Typewriter
                        text={[
                          "Full Stack Developer",
                          "Real-Time Systems Engineer",
                          "AI Applications Builder",
                        ]}
                        speed={90}
                        waitTime={2000}
                        deleteSpeed={80}
                        className="text-neutral-600 dark:text-neutral-300"
                        cursorChar="|"
                        showCursor={true}
                      />
                    </span>
                  </div>
                </FadeInText>
                <SlideInRight delay={0.4}>
                  <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <a
                      href="/resume.pdf"
                      download="Lakshya_Kumar_Resume.pdf"
                      aria-label="Download Resume"
                      className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 text-white px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 whitespace-nowrap font-medium transition-colors"
                    >
                      Resume
                    </a>
                    <a
                      href="https://cal.com/lakshya-kumar/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Book a 30-minute meeting"
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 whitespace-nowrap transition-colors"
                    >
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                    <a
                      href="mailto:lakshyakumar5023@gmail.com"
                      aria-label="Send email"
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 whitespace-nowrap transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                    <a
                      href="https://lakshyakumar.in"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open Website"
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 whitespace-nowrap transition-colors"
                    >
                      <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                    <a
                      href="https://github.com/lakshyakumar90"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open GitHub"
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 whitespace-nowrap transition-colors"
                    >
                      <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kumar-lakshya"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open LinkedIn"
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 whitespace-nowrap transition-colors"
                    >
                      <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                    <a
                      href="https://x.com/LakshyaKum67542"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open X (Twitter)"
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 whitespace-nowrap transition-colors"
                    >
                      <XIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                  </div>
                </SlideInRight>
              </header>
            </SlideUp>

            {/* Bio */}
            <FadeInText delay={0.7}>
              <section className="mt-3 sm:mt-4 mx-1 sm:mx-2 md:m-2 justify-center items-center text-xs sm:text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                <p>
                  TL;DR: Full-Stack Developer with hands-on experience building scalable web applications, real-time networking platforms (Socket.IO), and AI-integrated workflows (Gemini SDK). Passionate about clean architecture, latency reduction, and crafting modern, highly responsive UI/UX experiences.
                </p>
              </section>
            </FadeInText>

            {/* Work Experience */}
            <SlideUp delay={0.1}>
              <section id="experience" className="mt-3 sm:mt-4 px-1.5 sm:px-2 md:px-4 py-3 sm:py-4 md:py-5 section-divider">
                <FadeInText delay={0.1}>
                  <h3 className="font-bricolage text-xs sm:text-sm md:text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                    Experience
                  </h3>
                </FadeInText>

                <div className="experience-list mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  {experienceItems.map(item => (
                    <div key={item.company} className="experience-item">
                      <div className="experience-row">
                        <div className="experience-left">
                          <div className="experience-logo">
                            <img
                              src={item.logoUrl}
                              alt={`${item.company} logo`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="experience-text">
                            <p className="experience-company">
                              {item.companyUrl ? (
                                <a
                                  href={item.companyUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="hover:underline font-semibold text-neutral-900 dark:text-neutral-100"
                                >
                                  {item.company}
                                </a>
                              ) : (
                                item.company
                              )}
                            </p>
                            <p className="experience-role text-neutral-600 dark:text-neutral-400">{item.role}</p>
                          </div>
                        </div>
                        <div className="experience-right">
                          <span className="experience-period text-neutral-500 dark:text-neutral-400">{item.period}</span>
                          <span className="exp-chevron-wrap" aria-hidden="true">
                            <ChevronDown className="exp-chevron" />
                          </span>
                        </div>
                      </div>

                      <div className="experience-details">
                        <ul className="experience-bullets">
                          {item.bullets.map((bullet, index) => (
                            <li key={`${item.company}-${index}`}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </SlideUp>

            {/* Projects */}
            <SlideUp delay={0.2}>
              <section id="projects" className="mt-3 sm:mt-4 p-2 sm:p-3 md:p-4 section-divider pt-4 sm:pt-5">
                <FadeInText delay={0.1}>
                  <h3 className="font-bricolage text-xs sm:text-sm md:text-base font-semibold tracking-[0.05em] text-neutral-900 dark:text-neutral-50 mb-2 sm:mb-3 ml-0.5 sm:ml-1">
                    Proof of Work
                  </h3>
                </FadeInText>
                <div className="space-y-2 sm:space-y-3 md:space-y-3">
                  <SlideInLeft delay={0.1}>
                    <ProjectListItem
                      title="DevConnect — Developer Social Network"
                      slug="devconnect"
                      video="/project-videos/DevConnect _ Developer Social Network - Brave 2026-07-19 11-50-35.mp4"
                      links={[
                        {
                          label: "github ↗",
                          href: "https://lnkd.in/gEEURF8v",
                        },
                      ]}
                      bullets={[
                        "Architected a full-stack developer networking platform featuring secure JWT authentication, real-time messaging, and responsive UI, seamlessly handling 50+ concurrent socket connections.",
                        "Reduced authentication latency significantly by implementing stateless JWT tokens, enabling ultra-fast real-time chat via Socket.IO.",
                      ]}
                      tags={["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Tailwind CSS", "JWT"]}
                    />
                  </SlideInLeft>

                  <SlideInLeft delay={0.15}>
                    <ProjectListItem
                      title="Stream — AI Content Studio"
                      slug="stream-ai-content-studio"
                      video="/project-videos/Stream — AI Content Studio - Brave 2026-07-20 14-47-43 - Trim.mp4"
                      links={[
                        {
                          label: "github ↗",
                          href: "https://github.com/lakshyakumar90",
                        },
                      ]}
                      bullets={[
                        "Designed an AI-powered content platform integrating the Gemini SDK and Tavily API, supporting 5+ intelligent content generation workflows including deep resume analysis.",
                        "Improved content retrieval accuracy and contextual relevance by combining LLM generation with real-time web search via Tavily API.",
                      ]}
                      tags={["React", "Node.js", "Express", "Gemini SDK", "Tavily API", "GetStream.io"]}
                    />
                  </SlideInLeft>

                  <SlideInLeft delay={0.2}>
                    <ProjectListItem
                      title="Aurora UI — Animated Component Library"
                      slug="aurora-ui"
                      video="/project-videos/aurora-ui.mp4"
                      links={[
                        {
                          label: "github ↗",
                          href: "https://github.com/lakshyakumar90",
                        },
                      ]}
                      bullets={[
                        "Engineered a modular animated UI library with 20+ reusable components built on Next.js and Framer Motion with interactive playground support.",
                        "Optimized all components for responsiveness and rendering efficiency, achieving smooth 60fps animations across desktops and mobile devices.",
                      ]}
                      tags={["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "GSAP"]}
                    />
                  </SlideInLeft>
                </div>
                <FadeInText delay={0.2}>
                  <div className="mt-3 sm:mt-4 flex justify-center">
                    <a
                      href="https://github.com/lakshyakumar90?tab=repositories"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-sm border border-neutral-200 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 transition-colors"
                    >
                      View all projects →
                    </a>
                  </div>
                </FadeInText>
              </section>
            </SlideUp>

            {/* Skills */}
            <SlideUp delay={0.3}>
              <section className="mt-3 sm:mt-4 p-2 sm:p-3 md:p-4 section-divider pt-4 sm:pt-5">
                <SkillsDraggable />
              </section>
            </SlideUp>

            {/* Achievements & Certifications */}
            <SlideUp delay={0.3}>
              <section id="achievements" className="mt-3 sm:mt-4 p-2 sm:p-3 md:p-3 section-divider pt-3 sm:pt-4 md:pt-5">
                <FadeInText delay={0.1}>
                  <h3 className="font-bricolage mb-3 sm:mb-4 text-xs sm:text-sm md:text-base font-semibold tracking-[0.05em] text-neutral-900 dark:text-neutral-100 ml-0.5 sm:ml-1 md:ml-1">
                    Achievements &amp; Certifications
                  </h3>
                </FadeInText>

                <div className="grid gap-2 sm:gap-2.5 md:gap-3">
                  <SlideInLeft delay={0.1}>
                    <AchievementCard
                      title="React Foundations for Next.js"
                      date="Certification"
                      description="Mastered foundational React patterns, server vs. client components, and modern architecture optimized for Next.js applications."
                    />
                  </SlideInLeft>

                  <SlideInRight delay={0.15}>
                    <AchievementCard
                      title="Next.js SEO Fundamentals"
                      date="Certification"
                      description="Certified in implementing robust SEO best practices, structured data, server-side rendering (SSR), and static site generation (SSG)."
                    />
                  </SlideInRight>
                </div>
              </section>
            </SlideUp>

            {/* Education */}
            <SlideUp delay={0.3}>
              <section className="mt-3 sm:mt-4 p-2 sm:p-3 md:p-3 section-divider pt-4 sm:pt-5">
                <FadeInText delay={0.1}>
                  <h3 className="font-bricolage text-xs sm:text-sm md:text-base font-semibold tracking-[0.05em] text-neutral-900 dark:text-neutral-50 mb-2 sm:mb-3">
                    Education
                  </h3>
                </FadeInText>
                <ul className="space-y-1.5 sm:space-y-2 md:space-y-2">
                  <SlideInLeft delay={0.1}>
                    <li>
                      <AchievementItem
                        title="Graphic Era Hill University, Dehradun"
                        date="2023 – 2026"
                        description="Bachelor of Computer Applications (B.C.A.) — 8.8 CGPA"
                      />
                    </li>
                  </SlideInLeft>
                  <SlideInLeft delay={0.15}>
                    <li>
                      <AchievementItem
                        title="Defence Public School"
                        date="2023"
                        description="XII (CBSE) — 79.6%"
                      />
                    </li>
                  </SlideInLeft>
                </ul>
              </section>
            </SlideUp>

            {/* Book a Meet / Contact */}
            <SlideUp delay={0.3}>
              <section
                id="book-a-meet"
                className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50/70 p-5 text-left dark:border-neutral-800 dark:bg-neutral-900/30"
              >
                <FadeInText delay={0.1}>
                  <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                    Interested in working together or connecting? <br />Let’s get in touch.
                  </h2>
                </FadeInText>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a
                    href="https://cal.com/lakshya-kumar/30min"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-emerald-200 transition-colors"
                    aria-label="Book a 30-minute meeting on Cal.com"
                  >
                    <Calendar className="h-4 w-4" />
                    book a meet
                  </a>
                  <a
                    href="mailto:lakshyakumar5023@gmail.com"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors"
                    aria-label="Send email directly"
                  >
                    <Mail className="h-4 w-4" />
                    send an email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kumar-lakshya"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400 transition-colors"
                    aria-label="Connect on LinkedIn"
                  >
                    connect on linkedin
                  </a>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                    or send a message right here
                  </p>
                  <ContactForm />
                  <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    Messages are directed to{" "}
                    <span className="font-medium">lakshyakumar5023@gmail.com</span>.
                  </p>
                </div>
              </section>
            </SlideUp>
          </div>
        </article>
        <div className="mt-6 sm:mt-8 flex justify-center rounded-lg sm:rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950 text-xs text-neutral-500 dark:text-neutral-400 p-2 sm:p-2 md:p-3 mx-0">
          <span className="italic text-center leading-5 sm:leading-6">
            Passionate about scalable architecture, real-time systems, and modern UI/UX design.
          </span>
        </div>
        <div className="mt-2 sm:mt-3 md:mt-4 flex justify-center text-xs text-neutral-500 dark:text-neutral-400 px-2 pb-6">
          designed and developed by&nbsp;
          <a
            href="https://github.com/lakshyakumar90"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-500 transition-colors font-medium"
          >
            ~Lakshya Kumar
          </a>
        </div>
      </div>

      {/* Floating Dock */}
      <Dock />
    </main>
  );
}
