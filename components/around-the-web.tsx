import { ArrowUpRight, Github, Linkedin } from "lucide-react";

const links = [
  { label: "GitHub", detail: "Code & open source", href: "https://github.com/lakshyakumar90", icon: Github },
  { label: "LinkedIn", detail: "Work & connections", href: "https://www.linkedin.com/in/kumar-lakshya", icon: Linkedin },
  { label: "X / Twitter", detail: "Notes & updates", href: "https://x.com/LakshyaKum67542", icon: ArrowUpRight },
];

export function AroundTheWeb({ className = "" }: { className?: string }) {
  return <section id="links" className={`home-section ${className}`} aria-labelledby="links-title" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
    <div className="section-heading"><h2 id="links-title">Around the web</h2><span>Find me elsewhere</span></div>
    <div className="social-links">{links.map(({ label, detail, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon size={19} strokeWidth={1.6} aria-hidden="true" /><span><strong>{label}</strong><small>{detail}</small></span><ArrowUpRight className="social-arrow" size={16} aria-hidden="true" /></a>)}</div>
  </section>;
}
