# 02 — Customization

You personalize the whole project by editing **one file** and running **one
command**. Keep it simple — there are only eight values.

## The file: `customization.json`

```json
{
  "STUDENT_NAME": "Jack Lavelle",
  "STUDENT_EMAIL": "you@example.com",
  "STUDENT_LOCATION": "City, Country",
  "STUDENT_LINKEDIN_URL": "https://www.linkedin.com/in/your-handle",
  "STUDENT_GITHUB_URL": "https://github.com/your-handle",
  "STUDENT_DOMAIN_NAME": "yourname.dev",
  "AWS_REGION": "us-east-1",
  "PROJECT_NAME": "cloud-portfolio"
}
```

## The command

```bash
make customize        # or: node scripts/apply-customization.mjs
```

It substitutes `__TOKEN__` placeholders (where `TOKEN` is any key above) and
renders these files:

| Rendered file | From | Used by |
|---|---|---|
| `.env` | `.env.example` | Docker Compose (local) |
| `database/seed/seed.sql` | `seed.sql.template` | local DB + RDS |
| `frontend/src/data/site.js` | `site.js.template` | site branding/links |
| `terraform/environments/dev/terraform.tfvars` | `terraform.tfvars.template` | Terraform |

It is **non-destructive and re-runnable**: the `*.template` source files always
keep their tokens, so you can edit `customization.json` and run it again any time.

## Where each value goes

| Value | Shows up in |
|---|---|
| `STUDENT_NAME` | navbar, footer, home hero, DB profile |
| `STUDENT_EMAIL` | contact page, DB profile |
| `STUDENT_LOCATION` | about page, DB profile |
| `STUDENT_LINKEDIN_URL` / `STUDENT_GITHUB_URL` | contact + footer links, DB |
| `STUDENT_DOMAIN_NAME` | Route53 / ACM / Ingress host, Terraform |
| `AWS_REGION` | Terraform + resource region |
| `PROJECT_NAME` | resource name prefix everywhere |

## Things to know

- **The skills/certs/projects** in `seed.sql` are sample data — once generated,
  that file is yours to personalize. (Re-running `make customize` regenerates it
  from the template, so make lasting content edits to the template or keep a copy.)
- **GitHub Actions can't read `customization.json`**, so for CI you also set the
  same values as repository **variables** (`PROJECT_NAME`, `AWS_REGION`,
  `DOMAIN_NAME`, etc.) — see [06-cicd-guide.md](06-cicd-guide.md).
- The generated `.env` and `terraform.tfvars` are **git-ignored** (they're
  yours); the rendered `seed.sql` and `site.js` are committed so a fresh clone
  builds.
