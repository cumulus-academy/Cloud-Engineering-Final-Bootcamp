# frontend/

The public, **read-only** portfolio + operations website. Built with
**React + Vite + Tailwind CSS + shadcn/ui**. **Provided by the academy — do not
rewrite it.** Your work is to containerize it and serve it from EKS behind an ALB.

There is **no authentication** — recruiters just browse.

## Pages

**Portfolio:** Home · About · Skills · Certifications · Projects · Contact
**Operations:** Architecture · Platform Status · Technology Stack · Deployment Overview

Data for About/Skills/Certifications/Projects/Status comes from the **backend
API**. Identity/branding (your name, links, domain) comes from
`src/data/site.js`, which is generated from `customization.json`.

## Configuration

| Variable | Purpose | Local | Production (your job) |
|---|---|---|---|
| `VITE_API_BASE_URL` | Where the browser calls the API | `http://localhost:4000` (from `.env`) | **leave empty** → same-origin `/api`, routed by your ALB Ingress |

`VITE_*` variables are **baked in at build time**. In the Dockerfile it is a
build `ARG`. For production, building with an empty value makes the app call
`/api/...` on its own origin, so your Kubernetes Ingress (Milestone 7) can route
`/api` to the backend Service.

## Run it

Locally it runs as part of `make dev`. To run the dev server on its own:

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000  (proxying to VITE_API_BASE_URL)
```

Build the production bundle:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the built bundle locally
```

## shadcn/ui components

The reusable UI primitives live in `src/components/ui/` (button, card, badge,
separator). They follow the shadcn/ui convention and use the `cn()` helper in
`src/lib/utils.js`. The theme tokens are in `src/index.css` and
`tailwind.config.js`. If you want to add more shadcn components you *may*, but
it is not required for the capstone.

## What YOU will do later

- **Milestone 4:** build this Dockerfile and push the image to **ECR**.
- **Milestone 5:** deploy it to **EKS**; wire the `/healthz` probe.
- **Milestone 7:** front it with **ALB Ingress + Route53 + ACM** for HTTPS, and
  route `/api` to the backend.

## Files

```
frontend/
├── Dockerfile / nginx.conf       # build + serve
├── index.html, vite.config.js, tailwind.config.js, postcss.config.js
└── src/
    ├── main.jsx, App.jsx          # entry + router
    ├── index.css                  # Tailwind + shadcn theme
    ├── data/site.js               # generated from customization.json
    ├── lib/                       # api client, cn(), useFetch
    ├── components/ (ui/ + layout) # shadcn primitives + Navbar/Footer/...
    └── pages/                     # the 10 pages + NotFound
```
