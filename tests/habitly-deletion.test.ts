import { test } from "node:test";
import assert from "node:assert/strict";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import { deleteHabitlyAccount } from "../lib/habitly-admin";

test("deletes all subcollections before the Auth user", async () => {
  const events: string[] = [];
  const children = [{ id: "habits" }, { id: "tasks" }, { id: "future-data" }];
  const root = {
    set: async (value: { deletionStatus: string }) => { events.push(`marker:${value.deletionStatus}`); },
    listCollections: async () => children,
  };
  const firestore = {
    collection: () => ({ doc: () => root }),
    recursiveDelete: async (child: { id: string }) => { events.push(`delete:${child.id}`); },
  } as unknown as Firestore;
  const auth = { deleteUser: async () => { events.push("auth"); } } as unknown as Auth;
  await deleteHabitlyAccount("testUid_123", { auth, firestore });
  assert.deepEqual(events, ["marker:deleting", "delete:habits", "delete:tasks", "delete:future-data", "marker:deleted", "auth"]);
});

test("keeps the Auth user when cloud deletion fails", async () => {
  let authDeleted = false;
  const root = { set: async () => {}, listCollections: async () => [{ id: "habits" }] };
  const firestore = { collection: () => ({ doc: () => root }), recursiveDelete: async () => { throw new Error("Firestore unavailable"); } } as unknown as Firestore;
  const auth = { deleteUser: async () => { authDeleted = true; } } as unknown as Auth;
  await assert.rejects(deleteHabitlyAccount("testUid_123", { auth, firestore }), /Firestore unavailable/);
  assert.equal(authDeleted, false);
});
