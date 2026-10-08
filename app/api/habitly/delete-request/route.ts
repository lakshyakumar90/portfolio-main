import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Send the request as JSON." }, { status: 415 });
  }
  let body: { accountEmail?: unknown; contactEmail?: unknown; website?: unknown };
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (body.website) return NextResponse.json({ received: true }); // Hidden spam field.
  const accountEmail = String(body.accountEmail ?? "").trim().toLowerCase();
  const contactEmail = String(body.contactEmail ?? "").trim().toLowerCase();
  if (!emailPattern.test(accountEmail) || !emailPattern.test(contactEmail) || accountEmail.length > 254 || contactEmail.length > 254) {
    return NextResponse.json({ error: "Enter a valid account and contact email." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const to = process.env.CONTACT_TO || "lakshyakumar5023@gmail.com";
  if (!host || !Number.isInteger(port) || port < 1 || !user || !pass || !from) {
    return NextResponse.json({ error: "Requests are temporarily unavailable. Please use the email link below." }, { status: 503 });
  }

  const requestId = randomUUID();
  try {
    const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
    await transport.sendMail({
      from,
      to,
      replyTo: contactEmail,
      subject: `Habitly account deletion request ${requestId}`,
      text: `Habitly account deletion request\nRequest ID: ${requestId}\nAccount email: ${accountEmail}\nContact email: ${contactEmail}\n\nVerify ownership by contacting the account email before running the admin deletion procedure. Do not treat this form submission as proof of ownership.`,
    });
    return NextResponse.json({ received: true, requestId });
  } catch {
    return NextResponse.json({ error: "Request could not be sent. Please use the email link below." }, { status: 503 });
  }
}
