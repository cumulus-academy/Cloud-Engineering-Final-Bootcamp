# .github/workflows/

The CI/CD pipelines. One works on a fresh fork; the other three are **skeletons**
you complete (Milestone 8).

| Workflow | Trigger | Status | Purpose |
|---|---|---|---|
| [`ci.yml`](ci.yml) | push / PR | ✅ Works now | Backend tests + frontend build |
| [`build-and-push.yml`](build-and-push.yml) | manual | 🟨 Skeleton | Build images → push to ECR |
| [`terraform.yml`](terraform.yml) | manual | 🟨 Skeleton | `fmt`/`validate`/`plan`/`apply` |
| [`deploy.yml`](deploy.yml) | manual | 🟨 Skeleton | Deploy the overlay to EKS |

`ci.yml` should be **green immediately** — it runs the same checks you ran
locally and needs no AWS access. The other three run manually
(`workflow_dispatch`) so they don't fail before your AWS setup exists; enable
their automatic triggers once everything works.

## The big idea: OIDC, not static keys

These workflows authenticate to AWS using **GitHub's OIDC provider** and a
short-lived role — there are **no long-lived AWS access keys** stored in GitHub.
You set this up once (Milestone 8):

1. Create an IAM **OIDC identity provider** for `token.actions.githubusercontent.com`.
2. Create an IAM **role** whose trust policy allows your repo
   (`repo:<owner>/<repo>:*`) to assume it via that provider.
3. Give the role the permissions the pipelines need (ECR, EKS, Terraform-managed
   services). Scope it as tightly as you reasonably can.
4. Put the role ARN in a repository **variable** named `AWS_ROLE_ARN`.

> You can provision the OIDC provider + role with Terraform too — a nice bonus.

## Repository configuration

Settings → Secrets and variables → Actions → **Variables**:

| Variable | Example | Used by |
|---|---|---|
| `AWS_REGION` | `us-east-1` | all AWS workflows |
| `PROJECT_NAME` | `cloud-portfolio` | build, terraform, deploy |
| `DOMAIN_NAME` | `yourname.dev` | terraform |
| `AWS_ROLE_ARN` | `arn:aws:iam::123456789012:role/gha-cloud-portfolio` | all AWS workflows |
| `EKS_CLUSTER_NAME` | `cloud-portfolio-dev` | deploy |

(These mirror your `customization.json`, but GitHub Actions can't read that file,
so you set them here too.)

## Suggested order

1. `ci.yml` is already green — confirm it on your first push.
2. Set up OIDC + the repo variables above.
3. `terraform.yml` → **apply** to build infrastructure.
4. `build-and-push.yml` → push images to ECR.
5. `deploy.yml` → roll out to EKS.
6. Enable the automatic `push` triggers and wire them into a real
   build → push → deploy chain (or a GitOps flow).

See [docs/06-cicd-guide.md](../../docs/06-cicd-guide.md).
