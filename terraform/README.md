# terraform/

All AWS infrastructure as code. **This is the heart of your capstone — you write
the resources.** The academy provides the *structure*: pinned providers, fully
defined input variables, and a module interface for each piece of the platform.
Every module body is a guided `TODO`.

```
terraform/
├── environments/
│   └── dev/                  # the root you run terraform from
│       ├── versions.tf        # ✅ providers (done)
│       ├── variables.tf       # ✅ inputs (done)
│       ├── terraform.tfvars.template  # ✅ rendered by `make customize`
│       ├── backend.tf         # 🟨 remote state — you complete (M2)
│       ├── main.tf            # 🟨 module wiring — you uncomment/complete
│       └── outputs.tf         # 🟨 you enable as modules land
└── modules/
    ├── network/    🟨  VPC, subnets, NAT            (M2)
    ├── rds/        🟨  PostgreSQL + Secrets Manager  (M3)
    ├── dynamodb/   🟨  visitor counter table         (M3)
    ├── ecr/        🟨  image repositories            (M4)
    ├── eks/        🟨  Kubernetes cluster            (M5)
    ├── lambda/     🟨  visitor-counter + contact-form (M6)
    └── dns-certs/  🟨  Route53 + ACM                 (M7)
```

✅ done for you · 🟨 you complete it (each has its own README + inline TODOs)

## Quick start

```bash
# 1. Generate terraform.tfvars from customization.json:
make customize          # creates terraform/environments/dev/terraform.tfvars

# 2. Work from the dev environment:
cd terraform/environments/dev
terraform init
terraform fmt -recursive
terraform validate      # passes out of the box — nothing is deployed yet
```

On a fresh clone, `init` + `validate` succeed because every module call in
`main.tf` is commented out. You enable them one at a time.

## How to work through it

1. Open `environments/dev/main.tf` — it's an ordered checklist (M2 → M7).
2. Pick the next module, open `modules/<name>/` and read its README + `main.tf`.
3. Write the resources, then **uncomment** that module's `outputs.tf`.
4. **Uncomment** the matching `module "..."` block (and any `output` in the dev
   `outputs.tf`).
5. `terraform plan` → review → `terraform apply`.
6. Repeat. Commit after each working module.

## Remote state (Milestone 2)

`backend.tf` explains how to create the S3 bucket + DynamoDB lock table and
switch from local to remote state. Do this early so your state is safe.

## Conventions

- Everything is tagged automatically (see `default_tags` in `versions.tf`).
- Name things `${var.project_name}-${var.environment}-...`.
- **Least privilege** for every IAM policy — scope to the exact action + ARN.
- Keep secrets in **Secrets Manager**, never in `.tf` or committed `.tfvars`.

## 💰 Cost & teardown

EKS, RDS, NAT gateways and the ALB cost real money by the hour. **Always tear
down when you stop working:**

```bash
cd terraform/environments/dev
terraform destroy
```

See [docs/04-terraform-guide.md](../docs/04-terraform-guide.md) for the full
walkthrough and [docs/09-troubleshooting.md](../docs/09-troubleshooting.md).
