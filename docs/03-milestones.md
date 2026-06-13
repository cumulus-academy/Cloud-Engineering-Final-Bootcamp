# 03 — Milestones (your assignment & grading checklist)

Work through these in order. Each builds on the last. Tick the boxes as you go —
this is also what you hand in.

> Commit after each working milestone. Small, frequent commits make grading
> (and debugging) far easier.

---

## M1 — Run locally ✅

- [ ] Forked the repo and cloned your fork
- [ ] Edited `customization.json` and ran `make customize`
- [ ] `make dev` runs; site shows **your** name and data
- [ ] Status page shows API + Database operational

**Done when:** the app runs locally and is personalized.

---

## M2 — Terraform foundations

- [ ] Created the **remote state** S3 bucket + DynamoDB lock table and completed
      `backend.tf` (`terraform init -migrate-state`)
- [ ] Completed the **network** module (VPC, public/private subnets, IGW, NAT,
      route tables) with the Kubernetes subnet tags
- [ ] `terraform plan` / `apply` succeed; `vpc_id` output is set

**Done when:** `terraform apply` creates a working VPC and state is in S3.

---

## M3 — Data layer

- [ ] **rds** module: PostgreSQL in private subnets, password in **Secrets
      Manager** (`manage_master_user_password = true`), SG locked to the cluster
- [ ] **dynamodb** module: visitor counter table (key `id`)
- [ ] Ran `database/schema/001_init.sql` + your `seed.sql` against RDS

**Done when:** RDS + DynamoDB exist; the schema is loaded; no plaintext passwords.

---

## M4 — Containers & registry

- [ ] **ecr** module: `frontend` + `backend` repositories
- [ ] Built both images and pushed them to ECR (by hand first, then via CI)

**Done when:** both images are in ECR.

---

## M5 — Kubernetes on EKS

- [ ] **eks** module: cluster + node group + OIDC provider
- [ ] `aws eks update-kubeconfig` connects `kubectl`
- [ ] Completed the manifests (images via overlay, resources, DB secret)
- [ ] `kubectl apply -k kubernetes/overlays/dev`; pods are **Running**

**Done when:** frontend + backend pods run on EKS and pass their probes.

---

## M6 — Lambda microservices

- [ ] **lambda** module deploys `visitor-counter` (with DynamoDB access) and
      `contact-form`
- [ ] API Gateway exposes `GET /api/visits` and `POST /api/contact`
- [ ] IAM is **least privilege** (counter: only `UpdateItem` on its table)
- [ ] Implemented the contact-form delivery (SES/SNS/DynamoDB — your choice)

**Done when:** both functions work end-to-end through API Gateway.

---

## M7 — DNS & TLS

- [ ] **dns-certs** module: hosted zone (or existing) + DNS-validated **ACM** cert
- [ ] Installed the **AWS Load Balancer Controller**
- [ ] Ingress has your `host` + `certificate-arn`; ALB serves your domain
- [ ] Route53 alias points your domain at the ALB; **HTTPS works**

**Done when:** `https://<your-domain>` serves the site with a valid certificate.

---

## M8 — CI/CD

- [ ] `ci.yml` is green
- [ ] Set up **OIDC** (provider + role) and the repo variables
- [ ] `terraform.yml`, `build-and-push.yml`, `deploy.yml` run successfully
- [ ] A push to `main` builds → pushes → deploys automatically

**Done when:** a code change reaches production via the pipeline, no static keys.

---

## M9 — Security hardening

- [ ] No long-lived AWS keys anywhere (OIDC only)
- [ ] Secrets only in **Secrets Manager** / Kubernetes Secrets, never in git
- [ ] Security groups scoped (DB reachable only from the cluster)
- [ ] IAM policies scoped to specific actions + ARNs
- [ ] TLS end-to-end

**Done when:** the [security checklist](07-security.md) passes.

---

## M10 — Observability

- [ ] App logs flow to **CloudWatch**
- [ ] At least one useful **metric** and one **alarm**
- [ ] Status page reflects real signals (extend `/api/status`)
- [ ] Replaced the architecture diagram with your own (draw.io)

**Done when:** you can see logs/metrics and an alarm; the Status page is real.

---

## Submission checklist

- [ ] Public URL of your deployed site (`https://<your-domain>`)
- [ ] Link to your fork with all milestones committed
- [ ] All boxes above ticked (or notes on what's incomplete)
- [ ] Architecture diagram replaced with your own
- [ ] **You have run `terraform destroy`** if grading is complete (to stop costs)

> ⚠️ Leaving EKS/RDS/NAT/ALB running costs money daily. Tear down when you're not
> actively working — you can always `terraform apply` again.
