# lambdas/

Two small **AWS Lambda** microservices (Node.js 20), each behind **API Gateway**.

| Function | Route | Status | Backed by |
|---|---|---|---|
| [`visitor-counter/`](visitor-counter/) | `GET /api/visits` | ✅ Complete | DynamoDB |
| [`contact-form/`](contact-form/) | `POST /api/contact` | 🟨 Stub (you add delivery) | — (logs only) |

Both handlers:

- export `index.handler` and target the **Node.js 20** runtime,
- return API-Gateway-style responses with CORS headers,
- work for both REST API (`httpMethod`) and HTTP API v2 (`requestContext.http.method`),
- can be **smoke-tested offline** with `node local-run.js` (no AWS, no install).

## What's provided vs. your job

**Provided (don't rewrite):** the handler logic, validation, DynamoDB access,
and local runners.

**Your job (Milestone 6):** create the DynamoDB table, package + deploy both
functions, attach **least-privilege** IAM roles, and wire **API Gateway** routes.
See [terraform/modules/lambda](../terraform/modules/lambda/) and
[docs/04-terraform-guide.md](../docs/04-terraform-guide.md).

> The `contact-form` function is deliberately a placeholder — see its README for
> the simple delivery options (SES / SNS / DynamoDB). Pick one; keep it simple.
