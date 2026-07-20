export type Project = {
  slug: string;
  title: string;
  video: string;
  basicInfo: string;
  moreInfo: string[];
  stack: string[];
  images: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "devconnect",
    title: "DevConnect — Developer Social Network",
    video: "/project-videos/DevConnect _ Developer Social Network - Brave 2026-07-19 11-50-35.mp4",
    basicInfo: "A scalable developer networking platform where developers can register, connect, and exchange messages. Evolved from a simple project to a robust real-time system with complex architecture.",
    moreInfo: [
      "Real-time messaging with online presence, typing indicators, and live notifications without multiplying socket connections.",
      "Refactored state management to reduce unnecessary re-renders and improve responsiveness.",
      "Redis-backed Socket.io infrastructure for scalable real-time communication.",
      "Feed system efficiently handling user-generated content and interactions.",
      "Job platform allowing companies to publish openings and developers to apply directly.",
      "Optimized search querying instead of relying solely on client-side filtering.",
      "Multiple authentication flows, including GitHub OAuth alongside traditional authentication.",
      "Improved API structure and middleware organization for maintainability."
    ],
    stack: [
      "React 19", "Vite", "Redux Toolkit", "Tailwind CSS", "Radix UI", "Socket.io Client",
      "Node.js", "Express 5", "MongoDB", "Redis", "Socket.io", "Better Auth", "JWT", "Cloudinary", "Nodemailer"
    ],
    images: [
      "/project-images/devconnect-1.png",
      "/project-images/devconnect-2.png",
      "/project-images/devconnect-3.png",
      "/project-images/devconnect-4.png"
    ],
    links: [
      { label: "Live ↗", href: "https://devconnect.lakshyakumar.in/" },
      { label: "GitHub ↗", href: "https://github.com/lakshyakumar90/mini-project" }
    ]
  },
  {
    slug: "stream-ai-content-studio",
    title: "Stream — AI Content Studio",
    video: "/project-videos/Stream — AI Content Studio - Brave 2026-07-20 14-47-43 - Trim.mp4",
    basicInfo: "An AI-powered content writer app built from scratch with real-time chat sessions and intelligent generation workflows, combining LLMs with real web searches.",
    moreInfo: [
      "AI Writing Assistant: Personal writing buddy utilizing GetStream.io for persistent real-time chat sessions. Integrated with Tavily for accurate web searches.",
      "Image Generation: Uses Gemini 2.5 Flash to create images based on predefined prompts tailored for social media and blogs.",
      "Resume Analyzer: Gemini 2.5 Flash scans resumes to provide an ATS score, full breakdown, strengths/weaknesses, and keyword highlights.",
      "Seamlessly integrated GetStream chat sessions back to MongoDB using user IDs.",
      "Cloudinary used to store resumes and generated images."
    ],
    stack: [
      "React", "TypeScript", "Node.js", "Express.js", "MongoDB", "GetStream.io", "Tavily API", "Gemini SDK", "Shadcn UI", "Framer Motion", "Tailwind CSS"
    ],
    images: [
      "/project-images/stream-1.png",
      "/project-images/stream-2.png",
      "/project-images/stream-3.png",
      "/project-images/stream-4.png"
    ],
    links: [
      { label: "Live ↗", href: "https://ai-content-writer-sandy.vercel.app/" },
      { label: "GitHub ↗", href: "https://github.com/lakshyakumar90/ai-content-writer" }
    ]
  },
  {
    slug: "aurora-ui",
    title: "Aurora UI — Animated Component Library",
    video: "/project-videos/aurora-ui.mp4",
    basicInfo: "A modular UI library with a built-in AI Playground, combining standard components with custom animated ones designed for smooth 60fps performance.",
    moreInfo: [
      "Built a CLI using shadcn registry to easily pull components directly into your project.",
      "Interactive Playground for live-editing code and debugging components in a sandbox environment.",
      "Gemini AI integration inside the playground to generate or explain code securely using local storage.",
      "Open in v0 integration.",
      "Authentication flow with Next-Auth and Email verification for accessing CLI features and Playground."
    ],
    stack: [
      "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "GSAP"
    ],
    images: [
      "/project-images/aurora-1.png",
      "/project-images/aurora-2.png",
      "/project-images/aurora-3.png",
      "/project-images/aurora-4.png"
    ],
    links: [
      { label: "Live ↗", href: "https://aurora-ui-opal.vercel.app/" },
      { label: "GitHub ↗", href: "https://github.com/lakshyakumar90/aurora-ui" }
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
