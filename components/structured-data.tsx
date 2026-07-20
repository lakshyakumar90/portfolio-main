"use client";

import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Lakshya Kumar",
      jobTitle: "Full Stack Developer",
      description:
        "Full-Stack Developer with hands-on experience in Full-Stack, real-time systems, and AI-integrated platforms. Passionate about scalable architecture and modern UI/UX design.",
      url: "https://lakshyakumar.in",
      image: "https://lakshyakumar.in/lakshya.jpeg",
      email: "lakshyakumar5023@gmail.com",
      nationality: "Indian",
      address: {
        "@type": "PostalAddress",
        addressCountry: "India",
        addressRegion: "Uttarakhand",
        addressLocality: "Dehradun",
      },
      sameAs: [
        "https://www.linkedin.com/in/kumar-lakshya",
        "https://github.com/lakshyakumar90",
        "https://lakshyakumar.in",
      ],
      knowsAbout: [
        "Full Stack Development",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "Socket.IO",
        "TypeScript",
        "JavaScript",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "Tailwind CSS",
        "Framer Motion",
        "GSAP",
        "Zustand",
        "React Query",
        "Redux",
        "Zod",
        "Firebase",
        "Supabase",
        "Python",
        "C++",
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Graphic Era Hill University",
          description: "B.C.A. (CGPA: 8.8)",
          addressCountry: "India",
          addressLocality: "Dehradun",
        },
      ],
      worksFor: [
        {
          "@type": "Organization",
          name: "Ophanim Technologies Pvt. Ltd.",
          description: "Full Stack Developer Intern",
        },
      ],
      award: [
        {
          "@type": "Award",
          name: "React Foundations for Next.js",
          description: "Certification demonstrating mastery of React foundations and Next.js architecture.",
        },
        {
          "@type": "Award",
          name: "Next.js SEO Fundamentals",
          description: "Certification on implementing SEO best practices, SSR, and SSG in Next.js applications.",
        },
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Full Stack Developer",
        description: "Building scalable web applications, real-time systems, and AI-integrated platforms",
        skills: [
          "React.js",
          "Next.js",
          "Node.js",
          "Express.js",
          "Socket.IO",
          "TypeScript",
          "MongoDB",
          "PostgreSQL",
          "Redis",
          "Tailwind CSS",
        ],
      },
    };

    try {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } catch (error) {
      console.error("Error adding structured data:", error);
    }
  }, []);

  return null;
}
