# 06 — CI/CD Guide

The pipelines live in [.github/workflows/](../.github/workflows/). One works on a
fresh fork; three are skeletons you complete.

| Workflow | Trigger | Status |
|---|---|---|
| `ci.yml` | push / PR | ✅ works now (tests + build) |
| `build-and-push.yml` | manual | 🟨 build images → ECR |
| `terraform.yml` | manual | 🟨 fmt/validate/plan/apply |
| `deploy.yml` | manual | 🟨 deploy overlay to EKS |

## The core idea: OIDC, not static keys

The AWS workflows authenticate using **GitHub's OIDC provider** and a short-lived
IAM role — there are **no long-lived AWS keys** stored in GitHub.

### Set up OIDC (Milestone 8)

1. **Create the IAM OIDC provider** (once per account):
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`
2. **Create an IAM role** whose trust policy allows your repo to assume it via
   that provider. Restrict the `sub` condition to your repo, e.g.:
   ```json
   "StringLike": { "token.actions.githubusercontent.com:sub": "repo:<owner>/<repo>:*" }
   ```
3. **Attach permissions** the pipelines need (ECR push, EKS describe, and the
   services Terraform manages). Scope as tightly as you reasonably can.
4. Put the role ARN in a repo **variable** `AWS_ROLE_ARN`.

> Bonus: provision the OIDC provider + role with Terraform.

## Repository variables

Settings → Secrets and variables → Actions → **Variables**:

| Variable | Example |
|---|---|
| `AWS_REGION` | `us-east-1` |
| `PROJECT_NAME` | `cloud-portfolio` |
| `DOMAIN_NAME` | `yourname.dev` |
| `AWS_ROLE_ARN` | `arn:aws:iam::123456789012:role/gha-cloud-portfolio` |
| `EKS_CLUSTER_NAME` | `cloud-portfolio-dev` |

These mirror `customization.json` (Actions can't read that file).

## Order to bring it up

1. Confirm `ci.yml` is green on your first push.
2. Set up OIDC + the variables above.
3. Run **`terraform.yml`** with action `apply` to build infrastructure.
4. Run **`build-and-push.yml`** to push images to ECR.
5. Run **`deploy.yml`** to roll out to EKS.
6. Enable the automatic `push` triggers (commented in each workflow) and wire
   build → push → deploy into one chain, or adopt a GitOps tool.

## Completing the skeletons

Each AWS workflow has `TODO(student)` markers — mostly setting the role ARN,
cluster name, and uncommenting the `kustomize edit set image` lines in
`deploy.yml`. The real build/plan/apply steps are already written.
