import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Habitly — Habits and tasks for everyday progress",
  description: "Habitly is an Android habit and task tracker for building routines, planning your day, and seeing your progress.",
  alternates: { canonical: "https://www.lakshyakumar.in/habitly" },
};

const features = [
  { title: "Build habits", copy: "Set routines that fit your week, check in each day, and keep a record of your progress." },
  { title: "Plan your tasks", copy: "Keep today’s tasks together, organize them in lists, and add reminders when you need them." },
  { title: "See your progress", copy: "Review streaks, history, and statistics to understand how your routines are going." },
];

export default function HabitlyHome() {
  return <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <header className="flex min-h-20 items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800">
        <Link href="/habitly" aria-label="Habitly home" className="flex items-center gap-3 font-semibold tracking-tight"><Image src="/habitly-logo.png" width={36} height={36} alt="" className="rounded-xl" />Habitly</Link>
        <nav aria-label="Habitly links" className="flex items-center gap-4 text-sm sm:gap-7"><Link href="/habitly/privacy-policy" className="underline-offset-4 hover:underline focus-visible:underline">Privacy Policy</Link><Link href="/habitly/delete-account" className="underline-offset-4 hover:underline focus-visible:underline">Delete account</Link></nav>
      </header>

      <section className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:py-28">
        <div><h1 className="max-w-2xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">Make room for better days with Habitly.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">Habitly is an Android habit and task tracker. Plan what matters today, keep up with your routines, and see the progress you’ve made over time.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/habitly/privacy-policy" className="inline-flex min-h-12 items-center rounded-xl bg-neutral-900 px-5 font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">Read our Privacy Policy</Link><Link href="/habitly/delete-account" className="inline-flex min-h-12 items-center rounded-xl border border-neutral-300 px-5 font-semibold transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-900">Account deletion</Link></div></div>
        <div className="flex min-h-72 items-center justify-center rounded-2xl bg-[#EEE9FF] p-10 dark:bg-[#242035]"><Image src="/habitly-logo.png" width={224} height={224} alt="Habitly logo" priority className="h-auto w-40 drop-shadow-lg sm:w-52" /></div>
      </section>

      <section aria-labelledby="inside-habitly" className="border-t border-neutral-200 py-14 dark:border-neutral-800 sm:py-20"><h2 id="inside-habitly" className="text-3xl font-semibold tracking-tight">A clear view of your day</h2><div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">{features.map(feature => <div key={feature.title} className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8"><h3 className="text-lg font-semibold">{feature.title}</h3><p className="max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">{feature.copy}</p></div>)}</div></section>

      <section aria-labelledby="data-in-habitly" className="max-w-3xl border-t border-neutral-200 py-14 dark:border-neutral-800 sm:py-20"><h2 id="data-in-habitly" className="text-3xl font-semibold tracking-tight">Your progress stays yours</h2><p className="mt-5 leading-8 text-neutral-600 dark:text-neutral-300">Habitly keeps your entries on your device. If you sign in with Google, it can sync your habits, tasks, and preferences to your Firebase account so they can be restored on another device. You can export your data or delete your Habitly account and synced records.</p><p className="mt-5 leading-7">Learn how we handle your information in the <Link href="/habitly/privacy-policy" className="font-semibold underline underline-offset-4">Habitly Privacy Policy</Link>.</p></section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 py-8 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"><span>Habitly · An app by Lakshya Kumar</span><div className="flex flex-wrap gap-5"><Link href="/habitly/privacy-policy" className="underline-offset-4 hover:underline">Privacy Policy</Link><Link href="/habitly/delete-account" className="underline-offset-4 hover:underline">Delete account</Link><a href="mailto:lakshyakumar5023@gmail.com" className="underline-offset-4 hover:underline">Contact</a></div></footer>
    </div>
  </main>;
}
