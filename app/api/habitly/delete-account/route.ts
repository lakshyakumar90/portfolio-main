import { NextResponse } from "next/server";
import { deleteHabitlyAccount, habitlyAdmin } from "@/lib/habitly-admin";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";
  if (!authorization.startsWith("Bearer ") || authorization.length > 8192) {
    return NextResponse.json({ error: "Sign in before deleting your account." }, { status: 401 });
  }
  try {
    const { auth, firestore } = habitlyAdmin();
    const token = await auth.verifyIdToken(authorization.slice(7), true);
    if (!Number.isFinite(token.auth_time) || token.auth_time > Date.now() / 1000 || Date.now() / 1000 - token.auth_time > 300) {
      return NextResponse.json({ error: "Sign in with Google again to confirm deletion." }, { status: 403 });
    }
    await auth.getUser(token.uid);
    await deleteHabitlyAccount(token.uid, { auth, firestore });
    return NextResponse.json({ deleted: true });
  } catch (error) {
    const code = (error as { code?: string }).code ?? "";
    if (code.startsWith("auth/")) return NextResponse.json({ error: "Your sign-in expired. Sign in again and retry." }, { status: 401 });
    console.error("Habitly account deletion failed", error);
    return NextResponse.json({ error: "Account deletion could not finish. Retry or request help from support." }, { status: 500 });
  }
}
