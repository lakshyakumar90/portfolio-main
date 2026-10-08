import type { Metadata } from "next";
import Link from "next/link";
import { DeletionRequestForm } from "./request-form";

export const metadata: Metadata = {
  title: "Delete your Habitly account | Lakshya Kumar",
  description: "Request deletion of your Habitly account and associated data.",
  alternates: { canonical: "https://lakshyakumar.in/habitly/delete-account" },
};

export default function DeleteHabitlyAccount() {
  const address = "lakshyakumar5023@gmail.com";
  const subject = encodeURIComponent("Habitly account and data deletion request");
  const body = encodeURIComponent("Please delete my Habitly account and associated data. The email address I used to sign in is: ");
  return <main className="min-h-dvh px-5 py-12 text-neutral-800 dark:text-neutral-200 sm:py-20"><article className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-12">
    <Link href="/habitly/privacy-policy" className="text-sm font-semibold underline underline-offset-4">← Privacy Policy</Link>
    <h1 className="mt-8 text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">Delete your Habitly account</h1>
    <p className="mt-5 leading-7">If you can open Habitly, go to <strong>Settings → Account → Delete account</strong>. This removes your Habitly account and its synced habits, check-ins, tasks, and preferences. Your Google account is unaffected.</p>
    <p className="mt-5 leading-7">If you cannot access the app, submit a request below. We will verify ownership through the account email before deleting the account and associated cloud data. A request alone never deletes an account.</p>
    <DeletionRequestForm />
    <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">If the form is unavailable, <a className="underline underline-offset-4" href={`mailto:${address}?subject=${subject}&body=${body}`}>email a deletion request</a> to {address}. Data exported or copied outside Habitly is not removed by account deletion.</p>
  </article></main>;
}
