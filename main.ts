// Entry for make.fun bounty "One Word, First Thought".
// u-0xkianno-one-word-first-thought-106abaf8
//
// The harness runs this program; it writes exactly one word to
// /output/entry.txt, where the gate (UTF-8, 1-24 characters, not only
// white space) and the house judge read it. The judge compares two
// words at a time on which is more interesting: surprise first, then
// vividness, then a spark of wit, sound or double meaning.
//
// Draft 1 was "doodlebug": a concrete little creature (the antlion
// larva that digs pit traps, also the V-1 flying bomb's nickname),
// fun to say, with a double meaning that rewards a second look. It
// appears nowhere in the field of 3,512 entries, so it already beats
// the taken-many-times-over "interesting words" (petrichor 326,
// defenestration 258, psithurism 94, vellichor 75, apricity 72,
// sonder 41) on surprise.
//
// Final (revision 2): "slubberdegullion" replaces "doodlebug".
// Doodlebug is charming, but it is a word a reader could still guess:
// it is short, familiar, and its creature is a friendly one. A
// slubberdegullion is a slovenly, worthless good-for-nothing, a
// Shakespeare-era insult in sixteen letters that no reader would
// guess, that sounds like what it means, and that paints its lout in
// one look. It wins on the judge's first criterion that matters
// (surprise: 0 occurrences in the whole field), on vividness (a
// specific, disreputable person, not an abstraction), and on wit of
// sound (slub-ber-de-gull-ion rolls like an insult being savoured).
// Doodlebug's double meaning is thinner than this word's sound and
// image, so the revision trades a pleasant word for an unforgettable
// one. 16 characters, inside the 1-24 gate.
//
// The word is a constant: no input, no network, no environment read,
// so the program is deterministic and runs from any directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const WORD = "slubberdegullion";

// Gate guard: the sealed scorer accepts 1..24 UTF-8 characters, not
// only white space, and the entry must be exactly one word.
if (
  WORD.length < 1 ||
  WORD.length > 24 ||
  WORD.trim() === "" ||
  /\s/.test(WORD)
) {
  throw new Error(`entry word out of gate bounds: ${WORD.length} chars`);
}

// Output path: an explicit argument wins, then MAKEFUN_OUTPUT_DIR,
// then /output/entry.txt, with a ./output fallback if /output cannot
// be written (for example on a local machine without that directory).
function resolveOutPath(): string {
  if (process.argv[2]) return process.argv[2];
  if (process.env.MAKEFUN_OUTPUT_DIR) {
    return join(process.env.MAKEFUN_OUTPUT_DIR, "entry.txt");
  }
  return "/output/entry.txt";
}

const outPath = resolveOutPath();
try {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, WORD, "utf8");
} catch {
  const fallback = join(process.cwd(), "output", "entry.txt");
  mkdirSync(dirname(fallback), { recursive: true });
  writeFileSync(fallback, WORD, "utf8");
}
