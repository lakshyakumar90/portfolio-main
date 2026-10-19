"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNavigation() {
  const pathname = usePathname();
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <nav className="site-nav" aria-label="Main navigation">
      <Link href="/" className="site-wordmark" aria-label="Lakshya Kumar home">lakshya<span aria-hidden="true">.</span></Link>
      <div className="site-nav-links">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
        <Link href="/projects" aria-current={pathname.startsWith("/projects") ? "page" : undefined}>Projects</Link>
        <Link href={pathname === "/projects" ? "/projects#book-a-meet" : "/#book-a-meet"} className="nav-talk">Let’s talk<ArrowUpRight size={14} aria-hidden="true" /></Link>
        <ThemeToggle />
      </div>
    </nav>
  </header>;
}
