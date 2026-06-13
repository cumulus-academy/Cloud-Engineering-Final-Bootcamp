# scripts/

Small helper scripts for local development. **The academy provides these — you
do not need to edit them.** They wrap common Docker / customization tasks so you
can focus on the cloud work.

| Script | What it does | Equivalent `make` target |
|---|---|---|
| `apply-customization.mjs` | Reads `customization.json` and renders `.env` + every `*.template` file. Re-runnable and non-destructive. | `make customize` |
| `apply-customization.sh` | Thin shell wrapper around the `.mjs` above. | `make customize` |
| `seed-db.sh` | Re-applies `database/schema` + `database/seed` into the running postgres container. | `make seed` |
| `local-up.sh` | Starts the local Docker stack (customizes first if needed). | `make dev` |
| `local-down.sh` | Stops the stack. `--clean` also removes the DB volume. | `make down` / `make clean` |

## How customization works

You edit **one file** — `customization.json` at the repo root — then run
`make customize`.

The engine substitutes `__TOKEN__` placeholders (where `TOKEN` is any key in
`customization.json`, e.g. `__STUDENT_NAME__`) in two ways:

1. `.env.example` → `.env`
2. any `*.template` file → the same path without the `.template` suffix
   (e.g. `database/seed/seed.template.sql` → `database/seed/seed.sql`)

Because the engine only ever writes to generated files, you can change
`customization.json` and re-run `make customize` as many times as you like.

> The React frontend and Node backend also import `customization.json` directly
> at runtime, so most of the app needs no templating.

## Requirements

- **Docker** (with Compose v2 — the `docker compose` command)
- **Node.js** 18+ (only used to run the customization script — no `npm install`
  needed for it)
