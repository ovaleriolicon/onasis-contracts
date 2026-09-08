// Complement Licensing V1 — canonical governing-verb resolution.

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { resolveComplementLicensor } = require("../dist");

function verb(base) {
  return {
    base,
    behavior: "no-to-be",
    complements: ["object"],
    transitive: true,
    semantics: { objectTypes: ["object"] },
  };
}

const want = verb("want");
const buy = verb("buy");

describe("resolveComplementLicensor", () => {
  it("single verb: the finite verb licenses the complement", () => {
    // "I want a computer." → want governs `computer`
    assert.equal(resolveComplementLicensor({ verb: want }), want);
  });

  it("single verb: an explicitly undefined infinitive is still single-verb", () => {
    assert.equal(
      resolveComplementLicensor({ verb: want, infinitive: undefined }),
      want,
    );
  });

  it("Double Verb: verb2 licenses the complement, not verb1", () => {
    // "I want to buy a computer." → buy governs `computer`
    const licensor = resolveComplementLicensor({
      verb: want,
      infinitive: { verb: buy },
    });

    assert.equal(licensor, buy);
    assert.notEqual(licensor, want);
  });

  it("returns the entry by reference so callers read live lexical data", () => {
    const scened = { verb: want, infinitive: { verb: buy } };
    assert.equal(resolveComplementLicensor(scened).base, "buy");
    assert.equal(scened.verb.base, "want", "verb1 is never mutated or shadowed");
  });
});
