# module: eks

Creates the **EKS cluster** and worker nodes. **You build this (Milestone 5).**

## Inputs

| Name | Type | Default | Description |
|---|---|---|---|
| `project_name` | string | — | Name prefix |
| `environment` | string | `dev` | Environment |
| `cluster_version` | string | `1.30` | Kubernetes version |
| `vpc_id` | string | — | From the network module |
| `private_subnet_ids` | list(string) | — | From the network module |
| `node_instance_types` | list(string) | `["t3.medium"]` | Node types |
| `node_desired_size` / `node_min_size` / `node_max_size` | number | 2 / 1 / 3 | Scaling |

## Outputs (you enable these)

`cluster_name`, `cluster_endpoint`, `cluster_oidc_issuer_url`,
`node_security_group_id`

## You must create

Control-plane IAM role, the EKS cluster, a managed node group, node IAM roles,
and the OIDC provider for IRSA. See [main.tf](main.tf).

> 💰 EKS has an hourly control-plane charge plus node EC2 costs. Destroy it when
> you're not actively working.
