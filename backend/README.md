# backend/

A small, **read-only** REST API built with **Node.js + Express**, reading from
PostgreSQL. **Provided by the academy — do not rewrite it.** Your work is to run
it in containers on EKS and connect it to RDS + Secrets Manager.

No authentication: this is a public portfolio API.

## Endpoints

| Method | Path | Returns | Uses DB? |
|---|---|---|---|
| GET | `/api/health` | Liveness: process up, uptime, timestamp | ❌ |
| GET | `/api/status` | Platform status (API + DB components) | ✅ |
| GET | `/api/profile` | The single profile row | ✅ |
| GET | `/api/skills` | Skills grouped by category | ✅ |
| GET | `/api/certifications` | Certifications list | ✅ |
| GET | `/api/projects` | Projects list (featured first) | ✅ |

> Use **`/api/health`** for your Kubernetes `livenessProbe` (it never touches the
> DB) and **`/api/status`** for the public Status page.

## Configuration

| Env var | Purpose | Local source | AWS source (your job) |
|---|---|---|---|
| `DATABASE_URL` | Postgres connection string | `.env` via compose | **Secrets Manager** (Milestone 3) |
| `BACKEND_PORT` | Port to listen on (default 4000) | `.env` | Kubernetes manifest |

## Run it

Locally it runs automatically as part of `make dev`. To run it on its own:

```bash
cd backend
npm install
DATABASE_URL=postgresql://portfolio:portfolio_local_password@localhost:5432/portfolio \
  npm start
# open http://localhost:4000/api/health
```

## Test

```bash
npm test          # Node's built-in runner; the health test needs no database
```

The health test starts the app on an ephemeral port and asserts `/api/health`.
This is what your **CI pipeline** should run (Milestone 8).

## What YOU will do later

- **Milestone 4:** build this Dockerfile and push the image to **ECR**.
- **Milestone 5:** deploy it to **EKS** with a Deployment + Service; wire the
  liveness/readiness probes to `/api/health`.
- **Milestone 3 + 9:** inject `DATABASE_URL` from **Secrets Manager**, never as
  plaintext.
- **Milestone 10:** ship its logs/metrics to **CloudWatch**.

## Files

```
backend/
├── Dockerfile
├── package.json
└── src/
    ├── server.js        # entrypoint (listen + graceful shutdown)
    ├── app.js           # express app wiring (importable for tests)
    ├── db.js            # pg pool + checkDb()
    └── routes/          # one file per resource
```
