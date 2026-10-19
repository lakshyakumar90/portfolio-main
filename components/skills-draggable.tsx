import { Code2, Database, Layers3 } from "lucide-react";

const groups = [
  { icon: Code2, label: "Interfaces", skills: ["React", "Next.js", "TypeScript", "JavaScript", "React Native", "Expo", "Tailwind CSS", "Framer Motion", "GSAP", "HTML & CSS", "Vite"] },
  { icon: Layers3, label: "Applications", skills: ["Node.js", "Express", "Socket.IO", "WebSockets", "AI SDK", "Trigger.dev", "Daytona", "Zustand", "React Query", "Redux", "Zod", "Python", "C++"] },
  { icon: Database, label: "Data & services", skills: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "MySQL", "Prisma", "Drizzle", "Firebase", "Supabase"] },
];

export function SkillsDraggable() {
  return <div className="stack-groups">{groups.map(({ icon: Icon, label, skills }) => <div key={label} className="stack-group">
    <h3><Icon size={15} aria-hidden="true" />{label}</h3>
    <ul className="stack-pills" aria-label={label}>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
  </div>)}</div>;
}
export default SkillsDraggable;
