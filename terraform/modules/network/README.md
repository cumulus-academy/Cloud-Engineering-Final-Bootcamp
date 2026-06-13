# module: network

Creates the **VPC** that everything else runs in. **You build this (Milestone 2).**

## Inputs

| Name | Type | Default | Description |
|---|---|---|---|
| `project_name` | string | — | Name prefix |
| `environment` | string | `dev` | Environment name |
| `vpc_cidr` | string | `10.0.0.0/16` | VPC CIDR |
| `az_count` | number | `2` | AZs to spread across |
| `enable_nat_gateway` | bool | `true` | NAT for private egress |

## Outputs (you enable these)

`vpc_id`, `public_subnet_ids`, `private_subnet_ids`

## You must create

VPC, public + private subnets (tagged for Kubernetes ELB discovery), internet
gateway, NAT gateway(s), and route tables. See the detailed checklist in
[main.tf](main.tf).

> 💡 NAT gateways cost money per hour. For a student project a single NAT is
> fine. Always `terraform destroy` when you finish a session.
