import { projectDiagrams, type ProjectDiagram } from "./project-diagrams";
import projectAssets from "./project-assets.json";
type MediaBase = { id: string; heading?: string; caption?: string };
export type ProjectMedia =
  | (MediaBase & { type: "image"; src: string; alt: string; width?: number; height?: number })
  | (MediaBase & { type: "video"; src: string; width?: number; height?: number; poster?: string; captionTrack?: { src: string; language: string; label: string } })
  | ProjectDiagram;
export type Project = {
  slug: string;
  title: string;
  summary: string;
  overview: string[];
  features: string[];
  stack: string[];
  github: string;
  live?: { href: string; label: string };
  cover?: Extract<ProjectMedia, { type: "image" | "video" }>;
  media: ProjectMedia[];
};

export const projects: Project[] = [
  {
    slug: "ai-teammates", title: "AI Teammates",
    summary: "AI coworkers with persistent memory, group conversations, and their own remote computers.",
    overview: [
      "A workspace for creating AI teammates with individual roles and instructions. Talk directly to a bot or bring multiple bots into a shared conversation, with model selection and memory controls built into the experience.",
      "Next.js handles the web application and authenticated actions. Trigger.dev runs durable chat sessions through the AI SDK, while Daytona provides isolated computers for shell commands, files, and desktop interaction. Neon stores application records; Trigger stores transcripts, and bot-specific memory also lives in the sandbox.",
    ],
    features: ["Custom bots with saved roles, instructions, and avatars", "Direct conversations and controlled group handoffs between bots", "Gemini, Groq, OpenRouter, and optional Ollama model integrations", "Command, file, and computer-use tools with a live desktop viewer", "Memory preferences, usage accounting, and sandbox resource limits"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI SDK", "Trigger.dev", "Daytona", "Clerk", "Neon", "Drizzle ORM", "Sentry"],
    github: "https://github.com/lakshyakumar90/ai-teammates",
    live: { href: "https://ai-teammates.lakshyakumar.in", label: "Live project" },
    media: projectDiagrams["ai-teammates"],
  },
  {
    slug: "excalidraw", title: "Excalidraw",
    summary: "A collaborative drawing workspace with a custom editor engine and real-time room synchronization.",
    overview: [
      "An interactive drawing application with shapes, free drawing, text, images, selection, history, and reusable library items. Guests keep drawings on their device; signed-in users can save private scenes and collaborate in rooms.",
      "A pnpm/Turborepo workspace separates the Next.js editor, Express API, WebSocket service, and snapshot worker. Shared packages own the drawing engine, protocol, permissions, and database operations. Live room state is coordinated in Redis, then written to versioned PostgreSQL snapshots through BullMQ.",
    ],
    features: ["Custom TypeScript drawing engine for geometry, tools, rendering, and history", "Guest drawings and local drafts persisted in IndexedDB", "Authenticated rooms with owner, editor, and viewer permissions", "Live edits, cursors, selections, previews, and presence", "Element reconciliation with versions and deletion tombstones", "Queued snapshot persistence and dirty-room recovery"],
    stack: ["Next.js", "React", "TypeScript", "Jotai", "Canvas", "IndexedDB", "Express", "WebSockets", "Redis", "BullMQ", "PostgreSQL", "Prisma Next", "Better Auth", "Turborepo"],
    github: "https://github.com/lakshyakumar90/excalidraw",
    live: { href: "https://excalidraw.lakshyakumar.in", label: "Live project" },
    media: projectDiagrams["excalidraw"],
  },
  {
    slug: "habitly", title: "Habitly",
    summary: "An offline-first habit and task planner with local reminders and optional cloud synchronization.",
    overview: [
      "A mobile planner for daily habits, scheduled progress, recurring tasks, subtasks, and statistics. Guest onboarding and local storage let people start tracking without creating an account.",
      "Expo Router screens use feature logic and repositories backed by SQLite. Database triggers queue local edits in a revision-aware outbox. Optional Firebase accounts synchronize those changes with Firestore, while each account keeps its own local database and device-specific reminders.",
    ],
    features: ["Habit schedules, daily entries, streaks, history, and progress statistics", "Tasks with subtasks, recurrence, and local notifications", "Offline-first SQLite storage with versioned migrations", "Google sign-in and optional Firestore synchronization", "Separate local databases for guest and signed-in accounts", "Appearance settings, search, and JSON export"],
    stack: ["Expo", "React Native", "TypeScript", "Expo Router", "SQLite", "Firebase Auth", "Firestore", "NativeWind", "Reanimated", "Expo Notifications"],
    github: "https://github.com/lakshyakumar90/habit-tracker",
    live: { href: "/habitly", label: "Project website" },
    media: projectDiagrams["habitly"],
  },
  {
    slug: "aurora-ui", title: "Aurora UI",
    summary: "Reusable animated components, source registries, and an AI-assisted React playground.",
    overview: [
      "A developer-facing component platform that brings live demonstrations, highlighted source, templates, and editable previews together. Component registries describe the files and dependencies needed to reuse each example.",
      "Next.js renders documentation and serves registry exports from checked-in source. Sandpack runs editable React previews, while a Gemini endpoint supports generating, transforming, explaining, and fixing code. NextAuth and Prisma manage account and verification data in PostgreSQL.",
    ],
    features: ["Animated component demonstrations with highlighted source code", "Component and template registries for source distribution", "Sandpack playground with editable React previews", "Gemini-powered generation, explanations, transformations, and fixes", "Google and password authentication with email verification"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Motion", "Sandpack", "Shiki", "Gemini", "NextAuth", "Prisma", "PostgreSQL"],
    github: "https://github.com/lakshyakumar90/aurora-ui",
    live: { href: "https://aurora-ui-opal.vercel.app", label: "Live project" },
    media: projectDiagrams["aurora-ui"],
  },
  {
    slug: "devconnect", title: "DevConnect",
    summary: "A developer social network for profiles, connections, posts, jobs, and real-time conversations.",
    overview: [
      "A full-stack social platform where developers discover each other, build professional profiles, share posts, connect, and apply for opportunities. Messaging and notifications support conversations around connections and job applications.",
      "A React/Vite frontend organizes data through Redux Toolkit and Axios services. Express routes and controllers manage MongoDB records through Mongoose. Socket.IO shares the Node HTTP server, with Redis supporting presence and cross-instance event distribution. Custom JWT authentication and GitHub OAuth handle identity.",
    ],
    features: ["Developer profiles, search, and connection requests", "Feed posts, reactions, comments, and notifications", "Job listings and application workflows", "Real-time chat, presence, typing, and message status", "GitHub OAuth and profile/repository integration", "Image and document uploads with Cloudinary or local storage"],
    stack: ["React", "Vite", "JavaScript", "Redux Toolkit", "Tailwind CSS", "Express", "MongoDB", "Mongoose", "Socket.IO", "Redis", "JWT", "Cloudinary", "Nodemailer"],
    github: "https://github.com/lakshyakumar90/mini-project",
    live: { href: "https://devconnect.lakshyakumar.in", label: "Live project" },
    media: projectDiagrams["devconnect"],
  },
];

const suppliedAssets = projectAssets as Record<string, { images: Extract<ProjectMedia, { type: "image" }>[]; video: Extract<ProjectMedia, { type: "video" }> }>;
for (const project of projects) {
  const assets = suppliedAssets[project.slug];
  project.cover = { ...assets.images[0], id: "cover" };
  project.media = [assets.video, ...assets.images, ...projectDiagrams[project.slug]];
}
export const featuredProjectSlugs = ["ai-teammates", "excalidraw", "habitly"] as const;
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
export const featuredProjects = featuredProjectSlugs.map((slug) => {
  const project = getProjectBySlug(slug);
  if (!project) throw new Error(`Missing featured project: ${slug}`);
  return project;
});
