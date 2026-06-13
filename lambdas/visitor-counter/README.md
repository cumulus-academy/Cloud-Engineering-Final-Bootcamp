# visitor-counter Lambda

Atomically increments a visit count in **DynamoDB** and returns the new total.
**The code is complete** — you deploy it (Milestone 6).

## API

`GET /api/visits` →

```json
{ "visits": 42 }
```

## DynamoDB table (you create this in Terraform)

| Property | Value |
|---|---|
| Partition key | `id` (String) |
| Counter attribute | `visits` (Number) |
| Single item id | `"site-visits"` |

The handler uses an atomic `ADD visits :one` update, so concurrent visitors are
counted correctly without read-modify-write races.

## Environment variables

| Var | Purpose | Default |
|---|---|---|
| `VISITOR_TABLE_NAME` | DynamoDB table name | `visitor-counter` |
| `AWS_REGION` | Region | set by Lambda |
| `DYNAMODB_ENDPOINT` | Optional — DynamoDB Local URL for testing | — |
| `USE_MEMORY_STORE` | `1` = in-memory counter (offline testing only) | — |

## Test it locally

No AWS account or `npm install` needed for a quick smoke test (uses the
in-memory store automatically):

```bash
node local-run.js
```

Optional — test against **DynamoDB Local**:

```bash
docker run -p 8000:8000 amazon/dynamodb-local
aws dynamodb create-table \
  --table-name visitor-counter \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000
DYNAMODB_ENDPOINT=http://localhost:8000 AWS_REGION=us-east-1 \
  AWS_ACCESS_KEY_ID=x AWS_SECRET_ACCESS_KEY=x node local-run.js
```

## What YOU will do (Milestone 6)

- [ ] Create the DynamoDB table (`terraform/modules/dynamodb`).
- [ ] Package + deploy this function (`terraform/modules/lambda`).
- [ ] Grant the function's IAM role `dynamodb:UpdateItem` on the table (**least
      privilege** — only that action, only that table).
- [ ] Expose it via **API Gateway** as `GET /api/visits`.
- [ ] (Optional) Show the count on the frontend — add an `api.visits()` call and
      display it on the Home or Status page.

> Handler reference for AWS: **`index.handler`**, runtime **Node.js 20**.
