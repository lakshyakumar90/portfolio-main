import nodemailer from "nodemailer";

export class DeletionEmailConfigurationError extends Error {
  constructor(public readonly missing: string[]) {
    super("Deletion request email is not configured.");
  }
}

export async function sendHabitlyDeletionRequest(
  requestId: string,
  accountEmail: string,
  contactEmail: string,
) {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT?.trim() || "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const configuredFrom = process.env.SMTP_FROM?.trim();
  const from = configuredFrom?.includes("@") ? configuredFrom : user;
  const to = process.env.CONTACT_TO?.trim() || "lakshyakumar5023@gmail.com";
  const missing = [
    !host && "SMTP_HOST",
    (!Number.isInteger(port) || port < 1 || port > 65535) && "SMTP_PORT",
    !user && "SMTP_USER",
    !pass && "SMTP_PASS",
  ].filter((value): value is string => typeof value === "string");
  if (missing.length) throw new DeletionEmailConfigurationError(missing);

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
  try {
    const result = await transport.sendMail({
      from,
      to,
      replyTo: contactEmail,
      subject: `Habitly account deletion request ${requestId}`,
      text: `Habitly account deletion request\nRequest ID: ${requestId}\nAccount email: ${accountEmail}\nContact email: ${contactEmail}\n\nVerify ownership by contacting the account email before running the admin deletion procedure. Do not treat this form submission as proof of ownership.`,
    });
    if (!result.accepted?.length) throw new Error("Deletion request recipient was not accepted.");
  } finally {
    transport.close();
  }
}

export function logDeletionEmailFailure(requestId: string, error: unknown) {
  // Never log credentials, message bodies, email addresses, or raw SMTP responses.
  const failure = error as { code?: unknown; responseCode?: unknown; command?: unknown } | null;
  console.error("Habitly deletion request email failed", {
    requestId,
    reason: error instanceof DeletionEmailConfigurationError ? "smtp_configuration" : failure?.code === "EAUTH" ? "smtp_authentication" : "smtp_delivery",
    missing: error instanceof DeletionEmailConfigurationError ? error.missing : undefined,
    code: typeof failure?.code === "string" ? failure.code : undefined,
    responseCode: typeof failure?.responseCode === "number" ? failure.responseCode : undefined,
    command: typeof failure?.command === "string" ? failure.command : undefined,
  });
}
