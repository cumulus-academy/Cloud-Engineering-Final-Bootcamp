// =============================================================================
// Offline smoke test for the contact-form handler.
//
//   node local-run.js
//
// No AWS setup or `npm install` needed — the stub only validates and logs.
// =============================================================================

import { handler } from "./index.js";

async function call(label, body) {
  const event = { requestContext: { http: { method: "POST" } }, body: JSON.stringify(body) };
  const res = await handler(event);
  console.log(`${label}: status ${res.statusCode} -> ${res.body}`);
}

await call("valid message", {
  name: "Jordan Recruiter",
  email: "jordan@example.com",
  message: "Loved your portfolio — are you open to a chat?",
});

await call("missing fields", { name: "", email: "", message: "" });

await call("bad email", { name: "Test", email: "not-an-email", message: "hi" });
