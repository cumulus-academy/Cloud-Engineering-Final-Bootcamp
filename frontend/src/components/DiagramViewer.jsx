import { useState } from "react";

// Loads the architecture diagram from /public/diagrams/. Students just drop their
// draw.io export here — no code changes needed. We try a few common filenames in
// order; the first that loads wins. If none exist, we render `fallback`.
//
// Recommended: save your draw.io diagram as an editable SVG named
//   architecture.drawio.svg
// (it renders here AND reopens in draw.io). See public/diagrams/README.md.
const CANDIDATES = [
  "/diagrams/architecture.drawio.svg",
  "/diagrams/architecture.svg",
  "/diagrams/architecture.png",
];

export function DiagramViewer({ fallback = null, alt = "Architecture diagram" }) {
  const [idx, setIdx] = useState(0);

  if (idx >= CANDIDATES.length) return fallback;

  return (
    <img
      key={CANDIDATES[idx]}
      src={CANDIDATES[idx]}
      alt={alt}
      loading="lazy"
      className="w-full rounded-md border bg-white"
      onError={() => setIdx((i) => i + 1)}
    />
  );
}
