#!/usr/bin/env node
/**
 * apply-customization.mjs
 * -----------------------------------------------------------------------------
 * The single, dependency-free customization engine for this repo.
 *
 * It reads `customization.json` and substitutes `__TOKEN__` placeholders, where
 * TOKEN is any key in customization.json (e.g. __STUDENT_NAME__, __AWS_REGION__).
 *
 * It renders, NON-DESTRUCTIVELY:
 *   1. `.env.example`  -> `.env`               (so Docker Compose has real values)
 *   2. any `*.template` file -> same path without the `.template` suffix
 *      e.g. database/seed/seed.template.sql -> database/seed/seed.sql
 *
 * Why templates instead of editing source files in place?
 *   So you can edit customization.json and re-run this safely any number of
 *   times. The source `.template` files always keep their `__TOKEN__` markers.
 *
 * React frontend and the Node backend can also import customization.json
 * directly at runtime, so most of the app needs no templating at all.
 *
 * Usage:  node scripts/apply-customization.mjs
 *    or:  make customize
 * -----------------------------------------------------------------------------
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const IGNORE_DIRS = new Set([
  ".git", "node_modules", "dist", "build", ".terraform", ".vite", "coverage",
]);

function loadCustomization() {
  const file = join(ROOT, "customization.json");
  if (!existsSync(file)) {
    console.error("ERROR: customization.json not found at repo root.");
    process.exit(1);
  }
  let data;
  try {
    data = JSON.parse(readFileSync(file, "utf8"));
  } catch (err) {
    console.error("ERROR: customization.json is not valid JSON:", err.message);
    process.exit(1);
  }
  const stillDefault = [];
  if (data.STUDENT_NAME === "Your Name") stillDefault.push("STUDENT_NAME");
  if (data.STUDENT_EMAIL === "you@example.com") stillDefault.push("STUDENT_EMAIL");
  if (stillDefault.length) {
    console.warn(
      `WARNING: customization.json still has default values for: ${stillDefault.join(", ")}.\n` +
      "         Edit customization.json with your details, then run this again.\n"
    );
  }
  return data;
}

function substitute(content, values) {
  return content.replace(/__([A-Z0-9_]+)__/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      return String(values[key]);
    }
    return match; // leave unknown tokens untouched
  });
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (IGNORE_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function rel(p) {
  return p.replace(ROOT + "/", "");
}

function main() {
  const values = loadCustomization();
  const rendered = [];

  // 1. .env.example -> .env
  const envExample = join(ROOT, ".env.example");
  if (existsSync(envExample)) {
    const out = join(ROOT, ".env");
    writeFileSync(out, substitute(readFileSync(envExample, "utf8"), values));
    rendered.push(`${rel(envExample)} -> ${rel(out)}`);
  }

  // 2. every *.template -> path without `.template`
  for (const file of walk(ROOT)) {
    if (!file.endsWith(".template")) continue;
    const out = file.slice(0, -".template".length); // strip suffix
    writeFileSync(out, substitute(readFileSync(file, "utf8"), values));
    rendered.push(`${rel(file)} -> ${rel(out)}`);
  }

  console.log("Customization applied. Rendered files:");
  if (rendered.length === 0) {
    console.log("  (none yet — templates are added in later phases)");
  } else {
    for (const line of rendered) console.log(`  ${line}`);
  }
  console.log("\nValues used:");
  for (const [k, v] of Object.entries(values)) {
    console.log(`  ${k} = ${v}`);
  }
}

main();
