import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { FieldValue, getFirestore, type Firestore } from "firebase-admin/firestore";

const PROJECT_ID = "habit-tracker-271da";

export function habitlyAdmin() {
  const raw = process.env.HABITLY_FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Habitly Admin SDK credentials are not configured.");
  const credentials = JSON.parse(raw) as { project_id?: string; client_email?: string; private_key?: string };
  if (credentials.project_id !== PROJECT_ID || !credentials.client_email || !credentials.private_key) {
    throw new Error("Habitly Admin SDK credentials do not match the Firebase project.");
  }
  const app = getApps().some(item => item.name === "habitly-admin")
    ? getApp("habitly-admin")
    : initializeApp({ credential: cert({ projectId: PROJECT_ID, clientEmail: credentials.client_email, privateKey: credentials.private_key }), projectId: PROJECT_ID }, "habitly-admin");
  return { auth: getAuth(app), firestore: getFirestore(app) };
}

export async function deleteHabitlyAccount(uid: string, { auth, firestore }: { auth: Auth; firestore: Firestore }) {
  if (!/^[A-Za-z0-9_-]+$/.test(uid)) throw new Error("Invalid user ID.");
  const root = firestore.collection("users").doc(uid);
  // Keep this marker so stale/offline clients cannot recreate deleted records.
  await root.set({ deletionStatus: "deleting", deletionStartedAt: FieldValue.serverTimestamp() });
  for (const child of await root.listCollections()) await firestore.recursiveDelete(child);
  await root.set({ deletionStatus: "deleted", deletedAt: FieldValue.serverTimestamp() });
  try { await auth.deleteUser(uid); }
  catch (error) { if ((error as { code?: string }).code !== "auth/user-not-found") throw error; }
}
