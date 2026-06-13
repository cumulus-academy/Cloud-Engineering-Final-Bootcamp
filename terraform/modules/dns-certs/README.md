# module: dns-certs

Creates **Route53** DNS and an **ACM** TLS certificate. **You build this
(Milestone 7).**

## Inputs

| Name | Default | Description |
|---|---|---|
| `domain_name` | — | Your domain (from customization.json) |
| `create_hosted_zone` | `false` | Create a new zone vs. use an existing one |
| `subject_alternative_names` | `[]` | Extra cert names (e.g. `www.`) |

## Outputs (you enable these)

`certificate_arn`, `zone_id`, `name_servers`

## Notes

- DNS-validated certs need Route53 records this module creates.
- The ACM cert **must be in the same region as the ALB**.
- After your ALB Ingress exists (Milestone 7), add an alias A record pointing
  your domain at the ALB — do that from the dev environment. See [main.tf](main.tf).

> If you don't own a domain, ask your instructor — some cohorts share a parent
> domain and give each student a subdomain.
