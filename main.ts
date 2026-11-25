// Real-Life Patch Notes: The Comedy Changelog
// Writes one one-line patch note (<=160 chars) to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "v3.0.2: fixed a bug where the human body requested a full night of sleep, then woke up at 3 a.m. to replay an embarrassing conversation from 2014.";

// The gate counts UTF-8 characters, but a byte-length check is the
// stricter sibling: our line is plain ASCII, so bytes == chars here.
// Round-trip verification proves the file on disk is exactly the line.
function verify(path: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip mismatch: entry.txt is not exactly the line");
  }
  const bytes = Buffer.byteLength(back, "utf8");
  if (bytes < 1 || bytes > 160) {
    throw new Error(`entry must be 1-160 bytes, got ${bytes}`);
  }
}

function main(): void {
  if (LINE.length < 1 || LINE.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
  verify("/output/entry.txt");
}

main();
