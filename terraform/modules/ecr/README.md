# module: ecr

Creates **ECR repositories** for the container images. **You build this
(Milestone 4).**

## Inputs

| Name | Default | Description |
|---|---|---|
| `repository_names` | `["frontend","backend"]` | Repos to create |
| `image_tag_mutability` | `MUTABLE` | Tag mutability |
| `scan_on_push` | `true` | Vulnerability scanning |

## Outputs (you enable these)

`repository_urls` — a map of `frontend`/`backend` → repo URL, used by your
GitHub Actions build (Milestone 8). See [main.tf](main.tf).
