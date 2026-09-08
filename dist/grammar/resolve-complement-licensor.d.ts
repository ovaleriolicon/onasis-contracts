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
    infinitive?: {
        verb: VerbEntry;
    } | undefined;
};
/**
 * The verb that governs / licenses the post-verbal complement (object, place).
 *
 * V1 scope: all complement slots of a clause share one licensor, so this takes
 * no slot argument. Per-slot governance would be a behavior change, not a
 * refactor.
 */
export declare function resolveComplementLicensor(source: ComplementLicensingSource): VerbEntry;
