import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { logDeletionEmailFailure, sendHabitlyDeletionRequest } from "@/lib/habitly-deletion-email";

export const runtime = "nodejs";
export const maxDuration = 30;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Send the request as JSON." }, { status: 415 });
  }
  let body: { accountEmail?: unknown; contactEmail?: unknown; website?: unknown };
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ received: true }); // Hidden spam field.
  const accountEmail = String(body.accountEmail ?? "").trim().toLowerCase();
  const contactEmail = String(body.contactEmail ?? "").trim().toLowerCase();
  if (!emailPattern.test(accountEmail) || !emailPattern.test(contactEmail) || accountEmail.length > 254 || contactEmail.length > 254) {
    return NextResponse.json({ error: "Enter a valid account and contact email." }, { status: 400 });
  }

  const requestId = randomUUID();
  try {
    await sendHabitlyDeletionRequest(requestId, accountEmail, contactEmail);
    return NextResponse.json({ received: true, requestId });
  } catch (error) {
    logDeletionEmailFailure(requestId, error);
    return NextResponse.json({ error: "Request could not be sent. Please use the email link below." }, { status: 503 });
  }
}
