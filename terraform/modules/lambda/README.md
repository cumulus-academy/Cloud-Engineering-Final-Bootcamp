# module: lambda

Generic module to **package + deploy a Node Lambda**. Used for both the
visitor-counter and contact-form functions. **You build this (Milestone 6).**

## Inputs (key ones)

| Name | Default | Description |
|---|---|---|
| `function_name` | — | Full function name |
| `source_dir` | — | Path to the function (has `index.js`) |
| `handler` | `index.handler` | Handler |
| `runtime` | `nodejs20.x` | Runtime |
| `environment_variables` | `{}` | Env vars (e.g. `VISITOR_TABLE_NAME`) |
| `timeout` | `10` | Seconds |

## Outputs (you enable these)

`function_name`, `function_arn`, `invoke_arn`, `role_name`

## Notes

- Zip the source with the `archive_file` data source.
- The **visitor-counter** needs its `node_modules` in the zip (run `npm install`
  in its folder first, or build it in CI); the **contact-form** has no deps.
- Grant each function **only** the extra IAM permissions it needs (attach to the
  exposed `role_name`).
- Expose functions via **API Gateway** + an `aws_lambda_permission`. See
  [main.tf](main.tf).
