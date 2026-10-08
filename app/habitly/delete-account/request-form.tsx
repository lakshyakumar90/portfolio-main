"use client";

import { useState, type FormEvent } from "react";

export function DeletionRequestForm() {
  const [accountEmail, setAccountEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const website = new FormData(event.currentTarget).get("website");
    setWorking(true); setError("");
    try {
      const response = await fetch("/api/habitly/delete-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountEmail, contactEmail, website }),
      });
      const result = await response.json();
      if (!response.ok || !result.requestId) throw new Error(result.error || "Could not send your request.");
      setRequestId(result.requestId);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not send your request."); }
    finally { setWorking(false); }
  }

  if (requestId) return <div role="status" className="mt-7 rounded-xl bg-neutral-100 p-5 leading-7 dark:bg-neutral-900"><strong>Request received.</strong> Save reference <span className="font-mono text-sm">{requestId}</span>. We will contact the account email to verify ownership before deleting any account or data.</div>;
  return <form onSubmit={submit} className="mt-7 space-y-4">
    <div><label htmlFor="habitly-account-email" className="block text-sm font-semibold">Habitly account email</label><input id="habitly-account-email" type="email" autoComplete="email" required maxLength={254} value={accountEmail} onChange={event => setAccountEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-neutral-950 outline-none focus:border-neutral-950 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-white" /></div>
    <div><label htmlFor="habitly-contact-email" className="block text-sm font-semibold">Email where we can reach you</label><input id="habitly-contact-email" type="email" autoComplete="email" required maxLength={254} value={contactEmail} onChange={event => setContactEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-neutral-950 outline-none focus:border-neutral-950 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-white" /></div>
    <input name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" className="hidden" />
    {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
    <button type="submit" disabled={working} className="inline-flex min-h-12 items-center rounded-xl bg-neutral-950 px-5 font-semibold text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">{working ? "Sending request…" : "Request account deletion"}</button>
  </form>;
}
