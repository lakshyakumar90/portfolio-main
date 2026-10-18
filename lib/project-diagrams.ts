import diagramImages from "./diagram-images.json";

export type DiagramNode = {
  id: string;
  title: string;
  detail: string;
  column: 0 | 1 | 2;
  row: number;
  kind?: "interface" | "process" | "storage" | "external" | "decision";
};
export type DiagramEdge = { from: string; to: string; label: string; dashed?: boolean; bidirectional?: boolean };
export type ProjectDiagram = {
  image?: { src: string; alt: string; width: number; height: number };
  id: string;
  type: "diagram";
  heading: string;
  caption: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  notes: string[];
};

const node = (id: string, title: string, detail: string, column: 0 | 1 | 2, row: number, kind: DiagramNode["kind"] = "process"): DiagramNode => ({ id, title, detail, column, row, kind });
const edge = (from: string, to: string, label: string, dashed = false, bidirectional = false): DiagramEdge => ({ from, to, label, dashed, bidirectional });
const diagram = (id: string, heading: string, caption: string, nodes: DiagramNode[], edges: DiagramEdge[], notes: string[]): ProjectDiagram => ({ id, type: "diagram", heading, caption, nodes, edges, notes });

export const projectDiagrams: Record<string, ProjectDiagram[]> = {
  "ai-teammates": [
    diagram("architecture", "Architectural Diagram", "A Next.js workspace delegates durable AI execution to Trigger.dev. Identity, application data, transcripts, model providers, and bot computers have distinct responsibilities.", [
      node("browser", "Web workspace", "React · Tailwind CSS · chat and desktop UI", 1, 0, "interface"),
      node("clerk", "Identity & paid access", "Clerk · server-side owner and plan checks", 0, 1, "external"),
      node("web", "Application server", "Next.js · server actions · Zod", 1, 1),
      node("db", "Application records", "Neon PostgreSQL · Drizzle ORM", 2, 1, "storage"),
      node("models", "Model providers", "Gemini · Groq · OpenRouter · Ollama", 0, 2, "external"),
      node("worker", "Durable chat agent", "Trigger.dev · AI SDK · streamed turns", 1, 2),
      node("sandbox", "Bot computer", "Daytona · shell, files, desktop tools", 2, 2, "external"),
      node("transcript", "Conversation history", "Trigger default transcript storage", 0, 3, "storage"),
      node("memory", "Memory & accounting", "Neon shared facts and usage; sandbox MEMORY.md", 2, 3, "storage"),
    ], [edge("browser", "web", "session actions"), edge("web", "clerk", "check"), edge("web", "db", "read/write"), edge("web", "worker", "start session"), edge("worker", "models", "infer"), edge("worker", "sandbox", "tools"), edge("worker", "transcript", "persist transcript"), edge("worker", "memory", "load / meter")], ["Sentry observes the web and worker runtimes; monitoring is a supporting concern, not a message transport.", "The browser's optional noVNC view uses an authorized signed connection to Daytona. Group chat tools differ from direct-chat computer tools."]),
    diagram("workflow", "Workflow Diagram", "From bot creation to a streamed response: the web server checks access before the worker prepares context and executes the selected conversation mode.", [
      node("user", "Create a teammate", "Choose a role, instructions, and avatar", 1, 0, "interface"),
      node("provision", "Prepare the bot", "Validate input · provision Daytona · save bot", 1, 1),
      node("message", "Open chat & send", "Choose a model and a direct or group chat", 1, 2, "interface"),
      node("authorize", "Authorize the session", "Check ownership, paid access, and usage", 1, 3),
      node("context", "Prepare the agent", "Load instructions, memory, and model", 1, 4),
      node("direct", "Direct conversation", "Model can use the bot's computer tools", 0, 5),
      node("group", "Group conversation", "Model can hand off to another member", 2, 5),
      node("response", "Stream & retain", "Show response · store transcript · meter usage", 1, 6, "interface"),
    ], [edge("user", "provision", "create"), edge("provision", "message", "bot ready"), edge("message", "authorize", "start session"), edge("authorize", "context", "access granted"), edge("context", "direct", "direct mode"), edge("context", "group", "group mode"), edge("direct", "response", "tool results + text"), edge("group", "response", "member response")], ["Access or quota failures return to the user before a new authorized turn proceeds.", "A saved session can reload its transcript and reconnect to an in-progress response."]),
    diagram("group-handoff", "Feature Deep Dive: Group Handoffs", "A group turn keeps one managed response stream while transferring the active role to another authorized bot. This is a controlled handoff, not parallel agent execution.", [
      node("turn", "Start a group turn", "Resolve the active bot and group roster", 1, 0),
      node("choice", "Need another role?", "Active model chooses a handoff tool", 1, 1, "decision"),
      node("answer", "Answer as active bot", "No handoff required", 0, 2),
      node("validate", "Validate the transfer", "Member exists · not self · once per turn", 2, 2),
      node("reject", "Reject invalid handoff", "Return a tool error to the same turn", 1, 3),
      node("recipient", "Activate the recipient", "Reload recipient instructions and memory", 2, 3),
      node("stream", "Continue one stream", "Preserve prior text; update the bot identity", 1, 4, "interface"),
    ], [edge("turn", "choice", "evaluate request"), edge("choice", "answer", "no"), edge("choice", "validate", "yes"), edge("validate", "reject", "invalid", true), edge("validate", "recipient", "valid"), edge("answer", "stream", "final text"), edge("recipient", "stream", "recipient response")], ["The handoff tool permits only one transfer per turn and verifies the recipient against the group roster.", "The recipient receives routed memory access; the direct-chat computer tool set is not automatically exposed to the group."]),
  ],
  "excalidraw": [
    diagram("architecture", "Architectural Diagram", "Four applications share typed packages: the editor, HTTP API, WebSocket service, and flush worker. Redis coordinates live rooms; PostgreSQL stores durable scene snapshots.", [
      node("editor", "Browser editor", "Next.js · React · Jotai · Canvas engine", 1, 0, "interface"),
      node("local", "Guest & draft storage", "IndexedDB · local scenes and library", 0, 1, "storage"),
      node("api", "HTTP API", "Express · Zod · Better Auth", 1, 1),
      node("ws", "Room transport", "ws · edits, cursors, and presence", 2, 1),
      node("db", "Durable application data", "PostgreSQL · Prisma Next contract", 0, 2, "storage"),
      node("redis", "Live room coordination", "Redis · ioredis · pub/sub", 1, 2, "storage"),
      node("worker", "Snapshot flush worker", "BullMQ jobs · versioned scene writes", 1, 3),
      node("packages", "Shared TypeScript packages", "Engine · protocol · access · repositories", 2, 3),
    ], [edge("editor", "local", "guest save"), edge("editor", "api", "HTTP requests"), edge("editor", "ws", "WebSocket"), edge("api", "db", "scenes / accounts"), edge("api", "redis", "room operations"), edge("ws", "redis", "room updates"), edge("redis", "worker", "queued snapshot"), edge("worker", "db", "persist"), edge("packages", "worker", "reuse", true)], ["The web, API, socket service, and worker live in a pnpm/Turborepo workspace.", "Presence and previews are ephemeral; the persistence path shown is for committed scene state."]),
    diagram("workflow", "Workflow Diagram", "Visitors can draw immediately as guests or use authenticated scenes and collaborative rooms. Local input is rendered before committed edits are synchronized.", [
      node("open", "Open the editor", "Choose tools, styles, and a canvas", 1, 0, "interface"),
      node("mode", "Choose a workspace", "Guest canvas or authenticated workspace", 1, 1, "decision"),
      node("guest", "Draw as a guest", "Custom engine · local autosave", 0, 2),
      node("account", "Open a saved scene", "Sign in · load private scene or join room", 2, 2),
      node("local", "Keep the drawing locally", "Persist the guest scene in IndexedDB", 0, 3, "storage"),
      node("edit", "Edit with room access", "Enforce owner / editor / viewer role", 2, 3),
      node("sync", "Reconcile & broadcast", "Validate deltas · update live room state", 2, 4),
      node("save", "Retain durable snapshots", "Queue Redis state · flush to PostgreSQL", 1, 5, "storage"),
    ], [edge("open", "mode", "start drawing"), edge("mode", "guest", "guest"), edge("mode", "account", "signed in"), edge("guest", "local", "autosave"), edge("account", "edit", "load / join"), edge("edit", "sync", "room commit"), edge("sync", "save", "snapshot job")], ["Private account scenes use the HTTP persistence path; the broadcast/flush branch describes collaborative rooms.", "A viewer can observe a room but cannot commit edits. Guest work remains on the device until explicitly imported."]),
    diagram("collaboration", "Feature Deep Dive: Live Edits & Persistence", "Committed elements and ephemeral presence take different paths. A recovery scan schedules dirty rooms if a write and queue-enqueue operation are interrupted.", [
      node("input", "Local canvas input", "Pointer movement, previews, or committed edits", 1, 0, "interface"),
      node("presence", "Ephemeral presence", "Cursors · selections · laser · previews", 0, 1),
      node("commit", "Committed element delta", "Validate role, protocol, versions, tombstones", 2, 1),
      node("peers", "Other connected clients", "Transient state; no database writes", 0, 2, "interface"),
      node("live", "Reconcile live room", "Redis state · revision · pub/sub broadcast", 2, 2, "storage"),
      node("recover", "Dirty-room recovery", "Startup and periodic scan of pending rooms", 1, 3),
      node("queue", "Schedule a snapshot", "BullMQ flush job", 2, 3),
      node("durable", "Write a durable revision", "Flush worker · PostgreSQL · retention", 2, 4, "storage"),
    ], [edge("input", "presence", "preview / movement"), edge("input", "commit", "commit"), edge("presence", "peers", "broadcast only"), edge("commit", "live", "accepted delta"), edge("live", "queue", "schedule flush"), edge("recover", "queue", "retry", true), edge("queue", "durable", "persist snapshot")], ["Element reconciliation uses shared deterministic rules; this is a custom protocol rather than a Yjs/Automerge integration.", "Redis-to-PostgreSQL persistence is asynchronous. The recovery scan helps close the write/enqueue crash gap."]),
  ],
  "habitly": [
    diagram("architecture", "Architectural Diagram", "SQLite is the center of the mobile app. Cloud identity and synchronization are optional services, while notifications stay specific to each device.", [
      node("screens", "Mobile screens", "Expo · React Native · Expo Router", 1, 0, "interface"),
      node("account", "Account lifecycle", "Firebase Auth · Google sign-in", 0, 1, "external"),
      node("app", "Application & domain logic", "React contexts · habits, tasks, statistics", 1, 1),
      node("reminders", "Device reminders", "Expo Notifications · native OS scheduling", 2, 1, "external"),
      node("local", "Local repositories", "Expo SQLite · per-account database", 1, 2, "storage"),
      node("outbox", "Change outbox", "SQLite triggers · operation and revision", 0, 3, "storage"),
      node("sync", "Cloud sync service", "Network / foreground retry · listeners", 1, 3),
      node("cloud", "Cloud records", "Firestore · per-user collections", 2, 3, "storage"),
    ], [edge("screens", "app", "user actions"), edge("account", "app", "account"), edge("app", "reminders", "schedule"), edge("app", "local", "read / write"), edge("local", "outbox", "SQL triggers"), edge("outbox", "sync", "flush"), edge("sync", "cloud", "sync", false, true)], ["Guest data uses its own database; switching accounts changes the database owner and reconciles local reminders.", "Account deletion additionally calls an external server endpoint; that server is outside the mobile repository."]),
    diagram("workflow", "Workflow Diagram", "Habit tracking stays usable offline. Signing in adds cloud synchronization without moving local interactions behind a network request.", [
      node("onboard", "Start or sign in", "Guest onboarding or Google / Firebase", 1, 0, "interface"),
      node("plan", "Plan the routine", "Create habits, schedules, tasks, reminders", 1, 1, "interface"),
      node("track", "Record today's progress", "Check in, log a value, or complete a task", 1, 2, "interface"),
      node("save", "Save on the device", "SQLite transaction · update local UI", 1, 3, "storage"),
      node("review", "Review progress", "Streaks · history · statistics", 0, 4, "interface"),
      node("eligible", "Cloud available?", "Signed in and connected", 2, 4, "decision"),
      node("pending", "Keep edits queued", "Offline or guest: continue locally", 1, 5, "storage"),
      node("sync", "Synchronize the account", "Push outbox · pull / listen · refresh", 2, 5),
    ], [edge("onboard", "plan", "ready"), edge("plan", "track", "daily use"), edge("track", "save", "local write"), edge("save", "review", "read local data"), edge("save", "eligible", "sync check"), edge("eligible", "pending", "no", true), edge("eligible", "sync", "yes")], ["Local reminders are scheduled through the device OS rather than sent as cloud push notifications.", "Google sign-in needs a native development/production build on mobile; guest mode does not require Firebase configuration."]),
    diagram("offline-sync", "Feature Deep Dive: Offline Sync Outbox", "An operation revision prevents an older upload from removing a newer pending edit. Remote application is guarded so it does not create another outgoing change.", [
      node("edit", "Change a local record", "Insert, update, or delete in SQLite", 1, 0),
      node("queue", "Queue the operation", "Trigger upserts entity + ID + revision", 1, 1, "storage"),
      node("network", "Connected & signed in?", "Network, foreground, or timer event", 1, 2, "decision"),
      node("wait", "Retain pending edits", "Retry later; local UI remains usable", 0, 3, "storage"),
      node("upload", "Upload current state", "Firestore payload or deletion tombstone", 2, 3),
      node("ack", "Acknowledge this revision", "Remove outbox row only if revision matches", 2, 4),
      node("remote", "Receive remote changes", "Initial pull or Firestore snapshot listener", 1, 5),
      node("guard", "Apply only safe changes", "Skip pending local edits; suppress triggers", 1, 6),
    ], [edge("edit", "queue", "write transaction"), edge("queue", "network", "pending operation"), edge("network", "wait", "no", true), edge("network", "upload", "yes"), edge("upload", "ack", "successful write"), edge("ack", "remote", "hydrate / listen"), edge("remote", "guard", "check local outbox")], ["Newer local edits retain their outbox row when an older upload completes. Failed uploads remain pending.", "Remote imports set the importing guard, preventing echo writes; reminder identifiers are reconciled per device."]),
  ],
  "aurora-ui": [
    diagram("architecture", "Architectural Diagram", "Source files power the documentation and component registry. Browser previews, AI assistance, and account storage are distinct parts of the platform.", [
      node("visitor", "Developer browser", "React · Tailwind CSS · Radix · Motion", 1, 0, "interface"),
      node("docs", "Documentation & registry", "Next.js App Router · Shiki · MDX support", 1, 1),
      node("files", "Component source", "Checked-in TSX · demos · JSON templates", 0, 2, "storage"),
      node("play", "Editable preview", "Sandpack · React / TypeScript files", 1, 2, "interface"),
      node("auth", "Account services", "NextAuth · Google / credentials · email", 2, 2),
      node("exports", "Registry consumers", "Source endpoints · installer / v0 exports", 0, 3, "external"),
      node("gemini", "AI code assistance", "Next.js API → Gemini 2.5 Flash", 1, 3, "external"),
      node("db", "Identity records", "Prisma 6 · PostgreSQL", 2, 3, "storage"),
    ], [edge("visitor", "docs", "browse"), edge("docs", "files", "read source"), edge("docs", "play", "load example"), edge("docs", "auth", "account actions"), edge("files", "exports", "registry JSON"), edge("play", "gemini", "prompt + code"), edge("auth", "db", "adapter")], ["Components and templates are source-controlled files, not database content records.", "Registry-serving code is in this repository. The separately advertised CLI executable is not part of this checkout."]),
    diagram("workflow", "Workflow Diagram", "A developer can inspect a component, experiment with it, and consume its source without confusing the documentation site with the generated React application.", [
      node("discover", "Find a component", "Browse docs, examples, or templates", 1, 0, "interface"),
      node("inspect", "Inspect the implementation", "Live demo · highlighted code · dependencies", 1, 1, "interface"),
      node("choose", "Choose a next step", "Reuse the source or experiment first", 1, 2, "decision"),
      node("reuse", "Get source & dependencies", "Registry JSON / component-file endpoint", 0, 3),
      node("play", "Open the playground", "Edit the example in Sandpack", 2, 3, "interface"),
      node("integrate", "Integrate into a project", "Add source and required packages", 0, 4, "interface"),
      node("iterate", "Iterate with AI", "Generate, transform, explain, fix, or theme", 2, 4),
    ], [edge("discover", "inspect", "open example"), edge("inspect", "choose", "understand code"), edge("choose", "reuse", "reuse"), edge("choose", "play", "experiment"), edge("reuse", "integrate", "consume registry"), edge("play", "iterate", "send a prompt")], ["The site also offers reusable templates as checked-in registry manifests.", "Accounts and email verification use NextAuth and Prisma; component files remain source-controlled."]),
    diagram("ai-playground", "Feature Deep Dive: AI Playground", "The server turns a selected action and code context into a Gemini request. Returned file changes are merged into the editable Sandpack project.", [
      node("input", "Choose an AI action", "Prompt + files + selection / errors", 1, 0, "interface"),
      node("api", "POST /api/ai", "Use supplied key or server GEMINI_API_KEY", 1, 1),
      node("model", "Generate with Gemini", "Action-specific prompt · React-only output", 1, 2, "external"),
      node("parse", "Parse the response", "Strip code fences · attempt JSON parse", 1, 3),
      node("files", "File changes", "Merge returned files into Sandpack state", 0, 4),
      node("text", "Explanation or error", "Display text / API failure in the UI", 2, 4),
      node("preview", "Inspect the result", "Editable code + running browser preview", 0, 5, "interface"),
    ], [edge("input", "api", "submit action"), edge("api", "model", "prompt + context"), edge("model", "parse", "response text"), edge("parse", "files", "files object"), edge("parse", "text", "text / failure", true), edge("files", "preview", "update preview")], ["Generated files use ordinary React rather than Next.js server/router APIs, matching the Sandpack runtime.", "Malformed JSON has a text fallback. The diagram does not imply strict schema validation, an automated test runner, or automatic deployment."]),
  ],
  "devconnect": [
    diagram("architecture", "Architectural Diagram", "A React SPA uses separate REST and Socket.IO paths. MongoDB stores product records; Redis coordinates live presence and socket fanout.", [
      node("spa", "Browser application", "React · Vite · Redux Toolkit · Tailwind", 1, 0, "interface"),
      node("api", "REST API", "Express · controllers · JWT middleware", 0, 1),
      node("socket", "Real-time transport", "Socket.IO · chat and presence events", 2, 1),
      node("db", "Product records", "MongoDB · Mongoose models", 0, 2, "storage"),
      node("uploads", "Uploads & email", "Multer · Cloudinary / local · Nodemailer", 1, 2, "external"),
      node("redis", "Live coordination", "ioredis · Socket.IO Redis adapter", 2, 2, "storage"),
      node("github", "GitHub integration", "Custom OAuth · profile / repository API", 1, 1, "external"),
    ], [edge("spa", "api", "Axios + token"), edge("spa", "socket", "socket events"), edge("api", "db", "read / write"), edge("api", "uploads", "files / email"), edge("socket", "db", "chat writes"), edge("socket", "redis", "presence / fanout"), edge("api", "github", "OAuth")], ["Express and Socket.IO share one Node HTTP server. REST JWT middleware and socket identity are separate implementation paths.", "The active authentication flow uses custom JWT and GitHub OAuth; uploads can use Cloudinary or local storage."]),
    diagram("workflow", "Workflow Diagram", "A developer signs in, completes a profile, and explores social or job workflows. Connections and job relationships also feed the messaging experience.", [
      node("signin", "Register or sign in", "Email / password or GitHub OAuth", 1, 0, "interface"),
      node("profile", "Build a profile", "Skills · bio · avatar · GitHub details", 1, 1, "interface"),
      node("discover", "Explore the network", "Search developers, posts, and jobs", 1, 2, "interface"),
      node("connect", "Connect with developers", "Send, accept, or reject requests", 0, 3),
      node("share", "Share and discuss", "Publish posts · react · comment", 1, 3),
      node("jobs", "Find an opportunity", "Post jobs · apply · review applications", 2, 3),
      node("chat", "Continue the conversation", "Messaging · presence · notifications", 1, 4, "interface"),
    ], [edge("signin", "profile", "session ready"), edge("profile", "discover", "browse"), edge("discover", "connect", "people"), edge("discover", "share", "feed"), edge("discover", "jobs", "opportunities"), edge("connect", "chat", "accepted connection"), edge("jobs", "chat", "job relationship")], ["Feed activity and job applications are persisted through REST controllers; live events update the interface.", "Messaging eligibility checks include accepted connections, existing chats, and applicable job relationships."]),
    diagram("messaging", "Feature Deep Dive: Messaging Lifecycle", "The socket handler checks a conversation relationship, stores the message, and emits delivery events. Reading messages updates their status and notifies the sender.", [
      node("compose", "Compose a message", "React chat UI · temporary client message ID", 1, 0, "interface"),
      node("receive", "Receive send_message", "Socket.IO handler · supplied participants", 1, 1),
      node("allowed", "Relationship allowed?", "Existing chat, connection, or job relation", 1, 2, "decision"),
      node("deny", "Return message_error", "Do not save or emit the message", 0, 3),
      node("save", "Save the message", "Mongoose Chat · sent / delivered status", 2, 3, "storage"),
      node("sender", "Acknowledge the sender", "message_sent · map temporary ID", 1, 4, "interface"),
      node("recipient", "Notify the recipient", "receive_message + stored notification", 2, 4, "interface"),
      node("read", "Update read status", "Persist read state · emit messages_read", 2, 5),
    ], [edge("compose", "receive", "send event"), edge("receive", "allowed", "check participants"), edge("allowed", "deny", "no", true), edge("allowed", "save", "yes"), edge("save", "sender", "acknowledge"), edge("save", "recipient", "emit to user room"), edge("recipient", "read", "open / read chat")], ["Redis supports cross-instance event distribution; the implementation also consults a local presence map for initial delivery status.", "Messages are embedded in Chat documents. REST history reads and socket read events update persisted message status."]),
  ],
};

// Keep semantic graph data available for accessible text and editable SVG exports.
for (const [slug, diagrams] of Object.entries(projectDiagrams)) {
  for (const item of diagrams) {
    const image = (diagramImages as Record<string, { src: string; width: number; height: number }>)[`${slug}/${item.id}`];
    if (image) item.image = { ...image, alt: `${item.heading}: ${item.caption}` };
  }
}
