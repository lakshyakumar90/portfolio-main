"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Github, Linkedin, Mail, PanelsTopLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Dock() {
  const pathname = usePathname();
  const items = [
    { icon: Home, label: "Home", href: "/" },
    { icon: PanelsTopLeft, label: "Projects", href: "/projects" },
    { icon: Github, label: "GitHub", href: "https://github.com/lakshyakumar90" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kumar-lakshya" },
    { icon: Mail, label: "Email", href: "mailto:lakshyakumar5023@gmail.com" },
  ];
  return <div className="site-dock-wrap"><nav className="site-dock" aria-label="Quick actions">
    {items.map(({ icon: Icon, label, href }) => {
      const external = href.startsWith("https:");
      return <Link key={label} href={href} aria-label={label} title={label} aria-current={!external && (href === "/" ? pathname === "/" : pathname.startsWith(href)) ? "page" : undefined} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="dock-action">
        <Icon size={19} strokeWidth={1.6} aria-hidden="true" /><span className="dock-tooltip" aria-hidden="true">{label}</span>
      </Link>;
    })}
    <span className="dock-divider" aria-hidden="true" /><ThemeToggle className="dock-theme" />
  </nav></div>;
}
