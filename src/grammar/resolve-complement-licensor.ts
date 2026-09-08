// grammar/resolve-complement-licensor.ts
//
// Canonical answer to "which verb governs the complement of this clause".
//
//   "I want a computer."        → want licenses `computer`
//   "I want to buy a computer." → buy  licenses `computer`
//
// verb1 stays the finite main verb (conjugation, subject agreement). When a
// catenative infinitive is present it is verb2 — not verb1 — that selects the
// object / place. Every layer that selects or realizes a complement must read
// the licensor from here instead of re-deriving it inline.

import type { VerbEntry } from "../lexicon";

/**
 * Minimal structural input. `Scene` satisfies it, and generation can pass its
 * in-flight parts before a Scene exists.
 *
 * Declared here rather than importing `Scene` to keep grammar/ free of a cycle
 * (scene.ts already imports from grammar/).
 */
export type ComplementLicensingSource = {
  /** Finite main verb (verb1). */
  verb: VerbEntry;

  /** Catenative complement (Double Verb): to + verb2. Absent on single-verb. */
  infinitive?: { verb: VerbEntry } | undefined;
};

/**
 * The verb that governs / licenses the post-verbal complement (object, place).
 *
 * V1 scope: all complement slots of a clause share one licensor, so this takes
 * no slot argument. Per-slot governance would be a behavior change, not a
 * refactor.
 */
export function resolveComplementLicensor(
  source: ComplementLicensingSource,
): VerbEntry {
  return source.infinitive?.verb ?? source.verb;
}
