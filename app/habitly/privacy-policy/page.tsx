import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Habitly Privacy Policy | Lakshya Kumar",
  description: "How Habitly handles account information, habits, tasks, reminders, and synced data.",
  alternates: { canonical: "https://www.lakshyakumar.in/habitly/privacy-policy" },
};

export default function HabitlyPrivacyPolicy() {
  return (
    <main className="min-h-dvh px-5 py-12 text-neutral-800 dark:text-neutral-200 sm:py-20">
      <article className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-12">
        <Link href="/habitly" className="text-sm font-semibold text-neutral-600 underline underline-offset-4 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white">← Habitly home</Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">Habitly Privacy Policy</h1>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">Effective 8 October 2026 · Operated by Lakshya Kumar</p>
        <div className="mt-10 space-y-8 text-base leading-7">
          <section><h2 className="text-xl font-semibold text-neutral-950 dark:text-white">What Habitly stores</h2><p className="mt-2">Habitly stores the habits, check-ins, tasks, reminder choices, and app preferences you enter. This information is kept on your device. If you sign in with Google, Habitly receives your Google account identifier, name, email address, and profile photo as provided by Google, and syncs your app data to Firebase under your account.</p></section>
          <section><h2 className="text-xl font-semibold text-neutral-950 dark:text-white">How your data is used</h2><p className="mt-2">We use this information to show your progress, schedule reminders on your device, and restore your data when you sign in on another device. Habitly does not sell your personal data or use it for advertising. Device notifications require your permission and can be disabled in the app or device settings. If you submit a web deletion request, your account and contact email addresses are emailed to support so we can verify and process it.</p></section>
          <section><h2 className="text-xl font-semibold text-neutral-950 dark:text-white">Where data goes</h2><p className="mt-2">Signed-in account and synced app data are processed through Google Firebase Authentication and Cloud Firestore. Google sign-in is used only to authenticate your account. Guest data remains on your device unless you later sign in and choose to use cloud sync. Your device may also retain a local copy while signed in so Habitly works offline.</p></section>
          <section><h2 className="text-xl font-semibold text-neutral-950 dark:text-white">Your choices</h2><p className="mt-2">You can export your habits and tasks from Settings, turn off reminders, sign out, or clear app data. Signed-in users can delete their Habitly account and associated synced data from Settings → Account → Delete account. You can also <Link className="font-semibold underline underline-offset-4" href="/habitly/delete-account">request account and data deletion on the web</Link> if you cannot access the app. Deleting your Habitly account does not delete your Google account.</p></section>
          <section><h2 className="text-xl font-semibold text-neutral-950 dark:text-white">Retention and security</h2><p className="mt-2">We retain signed-in data while your Habitly account exists. Account deletion removes your Firebase account and Habitly records stored in the app’s Firestore collections; copies on other signed-in devices may remain locally until those devices clear their app storage. Data you export remains wherever you save it. Firebase provides authenticated access to cloud records, and network transfers use encrypted connections.</p></section>
          <section><h2 className="text-xl font-semibold text-neutral-950 dark:text-white">Contact and updates</h2><p className="mt-2">For privacy questions or deletion assistance, email <a className="font-semibold underline underline-offset-4" href="mailto:lakshyakumar5023@gmail.com">lakshyakumar5023@gmail.com</a>. We may update this policy as Habitly changes; the effective date above will change when we do.</p></section>
        </div>
      </article>
    </main>
  );
}
