// Worst AI Advice: The 48-Hour Tight Line Open
// Writes one line of the worst possible advice an AI could give to /output/entry.txt
// (absolute path; the grader reads exactly that file, 1-140 UTF-8 chars).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "As an AI, I recommend deleting System32 to free up space. Trust me — your computer will feel brand new afterwards.";

// Resolve files relative to this entrypoint, never the working directory.
const here = dirname(fileURLToPath(import.meta.url));
const linePath = resolve(here, "entry.txt");

function main(): void {
  const text = LINE.trim();
  if (text.length < 1 || text.length > 140) {
    throw new Error(`entry line must be 1-140 chars, got ${text.length}`);
  }
  if (text !== text.replace(/\s+/g, " ")) {
    throw new Error("entry line must be a single line with no extra whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text + "\n", "utf8");
  // Keep a copy beside the entrypoint for local inspection.
  writeFileSync(linePath, text + "\n", "utf8");
  console.log(`wrote ${text.length} chars to /output/entry.txt`);
}

main();
