// =============================================================================
// API client — talks to the backend.
// =============================================================================
// The base URL comes from the VITE_API_BASE_URL build-time variable.
//   - Local:      http://localhost:4000   (set in .env / docker-compose)
//   - Production: leave EMPTY to use same-origin relative paths ("/api/...").
//                 Your ALB Ingress (Milestone 7) routes /api to the backend.
// =============================================================================

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function getJSON(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}) for ${path}`);
  }
  return res.json();
}

export const api = {
  health: () => getJSON("/api/health"),
  status: () => getJSON("/api/status"),
  profile: () => getJSON("/api/profile"),
  skills: () => getJSON("/api/skills"),
  certifications: () => getJSON("/api/certifications"),
  projects: () => getJSON("/api/projects"),

  // Contact form posts here. The endpoint is served by the contact-form Lambda
  // you deploy later (Milestone 6). Until then this will fail gracefully and the
  // Contact page shows a friendly placeholder message.
  contact: (payload) =>
    fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
};
