# module: dynamodb

Creates the **visitor counter table**. **You build this (Milestone 3).**

## Inputs

| Name | Default | Description |
|---|---|---|
| `table_name` | — | Table name |
| `hash_key` | `id` | Partition key |
| `billing_mode` | `PAY_PER_REQUEST` | Cheapest for low traffic |

## Outputs (you enable these)

`table_name`, `table_arn`

The `visitor-counter` Lambda uses partition key `id` and a non-key `visits`
number attribute — you only declare the key attribute. See
[main.tf](main.tf) and the [lambda README](../../../lambdas/visitor-counter/README.md).
