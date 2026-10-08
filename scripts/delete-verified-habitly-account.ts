import { deleteHabitlyAccount, habitlyAdmin } from "../lib/habitly-admin";

async function main() {
  const [, , accountEmail, confirmedUid, requestId, acknowledgement] = process.argv;
  if (!accountEmail || !confirmedUid || !/^[a-f0-9-]{36}$/i.test(requestId ?? "") || acknowledgement !== "--verified") {
    throw new Error("Usage: npx tsx scripts/delete-verified-habitly-account.ts <account-email> <confirmed-uid> <request-id> --verified");
  }

  // Only run after independently confirming ownership through the Firebase
  // account email. A web form submission alone is not proof of ownership.
  const { auth, firestore } = habitlyAdmin();
  const user = await auth.getUserByEmail(accountEmail);
  if (user.uid !== confirmedUid) throw new Error("Firebase UID does not match the confirmed account email. No data was deleted.");
  await deleteHabitlyAccount(user.uid, { auth, firestore });
  process.stdout.write(`Deleted Habitly account ${user.uid} for verified request ${requestId}.\n`);
}

main().catch(error => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
