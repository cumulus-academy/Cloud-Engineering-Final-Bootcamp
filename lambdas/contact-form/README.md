# contact-form Lambda

Handles contact form submissions from the website. **Intentionally a stub:** it
validates the input and logs it, but does **not** deliver the message yet —
adding delivery is your work (Milestone 6). Keep it simple.

## API

`POST /api/contact`

Request body:

```json
{ "name": "Jordan", "email": "jordan@example.com", "message": "Hi!" }
```

Responses:

| Status | When |
|---|---|
| `200` | Valid submission (currently just logged) |
| `400` | Missing fields, invalid email, or message too long |
| `204` | CORS preflight (`OPTIONS`) |

The frontend Contact page already posts here and degrades gracefully until this
function is deployed.

## Test it locally

No AWS setup or `npm install` needed:

```bash
node local-run.js
```

You'll see a valid submission succeed and the invalid ones rejected with `400`.

## What YOU will do (Milestone 6)

The handler has a clearly marked `TODO` block. Implement **one** delivery method:

- [ ] **Amazon SES** — email the message to yourself (`@aws-sdk/client-ses`), or
- [ ] **Amazon SNS** — publish to a topic you've subscribed to, or
- [ ] **DynamoDB** — store submissions in a table to review later.

Then:

- [ ] Deploy the function (`terraform/modules/lambda`).
- [ ] Grant its IAM role permission for **only** the action/resource you chose.
- [ ] Expose it via **API Gateway** as `POST /api/contact`.
- [ ] Add any new env vars (e.g. `CONTACT_DESTINATION_EMAIL`).

> Handler reference for AWS: **`index.handler`**, runtime **Node.js 20**.
> ⚠️ Amazon SES starts in a sandbox — you can only send to verified addresses
> until you request production access. That's fine for this project.
