// =============================================================================
// Contact Form Lambda  —  PROVIDED BY THE ACADEMY (intentional placeholder)
// =============================================================================
// Validates a contact submission and returns a success response.
// Intended to sit behind API Gateway (HTTP API) as POST /api/contact.
//
// >>> THIS IS A DELIBERATE STUB. <<<
// It validates and LOGS the message but does NOT deliver it anywhere yet.
// Wiring up real delivery is part of your work (see the TODO below). Keeping it
// simple is intentional — do not over-build this.
//
// Environment variables (you add these when you implement delivery):
//   CONTACT_DESTINATION_EMAIL   where to send messages (if you use SES)
//   CONTACT_SNS_TOPIC_ARN       topic to publish to    (if you use SNS)
// =============================================================================

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};

function getMethod(event) {
  return event?.httpMethod || event?.requestContext?.http?.method || "POST";
}

function response(statusCode, payload) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(payload) };
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export async function handler(event) {
  if (getMethod(event) === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  // Parse body (API Gateway delivers it as a JSON string).
  let data;
  try {
    data = typeof event?.body === "string" ? JSON.parse(event.body || "{}") : event?.body || {};
  } catch {
    return response(400, { error: "Request body must be valid JSON" });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();

  // Basic validation.
  if (!name || !email || !message) {
    return response(400, { error: "name, email and message are all required" });
  }
  if (!isValidEmail(email)) {
    return response(400, { error: "A valid email address is required" });
  }
  if (message.length > 5000) {
    return response(400, { error: "message is too long (max 5000 characters)" });
  }

  // ===========================================================================
  // TODO (students, Milestone 6): actually deliver this message.
  //
  // Pick ONE simple approach — you do not need all of them:
  //   A) Amazon SES  — import { SESClient, SendEmailCommand } and email yourself
  //                    (add "@aws-sdk/client-ses" to package.json).
  //   B) Amazon SNS  — publish to a topic you've subscribed your email to
  //                    (add "@aws-sdk/client-sns" to package.json).
  //   C) DynamoDB    — store submissions in a table to review later.
  //
  // Remember to grant the function's IAM role permission for ONLY the action
  // and resource you choose (least privilege).
  //
  // For now we simply log it. This is an INTENTIONAL placeholder.
  // ===========================================================================
  console.log("[contact-form] received submission:", {
    name,
    email,
    message: message.slice(0, 200) + (message.length > 200 ? "…" : ""),
  });

  return response(200, {
    ok: true,
    message: "Thanks! Your message has been received.",
  });
}
