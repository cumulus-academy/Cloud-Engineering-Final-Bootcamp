# Cloud Engineer Portfolio & Operations Platform

A capstone starter project for the **Cloud Engineering Academy**.

You are given a **working application** — a personal portfolio website plus a
small cloud-operations dashboard. Your job is **not** to write application code.
Your job is to take this app to production on AWS by building the
**infrastructure, deployment pipelines, security and observability** around it.

> **The app is given. The cloud is earned.**

![architecture placeholder](docs/diagrams/architecture.md)

---

## What you're building

By the end of this capstone you will have deployed a **public, AWS-hosted**
portfolio + operations platform using:

**AWS · Terraform · EKS · Kubernetes · RDS PostgreSQL · DynamoDB · Lambda ·
ECR · GitHub Actions · Route53 · ACM · CloudWatch · Application Load Balancer ·
Secrets Manager**

The application itself stays simple and **read-only** (no logins — recruiters
just browse):

- **Portfolio pages:** Home · About · Skills · Certifications · Projects · Contact
- **Operations pages:** Architecture · Platform Status · Technology Stack · Deployment Overview
- **Backend API:** profile, skills, certifications, projects, platform status, health
- **Lambdas:** a visitor counter (DynamoDB) and a simple contact-form handler
- **Database:** PostgreSQL schema + seed data for your profile

---

## Who this is for

Junior **cloud engineering** students. You should be comfortable with the AWS
console and a terminal. You do **not** need to be a software developer — the
application code is provided and tested for you.

---

## Prerequisites

Install locally:

- [Docker](https://docs.docker.com/get-docker/) (with Compose v2)
- [Node.js](https://nodejs.org/) 18+ (only used by the customization script)
- An **AWS account** you control (needed once you start the cloud work)
- [AWS CLI](https://aws.amazon.com/cli/), [Terraform](https://developer.hashicorp.com/terraform/downloads),
  [kubectl](https://kubernetes.io/docs/tasks/tools/) (needed from Milestone 2 onward)

> ⚠️ **Cost warning.** The AWS resources you build (EKS, RDS, ALB, NAT) cost real
> money. Always run your teardown (`terraform destroy`) when you stop working.
> See [docs/09-troubleshooting.md](docs/09-troubleshooting.md).

---

## Quick start (run it locally in 3 steps)

```bash
# 1. Fork this repo on GitHub, then clone YOUR fork.

# 2. Put your details in ONE file, then apply them:
#    edit customization.json   (name, email, links, domain, region, project)
make customize

# 3. Start the local stack:
make dev
```

Then open:

- Frontend → http://localhost:3000
- Backend health → http://localhost:4000/api/health

Stop everything with `make down` (or `make clean` to also wipe the database).
Run `make help` to see all commands.

---

## Customization — the only values you edit

Everything personal lives in **`customization.json`**. Keep it small:

| Key | Example | Used for |
|---|---|---|
| `STUDENT_NAME` | `Ada Lovelace` | Site heading, seed data |
| `STUDENT_EMAIL` | `ada@example.com` | Contact page, seed data |
| `STUDENT_LOCATION` | `London, UK` | About page |
| `STUDENT_LINKEDIN_URL` | `https://linkedin.com/in/ada` | Contact links |
| `STUDENT_GITHUB_URL` | `https://github.com/ada` | Contact links |
| `STUDENT_DOMAIN_NAME` | `ada.dev` | Route53 / ACM / Ingress host |
| `AWS_REGION` | `us-east-1` | Terraform + resource region |
| `PROJECT_NAME` | `cloud-portfolio` | Resource naming prefix |

After editing, run `make customize`. See
[docs/02-customization.md](docs/02-customization.md) for details.

---

## Repository tour

| Folder | What's here | Provided by academy | Your job |
|---|---|---|---|
| [`frontend/`](frontend/) | React + Vite + Tailwind + **shadcn/ui** site | ✅ Complete | Containerize-to-cluster only |
| [`backend/`](backend/) | Node + Express API | ✅ Complete | Wire to RDS + Secrets at deploy |
| [`lambdas/`](lambdas/) | visitor-counter + contact-form | ✅ Code complete (contact = stub) | Deploy via Terraform |
| [`database/`](database/) | Postgres schema + seed | ✅ Complete | Run against RDS |
| [`terraform/`](terraform/) | AWS infrastructure as code | 🟨 Scaffold + module interfaces | **Write the resources** |
| [`kubernetes/`](kubernetes/) | Kustomize manifests | 🟨 Partial manifests | **Complete the manifests** |
| [`.github/workflows/`](.github/workflows/) | CI/CD pipelines | 🟨 Skeletons | **Build the pipelines** |
| [`scripts/`](scripts/) | Dev helpers | ✅ Complete | — |
| [`docs/`](docs/) | Guides + diagrams | ✅ Complete | Read these! |

✅ = done for you · 🟨 = scaffolded with `TODO`s you must complete

> **Do not rewrite the application code.** If you think you found a bug in the
> app, ask an instructor — your grade is about the cloud work around it.

---

## Your mission: milestones

Full checklist in [docs/03-milestones.md](docs/03-milestones.md).

| # | Milestone | You deliver |
|---|---|---|
| M1 | Run locally | App running via `make dev`, customized |
| M2 | Terraform foundations | Remote state + VPC |
| M3 | Data layer | RDS PostgreSQL, DynamoDB, Secrets Manager |
| M4 | Containers & registry | Images built + pushed to ECR |
| M5 | Kubernetes on EKS | App deployed to the cluster |
| M6 | Lambdas | visitor-counter + contact-form deployed |
| M7 | DNS & TLS | Route53 + ACM + ALB Ingress, HTTPS live |
| M8 | CI/CD | GitHub Actions build → deploy on push |
| M9 | Security hardening | Least-privilege IAM, no plaintext secrets |
| M10 | Observability | CloudWatch logs, metrics, alarms; status page live |

---

## Where to find help

- [docs/00-getting-started.md](docs/00-getting-started.md) — environment setup
- [docs/01-architecture.md](docs/01-architecture.md) — how the system fits together
- [docs/04-terraform-guide.md](docs/04-terraform-guide.md) — infrastructure
- [docs/05-kubernetes-guide.md](docs/05-kubernetes-guide.md) — cluster deployment
- [docs/06-cicd-guide.md](docs/06-cicd-guide.md) — pipelines
- [docs/07-security.md](docs/07-security.md) · [docs/08-observability.md](docs/08-observability.md)
- [docs/09-troubleshooting.md](docs/09-troubleshooting.md) — stuck? start here

---

## Submission & grading

See [docs/03-milestones.md](docs/03-milestones.md) for the graded checklist and
what to hand in. **Remember to `terraform destroy` after grading to avoid costs.**
