"use client"

import {
  Github,
  Mail,
  Linkedin,
  Globe,
  Code2,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";

export function Dock() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(mobile);
  }, []);

  const items = [
    { type: "image", label: "Home", href: "#" },
    { icon: Code2, label: "Projects", href: "#projects" },
    { icon: Github, label: "GitHub", href: "https://github.com/lakshyakumar90" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kumar-lakshya" },
    { icon: Globe, label: "Website", href: "https://lakshyakumar.in" },
    { icon: Mail, label: "Email", href: "mailto:lakshyakumar5023@gmail.com" },
  ];
  
  return (
    <div className="pointer-events-auto fixed inset-x-0 bottom-5 sm:bottom-6 md:bottom-8 z-50 flex justify-center px-2 sm:px-4">
      <nav
        aria-label="Quick actions"
        className="flex items-center rounded-full border border-neutral-200/80 bg-white/90 px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-md shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] dark:border-neutral-800/80 dark:bg-neutral-950/90 dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center">
              {item.type === "image" ? (
                <a
                  href={item.href}
                  className="group relative inline-flex items-center justify-center rounded-full p-1.5 sm:p-2 transition-all duration-200 active:scale-90 hover:ring-2 hover:ring-neutral-300 dark:hover:ring-neutral-700"
                  style={
                    !isMobile
                      ? {
                          animation: `slideIn 0.4s ease-out ${index * 0.05}s both`,
                        }
                      : {}
                  }
                >
                  <img
                    src="/lakshya.jpeg"
                    alt={item.label}
                    className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover"
                  />
                  <span className="sr-only">{item.label}</span>
                </a>
              ) : Icon ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative inline-flex items-center justify-center rounded-full p-1.5 sm:p-2 text-neutral-700 transition-colors duration-200 hover:text-neutral-900 active:scale-90 dark:text-neutral-200 dark:hover:text-white"
                  style={
                    !isMobile
                      ? {
                          animation: `slideIn 0.4s ease-out ${index * 0.05}s both`,
                        }
                      : {}
                  }
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                  <span className="sr-only">{item.label}</span>
                </a>
              ) : null}
              {index < items.length - 1 ? (
                <span className="mx-1 sm:mx-2 h-4 sm:h-5 w-px bg-neutral-200/80 dark:bg-neutral-800/80" aria-hidden />
              ) : null}
            </div>
          );
        })}
        <span className="mx-1 sm:mx-2 h-4 sm:h-5 w-px bg-neutral-200/80 dark:bg-neutral-800/80" aria-hidden />
        <ThemeToggle className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-neutral-200/80 bg-white text-neutral-700 shadow-none hover:bg-neutral-100 hover:text-neutral-900 transition-colors active:scale-90 focus-visible:ring-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white dark:focus-visible:ring-neutral-700" />
      </nav>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
