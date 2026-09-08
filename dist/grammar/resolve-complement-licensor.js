"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveComplementLicensor = resolveComplementLicensor;
/**
 * The verb that governs / licenses the post-verbal complement (object, place).
 *
 * V1 scope: all complement slots of a clause share one licensor, so this takes
 * no slot argument. Per-slot governance would be a behavior change, not a
 * refactor.
 */
function resolveComplementLicensor(source) {
    return source.infinitive?.verb ?? source.verb;
}
