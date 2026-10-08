import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/habitly-logo.png",
    shortcut: "/habitly-logo.png",
    apple: "/habitly-logo.png",
  },
};

export default function HabitlyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
