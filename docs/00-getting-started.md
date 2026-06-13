# 00 — Getting Started

Welcome. This guide gets the application running on your laptop so you can see
what you'll be deploying to AWS.

> Remember the rule: **the app is given, the cloud is earned.** Don't rewrite the
> application — your work is the infrastructure around it.

## 1. Prerequisites

Install these locally:

| Tool | Needed for | Check |
|---|---|---|
| [Docker](https://docs.docker.com/get-docker/) (Compose v2) | local stack | `docker compose version` |
| [Node.js](https://nodejs.org/) 18+ | customization script | `node -v` |
| [Git](https://git-scm.com/) | forking the repo | `git --version` |

You'll also need these once you start the cloud work (Milestone 2+):

- An **AWS account** you control
- [AWS CLI](https://aws.amazon.com/cli/) · [Terraform](https://developer.hashicorp.com/terraform/downloads) · [kubectl](https://kubernetes.io/docs/tasks/tools/)

## 2. Fork & clone

1. **Fork** this repo on GitHub (top-right).
2. Clone **your fork**:
   ```bash
   git clone https://github.com/<you>/<your-fork>.git
   cd <your-fork>
   ```

## 3. Customize

Edit `customization.json` at the repo root with your details, then:

```bash
make customize
```

This renders `.env`, the database seed, the frontend identity, and your
Terraform `terraform.tfvars`. See [02-customization.md](02-customization.md).

## 4. Run it

```bash
make dev
```

Open:

- Frontend → http://localhost:3000
- Backend health → http://localhost:4000/api/health

Useful commands: `make help`, `make logs`, `make down`, `make clean`.

## 5. Confirm it works

- The site shows **your name** and loads Skills, Certifications, and Projects.
- The **Status** page shows API + Database "operational".
- The **Architecture** page shows the placeholder diagram (you'll replace it).

If anything fails, see [09-troubleshooting.md](09-troubleshooting.md).

## 6. What next

Head to [03-milestones.md](03-milestones.md) — that's your assignment and the
grading checklist. Start with **M1 (run locally)**, which you've basically just
done, then **M2 (Terraform foundations)**.

> 💸 Heads-up: the AWS resources you'll build cost real money. Always
> `terraform destroy` when you stop working. See [04-terraform-guide.md](04-terraform-guide.md).
