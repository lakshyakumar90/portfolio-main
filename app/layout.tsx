import type React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StructuredData from "@/components/structured-data";
import { ErrorBoundary } from "@/components/error-boundary";
import { LenisSmoothScroll } from "@/components/lenis-smooth-scroll";
import { NekoCat } from "@/components/neko-cat";
import { Analytics } from "@vercel/analytics/next";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
  title: "Lakshya Kumar - Full Stack Developer | Portfolio",
  description:
    "Full-Stack Developer with hands-on experience in Full-Stack, real-time systems, and AI-integrated platforms. Passionate about scalable architecture and modern UI/UX design.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Express Developer",
    "Socket.IO Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
    "India",
    "Lakshya Kumar",
    "Ophanim Technologies",
    "Graphic Era Hill University",
    "DevTinder",
    "AI Content Writer",
    "Aurora-UI",
    "Modern Portfolio",
    "Clean Portfolio",
    "Professional Portfolio",
    "Portfolio Website",
  ],
  authors: [{ name: "Lakshya Kumar" }],
  creator: "Lakshya Kumar",
  publisher: "Lakshya Kumar",
  generator: "Next.js",
  applicationName: "Lakshya Kumar Portfolio",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lakshyakumar.in",
    siteName: "Lakshya Kumar Portfolio",
    title: "Lakshya Kumar - Full Stack Developer",
    description:
      "Full-Stack Developer with hands-on experience in Full-Stack, real-time systems, and AI-integrated platforms. Passionate about scalable architecture and modern UI/UX design.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Lakshya Kumar - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lakshyakumar90",
    creator: "@lakshyakumar90",
    title: "Lakshya Kumar - Full Stack Developer",
    description:
      "Full-Stack Developer with hands-on experience in Full-Stack, real-time systems, and AI-integrated platforms. Passionate about scalable architecture and modern UI/UX design.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon?v=1",
    shortcut: "/favicon?v=1",
    apple: "/favicon?v=1",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "Portfolio Website",
  other: {
    "contact:email": "lakshyakumar5023@gmail.com",
    "contact:phone_number": "+91-9675761016",
    "contact:country_name": "India",
    "contact:region": "Uttarakhand",
    "contact:locality": "Dehradun",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/png",
    "og:image:alt": "Lakshya Kumar - Full Stack Developer Portfolio",
    "og:site_name": "Lakshya Kumar Portfolio",
    "og:locale": "en_US",
    "og:type": "website",
    "og:url": "https://lakshyakumar.in",
    "og:title": "Lakshya Kumar - Full Stack Developer",
    "og:description":
      "Full-Stack Developer with hands-on experience in Full-Stack, real-time systems, and AI-integrated platforms. Passionate about scalable architecture and modern UI/UX design.",
    "og:image": "/og.png",
    "twitter:image:alt": "Lakshya Kumar - Full Stack Developer Portfolio",
    "twitter:domain": "lakshyakumar.in",
    "twitter:url": "https://lakshyakumar.in",
    "whatsapp:image": "/og.png",
    "whatsapp:title": "Lakshya Kumar - Full Stack Developer",
    "whatsapp:description":
      "Full-Stack Developer with hands-on experience in Full-Stack, real-time systems, and AI-integrated platforms. Passionate about scalable architecture and modern UI/UX design.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <StructuredData />
      </head>
      <body className="font-sans min-h-dvh bg-grid text-foreground">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LenisSmoothScroll />
            <NekoCat />
            <div className="min-h-dvh">
              {children}
            </div>
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
