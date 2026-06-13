# module: rds

Creates **RDS PostgreSQL** with credentials in **Secrets Manager**. **You build
this (Milestone 3).**

## Inputs (key ones)

| Name | Default | Description |
|---|---|---|
| `vpc_id`, `private_subnet_ids` | — | From the network module |
| `db_name` | `portfolio` | Initial database |
| `db_username` | `portfolio` | Master user |
| `db_instance_class` | `db.t3.micro` | Size |
| `allowed_security_group_ids` | `[]` | SGs allowed on 5432 (EKS nodes) |

## Outputs (you enable these)

`db_endpoint`, `db_name`, `db_secret_arn`, `db_security_group_id`

## Key idea: no plaintext passwords

Set `manage_master_user_password = true` on the instance — RDS generates the
password and stores it in Secrets Manager for you. Your backend reads
`DATABASE_URL` / credentials from that secret at runtime (Milestone 3 + 9).
See [main.tf](main.tf).
