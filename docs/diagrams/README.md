# docs/diagrams/

Reference diagrams for the **documentation** (rendered on GitHub).

| File | What it is |
|---|---|
| [architecture.md](architecture.md) | The canonical architecture, as a mermaid graph |

## Two diagram locations — don't mix them up

| Location | Format | Purpose |
|---|---|---|
| **`docs/diagrams/`** (here) | mermaid in markdown | Reference diagram in the docs, rendered on GitHub |
| **`frontend/public/diagrams/`** | draw.io SVG (`architecture.drawio.svg`) | The diagram shown on your **live site's** Architecture page |

- Edit **this** one (mermaid) for the repo's documentation.
- Edit the **frontend** one (draw.io) to change what visitors see on the site —
  instructions are in that folder's README.

Keep both in sync with what you actually deployed.
