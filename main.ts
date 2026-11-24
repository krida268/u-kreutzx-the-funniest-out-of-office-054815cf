// The Funniest Out-of-Office — make.fun bounty entry.
// Writes one funny single-line out-of-office auto-reply to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm out of office until Monday. My inbox is being answered by my toaster, which has strong opinions and no concept of deadlines.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// a single line, not only white space. OUTPUT_DIR lets local runs point
// the file elsewhere without touching the production path.
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const text = ENTRY.trim();
if (text.length < 1 || text.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${text.length}`);
}
if (text.includes("\n")) {
  throw new Error("entry must be a single line");
}

writeFileSync(join(outDir, "entry.txt"), text, "utf8");

// Read the file back and confirm it holds exactly the entry we meant to write.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== text) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
console.log(text);
