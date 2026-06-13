# Architecture diagram

Drop your **draw.io** architecture diagram in this folder and it shows up on the
site's **Architecture** page automatically — no code changes needed.

## The one rule

Save your diagram here with this exact name:

```
frontend/public/diagrams/architecture.drawio.svg
```

A placeholder file with that name is already here. **Replace it with yours**
(keep the filename) and the Architecture page will display your diagram.

## How to create an editable SVG in draw.io

`.drawio.svg` is a normal SVG image **with your editable diagram embedded**, so
it renders on the website *and* reopens in draw.io later. To make one:

**Option A — diagrams.net (web) or the draw.io desktop app**
1. Build your diagram at <https://app.diagrams.net> (or the desktop app).
2. **File → Export as → SVG…**
3. Tick **“Include a copy of my diagram”** (this keeps it editable).
4. Export and save it as `architecture.drawio.svg` in this folder, replacing the
   placeholder.

**Option B — desktop app, direct save**
- **File → Save As…** and choose **“Editable Vector Image (.svg)”**, then save it
  here as `architecture.drawio.svg`.

To edit later, just open `architecture.drawio.svg` again in draw.io.

## Don't want the editable format?

You can instead drop a plain image named either of these (the page checks for
them too):

- `architecture.svg`
- `architecture.png`

If present, they take precedence is in this order:
`architecture.drawio.svg` → `architecture.svg` → `architecture.png`. The simplest
path is to just replace `architecture.drawio.svg`.

## When does it appear?

- **Locally (`make dev` / `npm run dev`):** immediately — just refresh the page.
- **Deployed site:** the image is bundled when the frontend is built, so it
  appears after the frontend image is rebuilt and redeployed (your CI/CD does
  this on push — Milestone 8).

## Tips

- Keep it readable: the image sits on a white background in both light and dark
  mode.
- Show the real AWS services you used (EKS, RDS, ALB, Route53, Lambda, etc.) and
  how traffic flows — this is what reviewers look at.
- A landscape diagram around 900–1400px wide looks best.
