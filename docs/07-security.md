# 07 — Security

Security is graded (Milestone 9). The goal is simple to state: **no long-lived
secrets, least-privilege everywhere, encrypted in transit.**

## Checklist

### Credentials & secrets
- [ ] **No static AWS keys** anywhere — GitHub Actions uses **OIDC**.
- [ ] DB password generated and stored in **Secrets Manager**
      (`manage_master_user_password = true` on RDS).
- [ ] No secrets in git: `.env`, `*.tfvars`, and kubeconfig are git-ignored;
      Kubernetes Secrets are created out-of-band, not committed.
- [ ] `terraform.tfstate` is in S3 (it can contain sensitive values) — never
      commit it.

### IAM (least privilege)
- [ ] Each Lambda role grants only what it needs:
      - visitor-counter → `dynamodb:UpdateItem` on **its** table ARN only
      - contact-form → only the action for your chosen delivery (e.g.
        `ses:SendEmail`)
- [ ] The GitHub OIDC role's trust policy is scoped to your repo
      (`repo:<owner>/<repo>:*`), not `*`.
- [ ] No `"Action": "*"` / `"Resource": "*"` policies left lying around.

### Network
- [ ] RDS is **not publicly accessible**; its security group allows 5432 only
      from the EKS node security group.
- [ ] EKS nodes and RDS live in **private** subnets.
- [ ] The ALB is the only internet-facing entry point.

### Transport
- [ ] **ACM** certificate on the ALB; HTTP redirects to HTTPS
      (`ssl-redirect: "443"`).
- [ ] The site loads over `https://` with a valid certificate.

### Images
- [ ] ECR `scan_on_push` is on; review and address findings.
- [ ] Containers run as non-root where possible (the backend image already does).

## How secrets flow (the right way)

```
RDS  ──creates──►  Secrets Manager secret
                        │
                        ▼
        you read it ──► Kubernetes Secret (backend-secrets)
                        │
                        ▼
              backend pod env: DATABASE_URL
```

No password is ever typed into a file you commit. For bonus marks, sync the
Kubernetes Secret automatically with the **External Secrets Operator** instead
of creating it by hand.

## Common mistakes to avoid

- Committing a real `terraform.tfvars` or `.env` — they're git-ignored for a
  reason; don't force-add them.
- A wide-open RDS security group (`0.0.0.0/0` on 5432). Lock it to the cluster.
- An OIDC role trust policy that allows any repo. Scope it to yours.
- Pasting AWS keys into GitHub secrets "just to get it working" — use OIDC.
