# 04 — Terraform Guide

All AWS infrastructure is Terraform. You write the resources; the academy gives
you the structure (providers, variables, module interfaces). Full layout:
[terraform/README.md](../terraform/README.md).

## Where you run it

```bash
make customize                  # generates terraform.tfvars from customization.json
cd terraform/environments/dev
terraform init
terraform fmt -recursive
terraform validate              # passes on a fresh clone — nothing deployed yet
```

On a fresh clone everything validates because the module calls in `main.tf` are
commented out. You enable them one at a time.

## The work loop

1. Open `environments/dev/main.tf` — it's an ordered checklist (M2 → M7).
2. Open the next `modules/<name>/` — read its README and `main.tf` TODOs.
3. Write the resources.
4. **Uncomment** that module's `outputs.tf`.
5. **Uncomment** the matching `module "..."` block in `main.tf` (and any output
   in the dev `outputs.tf`).
6. `terraform plan` → review → `terraform apply`. Commit.

## Remote state first (Milestone 2)

Local state is fine for your very first `init`, but move to S3 + DynamoDB early:

```bash
# Create once (bucket names are globally unique):
aws s3api create-bucket --bucket <PROJECT_NAME>-tfstate-<ACCOUNT_ID> \
  --region <AWS_REGION> --create-bucket-configuration LocationConstraint=<AWS_REGION>
aws s3api put-bucket-versioning --bucket <PROJECT_NAME>-tfstate-<ACCOUNT_ID> \
  --versioning-configuration Status=Enabled
aws dynamodb create-table --table-name <PROJECT_NAME>-tflock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST --region <AWS_REGION>
```

Then fill in `backend.tf` and run `terraform init -migrate-state`.

## Module order & dependencies

```
network → rds, dynamodb, ecr, eks
eks     → (node SG feeds rds), lambda
dynamodb→ lambda (visitor-counter table)
         → dns-certs (independent; needs your domain)
```

## Conventions

- Name resources `${var.project_name}-${var.environment}-...`.
- Everything is auto-tagged (see `default_tags` in `versions.tf`).
- **Least privilege** on every IAM policy (specific actions + ARNs).
- Secrets live in **Secrets Manager**, never in `.tf` or committed `.tfvars`.

## Using community modules

Writing the VPC and EKS by hand is great practice, but it's a lot. **With your
instructor's OK**, you may call `terraform-aws-modules/vpc/aws` and
`terraform-aws-modules/eks/aws` and map their outputs onto this repo's module
outputs. You still must understand what each resource is for.

## 💰 Cost & teardown

EKS (hourly control plane + nodes), RDS, NAT gateways, and the ALB cost real
money. **Always tear down when you stop:**

```bash
cd terraform/environments/dev
terraform destroy
```

If `destroy` fails on dependencies, check [09-troubleshooting.md](09-troubleshooting.md).
