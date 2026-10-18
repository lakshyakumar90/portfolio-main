import type React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StructuredData from "@/components/structured-data";
import { ErrorBoundary } from "@/components/error-boundary";
import { LenisSmoothScroll } from "@/components/lenis-smooth-scroll";
import { profileSummary } from "@/lib/profile";

import { Analytics } from "@vercel/analytics/next";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lakshyakumar.in"),
  title: "Lakshya Kumar - Full Stack Developer | Portfolio",
  description:
    profileSummary.description,
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
    "AI Teammates",
    "Excalidraw",
    "Habitly",
    "DevConnect",
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
      profileSummary.description,
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
      profileSummary.description,
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
      {/* Extensions can add body attributes before hydration (for example cz-shortcut-listen).
          This applies only to this element; child hydration mismatches remain visible. */}
      <body className="font-sans min-h-dvh bg-grid text-foreground" suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LenisSmoothScroll />

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
