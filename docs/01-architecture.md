# 01 — Architecture

This is what you're building toward. See the diagram in
[diagrams/architecture.md](diagrams/architecture.md).

## The application (provided)

| Part | Tech | Folder |
|---|---|---|
| Frontend | React + Vite + Tailwind + shadcn/ui, served by nginx | `frontend/` |
| Backend API | Node.js + Express | `backend/` |
| Database | PostgreSQL | `database/` |
| Visitor counter | Lambda + DynamoDB | `lambdas/visitor-counter/` |
| Contact form | Lambda (stub) | `lambdas/contact-form/` |

The site is **public and read-only** — no logins. The only writes are the
visitor counter and the (placeholder) contact form.

## Target AWS architecture (you build)

```
Visitor → Route53 → ACM (TLS) → Application Load Balancer
                                      │
                          ┌─────────  EKS  ─────────┐
                          │  frontend pod   backend │
                          └──────────────────┬──────┘
                                             │
        ┌───────────────┬───────────────────┴───────┬──────────────┐
   RDS PostgreSQL   Secrets Manager           Lambda + DynamoDB   CloudWatch
                                              (visitor counter,
                                               via API Gateway)

   GitHub Actions ──(OIDC)──> ECR ──> EKS         Terraform ──> all AWS infra
```

## Request flows

- **Browse the site:** ALB routes `/` to the frontend pod; the React app calls
  `/api/*`, which the ALB routes to the backend pod; the backend reads from RDS.
- **DB credentials:** the backend reads `DATABASE_URL` from a Kubernetes Secret
  sourced from **Secrets Manager** — never plaintext.
- **Visitor counter:** the frontend calls API Gateway → `visitor-counter` Lambda
  → atomic increment in DynamoDB.
- **Contact form:** the frontend POSTs to API Gateway → `contact-form` Lambda
  (you implement delivery).
- **Deploys:** GitHub Actions authenticates to AWS with **OIDC**, builds images,
  pushes to **ECR**, and rolls them out to **EKS**. Terraform provisions
  everything.

## Local vs. production

| | Local (`make dev`) | Production (AWS) |
|---|---|---|
| Frontend/backend | Docker Compose | EKS pods |
| Database | postgres container | RDS PostgreSQL |
| Secrets | `.env` | Secrets Manager |
| TLS / DNS | none (localhost) | ACM + Route53 + ALB |
| Lambdas | run via `node local-run.js` | deployed + API Gateway |

## Two diagrams, two purposes

- [docs/diagrams/architecture.md](diagrams/architecture.md) — a **mermaid**
  reference diagram (this repo's source of truth, rendered on GitHub).
- `frontend/public/diagrams/architecture.drawio.svg` — **your** draw.io diagram,
  shown on the live site's Architecture page. Replace the placeholder with your
  own (see that folder's README).
