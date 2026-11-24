// Ridiculous at First Glance, Real by the Second
// Copies entry.txt to the output directory.
//
// Gate: /output/entry.txt must be UTF-8 text of 1-200 characters, not
// only whitespace. entry.txt holds a single pitch sentence of 116
// characters, well inside the 200-character cap, so this program only
// copies it verbatim and never alters its length.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve paths relative to this file, never relative to the working
// directory: the grader runs main.ts from a different cwd.
const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");

mkdirSync(outDir, { recursive: true });
const entry = readFileSync(entryPath, "utf8");
if (entry.trim().length === 0) {
  throw new Error("entry.txt is empty or whitespace-only");
}
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry.txt must be 1-200 characters, got ${entry.length}`);
}
writeFileSync(join(outDir, "entry.txt"), entry);
